# 🗃️ Job Applications Tracker – DB (PostgreSQL + Docker)

A small **DB-first** project to model and analyze a job application pipeline.  
This repository contains a PostgreSQL setup with reproducible migrations, indexes, sample queries and performance notes.

> Scope for the first 2 weeks: model core entities, create indexes, run useful queries, and document `EXPLAIN (ANALYZE)` results.

---

## 🚀 Quick Start

### 1) Requirements
- Docker Desktop (Compose v2)
- `psql` or any SQL client (optional if you use pgAdmin service)

### 2) Copy environment file
```bash
cp .env.example .env
# tweak values if needed
```

### 3) Start services
```bash
docker compose up -d
```

- **Postgres** on `localhost:${POSTGRES_PORT:-5432}`  
- **Database** `${POSTGRES_DB}` with user `${POSTGRES_USER}`

> pgAdmin service is **optional**. See below to enable it.

### 4) Run migration + seed
```bash
bash scripts/run_migration.sh
```
This applies `migrations/001_init.sql` and `scripts/seed.sql`.

### 5) Run sample query (with EXPLAIN)
```bash
psql -h localhost -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\timing on"   -c "EXPLAIN (ANALYZE, BUFFERS)
SELECT a.id, a.applied_at, a.status_code, c.name AS company, jp.title
FROM application a
JOIN job_posting jp ON jp.id = a.job_posting_id
JOIN company c ON c.id = jp.company_id
WHERE a.status_code IN ('applied','in_review','interview')
ORDER BY a.applied_at DESC
LIMIT 20;"
```

Copy the plan into the README under **Evidence** and add 1–2 lines of analysis.

---

## 📦 Project Structure

```
.
├─ migrations/
│  └─ 001_init.sql
├─ scripts/
│  ├─ run_migration.sh
│  └─ seed.sql
├─ pgdata/                 # local bind mount (ignored by git)
├─ compose.yml             # Docker Compose file
├─ .env.example            # sample env vars
├─ .env                    # your local env (ignored)
├─ .gitignore
└─ README.md
```

---

## ⚙️ Docker Compose (compose.yml)

```yaml
services:
  postgres:
    image: postgres:15
    container_name: jat_postgres
    env_file:
      - ./.env
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "${POSTGRES_PORT:-5432}:5432"
    volumes:
      - ./pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 10

  # Optional: enable if you want a reproducible pgAdmin setup
  # pgadmin:
  #   image: dpage/pgadmin4:8
  #   container_name: jat_pgadmin
  #   depends_on:
  #     postgres:
  #       condition: service_healthy
  #   env_file:
  #     - ./.env
  #   environment:
  #     PGADMIN_DEFAULT_EMAIL: ${PGADMIN_EMAIL}
  #     PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD}
  #   ports:
  #     - "${PGADMIN_PORT:-8081}:80"
  #   volumes:
  #     - ./pgadmin_data:/var/lib/pgadmin
```

> Using a **bind mount** (`./pgdata`) keeps data visible and easy to wipe. The folder is ignored by git.

---

## 🔐 Environment

`.env.example`:
```bash
# Postgres
POSTGRES_USER=jat
POSTGRES_PASSWORD=jat
POSTGRES_DB=job_tracker
POSTGRES_PORT=5432

# pgAdmin (optional)
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin
PGADMIN_PORT=8081
```

`.gitignore`:
```gitignore
pgdata/
pgadmin_data/
.env
```

---

## 🧱 Schema v1 (migrations/001_init.sql)
Core entities to track job applications:

- `company(id, name, website, created_at)`  
- `job_posting(id, company_id, title, location, url, created_at)`  
- `application_status(code, label)` catalog  
- `application(id, job_posting_id, applied_at, status_code, source, salary_min, salary_max, notes)`  

Includes useful indexes:
- `idx_job_posting_company` on `job_posting(company_id)`  
- `idx_application_status_date` on `application(status_code, applied_at desc)`  
- `idx_application_job` on `application(job_posting_id)`

> See the file for full SQL.

---

