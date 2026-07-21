#!/usr/bin/env bash
# =============================================================================
# backup-local-n8n.sh
# Backs up the local (~/.n8n) n8n SQLite database.
# Run BEFORE starting a local npx n8n session or as a manual safety save.
# Does NOT modify the source database.
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="$SCRIPT_DIR/../backups/local"
SOURCE="$HOME/.n8n/database.sqlite"
SOURCE_CONFIG="$HOME/.n8n/config"
TS=$(date +%Y%m%d-%H%M%S)

echo "[backup-local-n8n] Starting local n8n backup..."
echo "[backup-local-n8n] Timestamp: $TS"

# Check source exists
if [ ! -f "$SOURCE" ]; then
  echo "[ERROR] Source database not found: $SOURCE"
  exit 1
fi

mkdir -p "$BACKUP_DIR"

# Copy database
cp "$SOURCE" "$BACKUP_DIR/database-$TS.sqlite"
echo "[backup-local-n8n] Database copied: $(du -sh "$BACKUP_DIR/database-$TS.sqlite" | cut -f1)"

# Copy WAL if non-empty
if [ -s "$HOME/.n8n/database.sqlite-wal" ]; then
  cp "$HOME/.n8n/database.sqlite-wal" "$BACKUP_DIR/database-$TS.sqlite-wal"
  echo "[backup-local-n8n] WAL copied"
else
  echo "[backup-local-n8n] WAL is empty or absent — skipped"
fi

# Copy SHM if non-empty
if [ -s "$HOME/.n8n/database.sqlite-shm" ]; then
  cp "$HOME/.n8n/database.sqlite-shm" "$BACKUP_DIR/database-$TS.sqlite-shm"
  echo "[backup-local-n8n] SHM copied"
fi

# Copy config (contains encryption key — file is permissions-protected)
if [ -f "$SOURCE_CONFIG" ]; then
  cp "$SOURCE_CONFIG" "$BACKUP_DIR/config-$TS"
  echo "[backup-local-n8n] Config copied (key not printed)"
fi

# Verify backup is readable
WORKFLOW_COUNT=$(sqlite3 "$BACKUP_DIR/database-$TS.sqlite" "SELECT COUNT(*) FROM workflow_entity;" 2>&1)
echo "[backup-local-n8n] Verified — workflow count: $WORKFLOW_COUNT"

echo "[backup-local-n8n] Backup complete: $BACKUP_DIR/"
ls -lh "$BACKUP_DIR/"
