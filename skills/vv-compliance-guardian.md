# Skill: vv-compliance-guardian
# Vital Vision Shop — Compliance Review Guardian

---

## Purpose
Review any Vital Vision content draft for FTC and FDA compliance violations before it is approved or published. Flag non-compliant language, suggest safe rewrites, and output a pass/fail verdict.

---

## When to Use
- Before approving any draft in automations/drafts/
- Before publishing any social post, ad, email, or website copy
- When unsure whether a claim crosses into disease or outcome territory
- As the final gate in the workflow: draft → compliance review → human approval → publish

---

## Inputs
- Content to review (paste full text or provide file path)
- Content type: Instagram caption / Facebook post / Reel script / Email / Ad copy / Website copy
- Product name (Inner Calm / Inner Grow / Inner Balance / Inner Bloom)

---

## Outputs
- PASS or FAIL verdict
- List of flagged phrases with line references
- Compliant rewrite suggestions for each flagged phrase
- Final compliance score (0–100)
- Revised clean copy (if FAIL)
- Saved review log to: automations/drafts/[original-filename]-compliance-review.md

---

## Vital Vision Context

### Core Products
| Product | Focus | Safe Benefit Language |
|---|---|---|
| Inner Calm | Calm evenings, overall wellness | "may support a calm evening routine" · "supports overall wellness" |
| Inner Bloom | Digestive wellness | "may support digestive comfort" · "supports microbiome balance" |
| Inner Grow | Hair, skin, nails | "supports healthy-looking hair, skin, and nails" · "nourishes from within" |
| Inner Balance | Daily wellness | "supports overall daily wellness" · "designed to support nutritional balance" |

### Quiz URLs
- Organic: https://www.vitalvision.shop/#finder-quiz-16047
- Paid traffic: https://www.vitalvision.shop/#finder-quiz-15203

---

## Safety and Compliance Rules

### Absolute Violations (auto-FAIL)
- Disease claims: cure, treat, prevent, diagnose, heals
- Named conditions used as treatment targets: anxiety, insomnia, IBS, depression, hair loss disorder
- Guaranteed outcomes: "you will feel," "guaranteed," "proven to work" (without citation)
- Before/after health transformation claims
- "FDA approved" (supplements are not FDA approved)
- "Clinically proven" without a peer-reviewed citation

### High-Risk Phrases (flag for human review)
- "helps you sleep" → prefer "may support a healthy sleep cycle"
- "reduces stress" → prefer "may support a sense of calm"
- "boosts energy" → prefer "may support natural energy levels"
- "improves digestion" → prefer "may support digestive comfort"
- "stops hair loss" → prefer "may support healthy-looking hair"

### Required Elements
- "Results may vary" wherever a benefit is stated
- FDA disclaimer on any page with product benefit claims
- No implied guarantee of outcome

---

## Example Prompt

> Use vv-compliance-guardian to review this caption:
> "Inner Calm cures stress and helps you sleep through the night — guaranteed."

**Expected output:**
- FAIL
- Flagged: "cures stress" → disease claim
- Flagged: "helps you sleep through the night" → implied treatment of insomnia
- Flagged: "guaranteed" → outcome guarantee (FTC violation)
- Suggested rewrite: "Inner Calm is designed to support a calm evening routine and overall wellness. Results may vary."

---

## Validation Checklist

- [ ] All disease claim language removed or rewritten
- [ ] No guaranteed outcome language
- [ ] No before/after health transformation framing
- [ ] "Results may vary" present wherever benefit is stated
- [ ] FDA disclaimer present (for website/email copy)
- [ ] Rewritten copy uses only structure/function language
- [ ] Verdict is PASS before forwarding to human approval
- [ ] Review log saved to automations/drafts/
