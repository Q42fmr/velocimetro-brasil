
import { ContentPage } from "@/components/ContentPage";
import { site } from "@/config/site";
import { pageKeywords } from "@/content/keywords";
import { LEGAL_LAST_UPDATED, LEGAL_LAST_UPDATED_LABEL } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de Cookies",
  description:
    "Política de Cookies do Velocímetro Brasil: veja o que fica salvo no seu navegador (preferências e histórico do teste de velocidade) e como apagar esses dados.",
  path: "politica-de-cookies.html",
  keywords: pageKeywords("cookies"),
});

export default function PoliticaDeCookiesPage() {
  return (
    <ContentPage
      title="Política de Cookies"
      lead="Como o Velocímetro Brasil usa armazenamento local do navegador — e por que não usamos cookies de publicidade ou rastreamento."
      crumbs={[{ href: "politica-de-cookies.html", label: "Política de Cookies" }]}
    >
      <p className="field__hint">
        Última atualização: <time dateTime={LEGAL_LAST_UPDATED}>{LEGAL_LAST_UPDATED_LABEL}</time>
      </p>

      <h2>1. O que são cookies e armazenamento local</h2>
      <p>
        Cookies são pequenos arquivos que alguns sites gravam no seu navegador para lembrar
        informações entre visitas. O {site.name}, mantido por{" "}
        <strong>{site.legal.razaoSocial}</strong> (CNPJ {site.legal.cnpj}), não utiliza cookies
        tradicionais para funcionar. Em vez disso, usamos o <strong>armazenamento local</strong>{" "}
        do navegador (<code>localStorage</code>), uma tecnologia semelhante que guarda dados
        apenas no seu próprio dispositivo, sem enviá-los automaticamente a cada requisição como os
        cookies fazem.
      </p>

      <h2>2. O que armazenamos localmente</h2>
      <p>A tabela abaixo lista todos os itens que o {site.name} guarda no seu navegador:</p>
      <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Finalidade</th>
            <th scope="col">Tipo</th>
            <th scope="col">Duração</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>vb:font-scale</code></td>
            <td>Guarda a preferência de tamanho da fonte escolhida para acessibilidade.</td>
            <td>Preferência</td>
            <td>Até ser apagado pelo usuário</td>
          </tr>
          <tr>
            <td><code>vb:contrast</code></td>
            <td>Guarda a preferência de alto contraste escolhida para acessibilidade.</td>
            <td>Preferência</td>
            <td>Até ser apagado pelo usuário</td>
          </tr>
          <tr>
            <td><code>vb:cookie-consent</code></td>
            <td>Registra que o aviso sobre este armazenamento local já foi lido/fechado.</td>
            <td>Estritamente necessário</td>
            <td>Até ser apagado pelo usuário</td>
          </tr>
          <tr>
            <td><code>vb:history</code></td>
            <td>
              Guarda os últimos 20 resultados do teste de velocidade executados neste
              dispositivo, para exibir o histórico na página inicial.
            </td>
            <td>Preferência</td>
            <td>Até ser apagado pelo usuário (limite de 20 itens)</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2>3. Cookies de terceiros e medição de anúncios</h2>
      <p>
        Por padrão, o {site.name} <strong>não utiliza</strong> cookies de publicidade, pixels de
        rastreamento ou ferramentas de analytics de terceiros. Os únicos dados que saem do seu
        navegador durante o uso do site são os necessários para executar o teste de velocidade
        junto ao servidor de medição speed.cloudflare.com (veja a{" "}
        <a href="politica-de-privacidade.html">Política de Privacidade</a>) e, se você optar por
        enviá-los, os dados do <a href="index.html#contacts">formulário de contato</a>.
      </p>
      <p>
        Quando o site é divulgado por meio de campanhas de anúncios, o operador pode habilitar, na
        página inicial, ferramentas de medição de campanhas que gravam cookies próprios dos
        fornecedores: Google Ads/Google Analytics (cookies <code>_ga</code>, <code>_gcl_au</code> e
        similares, até 2 anos), Meta Pixel (<code>_fbp</code>, 3 meses) e Microsoft Advertising
        (<code>_uetsid</code>, <code>_uetvid</code>, até 13 meses). Elas servem para contar visitas e
        registrar o envio do formulário como conversão da campanha. Você pode bloqueá-las nas
        configurações de cookies do navegador sem prejuízo ao teste de velocidade.
      </p>

      <h2>4. Como limpar esses dados</h2>
      <p>
        Você pode apagar o histórico de testes diretamente pela página inicial, usando a opção de
        limpar histórico. Também é possível remover todos os dados de armazenamento local pelo
        próprio navegador:
      </p>
      <ul>
        <li>
          <strong>Google Chrome / Microsoft Edge:</strong> Configurações → Privacidade e segurança
          → Limpar dados de navegação → selecione &ldquo;Cookies e outros dados de site&rdquo;.
        </li>
        <li>
          <strong>Mozilla Firefox:</strong> Configurações → Privacidade e Segurança → Cookies e
          dados de sites → Limpar dados.
        </li>
        <li>
          <strong>Safari:</strong> Preferências → Privacidade → Gerenciar dados do site → remova
          os dados referentes a este site.
        </li>
        <li>
          <strong>Navegadores móveis (Android/iOS):</strong> consulte as configurações de
          privacidade do navegador instalado; a opção costuma se chamar &ldquo;Limpar dados de
          navegação&rdquo; ou &ldquo;Limpar cookies e dados de sites&rdquo;.
        </li>
      </ul>

      <h2>5. O que acontece se eu bloquear o armazenamento local</h2>
      <p>
        Se o seu navegador estiver configurado para bloquear o armazenamento local de todos os
        sites, o {site.name} continuará funcionando normalmente para executar o teste de
        velocidade — apenas o histórico de resultados e as preferências de acessibilidade não
        serão salvos entre visitas, e o aviso sobre este armazenamento poderá reaparecer.
      </p>

      <h2>6. Alterações desta política</h2>
      <p>
        Esta Política de Cookies pode ser atualizada caso o {site.name} passe a utilizar novos
        itens de armazenamento local. A data da última atualização está indicada no topo desta
        página.
      </p>

      <h2>7. Contato</h2>
      <p>
        Dúvidas sobre esta Política de Cookies podem ser enviadas para{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> ou pela página{" "}
        <a href="fale-conosco.html" >Fale conosco</a>.
      </p>
    </ContentPage>
  );
}
