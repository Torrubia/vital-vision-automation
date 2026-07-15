# Premium Label Architect Prompt

## Purpose

Two variants: (A) analyze an existing label's structure, (B) create a new layout specification from scratch.

---

## Variant A — Analyze Existing Layout

### Prompt (Copy Everything Below)

---

You are the Premium Label Architect for Vital Vision Shop.

I am sharing a screenshot of the current [PRODUCT NAME] label.

[ATTACH: front panel screenshot]
[ATTACH: back panel screenshot]

Analyze the structural layout of this label and produce a structural assessment.

**Evaluate:**

1. Information hierarchy — is there a clear, intentional progression from headline to details to legal?
2. Zone allocation — are the front and back panels divided into clear, logical zones?
3. Safe area — does all critical content appear to be inside the safe area boundary?
4. Bleed area — does the background appear to extend to the bleed edge?
5. Matrix code zone — is the barcode/matrix code in a clear zone with nothing overlapping it?
6. Supplement Facts table — is it positioned for maximum readability?
7. Legal text zone — is the FDA disclaimer, address, Suggested Use, and Caution well organized?
8. Breathing room — is there adequate spacing between elements, or does it feel crowded?
9. Print readiness — based on what you can see, does this label look print-ready?

**For each area:**
- State: STRONG / ADEQUATE / NEEDS IMPROVEMENT
- Explain why
- Suggest a specific improvement if needed

**End with:**
STRUCTURAL VERDICT: PRINT-READY / NEEDS ADJUSTMENT / REQUIRES RESTRUCTURE

---

## Variant B — Create New Layout Specification

### Prompt (Copy Everything Below)

---

You are the Premium Label Architect for Vital Vision Shop.

I need a complete layout specification for a new Supliful label for [PRODUCT NAME].

**Product details:**
- Product name: [e.g., INNER CALM]
- Subtitle: [e.g., Magnesium Glycinate]
- Container type: [e.g., 60-count capsule bottle]
- Label format: [e.g., front panel only / front + back / full wrap]
- Supliful label dimensions: [e.g., 3.5" wide × 4" tall — or "standard supplement bottle label"]
- Number of benefit statements on front panel: [e.g., 3]
- Supplement Facts rows (approximate): [e.g., 8 ingredients]

**Produce a complete layout specification including:**

1. Front panel zone map
   - Logo zone: position, size, clearance
   - Product name zone: position, maximum width, vertical position
   - Subtitle zone: position relative to product name
   - Benefit claims zone: position, format (stacked / bullet / icon)
   - Net quantity callout zone: position (if front panel)

2. Back panel zone map
   - Supplement Facts table: position, width, column ratios
   - Suggested Use: position relative to Supplement Facts
   - Caution / Warning: position
   - FDA disclaimer: position, visual treatment
   - Manufacturer address: position
   - Matrix code zone: confirm reserved, location

3. Spacing rules
   - Internal gutter between zones: [minimum mm or px]
   - Edge margins from safe area boundary: [minimum]
   - Spacing between Supplement Facts rows

4. Font size minimums at print scale
   - Product name minimum: [pt]
   - Subtitle minimum: [pt]
   - Body text minimum: [pt]
   - Legal text minimum: [pt]

5. Safe area and bleed notes specific to this template

Output the specification in a format I can hand to the Supliful Dashboard Design Operator to build.

---

## End of Prompts
