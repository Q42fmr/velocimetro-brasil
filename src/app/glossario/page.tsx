import { ContentPage } from "@/components/ContentPage";
import { JsonLd } from "@/components/JsonLd";
import { glossaryTerms } from "@/content/glossary";
import { pageKeywords } from "@/content/keywords";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  title: "Glossário de internet: Mbps, ping, latência, jitter e banda larga",
  description:
    "Entenda os principais termos de internet e banda larga: Mbps, MB/s, download, upload, ping, latência, jitter, Wi-Fi, fibra óptica e muito mais.",
  path: "/glossario/",
  keywords: pageKeywords("glossary"),
});

function normalizeLetter(term: string): string {
  const first = term
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .charAt(0)
    .toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
}

const termsById = new Map(glossaryTerms.map((t) => [t.id, t]));

const groups = new Map<string, typeof glossaryTerms>();
for (const term of glossaryTerms) {
  const letter = normalizeLetter(term.term);
  const bucket = groups.get(letter);
  if (bucket) {
    bucket.push(term);
  } else {
    groups.set(letter, [term]);
  }
}
const letters = [...groups.keys()];

export default function GlossarioPage() {
  return (
    <ContentPage
      title="Glossário de internet"
      lead="Os principais termos usados em um teste de velocidade de internet, explicados em linguagem simples: de Mbps e MB/s a ping, latência, jitter e tecnologias de banda larga."
      crumbs={[{ href: "/glossario/", label: "Glossário" }]}
      wide
    >
      <nav aria-label="Índice alfabético" className="prose">
        <ul className={styles.alphabetIndex}>
          {letters.map((letter) => (
            <li key={letter}>
              <a href={`#letra-${letter.toLowerCase()}`}>{letter}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="prose">
        {letters.map((letter) => (
          <section
            key={letter}
            id={`letra-${letter.toLowerCase()}`}
            className={styles.letterSection}
          >
            <h2>{letter}</h2>
            <dl>
              {groups.get(letter)!.map((term) => (
                <div key={term.id}>
                  <dt id={term.id}>{term.term}</dt>
                  <dd>
                    {term.definition.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                    {term.related && term.related.length > 0 ? (
                      <p className={styles.related}>
                        Veja também:{" "}
                        {term.related
                          .map((relatedId) => termsById.get(relatedId))
                          .filter((related): related is NonNullable<typeof related> => Boolean(related))
                          .map((related, index, array) => (
                            <span key={related.id}>
                              <a href={`#${related.id}`}>{related.term}</a>
                              {index < array.length - 1 ? ", " : ""}
                            </span>
                          ))}
                      </p>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Glossário de internet",
          hasDefinedTerm: glossaryTerms.map((term) => ({
            "@type": "DefinedTerm",
            name: term.term,
            description: term.definition.join("\n\n"),
            "@id": `${absoluteUrl("/glossario/")}#${term.id}`,
          })),
        }}
      />
    </ContentPage>
  );
}
