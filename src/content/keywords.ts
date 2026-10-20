/**
 * Palavras-chave de SEO por página. Usadas em <meta name="keywords">, títulos e
 * naturalmente nos textos. Mantenha as principais no início de cada lista.
 *
 * Fonte: planilha "speed test", coluna Priority = top (42 termos; volume mensal
 * médio entre parênteses). Erros de digitação do relatório ("velocidadevivo",
 * "fat teste") ficam só no meta keywords — nunca em texto visível.
 */
export const keywords = {
  /** Núcleo da marca — entra em todas as páginas. */
  core: [
    "teste de velocidade", // 5.000.000
    "teste de velocidade de internet", // 500.000
    "velocidade da internet", // 500.000
    "medidor de internet", // 500.000
    "teste de internet", // 500.000
  ],

  home: [
    "teste de velocidade", // 5.000.000
    "teste de velocidade de internet", // 500.000
    "teste de velocidade da internet",
    "teste de velocidade internet",
    "teste velocidade de internet",
    "teste velocidade internet",
    "teste velocidade",
    "velocidade da internet", // 500.000
    "velocidade internet",
    "velocidade de internet", // 50.000
    "medidor de internet", // 500.000
    "medidor de velocidade", // 50.000
    "teste de internet", // 500.000
    "teste internet",
    "testar internet",
    "testar velocidade internet",
    "teste de conexão", // 50.000
    "teste de speed", // 5.000
    "wifi teste", // 5.000
    "sinal wifi teste",
    "teste de velocidade de internet residencial", // 5.000
    "consultar velocidade da minha internet",
    "internet rapida",
    "internet de alta velocidade",
    "velocidade do site",
    "velocímetro de internet",
    "speed test",
  ],

  /** Página "Teste de velocidade por operadora". */
  operadoras: [
    "teste de velocidade vivo", // 50.000
    "teste de velocidade da vivo", // 50.000
    "teste de velocidadevivo", // 50.000 (grafia do relatório)
    "assine claro internet", // 500
    "teste claro internet",
    "rjnet teste velocimetro", // 500
    "rjnet velocimetro teste", // 500
    "teste de velocidade de internet residencial",
    "internet de alta velocidade",
    "internet rapida",
    "teste de velocidade oi fibra",
    "teste de velocidade tim",
  ],

  /** Página "Comparativo de medidores". */
  comparativo: [
    "brasil banda larga teste de velocidade", // 500
    "brasil banda larga teste", // 5.000
    "teste banda larga brasil", // 50
    "brasilbandalarga com br teste de velocidade", // 50
    "eaq teste rapido", // 50
    "speedtest by ookla teste de velocidade de conexão da internet", // 5.000
    "fast velocidade", // 50.000
    "fast com velocidade", // 500
    "fat teste de velocidade", // 50 (grafia do relatório)
    "nperf teste de velocidade de internet", // 500
    "nperf velocidade", // 500
    "teste de speed",
    "medidor de velocidade",
    "velocidade do site",
  ],

  faq: [
    "perguntas frequentes teste de velocidade",
    "consultar velocidade da minha internet",
    "velocidade do site",
    "sinal wifi teste",
    "wifi teste",
    "teste de velocidade vivo",
    "brasil banda larga teste",
    "como medir a velocidade da internet",
    "por que minha internet está lenta",
    "velocidade contratada",
    "Anatel velocidade mínima",
    "diferença entre Mbps e MB/s",
  ],

  glossary: [
    "glossário de internet",
    "velocidade de internet",
    "medidor de velocidade",
    "o que é Mbps",
    "o que é ping",
    "o que é latência",
    "o que é jitter",
    "o que é banda larga",
    "internet de alta velocidade",
    "brasil banda larga",
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
