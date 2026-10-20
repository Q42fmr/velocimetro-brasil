
import { site } from "@/config/site";
import { faqItems } from "@/content/faq";
import { pageKeywords } from "@/content/keywords";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SpeedTest } from "@/components/SpeedTest/SpeedTest";
import { buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  absoluteTitle: "Teste de Velocidade de Internet: Speed Test Grátis | Velocímetro Brasil",
  title: "Teste de Velocidade de Internet",
  description: site.description,
  path: "/",
  keywords: pageKeywords("home"),
});

const HOME_FAQ_IDS = ["como-fazer-o-teste", "resultado-diferente-do-contratado", "mbps-vs-mb-por-segundo", "wifi-ou-cabo", "teste-consome-franquia"];

export default function HomePage() {
  const faqTeaser = HOME_FAQ_IDS.flatMap((id) => faqItems.filter((f) => f.id === id));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: `${site.name} — Teste de velocidade de internet`,
          url: site.url,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript",
          offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
          description: site.description,
          inLanguage: site.lang,
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />

      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Teste de velocidade de internet</h1>
          <p className={styles.lead}>
            Meça agora a velocidade real da sua conexão. O speed test do {site.name} mede <strong>download</strong>,{" "}
            <strong>upload</strong>, <strong>ping</strong> e <strong>jitter</strong> em menos de um minuto, direto no
            navegador, sem instalar nada e sem cadastro.
          </p>
          <SpeedTest />
        </div>
      </section>

      <section className="section" id="como-funciona" aria-labelledby="como-funciona-titulo">
        <div className="container">
          <h2 id="como-funciona-titulo" className="section__title">
            Como funciona o teste de velocidade
          </h2>
          <p className="section__lead">
            O velocímetro de internet envia e recebe dados reais entre o seu dispositivo e um servidor de medição e calcula
            quanto a sua banda larga consegue transferir por segundo.
          </p>
          <ol className={styles.steps}>
            <li>
              <strong>Ping e jitter.</strong> Enviamos uma série de requisições minúsculas e medimos o tempo de resposta.
              O ping é a mediana desses tempos; o jitter é a variação entre eles.
            </li>
            <li>
              <strong>Download.</strong> Várias conexões paralelas baixam blocos de dados durante cerca de 10 segundos.
              Descartamos o início (quando a conexão ainda está acelerando) e calculamos a velocidade média em Mbps.
            </li>
            <li>
              <strong>Upload.</strong> O mesmo processo no sentido contrário: o navegador envia dados aleatórios ao
              servidor e medimos a taxa de envio.
            </li>
          </ol>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="resultados-titulo">
        <div className="container">
          <h2 id="resultados-titulo" className="section__title">
            O que significam os resultados do speed test
          </h2>
          <div className="grid grid--4">
            <article className="card" style={{ borderTop: "4px solid var(--color-download)" }}>
              <h3 className="card__title">Velocidade de download</h3>
              <p className="card__text">
                Quantos megabits por segundo chegam até você. Define a qualidade de vídeos, streaming, downloads e
                carregamento de páginas. É o número que as operadoras anunciam nos planos.
              </p>
            </article>
            <article className="card" style={{ borderTop: "4px solid var(--color-upload)" }}>
              <h3 className="card__title">Velocidade de upload</h3>
              <p className="card__text">
                Quantos megabits por segundo saem do seu dispositivo. Importa em videochamadas, lives, envio de arquivos
                para a nuvem e backups.
              </p>
            </article>
            <article className="card" style={{ borderTop: "4px solid var(--color-ping)" }}>
              <h3 className="card__title">Ping (latência)</h3>
              <p className="card__text">
                Tempo, em milissegundos, para um dado ir até o servidor e voltar. Quanto menor, melhor: abaixo de 50 ms é
                ótimo para jogos online e chamadas de vídeo.
              </p>
            </article>
            <article className="card" style={{ borderTop: "4px solid var(--color-jitter)" }}>
              <h3 className="card__title">Jitter</h3>
              <p className="card__text">
                Variação da latência entre uma medição e outra. Jitter alto causa travamentos em chamadas e jogos mesmo
                com boa velocidade de download.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="orientacoes-titulo">
        <div className="container">
          <div className="grid grid--2">
            <div>
              <h2 id="orientacoes-titulo" className="section__title">
                Pré-requisitos e orientações para um teste preciso
              </h2>
              <p className="section__lead">
                O resultado do teste de conexão reflete o momento da medição. Para que ele represente a velocidade
                contratada da sua banda larga, siga estas recomendações:
              </p>
              <ul className={styles.checklist}>
                <li>Use um navegador atualizado (Chrome, Firefox, Edge ou Safari) com JavaScript habilitado.</li>
                <li>Conecte o computador ao roteador por cabo de rede sempre que possível — o Wi-Fi reduz a velocidade.</li>
                <li>Feche downloads, streaming, jogos e atualizações em todos os aparelhos conectados à rede.</li>
                <li>Desative VPN, proxy e extensões de economia de dados durante o teste.</li>
                <li>Repita o teste de velocidade em horários diferentes e compare com o histórico.</li>
                <li>No celular, prefira o Wi-Fi de 5 GHz e fique perto do roteador; em 4G/5G, o resultado varia com o sinal.</li>
              </ul>
            </div>
            <div>
              <h2 className="section__title">Qual é a velocidade de internet ideal?</h2>
              <p className="section__lead">
                Depende do uso e de quantas pessoas compartilham a conexão. Valores de referência por atividade:
              </p>
              <div className="table-wrap">
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Atividade</th>
                    <th scope="col">Download recomendado</th>
                    <th scope="col">Observação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Navegação, e-mail e redes sociais</td>
                    <td>5–10 Mbps</td>
                    <td>Ping até 150 ms</td>
                  </tr>
                  <tr>
                    <td>Streaming em Full HD</td>
                    <td>8–15 Mbps por tela</td>
                    <td>Netflix, YouTube, Globoplay</td>
                  </tr>
                  <tr>
                    <td>Streaming em 4K</td>
                    <td>25 Mbps por tela</td>
                    <td>Conexão estável, de preferência por cabo</td>
                  </tr>
                  <tr>
                    <td>Videochamadas e home office</td>
                    <td>5 Mbps</td>
                    <td>Upload de pelo menos 3 Mbps</td>
                  </tr>
                  <tr>
                    <td>Jogos online</td>
                    <td>10 Mbps</td>
                    <td>Ping abaixo de 50 ms e jitter baixo</td>
                  </tr>
                  <tr>
                    <td>Família com vários dispositivos</td>
                    <td>100 Mbps ou mais</td>
                    <td>Fibra óptica é a melhor opção</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="melhorar-titulo">
        <div className="container">
          <h2 id="melhorar-titulo" className="section__title">
            Internet lenta? Como melhorar a velocidade da sua conexão
          </h2>
          <div className="grid grid--3">
            <article className="card">
              <h3 className="card__title">Reinicie o roteador</h3>
              <p className="card__text">
                Desligue o modem e o roteador da tomada, aguarde um minuto e ligue de novo. Resolve lentidão causada por
                memória cheia e conexões antigas acumuladas.
              </p>
            </article>
            <article className="card">
              <h3 className="card__title">Prefira o cabo ou o Wi-Fi 5 GHz</h3>
              <p className="card__text">
                A rede de 2,4 GHz atravessa paredes, mas é lenta e congestionada. A de 5 GHz entrega muito mais velocidade
                quando o aparelho está no mesmo cômodo do roteador.
              </p>
            </article>
            <article className="card">
              <h3 className="card__title">Posicione bem o roteador</h3>
              <p className="card__text">
                Coloque-o em local alto e central, longe de micro-ondas, TVs e aquários. Em casas grandes, considere um
                repetidor ou um sistema mesh.
              </p>
            </article>
            <article className="card">
              <h3 className="card__title">Controle quem usa a rede</h3>
              <p className="card__text">
                Smart TVs, câmeras e celulares consomem banda em segundo plano. Troque a senha do Wi-Fi se desconfiar de
                vizinhos conectados.
              </p>
            </article>
            <article className="card">
              <h3 className="card__title">Atualize equipamentos antigos</h3>
              <p className="card__text">
                Roteadores com mais de cinco anos não acompanham planos de 300 Mbps ou mais. Verifique se o aparelho e os
                cabos suportam a velocidade contratada.
              </p>
            </article>
            <article className="card">
              <h3 className="card__title">Compare com o plano contratado</h3>
              <p className="card__text">
                Se o teste de velocidade por cabo fica sempre abaixo de 80% do contratado, registre os resultados e acione
                a operadora. Persistindo, procure a Anatel ou o consumidor.gov.br.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-titulo">
        <div className="container">
          <h2 id="faq-titulo" className="section__title">
            Perguntas frequentes sobre o teste de velocidade
          </h2>
          <Faq items={faqTeaser} idPrefix="home-faq" />
          <p style={{ marginTop: "1.25rem" }}>
            <a href="faq.html" className="btn btn--ghost">
              Ver todas as perguntas frequentes
            </a>{" "}
            <a href="glossario.html" className="btn btn--ghost">
              Glossário de termos de internet
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
