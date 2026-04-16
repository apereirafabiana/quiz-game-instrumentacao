const DEFAULT_DURATION_MS = 30000;

export const DEFAULT_THEME = "CONCEITOS BÁSICOS";
export const QUESTION_THEMES = [
  DEFAULT_THEME,
  "TERMINOLOGIA",
  "Sensores de Temperatura"
];

export const quizQuestionsByTheme = {
  "CONCEITOS BÁSICOS": [
    {
      id: "CB-01",
      question:
        "De acordo com o material, qual foi o marco principal da 1ª Revolução Industrial iniciada na Inglaterra por volta de 1765?",
      options: [
        "A descoberta da energia nuclear e o surgimento de computadores.",
        "O surgimento da eletricidade e do petróleo como novas formas de energia.",
        "A interconexão de todas as etapas de produção através da digitalização.",
        "A mecanização dos processos e a invenção de máquinas a vapor."
      ],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-02",
      question:
        "Qual é a principal característica que define a Indústria 4.0 em relação às revoluções anteriores?",
      options: [
        "A introdução das linhas de montagem baseadas no Fordismo.",
        "A interconexão de etapas produtivas e a utilização de dados para eficiência.",
        "A substituição total de funcionários humanos por robôs autônomos.",
        "O uso exclusivo de combustíveis fósseis para acelerar a produção."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-03",
      question:
        "Em sistemas de controle, qual a principal diferença entre uma malha aberta e uma malha fechada?",
      options: [
        "A malha fechada utiliza a informação da saída para ajustar a entrada, enquanto a aberta não.",
        "Sistemas de malha aberta são exclusivos do mundo físico, como motores.",
        "A malha aberta é mais precisa, pois não sofre interferência de sensores.",
        "Apenas a malha fechada possui uma planta ou processo definido."
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-04",
      question:
        "Como é definido o conceito de “Variável Manipulada” (VM) em um processo industrial?",
      options: [
        "É o valor de referência que o operador define no painel de controle.",
        "É a variável sobre a qual o controlador atua para manter a variável controlada no valor desejado.",
        "É a condição externa imprevisível que afeta negativamente o desempenho do processo.",
        "É o sinal que o sensor envia para indicar o estado atual do sistema."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-05",
      question:
        "No exemplo do sistema de aquecimento de água, qual alternativa identifica corretamente as variáveis?",
      options: [
        "O vapor é o Set Point e a água aquecida é o Distúrbio.",
        "A temperatura da água é a Variável de Processo e a vazão de vapor é a Variável Manipulada.",
        "A entrada de água fria é a Variável Manipulada.",
        "A válvula manual é o sensor e o termômetro é o atuador."
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
      question: "Qual é a função de um instrumento classificado como “Cego”?",
      options: [
        "Ele não possui uma indicação local visível da variável que está medindo.",
        "Ele converte sinais mecânicos em sinais pneumáticos exclusivamente.",
        "Ele é um instrumento quebrado que não consegue detectar sinais.",
        "Ele serve apenas para registrar dados em papel para análise posterior."
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-07",
      question:
        "Historicamente, qual foi a contribuição de Denis Papin para a engenharia de controle em 1681?",
      options: [
        "O desenvolvimento do primeiro sistema de controle de nível por boia.",
        "A invenção da válvula de segurança para regulação da pressão de vapor.",
        "A descoberta da realimentação negativa em circuitos eletrônicos.",
        "A criação do modelo de produção flexível conhecido como Toyotismo."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-08",
      question: "O que define um instrumento “Transdutor” na instrumentação industrial?",
      options: [
        "Um dispositivo que apenas mostra o valor da variável de forma analógica.",
        "Um instrumento que recebe informações em uma forma física e as converte em um sinal de saída resultante.",
        "Um elemento que atua diretamente no processo para fechar uma válvula.",
        "Um sensor que não precisa de energia externa para funcionar."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-09",
      question:
        "Qual destes componentes é responsável por comparar a variável de processo com o Set Point e decidir a ação a ser tomada?",
      options: ["Controlador.", "Transmissor.", "Atuador.", "Sensor."],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "CB-10",
      question:
        "Considere um elevador que deve parar no 4º andar. Se ele para exatamente no 4º andar após um tempo, como chamamos o estado final da sua resposta?",
      options: [
        "Resposta transitória.",
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
        "Um sensor de temperatura possui uma faixa nominal (range) de -100 °C a 500 °C. Qual é o alcance (span) desse instrumento?",
      options: ["500 °C", "-600 °C", "400 °C", "600 °C"],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-02",
      question:
        "Como é definida a “Sensibilidade” de um instrumento de medição de acordo com o INMETRO?",
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
        "Um voltímetro digital possui um display que exibe duas casas decimais (ex.: 0,00 V). Qual é a resolução deste instrumento?",
      options: ["0,1 V", "0,01 V", "1 V", "0,001"],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-04",
      question:
        "O fenômeno em que a saída de um transmissor difere para uma mesma entrada, dependendo se o sinal é aplicado de forma ascendente ou descendente, é chamado de:",
      options: ["Desvio de zero", "Histerese", "Zona morta", "Repetibilidade"],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-05",
      question:
        "Um instrumento com range de 50 °C a 150 °C possui uma exatidão de ±0,5 % do span. Se ele indica 80 °C, em qual intervalo a temperatura real se encontra?",
      options: [
        "Entre 79,6 °C e 80,4 °C.",
        "Entre 79,25 °C e 80,75 °C.",
        "Entre 79,5 °C e 80,5 °C.",
        "Entre 79,5 °C e 80,25 °C."
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
        "Um sensor de nível é ajustado para medir entre 1 m e 3 m. Como são chamados esses limites de ajuste configurados no sensor?",
      options: [
        "Zona morta superior e inferior",
        "Span máximo",
        "LRL e URL",
        "Zero e fundo de escala nominais"
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-08",
      question: "Sobre o “zero do instrumento”, é correto afirmar que:",
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
        "Um instrumento possui um range de 0 °C a 200 °C e uma zona morta de ±0,1% do span. Qual é o menor valor de variação na temperatura que garantidamente provocará uma resposta na saída?",
      options: ["0,2 °C", "2 °C", "0,02 °C", "0,1 °C"],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "TM-10",
      question:
        "Um voltímetro analógico possui uma classe de exatidão de 1,5% e fundo de escala de 300 V. Qual é o erro máximo absoluto permitido para este instrumento?",
      options: ["±1,5 V", "±4,5 V", "±45 V", "±3 V"],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    }
  ],
  "Sensores de Temperatura": [
    {
      id: "ST-01",
      difficulty: "Fácil",
      question: "De acordo com a física clássica, o que a temperatura quantifica?",
      options: [
        "O campo eletromagnético emitido por um corpo no vácuo.",
        "A quantidade de calor, que é uma forma de energia associada à atividade molecular de uma substância.",
        "A massa total de um corpo submetido a altas pressões industriais.",
        "A capacidade de um líquido evaporar rapidamente em baixas pressões."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-02",
      difficulty: "Fácil",
      question:
        "A transferência de calor pode ocorrer através de três formas principais. Quais são elas?",
      options: [
        "Condução, convecção e radiação.",
        "Indução, convecção e difração.",
        "Condução, isolamento e sublimação.",
        "Aquecimento, resfriamento e ventilação."
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-03",
      difficulty: "Fácil",
      question:
        "Em termômetros baseados na dilatação de líquidos, a água não é utilizada. Qual é o principal motivo físico para isso?",
      options: [
        "Porque a água entra em ebulição muito rápido a 50 °C.",
        "Porque a água se adensa (contrai) entre 0 °C e 4 °C, apresentando um comportamento anômalo em vez de expandir.",
        "Porque ela oxida o vidro do capilar do termômetro.",
        "Porque a água possui um coeficiente de dilatação negativo em qualquer temperatura."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-04",
      difficulty: "Fácil",
      question:
        "Em um processo industrial severo, é necessário proteger os sensores de temperatura de ataques químicos e pressões. Qual dispositivo é utilizado para permitir a troca do sensor sem que haja contato direto com o fluido do processo?",
      options: [
        "Um capilar de vidro.",
        "Um tubo de Bourdon.",
        "Um poço térmico (termopoço).",
        "Um módulo Peltier."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-05",
      difficulty: "Fácil",
      question:
        "O Efeito Seebeck é o princípio de funcionamento dos termopares. O que esse efeito descreve?",
      options: [
        "A mudança de cor de um metal quando submetido a altas temperaturas.",
        "A deflexão de um ponteiro mecânico devido à dilatação de dois metais iguais.",
        "A criação de uma diferença de potencial (tensão) em um circuito formado por dois metais diferentes com junções em temperaturas distintas.",
        "O aumento da resistência elétrica de um condutor conforme ele esquenta."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-06",
      difficulty: "Fácil",
      question:
        "Os termistores são sensores semicondutores muito usados na eletrônica. O que significa a sigla “NTC”?",
      options: [
        "Negative Temperature Coefficient (a resistência elétrica diminui com o aumento da temperatura).",
        "Nominal Temperature Controller (o componente estabiliza a temperatura automaticamente).",
        "Negative Temperature Coefficient (a resistência aumenta junto com o aumento da temperatura).",
        "Normal Thermal Conductor (usado apenas em ambientes refrigerados)."
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-07",
      difficulty: "Fácil",
      question:
        "Nos termorresistores do tipo RTD, o padrão “Pt100” é o mais comum da indústria. O que significa o número “100” nesse padrão?",
      options: [
        "A temperatura máxima suportada, que é de 100 °C.",
        "O comprimento ideal da haste, de 100 milímetros.",
        "O erro de exatidão de 1,00%.",
        "A resistência elétrica do componente, que é de 100 ohms a 0 °C."
      ],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-08",
      difficulty: "Médio",
      question:
        "Nos termômetros por pressão de vapor (como o termômetro de Bourdon de vapor), qual é o princípio físico que gera o movimento do mostrador?",
      options: [
        "O bulbo contém apenas gás inerte que se expande linearmente com a radiação térmica.",
        "O bulbo é preenchido com mercúrio líquido que escoa pelo capilar até mover o ponteiro.",
        "O bulbo é preenchido parcialmente com um líquido volátil; ao aumentar a temperatura, parte do líquido vaporiza, e o aumento de pressão desenrola o tubo de Bourdon.",
        "Dois metais se curvam mecanicamente quando aquecidos pela pressão do vapor."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-09",
      difficulty: "Médio",
      question:
        "Em medidores bimetálicos, o deslocamento mecânico causado pela dilatação dos metais move um indicador. Qual é o formato do par bimetálico mais comum na indústria devido à sua forma alongada e praticidade para uso em poços térmicos?",
      options: [
        "Par bimetálico plano ou linear.",
        "Par bimetálico em disco.",
        "Par bimetálico helicoidal (em forma de hélice/mola longa).",
        "Par bimetálico em forma de “U”."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-10",
      difficulty: "Médio",
      question:
        "Os termopares geram um sinal em milivolts proporcional a uma temperatura, mas apresentam uma particularidade fundamental. Qual é ela?",
      options: [
        "Eles não medem temperatura absoluta, mas sim a diferença de temperatura entre a junta quente e a junta fria.",
        "Eles só conseguem medir temperaturas abaixo de 0 °C.",
        "Eles medem diretamente a temperatura ambiente sem precisar de nenhum circuito adicional.",
        "Eles funcionam apenas se a junta fria for removida do circuito."
      ],
      correctIndex: 0,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-11",
      difficulty: "Médio",
      question:
        "Apesar da sua alta sensibilidade e baixo custo, os termistores (NTC/PTC) têm desvantagens frente aos RTDs na indústria pesada. Qual das opções é a principal limitação dos termistores?",
      options: [
        "Não suportam nenhum contato com o ar ambiente.",
        "Não seguem normas universais (não têm intercambiabilidade garantida), sendo cada modelo altamente dependente da curva específica do fabricante.",
        "Eles produzem sinais de tensão que interferem nas redes elétricas.",
        "Consomem muita energia para operar."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-12",
      difficulty: "Médio",
      question:
        "Em qual das situações abaixo um termistor PTC seria mais adequado que um NTC?",
      options: [
        "Medir linearmente a temperatura ambiente de um galpão.",
        "Compensar a junta fria de um termopar.",
        "Atuar como interruptor térmico de proteção (“fusível rearmável”) contra sobrecorrentes e superaquecimento em motores.",
        "Calcular precisamente a temperatura de congelamento em frigoríficos."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-13",
      difficulty: "Médio",
      question:
        "Ao instalar um RTD (como o Pt100), o circuito de medição mais simples é o de 2 fios. No entanto, ele não é muito preciso para uso industrial. Por quê?",
      options: [
        "Porque a tensão se dissipa muito rápido em fios curtos.",
        "Porque os fios de cobre não conduzem os elétrons do Pt100.",
        "Porque a resistência elétrica dos próprios fios se soma à resistência do Pt100, gerando erros e apontando uma temperatura irreal maior que a verdadeira.",
        "Porque ele exige uma calibração a laser complexa."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-14",
      difficulty: "Médio",
      question:
        "A norma IEC 60584 classifica os termopares. O termopar Tipo K (Cromel/Alumel) é resistente à oxidação e muito popular. Porém, em qual tipo de atmosfera ele não deve ser exposto?",
      options: [
        "Em atmosferas neutras de laboratório.",
        "Em atmosferas ricas em nitrogênio e oxigênio atmosférico normal.",
        "Em ambientes submersos em água pura.",
        "Em atmosferas sulfurosas, atmosferas redutoras ou em alto vácuo."
      ],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-15",
      difficulty: "Difícil",
      question:
        "Qual é a principal distinção teórica entre o Efeito Peltier e o Efeito Seebeck aplicados em junções termoelétricas?",
      options: [
        "Ambos geram corrente elétrica, mas o Peltier funciona apenas com metais líquidos.",
        "No Efeito Seebeck, uma diferença de temperatura induz uma corrente elétrica; já no Efeito Peltier, a aplicação forçada de uma corrente elétrica produz calor ou o absorve, gerando um gradiente térmico.",
        "O Peltier lida com expansão de gases, enquanto o Seebeck lida com dilatação de metais.",
        "Não há diferença; são apenas nomes distintos para o mesmo princípio normatizado na indústria."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-16",
      difficulty: "Difícil",
      question:
        "A equação de Steinhart-Hart possui um papel crucial para dispositivos de medição. Qual é essa função?",
      options: [
        "Ela corrige as falhas de histerese presentes nos pares bimetálicos após ciclos longos.",
        "Ela permite modelar matematicamente a curva de dilatação do mercúrio em tubos capilares estreitos.",
        "Ela é utilizada para converter com precisão a relação altamente não linear entre a resistência elétrica de um termistor NTC e sua temperatura absoluta.",
        "Ela calcula o nível exato de resistência parasita em cabos de compensação de um termopar Tipo K."
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-17",
      difficulty: "Difícil",
      question:
        "Um engenheiro precisa medir com urgência temperaturas extremas de cerca de 2200 °C em um ambiente inerte ou em vácuo, mas que de forma alguma será exposto à oxidação (atmosfera oxidante). Qual termopar normatizado pela IEC deve ser empregado?",
      options: [
        "Tipo K (Cromel/Alumel)",
        "Tipo S (Platina/Ródio)",
        "Tipo C ou A (Tungstênio/Rênio)",
        "Tipo T (Cobre/Constantan)"
      ],
      correctIndex: 2,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-18",
      difficulty: "Difícil",
      question:
        "Visando à máxima precisão de medição em laboratório (ou processos críticos) usando um RTD Pt100, a ligação a 4 fios é a mais recomendada. Como esse circuito de 4 fios elimina o erro provocado pela resistência do cabo?",
      options: [
        "Ele envia quatro vezes mais corrente para vencer a resistência ôhmica dos cabos de forma física.",
        "Ele utiliza dois fios exclusivamente para circular a corrente de excitação e outros dois fios, ligados a um voltímetro de alta impedância, para medir separadamente a queda de tensão isolada apenas no sensor.",
        "Ele aterra automaticamente dois dos fios para desviar qualquer resistência indesejada para a carcaça.",
        "Ele cruza os sinais dos 4 fios em uma “Ponte de Wheatstone invertida”, anulando correntes contínuas."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-19",
      difficulty: "Difícil",
      question:
        "Você tem um RTD Pt100 que deve operar num intervalo restrito de precisão extrema entre 0 °C e 100 °C. De acordo com as normas de exatidão IEC 60751, qual é a classe de tolerância que garante o erro máximo absoluto mais restrito (o mais exato)?",
      options: ["Classe C", "Classe B", "Classe A", "Classe AA"],
      correctIndex: 3,
      durationMs: DEFAULT_DURATION_MS
    },
    {
      id: "ST-20",
      difficulty: "Difícil",
      question:
        "Além dos Efeitos Seebeck e Peltier, a termometria termoelétrica considera o Efeito Thomson (descoberto por Lorde Kelvin em 1854). O que este efeito descreve fisicamente?",
      options: [
        "Prevê que a diferença de temperatura não importa caso a junta quente derreta durante o processo.",
        "Estabelece que calor é absorvido ou produzido ao longo de um único par termoelétrico em que circula corrente, onde existe um gradiente térmico, de modo proporcional à intensidade dessa corrente.",
        "Afirma que apenas platina gera tensão elétrica verdadeira; os demais materiais geram ruído.",
        "Define que a agulha de Bourdon sofre deflexão eletromagnética se estiver próxima ao termopar."
      ],
      correctIndex: 1,
      durationMs: DEFAULT_DURATION_MS
    }
  ]
};

export function getQuestionCountForTheme(theme = DEFAULT_THEME) {
  const selectedTheme = QUESTION_THEMES.includes(theme) ? theme : DEFAULT_THEME;
  return quizQuestionsByTheme[selectedTheme]?.length ?? 0;
}

export function getThemeQuestionCounts() {
  return QUESTION_THEMES.reduce((counts, theme) => {
    counts[theme] = getQuestionCountForTheme(theme);
    return counts;
  }, {});
}

export function getQuestionsForTheme(theme = DEFAULT_THEME) {
  const selectedTheme = QUESTION_THEMES.includes(theme) ? theme : DEFAULT_THEME;
  const questions = quizQuestionsByTheme[selectedTheme] ?? quizQuestionsByTheme[DEFAULT_THEME];

  return questions.map((question) => ({
    ...question,
    options: [...question.options],
    media: question.media ? { ...question.media } : null
  }));
}
