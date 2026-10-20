import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export interface Crumb {
  href: string;
  label: string;
}

/** Trilha de navegação + BreadcrumbList (schema.org). O último item é a página atual. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ href: "/", label: "Início" }, ...items];
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
              <Link href={c.href}>{c.label}</Link>
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
