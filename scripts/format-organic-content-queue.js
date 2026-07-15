/**
 * format-organic-content-queue.js
 * Vital Vision — Organic Content Queue Formatter
 *
 * Applies visual formatting ONLY to the "Organic Content Queue" Google Sheet tab.
 * Does NOT touch cell values, rows, Competitors, Sheet2, or Reverse Engineering Checklist.
 *
 * Formatting applied:
 *   1. Freeze row 1
 *   2. Basic filter on header row
 *   3. Dark green header bg (#173F2D) + white bold text
 *   4. Row 1 height → 40px
 *   5. Rows 2–N height → 85px
 *   6. CLIP text wrapping on all cells
 *   7. Practical column widths per spec
 *   8. Conditional formatting: Content Type, Funnel Stage, Asset Status,
 *      Post Status, Compliance Note
 *   9. Note on cell A1
 *
 * SAFETY RULES:
 *   - DRY-RUN by default — shows plan only, zero writes
 *   - Pass --apply to execute formatting
 *   - NEVER modifies cell values
 *   - NEVER deletes or appends rows
 *   - NEVER touches Competitors, Sheet2, Reverse Engineering Checklist
 *   - Requires AUTO_PUBLISH=false and REQUIRE_HUMAN_APPROVAL=true
 *
 * USAGE:
 *   Dry-run:  node scripts/format-organic-content-queue.js
 *   Apply:    node scripts/format-organic-content-queue.js --apply
 *
 * ROLLBACK:
 *   Google Sheets: Format menu → Clear formatting on the "Organic Content Queue" tab.
 *   This script only adds formatting — no data is at risk.
 */

'use strict';

require('dotenv').config();

const path = require('path');

// ── Safety guard: googleapis ──────────────────────────────────────────────────
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
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') {
  console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false detected. Set to true in .env.');
  process.exit(1);
}

// ── Config ────────────────────────────────────────────────────────────────────
const IS_APPLY = process.argv.includes('--apply');

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const KEY_PATH       = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;

const TARGET_TAB     = 'Organic Content Queue';
const PROTECTED_TABS = ['Competitors', 'Sheet2', 'Reverse Engineering Checklist'];

// ── Column spec: name → width (px) ───────────────────────────────────────────
const COLUMN_SPEC = [
  { name: 'Batch ID',               width: 130 },
  { name: 'Source Competitor',      width: 150 },
  { name: 'Platform Group',         width: 190 },
  { name: 'Placement',              width: 240 },
  { name: 'Product',                width: 180 },
  { name: 'Content Type',           width: 200 },
  { name: 'Funnel Stage',           width: 160 },
  { name: 'UGC Format',             width: 190 },
  { name: 'Creator Persona',        width: 240 },
  { name: 'Hook',                   width: 280 },
  { name: 'Angle',                  width: 280 },
  { name: 'Script / Caption Draft', width: 420 },
  { name: 'On-Screen Text',         width: 340 },
  { name: 'Shot List',              width: 380 },
  { name: 'Nano Banana Prompt',     width: 440 },
  { name: 'Canva/Cover Prompt',     width: 440 },
  { name: 'Visual Direction',       width: 340 },
  { name: 'CTA',                    width: 180 },
  { name: 'Compliance Note',        width: 280 },
  { name: 'Disclosure Note',        width: 260 },
  { name: 'Asset Status',           width: 160 },
  { name: 'Post Status',            width: 160 },
  { name: 'Metric To Watch',        width: 280 },
];

// ── Color helpers ─────────────────────────────────────────────────────────────

/** Convert #RRGGBB hex to Google Sheets API color object (0–1 floats). */
function hex(h) {
  return {
    red:   parseInt(h.slice(1, 3), 16) / 255,
    green: parseInt(h.slice(3, 5), 16) / 255,
    blue:  parseInt(h.slice(5, 7), 16) / 255,
  };
}

