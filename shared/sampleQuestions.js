const DEFAULT_DURATION_MS = 30000;

export const DEFAULT_THEME = "CONCEITOS BÃSICOS";
export const QUESTION_THEMES = [DEFAULT_THEME, "TERMINOLOGIA"];

export const quizQuestionsByTheme = {
  "CONCEITOS BÃSICOS": [
    {
      id: "CB-01",
      question:
        "De acordo com o material, qual foi o marco principal da 1Âª RevoluÃ§Ã£o Industrial iniciada na Inglaterra por volta de 1765?",
      options: [
        "A descoberta da energia nuclear e o surgimento de computadores.",
        "O surgimento da eletricidade e do petrÃ³leo como novas formas de energia.",
        "A interconexÃ£o de todas as etapas de produÃ§Ã£o atravÃ©s da digitalizaÃ§Ã£o.",
        "A mecanizaÃ§Ã£o dos processos e a invenÃ§Ã£o de mÃ¡quinas a vapor."
      ],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-02",
      question:
        "Qual Ã© a principal caracterÃ­stica que define a IndÃºstria 4.0 em relaÃ§Ã£o Ã s revoluÃ§Ãµes anteriores?",
      options: [
        "A introduÃ§Ã£o das linhas de montagem baseadas no Fordismo.",
        "A interconexÃ£o de etapas produtivas e a utilizaÃ§Ã£o de dados para eficiÃªncia.",
        "A substituiÃ§Ã£o total de funcionÃ¡rios humanos por robÃ´s autÃ´nomos.",
        "O uso exclusivo de combustÃ­veis fÃ³sseis para acelerar a produÃ§Ã£o"
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-03",
      question:
        "Em sistemas de controle, qual a principal diferenÃ§a entre uma malha aberta e uma malha fechada?",
      options: [
        "A malha fechada utiliza a informaÃ§Ã£o da saÃ­da para ajustar a entrada, enquanto a aberta nÃ£o.",
        "Sistemas de malha aberta sÃ£o exclusivos do mundo fÃ­sico, como motores.",
        "A malha aberta Ã© mais precisa pois nÃ£o sofre interferÃªncia de sensores.",
        "Apenas a malha fechada possui uma planta ou processo definido."
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-04",
      question: "Como Ã© definido o conceito de 'VariÃ¡vel Manipulada' (VM) em um processo industrial?",
      options: [
        "Ã‰ o valor de referÃªncia que o operador define no painel de controle.",
        "Ã‰ a variÃ¡vel sobre a qual o controlador atua para manter a variÃ¡vel controlada no valor desejado.",
        "Ã‰ a condiÃ§Ã£o externa imprevisÃ­vel que afeta negativamente o desempenho do processo.",
        "Ã‰ o sinal que o sensor envia para indicar o estado atual do sistema."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-05",
      question:
        "No exemplo do sistema de aquecimento de Ã¡gua, qual alternativa identifica corretamente as variÃ¡veis?",
      options: [
        "O vapor Ã© o Set Point e a Ã¡gua aquecida Ã© o DistÃºrbio.",
        "A temperatura da Ã¡gua Ã© a VariÃ¡vel de Processo e a vazÃ£o de vapor Ã© a VariÃ¡vel Manipulada.",
        "A entrada de Ã¡gua fria Ã© a VariÃ¡vel Manipulada.",
        "A vÃ¡lvula manual Ã© o sensor e o termÃ´metro Ã© o atuador."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS,
      media: {
        type: "image",
        src: "/figura-01.png",
        alt: "Figura 01 do exemplo de aquecimento de Ã¡gua com as variÃ¡veis do processo."
      }
    },
    {
      id: "CB-06",
      question: "Qual Ã© a funÃ§Ã£o de um instrumento classificado como 'Cego'?",
      options: [
        "Ele nÃ£o possui uma indicaÃ§Ã£o local visÃ­vel da variÃ¡vel que estÃ¡ medindo.",
        "Ele converte sinais mecÃ¢nicos em sinais pneumÃ¡ticos exclusivamente.",
        "Ele Ã© um instrumento quebrado que nÃ£o consegue detectar sinais.",
        "Ele serve apenas para registrar dados em papel para anÃ¡lise posterior."
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-07",
      question:
        "Historicamente, qual foi a contribuiÃ§Ã£o de Denis Papin para a engenharia de controle em 1681?",
      options: [
        "O desenvolvimento do primeiro sistema de controle de nÃ­vel por boia.",
        "A invenÃ§Ã£o da vÃ¡lvula de seguranÃ§a para regulaÃ§Ã£o da pressÃ£o de vapor.",
        "A descoberta da realimentaÃ§Ã£o negativa em circuitos eletrÃ´nicos.",
        "A criaÃ§Ã£o do modelo de produÃ§Ã£o flexÃ­vel conhecido como Toyotismo."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-08",
      question: "O que define um instrumento 'Transdutor' na instrumentaÃ§Ã£o industrial?",
      options: [
        "Um dispositivo que apenas mostra o valor da variÃ¡vel de forma analÃ³gica.",
        "Um instrumento que recebe informaÃ§Ãµes em uma forma fÃ­sica e as converte em um sinal de saÃ­da resultante.",
        "Um elemento que atua diretamente no processo para fechar uma vÃ¡lvula.",
        "Um sensor que nÃ£o precisa de energia externa para funcionar."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-09",
      question:
        "Qual destes componentes Ã© responsÃ¡vel por comparar a variÃ¡vel de processo com o Set Point e decidir a aÃ§Ã£o a ser tomada?",
      options: ["Controlador.", "Transmissor.", "Atuador.", "Sensor."],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-10",
      question:
        "Considere um elevador que deve parar no 4Âº andar. Se ele para exatamente no 4Âº andar apÃ³s um tempo, como chamamos o estado final da sua resposta?",
      options: [
        "Resposta transitÃ³ria.",
        "Comando de entrada.",
        "Resposta em regime permanente.",
        "Erro de regime permanente."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    }
  ],
  TERMINOLOGIA: [
    {
      id: "TM-01",
      question:
        "Um sensor de temperatura possui uma faixa nominal (range) de -100 ÂºC a 500 ÂºC. Qual Ã© o alcance (span) desse instrumento?",
      options: ["500 ÂºC", "-600ÂºC", "400 ÂºC", "600Âº C"],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-02",
      question:
        "Como Ã© definida a 'Sensibilidade' de um instrumento de mediÃ§Ã£o de acordo com o INMETRO?",
      options: [
        "O grau de concordÃ¢ncia entre o resultado da mediÃ§Ã£o e o valor verdadeiro.",
        "A menor diferenÃ§a entre indicaÃ§Ãµes que pode ser percebida.",
        "A resposta do instrumento dividida pela correspondente variaÃ§Ã£o no estÃ­mulo.",
        "A diferenÃ§a entre o valor medido e o valor real da variÃ¡vel."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-03",
      question:
        "Um voltÃ­metro digital possui um display que exibe duas casas decimais (ex: 0,00V). Qual Ã© a resoluÃ§Ã£o deste instrumento?",
      options: ["0,1V", "0,01 V", "1V", "0,001"],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-04",
      question:
        "O fenÃ´meno onde a saÃ­da de um transmissor difere para uma mesma entrada dependendo se o sinal Ã© aplicado de forma ascendente ou descendente Ã© chamado de:",
      options: ["Desvio de Zero", "Histerese", "Zona Morta", "Repetibilidade"],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-05",
      question:
        "Um instrumento com range de 50 ÂºC a 150 ÂºC possui uma exatidÃ£o de Â±0,5 % do span. Se ele indica 80 ÂºC, em qual intervalo a temperatura real se encontra?",
      options: [
        "Entre 79,6 ÂºC e 80,4 ÂºC.",
        "Entre 79,25 ÂºC e 80,75 ÂºC.",
        "Entre 79,5 ÂºC e 80,5 ÂºC.",
        "Entre 79,5 ÂºC e 80,25 ÂºC."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-06",
      question: "Qual Ã© a principal diferenÃ§a entre erro sistemÃ¡tico e erro aleatÃ³rio?",
      options: [
        "Erros aleatÃ³rios sÃ£o sempre positivos, enquanto sistemÃ¡ticos sÃ£o negativos.",
        "O erro sistemÃ¡tico Ã© imprevisÃ­vel, enquanto o aleatÃ³rio Ã© constante.",
        "O erro sistemÃ¡tico mantÃ©m-se constante ou varia de forma previsÃ­vel, enquanto o aleatÃ³rio varia de forma imprevisÃ­vel.",
        "Somente o erro aleatÃ³rio pode ser chamado de erro absoluto."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-07",
      question:
        "Um sensor de nÃ­vel Ã© ajustado para medir entre 1m e 3m. Como sÃ£o chamados esses limites de ajuste configurados no sensor?",
      options: [
        "Zona Morta Superior e Inferior",
        "Span MÃ¡ximo",
        "LRL e URL",
        "Zero e Fundo de Escala Nominais"
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-08",
      question: "Sobre o 'Zero do instrumento', Ã© correto afirmar que:",
      options: [
        "Ã‰ obrigatoriamente o valor numÃ©rico zero na escala da variÃ¡vel.",
        "Representa o limite inferior da faixa nominal de mediÃ§Ã£o.",
        "Sempre coincide com o valor de vÃ¡cuo absoluto em sensores de pressÃ£o.",
        "Ã‰ o valor mÃ¡ximo que o instrumento pode medir com seguranÃ§a."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-09",
      question:
        "Um instrumento possui um range de 0 ÂºC a 200 ÂºC e uma zona morta de Â±0,1% do span. Qual Ã© o menor valor de variaÃ§Ã£o na temperatura que garantidamente provocarÃ¡ uma resposta na saÃ­da?",
      options: ["0,2 ÂºC", "2 ÂºC", "0,02 ÂºC", "0,1 ÂºC"],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-10",
      question:
        "Um voltÃ­metro analÃ³gico possui uma classe de exatidÃ£o de 1,5% e fundo de escala de 300V. Qual o erro mÃ¡ximo absoluto permitido para este instrumento?",
      options: ["Â±1,5V", "Â±4,5V", "Â±45V", "Â±3V"],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    }
  ]
};

export function getQuestionsForTheme(theme = DEFAULT_THEME) {
  const selectedTheme = QUESTION_THEMES.includes(theme) ? theme : DEFAULT_THEME;
  const questions = quizQuestionsByTheme[selectedTheme] ?? quizQuestionsByTheme[DEFAULT_THEME];

  return questions.map((question) => ({
    ...question,
    options: [...question.options],
    media: question.media ? { ...question.media } : null
  }));
}