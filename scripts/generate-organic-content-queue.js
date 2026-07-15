/**
 * generate-organic-content-queue.js
 * Vital Vision — Organic Content Queue Generator (MVP)
 *
 * Reads the first 3 usable rows from "Competitors" tab (AI Status = Analyzed).
 * Generates 3 asset rows per competitor = 9 total rows:
 *   1. AI UGC short-form vertical video  — TikTok + IG Reels + FB Reels (9:16)
 *   2. Educational carousel              — Instagram + Facebook feed (4:5)
 *   3. Story CTA asset                   — Instagram + Facebook Stories (9:16)
 *
 * SAFETY RULES:
 *   - Reads from:  Competitors tab only
 *   - Writes to:   Organic Content Queue tab only
 *   - NEVER modifies: Competitors, Reverse Engineering Checklist, Sheet2
 *   - NEVER deletes, clears, or reorders existing rows
 *   - DRY-RUN by default — pass --write to commit changes
 *
 * AI UGC COMPLIANCE RULES (hardcoded):
 *   - No fake testimonials
 *   - No implied personal product use ("I tried this and it fixed…")
 *   - No invented customer results
 *   - Creator-style educational language only
 *   - Safe phrases: "may support", "helps support", "designed to support",
 *     "daily wellness routine", "self-care ritual"
 *   - Banned: cure, treat, heal, fix, guaranteed, before/after,
 *     disease claims, medical claims, fake personal experience, fake review
 *
 * USAGE:
 *   Dry-run:    node scripts/generate-organic-content-queue.js
 *   Write mode: node scripts/generate-organic-content-queue.js --write
 */

'use strict';

require('dotenv').config();
const path = require('path');

// ── Safety guard ──────────────────────────────────────────────────────────────
let google;
try {
  ({ google } = require('googleapis'));
} catch {
  console.error('ERROR: "googleapis" not installed. Run: npm install googleapis');
  process.exit(1);
}

// ── Config ────────────────────────────────────────────────────────────────────

const IS_DRY_RUN    = !process.argv.includes('--write');
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const KEY_PATH       = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;

const SOURCE_TAB   = 'Competitors';
const TARGET_TAB   = 'Organic Content Queue';
const MVP_LIMIT    = 3;           // competitors
const ASSETS_EACH  = 3;          // rows per competitor
const BATCH_PREFIX = 'OCQ-2026';

const PROTECTED_TABS = [SOURCE_TAB, 'Reverse Engineering Checklist', 'Sheet2'];

