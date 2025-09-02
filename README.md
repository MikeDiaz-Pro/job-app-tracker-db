# 📌 Job Applications Tracker

Monorepo (simple structure) to manage the job application pipeline, divided into **modules**:

- **DB** (`/migrations`, `/scripts`): PostgreSQL with Docker, migrations, seeds, and validation scripts.
- **Web** (`/web`): React + Vite + Tailwind + Material Tailwind v3 application. Includes Redux Toolkit for global state and Axios for API requests.

> ⚠️ An `/api` module with Spring Boot will be added soon as an intermediary between the web and the database.

---

## 🗂️ Project Structure

```
job-app-tracker-db/
├─ migrations/           # SQL migrations
├─ scripts/              # Bash scripts (migration, validation, backup, etc.)
├─ web/                  # React + Vite + Tailwind + Material Tailwind
│  ├─ src/
│  │   ├─ components/    # Navbar, shared UI
│  │   ├─ features/      # Redux slices per domain (applications, etc.)
│  │   ├─ pages/         # Main views (Dashboard, Companies, etc.)
│  │   ├─ App.jsx
│  │   └─ main.jsx
│  ├─ tailwind.config.js
│  └─ package.json
├─ compose.yml           # Docker Compose (Postgres, optional pgAdmin)
├─ .env.example          # Environment variables
└─ README.md             # This file
```

---

## 🚀 Getting Started

### 1. Database (Postgres + Docker)
```bash
docker compose up -d
bash scripts/run_migration.sh   # apply migrations + seeds
bash scripts/validate_db.sh     # validate seeded data
```

### 2. Frontend (React + Vite + Tailwind)
```bash
cd web
npm install
npm run dev
```
Visit: [http://localhost:5173](http://localhost:5173)

---

## 📌 Features (current)
- **DB**  
  - Initial migrations (`application_status`, `companies`, `applications`)  
  - Basic indexes and validation with `EXPLAIN ANALYZE`  
  - Migration and validation scripts  

- **Web**  
  - Setup with Vite + Tailwind v3 + Material Tailwind v3  
  - Responsive Navbar with basic layout  
  - Redux structure prepared  

---

## 🔮 Next Steps
- [ ] Add an intermediate API in `/api` with Spring Boot (CRUD Applications).  
- [ ] Connect frontend to API (Axios + Redux Thunks).  
- [ ] Add OpenAI utility (e.g., auto-fill from Job Description).  
- [ ] Improve dashboard with metrics (cards, pipeline summary).  

---

## 📜 Module Docs
- [Database Docs](./db/README.md) (migrations, seeds, scripts).  
- [Frontend Docs](./web/README.md) (setup and component guides).  

---

## ✅ License
MIT
