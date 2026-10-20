import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { LEGAL_LAST_UPDATED } from "@/content/legal";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const legal = new Date(LEGAL_LAST_UPDATED);
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...site.nav
      .filter((l) => l.href !== "index.html")
      .map((l) => ({ url: absoluteUrl(l.href), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...site.footerLinks.map((l) => ({ url: absoluteUrl(l.href), lastModified: legal, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
