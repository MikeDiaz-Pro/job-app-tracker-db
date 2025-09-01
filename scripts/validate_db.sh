#!/usr/bin/env bash
set -e

# 👉 load vars from .env
set -o allexport
[ -f .env ] && source .env
set +o allexport

# Export password to avoid interactive prompt
export PGPASSWORD="$POSTGRES_PASSWORD"

echo "🔎 Running validation query on $POSTGRES_DB ..."

psql -h "${POSTGRES_HOST:-localhost}" \
     -p "${POSTGRES_PORT:-5432}" \
     -U "${POSTGRES_USER:-jat}" \
     -d "${POSTGRES_DB:-job_tracker}" \
     -c "SELECT code, label, class_name FROM application_status;"

echo "✅ Validation complete"