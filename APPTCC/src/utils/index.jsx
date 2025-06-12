const perguntasDict = [
  {
    titulo: "1. Definição das Áreas e Atrações do Parque",
    pergunta:
      "Quais cartas indicam a necessidade de áreas separadas para diferentes tipos de atrações, como zonas radicais e infantis, conforme o requisito funcional de definição das áreas e atrações do parque?",
    respostasCorretasFuncionais: ["27", "38"],
    respostasCorretasNaoFuncionais: ["39", "21"],
    respostasCorretasFuncionaisExplicacao: [
      "A engenheira chefe sempre fala a verdade e dessa forma ela viu uma necessidade do parque que é ter áreas separadas.",
      "Como mencionado pela engenheira chefe na outra carta, essa carta evidência a necessidade de uma área infantil separada.",
    ],
    respostasCorretasNaoFuncionaisExplicacao: [
      "Essa carta é verdadeira pois fala do requisito não funcional da acessibilidade através de rampas para cadeirantes ",
      "Essa carta é verdadeira pois fala do requisito não funcional da acessibilidade através de funcionários que podem ajudar visitantes que são deficientes auditivos",
    ],
  },
  {
    titulo: "2. Gerenciamento de Eventos e Shows",
    pergunta:
      "Como as informações sobre eventos e shows influenciam a experiência dos visitantes, e quais cartas refletem o requisito funcional de gerenciamento de eventos e shows?",
    respostasCorretasFuncionais: ["20", "11"],
    respostasCorretasNaoFuncionais: ["34", "18"],
    respostasCorretasFuncionaisExplicacao: [
      "Essa carta é um requisito funcional que descreve uma funcionalidade específica que o parque deve oferecer para atender às necessidades dos visitantes",
      "Através dessa carta é possível identificar a necessidade do parque de ter shows avisados com antecedência",
    ],
    respostasCorretasNaoFuncionaisExplicacao: [
      "Essa carta é verdadeira pois fala do requisito não funcional da acessibilidade e usabilidade facilitando daltonicos a ter uma maior facilidade ao utilizar o aplicativo",
      "Essa carta é verdadeira pois fala do requisito não funcional da segurança entendendo a importância dos visitantes se sentirem seguros nos shows",
    ],
  },
  {
    titulo: "3. Gestão do Fluxo de Visitantes e Organização das Filas",
    pergunta:
      "Quais cartas refletem preocupações sobre a organização das filas e o fluxo de visitantes, em relação ao requisito funcional de gestão do fluxo de visitantes e organização das filas?",
    respostasCorretasFuncionais: ["44", "14"],
    respostasCorretasNaoFuncionais: ["42", "15"],
    respostasCorretasFuncionaisExplicacao: [
      "Essa carta descreve mais um requisito funcional do parque, a necessidade de avisar os visitantes para evitar insatisfação",
      "Essa carta conflita com a carta 31 que fala que o parque não tem filas, porém os documentos do parque sempre falam a verdade",
    ],
    respostasCorretasNaoFuncionaisExplicacao: [
      "Essa carta é verdadeira pois fala do requisito não funcional da acessibilidade e usabilidade, ajudando a melhorar a experiência do parque para deficientes e idosos",
      "Essa carta é verdadeira pois fala do requisito não funcional da acessibilidade facilitando para pessoas com problema de visão entenderem melhor o tamanho das filas",
    ],
  },
  {
    titulo: "4. Criação de Áreas de Descanso e Alimentação",
    pergunta:
      "Que feedback ou observações dos visitantes evidenciam a necessidade de áreas de descanso e opções de alimentação bem distribuídas, conforme o requisito funcional de criação de áreas de descanso e alimentação?",
    respostasCorretasFuncionais: ["19", "29"],
    respostasCorretasNaoFuncionais: ["32", "28"],
    respostasCorretasFuncionaisExplicacao: [
      "Essa carta conflita com a 41 porém ela faz mais sentido devido a necessidade de ter várias opções de comida ao redor do parque e não apenas sorvetes",
      "Mais um requisito funcional que traz uma necessidade do parque, que é o aumento de bancos para os visitantes",
    ],
    respostasCorretasNaoFuncionaisExplicacao: [
      "Essa carta é verdadeira pois fala do requisito não funcional da usabilidade aumentar a quantidade de áreas de descanso melhora a experiência do visitante no parque ",
      "Essa carta é verdadeira pois fala do requisito não funcional da eficiência porque reduz o tempo de espera e otimiza o processo.",
    ],
  },
  {
    titulo: "5. Criação e Gestão da Loja de Produtos Temáticos",
    pergunta:
      "Quais cartas falam sobre a localização ideal para as lojas de produtos temáticos e como isso poderia impactar a experiência de compra dos visitantes, em relação ao requisito funcional de criação e gestão da loja de produtos temáticos?",
    respostasCorretasFuncionais: ["37", "23"],
    respostasCorretasNaoFuncionais: ["43", "24"],
    respostasCorretasFuncionaisExplicacao: [
      "Essa carta conflita com a carta 10, mostrando que existem vários problemas nas lojas que deveriam ser melhorados",
      "Essa carta mostra a necessidade de colocar as lojas mais perto das atrações, gerando mais engajamento por parte dos visitantes",
    ],
    respostasCorretasNaoFuncionaisExplicacao: [
      "Essa carta é verdadeira pois evidencia a necessidade de melhorar a usabilidade e a navegação dentro da loja.",
      "Essa carta fala na necessidade de melhorar a experiência do usuário ao entrar em uma loja",
    ],
  },
  {
    titulo: "6. Sistema de Avaliação dos Visitantes",
    pergunta:
      "Como o feedback dos visitantes pode ser utilizado para melhorar as atrações e o parque como um todo, e quais cartas fornecem informações sobre as opiniões dos visitantes, conforme o requisito funcional de sistema de avaliação dos visitantes?",
    respostasCorretasFuncionais: ["26", "16"],
    respostasCorretasNaoFuncionais: ["33", "1"],
    respostasCorretasFuncionaisExplicacao: [
      "Essa carta conflita com a 35, mostrando que é muito demorado deixar um feedback para o parque",
      "Essa carta junto com a 26 mostra que o sistema de feedback precisa de melhorias e não é bom como o funcionário falou",
    ],
    respostasCorretasNaoFuncionaisExplicacao: [
      "Essa carta evidencia na melhora do requisito nao funcional de desempenho pois estabelece um limite de tempo para uma funcionalidade específica.",
      "Essa carta destaca a necessidade de aprimorar a manutenibilidade e acessibilidade, evidenciando a importância de um aplicativo fácil de atualizar e compatível com múltiplos idiomas para melhorar a experiência dos visitantes.",
    ],
  },
  {
    titulo: "7. Plano de Manutenção das Atrações",
    pergunta:
      "Quais cartas revelam preocupações sobre a segurança e a manutenção das atrações, e como as informações coletadas podem ajudar a implementar um plano de manutenção eficaz, em relação ao requisito funcional de plano de manutenção das atrações?",
    respostasCorretasFuncionais: ["22", "30"],
    respostasCorretasNaoFuncionais: ["45", "48"],
    respostasCorretasFuncionaisExplicacao: [
      "Essa carta complementa a carta 30, mostrando que os visitantes precisam ser avisados quando um brinquedo estiver em manutenção",
      "A engenheira chefe é quem fala nessa carta, dessa forma ele é verdadeira e mostra que a carta 17 estava errada",
    ],
    respostasCorretasNaoFuncionaisExplicacao: [
      " Essa carta evidencia a necessidade de um requisito não funcional de confiabilidade e manutenibilidade. sugerindo implementação de alertas automáticos para informar sobre a necessidade de manutenção dos brinquedos",
      "Essa carta destaca a necessidade de aprimorar a confiabilidade e manutenibilidade, garantindo que os dados de manutenção sejam sempre atualizados e não se percam ao longo do tempo.",
    ],
  },
  {
    titulo: "8. Gestão da Equipe do Parque",
    pergunta:
      "Quais cartas destacam a importância de uma gestão eficiente da equipe do parque, incluindo segurança e atendimento ao visitante, conforme o requisito funcional de gestão da equipe do parque?",
    respostasCorretasFuncionais: ["40", "25"],
    respostasCorretasNaoFuncionais: ["46", "47"],
    respostasCorretasFuncionaisExplicacao: [
      "Como os documentos são sempre verdadeiros, essa carta ajuda a entender que os horários precisam ser ajustados",
      "Essa carta complementa a carta 40 mostrando que existe problema nas distribuições de turnos",
    ],
    respostasCorretasNaoFuncionaisExplicacao: [
      "Essa carta evidencia a necessidade de monitoramento em tempo real e eficiência operacional, permitindo ajustes rápidos com base no desempenho das equipes.",
      "Essa carta destaca a necessidade de personalização e flexibilidade, permitindo que o sistema seja adaptado às necessidades específicas de cada equipe.",
    ],
  },
];

