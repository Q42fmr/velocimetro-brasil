import { site } from "@/config/site";
import { pageKeywords } from "@/content/keywords";
import { ContentPage } from "@/components/ContentPage";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Brasil Banda Larga, Speedtest by Ookla, Fast.com ou nPerf: qual teste de velocidade usar?",
  description:
    "Comparativo de testes de velocidade: Brasil Banda Larga (EAQ/Anatel), Speedtest by Ookla, Fast.com, nPerf e Velocímetro Brasil. O que cada medidor mede e por que os resultados variam.",
  path: "comparativo.html",
  keywords: pageKeywords("comparativo"),
});

interface Tester {
  name: string;
  operator: string;
  measures: string;
  install: string;
  bestFor: string;
}

const TESTERS: Tester[] = [
  {
    name: "Velocímetro Brasil",
    operator: "Este site — medição no navegador",
    measures: "Download, upload, ping e jitter; análise por atividade e histórico local",
    install: "Não. Sem cadastro.",
    bestFor: "Teste rápido do dia a dia em qualquer aparelho, inclusive celular e smart TV com navegador",
  },
  {
    name: "Brasil Banda Larga (EAQ)",
    operator: "Entidade de Aferição da Qualidade, criada pela Anatel",
    measures: "Download, upload, latência, jitter e perda de pacotes",
    install: "Sim, programa ou aplicativo para o teste completo",
    bestFor: "Medição oficial para fins de reclamação na Anatel",
  },
  {
    name: "Speedtest by Ookla",
    operator: "Ookla (Ziff Davis)",
    measures: "Download, upload, ping e jitter, com escolha do servidor",
    install: "Não no site; há aplicativos",
    bestFor: "Comparar servidores e provedores; referência mais conhecida",
  },
  {
    name: "Fast.com",
    operator: "Netflix",
    measures: "Download (upload e latência em 'mais informações')",
    install: "Não",
    bestFor: "Saber se a conexão dá conta de streaming — mede contra os servidores da Netflix",
  },
  {
    name: "nPerf",
    operator: "nPerf (França)",
    measures: "Download, upload, latência, além de testes de navegação e vídeo",
    install: "Não no site; há aplicativos",
    bestFor: "Mapas de cobertura e testes de 4G/5G",
  },
];

export default function ComparativoPage() {
  return (
    <ContentPage
      title="Brasil Banda Larga, Speedtest by Ookla, Fast.com ou nPerf: qual teste de velocidade usar?"
      lead="Cada medidor de velocidade usa servidores, protocolos e durações diferentes — por isso o mesmo plano pode mostrar números distintos em cada teste de speed. Veja o que cada um mede e quando usar."
      crumbs={[{ href: "comparativo.html", label: "Comparativo de medidores" }]}
      wide
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Brasil Banda Larga, Speedtest by Ookla, Fast.com ou nPerf: qual teste de velocidade usar?",
          inLanguage: site.lang,
          url: absoluteUrl("comparativo.html"),
          publisher: { "@id": `${site.url}/#organization` },
          about: TESTERS.map((t) => ({ "@type": "SoftwareApplication", name: t.name, applicationCategory: "UtilitiesApplication" })),
        }}
      />

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Medidor</th>
              <th scope="col">Quem opera</th>
              <th scope="col">O que mede</th>
              <th scope="col">Precisa instalar?</th>
              <th scope="col">Melhor para</th>
            </tr>
          </thead>
          <tbody>
            {TESTERS.map((t) => (
              <tr key={t.name}>
                <th scope="row">{t.name}</th>
                <td>{t.operator}</td>
                <td>{t.measures}</td>
                <td>{t.install}</td>
                <td>{t.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>Brasil Banda Larga: teste de velocidade da Anatel (brasilbandalarga.com.br)</h2>
        <p>
          O Brasil Banda Larga é mantido pela EAQ, entidade criada pelas operadoras por determinação da Anatel para
          aferir a qualidade da banda larga. Em brasilbandalarga.com.br, teste de velocidade rápido ("EAQ teste
          rápido") roda no próprio site e mede download, upload e latência; o teste
          completo, com perda de pacotes, exige instalar o programa ou o aplicativo. É a referência para reclamações
          formais: os resultados ficam registrados e podem ser usados junto à Anatel. Para o uso cotidiano, um teste no
          navegador como o nosso é mais rápido e dá o mesmo panorama de download, upload, ping e jitter.
        </p>

        <h2>Speedtest by Ookla: teste de velocidade de conexão da internet com escolha de servidor</h2>
        <p>
          O Speedtest by Ookla é o medidor mais conhecido do mundo e permite escolher o servidor, inclusive servidores
          hospedados dentro da rede da sua própria operadora. Isso explica resultados muitas vezes mais altos: um servidor
          dentro do provedor não atravessa a saída para a internet. Se o Ookla mostra 500 Mbps e um teste externo mostra
          200 Mbps, a diferença está no trânsito entre a operadora e o resto da internet.
        </p>

        <h2>Fast velocidade (Fast.com): velocidade segundo a Netflix</h2>
        <p>
          O Fast.com mede contra os servidores da Netflix e responde a uma pergunta específica: dá para assistir em 4K
          sem travar? É simples e sem anúncios, mas por padrão mostra só o download. A velocidade Fast.com pode ficar
          abaixo de outros testes quando a operadora não tem boa conexão com a rede de distribuição da Netflix.
        </p>

        <h2>nPerf: velocidade e cobertura móvel</h2>
        <p>
          O nPerf teste de velocidade de internet combina medição de download e upload com testes de navegação e
          streaming, e alimenta mapas de cobertura 4G/5G. É útil para comparar operadoras móveis em uma região, mas o
          resultado depende do servidor escolhido automaticamente.
        </p>

        <h2>Por que os resultados são diferentes entre os medidores?</h2>
        <ul>
          <li>
            <strong>Servidor de teste:</strong> dentro da operadora, em um ponto de troca de tráfego ou em outro país. Quanto
            mais longe, mais a latência e o trânsito pesam.
          </li>
          <li>
            <strong>Método:</strong> número de conexões paralelas, duração e descarte do início da medição mudam a média.
            Testes curtos tendem a mostrar picos; testes longos, a média sustentada.
          </li>
          <li>
            <strong>Dispositivo e Wi-Fi:</strong> o mesmo medidor dá números diferentes no celular pelo Wi-Fi e no computador
            por cabo. A velocidade do site de teste não é o limite — o limite é a sua rede local.
          </li>
          <li>
            <strong>Horário:</strong> redes de cabo e móveis são compartilhadas; à noite a velocidade cai para todos.
          </li>
        </ul>

        <h2>Testar velocidade internet: qual medidor usar, então?</h2>
        <p>
          Para o dia a dia, qualquer medidor de velocidade no navegador resolve — o importante é repetir o teste nas mesmas
          condições e acompanhar a tendência. Para reclamar na Anatel, use o Brasil Banda Larga. Para investigar um
          problema, compare: um teste com servidor na operadora (Ookla) e um teste externo (como o nosso ou o Fast.com).
          Se o primeiro é alto e o segundo é baixo, o gargalo está na saída da operadora, não na sua casa.
        </p>

        <p className="notice">
          Faça agora o <a href="index.html">teste de velocidade do Velocímetro Brasil</a> ou veja o{" "}
          <a href="operadoras.html">guia por operadora</a> (Vivo, Claro, Oi, TIM e provedores regionais).
        </p>
      </div>
    </ContentPage>
  );
}
