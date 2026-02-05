# ![React Icon](https://img.icons8.com/color/48/000000/react-native.png) Inventory Management Frontend [Client Side]

![React](https://img.shields.io/badge/React-61DAFB?logo=react\&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)

Frontend client for the Inventory Management System built with **React.js**.
Provides user interface for managing items, categories, suppliers, and stock movements.

---

## Features

| Feature            | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| Dashboard          | View inventory summary and stock status                       |
| Operations         | Manage items, categories, suppliers, stock movements          |
| Role-based Access  | Restrict actions based on user roles (ADMIN, MANAGER, VIEWER) |
| Forms & Validation | Client-side input validation for forms                        |

---

## Tech Stack

| Layer              | Technology                       |
| ------------------ | -------------------------------- |
| Frontend           | React.js, JSX                    |
| State Management   | Context API and React Hooks      |
| HTTP Client        | Axios                            |
| Styling            | Tailwind                         |
| Build Tool         | Vite                             |
| Environment Config | .env                             |

---

## Directory Structure

```
client/
├─ public/             # Static files (index.html, images, favicon)
├─ src/
│  ├─ components/      # Reusable UI components
│  ├─ pages/           # Main pages/views (Dashboard, Items, Suppliers)
│  ├─ services/        # API calls to backend
│  ├─ context/         # State management with Context API
│  ├─ hooks/           # Custom React hooks
│  ├─ App.js           # Main App component
│  └─ index.js         # React DOM render
├─ package.json
└─ .env                # API endpoints and environment variables
```

---

## Setup Process

| Step | Command / Action                                                               |
| ---- | ------------------------------------------------------------------------------ |
| 1    | Clone the repo: `git clone <repo-url>`                                         |
| 2    | Navigate to frontend folder: `cd inventory-management/client`                  |
| 3    | Install dependencies: `npm install`                                            |
| 4    | Configure environment: Copy `.env.example` → `.env` and set backend API URL    |
| 5    | Start development server: `npm start` or `npm run dev` (depending on CRA/Vite) |
| 6    | Open browser at `http://localhost:3000` (or Vite default port)                 |

---