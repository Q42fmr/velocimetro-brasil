import type { Metrics } from "./types";

export type Rating = "excelente" | "boa" | "regular" | "ruim";

export const RATING_LABEL: Record<Rating, string> = {
  excelente: "Excelente",
  boa: "Boa",
  regular: "Regular",
  ruim: "Ruim",
};

/** Limiares "maior é melhor": [excelente, boa, regular]. */
function rateHigh(value: number, [a, b, c]: readonly [number, number, number]): Rating {
  if (value >= a) return "excelente";
  if (value >= b) return "boa";
  if (value >= c) return "regular";
  return "ruim";
}

/** Limiares "menor é melhor": [excelente, boa, regular]. */
function rateLow(value: number, [a, b, c]: readonly [number, number, number]): Rating {
  if (value <= a) return "excelente";
  if (value <= b) return "boa";
  if (value <= c) return "regular";
  return "ruim";
}

export function rateDownload(mbps: number): Rating {
  return rateHigh(mbps, [100, 25, 10]);
}
export function rateUpload(mbps: number): Rating {
  return rateHigh(mbps, [50, 10, 3]);
}
export function ratePing(ms: number): Rating {
  return rateLow(ms, [20, 50, 100]);
}
export function rateJitter(ms: number): Rating {
  return rateLow(ms, [5, 15, 30]);
}

export interface ActivityVerdict {
  ok: boolean;
  label: string;
  detail: string;
}

export interface ActivityVerdicts {
  navegacao: ActivityVerdict;
  streaming: ActivityVerdict;
  videochamada: ActivityVerdict;
  jogos: ActivityVerdict;
}

/** O que a conexão medida aguenta, em linguagem de usuário. */
export function activityVerdicts(m: Metrics): ActivityVerdicts {
  const navegacao: ActivityVerdict =
    m.download >= 10 && m.ping <= 150
      ? { ok: true, label: "Rápida", detail: "Páginas, redes sociais e e-mail carregam sem espera." }
      : m.download >= 3
        ? { ok: true, label: "Aceitável", detail: "Sites carregam, mas páginas pesadas podem demorar." }
        : { ok: false, label: "Lenta", detail: "Navegação básica com esperas frequentes." };

  const streaming: ActivityVerdict =
    m.download >= 25
      ? { ok: true, label: "4K", detail: "Streaming em ultra-alta definição em mais de uma tela." }
      : m.download >= 8
        ? { ok: true, label: "Full HD", detail: "Vídeo em 1080p sem travar em uma tela." }
        : m.download >= 3
          ? { ok: true, label: "HD", detail: "Vídeo em 720p; 1080p pode sofrer buffering." }
          : { ok: false, label: "Instável", detail: "Vídeos em baixa qualidade e com pausas para carregar." };

  const videochamada: ActivityVerdict =
    m.upload >= 3 && m.download >= 3 && m.ping <= 150
      ? { ok: true, label: "Boa qualidade", detail: "Chamadas em HD com várias pessoas." }
      : m.upload >= 1.5 && m.download >= 1.5
        ? { ok: true, label: "Qualidade reduzida", detail: "Funciona, mas com imagem comprimida e possíveis cortes." }
        : { ok: false, label: "Instável", detail: "Upload insuficiente para transmitir vídeo com fluidez." };

  const jogos: ActivityVerdict =
    m.ping <= 50 && m.jitter <= 15
      ? { ok: true, label: "Ideal", detail: "Resposta rápida e estável para jogos online competitivos." }
      : m.ping <= 100 && m.jitter <= 30
        ? { ok: true, label: "Jogável", detail: "Latência perceptível, mas suficiente para a maioria dos jogos." }
        : { ok: false, label: "Lag", detail: "Ping ou jitter altos: atrasos e travamentos em jogos online." };

  return { navegacao, streaming, videochamada, jogos };
}
