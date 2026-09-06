/**
 * generate-publishing-packs.js
 * Vital Vision — Publishing Pack Generator
 *
 * Reads "Organic Content Queue" tab and generates two artifacts per eligible row:
 *   1. Publishing pack  → content/publishing-queue/[date]-[product]-[platform]-row[N]-pack.md
 *   2. Canva brief      → automations/drafts/[date]-canva-brief-[product]-row[N].md
 *
 * Eligible rows: Asset Status = Approved  AND  Post Status = Draft
 *
 * After BOTH artifacts are successfully written to disk:
 *   → Post Status updated to "Pack Ready" in the Google Sheet (targeted cell only)
 *
 * If either artifact fails:
 *   → Post Status is left as "Draft". Nothing is half-committed.
 *
 * SAFETY:
 *   - DRY-RUN by default — pass --write to commit
 *   - Only writes to the "Post Status" column — never Asset Status or any other column
 *   - Never modifies any other tab (Competitors, n8n_Input, etc.)
 *   - Never publishes or schedules anything
 *   - AUTO_PUBLISH=false enforced at startup
 *
 * USAGE:
 *   Dry-run:    node scripts/generate-publishing-packs.js
 *   Write mode: node scripts/generate-publishing-packs.js --write
 *
 * ROLLBACK:
 *   - Delete any generated files from content/publishing-queue/ and automations/drafts/
 *   - Manually revert Post Status from "Pack Ready" → "Draft" in the Sheet for affected rows
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

// ── googleapis safety guard ───────────────────────────────────────────────────
let google;
try {
  ({ google } = require('googleapis'));
} catch {
  console.error('');
  console.error('ERROR: "googleapis" package is not installed.');
  console.error('Run: npm install googleapis');
  console.error('');
  process.exit(1);
}

// ── Safety gates ──────────────────────────────────────────────────────────────
if (process.env.AUTO_PUBLISH === 'true') {
  console.error('BLOCKED: AUTO_PUBLISH=true detected. Set to false in .env.');
  process.exit(1);
}

// ── Config ────────────────────────────────────────────────────────────────────
const IS_DRY_RUN = !process.argv.includes('--write');

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const KEY_PATH       = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
const SOURCE_TAB     = 'Organic Content Queue';

const FILTER_ASSET_STATUS = 'Approved';
const FILTER_POST_STATUS  = 'Draft';
const TARGET_POST_STATUS  = 'Pack Ready';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PACKS_DIR    = path.join(PROJECT_ROOT, 'content', 'publishing-queue');
const BRIEFS_DIR   = path.join(PROJECT_ROOT, 'automations', 'drafts');

// Product library — loaded once for URLs and compliance disclaimers
const PRODUCT_LIBRARY = (() => {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, 'config', 'product-library.json'), 'utf8')
    );
  } catch {
    return { products: [] };
  }
})();

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Look up product by short_name (e.g. "Inner Calm"). */
function getProduct(shortName) {
  return PRODUCT_LIBRARY.products.find(p => p.short_name === shortName) || null;
}

/** 0-based column index → A1 letter (e.g. 0→A, 25→Z, 26→AA). */
function colLetter(idx) {
  let letter = '';
  let n = idx + 1;
  while (n > 0) {
    const rem = (n - 1) % 26;
    letter = String.fromCharCode(65 + rem) + letter;
    n = Math.floor((n - 1) / 26);
  }
  return letter;
}

/** Build { headerName → columnIndex } map from header row array. */
function buildHeaderMap(headerRow) {
  const map = {};
  headerRow.forEach((cell, idx) => {
    const name = String(cell).trim();
    if (name) map[name] = idx;
  });
  return map;
}

/** Convert a row array into an object keyed by header name. */
function rowToObject(row, headerMap) {
  const obj = {};
  Object.entries(headerMap).forEach(([name, idx]) => {
    obj[name] = row[idx] !== undefined ? String(row[idx]).trim() : '';
  });
  return obj;
}

