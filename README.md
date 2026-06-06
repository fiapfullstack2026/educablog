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

---

## Endpoints principais

- `POST /post` — cria um novo post.
- `PUT /post/:id` — atualiza um post existente.

A requisição valida os campos com Zod e retorna `201` para criação bem-sucedida ou `200` para atualização.

---

## Estrutura do projeto

```
educablog/
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração TypeScript
├── src/
│   ├── app.ts                # Instância do Express e middleware
│   ├── server.ts             # Entrada do servidor e conexão com MongoDB
│   ├── entities/             # Schemas e modelos de domínio
│   │   ├── category.schema.ts
│   │   ├── post.schema.ts
│   │   └── models/
│   │       ├── category.interface.ts
│   │       └── post.interface.ts
│   ├── http/
│   │   └── controllers/
│   │       └── post/
│   │           ├── create.ts
│   │           ├── routes.ts
│   │           └── update.ts
│   ├── lib/
│   │   └── mongoose.ts       # Conexão com MongoDB
│   ├── repositories/         # Interfaces e implementações de repositório
│   │   ├── category.repository.interface.ts
│   │   ├── post.repository.interface.ts
│   │   └── mongoose/
│   │       ├── category.repository.ts
│   │       └── post.repository.ts
│   ├── use-cases/            # Regras de negócio
│   │   ├── create-post.ts
│   │   ├── update-post.ts
│   │   └── factory/
│   │       ├── make-create-post-use-case.ts
│   │       └── make-update-post-use-case.ts
│   └── utils/                # Utilitários genéricos
```

---

## Arquitetura

A aplicação segue uma camada de responsabilidade separada:

- Controllers: recebem requisições HTTP e validam payloads.
- Use cases: encapsulam lógica de criação e atualização.
- Repositórios: abstraem a persistência com MongoDB.
- Entities/Schemas: definem os modelos `Post` e `Category`.

O `PostRepository` resolve categorias via `CategoryRepository` antes de salvar o post, garantindo que objetos de categoria sejam reutilizados ou criados automaticamente.

---

## Observações

- O servidor usa `express.json()` para receber JSON.
- O banco MongoDB é conectado antes de expor as rotas `POST /post` e `PUT /post/:id`.
- O projeto foi pensado para ser executado localmente sem dependências externas além do MongoDB.
