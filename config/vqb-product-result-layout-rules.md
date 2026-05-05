# VQB Product Result Card Layout Rules — Vital Vision Shop
# PLANNING DOCUMENT — Do not edit VQB, Shopify, or theme files.
# Human approval required before any implementation.

---

## Result Card Element Order

### Mobile (≤ 480px) — Stacked Vertical Layout

```
┌─────────────────────────────────┐
│  Your Recommended Wellness Match │  ← small label, muted, centered
├─────────────────────────────────┤
│                                 │
│        [ Product Image ]        │  ← full width, 1:1 ratio
│                                 │
├─────────────────────────────────┤
│  Your gut may be ready for      │  ← result headline, 18px
│  daily support.                 │
├─────────────────────────────────┤
│  Inner Bloom                    │  ← product name, 16px medium
│  Advanced Probiotic Formula     │  ← product subname, 13px muted
├─────────────────────────────────┤
│  Formulated to support healthy  │  ← short description, 14px
│  digestion and daily gut        │
│  balance...                     │
├─────────────────────────────────┤
│  Choose Your Supply:            │  ← quantity label, 13px
│  [ 1 Bottle ] [ 2 Bottles ] [ 3 ]│  ← quantity selector pills
├─────────────────────────────────┤
│  ┌─────────────────────────┐    │
│  │     Shop This Match     │    │  ← primary CTA, full width, 48px
│  └─────────────────────────┘    │
├─────────────────────────────────┤
│       Why This Match?           │  ← secondary CTA, text link, muted
├─────────────────────────────────┤
│  This recommendation is for     │  ← disclaimer, 11px muted
│  educational purposes only...   │
└─────────────────────────────────┘
```

### Desktop (≥ 768px) — Optional Side-by-Side

```
┌────────────────┬────────────────────────────┐
│                │  Your Recommended Match     │
│  [Product Img] │  ─────────────────────────  │
│                │  Result headline            │
│   (square or   │  Product Name               │
│    portrait)   │  Short description          │
│                │                             │
│                │  [ Quantity selector ]      │
│                │                             │
│                │  [ Shop This Match ]        │
│                │                             │
│                │  Why This Match?            │
│                │                             │
│                │  Disclaimer                 │
└────────────────┴────────────────────────────┘
```

---

## Typography Scale

| Element | Desktop | Mobile | Weight |
|---|---|---|---|
| Global header ("Your Recommended...") | 13px | 12px | Regular, muted |
| Result headline | 22px | 18px | Light or italic |
| Product name | 18px | 16px | Medium |
| Product subname / tagline | 14px | 13px | Regular, muted |
| Short description | 15px | 14px | Regular |
| Quantity label | 13px | 13px | Regular |
| Primary CTA label | 16px | 15px | Bold |
| Secondary CTA label | 14px | 13px | Regular |
| Disclaimer | 12px | 11px | Regular, muted |

---

## Spacing Rules

- Minimum 12px vertical gap between all card elements on mobile.
- No zero-gap stacking — breathing room is essential for a premium feel.
- Product image: no margin on left/right on mobile (edge to edge).
- Card padding: 16–20px horizontal on mobile, 24–32px on desktop.
- Primary CTA: 16px top margin from quantity selector.
- Secondary CTA: 12px top margin from primary CTA.
- Disclaimer: 16–20px top margin from secondary CTA.

---

## Color & Visual Hierarchy

| Element | Color Guidance |
|---|---|
| Global header label | Muted sage or warm gray (#8a9a8a or similar) |
| Result headline | Dark charcoal or near-black (#2a2a2a) |
| Product name | Dark charcoal, medium weight |
| Short description | Mid-gray (#555) |
| Primary CTA | Brand primary (deep sage, warm navy, or charcoal — high contrast) |
| Primary CTA text | White |
| Secondary CTA | Transparent background, muted text color, no border or subtle underline |
| Quantity selector (selected) | Light brand accent background, brand border |
| Quantity selector (unselected) | White background, light gray border |
| Disclaimer | Light gray (#999) |
| Card background | White or warm off-white |
| Card shadow | Subtle (0 2px 12px rgba(0,0,0,0.08)) |

---

## Product Image Rules

- Aspect ratio: 1:1 (square) preferred for mobile consistency.
- Mobile: full card width — no left/right padding on image container.
- Desktop: 40–50% of card width, left column.
- Image alt text: "[Product Name] supplement bottle" — no marketing claims in alt text.
- Lazy loading: enabled (do not block page render on image load).
- Max image file size: 150KB compressed for mobile performance.

---

## Primary CTA Rules

- Full width on mobile (100% of card content width).
- Minimum height: 48px (Apple HIG / WCAG tap target standard).
- Border radius: 6–8px (premium, not overly rounded).
- Font: bold, 15px minimum on mobile.
- No icon needed — label alone is sufficient.
- Hover state (desktop): slight darkening of background color.
- Active state (mobile): brief opacity reduction on tap.

---

## Secondary CTA — "Why This Match?" Rules

- Placed BELOW the primary CTA — never above it.
- Rendered as a text link or a very subtle outline button.
- Must NOT visually compete with the primary CTA.
- On tap: expand an inline accordion section OR scroll to an explanation section below.
- Do not open a modal — inline expansion is preferred on mobile.
- Label: "Why This Match?" (with no arrow icon — keep it subtle).

---

## Quantity Selector Rules

- Display as pill/chip buttons — not a dropdown on mobile.
- Chips: horizontally aligned, wrap if needed.
- Default selected: 1 Bottle — 30-Day Supply.
- Labels should communicate supply duration, not just count.
- Do not use aggressive upsell language ("You MUST buy 3!").
- Optional "Best Value" tag on 3-bottle option — small, muted badge.

---

## What to Avoid on the Result Card

- Side-by-side image and text on screens under 480px.
- Product title wrapping beyond 3 lines.
- Large empty whitespace between elements on mobile.
- Two equally weighted CTAs (creates decision paralysis).
- Aggressive countdown timers or scarcity pop-ups on result card.
- Long blocks of copy above the primary CTA.
- Anything that pushes the primary CTA below the first scroll on mobile.

---

## Pre-Implementation Checklist

- [ ] Result headline fits on 2 lines at 375px
- [ ] Product name fits on 2 lines at 375px
- [ ] Product image loads above product name on mobile
- [ ] Primary CTA is full width and 48px tall
- [ ] Secondary CTA is clearly less dominant than primary
- [ ] "Why This Match?" appears below primary CTA
- [ ] Disclaimer is present and readable (min 11px)
- [ ] No compliance issues in any copy element
- [ ] Tested at 375px, 390px, and 430px
- [ ] Human approved before publishing

---

*PLANNING DOCUMENT — No VQB or Shopify edits have been made.*
*All layout changes require human review and approval before implementation.*
