# Q&A Card Generator — Node/sharp Spec
# Vital Vision Shop

Version: 1.0
Created: 2026-05-27
Status: SPEC ONLY — Not yet implemented
Runtime: Node.js
Library: sharp (https://sharp.pixelplumbing.com/)

---

## Purpose

This spec defines how to build a Node/sharp script that generates branded Q&A cards, carousel slides, Story cards, and feed graphics for Vital Vision Shop from a structured card spec input.

The script does not call any external API. It does not read .env. It does not publish anything. It generates PNG files locally and saves them to assets/generated/qa-cards/.

---

## Dependencies

```json
{
  "sharp": "^0.33.x",
  "canvas": "^2.11.x"
}
```

Note: `sharp` handles image compositing and resizing. `canvas` (node-canvas) is needed for text rendering. Alternatively, text can be rendered as SVG and composited via sharp without node-canvas.

Recommended approach: SVG text layers composited with sharp. No additional native dependencies beyond sharp.

---

## Script Entry Point

```
scripts/image/generate-qa-card.js
```

Usage:
```bash
node scripts/image/generate-qa-card.js --input <spec-file.json> --output assets/generated/qa-cards/
```

Batch usage (carousel set):
```bash
node scripts/image/generate-qa-card.js --input <carousel-spec.json> --output assets/generated/qa-cards/ --batch
```

---

## Input Format — Card Spec JSON

Each card is defined as a JSON object. A carousel is an array of card objects.

### Single Card Spec

```json
{
  "id": "2026-05-27-inner-bloom-balloon-qa-story-v1",
  "type": "qa-story",
  "canvas": {
    "width": 1080,
    "height": 1920,
    "backgroundColor": "#FAF8F5"
  },
  "layers": [
    {
      "type": "text",
      "role": "product-tag",
      "content": "Inner Bloom",
      "font": "Jost-Medium",
      "size": 28,
      "color": "#B8C4B1",
      "align": "center",
      "x": 540,
      "y": 120,
      "maxWidth": 900
    },
    {
      "type": "text",
      "role": "question-label",
      "content": "You asked:",
      "font": "Jost-Light",
      "size": 24,
      "color": "#D9C9B0",
      "align": "center",
      "x": 540,
      "y": 340,
      "maxWidth": 900
    },
    {
      "type": "text",
      "role": "question",
      "content": "Why do I feel so full and heavy after eating, even when I eat healthy?",
      "font": "CormorantGaramond-Regular",
      "size": 68,
      "color": "#3B4A3F",
      "align": "center",
      "x": 540,
      "y": 440,
      "maxWidth": 880,
      "lineHeight": 1.3
    },
    {
      "type": "divider",
      "color": "#D9C9B0",
      "thickness": 1,
      "x1": 140,
      "x2": 940,
      "y": 820
    },
    {
      "type": "text",
      "role": "answer",
      "content": "Your digestive system works differently for everyone.\n\nA consistent daily gut-support ritual may help support digestive comfort over time.\n\nInner Bloom is designed to support daily digestive wellness as part of a simple self-care routine.",
      "font": "Jost-Regular",
      "size": 30,
      "color": "#3B4A3F",
      "align": "center",
      "x": 540,
      "y": 880,
      "maxWidth": 880,
      "lineHeight": 1.55
    },
    {
      "type": "text",
      "role": "cta",
      "content": "Comment BLOOM for the daily ritual.",
      "font": "Jost-SemiBold",
      "size": 30,
      "color": "#C4886A",
      "align": "center",
      "x": 540,
      "y": 1580,
      "maxWidth": 880
    },
    {
      "type": "text",
      "role": "disclaimer",
      "content": "Wellness support only. Not medical advice. Results may vary.",
      "font": "Jost-Light",
      "size": 20,
      "color": "#B8C4B1",
      "align": "center",
      "x": 540,
      "y": 1680,
      "maxWidth": 880
    },
    {
      "type": "text",
      "role": "brand-signature",
      "content": "Self-care starts here.",
      "font": "CormorantGaramond-LightItalic",
      "size": 22,
      "color": "#D9C9B0",
      "align": "center",
      "x": 540,
      "y": 1820,
      "maxWidth": 880
    }
  ],
  "output": {
    "filename": "2026-05-27-inner-bloom-balloon-qa-story-v1-draft.png",
    "format": "png",
    "quality": 100
  }
}
```

### Carousel Set Spec

```json
{
  "id": "2026-05-27-inner-bloom-balloon-carousel-v1",
  "type": "carousel",
  "slides": [
    { /* slide 1 card object */ },
    { /* slide 2 card object */ },
    { /* slide 3 card object */ }
  ]
}
```

---

## Layer Types

| Layer type | Description |
|---|---|
| `text` | Rendered text block. SVG-based. Supports font, size, colour, alignment, maxWidth, lineHeight. |
| `divider` | Horizontal line. Defined by x1, x2, y, colour, thickness. |
| `rect` | Filled rectangle. Useful for background accent blocks or CTA button backgrounds. |
| `image` | Composite an image file (product PNG, logo PNG) at x, y with width and height. |
| `logo` | Shorthand for image layer with the brand logo file. |

---

## Font Handling

Fonts must be bundled locally in the project — do not fetch from Google Fonts at runtime.

Font files location:
```
assets/templates/qa-cards/fonts/
```

Required font files (to be added by Lucy or designer):
```
assets/templates/qa-cards/fonts/CormorantGaramond-Regular.ttf
assets/templates/qa-cards/fonts/CormorantGaramond-Light.ttf
assets/templates/qa-cards/fonts/CormorantGaramond-LightItalic.ttf
assets/templates/qa-cards/fonts/Jost-Regular.ttf
assets/templates/qa-cards/fonts/Jost-Medium.ttf
assets/templates/qa-cards/fonts/Jost-SemiBold.ttf
assets/templates/qa-cards/fonts/Jost-Light.ttf
```

If custom fonts are not yet available, fall back to:
- Headline: Georgia (system serif)
- Body/CTA/Labels: Arial or Helvetica (system sans-serif)

SVG text rendering approach:
1. Build an SVG string for each text layer using the font, size, colour, and content.
2. Use sharp to rasterise the SVG.
3. Composite the rasterised text onto the base canvas.

---

## Script Architecture

```
generate-qa-card.js
│
├── loadSpec(inputFile)           — parse JSON spec
├── createCanvas(width, height, bg) — sharp-based blank canvas
├── renderLayer(layer)            — dispatch to layer renderer
│   ├── renderText(layer)         — SVG text → sharp composite
│   ├── renderDivider(layer)      — SVG line → sharp composite
│   ├── renderRect(layer)         — SVG rect → sharp composite
│   └── renderImage(layer)        — file → sharp composite
├── compositeAllLayers(canvas, layers) — sequential compositing
├── exportPNG(canvas, outputPath) — sharp .toFile()
└── main()                        — CLI entry, batch support
```

---

## Text Wrapping

sharp/SVG does not auto-wrap text. The script must handle wrapping manually.

Algorithm:
1. Split content string by words.
2. Measure estimated line width using (fontSize × 0.55 × characters) as a rough heuristic.
3. Break into lines at maxWidth.
4. Render each line as a separate SVG `<text>` element, incrementing `y` by `fontSize × lineHeight` per line.

For production accuracy, use `node-canvas` measureText() if available, or pre-calculate line breaks in the spec input.

---

## Output

All generated PNGs saved to: assets/generated/qa-cards/

File naming matches the spec `output.filename` field:
```
YYYY-MM-DD-[product]-[theme]-[card-type]-v[number]-draft.png
```

After Lucy approves, the file is renamed:
```
YYYY-MM-DD-[product]-[theme]-[card-type]-v[number]-approved.png
```

---

## Implementation Checklist

When ready to implement this script:

- [ ] Install sharp: `npm install sharp`
- [ ] Add font TTF files to assets/templates/qa-cards/fonts/
- [ ] Create scripts/image/generate-qa-card.js following this spec
- [ ] Test with the example single card spec above
- [ ] Test batch carousel generation
- [ ] Verify text wrapping works correctly at all font sizes
- [ ] Verify output PNG is 1080px wide at correct dimensions
- [ ] Verify all layers composite in correct order
- [ ] Run on Inner Bloom Phase 4A Q&A card as first production test
- [ ] Lucy reviews output and approves or requests adjustments

---

## Safety Rules

- Script reads local spec files only — no external API calls
- Script reads local font and image files only — no HTTP requests
- Script writes to assets/generated/qa-cards/ only
- Script does not read .env or any credentials file
- Script does not publish, schedule, or upload anything
- All output is draft until Lucy reviews and renames to -approved

---

## Example: First Card to Generate

Once implemented, the first test card should be:

Product: Inner Bloom
Theme: Stomach feels like a balloon after eating
Type: Q&A Story (1080 x 1920)
Source: content/approved/inner-bloom-phase4a-2026-05-22-approved.md

Use the example spec JSON above as the starting point.
Output: assets/generated/qa-cards/2026-05-27-inner-bloom-balloon-qa-story-v1-draft.png
