#!/usr/bin/env bash
# Load .env.local (and .env) then run the given command.
# Usage: bash scripts/with-env.sh npx prisma migrate deploy
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

set -a
if [[ -f "$ROOT/.env" ]]; then
  # shellcheck disable=SC1091
  source "$ROOT/.env"
fi
if [[ -f "$ROOT/.env.local" ]]; then
  # shellcheck disable=SC1091
  source "$ROOT/.env.local"
fi
set +a

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "ERROR: DATABASE_URL is not set. Add it to .env.local or run: bash scripts/setup-db.sh" >&2
  exit 1
fi

exec "$@"
