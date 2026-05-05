# VQB Dashboard Assisted Update Draft — Vital Vision Shop
# Strategy: Browser-Assisted UI Automation (not direct API write)
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Status

| Item | Status |
|---|---|
| Approved copy | READY — automations/drafts/vqb-api-update-draft.json |
| Human approval | READY — automations/approved/2026-05-05-vqb-update-approval.md |
| Strategy shift | API → Browser-Assisted Dashboard Automation |
| Reason | VQB API blocked: "Request not allowed, Check Integration -> VQB for configurations." |
| Playwright | Needs install (npm install playwright && npx playwright install chromium) |
| Dashboard credentials | Needs VQB_DASHBOARD_EMAIL + VQB_DASHBOARD_PASSWORD in .env |
| Write executed | NO |
| VQB content modified | NO |

---

## Target Quiz

| Quiz | ID | Target |
|---|---|---|
| VV Home Quick Match Quiz — 1Q | 16047 | Primary (organic, homepage) |
| VV Google Ads Wellness — 5Q | 15203 | Secondary (paid, ads) |

Apply to organic quiz first. Review. Then apply to paid quiz separately.

---

## Automation Strategy

### Why Browser-Assisted, Not Direct API

The VQB API returns:
```json
{"error":"Request not allowed, Check Integration -> VQB for configurations."}
```

All 29 auth probe combinations were tested — none returned 200. This is a
dashboard-side Integration configuration block, not a code or key issue.

Browser-assisted automation navigates the VQB admin UI directly, just as a
human would, without requiring the API integration to be enabled.

### Safety Model

```
Human logs in → Script navigates → Script finds fields → Human confirms each fill
→ Human clicks Save → Human reviews preview → Human publishes (manually)
```

The script NEVER auto-saves. NEVER auto-publishes. NEVER clicks "Generate Key."
Every Save must be confirmed by the human in the terminal prompt.

---

## Screens and Fields

### Screen 1 — Email Capture
Find: Quiz Settings → Email Gate / Lead Capture Screen

| Field | Value |
|---|---|
| Headline | Unlock Your Personalized Result |
| Subhead | Your personalized result is ready — plus 10% off your first order. |
| Email placeholder | Your email address |
| CTA button | Reveal My Match → |
| Micro-copy | No spam. Unsubscribe anytime. |

---

### Screen 2 — Discount Code
Find: Quiz Settings → Discount Screen / Coupon Screen

| Field | Value |
|---|---|
| Headline | Your 10% Off Code Is Ready |
| Subhead | Continue to see your personalized wellness match. |
| Instructions | Applied automatically at checkout · Valid for 48 hours |
| CTA button | See My Product Match ↓ |
| Micro-copy | No purchase required to see your result. |

⚠️ Do NOT change the discount code field (WELCOME10 must already exist in Shopify).

---

### Screen 3a — Inner Bloom Result Card
Find: Result Pages → Inner Bloom (quiz answer: Digestion & Gut Wellness)

| Field | Value |
|---|---|
| Global label | Your Recommended Wellness Match |
| Result headline | Your gut may be ready for daily support. |
| Product name | Inner Bloom — Advanced Probiotic Formula |
| Description | Formulated to support healthy digestion and daily gut balance as part of a consistent wellness routine. One simple ritual, every morning. |
| Qty label | Choose Your Starting Point |
| Primary CTA | Shop This Match |
| Secondary CTA | Why This Match? |
| Disclaimer | This recommendation is for educational purposes only and is not medical advice. Results may vary. |
| Why This Match headline | Why Inner Bloom? |
| Why This Match body | Your answers suggest your body may benefit from daily digestive support. Inner Bloom is formulated with a targeted probiotic blend designed to support gut balance and overall digestive wellbeing — without harsh ingredients or complicated routines. Most customers make it part of their morning routine and commit to 60–90 days for their best results. Consistency is the key. |
| Why This Match tag | Results may vary. This is not medical advice. |

---

### Screen 3b — Inner Calm Result Card
Find: Result Pages → Inner Calm (quiz answer: Stress & Calm)

