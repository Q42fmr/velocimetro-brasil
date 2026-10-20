import type { NextConfig } from "next";

/** Subcaminho quando o site é servido fora da raiz (ex.: GitHub Pages: "/velocimetro-brasil"). */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || undefined;

const nextConfig: NextConfig = {
  // Site 100% estático: `next build` gera a pasta `out/` pronta para qualquer hospedagem.
  output: "export",
  basePath,
  // `/faq` → `out/faq/index.html` — funciona em qualquer servidor estático sem rewrites.
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};
export default nextConfig;
