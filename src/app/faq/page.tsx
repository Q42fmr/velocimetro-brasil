
import { ContentPage } from "@/components/ContentPage";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { faqItems } from "@/content/faq";
import { pageKeywords } from "@/content/keywords";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ – Perguntas frequentes sobre o teste de velocidade",
  description:
    "Tire suas dúvidas sobre o teste de velocidade de internet: download, upload, ping, jitter, Mbps, regra da Anatel e como melhorar sua conexão.",
  path: "faq.html",
  keywords: pageKeywords("faq"),
});

export default function FaqPage() {
  return (
    <ContentPage
      title="Perguntas frequentes sobre o teste de velocidade"
      lead="Reunimos as dúvidas mais comuns de quem usa o Velocímetro Brasil para medir a velocidade da internet, entender os resultados e comparar com a velocidade contratada."
      crumbs={[{ href: "faq.html", label: "FAQ" }]}
    >
      <p>
        Antes de rodar um novo teste de velocidade, vale conhecer o que cada número do resultado
        significa e por que ele pode variar de uma medição para outra. Abaixo estão as respostas
        para as perguntas mais frequentes sobre download, upload, ping, latência, jitter e a
        velocidade contratada junto ao seu provedor.
      </p>
      <Faq items={faqItems} />
      <div className="notice">
        <p>
          <strong>Não encontrou sua dúvida?</strong> Consulte nosso{" "}
          <a href="glossario.html" >glossário de termos de internet</a> ou{" "}
          <a href="fale-conosco.html" >fale conosco</a> diretamente.
        </p>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer.join("\n\n"),
            },
          })),
        }}
      />
    </ContentPage>
  );
}
