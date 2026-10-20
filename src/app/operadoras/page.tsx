import { site } from "@/config/site";
import { pageKeywords } from "@/content/keywords";
import { ContentPage } from "@/components/ContentPage";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Teste de velocidade Vivo, Claro, Oi, TIM e provedores regionais",
  description:
    "Teste de velocidade Vivo, Claro, Oi, TIM, RJNet e qualquer operadora: meça sua internet residencial ou móvel, compare com o plano contratado e saiba o que fazer se estiver lenta.",
  path: "operadoras.html",
  keywords: pageKeywords("operadoras"),
});

interface Provider {
  name: string;
  tech: string;
  plans: string;
  tip: string;
}

const PROVIDERS: Provider[] = [
  {
    name: "Vivo (Vivo Fibra e Vivo Móvel)",
    tech: "Fibra óptica (FTTH) nas capitais e grandes cidades; 4G/5G no celular.",
    plans: "Planos residenciais de 300 Mega a 1 Giga; upload costuma ser igual ou próximo ao download na fibra.",
    tip: "No teste de velocidade da Vivo (Fibra ou móvel), use cabo de rede ou Wi-Fi 5 GHz: o Wi-Fi 2,4 GHz raramente passa de 100 Mbps, mesmo com um plano de 500 Mega.",
  },
  {
    name: "Claro (Claro Internet / NET Virtua)",
    tech: "Cabo coaxial (HFC) na maior parte das cidades, fibra em áreas novas.",
    plans: "De 250 Mega a 1 Giga; no cabo, o upload é bem menor que o download (por exemplo, 500 Mega de download e 50 Mega de upload).",
    tip: "Antes de clicar em \"assine Claro Internet\" ou mudar de plano, faça o teste no horário em que você mais usa a conexão: o cabo compartilha a rede com os vizinhos e pode cair à noite.",
  },
  {
    name: "Oi Fibra",
    tech: "Fibra óptica (FTTH).",
    plans: "Planos de 200 a 1.000 Mega; upload simétrico ou próximo disso.",
    tip: "Se o teste de velocidade Oi Fibra ficar abaixo de 80% do contratado por cabo, anote data e hora e abra chamado — a regra da Anatel vale para todas as operadoras.",
  },
  {
    name: "TIM (TIM Live e TIM 4G/5G)",
    tech: "Fibra na TIM Live; 4G/5G no celular.",
    plans: "TIM Live de 300 Mega a 1 Giga; no 4G/5G, a velocidade varia com o sinal e a quantidade de pessoas na antena.",
    tip: "No celular, repita o teste em pontos diferentes da casa: a velocidade 4G/5G muda muito com uma parede de distância.",
  },
  {
    name: "Provedores regionais (RJNet, Sumicity, Algar, Sercomtel, Ligue, Neorede…)",
    tech: "Em geral fibra óptica local, com rede própria na cidade.",
    plans: "Planos de 100 Mega a 1 Giga, frequentemente mais baratos que os das grandes operadoras.",
    tip: "Provedores locais costumam ter medidor próprio (a página \"RJNet teste velocímetro\", por exemplo). Compare o resultado dele com o nosso: se o teste interno é alto e o nosso é baixo, o gargalo está na saída do provedor para a internet.",
  },
];

