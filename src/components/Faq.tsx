import type { FaqItem } from "@/content/faq";
import styles from "./Faq.module.css";

interface Props {
  items: FaqItem[];
  idPrefix?: string;
}

/** Acordeão acessível de perguntas frequentes, sem JavaScript (details/summary nativos). */
export function Faq({ items, idPrefix }: Props) {
  const prefix = idPrefix ?? "faq";
  return (
    <div className={styles.faq}>
      {items.map((item) => (
        <details key={item.id} id={`${prefix}-${item.id}`} className={styles.item}>
          <summary className={styles.summary}>
            <span role="heading" aria-level={3} className={styles.question}>
              {item.question}
            </span>
          </summary>
          <div className={styles.answer}>
            {item.answer.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
