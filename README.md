# Quiz Arena

Aplicativo web de quiz multiplayer em tempo real com experiencia inspirada em game show, pensado para uso em sala de aula com professor no telao e alunos no celular.

## Stack

### Frontend
- React
- Vite
- TailwindCSS
- Framer Motion
- socket.io-client
- react-router-dom
- react-qr-code

### Backend
- Node.js
- Express
- Socket.io

### Estado e dados
- armazenamento em memoria
- estrutura modular pronta para futura persistencia
- 10 perguntas de exemplo incluidas em `shared/sampleQuestions.js`

## Estrutura do projeto

```txt
quiz-game-instrumetacao/
  client/
    src/
      components/
      data/
      hooks/
      lib/
      routes/
      styles/
  server/
    src/
      game/
      utils/
  shared/
  README.md
```

## Funcionalidades entregues

- criacao automatica de sala com codigo curto e legivel
- entrada de alunos por QR Code ou codigo manual
- fluxo por etapas: lobby, pergunta, ranking, final
- sincronizacao em tempo real com Socket.io
- timeout de 30 segundos por pergunta
- encerramento automatico quando todos os conectados respondem
- pontuacao por acerto e velocidade
- ranking parcial entre perguntas
- podio final com visual comemorativo
- reconexao basica de professor e aluno com `localStorage`
- bloqueio de multiplas respostas na mesma pergunta
- layout responsivo para celular e visual forte para projecao

## Como instalar

Prerequisito recomendado: Node.js 18+.

Na raiz do projeto:

```bash
npm install
```

## Como rodar localmente

Na raiz do projeto:

```bash
npm run dev
```

Esse comando sobe:
- frontend Vite em `http://localhost:5173`
- backend Express + Socket.io em `http://localhost:3001`

## Como acessar

### Professor
Abra no navegador:

```txt
http://localhost:5173/
```

Para testar com celulares na mesma rede, prefira abrir usando o IP da maquina:

```txt
http://SEU-IP-LOCAL:5173/
```

### Aluno
Os alunos entram por:

```txt
http://SEU-IP-LOCAL:5173/join
```

Ou diretamente pelo QR Code gerado na tela do professor.

## Teste na mesma rede

1. Conecte professor e celulares no mesmo Wi-Fi.
2. Rode `npm run dev` na maquina do professor.
3. Descubra o IP local da maquina.
4. Abra a tela do professor em `http://SEU-IP-LOCAL:5173/`.
5. Projete a tela.
6. Os alunos entram pelo QR Code ou digitando o codigo da sala em `http://SEU-IP-LOCAL:5173/join`.

## Fluxo do jogo

1. O professor abre a tela principal.
2. Uma sala e criada automaticamente.
3. O lobby exibe codigo, QR Code, lista de jogadores e botao de iniciar.
4. Os alunos entram pelo celular.
5. O professor inicia o quiz.
6. A pergunta aparece no telao com timer e barra regressiva.
7. Os alunos respondem no smartphone.
8. A pergunta encerra no tempo ou antes, se todos responderem.
9. O ranking parcial aparece com animacao.
10. O jogo avanca automaticamente para a proxima pergunta.
11. Ao final, o podio final aparece.

## Regras implementadas

- nomes vazios sao bloqueados
- nomes duplicados recebem sufixo automatico
- novas entradas ficam bloqueadas depois que o quiz comeca
- jogadores existentes podem reconectar usando a mesma sessao
- respostas erradas valem 0
- respostas corretas usam formula baseada em tempo

## Formula de pontuacao

```txt
score = 1000 * max(0.25, tempoRestante / tempoTotal)
```

- resposta correta: entre 250 e 1000 pontos
- resposta errada: 0 pontos

## Scripts uteis

Na raiz:

```bash
npm run dev
npm run build
npm run start
```

## Observacoes

- os dados ficam somente em memoria; ao reiniciar o servidor, as salas sao perdidas
- a deteccao do link de entrada para o QR Code usa o IP local do servidor quando possivel
- se quiser forcar o endereco publico do frontend, defina `CLIENT_PUBLIC_URL` antes de iniciar o servidor
