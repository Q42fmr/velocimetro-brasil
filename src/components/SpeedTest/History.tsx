import { formatDateTime, formatMbps, formatMs } from "@/lib/format";
import type { SpeedTestResult } from "@/lib/speedtest/types";
import styles from "./SpeedTest.module.css";

interface Props {
  items: SpeedTestResult[];
  onClear: () => void;
}

/** Últimos resultados salvos neste dispositivo (localStorage). */
export function History({ items, onClear }: Props) {
  if (items.length === 0) return null;
  return (
    <section className={styles.history} aria-labelledby="historico-titulo">
      <div className={styles.historyHead}>
        <h3 id="historico-titulo" className={styles.subTitle}>
          Histórico de testes neste dispositivo
        </h3>
        <button type="button" className="btn btn--ghost" onClick={onClear}>
          Limpar histórico
        </button>
      </div>
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Download</th>
              <th scope="col">Upload</th>
              <th scope="col">Ping</th>
              <th scope="col">Jitter</th>
              <th scope="col">Provedor</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id}>
                <td>
                  <time dateTime={new Date(r.timestamp).toISOString()}>{formatDateTime(r.timestamp)}</time>
                </td>
                <td>{formatMbps(r.download)} Mbps</td>
                <td>{formatMbps(r.upload)} Mbps</td>
                <td>{formatMs(r.ping)} ms</td>
                <td>{formatMs(r.jitter)} ms</td>
                <td>{r.connection?.isp ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.muted}>
        O histórico fica apenas no seu navegador (armazenamento local) e guarda os últimos 20 testes. Nada é enviado aos
        nossos servidores.
      </p>
    </section>
  );
}
