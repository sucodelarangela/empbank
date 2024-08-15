<div id='top'>

# Empbank - Controle Financeiro

</div>

_[Read it in English](#English)_

O projeto deste repositório é uma aplicação de controle financeiro onde o usuário pode cadastrar suas entradas e saídas financeiras mensais. Este projeto foi desenvolvido como desafio técnico para o processo seletivo da [**Empbank**](https://empbank.com.br/) para o cargo de **Desenvolvedor Fullstack Júnior**.

> Nota: O banco de dados PostgreSQL e a hospedagem da API foi feita via Railway, que possui limitação de horas mensais para funcionamento. O limite de tempo permitiu tempo suficiente para que a avaliação técnica do projeto pudesse ser feita. Após o término do limite, o banco de dados foi excluído e, consequentemente, o deploy da aplicação. Fique à vontade para estudar o código.

<!-- prettier-ignore -->
| 🪧 Vitrine. Dev |     |
| -------------- | --- |
| ✨ Nome        | **Empbank: controle financeiro** |
| 🏷️ Tecnologias | React, TypeScript, [Mantine](https://mantine.dev/), Sass, PostgreSQL, Prisma, Firebase, Node, Express, Railway |
| 🎨 Design      | [Figma](https://www.figma.com/file/I5ctuYJN7TMTEQx5oL1wt3/Prova-Empbank) |
<!--| 🚀 URL         | **https://empbank.vercel.app** |-->

![](https://raw.githubusercontent.com/sucodelarangela/empbank/main/web/public/og-image.jpg#vitrinedev)

<div>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/mantine-1d87d5?style=for-the-badge">
  <img src="https://img.shields.io/badge/sass-f8f9fa?style=for-the-badge&logo=sass&logoColor=CC6699">
  <img src="https://img.shields.io/badge/firebase-051e34?style=for-the-badge&logo=firebase&logoColor=FFCA28">
  <img src="https://img.shields.io/badge/postgresql-212121?style=for-the-badge&logo=postgresql&logoColor=4169E1"/>
  <img src="https://img.shields.io/badge/prisma-f7fafc?style=for-the-badge&logo=prisma&logoColor=2D3748">
  <img src="https://img.shields.io/badge/node-233056?style=for-the-badge&logo=node.js&logoColor=339933">
  <img src="https://img.shields.io/badge/express-eeeeee?style=for-the-badge&logo=express&logoColor=000000">
  <img src="https://img.shields.io/badge/railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=fff">
</div>

## ✅ Requisitos técnicos

- **Front-end:** React, Typescript e Mantine.
- **Back-end:** Node, Typescript, Express e ORM à escolha.
- **Banco de dados:** PostgreSQL.

## 🖧 Funcionalidades

### Tela de Login

- [x] Login por email e senha

### Tela de Cadastro

- [x] Cadastro de usuário com nome completo, email e senha.

### Tela Wallet

- [x] Dashboard com entrada, saída e valor total;
- [x] Listagem de todas as transações segmentadas por data, com paginação;
- [x] Barra de busca por título e nome da categoria;
- [x] Botão para adicionar nova transação;
- [x] Modal para nova transação;
- [x] Tabela de transações com título, valor, categoria e entrada ou saída.

### Opcionais

- [x] Aplicação responsiva.

## ⚙️ Como funciona

- O usuário faz seu cadastro na aplicação na tela de Cadastro (podendo usar um e-mail fictício);
- Se o cadastro der certo, o usuário é redirecionado para a tela de Login para acesso;
- Caso não queira efetuar cadastro, é possível acessar a aplicação com o email `teste@teste.com` e senha `123456`;
- Na tela Wallet, o usuário pode cadastrar uma Nova Transação no botão do canto superior direito;
- As transações cadastradas são mostradas na mesma tela em forma de tabela;
- Para pesquisar transações, basta digitar na barra de busca;
- Para sair da aplicação, clique na mensagem de boas vindas na parte superior da tela.

<a href='#top'>🔼 Voltar ao topo</a>

---

<div id="English">

_English version_

</div>

## 🔎 Overview

The project in this repository is an web app for financial control where the user may register her/his monthly cash inflow and outflows. This project was developed as a technical test for [**Empbank**](https://empbank.com.br/)'s **Junior Fullstack Developer** opening.

> Note: The database and the API url are hosted via Railway, which has a monthly working-time limit. This time limit was just enough so that my code and running application could be analysed by the technical reviewers. When the time limit has finished, the database and the application deploy were deleted. Feel free to browse my code.

## ✅ Technical requirements

- **Front-end:** React, Typescript and Mantine.
- **Back-end:** Node, Typescript, Express and ORM of my choice.
- **Banco de dados:** PostgreSQL.

## 🖧 Features

### Login screen

- [x] Login with email and password

### Register screen

- [x] User registration with name, email and password

### Wallet screen

- [x] Dashboard with inflows, outflows and total values;
- [x] List of all transactions shown by date (descendant) and with pagination;
- [x] Search bar for title and category;
- [x] Button for new transaction;
- [x] Modal for new transaction;
- [x] Table of transactions with title, value, category and type (inflow/outflow).

### Optionals

- [x] Responsive app.

## ⚙️ How to use it

- The user registers to the app in the Register page (it is possible to use a fake email);
- If the registration is successful, the user will be redirected to Login screen for access;
- In case the user does not wish to register, they can enter the application with the e-mail `teste@teste.com` and password `123456`;
- On Wallet screen, the user can add a new transaction by clicking the button on the top right corner;
- The new transactions will be shown on this same screen in the form of a table;
- To search transactions, the user can type directly on the search bar;
- To log out of the application, click on the welcome message on the top center of the screen.

<a href='#top'>🔼 Back to top</a>

---

Developed with 🧡 by [@sucodelarangela](https://angelacaldas.vercel.app)
