/**
 * observe-pagefly-editor.js
 * Vital Vision — PageFly Editor Observer
 *
 * OBSERVE ONLY — makes zero edits to PageFly, Shopify, or any page.
 * Opens a visible browser, waits for manual login and navigation to the
 * Inner Bloom PageFly editor, then scans the DOM structure and reports.
 *
 * Safety guarantees:
 * - Never clicks Publish, Save & Publish, or any destructive button
 * - Never modifies any element's content or style
 * - Never submits any form
 * - Saves a markdown observe report and optional screenshot
 *
 * Usage:
 *   npm run pagefly:observe
 *   (Requires a live terminal — do not pipe stdin)
 */

'use strict';

require('dotenv').config();

const { chromium } = require('playwright');
const fs            = require('fs');
const path          = require('path');
const readline      = require('readline');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

if (process.env.AUTO_PUBLISH === 'true') {
  console.error('BLOCKED: AUTO_PUBLISH=true'); process.exit(1);
}
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') {
  console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1);
}

// ─── Config ───────────────────────────────────────────────────────────────────

const STORE     = process.env.SHOPIFY_STORE_DOMAIN || 'rum0nq-hs.myshopify.com';
const BASE_DIR  = path.resolve(__dirname, '../../');
const REPORT_DIR = path.join(BASE_DIR, 'reports', 'pagefly');
const SS_DIR    = path.join(REPORT_DIR, 'screenshots');

fs.mkdirSync(SS_DIR, { recursive: true });

// ─── Prompt helper ────────────────────────────────────────────────────────────

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans.trim()); }));
}

// ─── PageFly DOM Scanner ──────────────────────────────────────────────────────