// 23-column header row — exact order
const TARGET_HEADERS = [
  'Batch ID',
  'Source Competitor',
  'Platform Group',
  'Placement',
  'Product',
  'Content Type',
  'Funnel Stage',
  'UGC Format',
  'Creator Persona',
  'Hook',
  'Angle',
  'Script / Caption Draft',
  'On-Screen Text',
  'Shot List',
  'Nano Banana Prompt',
  'Canva/Cover Prompt',
  'Visual Direction',
  'CTA',
  'Compliance Note',
  'Disclosure Note',
  'Asset Status',
  'Post Status',
  'Metric To Watch',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildHeaderMap(row) {
  const map = {};
  row.forEach((cell, idx) => {
    const name = String(cell).trim();
    if (name) map[name] = idx;
  });
  return map;
}

function rowToObject(row, headerMap) {
  const obj = {};
  Object.entries(headerMap).forEach(([name, idx]) => {
    obj[name] = (row[idx] !== undefined ? String(row[idx]) : '').trim();
  });
  return obj;
}

function batchId(n) {
  return `${BATCH_PREFIX}-${String(n).padStart(3, '0')}`;
}

// ── Content strategy data ─────────────────────────────────────────────────────
//
// Three asset types per competitor. All content is rule-based — no external AI
// API called. Compliance rules are hardcoded. All UGC scripts are educational
// only; no personal results, no fake testimonials, no medical claims.

const CONTENT_PLAN = {

  // ── RITUAL → Inner Balance ──────────────────────────────────────────────────
  Ritual: {
    product: 'Inner Balance',

    ugcVideo: {
      platformGroup:  'Instagram Reels + Facebook Reels',
      placement:      'Instagram Reels + Facebook Reels (9:16)',
      contentType:    'AI UGC Short-Form Video',
      funnelStage:    'TOFU (Awareness)',
      ugcFormat:      'Creator-style talking head (AI avatar)',
      creatorPersona: 'Curious everyday wellness explorer, early 30s, warm and relatable — not a doctor or influencer. Researches what goes into a daily supplement routine.',
      hook:           "Nobody talks about what's actually IN a daily multivitamin. Let me break it down.",
      angle:          "Ingredient transparency + educational curiosity. Inspired by Ritual's science-led trust building. Creator asks the right questions without making claims — adapted for Inner Balance.",
      script: `[0–3s] HOOK (on screen + creator talking head)
"Nobody talks about what's actually in your daily multivitamin. So let me break it down."

[3–12s] EDUCATIONAL SEGMENT
"Most people take a vitamin every day without knowing what's inside — or why. The question worth asking isn't 'does this work?' It's: 'What is this, where does it come from, and does it belong in my routine?'"

[12–20s] PRODUCT CONTEXT (soft, educational — no claims)
"Inner Balance is formulated with ingredients that are transparent and thoughtfully sourced — designed to support your daily wellness routine. Not a cure. Not a fix. Just a foundation worth understanding."

[20–24s] CTA
"If you're curious about what goes into your supplements, link in bio."

──
CAPTION:
Your daily vitamin deserves this question. 🌿 What's actually in it?

#InnerBalance #WellnessEducation #DailyRoutine #SupplementEducation #VitalVision`,
      onScreenText:   `Hook (0–3s): "Nobody talks about what's in your vitamin."\nMid (12s): "Transparent. Thoughtfully sourced. Designed to support your daily wellness routine."\nEnd: "Explore Inner Balance → link in bio"`,
      shotList:       `Shot 1 — Creator talking head, clean neutral background (cream or warm white), casual wellness setting. Good even lighting.\nShot 2 — Close-up of Inner Balance bottle label, clearly readable.\nShot 3 — Simple text animation on cream background: 3 ingredient names listed (no claims).\nShot 4 — Creator back on screen, soft expression, CTA delivery.`,
      nananaBanana:   `Generate a 24-second AI UGC talking-head video for Inner Balance (daily multivitamin).\n\nCreator persona: curious everyday wellness researcher, early 30s, approachable, conversational — NOT a medical professional or influencer.\n\nStructure:\n- Hook (0–3s): "Nobody talks about what's actually in your multivitamin. Let me break it down."\n- Middle (3–20s): Educational ingredient-transparency framing. No health claims. No outcome promises. No personal results.\n- CTA (20–24s): "Curious? Link in bio."\n\nCompliance rules (hardcoded — do not break):\n- No cure, treat, heal, fix, or disease language\n- No before/after framing\n- No fake personal results ("I tried this and...")\n- Safe phrases only: "designed to support," "daily wellness routine," "thoughtfully sourced"\n\nFormat: 9:16 vertical. Tone: warm, curious, educational — not salesy.`,
      canvaPrompt:    `TikTok/Reel thumbnail (9:16). Creator face with curious expression, warm neutral background (cream or off-white). Bold white text overlay at top: "What's actually IN your vitamin?" Inner Balance product bottle partially visible in bottom corner. Clean, non-clinical aesthetic. No medical imagery.`,
      visualDirection:`Creator: natural lighting, cream or warm white wall background, casual wellness setting — not a gym, not a lab, not a doctor's office. Minimal props. Product bottle visible briefly but not center-frame initially. Warm, approachable energy throughout. No lab coats, stethoscopes, or clinical imagery. No before/after comparisons.`,
      cta:            'Explore Inner Balance → link in bio',
      compliance:     'No outcome claims. No cure/treatment/disease language. Creator does not claim medical expertise. No personal results implied. Educational framing only. Safe phrases: "designed to support," "daily wellness routine," "thoughtfully sourced." FTC/FDA structure-function compliant.',
      disclosure:     'Add "#Ad" or "Paid partnership with @VitalVisionShop" if creator is compensated. Required FTC disclosure for AI-generated content: include "AI-generated" label on or adjacent to the video. No personal testimonial is implied — script is educational only.',
      metric:         'View-through rate (VTR), Save rate, Profile visits from Reel',
    },

    carousel: {
      platformGroup:  'Meta',
      placement:      'Instagram Feed + Facebook Feed (4:5)',
      contentType:    'Educational Carousel',
      funnelStage:    'TOFU (Awareness)',
      ugcFormat:      'Brand-educational (no creator needed)',
      creatorPersona: 'N/A — Brand voice',
      hook:           "What's actually in your daily vitamin? Most people have no idea.",
      angle:          "Ingredient transparency storytelling. 5-slide carousel breaking down what to look for in a multivitamin — no outcome claims, no treatment language.",
      script: `CAPTION:
Your wellness routine deserves to know what it's built on.

Inner Balance is thoughtfully formulated with ingredients you can feel confident about — designed to support your daily wellness, not to overwhelm you with promises.

Swipe to see what ingredient transparency actually looks like. 🌿

#InnerBalance #WellnessEducation #DailyVitamin #SupplementTransparency #VitalVision`,
      onScreenText:   `Slide 1: "What's actually in your vitamin?"\nSlide 2: "Start with this question: Where do these ingredients come from?"\nSlide 3: Ingredient name spotlight (no claims) — e.g., "Magnesium — why it's in this formula."\nSlide 4: Ingredient name spotlight #2\nSlide 5: "Inner Balance — designed to support your daily wellness routine." + CTA`,
      shotList:       `5 slides (Canva design, no photography required):\nSlide 1 — Cover: headline + product bottle edge visible\nSlide 2 — Concept tile: sourcing question\nSlides 3–4 — Ingredient spotlight tiles (text + botanical icon)\nSlide 5 — Product bottle full + CTA text`,
      nananaBanana:   `Create a 5-slide educational carousel for Instagram + Facebook (4:5 ratio).\n\nTopic: ingredient transparency in daily multivitamins.\n\nSlide structure:\n- Slide 1 (cover): Hook — "What's actually in your vitamin?"\n- Slides 2–4: One concept per slide — sourcing, formulation philosophy, what questions to ask. No health claims. No outcome promises.\n- Slide 5: Inner Balance product + soft CTA — "Explore Inner Balance."\n\nTone: premium, warm, educational.\nSafe language only: "designed to support," "thoughtfully formulated," "feel confident about."\nNo cure/treatment/disease language. No before/after.`,
      canvaPrompt:    `4:5 carousel cover slide. Warm cream or off-white background. Bold serif headline: "What's actually in your vitamin?" Small botanical line-art accent in lower corner. Inner Balance bottle bottom edge barely visible. Clean, premium, minimal aesthetic. No clinical imagery.`,
      visualDirection:`Design system: warm cream/off-white base. Muted sage green or dusty rose accent color. Serif headline font. Clean sans-serif body text. Botanical line illustrations as supporting graphics (no real photography needed). No clinical imagery. No before/after. Product bottle appears on final slide only.`,
      cta:            'Explore Inner Balance → link in bio',
      compliance:     'No outcome claims. No cure/treatment/disease language. Safe phrases: "designed to support," "thoughtfully formulated," "feel confident about," "daily wellness routine." FTC/FDA structure-function compliant.',
      disclosure:     'Brand content — no creator disclosure required. Ensure any ingredient references are structure/function framing only, not disease-prevention claims.',
      metric:         'Carousel completion rate, Saves, Link-in-bio clicks',
    },

    storyCTA: {
      platformGroup:  'Meta',
      placement:      'Instagram Stories + Facebook Stories (9:16)',
      contentType:    'Story CTA Asset',
      funnelStage:    'BOFU (Conversion)',
      ugcFormat:      'Brand-designed story frame',
      creatorPersona: 'N/A — Brand voice',
      hook:           "Curious what's actually in Inner Balance?",
      angle:          'Direct product discovery CTA. Warm, no pressure. Transparency-led. Link-tap focused.',
      script: `STORY FRAME TEXT:
Curious what's actually in Inner Balance?

Thoughtfully sourced ingredients.
Designed to support your daily routine.
No filler claims — just transparency.

👆 Tap to explore.`,
      onScreenText:   `Line 1: "Curious what's in Inner Balance?"\nLine 2: "Thoughtfully sourced. Designed to support your daily routine."\nCTA sticker: "Tap to explore →"`,
      shotList:       `Single 9:16 story frame (Canva design):\n- Full-bleed warm cream or botanical background\n- Inner Balance bottle centered, slight 3D angle\n- Text overlay per script above\n- Link sticker at bottom`,
      nananaBanana:   `Design a single 9:16 story frame for Instagram and Facebook Stories — Inner Balance.\n\nLayout:\n- Full-bleed warm cream background\n- Inner Balance bottle centered (slight 3D angle, soft drop shadow)\n- Top: headline "Curious what's in Inner Balance?"\n- Mid: "Thoughtfully sourced. Designed to support your daily routine."\n- Bottom: link sticker "Tap to explore →"\n\nTone: clean, premium, warm. No clinical imagery. No before/after.`,
      canvaPrompt:    `9:16 story frame. Full-bleed warm cream background. Inner Balance bottle centered with soft drop shadow. Bold but compact serif headline at top. 2-line subtext mid-frame (small, clean). Link sticker / CTA at bottom. Brand palette: warm neutrals. No medical imagery.`,
      visualDirection:`Full-bleed warm cream background. Product bottle centered, slight angle for depth. Optional very subtle botanical texture in background. No harsh colors. No before/after. No medical symbols. Warm, calm, inviting. Minimal copy — let the product be the hero.`,
      cta:            'Tap to explore Inner Balance →',
      compliance:     'No outcome claims. CTA is discovery-only ("explore"). Safe phrases: "designed to support," "thoughtfully sourced," "daily routine." FTC/FDA compliant.',
      disclosure:     'Brand content — no creator disclosure required. Ensure the link destination (product/landing page) is also compliance-reviewed before going live.',
      metric:         'Story tap-through rate (TTR), Link clicks, Swipe-up rate',
    },
  },

  // ── SEED → Inner Bloom ──────────────────────────────────────────────────────
  Seed: {
    product: 'Inner Bloom',

    ugcVideo: {
      platformGroup:  'Instagram Reels + Facebook Reels',
      placement:      'Instagram Reels + Facebook Reels (9:16)',
      contentType:    'AI UGC Short-Form Video',
      funnelStage:    'TOFU (Awareness)',
      ugcFormat:      'Creator-style talking head (AI avatar)',
      creatorPersona: 'Wellness-curious everyday person, late 20s–early 30s. Interested in gut wellness education but not a medical professional. Research-framing voice. Warm, conversational.',
      hook:           "I had no idea what 'gut support' actually meant — so I started researching. Here's what I found.",
      angle:          "Microbiome education through curiosity framing. Not personal results. Research voice only. Inspired by Seed's knowledge-leader positioning — adapted for Inner Bloom.",
      script: `[0–3s] HOOK
"I had no idea what 'gut support' actually meant — so I started researching. Here's what I found."

[3–14s] EDUCATIONAL SEGMENT
"The gut wellness space is honestly full of big claims and confusing language. When you strip it back, the real question is: what are you actually putting in your body, and why was it formulated that way?

Probiotic supplements vary a lot — and understanding what strains are included and how they're formulated is a more useful starting point than any promise on the label."

[14–22s] PRODUCT CONTEXT (educational — no claims)
"Inner Bloom is formulated to support your daily gut wellness routine. No dramatic promises — just ingredients designed with intention and transparency. If you're exploring probiotic support, it's worth understanding what's actually in what you're considering."

[22–26s] CTA
"Link in bio if you want to dig into the details."

──
CAPTION:
Gut wellness shouldn't be confusing. 🌸 Let's break it down.

#InnerBloom #GutWellness #ProbioticEducation #DailyWellness #VitalVision`,
      onScreenText:   `Hook (0–3s): "What does 'gut support' actually mean?"\nMid (14s): "Not all probiotics are the same."\nProduct intro: "Inner Bloom — designed to support your daily gut wellness routine."\nEnd: "Dig into the details → link in bio"`,
      shotList:       `Shot 1 — Creator talking head, warm neutral background (sage, warm beige, or off-white). Natural lighting.\nShot 2 — Close-up of Inner Bloom label, clearly readable.\nShot 3 — Text animation: "What to look for in a probiotic supplement." (3 bullet questions, no claims).\nShot 4 — Creator back on screen, CTA delivery.`,
      nananaBanana:   `Generate a 26-second AI UGC educational talking-head video for Inner Bloom (probiotic supplement).\n\nCreator persona: curious everyday wellness researcher, late 20s, warm and conversational — NOT a medical professional. Uses research framing, not personal health experience.\n\nStructure:\n- Hook (0–3s): "I had no idea what gut support actually meant — so I started researching. Here's what I found."\n- Middle (3–22s): Educational microbiome curiosity content. No medical claims. No personal health results. No disease-specific language.\n- CTA (22–26s): "Link in bio for details."\n\nCompliance rules (hardcoded — do not break):\n- No cure, treat, heal, fix, or disease language\n- No IBS, leaky gut, or condition-specific terms\n- No before/after framing\n- No fake personal health results ("I tried this and my gut...")\n- Safe phrases only: "designed to support," "daily wellness routine," "formulated with intention"\n\nFormat: 9:16 vertical. Tone: curious, educational, warm.`,
      canvaPrompt:    `TikTok/Reel thumbnail (9:16). Creator face with curious, open expression. Warm neutral background (sage green or warm beige). Bold white text overlay at top: "What does gut support actually mean?" Inner Bloom bottle partially visible in bottom corner. Approachable, non-clinical aesthetic.`,
      visualDirection:`Creator: warm natural lighting, clean neutral background (sage, off-white, or warm beige). No medical props. No lab context. Product bottle shown briefly — label facing camera. Calm, educational energy. No high-pressure sales vibe. No before/after comparisons. Approachable, real-person aesthetic.`,
      cta:            'Dig into the details → link in bio',
      compliance:     'No outcome claims. No personal health results implied — hook uses curiosity/research framing, not testimonial. No disease/condition language. No IBS, leaky gut, or condition-specific terms. Safe phrases: "designed to support," "daily gut wellness routine," "formulated with intention." Creator not claiming medical expertise. FTC/FDA compliant.',
      disclosure:     'Add "#Ad" or "Paid partnership" disclosure if creator is compensated. Required FTC disclosure for AI-generated content: include "AI-generated" label on or adjacent to the video. Script is educational framing — no personal health experience or testimonial language.',
      metric:         'View-through rate, Comment engagement (educational questions), Saves',
    },

    carousel: {
      platformGroup:  'Meta',
      placement:      'Instagram Feed + Facebook Feed (4:5)',
      contentType:    'Educational Carousel',
      funnelStage:    'TOFU (Awareness)',
      ugcFormat:      'Brand-educational (no creator needed)',
      creatorPersona: 'N/A — Brand voice',
      hook:           'The gut wellness question no one is asking — but everyone should be.',
      angle:          "Microbiome literacy for the intentional wellness consumer. 5 slides exploring what probiotic support means — educational, curiosity-driven, no treatment claims. Inspired by Seed's knowledge-leader approach.",
      script: `CAPTION:
What does it actually mean to support your gut?

Not a fix. Not a cure. Just intentional daily wellness with ingredients designed to complement your body's natural processes.

Inner Bloom — thoughtfully formulated, transparently sourced.

Start with curiosity. 🌸 Swipe to learn more.

#InnerBloom #GutWellness #ProbioticSupport #DailyWellness #VitalVision`,
      onScreenText:   `Slide 1: "What does gut support actually mean?"\nSlide 2: "It starts with the right questions."\nSlide 3: "What strains? How were they formulated? Why these ingredients?"\nSlide 4: "Transparency over promises."\nSlide 5: "Inner Bloom — designed to support your daily wellness routine." + CTA`,
      shotList:       `5 slides (Canva design):\nSlide 1 — Cover: hook headline\nSlide 2 — Concept tile: curiosity question\nSlide 3 — Concept tile: formulation awareness\nSlide 4 — Concept tile: transparency value\nSlide 5 — Inner Bloom product bottle + soft CTA`,
      nananaBanana:   `Create a 5-slide educational carousel for Instagram + Facebook (4:5 ratio).\n\nTopic: understanding probiotic support and gut wellness literacy.\n\nSlide structure:\n- Slide 1 (cover): Hook — "What does gut support actually mean?"\n- Slides 2–4: Educational concepts — what to ask about probiotic supplements, formulation awareness, the value of ingredient transparency. No medical claims. No disease terms. No IBS/leaky gut language.\n- Slide 5: Inner Bloom product + soft CTA — "Discover Inner Bloom."\n\nTone: curious, premium, educational.\nSafe language only: "may support," "designed to complement," "daily wellness," "thoughtfully formulated."\nNo cure/treatment/disease language. No before/after.`,
      canvaPrompt:    `4:5 carousel cover. Soft sage green or dusty blush background. Headline: "What does gut support actually mean?" Light botanical line illustration accent. Inner Bloom bottle edge barely visible at bottom. Clean, approachable, non-clinical aesthetic.`,
      visualDirection:`Design system: soft sage green or dusty blush base. Warm cream text cards. Botanical line art accents (leaves, simple plant forms). Serif headline + clean sans body text. No clinical imagery. No anatomy diagrams. No digestive system illustrations. No before/after. Product appears on final slide only.`,
      cta:            'Discover Inner Bloom → link in bio',
      compliance:     'No cure/treatment/disease claims. No condition-specific terms (IBS, leaky gut, etc.). Safe phrases: "may support," "designed to complement," "daily wellness," "thoughtfully formulated." FTC/FDA compliant.',
      disclosure:     'Brand content — no creator disclosure required. All educational content is general wellness literacy, not medical advice. Ensure no slide implies a disease claim.',
      metric:         'Carousel completion rate, Saves, Comment quality (educational engagement)',
    },

    storyCTA: {
      platformGroup:  'Meta',
      placement:      'Instagram Stories + Facebook Stories (9:16)',
      contentType:    'Story CTA Asset',
      funnelStage:    'BOFU (Conversion)',
      ugcFormat:      'Brand-designed story frame',
      creatorPersona: 'N/A — Brand voice',
      hook:           'Curious about probiotic support for your daily routine?',
      angle:          'Direct soft discovery CTA. Curiosity-based, warm, no pressure. Link-tap focused.',
      script: `STORY FRAME TEXT:
Curious about probiotic support?

Inner Bloom is designed to support your daily gut wellness routine.
Thoughtfully formulated. Transparently sourced.

👆 Tap to explore.`,
      onScreenText:   `Line 1: "Curious about probiotic support?"\nLine 2: "Designed to support your daily wellness routine."\nCTA sticker: "Tap to explore →"`,
      shotList:       `Single 9:16 story frame (Canva design):\n- Full-bleed soft sage or dusty blush background\n- Inner Bloom bottle centered, slight angle\n- Text overlay per script above\n- Link sticker at bottom`,
      nananaBanana:   `Design a single 9:16 story frame for Instagram and Facebook Stories — Inner Bloom.\n\nLayout:\n- Full-bleed soft sage green or dusty blush background\n- Inner Bloom bottle centered (slight angle, soft drop shadow)\n- Top: headline "Curious about probiotic support?"\n- Mid: "Designed to support your daily wellness routine. Thoughtfully formulated."\n- Bottom: link sticker "Tap to explore →"\n\nTone: clean, approachable, non-clinical. No medical imagery. No before/after.`,
      canvaPrompt:    `9:16 story frame. Soft sage or dusty blush full-bleed background. Inner Bloom bottle centered with subtle drop shadow. Compact serif headline at top. Short 2-line body text mid-frame. Link sticker at bottom. Warm botanical feel. No clinical imagery.`,
      visualDirection:`Full-bleed sage or blush background. Product bottle centered. Subtle botanical texture overlay (very light). Warm, calm palette. No before/after. No medical imagery. Minimal text — product is the hero. Clean, premium layout.`,
      cta:            'Tap to explore Inner Bloom →',
      compliance:     'No outcome claims. CTA is discovery-only ("explore"). Safe phrases: "designed to support," "daily wellness routine," "thoughtfully formulated." No condition-specific terms. FTC/FDA compliant.',
      disclosure:     'Brand content — no creator disclosure required. Ensure link destination (landing page) is compliance-reviewed before publishing.',
      metric:         'Story tap-through rate (TTR), Link clicks',
    },
  },

  // ── LOVE WELLNESS → Inner Bloom / Inner Calm ───────────────────────────────
  'Love Wellness': {
    product: 'Inner Bloom / Inner Calm',

    ugcVideo: {
      platformGroup:  'Instagram Reels + Facebook Reels',
      placement:      'Instagram Reels + Facebook Reels (9:16)',
      contentType:    'AI UGC Short-Form Video',
      funnelStage:    'MOFU (Consideration)',
      ugcFormat:      'Creator-style day-in-the-life / ritual segment (AI avatar)',
      creatorPersona: 'Relatable everyday wellness woman, late 20s–mid 30s. Intentional living aesthetic — not a health influencer. Focuses on daily rituals, self-care, and asking the right questions about her routine. Warm, normalizing tone.',
      hook:           "My morning ritual has one rule: I only keep things that actually belong in my routine.",
      angle:          "Daily ritual curation framing + intentional self-care. Inspired by Love Wellness's permission-giving, normalizing tone. Creator asks the right question about supplement selection — not about results. Adapted for Inner Bloom / Inner Calm.",
      script: `[0–3s] HOOK
"My morning ritual has one rule: I only keep things that actually belong in my routine."

[3–14s] RITUAL FRAMING (educational — not a testimonial, no personal results)
"That means I ask questions about everything I add to my daily wellness routine — especially supplements. Not 'will this fix something?' but 'does this actually belong in my self-care practice?'

That's a very different question. And I think it's the right one."

[14–24s] PRODUCT CONTEXT (soft, educational — no claims)
"Inner Bloom and Inner Calm are designed to support your daily wellness routine — not to promise you anything dramatic. Just thoughtful formulas you can feel confident adding to your ritual.

If you're building your own daily practice, that kind of intentionality matters."

[24–28s] CTA
"If you're exploring what belongs in your routine, link in bio is worth a look."

──
CAPTION:
Your wellness ritual should ask better questions. 💜

#InnerBloom #InnerCalm #DailyRitual #WellnessRoutine #VitalVision`,
      onScreenText:   `Hook (0–3s): "Does this actually belong in my routine?"\nMid (3s): "Not 'will this fix me?' — 'does this fit my self-care practice?'"\nProduct (14s): "Inner Bloom + Inner Calm — designed to support your daily wellness routine."\nEnd: "Explore → link in bio"`,
      shotList:       `Shot 1 — Creator in tidy morning space (light kitchen or bedroom), natural light. Casual but intentional.\nShot 2 — Top-down flat lay: wellness ritual items including Inner Bloom and Inner Calm bottles alongside journal and warm mug.\nShot 3 — Creator talking to camera, warm conversational tone.\nShot 4 — Close-up of both bottles together, labels facing camera.\nShot 5 — Creator delivers CTA to camera.`,
      nananaBanana:   `Generate a 28-second AI UGC lifestyle talking-head video for Inner Bloom and Inner Calm (probiotic + magnesium supplement pair).\n\nCreator persona: relatable everyday wellness woman, late 20s–mid 30s, warm and conversational — NOT a health influencer or medical professional. Uses intentional self-care framing.\n\nStructure:\n- Hook (0–3s): "My morning ritual has one rule: I only keep things that actually belong."\n- Middle (3–24s): Ritual curation framing — asking the right questions about supplement selection. Educational and intentional. Not a testimonial. No personal health results.\n- CTA (24–28s): "Worth exploring — link in bio."\n\nCompliance rules (hardcoded — do not break):\n- No cure, treat, heal, fix, or disease language\n- No before/after framing\n- No personal health results ("I tried this and my gut/sleep/hormones...")\n- No fake review or testimonial language\n- "That's what I look for" = preference statement only, NOT a results claim\n- Safe phrases only: "designed to support," "daily wellness routine," "self-care ritual," "feel confident"\n\nFormat: 9:16 vertical. Tone: warm, relatable, normalizing — not high-energy, not salesy.`,
      canvaPrompt:    `TikTok/Reel thumbnail (9:16). Woman in warm morning setting, calm and intentional aesthetic. Bold text overlay: "Does this belong in your wellness ritual?" Both Inner Bloom and Inner Calm bottles subtly visible on surface nearby. Warm neutral palette (cream, peach, soft lavender). Non-clinical.`,
      visualDirection:`Creator: warm natural morning light, clean home setting — not a gym, not a clinic, not a staged studio. Casual but intentional. Both product bottles present naturally in the scene (on counter, beside journal). No medical props. No before/after. Inclusive representation — real-looking woman, not hyper-polished. Warm, cozy, intentional energy throughout.`,
      cta:            'Explore your ritual → link in bio',
      compliance:     'No hormonal or digestive treatment claims. "That\'s what I look for" is a preference statement — not a testimonial or results claim. No before/after framing. No cure/treat/heal/fix language. No fake personal experience. Safe phrases: "designed to support," "daily wellness routine," "self-care ritual," "feel confident." FTC/FDA compliant.',
      disclosure:     'Add "#Ad" or "Paid partnership" disclosure if creator is compensated. Required FTC disclosure for AI-generated content: include "AI-generated" label on or adjacent to the video. Script frames creator as sharing a perspective on ritual curation — not personal health outcomes.',
      metric:         'View-through rate, Saves, Comments (ritual/routine questions)',
    },

    carousel: {
      platformGroup:  'Meta',
      placement:      'Instagram Feed + Facebook Feed (4:5)',
      contentType:    'Educational Carousel',
      funnelStage:    'MOFU (Consideration)',
      ugcFormat:      'Brand-educational (no creator needed)',
      creatorPersona: 'N/A — Brand voice',
      hook:           "Your daily wellness ritual doesn't need to be complicated.",
      angle:          "Approachable women's wellness — ritual simplification + intentional self-care education. Community-oriented. Inspired by Love Wellness's accessible, permission-giving tone.",
      script: `CAPTION:
Wellness isn't a destination — it's a daily practice.

Inner Bloom and Inner Calm are designed to support the routines that matter most to you. Not promises. Not quick fixes. Just thoughtful formulas for your daily wellness ritual.

What does your self-care routine look like? Tell us below. 💜

Swipe to explore.

#InnerBloom #InnerCalm #DailyRitual #WellnessRoutine #VitalVision`,
      onScreenText:   `Slide 1: "Your daily ritual doesn't need to be complicated."\nSlide 2: Morning ritual moment — "Start with intention."\nSlide 3: Midday ritual moment — "Check in with yourself."\nSlide 4: Evening ritual moment — "Wind down with purpose."\nSlide 5: "Inner Bloom + Inner Calm — designed to support your daily wellness routine." + CTA`,
      shotList:       `5 slides (Canva design — no photography required):\nSlide 1 — Cover: headline + warm lifestyle element (coffee cup edge, soft fabric)\nSlide 2 — Morning ritual tile: journal, warm light, text\nSlide 3 — Midday ritual tile: calm moment, simple text\nSlide 4 — Evening ritual tile: soft wind-down scene, text\nSlide 5 — Both product bottles + CTA`,
      nananaBanana:   `Create a 5-slide educational carousel for Instagram + Facebook (4:5 ratio).\n\nTopic: building a simple, intentional daily wellness ritual.\n\nSlide structure:\n- Slide 1 (cover): Hook — "Your daily ritual doesn't need to be complicated."\n- Slides 2–4: Three ritual moments — morning, midday, evening. Each tile = one simple self-care concept. No medical claims. No outcome promises.\n- Slide 5: Inner Bloom + Inner Calm product pair + soft CTA — "Build your ritual."\n\nTone: warm, community-driven, normalizing.\nSafe language only: "designed to support," "daily wellness routine," "self-care ritual," "thoughtful formulas."\nNo hormonal, digestive treatment, or medical language. No before/after.`,
      canvaPrompt:    `4:5 carousel cover. Warm peach or soft lavender background. Headline: "Your daily ritual doesn't need to be complicated." Botanical line accent. Lifestyle element visible (coffee cup edge, fabric texture). Premium but approachable. Non-clinical aesthetic.`,
      visualDirection:`Design system: warm peach, soft lavender, and cream. Text-card based (no real photography required). Botanical line art. Serif headline + rounded sans body text. Both products appear on final slide only. No clinical imagery. Inclusive, everyday representation implied through language and design warmth. No before/after.`,
      cta:            'Build your ritual → link in bio',
      compliance:     'No hormonal or digestive treatment claims. Safe phrases: "designed to support," "daily wellness routine," "thoughtful formulas," "self-care ritual." No before/after. No medical language. FTC/FDA compliant.',
      disclosure:     'Brand content — no creator disclosure required. Community engagement CTA ("tell us below") is fine. Monitor comments to ensure user-generated responses do not contain health claims that could create endorsement liability.',
      metric:         'Saves, Comments (ritual sharing), Carousel completion rate',
    },

    storyCTA: {
      platformGroup:  'Meta',
      placement:      'Instagram Stories + Facebook Stories (9:16)',
      contentType:    'Story CTA Asset',
      funnelStage:    'BOFU (Conversion)',
      ugcFormat:      'Brand-designed story frame',
      creatorPersona: 'N/A — Brand voice',
      hook:           'Your daily wellness ritual starts here.',
      angle:          'Warm, soft invitation to discover both products as a ritual pair. No pressure, no promises. Discovery-first.',
      script: `STORY FRAME TEXT:
Your wellness ritual starts here.

Inner Bloom + Inner Calm —
designed to support your daily routine.
Thoughtful formulas. No promises. Just presence.

👆 Tap to explore.`,
      onScreenText:   `Line 1: "Your wellness ritual starts here."\nLine 2: "Inner Bloom + Inner Calm — designed to support your daily routine."\nLine 3: "Thoughtful formulas. No promises."\nCTA sticker: "Tap to explore →"`,
      shotList:       `Single 9:16 story frame (Canva design):\n- Full-bleed warm peach or soft lavender background\n- Both Inner Bloom and Inner Calm bottles centered, side by side\n- Subtle botanical texture overlay\n- Text per script above\n- Link sticker at bottom`,
      nananaBanana:   `Design a single 9:16 story frame for Instagram and Facebook Stories — Inner Bloom and Inner Calm as a product pair.\n\nLayout:\n- Full-bleed warm peach or soft lavender background\n- Both bottles centered side by side (slight 3D angle, soft drop shadow)\n- Top: headline "Your wellness ritual starts here."\n- Mid: "Inner Bloom + Inner Calm — designed to support your daily routine. Thoughtful formulas."\n- Bottom: link sticker "Tap to explore →"\n\nTone: premium, calm, warm. Non-clinical. No before/after. Let the product pair be the hero.`,
      canvaPrompt:    `9:16 story frame. Warm peach or soft lavender full-bleed background. Inner Bloom + Inner Calm bottles centered, side by side, with soft drop shadow. Subtle botanical texture overlay. Compact serif headline at top. Short body copy mid. Link sticker at bottom. Warm, intentional, premium feel.`,
      visualDirection:`Warm peach or soft lavender background. Both products shot as a pair — equal prominence, side by side. Gentle botanical overlay texture (very light). No medical imagery. Warm, calm, feminine but not exclusive. Minimal text — the product pair carries the visual. Clean, uncluttered layout.`,
      cta:            'Tap to explore Inner Bloom + Inner Calm →',
      compliance:     'No hormonal or digestive treatment claims. No cure/treat/heal language. "No promises" is intentional transparency framing — compliant and honest. Safe phrases: "designed to support," "daily routine," "thoughtful formulas." FTC/FDA compliant.',
      disclosure:     'Brand content — no creator disclosure required. Ensure the link destination (landing page) is also reviewed for compliance before publishing.',
      metric:         'Story tap-through rate (TTR), Link clicks',
    },
  },
};

// ── Row builder ───────────────────────────────────────────────────────────────

/**
 * Build all 9 rows: 3 competitors × 3 asset types.
 * Returns array of 23-element arrays aligned to TARGET_HEADERS.
 */
function buildAllRows(competitors) {
  const rows = [];
  let batchNum = 1;

  competitors.forEach((comp) => {
    const brand = comp['Brand'];
    const strategy = CONTENT_PLAN[brand];
    if (!strategy) return;

    const product = comp['Product Match'] || strategy.product;
    const assetTypes = ['ugcVideo', 'carousel', 'storyCTA'];

    assetTypes.forEach((assetKey) => {
      const a = strategy[assetKey];
      rows.push([
        batchId(batchNum++),
        brand,
        a.platformGroup,
        a.placement,
        product,
        a.contentType,
        a.funnelStage,
        a.ugcFormat,
        a.creatorPersona,
        a.hook,
        a.angle,
        a.script,
        a.onScreenText,
        a.shotList,
        a.nananaBanana,
        a.canvaPrompt,
        a.visualDirection,
        a.cta,
        a.compliance,
        a.disclosure,
        'Pending',
        'Draft',
        a.metric,
      ]);
    });
  });

  return rows;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('=== Vital Vision — Organic Content Queue Generator (MVP) ===');
  console.log(`Mode:        ${IS_DRY_RUN ? 'DRY-RUN (nothing will be written)' : 'WRITE MODE'}`);
  console.log(`Source tab:  "${SOURCE_TAB}"`);
  console.log(`Target tab:  "${TARGET_TAB}"`);
  console.log(`MVP:         ${MVP_LIMIT} competitors × ${ASSETS_EACH} assets = ${MVP_LIMIT * ASSETS_EACH} total rows`);
  console.log('');

  // ── Validate env ──────────────────────────────────────────────────────────
  if (!SPREADSHEET_ID || !KEY_PATH) {
    if (!SPREADSHEET_ID) console.error('MISSING: GOOGLE_SHEETS_ID in .env');
    if (!KEY_PATH)        console.error('MISSING: GOOGLE_SERVICE_ACCOUNT_KEY_PATH in .env');
    process.exit(1);
  }
  console.log(`  GOOGLE_SHEETS_ID:               ${SPREADSHEET_ID.substring(0, 10)}...`);
  console.log(`  GOOGLE_SERVICE_ACCOUNT_KEY_PATH: ${KEY_PATH}`);

  // ── Auth ──────────────────────────────────────────────────────────────────
  let keyFile;
  try {
    keyFile = require(path.resolve(KEY_PATH));
  } catch {
    console.error(`ERROR: Cannot read service account key at: ${KEY_PATH}`);
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  // ── Read source: Competitors ──────────────────────────────────────────────
  console.log('');
  console.log(`Reading "${SOURCE_TAB}" tab...`);

  let sourceValues;
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SOURCE_TAB,
    });
    sourceValues = res.data.values || [];
  } catch (err) {
    console.error(`ERROR reading "${SOURCE_TAB}": ${err.message}`);
    process.exit(1);
  }

  // Auto-detect header row (first row containing "Priority" AND "Brand")
  let headerRowIndex = -1;
  let headerMap = {};
  for (let i = 0; i < sourceValues.length; i++) {
    const candidate = buildHeaderMap(sourceValues[i]);
    if ('Priority' in candidate && 'Brand' in candidate) {
      headerRowIndex = i;
      headerMap = candidate;
      break;
    }
  }

  if (headerRowIndex === -1) {
    console.error(`ERROR: Cannot detect header row in "${SOURCE_TAB}". Expected "Priority" and "Brand" columns.`);
    process.exit(1);
  }

  console.log(`  Header row: row ${headerRowIndex + 1} (1-based)`);
  console.log(`  Columns:    ${Object.keys(headerMap).join(', ')}`);

  // Filter usable rows
  const dataRows = sourceValues.slice(headerRowIndex + 1);
  const usable = dataRows
    .map((row, i) => ({
      obj:      rowToObject(row, headerMap),
      sheetRow: headerRowIndex + 2 + i,
    }))
    .filter(({ obj }) =>
      (obj['Brand'] || '').trim() !== '' &&
      (obj['AI Status'] || '').toLowerCase().trim() === 'analyzed'
    );

  console.log(`  Total data rows:                ${dataRows.length}`);
  console.log(`  Usable (Brand + AI Analyzed):   ${usable.length}`);

  const selected = usable.slice(0, MVP_LIMIT);
  console.log(`  Selected for MVP:               ${selected.length}`);
  selected.forEach(({ obj, sheetRow }) =>
    console.log(`    → [Row ${sheetRow}] ${obj['Brand']} — ${obj['Product Match']}`)
  );

  // ── Generate all 9 rows ───────────────────────────────────────────────────
  console.log('');
  console.log(`Generating ${selected.length * ASSETS_EACH} content rows...`);
  const generatedRows = buildAllRows(selected.map(s => s.obj));
  console.log(`  Done. ${generatedRows.length} rows ready.`);

  // ── Full preview (always shown) ───────────────────────────────────────────
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('FULL DRY-RUN PREVIEW — ALL 9 ROWS');
  console.log('═══════════════════════════════════════════════════════════════════');

  generatedRows.forEach((row, i) => {
    console.log('');
    console.log(`┌─────────────────────────────────────────────────────────────────`);
    console.log(`│ ROW ${i + 1} of ${generatedRows.length}  |  ${row[0]}  |  ${row[1]} → ${row[4]}`);
    console.log(`│ ${row[5]}  |  ${row[2]}  |  ${row[3]}`);
    console.log(`├─────────────────────────────────────────────────────────────────`);
    TARGET_HEADERS.forEach((header, j) => {
      const val = String(row[j] || '');
      if (!val) return;
      if (['Script / Caption Draft', 'Shot List', 'Nano Banana Prompt', 'On-Screen Text'].includes(header)) {
        // Print multi-line fields with indented lines
        console.log(`│ ${header}:`);
        val.split('\n').forEach(line =>
          console.log(`│   ${line}`)
        );
      } else {
        // Single-line fields: truncate at 110 chars
        const display = val.length > 110 ? val.substring(0, 107) + '...' : val;
        console.log(`│ ${header.padEnd(24)}: ${display}`);
      }
    });
    console.log(`└─────────────────────────────────────────────────────────────────`);
  });

  // ── Dry-run exit ──────────────────────────────────────────────────────────
  if (IS_DRY_RUN) {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('DRY-RUN COMPLETE. Nothing was written to Google Sheets.');
    console.log(`${generatedRows.length} rows ready for "${TARGET_TAB}" tab.`);
    console.log('');
    console.log('To write to Google Sheets (after Lucy approval):');
    console.log('  node scripts/generate-organic-content-queue.js --write');
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('');
    process.exit(0);
  }

  // ── WRITE MODE ─────────────────────────────────────────────────────────────

  if (PROTECTED_TABS.map(t => t.toLowerCase()).includes(TARGET_TAB.toLowerCase())) {
    console.error(`SAFETY BLOCK: "${TARGET_TAB}" is a protected tab. Aborting.`);
    process.exit(1);
  }

  console.log('');
  console.log(`WRITE MODE: Preparing "${TARGET_TAB}" tab...`);

  let spreadsheetMeta;
  try {
    const res = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    spreadsheetMeta = res.data;
  } catch (err) {
    console.error(`ERROR fetching spreadsheet metadata: ${err.message}`);
    process.exit(1);
  }

  const existingTabs = spreadsheetMeta.sheets.map(s => s.properties.title);
  const targetExists = existingTabs.includes(TARGET_TAB);

  if (!targetExists) {
    console.log(`  Tab "${TARGET_TAB}" not found — creating it...`);
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [{ addSheet: { properties: { title: TARGET_TAB } } }],
        },
      });
      console.log(`  Tab created.`);

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${TARGET_TAB}'!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [TARGET_HEADERS] },
      });
      console.log(`  Headers written (${TARGET_HEADERS.length} columns).`);
    } catch (err) {
      console.error(`ERROR creating tab or writing headers: ${err.message}`);
      process.exit(1);
    }
  } else {
    console.log(`  Tab "${TARGET_TAB}" exists — appending after existing rows.`);
  }

  try {
    const appendRes = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${TARGET_TAB}'`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: generatedRows },
    });

    const updated = appendRes.data.updates;
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('WRITE COMPLETE.');
    console.log(`  Rows written:   ${generatedRows.length}`);
    console.log(`  Updated range:  ${updated ? updated.updatedRange : 'n/a'}`);
    console.log(`  Tab written:    "${TARGET_TAB}"`);
    console.log(`  Source tab:     "${SOURCE_TAB}" — NOT modified`);
    console.log('');
    console.log('ROLLBACK:');
    console.log(`  Open "${TARGET_TAB}" → select last ${generatedRows.length} data rows → Delete rows.`);
    console.log(`  If tab was just created, delete the entire tab.`);
    console.log(`  "${SOURCE_TAB}" was not touched.`);
    console.log('═══════════════════════════════════════════════════════════════════');
  } catch (err) {
    console.error(`ERROR appending rows: ${err.message}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`UNEXPECTED ERROR: ${err.message}`);
  process.exit(1);
});
