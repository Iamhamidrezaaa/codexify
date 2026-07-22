#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ENV_FILE="$ROOT/.env.local"
DB_USER="${DB_USER:-codexify}"
DB_PASS="${DB_PASS:-CodexifyDb_ChangeMe_9f3a}"
DB_NAME="${DB_NAME:-codexify}"
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-5432}"

echo "==> Codexify DB setup"

if ! command -v psql >/dev/null 2>&1; then
  echo "==> Installing PostgreSQL..."
  sudo apt-get update -y
  sudo apt-get install -y postgresql postgresql-contrib
  sudo systemctl enable --now postgresql
fi

echo "==> Ensuring role/database exist..."
sudo -u postgres psql -v ON_ERROR_STOP=1 <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE ROLE ${DB_USER} LOGIN PASSWORD '${DB_PASS}';
  ELSE
    ALTER ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASS}';
  END IF;
END
\$\$;
SQL

if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1; then
  sudo -u postgres createdb -O "${DB_USER}" "${DB_NAME}"
fi

sudo -u postgres psql -v ON_ERROR_STOP=1 -d "${DB_NAME}" <<SQL
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
GRANT ALL ON SCHEMA public TO ${DB_USER};
ALTER SCHEMA public OWNER TO ${DB_USER};
SQL

DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"

touch "$ENV_FILE"
TMP="$(mktemp)"
grep -Ev '^(DATABASE_URL|AUTH_SECRET|AUTH_URL|NEXT_PUBLIC_SITE_URL)=' "$ENV_FILE" >"$TMP" || true
{
  cat "$TMP"
  echo "DATABASE_URL=\"${DATABASE_URL}\""
  echo "AUTH_SECRET=CodexifyAdminSecret_9f3a2c1b7e4d"
  echo "AUTH_URL=https://codexify.ir"
  echo "NEXT_PUBLIC_SITE_URL=https://codexify.ir"
} >"$ENV_FILE"
rm -f "$TMP"

echo "==> Prisma migrate + seed"
export DATABASE_URL
npx prisma generate
npx prisma migrate deploy
npm run db:seed

echo "==> Done. Restart app:"
echo "    pm2 restart all"
echo ""
echo "DATABASE_URL=${DATABASE_URL}"
