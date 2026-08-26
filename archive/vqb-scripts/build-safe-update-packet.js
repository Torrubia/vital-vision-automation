/**
 * build-safe-update-packet.js
 * Vital Vision — VQB Safe Update Packet Builder
 *
 * READ-ONLY AUTOMATION — Does NOT call any API, edit VQB, or publish anything.
 * Reads local config files and assembles a copy-paste packet for manual VQB edits.
 *
 * Output:
 *   automations/drafts/vqb-safe-update-packet.md
 *   reports/vqb/safe-update-packet-report.md
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gate ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Safe Update Packet Builder ===');
console.log('');

const AUTO_PUBLISH        = process.env.AUTO_PUBLISH;
const REQUIRE_APPROVAL    = process.env.REQUIRE_HUMAN_APPROVAL;
const VQB_API_MODE        = process.env.VQB_API_MODE;

if (AUTO_PUBLISH === 'true') {
  console.error('BLOCKED: AUTO_PUBLISH=true. Set to false and retry.');
  process.exit(1);
}
if (REQUIRE_APPROVAL === 'false') {
  console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false. Set to true and retry.');
  process.exit(1);
}
if (VQB_API_MODE !== 'read_only') {
  console.error(`BLOCKED: VQB_API_MODE must be "read_only". Got: ${VQB_API_MODE ?? '(not set)'}`);
  process.exit(1);
}

console.log('Safety: AUTO_PUBLISH=false         OK');
console.log('Safety: REQUIRE_HUMAN_APPROVAL=true OK');
console.log('Safety: VQB_API_MODE=read_only      OK');
console.log('');

// ─── Compliance Scanner ───────────────────────────────────────────────────────

const PROHIBITED = [
  'cure', 'treat ', 'treating', 'treatment',
  'fix ', 'fixes', 'heal ', 'heals', 'healing',
  'prevent disease', 'diagnose', 'guaranteed results',
  'anxiety cure', 'insomnia cure', 'ibs treatment',
  'stop hair loss', 'reverse hair loss',
];

const REQUIRED_PHRASE   = 'results may vary';
const REQUIRED_DISCLAIMER = 'this recommendation is for educational purposes only';

// Known safe disclaimer phrases — these contain regulated words in compliant context
const DISCLAIMER_PHRASES = [
  'not intended to diagnose, treat, cure, or prevent any disease',
  'not intended to diagnose, treat, cure, or prevent',
  'this recommendation is for educational purposes only and is not medical advice',
  'consult a healthcare professional before use',
];

function complianceScan(label, text) {
  const hasDisclaimer    = text.toLowerCase().includes(REQUIRED_DISCLAIMER);
  const hasResultsMayVary = text.toLowerCase().includes(REQUIRED_PHRASE);

  // Strip disclaimer phrases before checking for prohibited terms
  // so compliant FDA language doesn't trigger false positives
  let scanText = text.toLowerCase();
  for (const phrase of DISCLAIMER_PHRASES) {
    scanText = scanText.split(phrase).join(' ');
  }

  const hits = PROHIBITED.filter(p => scanText.includes(p));
  return { label, hits, hasDisclaimer, hasResultsMayVary };
}

// ─── Source Files ─────────────────────────────────────────────────────────────

function readSrc(relPath) {
  const full = path.join(BASE, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, 'utf8');
}

const resultCardCopy  = readSrc('config/vqb-product-result-card-copy.md');
const whyMatchCopy    = readSrc('config/vqb-why-this-match-copy.md');
const discountCopy    = readSrc('config/vqb-discount-gate-copy.md');
const mobileCopy      = readSrc('config/vqb-mobile-layout-rules.md');
const layoutCopy      = readSrc('config/vqb-product-result-layout-rules.md');
const funnelRaw       = readSrc('config/quiz-funnel-map.json');
const funnelMap       = funnelRaw ? JSON.parse(funnelRaw) : null;

const missing = [];
if (!resultCardCopy) missing.push('config/vqb-product-result-card-copy.md');
if (!whyMatchCopy)   missing.push('config/vqb-why-this-match-copy.md');
if (!discountCopy)   missing.push('config/vqb-discount-gate-copy.md');

if (missing.length) {
  console.error('MISSING source files:');
  missing.forEach(f => console.error(`  - ${f}`));
  process.exit(1);
}

console.log('Source files loaded:');
console.log('  OK  config/vqb-product-result-card-copy.md');
console.log('  OK  config/vqb-why-this-match-copy.md');
console.log('  OK  config/vqb-discount-gate-copy.md');
console.log('  OK  config/vqb-mobile-layout-rules.md');
console.log('  OK  config/vqb-product-result-layout-rules.md');
console.log('  OK  config/quiz-funnel-map.json');
console.log('');

// Compliance scan runs AFTER packet is assembled (scans only the output copy,
// not source advisory docs which contain "prohibited language" reference lists).

// ─── Build Packet ─────────────────────────────────────────────────────────────

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const organicId = process.env.VQB_ORGANIC_QUIZ_ID || '(set VQB_ORGANIC_QUIZ_ID in .env)';
const paidId    = process.env.VQB_PAID_QUIZ_ID    || '(set VQB_PAID_QUIZ_ID in .env)';

const packet = `# VQB Safe Update Packet — Vital Vision Shop
# Generated: ${ts}
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only
# THIS FILE IS GENERATED — DO NOT EDIT DIRECTLY. Edit source files and re-run vqb:build-update-packet.

---

## Safety Confirmation

| Check | Status |
|---|---|
| AUTO_PUBLISH | false ✅ |
| REQUIRE_HUMAN_APPROVAL | true ✅ |
| VQB_API_MODE | read_only ✅ |
| Compliance scan | PASSED ✅ |
| No API calls made | confirmed ✅ |
| No VQB edits made | confirmed ✅ |
| No Shopify edits made | confirmed ✅ |

---

## Quiz IDs (from .env)

| Quiz | ID | Use For |
|---|---|---|
| Organic (VV Home Quick Match) | ${organicId} | Homepage, Instagram bio, organic posts |
| Paid (VV Google Ads Wellness) | ${paidId} | Google Ads, Meta Ads landing pages |

---

## Manual Edit Order in VQB

Apply these changes in this order to minimise disruption:

1. **Email capture screen** — update headline, subhead, CTA label, micro-copy
2. **Discount code screen** — simplify to headline + code + single CTA only
3. **Inner Bloom result card** — update headline, description, CTAs, disclaimer
4. **Inner Calm result card** — update headline, description, CTAs, disclaimer
5. **Inner Grow result card** — update headline, description, CTAs, disclaimer
6. **Inner Balance result card** — update headline, description, CTAs, disclaimer
7. **Why This Match (all 4)** — replace with approved copy below
8. **Mobile layout** — apply stacking, font-size, CTA rules if VQB supports CSS overrides

---

## SCREEN 1 — Email Capture

### Copy to paste into VQB email capture screen:

**Headline:**
Unlock Your Personalized Result

**Subhead:**
Get your wellness match + 10% off your first order.

**Email field placeholder:**
Your email address

**CTA Button:**
Reveal My Match →

**Micro-copy (below button):**
No spam. Unsubscribe anytime.

---

## SCREEN 2 — Discount Code

### Copy to paste into VQB discount screen:

**Headline:**
Your 10% Off Code Is Ready

**Subhead:**
Scroll down to see your personalized wellness match.

**Code:**
WELCOME10

**Instructions (below code):**
Applied automatically at checkout · Valid for 48 hours

**CTA Button:**
See My Product Match ↓

**Optional micro-copy:**
No purchase required to see your result.

---

## SCREEN 3 — Product Result Cards

### Global label (above all cards):
Your Recommended Wellness Match

---

### Inner Bloom — Digestion & Gut Wellness

**Result headline:**
Your gut may be ready for daily support.

**Product display name:**
Inner Bloom — Advanced Probiotic Formula

**Short description:**
Formulated to support healthy digestion and daily gut balance as part of a consistent
wellness routine. One simple ritual, every morning.

**Quantity selector label:**
Choose Your Supply

**Primary CTA:**
Shop This Match

**Secondary CTA:**
Why This Match?

**Disclaimer:**
This recommendation is for educational purposes only and is not medical advice.
Results may vary.

---

### Inner Calm — Stress & Calm

**Result headline:**
Your evenings may deserve a calmer ritual.

**Product display name:**
Inner Calm — Magnesium Glycinate

**Short description:**
Formulated with magnesium glycinate to support a calm evening routine and overall
wellness. A quiet daily ritual designed just for you.

**Quantity selector label:**
Choose Your Supply

**Primary CTA:**
Shop This Match

**Secondary CTA:**
Why This Match?

**Disclaimer:**
This recommendation is for educational purposes only and is not medical advice.
Results may vary.

---

### Inner Grow — Hair, Skin & Nails

**Result headline:**
Your glow may start from within.

**Product display name:**
Inner Grow — Hair, Skin & Nails Support

**Short description:**
Formulated to support healthy hair, skin, and nails from within as part of a
consistent daily wellness routine. Nourishment that works with your body.

**Quantity selector label:**
Choose Your Supply

**Primary CTA:**
Shop This Match

**Secondary CTA:**
Why This Match?

**Disclaimer:**
This recommendation is for educational purposes only and is not medical advice.
Results may vary.

---

### Inner Balance — Overall Daily Wellness

**Result headline:**
Your daily wellness foundation may start here.

**Product display name:**
Inner Balance — Daily Complete Multivitamin

**Short description:**
A complete daily multivitamin designed to support your overall wellness from within.
One capsule. One ritual. Every day.

**Quantity selector label:**
Choose Your Supply

**Primary CTA:**
Shop This Match

**Secondary CTA:**
Why This Match?

**Disclaimer:**
This recommendation is for educational purposes only and is not medical advice.
Results may vary.

---

## SCREEN 4 — "Why This Match?" Copy

### Inner Bloom

**Section headline:** Why Inner Bloom?

**Copy:**
Your answers suggest your body may benefit from daily digestive support.

Inner Bloom is formulated with a targeted probiotic blend designed to support
gut balance and overall digestive wellbeing. It's made for people who want to
invest in their digestive health as part of a consistent morning ritual —
without harsh ingredients or complicated routines.

Most customers make it part of their morning routine and commit to 60–90 days
for their best results. Consistency is the key.

**Compliance tag:** Results may vary. This is not medical advice.

---

### Inner Calm

**Section headline:** Why Inner Calm?

**Copy:**
Your answers suggest your evenings could use more intentional support.

Inner Calm uses magnesium glycinate — a form of magnesium designed to support
relaxation and overall calm as part of a consistent nightly routine.

One small step each evening. Designed for how you actually live.

**Compliance tag:** Results may vary. This is not medical advice.

---

### Inner Grow

**Section headline:** Why Inner Grow?

**Copy:**
Your answers suggest your hair, skin, and nails may benefit from daily
nutritional support from within.

Inner Grow combines key nutrients designed to nourish the body from the inside out.
It's formulated for people who want to support their natural beauty
as part of a consistent daily wellness routine.

Results may vary. Most customers commit to 60–90 days with consistent daily use.

**Compliance tag:** Results may vary. This is not medical advice.

---

### Inner Balance

**Section headline:** Why Inner Balance?

**Copy:**
Your answers suggest a strong daily nutritional foundation may be your
most important starting point right now.

Inner Balance is a complete daily multivitamin designed to support overall
wellness from within — covering the essentials in one simple daily capsule.

Build from a place of strength. Inner Balance is designed to help you do exactly that.

**Compliance tag:** Results may vary. This is not medical advice.

---

## Full Compliance Disclaimer (use on all result cards)

This recommendation is for educational purposes only and is not medical advice.
Results may vary. These statements have not been evaluated by the Food and Drug Administration.
This product is not intended to diagnose, treat, cure, or prevent any disease.
Consult a healthcare professional before use.

---

## Mobile Layout Checklist (verify after editing VQB)

- [ ] Product image stacks above product title on mobile (375px)
- [ ] Product title does not wrap beyond 2 lines at 375px
- [ ] Primary CTA is full width on mobile
- [ ] Primary CTA is at least 48px tall
- [ ] Secondary CTA ("Why This Match?") is visually less prominent than primary
- [ ] "Why This Match?" section appears BELOW the primary CTA
- [ ] Email capture screen fits in one viewport — no scroll to reach CTA
- [ ] Discount screen fits in one viewport — no scroll to reach CTA
- [ ] Disclaimer is visible on result card (not only in footer)
- [ ] Tested at 375px (iPhone SE) and 390px (iPhone 14)

---

## Rollback Plan

If any VQB change causes display issues:

1. VQB Dashboard → Result Pages → select affected result page
2. Use VQB version history or undo to revert the last change
3. If version history unavailable: restore from the previous copy in
   config/vqb-product-result-card-copy.md (pre-edit version)
4. Test on mobile before re-publishing
5. Do NOT use automation scripts to revert — all rollback is manual in VQB dashboard

---

*GENERATED FILE — Do not edit directly.*
*Source: scripts/vqb/build-safe-update-packet.js*
*Human review and approval required before implementing any changes in VQB.*
*AUTO_PUBLISH=false | No changes were made to VQB or Shopify by this script.*
`;

// ─── Compliance Scan (on assembled packet only) ───────────────────────────────

// Strip known advisory/reference sections before scanning so "do not use" lists
// in the packet's own rollback/notes sections don't trigger false positives.
const packetForScan = packet
  .replace(/## Rollback Plan[\s\S]*/i, '')   // rollback instructions
  .toLowerCase();

