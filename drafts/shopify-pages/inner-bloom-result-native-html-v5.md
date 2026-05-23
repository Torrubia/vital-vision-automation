# Inner Bloom Result Page — Native Shopify HTML/CSS v5
# Page: Inner Bloom — Your Wellness Match
# URL handle: inner-bloom-result
# Vital Vision Shop
# Generated: 2026-05-13
# Version: v5 — premium quiz result landing page, full visual reference
# Status: DRAFT — not published. Paste into Shopify Pages content editor only.
# Compliance: All copy validated. No prohibited medical claims.

---

## HTML/CSS — Paste Everything Below Into Shopify HTML Editor

```html
<!-- ============================================================
     VV Inner Bloom Result Page — Native HTML/CSS v5
     Vital Vision Shop | inner-bloom-result
     No JavaScript. Shopify CDN images only. Draft only.
     ============================================================ -->

<style>

/* ══════════════════════════════════════════════════════════════
   TITLE HIDE
   Removes the default Shopify page h1 so the page begins
   with the premium hero section, not a basic article title.
   ══════════════════════════════════════════════════════════════ */
.page-width > h1,
.main-page-title,
.page__heading,
h1.page-title,
h1.page__title,
.page-header h1,
.shopify-section > .page-width > h1 { display: none !important; }

/* ══════════════════════════════════════════════════════════════
   RESET + SCOPE
   All component styles live under .vvp to avoid theme conflicts.
   ══════════════════════════════════════════════════════════════ */
.vvp *, .vvp *::before, .vvp *::after { box-sizing: border-box; margin: 0; padding: 0; }
.vvp { font-family: inherit; line-height: 1.6; color: #1E3A2F; }
.vvp a { color: inherit; text-decoration: none; }
.vvp img { display: block; max-width: 100%; height: auto; }
.vvp ul { list-style: none; }

/* ── Utility ── */
.vvp-divider { border: none; border-top: 1px solid #E8DDC8; margin: 0; }

/* ── Backgrounds ── */
.vvp-bg-green  { background: #0F3B2E; }
.vvp-bg-white  { background: #FFFFFF; }
.vvp-bg-cream  { background: #FFF8EC; }
.vvp-bg-soft   { background: #F7F1E6; }
.vvp-bg-trust  { background: #E2EDE6; }

/* ── Section + inner wrappers ── */
.vvp-section     { width: 100%; padding: 64px 20px; }
.vvp-inner       { max-width: 720px;  margin: 0 auto; width: 100%; }
.vvp-inner-wide  { max-width: 1080px; margin: 0 auto; width: 100%; }

/* ── Typography ── */
.vvp-eyebrow-gold {
  display: inline-block;
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  color: #F4C430; font-weight: 700; margin-bottom: 16px;
}
.vvp-eyebrow-dark {
  display: block;
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  color: #0F3B2E; font-weight: 700; opacity: .5; margin-bottom: 12px;
}
.vvp-h2 { font-size: 26px; font-weight: 500; line-height: 1.25; color: #0F3B2E; margin-bottom: 16px; }
.vvp-body  { font-size: 15px; line-height: 1.75; color: #5F6B63; }

/* ── Buttons ── */
.vvp-btn {
  display: block; width: 100%; text-align: center;
  font-size: 15px; font-weight: 700; letter-spacing: .04em;
  padding: 16px 32px; border-radius: 4px;
  min-height: 52px; line-height: 1.25;
  cursor: pointer; text-decoration: none;
}
.vvp-btn-gold    { background: #F4C430; color: #0F3B2E; }
.vvp-btn-outline {
  background: transparent; color: #0F3B2E;
  border: 2px solid #0F3B2E;
  font-size: 14px; min-height: 46px; padding: 12px 28px;
}

/* ══════════════════════════════════════════════════════════════
   1 — PREMIUM SPLIT HERO
   Mobile : lifestyle image stacks above copy (no face crop).
   Desktop: copy left 52%, lifestyle image right 48%.
            Image has a rounded left edge for premium look.
   ══════════════════════════════════════════════════════════════ */
.vvp-hero {
  display: grid;
  grid-template-columns: 1fr;
  background: #0F3B2E;
  overflow: hidden;
  width: 100%;
}
/* Image col — DOM first → top on mobile */
.vvp-hero-img-col { order: 1; overflow: hidden; height: 272px; }
.vvp-hero-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center 18%; /* keeps face visible on mobile */
  display: block;
}
/* Copy col — below image on mobile */
.vvp-hero-copy {
  order: 2;
  padding: 48px 24px 56px;
  display: flex; flex-direction: column; align-items: flex-start;
}
.vvp-hero-h1 {
  font-size: 34px; font-weight: 500; line-height: 1.15;
  color: #FFFFFF; margin-bottom: 14px;
}
.vvp-hero-sub {
  font-size: 16px; line-height: 1.65;
  color: rgba(255,248,236,.88);
  margin-bottom: 28px; max-width: 400px;
}
.vvp-hero-disclaimer {
  margin-top: 14px; font-size: 11px;
  color: rgba(255,248,236,.45); line-height: 1.6;
}

/* ══════════════════════════════════════════════════════════════
   2 — PRODUCT MATCH CARD
   Mobile : product image above, copy below.
   Desktop: product image left 36%, copy right 64%.
   ══════════════════════════════════════════════════════════════ */
.vvp-product-card {
  border: 1px solid #E8DDC8; border-radius: 14px;
  overflow: hidden; background: #FFFFFF;
  box-shadow: 0 6px 32px rgba(0,0,0,.09);
  margin-top: 32px;
  display: grid; grid-template-columns: 1fr;
}
.vvp-product-img-col {
  background: #F7F1E6;
  min-height: 256px;
  display: flex; align-items: center; justify-content: center;
  padding: 36px 28px;
}
.vvp-product-img {
  width: 100%; max-width: 200px;
  object-fit: contain; display: block; margin: 0 auto;
}
.vvp-product-copy {
  padding: 36px 28px;
  display: flex; flex-direction: column; justify-content: center;
}
.vvp-badge {
  display: inline-block;
  background: #F4C430; color: #0F3B2E;
  font-size: 10px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase;
  padding: 5px 12px; border-radius: 2px;
  margin-bottom: 14px; align-self: flex-start;
}
.vvp-product-name {
  font-size: 20px; font-weight: 500; color: #0F3B2E;
  line-height: 1.3; margin-bottom: 10px;
}
.vvp-product-desc {
  font-size: 15px; color: #5F6B63; line-height: 1.7; margin-bottom: 18px;
}
.vvp-product-bullets { margin-bottom: 24px; }
.vvp-product-bullets li {
  font-size: 14px; color: #5F6B63; line-height: 1.6;
  padding: 5px 0 5px 20px; position: relative;
}
.vvp-product-bullets li::before {
  content: '✦'; position: absolute; left: 0;
  color: #F4C430; font-size: 10px; top: 8px;
}
.vvp-product-note {
  margin-top: 12px; font-size: 11px; color: #5F6B63; opacity: .7;
}

/* ══════════════════════════════════════════════════════════════
   3 — WHY THIS MATCH (centered text block)
   ══════════════════════════════════════════════════════════════ */
.vvp-why-inner  { max-width: 600px; margin: 0 auto; text-align: center; }
.vvp-why-body   {
  font-size: 16px; line-height: 1.8; color: #5F6B63; margin-top: 16px;
}
.vvp-compliance-tag {
  display: inline-block; margin-top: 24px;
  padding: 12px 18px;
  border-left: 3px solid #E8DDC8; background: #FFFFFF;
  border-radius: 0 4px 4px 0;
  font-size: 12px; color: #5F6B63; font-style: italic; line-height: 1.6;
  text-align: left;
}

/* ══════════════════════════════════════════════════════════════
   4 — BENEFIT CARDS (4 cards)
   Mobile : 2-column grid for compact visual hierarchy.
   Desktop: 4-column grid.
   ══════════════════════════════════════════════════════════════ */
.vvp-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px; margin-top: 32px;
}
.vvp-card {
  background: #FFFFFF;
  border: 1px solid #E8DDC8; border-radius: 10px;
  padding: 22px 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,.05);
}
.vvp-card-icon  { font-size: 26px; margin-bottom: 12px; display: block; }
.vvp-card-title { font-size: 14px; font-weight: 600; color: #0F3B2E; margin-bottom: 6px; line-height: 1.35; }
.vvp-card-body  { font-size: 13px; color: #5F6B63; line-height: 1.6; }
.vvp-fda-box {
  margin-top: 28px; padding: 16px 18px;
  background: #FFF8EC; border: 1px solid #E8DDC8; border-radius: 6px;
  font-size: 11px; color: #5F6B63; font-style: italic; line-height: 1.6;
}

/* ══════════════════════════════════════════════════════════════
   5 — ROUTINE CARD (soft cream card, image left + steps right)
   Mobile : steps only (image hidden to keep page tight).
   Desktop: product image left 36%, numbered steps right 64%.
   ══════════════════════════════════════════════════════════════ */
.vvp-routine-card {
  border: 1px solid #E8DDC8; border-radius: 14px;
  overflow: hidden; background: #FFF8EC;
  box-shadow: 0 2px 16px rgba(0,0,0,.05);
  margin-top: 32px;
  display: grid; grid-template-columns: 1fr;
}
.vvp-routine-img-col {
  display: none; /* hidden on mobile to avoid excessive height */
  background: #F0E9DC;
  align-items: center; justify-content: center;
  padding: 40px 32px;
}
.vvp-routine-img {
  width: 100%; max-width: 180px;
  object-fit: contain; display: block; margin: 0 auto;
}
.vvp-routine-steps-col { padding: 36px 28px; }
.vvp-steps { margin-top: 8px; }
.vvp-step {
  display: flex; gap: 20px; align-items: flex-start;
  padding-bottom: 28px; margin-bottom: 28px;
  border-bottom: 1px solid #E8DDC8;
}
.vvp-step:last-of-type { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
.vvp-step-num  { font-size: 44px; font-weight: 300; color: #F4C430; line-height: 1; min-width: 52px; flex-shrink: 0; }
.vvp-step-title{ font-size: 15px; font-weight: 600; color: #0F3B2E; margin-bottom: 5px; }
.vvp-step-body { font-size: 14px; color: #5F6B63; line-height: 1.65; }
.vvp-routine-note {
  margin-top: 24px; padding: 13px 16px;
  border-left: 3px solid #E8DDC8; background: #FFFFFF;
  border-radius: 0 4px 4px 0;
  font-size: 12px; color: #5F6B63; font-style: italic; line-height: 1.65;
}

/* ══════════════════════════════════════════════════════════════
   6 — TRUST / COMPLIANCE
   ══════════════════════════════════════════════════════════════ */
.vvp-trust-body {
  font-size: 15px; color: #1E3A2F; line-height: 1.8; margin-bottom: 14px;
}
.vvp-trust-fda {
  margin-top: 20px; padding: 20px 22px;
  border: 1px solid #C0D4C6; border-radius: 8px;
  background: rgba(255,255,255,.6);
  font-size: 12px; color: #3A5448; font-style: italic; line-height: 1.75;
}
.vvp-trust-fda strong { font-style: normal; color: #1E3A2F; }

/* ══════════════════════════════════════════════════════════════
   7 — FAQ (native details/summary — zero JavaScript)
   ══════════════════════════════════════════════════════════════ */
.vvp-accordion { margin-top: 24px; }
.vvp-details {
  border: 1px solid #E8DDC8; border-radius: 8px;
  background: #FFFFFF; overflow: hidden;
  margin-bottom: 10px; box-shadow: 0 1px 6px rgba(0,0,0,.04);
}
.vvp-details summary {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 20px; font-size: 15px; font-weight: 600; color: #0F3B2E;
  cursor: pointer; user-select: none; list-style: none;
}
.vvp-details summary::-webkit-details-marker { display: none; }
.vvp-details summary::after {
  content: '+'; font-size: 24px; color: #F4C430;
  flex-shrink: 0; margin-left: 12px; line-height: 1;
}
.vvp-details[open] summary::after { content: '−'; }
.vvp-details-body {
  padding: 16px 20px 22px;
  border-top: 1px solid #E8DDC8;
  font-size: 14px; color: #5F6B63; line-height: 1.75;
}

/* ══════════════════════════════════════════════════════════════
   8 — FINAL CTA BAR
   ══════════════════════════════════════════════════════════════ */
.vvp-final-cta {
  padding: 80px 24px; text-align: center; background: #0F3B2E;
}
.vvp-final-h2 {
  font-size: 28px; font-weight: 500; line-height: 1.25;
  color: #FFFFFF; margin-bottom: 14px;
}
.vvp-final-body {
  font-size: 16px; line-height: 1.7; color: rgba(255,248,236,.88);
  max-width: 460px; margin: 0 auto 32px;
}
.vvp-retake {
  display: block; margin-top: 18px; font-size: 13px;
  color: rgba(255,248,236,.6);
  text-decoration: underline; text-underline-offset: 3px; cursor: pointer;
}
.vvp-final-disclaimer {
  margin-top: 22px; font-size: 11px;
  color: rgba(255,248,236,.4); line-height: 1.6;
}

/* ══════════════════════════════════════════════════════════════
   DESKTOP OVERRIDES — min-width: 768px
   ══════════════════════════════════════════════════════════════ */
@media(min-width: 768px) {

  .vvp-section { padding: 88px 40px; }
  .vvp-h2      { font-size: 32px; }

  /* Hero */
  .vvp-hero         { grid-template-columns: 52% 48%; min-height: 560px; }
  .vvp-hero-copy    { order: 1; padding: 80px 64px; justify-content: center; }
  .vvp-hero-img-col { order: 2; height: auto; }
  .vvp-hero-img     { object-position: center right; height: 100%;
                       border-radius: 24px 0 0 24px; }
  .vvp-hero-h1      { font-size: 48px; }

  /* Buttons */
  .vvp-btn { display: inline-block; width: auto; }

  /* Product card */
  .vvp-product-card     { grid-template-columns: 36% 64%; }
  .vvp-product-img-col  { min-height: 360px; padding: 48px 36px;
                           border-right: 1px solid #E8DDC8; }
  .vvp-product-img      { max-width: 190px; }
  .vvp-product-copy     { padding: 48px 48px; }
  .vvp-product-name     { font-size: 22px; }

  /* Benefit cards — 4-column */
  .vvp-cards { grid-template-columns: repeat(4, 1fr); gap: 16px; }

  /* Routine card — image left, steps right */
  .vvp-routine-card        { grid-template-columns: 36% 64%; }
  .vvp-routine-img-col     { display: flex; }
  .vvp-routine-steps-col   { padding: 48px 44px;
                               border-left: 1px solid #E8DDC8; }

  /* Final CTA */
  .vvp-final-cta { padding: 112px 40px; }
  .vvp-final-h2  { font-size: 38px; }
}

</style>

<div class="vvp">

  <!-- ════════════════════════════════════════════════════════════
       1 — PREMIUM SPLIT HERO
       ════════════════════════════════════════════════════════════ -->
  <div class="vvp-hero">

    <!-- Lifestyle image — DOM first → top on mobile, right on desktop -->
    <div class="vvp-hero-img-col">
      <img
        src="https://cdn.shopify.com/s/files/1/0686/6108/4253/files/inner-bloom-hero-wellness_jpg.jpg?v=1778624647"
        alt="Calm morning wellness routine for Inner Bloom quiz result"
        class="vvp-hero-img"
        loading="eager"
        decoding="async"
      >
    </div>

    <!-- Copy — below image on mobile, left column on desktop -->
    <div class="vvp-hero-copy">
      <span class="vvp-eyebrow-gold">YOUR QUIZ RESULT ✨</span>
      <h1 class="vvp-hero-h1">Your Inner Bloom Ritual ✨</h1>
      <p class="vvp-hero-sub">A simple daily match selected for your wellness goals.</p>
      <a href="/products/advanced-probiotic-formula" class="vvp-btn vvp-btn-gold">Shop This Match →</a>
      <p class="vvp-hero-disclaimer">Educational only. Not medical advice. Results may vary.</p>
    </div>

  </div>

  <!-- ════════════════════════════════════════════════════════════
       2 — PRODUCT MATCH CARD
       ════════════════════════════════════════════════════════════ -->
  <div class="vvp-section vvp-bg-cream">
    <div class="vvp-inner-wide">
      <span class="vvp-eyebrow-dark">Your Daily Match</span>
      <h2 class="vvp-h2">Selected from your quiz answers to support your daily routine.</h2>
      <div class="vvp-product-card">

        <!-- Product image — DOM first → top on mobile, left on desktop -->
        <div class="vvp-product-img-col">
          <img
            src="https://cdn.shopify.com/s/files/1/0686/6108/4253/files/1772568678929-generated-label-image-0.jpg?v=1772572525"
            alt="Inner Bloom Advanced Probiotic Formula"
            class="vvp-product-img"
            loading="lazy"
            decoding="async"
          >
        </div>

        <!-- Product copy — below image on mobile, right column on desktop -->
        <div class="vvp-product-copy">
          <span class="vvp-badge">YOUR MATCH</span>
          <p class="vvp-product-name">Inner Bloom — Advanced Probiotic Formula</p>
          <p class="vvp-product-desc">Designed to support your daily gut wellness routine.</p>
          <ul class="vvp-product-bullets">
            <li>May support daily gut balance</li>
            <li>Designed for a simple morning ritual</li>
            <li>Made for consistent everyday wellness</li>
          </ul>
          <a href="/products/advanced-probiotic-formula" class="vvp-btn vvp-btn-gold">View Product →</a>
          <p class="vvp-product-note">Educational only. Not medical advice. Results may vary.</p>
        </div>

      </div>
    </div>
  </div>

  <hr class="vvp-divider">

  <!-- ════════════════════════════════════════════════════════════
       3 — WHY THIS MATCH (centered)
       ════════════════════════════════════════════════════════════ -->
  <div class="vvp-section vvp-bg-white" id="why-this-match">
    <div class="vvp-why-inner">
      <span class="vvp-eyebrow-dark">Your Match Explained</span>
      <h2 class="vvp-h2">Why this match?</h2>
      <p class="vvp-why-body">Your quiz answers suggest a gentle daily gut wellness ritual may fit your current goals. Inner Bloom is designed to support consistency from within as part of your daily routine.</p>
      <div class="vvp-compliance-tag">Results may vary. This is not medical advice. Consult a qualified healthcare professional before starting any new supplement.</div>
    </div>
  </div>

  <hr class="vvp-divider">

  <!-- ════════════════════════════════════════════════════════════
       4 — BENEFIT CARDS (4 cards)
       2-col on mobile / 4-col on desktop
       ════════════════════════════════════════════════════════════ -->
  <div class="vvp-section vvp-bg-soft">
    <div class="vvp-inner-wide">
      <span class="vvp-eyebrow-dark">What Inner Bloom May Support</span>
      <h2 class="vvp-h2">Designed for your daily wellness routine.</h2>
      <div class="vvp-cards">

        <div class="vvp-card">
          <span class="vvp-card-icon">🌿</span>
          <p class="vvp-card-title">May Support Daily Gut Balance</p>
          <p class="vvp-card-body">Formulated with a probiotic blend designed to complement healthy digestion and daily balance.</p>
        </div>

        <div class="vvp-card">
          <span class="vvp-card-icon">🌅</span>
          <p class="vvp-card-title">Designed for Your Morning Ritual</p>
          <p class="vvp-card-body">One simple daily step. Take Inner Bloom with a full glass of water each morning.</p>
        </div>

        <div class="vvp-card">
          <span class="vvp-card-icon">✦</span>
          <p class="vvp-card-title">Crafted for Everyday Wellness</p>
          <p class="vvp-card-body">Made to support your daily wellness routine from within — no complicated regimen, just consistency.</p>
        </div>

        <div class="vvp-card">
          <span class="vvp-card-icon">☀️</span>
          <p class="vvp-card-title">One Simple Step. Every Day.</p>
          <p class="vvp-card-body">Designed around simplicity — because the best wellness ritual is one you can actually keep.</p>
        </div>

      </div>
      <div class="vvp-fda-box">These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</div>
    </div>
  </div>

  <hr class="vvp-divider">

  <!-- ════════════════════════════════════════════════════════════
       5 — SIMPLE MORNING ROUTINE
       Soft cream card. Mobile: steps only.
       Desktop: product image left / numbered steps right.
       ════════════════════════════════════════════════════════════ -->
  <div class="vvp-section vvp-bg-cream">
    <div class="vvp-inner-wide">
      <span class="vvp-eyebrow-dark">Your Ritual</span>
      <h2 class="vvp-h2">Your Simple Morning Routine</h2>
      <div class="vvp-routine-card">

        <!-- Image — hidden on mobile, visible left column on desktop -->
        <div class="vvp-routine-img-col">
          <img
            src="https://cdn.shopify.com/s/files/1/0686/6108/4253/files/1772568678929-generated-label-image-0.jpg?v=1772572525"
            alt="Inner Bloom Advanced Probiotic Formula"
            class="vvp-routine-img"
            loading="lazy"
            decoding="async"
          >
        </div>

        <!-- Steps — right column on desktop -->
        <div class="vvp-routine-steps-col">
          <div class="vvp-steps">

            <div class="vvp-step">
              <span class="vvp-step-num">01</span>
              <div>
                <p class="vvp-step-title">Morning — Take Inner Bloom</p>
                <p class="vvp-step-body">Take Inner Bloom with a full glass of water, ideally at the same time each day.</p>
              </div>
            </div>

            <div class="vvp-step">
              <span class="vvp-step-num">02</span>
              <div>
                <p class="vvp-step-title">Daily — Support Your Wellness</p>
                <p class="vvp-step-body">Pair with a balanced diet and adequate hydration to complement your overall wellness goals.</p>
              </div>
            </div>

            <div class="vvp-step">
              <span class="vvp-step-num">03</span>
              <div>
                <p class="vvp-step-title">Stay Consistent</p>
                <p class="vvp-step-body">Use consistently as directed and observe how it fits into your routine over time. Results may vary.</p>
              </div>
            </div>

          </div>
          <div class="vvp-routine-note">This routine is a general wellness suggestion — not a medical protocol. Always follow label directions and consult a healthcare professional if you have questions.</div>
        </div>

      </div>
    </div>
  </div>

  <hr class="vvp-divider">

  <!-- ════════════════════════════════════════════════════════════
       6 — TRUST / TRANSPARENCY STRIP
       ════════════════════════════════════════════════════════════ -->
  <div class="vvp-section vvp-bg-trust">
    <div class="vvp-inner">
      <span class="vvp-eyebrow-dark">Transparency</span>
      <h2 class="vvp-h2">Our Commitment to You</h2>
      <p class="vvp-trust-body">Vital Vision Shop is committed to honest, compliant wellness communication. We do not make disease claims or guarantee outcomes. Inner Bloom is a dietary supplement, not a pharmaceutical.</p>
      <p class="vvp-trust-body">Inner Bloom is formulated to support your daily self-care routine from within. Individual experiences will vary. Results may vary.</p>
      <div class="vvp-trust-fda">
        <strong>FDA Disclaimer:</strong> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.<br><br>
        This page is for educational purposes only and does not constitute medical advice. Consult a qualified healthcare professional before starting any new supplement, especially if you are pregnant, nursing, taking medications, or have a medical condition.
      </div>
    </div>
  </div>

  <hr class="vvp-divider">

  <!-- ════════════════════════════════════════════════════════════
       7 — FAQ ACCORDION (native details/summary — no JavaScript)
       ════════════════════════════════════════════════════════════ -->
  <div class="vvp-section vvp-bg-white">
    <div class="vvp-inner">
      <span class="vvp-eyebrow-dark">Questions</span>
      <h2 class="vvp-h2">Questions About Your Match</h2>
      <div class="vvp-accordion">

        <details class="vvp-details">
          <summary>What makes Inner Bloom right for me?</summary>
          <div class="vvp-details-body">Based on your quiz answers, your wellness focus is gut and digestive support. Inner Bloom is formulated with this in mind as a daily complement to a balanced diet — not a replacement for medical care. Individual results will vary.</div>
        </details>

        <details class="vvp-details">
          <summary>How do I take Inner Bloom?</summary>
          <div class="vvp-details-body">Follow the directions on the product label. Most customers take Inner Bloom once daily with a full glass of water as part of their morning routine. Results may vary.</div>
        </details>

        <details class="vvp-details">
          <summary>How long before I notice a difference?</summary>
          <div class="vvp-details-body">Individual timelines vary. Use consistently as directed and observe how it fits into your routine over time. Results may vary.</div>
        </details>

        <details class="vvp-details">
          <summary>Is this page a medical recommendation?</summary>
          <div class="vvp-details-body">No. This is a personalized wellness match based on your quiz answers. It is educational only and is not medical advice. Please consult a qualified healthcare professional before starting any new supplement.</div>
        </details>

        <details class="vvp-details">
          <summary>What is your return policy?</summary>
          <div class="vvp-details-body">Please review our return policy at <a href="/policies/refund-policy" style="color:#0F3B2E;text-decoration:underline">vitalvision.shop/policies/refund-policy</a>.</div>
        </details>

      </div>
    </div>
  </div>

  <hr class="vvp-divider">

  <!-- ════════════════════════════════════════════════════════════
       8 — FINAL CTA BAR
       ════════════════════════════════════════════════════════════ -->
  <div class="vvp-final-cta">
    <h2 class="vvp-final-h2">Ready to Start Your Daily Ritual?</h2>
    <p class="vvp-final-body">Inner Bloom is waiting for you. Add it to your morning routine and commit to your wellness journey — one day at a time.</p>
    <a href="/products/advanced-probiotic-formula" class="vvp-btn vvp-btn-gold">Shop This Match →</a>
    <a href="/" class="vvp-retake">← Retake the Quiz</a>
    <p class="vvp-final-disclaimer">Results may vary. Educational only. Not medical advice.</p>
  </div>

</div>
<!-- ============================================================
     End VV Inner Bloom Result Page v5
     ============================================================ -->
```

---

*Draft only. Not published. Not applied to Shopify.*
