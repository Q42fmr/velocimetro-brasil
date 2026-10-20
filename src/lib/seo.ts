import type { Metadata } from "next";
import { site } from "@/config/site";

export interface PageSeo {
  /** Título da página (sem o nome do site — o template adiciona). */
  title: string;
  description: string;
  /** Caminho absoluto com barra final, ex.: "/faq/". */
  path: string;
  keywords: readonly string[];
  /** Título completo da aba (ignora o template). Útil na home. */
  absoluteTitle?: string;
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

export function buildMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.path);
  const ogTitle = seo.absoluteTitle ?? `${seo.title} | ${site.name}`;
  return {
    title: seo.absoluteTitle ? { absolute: seo.absoluteTitle } : seo.title,
    description: seo.description,
    keywords: [...seo.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url,
      title: ogTitle,
      description: seo.description,
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: seo.description,
      images: [absoluteUrl("/og.png")],
    },
    robots: { index: true, follow: true },
  };
}
