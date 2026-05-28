'use strict';

/**
 * Vital Vision Shop — Q&A Card Generator v4
 * Generates a premium branded Instagram Story Q&A card as a local PNG draft.
 *
 * Rules:
 * - No external API calls
 * - No .env access
 * - No publishing or scheduling
 * - Output is DRAFT — requires Lucy approval before use
 *
 * Usage:
 *   node scripts/image/generate-qa-card.js
 *
 * Output:
 *   assets/generated/qa-cards/test-inner-bloom-qa-story-v4.png
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

// ---------------------------------------------------------------------------
// Brand colours — v4
// ---------------------------------------------------------------------------
const C = {
  bg:             '#F7F0E3',  // warm cream background
  deepGreen:      '#173F2D',  // header block, CTA button
  questionColor:  '#0B2B1C',  // very dark forest — max question contrast
  textGreen:      '#0F3020',  // body text (dark)
  gold:           '#C9A44C',  // primary gold accent
  sage:           '#D7DDC8',  // soft sage (pill bg, labels, decorative)
  answerCard:     '#FFF8EA',  // answer card background
  cream:          '#F7F0E3',  // CTA subtext on dark button
  disclaimerText: '#7A9470',  // readable warm green-grey for disclaimer
};

// ---------------------------------------------------------------------------
// Canvas
// ---------------------------------------------------------------------------
const W  = 1080;
const H  = 1920;
const CX = W / 2;

// ---------------------------------------------------------------------------
// Fonts — system fonts for MVP; swap TTF paths here when custom fonts arrive
// ---------------------------------------------------------------------------
const FONT = {
  serif: "Georgia, 'Times New Roman', serif",
  sans:  "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

// ---------------------------------------------------------------------------
// Card copy
// ---------------------------------------------------------------------------
const CARD = {
  productLabel:  'INNER BLOOM',
  brandLabel:    'VITAL VISION SHOP',
  contextLabel:  'YOU ASKED',
  questionLines: ['Why do I feel heavy', 'after meals?'],
  answerLines: [
    { text: 'Your body may need a simpler',        bold: false },
    { text: 'daily wellness rhythm.',              bold: false },
    { text: '',                                    bold: false },  // paragraph gap
    { text: 'Inner Bloom is designed to support', bold: false },
    { text: 'daily digestive wellness',            bold: true  },  // emphasis
    { text: 'and gut balance as part of a',        bold: false },
    { text: 'consistent self-care routine.',       bold: false },
  ],
  ctaMain:    'COMMENT BLOOM',
  ctaSub:     'for the daily ritual.',
  disclaimer: 'Wellness support only. Not medical advice. Results may vary.',
  signature:  'Self-care starts here.',
};

// ---------------------------------------------------------------------------
// XML escape
// ---------------------------------------------------------------------------
function xml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// SVG primitive helpers
// ---------------------------------------------------------------------------
function T(content, x, y, {
  size      = 28,
  font      = FONT.sans,
  color     = C.textGreen,
  weight    = 'normal',
  style     = 'normal',
  tracking  = 0,
  opacity   = 1,
} = {}) {
  const ls = tracking ? ` letter-spacing="${tracking}"` : '';
  return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central"` +
    ` font-family="${xml(font)}" font-size="${size}" font-weight="${weight}"` +
    ` font-style="${style}" fill="${color}" opacity="${opacity}"${ls}>${xml(content)}</text>`;
}

function R(x, y, w, h, fill, { opacity = 1, rx = 0, stroke = null, sw = 2 } = {}) {
  const st = stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"` +
    ` opacity="${opacity}" rx="${rx}"${st}/>`;
}

function L(x1, y1, x2, y2, stroke, { sw = 1, opacity = 1 } = {}) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"` +
    ` stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"/>`;
}

function Circle(cx, cy, r, fill, opacity = 1) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}"/>`;
}

function Diamond(cx, cy, size, fill, opacity = 1) {
  return `<polygon points="${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}"` +
    ` fill="${fill}" opacity="${opacity}"/>`;
}

// ---------------------------------------------------------------------------
// Build card SVG
// ---------------------------------------------------------------------------
function buildCardSVG() {
  const els = [];

  // ── BACKGROUND ────────────────────────────────────────────────────────────
  els.push(R(0, 0, W, H, C.bg));

  // Subtle botanical ellipses — very low opacity, purely decorative
  els.push(`<ellipse cx="968" cy="138" rx="115" ry="44" fill="${C.sage}" opacity="0.13" transform="rotate(35 968 138)"/>`);
  els.push(`<ellipse cx="112" cy="1785" rx="98" ry="40" fill="${C.sage}" opacity="0.10" transform="rotate(-28 112 1785)"/>`);
  els.push(`<ellipse cx="48"  cy="860"  rx="68" ry="26" fill="${C.deepGreen}" opacity="0.05" transform="rotate(18 48 860)"/>`);
  els.push(`<ellipse cx="1038" cy="1460" rx="58" ry="22" fill="${C.sage}" opacity="0.08" transform="rotate(-15 1038 1460)"/>`);

  // ── HEADER BLOCK (y 70–280) ───────────────────────────────────────────────
  els.push(R(60, 70, 960, 210, C.deepGreen, { rx: 18 }));

  // Inner top accent line
  els.push(L(120, 86, 960, 86, C.gold, { sw: 0.8, opacity: 0.28 }));

  // Decorative gold mark  ——◇——
  const markY = 126;
  els.push(Diamond(CX, markY, 9, C.gold, 0.88));
  els.push(L(CX - 72, markY, CX - 15, markY, C.gold, { sw: 0.9, opacity: 0.5 }));
  els.push(L(CX + 15, markY, CX + 72, markY, C.gold, { sw: 0.9, opacity: 0.5 }));

  // INNER BLOOM
  els.push(T(CARD.productLabel, CX, 170, {
    size: 42, font: FONT.serif, color: C.gold, tracking: 5,
  }));

  // VITAL VISION SHOP
  els.push(T(CARD.brandLabel, CX, 214, {
    size: 14, font: FONT.sans, color: C.sage, tracking: 4, opacity: 0.85,
  }));

  // ── YOU ASKED PILL (y 305–355) ────────────────────────────────────────────
  els.push(R(CX - 135, 305, 270, 50, C.sage, { opacity: 0.55, rx: 25 }));
  els.push(T(CARD.contextLabel, CX, 330, {
    size: 14, font: FONT.sans, color: C.deepGreen, weight: 'bold', tracking: 4,
  }));

  // ── QUESTION — 72px, darkest colour ──────────────────────────────────────
  const qSize  = 72;
  const qLineH = Math.round(qSize * 1.30);
  let qY = 425;
  for (const line of CARD.questionLines) {
    els.push(T(line, CX, qY, { size: qSize, font: FONT.serif, color: C.questionColor }));
    qY += qLineH;
  }

  // ── GOLD DIVIDER ──────────────────────────────────────────────────────────
  const divY = qY + 42;
  els.push(L(140, divY, CX - 20, divY, C.gold, { sw: 1.3, opacity: 0.60 }));
  els.push(L(CX + 20, divY, 940, divY, C.gold, { sw: 1.3, opacity: 0.60 }));
  els.push(Diamond(CX, divY, 9, C.gold, 0.80));

  // ── ANSWER CARD — v4: 31px body text, tighter card ───────────────────────
  const cardX  = 68;
  const cardY  = divY + 28;
  const cardW  = 944;
  const cardH  = 460;   // reduced from 490 — 31px text fills it properly
  const cardRx = 20;

  // Shadow
  els.push(R(cardX + 7, cardY + 7, cardW, cardH, C.deepGreen, { opacity: 0.11, rx: cardRx }));
  // Card surface
  els.push(R(cardX, cardY, cardW, cardH, C.answerCard, { rx: cardRx }));

  // "HERE'S WHY" heading inside card
  els.push(T("HERE'S WHY", CX, cardY + 36, {
    size: 14, font: FONT.sans, color: C.gold, tracking: 3,
  }));
  // Thin rule under heading
  els.push(L(CX - 110, cardY + 57, CX + 110, cardY + 57, C.gold, { sw: 0.7, opacity: 0.40 }));

  // Answer text lines — v4: 31px for mobile readability
  const aSize  = 31;
  const aLineH = Math.round(aSize * 1.65);
  let aY = cardY + 96;
  for (const { text: lineText, bold } of CARD.answerLines) {
    if (lineText === '') { aY += Math.round(aLineH * 0.40); continue; }
    els.push(T(lineText, CX, aY, {
      size:   bold ? aSize + 1 : aSize,
      font:   FONT.sans,
      color:  bold ? C.questionColor : C.textGreen,
      weight: bold ? 'bold' : 'normal',
    }));
    aY += aLineH;
  }

  // Inner bottom rule
  els.push(L(cardX + 60, cardY + cardH - 30, cardX + cardW - 60, cardY + cardH - 30,
    C.gold, { sw: 0.7, opacity: 0.25 }));

  // ── CTA BUTTON ───────────────────────────────────────────────────────────
  const btnX  = 96;
  const btnY  = cardY + cardH + 42;
  const btnW  = 888;
  const btnH  = 130;
  const btnRx = 32;

  // Button shadow
  els.push(R(btnX + 5, btnY + 5, btnW, btnH, C.deepGreen, { opacity: 0.22, rx: btnRx }));
  // Button fill + gold border
  els.push(R(btnX, btnY, btnW, btnH, C.deepGreen, { rx: btnRx, stroke: C.gold, sw: 2.5 }));

  // "COMMENT BLOOM"
  els.push(T(CARD.ctaMain, CX, btnY + 47, {
    size: 33, font: FONT.sans, color: C.gold, weight: 'bold', tracking: 2,
  }));
  // "for the daily ritual." — v4: 22px
  els.push(T(CARD.ctaSub, CX, btnY + 95, {
    size: 22, font: FONT.sans, color: C.cream, opacity: 0.92,
  }));

  // ── THREE-DOT SEPARATOR ───────────────────────────────────────────────────
  const dotY = btnY + btnH + 46;
  els.push(Circle(CX - 22, dotY, 3.5, C.gold, 0.42));
  els.push(Circle(CX,      dotY, 3.5, C.gold, 0.80));
  els.push(Circle(CX + 22, dotY, 3.5, C.gold, 0.42));

  // ── DISCLAIMER — 20px, readable warm green-grey ───────────────────────────
  const disclaimerY = dotY + 42;
  els.push(T(CARD.disclaimer, CX, disclaimerY, {
    size: 20, font: FONT.sans, color: C.disclaimerText,
  }));

  // ── BOTTOM BOTANICAL CLUSTER ──────────────────────────────────────────────
  const botY = disclaimerY + 55;   // tighter than v3
  els.push(`<ellipse cx="${CX}"       cy="${botY + 60}"  rx="130" ry="32" fill="${C.sage}" opacity="0.09" transform="rotate(0 ${CX} ${botY + 60})"/>`);
  els.push(`<ellipse cx="${CX - 195}" cy="${botY + 100}" rx="78"  ry="22" fill="${C.sage}" opacity="0.08" transform="rotate(22 ${CX - 195} ${botY + 100})"/>`);
  els.push(`<ellipse cx="${CX + 205}" cy="${botY + 100}" rx="78"  ry="22" fill="${C.sage}" opacity="0.08" transform="rotate(-22 ${CX + 205} ${botY + 100})"/>`);

  // Small decorative mark
  const dMarkY = botY + 100;
  els.push(Diamond(CX, dMarkY, 6, C.gold, 0.30));
  els.push(L(CX - 45, dMarkY, CX - 10, dMarkY, C.gold, { sw: 0.8, opacity: 0.22 }));
  els.push(L(CX + 10, dMarkY, CX + 45, dMarkY, C.gold, { sw: 0.8, opacity: 0.22 }));

  // ── BOTTOM ACCENT + SIGNATURE ─────────────────────────────────────────────
  els.push(L(200, H - 75, 880, H - 75, C.gold, { sw: 0.8, opacity: 0.32 }));
  els.push(T(CARD.signature, CX, H - 40, {
    size: 19, font: FONT.serif, color: C.sage, style: 'italic',
  }));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    ...els,
    '</svg>',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const outputDir  = path.resolve(__dirname, '../../assets/generated/qa-cards');
  const outputFile = path.join(outputDir, 'test-inner-bloom-qa-story-v4.png');

  fs.mkdirSync(outputDir, { recursive: true });

  console.log('Vital Vision Shop — Q&A Card Generator v4');
  console.log('Product : Inner Bloom');
  console.log('Format  : Instagram Story 1080 × 1920');
  console.log('Design  : Premium wellness — deep green / gold / warm cream');
  console.log('Status  : DRAFT — Lucy approval required before use\n');

  console.log('Building SVG...');
  const svg = buildCardSVG();

  console.log('Rendering PNG...');
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(outputFile);

  const { size } = fs.statSync(outputFile);
  console.log(`\n✓ Card saved : ${outputFile}`);
  console.log(`  File size  : ${(size / 1024).toFixed(1)} KB`);
  console.log('  Next step  : Open in Preview — review against approval checklist.');
  console.log('\nDO NOT PUBLISH until Lucy has reviewed and approved this card.');
}

main().catch(err => {
  console.error('\n✗ Error generating card:', err.message);
  process.exit(1);
});
