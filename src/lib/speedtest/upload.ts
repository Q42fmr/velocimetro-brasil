import { childController, sleep, SpeedTestError, throwIfAborted, uploadUrl } from "./http";
import { ThroughputMeter } from "./stats";
import { LIVE_WINDOW_MS, MAX_CONSECUTIVE_FAILURES, TICK_MS, type ThroughputOptions, type TickHandler } from "./download";

/** Bloco de bytes aleatórios (incompressível). `getRandomValues` aceita no máximo 64 KiB por chamada. */
export function randomPayload(bytes: number): Blob {
  const buf = new Uint8Array(bytes);
  const step = 65_536;
  for (let i = 0; i < bytes; i += step) crypto.getRandomValues(buf.subarray(i, Math.min(bytes, i + step)));
  // Sem `type`: evita o preflight CORS (requisição "simples").
  return new Blob([buf]);
}

/**
 * Envia blocos em `streams` conexões paralelas durante `durationMs` usando XHR —
 * único caminho com `upload.onprogress` em todos os navegadores.
 */
export async function measureUpload(opts: ThroughputOptions, signal: AbortSignal, onTick: TickHandler): Promise<number> {
  throwIfAborted(signal);
  const ctl = childController(signal);
  const payload = randomPayload(opts.chunkBytes);
  const start = performance.now();
  const end = start + opts.durationMs;
  const meter = new ThroughputMeter(start);
  let failures = 0;

  function sendOnce(): Promise<void> {
    const { promise, resolve, reject } = Promise.withResolvers<void>();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", uploadUrl(opts.baseUrl), true);
    let sent = 0;
    xhr.upload.onprogress = (e) => {
      if (e.loaded > sent) {
        meter.addBytes(performance.now(), e.loaded - sent);
        sent = e.loaded;
      }
      if (performance.now() >= end) xhr.abort();
    };
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`HTTP ${xhr.status}`)));
    xhr.onerror = () => reject(new Error("Falha de rede no envio"));
    xhr.ontimeout = () => reject(new Error("Tempo esgotado no envio"));
    xhr.onabort = () => resolve(); // abortado por fim de fase ou cancelamento: o laço decide
    const onAbort = () => xhr.abort();
    ctl.signal.addEventListener("abort", onAbort, { once: true });
    xhr.onloadend = () => ctl.signal.removeEventListener("abort", onAbort);
    xhr.send(payload);
    return promise;
  }

  async function worker(): Promise<void> {
    while (performance.now() < end && !ctl.signal.aborted) {
      try {
        await sendOnce();
        failures = 0;
      } catch {
        if (ctl.signal.aborted) return;
        if (++failures >= MAX_CONSECUTIVE_FAILURES) return;
        await sleep(250);
      }
    }
  }

  const ticker = setInterval(() => {
    const now = performance.now();
    onTick(meter.instant(now, LIVE_WINDOW_MS), Math.min(1, (now - start) / opts.durationMs));
  }, TICK_MS);
  const hardStop = setTimeout(() => ctl.abort(), opts.durationMs + 1500);

  try {
    await Promise.all(Array.from({ length: opts.streams }, worker));
  } finally {
    clearInterval(ticker);
    clearTimeout(hardStop);
    ctl.abort();
  }

  throwIfAborted(signal);
  if (meter.totalBytes === 0) {
    throw new SpeedTestError("Não foi possível enviar dados ao servidor de medição. Verifique sua conexão e tente novamente.", "upload");
  }
  const result = meter.average(opts.warmupMs);
  onTick(result, 1);
  return result;
}
