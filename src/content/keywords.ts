/**
 * Palavras-chave de SEO por página. Usadas em <meta name="keywords">, títulos e
 * naturalmente nos textos. Mantenha as principais no início de cada lista.
 *
 * Fonte: semântica dos concorrentes (brasilbandalarga, speedtest.net/pt,
 * minhaconexao) — substitua/complete com a planilha "speed / priority top".
 */
export const keywords = {
  /** Núcleo da marca — entra em todas as páginas. */
  core: [
    "teste de velocidade",
    "teste de velocidade de internet",
    "speed test",
    "velocímetro de internet",
    "medidor de velocidade",
  ],

  home: [
    "teste de velocidade",
    "teste de velocidade de internet",
    "speed test",
    "speedtest",
    "velocímetro",
    "velocímetro de internet",
    "medidor de velocidade",
    "medir velocidade da internet",
    "teste de internet",
    "teste de conexão",
    "velocidade de download",
    "velocidade de upload",
    "ping",
    "latência",
    "jitter",
    "banda larga",
    "teste de velocidade banda larga",
    "teste de velocidade wifi",
    "teste de velocidade fibra",
    "qual a velocidade da minha internet",
    "internet lenta",
    "Mbps",
  ],

  faq: [
    "perguntas frequentes teste de velocidade",
    "como medir a velocidade da internet",
    "por que minha internet está lenta",
    "velocidade contratada",
    "Anatel velocidade mínima",
    "diferença entre Mbps e MB/s",
    "ping alto",
    "teste de velocidade wifi ou cabo",
  ],

  glossary: [
    "glossário de internet",
    "o que é Mbps",
    "o que é ping",
    "o que é latência",
    "o que é jitter",
    "o que é banda larga",
    "o que é upload",
    "o que é download",
    "fibra óptica",
    "roteador",
    "endereço IP",
    "DNS",
    "provedor de internet",
  ],

  contact: ["fale conosco", "contato teste de velocidade", "suporte", "dúvidas sobre o teste"],

  privacy: ["política de privacidade", "LGPD", "proteção de dados", "dados pessoais"],
  terms: ["termos de uso", "condições de uso", "teste de velocidade gratuito"],
  cookies: ["política de cookies", "cookies", "armazenamento local", "preferências"],
} as const;

/** Junta núcleo + lista da página sem duplicatas, preservando a ordem. */
export function pageKeywords(page: keyof Omit<typeof keywords, "core">): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of [...keywords[page], ...keywords.core]) {
    const key = k.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(k);
    }
  }
  return out;
}
