# PageFly Result Page — Reusable Layout Template
# Vital Vision Shop
# Generated: 2026-05-11
# Status: TEMPLATE — apply per product using individual copy files

---

## Overview

This template defines the PageFly section structure for all 4 Inner Line result pages.
Build Inner Bloom first using this structure, then duplicate the PageFly page and
swap the copy + colors for each remaining product.

---

## PageFly Build Order

1. Build Inner Bloom result page from scratch using this template
2. In PageFly: duplicate the page → rename → swap copy + palette
3. Repeat for Inner Calm, Inner Grow, Inner Balance
4. Do NOT publish any page until mobile QA passes and human sign-off is complete

---

## Section Structure

### BLOCK 1 — Hero

**PageFly component:** Full-width Image Banner or Hero Section

| Setting | Value |
|---|---|
| Layout | Full-width, 100vw |
| Height | 85–100vh on desktop, auto on mobile |
| Background | Product-specific botanical image (see individual copy file → Image Direction) |
| Overlay | Soft dark overlay (20–30% opacity) to ensure text readability |
| Text alignment | Left-aligned on desktop, center on mobile |

**Elements inside Hero:**
- [ ] Small label above headline: `Your Wellness Match ✨` (small caps or light weight)
- [ ] H1 headline: `Your Quiz Match: [Product Name]`
- [ ] Subheadline paragraph
- [ ] Personalized result statement (smaller, lighter weight)
- [ ] Primary CTA button: `VIEW YOUR MATCH →`
- [ ] Disclaimer line (smallest text, muted color): `Educational only. Not medical advice. Results may vary.`

**Mobile behavior:**
- Stack text block below image OR overlay on mobile-safe lower portion of image
- CTA button: full-width, min 48px height
- Font sizes: H1 28–32px, subhead 16px, statement 14px, disclaimer 11px

---

### BLOCK 2 — Personalized Profile

**PageFly component:** Two-column row (icon left, text right) OR centered single column