## 🌱 Seed (scripts/seed.sql)
Minimal data to demo queries:
- 2 companies (`Acme`, `Globex`)
- 2 job postings
- 1 application with status `applied`

---

## 🔎 Useful Queries

- **Active applications (pipeline)**
```sql
SELECT a.id, a.applied_at, a.status_code, c.name AS company, jp.title
FROM application a
JOIN job_posting jp ON jp.id = a.job_posting_id
JOIN company c ON c.id = jp.company_id
WHERE a.status_code IN ('applied','in_review','interview')
ORDER BY a.applied_at DESC
LIMIT 20;
```

- **Applications by status (last 7 days)**
```sql
SELECT a.status_code, COUNT(*) AS total
FROM application a
WHERE a.applied_at >= NOW() - INTERVAL '7 days'
GROUP BY a.status_code
ORDER BY total DESC;
```

- **Top companies by applications**
```sql
SELECT c.name, COUNT(*) AS total
FROM application a
JOIN job_posting jp ON jp.id = a.job_posting_id
JOIN company c ON c.id = jp.company_id
GROUP BY c.name
ORDER BY total DESC
LIMIT 5;
```

> For performance, always check plans with:
> `EXPLAIN (ANALYZE, BUFFERS) <your query>`

---

## 🧪 Evidence (to keep in README or Notion)
- [ ] `EXPLAIN` plan screenshot or copy for **Active applications** query  
- [ ] Note: which index was used? expected vs actual rows? total time?  
- [ ] Backup & restore verified

---

## 💾 Backup & Restore

**Backup (plain SQL):**
```bash
PGPASSWORD="$POSTGRES_PASSWORD" pg_dump -h localhost -U "$POSTGRES_USER" -d "$POSTGRES_DB" > backups/backup.sql
```

**Restore:**
```bash
PGPASSWORD="$POSTGRES_PASSWORD" psql -h localhost -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f backups/backup.sql
```

Create the `backups/` folder if it doesn't exist.

---

## 🧰 Scripts

`scripts/run_migration.sh`:
```bash
#!/usr/bin/env bash
set -e
export PGPASSWORD=${POSTGRES_PASSWORD:-jat}
psql -h localhost -U "${POSTGRES_USER:-jat}" -d "${POSTGRES_DB:-job_tracker}" -f migrations/001_init.sql
psql -h localhost -U "${POSTGRES_USER:-jat}" -d "${POSTGRES_DB:-job_tracker}" -f scripts/seed.sql
echo "✅ Migration + seed applied"
```

Make it executable:
```bash
chmod +x scripts/run_migration.sh
```
---

## 🔎 Validation Script

We use a helper script to validate that the database is up, seeded and accessible.

**File:** `scripts/validate_db.sh`

```bash
#!/usr/bin/env bash
set -e

# Load env vars from .env
set -o allexport
[ -f .env ] && source .env
set +o allexport

export PGPASSWORD="$POSTGRES_PASSWORD"

echo "🔎 Running validation query on $POSTGRES_DB ..."

psql -h "${POSTGRES_HOST:-localhost}" \
     -p "${POSTGRES_PORT:-5432}" \
     -U "${POSTGRES_USER:-jat}" \
     -d "${POSTGRES_DB:-job_tracker}" \
     -c "SELECT code, label, class_name FROM application_status;"

echo "✅ Validation complete"

Make it executable:
```bash
chmod +x scripts/run_migration.sh
```

bash scripts/validate_db.sh

   code     |   label    |  class_name
------------+------------+--------------
 applied    | Applied    | bg-blue-500
 in_review  | In review  | bg-yellow-500
 interview  | Interview  | bg-purple-500
 offer      | Offer      | bg-green-600
 rejected   | Rejected   | bg-red-600
(5 rows)

✅ Validation complete

---

## 🧭 Roadmap (2-week DB-first)
- Week 1: schema v1, indexes, seed, queries + EXPLAIN
- Week 2: status history, tags, views/materialized views, KPIs, hardening

PRs:
- `PR #1` – DB v1 (core tables + indexes + seed + queries)
- `PR #2` – DB v2 (history + tags + views + KPIs)

---

## 📜 License
Educational / portfolio use.
