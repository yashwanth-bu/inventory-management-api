# Inventory Management System

![React](https://img.shields.io/badge/React-61DAFB?logo=react\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql\&logoColor=white)

A full-stack Inventory Management System.
Backend service for inventory and stock management.
Includes item catalog, suppliers, stock tracking, and audit history.
Built with a modular, scalable architecture.

---

## Features

| Feature              | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| Business Logic       | Backend API for managing items, categories, suppliers, stock movements |
| Dashboard            | Frontend UI for inventory summary and stock status                     |
| Role-based Access    | ADMIN, MANAGER, VIEWER roles control access and actions                |
| Stock Tracking       | Track inventory levels and stock movement history                      |
| Audit Trail          | Record all stock changes for accountability                            |
| Forms & Validation   | Input validation on frontend and backend                               |
| Responsive Design    | Works on desktop and mobile devices                                    |
| Modular Architecture | Organized backend controllers, services, routes, middlewares           |

---

## Tech Stack

| Layer              | Technology                         |
| ------------------ | ---------------------------------- |
| Frontend           | React.js, JSX, Tailwind            |
| Backend            | Node.js, Express.js, Prisma ORM    |
| Database           | PostgreSQL                         |
| HTTP Client        | Axios                              |
| State Management   | Context API & React Hooks          |
| Environment Config | dotenv                             |
| Dev Tools          | nodemon, Prisma Studio, Vite       |

---

## Directory Structure

```
inventory-management/
├─ client/              # Frontend (React.js)
│  ├─ public/           # Static files
│  ├─ src/
│  │  ├─ components/    # Reusable UI components
│  │  ├─ pages/         # Main views (Dashboard, Items, Suppliers)
│  │  ├─ services/      # API calls to backend
│  │  ├─ context/       # State management
│  │  ├─ hooks/         # Custom React hooks
│  │  ├─ App.js
│  │  └─ index.js
│  ├─ package.json
│  └─ .env              # API URL
│
├─ server/              # Backend (Node.js + Express + Prisma)
│  ├─ prisma/           # Prisma schema & migrations
│  ├─ src/
│  │  ├─ controllers/   # Route logic
│  │  ├─ routes/        # Express routes
│  │  ├─ services/      # Business logic
│  │  ├─ middlewares/   # Auth & error handling
│  │  ├─ utils/         # Helpers
│  │  └─ index.js       # Server entry point
│  ├─ package.json
│  └─ .env              # DB URL and secrets
├─ .gitignore
└─ README.md
```

---

## Setup Process

### Backend

1. Navigate to server folder: `cd inventory-management/server`
2. Install dependencies: `npm install`
3. Configure environment: Copy `.env.example` → `.env` and set `DATABASE_URL` and other secrets
4. Generate Prisma client: `npx prisma generate`
5. Apply migrations: `npx prisma migrate dev --name init`
6. Start development server: `npm run dev`
7. Start production server: `npm start`
8. (Optional) Open Prisma Studio: `npx prisma studio`

---

### Frontend

1. Navigate to client folder: `cd inventory-management/client`
2. Install dependencies: `npm install`
3. Configure environment: Copy `.env.example` → `.env` and set backend API URL
4. Start development server: `npm start` or `npm run dev` (CRA or Vite)
5. Open browser at `http://localhost:3000` (or Vite default port)

---

### Notes 

* Backend and frontend run independently and communicate via REST API.
* Prisma handles database operations for PostgreSQL.
* Role-based access is enforced in backend middleware.
* Environment variables are required for both frontend (API URL) and backend (DB credentials, JWT secret).

---

## Version 1 [Current State Development]
- CRUD operations for items
- Category assignment for items
- Basic request validation
- Standard HTTP status codes