import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";
import { site } from "@/config/site";
import { pageKeywords } from "@/content/keywords";
import { LEGAL_LAST_UPDATED, LEGAL_LAST_UPDATED_LABEL } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Termos de Uso",
  description:
    "Termos de Uso do Velocímetro Brasil: condições para utilizar o teste de velocidade de internet gratuito, limites de responsabilidade e regras de uso do serviço.",
  path: "/termos-de-uso/",
  keywords: pageKeywords("terms"),
});

export default function TermosDeUsoPage() {
  return (
    <ContentPage
      title="Termos de Uso"
      lead="Condições gerais para o uso do teste de velocidade de internet gratuito oferecido pelo Velocímetro Brasil."
      crumbs={[{ href: "/termos-de-uso/", label: "Termos de Uso" }]}
    >
      <p className="field__hint">
        Última atualização: <time dateTime={LEGAL_LAST_UPDATED}>{LEGAL_LAST_UPDATED_LABEL}</time>
      </p>

      <h2>1. Identificação da empresa</h2>
      <p>
        O {site.name} ({site.url}) é mantido por <strong>{site.legal.razaoSocial}</strong>, CNPJ{" "}
        {site.legal.cnpj}. Ao acessar ou utilizar o site, você concorda com estes Termos de Uso.
        Se não concordar com algum ponto, recomendamos não utilizar o serviço.
      </p>

      <h2>2. Aceitação dos termos</h2>
      <p>
        O uso do teste de velocidade de internet, das páginas informativas (FAQ, Glossário) e do
        formulário de contato implica aceitação integral destes termos. Caso sejam feitas
        alterações relevantes, a data no topo desta página será atualizada.
      </p>

      <h2>3. Descrição do serviço</h2>
      <p>
        O {site.name} oferece um teste de velocidade de internet gratuito, sem necessidade de
        cadastro ou login, que mede download, upload, ping (latência) e jitter da sua conexão —
        seja banda larga fixa, Wi-Fi ou fibra óptica. O teste é executado inteiramente no
        navegador, utilizando o servidor de medição speed.cloudflare.com.
      </p>

      <h2>4. Natureza dos resultados</h2>
      <p>
        Os resultados exibidos são <strong>estimativas</strong> da velocidade da sua conexão no
        momento do teste, podendo variar conforme diversos fatores, entre eles: uso de Wi-Fi em
        vez de cabo, modelo e capacidade do roteador, distância até o roteador, número de
        dispositivos conectados simultaneamente, qualidade do cabeamento, horário de pico na
        internet, carga do servidor de medição e desempenho do próprio aparelho usado no teste.
        Por isso, os resultados <strong>não substituem</strong> medições oficiais realizadas por
        ferramentas homologadas, como o aplicativo da Anatel (SMP) ou o Índice de Qualidade de
        Experiência do Usuário (EAQ), e <strong>não têm valor de laudo técnico</strong> para fins
        de contestação formal junto ao seu provedor de internet.
      </p>

      <h2>5. Uso permitido e uso proibido</h2>
      <p>
        Você pode utilizar o {site.name} livremente para medir a sua própria conexão. É proibido:
      </p>
      <ul>
        <li>Automatizar requisições em massa ou utilizar robôs/scripts para sobrecarregar o serviço;</li>
        <li>Tentar interferir no funcionamento do site, dos servidores de medição ou de outros usuários;</li>
        <li>Copiar, reproduzir ou redistribuir o conteúdo, o layout ou o código do site sem autorização;</li>
        <li>Utilizar o serviço para qualquer finalidade ilícita ou que viole direitos de terceiros.</li>
      </ul>

      <h2>6. Propriedade intelectual</h2>
      <p>
        Os textos, a marca {site.name}, o layout, os ícones e o código-fonte do site pertencem a{" "}
        {site.legal.razaoSocial} ou a seus licenciantes, sendo protegidos pela legislação de
        direitos autorais e propriedade intelectual aplicável. Nenhuma licença é concedida além do
        uso pessoal e não comercial do teste de velocidade.
      </p>

      <h2>7. Consumo de dados</h2>
      <p>
        O teste de velocidade transfere volumes significativos de dados (download e upload) para
        medir a conexão com precisão. Esse consumo é descontado da franquia de dados do seu plano
        de internet ou do seu plano de dados móveis. O {site.name} não se responsabiliza por
        custos adicionais decorrentes de planos com franquia limitada; se a sua conexão tiver
        limite de dados, considere isso antes de rodar o teste repetidamente.
      </p>

      <h2>8. Isenção de garantias e limitação de responsabilidade</h2>
      <p>
        O serviço é fornecido &ldquo;como está&rdquo;, sem garantias de disponibilidade
        ininterrupta, precisão absoluta ou adequação a uma finalidade específica. Na máxima
        extensão permitida pela legislação aplicável — incluindo o Código de Defesa do
        Consumidor (CDC) — {site.legal.razaoSocial} não se responsabiliza por danos indiretos,
        decisões tomadas com base nos resultados do teste ou indisponibilidades temporárias do
        serviço ou do servidor de medição de terceiros. Nada nestes termos limita direitos que
        sejam irrenunciáveis por força do CDC.
      </p>

      <h2>9. Links externos</h2>
      <p>
        O site pode conter links para páginas de terceiros (por exemplo, órgãos reguladores ou
        provedores de internet). Não nos responsabilizamos pelo conteúdo, políticas de privacidade
        ou práticas desses sites externos.
      </p>

      <h2>10. Alterações destes termos</h2>
      <p>
        Estes Termos de Uso podem ser atualizados periodicamente para refletir mudanças no
        serviço ou na legislação aplicável. A data da última atualização está indicada no topo
        desta página.
      </p>

      <h2>11. Legislação aplicável e foro</h2>
      <p>
        Estes termos são regidos pela legislação brasileira. Eventuais disputas serão dirimidas,
        preferencialmente, no foro do domicílio do consumidor, conforme assegurado pelo Código de
        Defesa do Consumidor.
      </p>

      <h2>12. Contato</h2>
      <p>
        Dúvidas sobre estes Termos de Uso podem ser enviadas para{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> ou pela página{" "}
        <Link href="/fale-conosco/">Fale conosco</Link>.
      </p>
    </ContentPage>
  );
}
