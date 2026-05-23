# Inner Bloom Result Page — Native Shopify HTML/CSS v6 Compact
# Page: Inner Bloom — Your Wellness Match
# URL handle: inner-bloom-result
# Vital Vision Shop
# Generated: 2026-05-13
# Version: v6-compact — shorter conversion-focused quiz result page
# Sections: 6 (down from 8 in v5). ~45% shorter.
# Status: DRAFT — not published. Paste into Shopify Pages content editor only.
# Compliance: All copy validated. No prohibited medical claims.

---

## HTML/CSS — Paste Everything Below Into Shopify HTML Editor

```html
<!-- ============================================================
     VV Inner Bloom Result Page — Native HTML/CSS v6 Compact
     Vital Vision Shop | inner-bloom-result
     6 sections. No JavaScript. Shopify CDN images only.
     Draft only.
     ============================================================ -->

<style>

/* ══════════════════════════════════════════════════════════════
   REFRESH THEME — PAGE TITLE HIDE
   Targets every selector Shopify Refresh uses for the page h1.
   display:none collapses the element + its margin so no gap remains.
   ══════════════════════════════════════════════════════════════ */
h1.main-page-title,
.main-page-title,
.page-width > h1:first-child,
.page-width--narrow > h1:first-child,
h1.page-title,
h1.page__title,
.page__heading,
.page-header__heading,
.shopify-section h1.main-page-title { display: none !important; }

/* ══════════════════════════════════════════════════════════════
   REFRESH THEME — REMOVE TOP GAP
   After hiding the h1, Refresh's .page-width section still has
   vertical padding. Negative margin-top on .vvp6 cancels this.
   Typical Refresh default: 36–48px. Adjust if a gap appears.
   ══════════════════════════════════════════════════════════════ */
.rte > .vvp6:first-child,
.rte .vvp6 { margin-top: 0 !important; }

/* ══════════════════════════════════════════════════════════════
   RESET + SCOPE
   All styles scoped to .vvp6 to avoid touching any other page.
   ══════════════════════════════════════════════════════════════ */
.vvp6 *, .vvp6 *::before, .vvp6 *::after { box-sizing: border-box; margin: 0; padding: 0; }

.vvp6 {
  font-family: inherit;
  line-height: 1.6;
  color: #1E3A2F;

  /* ── Refresh theme: full-width breakout ──────────────────────
     The Refresh page template renders content inside:
       .page-width (or .page-width--narrow) → .rte → [our content]
     .page-width has a max-width + horizontal padding that caps us.
     This technique escapes that constraint to achieve full-width
     sections while staying in document flow (no position:fixed).
     Works without editing any theme file.
  ──────────────────────────────────────────────────────────────*/
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  /* Clip any shadow/border that bleeds beyond the viewport edge */
  overflow-x: hidden;

  /* Cancel top gap from Refresh section padding (~44px default).
     Increase magnitude (e.g. -56px) if a gap still appears above
     the hero. Decrease (e.g. -32px) if the hero is clipped at top. */
  margin-top: -44px;
}

/* ── Neutralize Refresh .rte inherited styles inside our wrapper ──
   Refresh injects .rte typography (link colors, paragraph margins,
   heading sizes) into page content. These overrides reset them so
   our component classes control all visual output.
────────────────────────────────────────────────────────────────── */
.vvp6 p,
.vvp6 h1,
.vvp6 h2,
.vvp6 h3,
.vvp6 h4          { margin-block: 0 !important; }
.vvp6 a            { text-decoration: none !important; color: inherit !important; }
.vvp6 ul,
.vvp6 ol           { list-style: none !important; }
.vvp6 img          { display: block; max-width: 100% !important; height: auto; }
.vvp6 strong       { font-weight: 700; }

/* ── Divider ── */
.v6-divider { border: none; border-top: 1px solid #E8DDC8; margin: 0; }

/* ── Backgrounds ── */
.v6-bg-green { background: #0F3B2E; }
.v6-bg-cream { background: #FFF8EC; }
.v6-bg-soft  { background: #F7F1E6; }
.v6-bg-white { background: #FFFFFF; }
.v6-bg-trust { background: #E2EDE6; }

/* ── Section + inner wrappers ── */
.v6-section    { width: 100%; padding: 48px 20px; }
.v6-inner      { max-width: 720px;  margin: 0 auto; width: 100%; }
.v6-inner-wide { max-width: 1060px; margin: 0 auto; width: 100%; }

/* ── Typography ── */
.v6-eyebrow-gold {
  display: inline-block; font-size: 11px; letter-spacing: .14em;
  text-transform: uppercase; color: #F4C430; font-weight: 700; margin-bottom: 14px;
}
.v6-eyebrow-dark {
  display: block; font-size: 11px; letter-spacing: .14em;
  text-transform: uppercase; color: #0F3B2E; font-weight: 700;
  opacity: .5; margin-bottom: 10px;
}
.v6-h2  { font-size: 24px; font-weight: 500; line-height: 1.25; color: #0F3B2E; margin-bottom: 14px; }
.v6-body { font-size: 15px; line-height: 1.75; color: #5F6B63; }

/* ── Buttons ── */
.v6-btn {
  display: block; width: 100%; text-align: center;
  font-size: 15px; font-weight: 700; letter-spacing: .04em;
  padding: 15px 28px; border-radius: 4px;
  min-height: 50px; line-height: 1.25;
  cursor: pointer; text-decoration: none;
}
.v6-btn-gold    { background: #F4C430; color: #0F3B2E; }
.v6-btn-outline {
  background: transparent; color: #0F3B2E;
  border: 2px solid #0F3B2E;
  font-size: 14px; min-height: 44px; padding: 11px 24px;
}

/* ══════════════════════════════════════════════════════════════
   1 — PREMIUM SPLIT HERO (compact padding)
   Mobile: lifestyle image above (220px), copy below.
   Desktop: copy left 52%, image right 48%, min-height 480px.
   ══════════════════════════════════════════════════════════════ */
.v6-hero {
  display: grid; grid-template-columns: 1fr;
  background: #0F3B2E; overflow: hidden; width: 100%;
}
.v6-hero-img-col { order: 1; overflow: hidden; height: 220px; }
.v6-hero-img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 18%; display: block;
}
.v6-hero-copy {
  order: 2; padding: 40px 20px 48px;
  display: flex; flex-direction: column; align-items: flex-start;
}
.v6-hero-h1 {
  font-size: 30px; font-weight: 500; line-height: 1.15;
  color: #FFFFFF; margin-bottom: 12px;
}
.v6-hero-sub {
  font-size: 15px; line-height: 1.65;
  color: rgba(255,248,236,.88); margin-bottom: 24px; max-width: 380px;
}
.v6-hero-disclaimer {
  margin-top: 12px; font-size: 11px;
  color: rgba(255,248,236,.45); line-height: 1.6;
}

/* ══════════════════════════════════════════════════════════════
   2 — PRODUCT MATCH CARD
   Mobile: product image above, copy below.
   Desktop: product image left 36%, copy right 64%.
   ══════════════════════════════════════════════════════════════ */
.v6-product-card {
  border: 1px solid #E8DDC8; border-radius: 12px;
  overflow: hidden; background: #FFFFFF;
  box-shadow: 0 4px 24px rgba(0,0,0,.08);
  margin-top: 28px;
  display: grid; grid-template-columns: 1fr;
}
.v6-product-img-col {
  background: #F7F1E6; min-height: 220px;
  display: flex; align-items: center; justify-content: center; padding: 28px;
}
.v6-product-img {
  width: 100%; max-width: 180px; object-fit: contain; display: block; margin: 0 auto;
}
.v6-product-copy { padding: 28px 24px; display: flex; flex-direction: column; justify-content: center; }
.v6-badge {
  display: inline-block; background: #F4C430; color: #0F3B2E;
  font-size: 10px; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; padding: 4px 10px; border-radius: 2px;
  margin-bottom: 12px; align-self: flex-start;
}
.v6-product-name { font-size: 19px; font-weight: 500; color: #0F3B2E; line-height: 1.3; margin-bottom: 8px; }
.v6-product-desc { font-size: 14px; color: #5F6B63; line-height: 1.7; margin-bottom: 14px; }
.v6-product-bullets { margin-bottom: 20px; }
.v6-product-bullets li {
  font-size: 14px; color: #5F6B63; line-height: 1.6;
  padding: 4px 0 4px 18px; position: relative;
}
.v6-product-bullets li::before {
  content: '✦'; position: absolute; left: 0; color: #F4C430; font-size: 10px; top: 6px;
}
.v6-product-note { margin-top: 10px; font-size: 11px; color: #5F6B63; opacity: .65; }

/* ══════════════════════════════════════════════════════════════
   3 — WHY THIS MATCH + 4 COMPACT BENEFIT CARDS (one section)
   ══════════════════════════════════════════════════════════════ */
.v6-why-inner { max-width: 540px; margin: 0 auto; text-align: center; }
.v6-why-body  { font-size: 15px; line-height: 1.75; color: #5F6B63; margin-top: 12px; }

/* 4-card grid: 2-col mobile, 4-col desktop */
.v6-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 28px; }
.v6-card {
  background: #FFFFFF; border: 1px solid #E8DDC8; border-radius: 10px;
  padding: 20px 16px; box-shadow: 0 1px 8px rgba(0,0,0,.05);
}
.v6-card-icon  { font-size: 24px; margin-bottom: 10px; display: block; }
.v6-card-title { font-size: 13px; font-weight: 600; color: #0F3B2E; margin-bottom: 5px; line-height: 1.35; }
.v6-card-body  { font-size: 12px; color: #5F6B63; line-height: 1.55; }

/* ══════════════════════════════════════════════════════════════
   4 — DAILY RITUAL CARD + TRUST STRIP (combined section)
   Desktop: product image left / 3 numbered steps right.
   Trust strip appears directly below the card.
   ══════════════════════════════════════════════════════════════ */
.v6-ritual-card {
  border: 1px solid #E8DDC8; border-radius: 12px;
  overflow: hidden; background: #FFF8EC;
  box-shadow: 0 2px 14px rgba(0,0,0,.05);
  display: grid; grid-template-columns: 1fr;
}
.v6-ritual-img-col {
  display: none; /* hidden on mobile */
  background: #F0E9DC;
  align-items: center; justify-content: center; padding: 36px 28px;
}
.v6-ritual-img { width: 100%; max-width: 160px; object-fit: contain; display: block; margin: 0 auto; }
.v6-ritual-steps-col { padding: 28px 24px; }

.v6-steps { margin-top: 6px; }
.v6-step {
  display: flex; gap: 16px; align-items: flex-start;
  padding-bottom: 22px; margin-bottom: 22px; border-bottom: 1px solid #E8DDC8;
}
.v6-step:last-of-type { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
.v6-step-num   { font-size: 38px; font-weight: 300; color: #F4C430; line-height: 1; min-width: 44px; flex-shrink: 0; }
.v6-step-title { font-size: 14px; font-weight: 600; color: #0F3B2E; margin-bottom: 4px; }
.v6-step-body  { font-size: 13px; color: #5F6B63; line-height: 1.6; }

/* Trust strip (inside combined section, below ritual card) */
.v6-trust-strip {
  margin-top: 20px; padding: 16px 18px;
  background: #E2EDE6; border: 1px solid #C0D4C6; border-radius: 8px;
}
.v6-trust-row {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 12px; color: #3A5448; line-height: 1.6; margin-bottom: 10px;
}
.v6-trust-row:last-child { margin-bottom: 0; }
.v6-trust-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }
.v6-trust-fda-inline {
  margin-top: 14px; padding-top: 14px; border-top: 1px solid #C0D4C6;
  font-size: 11px; color: #5F6B63; font-style: italic; line-height: 1.65;
}
.v6-trust-fda-inline strong { font-style: normal; color: #1E3A2F; }

/* ══════════════════════════════════════════════════════════════
   5 — FAQ (3 questions — native details/summary, no JavaScript)
   ══════════════════════════════════════════════════════════════ */
.v6-accordion { margin-top: 20px; }
.v6-details {
  border: 1px solid #E8DDC8; border-radius: 8px;
  background: #FFFFFF; overflow: hidden;
  margin-bottom: 8px; box-shadow: 0 1px 5px rgba(0,0,0,.04);
}
.v6-details summary {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 18px; font-size: 14px; font-weight: 600; color: #0F3B2E;
  cursor: pointer; user-select: none; list-style: none;
}
.v6-details summary::-webkit-details-marker { display: none; }
.v6-details summary::after { content: '+'; font-size: 22px; color: #F4C430; flex-shrink: 0; margin-left: 10px; line-height: 1; }
.v6-details[open] summary::after { content: '−'; }
.v6-details-body {
  padding: 14px 18px 18px; border-top: 1px solid #E8DDC8;
  font-size: 13px; color: #5F6B63; line-height: 1.7;
}

/* ══════════════════════════════════════════════════════════════
   6 — FINAL CTA BAR (compact)
   ══════════════════════════════════════════════════════════════ */
.v6-final-cta { padding: 64px 20px; text-align: center; background: #0F3B2E; }
.v6-final-h2  { font-size: 26px; font-weight: 500; line-height: 1.25; color: #FFFFFF; margin-bottom: 12px; }
.v6-final-body { font-size: 15px; line-height: 1.7; color: rgba(255,248,236,.88); max-width: 420px; margin: 0 auto 24px; }
.v6-retake { display: block; margin-top: 16px; font-size: 13px; color: rgba(255,248,236,.55); text-decoration: underline; text-underline-offset: 3px; }
.v6-final-disclaimer { margin-top: 18px; font-size: 11px; color: rgba(255,248,236,.38); line-height: 1.6; }

/* ══════════════════════════════════════════════════════════════
   DESKTOP — min-width: 768px
   ══════════════════════════════════════════════════════════════ */
@media(min-width: 768px) {

  .v6-section { padding: 64px 40px; }
  .v6-h2      { font-size: 30px; }

  /* Hero */
  .v6-hero         { grid-template-columns: 52% 48%; min-height: 480px; }
  .v6-hero-copy    { order: 1; padding: 64px 56px; justify-content: center; }
  .v6-hero-img-col { order: 2; height: auto; }
  .v6-hero-img     { object-position: center right; height: 100%; border-radius: 20px 0 0 20px; }
  .v6-hero-h1      { font-size: 42px; }

  /* Buttons */
  .v6-btn { display: inline-block; width: auto; }

  /* Product card */
  .v6-product-card    { grid-template-columns: 36% 64%; }
  .v6-product-img-col { min-height: 300px; padding: 40px 32px; border-right: 1px solid #E8DDC8; }
  .v6-product-img     { max-width: 170px; }
  .v6-product-copy    { padding: 40px 40px; }
  .v6-product-name    { font-size: 21px; }

  /* Benefit cards — 4-column */
  .v6-cards { grid-template-columns: repeat(4, 1fr); gap: 14px; }

  /* Ritual card — image left, steps right */
  .v6-ritual-card      { grid-template-columns: 32% 68%; }
  .v6-ritual-img-col   { display: flex; border-right: 1px solid #E8DDC8; }
  .v6-ritual-steps-col { padding: 36px 40px; }

  /* Final CTA */
  .v6-final-cta  { padding: 88px 40px; }
  .v6-final-h2   { font-size: 34px; }
}

</style>

<div class="vvp6">

  <!-- ════════════════════════════════════════════════════════════
       1 — PREMIUM SPLIT HERO
       ════════════════════════════════════════════════════════════ -->
  <div class="v6-hero">

    <div class="v6-hero-img-col">
      <img
        src="https://cdn.shopify.com/s/files/1/0686/6108/4253/files/inner-bloom-hero-wellness_jpg.jpg?v=1778624647"
        alt="Calm morning wellness routine for Inner Bloom quiz result"
        class="v6-hero-img"
        loading="eager"
        decoding="async"
      >
    </div>

    <div class="v6-hero-copy">
      <span class="v6-eyebrow-gold">YOUR QUIZ RESULT ✨</span>
      <h1 class="v6-hero-h1">Your Inner Bloom Ritual ✨</h1>
      <p class="v6-hero-sub">A simple daily match selected for your wellness goals.</p>
      <a href="/products/advanced-probiotic-formula" class="v6-btn v6-btn-gold">Shop This Match →</a>
      <p class="v6-hero-disclaimer">Educational only. Not medical advice. Results may vary.</p>
    </div>

  </div>

  <!-- ════════════════════════════════════════════════════════════
       2 — PRODUCT MATCH CARD
       ════════════════════════════════════════════════════════════ -->
  <div class="v6-section v6-bg-cream">
    <div class="v6-inner-wide">
      <span class="v6-eyebrow-dark">Your Daily Match</span>
      <h2 class="v6-h2">Your personalized wellness match.</h2>
      <div class="v6-product-card">

        <div class="v6-product-img-col">
          <img
            src="https://cdn.shopify.com/s/files/1/0686/6108/4253/files/1772568678929-generated-label-image-0.jpg?v=1772572525"
            alt="Inner Bloom Advanced Probiotic Formula"
            class="v6-product-img"
            loading="lazy"
            decoding="async"
          >
        </div>

        <div class="v6-product-copy">
          <span class="v6-badge">YOUR MATCH</span>
          <p class="v6-product-name">Inner Bloom — Advanced Probiotic Formula</p>
          <p class="v6-product-desc">Designed to support your daily gut wellness routine.</p>
          <ul class="v6-product-bullets">
            <li>May support daily gut balance</li>
            <li>Designed for a simple morning ritual</li>
            <li>Made for consistent everyday wellness</li>
          </ul>
          <a href="/products/advanced-probiotic-formula" class="v6-btn v6-btn-gold">View Product →</a>
          <p class="v6-product-note">Educational only. Not medical advice. Results may vary.</p>
        </div>

      </div>
    </div>
  </div>

  <hr class="v6-divider">

  <!-- ════════════════════════════════════════════════════════════
       3 — WHY THIS MATCH + 4 COMPACT BENEFIT CARDS
       ════════════════════════════════════════════════════════════ -->
  <div class="v6-section v6-bg-soft">
    <div class="v6-inner-wide">
      <div class="v6-why-inner">
        <span class="v6-eyebrow-dark">Why Inner Bloom?</span>
        <h2 class="v6-h2">Your answers pointed here.</h2>
        <p class="v6-why-body">Your quiz suggests a gentle daily gut wellness ritual may fit your current goals. Inner Bloom is designed to support consistency from within.</p>
      </div>
      <div class="v6-cards">

        <div class="v6-card">
          <span class="v6-card-icon">🌿</span>
          <p class="v6-card-title">May Support Gut Balance</p>
          <p class="v6-card-body">A probiotic blend designed to complement healthy digestion as part of a daily routine.</p>
        </div>

        <div class="v6-card">
          <span class="v6-card-icon">🌅</span>
          <p class="v6-card-title">Morning Ritual Ready</p>
          <p class="v6-card-body">One simple step — take Inner Bloom with water each morning as part of your self-care.</p>
        </div>

        <div class="v6-card">
          <span class="v6-card-icon">✦</span>
          <p class="v6-card-title">Everyday Wellness</p>
          <p class="v6-card-body">Made to support your daily wellness routine from within — no complicated regimen.</p>
        </div>

        <div class="v6-card">
          <span class="v6-card-icon">☀️</span>
          <p class="v6-card-title">Built for Consistency</p>
          <p class="v6-card-body">The best wellness ritual is one you can keep. One step, every day, designed for real life.</p>
        </div>

      </div>
    </div>
  </div>

  <hr class="v6-divider">

  <!-- ════════════════════════════════════════════════════════════
       4 — DAILY RITUAL CARD + TRUST STRIP (combined)
       Desktop: product image left / numbered steps right.
       Trust strip directly below card.
       ════════════════════════════════════════════════════════════ -->
  <div class="v6-section v6-bg-cream">
    <div class="v6-inner-wide">
      <span class="v6-eyebrow-dark">Your Ritual</span>
      <h2 class="v6-h2">Your Simple Morning Routine</h2>
      <div class="v6-ritual-card">

        <div class="v6-ritual-img-col">
          <img
            src="https://cdn.shopify.com/s/files/1/0686/6108/4253/files/1772568678929-generated-label-image-0.jpg?v=1772572525"
            alt="Inner Bloom Advanced Probiotic Formula"
            class="v6-ritual-img"
            loading="lazy"
            decoding="async"
          >
        </div>

        <div class="v6-ritual-steps-col">
          <div class="v6-steps">

            <div class="v6-step">
              <span class="v6-step-num">01</span>
              <div>
                <p class="v6-step-title">Morning — Take Inner Bloom</p>
                <p class="v6-step-body">Take Inner Bloom with a full glass of water, ideally at the same time each day.</p>
              </div>
            </div>

            <div class="v6-step">
              <span class="v6-step-num">02</span>
              <div>
                <p class="v6-step-title">Daily — Support Your Wellness</p>
                <p class="v6-step-body">Pair with a balanced diet and hydration to complement your overall wellness goals.</p>
              </div>
            </div>

            <div class="v6-step">
              <span class="v6-step-num">03</span>
              <div>
                <p class="v6-step-title">Stay Consistent</p>
                <p class="v6-step-body">Use consistently as directed and observe how it fits your routine. Results may vary.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- Trust strip — directly below ritual card -->
      <div class="v6-trust-strip">
        <div class="v6-trust-row">
          <span class="v6-trust-icon">🇺🇸</span>
          <span>Made in USA with globally sourced ingredients.</span>
        </div>
        <div class="v6-trust-row">
          <span class="v6-trust-icon">📋</span>
          <span>Dietary supplement — not a pharmaceutical. Always follow label directions.</span>
        </div>
        <div class="v6-trust-fda-inline">
          <strong>FDA Disclaimer:</strong> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. This page is for educational purposes only and does not constitute medical advice. Consult a qualified healthcare professional before starting any new supplement.
        </div>
      </div>
    </div>
  </div>

  <hr class="v6-divider">

  <!-- ════════════════════════════════════════════════════════════
       5 — FAQ (3 questions only)
       ════════════════════════════════════════════════════════════ -->
  <div class="v6-section v6-bg-white">
    <div class="v6-inner">
      <span class="v6-eyebrow-dark">Questions</span>
      <h2 class="v6-h2">Quick Answers</h2>
      <div class="v6-accordion">

        <details class="v6-details">
          <summary>What makes Inner Bloom right for me?</summary>
          <div class="v6-details-body">Based on your quiz answers, your wellness focus is gut and digestive support. Inner Bloom is formulated as a daily complement to a balanced diet — not a replacement for medical care. Individual results will vary.</div>
        </details>

        <details class="v6-details">
          <summary>How do I take Inner Bloom?</summary>
          <div class="v6-details-body">Follow the directions on the product label. Most customers take Inner Bloom once daily with a full glass of water each morning. Results may vary.</div>
        </details>

        <details class="v6-details">
          <summary>Is this page a medical recommendation?</summary>
          <div class="v6-details-body">No. This is a personalized wellness match based on your quiz answers. It is educational only and not medical advice. Consult a qualified healthcare professional before starting any new supplement.</div>
        </details>

      </div>
    </div>
  </div>

  <hr class="v6-divider">

  <!-- ════════════════════════════════════════════════════════════
       6 — FINAL CTA BAR
       ════════════════════════════════════════════════════════════ -->
  <div class="v6-final-cta">
    <h2 class="v6-final-h2">Ready to Start Your Daily Ritual?</h2>
    <p class="v6-final-body">Inner Bloom is waiting for you. One simple step, every morning.</p>
    <a href="/products/advanced-probiotic-formula" class="v6-btn v6-btn-gold">Shop This Match →</a>
    <a href="/" class="v6-retake">← Retake the Quiz</a>
    <p class="v6-final-disclaimer">Results may vary. Educational only. Not medical advice.</p>
  </div>

</div>
<!-- ============================================================
     End VV Inner Bloom Result Page v6 Compact
     ============================================================ -->
```

---

*Draft only. Not published. Not applied to Shopify.*
