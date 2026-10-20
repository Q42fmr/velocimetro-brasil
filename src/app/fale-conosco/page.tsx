import { ContentPage } from "@/components/ContentPage";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { pageKeywords } from "@/content/keywords";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

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
          url: absoluteUrl("fale-conosco.html"),
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

      <div className={styles.grid}>
        <div className="prose">
          <p>
            Antes de nos escrever, vale a pena conferir o <a href="faq.html">FAQ</a>, onde respondemos às dúvidas mais
            comuns sobre o teste de velocidade, como funciona a medição e por que o resultado pode variar entre
            tentativas. Se a sua pergunta não estiver lá, envie uma mensagem pelo formulário da página inicial —
            respondemos pelo e-mail informado.
          </p>
          <p>
            <a href="index.html#contacts" className="btn btn--lg">
              Enviar mensagem
            </a>
          </p>
          <h2>Outras formas de contato</h2>
          <p>
            E-mail: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            <br />
            Atendimento: segunda a sexta, das 9h às 18h (horário de Brasília).
          </p>
        </div>

        <aside className={styles.card} aria-labelledby="dados-empresa">
          <h2 id="dados-empresa" className="card__title">
            Dados da empresa
          </h2>
          <address className={styles.address}>
            <span>{site.legal.razaoSocial}</span>
            <span>CNPJ: {site.legal.cnpj}</span>
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </address>
          <p className="card__text">
            Assuntos relacionados a dados pessoais (LGPD) podem ser tratados pelo mesmo e-mail — veja a{" "}
            <a href="politica-de-privacidade.html">Política de Privacidade</a>.
          </p>
        </aside>
      </div>
    </ContentPage>
  );
}
