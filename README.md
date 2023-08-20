<h1 align="center"> Front-end: Guia de Configuração e Execução.</h1>

Este é um guia para configurar e executar a aplicação mobile de gerenciamento de estudos universitários da FATEC - Sorocaba. Abaixo estão listadas as ferramentas necessárias, instruções de configuração e passos para executar o projeto.

### 🛠️ Ferramentas Necessárias.

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node (versão 17.0.0 ou inferior);
- Expo Go (Aplicativo móvel);
- Expo-Cli;
- Expo;
- Git.

### :rocket: Processos para Executar.
Siga os passos abaixo após ter instalado as ferramentas necessárias:

1. Clone o repositório para sua máquina local usando o seguinte comando: ``git clone https://github.com/struct-tg/Front-end.git``
   
2. Navegue até o diretório do projeto clonado: ``cd <nome do diretório>``
    
3. Instale as dependências do projeto utilizando o NPM ou Yarn:
   - Usando NPM: ``npm install``
   - Usando Yarn (caso você tenha o Yarn instalado): ``yarn install``

Ambos os comandos vão ler o arquivo `package.json` no diretório do projeto e instalar todas as dependências listadas nele.

4. Inicie o servidor de desenvolvimento utilizando o comando: ``npx expo start``
 
  Quando esse processo for concluído com sucesso, o console exibirá o "Metro Bundler" com opções para prosseguir.

5. Por fim, utilize o aplicativo "Expo Go" instalado em seu celular e escaneie o QR Code exibido no console do Metro Bundler. É importante estar conectado à mesma rede de internet em que o servidor foi iniciado, caso contrário, o projeto não passará pelo processo de build corretamente.

## :page_facing_up: Documentação e Links Úteis.

- Node JS: [Node.js](https://nodejs.org/)
- Documentação Expo-Cli: [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- Expo Tools: [Get Expo Tools](https://docs.expo.dev/get-started/installation/)
- Git: [Git - Downloads](https://git-scm.com/downloads)
