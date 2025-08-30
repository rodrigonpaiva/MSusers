# 👥 Apptit – Users Microservice

The **Users Service** manages user data and organizational context for the **Apptit** ecosystem.  
It is a **NestJS microservice** running with **TCP transport**, consumed by the **API Gateway (GraphQL)**.

---

## 📌 Main Responsibilities
- ✅ Manage **user profiles** (id, name, email, role).  
- ✅ Handle **multi-tenant support** (users belong to organizations).  
- ✅ Provide CRUD operations for users (create, update, list, delete).  
- ✅ Expose RPC endpoints for the API Gateway.  
- ✅ Serve as the **source of truth** for identity-related data (except authentication).  

---

## 🛠️ Tech Stack
- [NestJS](https://nestjs.com/) (microservice mode)  
- [Prisma](https://www.prisma.io/) ORM with MongoDB (via `@apptit/prisma` shared package)  
- [TCP transport](https://docs.nestjs.com/microservices/basics) for RPC communication  
- [TypeScript](https://www.typescriptlang.org/)  

---

## 📂 Project Structure

apps/users/
├─ src/
│  ├─ main.ts               # Microservice bootstrap (TCP transport)
│  ├─ users.module.ts       # Main Users module
│  ├─ users.controller.ts   # MessagePattern handlers
│  ├─ users.service.ts      # Business logic
│  ├─ dto/                  # DTOs for create/update
│  └─ entities/             # User entity definitions
├─ prisma/
│  ├─ schema.prisma         # User models (User, Tenant)
├─ package.json
└─ tsconfig.json

---

## ⚙️ Environment Variables
Create a `.env` inside `apps/users`:

```env
PORT=4001

# Database
DATABASE_URL="mongodb://localhost:27017/apptit-users"


⸻

▶️ Scripts

From the monorepo root or inside the service:

# Run in development mode
npm run start:dev --workspace=users

# Build for production
npm run build --workspace=users

# Run compiled code
npm run start --workspace=users

# Prisma commands
npm run prisma:generate --workspace=users
npm run prisma:migrate --workspace=users


⸻

🔌 RPC Endpoints

The service communicates via NestJS message patterns. Example handlers:

@MessagePattern({ cmd: 'users.findById' })
findById({ id }: { id: string }) {
  return this.usersService.findById(id);
}

@MessagePattern({ cmd: 'users.list' })
list() {
  return this.usersService.findAll();
}

@MessagePattern({ cmd: 'users.create' })
create(data: CreateUserDto) {
  return this.usersService.create(data);
}

The API Gateway consumes these endpoints via RpcService and exposes them through GraphQL queries/mutations.

⸻

🔍 Testing

Once the microservice is running:
	1.	Start users service:

npm run start:dev --workspace=users


	2.	Query via the API Gateway (GraphQL):

query {
  users {
    id
    email
    name
    role
  }
}

⸻

💡 The Users Service is the directory of Apptit: it maintains who the users are, what organizations they belong to, and what roles they hold.

---