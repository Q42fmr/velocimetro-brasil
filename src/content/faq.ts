/**
 * Perguntas frequentes sobre o teste de velocidade de internet.
 * Cada resposta é uma lista de parágrafos em texto puro.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string[];
}

export const faqItems: FaqItem[] = [
  {
    id: "como-fazer-o-teste",
    question: "Como fazer o teste de velocidade da minha internet?",
    answer: [
      "Para medir a velocidade da internet no Velocímetro Brasil, basta abrir a página inicial e clicar no botão de iniciar. O teste de velocidade roda direto no seu navegador, sem instalar nenhum programa e sem precisar de cadastro.",
      "Durante a medição, o velocímetro de internet avalia em sequência o ping, a latência, o jitter, a velocidade de download e a velocidade de upload. O resultado completo aparece em poucos segundos na tela, com a opção de guardar um histórico apenas no seu dispositivo.",
    ],
  },
  {
    id: "o-que-e-download",
    question: "O que significa velocidade de download no teste de velocidade?",
    answer: [
      "A velocidade de download é a taxa em que dados chegam da internet até o seu dispositivo — por exemplo, ao assistir a um vídeo, baixar um arquivo ou carregar uma página. É normalmente o número mais alto exibido em um teste de velocidade de internet, medido em Mbps (megabits por segundo).",
      "Quanto maior a velocidade de download, mais rápido você consegue carregar conteúdos pesados, como streaming em alta definição ou downloads de arquivos grandes.",
    ],
  },
  {
    id: "o-que-e-upload",
    question: "O que significa velocidade de upload?",
    answer: [
      "A velocidade de upload é a taxa em que dados saem do seu dispositivo em direção à internet, como ao enviar fotos, fazer uma videochamada ou transmitir uma live. Em planos residenciais de banda larga, o upload costuma ser bem menor que o download.",
      "Se você trabalha com videoconferência, backup na nuvem ou transmissão ao vivo, vale prestar atenção especial a esse número no seu teste de velocidade.",
    ],
  },
  {
    id: "o-que-e-ping-latencia-jitter",
    question: "O que são ping, latência e jitter?",
    answer: [
      "Ping e latência indicam o tempo, em milissegundos (ms), que um pacote de dados leva para ir do seu dispositivo até um servidor e voltar. Quanto menor esse número, mais responsiva é a conexão — algo essencial para jogos online e videochamadas.",
      "Jitter é a variação da latência ao longo do tempo. Uma conexão com jitter alto pode parecer instável mesmo com ping baixo, causando travamentos em chamadas de vídeo ou engasgos em partidas online.",
    ],
  },
  {
    id: "resultado-diferente-do-contratado",
    question: "Por que o resultado do teste é diferente da velocidade contratada?",
    answer: [
      "É normal que o teste de velocidade mostre um valor diferente do plano contratado. Conexões Wi-Fi perdem desempenho por distância do roteador, paredes, interferência de outros aparelhos e número de dispositivos conectados ao mesmo tempo.",
      "O horário também influencia: em horários de pico, com mais pessoas usando a rede do provedor na sua região, a velocidade pode cair. Dispositivos antigos, roteadores desatualizados e cabos de rede de baixa qualidade também reduzem o resultado.",
      "Para um diagnóstico mais justo, teste a internet lenta suspeita com um cabo de rede ligado diretamente ao roteador, em vez de depender só do Wi-Fi.",
    ],
  },
  {
    id: "mbps-vs-mb-por-segundo",
    question: "Qual a diferença entre Mbps e MB/s?",
    answer: [
      "Essa é uma das dúvidas mais comuns sobre teste de velocidade de internet. Mbps significa megabits por segundo, a unidade usada pelos provedores para anunciar planos de banda larga. Já MB/s significa megabytes por segundo, unidade usada por navegadores e gerenciadores de download para mostrar o progresso de um arquivo.",
      "Como 1 byte equivale a 8 bits, a conversão é simples: divida o valor em Mbps por 8 para obter MB/s. Um plano de 100 Mbps, por exemplo, corresponde a no máximo 12,5 MB/s de velocidade de download teórica — por isso o download de um arquivo pode parecer mais lento do que o número do seu plano sugere.",
    ],
  },
  {
    id: "regra-anatel-velocidade-minima",
    question: "Existe uma regra da Anatel sobre velocidade mínima de internet?",
    answer: [
      "Sim. Pelo Regulamento Geral de Qualidade (RGQ-SCM) da Anatel, instituído pela Resolução 717/2019, os provedores de banda larga fixa devem entregar, em média, pelo menos 80% da velocidade de download contratada, considerando as medições do período, e no mínimo 40% da velocidade contratada em cada medição instantânea.",
      "Esses percentuais servem como referência para avaliar se o seu resultado está dentro do esperado. Se o teste de velocidade mostrar valores recorrentemente abaixo desses limites, é um indício de que vale abrir uma reclamação junto à operadora ou aos órgãos de defesa do consumidor.",
    ],
  },
  {
    id: "wifi-ou-cabo",
    question: "É melhor testar a velocidade da internet no Wi-Fi ou no cabo?",
    answer: [
      "O cabo de rede (Ethernet) costuma entregar uma velocidade mais próxima do plano contratado, porque não sofre interferência de sinal nem concorre com outros aparelhos conectados à mesma rede sem fio.",
      "Já o teste de velocidade via Wi-Fi mostra a experiência real do dia a dia em notebooks, celulares e smart TVs, que normalmente não têm entrada para cabo. O ideal é fazer os dois testes e comparar: uma diferença grande entre eles aponta um problema específico no Wi-Fi, como posição do roteador ou interferência.",
    ],
  },
  {
    id: "quantos-megas-eu-preciso",
    question: "Quantos Mbps eu preciso para streaming, videochamada e jogos?",
    answer: [
      "Para streaming em HD, cerca de 5 Mbps de download já costumam ser suficientes; para streaming em 4K, o recomendado sobe para cerca de 25 Mbps, considerando um único dispositivo assistindo por vez.",
      "Videochamadas e reuniões online geralmente funcionam bem entre 3 e 5 Mbps de download e upload. Já para jogos online, o fator mais importante não é a velocidade de download, e sim o ping: valores de até 50 ms costumam garantir uma experiência fluida, mesmo com planos de banda larga mais modestos.",
    ],
  },
  {
    id: "teste-nao-mede-perda-de-pacotes",
    question: "Por que o teste de velocidade não mostra a perda de pacotes?",
    answer: [
      "O Velocímetro Brasil roda inteiramente no navegador, usando requisições HTTP de download e upload para medir desempenho. Esse tipo de medição enxerga o resultado final da transferência, mas não os pacotes IP individuais que trafegam pela rede.",
      "Para medir perda de pacotes de forma precisa é preciso um software instalado no sistema operacional, com acesso de baixo nível à rede (como ferramentas de ping contínuo via linha de comando), algo que um site não consegue fazer por motivos de segurança do navegador.",
    ],
  },
  {
    id: "teste-consome-franquia",
    question: "O teste de velocidade consome a franquia de dados do meu plano?",
    answer: [
      "Sim. Para medir download e upload de forma confiável, o teste de velocidade transfere dados reais entre o seu dispositivo e o servidor de medição, consumindo em geral algo entre 150 MB e 300 MB por execução completa, dependendo da velocidade da sua conexão.",
      "Em planos de internet móvel com franquia limitada, use o teste com moderação para não comprometer seus dados do mês. Em banda larga fixa sem limite de franquia, isso normalmente não é um problema.",
    ],
  },
  {
    id: "e-gratuito-sem-cadastro",
    question: "O teste de velocidade é gratuito e precisa de cadastro?",
    answer: [
      "O Velocímetro Brasil é totalmente gratuito e não exige cadastro, login ou instalação de aplicativo. Basta acessar o site e clicar em iniciar o teste de velocidade de internet quantas vezes quiser.",
    ],
  },
  {
    id: "onde-ficam-meus-resultados",
    question: "Onde ficam guardados os resultados dos meus testes?",
    answer: [
      "O histórico de resultados fica salvo apenas no seu próprio dispositivo, usando o armazenamento local (localStorage) do navegador, com no máximo 20 medições guardadas por vez.",
      "Isso significa que os resultados não são enviados nem armazenados em nenhum servidor do Velocímetro Brasil, e que o histórico some se você limpar os dados do navegador ou trocar de dispositivo.",
    ],
  },
  {
    id: "como-melhorar-velocidade",
    question: "Como posso melhorar a velocidade da minha internet?",
    answer: [
      "Algumas medidas simples costumam melhorar bastante o resultado do teste de velocidade: reiniciar o roteador periodicamente, usar a rede de 5 GHz em vez da 2,4 GHz quando o dispositivo estiver perto do roteador, e preferir um cabo de rede para equipamentos fixos como computadores e consoles.",
      "Também ajuda fechar downloads, atualizações e transmissões em segundo plano enquanto testa a conexão, posicionar o roteador em um local central e desativado de obstáculos, e verificar se uma VPN ativa não está reduzindo a velocidade de download e upload.",
    ],
  },
  {
    id: "velocidade-abaixo-do-contratado",
    question: "O que fazer se a velocidade estiver sempre abaixo do contratado?",
    answer: [
      "Primeiro, repita o teste de velocidade em horários diferentes do dia e, se possível, usando um cabo de rede direto no roteador, para descartar interferências do Wi-Fi. Guarde alguns resultados no histórico como registro.",
      "Se a velocidade contratada continuar não sendo entregue mesmo em testes por cabo, entre em contato com a operadora informando os resultados obtidos. Caso o problema não seja resolvido, é possível registrar uma reclamação na Anatel ou no portal consumidor.gov.br, citando a regra de velocidade mínima do RGQ-SCM.",
    ],
  },
];
