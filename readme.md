## PROJECT NATOURS

💻Node.js & Express: Para o backend, usamos Node.js com o framework Express. Criei um servidor para processar as solicitações de agendamento e enviar e-mails de confirmação. O Express facilitou a configuração das rotas e a integração com o Nodemailer para o envio de e-mails.
O Express é um framework para Node.js que facilita o desenvolvimento de aplicações web e APIs. Ele é amplamente utilizado para construir servidores eficientes e flexíveis. No meu projeto, o Express desempenha um papel crucial no backend, gerenciando solicitações e respostas de forma simplificada.
💡Configuração do Servidor: O Express foi usado para configurar o servidor que irá receber e processar solicitações HTTP. O código inicializa o Express e define a porta na qual o servidor irá escutar.
💡 Middleware: Middleware é uma função que processa a solicitação antes que ela chegue ao manipulador de rotas. Você usou dois tipos de middleware: bodyParser: Para interpretar o corpo das requisições em formatos como JSON e URL-encoded. Isso permite que o servidor entenda e manipule os dados enviados pelo cliente.
💡 cors: Para permitir que seu servidor aceite requisições de diferentes origens, o que é crucial para a comunicação entre o frontend e o backend quando eles estão hospedados em domínios diferentes.
💡 Rota para Enviar E-mail: A rota /send-email é definida para processar solicitações POST. Quando uma requisição é recebida, o servidor utiliza o Nodemailer para enviar um e-mail com os dados do agendamento.



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
