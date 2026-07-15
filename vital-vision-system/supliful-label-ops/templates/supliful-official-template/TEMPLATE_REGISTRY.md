# Supliful Official Template Registry

This registry tracks the official Supliful label template files for all 7 Vital Vision label redesign products.

**Last updated:** 2026-07-02
**Status:** Workspace ready — template files pending manual copy from Downloads

---

## Manual Copy Instructions

Claude Code cannot access ~/Downloads due to macOS sandbox restrictions.

Run this in Terminal to copy the templates into the project:

```bash
# Copy all 7 template folders — safe, non-destructive, skips existing files
PROJECT="$HOME/Documents/vital-vision-automation/vital-vision-system/supliful-label-ops/templates/supliful-official-template"

cp -Rn ~/Downloads/VOX4PROB_Probiotic_40_Billion_with_Prebiotics/. "$PROJECT/inner-bloom/"
cp -Rn ~/Downloads/VOX4COMP_Complete_Multivitamin/.              "$PROJECT/inner-balance/"
cp -Rn ~/Downloads/VOX4MGNE_Magnesium_Glycinate/.                "$PROJECT/inner-calm/"
cp -Rn ~/Downloads/VOX4HAIR_Hair_Skin_and_Nails_Essentials/.     "$PROJECT/inner-grow/"
cp -Rn ~/Downloads/VOX4MACA_Maca_Plus/.                          "$PROJECT/maca-plus/"
cp -Rn ~/Downloads/VOX4BONE_Bone_\&_Heart_Support/.              "$PROJECT/bone-heart-support/"
cp -Rn ~/Downloads/VTL4FATB_Fat_Burner_with_MCT/.               "$PROJECT/fat-burner-mct/"

echo "Copy complete. Run: ls -la $PROJECT/inner-bloom/"
```

The `-Rn` flag means: recursive copy, never overwrite existing files. Safe to run multiple times.

After copying, update the "Files present" column in the table below.

---

## Product-to-Template Mapping

| # | Vital Vision Product | Supliful SKU | Destination Folder | Files Present |
|---|---|---|---|---|
| 1 | INNER BLOOM | VOX4PROB_Probiotic_40_Billion_with_Prebiotics | `inner-bloom/` | Pending copy |
| 2 | INNER BALANCE | VOX4COMP_Complete_Multivitamin | `inner-balance/` | Pending copy |
| 3 | INNER CALM | VOX4MGNE_Magnesium_Glycinate | `inner-calm/` | Pending copy |
| 4 | INNER GROW | VOX4HAIR_Hair_Skin_and_Nails_Essentials | `inner-grow/` | Pending copy |
| 5 | MACA PLUS | VOX4MACA_Maca_Plus | `maca-plus/` | Pending copy |
| 6 | BONE & HEART SUPPORT | VOX4BONE_Bone_&_Heart_Support | `bone-heart-support/` | Pending copy |
| 7 | FAT BURNER WITH MCT | VTL4FATB_Fat_Burner_with_MCT | `fat-burner-mct/` | Pending copy |

---

## Expected Source Files Per Template

Each official Supliful template folder typically contains:

| File type | Purpose |
|---|---|
| `.ai` file | Adobe Illustrator master — layers, safe area, bleed guides, matrix code zone |
| `.psd` file | Photoshop version — same layout in raster format |
| `.pdf` | Flattened reference or print-ready export |
| `.png` / `.jpg` | Preview or flat reference image |
| `README` or `INSTRUCTIONS` | Supliful's print spec notes |

**Do not edit source `.ai` or `.psd` files directly.** These are the technical truth. Use them to extract dimensions, safe area, bleed, and matrix code zone measurements. Build the redesign in Canva using these specs.

---

## Technical Specifications (All Products)

| Spec | Value |
|---|---|
| Label size | 6" W × 2.25" H |
| Safe area | Inner boundary — all text and logos must stay inside |
| Bleed area | Extends beyond the label edge — background fills only |
| Matrix code zone | Bottom-right area — reserved, nothing overlaps |
| Final export format | PDF, PNG, or JPG |
| Maximum file size | 10 MB |
| Color mode | CMYK recommended for print accuracy |
| Resolution | 300 DPI minimum |

---

## Redesign Batches

### Batch 1 — Urgent (Existing Core Products)

| Product | Reason for urgency |
|---|---|
| INNER BLOOM | Core product — currently live on Shopify |
| INNER CALM | Core product — currently live on Shopify |
| INNER BALANCE | Core product — currently live on Shopify |
| INNER GROW | Core product — currently live on Shopify |

### Batch 2 — Expansion (New Products)

| Product | Reason |
|---|---|
| MACA PLUS | New product launch |
| BONE & HEART SUPPORT | New product launch |
| FAT BURNER WITH MCT | New product launch |

---

## Status Tracker

| Product | Template copied | Spec extracted | Canva build | QA review | Lucy approved | Uploaded to Supliful |
|---|---|---|---|---|---|---|
| INNER BLOOM | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| INNER BALANCE | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| INNER CALM | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| INNER GROW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| MACA PLUS | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| BONE & HEART SUPPORT | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| FAT BURNER WITH MCT | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