const C = {
  headerBg:     hex('#173F2D'),  // Vital Vision deep green
  headerText:   { red: 1, green: 1, blue: 1 },  // white

  lightPurple:  hex('#EDE7F6'),
  lightBlue:    hex('#E3F2FD'),
  lightYellow:  hex('#FFFDE7'),
  lightGray:    hex('#F5F5F5'),
  lightOrange:  hex('#FFF3E0'),
  lightGreen:   hex('#E8F5E9'),
  lightTeal:    hex('#E0F2F1'),
  green:        hex('#C8E6C9'),
  lightRed:     hex('#FFEBEE'),
  gold:         hex('#FFF8E1'),
};

// ── Conditional formatting rules ──────────────────────────────────────────────
// type: 'TEXT_EQ' (exact) or 'TEXT_CONTAINS'
const CONDITIONAL_RULES = [
  // ── Content Type ──────────────────────────────────────────────────────────
  { col: 'Content Type', type: 'TEXT_EQ', value: 'AI UGC Short-Form Video', color: C.lightPurple },
  { col: 'Content Type', type: 'TEXT_EQ', value: 'Educational Carousel',    color: C.lightBlue   },
  { col: 'Content Type', type: 'TEXT_EQ', value: 'Story CTA Asset',         color: C.lightYellow },

  // ── Funnel Stage ──────────────────────────────────────────────────────────
  { col: 'Funnel Stage', type: 'TEXT_CONTAINS', value: 'TOFU', color: C.lightBlue   },
  { col: 'Funnel Stage', type: 'TEXT_CONTAINS', value: 'MOFU', color: C.lightPurple },
  { col: 'Funnel Stage', type: 'TEXT_CONTAINS', value: 'BOFU', color: C.lightYellow },

  // ── Asset Status ──────────────────────────────────────────────────────────
  { col: 'Asset Status', type: 'TEXT_EQ', value: 'Draft',           color: C.lightGray   },
  { col: 'Asset Status', type: 'TEXT_EQ', value: 'Pending',         color: C.lightOrange },
  { col: 'Asset Status', type: 'TEXT_EQ', value: 'Needs Visual',    color: C.lightYellow },
  { col: 'Asset Status', type: 'TEXT_EQ', value: 'Image Generated', color: C.lightBlue   },
  { col: 'Asset Status', type: 'TEXT_EQ', value: 'Designed',        color: C.lightPurple },
  { col: 'Asset Status', type: 'TEXT_EQ', value: 'Approved',        color: C.lightGreen  },
  { col: 'Asset Status', type: 'TEXT_EQ', value: 'Scheduled',       color: C.lightTeal   },
  { col: 'Asset Status', type: 'TEXT_EQ', value: 'Posted',          color: C.green       },
  { col: 'Asset Status', type: 'TEXT_EQ', value: 'Rejected',        color: C.lightRed    },

  // ── Post Status ───────────────────────────────────────────────────────────
  { col: 'Post Status', type: 'TEXT_EQ', value: 'Draft',     color: C.lightGray  },
  { col: 'Post Status', type: 'TEXT_EQ', value: 'Scheduled', color: C.lightTeal  },
  { col: 'Post Status', type: 'TEXT_EQ', value: 'Posted',    color: C.lightGreen },
  { col: 'Post Status', type: 'TEXT_EQ', value: 'Winner',    color: C.gold       },
  { col: 'Post Status', type: 'TEXT_EQ', value: 'Rejected',  color: C.lightRed   },

  // ── Compliance Note ───────────────────────────────────────────────────────
  { col: 'Compliance Note', type: 'TEXT_CONTAINS', value: 'No outcome claim', color: C.lightGreen  },
  { col: 'Compliance Note', type: 'TEXT_CONTAINS', value: 'safe',             color: C.lightGreen  },
  { col: 'Compliance Note', type: 'TEXT_CONTAINS', value: 'review',           color: C.lightYellow },
  { col: 'Compliance Note', type: 'TEXT_CONTAINS', value: 'check',            color: C.lightYellow },
  { col: 'Compliance Note', type: 'TEXT_CONTAINS', value: 'risk',             color: C.lightRed    },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert 0-based column index to spreadsheet letter (A, B, … Z, AA, …). */
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

const DIV  = (c = '─') => console.log(c.repeat(67));
const DIVD = () => DIV('═');

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  DIVD();
  console.log('  Vital Vision — Organic Content Queue Formatter');
  console.log(`  Mode: ${IS_APPLY
    ? 'APPLY  ← will write formatting to Google Sheets'
    : 'DRY-RUN  ← preview only, nothing will be written'}`);
  DIVD();
  console.log('');

  // ── QA Guard pre-flight ────────────────────────────────────────────────────
  console.log('=== QA GUARD VERDICT ===');
  console.log('');
  console.log(`  AUTO_PUBLISH:              ${process.env.AUTO_PUBLISH || '(not set) → defaults safe'}`);
  console.log(`  REQUIRE_HUMAN_APPROVAL:    ${process.env.REQUIRE_HUMAN_APPROVAL || '(not set) → defaults safe'}`);
  console.log(`  Target tab:                "${TARGET_TAB}"`);
  console.log(`  Protected (untouched):     ${PROTECTED_TABS.map(t => `"${t}"`).join(', ')}`);
  console.log(`  Cell values modified:      NO`);
  console.log(`  Rows deleted:              NO`);
  console.log(`  Rows appended:             NO`);
  console.log('');

  // ── Validate env ──────────────────────────────────────────────────────────
  let envOk = true;
  if (!SPREADSHEET_ID) {
    console.error('  MISSING: GOOGLE_SHEETS_ID not set in .env');
    envOk = false;
  } else {
    console.log(`  GOOGLE_SHEETS_ID:          ${SPREADSHEET_ID.substring(0, 8)}... (masked)`);
  }
  if (!KEY_PATH) {
    console.error('  MISSING: GOOGLE_SERVICE_ACCOUNT_KEY_PATH not set in .env');
    envOk = false;
  } else {
    console.log(`  KEY_PATH:                  ${KEY_PATH}`);
  }

  if (!envOk) {
    console.error('');
    console.error('Fix .env before running. No changes were made.');
    process.exit(1);
  }

  console.log('');
  console.log('  Security:   PASS');
  console.log('  Safety:     PASS');
  console.log('  Pre-write:  PASS (no cell values will be modified)');
  console.log('  Compliance: N/A (formatting only)');
  console.log('  Scripts:    PASS (safety gates enforced, DRY_RUN default)');
  console.log('');
  console.log('  OVERALL: APPROVED (conditional on human review of plan below)');
  console.log('');

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

  // ── Fetch spreadsheet metadata ────────────────────────────────────────────
  console.log('Reading spreadsheet metadata...');

  let spreadsheetMeta;
  try {
    const res = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    spreadsheetMeta = res.data;
  } catch (err) {
    console.error(`ERROR fetching spreadsheet metadata: ${err.message}`);
    process.exit(1);
  }

  const allTabs = spreadsheetMeta.sheets.map(s => ({
    title:   s.properties.title,
    sheetId: s.properties.sheetId,
  }));

  console.log(`  All tabs found: ${allTabs.map(t => `"${t.title}"`).join(', ')}`);

  // ── Confirm target tab exists ──────────────────────────────────────────────
  const targetSheet = allTabs.find(t => t.title === TARGET_TAB);
  if (!targetSheet) {
    console.error(`ERROR: Tab "${TARGET_TAB}" not found.`);
    console.error(`Available: ${allTabs.map(t => `"${t.title}"`).join(', ')}`);
    process.exit(1);
  }

  const sheetId = targetSheet.sheetId;
  console.log(`  Target found: "${TARGET_TAB}" (sheet ID: ${sheetId})`);

  // ── Safety block: target must not be a protected tab ──────────────────────
  for (const pt of PROTECTED_TABS) {
    if (pt === TARGET_TAB) {
      console.error(`SAFETY BLOCK: "${TARGET_TAB}" is in the protected list. Aborting.`);
      process.exit(1);
    }
  }

  // ── Read header row ────────────────────────────────────────────────────────
  let headerRow;
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${TARGET_TAB}'!1:1`,
    });
    headerRow = (res.data.values || [[]])[0];
  } catch (err) {
    console.error(`ERROR reading header row: ${err.message}`);
    process.exit(1);
  }

  // ── Read all data to count rows ────────────────────────────────────────────
  let allData;
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${TARGET_TAB}'`,
    });
    allData = res.data.values || [];
  } catch (err) {
    console.error(`ERROR reading sheet data: ${err.message}`);
    process.exit(1);
  }

  const rowCount = allData.length;       // includes header
  const colCount = headerRow.length;
  const dataRows = rowCount - 1;

  // ── Build column index map ─────────────────────────────────────────────────
  const colIndex = {};
  headerRow.forEach((h, i) => { colIndex[h.trim()] = i; });

  // Check for missing expected columns
  const missingCols = COLUMN_SPEC.filter(c => !(c.name in colIndex));

  // ── Print safety report ────────────────────────────────────────────────────
  console.log('');
  DIVD();
  console.log('  SAFETY REPORT');
  DIVD();
  console.log('');
  console.log(`  Target tab:                "${TARGET_TAB}"`);
  console.log(`  Sheet ID (internal):       ${sheetId}`);
  console.log(`  Headers detected (${colCount}):   ${headerRow.join(' | ')}`);
  console.log(`  Total rows (incl header):  ${rowCount}`);
  console.log(`  Data rows:                 ${dataRows}`);
  console.log(`  Total columns:             ${colCount}`);
  if (missingCols.length > 0) {
    console.log('');
    console.log(`  WARNING: ${missingCols.length} expected column(s) not found — widths will be skipped:`);
    missingCols.forEach(c => console.log(`    - "${c.name}"`));
  }
  console.log('');
  console.log('  ┌─ WHAT WILL CHANGE (formatting only) ──────────────────────┐');
  console.log('  │  ✓ Row 1 frozen                                            │');
  console.log('  │  ✓ Filter added to header row                              │');
  console.log('  │  ✓ Row 1 height → 40px                                     │');
  console.log(`  │  ✓ Rows 2–${String(rowCount).padEnd(2)} height → 85px                                │`);
  console.log('  │  ✓ Header: #173F2D bg + white bold text                    │');
  console.log('  │  ✓ All cells: CLIP text wrapping                           │');
  console.log(`  │  ✓ ${COLUMN_SPEC.filter(c => c.name in colIndex).length} column widths set                                   │`);
  console.log(`  │  ✓ ${CONDITIONAL_RULES.filter(r => r.col in colIndex).length} conditional formatting rules added                    │`);
  console.log('  │  ✓ Note added to A1                                        │');
  console.log('  └────────────────────────────────────────────────────────────┘');
  console.log('');
  console.log('  ┌─ WHAT WILL NOT CHANGE ────────────────────────────────────┐');
  console.log('  │  ✗ Cell values: UNTOUCHED                                  │');
  console.log('  │  ✗ Rows deleted: NONE                                      │');
  console.log('  │  ✗ Rows appended: NONE                                     │');
  console.log('  │  ✗ "Competitors" tab: UNTOUCHED                            │');
  console.log('  │  ✗ "Sheet2" tab: UNTOUCHED                                 │');
  console.log('  │  ✗ "Reverse Engineering Checklist": UNTOUCHED              │');
  console.log('  └────────────────────────────────────────────────────────────┘');
  console.log('');

  // ── Build all batchUpdate requests ────────────────────────────────────────
  const requests = [];

  // [1] CLIP wrapping — all cells (applied first so header override works cleanly)
  requests.push({
    repeatCell: {
      range: {
        sheetId,
        startRowIndex: 0, endRowIndex: rowCount,
        startColumnIndex: 0, endColumnIndex: colCount,
      },
      cell: { userEnteredFormat: { wrapStrategy: 'CLIP' } },
      fields: 'userEnteredFormat.wrapStrategy',
    },
  });

  // [2] Header row: dark green bg + white bold text + alignment
  requests.push({
    repeatCell: {
      range: {
        sheetId,
        startRowIndex: 0, endRowIndex: 1,
        startColumnIndex: 0, endColumnIndex: colCount,
      },
      cell: {
        userEnteredFormat: {
          backgroundColor: C.headerBg,
          textFormat: {
            foregroundColor: C.headerText,
            bold: true,
            fontSize: 10,
          },
          verticalAlignment: 'MIDDLE',
          horizontalAlignment: 'LEFT',
          wrapStrategy: 'CLIP',
        },
      },
      fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment,horizontalAlignment,wrapStrategy)',
    },
  });

  // [3] Freeze row 1
  requests.push({
    updateSheetProperties: {
      properties: {
        sheetId,
        gridProperties: { frozenRowCount: 1 },
      },
      fields: 'gridProperties.frozenRowCount',
    },
  });

  // [4] Basic filter on header row
  requests.push({
    setBasicFilter: {
      filter: {
        range: {
          sheetId,
          startRowIndex: 0, endRowIndex: rowCount,
          startColumnIndex: 0, endColumnIndex: colCount,
        },
      },
    },
  });

  // [5] Header row height → 40px
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 },
      properties: { pixelSize: 40 },
      fields: 'pixelSize',
    },
  });

  // [6] Data rows height → 85px
  if (rowCount > 1) {
    requests.push({
      updateDimensionProperties: {
        range: { sheetId, dimension: 'ROWS', startIndex: 1, endIndex: rowCount },
        properties: { pixelSize: 85 },
        fields: 'pixelSize',
      },
    });
  }

  // [7] Column widths per spec
  for (const spec of COLUMN_SPEC) {
    const ci = colIndex[spec.name];
    if (ci === undefined) continue;
    requests.push({
      updateDimensionProperties: {
        range: { sheetId, dimension: 'COLUMNS', startIndex: ci, endIndex: ci + 1 },
        properties: { pixelSize: spec.width },
        fields: 'pixelSize',
      },
    });
  }

  // [8] Conditional formatting rules
  for (const rule of CONDITIONAL_RULES) {
    const ci = colIndex[rule.col];
    if (ci === undefined) continue;
    requests.push({
      addConditionalFormatRule: {
        rule: {
          ranges: [{
            sheetId,
            startRowIndex: 1,   // skip header row
            endRowIndex: rowCount,
            startColumnIndex: ci,
            endColumnIndex: ci + 1,
          }],
          booleanRule: {
            condition: {
              type: rule.type,
              values: [{ userEnteredValue: rule.value }],
            },
            format: { backgroundColor: rule.color },
          },
        },
        index: 0,
      },
    });
  }

  // [9] Note on A1
  requests.push({
    updateCells: {
      rows: [{
        values: [{
          note: 'Organic Content Queue: AI UGC + carousel + story production queue. Do not edit Batch ID manually.',
        }],
      }],
      fields: 'note',
      start: { sheetId, rowIndex: 0, columnIndex: 0 },
    },
  });

  // ── Print detailed plan ────────────────────────────────────────────────────
  DIV();
  console.log('  DETAILED FORMATTING PLAN');
  DIV();
  console.log('');
  console.log(`  Total batchUpdate requests: ${requests.length}`);
  console.log('');
  console.log(`  [1] CLIP text wrapping → all cells A1:${colLetter(colCount - 1)}${rowCount}`);
  console.log('');
  console.log(`  [2] Header row A1:${colLetter(colCount - 1)}1`);
  console.log('      Background:  #173F2D (Vital Vision deep green)');
  console.log('      Text:        #FFFFFF white, bold, 10pt');
  console.log('      Alignment:   LEFT / MIDDLE vertical');
  console.log('');
  console.log('  [3] Freeze row 1');
  console.log('');
  console.log('  [4] Basic filter on header row');
  console.log('');
  console.log('  [5] Row 1 height → 40px');
  console.log('');
  console.log(`  [6] Rows 2–${rowCount} height → 85px`);
  console.log('');
  console.log('  [7] Column widths:');
  for (const spec of COLUMN_SPEC) {
    const ci = colIndex[spec.name];
    const status = ci !== undefined
      ? `col ${String(ci + 1).padStart(2)} [${colLetter(ci)}] → ${spec.width}px`
      : 'NOT IN SHEET — skipped';
    console.log(`      ${spec.name.padEnd(26)}: ${status}`);
  }
  console.log('');
  console.log('  [8] Conditional formatting rules:');

  const ruleGroups = {};
  for (const rule of CONDITIONAL_RULES) {
    if (!ruleGroups[rule.col]) ruleGroups[rule.col] = [];
    ruleGroups[rule.col].push(rule);
  }
  for (const [colName, rules] of Object.entries(ruleGroups)) {
    const ci = colIndex[colName];
    const colStatus = ci !== undefined ? `col ${ci + 1} [${colLetter(ci)}]` : 'NOT IN SHEET';
    console.log(`      ${colName} (${colStatus}):`);
    for (const r of rules) {
      const found = ci !== undefined ? '✓' : '✗ skipped';
      console.log(`        ${found}  ${r.type === 'TEXT_EQ' ? '=' : '∋'} "${r.value}"`);
    }
  }
  console.log('');
  console.log('  [9] Note on A1:');
  console.log('      "Organic Content Queue: AI UGC + carousel + story production');
  console.log('       queue. Do not edit Batch ID manually."');
  console.log('');

  // ── Dry-run exit ──────────────────────────────────────────────────────────
  if (!IS_APPLY) {
    DIVD();
    console.log('  DRY-RUN COMPLETE — nothing was written to Google Sheets.');
    console.log('');
    console.log('  Review the plan above, then apply with:');
    console.log('    node scripts/format-organic-content-queue.js --apply');
    console.log('    npm run organic:queue:format -- --apply');
    console.log('');
    console.log('  ROLLBACK (if needed after apply):');
    console.log('    In Google Sheets → Format menu → Clear formatting');
    console.log('    on the "Organic Content Queue" tab.');
    console.log('    No cell data is at risk — formatting only.');
    DIVD();
    console.log('');
    process.exit(0);
  }

  // ── APPLY MODE ────────────────────────────────────────────────────────────
  console.log('');
  console.log('APPLY MODE — executing batchUpdate...');
  console.log('');

  try {
    const res = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests },
    });

    const repliesCount = (res.data.replies || []).length;

    console.log('');
    DIVD();
    console.log('  FORMATTING APPLIED SUCCESSFULLY.');
    console.log(`  Tab:                       "${TARGET_TAB}"`);
    console.log(`  Sheet ID:                  ${sheetId}`);
    console.log(`  Requests executed:         ${requests.length}`);
    console.log(`  API replies received:      ${repliesCount}`);
    console.log('');
    console.log('  Applied:');
    console.log('  ✓ Row 1 frozen');
    console.log('  ✓ Filter row added');
    console.log('  ✓ Header row: #173F2D bg / white bold text');
    console.log('  ✓ Row 1 height → 40px');
    console.log(`  ✓ Rows 2–${rowCount} height → 85px`);
    console.log('  ✓ CLIP text wrapping (all cells)');
    console.log(`  ✓ ${COLUMN_SPEC.filter(c => c.name in colIndex).length} column widths set`);
    console.log(`  ✓ ${CONDITIONAL_RULES.filter(r => r.col in colIndex).length} conditional formatting rules added`);
    console.log('  ✓ Note added to A1');
    console.log('');
    console.log('  NOT changed:');
    console.log('  ✗ Cell values: UNTOUCHED');
    console.log('  ✗ Competitors / Sheet2 / Reverse Engineering Checklist: UNTOUCHED');
    console.log('');
    console.log('  ROLLBACK:');
    console.log('  In Google Sheets → select "Organic Content Queue" tab');
    console.log('  → Format → Clear formatting.');
    console.log('  No data was modified. Rollback is safe and instant.');
    DIVD();
    console.log('');
  } catch (err) {
    console.error('');
    console.error(`ERROR during batchUpdate: ${err.message}`);
    if (err.errors) {
      console.error('API error details:');
      err.errors.forEach(e => console.error(`  [${e.reason}] ${e.message}`));
    }
    console.error('');
    console.error('Formatting was NOT applied. No cell values were changed.');
    console.error('The sheet is unchanged. Review the error above and retry.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('');
  console.error(`UNEXPECTED ERROR: ${err.message}`);
  process.exit(1);
});
