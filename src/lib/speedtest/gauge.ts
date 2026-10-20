/** Marcas do velocímetro (Mbps). Escala não linear: detalhe nas faixas baixas, alcance até 1 Gbps. */
export const GAUGE_STOPS = [0, 1, 5, 10, 50, 100, 250, 500, 1000] as const;

/** Mbps → fração 0..1 do arco, linear entre marcas consecutivas. */
export function valueToFraction(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  const last = GAUGE_STOPS.length - 1;
  if (value >= GAUGE_STOPS[last]!) return 1;
  for (let i = 0; i < last; i++) {
    const lo = GAUGE_STOPS[i]!;
    const hi = GAUGE_STOPS[i + 1]!;
    if (value <= hi) return (i + (value - lo) / (hi - lo)) / last;
  }
  return 1;
}
