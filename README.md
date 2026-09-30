# Heroes Factory API

This is the backend API for the Heroes Factory application, built with Node.js, Fastify, TypeScript, and Prisma ORM.

## Technologies Used

- Node.js
- Fastify (Web framework)
- TypeScript
- Prisma ORM (with MariaDB driver adapter for MySQL 8)
- Zod (Validation)
- MySQL 8.0 (Database)

## Architecture

The project follows a Clean Architecture approach with a hexagonal design pattern:
- **Entities/Schemas**: Zod definitions mapping the business rules.
- **Use Cases**: Encapsulate the core business logic (CreateHero, ListHeroes, etc).
- **Repositories**: Database access abstraction (Prisma implementation).
- **Routes**: Framework-specific entry points handling HTTP requests.
- **Dependency Injection**: Dependencies are injected into use cases to keep them framework-agnostic.

## Getting Started

### Prerequisites

- Node.js (v20+)
- pnpm
- Docker and Docker Compose

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the database using Docker Compose:
   ```bash
   docker compose up -d
   ```

3. Push the schema to the database and generate Prisma Client:
   ```bash
   pnpm db:push
   ```

### Running the API

Start the development server:

```bash
pnpm dev:server
```

The server will be available at `http://localhost:3333`.

## Documentation

The API includes Swagger and Scalar documentation.

- Swagger JSON: `http://localhost:3333/documentation/json`
- Scalar UI: `http://localhost:3333/api/docs`

## Features

- **Create a hero**: `POST /heroes`
- **List heroes**: `GET /heroes?page=1&limit=10&search=batman`
- **Get a hero by ID**: `GET /heroes/:id`
- **Update a hero**: `PUT /heroes/:id`
- **Deactivate a hero (Soft delete)**: `DELETE /heroes/:id`
- **Activate a hero (Restore)**: `PATCH /heroes/:id/activate`
