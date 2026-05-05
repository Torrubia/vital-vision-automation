/**
 * build-vqb-update-payload.js
 * Vital Vision — VQB Update Payload Builder
 *
 * READ-ONLY. Reads the approved copy packet and structures it into a
 * JSON update payload. Does NOT send to API.
 * Output: automations/drafts/vqb-api-update-draft.json
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Build Update Payload ===');
console.log('');

if (process.env.AUTO_PUBLISH === 'true')            { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }
if (process.env.VQB_API_MODE !== 'read_only')       { console.error('BLOCKED: VQB_API_MODE must be read_only'); process.exit(1); }

console.log('Safety gates: OK');
console.log('');

// ─── Compliance Check ─────────────────────────────────────────────────────────

const PROHIBITED = [
  'cure ', 'cures ', 'treat ', 'treatment', 'fix hair', 'fix stress',
  'heal ', 'prevent disease', 'diagnose', 'guaranteed results',
  'anxiety cure', 'insomnia cure', 'ibs treatment', 'stop hair loss',
  'reverse hair loss',
];
const DISCLAIMER_SAFE = ['not intended to diagnose, treat, cure, or prevent'];

function isSafe(text) {
  const lower = text.toLowerCase();
  return !PROHIBITED.some(p => {
    if (!lower.includes(p)) return false;
    const idx = lower.indexOf(p);
    const ctx = lower.substring(Math.max(0, idx - 60), idx + 80);
    return !DISCLAIMER_SAFE.some(s => ctx.includes(s));
  });
}

// ─── Approved Copy (sourced from CRO-approved packet) ─────────────────────────

const ORGANIC_ID = process.env.VQB_ORGANIC_QUIZ_ID;
const PAID_ID    = process.env.VQB_PAID_QUIZ_ID;

const DISCLAIMER_SHORT = 'This recommendation is for educational purposes only and is not medical advice. Results may vary.';
const DISCLAIMER_FULL  = 'This recommendation is for educational purposes only and is not medical advice. Results may vary. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before use.';

const payload = {
  _meta: {
    generatedAt: new Date().toISOString(),
    generatedBy: 'scripts/vqb/build-vqb-update-payload.js',
    sourcePacket: 'automations/drafts/vqb-safe-update-packet.md',
    safetyFlags: {
      autoPublish: false,
      requireHumanApproval: true,
      vqbApiMode: 'read_only',
      writesMade: 0,
      shopifyEdited: false,
      dryRunOnly: true,
    },
    status: 'DRY-RUN ONLY — not submitted to API',
    policyRef: 'config/vqb-api-write-policy.md',
    approvalRequired: 'automations/approved/ file required before any write',
  },

  emailCapture: {
    headline:     'Unlock Your Personalized Result',
    subhead:      'Your personalized result is ready — plus 10% off your first order.',
    placeholder:  'Your email address',
    ctaButton:    'Reveal My Match →',
    microCopy:    'No spam. Unsubscribe anytime.',
  },

  discountScreen: {
    headline:     'Your 10% Off Code Is Ready',
    subhead:      'Continue to see your personalized wellness match.',
    code:         'WELCOME10',
    instructions: 'Applied automatically at checkout · Valid for 48 hours',
    ctaButton:    'See My Product Match ↓',
    microCopy:    'No purchase required to see your result.',
  },

  resultCards: {
    globalLabel: 'Your Recommended Wellness Match',

    innerBloom: {
      quizAnswer:   'Digestion & Gut Wellness',
      headline:     'Your gut may be ready for daily support.',
      productName:  'Inner Bloom — Advanced Probiotic Formula',
      description:  'Formulated to support healthy digestion and daily gut balance as part of a consistent wellness routine. One simple ritual, every morning.',
      qtyLabel:     'Choose Your Starting Point',
      primaryCta:   'Shop This Match',
      secondaryCta: 'Why This Match?',
      disclaimer:   DISCLAIMER_SHORT,
      whyThisMatch: {
        headline: 'Why Inner Bloom?',
        body:     'Your answers suggest your body may benefit from daily digestive support. Inner Bloom is formulated with a targeted probiotic blend designed to support gut balance and overall digestive wellbeing — without harsh ingredients or complicated routines. Most customers make it part of their morning routine and commit to 60–90 days for their best results. Consistency is the key.',
        tag:      'Results may vary. This is not medical advice.',
      },
    },

    innerCalm: {
      quizAnswer:   'Stress & Calm',
      headline:     'Your evenings may deserve a calmer ritual.',
      productName:  'Inner Calm — Magnesium Glycinate',
      description:  'Formulated with magnesium glycinate to support a calm evening routine and overall wellness. A quiet daily ritual designed just for you.',
      qtyLabel:     'Choose Your Starting Point',
      primaryCta:   'Shop This Match',
      secondaryCta: 'Why This Match?',
      disclaimer:   DISCLAIMER_SHORT,
      whyThisMatch: {
        headline: 'Why Inner Calm?',
        body:     'Your answers suggest your evenings could use more intentional support. Inner Calm uses magnesium glycinate — a form of magnesium designed to support relaxation and overall calm as part of a consistent nightly routine. Magnesium is one of the most common nutritional gaps in modern diets — Inner Calm is designed to support that daily need. One small step each evening. Designed for how you actually live.',
        tag:      'Results may vary. This is not medical advice.',
      },
    },

    innerGrow: {
      quizAnswer:   'Hair, Skin & Nails',
      headline:     'Your glow may start from within.',
      productName:  'Inner Grow — Hair, Skin & Nails Support',
      description:  'Formulated to support healthy hair, skin, and nails from within as part of a consistent daily wellness routine. Nourishment that works with your body.',
      qtyLabel:     'Choose Your Starting Point',
      primaryCta:   'Shop This Match',
      secondaryCta: 'Why This Match?',
      disclaimer:   DISCLAIMER_SHORT,
      whyThisMatch: {
        headline: 'Why Inner Grow?',
        body:     'Your answers suggest your hair, skin, and nails may benefit from daily nutritional support from within. Inner Grow combines key nutrients designed to nourish the body from the inside out as part of a consistent daily wellness routine. Results may vary. Most customers commit to 60–90 days with consistent daily use.',
        tag:      'Results may vary. This is not medical advice.',
      },
    },

    innerBalance: {
      quizAnswer:   'Overall Daily Wellness',
      headline:     'Your body may be ready for a complete daily foundation.',
      productName:  'Inner Balance — Daily Complete Multivitamin',
      description:  'A complete daily multivitamin designed to support your overall wellness from within. One capsule. One ritual. Every day.',
      qtyLabel:     'Choose Your Starting Point',
      primaryCta:   'Shop This Match',
      secondaryCta: 'Why This Match?',
      disclaimer:   DISCLAIMER_SHORT,
      whyThisMatch: {
        headline: 'Why Inner Balance?',
        body:     'Your answers suggest a strong daily nutritional foundation may be your most important starting point right now. Inner Balance is a complete daily multivitamin designed to support overall wellness from within — covering the essentials in one simple daily capsule. Build from a place of strength.',
        tag:      'Results may vary. This is not medical advice.',
      },
    },
  },

  globalDisclaimer: DISCLAIMER_FULL,
};

// ─── Compliance Scan on Payload ───────────────────────────────────────────────

console.log('Running compliance scan on payload...');
const payloadStr  = JSON.stringify(payload);
const payloadSafe = isSafe(payloadStr);

if (!payloadSafe) {
  console.error('COMPLIANCE FAILED — prohibited language found in payload. Fix and retry.');
  process.exit(1);
}
console.log('  PASS — no prohibited language in payload');
console.log('');

// ─── Write Payload ────────────────────────────────────────────────────────────

const DRAFTS = path.join(BASE, 'automations', 'drafts');
fs.mkdirSync(DRAFTS, { recursive: true });

const outPath = path.join(DRAFTS, 'vqb-api-update-draft.json');
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));

console.log(`Payload written: automations/drafts/vqb-api-update-draft.json`);
console.log('');
console.log('This payload is DRY-RUN ONLY — it has not been sent to any API.');
console.log('Next: npm run vqb:dry-run-update');
