import type { Phase } from "./types";

export class SpeedTestError extends Error {
  constructor(
    message: string,
    public readonly phase: Phase,
  ) {
    super(message);
    this.name = "SpeedTestError";
  }
}

export function isAbortError(e: unknown): boolean {
  return e instanceof DOMException ? e.name === "AbortError" : e instanceof Error && e.name === "AbortError";
}

export function throwIfAborted(signal: AbortSignal): void {
  if (signal.aborted) throw new DOMException("Teste cancelado", "AbortError");
}

/** URL única por requisição (evita cache em qualquer camada). */
export function downloadUrl(baseUrl: string, bytes: number): string {
  return `${baseUrl}/__down?bytes=${bytes}&r=${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function uploadUrl(baseUrl: string): string {
  return `${baseUrl}/__up?r=${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Tempo de processamento no servidor (ms) informado em `Server-Timing`
 * (`cfSpeedEdge;dur=…, cfSpeedWorker;dur=…` ou `cfRequestDuration;dur=…`).
 * Subtraído da latência para refletir só o tempo de rede.
 */
export function serverTimeMs(res: Response): number {
  const header = res.headers.get("server-timing");
  if (!header) return 0;
  const legacy = header.match(/(?:^|,\s*)cfReq(?:uest)?Dur(?:ation)?;\s*dur=([0-9.]+)/i);
  if (legacy?.[1]) return Number(legacy[1]);
  let sum = 0;
  for (const m of header.matchAll(/(?:^|,\s*)cfSpeed[a-zA-Z]*;\s*dur=([0-9.]+)/gi)) sum += Number(m[1]);
  return sum;
}

/** AbortController filho: aborta quando o pai abortar ou quando `abort()` for chamado localmente. */
export function childController(parent: AbortSignal): AbortController {
  const child = new AbortController();
  if (parent.aborted) child.abort(parent.reason);
  else parent.addEventListener("abort", () => child.abort(parent.reason), { once: true });
  return child;
}

export function sleep(ms: number): Promise<void> {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
}
