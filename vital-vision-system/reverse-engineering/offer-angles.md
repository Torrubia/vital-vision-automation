# Offer Angles — Vital Vision Shop
# vital-vision-system/reverse-engineering/offer-angles.md
#
# PURPOSE: Track offer positioning angles that can be adapted for Vital Vision Shop.
# SOURCE: Intelligence extracted from scripts/generate-organic-content-queue.js CONTENT_PLAN
# RULE: Use the angle as inspiration only. All VV offer language must be original.
# Do not copy competitor offers, discounts, guarantees, or specific claims.

Updated: 2026-09-01

---

## Angle Schema

Each entry tracks:
- Angle name and type
- Core positioning premise
- Emotional trigger
- Product match
- Funnel stage suitability
- VV adaptation notes
- Compliance risk
- Source competitor (for traceability)

---

## Populated Offer Angles

### ANGLE-001: Ingredient Transparency
- **Source Competitor:** Ritual
- **Product Match:** Inner Balance (daily multivitamin)
- **Funnel Stage:** TOFU → MOFU
- **Core Premise:** "You deserve to know exactly what's in your supplements — and why each ingredient is there." Education-first. No mystery. No fillers. Full traceability of what goes into the formula.
- **Emotional Trigger:** Trust + curiosity + informed consumer identity. "I'm someone who reads labels."
- **Customer Pain Addressed:** Confusion and skepticism about supplement quality. "I don't know what I'm actually taking."
- **VV Positioning Angle:** Inner Balance ingredient transparency series. Lead with what's in it and why. Every ingredient has a purpose. Nothing unnecessary.
- **Content Hooks this Enables:**
  - "Nobody talks about what's actually in a daily multivitamin. Let me break it down."
  - "What's actually in your daily vitamin? Most people have no idea."
  - "Curious what's actually in Inner Balance? [Tap to explore]"
- **CTA Pattern:** Curiosity-to-education → "Link in bio" / "Explore Inner Balance →"
- **Compliance Risk:** LOW — curiosity and education framing only; no outcome claims; no disease language
- **VV Adaptation Note:** Lead with ingredient education, not results. "Designed with [ingredient] to support daily wellness." Never claim outcomes.
- **Metrics:** Saves, profile visits from educational content, link-in-bio clicks

---

### ANGLE-002: Microbiome Literacy / Gut Wellness Education
- **Source Competitor:** Seed
- **Product Match:** Inner Bloom (probiotic)
- **Funnel Stage:** TOFU → MOFU
- **Core Premise:** "The gut wellness space is confusing — let's clarify it." Knowledge-leader positioning. Educate the customer before selling to them. The brand that explains wins the trust.
- **Emotional Trigger:** Curiosity + intellectual empowerment + mild skepticism of the gut wellness industry.
- **Customer Pain Addressed:** "I don't know what probiotic support actually means." Gut wellness literacy gap.
- **VV Positioning Angle:** Inner Bloom gut wellness literacy series. Teach what probiotic support actually means — in plain language. No jargon, no scare tactics, just education.
- **Content Hooks this Enables:**
  - "I had no idea what 'gut support' actually meant — so I started researching. Here's what I found."
  - "The gut wellness question no one is asking — but everyone should be."
  - "Curious about probiotic support for your daily routine? [Tap to explore]"
- **CTA Pattern:** Research-framing → "Details in bio" / "Discover Inner Bloom →"
- **Compliance Risk:** LOW — no IBS/leaky gut/disease terms; educational framing only; no outcome promises
- **VV Adaptation Note:** Never use disease names as hooks. Frame as curiosity and education. "Inner Bloom is designed to support daily gut wellness" — not to treat or cure anything.
- **Metrics:** Carousel save rate, comment quality (educational engagement), view-through rate on Reels

---

