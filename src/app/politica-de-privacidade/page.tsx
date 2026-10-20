import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";
import { site } from "@/config/site";
import { pageKeywords } from "@/content/keywords";
import { LEGAL_LAST_UPDATED, LEGAL_LAST_UPDATED_LABEL } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do Velocímetro Brasil: como tratamos dados pessoais no teste de velocidade de internet, em conformidade com a LGPD (Lei nº 13.709/2018).",
  path: "/politica-de-privacidade/",
  keywords: pageKeywords("privacy"),
});

export default function PoliticaDePrivacidadePage() {
  return (
    <ContentPage
      title="Política de Privacidade"
      lead="Como o Velocímetro Brasil trata dados pessoais ao oferecer o teste de velocidade de internet, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)."
      crumbs={[{ href: "/politica-de-privacidade/", label: "Política de Privacidade" }]}
    >
      <p className="field__hint">
        Última atualização: <time dateTime={LEGAL_LAST_UPDATED}>{LEGAL_LAST_UPDATED_LABEL}</time>
      </p>

      <h2>1. Identificação do controlador</h2>
      <p>
        Esta Política de Privacidade é mantida por <strong>{site.legal.razaoSocial}</strong>, CNPJ{" "}
        {site.legal.cnpj}, responsável pelo site {site.name} ({site.url}), doravante referida
        como &ldquo;controlador&rdquo; ou &ldquo;nós&rdquo;. Dúvidas sobre proteção de dados podem
        ser enviadas para{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> ou pela página{" "}
        <Link href="/fale-conosco/">Fale conosco</Link>. O endereço físico do controlador pode ser
        solicitado por esse mesmo e-mail.
      </p>

      <h2>2. Quais dados tratamos e por quê</h2>
      <p>
        O {site.name} foi desenhado para coletar o mínimo de dados possível. Tratamos informações
        em três situações distintas:
      </p>
      <dl>
        <dt>(a) Execução do teste de velocidade</dt>
        <dd>
          Ao clicar em &ldquo;Iniciar teste&rdquo;, o seu navegador se conecta diretamente ao
          servidor de medição <strong>speed.cloudflare.com</strong>, operado pela Cloudflare, para
          baixar e enviar pequenos blocos de dados e calcular download, upload, ping e jitter.
          Nessa comunicação, a Cloudflare recebe o seu endereço IP e metadados técnicos da conexão
          (como provedor/ASN e cidade aproximada), que são devolvidos ao navegador para exibição
          do resultado na tela. O {site.name} <strong>não</strong> opera servidor próprio de
          medição e <strong>não</strong> recebe, armazena ou registra esses resultados em nenhum
          banco de dados nosso — toda a troca de dados do teste acontece entre o seu navegador e a
          Cloudflare.
        </dd>
        <dt>(b) Histórico de testes e preferências do dispositivo</dt>
        <dd>
          O histórico dos seus últimos testes (no máximo 20 resultados) e preferências de
          acessibilidade (tamanho de fonte, alto contraste) e de consentimento de cookies ficam
          salvos apenas no armazenamento local (<code>localStorage</code>) do seu próprio
          navegador. Esses dados nunca são enviados aos nossos servidores e permanecem somente no
          dispositivo que você está usando; você pode apagá-los a qualquer momento limpando o
          histórico na página inicial ou os dados de navegação do seu navegador.
        </dd>
        <dt>(c) Formulário Fale Conosco</dt>
        <dd>
          Ao preencher o formulário em <Link href="/fale-conosco/">Fale conosco</Link>,
          coletamos nome, e-mail, assunto e mensagem, usados exclusivamente para responder à sua
          dúvida, sugestão ou solicitação.
        </dd>
      </dl>

      <h2>3. Base legal para o tratamento</h2>
      <p>
        Tratamos os dados descritos acima com base: na <strong>execução de um serviço
        solicitado pelo titular</strong> (fornecer o resultado do teste de velocidade, item 2a);
        no <strong>legítimo interesse</strong> em manter o funcionamento, a segurança e a melhoria
        contínua do site (itens 2a e 2b); e no <strong>consentimento</strong> do titular ao enviar
        voluntariamente o formulário de contato (item 2c).
      </p>

      <h2>4. Com quem compartilhamos dados</h2>
      <p>
        Os únicos terceiros envolvidos no funcionamento do {site.name} são: o operador do servidor
        de medição citado (Cloudflare, por meio de speed.cloudflare.com), que recebe diretamente o
        IP do seu navegador durante o teste; e, caso o formulário Fale Conosco esteja configurado
        para envio a um sistema externo, o destinatário responsável por processar essas
        mensagens em nome do operador do site. Não compartilhamos dados com redes de publicidade,
        corretores de dados ou qualquer outro terceiro para fins de marketing.
      </p>

      <h2>5. Retenção dos dados</h2>
      <p>
        Não mantemos banco de dados de resultados de teste de velocidade — portanto, não há prazo
        de retenção aplicável a esse item, pois o dado simplesmente não chega a ser armazenado por
        nós. O histórico e as preferências salvos no seu navegador permanecem até que você os
        apague manualmente ou limpe os dados do navegador. Mensagens recebidas pelo formulário de
        contato são mantidas pelo tempo necessário para atender à solicitação e cumprir
        obrigações legais, sendo descartadas em seguida.
      </p>

      <h2>6. Seus direitos como titular de dados</h2>
      <p>
        Nos termos do artigo 18 da LGPD, você pode solicitar, a qualquer momento: confirmação da
        existência de tratamento; acesso aos dados; correção de dados incompletos, inexatos ou
        desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários ou tratados
        em desconformidade com a lei; portabilidade a outro fornecedor; eliminação dos dados
        tratados com base no seu consentimento; informação sobre entidades com as quais
        compartilhamos dados; e revogação do consentimento. Para exercer qualquer desses direitos,
        envie uma mensagem para <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>{" "}
        ou use a página <Link href="/fale-conosco/">Fale conosco</Link>.
      </p>

      <h2>7. Segurança da informação</h2>
      <p>
        Como o {site.name} não coleta nem armazena resultados de teste em servidor próprio e o
        formulário de contato trafega por canais criptografados (HTTPS), o risco de exposição de
        dados pessoais é reduzido. Ainda assim, adotamos práticas razoáveis de segurança técnica e
        administrativa para proteger as informações que eventualmente tratamos, como as mensagens
        de contato.
      </p>

      <h2>8. Uso por menores de idade</h2>
      <p>
        O {site.name} é um serviço de uso geral e não é direcionado especificamente a crianças.
        Não coletamos intencionalmente dados de identificação de menores de idade por meio do
        formulário de contato; caso tome conhecimento de tratamento inadequado, entre em contato
        para que possamos adotar as providências cabíveis.
      </p>

      <h2>9. Alterações desta política</h2>
      <p>
        Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças no
        serviço ou na legislação. A data da última atualização está indicada no topo desta página.
        Recomendamos revisitar este texto de tempos em tempos.
      </p>

      <h2>10. Contato e encarregado</h2>
      <p>
        Para qualquer dúvida, solicitação ou reclamação relacionada a esta Política de Privacidade
        ou ao tratamento dos seus dados pessoais, fale com{" "}
        <strong>{site.legal.razaoSocial}</strong> pelo e-mail{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> ou pela página{" "}
        <Link href="/fale-conosco/">Fale conosco</Link>.
      </p>
    </ContentPage>
  );
}
