/**
 * update-organic-queue-meta-only.js
 * Vital Vision — Organic Content Queue: Meta-Only Migration
 *
 * Scopes the Organic Content Queue to Instagram + Facebook only.
 * Removes TikTok from Platform Group and Placement columns.
 *
 * Changes made:
 *   - Platform Group → "Meta" for all data rows
 *   - Placement (AI UGC Short-Form Video rows) → "Instagram Reels + Facebook Reels (9:16)"
 *   - Placement (Educational Carousel rows)    → "Instagram Feed + Facebook Feed (4:5)"
 *   - Placement (Story CTA Asset rows)         → "Instagram Stories + Facebook Stories (9:16)"
 *
 * SAFETY RULES:
 *   - DRY-RUN by default — shows diff only, zero writes
 *   - Pass --apply to execute
 *   - NEVER modifies cell values beyond Platform Group + Placement
 *   - NEVER touches Competitors, Sheet2, Reverse Engineering Checklist
 *   - NEVER deletes or appends rows
 *
 * USAGE:
 *   Dry-run:  node scripts/update-organic-queue-meta-only.js
 *   Apply:    node scripts/update-organic-queue-meta-only.js --apply
 *
 * ROLLBACK:
 *   Re-run the original generate-organic-content-queue.js with --write
 *   to regenerate rows, or manually revert cells in Google Sheets.
 */

'use strict';

require('dotenv').config();

const path = require('path');

// ── googleapis guard ──────────────────────────────────────────────────────────
let google;
try {
  ({ google } = require('googleapis'));
} catch {
  console.error('ERROR: googleapis not installed. Run: npm install googleapis');
  process.exit(1);
}

// ── Safety gates ──────────────────────────────────────────────────────────────
if (process.env.AUTO_PUBLISH === 'true') {
  console.error('BLOCKED: AUTO_PUBLISH=true'); process.exit(1);
}
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') {
  console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1);
}

// ── Config ────────────────────────────────────────────────────────────────────
const IS_APPLY       = process.argv.includes('--apply');
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const KEY_PATH       = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;

const TARGET_TAB     = 'Organic Content Queue';
const PROTECTED_TABS = ['Competitors', 'Sheet2', 'Reverse Engineering Checklist'];

// ── Placement mapping: Content Type → new Placement value ────────────────────
const PLACEMENT_MAP = {
  'AI UGC Short-Form Video': 'Instagram Reels + Facebook Reels (9:16)',
  'Educational Carousel':    'Instagram Feed + Facebook Feed (4:5)',
  'Story CTA Asset':         'Instagram Stories + Facebook Stories (9:16)',
};

const NEW_PLATFORM_GROUP = 'Meta';

// ── Helpers ───────────────────────────────────────────────────────────────────
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

