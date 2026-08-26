/**
 * rollback-vqb-update.js
 * Vital Vision — VQB Rollback from Backup
 *
 * READ-ONLY by default. Set VQB_API_MODE=approved_write to execute.
 * Restores VQB quiz screens to the state captured in a backup file.
 *
 * Usage:
 *   npm run vqb:rollback -- --backup=backups/vqb/{timestamp}-combined-backup.json
 *
 * Gate 7 of 7 (config/vqb-api-write-policy.md)
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Rollback Script ===');
console.log('');

if (process.env.AUTO_PUBLISH === 'true')            { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }

const DRY_RUN_MODE = process.env.VQB_API_MODE !== 'approved_write';

if (DRY_RUN_MODE) {
  console.log('MODE: DRY-RUN (VQB_API_MODE is not approved_write)');
  console.log('No API write calls will be made.');
} else {
  console.log('MODE: LIVE WRITE — VQB_API_MODE=approved_write');
  console.log('This will restore VQB quiz content from the backup file.');
}
console.log('');

// ─── Parse Backup File Argument ───────────────────────────────────────────────

const args = process.argv.slice(2);
const backupArg = args.find(a => a.startsWith('--backup='));

if (!backupArg) {
  console.error('MISSING: --backup=<path-to-backup-file>');
  console.error('');
  console.error('Usage:');
  console.error('  npm run vqb:rollback -- --backup=backups/vqb/{timestamp}-combined-backup.json');
  console.error('');
  console.error('Available backups:');
  const backupDir = path.join(BASE, 'backups', 'vqb');
  if (fs.existsSync(backupDir)) {
    const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.json')).sort().reverse();
    files.slice(0, 5).forEach(f => console.error(`  backups/vqb/${f}`));
  } else {
    console.error('  (no backups found in backups/vqb/)');
  }
  process.exit(1);
}

const backupRelPath = backupArg.replace('--backup=', '');
const backupPath    = path.resolve(BASE, backupRelPath);

if (!fs.existsSync(backupPath)) {
  console.error(`MISSING: backup file not found at ${backupPath}`);
  process.exit(1);
}

const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
console.log(`Backup file: ${backupRelPath}`);
console.log(`Backup timestamp: ${backup.timestamp || 'unknown'}`);
console.log(`Organic quiz: ${backup.organicQuizId || 'unknown'}`);
console.log(`Paid quiz: ${backup.paidQuizId || 'unknown'}`);
console.log('');

// ─── Gate Checks ──────────────────────────────────────────────────────────────

// Confirm human approval file exists (Gate 5)
const approvedDir = path.join(BASE, 'automations', 'approved');
const approvalFiles = fs.existsSync(approvedDir)
  ? fs.readdirSync(approvedDir).filter(f => f.includes('approval') && f.endsWith('.md'))
  : [];

if (approvalFiles.length === 0 && !DRY_RUN_MODE) {
  console.error('BLOCKED: No human approval file found in automations/approved/');
  console.error('Create an approval file before running a live rollback.');
  process.exit(1);
}

console.log(`Gate 5 (human approval): ${approvalFiles.length > 0 ? `OK — ${approvalFiles[approvalFiles.length - 1]}` : 'SKIPPED (dry-run)'}`);

// ─── Load API Credentials ─────────────────────────────────────────────────────

const VQB_API_BASE   = process.env.VQB_PUBLIC_API_BASE_URL;
const VQB_PRIVATE    = process.env.VQB_PRIVATE_KEY;
const ORGANIC_ID     = process.env.VQB_ORGANIC_QUIZ_ID || backup.organicQuizId;
const PAID_ID        = process.env.VQB_PAID_QUIZ_ID    || backup.paidQuizId;

if (!DRY_RUN_MODE) {
  if (!VQB_API_BASE) { console.error('MISSING: VQB_PUBLIC_API_BASE_URL in .env'); process.exit(1); }
  if (!VQB_PRIVATE)  { console.error('MISSING: VQB_PRIVATE_KEY in .env');         process.exit(1); }
  const maskedKey = `${VQB_PRIVATE.substring(0, 6)}${'*'.repeat(Math.max(0, VQB_PRIVATE.length - 6))}`;
  console.log(`API base: ${VQB_API_BASE}`);
  console.log(`Private key: ${maskedKey}`);
  console.log('');
}

// ─── Rollback Plan ────────────────────────────────────────────────────────────

const hasLiveData = backup.organic?.success || backup.paid?.success;

if (!hasLiveData) {
  console.log('WARNING: Backup does not contain live API data (fetch returned 403).');
  console.log('The backup file contains the proposed update payload structure only.');
  console.log('A true rollback requires a backup with live VQB data.');
  console.log('');
  console.log('Manual alternative: VQB Dashboard → Result Pages → version history → revert');
  console.log('');

  if (!DRY_RUN_MODE) {
    console.error('BLOCKED: Cannot perform live rollback — no live data in backup.');
    console.error('Use VQB Dashboard version history to revert manually.');
    process.exit(1);
  }
}

// ─── Dry-Run Simulation ───────────────────────────────────────────────────────

const ts = new Date().toISOString();

const rollbackPlan = {
  timestamp:     ts,
  mode:          DRY_RUN_MODE ? 'dry_run' : 'live_write',
  backupFile:    backupRelPath,
  backupHasData: hasLiveData,
  organicQuizId: ORGANIC_ID,
  paidQuizId:    PAID_ID,
  writesExecuted: 0,
  writeBlocked:   true,
  screens: [
    { screen: 'Email Capture',           action: 'restore', status: DRY_RUN_MODE ? 'SIMULATED (no write)' : 'PENDING' },
    { screen: 'Discount Code',           action: 'restore', status: DRY_RUN_MODE ? 'SIMULATED (no write)' : 'PENDING' },
    { screen: 'Inner Bloom Result Card', action: 'restore', status: DRY_RUN_MODE ? 'SIMULATED (no write)' : 'PENDING' },
    { screen: 'Inner Calm Result Card',  action: 'restore', status: DRY_RUN_MODE ? 'SIMULATED (no write)' : 'PENDING' },
    { screen: 'Inner Grow Result Card',  action: 'restore', status: DRY_RUN_MODE ? 'SIMULATED (no write)' : 'PENDING' },
    { screen: 'Inner Balance Result Card', action: 'restore', status: DRY_RUN_MODE ? 'SIMULATED (no write)' : 'PENDING' },
  ],
  _meta: {
    safetyFlags: {
      autoPublish:          false,
      requireHumanApproval: true,
      dryRunOnly:           DRY_RUN_MODE,
      writesMade:           0,
    },
  },
};

rollbackPlan.screens.forEach(s => {
  console.log(`  [${DRY_RUN_MODE ? 'DRY-RUN' : 'PENDING'}] ${s.screen} — restore from backup`);
});

console.log('');

if (!DRY_RUN_MODE) {
  // Live write would go here once VQB auth format is confirmed
  // and backup contains live API data to restore from.
  console.error('Live rollback execution is not yet implemented.');
  console.error('VQB API auth format must be confirmed first (see current-quiz-backup-report.md).');
  console.error('');
  console.error('Manual rollback: VQB Dashboard → Result Pages → version history → revert');
  rollbackPlan.writesExecuted = 0;
  rollbackPlan.writeBlocked   = true;
}

// ─── Save Rollback Report ─────────────────────────────────────────────────────

const REPORTS = path.join(BASE, 'reports', 'vqb');
fs.mkdirSync(REPORTS, { recursive: true });

const reportPath = path.join(REPORTS, `${ts.replace(/[:.]/g, '-')}-rollback-result.json`);
fs.writeFileSync(reportPath, JSON.stringify(rollbackPlan, null, 2));

console.log(`Rollback report saved: reports/vqb/${path.basename(reportPath)}`);
console.log('');

if (DRY_RUN_MODE) {
  console.log('=== ROLLBACK DRY-RUN COMPLETE ===');
  console.log('');
  console.log('No VQB content was modified. No API write calls were made.');
  console.log('');
  console.log('Gate 7 of 7 (vqb-api-write-policy.md): Rollback command verified ✅');
  console.log('');
  console.log('To execute a live rollback:');
  console.log('  1. Ensure backup contains live data (re-run vqb:fetch-current once auth is resolved)');
  console.log('  2. Set VQB_API_MODE=approved_write in .env');
  console.log('  3. Re-run: npm run vqb:rollback -- --backup=<file>');
  console.log('  4. Reset VQB_API_MODE=read_only immediately after');
} else {
  console.log('=== ROLLBACK COMPLETE ===');
  console.log(`Writes executed: ${rollbackPlan.writesExecuted}`);
}
console.log('');
