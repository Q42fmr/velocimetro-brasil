import type { ConnectionInfo } from "@/lib/speedtest/types";
import styles from "./SpeedTest.module.css";

/** IP, provedor, localização aproximada e servidor de medição. Oculto se nada foi obtido. */
export function ConnectionPanel({ info }: { info?: ConnectionInfo }) {
  if (!info || (!info.ip && !info.isp && !info.server)) return null;
  const place = [info.city, info.region, info.country].filter(Boolean).join(", ");
  const server = info.server ? [info.server.city, info.server.country].filter(Boolean).join(", ") || info.server.code : undefined;
  return (
    <dl className={styles.connection} aria-label="Informações da conexão">
      {info.isp ? (
        <div>
          <dt>Provedor</dt>
          <dd>
            {info.isp}
            {info.asn ? <span className={styles.muted}> (AS{info.asn})</span> : null}
          </dd>
        </div>
      ) : null}
      {info.ip ? (
        <div>
          <dt>Seu IP</dt>
          <dd>
            <code>{info.ip}</code>
          </dd>
        </div>
      ) : null}
      {place ? (
        <div>
          <dt>Localização aproximada</dt>
          <dd>{place}</dd>
        </div>
      ) : null}
      {server ? (
        <div>
          <dt>Servidor de teste</dt>
          <dd>
            {server}
            {info.server?.code ? <span className={styles.muted}> ({info.server.code})</span> : null}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
