/**
 * check-seo-copy-compliance.js
 * Vital Vision — SEO Copy Compliance Scanner
 *
 * Scans drafts/seo/ and reports/google/ for prohibited medical claims
 * and compliance-risk language.
 *
 * Makes zero API calls. Does not modify any file. Read-only.
 *
 * Usage: npm run seo:check-copy
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Prohibited Terms ─────────────────────────────────────────────────────────
// Exact word-boundary matches (regex). "heal" will NOT match "healthy".
// Add to this list as needed.

const PROHIBITED = [
  // Disease claims
  { term: 'cure',           pattern: /\bcure[sd]?\b/gi,                       reason: 'Disease claim' },
  { term: 'treat',          pattern: /\btreats?\b|\btreatment\b/gi,            reason: 'Disease claim' },
  { term: 'prevent',        pattern: /\bprevents?\b|\bprevention\b/gi,         reason: 'Disease claim' },
  { term: 'diagnose',       pattern: /\bdiagnoses?\b|\bdiagnosis\b/gi,         reason: 'Disease claim' },
  { term: 'reverse',        pattern: /\breverse[sd]?\b|\breversing\b/gi,       reason: 'Disease claim' },
  { term: 'heal',           pattern: /\bheals?\b|\bhealing\b|\bhealed\b/gi,   reason: 'Disease claim (not "healthy")' },
  // Guaranteed outcome
  { term: 'guaranteed',     pattern: /\bguaranteed?\b/gi,                      reason: 'Guarantee claim' },
  { term: 'proven results', pattern: /\bproven results?\b/gi,                  reason: 'Unsubstantiated claim' },
  { term: 'clinically proven', pattern: /\bclinically proven\b/gi,            reason: 'Requires cited study' },
  // Authority claims
  { term: 'fda approved',   pattern: /\bfda[\s-]?approved\b/gi,               reason: 'Supplements are not FDA approved' },
  { term: 'doctor recommended', pattern: /\bdoctor[\s-]?recommended\b/gi,     reason: 'Unverified authority claim' },
  { term: 'physician approved', pattern: /\bphysician[\s-]?approved\b/gi,     reason: 'Unverified authority claim' },
  // Condition-specific claims
  { term: 'anxiety',        pattern: /\banxiety\b/gi,                          reason: 'Specific condition claim' },
  { term: 'depression',     pattern: /\bdepression\b|\bdepressed\b/gi,        reason: 'Specific condition claim' },
  { term: 'insomnia',       pattern: /\binsomnia\b/gi,                         reason: 'Specific condition claim' },
  { term: 'ibs',            pattern: /\bibs\b|\birritable bowel\b/gi,          reason: 'Specific condition claim' },
  { term: 'diabetes',       pattern: /\bdiabetes\b|\bdiabetic\b/gi,            reason: 'Disease claim' },
  { term: 'cancer',         pattern: /\bcancer\b/gi,                           reason: 'Disease claim' },
  { term: 'disease',        pattern: /\bdisease\b/gi,                          reason: 'Disease claim — use "wellness" instead' },
  // Absolute outcome language
  { term: 'will make you',  pattern: /\bwill make you\b/gi,                   reason: 'Absolute outcome claim' },
  { term: 'eliminates',     pattern: /\beliminates?\b/gi,                      reason: 'Absolute outcome claim' },
  { term: 'permanently',    pattern: /\bpermanently\b/gi,                      reason: 'Absolute outcome claim' },
];

// ─── Scan Targets ─────────────────────────────────────────────────────────────

const SCAN_DIRS = [
  path.join(BASE, 'drafts', 'seo'),
  path.join(BASE, 'reports', 'google'),
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
 * Returns true if a line is documentation/checklist context rather than
 * publishable copy, so it should be skipped by the compliance scanner.
 *
 * Skips:
 *  - Markdown headings (#, ##, etc.)
 *  - Table separator rows (|---|---|)
 *  - Lines showing "PASS — none used" (compliance result rows)
 *  - Lines listing prohibited terms as examples ("No cure/treat/prevent…")
 *  - Lines that cite the prohibited term in quotes or backticks only
 *  - Lines starting with the scanner's own output markers ([TERM], ✓, ✗, ─, ═)
 *  - Lines beginning with # nocheck or ending with <!-- nocheck -->
 */
