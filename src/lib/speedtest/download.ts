import { childController, downloadUrl, sleep, SpeedTestError, throwIfAborted } from "./http";
import { ThroughputMeter } from "./stats";

export interface ThroughputOptions {
  baseUrl: string;
  durationMs: number;
  streams: number;
  chunkBytes: number;
  warmupMs: number;
}

export type TickHandler = (liveMbps: number, progress: number) => void;

/** Falhas consecutivas (somadas entre conexões) que encerram a fase. */
export const MAX_CONSECUTIVE_FAILURES = 3;
export const TICK_MS = 100;
export const LIVE_WINDOW_MS = 1000;

/**
 * Baixa blocos em `streams` conexões paralelas durante `durationMs`, somando os
 * bytes recebidos. Resolve com a média (Mbps) descartando o aquecimento.
 */
export async function measureDownload(opts: ThroughputOptions, signal: AbortSignal, onTick: TickHandler): Promise<number> {
  throwIfAborted(signal);
  const ctl = childController(signal);
  const start = performance.now();
  const end = start + opts.durationMs;
  const meter = new ThroughputMeter(start);
  let failures = 0;

  async function worker(): Promise<void> {
    while (performance.now() < end && !ctl.signal.aborted) {
      try {
        const res = await fetch(downloadUrl(opts.baseUrl, opts.chunkBytes), { cache: "no-store", signal: ctl.signal });
        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
        const reader = res.body.getReader();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          meter.addBytes(performance.now(), value.byteLength);
          if (performance.now() >= end) {
            reader.cancel().catch(() => {});
            break;
          }
        }
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
  // Rede travada: encerra a fase mesmo sem progresso.
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
    throw new SpeedTestError("Não foi possível receber dados do servidor de medição. Verifique sua conexão e tente novamente.", "download");
  }
  const result = meter.average(opts.warmupMs);
  onTick(result, 1);
  return result;
}