| Field | Value |
|---|---|
| Global label | Your Recommended Wellness Match |
| Result headline | Your evenings may deserve a calmer ritual. |
| Product name | Inner Calm — Magnesium Glycinate |
| Description | Formulated with magnesium glycinate to support a calm evening routine and overall wellness. A quiet daily ritual designed just for you. |
| Qty label | Choose Your Starting Point |
| Primary CTA | Shop This Match |
| Secondary CTA | Why This Match? |
| Disclaimer | This recommendation is for educational purposes only and is not medical advice. Results may vary. |
| Why This Match headline | Why Inner Calm? |
| Why This Match body | Your answers suggest your evenings could use more intentional support. Inner Calm uses magnesium glycinate — a form of magnesium designed to support relaxation and overall calm as part of a consistent nightly routine. Magnesium is one of the most common nutritional gaps in modern diets — Inner Calm is designed to support that daily need. One small step each evening. Designed for how you actually live. |
| Why This Match tag | Results may vary. This is not medical advice. |

---

### Screen 3c — Inner Grow Result Card
Find: Result Pages → Inner Grow (quiz answer: Hair, Skin & Nails)

| Field | Value |
|---|---|
| Global label | Your Recommended Wellness Match |
| Result headline | Your glow may start from within. |
| Product name | Inner Grow — Hair, Skin & Nails Support |
| Description | Formulated to support healthy hair, skin, and nails from within as part of a consistent daily wellness routine. Nourishment that works with your body. |
| Qty label | Choose Your Starting Point |
| Primary CTA | Shop This Match |
| Secondary CTA | Why This Match? |
| Disclaimer | This recommendation is for educational purposes only and is not medical advice. Results may vary. |
| Why This Match headline | Why Inner Grow? |
| Why This Match body | Your answers suggest your hair, skin, and nails may benefit from daily nutritional support from within. Inner Grow combines key nutrients designed to nourish the body from the inside out as part of a consistent daily wellness routine. Results may vary. Most customers commit to 60–90 days with consistent daily use. |
| Why This Match tag | Results may vary. This is not medical advice. |

---

### Screen 3d — Inner Balance Result Card
Find: Result Pages → Inner Balance (quiz answer: Overall Daily Wellness)

| Field | Value |
|---|---|
| Global label | Your Recommended Wellness Match |
| Result headline | Your body may be ready for a complete daily foundation. |
| Product name | Inner Balance — Daily Complete Multivitamin |
| Description | A complete daily multivitamin designed to support your overall wellness from within. One capsule. One ritual. Every day. |
| Qty label | Choose Your Starting Point |
| Primary CTA | Shop This Match |
| Secondary CTA | Why This Match? |
| Disclaimer | This recommendation is for educational purposes only and is not medical advice. Results may vary. |
| Why This Match headline | Why Inner Balance? |
| Why This Match body | Your answers suggest a strong daily nutritional foundation may be your most important starting point right now. Inner Balance is a complete daily multivitamin designed to support overall wellness from within — covering the essentials in one simple daily capsule. Build from a place of strength. |
| Why This Match tag | Results may vary. This is not medical advice. |

---

## Setup Before Running Apply

```bash
# 1. Install Playwright browser automation
npm install playwright
npx playwright install chromium

# 2. Add credentials to .env (do not commit)
# VQB_DASHBOARD_EMAIL=your@email.com
# VQB_DASHBOARD_PASSWORD=yourpassword
# VQB_DASHBOARD_URL=https://app.visualquizbuilder.com

# 3. Run the plan
npm run vqb:dashboard-plan

# 4. Run the dry-run (no browser needed)
npm run vqb:dashboard-dry-run

# 5. Run guided apply (observe mode first — no fills)
npm run vqb:dashboard-assisted-apply

# 6. Run guided apply with actual fills (human confirms each field)
npm run vqb:dashboard-assisted-apply -- --apply
```

---

## Fallback: Manual Paste

If browser automation cannot reliably locate VQB's fields, stop and use:
- `config/vqb-result-copy-to-paste.md` — one field per line, ready to paste
- `config/vqb-live-implementation-copy.md` — step-by-step instructions

This does not require Playwright or any additional setup.

---

*No VQB or Shopify content has been modified.*
*Human approval required before any save or publish.*
*VQB_API_MODE=read_only | AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true*
