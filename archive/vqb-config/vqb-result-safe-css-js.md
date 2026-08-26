# VQB Result Page Safe CSS/JS — Vital Vision Shop
# Paste into: VQB Dashboard → Quiz Settings → Custom JS / JavaScript Console
# VISUAL ONLY — no logic, no API calls, no publish triggers, no price changes.
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## What this does

- Removes any previously injected VV style tags (data-vv-premium-quiz-style, data-vv-safe-mobile-quiz-style)
- Adds one clean, minimal style tag (data-vv-fix-pack-v1)
- Improves mobile button style (full-width, readable tap target)
- Improves mobile typography (font sizes, line height, max-width)
- Keeps layout flexible — no forced narrow widths, no broken containers
- Avoids global div/span selectors that could break unrelated elements
- Safe to remove by deleting the script from VQB's JS console and refreshing

---

## What this does NOT do

- Does not change quiz logic or routing
- Does not change product mappings or product IDs
- Does not change prices or discount values
- Does not call any external API
- Does not auto-click buttons or trigger saves
- Does not publish anything
- Does not touch Shopify theme files
- Does not modify API keys or integration tokens

---

## How to apply

1. Open VQB dashboard → select VV Home Quick Match Quiz — 1Q
2. Navigate to: Settings → Custom JavaScript (or "JS Console" / "Advanced" tab)
3. Paste the JS block below into the editor
4. Click Save (NOT Save & Publish)
5. Preview the quiz in VQB preview mode on a mobile viewport (375px)
6. Confirm visual changes look correct
7. Only publish after mobile QA passes and human approves

---

## Rollback

To remove all visual changes:
1. Open VQB → Settings → Custom JavaScript
2. Delete the pasted script
3. Click Save
4. Refresh the quiz preview — all styles revert to VQB defaults

---

## JS BLOCK — Paste this into VQB Custom JavaScript