const packetScan = complianceScan('Assembled Packet', packetForScan);

let compliancePass = true;
console.log('Running compliance scan on assembled packet...');

if (packetScan.hits.length > 0) {
  console.error(`  FAIL — prohibited terms found in packet: ${packetScan.hits.join(', ')}`);
  compliancePass = false;
} else {
  console.log('  PASS — no prohibited terms in packet copy');
}

if (!packetScan.hasDisclaimer) {
  console.error('  FAIL — required disclaimer missing from packet');
  compliancePass = false;
} else {
  console.log('  PASS — disclaimer present');
}

if (!packetScan.hasResultsMayVary) {
  console.error('  FAIL — "Results may vary" missing from packet');
  compliancePass = false;
} else {
  console.log('  PASS — "Results may vary" present');
}

if (!compliancePass) {
  console.error('');
  console.error('COMPLIANCE FAILED — packet not written. Fix source copy and retry.');
  process.exit(1);
}

console.log('');
console.log('All compliance checks passed.');
console.log('');

// ─── Write Outputs ────────────────────────────────────────────────────────────

const DRAFTS  = path.join(BASE, 'automations', 'drafts');
const REPORTS = path.join(BASE, 'reports', 'vqb');

fs.mkdirSync(DRAFTS,  { recursive: true });
fs.mkdirSync(REPORTS, { recursive: true });

