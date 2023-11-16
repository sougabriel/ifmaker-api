# IFMaker - API 

Uma API web feita para o laboratório do IFMaker do campus de São Vicente do Sul.

## Sumário

1. [Pré-requisitos](#pré-requisitos)
2. [Visão geral da aplicação](#visão-geral-da-aplicação)
3. [Estrutura do repositório](#estrutura-do-repositório)
   - [Camada de Apresentação](#camada-de-apresentação)
   - [Camada de Infraestrutura](#camada-de-infraestrutura)
   - [Camada de Domínio](#camada-de-domínio)
   - [Camada Principal](#camada-principal)
4. [Como utilizar este projeto](#como-utilizar-este-projeto)
5. [Licença](#licença)

## Pré-requisitos

Antes de começar, verifique se você possui os seguintes softwares instalados:

- Node.js: [Instale o Node.js](https://nodejs.org/)

## Visão geral da aplicação

A aplicação consiste nas seguintes funcionalidades:

### Consultar

1. Consultar pessoas;
2. Consultar projetos;
3. Consultar equipamentos;
4. Consultar materiais;
5. Consultar pessoas em projetos;
6. Consultar acessos de pessoas no laboratório;
7. Consultar emprestimos de equipamentos a pessoas;

### Adicinar
	
1. Adicionar pessoas;
3. Adicionar projetos;
4. Adicionar pessoas em projetos;
5. Adicionar materiais;
6. Adicionar equipamentos;
7. Adicionar emprestimo de equipamento;
8. Adicionar registro de acessos; 

### Atualizar

1. Atualizar informações de pessoas;
2. Atualizar informações de projetos;
3. Atualizar informações de equipamentos;
4. Atualizar informações de materiais;
5. Atualizar informações de acessos;
6. Atualizar informações de emprestimos;

### Remover

1. Remover pessoas;
2. Remover projetos;
3. Remover equipamentos;
4. Remover materiais;
5. Remover acessos;
6. Remover emprestimos;

### Funções Administrativa

1. Consultar por usuários;
2. Adicionar novo usuário;
3. Atualizar informações de usuários;
4. Remover usuários;
5. Remover registros de atividades de usuários;

### Registros Automáticos

1. Registro das atividades dos usuários;

## Estrutura do repositório

O repositório está organizado nas seguindo os princípios da arquitetura limpa.

### **Camada de Apresentação**

Esta camada é responsável pelo manuseio de entrada e saída do usuário. Ela consiste em componentes de interface do usuário, como páginas da web, visualizações e controladores. Essa camada se comunica com a camada de Domínio por meio de interfaces e é responsável por traduzir a entrada e saída do usuário em conceitos do domínio.

### **Camada de Infraestrutura**

Esta camada é responsável por fornecer os detalhes técnicos do sistema. Ela inclui componentes como bancos de dados, serviços externos e sistema de arquivos. Essa camada é responsável por fornecer implementações para as interfaces definidas na camada de Domínio.

### **Camada de Domínio**

Esta camada contém a lógica de negócio da aplicação. Ela é responsável pelas entidades, casos de uso e serviços do domínio do sistema.

### **Camada Principal**

Esta camada coordena a interação entre as outras camadas. Ela é responsável por iniciar a aplicação e conectar as diferentes camadas. Ela pode conter o código de injeção de dependência que conecta as diferentes camadas.

1. Camada de Apresentação:
   
   - Models: Contém a definição das tabelas no banco com suas colunas e atributos. 
   - Controllers: Responsáveis por receber as requisições HTTP e coordenar a interação entre as rotas, middlewares e os serviços do domínio.
   - Routes: Contém as definições das rotas e associação com os controladores correspondentes.

Estrutura:
```bash
/models
   .model.js

/controllers
   .controller.js

/routes
   .routes.js
```

2. Camada de Infraestrutura:

   - Repositories: Responsáveis pela persistência e acesso aos dados.
   - Config: Configuração e conexão com a base de dados.

Estrutura:
```bash
/repositories
   answer-repository.js
   question-repository.js
   user-repository.js

/config
   connection.js
```

3. Camada de Domínio:

   - Models: Definição das entidades principais do domínio.
   - Services: Contêm a lógica de negócio, aplicam regras do domínio e orquestram as operações relacionadas às entidades.
   - Tests: Testes relacionados ao domínio e apresentação.

Estrutura:
```bash
/config
   db.config.js

/models
   answer.js
   question.js
   user.js

/services
   answer-service.js
   question-service.js
   user-service.js

/tests
   answer.test.js
   question.test.js
   user.test.js
   answer-service.test.js
   question-service.test.js
   user-service.test.js
```

4. Camada Principal:
   - server.js: Arquivo principal para iniciar o servidor.
   - .env: Arquivo de variáveis de ambiente.
   - Arquivos de configurações do Node.js.
   - Arquivos de ShellScript para inicialização do servidor.

Estrutura:
```bash
server.js
```

Um dos benefícios da Arquitetura Limpa é que ela permite flexibilidade e adaptabilidade. Como cada camada é independente, as alterações podem ser feitas em uma camada sem afetar as outras. Isso significa que o sistema pode ser modificado e atualizado sem arriscar a estabilidade de toda a aplicação.

## Como utilizar este projeto

Siga as instruções abaixo para configurar e executar o projeto:

1. Instale as dependências necessárias usando o npm, certifique-se de estar no diretório raiz do projeto:

```bash
npm install
```

2. Configure as variáveis de ambiente:

   Crie um arquivo .env na raiz do projeto.
   Adicione as seguintes variáveis de ambiente ao arquivo `.env` e preencha com as informações necessárias:

```bash
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=
PORT=
ORIGIN_URL=
```

3. Inicie o servidor:
   - Método 1: 
```bash
npm start
```
   - Método 2. Para usar interface gráfica, **só funciona em sistemas linux**:
```
./ifmaker-GUI 
```

Agora você está pronto para começar a utilizar o projeto.

## Licença

Este projeto está licenciado sob a [Licença MIT](./LICENSE). Você tem a liberdade de usar, modificar e distribuir este código. 