function isDocumentationLine(line) {
  const t = line.trim();
  if (!t) return true;
  // Markdown headings
  if (/^#{1,6}\s/.test(t)) return true;
  // Table separator
  if (/^\|[-:\s|]+\|$/.test(t)) return true;
  // Compliance result rows
  if (/PASS\s*[—–-]\s*none used/i.test(t)) return true;
  // "Prohibited terms checked:" listing line
  if (/prohibited terms? checked/i.test(t)) return true;
  // Lines describing what NOT to use (e.g. "No cure/treat/prevent…")
  if (/\bNo\b.*(cure|treat|prevent|diagnose|reverse|heal|guaranteed|disease|anxiety|depression|insomnia)/i.test(t)) return true;
  // Lines saying "Remove all X language" or "Do not use X"
  if (/\b(remove all|do not use|never use|avoid|not allowed)\b/i.test(t)) return true;
  // Lines where every instance of a prohibited term is inside quotes or backticks
  // (e.g. "treats IBS" is not — the term is being cited as an example)
  if (/["'`]\s*(cure|treat|prevent|diagnose|reverse|heal|guaranteed)\s*["'`]/i.test(t)) return true;
  // Scanner output lines
  if (/^[✓✗═─\[\|]/.test(t)) return true;
  // nocheck annotation
  if (/<!--\s*nocheck\s*-->/i.test(t) || /^#\s*nocheck/i.test(t)) return true;

  return false;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines   = content.split('\n');
  const issues  = [];

  lines.forEach((line, idx) => {
    if (isDocumentationLine(line)) return;

    PROHIBITED.forEach(({ term, pattern, reason }) => {
      pattern.lastIndex = 0; // reset regex state
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

// ─── Main ─────────────────────────────────────────────────────────────────────

const W = 72;
const divider = (c) => console.log((c || '─').repeat(W));

divider('═');
console.log('  VV SEO Copy Compliance Scanner');
console.log('  Vital Vision Shop — drafts/seo/ + reports/google/');
divider('═');
console.log('');

const files = SCAN_DIRS.flatMap(collectFiles);

if (files.length === 0) {
  console.log('  No .md/.txt/.json files found in scan directories.');
  console.log('  Create drafts/seo/ files first.');
  console.log('');
  process.exit(0);
}

console.log(`  Scanning ${files.length} files...\n`);

let totalIssues  = 0;
let totalFiles   = 0;
const fileResults = [];

files.forEach(filePath => {
  const relative = path.relative(BASE, filePath);
  const issues   = scanFile(filePath);
  fileResults.push({ relative, issues });
  if (issues.length > 0) totalFiles++;
  totalIssues += issues.length;
});

// ─── Results ──────────────────────────────────────────────────────────────────

fileResults.forEach(({ relative, issues }) => {
  if (issues.length === 0) {
    console.log(`  ✓ PASS  ${relative}`);
  } else {
    console.log(`  ✗ FAIL  ${relative} — ${issues.length} issue(s)`);
    issues.forEach(({ line, term, reason, excerpt }) => {
      console.log(`    Line ${String(line).padStart(4)}: [${term.toUpperCase()}] ${reason}`);
      console.log(`           "${excerpt}"`);
    });
    console.log('');
  }
});

console.log('');
divider('─');

if (totalIssues === 0) {
  console.log(`  RESULT: ALL PASS — 0 compliance issues found across ${files.length} files.`);
  console.log('  Safe to proceed with human review and approval.');
} else {
  console.log(`  RESULT: ${totalIssues} issue(s) in ${totalFiles} file(s) — review before applying.`);
  console.log('  Do NOT apply any SEO copy until all issues are resolved.');
}

divider('─');
console.log('');
console.log('  Prohibited terms checked:');
PROHIBITED.forEach(({ term }) => process.stdout.write(`  ${term}  `));
console.log('');
console.log('');
divider('═');
console.log('  No files were modified. Read-only scan.');
console.log('  AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true');
divider('═');
console.log('');

process.exit(totalIssues > 0 ? 1 : 0);
