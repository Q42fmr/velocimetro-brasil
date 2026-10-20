import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: `next build` gera a pasta `out/` pronta para qualquer hospedagem.
  output: "export",
  // `/faq` → `out/faq/index.html` — funciona em qualquer servidor estático sem rewrites.
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
