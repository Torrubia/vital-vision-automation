# VQB Mobile Layout Rules — Vital Vision Shop
# PLANNING DOCUMENT — Do not edit VQB, Shopify, or theme files.
# Human approval required before any implementation.

---

## Guiding Principles

- Premium, calm, intentional — not clinical or overwhelming.
- Mobile-first: every screen must be clean above the fold.
- No large text blocks before the user reaches the result.
- Discount code should support the result, not compete with it.
- One clear action per screen.

---

## Typography Rules

| Element | Desktop | Mobile |
|---|---|---|
| Quiz question headline | 24–28px | 18–20px |
| Product result headline | 22–26px | 18px |
| Product name | 20px, medium weight | 16px, medium weight |
| Body / result copy | 15–16px | 14px |
| CTA button label | 16px, bold | 15px, bold |
| Micro-copy / disclaimers | 12px | 11px |
| Discount code | 20px, monospace | 18px, monospace |

- Use system font stack or brand serif/sans — avoid custom fonts that load slowly on mobile.
- Line height: 1.5–1.6 for body copy. 1.2–1.3 for headlines.
- Avoid all-caps headlines on mobile — they read as shouting.
- Maximum line length: 60–65 characters on desktop, 40–45 on mobile.

---

## Product Result Card — Mobile Layout

### Stacking Order (mobile, top to bottom)
1. Match label ("Your Wellness Match") — small, muted
2. Product image — full width, aspect ratio 1:1 or 4:3
3. Product name — 16px, medium weight, no wrap
4. Result headline — 18px, italic or light weight
5. Key benefit tags — horizontal pill tags, wrappable
6. Result body copy — 14px, max 3–4 lines above fold
7. "Why This Match?" — collapsed/expandable section
8. CTA button — full width, 48px min height

### Mobile-Specific Rules
- Product image must appear ABOVE the product title (not beside it).
- Product title must not wrap to more than 2 lines at 375px width.
- If title wraps, reduce font size to 14px and use `word-break: break-word`.
- CTA button must be full-width (100%) on screens under 480px.
- Minimum tap target: 44px height, 44px width (Apple HIG standard).
- Avoid sticky CTAs that overlap content — use inline placement.

---

## Email Capture Screen — Mobile Rules

- Screen should fit within one viewport (no scroll required to reach CTA).
- Headline: max 2 lines at 375px.
- Subhead: max 2 lines, 14px.
- Email input: full width, 48px height, large touch target.
- CTA button: full width, directly below input field.
- Trust/micro-copy: below CTA, 11px, muted color.
- Remove any decorative imagery that pushes the CTA below the fold.

---

## Discount Code Screen — Mobile Rules

- Discount screen should NOT visually overpower the result.
- Display code in a clearly bounded box (border or light background).
- Code text: 18–20px monospace, centered.
- Expiry/instructions: 12px, muted, below code.
- CTA to proceed to result: clearly labeled — "See My Product Match ↓".
- Keep screen short: headline + code box + instructions + CTA only.
- Do not add imagery or marketing copy to this screen — keep it functional.

---

## "Why This Match?" Section — Mobile Rules

- Place BELOW the primary CTA button (not above it).
- Use an expandable/accordion pattern to keep the result card clean.
- Collapsed label: "Why This Match? +"
- Expanded: shows 3–5 sentence explanation.
- Font: 14px, body weight.
- Do not place "Why This Match?" above the fold — it delays conversion.

---

## Screen Flow Spacing

| Transition | Behavior |
|---|---|
| Quiz → Transition screen | Smooth fade or slide |
| Transition → Email capture | Immediate, no animation delay |
| Email capture → Discount screen | After form submit |
| Discount screen → Product result | On CTA tap ("See My Product Match") |
| Product result → CTA | Inline scroll — no modal |

---

## Color & Visual Hierarchy on Mobile

- Background: warm off-white (#FAF8F5 or similar)
- Product card: white card with subtle shadow, 12–16px border radius
- CTA button: brand primary color, high contrast, full width
- Discount code box: light sage or warm gray border, distinct but not bold
- Benefit tags: pill shape, muted brand color, small text
- Disclaimer: muted gray, small — present but not dominant

---

## Checklist Before Implementing in VQB

- [ ] Test all screens at 375px (iPhone SE) and 390px (iPhone 14)
- [ ] Confirm product title does not wrap aggressively at 375px
- [ ] Confirm CTA button is full width and tappable on mobile
- [ ] Confirm email input has large enough touch target
- [ ] Confirm discount screen does not push result below fold
- [ ] Confirm "Why This Match?" is below CTA
- [ ] Confirm no text block exceeds 45 characters per line on mobile
- [ ] Human review and approval before publishing any VQB changes

---

*PLANNING DOCUMENT — No VQB or Shopify edits have been made.*
*All layout changes require human review and approval before implementation.*
