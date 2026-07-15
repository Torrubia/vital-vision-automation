/**
 * queue-competitors-from-master.js
 * Vital Vision — Competitor Queue Builder for n8n
 *
 * Reads from "Competitors" tab → appends eligible rows to "n8n_Input" tab.
 *
 * SAFETY RULES:
 *   - Reads from: Competitors tab only
 *   - Writes to:  n8n_Input tab only
 *   - Never clears, renames, reorders, or deletes any column or row
 *   - Matches columns by header name, not position
 *   - Skips rows already in n8n_Input (dedup: Brand + Instagram URL)
 *   - Only copies rows where Status = "To Review" or blank
 *   - Sets Status = "queued" in n8n_Input
 *   - DRY-RUN by default — pass --write to commit changes
 *
 * PREREQUISITES:
 *   npm install googleapis dotenv
 *
 * REQUIRED .env VARIABLES:
 *   GOOGLE_SHEETS_ID              — The spreadsheet ID (from the URL)
 *   GOOGLE_SERVICE_ACCOUNT_KEY_PATH — Absolute path to your service account JSON key
 *                                     (never store the key inside this repo)
 *
 * USAGE:
 *   Dry-run:    node scripts/queue-competitors-from-master.js
 *   Write mode: node scripts/queue-competitors-from-master.js --write
 *
 * ROLLBACK:
 *   Manually delete the rows added to n8n_Input. No rows are modified in
 *   Competitors. The script only appends — it never overwrites existing rows.
 */

'use strict';

require('dotenv').config();

const path = require('path');

// ── Safety guard: block if googleapis is not installed ────────────────────────
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

// ── Config ────────────────────────────────────────────────────────────────────

const IS_DRY_RUN = !process.argv.includes('--write');

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const KEY_PATH = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;

const SOURCE_TAB = 'Competitors';
const TARGET_TAB = 'n8n_Input';

const ELIGIBLE_STATUSES = ['to review', ''];   // normalised to lowercase
const QUEUED_STATUS     = 'queued';

// Columns required to exist in the source tab (by header name)
const REQUIRED_SOURCE_COLS = ['Brand', 'Instagram URL'];
// Column that carries status in source tab
const SOURCE_STATUS_COL = 'Status';

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Build a map of { headerName → columnIndex } from a header row array.
 */
function buildHeaderMap(headerRow) {
  const map = {};
  headerRow.forEach((cell, idx) => {
    const name = String(cell).trim();
    if (name) map[name] = idx;
  });
  return map;
}

/**
 * Convert a row array into an object keyed by column header.
 */
function rowToObject(row, headerMap) {
  const obj = {};
  Object.entries(headerMap).forEach(([name, idx]) => {
    obj[name] = (row[idx] !== undefined ? String(row[idx]) : '').trim();
  });
  return obj;
}

/**
 * Build a dedupliction key from brand + Instagram URL (lowercased, trimmed).
 */
function dedupKey(brand, instagramUrl) {
  return `${brand.toLowerCase().trim()}|${instagramUrl.toLowerCase().trim()}`;
}

/**
 * Pad a row array to a given length with empty strings.
 */
