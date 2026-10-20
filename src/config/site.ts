/**
 * Configuração central do site. Tudo que é "marca", dados jurídicos e
 * endereços externos vive aqui — troque em um lugar só.
 */
export const site = {
  name: "Velocímetro Brasil",
  tagline: "Teste de velocidade de internet",
  /** URL canônica (sem barra final). `NEXT_PUBLIC_SITE_URL` sobrescreve no build (ex.: preview no GitHub Pages). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://velocimetrobrasil.com.br").replace(/\/$/, ""),
  locale: "pt_BR",
  lang: "pt-BR",
  description:
    "Teste de velocidade de internet grátis: meça a velocidade da internet (download, upload, ping e jitter) no Wi-Fi, fibra ou 4G com o medidor de internet do Velocímetro Brasil.",

  /** Dados jurídicos exibidos no rodapé, Termos de Uso e Política de Privacidade. */
  legal: {
    razaoSocial: "Telecom Italia Latam Participações e Gestão Administrativa Ltda.",
    cnpj: "60.502.291/0001-48",
  },

  /** E-mail de contato — usado na página Fale Conosco e nas políticas. */
  contactEmail: "contato@velocimetrobrasil.com.br",

  /** Servidor de medição. Precisa expor `GET /__down?bytes=N` e `POST /__up` com CORS liberado. */
  speedtest: {
    baseUrl: "https://speed.cloudflare.com",
    /** Duração alvo de cada fase (ms). */
    downloadDurationMs: 10_000,
    uploadDurationMs: 10_000,
    /** Conexões paralelas por fase. */
    downloadStreams: 6,
    uploadStreams: 4,
    /** Amostras de latência (a primeira é descartada: aquecimento da conexão). */
    latencySamples: 12,
    /** Tamanho de cada requisição (bytes). */
    downloadChunkBytes: 25_000_000,
    uploadChunkBytes: 20_000_000,
    /** Janela inicial ignorada no cálculo final (ramp-up do TCP). */
    warmupMs: 1_500,
  },

  /** Links internos são relativos à pasta do site (arquivos planos): funcionam em qualquer servidor, subpasta ou file://. */
  nav: [
    { href: "index.html", label: "Teste de velocidade" },
    { href: "operadoras.html", label: "Por operadora" },
    { href: "comparativo.html", label: "Comparativo" },
    { href: "faq.html", label: "FAQ" },
    { href: "glossario.html", label: "Glossário" },
    { href: "fale-conosco.html", label: "Fale conosco" },
  ],

  footerLinks: [
    { href: "politica-de-privacidade.html", label: "Política de Privacidade" },
    { href: "termos-de-uso.html", label: "Termos de Uso" },
    { href: "politica-de-cookies.html", label: "Política de Cookies" },
  ],
} as const;

export type SiteConfig = typeof site;