```javascript
/* ============================================================
   VV Visual Fix Pack v1.0
   Vital Vision Shop — VQB Result Page
   Safe, visual-only. No logic changes. No API calls.
   Remove by deleting this script from VQB JS console.
   ============================================================ */

(function () {
  'use strict';

  /* ── Step 1: Remove any previously injected VV style tags ── */
  [
    'data-vv-premium-quiz-style',
    'data-vv-safe-mobile-quiz-style'
  ].forEach(function (attr) {
    var old = document.querySelector('[' + attr + ']');
    if (old && old.parentNode) {
      old.parentNode.removeChild(old);
    }
  });

  /* ── Step 2: Inject new minimal style tag ─────────────────── */
  var style = document.createElement('style');
  style.setAttribute('data-vv-fix-pack-v1', '');
  style.textContent = [

    /* ── Typography: result headings ─────────────────────────── */
    '.whai-result-headline, [class*="result-headline"], [class*="resultHeadline"] {',
    '  font-size: 18px;',
    '  line-height: 1.3;',
    '  font-weight: 400;',
    '  color: #2a2a2a;',
    '  margin-bottom: 8px;',
    '}',

    /* ── Typography: product name ─────────────────────────────── */
    '.whai-product-name, [class*="product-name"], [class*="productName"] {',
    '  font-size: 16px;',
    '  font-weight: 500;',
    '  color: #1a1a1a;',
    '  line-height: 1.3;',
    '}',

    /* ── Typography: body / description ─────────────────────────*/
    '.whai-product-description, [class*="product-description"], [class*="productDescription"] {',
    '  font-size: 14px;',
    '  line-height: 1.6;',
    '  color: #555555;',
    '}',

    /* ── Typography: global match label ──────────────────────── */
    '.whai-global-label, [class*="global-label"], [class*="globalLabel"] {',
    '  font-size: 12px;',
    '  color: #8a9a8a;',
    '  letter-spacing: 0.03em;',
    '  text-transform: none;',
    '}',

    /* ── Typography: disclaimer ───────────────────────────────── */
    '.whai-disclaimer, [class*="disclaimer"] {',
    '  font-size: 11px;',
    '  color: #999999;',
    '  line-height: 1.5;',
    '}',

    /* ── Primary CTA button ───────────────────────────────────── */
    /* Targets VQB/Whai primary button patterns */
    '.whai-btn-primary, [class*="btn-primary"], [class*="btnPrimary"],',
    '.whai-cta-primary, [class*="cta-primary"] {',
    '  display: block;',
    '  width: 100%;',
    '  min-height: 48px;',
    '  padding: 12px 20px;',
    '  font-size: 15px;',
    '  font-weight: 700;',
    '  border-radius: 6px;',
    '  box-sizing: border-box;',
    '  cursor: pointer;',
    '}',

    /* ── Secondary CTA (Why This Match) ──────────────────────── */
    '.whai-btn-secondary, [class*="btn-secondary"], [class*="btnSecondary"],',
    '.whai-cta-secondary, [class*="cta-secondary"] {',
    '  display: block;',
    '  width: 100%;',
    '  min-height: 44px;',
    '  padding: 10px 20px;',
    '  font-size: 14px;',
    '  font-weight: 400;',
    '  background: transparent;',
    '  border: none;',
    '  cursor: pointer;',
    '  color: inherit;',
    '  opacity: 0.75;',
    '}',

    /* ── Mobile-specific overrides (≤ 480px) ─────────────────── */
    '@media (max-width: 480px) {',

    '  /* Prevent card from being too narrow */',
    '  .whai-result-card, [class*="result-card"], [class*="resultCard"] {',
    '    padding: 16px;',
    '    box-sizing: border-box;',
    '  }',

    '  /* Result headline: comfortable reading size */',
    '  .whai-result-headline, [class*="result-headline"], [class*="resultHeadline"] {',
    '    font-size: 17px;',
    '  }',

    '  /* Product name: keep to 2 lines max */',
    '  .whai-product-name, [class*="product-name"], [class*="productName"] {',
    '    font-size: 15px;',
    '    word-break: break-word;',
    '  }',

    '  /* Body copy: legible on small screens */',
    '  .whai-product-description, [class*="product-description"] {',
    '    font-size: 13px;',
    '  }',

    '  /* Primary CTA: full width, tall tap target */',
    '  .whai-btn-primary, [class*="btn-primary"], [class*="btnPrimary"],',
    '  .whai-cta-primary, [class*="cta-primary"] {',
    '    width: 100% !important;',
    '    min-height: 48px !important;',
    '    font-size: 15px !important;',
    '  }',

    '  /* Email input: full width, tall tap target */',
    '  .whai-email-input, [class*="email-input"], input[type="email"] {',
    '    width: 100%;',
    '    min-height: 48px;',
    '    font-size: 16px; /* prevents iOS auto-zoom */',
    '    box-sizing: border-box;',
    '    padding: 12px 14px;',
    '  }',

    '}',
    /* ── End of styles ─────────────────────────────────────────── */

  ].join('\n');

  /* ── Step 3: Append to document head ─────────────────────── */
  (document.head || document.documentElement).appendChild(style);

  /* ── Step 4: Log confirmation (does not touch VQB logic) ─── */
  console.log('[VV Fix Pack v1.0] Visual styles applied. No logic changes made.');

})();
/* ============================================================
   End VV Visual Fix Pack v1.0
   ============================================================ */
```

---

## Quick Selector Reference

VQB (Whai) uses class names prefixed with `whai-`. If the above selectors
do not match, open browser DevTools on the live quiz preview and inspect
the elements to find the actual class names. Update the selectors in the
script accordingly, then save.

Common Whai class patterns observed:
- `.whai-quiz` — quiz root container
- `.whai-result` — result page container
- `.whai-btn` — generic button
- `.whai-step` — quiz step/screen

---

## If Selectors Do Not Match

1. Open the live quiz at vitalvision.shop
2. Complete the quiz to reach a result card
3. Right-click the button / headline / etc → Inspect
4. Note the exact class name
5. Add it to the selector list in the JS above, following the same pattern
6. Re-save in VQB JS console
7. Refresh preview

---

*Visual-only. No logic, routing, product, or price changes.*
*Human review required before publishing.*
