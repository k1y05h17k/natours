<!-- 💻 Node.js & Express: Para o backend, Node.js com o framework Express. Criei um servidor para processar as solicitações de agendamento e enviar e-mails de confirmação. O Express facilitou a configuração das rotas e a integração com o Nodemailer para o envio de e-mails.
O Express é um framework para Node.js que facilita o desenvolvimento de aplicações web e APIs. Ele é amplamente utilizado para construir servidores eficientes e flexíveis. No meu projeto, o Express desempenha um papel crucial no backend, gerenciando solicitações e respostas de forma simplificada.
💡Configuração do Servidor: O Express foi usado para configurar o servidor que irá receber e processar solicitações HTTP. O código inicializa o Express e define a porta na qual o servidor irá escutar.
💡 Middleware: Middleware é uma função que processa a solicitação antes que ela chegue ao manipulador de rotas. Você usou dois tipos de middleware: bodyParser: Para interpretar o corpo das requisições em formatos como JSON e URL-encoded. Isso permite que o servidor entenda e manipule os dados enviados pelo cliente.
💡 cors: Para permitir que seu servidor aceite requisições de diferentes origens, o que é crucial para a comunicação entre o frontend e o backend quando eles estão hospedados em domínios diferentes.
💡 Rota para Enviar E-mail: A rota /send-email é definida para processar solicitações POST. Quando uma requisição é recebida, o servidor utiliza o Nodemailer para enviar um e-mail com os dados do agendamento. -->

# Projeto Natours