export default perguntasDict;

export const resultadoFinal = {
  arquiteto: {
    titulo: "Arquiteto de Diversões",
    descricao:
      "Você é um verdadeiro arquiteto de diversões! Sua habilidade em projetar um parque que atenda às necessidades dos usuários e às exigências funcionais e não funcionais demonstra uma compreensão profunda de como criar experiências memoráveis. Seus insights são inestimáveis para qualquer projeto de parque de diversões!",
  },
  designer: {
    titulo: "Designer de Experiências",
    descricao:
      "Como designer de experiências, você tem o talento de criar momentos mágicos em um parque de diversões. Sua capacidade de identificar requisitos essenciais reflete sua visão inovadora e sensibilidade às necessidades dos visitantes e funcionários. Continue a aprimorar suas habilidades para criar experiências ainda mais impactantes!",
  },
  criador: {
    titulo: "Criador de Aventuras",
    descricao:
      "Você é um criador de aventuras! Suas contribuições ao projeto do parque mostram que você está no caminho certo para entender as expectativas dos visitantes e funcionários. Porém, ainda há espaço para expandir sua análise e enriquecer a proposta com novas ideias.",
  },
  explorador: {
    titulo: "Explorador de Ideias",
    descricao:
      "Como explorador de ideias, você está começando a reconhecer a importância de identificar as necessidades e expectativas dos usuários no desenvolvimento de um parque de diversões. Suas observações são valiosas, mas seu trabalho ainda precisa de mais detalhamento para garantir que todos os objetivos sejam atendidos.",
  },
  novato: {
    titulo: "Novato em Criação de Diversões:",
    descricao:
      "Você é um novato em criação de diversões. Sua jornada está apenas começando, e sua curiosidade sobre como projetar experiências é um bom primeiro passo. Continue explorando e aprendendo para se tornar um criador de parques eficaz!",
  },
};
