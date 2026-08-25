/**
 * update-canva-prompt-meta-only.js
 * Vital Vision — Canva/Cover Prompt: TikTok → Meta Cleanup
 *
 * Scans ONLY the "Canva/Cover Prompt" column in "Organic Content Queue"
 * and replaces TikTok wording with Instagram/Facebook equivalents.
 *
 * Replacements (applied in specificity order — most specific first):
 *   1. "TikTok/Reel thumbnail (9:16)"  → "Instagram/Facebook Reel cover (9:16)"
 *   2. "TikTok/Reel"                   → "Instagram/Facebook Reel"
 *   3. "TikTok"                         → "Instagram/Facebook"
 *
 * SAFETY RULES:
 *   - DRY-RUN by default — shows diff only, zero writes
 *   - Pass --apply to execute
 *   - ONLY touches "Canva/Cover Prompt" column
 *   - NEVER modifies any other column
 *   - NEVER touches Competitors, Sheet2, Reverse Engineering Checklist
 *   - NEVER deletes or appends rows
 *
 * USAGE:
 *   Dry-run:  node scripts/update-canva-prompt-meta-only.js
 *   Apply:    node scripts/update-canva-prompt-meta-only.js --apply
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

const TARGET_TAB      = 'Organic Content Queue';
const TARGET_COLUMN   = 'Canva/Cover Prompt';
const PROTECTED_TABS  = ['Competitors', 'Sheet2', 'Reverse Engineering Checklist'];

// ── Replacements — applied in order (most specific first) ────────────────────
const REPLACEMENTS = [
  {
    find:    'TikTok/Reel thumbnail (9:16)',
    replace: 'Instagram/Facebook Reel cover (9:16)',
    label:   'TikTok/Reel thumbnail (9:16) → Instagram/Facebook Reel cover (9:16)',
  },
  {
    find:    'TikTok/Reel',
    replace: 'Instagram/Facebook Reel',
    label:   'TikTok/Reel → Instagram/Facebook Reel',
  },
  {
    find:    'TikTok',
    replace: 'Instagram/Facebook',
    label:   'TikTok → Instagram/Facebook',
  },
];

/** Apply all replacements in order to a string. */
function applyReplacements(text) {
  let result = text;
  for (const { find, replace } of REPLACEMENTS) {
    // Replace all occurrences
    while (result.includes(find)) {
      result = result.replace(find, replace);
    }
  }
  return result;
}