const DIVD = () => console.log('═'.repeat(67));
const DIV  = () => console.log('─'.repeat(67));

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('');
  DIVD();
  console.log('  Vital Vision — Organic Content Queue: Meta-Only Migration');
  console.log(`  Mode: ${IS_APPLY
    ? 'APPLY  ← will write cell values to Google Sheets'
    : 'DRY-RUN  ← shows diff only, nothing will be written'}`);
  DIVD();
  console.log('');

  // ── Env validation ────────────────────────────────────────────────────────
  let envOk = true;
  if (!SPREADSHEET_ID) { console.error('  MISSING: GOOGLE_SHEETS_ID');                     envOk = false; }
  else                 { console.log(`  GOOGLE_SHEETS_ID:  ${SPREADSHEET_ID.substring(0,8)}... (masked)`); }
  if (!KEY_PATH)       { console.error('  MISSING: GOOGLE_SERVICE_ACCOUNT_KEY_PATH');       envOk = false; }
  else                 { console.log(`  KEY_PATH:          ${KEY_PATH}`); }
  if (!envOk)          { console.error('\nFix .env before running.'); process.exit(1); }

  // ── Auth ──────────────────────────────────────────────────────────────────
  let keyFile;
  try { keyFile = require(path.resolve(KEY_PATH)); }
  catch { console.error(`ERROR: Cannot read key at: ${KEY_PATH}`); process.exit(1); }

  const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  // ── Read spreadsheet metadata ─────────────────────────────────────────────
  console.log('');
  console.log('Reading spreadsheet metadata...');
  let meta;
  try {
    meta = (await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID })).data;
  } catch (err) {
    console.error(`ERROR: ${err.message}`); process.exit(1);
  }

  const allTabs = meta.sheets.map(s => s.properties.title);
  console.log(`  Tabs: ${allTabs.map(t => `"${t}"`).join(', ')}`);

  // ── Safety: target must not be a protected tab ────────────────────────────
  for (const pt of PROTECTED_TABS) {
    if (pt === TARGET_TAB) {
      console.error(`SAFETY BLOCK: "${TARGET_TAB}" is protected. Aborting.`);
      process.exit(1);
    }
  }

  if (!allTabs.includes(TARGET_TAB)) {
    console.error(`ERROR: Tab "${TARGET_TAB}" not found.`); process.exit(1);
  }
  console.log(`  Target: "${TARGET_TAB}" — confirmed`);

  // ── Read all data from target tab ─────────────────────────────────────────
  let rows;
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${TARGET_TAB}'`,
    });
    rows = res.data.values || [];
  } catch (err) {
    console.error(`ERROR reading sheet: ${err.message}`); process.exit(1);
  }

  if (rows.length < 2) {
    console.log('Sheet has no data rows. Nothing to update.');
    process.exit(0);
  }

  const headerRow  = rows[0];
  const dataRows   = rows.slice(1);   // rows[1] = sheet row 2 (1-based)

  // ── Build column index map ────────────────────────────────────────────────
  const colIdx = {};
  headerRow.forEach((h, i) => { colIdx[h.trim()] = i; });

  const COL_PLATFORM = colIdx['Platform Group'];
  const COL_PLACEMENT = colIdx['Placement'];
  const COL_CONTENT_TYPE = colIdx['Content Type'];
  const COL_BATCH_ID = colIdx['Batch ID'];
  const COL_COMPETITOR = colIdx['Source Competitor'];

  const missing = [];
  if (COL_PLATFORM    === undefined) missing.push('Platform Group');
  if (COL_PLACEMENT   === undefined) missing.push('Placement');
  if (COL_CONTENT_TYPE === undefined) missing.push('Content Type');
  if (missing.length > 0) {
    console.error(`ERROR: Required column(s) not found: ${missing.join(', ')}`);
    process.exit(1);
  }

  console.log('');
  console.log(`  Column "Platform Group": col ${COL_PLATFORM + 1} [${colLetter(COL_PLATFORM)}]`);
  console.log(`  Column "Placement":      col ${COL_PLACEMENT + 1} [${colLetter(COL_PLACEMENT)}]`);
  console.log(`  Column "Content Type":   col ${COL_CONTENT_TYPE + 1} [${colLetter(COL_CONTENT_TYPE)}]`);
  console.log('');

  // ── Build change plan ─────────────────────────────────────────────────────
  // Each change: { sheetRow, colIndex, colLetter, colName, oldValue, newValue }
  const changes = [];

  dataRows.forEach((row, i) => {
    const sheetRow    = i + 2;   // 1-based sheet row number (row 1 = header)
    const batchId     = (row[COL_BATCH_ID] || '').trim();
    const competitor  = (row[COL_COMPETITOR] || '').trim();
    const contentType = (row[COL_CONTENT_TYPE] || '').trim();
    const oldPlatform = (row[COL_PLATFORM] || '').trim();
    const oldPlacement= (row[COL_PLACEMENT] || '').trim();

    // Platform Group change
    const newPlatform = NEW_PLATFORM_GROUP;
    if (oldPlatform !== newPlatform) {
      changes.push({
        sheetRow, batchId, competitor, contentType,
        col: COL_PLATFORM,
        colLetter: colLetter(COL_PLATFORM),
        colName: 'Platform Group',
        oldValue: oldPlatform,
        newValue: newPlatform,
      });
    }

    // Placement change
    const newPlacement = PLACEMENT_MAP[contentType] || null;
    if (newPlacement && oldPlacement !== newPlacement) {
      changes.push({
        sheetRow, batchId, competitor, contentType,
        col: COL_PLACEMENT,
        colLetter: colLetter(COL_PLACEMENT),
        colName: 'Placement',
        oldValue: oldPlacement,
        newValue: newPlacement,
      });
    } else if (!newPlacement && contentType) {
      console.warn(`  WARN: No placement mapping for Content Type "${contentType}" (row ${sheetRow}) — skipped`);
    }
  });

  // ── Print diff report ─────────────────────────────────────────────────────
  console.log('');
  DIVD();
  console.log('  PROPOSED CHANGES — META-ONLY MIGRATION');
  DIVD();
  console.log('');
  console.log(`  Total rows scanned:  ${dataRows.length}`);
  console.log(`  Total cells to change: ${changes.length}`);
  console.log('');

  if (changes.length === 0) {
    console.log('  No changes needed — all rows are already Meta-only.');
    process.exit(0);
  }

  // Group by sheet row for display
  const byRow = {};
  for (const c of changes) {
    if (!byRow[c.sheetRow]) byRow[c.sheetRow] = { ...c, cols: [] };
    byRow[c.sheetRow].cols.push(c);
  }

  for (const [sheetRow, group] of Object.entries(byRow)) {
    console.log(`  ┌─ Row ${sheetRow}: [${group.batchId}] ${group.competitor} — ${group.contentType}`);
    for (const c of group.cols) {
      console.log(`  │  Column [${c.colLetter}] ${c.colName}`);
      console.log(`  │    OLD: "${c.oldValue}"`);
      console.log(`  │    NEW: "${c.newValue}"`);
    }
    console.log(`  └${'─'.repeat(65)}`);
    console.log('');
  }

  DIV();
  console.log('  SAFETY CONFIRMATION');
  DIV();
  console.log('');
  console.log(`  Target tab:                    "${TARGET_TAB}"`);
  console.log(`  Cells changing:                ${changes.length} (Platform Group + Placement only)`);
  console.log(`  Rows deleted:                  0`);
  console.log(`  Rows appended:                 0`);
  console.log(`  Other columns touched:         NONE`);
  console.log(`  "Competitors" tab:             UNTOUCHED`);
  console.log(`  "Sheet2" tab:                  UNTOUCHED`);
  console.log(`  "Reverse Engineering Checklist": UNTOUCHED`);
  console.log('');
  console.log('  NOTE: Canva/Cover Prompt cells still contain "TikTok/Reel thumbnail"');
  console.log('  in the prompt text. Per scope, those are NOT changed in this pass.');
  console.log('');

  // ── Dry-run exit ──────────────────────────────────────────────────────────
  if (!IS_APPLY) {
    DIVD();
    console.log('  DRY-RUN COMPLETE — nothing was written.');
    console.log('');
    console.log('  To apply, run:');
    console.log('    node scripts/update-organic-queue-meta-only.js --apply');
    DIVD();
    console.log('');
    process.exit(0);
  }

  // ── APPLY MODE ────────────────────────────────────────────────────────────
  console.log('');
  console.log('APPLY MODE — writing cell changes to Google Sheets...');
  console.log('');

  // Build ValueRange objects: one per changed cell (precise, no risk of overflow)
  const data = changes.map(c => ({
    range: `'${TARGET_TAB}'!${c.colLetter}${c.sheetRow}`,
    values: [[c.newValue]],
  }));

  try {
    const res = await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        valueInputOption: 'USER_ENTERED',
        data,
      },
    });

    const updatedCells  = res.data.totalUpdatedCells  || changes.length;
    const updatedRows   = res.data.totalUpdatedRows   || '—';
    const updatedCols   = res.data.totalUpdatedColumns || '—';

    console.log('');
    DIVD();
    console.log('  MIGRATION APPLIED SUCCESSFULLY.');
    console.log(`  Cells updated:  ${updatedCells}`);
    console.log(`  Rows updated:   ${updatedRows}`);
    console.log(`  Columns updated:${updatedCols}`);
    console.log('');
    console.log('  Changes applied:');
    for (const c of changes) {
      console.log(`  ✓ Row ${c.sheetRow} [${c.colLetter}] ${c.colName}: "${c.oldValue}" → "${c.newValue}"`);
    }
    console.log('');
    console.log('  ROLLBACK: Manually revert cells in Google Sheets,');
    console.log('  or re-run generate-organic-content-queue.js --write');
    console.log('  to regenerate all rows from the source script.');
    DIVD();
    console.log('');
  } catch (err) {
    console.error(`ERROR during batchUpdate: ${err.message}`);
    if (err.errors) err.errors.forEach(e => console.error(`  [${e.reason}] ${e.message}`));
    console.error('No partial writes — Google Sheets API is atomic per request.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`UNEXPECTED ERROR: ${err.message}`);
  process.exit(1);
});
