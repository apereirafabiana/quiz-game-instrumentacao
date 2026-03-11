# Quiz Arena

Aplicativo web de quiz multiplayer em tempo real para sala de aula, com professor no telao e alunos entrando pelo celular. Em producao, frontend, backend e Socket.IO rodam no mesmo dominio e no mesmo servico.

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
- Socket.IO

## Como o deploy ficou

- em desenvolvimento, o Vite roda em `5173` e faz proxy de `/api` e `/socket.io` para o Express em `3001`
- em producao, o build do React vai para `server/public`
- o Express serve os arquivos estaticos do frontend
- o Socket.IO roda no mesmo servidor HTTP
- tudo usa a mesma porta definida por `PORT`
- professor e alunos compartilham um unico link publico

## Estrutura principal

```txt
quiz-game-instrumetacao/
  client/
  server/
  shared/
  .env.example
  render.yaml
  README.md
```

## Rodando localmente

### 1. Instalar dependencias

Na raiz do projeto:

```bash
npm install
```

### 2. Subir em desenvolvimento

```bash
npm run dev
```

Isso sobe:
- frontend Vite em `http://localhost:5173`
- backend Express + Socket.IO em `http://localhost:3001`

### 3. Abrir o app

Professor:

```txt
http://localhost:5173/
```

Para testes com celulares na mesma rede, prefira abrir com o IP da maquina:

```txt
http://SEU-IP-LOCAL:5173/
```

## Testando modo producao localmente

### 1. Gerar o build

```bash
npm run build
```

### 2. Iniciar o servidor de producao

```bash
npm start
```

### 3. Abrir no navegador

```txt
http://localhost:3001/
```

Nesse modo, o React ja sai servido pelo Express, igual ao deploy no Render.

## Variaveis de ambiente

### Obrigatorias

- `PORT`
  - porta HTTP publica do servico
  - no Render ela e fornecida automaticamente
- `NODE_ENV`
  - use `production` no Render
  - use `development` localmente

### Opcionais

- `CLIENT_PORT`
  - usada apenas para sugestao de link de rede local no desenvolvimento
  - padrao: `5173`
- `PUBLIC_BASE_URL`
  - forca a URL publica usada no QR Code
  - normalmente nao precisa no Render

Veja os exemplos em `.env.example`.

## Deploy no GitHub

### 1. Criar repositorio

No GitHub, crie um repositorio novo vazio.

### 2. Enviar este projeto

Na pasta do projeto:

```bash
git init
git add .
git commit -m "Prepare project for Render deploy"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Se o repositorio ja existir, basta fazer `git add`, `git commit` e `git push`.

## Deploy no Render

### Opcao mais simples: Web Service manual

1. Entre no painel do Render.
2. Clique em `New` > `Web Service`.
3. Conecte sua conta do GitHub, se ainda nao conectou.
4. Escolha este repositorio.
5. Preencha os campos assim:

- `Name`: o nome que voce quiser, por exemplo `quiz-arena`
- `Root Directory`: deixe vazio
- `Runtime`: `Node`
- `Build Command`: `npm install && npm run build`
- `Start Command`: `npm start`
- `Health Check Path`: `/health`

### Variaveis de ambiente no Render

Configure pelo menos:

- `NODE_ENV` = `production`

Observacoes:
- `PORT` nao precisa ser criado manualmente; o Render fornece esse valor automaticamente
- `PUBLIC_BASE_URL` normalmente nao e necessario, porque o servidor descobre a propria URL publica

### Publicar

1. Clique em `Create Web Service`.
2. Espere o build terminar.
3. Quando o status ficar `Live`, o Render mostra a URL publica do servico.
4. Esse unico link sera usado por professor e alunos.

Exemplo de link final:

```txt
https://quiz-arena.onrender.com
```

Professor acessa:

```txt
https://quiz-arena.onrender.com/
```

Alunos entram pelo QR Code ou por:

```txt
https://quiz-arena.onrender.com/join
```

## Opcao com render.yaml

O projeto tambem inclui um `render.yaml`. Se voce preferir usar Blueprint:

1. No Render, clique em `New` > `Blueprint`.
2. Selecione o repositorio.
3. Revise o servico criado a partir do `render.yaml`.
4. Confirme o deploy.

## Build e start finais

Na raiz do projeto:

```bash
npm install
npm run build
npm start
```

## Como funciona em producao

- o Render entrega um unico dominio publico
- o Express responde frontend e backend
- o Socket.IO usa o mesmo dominio e a mesma porta
- o QR Code aponta para o mesmo link publico
- nao ha dependencia de `localhost` em producao

## Teste no celular depois do deploy

1. Abra o link publico no notebook do professor.
2. Projete a tela.
3. Leia o QR Code com o celular.
4. Se preferir, abra manualmente o link `/join` no celular.
5. Responda uma pergunta para verificar o tempo real.

## Modo gratuito do Render

Segundo a documentacao oficial do Render, web services gratuitos entram em idle depois de 15 minutos sem trafego e voltam a subir quando recebem uma nova requisicao. Isso pode causar uma demora inicial na primeira abertura do link. O Render tambem informa que os web services gratuitos recebem uma URL publica `onrender.com` e suportam WebSockets.

## Arquivos importantes para deploy

- `package.json`
- `client/vite.config.js`
- `client/src/lib/api.js`
- `client/src/hooks/useSocket.js`
- `server/src/index.js`
- `.env.example`
- `render.yaml`

## Fluxo do quiz preservado

O deploy em producao preserva:
- lobby com QR Code e codigo da sala
- entrada dos alunos pelo celular
- perguntas em tempo real
- ranking parcial entre rodadas
- ranking final com podio
- comunicacao via Socket.IO