## Sumário

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Descrição das Pastas](#descrição-das-pastas)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Configuração do Servidor com Express](#configuração-do-servidor-com-express)
  - [Middleware](#middleware)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Descrição

**Natours** é uma aplicação web para gerenciamento de tours turísticos. Desenvolvida com Node.js e Express no backend, a aplicação utiliza MongoDB como banco de dados e oferece funcionalidades como autenticação de usuários, gerenciamento de tours e envio de emails de confirmação.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript server-side.
- **Express**: Framework web para Node.js.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB.
- **JWT (JSON Web Token)**: Autenticação e autorização de usuários.
- **Validator**: Biblioteca para validação de strings.
- **Crypto**: Módulo para criptografia e geração de tokens.
- **Slugify**: Geração de slugs amigáveis para URLs.
- **Nodemailer**: Envio de emails através de Node.js.
- **Bcrypt**: Criptografia de senhas.
- **Nodemon**: Monitoramento de alterações no código durante o desenvolvimento.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (opcional, caso prefira utilizar o MongoDB via Docker)

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/natours.git

2. **Instale as dependências:**
     
     ```bash
    cd natours
    npm install

3. **Configure as variáveis de ambiente:**  
    
    ```env  
    NODE_ENV=development
    PORT=3000
    DATABASE=mongodb://localhost:27017/natours
    JWT_SECRET=sua_chave_secreta
    JWT_EXPIRES_IN=90d
    EMAIL_USERNAME=seu_email
    EMAIL_PASSWORD=sua_senha_de_email
    EMAIL_HOST=seu_host_de_email
    EMAIL_PORT=porta_do_servidor_de_email

 4. **Inicie o servidor:**
    
    ```bash
    npm start

## Estrutura do Projeto

    ├── controllers
    │   ├── authController.js
    │   ├── errorController.js
    |   ├── handlerFactory.js
    |   ├── reviewController.js
    |   ├── tourController.js 
    │   └── userController.js
    ├── models
    |   ├── reviewModel.js
    │   ├── tourModel.js
    │   └── userModel.js
    ├── routes
    |   ├── authRoutes.js
    |   ├── reviewRoutes.js
    │   ├── tourRoutes.js
    │   └── userRoutes.js
    ├── utils
    |   ├── apiFeature.js
    │   ├── appError.js
    │   ├── catchAsync.js
    │   └── email.js
    ├── app.js
    ├── server.js
    ├── .env
    ├── .gitignore
    ├── package.json
    └── README.md

### controllers

Controladores que gerenciam as requisições HTTP e aplicam a lógica de negócio da aplicação. Eles recebem as requisições dos clientes, interagem com os modelos de dados e retornam respostas adequadas.

- **authController.js**: Lida com autenticação e autorização de usuários (login, logout, proteção de rotas).
- **errorController.js**: Captura e trata erros, gerando respostas apropriadas para o cliente.
- **handlerFactory.js**: Manipulador genérico para operações CRUD em vários modelos.
- **reviewController.js**: Gerencia operações relacionadas aos reviews (criação, edição, exclusão).
- **tourController.js**: Gerencia operações relacionadas aos tours (listagem, criação, edição, exclusão).
- **userController.js**: Gerencia operações relacionadas aos usuários (perfil, permissões, etc.).

### models

Modelos Mongoose que definem a estrutura dos dados no banco de dados MongoDB. Cada arquivo corresponde a um modelo de dados.

- **reviewModel.js**: Modelo para os reviews, definindo a estrutura e validações de dados.
- **tourModel.js**: Modelo para os tours, incluindo regras e validações.
- **userModel.js**: Modelo para os usuários, armazenando informações como nome, email e senha.

### routes

Define as rotas da aplicação e associa as requisições HTTP aos controladores correspondentes.

- **authRoutes.js**: Rotas de autenticação e autorização, como login e logout.
- **reviewRoutes.js**: Rotas para gerenciamento de reviews.
- **tourRoutes.js**: Rotas para gerenciamento de tours.
- **userRoutes.js**: Rotas para gerenciamento de usuários.

### utils

Pasta de utilitários e funções auxiliares que são usados em várias partes da aplicação para evitar repetição de código.

- **apiFeature.js**: Implementa funcionalidades avançadas de API, como filtragem, paginação e ordenação de dados.
- **appError.js**: Classe personalizada para tratar erros.
- **catchAsync.js**: Wrapper para capturar erros em funções assíncronas e encaminhá-los ao middleware de tratamento de erros.
- **email.js**: Funções para envio de emails, como verificação de conta e recuperação de senha.

### Arquivos principais

- **app.js**: Arquivo de configuração principal da aplicação. Define o servidor Express, middlewares e rotas.
- **server.js**: Responsável por inicializar o servidor e conectá-lo ao banco de dados.
- **.env**: Arquivo que armazena variáveis de ambiente, como credenciais e chaves secretas.
- **.gitignore**: Especifica arquivos e pastas a serem ignorados pelo Git (ex: `node_modules`).
- **package.json**: Contém as informações do projeto e suas dependências.
- **README.md**: Documentação do projeto (este arquivo).

## Funcionalidades Principais

- **Autenticação e Autorização**:
  - Registro e login de usuários com proteção de rotas usando JWT.
  - Recuperação e atualização de senhas.
- **Gerenciamento de Tours**:
  - CRUD completo (criação, leitura, atualização e exclusão) para tours.
  - Filtragem avançada, ordenação e paginação de resultados.
  - Estatísticas agregadas sobre os tours.
- **Envio de Emails**:
  - Envio de emails de boas-vindas e recuperação de senha usando Nodemailer.
- **Segurança**:
  - Implementação de medidas de segurança como sanitização de dados e proteção contra ataques XSS.

## Configuração do Servidor com Express

O Express é um framework para Node.js que facilita o desenvolvimento de aplicações web e APIs. No projeto **Natours**, o Express desempenha um papel crucial no backend, gerenciando solicitações e respostas de forma simplificada.

### Middleware

Middleware são funções que interceptam as requisições antes que elas alcancem os manipuladores de rotas. No projeto, foram utilizados:

- **bodyParser**: Para interpretar o corpo das requisições em formatos como JSON e URL-encoded. Isso permite que o servidor entenda e manipule os dados enviados pelo cliente.
- **cors**: Permite que o servidor aceite requisições de diferentes origens, essencial para a comunicação entre frontend e backend em domínios diferentes.

### Rotas e Envio de E-mails

- **Configuração do Servidor**: O Express é usado para configurar o servidor que recebe e processa solicitações HTTP. O código inicializa o Express e define a porta na qual o servidor irá escutar.
- **Rota `/send-email`**: Definida para processar solicitações POST. Quando uma requisição é recebida, o servidor utiliza o Nodemailer para enviar um e-mail com os dados do agendamento.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
