import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export interface Crumb {
  /** Arquivo relativo à raiz do site, ex.: "faq.html". */
  href: string;
  label: string;
}

/** Trilha de navegação + BreadcrumbList (schema.org). O último item é a página atual. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ href: "index.html", label: "Início" }, ...items];
  return (
    <nav aria-label="Trilha de navegação" className="breadcrumbs">
      <ol>
        {trail.map((c, i) =>
          i === trail.length - 1 ? (
            <li key={c.href} aria-current="page">
              {c.label}
            </li>
          ) : (
            <li key={c.href}>
              <a href={c.href}>{c.label}</a>
            </li>
          ),
        )}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: absoluteUrl(c.href),
          })),
        }}
      />
    </nav>
  );
}