| Setting | Value |
|---|---|
| Background | White or off-white (#FAFAF8) |
| Padding | 48px top/bottom, 24px left/right on mobile |
| Max width | 720px centered |

**Elements:**
- [ ] Section label (small caps): `Your Wellness Profile`
- [ ] Body paragraph (personalized match narrative)
- [ ] Quiz match label block:
  - `Your Wellness Goal: [quiz answer]`
  - `Your Match: [Product Name]`
  - Style as a bordered callout box or highlight card

**Mobile behavior:**
- Single column
- Callout box full-width with light border and soft background

---

### BLOCK 3 — Product Recommendation Card

**PageFly component:** Product section or custom two-column block

| Setting | Value |
|---|---|
| Background | White |
| Layout | Product image left, copy right (desktop) / stacked (mobile) |
| Image | Shopify product image — do NOT manually upload (link to Shopify product) |

**Elements:**
- [ ] Section heading: `Your Daily Match`
- [ ] Section subheading: `Selected from your quiz answers to support your daily routine.`
- [ ] Product name (H2 or H3)
- [ ] Product description paragraph
- [ ] Quantity/variant selector (link to Shopify product page — do NOT embed variant logic here)
- [ ] Primary CTA button: `VIEW PRODUCT →` → links to Shopify product page
- [ ] Secondary CTA: `WHY THIS MATCH?` → anchors to Section 4 or opens accordion
- [ ] Short disclaimer: `Educational only. Not medical advice.`

**Mobile behavior:**
- Product image full-width, stacked above copy
- Both CTA buttons full-width, stacked
- Primary CTA: min 48px, brand color fill
- Secondary CTA: ghost/outline style, min 44px

**Note:** Do NOT embed Add to Cart on this page. Route to the Shopify product page.
This keeps cart/checkout logic native to Shopify and avoids PageFly cart complexity.

---

### BLOCK 4 — Why This Match

**PageFly component:** Accordion or expandable section, OR static text block

| Setting | Value |
|---|---|
| Background | Light alternate (#F5F5F0 or product-specific soft tint) |
| Padding | 48px top/bottom |
| Max width | 680px centered |

**Elements:**
- [ ] Section heading: `Why [Product Name]?`
- [ ] Body paragraphs (2–3 short paragraphs)
- [ ] Compliance tag: `Results may vary. This is not medical advice.`

**Mobile behavior:**
- Full-width single column
- Compliance tag in smaller muted text below body

---

### BLOCK 5 — Benefit Bullets

**PageFly component:** 3-column icon + text grid (desktop) / stacked cards (mobile)

| Setting | Value |
|---|---|
| Background | White |
| Columns | 3 on desktop, 1 on mobile |
| Icon style | Simple line icons — leaf, sun, circle (no medical symbols) |

**Elements (per card):**
- [ ] Icon (SVG or PNG, 32–40px)
- [ ] Benefit headline (short, bold)
- [ ] Benefit description (2–3 sentences)

**Below the grid:**
- [ ] FDA disclaimer in small muted text (full verbatim text — see copy files)

**Mobile behavior:**
- Stacked single column
- Each card padded individually
- FDA disclaimer full-width

---

### BLOCK 6 — Routine Steps

**PageFly component:** Numbered steps / timeline block

| Setting | Value |
|---|---|
| Background | Off-white or light product tint |
| Layout | Horizontal steps (desktop) / vertical stacked (mobile) |
| Step indicator | Number circle (Step 1, Step 2, Step 3) |

**Elements:**
- [ ] Section heading: `Your Simple [Morning/Evening/Daily] Ritual`
- [ ] Step 1, Step 2, Step 3 (see individual copy files)
- [ ] Note block below steps (italicized, muted): general wellness note

**Mobile behavior:**
- Full-width vertical stack
- Step numbers large and clearly visible
- Note block in smaller italic text

---

### BLOCK 7 — Trust & Disclaimer Block

**PageFly component:** Full-width section with soft background

| Setting | Value |
|---|---|
| Background | Light sage or product-tinted soft color |
| Padding | 48px |
| Max width | 680px centered |
| Text weight | Light/regular — not bold |

**Elements:**
- [ ] Section heading: `Our Commitment to Transparency`
- [ ] Brand commitment paragraph
- [ ] FDA disclaimer (verbatim — do NOT abbreviate or paraphrase)
- [ ] Additional disclaimer paragraph

**Mobile behavior:**
- Single column, full-width
- All text left-aligned
- FDA disclaimer slightly smaller (12–13px) but fully readable

---

### BLOCK 8 — FAQ

**PageFly component:** Accordion FAQ (each question expands on tap)

| Setting | Value |
|---|---|
| Background | White |
| Accordion style | Clean — chevron or plus icon on right |
| Collapsed state | Shows question only |
| Expanded state | Reveals answer below |

**Elements:**
- [ ] Section heading: `Questions About Your Match`
- [ ] 5 Q&A pairs (see individual copy files for each product)
- [ ] FAQ items should be tappable on mobile — min 44px per row

**Mobile behavior:**
- Full-width accordion
- Tap target min 44px per row
- Answer text 14px, readable

---

### BLOCK 9 — Final CTA

**PageFly component:** Full-width CTA banner

| Setting | Value |
|---|---|
| Background | Brand color (product-specific) or dark overlay |
| Text color | White |
| CTA button | White fill, dark text OR brand reverse |

**Elements:**
- [ ] Section heading: `Ready to [product-specific action]?`
- [ ] Body sentence (1–2 lines)
- [ ] Primary CTA button: `VIEW [PRODUCT NAME] →`
- [ ] Secondary text link: `← Retake the Quiz` (links back to quiz page)
- [ ] Final disclaimer (smallest text): `Results may vary. Educational only. Not medical advice.`

**Mobile behavior:**
- Full-width CTA button, min 52px height
- Secondary link below button, centered
- Disclaimer below secondary link

---

## Global PageFly Settings (Apply to All 4 Pages)

| Setting | Value |
|---|---|
| Page title format | `[Product] — Your Personalized Wellness Match \| Vital Vision Shop` |
| Font: Headings | Match Vital Vision theme (likely Playfair, Cormorant, or similar serif) |
| Font: Body | Match Vital Vision theme (likely Inter, Lato, or similar sans-serif) |
| Primary CTA color | Product-specific brand color (see each copy file) |
| Link to quiz | https://vitalvision.shop — quiz embed or quiz page |
| Noindex | Set in Shopify page settings — do NOT index these pages until strategy is confirmed |

---

## Duplication Workflow (After Inner Bloom Is Built)

1. PageFly dashboard → Inner Bloom result page → Duplicate
2. Rename: `Inner Calm Result Page`
3. Update URL handle: `inner-calm-result`
4. Swap all copy using `inner-calm-result-page-copy.md`
5. Swap background image to Inner Calm palette (see copy file → Image Direction)
6. Update CTA link to Inner Calm Shopify product page
7. Mobile QA (full checklist)
8. Human sign-off before publishing

Repeat for Inner Grow and Inner Balance.

---

*Template only. No PageFly pages have been created.*
*Build Inner Bloom first, then duplicate.*
