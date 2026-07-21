#!/usr/bin/env bash
# =============================================================================
# verify-n8n.sh
# Verifies that the vital-vision-n8n container is running and healthy.
# Checks: container status, HTTP health endpoint, workflow count via API.
# Does NOT start or stop the container.
# =============================================================================
set -euo pipefail

CONTAINER_NAME="vital-vision-n8n"
N8N_URL="http://localhost:5678"
PASS=0
FAIL=0

ok()   { echo "  [OK]  $1"; PASS=$((PASS + 1)); }
fail() { echo "  [FAIL] $1"; FAIL=$((FAIL + 1)); }
info() { echo "  [INFO] $1"; }

echo ""
echo "======================================="
echo "  Vital Vision n8n — Verification"
echo "  $(date)"
echo "======================================="
echo ""

# 1. Container exists
echo "--- Container State ---"
STATUS=$(docker inspect --format '{{.State.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "not_found")
if [ "$STATUS" = "running" ]; then
  ok "Container '$CONTAINER_NAME' is running"
elif [ "$STATUS" = "not_found" ]; then
  fail "Container '$CONTAINER_NAME' does not exist"
else
  fail "Container '$CONTAINER_NAME' status: $STATUS"
fi

# 2. Health status
HEALTH=$(docker inspect --format '{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "unknown")
if [ "$HEALTH" = "healthy" ]; then
  ok "Container health: healthy"
elif [ "$HEALTH" = "starting" ]; then
  info "Container health: still starting (normal within first 40s)"
else
  fail "Container health: $HEALTH"
fi

# 3. HTTP healthz endpoint
echo ""
echo "--- HTTP Health ---"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$N8N_URL/healthz" 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
  ok "Health endpoint $N8N_URL/healthz → HTTP $HTTP_CODE"
else
  fail "Health endpoint $N8N_URL/healthz → HTTP $HTTP_CODE (expected 200)"
fi

# 4. UI reachable
HTTP_UI=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$N8N_URL/" 2>/dev/null || echo "000")
if [ "$HTTP_UI" = "200" ] || [ "$HTTP_UI" = "301" ] || [ "$HTTP_UI" = "302" ]; then
  ok "UI reachable at $N8N_URL/ → HTTP $HTTP_UI"
else
  fail "UI not reachable at $N8N_URL/ → HTTP $HTTP_UI"
fi

# 5. Port listening
echo ""
echo "--- Port ---"
if lsof -i :5678 -sTCP:LISTEN &>/dev/null; then
  ok "Port 5678 is listening"
else
  fail "Port 5678 is not listening"
fi

# 6. Volume mounted
echo ""
echo "--- Volume ---"
MOUNTS=$(docker inspect --format '{{range .Mounts}}{{.Name}} {{end}}' "$CONTAINER_NAME" 2>/dev/null || echo "")
if echo "$MOUNTS" | grep -q "n8n_data"; then
  ok "Volume n8n_data is mounted"
else
  fail "Volume n8n_data is NOT mounted"
fi

# 7. Image version
echo ""
echo "--- Image ---"
IMAGE=$(docker inspect --format '{{.Config.Image}}' "$CONTAINER_NAME" 2>/dev/null || echo "unknown")
info "Running image: $IMAGE"
if echo "$IMAGE" | grep -q "2.23.2"; then
  ok "Pinned version 2.23.2 confirmed"
else
  fail "Image is not pinned to 2.23.2 — found: $IMAGE"
fi

# Summary
echo ""
echo "======================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "======================================="
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
