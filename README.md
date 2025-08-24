# Node.js Prisma CRUD - API

Uma API HTTP simples para gerenciamento de usuários construída com Node.js, Express, TypeScript e Prisma ORM. Implementa operações CRUD básicas seguindo alguns princípios REST.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web para Node.js
- **TypeScript** - Superset JavaScript com tipagem estática
- **Prisma** - ORM moderno para Node.js e TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização do banco de dados

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd node-prisma-crud
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   DATABASE_URL="postgresql://nodeuser:node123@localhost:5433/nodecruddb"
   PORT=3000
   ```

4. **Inicie o banco de dados com Docker**
   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do Prisma**
   ```bash
   npx prisma migrate dev
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

O servidor estará rodando em `http://localhost:3000`

## 📚 Estrutura do Projeto

```
node-prisma-crud/
├── src/
│   ├── app.ts          # Configuração da aplicação Express
│   └── server.ts       # Servidor HTTP
├── prisma/
│   ├── schema.prisma   # Schema do banco de dados
│   └── migrations/     # Migrações do banco
├── middleware/
│   └── errorHandling.ts # Middleware de tratamento de erros
├── utils/
│   └── AppError.ts     # Classe de erro customizada
├── docker-compose.yml  # Configuração do Docker
└── package.json
```

## 🗄️ Modelo de Dados

### User
- `id` (Int, Primary Key, Auto Increment)
- `name` (String, Obrigatório)
- `email` (String, Único, Obrigatório)
- `profession` (String, Opcional)

## 🔌 Endpoints da API

### Criar Usuário
```http
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "profession": "Desenvolvedor"
}
```

**Resposta:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "profession": "Desenvolvedor"
}
```

### Listar Todos os Usuários
```http
GET /users
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "profession": "Desenvolvedor"
  }
]
```

### Atualizar Usuário
```http
PUT /users/:id
Content-Type: application/json

{
  "name": "João Silva Atualizado",
  "email": "joao.novo@email.com",
  "profession": "Desenvolvedor Senior"
}
```

**Resposta:**
```json
{
  "id": 1,
  "name": "João Silva Atualizado",
  "email": "joao.novo@email.com",
  "profession": "Desenvolvedor Senior"
}
```

### Deletar Usuário
```http
DELETE /users/:id
```

**Resposta:**
```json
{
  "message": "user deleted"
}
```

## ⚠️ Limitações Atuais

Esta é uma implementação básica de CRUD. Para uma API REST completa, seria recomendável adicionar:

- Endpoint `GET /users/:id` para buscar usuário específico
- Validação de entrada mais robusta
- Paginação para listagem de usuários
- Filtros e ordenação
- Autenticação e autorização
- Rate limiting
- Documentação com Swagger

## 🐳 Docker

O projeto inclui um `docker-compose.yml` que configura um container PostgreSQL:

- **Porta**: 5433 (mapeada para 5432 do container)
- **Usuário**: nodeuser
- **Senha**: node123
- **Database**: nodecruddb

Para iniciar apenas o banco de dados:
```bash
docker-compose up -d postgres
```

## 🛡️ Tratamento de Erros

O projeto implementa um sistema de tratamento de erros customizado:

- **AppError**: Classe para erros da aplicação
- **errorHandling**: Middleware para capturar e formatar erros
- Validações para usuários duplicados e não encontrados

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot reload
- `npx prisma migrate dev`: Executa as migrações do banco de dados
- `npx prisma studio`: Abre o Prisma Studio para visualizar o banco

## 👨‍💻 Autor

**Diego Coelho**
