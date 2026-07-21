#!/usr/bin/env bash
# =============================================================================
# backup-docker-n8n.sh
# Backs up the Docker n8n_data volume using a temporary alpine container.
# Creates both a raw SQLite copy and a portable SQL dump.
# Safe to run while the n8n container is stopped.
# If the container is running, stop it first for a clean backup:
#   docker compose -f infrastructure/n8n/docker-compose.yml down
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="$SCRIPT_DIR/../backups/docker"
VOLUME_NAME="n8n_data"
TS=$(date +%Y%m%d-%H%M%S)

echo "[backup-docker-n8n] Starting Docker volume backup..."
echo "[backup-docker-n8n] Timestamp: $TS"
echo "[backup-docker-n8n] Volume: $VOLUME_NAME"

# Confirm volume exists
if ! docker volume inspect "$VOLUME_NAME" &>/dev/null; then
  echo "[ERROR] Docker volume '$VOLUME_NAME' not found."
  exit 1
fi

mkdir -p "$BACKUP_DIR"

docker run --rm \
  -v "${VOLUME_NAME}:/source" \
  -v "${BACKUP_DIR}:/backup" \
  alpine sh -c "
    set -e
    apk add --no-cache sqlite 2>/dev/null 1>/dev/null

    echo '[backup-docker-n8n] Copying database.sqlite...'
    cp /source/database.sqlite /backup/database-${TS}.sqlite

    echo '[backup-docker-n8n] Copying WAL/SHM if present...'
    [ -f /source/database.sqlite-wal ] && cp /source/database.sqlite-wal /backup/database-${TS}.sqlite-wal && echo '[backup-docker-n8n] WAL copied' || echo '[backup-docker-n8n] No WAL file'
    [ -f /source/database.sqlite-shm ] && cp /source/database.sqlite-shm /backup/database-${TS}.sqlite-shm && echo '[backup-docker-n8n] SHM copied' || echo '[backup-docker-n8n] No SHM file'

    echo '[backup-docker-n8n] Copying config (key not printed)...'
    [ -f /source/config ] && cp /source/config /backup/config-${TS} || echo '[backup-docker-n8n] No config file'

    echo '[backup-docker-n8n] Creating SQL dump...'
    sqlite3 /source/database.sqlite .dump > /backup/dump-${TS}.sql
    echo '[backup-docker-n8n] SQL dump lines:' \$(wc -l < /backup/dump-${TS}.sql)

    echo '[backup-docker-n8n] Verifying backup...'
    WF_COUNT=\$(sqlite3 /backup/database-${TS}.sqlite 'SELECT COUNT(*) FROM workflow_entity;')
    echo \"[backup-docker-n8n] Workflow count in backup: \${WF_COUNT}\"
  "

echo "[backup-docker-n8n] Backup complete: $BACKUP_DIR/"
ls -lh "$BACKUP_DIR/"
