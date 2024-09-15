## PROJECT NATOURS

<!-- 💻Node.js & Express: Para o backend, Node.js com o framework Express. Criei um servidor para processar as solicitações de agendamento e enviar e-mails de confirmação. O Express facilitou a configuração das rotas e a integração com o Nodemailer para o envio de e-mails.
O Express é um framework para Node.js que facilita o desenvolvimento de aplicações web e APIs. Ele é amplamente utilizado para construir servidores eficientes e flexíveis. No meu projeto, o Express desempenha um papel crucial no backend, gerenciando solicitações e respostas de forma simplificada.
💡Configuração do Servidor: O Express foi usado para configurar o servidor que irá receber e processar solicitações HTTP. O código inicializa o Express e define a porta na qual o servidor irá escutar.
💡 Middleware: Middleware é uma função que processa a solicitação antes que ela chegue ao manipulador de rotas. Você usou dois tipos de middleware: bodyParser: Para interpretar o corpo das requisições em formatos como JSON e URL-encoded. Isso permite que o servidor entenda e manipule os dados enviados pelo cliente.
💡 cors: Para permitir que seu servidor aceite requisições de diferentes origens, o que é crucial para a comunicação entre o frontend e o backend quando eles estão hospedados em domínios diferentes.
💡 Rota para Enviar E-mail: A rota /send-email é definida para processar solicitações POST. Quando uma requisição é recebida, o servidor utiliza o Nodemailer para enviar um e-mail com os dados do agendamento. -->
## Estrutura do Projeto

```bash
├── NATOURS
│   ├── controllers
│   ├── models
│   ├── routes
|   ├── utils
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md


## Tecnologias Utilizadas
- Node.js
- Express
- MongoDB com Mongoose
- Docker
- Nodemon

## Pré-requisitos
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)

### 4. **Descrição das Pastas**
Explicação breve sobre o propósito de cada pasta ou arquivo importante. Isso orienta o desenvolvedor sobre a função de cada componente do projeto.

```markdown
### Descrição das pastas:
- `src/controllers`: Contém os controladores responsáveis por lidar com as requisições HTTP.
- `src/models`: Modelos Mongoose para o MongoDB.

### Import Data from our JSON file into MongoDB Database:



In data folder, go in the file import-dev-data.js

command to import datas

```Terminal
node dev-data/data/import-dev-data.js --import
```
command to delete data

```Terminal
node dev-data/data/import-dev-data.js --delete
```
