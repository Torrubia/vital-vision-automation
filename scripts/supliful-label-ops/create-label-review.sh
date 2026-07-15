#!/usr/bin/env bash
# create-label-review.sh
# Creates a new label review log file for a Vital Vision product.
# Usage: ./create-label-review.sh <product-name> <review-type>
# Example: ./create-label-review.sh inner-calm migrated
# Review types: migrated | new | revised | batch | spot-check

set -e

# ── Validate arguments ──────────────────────────────────────────────────────
if [ -z "$1" ] || [ -z "$2" ]; then
  echo ""
  echo "Usage: ./create-label-review.sh <product-name> <review-type>"
  echo ""
  echo "  product-name  : inner-balance | inner-bloom | inner-calm | inner-grow"
  echo "  review-type   : migrated | new | revised | batch | spot-check"
  echo ""
  echo "Example:"
  echo "  ./create-label-review.sh inner-calm migrated"
  echo ""
  exit 1
fi

PRODUCT="$1"
REVIEW_TYPE="$2"

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

# ── Validate review type ────────────────────────────────────────────────────
VALID_TYPES="migrated new revised batch spot-check"
TYPE_VALID=false
for t in $VALID_TYPES; do
  if [ "$REVIEW_TYPE" = "$t" ]; then
    TYPE_VALID=true
    break
  fi
done

if [ "$TYPE_VALID" = false ]; then
  echo ""
  echo "Error: '$REVIEW_TYPE' is not a recognized review type."
  echo "Valid types: migrated | new | revised | batch | spot-check"
  echo ""
  exit 1
fi

# ── Paths ───────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOGS_DIR="$PROJECT_ROOT/vital-vision-system/supliful-label-ops/logs"
TEMPLATE="$PROJECT_ROOT/vital-vision-system/supliful-label-ops/templates/label-review-report-template.md"

# ── Check template exists ───────────────────────────────────────────────────
if [ ! -f "$TEMPLATE" ]; then
  echo ""
  echo "Error: Review report template not found at:"
  echo "  $TEMPLATE"
  echo ""
  echo "Ensure vital-vision-system/supliful-label-ops/ is set up correctly."
  exit 1
fi

# ── Generate filename ───────────────────────────────────────────────────────
DATE=$(date +"%Y-%m-%d")
FILENAME="${DATE}-${PRODUCT}-${REVIEW_TYPE}-label-review.md"
TARGET="$LOGS_DIR/$FILENAME"

# ── Check file does not already exist ──────────────────────────────────────
if [ -f "$TARGET" ]; then
  echo ""
  echo "Error: A review file already exists for this product and date:"
  echo "  $TARGET"
  echo ""
  echo "To create a second review today, rename the existing file first."
  exit 1
fi

# ── Create review file from template ───────────────────────────────────────
cp "$TEMPLATE" "$TARGET"

echo ""
echo "Label review file created:"
echo "  $TARGET"
echo ""
echo "Next steps:"
echo ""
echo "  1. Open the Supliful editor for $PRODUCT"
echo "  2. Take screenshots of all panels (do NOT click Save yet)"
echo "  3. Open prompts/master-label-orchestrator-prompt.md and copy the prompt"
echo "  4. Paste the prompt into Claude with your screenshots attached"
echo "  5. Fill in the review log at:"
echo "     $TARGET"
echo "  6. After a SAVE decision: complete checklists/save-label-approval-checklist.md"
echo "  7. Only after completing that checklist: click Save in Supliful"
echo ""
echo "Workflow reference: vital-vision-system/supliful-label-ops/workflows/01-review-migrated-label.md"
echo ""
