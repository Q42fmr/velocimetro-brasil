import type { Metrics } from "@/lib/speedtest/types";
import { activityVerdicts, type ActivityVerdict, type ActivityVerdicts } from "@/lib/speedtest/verdict";
import styles from "./SpeedTest.module.css";

const ROWS: { key: keyof ActivityVerdicts; title: string }[] = [
  { key: "navegacao", title: "Navegação e redes sociais" },
  { key: "streaming", title: "Streaming de vídeo" },
  { key: "videochamada", title: "Videochamadas e home office" },
  { key: "jogos", title: "Jogos online" },
];

/** "O que dá para fazer com esta conexão" — análise detalhada do resultado. */
export function Verdict({ metrics }: { metrics: Metrics }) {
  const v = activityVerdicts(metrics);
  return (
    <section className={styles.verdict} aria-labelledby="analise-titulo">
      <h3 id="analise-titulo" className={styles.subTitle}>
        Análise detalhada da sua conexão
      </h3>
      <ul className={styles.verdictList}>
        {ROWS.map(({ key, title }) => {
          const item: ActivityVerdict = v[key];
          return (
            <li key={key} className={styles.verdictItem} data-ok={item.ok}>
              <span className={styles.verdictIcon} aria-hidden="true">
                {item.ok ? "✓" : "!"}
              </span>
              <div>
                <strong>{title}:</strong> {item.label}
                <p className={styles.verdictDetail}>{item.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
