# Heroes Factory API

Este é o backend da aplicação **Heroes Factory**, construído com **Node.js, Fastify, TypeScript, e Prisma ORM**. Ele fornece uma API REST para o gerenciamento de um catálogo de heróis.

## 🚀 Tecnologias Utilizadas

- **Node.js** (v20+)
- **Fastify** (Micro-framework web ultrarrápido)
- **TypeScript** (Tipagem estática)
- **Prisma ORM** (Com o adapter MariaDB para MySQL 8)
- **Zod** (Validação de dados)
- **Jest** (Testes automatizados)
- **MySQL 8.0** (Banco de Dados, rodando via Docker)

## 🏗️ O que fizemos e por que fizemos assim

O projeto foi desenhado seguindo princípios de **Clean Architecture (Arquitetura Limpa)** e o padrão **Hexagonal**:

- **Entities/Schemas**: As regras de validação de negócio estão centralizadas usando o Zod.
- **Use Cases (Casos de Uso)**: A lógica core da aplicação está encapsulada nos casos de uso (CreateHero, ListHeroes, etc.). Eles não sabem da existência do Fastify ou das rotas HTTP, facilitando testes de unidade isolados.
- **Repositories (Repositórios)**: Criamos uma abstração para o acesso a dados. O Prisma é apenas uma ferramenta de infraestrutura que implementa a interface do repositório, permitindo que a camada de banco de dados seja substituída futuramente sem afetar a regra de negócio.
- **Routes / Controllers**: A camada mais externa que apenas recebe o HTTP, chama o caso de uso e devolve a resposta HTTP.
- **Injeção de Dependências**: As dependências (como os repositórios) são injetadas nos casos de uso, tornando o código completamente agnóstico a frameworks e testável.
- **Soft Delete**: Implementamos a desativação do herói (`isActive = false`) ao invés de deletá-lo do banco de dados definitivamente.

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Node.js (v20+)
- pnpm
- Docker e Docker Compose

### Instalação e Execução

1. Instale as dependências:
   ```bash
   pnpm install
   ```

2. Suba o banco de dados via Docker:
   ```bash
   docker compose up -d
   ```

3. Sincronize o schema no banco e gere o Prisma Client:
   ```bash
   pnpm db:push
   ```

4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   pnpm dev:server
   ```
O servidor estará rodando em: `http://localhost:3333`.

### Rodando os Testes

Para executar a suíte de testes (Jest):
```bash
pnpm test
```

## 📖 Documentação

A API expõe a especificação OpenAPI (Swagger) automaticamente:
- **Swagger JSON**: `http://localhost:3333/documentation/json`
- **Scalar UI**: `http://localhost:3333/api/docs`

## 🔮 Pontos de Melhoria Futura

1. **Autenticação e Autorização**: Adicionar JWT (JSON Web Tokens) para proteger rotas sensíveis (criação, edição e exclusão de heróis).
2. **Migrations**: Alterar de `db:push` para o uso de `prisma migrate` garantindo um controle de versionamento seguro do schema de banco de dados para a produção.
3. **Logs e Observabilidade**: Integrar ferramentas de APM e geração de logs estruturados (ex: Pino, que já é nativo do Fastify) no padrão JSON.
4. **Rate Limiting e Security Headers**: Utilizar `@fastify/rate-limit` e `@fastify/helmet` para proteger a API de ataques comuns.
5. **CI/CD**: Adicionar um pipeline no GitHub Actions para rodar testes, linting e type checking automaticamente.
