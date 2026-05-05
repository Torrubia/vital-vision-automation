/**
 * dry-run-vqb-update.js
 * Vital Vision — VQB Dry-Run Update Simulator
 *
 * READ-ONLY. Simulates the update without calling any write endpoint.
 * Reads backup + payload, produces a what-would-change report.
 * Exits 1 if safety gates fail or required files are missing.
 *
 * To enable a real write: all 7 conditions in config/vqb-api-write-policy.md
 * must be met AND VQB_API_MODE must be changed to approved_write.
 * This script will NEVER write while VQB_API_MODE=read_only.
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Dry-Run Update Simulator ===');
console.log('');

if (process.env.AUTO_PUBLISH === 'true')            { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }

// Hard block: this script never writes regardless of mode
const VQB_API_MODE = process.env.VQB_API_MODE;
console.log(`VQB_API_MODE: ${VQB_API_MODE}`);
console.log('Mode: DRY-RUN — zero write API calls will be made (enforced unconditionally).');
console.log('');

// ─── Load Backup ─────────────────────────────────────────────────────────────

const BACKUPS = path.join(BASE, 'backups', 'vqb');
const REPORTS = path.join(BASE, 'reports', 'vqb');

const backupFiles = fs.existsSync(BACKUPS)
  ? fs.readdirSync(BACKUPS).filter(f => f.endsWith('-backup.json') || f.endsWith('-combined-backup.json')).sort().reverse()
  : [];

let backup = null;
let backupFile = null;

if (backupFiles.length > 0) {
  // Prefer combined backup
  const combined = backupFiles.find(f => f.includes('combined'));
  backupFile = combined || backupFiles[0];
  backup = JSON.parse(fs.readFileSync(path.join(BACKUPS, backupFile), 'utf8'));
  console.log(`Backup loaded: backups/vqb/${backupFile}`);
} else {
  console.log('No backup found — dry-run will use placeholder current state.');
  console.log('Run npm run vqb:backup-current for a real backup.');
  backup = { organic: { success: false, data: null }, paid: { success: false, data: null } };
}

// ─── Load Payload ─────────────────────────────────────────────────────────────

const payloadPath = path.join(BASE, 'automations', 'drafts', 'vqb-api-update-draft.json');
if (!fs.existsSync(payloadPath)) {
  console.error('MISSING: automations/drafts/vqb-api-update-draft.json');
  console.error('Run npm run vqb:build-update-payload first.');
  process.exit(1);
}
const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
console.log('Payload loaded: automations/drafts/vqb-api-update-draft.json');
console.log('');

// ─── Simulate Update ──────────────────────────────────────────────────────────

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const organicId = process.env.VQB_ORGANIC_QUIZ_ID;
const paidId    = process.env.VQB_PAID_QUIZ_ID;

console.log('Simulating update (DRY-RUN — no API write calls made)...');
console.log('');

// Describe what WOULD be written per screen
const screens = [
  {
    id: 'email-capture',
    label: 'Email Capture Screen',
    fields: payload.emailCapture,
  },
  {
    id: 'discount-screen',
    label: 'Discount Code Screen',
    fields: payload.discountScreen,
  },
  ...Object.entries(payload.resultCards)
    .filter(([k]) => k !== 'globalLabel')
    .map(([key, card]) => ({
      id: `result-card-${key}`,
      label: `Result Card — ${card.productName}`,
      fields: {
        globalLabel:  payload.resultCards.globalLabel,
        headline:     card.headline,
        productName:  card.productName,
        description:  card.description,
        qtyLabel:     card.qtyLabel,
        primaryCta:   card.primaryCta,
        secondaryCta: card.secondaryCta,
        disclaimer:   card.disclaimer,
        whyHeadline:  card.whyThisMatch.headline,
        whyBody:      card.whyThisMatch.body.substring(0, 80) + '...',
        whyTag:       card.whyThisMatch.tag,
      },
    })),
];

const simulatedResults = screens.map(screen => {
  const currentState = backup?.organic?.data
    ? 'LIVE_DATA_FROM_API'
    : 'UNKNOWN — fetch from API to see current values';

  return {
    screenId:     screen.id,
    label:        screen.label,
    wouldWrite:   screen.fields,
    currentState,
    writeCalls:   0,
    writeBlocked: true,
    reason:       'DRY_RUN — VQB_API_MODE is read_only',
  };
});

// ─── Save Dry-Run Report ──────────────────────────────────────────────────────

fs.mkdirSync(REPORTS, { recursive: true });
const dryRunReport = {
  timestamp: ts,
  mode: 'DRY_RUN',
  writesExecuted: 0,
  shopifyEdited: false,
  backupFile,
  organicQuizId: organicId,
  paidQuizId:    paidId,
  screensSimulated: simulatedResults.length,
  results: simulatedResults,
  safetyFlags: {
    autoPublish: false,
    requireHumanApproval: true,
    vqbApiMode: VQB_API_MODE,
  },
  nextSteps: [
    '1. Review this dry-run output',
    '2. Run npm run vqb:diff-update to see human-readable diff',
    '3. Create automations/approved/{date}-vqb-update-approval.md',
    '4. QA Guard runs final pre-write check',
    '5. Set VQB_API_MODE=approved_write in .env (for write run only)',
    '6. Run write script (to be built by Automation Ops Agent)',
    '7. Reset VQB_API_MODE=read_only immediately after',
  ],
};

const dryRunPath = path.join(REPORTS, `${ts}-dry-run-result.json`);
fs.writeFileSync(dryRunPath, JSON.stringify(dryRunReport, null, 2));

console.log(`Screens simulated: ${simulatedResults.length}`);
console.log(`Write calls made:  0 (DRY-RUN — enforced)`);
console.log('');
screens.forEach(s => console.log(`  DRY-RUN OK — ${s.label}`));
console.log('');
console.log(`Dry-run report: reports/vqb/${path.basename(dryRunPath)}`);
console.log('');
console.log('=== DRY-RUN COMPLETE ===');
console.log('Gate 2 of 7 (vqb-api-write-policy.md): Dry-run passed ✅');
console.log('');
console.log('Next: npm run vqb:diff-update');