export default function OperadorasPage() {
  return (
    <ContentPage
      title="Teste de velocidade Vivo, Claro, Oi, TIM e provedores regionais"
      lead="O medidor de velocidade do Velocímetro Brasil funciona com qualquer operadora. Veja o que esperar de cada tecnologia, como testar a internet residencial corretamente e o que fazer se a velocidade não bate com o plano."
      crumbs={[{ href: "operadoras.html", label: "Teste por operadora" }]}
      wide
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Teste de velocidade Vivo, Claro, Oi, TIM e provedores regionais",
          inLanguage: site.lang,
          url: absoluteUrl("operadoras.html"),
          publisher: { "@id": `${site.url}/#organization` },
          about: PROVIDERS.map((p) => ({ "@type": "Thing", name: p.name })),
        }}
      />

      <div className="prose">
        <p>
          Não existe um teste de velocidade diferente para cada operadora: a medição é sempre entre o seu dispositivo e
          um servidor na internet. O que muda é a tecnologia da sua conexão e o que é razoável esperar dela. Faça o{" "}
          <a href="index.html">teste de velocidade de internet</a> na página inicial e use este guia para interpretar o
          resultado do seu provedor.
        </p>

        <h2>Consultar velocidade da minha internet por operadora: passo a passo</h2>
        <ol>
          <li>
            Descubra a velocidade contratada: ela aparece na fatura, no aplicativo da operadora ou no contrato (por
            exemplo, "500 Mega" significa 500 Mbps de download).
          </li>
          <li>
            Conecte o computador ao roteador por cabo. Se for testar pelo Wi-Fi, fique no mesmo cômodo do roteador e
            prefira a rede de 5 GHz.
          </li>
          <li>
            Pause downloads, streaming e atualizações em todos os aparelhos e execute o teste de conexão duas ou três
            vezes, em horários diferentes.
          </li>
          <li>
            Compare: a Anatel exige média de pelo menos 80% do contratado e nunca menos de 40% em cada medição. Guarde
            os resultados no histórico do medidor como registro.
          </li>
        </ol>
      </div>

      <h2 className="section__title" style={{ marginTop: "2rem" }}>
        Teste velocidade de internet: o que esperar de cada operadora
      </h2>
      <div className="grid grid--2">
        {PROVIDERS.map((p) => (
          <article key={p.name} className="card">
            <h3 className="card__title">{p.name}</h3>
            <p className="card__text">
              <strong>Tecnologia:</strong> {p.tech}
            </p>
            <p className="card__text">
              <strong>Planos:</strong> {p.plans}
            </p>
            <p className="card__text">
              <strong>Dica:</strong> {p.tip}
            </p>
          </article>
        ))}
      </div>

      <div className="prose">
        <h2>Teste de velocidade internet residencial ou móvel: qual faz sentido?</h2>
        <p>
          O teste de velocidade de internet residencial mede a sua banda larga fixa (fibra, cabo ou ADSL) e deve chegar
          perto do contratado. Já no 4G e 5G, as operadoras não garantem velocidade fixa: o resultado depende do sinal,
          da antena e do horário. Para comparar com o plano, teste sempre pela rede fixa; para saber se o celular está
          lento, teste pelo 4G/5G com o Wi-Fi desligado.
        </p>

        <h2>Internet de alta velocidade: quantos megas você realmente precisa?</h2>
        <p>
          Uma internet rápida para a maioria das casas fica entre 300 e 600 Mega. Planos de 1 Giga só fazem diferença
          com muitos aparelhos usando a rede ao mesmo tempo, downloads frequentes e um roteador Wi-Fi 6 ou cabo de rede
          — do contrário, a velocidade sobra no contrato e falta no dispositivo. Veja a tabela de velocidades
          recomendadas por atividade na <a href="index.html#como-funciona">página inicial</a>.
        </p>

        <h2>A velocidade está abaixo do contratado. E agora?</h2>
        <p>
          Repita o teste por cabo em horários diferentes e guarde os resultados. Se a média ficar abaixo de 80% do plano,
          acione a operadora com as medições em mãos. Sem solução, registre reclamação na Anatel ou no consumidor.gov.br.
          Mais detalhes nas <a href="faq.html#faq-velocidade-abaixo-do-contratado">perguntas frequentes</a>.
        </p>

        <p className="notice">
          Quer comparar o nosso medidor com Brasil Banda Larga (EAQ), Speedtest by Ookla, Fast.com e nPerf? Veja o{" "}
          <a href="comparativo.html">comparativo de testes de velocidade</a>.
        </p>
      </div>
    </ContentPage>
  );
}
