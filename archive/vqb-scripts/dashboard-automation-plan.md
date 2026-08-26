# VQB Dashboard Automation Plan — Vital Vision Shop
# Generated: 2026-05-05T23:53:43.019Z
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Overview

This plan describes the browser-assisted VQB dashboard automation workflow.
No direct VQB API writes are used. All changes go through the VQB admin UI.
Human approval is required before any save/publish action.

---

## Strategy: Browser-Assisted UI Automation

| Approach | Status |
|---|---|
| Direct VQB API write | BLOCKED — "domain not allowed" / Integration setting issue |
| Browser-assisted dashboard automation | ADOPTED — Playwright guided flow |
| Manual copy-paste (fallback) | ALWAYS AVAILABLE — config/vqb-result-copy-to-paste.md |

---

## Readiness Status

| Item | Status |
|---|---|
| Approved copy (payload JSON) | READY ✅ |
| Human approval file | READY ✅ |
| Playwright installed | NOT INSTALLED — run: npm install playwright && npx playwright install chromium |
| Dashboard credentials | NOT SET — add VQB_DASHBOARD_EMAIL and VQB_DASHBOARD_PASSWORD to .env |
| Dashboard URL | https://app.visualquizbuilder.com |

---

## Scope — 6 Screens, 51 Fields

| # | Screen | Fields | VQB Location |
|---|---|---|---|
| 1 | Email Capture | 5 | Quiz Settings → Email Gate |
| 2 | Discount Code | 6 | Quiz Settings → Discount Screen |
| 3 | Inner Bloom Result Card + Why | 9 | Result Pages → Inner Bloom |
| 4 | Inner Calm Result Card + Why | 9 | Result Pages → Inner Calm |
| 5 | Inner Grow Result Card + Why | 9 | Result Pages → Inner Grow |
| 6 | Inner Balance Result Card + Why | 9 | Result Pages → Inner Balance |

Total characters to update: ~3481

---

## Automation Mode: GUIDED (human-in-the-loop)

The apply script (vqb:dashboard-assisted-apply) operates in two modes:

### Mode A — Dry-Run (default, safe)
- Opens VQB dashboard in a visible browser
- Navigates to each screen
- Takes a screenshot of current state
- Logs all fields it can/cannot locate
- Does NOT fill any field
- Does NOT click Save, Publish, or Generate Key

### Mode B — Guided Apply (explicit flag: --apply)
- Opens VQB dashboard in a visible browser
- For each field, prints proposed value and asks: "Apply this field? [y/N]"
- Only fills fields with explicit y confirmation
- Pauses before any Save button click
- Requires explicit y to proceed with save
- Never auto-publishes

---

## Absolute Blocks (enforced in code)

- No auto-click of Save without human confirmation
- No click of Publish / Go Live / Activate
- No click of Generate Key / Reset API Key
- No edit of pricing, products, or discount codes in Shopify
- No changes to quiz routing logic or branching
- No deletion of any quiz, result page, or screen
- No printing of API keys or passwords

---

## Screen-by-Screen Plan

### Screen 1 — Email Capture

VQB location: Quiz Settings → Email Gate / Lead Capture Screen

| Field | Proposed Value |
|---|---|
| Headline | Unlock Your Personalized Result |
| Subhead | Your personalized result is ready — plus 10% off your first order. |
| Email placeholder | Your email address |
| CTA button | Reveal My Match → |
| Micro-copy | No spam. Unsubscribe anytime. |

---

### Screen 2 — Discount Code

VQB location: Quiz Settings → Discount Screen

| Field | Proposed Value |
|---|---|
| Headline | Your 10% Off Code Is Ready |
| Subhead | Continue to see your personalized wellness match. |
| Code | WELCOME10 |
| Instructions | Applied automatically at checkout · Valid for 48 hours |
| CTA button | See My Product Match ↓ |
| Micro-copy | No purchase required to see your result. |

---

### Screen 3 — Inner Bloom Result Card

VQB location: Result Pages → Inner Bloom

| Field | Proposed Value |
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
| Why This Match body | Your answers suggest your body may benefit from daily digestive support. Inner B... |
| Compliance tag | Results may vary. This is not medical advice. |

---

### Screen 4 — Inner Calm Result Card

VQB location: Result Pages → Inner Calm

| Field | Proposed Value |
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
| Why This Match body | Your answers suggest your evenings could use more intentional support. Inner Cal... |
| Compliance tag | Results may vary. This is not medical advice. |

---

### Screen 5 — Inner Grow Result Card

VQB location: Result Pages → Inner Grow

| Field | Proposed Value |
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
| Why This Match body | Your answers suggest your hair, skin, and nails may benefit from daily nutrition... |
| Compliance tag | Results may vary. This is not medical advice. |

---

### Screen 6 — Inner Balance Result Card

VQB location: Result Pages → Inner Balance

| Field | Proposed Value |
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
| Why This Match body | Your answers suggest a strong daily nutritional foundation may be your most impo... |
| Compliance tag | Results may vary. This is not medical advice. |

---

## Setup Required Before Apply

```bash
# 1. Install Playwright (if not already installed)
npm install playwright
npx playwright install chromium

# 2. Add to .env (do not commit):
# VQB_DASHBOARD_EMAIL=your-vqb-login-email
# VQB_DASHBOARD_PASSWORD=your-vqb-login-password
# VQB_DASHBOARD_URL=https://app.visualquizbuilder.com

# 3. Run dry-run first
npm run vqb:dashboard-dry-run

# 4. Review readiness report
# reports/vqb/dashboard-automation-readiness-report.md

# 5. Run guided apply (only when ready)
npm run vqb:dashboard-assisted-apply -- --apply
```

---

## Command Reference

| Command | Script | Safe to run now? |
|---|---|---|
| npm run vqb:dashboard-plan | generate-dashboard-plan.js | YES — no browser, no API |
| npm run vqb:dashboard-dry-run | vqb-dashboard-automation-dry-run.js | YES — no browser, no API |
| npm run vqb:dashboard-assisted-apply | vqb-dashboard-apply-assisted.js | YES in dry-run mode / requires setup for --apply |

---

## Fallback: Manual Copy-Paste

If browser automation is not possible or reliable, use the guided manual approach:
- config/vqb-result-copy-to-paste.md — one field per line, ready to paste
- config/vqb-live-implementation-copy.md — step-by-step dashboard instructions
- reports/vqb/manual-vqb-edit-checklist.md — completion checklist

This fallback requires no extra setup and is always available.

---

*READ-ONLY PLAN. No VQB or Shopify content has been modified.*
*Human approval required before any dashboard save or publish.*
