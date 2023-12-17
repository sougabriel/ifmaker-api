# IFMaker - API 

Uma API web feita para o laboratório do IFMaker do Campus de São Vicente do Sul.

## Sumário

1. [Pré-requisitos](#pré-requisitos)
2. [Visão geral da aplicação](#visão-geral-da-aplicação)
3. [Estrutura do repositório](#estrutura-do-repositório)
4. [Como utilizar este projeto](#como-utilizar-este-projeto)
5. [Licença](#licença)

## Pré-requisitos

Antes de começar, verifique se você possui os seguintes softwares instalados:

- Node.js: [Instale o Node.js](https://nodejs.org/)

## Visão geral da aplicação

A aplicação consiste nas seguintes funcionalidades:

### Consultar

1. Consultar pessoas;
2. Consultar usuários;
3. Consultar projetos;
4. Consultar materiais;
5. Consultar acessos de pessoas no laboratório;
6. Consultar emprestimos de materiais a pessoas;

### Adicinar
	
1. Adicionar pessoas;
2. Adicionar usuários;
3. Adicionar projetos;
4. Adicionar materiais;
5. Adicionar emprestimo de materiais;
6. Adicionar registro de acessos; 

### Atualizar

1. Atualizar informações de pessoas;
2. Atualizar informações de projetos;
3. Atualizar informações de usuários;
4. Atualizar informações de materiais;
5. Atualizar informações de acessos;
6. Atualizar informações de emprestimos;

### Remover

1. Remover pessoas;
2. Remover projetos;
3. Remover usuários;
4. Remover materiais;
5. Remover acessos;
6. Remover emprestimos;

## Estrutura do repositório

O repositório está organizado seguindo os princípios da arquitetura limpa.
   
   - Models: Contém a definição das tabelas no banco com suas colunas e atributos. 
   - Controllers: Responsáveis por receber as requisições HTTP e coordenar a interação entre as rotas, middlewares e os serviços do domínio.
   - Routes: Contém as definições das rotas e associação com os controladores correspondentes.

Estrutura:
```bash
/config
   db.config.js

/controllers
   acesso.controller.js
   emprestimo.controller.js
   material.controller.js
   pessoa.controller.js
   projeto.controller.js
   usuario.controller.js

/models
   acesso.model.js
   emprestimo.model.js
   index.model.js
   material.model.js
   pessoa.model.js
   projeto.model.js
   usuario.model.js

/routes
   acesso.route.js
   emprestimo.route.js
   material.route.js
   pessoa.route.js
   projeto.route.js
   usuario.route.js
```

4. Camada Raiz:
   - server.js: Arquivo principal para iniciar o servidor.
   - .env: Arquivo de variáveis de ambiente.
   - Arquivos de configurações do Node.js.

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
```bash
npm start
```

Agora você está pronto para começar a utilizar o projeto.

