const DEFAULT_DURATION_MS = 30000;

export const DEFAULT_THEME = "CONCEITOS B\u00c1SICOS";
export const QUESTION_THEMES = [DEFAULT_THEME, "TERMINOLOGIA"];

export const quizQuestionsByTheme = {
  "CONCEITOS B\u00c1SICOS": [
    {
      id: "CB-01",
      question:
        "De acordo com o material, qual foi o marco principal da 1\u00aa Revolu\u00e7\u00e3o Industrial iniciada na Inglaterra por volta de 1765?",
      options: [
        "A descoberta da energia nuclear e o surgimento de computadores.",
        "O surgimento da eletricidade e do petr\u00f3leo como novas formas de energia.",
        "A interconex\u00e3o de todas as etapas de produ\u00e7\u00e3o atrav\u00e9s da digitaliza\u00e7\u00e3o.",
        "A mecaniza\u00e7\u00e3o dos processos e a inven\u00e7\u00e3o de m\u00e1quinas a vapor."
      ],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-02",
      question:
        "Qual \u00e9 a principal caracter\u00edstica que define a Ind\u00fastria 4.0 em rela\u00e7\u00e3o \u00e0s revolu\u00e7\u00f5es anteriores?",
      options: [
        "A introdu\u00e7\u00e3o das linhas de montagem baseadas no Fordismo.",
        "A interconex\u00e3o de etapas produtivas e a utiliza\u00e7\u00e3o de dados para efici\u00eancia.",
        "A substitui\u00e7\u00e3o total de funcion\u00e1rios humanos por rob\u00f4s aut\u00f4nomos.",
        "O uso exclusivo de combust\u00edveis f\u00f3sseis para acelerar a produ\u00e7\u00e3o."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-03",
      question:
        "Em sistemas de controle, qual a principal diferen\u00e7a entre uma malha aberta e uma malha fechada?",
      options: [
        "A malha fechada utiliza a informa\u00e7\u00e3o da sa\u00edda para ajustar a entrada, enquanto a aberta n\u00e3o.",
        "Sistemas de malha aberta s\u00e3o exclusivos do mundo f\u00edsico, como motores.",
        "A malha aberta \u00e9 mais precisa pois n\u00e3o sofre interfer\u00eancia de sensores.",
        "Apenas a malha fechada possui uma planta ou processo definido."
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-04",
      question:
        "Como \u00e9 definido o conceito de 'Vari\u00e1vel Manipulada' (VM) em um processo industrial?",
      options: [
        "\u00c9 o valor de refer\u00eancia que o operador define no painel de controle.",
        "\u00c9 a vari\u00e1vel sobre a qual o controlador atua para manter a vari\u00e1vel controlada no valor desejado.",
        "\u00c9 a condi\u00e7\u00e3o externa imprevis\u00edvel que afeta negativamente o desempenho do processo.",
        "\u00c9 o sinal que o sensor envia para indicar o estado atual do sistema."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-05",
      question:
        "No exemplo do sistema de aquecimento de \u00e1gua, qual alternativa identifica corretamente as vari\u00e1veis?",
      options: [
        "O vapor \u00e9 o Set Point e a \u00e1gua aquecida \u00e9 o Dist\u00farbio.",
        "A temperatura da \u00e1gua \u00e9 a Vari\u00e1vel de Processo e a vaz\u00e3o de vapor \u00e9 a Vari\u00e1vel Manipulada.",
        "A entrada de \u00e1gua fria \u00e9 a Vari\u00e1vel Manipulada.",
        "A v\u00e1lvula manual \u00e9 o sensor e o term\u00f4metro \u00e9 o atuador."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS,
      media: {
        type: "image",
        src: "/figura-01.png",
        alt: "Figura 01 do exemplo de aquecimento de \u00e1gua com as vari\u00e1veis do processo."
      }
    },
    {
      id: "CB-06",
      question: "Qual \u00e9 a fun\u00e7\u00e3o de um instrumento classificado como 'Cego'?",
      options: [
        "Ele n\u00e3o possui uma indica\u00e7\u00e3o local vis\u00edvel da vari\u00e1vel que est\u00e1 medindo.",
        "Ele converte sinais mec\u00e2nicos em sinais pneum\u00e1ticos exclusivamente.",
        "Ele \u00e9 um instrumento quebrado que n\u00e3o consegue detectar sinais.",
        "Ele serve apenas para registrar dados em papel para an\u00e1lise posterior."
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-07",
      question:
        "Historicamente, qual foi a contribui\u00e7\u00e3o de Denis Papin para a engenharia de controle em 1681?",
      options: [
        "O desenvolvimento do primeiro sistema de controle de n\u00edvel por boia.",
        "A inven\u00e7\u00e3o da v\u00e1lvula de seguran\u00e7a para regula\u00e7\u00e3o da press\u00e3o de vapor.",
        "A descoberta da realimenta\u00e7\u00e3o negativa em circuitos eletr\u00f4nicos.",
        "A cria\u00e7\u00e3o do modelo de produ\u00e7\u00e3o flex\u00edvel conhecido como Toyotismo."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-08",
      question: "O que define um instrumento 'Transdutor' na instrumenta\u00e7\u00e3o industrial?",
      options: [
        "Um dispositivo que apenas mostra o valor da vari\u00e1vel de forma anal\u00f3gica.",
        "Um instrumento que recebe informa\u00e7\u00f5es em uma forma f\u00edsica e as converte em um sinal de sa\u00edda resultante.",
        "Um elemento que atua diretamente no processo para fechar uma v\u00e1lvula.",
        "Um sensor que n\u00e3o precisa de energia externa para funcionar."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-09",
      question:
        "Qual destes componentes \u00e9 respons\u00e1vel por comparar a vari\u00e1vel de processo com o Set Point e decidir a a\u00e7\u00e3o a ser tomada?",
      options: ["Controlador.", "Transmissor.", "Atuador.", "Sensor."],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-10",
      question:
        "Considere um elevador que deve parar no 4\u00ba andar. Se ele para exatamente no 4\u00ba andar ap\u00f3s um tempo, como chamamos o estado final da sua resposta?",
      options: [
        "Resposta transit\u00f3ria.",
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
        "Um sensor de temperatura possui uma faixa nominal (range) de -100 \u00b0C a 500 \u00b0C. Qual \u00e9 o alcance (span) desse instrumento?",
      options: ["500 \u00b0C", "-600 \u00b0C", "400 \u00b0C", "600 \u00b0C"],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-02",
      question:
        "Como \u00e9 definida a 'Sensibilidade' de um instrumento de medi\u00e7\u00e3o de acordo com o INMETRO?",
      options: [
        "O grau de concord\u00e2ncia entre o resultado da medi\u00e7\u00e3o e o valor verdadeiro.",
        "A menor diferen\u00e7a entre indica\u00e7\u00f5es que pode ser percebida.",
        "A resposta do instrumento dividida pela correspondente varia\u00e7\u00e3o no est\u00edmulo.",
        "A diferen\u00e7a entre o valor medido e o valor real da vari\u00e1vel."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-03",
      question:
        "Um volt\u00edmetro digital possui um display que exibe duas casas decimais (ex: 0,00V). Qual \u00e9 a resolu\u00e7\u00e3o deste instrumento?",
      options: ["0,1V", "0,01 V", "1V", "0,001"],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-04",
      question:
        "O fen\u00f4meno onde a sa\u00edda de um transmissor difere para uma mesma entrada dependendo se o sinal \u00e9 aplicado de forma ascendente ou descendente \u00e9 chamado de:",
      options: ["Desvio de Zero", "Histerese", "Zona Morta", "Repetibilidade"],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-05",
      question:
        "Um instrumento com range de 50 \u00b0C a 150 \u00b0C possui uma exatid\u00e3o de \u00b10,5 % do span. Se ele indica 80 \u00b0C, em qual intervalo a temperatura real se encontra?",
      options: [
        "Entre 79,6 \u00b0C e 80,4 \u00b0C.",
        "Entre 79,25 \u00b0C e 80,75 \u00b0C.",
        "Entre 79,5 \u00b0C e 80,5 \u00b0C.",
        "Entre 79,5 \u00b0C e 80,25 \u00b0C."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-06",
      question: "Qual \u00e9 a principal diferen\u00e7a entre erro sistem\u00e1tico e erro aleat\u00f3rio?",
      options: [
        "Erros aleat\u00f3rios s\u00e3o sempre positivos, enquanto sistem\u00e1ticos s\u00e3o negativos.",
        "O erro sistem\u00e1tico \u00e9 imprevis\u00edvel, enquanto o aleat\u00f3rio \u00e9 constante.",
        "O erro sistem\u00e1tico mant\u00e9m-se constante ou varia de forma previs\u00edvel, enquanto o aleat\u00f3rio varia de forma imprevis\u00edvel.",
        "Somente o erro aleat\u00f3rio pode ser chamado de erro absoluto."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-07",
      question:
        "Um sensor de n\u00edvel \u00e9 ajustado para medir entre 1m e 3m. Como s\u00e3o chamados esses limites de ajuste configurados no sensor?",
      options: [
        "Zona Morta Superior e Inferior",
        "Span M\u00e1ximo",
        "LRL e URL",
        "Zero e Fundo de Escala Nominais"
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-08",
      question: "Sobre o 'Zero do instrumento', \u00e9 correto afirmar que:",
      options: [
        "\u00c9 obrigatoriamente o valor num\u00e9rico zero na escala da vari\u00e1vel.",
        "Representa o limite inferior da faixa nominal de medi\u00e7\u00e3o.",
        "Sempre coincide com o valor de v\u00e1cuo absoluto em sensores de press\u00e3o.",
        "\u00c9 o valor m\u00e1ximo que o instrumento pode medir com seguran\u00e7a."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-09",
      question:
        "Um instrumento possui um range de 0 \u00b0C a 200 \u00b0C e uma zona morta de \u00b10,1% do span. Qual \u00e9 o menor valor de varia\u00e7\u00e3o na temperatura que garantidamente provocar\u00e1 uma resposta na sa\u00edda?",
      options: ["0,2 \u00b0C", "2 \u00b0C", "0,02 \u00b0C", "0,1 \u00b0C"],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-10",
      question:
        "Um volt\u00edmetro anal\u00f3gico possui uma classe de exatid\u00e3o de 1,5% e fundo de escala de 300V. Qual o erro m\u00e1ximo absoluto permitido para este instrumento?",
      options: ["\u00b11,5V", "\u00b14,5V", "\u00b145V", "\u00b13V"],
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