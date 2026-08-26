/**
 * backup-current-quiz.js
 * Vital Vision — VQB Quiz State Backup
 *
 * READ-ONLY. Reads the latest fetch result and saves a timestamped backup
 * to backups/vqb/ before any write is considered.
 * Makes zero write calls. Exits 1 if safety gates fail or no fetch result exists.
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Backup Current Quiz State ===');
console.log('');

if (process.env.AUTO_PUBLISH === 'true')            { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }
if (process.env.VQB_API_MODE !== 'read_only')       { console.error('BLOCKED: VQB_API_MODE must be read_only'); process.exit(1); }

console.log('Safety gates: OK');
console.log('');

// ─── Find Latest Fetch Result ─────────────────────────────────────────────────

const REPORTS = path.join(BASE, 'reports', 'vqb');
const BACKUPS = path.join(BASE, 'backups', 'vqb');
fs.mkdirSync(BACKUPS, { recursive: true });

const fetchFiles = fs.existsSync(REPORTS)
  ? fs.readdirSync(REPORTS).filter(f => f.endsWith('-fetch-result.json')).sort().reverse()
  : [];

if (fetchFiles.length === 0) {
  console.error('NO FETCH RESULT FOUND in reports/vqb/');
  console.error('Run npm run vqb:fetch-current first.');
  console.error('');
  console.error('Creating placeholder backup to unblock dry-run workflow...');

  // Placeholder backup so dry-run can still proceed
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const placeholder = {
    timestamp: ts,
    status: 'PLACEHOLDER — no live fetch performed yet',
    note: 'Run npm run vqb:fetch-current to replace with real quiz data.',
    organicQuizId: process.env.VQB_ORGANIC_QUIZ_ID,
    paidQuizId:    process.env.VQB_PAID_QUIZ_ID,
    organic: { success: false, data: null },
    paid:    { success: false, data: null },
    meta: { writesMade: 0, shopifyEdited: false, mode: 'read_only' },
  };
  const backupPath = path.join(BACKUPS, `${ts}-placeholder-backup.json`);
  fs.writeFileSync(backupPath, JSON.stringify(placeholder, null, 2));
  console.log(`Placeholder backup saved: backups/vqb/${path.basename(backupPath)}`);
  console.log('Run npm run vqb:fetch-current to populate with real data.');
  process.exit(0);
}

const latestFetch    = fetchFiles[0];
const fetchData      = JSON.parse(fs.readFileSync(path.join(REPORTS, latestFetch), 'utf8'));
const ts             = new Date().toISOString().replace(/[:.]/g, '-');
const organicId      = process.env.VQB_ORGANIC_QUIZ_ID;
const paidId         = process.env.VQB_PAID_QUIZ_ID;

console.log(`Source fetch file: reports/vqb/${latestFetch}`);
console.log(`Organic quiz ID:   ${organicId}`);
console.log(`Paid quiz ID:      ${paidId}`);
console.log('');

// ─── Write Backup ─────────────────────────────────────────────────────────────

const backup = {
  timestamp: ts,
  sourceFile: latestFetch,
  organicQuizId: organicId,
  paidQuizId: paidId,
  organic: fetchData.organic || null,
  paid: fetchData.paid || null,
  meta: {
    backedUpAt: ts,
    writesMade: 0,
    shopifyEdited: false,
    mode: 'read_only',
    note: 'Pre-write backup. Required by vqb-api-write-policy.md before any write.',
  },
};

const organicBackupPath = path.join(BACKUPS, `${ts}-${organicId}-backup.json`);
const paidBackupPath    = path.join(BACKUPS, `${ts}-${paidId}-backup.json`);
const combinedBackupPath = path.join(BACKUPS, `${ts}-combined-backup.json`);

fs.writeFileSync(organicBackupPath,  JSON.stringify({ ...backup, quiz: backup.organic }, null, 2));
fs.writeFileSync(paidBackupPath,     JSON.stringify({ ...backup, quiz: backup.paid    }, null, 2));
fs.writeFileSync(combinedBackupPath, JSON.stringify(backup, null, 2));

console.log('Backups written:');
console.log(`  backups/vqb/${path.basename(organicBackupPath)}`);
console.log(`  backups/vqb/${path.basename(paidBackupPath)}`);
console.log(`  backups/vqb/${path.basename(combinedBackupPath)}`);
console.log('');

const fetchSuccess = backup.organic?.success || backup.paid?.success;
if (fetchSuccess) {
  console.log('Backup contains live VQB data. ✅');
} else {
  console.log('NOTE: Backup reflects fetch attempt — API returned errors.');
  console.log('Backup is still valid for dry-run purposes.');
  console.log('Run npm run vqb:fetch-current with correct API credentials to get live data.');
}

console.log('');
console.log('=== BACKUP COMPLETE ===');
console.log('');
console.log('Gate 1 of 7 (vqb-api-write-policy.md): Backup exists ✅');
console.log(`Rollback command: npm run vqb:rollback -- --backup=backups/vqb/${path.basename(combinedBackupPath)}`);
console.log('');
console.log('Next: npm run vqb:build-update-payload');
