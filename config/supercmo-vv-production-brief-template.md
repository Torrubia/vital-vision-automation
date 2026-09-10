# Vital Vision — SuperCMO Production Brief Template
# config/supercmo-vv-production-brief-template.md
#
# PURPOSE: Mandatory input wrapper for every SuperCMO creative production call.
#          Embeds VV Product Truth, compliance constraints, and brand rules.
#          SuperCMO generates WITHIN these constraints — it does not override them.
#
# USAGE: Complete this template BEFORE invoking any SuperCMO production skill.
#        All fields marked REQUIRED must be filled from VV canonical sources.
#        Do NOT use SuperCMO's analyzing-products to fill Product Truth fields.
#
# SAFETY: AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true

---

## SECTION 1 — BRIEF IDENTITY

```
Date:
Batch ID (from publishing pack):
Source Publishing Pack:
Product:
Format: [UGC Video / Ad Video / Product Photography / Image Ad / Voiceover / Other]
Platform: [Instagram Reel / Instagram Feed / Instagram Story / Facebook / Other]
Dimensions: [9:16 / 1:1 / 4:5 / 16:9]
Runtime (if video): [seconds]
SuperCMO skill(s) to invoke:
```

---

## SECTION 2 — PRODUCT TRUTH (REQUIRED — from canonical sources ONLY)

Source files: `config/product-library.md` + `skills/vv-creative-brand-system.md`

DO NOT infer, generate, or allow SuperCMO to analyze VV products to fill this section.

```
Product name (exact):
Product subtitle/descriptor (exact):
Approved benefit language (copy verbatim from product-library.md):
  -
  -
  -
Key ingredient (if referenced — exact from product-library.md):
Official Shopify CDN product image URL:
```

---

## SECTION 3 — APPROVED LANGUAGE (copy directly from config/compliance-rules.md)

These are the ONLY benefit claims permitted in any generated script, copy, voiceover, or visual text.
Mirrored verbatim from `config/compliance-rules.md` → Preferred Safe Language. If the two ever
diverge, `config/compliance-rules.md` governs — update this template, never the reverse.

```
may support
helps support
designed to support
designed to complement
helps maintain
supports daily wellness
supports digestive balance
supports digestive comfort
supports gut balance
supports a calm routine
supports beauty from within
supports overall wellness
part of a consistent self-care routine
part of a daily wellness ritual
results may vary
not medical advice
```

---

## SECTION 4 — FORBIDDEN LANGUAGE (hard stop — must not appear in any generated output)

The following is prohibited in scripts, voiceover, captions, visual text, or implied visually.
The claim and phrase lists are mirrored verbatim from `config/compliance-rules.md` → Forbidden Claims
and Forbidden Phrases. That file governs; all inflections and close variants are equally forbidden.
Per its Core Rule: a disclaimer does not make an unsafe claim safe.

```
FORBIDDEN CLAIMS — never say or imply that a product can:
cure
treat
heal
fix
prevent disease
diagnose
reverse
eliminate
guarantee results
replace medical care
replace a balanced diet
work for everyone

FORBIDDEN PHRASES:
no more bloating
stop bloating
fix your gut
heal your stomach
cure digestion
eliminate gas
cure anxiety
treat insomnia
stop hair loss
grow hair fast
reverse aging
boost immunity guaranteed
detox your body from disease
clinically proven, unless verified with source
FDA approved supplement

FORBIDDEN VISUAL CONCEPTS (SuperCMO-specific — visual claims carry the same weight as spoken ones):
Before-and-after framing
Implied disease state being treated
Body shame / body comparison
Medical devices or clinical settings (stethoscopes, charts, lab coats)
Scale or measuring tape in context of product benefit
Implied guaranteed transformation
```

---

## SECTION 5 — UGC / TESTIMONIAL COMPLIANCE (applies to generating-ugc-videos only)

UGC formats carry FTC/supplement testimonial risk. Apply these rules to ALL UGC scripts:

