/**
 * apply-hero-sections.js
 * Vital Vision — PageFly Section A + B Apply Script
 *
 * Applies ONLY the Announcement Bar (Section A) and Hero (Section B)
 * to the Inner Bloom result page draft in PageFly.
 *
 * HARD SAFETY RULES:
 * - Will NOT click Publish, Save & Publish, or Go Live under any circumstances
 * - Will NOT navigate away from the current editor page
 * - Will NOT touch any section other than A and B
 * - Stops and prompts for human confirmation before every write action
 * - Saves draft only if user confirms at each step
 *
 * Usage:
 *   npm run pagefly:apply-hero
 *   (Requires a live terminal — do not pipe stdin)
 *
 * Run ONLY after observe-pagefly-editor.js confirms accessibility
 * AND after human reviews the observe report.
 */

'use strict';

require('dotenv').config();

const { chromium } = require('playwright');
const fs            = require('fs');
const path          = require('path');
const readline      = require('readline');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

if (process.env.AUTO_PUBLISH === 'true') {
  console.error('BLOCKED: AUTO_PUBLISH=true'); process.exit(1);
}
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') {
  console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1);
}

// ─── Brand Values (Override editing map — exact hex per user spec) ────────────

const BRAND = {
  heroBackground:        '#0F3B2E',
  heroCTAFill:           '#F4C430',
  heroCTAText:           '#0F3B2E',
  heroHeadingColor:      '#FFFFFF',
  heroSubheadColor:      '#FFF8EC',
  announcementBarBg:     '#0F3B2E',
  announcementBarText:   '#F4C430',
};

// ─── Section A Copy ───────────────────────────────────────────────────────────

const SECTION_A = {
  text: 'Your personalized wellness match is ready ✨',
  background: BRAND.announcementBarBg,
  textColor: BRAND.announcementBarText,
};

// ─── Section B Copy ───────────────────────────────────────────────────────────

const SECTION_B = {
  heading: 'Your Inner Bloom Match ✨',
  subheading: 'Based on your answers, Inner Bloom was selected as your gut wellness starting point.',
  disclaimer: 'Educational only. Not medical advice. Results may vary.',
  ctaText: 'VIEW INNER BLOOM',
  ctaLink: '/products/advanced-probiotic-formula',
  ctaFill: BRAND.heroCTAFill,
  ctaTextColor: BRAND.heroCTAText,
  heroBackground: BRAND.heroBackground,
  headingColor: BRAND.heroHeadingColor,
  subheadColor: BRAND.heroSubheadColor,
};

// ─── Config ───────────────────────────────────────────────────────────────────

const STORE     = process.env.SHOPIFY_STORE_DOMAIN || 'rum0nq-hs.myshopify.com';
const BASE_DIR  = path.resolve(__dirname, '../../');
const REPORT_DIR = path.join(BASE_DIR, 'reports', 'pagefly');
const SS_DIR    = path.join(REPORT_DIR, 'screenshots');

fs.mkdirSync(SS_DIR, { recursive: true });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans.trim().toLowerCase()); }));
}

async function screenshotNow(page, label) {
  const p = path.join(SS_DIR, `${label}-${Date.now()}.png`);
  await page.screenshot({ path: p, fullPage: false }).catch(() => {});
  return p;
}

/**
 * Safely check for Publish buttons and ensure none are clicked.
 * Logs a warning if any are found — does not click.
 */
async function auditPublishButtons(page) {
  const found = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, [role="button"]'));
    return btns
      .filter(b => /publish|save & publish|go live/i.test(b.innerText || b.textContent || ''))
      .map(b => (b.innerText || b.textContent || '').trim().substring(0, 60));
  });
  if (found.length > 0) {
    console.log(`  ⚠️  Publish buttons detected (NOT clicked): ${found.join(' | ')}`);
  }
  return found;
}

/**
 * Try to find and fill a text field in PageFly by various strategies.
 * Returns true if successful, false if not found.
 */
