/** Mediana (0 para lista vazia). Não altera o array de entrada. */
export function median(values: readonly number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 === 1 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
}

/** Jitter: média das diferenças absolutas entre amostras consecutivas de latência. */
export function jitter(samples: readonly number[]): number {
  if (samples.length < 2) return 0;
  let sum = 0;
  for (let i = 1; i < samples.length; i++) sum += Math.abs(samples[i]! - samples[i - 1]!);
  return sum / (samples.length - 1);
}

/** bytes em `ms` milissegundos → megabits por segundo (1 Mb = 10⁶ bits, padrão das operadoras). */
export function toMbps(bytes: number, ms: number): number {
  if (ms <= 0) return 0;
  return (bytes * 8) / (ms / 1000) / 1_000_000;
}

interface Sample {
  t: number;
  bytes: number; // acumulado
}

/**
 * Acumula bytes transferidos ao longo do tempo (todas as conexões somadas) e
 * calcula velocidade instantânea (janela móvel) e média (descartando o ramp-up).
 * Recebe timestamps de fora → determinístico e testável.
 */
export class ThroughputMeter {
  private readonly samples: Sample[] = [];
  private total = 0;

  constructor(private readonly startT: number) {}

  get totalBytes(): number {
    return this.total;
  }

  addBytes(t: number, delta: number): void {
    this.total += delta;
    this.samples.push({ t, bytes: this.total });
  }

  /** Mbps nos últimos `windowMs` (ou desde o início, se ainda não houver histórico suficiente). */
  instant(now: number, windowMs: number): number {
    if (this.samples.length === 0) return 0;
    const cutoff = now - windowMs;
    let base: Sample = { t: this.startT, bytes: 0 };
    for (const s of this.samples) {
      if (s.t <= cutoff) base = s;
      else break;
    }
    return toMbps(this.total - base.bytes, now - base.t);
  }

  /**
   * Mbps médio entre `startT + warmupMs` e a última amostra. Se o teste foi mais
   * curto que o aquecimento, usa o intervalo completo.
   */
  average(warmupMs: number): number {
    const last = this.samples[this.samples.length - 1];
    if (!last) return 0;
    const from = this.startT + warmupMs;
    let base: Sample = { t: this.startT, bytes: 0 };
    if (from < last.t) {
      for (const s of this.samples) {
        if (s.t <= from) base = s;
        else break;
      }
    }
    return toMbps(last.bytes - base.bytes, last.t - base.t);
  }
}
