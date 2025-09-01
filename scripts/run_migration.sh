#!/usr/bin/env bash
set -e

# load vars from .env
set -o allexport
[ -f .env ] && source .env
set +o allexport

export PGPASSWORD="${POSTGRES_PASSWORD:-jat}"

psql -h localhost -p "${POSTGRES_PORT:-5432}" -U "${POSTGRES_USER:-jat}" -d "${POSTGRES_DB:-job_tracker}" -f migrations/001_init.sql
psql -h localhost -p "${POSTGRES_PORT:-5432}" -U "${POSTGRES_USER:-jat}" -d "${POSTGRES_DB:-job_tracker}" -f scripts/seed.sql

echo "✅ Migration + seed applied"