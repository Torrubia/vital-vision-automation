/**
 * check-result-page-compliance.js
 * Vital Vision — Result Page Copy Compliance Scanner
 *
 * Scans drafts/pagefly/ and reports/vqb/ for prohibited medical claims,
 * disease language, guaranteed outcome language, and FTC/FDA violations.
 *
 * Makes zero API calls. Does not modify any file. Read-only.
 *
 * Usage: npm run result:check-copy
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Prohibited Terms ─────────────────────────────────────────────────────────
// Word-boundary regex. "heal" will NOT match "healthy". "treat" will NOT match "treatment goal".

const PROHIBITED = [
  // Disease claims
  { term: 'cure',              pattern: /\bcure[sd]?\b/gi,                            reason: 'Disease claim' },
  { term: 'treat',             pattern: /\btreats?\b/gi,                              reason: 'Disease claim' },
  { term: 'prevent',           pattern: /\bprevents?\b|\bprevention\b/gi,             reason: 'Disease claim' },
  { term: 'diagnose',          pattern: /\bdiagnoses?\b|\bdiagnosis\b/gi,             reason: 'Disease claim' },
  { term: 'reverse',           pattern: /\breverse[sd]?\b|\breversing\b/gi,           reason: 'Disease claim' },
  { term: 'heal',              pattern: /\bheals?\b|\bhealed\b|\bhealing\b/gi,        reason: 'Disease claim (not "healthy")' },
  // Guaranteed outcomes
  { term: 'guaranteed',        pattern: /\bguaranteed?\b/gi,                          reason: 'Guarantee claim' },
  { term: 'results guaranteed',pattern: /\bresults? guaranteed\b/gi,                  reason: 'Guarantee claim' },
  { term: 'will cure',         pattern: /\bwill cure\b/gi,                            reason: 'Absolute disease claim' },
  { term: 'permanently',       pattern: /\bpermanently\b/gi,                          reason: 'Absolute outcome claim' },
  { term: 'eliminates',        pattern: /\beliminates?\b/gi,                          reason: 'Absolute outcome claim' },
  { term: 'proven results',    pattern: /\bproven results?\b/gi,                      reason: 'Unsubstantiated claim' },
  // Authority / approval claims
  { term: 'fda approved',      pattern: /\bfda[\s-]?approved\b/gi,                    reason: 'Supplements not FDA approved' },
  { term: 'doctor recommended',pattern: /\bdoctor[\s-]?recommended\b/gi,              reason: 'Unverified authority claim' },
  { term: 'physician approved',pattern: /\bphysician[\s-]?approved\b/gi,              reason: 'Unverified authority claim' },
  { term: 'clinically proven', pattern: /\bclinically proven\b/gi,                    reason: 'Requires cited clinical study' },
  { term: 'scientifically proven', pattern: /\bscientifically proven\b/gi,            reason: 'Requires cited study' },
  // Condition-specific claims (prohibited for supplement marketing)
  { term: 'anxiety',           pattern: /\banxiety\b/gi,                              reason: 'Specific condition claim' },
  { term: 'depression',        pattern: /\bdepression\b|\bdepressed\b/gi,             reason: 'Specific condition claim' },
  { term: 'insomnia',          pattern: /\binsomnia\b/gi,                             reason: 'Specific condition claim' },
  { term: 'ibs',               pattern: /\bibs\b|\birritable bowel\b/gi,              reason: 'Specific condition claim' },
  { term: 'diabetes',          pattern: /\bdiabetes\b|\bdiabetic\b/gi,                reason: 'Disease claim' },
  { term: 'cancer',            pattern: /\bcancer\b/gi,                               reason: 'Disease claim' },
  { term: 'disease',           pattern: /\bdisease\b/gi,                              reason: 'Disease claim — use "wellness" instead' },
  // Absolute outcome language
  { term: 'will make you',     pattern: /\bwill make you\b/gi,                        reason: 'Absolute outcome claim' },
  { term: 'will give you',     pattern: /\bwill give you\b/gi,                        reason: 'Absolute outcome claim' },
];

// ─── Required Disclosures ─────────────────────────────────────────────────────
// These MUST appear in each result page copy file.

const REQUIRED = [
  { label: '"Results may vary"',    pattern: /results? may vary/i },
  { label: '"Not medical advice"',  pattern: /not medical advice/i },
  { label: 'FDA disclaimer',        pattern: /not intended to diagnose, treat, cure, or prevent/i },
];

// ─── Scan Targets ─────────────────────────────────────────────────────────────

const SCAN_DIRS = [
  path.join(BASE, 'drafts', 'pagefly'),
  path.join(BASE, 'reports', 'vqb'),
];

const SCAN_EXTENSIONS = ['.md', '.txt', '.json'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function collectFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => SCAN_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .map(f => path.join(dir, f));
}

/**
 * Skip lines that are documentation/checklist context rather than publishable copy.
 * These describe what to avoid — they are not the problematic content itself.
 */