/** Column index → spreadsheet letter (A, B, …). */
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
  console.log('  Vital Vision — Canva/Cover Prompt: TikTok → Meta Cleanup');
  console.log(`  Mode: ${IS_APPLY
    ? 'APPLY  ← will write to Google Sheets'
    : 'DRY-RUN  ← shows diff only, nothing will be written'}`);
  console.log(`  Target column: "${TARGET_COLUMN}"`);
  console.log(`  Target tab:    "${TARGET_TAB}"`);
  DIVD();
  console.log('');

  // ── Env validation ────────────────────────────────────────────────────────
  let envOk = true;
  if (!SPREADSHEET_ID) { console.error('  MISSING: GOOGLE_SHEETS_ID');                 envOk = false; }
  else                 { console.log(`  GOOGLE_SHEETS_ID: ${SPREADSHEET_ID.substring(0, 8)}... (masked)`); }
  if (!KEY_PATH)       { console.error('  MISSING: GOOGLE_SERVICE_ACCOUNT_KEY_PATH');   envOk = false; }
  else                 { console.log(`  KEY_PATH:         ${KEY_PATH}`); }
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
  console.log('Reading spreadsheet...');
  let meta;
  try {
    meta = (await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID })).data;
  } catch (err) {
    console.error(`ERROR: ${err.message}`); process.exit(1);
  }

  const allTabs = meta.sheets.map(s => s.properties.title);
  console.log(`  Tabs: ${allTabs.map(t => `"${t}"`).join(', ')}`);

  for (const pt of PROTECTED_TABS) {
    if (pt === TARGET_TAB) {
      console.error(`SAFETY BLOCK: "${TARGET_TAB}" is a protected tab.`); process.exit(1);
    }
  }
  if (!allTabs.includes(TARGET_TAB)) {
    console.error(`ERROR: Tab "${TARGET_TAB}" not found.`); process.exit(1);
  }
  console.log(`  Target tab confirmed: "${TARGET_TAB}"`);

  // ── Read all data ─────────────────────────────────────────────────────────
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
    console.log('No data rows found. Nothing to update.');
    process.exit(0);
  }

  const headerRow = rows[0];
  const dataRows  = rows.slice(1);

  // ── Map column indices ────────────────────────────────────────────────────
  const colIdx = {};
  headerRow.forEach((h, i) => { colIdx[h.trim()] = i; });

  const COL_CANVA    = colIdx[TARGET_COLUMN];
  const COL_BATCH_ID = colIdx['Batch ID'];
  const COL_CONTENT  = colIdx['Content Type'];

  if (COL_CANVA === undefined) {
    console.error(`ERROR: Column "${TARGET_COLUMN}" not found in header.`);
    console.error(`Headers: ${headerRow.join(' | ')}`);
    process.exit(1);
  }

  console.log(`  Column "${TARGET_COLUMN}": col ${COL_CANVA + 1} [${colLetter(COL_CANVA)}]`);

  // ── Scan for TikTok and build change plan ─────────────────────────────────
  const changes = [];

  dataRows.forEach((row, i) => {
    const sheetRow   = i + 2;
    const batchId    = (row[COL_BATCH_ID] || '').trim();
    const contentType= (row[COL_CONTENT]  || '').trim();
    const oldValue   = (row[COL_CANVA]    || '').trim();

    if (!oldValue.includes('TikTok')) return;   // no TikTok wording — skip

    const newValue = applyReplacements(oldValue);

    if (oldValue !== newValue) {
      changes.push({
        sheetRow,
        batchId,
        contentType,
        col: COL_CANVA,
        colLetter: colLetter(COL_CANVA),
        oldValue,
        newValue,
      });
    }
  });

  // ── Print dry-run report ──────────────────────────────────────────────────
  console.log('');
  DIVD();
  console.log('  DRY-RUN REPORT — CANVA/COVER PROMPT CLEANUP');
  DIVD();
  console.log('');
  console.log(`  Rows scanned:        ${dataRows.length}`);
  console.log(`  Rows with TikTok:    ${changes.length}`);
  console.log(`  Cells to change:     ${changes.length}`);
  console.log('');

  if (changes.length === 0) {
    console.log('  No TikTok wording found in Canva/Cover Prompt. Nothing to update.');
    DIVD();
    process.exit(0);
  }

  console.log(`  Replacement rules applied (in order):`);
  REPLACEMENTS.forEach((r, i) => {
    console.log(`    ${i + 1}. "${r.find}" → "${r.replace}"`);
  });
  console.log('');

  for (const c of changes) {
    DIV();
    console.log(`  Row ${c.sheetRow} | Batch ID: ${c.batchId} | ${c.contentType}`);
    console.log(`  Column [${c.colLetter}] ${TARGET_COLUMN}`);
    console.log('');
    console.log('  OLD:');
    console.log(`    "${c.oldValue}"`);
    console.log('');
    console.log('  NEW:');
    console.log(`    "${c.newValue}"`);
    console.log('');
  }

  DIV();
  console.log('  SAFETY CONFIRMATION');
  DIV();
  console.log('');
  console.log(`  Tab targeted:                  "${TARGET_TAB}" only`);
  console.log(`  Column targeted:               "${TARGET_COLUMN}" only`);
  console.log(`  Cells changing:                ${changes.length}`);
  console.log('  Batch IDs changed:            '+ changes.map(c => c.batchId).join(', '));
  console.log('  Sheet rows changing:          '+ changes.map(c => c.sheetRow).join(', '));
  console.log(`  Rows deleted:                  0`);
  console.log(`  Rows appended:                 0`);
  console.log(`  "Batch ID" column:             UNTOUCHED`);
  console.log(`  "Product" column:              UNTOUCHED`);
  console.log(`  "Content Type" column:         UNTOUCHED`);
  console.log(`  "Platform Group" column:       UNTOUCHED`);
  console.log(`  "Placement" column:            UNTOUCHED`);
  console.log(`  "Script / Caption Draft":      UNTOUCHED`);
  console.log(`  "Competitors" tab:             UNTOUCHED`);
  console.log(`  "Sheet2" tab:                  UNTOUCHED`);
  console.log(`  "Reverse Engineering Checklist": UNTOUCHED`);
  console.log('');

  // ── Dry-run exit ──────────────────────────────────────────────────────────
  if (!IS_APPLY) {
    DIVD();
    console.log('  DRY-RUN COMPLETE — nothing was written.');
    console.log('');
    console.log('  To apply:');
    console.log('    node scripts/update-canva-prompt-meta-only.js --apply');
    DIVD();
    console.log('');
    process.exit(0);
  }

  // ── APPLY MODE ────────────────────────────────────────────────────────────
  console.log('');
  console.log('APPLY MODE — writing to Google Sheets...');
  console.log('');

  const data = changes.map(c => ({
    range:  `'${TARGET_TAB}'!${c.colLetter}${c.sheetRow}`,
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

    console.log('');
    DIVD();
    console.log('  CANVA PROMPT CLEANUP APPLIED SUCCESSFULLY.');
    console.log(`  Cells updated:  ${res.data.totalUpdatedCells || changes.length}`);
    console.log('');
    for (const c of changes) {
      console.log(`  ✓ Row ${c.sheetRow} [${c.colLetter}] ${c.batchId}: TikTok wording removed`);
    }
    console.log('');
    console.log('  ROLLBACK: Manually revert cells in Google Sheets');
    console.log('  or re-run generate-organic-content-queue.js --write.');
    DIVD();
    console.log('');
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    if (err.errors) err.errors.forEach(e => console.error(`  [${e.reason}] ${e.message}`));
    console.error('No partial writes — Sheets API is atomic per request.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`UNEXPECTED ERROR: ${err.message}`);
  process.exit(1);
});