async function discoverPageFlyStructure(page) {
  return page.evaluate(() => {
    const results = {
      url: window.location.href,
      title: document.title,
      iframes: [],
      pageflyElements: [],
      sectionBlocks: [],
      visibleText: [],
      publishButtons: [],
      inputFields: [],
      editableAreas: [],
      canvasPresent: false,
    };

    // ── Detect iframes ──────────────────────────────────────────────────────
    document.querySelectorAll('iframe').forEach(f => {
      results.iframes.push({
        id: f.id || null,
        name: f.name || null,
        src: f.src ? f.src.substring(0, 120) : null,
        className: f.className || null,
        crossOrigin: (() => {
          try { f.contentDocument; return false; } catch { return true; }
        })(),
      });
    });

    // ── PageFly-specific selectors ──────────────────────────────────────────
    const pfSelectors = [
      '[data-pf-type]',
      '[class*="pf-"]',
      '[class*="pagefly"]',
      '[class*="PageFly"]',
      '[id*="pf-"]',
      '[id*="pagefly"]',
      '.pf-section',
      '.pf-element',
      '.pf-block',
      '[data-block-type]',
      '[data-section-type]',
    ];

    pfSelectors.forEach(sel => {
      const els = document.querySelectorAll(sel);
      if (els.length > 0) {
        els.forEach(el => {
          results.pageflyElements.push({
            selector: sel,
            tag: el.tagName,
            id: el.id || null,
            className: (el.className || '').substring(0, 80),
            dataType: el.getAttribute('data-pf-type') || el.getAttribute('data-block-type') || null,
            text: (el.innerText || '').trim().substring(0, 100),
          });
        });
      }
    });

    // ── Section/block label scanning ────────────────────────────────────────
    const blockSelectors = [
      'section', 'article', '[role="region"]',
      '[class*="section"]', '[class*="block"]',
      '[class*="row"]', '[class*="container"]',
      '[class*="hero"]', '[class*="banner"]',
      '[class*="announcement"]', '[class*="header"]',
    ];

    blockSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        const text = (el.innerText || '').trim().substring(0, 80);
        if (text && text.length > 5) {
          results.sectionBlocks.push({
            selector: sel,
            tag: el.tagName,
            id: el.id || null,
            class: (el.className || '').substring(0, 80),
            text,
          });
        }
      });
    });

    // ── Visible headings ────────────────────────────────────────────────────
    document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
      const t = (h.innerText || '').trim();
      if (t && t.length > 2) results.visibleText.push({ tag: h.tagName, text: t.substring(0, 100) });
    });

    // ── Publish buttons (SAFETY CHECK — must not click) ─────────────────────
    const allBtns = Array.from(document.querySelectorAll('button, [role="button"], a'));
    allBtns.forEach(b => {
      const t = (b.innerText || b.textContent || b.getAttribute('aria-label') || '').trim().toLowerCase();
      if (/publish|save & publish|go live/.test(t)) {
        results.publishButtons.push({ tag: b.tagName, text: t.substring(0, 60), class: (b.className || '').substring(0, 60) });
      }
    });

    // ── Input fields ────────────────────────────────────────────────────────
    document.querySelectorAll('input, textarea, [contenteditable="true"]').forEach(el => {
      results.inputFields.push({
        tag: el.tagName,
        type: el.type || el.getAttribute('contenteditable') || null,
        placeholder: el.placeholder || null,
        class: (el.className || '').substring(0, 60),
        value: (el.value || el.innerText || '').trim().substring(0, 60),
      });
    });

    // ── Editable / canvas areas ─────────────────────────────────────────────
    const editSels = [
      '[data-editor]', '[class*="editor"]', '[class*="canvas"]',
      '[class*="preview"]', '[class*="builder"]', '[class*="workspace"]',
    ];
    editSels.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        results.editableAreas.push({
          selector: sel,
          tag: el.tagName,
          class: (el.className || '').substring(0, 80),
          id: el.id || null,
        });
        results.canvasPresent = true;
      });
    });

    return results;
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const W = 72;
  const div = (c = '─') => console.log(c.repeat(W));

  div('═');
  console.log('  VV PageFly Editor Observer — OBSERVE ONLY');
  console.log('  No edits will be made. No Publish will be clicked.');
  console.log('  Page: Inner Bloom — Your Wellness Match (inner-bloom-result)');
  div('═');
  console.log('');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 60,
    args: ['--start-maximized'],
  });

  const context = await browser.newContext({ viewport: null });
  const page    = await context.newPage();

  // ── Navigate to Shopify admin ──────────────────────────────────────────────
  const adminUrl = `https://admin.shopify.com/store/${STORE.replace('.myshopify.com', '')}/apps`;
  console.log(`  Opening: ${adminUrl}`);
  console.log('');

  await page.goto(adminUrl, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});

  // ── Manual login + navigation ──────────────────────────────────────────────
  console.log('  ┌─────────────────────────────────────────────────────────────────┐');
  console.log('  │  MANUAL STEPS REQUIRED:                                         │');
  console.log('  │                                                                 │');
  console.log('  │  1. Log in to Shopify admin if prompted                         │');
  console.log('  │  2. Go to: Apps → PageFly Page Builder                          │');
  console.log('  │  3. Find: "Inner Bloom — Your Wellness Match" (inner-bloom-result)│');
  console.log('  │  4. Click EDIT on that page to open the PageFly editor          │');
  console.log('  │  5. Wait for the editor to fully load                           │');
  console.log('  │  6. Return here and press ENTER to scan                         │');
  console.log('  └─────────────────────────────────────────────────────────────────┘');
  console.log('');

  await prompt('  Press ENTER when the PageFly editor is open and fully loaded → ');

  console.log('');
  console.log('  Scanning PageFly editor structure...');
  console.log('');

  // ── Take screenshot ────────────────────────────────────────────────────────
  const ssPath = path.join(SS_DIR, `inner-bloom-observe-${Date.now()}.png`);
  await page.screenshot({ path: ssPath, fullPage: false }).catch(e => {
    console.log(`  Warning: screenshot failed — ${e.message}`);
  });
  console.log(`  Screenshot saved: ${path.relative(BASE_DIR, ssPath)}`);

  // ── Detect current URL ─────────────────────────────────────────────────────
  const currentUrl = page.url();
  console.log(`  Current URL: ${currentUrl}`);
  console.log('');

  // ── Scan main page DOM ─────────────────────────────────────────────────────
  const mainScan = await discoverPageFlyStructure(page);

  // ── Also try accessible iframes ────────────────────────────────────────────
  const frameResults = [];
  for (const frame of page.frames()) {
    if (frame === page.mainFrame()) continue;
    const frameUrl = frame.url();
    let frameScan = null;
    try {
      frameScan = await frame.evaluate(() => ({
        url: window.location.href,
        iframes: document.querySelectorAll('iframe').length,
        pfElements: document.querySelectorAll('[data-pf-type], [class*="pf-"], [class*="pagefly"]').length,
        inputs: document.querySelectorAll('input, textarea, [contenteditable]').length,
        headings: Array.from(document.querySelectorAll('h1,h2,h3')).map(h => h.innerText.trim().substring(0, 80)),
        editable: document.querySelectorAll('[contenteditable="true"]').length,
      }));
    } catch {
      frameScan = { url: frameUrl, crossOrigin: true };
    }
    frameResults.push(frameScan);
  }

  // ── Build report ───────────────────────────────────────────────────────────
  const ts = new Date().toISOString();

  const reportLines = [
    `# PageFly Editor — Observe Report`,
    `# Page: Inner Bloom — Your Wellness Match`,
    `# Timestamp: ${ts}`,
    `# Status: OBSERVE ONLY — no edits made`,
    ``,
    `---`,
    ``,
    `## Editor URL`,
    ``,
    `\`${currentUrl}\``,
    ``,
    `---`,
    ``,
    `## Iframe Summary`,
    ``,
    `Total iframes found: ${mainScan.iframes.length}`,
    ``,
    mainScan.iframes.length === 0
      ? `No iframes detected on the main page.`
      : mainScan.iframes.map(f =>
          `- **${f.id || f.name || 'unnamed'}** | src: ${f.src || 'none'} | cross-origin: ${f.crossOrigin}`
        ).join('\n'),
    ``,
    `---`,
    ``,
    `## Accessible Sub-frames`,
    ``,
    frameResults.length === 0
      ? `No sub-frames detected.`
      : frameResults.map(f => {
          if (f.crossOrigin) return `- **Cross-origin (inaccessible):** ${f.url || 'unknown'}`;
          return [
            `- **Frame:** ${f.url}`,
            `  - Inputs: ${f.inputs}`,
            `  - PageFly elements: ${f.pfElements}`,
            `  - Editable areas: ${f.editable}`,
            `  - Headings: ${(f.headings || []).join(' | ')}`,
          ].join('\n');
        }).join('\n'),
    ``,
    `---`,
    ``,
    `## PageFly Elements Detected (Main Frame)`,
    ``,
    mainScan.pageflyElements.length === 0
      ? `0 PageFly-specific elements found in main frame.`
      : `${mainScan.pageflyElements.length} elements found:\n\n` +
        mainScan.pageflyElements.slice(0, 30).map(e =>
          `- [${e.selector}] <${e.tag}> | type: ${e.dataType || 'n/a'} | text: "${e.text}"`
        ).join('\n'),
    ``,
    `---`,
    ``,
    `## Editable / Canvas Areas`,
    ``,
    mainScan.editableAreas.length === 0
      ? `No editable/canvas areas found.`
      : mainScan.editableAreas.map(a =>
          `- [${a.selector}] <${a.tag}> id: ${a.id || 'none'} class: ${a.class}`
        ).join('\n'),
    ``,
    `---`,
    ``,
    `## Visible Headings`,
    ``,
    mainScan.visibleText.length === 0
      ? `No headings detected.`
      : mainScan.visibleText.map(h => `- <${h.tag}> "${h.text}"`).join('\n'),
    ``,
    `---`,
    ``,
    `## Input Fields`,
    ``,
    mainScan.inputFields.length === 0
      ? `0 input fields detected on main frame.`
      : `${mainScan.inputFields.length} fields:\n\n` +
        mainScan.inputFields.slice(0, 20).map(f =>
          `- <${f.tag}> type: ${f.type || 'n/a'} | placeholder: ${f.placeholder || 'none'} | value: "${f.value}"`
        ).join('\n'),
    ``,
    `---`,
    ``,
    `## Section Blocks Detected`,
    ``,
    mainScan.sectionBlocks.length === 0
      ? `No section/block elements detected.`
      : `${mainScan.sectionBlocks.length} blocks:\n\n` +
        mainScan.sectionBlocks.slice(0, 20).map(b =>
          `- [${b.selector}] <${b.tag}> id: ${b.id || 'none'} | text: "${b.text}"`
        ).join('\n'),
    ``,
    `---`,
    ``,
    `## SAFETY CHECK — Publish Buttons`,
    ``,
    mainScan.publishButtons.length === 0
      ? `No Publish buttons detected on main frame (expected if editor is in iframe).`
      : `**WARNING: ${mainScan.publishButtons.length} publish-related button(s) found:**\n\n` +
        mainScan.publishButtons.map(b => `- <${b.tag}> "${b.text}" class: ${b.class}`).join('\n') +
        `\n\n**None were clicked. Observe-only mode active.**`,
    ``,
    `---`,
    ``,
    `## Automation Viability Assessment`,
    ``,
    (() => {
      const hasInputs    = mainScan.inputFields.length > 0;
      const hasPF        = mainScan.pageflyElements.length > 0;
      const hasEditable  = mainScan.editableAreas.length > 0;
      const hasFrames    = mainScan.iframes.length > 0;
      const accessFrames = frameResults.some(f => !f.crossOrigin && f.inputs > 0);

      if (hasPF && hasInputs) return `**VIABLE:** PageFly elements and input fields accessible on main frame. Automation can proceed to Phase 3.`;
      if (accessFrames) return `**PARTIAL:** PageFly editor found in accessible sub-frame. Automation can proceed with frame context.`;
      if (hasFrames && !accessFrames) return `**BLOCKED:** PageFly editor appears to be inside a cross-origin iframe. DOM automation is not viable. Fallback to manual editing required.`;
      if (!hasInputs && !hasPF) return `**UNCERTAIN:** No PageFly elements or inputs detected. Editor may not be fully loaded, or may be in a sandboxed context. Re-run after confirming editor is fully open.`;
      return `**PARTIAL:** Some elements detected. Review report sections above before proceeding.`;
    })(),
    ``,
    `---`,
    ``,
    `## Screenshot`,
    ``,
    `Saved to: \`${path.relative(BASE_DIR, ssPath)}\``,
    ``,
    `---`,
    ``,
    `*No changes were made to PageFly, Shopify, or any page.*`,
    `*Publish was not clicked. Page remains unpublished.*`,
  ];

  const reportPath = path.join(REPORT_DIR, 'inner-bloom-observe-report.md');
  fs.writeFileSync(reportPath, reportLines.join('\n'));

  // ── Console summary ────────────────────────────────────────────────────────
  div();
  console.log(`  OBSERVE COMPLETE`);
  console.log(`  Iframes:          ${mainScan.iframes.length}`);
  console.log(`  PageFly elements: ${mainScan.pageflyElements.length}`);
  console.log(`  Input fields:     ${mainScan.inputFields.length}`);
  console.log(`  Editable areas:   ${mainScan.editableAreas.length}`);
  console.log(`  Sub-frames:       ${frameResults.length}`);
  console.log(`  Publish buttons:  ${mainScan.publishButtons.length} (NOT CLICKED)`);
  div();
  console.log('');
  console.log(`  Report: reports/pagefly/inner-bloom-observe-report.md`);
  console.log(`  Screenshot: ${path.relative(BASE_DIR, ssPath)}`);
  console.log('');

  await prompt('  Review the report above. Press ENTER to close the browser → ');
  await browser.close();

  console.log('');
  console.log('  Browser closed. No changes were made.');
  div('═');
  console.log('  OBSERVE ONLY — no PageFly, Shopify, or page content was modified.');
  console.log('  AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true');
  div('═');
  console.log('');
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
