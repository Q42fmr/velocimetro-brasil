import { site } from "@/config/site";
import { measureDownload } from "./download";
import { isAbortError, SpeedTestError } from "./http";
import { measureLatency } from "./latency";
import { fetchConnectionInfo } from "./meta";
import type { ConnectionInfo, Metrics, Progress, SpeedTestResult } from "./types";
import { measureUpload } from "./upload";

export type EngineConfig = typeof site.speedtest;

export type ProgressHandler = (p: Progress) => void;

export { SpeedTestError, isAbortError };

/**
 * Executa o teste completo: informações da conexão → latência → download → upload.
 * Lança `DOMException("AbortError")` se cancelado e `SpeedTestError` em falha de rede.
 */
export async function runSpeedTest(config: EngineConfig, onProgress: ProgressHandler, signal: AbortSignal): Promise<SpeedTestResult> {
  const partial: Partial<Metrics> = {};
  let connection: ConnectionInfo | undefined;
  const emit = (p: Omit<Progress, "partial" | "connection">) => onProgress({ ...p, partial: { ...partial }, connection });

  emit({ phase: "latency", progress: 0, live: 0 });
  connection = await fetchConnectionInfo(config.baseUrl, signal);
  emit({ phase: "latency", progress: 0, live: 0 });

  const latency = await measureLatency(config.baseUrl, config.latencySamples, signal, (rtt, i) =>
    emit({ phase: "latency", progress: (i + 1) / config.latencySamples, live: rtt }),
  );
  partial.ping = latency.ping;
  partial.jitter = latency.jitter;

  emit({ phase: "download", progress: 0, live: 0 });
  partial.download = await measureDownload(
    {
      baseUrl: config.baseUrl,
      durationMs: config.downloadDurationMs,
      streams: config.downloadStreams,
      chunkBytes: config.downloadChunkBytes,
      warmupMs: config.warmupMs,
    },
    signal,
    (live, progress) => emit({ phase: "download", progress, live }),
  );

  emit({ phase: "upload", progress: 0, live: 0 });
  partial.upload = await measureUpload(
    {
      baseUrl: config.baseUrl,
      durationMs: config.uploadDurationMs,
      streams: config.uploadStreams,
      chunkBytes: config.uploadChunkBytes,
      warmupMs: config.warmupMs,
    },
    signal,
    (live, progress) => emit({ phase: "upload", progress, live }),
  );

  const result: SpeedTestResult = {
    id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: Date.now(),
    ping: round(latency.ping, 1),
    jitter: round(latency.jitter, 1),
    download: round(partial.download, 2),
    upload: round(partial.upload, 2),
    connection,
  };
  emit({ phase: "done", progress: 1, live: 0 });
  return result;
}

function round(v: number, digits: number): number {
  const f = 10 ** digits;
  return Math.round(v * f) / f;
}
