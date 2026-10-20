import { downloadUrl, serverTimeMs, SpeedTestError, throwIfAborted } from "./http";
import { jitter, median } from "./stats";

export interface LatencyResult {
  ping: number;
  jitter: number;
  samples: number[];
}

/**
 * Tempo até o primeiro byte via Resource Timing (exige `Timing-Allow-Origin`),
 * ou `undefined` se a entrada não estiver disponível.
 */
function ttfbFromResourceTiming(url: string): number | undefined {
  if (typeof performance.getEntriesByName !== "function") return undefined;
  const entries = performance.getEntriesByName(url, "resource") as PerformanceResourceTiming[];
  const e = entries[entries.length - 1];
  if (!e || e.requestStart === 0 || e.responseStart === 0) return undefined;
  // `finalResponseHeadersStart` (Chrome) ignora respostas 103 Early Hints.
  const headersStart = (e as PerformanceResourceTiming & { finalResponseHeadersStart?: number }).finalResponseHeadersStart;
  return (headersStart || e.responseStart) - e.requestStart;
}

/**
 * Mede a latência com requisições de 0 byte em sequência. A primeira amostra é
 * descartada (inclui DNS/TLS); ping = mediana, jitter = variação média.
 */
export async function measureLatency(
  baseUrl: string,
  samples: number,
  signal: AbortSignal,
  onSample: (rtt: number, index: number) => void,
): Promise<LatencyResult> {
  const rtts: number[] = [];
  if (typeof performance.clearResourceTimings === "function") performance.clearResourceTimings();

  for (let i = 0; i < samples; i++) {
    throwIfAborted(signal);
    const url = downloadUrl(baseUrl, 0);
    const t0 = performance.now();
    let res: Response;
    try {
      res = await fetch(url, { cache: "no-store", signal });
      await res.arrayBuffer();
    } catch (e) {
      if (signal.aborted) throw e;
      // Falha isolada: tenta a próxima amostra; sem nenhuma amostra válida, erro abaixo.
      continue;
    }
    const wall = performance.now() - t0;
    const ttfb = ttfbFromResourceTiming(url) ?? wall;
    const rtt = Math.max(0.1, ttfb - serverTimeMs(res));
    if (i > 0) rtts.push(rtt);
    onSample(rtt, i);
  }

  if (rtts.length === 0) {
    throw new SpeedTestError("Não foi possível alcançar o servidor de medição. Verifique sua conexão e tente novamente.", "latency");
  }
  return { ping: median(rtts), jitter: jitter(rtts), samples: rtts };
}
