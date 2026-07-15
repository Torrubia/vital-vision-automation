#!/usr/bin/env bash
# create-product-label-folder.sh
# Creates a product-specific subfolder inside supliful-label-ops/logs/
# for organizing all review records, approval records, and decision logs for one product.
# Usage: ./create-product-label-folder.sh <product-name>
# Example: ./create-product-label-folder.sh inner-calm

set -e

# ── Validate arguments ──────────────────────────────────────────────────────
if [ -z "$1" ]; then
  echo ""
  echo "Usage: ./create-product-label-folder.sh <product-name>"
  echo ""
  echo "  product-name : inner-balance | inner-bloom | inner-calm | inner-grow"
  echo ""
  echo "Example:"
  echo "  ./create-product-label-folder.sh inner-calm"
  echo ""
  exit 1
fi

PRODUCT="$1"

# ── Validate product name ───────────────────────────────────────────────────
VALID_PRODUCTS="inner-balance inner-bloom inner-calm inner-grow"
PRODUCT_VALID=false
for p in $VALID_PRODUCTS; do
  if [ "$PRODUCT" = "$p" ]; then
    PRODUCT_VALID=true
    break
  fi
done

if [ "$PRODUCT_VALID" = false ]; then
  echo ""
  echo "Error: '$PRODUCT' is not a recognized product name."
  echo "Valid products: inner-balance | inner-bloom | inner-calm | inner-grow"
  echo ""
  exit 1
fi

# ── Paths ───────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOGS_DIR="$PROJECT_ROOT/vital-vision-system/supliful-label-ops/logs"
PRODUCT_DIR="$LOGS_DIR/$PRODUCT"

# ── Check folder does not already exist ────────────────────────────────────
if [ -d "$PRODUCT_DIR" ]; then
  echo ""
  echo "Product folder already exists — will not overwrite:"
  echo "  $PRODUCT_DIR"
  echo ""
  echo "Existing contents:"
  ls "$PRODUCT_DIR"
  echo ""
  exit 0
fi

# ── Create folder structure ─────────────────────────────────────────────────
mkdir -p "$PRODUCT_DIR/reviews"
mkdir -p "$PRODUCT_DIR/approvals"
mkdir -p "$PRODUCT_DIR/decisions"

# Create .gitkeep files so empty subfolders are tracked by git
touch "$PRODUCT_DIR/reviews/.gitkeep"
touch "$PRODUCT_DIR/approvals/.gitkeep"
touch "$PRODUCT_DIR/decisions/.gitkeep"

# Create a product index file
cat > "$PRODUCT_DIR/README.md" << EOF
# Label Logs — $PRODUCT

This folder contains all label review records for the $PRODUCT product.

## Subfolders

- \`reviews/\` — Completed label-review-report-template.md files
- \`approvals/\` — Completed human-approval-record-template.md files
- \`decisions/\` — Migration decision records and escalation notes

## File Naming Convention

- Review: \`[YYYY-MM-DD]-$PRODUCT-[type]-label-review.md\`
- Approval: \`[YYYY-MM-DD]-$PRODUCT-save-approved.md\`
- Decision: \`[YYYY-MM-DD]-$PRODUCT-migration-decision.md\`

## Product Reference

For product specs and approved claims, see:
\`vital-vision-system/products/$PRODUCT.md\`
EOF

echo ""
echo "Product label folder created:"
echo "  $PRODUCT_DIR/"
echo "    reviews/"
echo "    approvals/"
echo "    decisions/"
echo "    README.md"
echo ""
echo "Next steps:"
echo ""
echo "  1. Run your first label review for $PRODUCT:"
echo "     ./create-label-review.sh $PRODUCT migrated"
echo ""
echo "  2. Move completed review files into the appropriate subfolder:"
echo "     $PRODUCT_DIR/reviews/"
echo ""
echo "  3. After saving a label, file the approval record in:"
echo "     $PRODUCT_DIR/approvals/"
echo ""
echo "Reference workflows:"
echo "  vital-vision-system/supliful-label-ops/workflows/01-review-migrated-label.md"
echo "  vital-vision-system/supliful-label-ops/workflows/03-supliful-label-save-approval.md"
echo ""