function padRow(row, length) {
  while (row.length < length) row.push('');
  return row;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('=== Vital Vision — Competitor Queue Builder ===');
  console.log(`Mode: ${IS_DRY_RUN ? 'DRY-RUN (no changes will be written)' : 'WRITE MODE'}`);
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

  // ── Auth ─────────────────────────────────────────────────────────────────────
  let keyFile;
  try {
    keyFile = require(path.resolve(KEY_PATH));
  } catch {
    console.error('');
    console.error(`ERROR: Cannot read service account key at: ${KEY_PATH}`);
    console.error('Make sure the file exists and is valid JSON.');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // ── Read source: Competitors ──────────────────────────────────────────────
  console.log('');
  console.log(`Reading tab: "${SOURCE_TAB}"...`);

  let sourceValues;
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SOURCE_TAB}`,
    });
    sourceValues = res.data.values || [];
  } catch (err) {
    console.error(`ERROR reading "${SOURCE_TAB}" tab: ${err.message}`);
    process.exit(1);
  }

  if (sourceValues.length < 2) {
    console.log(`"${SOURCE_TAB}" tab has no data rows. Nothing to queue.`);
    process.exit(0);
  }

  const sourceHeaders = sourceValues[0];
  const sourceHeaderMap = buildHeaderMap(sourceHeaders);

  // Validate required columns exist in source
  for (const col of [...REQUIRED_SOURCE_COLS, SOURCE_STATUS_COL]) {
    if (!(col in sourceHeaderMap)) {
      // Status column is optional in source (blank = eligible)
      if (col === SOURCE_STATUS_COL) {
        console.log(`  NOTE: "${SOURCE_STATUS_COL}" column not found in "${SOURCE_TAB}" — all rows treated as eligible.`);
      } else {
        console.error(`ERROR: Required column "${col}" not found in "${SOURCE_TAB}" header row.`);
        console.error(`Found headers: ${sourceHeaders.join(', ')}`);
        process.exit(1);
      }
    }
  }

  console.log(`  Headers found: ${Object.keys(sourceHeaderMap).join(', ')}`);

  // Filter eligible rows from source
  const sourceDataRows = sourceValues.slice(1);
  const eligibleRows = [];

  sourceDataRows.forEach((row, idx) => {
    const obj = rowToObject(row, sourceHeaderMap);
    const status = (obj[SOURCE_STATUS_COL] || '').toLowerCase().trim();
    if (ELIGIBLE_STATUSES.includes(status)) {
      eligibleRows.push({ rowNum: idx + 2, obj, rawRow: row }); // rowNum = 1-based, +1 for header
    }
  });

  console.log(`  Total rows in "${SOURCE_TAB}": ${sourceDataRows.length}`);
  console.log(`  Eligible rows (Status = "To Review" or blank): ${eligibleRows.length}`);

  if (eligibleRows.length === 0) {
    console.log('');
    console.log('No eligible rows found. Nothing to queue.');
    process.exit(0);
  }

  // ── Read target: n8n_Input ────────────────────────────────────────────────
  console.log('');
  console.log(`Reading tab: "${TARGET_TAB}"...`);

  let targetValues;
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${TARGET_TAB}`,
    });
    targetValues = res.data.values || [];
  } catch (err) {
    console.error(`ERROR reading "${TARGET_TAB}" tab: ${err.message}`);
    console.error('Make sure the tab exists in the spreadsheet.');
    process.exit(1);
  }

  // If target is empty or has only headers, existing set is empty
  let targetHeaderMap = {};
  const existingKeys = new Set();

  if (targetValues.length > 0) {
    targetHeaderMap = buildHeaderMap(targetValues[0]);
    console.log(`  Headers found: ${Object.keys(targetHeaderMap).join(', ')}`);

    const targetDataRows = targetValues.slice(1);
    targetDataRows.forEach((row) => {
      const obj = rowToObject(row, targetHeaderMap);
      const key = dedupKey(obj['Brand'] || '', obj['Instagram URL'] || '');
      if (key !== '|') existingKeys.add(key);
    });
    console.log(`  Existing rows in "${TARGET_TAB}": ${targetDataRows.length}`);
  } else {
    console.log(`  "${TARGET_TAB}" tab appears empty (no headers found).`);
    console.log('  NOTE: Headers must exist in n8n_Input before writing. Create them manually first.');
  }

  // ── Dedup: remove rows already in n8n_Input ───────────────────────────────
  const newRows = eligibleRows.filter(({ obj }) => {
    const key = dedupKey(obj['Brand'] || '', obj['Instagram URL'] || '');
    return !existingKeys.has(key);
  });

  const skippedRows = eligibleRows.filter(({ obj }) => {
    const key = dedupKey(obj['Brand'] || '', obj['Instagram URL'] || '');
    return existingKeys.has(key);
  });

  console.log('');
  console.log('─── Deduplication Results ───');
  console.log(`  Already in "${TARGET_TAB}" (skipped): ${skippedRows.length}`);
  if (skippedRows.length > 0) {
    skippedRows.forEach(({ rowNum, obj }) => {
      console.log(`    [ROW ${rowNum}] ${obj['Brand'] || '(no brand)'} | ${obj['Instagram URL'] || '(no URL)'} — SKIP (duplicate)`);
    });
  }

  // ── Show what would be copied ─────────────────────────────────────────────
  console.log('');
  console.log(`─── Rows to Queue into "${TARGET_TAB}" (${newRows.length} total) ───`);

  if (newRows.length === 0) {
    console.log('  No new rows to add. All eligible rows are already in n8n_Input.');
    process.exit(0);
  }

  newRows.forEach(({ rowNum, obj }) => {
    console.log('');
    console.log(`  [SOURCE ROW ${rowNum}]`);
    Object.entries(obj).forEach(([key, val]) => {
      if (val) console.log(`    ${key}: ${val}`);
    });
    console.log(`    → Status (in ${TARGET_TAB}): ${QUEUED_STATUS}`);
  });

  // ── Exit here if dry-run ──────────────────────────────────────────────────
  if (IS_DRY_RUN) {
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('DRY-RUN COMPLETE. No rows were written.');
    console.log(`${newRows.length} row(s) would be appended to "${TARGET_TAB}".`);
    console.log('');
    console.log('To write these rows, run:');
    console.log('  node scripts/queue-competitors-from-master.js --write');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    process.exit(0);
  }

  // ── WRITE MODE ────────────────────────────────────────────────────────────
  console.log('');
  console.log('WRITE MODE: Appending rows to n8n_Input...');
  console.log('');

  // Build the rows to append using target header order
  // If target is empty we mirror source headers and add Status
  let outputHeaders;
  if (Object.keys(targetHeaderMap).length > 0) {
    outputHeaders = Object.keys(targetHeaderMap);
  } else {
    // Build from source headers, ensure Status is present
    outputHeaders = [...Object.keys(sourceHeaderMap)];
    if (!outputHeaders.includes('Status')) outputHeaders.push('Status');
  }

  const statusColInTarget = targetHeaderMap['Status'] !== undefined
    ? 'Status'
    : (outputHeaders.includes('Status') ? 'Status' : null);

  const rowsToAppend = newRows.map(({ obj }) => {
    // Build output row aligned to target headers
    const outputRow = outputHeaders.map((header) => {
      if (header === 'Status') return QUEUED_STATUS;
      return obj[header] || '';
    });
    return outputRow;
  });

  // Safety: verify we are NOT writing to source tab
  const writeRange = `${TARGET_TAB}`;
  if (writeRange.toLowerCase().includes(SOURCE_TAB.toLowerCase())) {
    console.error('SAFETY BLOCK: Target range appears to reference the source tab. Aborting.');
    process.exit(1);
  }

  try {
    const appendRes = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${TARGET_TAB}`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',  // never overwrites; always inserts after last row
      requestBody: {
        values: rowsToAppend,
      },
    });

    const updates = appendRes.data.updates;
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('WRITE COMPLETE.');
    console.log(`  Rows appended: ${newRows.length}`);
    console.log(`  Updated range: ${updates ? updates.updatedRange : 'n/a'}`);
    console.log(`  Tab written:   "${TARGET_TAB}" (source "${SOURCE_TAB}" was not modified)`);
    console.log('');
    console.log('ROLLBACK INSTRUCTIONS:');
    console.log(`  1. Open the Google Sheet tab "${TARGET_TAB}".`);
    console.log(`  2. Select the last ${newRows.length} row(s) that were just added.`);
    console.log('  3. Right-click → Delete rows.');
    console.log('  4. No changes were made to "Competitors" — it is unchanged.');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
  } catch (err) {
    console.error('');
    console.error(`ERROR writing to "${TARGET_TAB}": ${err.message}`);
    console.error('No partial writes occurred — Google Sheets API is atomic per request.');
    console.error('The "Competitors" tab was not modified.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('');
  console.error(`UNEXPECTED ERROR: ${err.message}`);
  process.exit(1);
});