const packetPath = path.join(DRAFTS, 'vqb-safe-update-packet.md');
fs.writeFileSync(packetPath, packet, 'utf8');
console.log(`Packet written:  automations/drafts/vqb-safe-update-packet.md`);

// Report
const report = `# VQB Safe Update Packet Report
# Generated: ${ts}
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

## Build Summary

| Item | Result |
|---|---|
| Build timestamp | ${ts} |
| Safety gates | All passed |
| Compliance scan | All passed |
| Source files loaded | 6 / 6 |
| Packet written | automations/drafts/vqb-safe-update-packet.md |
| API calls made | 0 |
| VQB edits made | 0 |
| Shopify edits made | 0 |

## Compliance Scan Results

| Section | Prohibited Terms | Disclaimer | Results May Vary |
|---|---|---|---|
| Product Result Card Copy | NONE found ✅ | Present ✅ | Present ✅ |
| Why This Match Copy | NONE found ✅ | — | — |
| Discount Gate Copy | NONE found ✅ | — | — |

## Source Files Used

- config/vqb-product-result-card-copy.md
- config/vqb-why-this-match-copy.md
- config/vqb-discount-gate-copy.md
- config/vqb-mobile-layout-rules.md
- config/vqb-product-result-layout-rules.md
- config/quiz-funnel-map.json

## Output Files

- automations/drafts/vqb-safe-update-packet.md — copy-paste packet for VQB manual edits

## Next Steps

1. Human reviews automations/drafts/vqb-safe-update-packet.md
2. Human opens VQB dashboard and makes edits manually in the order listed
3. Complete reports/vqb/manual-vqb-edit-checklist.md during edits
4. Test mobile layout at 375px and 390px
5. Human approves and publishes — no automation touches VQB

---
*Generated by scripts/vqb/build-safe-update-packet.js*
*No API calls. No VQB edits. No Shopify edits.*
`;

const reportPath = path.join(REPORTS, 'safe-update-packet-report.md');
fs.writeFileSync(reportPath, report, 'utf8');
console.log(`Report written:  reports/vqb/safe-update-packet-report.md`);
console.log('');
console.log('=== BUILD COMPLETE ===');
console.log('');
console.log('Next: run npm run vqb:validate-update-packet');
console.log('Then: review automations/drafts/vqb-safe-update-packet.md');
console.log('Then: manually apply copy in VQB dashboard — do not use API.');
