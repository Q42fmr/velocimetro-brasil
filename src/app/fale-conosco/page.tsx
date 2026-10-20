
import { ContentPage } from "@/components/ContentPage";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { pageKeywords } from "@/content/keywords";

export const metadata = buildMetadata({
  title: "Fale conosco",
  description:
    "Entre em contato com o Velocímetro Brasil para tirar dúvidas sobre o teste de velocidade, relatar problemas técnicos no site ou enviar sugestões e elogios.",
  path: "fale-conosco.html",
  keywords: pageKeywords("contact"),
});

export default function ContatoPage() {
  return (
    <ContentPage
      title="Fale conosco"
      lead="Tem dúvidas sobre o teste de velocidade, encontrou um resultado inesperado ou quer sugerir uma melhoria? Escreva para a gente."
      crumbs={[{ href: "fale-conosco.html", label: "Fale conosco" }]}
      wide
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Fale conosco",
          url: `${site.url}/fale-conosco/`,
          mainEntity: {
            "@type": "Organization",
            name: site.name,
            legalName: site.legal.razaoSocial,
            taxID: site.legal.cnpj,
            email: site.contactEmail,
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: site.contactEmail,
                availableLanguage: "Portuguese",
              },
            ],
          },
        }}
      />

      <p>
        Antes de nos escrever, vale a pena conferir o <a href="faq.html" >FAQ</a>, onde
        respondemos às dúvidas mais comuns sobre o teste de velocidade, como funciona a medição e
        por que o resultado pode variar entre tentativas. Se a sua pergunta não estiver lá, use o
        formulário abaixo — respondemos pelo e-mail informado.
      </p>

      <ContactForm />
    </ContentPage>
  );
}
