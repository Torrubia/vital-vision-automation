# Inner Bloom Result Page — Native Shopify HTML/CSS v8 Final Mobile Crop v2
# Page: Inner Bloom — Your Wellness Match
# URL handle: inner-bloom-result
# Vital Vision Shop
# Generated: 2026-05-13
# Version: v8-final-mobile-crop-v2
# Base: v8-final-mobile-optimized — identical except mobile hero image crop fix
# Status: DRAFT — not published. Paste into Shopify Pages content editor only.
# Compliance: All copy validated. No prohibited medical claims.
#
# Changes from v8-final-mobile-optimized:
#   CHANGED — Mobile hero image object-position: 70% 20% → 78% 62%
#              Shifts crop right AND downward to reveal glass/hand at lower-right.
#              Face remains visible. Desktop crop unchanged.
#   CHANGED — Mobile hero image height: 150px → 175px (+25px vertical space)
#              More of the image is visible on mobile, reducing bottom crop.
#   UNCHANGED — Desktop object-position: center right (inside @media min-width:768px)
#   UNCHANGED — All copy, structure, CTAs, product card, trust items, compliance

---

## HTML/CSS — Paste Everything Below Into Shopify HTML Editor

```html
<!-- ============================================================
     VV Inner Bloom Result Page — Native HTML/CSS v8 Final Mobile Crop v2
     Vital Vision Shop | inner-bloom-result
     7 sections. No JavaScript. Shopify CDN images only.
     Draft only. No origin claims.
     ============================================================ -->

<style>

/* ══════════════════════════════════════════════════════════════
   REFRESH THEME — PAGE TITLE HIDE
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
   ══════════════════════════════════════════════════════════════ */
.rte > .vvp8:first-child,
.rte .vvp8 { margin-top: 0 !important; }

/* ══════════════════════════════════════════════════════════════
   RESET + SCOPE
   ══════════════════════════════════════════════════════════════ */
.vvp8 *, .vvp8 *::before, .vvp8 *::after { box-sizing: border-box; margin: 0; padding: 0; }

.vvp8 {
  font-family: inherit;
  line-height: 1.6;
  color: #1E3A2F;
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow-x: hidden;
  margin-top: -44px;
}

/* Neutralize Refresh .rte inherited styles */
.vvp8 p,
.vvp8 h1,
.vvp8 h2,
.vvp8 h3,
.vvp8 h4    { margin-block: 0 !important; }
.vvp8 a     { text-decoration: none !important; color: inherit !important; }
.vvp8 ul,
.vvp8 ol    { list-style: none !important; }
.vvp8 img   { display: block; max-width: 100% !important; height: auto; }
.vvp8 strong { font-weight: 700; }

/* ── Divider ── */
.v8-divider { border: none; border-top: 1px solid #E8DDC8; margin: 0; }

/* ── Backgrounds ── */
.v8-bg-green  { background: #0F3B2E; }
.v8-bg-cream  { background: #FFF8EC; }
.v8-bg-soft   { background: #F7F1E6; }
.v8-bg-white  { background: #FFFFFF; }

/* ── Section wrappers ── */
.v8-section    { width: 100%; padding: 32px 20px; }
.v8-inner      { max-width: 720px;  margin: 0 auto; width: 100%; }
.v8-inner-wide { max-width: 1060px; margin: 0 auto; width: 100%; }

/* ── Typography ── */
.v8-eyebrow {
  display: inline-block; font-size: 10px; letter-spacing: .10em;
  text-transform: uppercase; font-weight: 700; margin-bottom: 10px;
}
.v8-eyebrow-gold { color: #F4C430; }
.v8-eyebrow-dark { color: #0F3B2E; opacity: .55; display: block; }

.v8-h2   { font-size: 22px; font-weight: 500; line-height: 1.25; color: #0F3B2E; margin-bottom: 12px; }
.v8-body { font-size: 14px; line-height: 1.7; color: #5F6B63; }

/* ── Button ── */
.v8-btn {
  display: block; width: 100%; text-align: center;
  font-size: 15px; font-weight: 700; letter-spacing: .02em;
  padding: 14px 24px; border-radius: 4px;
  min-height: 48px; line-height: 1.25;
  cursor: pointer; text-decoration: none;
}
.v8-btn-gold { background: #F4C430; color: #0F3B2E; }

/* ══════════════════════════════════════════════════════════════
   1 — COMPACT SPLIT HERO
   Mobile: lifestyle image top, copy below.
   Desktop: copy left 52% / image right 48%, min-height 420px.
   ══════════════════════════════════════════════════════════════ */
.v8-hero {
  display: grid; grid-template-columns: 1fr;
  background: #0F3B2E; overflow: hidden; width: 100%;
}
.v8-hero-img-col {
  order: 1; overflow: hidden;
  height: 175px; /* CROP FIX v2: was 150px, +25px to show more of the image */
}
.v8-hero-img {
  width: 100%; height: 100%; display: block;
  object-fit: cover;

  /* CROP FIX v2: 78% right + 62% down.
     Moves crop toward the lower-right where the glass/hand sits.
     Face stays in frame at upper portion of the visible area.
     Desktop overrides this below in @media(min-width:768px). */
  object-position: 78% 62%;
}
.v8-hero-copy {
  order: 2; padding: 24px 20px 28px;
  display: flex; flex-direction: column; align-items: flex-start;
}
.v8-hero-h1 {
  font-size: 26px; font-weight: 500; line-height: 1.15;
  color: #FFFFFF; margin-bottom: 10px; letter-spacing: -.01em;
}
.v8-hero-sub {
  font-size: 14px; line-height: 1.6;
  color: rgba(255,248,236,.85); margin-bottom: 20px; max-width: 340px;
}
.v8-hero-note {
  margin-top: 16px;
  font-size: 12px;
  line-height: 1.4;
  color: rgba(255,248,236,.75);
}

/* ══════════════════════════════════════════════════════════════
   2 — PRODUCT MATCH CARD
   ══════════════════════════════════════════════════════════════ */
.v8-product-card {
  border: 1px solid #E8DDC8; border-radius: 10px;
  overflow: hidden; background: #FFFFFF;
  box-shadow: 0 3px 18px rgba(0,0,0,.07);
  margin-top: 36px;
  display: grid; grid-template-columns: 1fr;
}
.v8-product-img-col {
  background: #F7F1E6; min-height: 180px;
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.v8-product-img {
  width: 100%; max-width: 140px; object-fit: contain; display: block; margin: 0 auto;
}
.v8-product-copy { padding: 22px 20px; display: flex; flex-direction: column; justify-content: center; }
.v8-badge {
  display: inline-block; background: #F4C430; color: #0F3B2E;
  font-size: 9px; font-weight: 700; letter-spacing: .10em;
  text-transform: uppercase; padding: 3px 9px; border-radius: 2px;
  margin-bottom: 10px; align-self: flex-start;
}
.v8-product-name { font-size: 17px; font-weight: 500; color: #0F3B2E; line-height: 1.3; margin-bottom: 6px; }
.v8-product-desc { font-size: 13px; color: #5F6B63; line-height: 1.65; margin-bottom: 12px; }
.v8-product-bullets { margin-bottom: 16px; }
.v8-product-bullets li {
  font-size: 13px; color: #5F6B63; line-height: 1.6;
  padding: 3px 0 3px 16px; position: relative;
}
.v8-product-bullets li::before {
  content: '✦'; position: absolute; left: 0; color: #F4C430; font-size: 9px; top: 5px;
}
.v8-product-note { margin-top: 8px; font-size: 10px; color: #5F6B63; opacity: .6; }

/* ══════════════════════════════════════════════════════════════
   3 — WHY THIS MATCH + 3 COMPACT REASON CARDS
   ══════════════════════════════════════════════════════════════ */
.v8-why-intro { max-width: 520px; margin: 0 auto; text-align: center; margin-bottom: 20px; }
.v8-why-body  { font-size: 14px; line-height: 1.7; color: #5F6B63; margin-top: 8px; }

.v8-reason-cards { display: grid; grid-template-columns: 1fr; gap: 10px; }
.v8-reason-card {
  background: #FFFFFF; border: 1px solid #E8DDC8; border-radius: 8px;
  padding: 16px; display: flex; align-items: flex-start; gap: 14px;
  box-shadow: 0 1px 6px rgba(0,0,0,.04);
}
.v8-reason-icon  { font-size: 22px; flex-shrink: 0; line-height: 1; margin-top: 2px; }
.v8-reason-title { font-size: 13px; font-weight: 600; color: #0F3B2E; margin-bottom: 3px; }
.v8-reason-body  { font-size: 12px; color: #5F6B63; line-height: 1.55; }

/* ══════════════════════════════════════════════════════════════
   4 — SIMPLE RITUAL (3 steps, compact)
   ══════════════════════════════════════════════════════════════ */
.v8-steps { margin-top: 14px; }
.v8-step {
  display: flex; gap: 14px; align-items: flex-start;
  padding-bottom: 16px; margin-bottom: 16px;
  border-bottom: 1px solid #E8DDC8;
}
.v8-step:last-of-type { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
.v8-step-num   { font-size: 28px; font-weight: 300; color: #F4C430; line-height: 1; min-width: 36px; flex-shrink: 0; }
.v8-step-title { font-size: 13px; font-weight: 600; color: #0F3B2E; margin-bottom: 2px; }
.v8-step-body  { font-size: 12px; color: #5F6B63; line-height: 1.55; }

/* ══════════════════════════════════════════════════════════════
   5 — COMPACT TRUST STRIP (4 badges + FDA note)
   ══════════════════════════════════════════════════════════════ */
.v8-trust-strip {
  margin-top: 18px; padding: 14px 16px;
  background: #E2EDE6; border: 1px solid #C0D4C6; border-radius: 8px;
}
.v8-trust-badges {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;
}
.v8-trust-badge {
  display: flex; align-items: center; gap: 7px;
  font-size: 11px; color: #3A5448; line-height: 1.45; font-weight: 500;
}
.v8-trust-badge-icon { font-size: 13px; flex-shrink: 0; }
.v8-trust-fda {
  border-top: 1px solid #C0D4C6; padding-top: 10px;
  font-size: 10px; color: #5F6B63; font-style: italic; line-height: 1.6;
}
.v8-trust-fda strong { font-style: normal; color: #1E3A2F; }

/* ══════════════════════════════════════════════════════════════
   6 — FAQ (3 questions, native details/summary)
   ══════════════════════════════════════════════════════════════ */
.v8-accordion { margin-top: 14px; }
.v8-details {
  border: 1px solid #E8DDC8; border-radius: 7px;
  background: #FFFFFF; overflow: hidden;
  margin-bottom: 7px; box-shadow: 0 1px 4px rgba(0,0,0,.04);
}
.v8-details summary {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 16px; font-size: 13px; font-weight: 600; color: #0F3B2E;
  cursor: pointer; user-select: none; list-style: none;
}
.v8-details summary::-webkit-details-marker { display: none; }
.v8-details summary::after { content: '+'; font-size: 20px; color: #F4C430; flex-shrink: 0; margin-left: 8px; line-height: 1; }
.v8-details[open] summary::after { content: '−'; }
.v8-details-body {
  padding: 12px 16px 14px; border-top: 1px solid #E8DDC8;
  font-size: 12px; color: #5F6B63; line-height: 1.7;
}

/* ══════════════════════════════════════════════════════════════
   7 — FINAL CTA BAR
   ══════════════════════════════════════════════════════════════ */
.v8-final-cta  { padding: 48px 20px; text-align: center; background: #0F3B2E; }
.v8-final-h2   { font-size: 22px; font-weight: 500; line-height: 1.25; color: #FFFFFF; margin-bottom: 10px; letter-spacing: -.01em; }
.v8-final-body { font-size: 14px; line-height: 1.65; color: rgba(255,248,236,.85); max-width: 380px; margin: 0 auto 20px; }
.v8-retake     { display: block; margin-top: 14px; font-size: 12px; color: rgba(255,248,236,.5); text-decoration: underline; text-underline-offset: 3px; }
.v8-final-note { margin-top: 14px; font-size: 10px; color: rgba(255,248,236,.35); line-height: 1.55; }

/* ══════════════════════════════════════════════════════════════
   DESKTOP — min-width: 768px
   All hero image values here override the mobile-first base above.
   ══════════════════════════════════════════════════════════════ */
@media(min-width: 768px) {

  .v8-section { padding: 48px 40px; }
  .v8-h2      { font-size: 27px; }

  /* Hero — desktop layout and crop UNCHANGED */
  .v8-hero         { grid-template-columns: 52% 48%; min-height: 420px; }
  .v8-hero-copy    { order: 1; padding: 56px 52px; justify-content: center; }
  .v8-hero-img-col { order: 2; height: auto; } /* height: auto overrides mobile 175px */
  .v8-hero-img     {
    object-position: center right; /* DESKTOP: unchanged from all prior versions */
    height: 100%;
    border-radius: 20px 0 0 20px;
  }
  .v8-hero-h1 { font-size: 38px; }

  /* Buttons */
  .v8-btn { display: inline-block; width: auto; }

  /* Product card */
  .v8-product-card    { grid-template-columns: 36% 64%; margin-top: 20px; }
  .v8-product-img-col { min-height: 260px; padding: 32px; border-right: 1px solid #E8DDC8; }
  .v8-product-img     { max-width: 150px; }
  .v8-product-copy    { padding: 32px 36px; }
  .v8-product-name    { font-size: 20px; }

  /* 3 reason cards — horizontal row */
  .v8-reason-cards { grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .v8-reason-card  { flex-direction: column; gap: 10px; }

  /* Trust badges — 4-col */
  .v8-trust-badges { grid-template-columns: repeat(4, 1fr); }

  /* Final CTA */
  .v8-final-cta { padding: 64px 40px; }
  .v8-final-h2  { font-size: 30px; }
}

</style>

<div class="vvp8">

  <!-- ════════════════════════════════════════════════════════════
       1 — COMPACT PREMIUM HERO
       ════════════════════════════════════════════════════════════ -->
  <div class="v8-hero">

    <div class="v8-hero-img-col">
      <img
        src="https://cdn.shopify.com/s/files/1/0686/6108/4253/files/inner-bloom-hero-wellness_jpg.jpg?v=1778624647"
        alt="Woman holding a glass during her morning wellness routine"
        class="v8-hero-img"
        loading="eager"
        decoding="async"
      >
    </div>

    <div class="v8-hero-copy">
      <span class="v8-eyebrow v8-eyebrow-gold">YOUR QUIZ RESULT ✨</span>
      <h1 class="v8-hero-h1">Your Inner Bloom Ritual ✨</h1>
      <p class="v8-hero-sub">A simple daily match selected for your wellness goals.</p>
      <a href="/products/advanced-probiotic-formula" class="v8-btn v8-btn-gold">Shop This Match →</a>
      <p class="v8-hero-note">Educational only. Not medical advice. Results may vary.</p>
    </div>

  </div>

  <!-- ════════════════════════════════════════════════════════════
       2 — PRODUCT MATCH CARD
       ════════════════════════════════════════════════════════════ -->
  <div class="v8-section v8-bg-cream">
    <div class="v8-inner-wide">
      <div class="v8-product-card">

        <div class="v8-product-img-col">
          <img
            src="https://cdn.shopify.com/s/files/1/0686/6108/4253/files/1772568678929-generated-label-image-0.jpg?v=1772572525"
            alt="Inner Bloom Advanced Probiotic Formula"
            class="v8-product-img"
            loading="lazy"
            decoding="async"
          >
        </div>

        <div class="v8-product-copy">
          <span class="v8-badge">YOUR MATCH</span>
          <p class="v8-product-name">Inner Bloom — Advanced Probiotic Formula</p>
          <p class="v8-product-desc">Designed to support your daily gut wellness routine.</p>
          <ul class="v8-product-bullets">
            <li>May support daily gut balance</li>
            <li>Designed for a simple morning ritual</li>
            <li>Made for consistent everyday wellness</li>
          </ul>
          <a href="/products/advanced-probiotic-formula" class="v8-btn v8-btn-gold">View Product →</a>
          <p class="v8-product-note">Results may vary. Educational only. Not medical advice.</p>
        </div>

      </div>
    </div>
  </div>

  <hr class="v8-divider">

  <!-- ════════════════════════════════════════════════════════════
       3 — WHY THIS MATCH + 3 COMPACT REASON CARDS
       ════════════════════════════════════════════════════════════ -->
  <div class="v8-section v8-bg-soft">
    <div class="v8-inner-wide">
      <div class="v8-why-intro">
        <span class="v8-eyebrow v8-eyebrow-dark">Why Inner Bloom?</span>
        <h2 class="v8-h2">Your answers pointed here.</h2>
        <p class="v8-why-body">Your quiz answers suggest Inner Bloom may fit your daily wellness routine because it is designed for gut balance, consistency, and simple everyday support.</p>
      </div>
      <div class="v8-reason-cards">

        <div class="v8-reason-card">
          <span class="v8-reason-icon">🌿</span>
          <div>
            <p class="v8-reason-title">Gut Balance</p>
            <p class="v8-reason-body">May support daily gut wellness.</p>
          </div>
        </div>

        <div class="v8-reason-card">
          <span class="v8-reason-icon">🌅</span>
          <div>
            <p class="v8-reason-title">Morning Ritual</p>
            <p class="v8-reason-body">Easy to add to your daily routine.</p>
          </div>
        </div>

        <div class="v8-reason-card">
          <span class="v8-reason-icon">✦</span>
          <div>
            <p class="v8-reason-title">Consistency</p>
            <p class="v8-reason-body">Designed for everyday wellness support.</p>
          </div>
        </div>

      </div>
    </div>
  </div>

  <hr class="v8-divider">

  <!-- ════════════════════════════════════════════════════════════
       4 — SIMPLE RITUAL (3 steps) + COMPACT TRUST STRIP
       ════════════════════════════════════════════════════════════ -->
  <div class="v8-section v8-bg-cream">
    <div class="v8-inner">
      <span class="v8-eyebrow v8-eyebrow-dark">Your Ritual</span>
      <h2 class="v8-h2">3 Simple Steps</h2>
      <div class="v8-steps">

        <div class="v8-step">
          <span class="v8-step-num">01</span>
          <div>
            <p class="v8-step-title">Take as directed with water.</p>
            <p class="v8-step-body">One simple step, ideally at the same time each morning.</p>
          </div>
        </div>

        <div class="v8-step">
          <span class="v8-step-num">02</span>
          <div>
            <p class="v8-step-title">Pair with hydration and balanced nutrition.</p>
            <p class="v8-step-body">Support your routine with water and a balanced diet.</p>
          </div>
        </div>

        <div class="v8-step">
          <span class="v8-step-num">03</span>
          <div>
            <p class="v8-step-title">Stay consistent and observe how it fits your routine.</p>
            <p class="v8-step-body">Use consistently as directed. Results may vary.</p>
          </div>
        </div>

      </div>

      <!-- Trust strip — no origin claims -->
      <div class="v8-trust-strip">
        <div class="v8-trust-badges">
          <div class="v8-trust-badge">
            <span class="v8-trust-badge-icon">⭐</span>
            <span>Quality-focused daily wellness support.</span>
          </div>
          <div class="v8-trust-badge">
            <span class="v8-trust-badge-icon">📋</span>
            <span>GMP Certified</span>
          </div>
          <div class="v8-trust-badge">
            <span class="v8-trust-badge-icon">🔬</span>
            <span>Third-Party Tested</span>
          </div>
          <div class="v8-trust-badge">
            <span class="v8-trust-badge-icon">🌾</span>
            <span>Gluten, Dairy &amp; Soy Free</span>
          </div>
        </div>
        <div class="v8-trust-fda">
          Educational only. Not medical advice. Results may vary. <strong>These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong>
        </div>
      </div>
    </div>
  </div>

  <hr class="v8-divider">

  <!-- ════════════════════════════════════════════════════════════
       5 — FAQ (3 questions only)
       ════════════════════════════════════════════════════════════ -->
  <div class="v8-section v8-bg-white">
    <div class="v8-inner">
      <span class="v8-eyebrow v8-eyebrow-dark">Questions</span>
      <h2 class="v8-h2">Quick Answers</h2>
      <div class="v8-accordion">

        <details class="v8-details">
          <summary>How do I take Inner Bloom?</summary>
          <div class="v8-details-body">Follow the directions on the product label. Most customers take Inner Bloom once daily with a full glass of water each morning. Results may vary.</div>
        </details>

        <details class="v8-details">
          <summary>How long before I notice a difference?</summary>
          <div class="v8-details-body">Individual results vary. Use consistently as directed and observe how Inner Bloom fits into your routine over time. This product is not intended to treat or cure any condition. Consult a healthcare professional with any questions.</div>
        </details>

        <details class="v8-details">
          <summary>Is this page a medical recommendation?</summary>
          <div class="v8-details-body">No. This is a personalized wellness match based on your quiz answers. It is educational only and not medical advice. Consult a qualified healthcare professional before starting any new supplement.</div>
        </details>

      </div>
    </div>
  </div>

  <hr class="v8-divider">

  <!-- ════════════════════════════════════════════════════════════
       6 — FINAL CTA BAR
       ════════════════════════════════════════════════════════════ -->
  <div class="v8-final-cta">
    <h2 class="v8-final-h2">Ready to Start Your Daily Ritual?</h2>
    <p class="v8-final-body">Inner Bloom is waiting for you. One simple step, every morning.</p>
    <a href="/products/advanced-probiotic-formula" class="v8-btn v8-btn-gold">Shop This Match →</a>
    <a href="/" class="v8-retake">← Retake the Quiz</a>
    <p class="v8-final-note">Results may vary. Educational only. Not medical advice.</p>
  </div>

</div>
<!-- ============================================================
     End VV Inner Bloom Result Page v8 Final Mobile Crop v2
     ============================================================ -->
```

---

*Draft only. Not published. Not applied to Shopify.*