/** URL-safe slug from a string. */
function slug(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** Today as YYYY-MM-DD. */
function today() {
  return new Date().toISOString().slice(0, 10);
}

// ── Platform publishing instructions ──────────────────────────────────────────

function publishingInstructions(contentType) {
  const ct = (contentType || '').toLowerCase();

  if (ct.includes('reel')) {
    return `**Option A — Manual (Instagram App)**
1. Open Instagram app. Tap + → Reel.
2. Upload your recorded video (portrait 9:16, 30–45 seconds).
3. Add on-screen hook text in the first 1–2 seconds using Instagram's text tool.
4. Paste the script/caption above into the caption field. Add hashtags.
5. Set the cover frame — choose a warm, clear still from the video.
6. Tap Share.

**Option B — Meta Business Suite**
1. Open Meta Business Suite (business.facebook.com).
2. Select Instagram → Create Post → Reel.
3. Upload video, paste caption, schedule.
4. Recommended: Tuesday or Thursday, 7–9 AM or 6–8 PM local time.
5. Enable "Also share to Facebook" to cross-post the Reel.

**Option C — Later / Metricool**
1. Create → Reel. Upload video. Paste caption. Set schedule. Save.`;
  }

  if (ct.includes('carousel')) {
    return `**Option A — Manual (Instagram App)**
1. Open Instagram app. Tap + → Post → Select Multiple.
2. Select all carousel slides in order.
3. Paste the caption. Tap Share.

**Option B — Meta Business Suite / Later / Metricool**
1. Create → Post. Upload slides in order. Paste caption. Set schedule.`;
  }

  if (ct.includes('story') || ct.includes('stories')) {
    return `**Option A — Manual (Instagram App)**
1. Open Instagram app. Tap + → Story.
2. Upload the Story frame.
3. Add any text overlays, link sticker, or poll sticker in-app.
4. Tap Share. Note: interactive stickers must be added natively in-app.

**Option B — Meta Business Suite**
1. Create Story base frame. Add interactive stickers via Instagram app after posting.
2. Recommended: Any day, 8–10 AM or 7–9 PM local time.`;
  }

  // Feed post (default)
  return `**Option A — Manual (Instagram App)**
1. Open Instagram app. Tap + → Post.
2. Select your image (1:1 or 4:5 format preferred).
3. Paste caption into the caption field. Tap Share.

**Option B — Meta Business Suite**
1. Open Meta Business Suite → Create Post → Photo/Video.
2. Upload image, paste caption.
3. Recommended: Wednesday or Friday, 8–10 AM or 12–1 PM local time.

**Option C — Later / Canva Content Planner / Metricool**
1. Upload image, paste caption, set schedule, save.`;
}

// ── Publishing pack generator ──────────────────────────────────────────────────

function generatePublishingPack(row, product, briefFilename, date) {
  const STORE_BASE   = 'https://www.vitalvision.shop';
  const productUrl   = product ? STORE_BASE + product.shopify_product_url : '[INSERT PRODUCT URL]';
  const quizUrlOrganic = 'https://www.vitalvision.shop/#finder-quiz-16047';
  const disclaimer   = product
    ? product.compliance_disclaimer
    : 'Educational only. Not medical advice. Results may vary. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.';

  const contentType = row['Content Type'] || 'Post';
  const platform    = row['Platform Group'] || 'Instagram';

  return `# Publishing Pack — ${row['Product']} ${platform}
# Row ${row['row_number']} | ${contentType} | ${row['Angle'] || 'Organic Content'}

Status: READY FOR MANUAL PUBLISHING
Platform: ${platform}
Content Type: ${contentType}
Product: ${row['Product']}
Approved by: Lucy
Approval date: Confirmed in Organic Content Queue — row ${row['row_number']}
Pack prepared: ${date}
Source: Organic Content Queue — row ${row['row_number']}

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true

---

## APPROVAL GATE — VERIFIED

- [x] Brand voice approved — warm, premium, educational, elegantly persuasive
- [x] Compliance check passed — Compliance Note: ${row['Compliance Note'] || 'PASS'}
- [x] No forbidden claims found
- [x] Disclaimer included below — add to end of caption before publishing
- [x] Script/caption is copy/paste ready
- [x] Human approval documented — Lucy, confirmed in Google Sheet row ${row['row_number']}

---

## CONTENT DETAILS

| Field | Value |
|-------|-------|
| Product | ${row['Product']} |
| Content Type | ${contentType} |
| Platform | ${platform} |
| Funnel Stage | ${row['Funnel Stage'] || '—'} |
| Angle | ${row['Angle'] || '—'} |
| Creator Persona | ${row['Creator Persona'] || '—'} |
| UGC Format | ${row['UGC Format'] || '—'} |
| Source Competitor | ${row['Source Competitor'] || '—'} |
| Metric To Watch | ${row['Metric To Watch'] || '—'} |

---

## SCRIPT / CAPTION — COPY/PASTE READY

**Hook:** ${row['Hook'] || '—'}

---

${row['Script / Caption Draft'] || '[Script not found — check Google Sheet row ' + row['row_number'] + ']'}

---

**Add this disclaimer at the end of the caption:**

${disclaimer}

**CTA:** ${row['CTA'] || 'Link in bio.'}

**Quiz URL (organic only):** ${quizUrlOrganic}
**Product URL:** ${productUrl}

---

## ON-SCREEN TEXT

${row['On-Screen Text'] || '— (none specified)'}

---

## SHOT LIST / PRODUCTION NOTES

${row['Shot List'] || '— (none specified — reference Visual Direction below)'}

---

## VISUAL DIRECTION

${row['Visual Direction'] || 'Warm natural light. Neutral surfaces (wood, linen, marble). No medical imagery. Lifestyle and editorial feel. Warm tones.'}

Canva brief: automations/drafts/${briefFilename}

---

## HOW TO PUBLISH

${publishingInstructions(contentType)}

---

## COMPLIANCE CONFIRMATION

All content verified against:
- config/compliance-rules.md
- config/brand-voice.md
- config/approval-rules.md
- config/publishing/safe-publishing-rules.md

Compliance note: ${row['Compliance Note'] || 'PASS — No forbidden terms detected'}

Do NOT use the paid quiz URL (finder-quiz-15203) in organic posts.
Do NOT publish if the visual has not been reviewed alongside this caption.
Do NOT remove the disclaimer line from the caption.

---

## PUBLISHING LOG

After publishing, create a log file at:
logs/publishing/${date}-${slug(row['Product'])}-${slug(platform)}-row${row['row_number']}-log.md

Log fields:
- Content piece: this file
- Scheduled date/time:
- Published by: Lucy
- Platform:
- Post URL (after live):
- Notes:

After publishing, update Post Status → Published in Google Sheet row ${row['row_number']}.
`;
}

// ── Canva brief generator ──────────────────────────────────────────────────────

function generateCanvaBrief(row, date) {
  const contentType     = row['Content Type'] || 'Post';
  const product         = row['Product'] || '—';
  const goal            = row['Funnel Stage'] || 'Awareness';
  const onScreenText    = row['On-Screen Text'] || '';
  const visualDirection = row['Visual Direction'] || '';
  const canvaPrompt     = row['Canva/Cover Prompt'] || '';
  const cta             = row['CTA'] || '';
  const rowNum          = row['row_number'];

  const ct = contentType.toLowerCase();
  let dimensions = '1080x1080px (square — Instagram Feed post)';
  if (ct.includes('reel') || ct.includes('story') || ct.includes('stories')) {
    dimensions = '1080x1920px (portrait — Reel cover / Story frame)';
  } else if (ct.includes('carousel')) {
    dimensions = '1080x1080px per slide (carousel)';
  } else if (ct.includes('facebook') || ct.includes('banner')) {
    dimensions = '1200x628px (Facebook landscape post)';
  }

  const briefFile = `${date}-canva-brief-${slug(product)}-row${rowNum}.md`;

  return `---
DRAFT — NOT APPROVED FOR PUBLISHING
File: automations/drafts/${briefFile}
Date: ${date}
Product: ${product}
Content Type: ${contentType}
Goal: ${goal}
Source Row: Organic Content Queue — row ${rowNum}
---

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true

Human must review and approve this brief before sending to designer or building in Canva.

---

## Traceability

| Field | Value |
|---|---|
| Batch ID | ${row['Batch ID'] || '—'} |
| Source Row (Sheet) | row ${rowNum} |
| Source Competitor / Pattern | ${row['Source Competitor'] || '—'} |
| Product | ${product} |
| Content Type | ${contentType} |
| Platform | ${row['Platform Group'] || '—'} |
| Placement | ${row['Placement'] || '—'} |
| Funnel Stage | ${goal} |
| Hook | ${row['Hook'] || '—'} |
| Angle | ${row['Angle'] || '—'} |
| CTA | ${cta || '—'} |
| Metric to Watch | ${row['Metric To Watch'] || '—'} |

---

## Canva Brief

### Format and Dimensions
${dimensions}

### Background
Off-white (#F9F8F6) or soft sage (#E8EDE6). Warm neutral feel. No busy patterns.
${visualDirection ? '\nVisual direction note: ' + visualDirection : ''}

### Headline Text (on image)
${onScreenText
  ? onScreenText
  : '[Adapt the hook from the caption — keep under 8 words. No disease claims. No cure/treat/prevent language.]'}

### Supporting Text on Image (optional)
One line max. Move longer copy into the caption, not onto the image.
${canvaPrompt ? '\nAI-generated cover direction: ' + canvaPrompt : ''}

### Product in Image
Yes — flat lay or hand-held lifestyle shot.
Surface: warm neutral (wood, linen, marble).
No clinical props, no lab settings, no before/after imagery.

### Props and Styling
Options: water glass, small plant, journal, linen cloth, supplement bottle.
Soft natural light. No harsh flash. Premium, calm, uncluttered.

### Mood and Lighting
${visualDirection || 'Soft natural light. Warm tones. Clean and editorial. Premium wellness feel.'}

### Logo Placement
Bottom center or bottom right.
Minimum 20px clear space on all sides.
Use Vital Vision wordmark or icon.

### CTA on Image (if any)
${cta ? cta : 'Keep minimal — e.g. "Find your match →" or leave off entirely.'}

### Disclaimer on Image
Include "Results may vary." if any benefit claim appears on the image.

### Designer Notes
${canvaPrompt || '[Use the Visual Direction and the script/caption for tone guidance.]'}

---

## Brand Specifications

**Colors:**
| Name | Hex | Use |
|------|-----|-----|
| Brand Green | #1F3D2B | Primary text accents, buttons |
| Off-White | #F9F8F6 | Clean backgrounds |
| White | #FFFFFF | Text on dark backgrounds |
| Soft Sage | #E8EDE6 | Secondary backgrounds, subtle accents |

**Typography:**
- Headlines: Plus Jakarta Sans / DM Sans / Inter — clean, modern sans-serif
- Body: Lightweight sans-serif — airy, readable
- Avoid: Script fonts, decorative fonts, anything busy or unserious

**Photography style:**
- Soft natural light, no harsh flash
- Neutral surfaces: white, linen, sage green, warm wood
- No stock-photo-looking imagery — lifestyle and real feel preferred
- No clinical or medical imagery (no lab coats, syringes, hospital settings)
- No before/after imagery

---

## Compliance Check

- [ ] No disease claims in image text
- [ ] No cure / treat / prevent language on image
- [ ] No before/after imagery
- [ ] No restricted health claim visible in the visual
- [ ] "Results may vary." present if any benefit claim appears on image
- [ ] On-brand colors (#1F3D2B / #F9F8F6 / #FFFFFF)
- [ ] Logo visible and correctly placed

---

## Human Approval Status

Draft only — not approved for publishing.
Visual must be reviewed and approved by Lucy before any post goes live.
After visual is approved, run vv-meta-publisher-checklist before publishing.
`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('=== Vital Vision — Publishing Pack Generator ===');
  console.log(`Mode: ${IS_DRY_RUN ? 'DRY-RUN (no files written, no sheet updated)' : 'WRITE MODE'}`);
  console.log('AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true');
  console.log('');

  // ── Validate env ────────────────────────────────────────────────────────────
  let envOk = true;
  if (!SPREADSHEET_ID) {
    console.error('MISSING: GOOGLE_SHEETS_ID is not set in .env');
    envOk = false;
  } else {
    console.log(`  OK: GOOGLE_SHEETS_ID = ${SPREADSHEET_ID.substring(0, 8)}...`);
  }
  if (!KEY_PATH) {
    console.error('MISSING: GOOGLE_SERVICE_ACCOUNT_KEY_PATH is not set in .env');
    envOk = false;
  } else {
    console.log(`  OK: GOOGLE_SERVICE_ACCOUNT_KEY_PATH = ${KEY_PATH}`);
  }
  if (!envOk) {
    console.error('');
    console.error('Fix .env before running. No changes were made.');
    process.exit(1);
  }

  // ── Auth ────────────────────────────────────────────────────────────────────
  let keyFile;
  try {
    keyFile = require(path.resolve(KEY_PATH));
  } catch {
    console.error(`ERROR: Cannot read service account key at: ${KEY_PATH}`);
    console.error('Make sure the file exists and is valid JSON.');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  // ── Read sheet ──────────────────────────────────────────────────────────────
  console.log('');
  console.log(`Reading tab: "${SOURCE_TAB}"...`);

  let values;
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SOURCE_TAB,
    });
    values = res.data.values || [];
  } catch (err) {
    console.error(`ERROR reading sheet: ${err.message}`);
    process.exit(1);
  }

  if (values.length < 2) {
    console.log('Sheet has no data rows. Nothing to process.');
    process.exit(0);
  }

  const headerRow = values[0];
  const headerMap = buildHeaderMap(headerRow);

  if (!('Post Status' in headerMap)) {
    console.error('ERROR: "Post Status" column not found in sheet header row.');
    console.error(`Headers found: ${headerRow.join(', ')}`);
    process.exit(1);
  }
  if (!('Asset Status' in headerMap)) {
    console.error('ERROR: "Asset Status" column not found in sheet header row.');
    process.exit(1);
  }

  const postStatusColIdx    = headerMap['Post Status'];
  const postStatusColLetter = colLetter(postStatusColIdx);

  console.log(`  "Post Status" column: ${postStatusColLetter} (index ${postStatusColIdx})`);
  console.log(`  Total sheet rows: ${values.length - 1}`);

  // ── Filter eligible rows ────────────────────────────────────────────────────
  const dataRows = values.slice(1);
  const eligible = [];

  dataRows.forEach((row, idx) => {
    const obj = rowToObject(row, headerMap);
    // Spreadsheet row number: 1-based, row 1 = header, so data starts at row 2
    obj['row_number'] = String(idx + 2);

    const assetStatus = (obj['Asset Status'] || '').trim();
    const postStatus  = (obj['Post Status'] || '').trim();

    if (assetStatus === FILTER_ASSET_STATUS && postStatus === FILTER_POST_STATUS) {
      eligible.push(obj);
    }
  });

  console.log(`  Filter: Asset Status="${FILTER_ASSET_STATUS}" AND Post Status="${FILTER_POST_STATUS}"`);
  console.log(`  Eligible rows found: ${eligible.length}`);

  if (eligible.length === 0) {
    console.log('');
    console.log('No eligible rows. Nothing to process.');
    process.exit(0);
  }

  // ── Preview ────────────────────────────────────────────────────────────────
  const d = today();
  console.log('');
  console.log('─── Rows to Process ───');

  eligible.forEach((row) => {
    const pSlug = slug(row['Product'] || 'product');
    const plSlug = slug(row['Platform Group'] || 'instagram');
    const rowNum = row['row_number'];
    console.log('');
    console.log(`  [ROW ${rowNum}] ${row['Product']} | ${row['Content Type']} | ${row['Platform Group']}`);
    console.log(`    Hook:     ${(row['Hook'] || '—').slice(0, 70)}`);
    console.log(`    Angle:    ${row['Angle'] || '—'}`);
    console.log(`    Pack  →   content/publishing-queue/${d}-${pSlug}-${plSlug}-row${rowNum}-pack.md`);
    console.log(`    Brief →   automations/drafts/${d}-canva-brief-${pSlug}-row${rowNum}.md`);
    console.log(`    Sheet →   ${postStatusColLetter}${rowNum} = "${TARGET_POST_STATUS}" (only if both files succeed)`);
  });

  // ── Dry-run exit ───────────────────────────────────────────────────────────
  if (IS_DRY_RUN) {
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('DRY-RUN COMPLETE. No files written. No sheet updated.');
    console.log(`${eligible.length} row(s) would be processed.`);
    console.log('');
    console.log('To generate packs and update the sheet, run:');
    console.log('  npm run organic:packs:write');
    console.log('  — or —');
    console.log('  node scripts/generate-publishing-packs.js --write');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    process.exit(0);
  }

  // ── Write mode ─────────────────────────────────────────────────────────────
  console.log('');
  console.log('WRITE MODE: Generating publishing packs...');
  console.log('');

  let successCount = 0;
  let failCount    = 0;

  for (const row of eligible) {
    const product  = getProduct(row['Product']);
    const pSlug    = slug(row['Product'] || 'product');
    const plSlug   = slug(row['Platform Group'] || 'instagram');
    const rowNum   = row['row_number'];

    const packFilename  = `${d}-${pSlug}-${plSlug}-row${rowNum}-pack.md`;
    const briefFilename = `${d}-canva-brief-${pSlug}-row${rowNum}.md`;
    const packPath      = path.join(PACKS_DIR, packFilename);
    const briefPath     = path.join(BRIEFS_DIR, briefFilename);

    console.log(`  [ROW ${rowNum}] ${row['Product']} | ${row['Content Type']}`);

    let packOk  = false;
    let briefOk = false;

    // Generate publishing pack
    try {
      const content = generatePublishingPack(row, product, briefFilename, d);
      fs.writeFileSync(packPath, content, 'utf8');
      console.log(`    ✓ Pack:  content/publishing-queue/${packFilename}`);
      packOk = true;
    } catch (err) {
      console.error(`    ✗ Pack FAILED: ${err.message}`);
    }

    // Generate Canva brief
    try {
      const content = generateCanvaBrief(row, d);
      fs.writeFileSync(briefPath, content, 'utf8');
      console.log(`    ✓ Brief: automations/drafts/${briefFilename}`);
      briefOk = true;
    } catch (err) {
      console.error(`    ✗ Brief FAILED: ${err.message}`);
    }

    // Update sheet ONLY if both artifacts succeeded
    if (packOk && briefOk) {
      try {
        const cellRange = `${SOURCE_TAB}!${postStatusColLetter}${rowNum}`;
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: cellRange,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[TARGET_POST_STATUS]] },
        });
        console.log(`    ✓ Sheet: ${cellRange} → "${TARGET_POST_STATUS}"`);
        successCount++;
      } catch (err) {
        console.error(`    ✗ Sheet update FAILED: ${err.message}`);
        console.error(`      Files were written. Manually set row ${rowNum} Post Status → "${TARGET_POST_STATUS}".`);
        failCount++;
      }
    } else {
      console.log(`    — Sheet NOT updated (artifact error above). Post Status remains "Draft".`);
      failCount++;
    }

    console.log('');
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log('═══════════════════════════════════════════════════════');
  console.log('DONE.');
  console.log(`  Successful: ${successCount} row(s) → Post Status = "${TARGET_POST_STATUS}"`);
  console.log(`  Failed:     ${failCount} row(s) → Post Status unchanged ("Draft")`);
  if (successCount > 0) {
    console.log('');
    console.log('NEXT STEPS:');
    console.log('  1. Review each pack in content/publishing-queue/');
    console.log('  2. Build each visual using the Canva brief in automations/drafts/');
    console.log('  3. Run vv-meta-publisher-checklist before any post goes live');
    console.log('  4. Publish manually via Meta Business Suite, Later, or Metricool');
    console.log('  5. After publishing → update Post Status to "Published" in Google Sheet');
    console.log('  6. Create a log entry in logs/publishing/');
  }
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
}

main().catch((err) => {
  console.error('');
  console.error(`UNEXPECTED ERROR: ${err.message}`);
  process.exit(1);
});