### ANGLE-003: Ritual Simplification / Daily Wellness Permission
- **Source Competitor:** Love Wellness
- **Product Match:** Inner Bloom + Inner Calm (probiotic + magnesium pair); applicable to all VV products
- **Funnel Stage:** MOFU → BOFU
- **Core Premise:** "Your daily wellness ritual doesn't need to be complicated." Permission-giving. Accessible, not prescriptive. Community-building over perfection-demanding. Product as ritual tool, not fix.
- **Emotional Trigger:** Relief + belonging + identity alignment ("I'm someone who takes care of myself, my way").
- **Customer Pain Addressed:** Wellness overwhelm. Routines that feel too complex, too expensive, too demanding. "I don't know where to start."
- **VV Positioning Angle:** Inner Bloom + Inner Calm daily ritual series. Two products, one simple ritual. "This is what belongs in your routine." No overwhelming wellness protocol — just what actually fits.
- **Content Hooks this Enables:**
  - "My morning ritual has one rule: I only keep things that actually belong in my routine."
  - "Your daily wellness ritual doesn't need to be complicated."
  - "Your daily wellness ritual starts here. [Tap to explore]"
- **CTA Pattern:** Community + identity → "Build your ritual → link in bio" / "Tell us below" / "Tap to explore →"
- **Compliance Risk:** LOW — lifestyle and ritual framing only; no hormone or digestive treatment claims; product as routine element not cure
- **VV Adaptation Note:** Frame products as ritual tools, not fixes. "Designed to complement a daily self-care ritual." Never "fixes bloating" or "calms anxiety." Permission-giving tone is the mechanism — "you don't need to be perfect."
- **Metrics:** Comment engagement rate, saves, story tap-through rate (TTR)

---

### ANGLE-004: Ritual Angle (General Template)
- **Type:** Lifestyle / Identity
- **Use Cases:** Evening ritual (Inner Calm), morning ritual (Inner Balance, Inner Bloom), beauty ritual (Inner Grow)
- **Core Premise:** Position the product as a deliberate part of an intentional daily ritual, not a random supplement.
- **Emotional Trigger:** Identity + intentionality + self-care ownership
- **VV Adaptation Note:** "Part of a balanced self-care ritual." Ritual framing transforms supplement into lifestyle.
- **Compliance Risk:** LOW

### ANGLE-005: Quiz / Product Discovery Angle
- **Type:** Consideration / Interactive
- **Use Cases:** All products — quiz funnel entry point
- **Core Premise:** "Find out which VV product belongs in your routine." Curiosity + personalization.
- **Organic Quiz URL:** `https://www.vitalvision.shop/#finder-quiz-16047`
- **VV Adaptation Note:** Quiz framing reduces decision friction. "Not sure which one is right for you?" CTA to quiz, not to a specific product page.
- **Compliance Risk:** LOW — no claims; discovery framing

### ANGLE-006: Education / Knowledge-Leader Angle
- **Type:** TOFU Content
- **Use Cases:** All products — ingredient education, category education
- **Core Premise:** Brand that educates wins the trust. Content first, product second.
- **VV Adaptation Note:** Educational content drives saves and profile visits — which drive link-in-bio clicks over time. Not every piece needs a product CTA.
- **Compliance Risk:** LOW

### ANGLE-007: Founder / Behind-the-Scenes Angle
- **Type:** Trust-building / TOFU–MOFU
- **Use Cases:** Brand story, product origin, formulation decisions
- **VV Adaptation Note:** Requires Lucy's personal content approval. Personal brand clone agent workflow applies (`agents/personal-brand-clone-agent.md`).
- **Compliance Risk:** LOW if framed as brand story, not personal health results

---

## Angle-to-Content Mapping

| Angle | Best Format | Funnel Stage | Primary Metric |
|---|---|---|---|
| Ingredient Transparency | UGC Video + Carousel | TOFU | Saves, Profile visits |
| Microbiome Literacy | Carousel + UGC Video | TOFU | Saves, Comment quality |
| Ritual Simplification | UGC Video + Story CTA | MOFU–BOFU | Comments, TTR |
| Ritual (general) | Story CTA + Feed Post | MOFU–BOFU | TTR, Link clicks |
| Quiz Discovery | Story CTA + Reel | MOFU | Quiz clicks |
| Education / Knowledge-Leader | Carousel + Feed Post | TOFU | Saves |
| Founder / BTS | Feed Post + Reel | TOFU–MOFU | Comments, Shares |

---

## What NOT to Copy

- Competitor offers, discounts, or guarantee structures
- Specific promotional language from competitor campaigns
- Any before/after or results-based offer framing
- Disease names used as offer anchors (e.g. "For IBS sufferers")
- Medical authority claims in offer positioning