```
PERMITTED formats:
  - Discovery / curiosity ("I started paying attention to my daily routine")
  - Education / ritual ("Here's how I added this to my morning")
  - Lifestyle / product-in-scene (natural, not promotional)
  - Unboxing (product reveal only — no result claims)

PROHIBITED formats / framings:
  - Testimonial ("After taking this, my [symptom] went away")
  - Implied result ("I feel so much better since I started")
  - Before/after narrative ("I used to feel X, now I feel Y because of this")
  - Guaranteed outcome framing ("This works, period")
  - Any reviewer claiming a specific health improvement as a result of the product

REQUIRED disclaimer (include in video description, not necessarily in video itself):
  "Wellness support only. Not medical advice. Results may vary."

FULL FDA disclaimer (include when supplement benefits are specifically mentioned):
  "These statements have not been evaluated by the Food and Drug Administration.
   This product is not intended to diagnose, treat, cure or prevent any disease."
```

---

## SECTION 6 — BRAND VOICE CONSTRAINTS

Source: `config/brand-voice.md` + `skills/vv-creative-brand-system.md`

```
TONE (always):
  - Premium, warm, educational, elegant, softly persuasive
  - Ritual-based, not aggressive
  - Trustworthy and clear

AVOID (always):
  - Aggressive sales pressure
  - Cheap promotional language
  - Miracle promises
  - Fear-based messaging
  - Exaggerated transformation claims
  - Generic wellness language with no specificity
  - Overly clinical tone

BRAND VISUAL STYLE:
  - Soft light (morning, golden hour, natural indoor)
  - Minimal, clean backgrounds
  - Calm, premium wellness aesthetic
  - Real skin texture — no over-retouching
```

---

## SECTION 7 — CREATIVE BRIEF (human-authored, VV strategy-driven)

This section is written by the VV content intelligence layer (vv-hook-multiplier, vv-organic-content-engine), NOT generated by SuperCMO.

```
Hook (from vv-hook-multiplier output):
Angle:
Funnel stage: [TOFU / MOFU / BOFU]
Awareness level: [1-Unaware / 2-Problem Aware / 3-Solution Aware / 4-Product Aware / 5-Most Aware]
Emotional truth:
Core message (one sentence):
CTA: [exact approved CTA from product-library.md or publishing pack]
Script/outline (compliance-reviewed):
  [Insert VV-generated script or outline here BEFORE invoking SuperCMO]
Actor direction (if UGC):
  Gender:
  Age range:
  Aesthetic:
  Setting:
Shot notes:
```

---

## SECTION 8 — SPEND CHECKPOINT

```
Lucy-approved spend ceiling for this production: $
Dry-run required before generation: YES (mandatory)
Storyboard approval required before video generation: YES (mandatory)
Script/concept approval required before generation: YES (mandatory)
```

---

## SECTION 9 — COMPLIANCE PRE-CHECK (complete before invoking any SuperCMO generation)

- [ ] Product Truth traced to config/product-library.md — not inferred
- [ ] No forbidden words or phrases in script/copy
- [ ] No forbidden visual concepts in shot notes or storyboard direction
- [ ] UGC format is Discovery/Education/Lifestyle/Unboxing — NOT testimonial or before/after
- [ ] Brand voice is warm, premium, educational — not aggressive or clinical
- [ ] Disclaimer language identified and noted for placement in description
- [ ] CTA uses only approved organic CTAs (no paid quiz URL finder-quiz-15203)
- [ ] Script passed compliance review before dry-run
- [ ] Spend ceiling confirmed with Lucy
- [ ] Dry-run completed before production generation

If any item above is not confirmed: STOP. Do not invoke SuperCMO generation.

---

## SECTION 10 — POST-GENERATION QA RECORD

Complete after SuperCMO delivers output:

```
Output file(s):
Product Truth match: YES / NO / FLAG
Compliance clean: YES / NO / FLAG
Brand voice match: YES / NO / FLAG
Actor consistent across clips (if video): YES / NO / N/A
CTA correct: YES / NO
Disclaimer placed: YES / NO
Lucy approval status: PENDING / APPROVED / REJECTED
Notes:
```

---

`AUTO_PUBLISH=false` | `REQUIRE_HUMAN_APPROVAL=true`
