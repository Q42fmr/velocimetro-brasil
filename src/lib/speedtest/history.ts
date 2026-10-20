import type { SpeedTestResult } from "./types";

export const HISTORY_KEY = "vb:history";
export const HISTORY_MAX = 20;

/** Novo resultado na frente; corta no limite. Não altera a lista original. */
export function pushHistory(list: readonly SpeedTestResult[], result: SpeedTestResult, max = HISTORY_MAX): SpeedTestResult[] {
  return [result, ...list].slice(0, max);
}

function isResult(v: unknown): v is SpeedTestResult {
  if (typeof v !== "object" || v === null) return false;
  const r = v as Record<string, unknown>;
  return (
    typeof r.id === "string" &&
    typeof r.timestamp === "number" &&
    typeof r.ping === "number" &&
    typeof r.jitter === "number" &&
    typeof r.download === "number" &&
    typeof r.upload === "number"
  );
}

/** Lê o histórico com tolerância a JSON corrompido ou entradas inválidas. */
export function loadHistory(storage: Storage): SpeedTestResult[] {
  try {
    const raw = storage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isResult) : [];
  } catch {
    return [];
  }
}

export function saveHistory(storage: Storage, list: readonly SpeedTestResult[]): void {
  try {
    storage.setItem(HISTORY_KEY, JSON.stringify(list));
  } catch {
    /* cota cheia ou armazenamento bloqueado — histórico apenas em memória */
  }
}
