import { formatMbps, formatMs } from "@/lib/format";
import type { Metrics, Phase } from "@/lib/speedtest/types";
import { RATING_LABEL, rateDownload, rateJitter, ratePing, rateUpload, type Rating } from "@/lib/speedtest/verdict";
import styles from "./SpeedTest.module.css";

interface CardSpec {
  key: keyof Metrics;
  label: string;
  hint: string;
  unit: string;
  color: string;
  phase: Phase;
  format: (v: number) => string;
  rate: (v: number) => Rating;
}

const CARDS: CardSpec[] = [
  { key: "ping", label: "Ping", hint: "Latência", unit: "ms", color: "var(--color-ping)", phase: "latency", format: formatMs, rate: ratePing },
  { key: "jitter", label: "Jitter", hint: "Variação", unit: "ms", color: "var(--color-jitter)", phase: "latency", format: formatMs, rate: rateJitter },
  { key: "download", label: "Download", hint: "Receber dados", unit: "Mbps", color: "var(--color-download)", phase: "download", format: formatMbps, rate: rateDownload },
  { key: "upload", label: "Upload", hint: "Enviar dados", unit: "Mbps", color: "var(--color-upload)", phase: "upload", format: formatMbps, rate: rateUpload },
];

interface Props {
  partial: Partial<Metrics>;
  phase: Phase;
  live: number;
  /** Mostra a classificação (só com o teste concluído). */
  rated: boolean;
}

export function ResultCards({ partial, phase, live, rated }: Props) {
  return (
    <ul className={styles.cards} aria-label="Resultados do teste">
      {CARDS.map((c) => {
        const final = partial[c.key];
        const active = phase === c.phase && final === undefined;
        const shown = final ?? (active && c.key !== "jitter" ? live : undefined);
        const rating = rated && final !== undefined ? c.rate(final) : undefined;
        return (
          <li key={c.key} className={styles.card} data-active={active} style={{ ["--card-color" as string]: c.color }}>
            <div className={styles.cardHead}>
              <span className={styles.cardDot} aria-hidden="true" />
              <span className={styles.cardLabel}>{c.label}</span>
              <span className={styles.cardHint}>{c.hint}</span>
            </div>
            <div className={styles.cardValue}>
              <span>{shown === undefined ? "—" : c.format(shown)}</span>
              <span className={styles.cardUnit}>{c.unit}</span>
            </div>
            {rating ? (
              <span className={styles.rating} data-rating={rating}>
                {RATING_LABEL[rating]}
              </span>
            ) : (
              <span className={styles.ratingPlaceholder} aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