function isDocumentationLine(line) {
  const t = line.trim();
  if (!t) return true;
  if (/^#{1,6}\s/.test(t)) return true;                              // Markdown headings
  if (/^\|[-:\s|]+\|$/.test(t)) return true;                         // Table separators
  if (/PASS\s*[—–-]\s*none used/i.test(t)) return true;              // Compliance result rows
  if (/prohibited terms? checked/i.test(t)) return true;             // Scanner listing line
  if (/\bNo\b.*(cure|treat|prevent|diagnose|reverse|heal|guaranteed|disease|anxiety|depression|insomnia)/i.test(t)) return true;
  if (/\b(remove all|do not use|never use|avoid using|not allowed|must not)\b/i.test(t)) return true;
  if (/["'`]\s*(cure|treat|prevent|diagnose|reverse|heal|guaranteed)\s*["'`]/i.test(t)) return true;
  if (/^[✓✗═─\[\|]/.test(t)) return true;
  if (/<!--\s*nocheck\s*-->/i.test(t) || /^#\s*nocheck/i.test(t)) return true;
  // FDA disclaimer itself (contains "diagnose, treat, cure, or prevent")
  if (/not intended to diagnose, treat, cure, or prevent any disease/i.test(t)) return true;
  // Additional disclaimer lines
  if (/does not constitute medical advice/i.test(t)) return true;

  // ── Negated / compliant uses of prohibited terms ──
  // "not guaranteed", "are not guaranteed", "no guarantee" = compliant disclaimer language
  if (/\b(not|no|never)\s+(guaranteed?|guarantee)\b/i.test(t)) return true;
  if (/\bguarantee\s+(outcomes?|results?)\b/i.test(t) && /\bdo not\b/i.test(t)) return true;

  // "disease claims" = documentation about what NOT to do
  if (/\bdisease\s+claims?\b/i.test(t)) return true;
  if (/\bmaking\s+disease\b/i.test(t)) return true;

  // "treat" used as a software/technical verb: "treat the X as", "treat X as"
  if (/\btreat\s+\w+.*\bas\b/i.test(t)) return true;

  // Technical command names containing prohibited roots (e.g. vqb:diagnose-auth, npm run diagnose)
  if (/`[^`]*diagnose[^`]*`/i.test(t)) return true;   // backtick-quoted command
  if (/vqb:diagnose|diagnose-auth|diagnose-vqb/i.test(t)) return true;

  // "guaranteed to be stable" and similar technical assertions
  if (/guaranteed\s+to\s+be\s+(stable|consistent|available|accurate)/i.test(t)) return true;

  return false;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines   = content.split('\n');
  const issues  = [];

  lines.forEach((line, idx) => {
    if (isDocumentationLine(line)) return;

    PROHIBITED.forEach(({ term, pattern, reason }) => {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        issues.push({
          line: idx + 1,
          term,
          reason,
          excerpt: line.trim().substring(0, 120),
        });
      }
    });
  });

  return issues;
}

function checkRequired(filePath) {
  // Only check product copy files (not strategy/plan docs)
  const name = path.basename(filePath);
  // Only enforce required disclosures on actual product copy files — not templates or plans
  if (!name.includes('result-page-copy')) return [];

  const content = fs.readFileSync(filePath, 'utf8');
  return REQUIRED
    .filter(({ pattern }) => !pattern.test(content))
    .map(({ label }) => ({ label, missing: true }));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const W = 72;
const divider = (c) => console.log((c || '─').repeat(W));

divider('═');
console.log('  VV Result Page Copy Compliance Scanner');
console.log('  Vital Vision Shop — drafts/pagefly/ + reports/vqb/');
divider('═');
console.log('');

const files = SCAN_DIRS.flatMap(collectFiles);

if (files.length === 0) {
  console.log('  No files found in scan directories.');
  process.exit(0);
}

console.log(`  Scanning ${files.length} files...\n`);

let totalIssues   = 0;
let totalMissing  = 0;
let totalFiles    = 0;

files.forEach(filePath => {
  const relative = path.relative(BASE, filePath);
  const issues   = scanFile(filePath);
  const missing  = checkRequired(filePath);

  const hasProblems = issues.length > 0 || missing.length > 0;
  if (hasProblems) totalFiles++;
  totalIssues  += issues.length;
  totalMissing += missing.length;

  if (!hasProblems) {
    console.log(`  ✓ PASS  ${relative}`);
  } else {
    console.log(`  ✗ FAIL  ${relative}`);

    if (issues.length > 0) {
      console.log(`          PROHIBITED (${issues.length}):`);
      issues.forEach(({ line, term, reason, excerpt }) => {
        console.log(`    Line ${String(line).padStart(4)}: [${term.toUpperCase()}] ${reason}`);
        console.log(`           "${excerpt}"`);
      });
    }

    if (missing.length > 0) {
      console.log(`          MISSING REQUIRED DISCLOSURES (${missing.length}):`);
      missing.forEach(({ label }) => {
        console.log(`    MISSING: ${label}`);
      });
    }

    console.log('');
  }
});

console.log('');
divider('─');

const totalProblems = totalIssues + totalMissing;
if (totalProblems === 0) {
  console.log(`  RESULT: ALL PASS — 0 issues found across ${files.length} files.`);
  console.log('  All required disclosures present. Safe to proceed with human review.');
} else {
  const parts = [];
  if (totalIssues > 0)  parts.push(`${totalIssues} prohibited term(s)`);
  if (totalMissing > 0) parts.push(`${totalMissing} missing disclosure(s)`);
  console.log(`  RESULT: ${parts.join(', ')} in ${totalFiles} file(s).`);
  console.log('  Resolve all issues before publishing any result page.');
}

divider('─');
console.log('');
console.log('  Prohibited terms checked: cure · treat · prevent · diagnose · reverse · heal');
console.log('  guaranteed · fda approved · doctor recommended · clinically proven · anxiety');
console.log('  depression · insomnia · ibs · diabetes · cancer · disease · eliminates · permanently');
console.log('');
console.log('  Required disclosures checked (product copy files only):');
console.log('  "results may vary" · "not medical advice" · FDA structure/function disclaimer');
console.log('');
divider('═');
console.log('  No files were modified. Read-only scan.');
console.log('  AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true');
divider('═');
console.log('');

process.exit(totalProblems > 0 ? 1 : 0);
