# EducaBlog

API para blogging dinâmico entre professores e alunos.

O projeto foi desenvolvido como parte do Tech Challenge FIAP e oferece um backend em TypeScript com Express e MongoDB para criar e atualizar publicações.

---

## Stack

| Camada      | Tecnologia                       |
| ----------- | -------------------------------- |
| Backend     | Node.js · TypeScript · Express 5 |
| Banco       | MongoDB · Mongoose 9             |
| Validação   | Zod 4                            |
| Auth        | JWT · bcryptjs                   |
| Docs        | swagger-ui-express               |
| Build / Dev | tsx · tsup                       |
| Lint        | ESLint · Prettier                |

---

## Início rápido

```bash
# 1. Entrar no diretório do projeto
cd educablog

# 2. Instalar dependências
npm install

# 3. Rodar em desenvolvimento
npm run start:dev

# Alternativa: build + execução
npm run build
npm start
```

O servidor inicia por padrão em `http://localhost:3000`.

---

## Configuração

A aplicação usa as seguintes variáveis de ambiente:

| Variável      | Descrição                  | Valor padrão                          |
| ------------- | -------------------------- | ------------------------------------- |
| `PORT`        | Porta do servidor          | `3000`                                |
| `MONGODB_URI` | URI de conexão com MongoDB | `mongodb://127.0.0.1:27017/educablog` |
| `JWT_SECRET`  | Chave secreta do JWT       | `dev-secret`                          |

---

## Endpoints principais

### Usuários (públicos)

- `POST /user/register` — cadastra um novo usuário (`username`, `password`, `isTeacher?`). Retorna `201`.
- `POST /user/signin` — autentica e retorna um token JWT. Retorna `200`.

### Posts (requerem `Authorization: Bearer <token>`)

- `GET /post/` — lista todos os posts.
- `GET /post/search?q=termo` — busca posts por palavra-chave.
- `GET /post/:id` — retorna um post pelo id.
- `POST /post/` — cria um post _(somente professores)_. Retorna `201`.
- `PUT /post/:id` — atualiza um post existente _(somente professores)_. Retorna `200`.
- `DELETE /post/:id` — remove um post _(somente professores)_. Retorna `200`.

### Documentação

- `GET /docs` — Swagger UI com a especificação completa da API.

Todos os payloads são validados com Zod.

---

## Estrutura do projeto

```
educablog/
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração TypeScript
├── src/
│   ├── app.ts                # Instância do Express e middlewares globais
│   ├── server.ts             # Entrada do servidor e conexão com MongoDB
│   ├── docs/
│   │   └── swagger.ts        # Especificação OpenAPI
│   ├── entities/             # Schemas e modelos de domínio
│   │   ├── post.schema.ts
│   │   ├── user.schema.ts
│   │   └── models/
│   │       ├── post.interface.ts
│   │       └── user.interface.ts
│   ├── http/
│   │   ├── middleware/
│   │   │   └── jwt-validate.ts   # authenticate + authorize (professores)
│   │   └── controllers/
│   │       ├── post/
│   │       │   ├── routes.ts
│   │       │   ├── create.ts
│   │       │   ├── update.ts
│   │       │   ├── remove.ts
│   │       │   ├── get.ts
│   │       │   ├── list.ts
│   │       │   └── search.ts
│   │       └── user/
│   │           ├── routes.ts
│   │           ├── register.ts
│   │           └── sign-in.ts
│   ├── lib/
│   │   └── mongoose.ts       # Conexão com MongoDB
│   ├── middlewares/
│   │   └── global-error.ts   # Handler de erros global
│   ├── repositories/         # Interfaces e implementações de repositório
│   │   ├── post.repository.interface.ts
│   │   ├── user.repository.interface.ts
│   │   └── mongoose/
│   │       ├── post.repository.ts
│   │       └── user.repository.ts
│   └── use-cases/            # Regras de negócio
│       ├── create-post.ts
│       ├── update-post.ts
│       ├── delete-post.ts
│       ├── get-post.ts
│       ├── list-posts.ts
│       ├── search-posts.ts
│       ├── register.ts
│       ├── sign-in.ts
│       └── factory/
│           ├── make-create-post-use-case.ts
│           ├── make-update-post-use-case.ts
│           ├── make-delete-post-use-case.ts
│           ├── make-get-post-use-case.ts
│           ├── make-list-posts-use-case.ts
│           ├── make-search-posts-use-case.ts
│           ├── make-register-use-case.ts
│           └── make-sign-in-use-case.ts
```

---

## Arquitetura

A aplicação segue uma camada de responsabilidade separada:

- **Controllers**: recebem requisições HTTP e validam payloads com Zod.
- **Use cases**: encapsulam as regras de negócio (CRUD de posts, registro e autenticação de usuários).
- **Repositórios**: abstraem a persistência com MongoDB via Mongoose.
- **Entities/Schemas**: definem os modelos `Post` e `User`.
- **Middleware JWT**: `authenticate` valida o token em todos os endpoints de post; `authorize` restringe criação, edição e remoção a usuários com `isTeacher: true`.

---

## Observações

- O servidor usa `express.json()` para receber JSON.
- O banco MongoDB é conectado antes de expor as rotas.
- Todos os endpoints de post exigem `Authorization: Bearer <token>` no header.
- Operações de escrita (`POST`, `PUT`, `DELETE`) em posts são restritas a professores (`isTeacher: true`).
- Em desenvolvimento, se `JWT_SECRET` não estiver definido, o valor `dev-secret` é usado como fallback — nunca use esse padrão em produção.
- A documentação interativa fica disponível em `http://localhost:3000/docs` após subir o servidor.
