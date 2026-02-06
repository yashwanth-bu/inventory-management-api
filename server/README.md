# Inventory Management API [Backend Server]

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql\&logoColor=white)

Backend server for managing inventory items, categories, suppliers, and stock movements.
Built with **Node.js**, **Express.js**, **Prisma ORM**, and **PostgreSQL**. A complete modular, scalable architecture.

---

## Features

| Feature                | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| Business Logic API     | Manage items, categories, suppliers, stock movements         |
| Role-based Access      | ADMIN, MANAGER, VIEWER roles                                 |
| Inventory Tracking     | Track current stock and movements                            |
| Audit Trail            | Record all stock changes for accountability                  |
| Modular Architecture   | Organized controllers, services, routes, middlewares         |
| Versioned Improvements | Incrementally improve code quality, testing, and performance |

---

## Tech Stack

| Layer     | Technology             |
| --------- | ---------------------- |
| Backend   | Node.js, Express.js    |
| Database  | PostgreSQL             |
| ORM       | Prisma                 |
| Config    | dotenv                 |
| Dev Tools | nodemon, Prisma Studio |

---

## Directory Structure

```
inventory-management/
├─ client/                 # Frontend (React, Vue, etc.)
├─ server/                 # Backend (Node.js + Express + Prisma)
│  ├─ prisma/              # Prisma schema & migrations
│  ├─ src/
│  │  ├─ config/           # App & environment config
│  │  ├─ cron/             # Scheduled jobs
│  │  ├─ modules/          # Feature-based Express routes
│  │  ├─ middleware/       # Auth & error handling
│  │  ├─ utils/            # Helper functions
│  │  ├─ bootstrap.js      # App initialization
│  │  └─ server.js         # Server entry point
│  ├─ package.json
│  └─ .env                 # Environment variables
├─ .gitignore
└─ README.md
```

---

## Setup Process

| Step | Command / Action                                                                  |
| ---- | --------------------------------------------------------------------------------- |
| 1    | Clone the repo: `git clone <repo-url>`                                            |
| 2    | Navigate to server folder: `cd inventory-management/server`                       |
| 3    | Install dependencies: `npm install`                                               |
| 4    | Configure environment: Copy `.env.example` → `.env` and set database URL, secrets |
| 5    | Generate Prisma client: `npx prisma generate`                                     |
| 6    | Apply migrations: `npx prisma migrate dev --name init`                            |
| 7    | Start development server: `npm run dev`                                           |
| 8    | Start production server: `npm start`                                              |
| 9    | (Optional) Open Prisma Studio: `npx prisma studio`                                |

---