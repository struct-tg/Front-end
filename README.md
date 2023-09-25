<h1 align="center"> Front-end: Guia de Configuração, Execução e Estrutura do projeto.</h1>

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

### 👾 Estrutura do Projeto Front-End

1. Components: Nesta seção, listam-se todos os componentes de acesso global para a aplicação, ou seja, aqueles que podem ser utilizados em várias partes do projeto.

2. Contexts: Aqui, são listados todos os contextos que foram utilizados ao longo do desenvolvimento do projeto. Os contextos são elementos cruciais para compartilhar dados entre diferentes partes da aplicação.

3. Screens: Esta seção está dividida em "OutsideAPP" e "InsideAPP", cada uma contendo suas respectivas telas. Cada tela possui uma lista de componentes de acesso local, ou seja, aqueles que são específicos para aquela tela em particular.

4. Services: A pasta "Services" é o local onde estão armazenadas todas as requisições utilizadas durante o desenvolvimento do projeto. Estas requisições podem incluir chamadas a APIs externas, consultas a bancos de dados, ou outras operações que envolvam a obtenção de dados.

5. Styles: Aqui, são definidas as estilizações padronizadas de acesso global para a aplicação. Estas definições de estilo podem ser aplicadas de forma consistente em toda a aplicação, garantindo uma aparência uniforme.

6. Utils: A seção de "Utils" é o local onde estão armazenadas todas as funções utilizadas para lidar com problemas comuns que surgem durante o desenvolvimento do projeto, como formatações de datas, manipulação de strings, ou qualquer outra tarefa que seja necessária de forma recorrente ao longo do projeto.

### 🧙🏼 Decisões de Desenvolvimento Front-End

Sobre o uso do Expo: A escolha de utilizar o Expo foi motivada pela sua facilidade de desenvolvimento, uma vez que apenas um dispositivo móvel com o Expo Go instalado é necessário para emular o projeto. Embora apresente algumas limitações devido à natureza da emulação, os benefícios superam amplamente as desvantagens. O Expo simplifica o processo de desenvolvimento e testes, proporcionando um ambiente acessível para a equipe.

Sobre o Styled-Components: A decisão de adotar o Styled-Components foi baseada na sua simplicidade de desenvolvimento, pois utiliza uma sintaxe semelhante ao CSS. Isso torna o código mais compreensível para todos os membros da equipe do trabalho de graduação. Apesar de algumas desvantagens, como a necessidade de muitas linhas de código para obter um resultado pequeno semelhante ao CSS tradicional e os desafios de tornar os componentes responsivos em diferentes dispositivos, os benefícios de usar o Styled-Components superam significativamente essas limitações.

Essas escolhas foram feitas com o objetivo de otimizar a eficiência e a colaboração da equipe, facilitando o desenvolvimento e a manutenção do projeto, e, até o momento, têm se mostrado vantajosas.

## :page_facing_up: Documentação e Links Úteis.

- Node JS: [Node.js](https://nodejs.org/)
- Documentação Expo-Cli: [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- Expo Tools: [Get Expo Tools](https://docs.expo.dev/get-started/installation/)
- Git: [Git - Downloads](https://git-scm.com/downloads)
