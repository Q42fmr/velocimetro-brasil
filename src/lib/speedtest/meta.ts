import type { ConnectionInfo } from "./types";

interface CfMeta {
  clientIp?: string;
  asn?: number;
  asOrganization?: string;
  city?: string;
  region?: string;
  country?: string;
  colo?: { iata?: string; city?: string; cca2?: string } | string;
}

/**
 * Informações da conexão (IP, provedor, cidade, servidor) via `GET /meta`.
 * Opcional: qualquer falha devolve `undefined` e o teste segue normalmente.
 */
export async function fetchConnectionInfo(baseUrl: string, signal: AbortSignal, timeoutMs = 4000): Promise<ConnectionInfo | undefined> {
  const ctl = new AbortController();
  const onAbort = () => ctl.abort();
  signal.addEventListener("abort", onAbort, { once: true });
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await fetch(`${baseUrl}/meta`, { cache: "no-store", signal: ctl.signal });
    if (!res.ok) return undefined;
    const m = (await res.json()) as CfMeta;
    const colo = typeof m.colo === "string" ? { iata: m.colo } : m.colo;
    return {
      ip: m.clientIp,
      isp: m.asOrganization,
      asn: m.asn,
      city: m.city,
      region: m.region,
      country: m.country,
      server: colo?.iata ? { code: colo.iata, city: colo.city, country: colo.cca2 } : undefined,
    };
  } catch {
    return undefined;
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", onAbort);
  }
}
