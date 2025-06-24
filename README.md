[Node Badge]: https://img.shields.io/badge/Node.js-5fa04e?style=for-the-badge&logo=nodedotjs&labelColor=000
[Typescript Badge]: https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&labelColor=000
[NestJs Badge]: https://img.shields.io/badge/NestJS-e0234e?style=for-the-badge&logo=nestjs&labelColor=000&logoColor=e0234e
[Prisma Badge]: https://img.shields.io/badge/Prisma-2d3748?style=for-the-badge&logo=prisma&labelColor=000&logoColor=2d3748
[Jest Badge]: https://img.shields.io/badge/Jest-c21325?style=for-the-badge&logo=jest&labelColor=000&logoColor=c21325

<h1 align="center" style="font-weight: bold;">API de Lista de Tarefas</h1>

<div align="center">

![node][Node Badge]
![typescript][Typescript Badge]
![nestjs][NestJs Badge]
![prisma][Prisma Badge]
![jest][Jest Badge]

</div>

## Conteúdo

- [Sobre](#pushpin-sobre)
- [Tecnologias Utilizadas](#computer-tecnologias-utilizadas)
- [Instalação](#arrow_down-instalação)
- [Endpoints da API](#dart-endpoints-da-api)

## :pushpin: Sobre

Esta é uma API para gerenciamento de listas de tarefas. A API permite a criação de listas de tarefas, bem como a manipulação das tarefas dentro de cada lista.

Este é um projeto de exemplo para criar uma API de gerenciamento de tarefas usando **NestJS**. O objetivo principal é praticar conceitos como **Controller-Service-DTO**, **validações com class-validator**, e **testes com Jest**. O projeto foi desenvolvido utilizando o **Prisma** para integração com o banco de dados.

## :computer: Tecnologias Utilizadas

- Node.js
- TypeScript
- NestJs
- Prisma
- class-validator
- Jest

## :arrow_down: Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/en/download/current)

- [Git](https://git-scm.com/downloads)

### 1. Clone o repositório

```bash
git clone https://github.com/willvbgomes/lista-tarefas-nest.git
cd lista-tarefas-nest
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configuração

Crie um arquivo .env na raiz do projeto com as variáveis de ambiente necessárias. Ex:

```
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
```

Atualize o banco de dados conforme o arquivo schema.prisma:

```bash
npx prisma migrate dev
```

### 4. Rodando o Projeto

Para rodar a API em modo de desenvolvimento com recarregamento automático:

```bash
npm run start:dev
```

## :dart: Endpoints da API

| Rota                                  | Descrição                                       |
| ------------------------------------- | ----------------------------------------------- |
| <kbd>GET</kbd> /tasks                 | Retorna todas as tarefas.                       |
| <kbd>GET</kbd> /tasks?status=Pendente | Retorna as tarefas filtradas pelo campo status. |
| <kbd>POST</kbd> /tasks                | Cria uma nova tarefa.                           |
| <kbd>PATCH</kbd> /tasks/:id           | Atualiza o título e/ou status de uma tarefa.    |
| <kbd>DELETE</kbd> /tasks/:id          | Deleta uma tarefa.                              |

---

### Exemplos

<kbd>**GET /tasks**</kbd>

**Resposta:**

```json
[
  {
    "id": "a18b74db-2302-4b6d-9987-8acfe42c29c3",
    "title": "Example task 1",
    "status": "Concluída"
  },
  {
    "id": "f57e4231-cd68-4a94-a257-3a6a7396c924",
    "title": "Example task 2",
    "status": "Pendente"
  }
]
```

---

<kbd>**GET /tasks?status=Pendente**</kbd>

**Resposta:**

```json
[
  {
    "id": "f57e4231-cd68-4a94-a257-3a6a7396c924",
    "title": "Example task 2",
    "status": "Pendente"
  }
]
```

---

<kbd>**POST /lists**</kbd>

**Corpo da Requisição:**

```json
{
  "title": "Example task 2"
}
```

**Resposta:**

```json
{
  "id": "f57e4231-cd68-4a94-a257-3a6a7396c924",
  "title": "Example task 2",
  "status": "Pendente"
}
```

---

<kbd>**PATCH /tasks/a18b74db-2302-4b6d-9987-8acfe42c29c3**</kbd>

**Corpo da Requisição:**

```json
{
  "status": "Concluída"
}
```

**Resposta:**

```json
{
  "id": "a18b74db-2302-4b6d-9987-8acfe42c29c3",
  "title": "Example task 1",
  "status": "Concluída"
}
```

---

<kbd>**DELETE /tasks/a18b74db-2302-4b6d-9987-8acfe42c29c3**</kbd>

**Resposta:**

```json
{
  "id": "a18b74db-2302-4b6d-9987-8acfe42c29c3",
  "title": "Example task 1",
  "status": "Concluída"
}
```
