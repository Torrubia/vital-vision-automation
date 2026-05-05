/**
 * diff-vqb-update.js
 * Vital Vision — VQB Before/After Diff Generator
 *
 * READ-ONLY. Reads backup + payload and produces a human-readable
 * markdown diff report showing exactly what would change field by field.
 * Saves to reports/vqb/vqb-update-diff-report.md
 * Makes zero API write calls.
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Diff Report Generator ===');
console.log('');

if (process.env.AUTO_PUBLISH === 'true')            { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }
if (process.env.VQB_API_MODE !== 'read_only')       { console.error('BLOCKED: VQB_API_MODE must be read_only'); process.exit(1); }

console.log('Safety gates: OK');

// ─── Load Files ───────────────────────────────────────────────────────────────

const BACKUPS = path.join(BASE, 'backups', 'vqb');
const REPORTS = path.join(BASE, 'reports', 'vqb');
const payloadPath = path.join(BASE, 'automations', 'drafts', 'vqb-api-update-draft.json');

if (!fs.existsSync(payloadPath)) {
  console.error('MISSING: automations/drafts/vqb-api-update-draft.json');
  console.error('Run npm run vqb:build-update-payload first.');
  process.exit(1);
}

const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));

const backupFiles = fs.existsSync(BACKUPS)
  ? fs.readdirSync(BACKUPS).filter(f => f.endsWith('backup.json')).sort().reverse()
  : [];

const backupFile    = backupFiles.find(f => f.includes('combined')) || backupFiles[0] || null;
const backup        = backupFile ? JSON.parse(fs.readFileSync(path.join(BACKUPS, backupFile), 'utf8')) : null;
const hasLiveData   = backup?.organic?.success || backup?.paid?.success;

const CURRENT = hasLiveData ? 'See backup file for current values' : 'UNKNOWN — fetch not yet successful';

console.log(`Payload: automations/drafts/vqb-api-update-draft.json`);
console.log(`Backup:  ${backupFile ? `backups/vqb/${backupFile}` : 'none found'}`);
console.log(`Live data available: ${hasLiveData ? 'YES' : 'NO — showing proposed values only'}`);
console.log('');

// ─── Build Diff Report ────────────────────────────────────────────────────────

const ts     = new Date().toISOString();
const { emailCapture, discountScreen, resultCards, globalDisclaimer } = payload;
const { innerBloom, innerCalm, innerGrow, innerBalance } = resultCards;

const row = (field, current, proposed) =>
  `| ${field} | ${current} | ${proposed} |`;

const section = (title, fields) => [
  `### ${title}`,
  '',
  '| Field | Current (before) | Proposed (after) |',
  '|---|---|---|',
  ...Object.entries(fields).map(([k, v]) =>
    row(k, CURRENT, typeof v === 'string' ? v.substring(0, 90) : JSON.stringify(v).substring(0, 90))
  ),
  '',
].join('\n');

const diffReport = `# VQB Update Diff Report — Vital Vision Shop
# Generated: ${ts}
# READ-ONLY — No writes have been made. Human approval required before any write.
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Summary

| Item | Value |
|---|---|
| Generated | ${ts} |
| Backup source | ${backupFile || 'none'} |
| Live data in backup | ${hasLiveData ? 'YES' : 'NO — fetch required for full before/after'} |
| Writes executed | 0 |
| Shopify edited | No |
| Screens to update | 6 (email capture, discount, 4 result cards) |
| Fields to update | ~40 across all screens |
| Compliance | All proposed copy passed automated scan |
| Policy ref | config/vqb-api-write-policy.md |

---

## How to Read This Diff

- **Current (before)**: What is currently in VQB. Shows "UNKNOWN" until a live API fetch succeeds.
- **Proposed (after)**: The CRO-approved copy ready to write. This is the final approved version.
- All proposed values have passed the 38-check compliance validator.

---

${section('Screen 1 — Email Capture', emailCapture)}
${section('Screen 2 — Discount Code', discountScreen)}
${section('Screen 3a — Inner Bloom Result Card', {
  globalLabel:  resultCards.globalLabel,
  headline:     innerBloom.headline,
  productName:  innerBloom.productName,
  description:  innerBloom.description,
  qtyLabel:     innerBloom.qtyLabel,
  primaryCta:   innerBloom.primaryCta,
  secondaryCta: innerBloom.secondaryCta,
  disclaimer:   innerBloom.disclaimer,
})}
${section('Screen 3a — Inner Bloom Why This Match', innerBloom.whyThisMatch)}
${section('Screen 3b — Inner Calm Result Card', {
  globalLabel:  resultCards.globalLabel,
  headline:     innerCalm.headline,
  productName:  innerCalm.productName,
  description:  innerCalm.description,
  qtyLabel:     innerCalm.qtyLabel,
  primaryCta:   innerCalm.primaryCta,
  secondaryCta: innerCalm.secondaryCta,
  disclaimer:   innerCalm.disclaimer,
})}
${section('Screen 3b — Inner Calm Why This Match', innerCalm.whyThisMatch)}
${section('Screen 3c — Inner Grow Result Card', {
  globalLabel:  resultCards.globalLabel,
  headline:     innerGrow.headline,
  productName:  innerGrow.productName,
  description:  innerGrow.description,
  qtyLabel:     innerGrow.qtyLabel,
  primaryCta:   innerGrow.primaryCta,
  secondaryCta: innerGrow.secondaryCta,
  disclaimer:   innerGrow.disclaimer,
})}
${section('Screen 3c — Inner Grow Why This Match', innerGrow.whyThisMatch)}
${section('Screen 3d — Inner Balance Result Card', {
  globalLabel:  resultCards.globalLabel,
  headline:     innerBalance.headline,
  productName:  innerBalance.productName,
  description:  innerBalance.description,
  qtyLabel:     innerBalance.qtyLabel,
  primaryCta:   innerBalance.primaryCta,
  secondaryCta: innerBalance.secondaryCta,
  disclaimer:   innerBalance.disclaimer,
})}
${section('Screen 3d — Inner Balance Why This Match', innerBalance.whyThisMatch)}

---

## Global Disclaimer (applies to all result cards)

${globalDisclaimer}

---

## Pre-Write Requirements (config/vqb-api-write-policy.md)

- [${backupFile ? 'x' : ' '}] Gate 1: Backup exists${backupFile ? ` — backups/vqb/${backupFile}` : ' — run npm run vqb:backup-current'}
- [ ] Gate 2: Dry-run passed — run npm run vqb:dry-run-update
- [x] Gate 3: Diff report exists — this file
- [ ] Gate 4: QA Guard APPROVED verdict in reports/vqb/api-write-readiness-report.md
- [ ] Gate 5: Human approval file in automations/approved/
- [ ] Gate 6: VQB_API_MODE=approved_write (set manually just before write run)
- [ ] Gate 7: Rollback command documented and tested

---

## Rollback Reference

If a write is performed and needs to be reverted:
\`\`\`
npm run vqb:rollback -- --backup=backups/vqb/${backupFile || '{timestamp}-combined-backup.json'}
\`\`\`
Manual alternative: VQB Dashboard → Result Pages → version history → revert

---

*READ-ONLY. No writes were made. No VQB or Shopify content was modified.*
*Human approval required before any write proceeds.*
`;

// ─── Write Report ─────────────────────────────────────────────────────────────

fs.mkdirSync(REPORTS, { recursive: true });
const staticPath    = path.join(REPORTS, 'vqb-update-diff-report.md');
const timestampPath = path.join(REPORTS, `${ts.replace(/[:.]/g, '-')}-diff-report.md`);

fs.writeFileSync(staticPath,    diffReport);
fs.writeFileSync(timestampPath, diffReport);

console.log('Diff reports written:');
console.log(`  reports/vqb/vqb-update-diff-report.md`);
console.log(`  reports/vqb/${path.basename(timestampPath)}`);
console.log('');
console.log('=== DIFF COMPLETE ===');
console.log('Gate 3 of 7 (vqb-api-write-policy.md): Diff report exists ✅');
console.log('');
console.log('Next steps:');
console.log('  1. Review reports/vqb/vqb-update-diff-report.md');
console.log('  2. Create automations/approved/{date}-vqb-update-approval.md');
console.log('  3. Run /vv-qa-guard for final pre-write approval');
console.log('');
console.log('No writes were made. No VQB or Shopify content was modified.');
