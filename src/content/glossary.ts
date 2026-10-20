/**
 * Glossário de termos de internet usados no teste de velocidade.
 * Ordenado alfabeticamente por `term` (ignorando acentos).
 */
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string[];
  related?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "adsl-vdsl",
    term: "ADSL/VDSL",
    definition: [
      "ADSL e VDSL são tecnologias de banda larga que usam o mesmo cabo de telefone (par de cobre) já instalado nas casas para transmitir internet. São mais lentas e mais sensíveis à distância da central telefônica do que a fibra óptica.",
      "O VDSL é uma evolução do ADSL, capaz de entregar velocidades maiores em curtas distâncias, mas ambas as tecnologias vêm sendo substituídas pela fibra óptica (FTTH) na maioria dos provedores brasileiros.",
    ],
    related: ["fibra-optica-ftth", "banda-larga"],
  },
  {
    id: "asn",
    term: "ASN",
    definition: [
      "ASN (Autonomous System Number) é um número único que identifica uma rede autônoma na internet, geralmente pertencente a um provedor, uma empresa de hospedagem ou uma grande organização.",
      "Cada ASN agrupa um conjunto de endereços IP sob o controle de uma única entidade, permitindo que os roteadores da internet saibam para onde encaminhar o tráfego de cada rede.",
    ],
    related: ["endereco-ip-ipv4-ipv6", "provedor-isp"],
  },
  {
    id: "banda-larga",
    term: "Banda larga",
    definition: [
      "Banda larga é o termo usado para conexões de internet de alta capacidade, em contraste com as conexões discadas antigas. Hoje engloba tecnologias como fibra óptica, cabo, ADSL/VDSL e internet móvel 4G/5G.",
      "Um teste de velocidade de internet serve justamente para verificar se a banda larga contratada está entregando o desempenho esperado em download, upload, ping e jitter.",
    ],
    related: ["fibra-optica-ftth", "cabo-coaxial-hfc", "velocidade-contratada"],
  },
  {
    id: "bit-e-byte",
    term: "Bit e Byte",
    definition: [
      "Bit é a menor unidade de informação digital, podendo valer 0 ou 1. Byte é um conjunto de 8 bits, usado para medir o tamanho de arquivos (KB, MB, GB).",
      "Essa diferença é a origem da confusão entre Mbps (megabits por segundo, usado pelos provedores) e MB/s (megabytes por segundo, usado pelos navegadores): 1 byte equivale a 8 bits.",
    ],
    related: ["mbps", "mb-por-segundo"],
  },
  {
    id: "brasil-banda-larga-eaq",
    term: "Brasil Banda Larga (EAQ)",
    definition: [
      "Brasil Banda Larga (brasilbandalarga.com.br) é o teste de velocidade mantido pela EAQ — Entidade de Aferição da Qualidade, criada por determinação da Anatel para medir a qualidade da banda larga no país. Oferece um teste rápido no site e um teste completo, com perda de pacotes, por programa ou aplicativo.",
      "Seus resultados são a referência para reclamações formais sobre velocidade contratada. Para o acompanhamento do dia a dia, um medidor de velocidade no navegador, como o Velocímetro Brasil, dá o mesmo panorama de download, upload, ping e jitter sem instalação.",
    ],
    related: ["speed-test-teste-de-velocidade", "velocidade-contratada", "perda-de-pacotes"],
  },
  {
    id: "buffering",
    term: "Buffering",
    definition: [
      "Buffering é o carregamento temporário de dados antes da reprodução, usado por players de vídeo e áudio para evitar interrupções. Quando a velocidade de download cai abaixo do necessário, o buffering aumenta e o vídeo trava para recarregar.",
    ],
    related: ["streaming", "velocidade-de-download"],
  },
  {
    id: "cabo-coaxial-hfc",
    term: "Cabo (coaxial/HFC)",
    definition: [
      "Internet a cabo usa redes HFC (híbrido fibra-coaxial), que combinam fibra óptica no backbone com cabo coaxial no trecho final até o cliente. É uma tecnologia comum para pacotes combinados de internet e TV por assinatura.",
      "Costuma entregar velocidades de download altas, mas o upload é geralmente mais limitado do que em conexões de fibra óptica dedicada.",
    ],
    related: ["fibra-optica-ftth", "velocidade-de-upload"],
  },
  {
    id: "cdn",
    term: "CDN",
    definition: [
      "CDN (Content Delivery Network, ou rede de distribuição de conteúdo) é um conjunto de servidores espalhados geograficamente que armazenam cópias de um mesmo conteúdo, entregando-o a partir do ponto mais próximo do usuário.",
      "Serviços de streaming, sites de notícias e até servidores de teste de velocidade usam CDNs para reduzir a latência e melhorar o desempenho percebido pelo usuário final.",
    ],
    related: ["servidor-de-teste", "latencia"],
  },
  {
    id: "dns",
    term: "DNS",
    definition: [
      "DNS (Domain Name System) é o sistema que traduz nomes de domínio legíveis, como velocimetrobrasil.com.br, em endereços IP numéricos que os computadores usam para se comunicar na rede.",
      "Um DNS lento ou mal configurado pode atrasar o carregamento inicial de sites, mesmo que a velocidade de download e upload da conexão esteja normal — por isso ele não costuma ser medido diretamente em um teste de velocidade.",
    ],
    related: ["endereco-ip-ipv4-ipv6", "provedor-isp"],
  },
  {
    id: "velocidade-de-download",
    term: "Download",
    definition: [
      "Download é a transferência de dados da internet para o seu dispositivo, como ao carregar uma página, assistir a um vídeo ou baixar um arquivo. É um dos principais resultados exibidos em um teste de velocidade de internet, medido em Mbps.",
    ],
    related: ["mbps", "velocidade-de-upload", "throughput"],
  },
  {
    id: "endereco-ip-ipv4-ipv6",
    term: "Endereço IP (IPv4/IPv6)",
    definition: [
      "Endereço IP é o identificador numérico de um dispositivo conectado à internet, usado para que os dados saibam para onde ir. O IPv4 usa um formato mais antigo e limitado (como 200.160.2.3); o IPv6 é o padrão mais novo, com um espaço de endereços muito maior.",
      "Durante um teste de velocidade, o servidor de medição vê o endereço IP público do dispositivo que está testando, mas isso não é armazenado nem associado a resultados salvos localmente.",
    ],
    related: ["dns", "asn", "provedor-isp"],
  },
  {
    id: "fibra-optica-ftth",
    term: "Fibra óptica (FTTH)",
    definition: [
      "FTTH (Fiber to the Home) é a tecnologia de banda larga que leva fibra óptica diretamente até a casa do cliente, usando pulsos de luz para transmitir dados. É a tecnologia mais rápida disponível atualmente, com velocidades simétricas de download e upload em muitos planos.",
      "Por não sofrer interferência eletromagnética como o cabo coaxial ou o cobre do ADSL, a fibra óptica costuma entregar resultados de teste de velocidade mais estáveis e próximos do contratado.",
    ],
    related: ["banda-larga", "velocidade-contratada"],
  },
  {
    id: "franquia-de-dados",
    term: "Franquia de dados",
    definition: [
      "Franquia de dados é o volume de tráfego (em GB) incluído em um plano de internet móvel ou, menos comumente, de banda larga fixa, antes de sofrer redução de velocidade ou cobrança extra.",
      "Um teste de velocidade completo consome dados reais da franquia — algo entre 150 MB e 300 MB por execução — por isso vale usá-lo com moderação em planos móveis com franquia limitada.",
    ],
    related: ["internet-movel-4g-5g"],
  },
  {
    id: "gbps",
    term: "Gbps",
    definition: [
      "Gbps (gigabits por segundo) equivale a 1.000 Mbps. É a unidade usada em planos de fibra óptica de altíssima velocidade, geralmente a partir de 1 Gbps, voltados para uso intenso ou várias pessoas na mesma residência.",
    ],
    related: ["mbps", "fibra-optica-ftth"],
  },
  {
    id: "internet-movel-4g-5g",
    term: "Internet móvel 4G/5G",
    definition: [
      "4G e 5G são gerações de redes móveis que entregam internet via torres de celular, sem precisar de cabos até o usuário. O 5G oferece velocidades bem maiores e latência mais baixa que o 4G, mas depende de cobertura disponível na região.",
      "A velocidade de um teste em internet móvel pode variar bastante conforme a localização, o número de pessoas conectadas à mesma torre e a qualidade do sinal recebido pelo aparelho.",
    ],
    related: ["franquia-de-dados", "latencia"],
  },
  {
    id: "internet-via-satelite",
    term: "Internet via satélite",
    definition: [
      "Internet via satélite leva conectividade a regiões remotas, onde cabo e fibra óptica não chegam, usando sinais transmitidos entre uma antena no solo e satélites em órbita. Tende a ter latência mais alta que conexões terrestres, por causa da distância percorrida pelo sinal.",
      "Serviços mais recentes, com satélites em órbita baixa, reduziram bastante essa latência em comparação com satélites geoestacionários tradicionais.",
    ],
    related: ["latencia", "banda-larga"],
  },
  {
    id: "jitter",
    term: "Jitter",
    definition: [
      "Jitter é a variação da latência ao longo do tempo, medida em milissegundos. Uma conexão com jitter baixo entrega pacotes de dados em intervalos regulares; com jitter alto, os intervalos variam, o que pode causar engasgos em chamadas de vídeo e jogos online mesmo quando o ping médio é baixo.",
    ],
    related: ["latencia", "ping"],
  },
  {
    id: "largura-de-banda",
    term: "Largura de banda",
    definition: [
      "Largura de banda é a capacidade máxima teórica de uma conexão para transportar dados em um determinado período, geralmente expressa em Mbps ou Gbps. É o número anunciado no plano contratado junto ao provedor.",
      "Na prática, o throughput (desempenho real medido por um teste de velocidade) costuma ficar abaixo da largura de banda teórica, por conta de fatores como Wi-Fi, congestionamento de rede e qualidade dos equipamentos.",
    ],
    related: ["throughput", "velocidade-contratada"],
  },
  {
    id: "latencia",
    term: "Latência",
    definition: [
      "Latência é o tempo que um pacote de dados leva para ir do seu dispositivo até um servidor e voltar, medido em milissegundos (ms). Quanto menor a latência, mais responsiva é a conexão — fator crítico para jogos online e videochamadas.",
      "No teste de velocidade, a latência costuma ser medida junto com o ping, antes das fases de download e upload.",
    ],
    related: ["ping", "jitter"],
  },
  {
    id: "mb-por-segundo",
    term: "MB/s",
    definition: [
      "MB/s (megabytes por segundo) é a unidade usada por navegadores e gerenciadores de download para mostrar a velocidade de transferência de um arquivo. Como 1 byte equivale a 8 bits, 1 MB/s corresponde a 8 Mbps.",
      "É comum confundir essa unidade com o Mbps anunciado pelos provedores de banda larga — por isso um plano de 100 Mbps resulta em, no máximo, cerca de 12,5 MB/s de download.",
    ],
    related: ["mbps", "bit-e-byte"],
  },
  {
    id: "mbps",
    term: "Mbps",
    definition: [
      "Mbps (megabits por segundo) é a unidade padrão usada pelos provedores de internet para anunciar a velocidade de planos de banda larga, tanto para download quanto para upload.",
      "É a principal unidade exibida nos resultados de um teste de velocidade de internet, permitindo comparar diretamente o desempenho medido com a velocidade contratada.",
    ],
    related: ["mb-por-segundo", "gbps", "velocidade-contratada"],
  },
  {
    id: "modem",
    term: "Modem",
    definition: [
      "Modem é o equipamento que converte o sinal recebido do provedor (óptico, elétrico ou de rádio) em um formato que a rede local do cliente consegue usar, e vice-versa. Em muitos planos residenciais, o modem vem combinado com um roteador no mesmo aparelho.",
    ],
    related: ["onu-ont", "roteador"],
  },
  {
    id: "onu-ont",
    term: "ONU/ONT",
    definition: [
      "ONU ou ONT (Optical Network Unit/Terminal) é o equipamento instalado na casa do cliente em conexões de fibra óptica (FTTH), responsável por converter o sinal luminoso da fibra em sinal elétrico que o roteador consegue usar.",
    ],
    related: ["fibra-optica-ftth", "modem"],
  },
  {
    id: "perda-de-pacotes",
    term: "Perda de pacotes",
    definition: [
      "Perda de pacotes acontece quando parte dos dados enviados pela rede não chega ao destino, exigindo reenvio. Pode causar travamentos em chamadas de vídeo, quedas em jogos online e lentidão geral na navegação.",
      "Um teste de velocidade feito pelo navegador, baseado em requisições HTTP, não consegue medir perda de pacotes individualmente — essa métrica exige ferramentas instaladas no sistema operacional, com acesso direto à rede.",
    ],
    related: ["jitter", "latencia"],
  },
  {
    id: "ping",
    term: "Ping",
    definition: [
      "Ping é tanto o nome popular dado à latência quanto o comando usado para medi-la, enviando um pequeno pacote de dados a um servidor e cronometrando o tempo até a resposta voltar.",
      "Um ping baixo (geralmente até 50 ms) é essencial para jogos online e videochamadas fluidas, mesmo que a velocidade de download e upload não seja das mais altas.",
    ],
    related: ["latencia", "jitter"],
  },
  {
    id: "provedor-isp",
    term: "Provedor (ISP)",
    definition: [
      "Provedor de internet, ou ISP (Internet Service Provider), é a empresa que fornece acesso à internet ao cliente final, seja por fibra óptica, cabo, ADSL/VDSL, internet móvel ou satélite.",
      "A velocidade contratada com o provedor é a referência usada para comparar com o resultado obtido em um teste de velocidade.",
    ],
    related: ["velocidade-contratada", "asn"],
  },
  {
    id: "roteador",
    term: "Roteador",
    definition: [
      "Roteador é o equipamento que distribui a conexão de internet entre os dispositivos de uma casa ou escritório, por cabo de rede ou Wi-Fi. A posição, a idade e a configuração do roteador influenciam diretamente o resultado de um teste de velocidade feito via Wi-Fi.",
    ],
    related: ["wifi", "modem"],
  },
  {
    id: "servidor-de-teste",
    term: "Servidor de teste",
    definition: [
      "Servidor de teste é o computador remoto usado para trocar dados de download e upload durante a medição de velocidade. O Velocímetro Brasil utiliza a infraestrutura da Cloudflare (speed.cloudflare.com) como servidor de teste, acessada diretamente pelo navegador do usuário.",
      "A distância física e a qualidade da rota até o servidor de teste influenciam tanto a velocidade medida quanto a latência apresentada no resultado.",
    ],
    related: ["cdn", "latencia"],
  },
  {
    id: "speed-test-teste-de-velocidade",
    term: "Speed test / Teste de velocidade",
    definition: [
      "Teste de velocidade (ou speed test) é uma ferramenta que mede o desempenho de uma conexão de internet, avaliando download, upload, ping, latência e jitter em poucos segundos, diretamente pelo navegador.",
      "Serve tanto para verificar se a velocidade contratada junto ao provedor está sendo entregue quanto para diagnosticar problemas pontuais de internet lenta.",
    ],
    related: ["velocidade-de-download", "velocidade-de-upload", "velocidade-contratada"],
  },
  {
    id: "streaming",
    term: "Streaming",
    definition: [
      "Streaming é a transmissão de áudio ou vídeo reproduzida em tempo real, sem precisar baixar o arquivo completo antes de assistir. Serviços de streaming em HD costumam exigir cerca de 5 Mbps de download, enquanto o streaming em 4K pode exigir cerca de 25 Mbps.",
    ],
    related: ["velocidade-de-download", "buffering"],
  },
  {
    id: "throughput",
    term: "Throughput",
    definition: [
      "Throughput é o desempenho real de transferência de dados medido em uma conexão, em contraste com a largura de banda teórica anunciada pelo provedor. É exatamente o que um teste de velocidade mede: quantos Mbps de download e upload a conexão consegue entregar na prática.",
    ],
    related: ["largura-de-banda", "velocidade-de-download"],
  },
  {
    id: "velocidade-contratada",
    term: "Velocidade contratada",
    definition: [
      "Velocidade contratada é o valor de download (e, em alguns planos, de upload) anunciado e vendido pelo provedor de internet, geralmente em Mbps. Pela Resolução 717/2019 da Anatel, os provedores devem entregar, em média, pelo menos 80% dessa velocidade, e no mínimo 40% em cada medição instantânea.",
      "Comparar os resultados de um teste de velocidade com a velocidade contratada é a forma mais direta de saber se o plano está sendo cumprido.",
    ],
    related: ["mbps", "provedor-isp"],
  },
  {
    id: "velocidade-de-upload",
    term: "Velocidade de upload",
    definition: [
      "Upload é a transferência de dados do seu dispositivo para a internet, como ao enviar arquivos, fazer backup na nuvem ou transmitir uma videochamada. Em muitos planos de banda larga, a velocidade de upload é bem menor que a de download.",
    ],
    related: ["velocidade-de-download", "mbps"],
  },
  {
    id: "vpn",
    term: "VPN",
    definition: [
      "VPN (Virtual Private Network) é uma rede privada virtual que encaminha o tráfego de internet por um servidor intermediário, geralmente para aumentar a privacidade ou trocar a localização aparente do usuário.",
      "Usar uma VPN ativa durante um teste de velocidade costuma reduzir o resultado de download e upload, porque os dados passam por um caminho adicional até chegar ao servidor de teste.",
    ],
    related: ["servidor-de-teste", "latencia"],
  },
  {
    id: "wifi",
    term: "Wi-Fi (2,4 GHz / 5 GHz / Wi-Fi 6)",
    definition: [
      "Wi-Fi é a tecnologia de conexão sem fio entre dispositivos e o roteador. A faixa de 2,4 GHz alcança distâncias maiores, mas é mais lenta e sofre mais interferência; a faixa de 5 GHz é mais rápida, porém com alcance menor. O Wi-Fi 6 é o padrão mais recente, com melhor desempenho em redes com muitos dispositivos conectados.",
      "O resultado de um teste de velocidade via Wi-Fi tende a variar mais do que via cabo de rede, por depender da distância até o roteador e de interferências do ambiente.",
    ],
    related: ["roteador", "velocidade-de-download"],
  },
];
