import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: `next build` gera a pasta `out/` pronta para qualquer hospedagem.
  output: "export",
  // Assets referenciados por caminho relativo ("./_next/...") e páginas planas na raiz
  // ("faq.html"): a pasta `out/` funciona em qualquer servidor, em subpastas e até aberta
  // direto do disco (file://), sem configurar domínio ou base path.
  assetPrefix: "./",
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
