const DEFAULT_DURATION_MS = 30000;

export const DEFAULT_THEME = "CONCEITOS BÁSICOS";
export const QUESTION_THEMES = [DEFAULT_THEME, "TERMINOLOGIA"];

export const quizQuestionsByTheme = {
  "CONCEITOS BÁSICOS": [
    {
      id: "CB-01",
      question:
        "De acordo com o material, qual foi o marco principal da 1ª Revolução Industrial iniciada na Inglaterra por volta de 1765?",
      options: [
        "A descoberta da energia nuclear e o surgimento de computadores",
        "O surgimento da eletricidade e do petróleo como novas formas de energia",
        "A interconexão de todas as etapas de produção através da digitalização",
        "A mecanização dos processos e a invenção de máquinas a vapor"
      ],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-02",
      question:
        "Qual é a principal característica que define a Indústria 4.0 em relação às revoluções anteriores?",
      options: [
        "A introdução das linhas de montagem baseadas no Fordismo",
        "A interconexão de etapas produtivas e a utilização de dados para eficiência",
        "A substituição total de funcionários humanos por robôs autônomos",
        "O uso exclusivo de combustíveis fósseis para acelerar a produção"
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-03",
      question:
        "Em sistemas de controle, qual a principal diferença entre uma malha aberta e uma malha fechada?",
      options: [
        "A malha fechada utiliza a informação da saída para ajustar a entrada, enquanto a aberta não",
        "Sistemas de malha aberta são exclusivos do mundo físico",
        "A malha aberta é mais precisa pois não sofre interferência de sensores",
        "Apenas a malha fechada possui uma planta definida"
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-04",
      question: "Como é definido o conceito de Variável Manipulada (VM) em um processo industrial?",
      options: [
        "Valor de referência definido pelo operador",
        "Variável sobre a qual o controlador atua",
        "Condição externa imprevisível",
        "Sinal enviado pelo sensor"
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-05",
      question:
        "No exemplo do sistema de aquecimento de água, qual alternativa identifica corretamente as variáveis?",
      options: [
        "O vapor é o Set Point",
        "A temperatura da água é a Variável de Processo e a vazão de vapor é a Variável Manipulada",
        "A entrada de água fria é a Variável Manipulada",
        "A válvula manual é o sensor"
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS,
      media: {
        type: "image",
        src: "/figura-01.png",
        alt: "Figura 01 do exemplo de aquecimento de água com as variáveis do processo."
      }
    },
    {
      id: "CB-06",
      question: "Qual é a função de um instrumento classificado como \"Cego\"?",
      options: [
        "Não possui indicação local visível",
        "Converte sinais mecânicos em pneumáticos",
        "Instrumento quebrado",
        "Serve apenas para registrar dados"
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-07",
      question: "Qual foi a contribuição de Denis Papin em 1681?",
      options: [
        "Controle de nível por boia",
        "Válvula de segurança para vapor",
        "Realimentação negativa em circuitos",
        "Toyotismo"
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-08",
      question: "O que define um instrumento transdutor?",
      options: [
        "Apenas mostra valor",
        "Converte uma forma de energia em outra",
        "Atua diretamente na válvula",
        "Sensor sem energia externa"
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-09",
      question: "Qual componente compara a variável de processo com o Set Point?",
      options: ["Controlador", "Transmissor", "Atuador", "Sensor"],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-10",
      question:
        "Se um elevador para exatamente no 4º andar após um tempo, como chamamos esse estado?",
      options: [
        "Resposta transitória",
        "Comando de entrada",
        "Resposta em regime permanente",
        "Erro de regime permanente"
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    }
  ],
  TERMINOLOGIA: [
    {
      id: "TM-01",
      question:
        "Um sensor de temperatura possui uma faixa nominal (range) de a . Qual é o alcance (span) desse instrumento?",
      options: ["500 ºC", "-600ºC", "400 ºC", "600º C"],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-02",
      question:
        "Como é definida a 'Sensibilidade' de um instrumento de medição de acordo com o INMETRO?",
      options: [
        "O grau de concordância entre o resultado da medição e o valor verdadeiro.",
        "A menor diferença entre indicações que pode ser percebida.",
        "A resposta do instrumento dividida pela correspondente variação no estímulo.",
        "A diferença entre o valor medido e o valor real da variável."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-03",
      question:
        "Um voltímetro digital possui um display que exibe duas casas decimais (ex: ). Qual é a resolução deste instrumento?",
      options: ["0,1V", "0,01 V", "1V", "0,001"],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-04",
      question:
        "O fenômeno onde a saída de um transmissor difere para uma mesma entrada dependendo se o sinal é aplicado de forma ascendente ou descendente é chamado de:",
      options: ["Desvio de Zero", "Histerese", "Zona Morta", "Repetibilidade"],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-05",
      question:
        "Um instrumento com range de 50 ºC a 150 ºC possui uma exatidão de ±0,5 % do span. Se ele indica 80 ºC, em qual intervalo a temperatura real se encontra?",
      options: [
        "Entre 79,6 ºC e 80,4 ºC",
        "Entre 79,25 ºC e 80,75 ºC",
        "Entre 79,5 ºC e 80,5 ºC",
        "Entre 79,5 ºC e 80,25 ºC"
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-06",
      question: "Qual é a principal diferença entre erro sistemático e erro aleatório?",
      options: [
        "Erros aleatórios são sempre positivos, enquanto sistemáticos são negativos.",
        "O erro sistemático é imprevisível, enquanto o aleatório é constante.",
        "O erro sistemático mantém-se constante ou varia de forma previsível, enquanto o aleatório varia de forma imprevisível.",
        "Somente o erro aleatório pode ser chamado de erro absoluto."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-07",
      question:
        "Um sensor de nível é ajustado para medir entre 1m e 3m. Como são chamados esses limites de ajuste configurados no sensor?",
      options: [
        "Zona Morta Superior e Inferior",
        "Span Máximo",
        "LRL e URL",
        "Zero e Fundo de Escala Nominais"
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-08",
      question: "Sobre o 'Zero do instrumento', é correto afirmar que:",
      options: [
        "É obrigatoriamente o valor numérico zero na escala da variável.",
        "Representa o limite inferior da faixa nominal de medição.",
        "Sempre coincide com o valor de vácuo absoluto em sensores de pressão.",
        "É o valor máximo que o instrumento pode medir com segurança."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-09",
      question:
        "Um instrumento possui um range de 0 ºC a 200 ºC e uma zona morta de ±0,1% do span. Qual é o menor valor de variação na temperatura que garantidamente provocará uma resposta na saída?",
      options: ["0,2 ºC", "2 ºC", "0,02 ºC", "0,1 ºC"],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-10",
      question:
        "Um voltímetro analógico possui uma classe de exatidão de 1,5% e fundo de escala de 300V. Qual o erro máximo absoluto permitido para este instrumento?",
      options: ["±1,5V", "±4,5V", "±45V", "±3V"],
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