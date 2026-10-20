export type Phase = "idle" | "latency" | "download" | "upload" | "done" | "error" | "cancelled";

export interface ConnectionInfo {
  ip?: string;
  isp?: string;
  asn?: number;
  city?: string;
  region?: string;
  country?: string;
  /** Ponto de presença do servidor de medição (código IATA + cidade). */
  server?: { code: string; city?: string; country?: string };
}

export interface SpeedTestResult {
  id: string;
  /** Epoch em milissegundos. */
  timestamp: number;
  /** ms */
  ping: number;
  /** ms */
  jitter: number;
  /** Mbps */
  download: number;
  /** Mbps */
  upload: number;
  connection?: ConnectionInfo;
}

export type Metrics = Pick<SpeedTestResult, "ping" | "jitter" | "download" | "upload">;

export interface Progress {
  phase: Phase;
  /** 0..1 da fase atual. */
  progress: number;
  /** Valor instantâneo da fase (ms na latência, Mbps nas demais). */
  live: number;
  partial: Partial<Metrics>;
  connection?: ConnectionInfo;
  error?: string;
}
