# VQB Dashboard Automation Risk Report — Vital Vision Shop
# Generated: 2026-05-05
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Summary

Browser-assisted dashboard automation is LOW-RISK for text field updates when the
guided human-in-the-loop mode is used. Key risks are UI change detection, selector
drift, and human error on Save confirmations. All risks are manageable.

---

## Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| VQB dashboard UI changes (CSS selectors break) | MEDIUM | LOW | Script reports "field not found" and falls back to manual paste |
| Script clicks Save without human seeing changes | LOW | MEDIUM | Every Save requires explicit terminal prompt "y" confirmation |
| Script clicks Publish accidentally | VERY LOW | HIGH | Publish button is never targeted — script only targets text fields |
| Script clicks Generate Key | VERY LOW | CRITICAL | Button is never targeted — explicitly excluded from selector list |
| Wrong field filled with wrong value | LOW | LOW | Human confirms each value before fill; screenshot taken before/after |
| Browser automation triggers VQB rate limit | LOW | LOW | SlowMo mode (80ms delay) + human pacing between screens |
| Login credentials exposed in terminal | VERY LOW | HIGH | Credentials never printed; only masked key previews if applicable |
| Connectivity lost mid-session | LOW | LOW | Each screen is independent; partial fills are visible to human |
| Wrong quiz edited (organic vs paid) | MEDIUM | MEDIUM | Human navigates to quiz manually; script does not auto-navigate quiz list |
| Changes break live quiz display | LOW | MEDIUM | Human tests preview before save; mobile check in checklist |

---

## Absolute Hard Blocks in Code

The following actions are hardcoded to NEVER execute in the apply script:

| Action | Code Status |
|---|---|
| Auto-click Save | BLOCKED — human must confirm with "y" in terminal |
| Auto-click Publish / Go Live | BLOCKED — button never targeted |
| Click Generate Key | BLOCKED — button never targeted |
| Fill discount code field | BLOCKED — explicitly skipped with warning |
| Edit Shopify products, pricing, or discounts | BLOCKED — no Shopify API calls |
| Run in headless mode (hidden browser) | BLOCKED — `headless: false` hardcoded |
| Write to VQB API | BLOCKED — no HTTP write calls in apply script |

---

## Risk: Selector Discovery Failure

**Likelihood: HIGH for some fields**

VQB uses a dynamic React/Vue/Angular SPA. CSS selectors are not guaranteed to be stable or guessable. The apply script tries multiple fallback selectors per field.

If a field is not found:
- Script logs "NOT FOUND — Manual paste required"
- Script continues to next field (does not abort)
- Human pastes value manually from `config/vqb-result-copy-to-paste.md`

**This is the most likely failure mode and it is safe.** An unfilled field is visible to the human and can be handled manually. No data is corrupted.

---

## Risk: Browser Authentication

If VQB implements:
- CAPTCHA on login → Script will pause and human solves it manually
- MFA / 2FA → Script will pause; human enters code in browser window
- SSO / OAuth → Login flow may not be automatable; human logs in manually

In all cases, the browser is visible and the human can take over at any point.

---

## Risk: Observe Mode vs Apply Mode

| Mode | Risk Level | What Happens |
|---|---|---|
| Observe (default) | MINIMAL | Browser opens, no fields filled, screenshots taken, browser closes |
| Apply (--apply flag) | LOW | Each field fill requires explicit human confirmation |

Running without `--apply` is always safe — it never modifies anything.

---

## Fallback Chain (in order of preference)

1. **Browser automation — guided apply** (`npm run vqb:dashboard-assisted-apply -- --apply`)
   - Best: automated fills, human approval, screenshots
   - Requires: Playwright + dashboard credentials

2. **Manual copy-paste with checklist** (`config/vqb-result-copy-to-paste.md`)
   - Good: fully human-controlled, zero tech risk
   - Requires: VQB dashboard login only

3. **VQB dashboard manual edit** (`config/vqb-live-implementation-copy.md`)
   - Always available: step-by-step instructions with field locations
   - Requires: VQB dashboard login only

---

## QA Required After Any Apply

Regardless of automation method:

1. Preview all 6 screens in VQB quiz preview mode
2. Complete full quiz flow on mobile at 375px
3. Verify no prohibited language on any screen
4. Verify disclaimer present on all 4 result cards
5. Verify CTAs link to correct Shopify product pages
6. Complete `reports/vqb/manual-vqb-edit-checklist.md`
7. Human sign-off before publishing

---

## Screenshots

The apply script automatically takes screenshots at:
- Before each screen (current state)
- While on each screen (selector state)
- After each screen (filled state)

Saved to: `reports/vqb/screenshots/` (gitignored)

---

*No VQB or Shopify content was modified by producing this report.*
*Risk report maintained by Automation Ops Agent.*
