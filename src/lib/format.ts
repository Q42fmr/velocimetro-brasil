const nf = (digits: number) => new Intl.NumberFormat("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const NF0 = nf(0);
const NF1 = nf(1);
const NF2 = nf(2);

/** Mbps com precisão proporcional à magnitude: 0,85 · 9,4 · 123. */
export function formatMbps(v: number): string {
  if (!Number.isFinite(v) || v < 0) return "—";
  if (v < 10) return NF2.format(v);
  if (v < 100) return NF1.format(v);
  return NF0.format(v);
}

/** Milissegundos: 1 casa abaixo de 10 ms, inteiro acima. */
export function formatMs(v: number): string {
  if (!Number.isFinite(v) || v < 0) return "—";
  return v < 10 ? NF1.format(v) : NF0.format(v);
}

const DATE = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });
export function formatDateTime(epochMs: number): string {
  return DATE.format(new Date(epochMs));
}