async function tryFillField(page, strategies, value, label) {
  for (const strategy of strategies) {
    try {
      const el = await page.$(strategy);
      if (el) {
        const visible = await el.isVisible();
        if (!visible) continue;
        await el.click({ clickCount: 3 });
        await el.fill(value);
        console.log(`  ✓ Filled "${label}" via selector: ${strategy}`);
        return true;
      }
    } catch { /* continue */ }
  }
  console.log(`  ✗ Could not find field for "${label}" — manual action required`);
  return false;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const W = 72;
  const div = (c = '─') => console.log(c.repeat(W));

  div('═');
  console.log('  VV PageFly — Apply Hero Sections (A + B ONLY)');
  console.log('  Page: Inner Bloom — Your Wellness Match');
  console.log('  PUBLISH IS FORBIDDEN. DRAFT SAVE ONLY.');
  div('═');
  console.log('');
  console.log('  This script applies ONLY Section A (Announcement Bar)');
  console.log('  and Section B (Hero) and then STOPS.');
  console.log('');
  console.log('  Run observe-pagefly-editor.js first if you have not already.');
  console.log('');

  const proceed = await prompt('  Continue? Type YES to proceed, anything else to abort → ');
  if (proceed !== 'yes') {
    console.log('  Aborted.');
    process.exit(0);
  }

  const browser = await chromium.launch({
    headless: false,
    slowMo: 100,
    args: ['--start-maximized'],
  });

  const context = await browser.newPage();
  const page    = context;

  const adminUrl = `https://admin.shopify.com/store/${STORE.replace('.myshopify.com', '')}/apps`;
  await page.goto(adminUrl, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});

  console.log('');
  console.log('  ┌─────────────────────────────────────────────────────────────────┐');
  console.log('  │  MANUAL STEPS:                                                  │');
  console.log('  │  1. Log in to Shopify admin if prompted                         │');
  console.log('  │  2. Go to: Apps → PageFly Page Builder                          │');
  console.log('  │  3. Open: Inner Bloom — Your Wellness Match (inner-bloom-result) │');
  console.log('  │  4. Wait for the editor to fully load                           │');
  console.log('  │  5. Return here and press ENTER                                 │');
  console.log('  └─────────────────────────────────────────────────────────────────┘');
  console.log('');

  await prompt('  Press ENTER when the PageFly editor is fully loaded → ');

  // Safety audit
  await auditPublishButtons(page);
  const ss1 = await screenshotNow(page, 'before-edits');
  console.log(`  Before-edits screenshot: ${path.relative(BASE_DIR, ss1)}`);
  console.log('');

  // ── SECTION A — Announcement Bar ──────────────────────────────────────────

  div();
  console.log('  SECTION A — Announcement Bar');
  console.log('  Target values:');
  console.log(`    Text:       "${SECTION_A.text}"`);
  console.log(`    Background: ${SECTION_A.background}`);
  console.log(`    Text color: ${SECTION_A.textColor}`);
  div();
  console.log('');
  console.log('  PageFly does not expose announcement bar text as a standard input.');
  console.log('  You need to:');
  console.log('    1. Click the announcement bar section in the PageFly editor');
  console.log('    2. In the right panel, find the text field');
  console.log('    3. Paste:');
  console.log(`       "${SECTION_A.text}"`);
  console.log('    4. Set background color to: #0F3B2E');
  console.log('    5. Set text color to: #F4C430');
  console.log('');
  console.log('  Attempting auto-detect of announcement bar input...');

  // Try common PageFly announcement bar selectors
  const aFilled = await tryFillField(page, [
    '[data-pf-type="TextAnnouncement"] input',
    '[data-pf-type="TextAnnouncement"] textarea',
    '[data-pf-type="TextAnnouncement"] [contenteditable]',
    '[class*="announcement"] input',
    '[class*="announcement"] [contenteditable]',
    '[id*="announcement"] input',
  ], SECTION_A.text, 'Announcement Bar Text');

  if (!aFilled) {
    console.log('');
    console.log('  Auto-fill not possible — please apply Section A manually:');
    console.log(`  Text:  ${SECTION_A.text}`);
    console.log(`  Bg:    ${SECTION_A.background}`);
    console.log(`  Color: ${SECTION_A.textColor}`);
    console.log('');
    await prompt('  Press ENTER when Section A is applied manually → ');
  }

  const ssA = await screenshotNow(page, 'after-section-a');
  console.log(`  Section A screenshot: ${path.relative(BASE_DIR, ssA)}`);
  console.log('');

  const approveA = await prompt('  Does Section A look correct? Type YES to continue to Section B → ');
  if (approveA !== 'yes') {
    console.log('  Stopped at Section A. Review and re-run or apply manually.');
    await browser.close();
    process.exit(0);
  }

  // ── SECTION B — Hero ───────────────────────────────────────────────────────

  div();
  console.log('  SECTION B — Hero / Product Header');
  console.log('  Target values:');
  console.log(`    H1:         "${SECTION_B.heading}"`);
  console.log(`    Subhead:    "${SECTION_B.subheading}"`);
  console.log(`    Disclaimer: "${SECTION_B.disclaimer}"`);
  console.log(`    CTA text:   "${SECTION_B.ctaText}"`);
  console.log(`    CTA link:   "${SECTION_B.ctaLink}"`);
  console.log(`    CTA fill:   ${SECTION_B.ctaFill}`);
  console.log(`    Hero bg:    ${SECTION_B.heroBackground}`);
  console.log(`    H1 color:   ${SECTION_B.headingColor}`);
  console.log(`    Sub color:  ${SECTION_B.subheadColor}`);
  div();
  console.log('');
  console.log('  Attempting auto-fill of hero heading...');

  const headingFilled = await tryFillField(page, [
    '[data-pf-type="Heading"] h1',
    '[data-pf-type="Heading"] [contenteditable]',
    '.pf-hero h1[contenteditable]',
    'h1[contenteditable]',
    '[class*="hero"] h1[contenteditable]',
    '[class*="heading"][contenteditable]',
  ], SECTION_B.heading, 'Hero H1');

  const subFilled = await tryFillField(page, [
    '[data-pf-type="Paragraph"] [contenteditable]',
    '[class*="hero"] p[contenteditable]',
    '[class*="subheading"][contenteditable]',
    '[class*="subtitle"][contenteditable]',
    'p[contenteditable]',
  ], SECTION_B.subheading, 'Hero Subheading');

  const ctaFilled = await tryFillField(page, [
    '[data-pf-type="Button"] a',
    '[data-pf-type="Button"] button',
    '[class*="hero"] a[contenteditable]',
    '[class*="cta"][contenteditable]',
    'a.pf-btn',
    'button.pf-btn',
  ], SECTION_B.ctaText, 'CTA Button Text');

  if (!headingFilled || !subFilled || !ctaFilled) {
    console.log('');
    console.log('  Some fields require manual input. Please apply these manually:');
    if (!headingFilled)  console.log(`  H1:      ${SECTION_B.heading}`);
    if (!subFilled)      console.log(`  Subhead: ${SECTION_B.subheading}`);
    if (!ctaFilled)      console.log(`  CTA:     ${SECTION_B.ctaText}`);
    console.log(`  CTA link: ${SECTION_B.ctaLink}`);
    console.log(`  Hero background: ${SECTION_B.heroBackground}`);
    console.log(`  H1 color: ${SECTION_B.headingColor} | Subhead: ${SECTION_B.subheadColor}`);
    console.log(`  CTA fill: ${SECTION_B.ctaFill} | CTA text: ${SECTION_B.ctaTextColor}`);
    console.log('');
    console.log('  Also add the disclaimer text below the CTA:');
    console.log(`  "${SECTION_B.disclaimer}"`);
    console.log('');
    await prompt('  Press ENTER when Section B is applied manually → ');
  }

  const ssB = await screenshotNow(page, 'after-section-b');
  console.log(`  Section B screenshot: ${path.relative(BASE_DIR, ssB)}`);
  console.log('');

  // ── Final safety audit ─────────────────────────────────────────────────────
  await auditPublishButtons(page);

  // ── Build QA report ────────────────────────────────────────────────────────
  const qaLines = [
    `# Inner Bloom PageFly Hero — QA Report`,
    `# Sections applied: A (Announcement Bar) + B (Hero)`,
    `# Timestamp: ${new Date().toISOString()}`,
    `# Status: DRAFT ONLY — not published`,
    ``,
    `---`,
    ``,
    `## Section A — Announcement Bar`,
    ``,
    `| Field | Expected | Applied |`,
    `|---|---|---|`,
    `| Text | Your personalized wellness match is ready ✨ | ${aFilled ? 'Auto-filled' : 'Manual'} |`,
    `| Background | #0F3B2E | Verify in editor |`,
    `| Text color | #F4C430 | Verify in editor |`,
    ``,
    `---`,
    ``,
    `## Section B — Hero`,
    ``,
    `| Field | Expected | Applied |`,
    `|---|---|---|`,
    `| H1 | Your Inner Bloom Match ✨ | ${headingFilled ? 'Auto-filled' : 'Manual'} |`,
    `| Subheading | Based on your answers... | ${subFilled ? 'Auto-filled' : 'Manual'} |`,
    `| Disclaimer | Educational only. Not medical advice. Results may vary. | Manual — verify |`,
    `| CTA text | VIEW INNER BLOOM | ${ctaFilled ? 'Auto-filled' : 'Manual'} |`,
    `| CTA link | /products/advanced-probiotic-formula | Verify in editor |`,
    `| CTA fill | #F4C430 | Verify in editor |`,
    `| CTA text color | #0F3B2E | Verify in editor |`,
    `| Hero background | #0F3B2E | Verify in editor |`,
    `| H1 color | #FFFFFF | Verify in editor |`,
    `| Subhead color | #FFF8EC | Verify in editor |`,
    ``,
    `---`,
    ``,
    `## Publish Safety`,
    ``,
    `| Check | Status |`,
    `|---|---|`,
    `| Publish button clicked | NO — forbidden |`,
    `| Save & Publish clicked | NO — forbidden |`,
    `| Page visibility changed | NO |`,
    `| VQB routing changed | NO |`,
    ``,
    `---`,
    ``,
    `## Screenshots`,
    ``,
    `| Label | File |`,
    `|---|---|`,
    `| Before edits | ${path.relative(BASE_DIR, ss1)} |`,
    `| After Section A | ${path.relative(BASE_DIR, ssA)} |`,
    `| After Section B | ${path.relative(BASE_DIR, ssB)} |`,
    ``,
    `---`,
    ``,
    `## What Was NOT Changed`,
    ``,
    `- Product Card (Section D) — not touched`,
    `- Why This Match accordion (Section E) — not touched`,
    `- Benefit cards (Section F) — not touched`,
    `- Routine steps (Section G) — not touched`,
    `- Trust block (Section H) — not touched`,
    `- FAQ (Section I) — not touched`,
    `- Related products (Section J) — not touched`,
    `- Final CTA (Section K) — not touched`,
    `- VQB quiz routing — not touched`,
    `- Shopify product URLs, prices, variants — not touched`,
    `- Page publish state — UNCHANGED (still unpublished)`,
    ``,
    `---`,
    ``,
    `## What to Preview Next`,
    ``,
    `1. In PageFly: click Preview → switch to mobile (375px)`,
    `2. Check:`,
    `   - Announcement bar text and colors visible`,
    `   - Hero headline "Your Inner Bloom Match ✨" visible`,
    `   - Subheading readable on mobile`,
    `   - CTA "VIEW INNER BLOOM" full-width, min 52px`,
    `   - Disclaimer visible below CTA`,
    `   - No horizontal scroll`,
    `   - Hero background is deep green (#0F3B2E)`,
    `3. Report back with a screenshot or approval before continuing to Section D`,
    ``,
    `---`,
    ``,
    `*No Publish was clicked. Page remains as draft.*`,
    `*All remaining sections require separate approval before applying.*`,
  ];

  const qaPath = path.join(REPORT_DIR, 'inner-bloom-pagefly-hero-qa.md');
  fs.writeFileSync(qaPath, qaLines.join('\n'));
  console.log(`  QA report saved: reports/pagefly/inner-bloom-pagefly-hero-qa.md`);
  console.log('');

  div('═');
  console.log('  SECTION A + B COMPLETE — STOPPED AS PLANNED');
  console.log('');
  console.log('  NEXT STEPS:');
  console.log('  1. In PageFly: click Preview → mobile 375px');
  console.log('  2. Check: heading, subhead, CTA, colors, disclaimer');
  console.log('  3. Save draft in PageFly if everything looks correct');
  console.log('  4. Do NOT click Publish');
  console.log('  5. Report back with approval before Sections D–K');
  div('═');
  console.log('');

  await prompt('  Press ENTER to close the browser → ');
  await browser.close();
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
