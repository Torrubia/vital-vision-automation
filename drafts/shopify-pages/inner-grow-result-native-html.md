# Vital Vision Shop — Quiz Result Page: Inner Grow

**Status:** Draft — Local Only
**Shopify page URL:** /pages/inner-grow-result
**Product URL:** /products/inner-grow-hair-skin-and-nails-support
**Last updated:** 2026-06-14

---

## Routing Source
Quiz answer: "Hair, skin, and nails" → this page

---

## Compliance Notes
- All copy uses soft wellness language only
- No prohibited terms present (no hair loss, weight loss, before/after claims)
- FDA disclaimer included
- No medical claims, disease claims, or outcome promises

---

## Shopify-Ready HTML

Paste into Shopify Admin → Online Store → Pages → New page
Title: `Inner Grow Result`
Handle: `inner-grow-result`
Switch editor to HTML mode, then paste the block below.

```html
<!-- Vital Vision Shop | Inner Grow Quiz Result | /pages/inner-grow-result -->
<!-- Local draft only. Do not publish without QA sign-off. -->

<style>
  #vv-result-grow {
    font-family: Georgia, 'Times New Roman', serif;
    background-color: #FFF8EC;
    color: #0F3B2E;
    max-width: 680px;
    margin: 0 auto;
    padding: 0 20px 64px;
    box-sizing: border-box;
  }
  #vv-result-grow * { box-sizing: border-box; }

  /* Hero */
  #vv-result-grow .vv-hero {
    background: #0F3B2E;
    border-radius: 20px;
    padding: 52px 32px 44px;
    text-align: center;
    margin-bottom: 40px;
    margin-top: 32px;
  }
  #vv-result-grow .vv-hero-badge {
    display: inline-block;
    background: #F4C430;
    color: #0F3B2E;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 24px;
  }
  #vv-result-grow .vv-hero h1 {
    font-size: clamp(26px, 5vw, 38px);
    color: #FFF8EC;
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 16px;
  }
  #vv-result-grow .vv-hero p {
    font-size: clamp(15px, 2.5vw, 18px);
    color: #b8d4c8;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    line-height: 1.65;
    margin: 0;
    max-width: 460px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Match label */
  #vv-result-grow .vv-match-label {
    text-align: center;
    margin-bottom: 28px;
  }
  #vv-result-grow .vv-match-label span {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b8a7a;
  }
  #vv-result-grow .vv-divider {
    width: 48px;
    height: 2px;
    background: #F4C430;
    border: none;
    margin: 12px auto 0;
    border-radius: 2px;
  }

  /* Product card */
  #vv-result-grow .vv-product-card {
    background: #FFFFFF;
    border: 2px solid #e8dfc8;
    border-radius: 20px;
    padding: 36px 28px;
    margin-bottom: 32px;
    text-align: center;
  }
  #vv-result-grow .vv-product-icon {
    font-size: 48px;
    line-height: 1;
    margin-bottom: 16px;
    display: block;
  }
  #vv-result-grow .vv-product-name {
    font-size: 13px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F4C430;
    margin-bottom: 8px;
  }
  #vv-result-grow .vv-product-title {
    font-size: clamp(20px, 4vw, 26px);
    color: #0F3B2E;
    font-weight: 400;
    line-height: 1.25;
    margin: 0 0 16px;
  }
  #vv-result-grow .vv-product-desc {
    font-size: 15px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #4a6a5a;
    line-height: 1.7;
    margin: 0 0 28px;
  }
  #vv-result-grow .vv-cta-btn {
    display: inline-block;
    background: #0F3B2E;
    color: #F4C430;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-decoration: none;
    padding: 16px 36px;
    border-radius: 100px;
    transition: background 0.2s ease;
  }
  #vv-result-grow .vv-cta-btn:hover {
    background: #1a5c44;
  }

  /* Sections */
  #vv-result-grow .vv-section {
    margin-bottom: 36px;
  }
  #vv-result-grow .vv-section-title {
    font-size: clamp(18px, 3vw, 22px);
    color: #0F3B2E;
    font-weight: 400;
    margin: 0 0 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e8dfc8;
  }
  #vv-result-grow .vv-bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  #vv-result-grow .vv-bullets li {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 15px;
    color: #4a6a5a;
    line-height: 1.6;
    padding-left: 24px;
    position: relative;
  }
  #vv-result-grow .vv-bullets li::before {
    content: '✦';
    color: #F4C430;
    font-size: 10px;
    position: absolute;
    left: 0;
    top: 4px;
  }

  /* Ritual */
  #vv-result-grow .vv-ritual {
    background: #FFFFFF;
    border: 1px solid #e8dfc8;
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  #vv-result-grow .vv-ritual-step {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  #vv-result-grow .vv-ritual-num {
    background: #0F3B2E;
    color: #F4C430;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    font-weight: 700;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  #vv-result-grow .vv-ritual-text {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    color: #4a6a5a;
    line-height: 1.6;
    padding-top: 4px;
  }

  /* FAQ */
  #vv-result-grow .vv-faq {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 36px;
  }
  #vv-result-grow .vv-faq-item {
    background: #FFFFFF;
    border: 1px solid #e8dfc8;
    border-radius: 12px;
    padding: 20px 24px;
  }
  #vv-result-grow .vv-faq-q {
    font-size: 15px;
    color: #0F3B2E;
    font-weight: 400;
    margin: 0 0 8px;
  }
  #vv-result-grow .vv-faq-a {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    color: #4a6a5a;
    line-height: 1.65;
    margin: 0;
  }

  /* Disclaimer */
  #vv-result-grow .vv-disclaimer {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 11px;
    color: #9aaa9f;
    line-height: 1.7;
    text-align: center;
    padding: 20px;
    border-top: 1px solid #e8dfc8;
    margin-bottom: 36px;
  }

  /* Final CTA */
  #vv-result-grow .vv-final-cta {
    text-align: center;
    padding: 40px 28px;
    background: #0F3B2E;
    border-radius: 20px;
  }
  #vv-result-grow .vv-final-cta p {
    color: #b8d4c8;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    margin: 0 0 24px;
  }
</style>

<div id="vv-result-grow">

  <!-- 1. Hero -->
  <div class="vv-hero">
    <span class="vv-hero-badge">Your Wellness Match</span>
    <h1>Your Beauty-From-Within Ritual</h1>
    <p>Inner Grow was selected as your match for a daily beauty wellness routine from within.</p>
  </div>

  <!-- 2. Match label -->
  <div class="vv-match-label">
    <span>Matched to your wellness goal</span>
    <hr class="vv-divider" aria-hidden="true">
  </div>

  <!-- 3. Product recommendation card -->
  <div class="vv-product-card">
    <span class="vv-product-icon" aria-hidden="true">✨</span>
    <p class="vv-product-name">Your Match</p>
    <h2 class="vv-product-title">INNER GROW<br>Hair, Skin &amp; Nails Support</h2>
    <p class="vv-product-desc">
      A beauty-from-within approach designed to support your natural radiance over time.
      Inner Grow may support the appearance and vitality of hair, skin, and nails as part of a consistent daily wellness routine.
    </p>
    <a class="vv-cta-btn" href="/products/inner-grow-hair-skin-and-nails-support">Shop Inner Grow →</a>
  </div>

  <!-- 4. Why this fits -->
  <div class="vv-section">
    <h2 class="vv-section-title">Why this fits your routine</h2>
    <ul class="vv-bullets">
      <li>Formulated with nutrients thoughtfully selected to support hair, skin, and nail wellness from within.</li>
      <li>A beauty-from-within approach that complements your existing daily self-care routine.</li>
      <li>May help maintain the appearance of healthy-looking hair, skin, and nails when used consistently over time.</li>
      <li>Designed for daily use — simple, elegant, and built for lasting routine consistency.</li>
    </ul>
  </div>

  <!-- 5. Simple daily ritual -->
  <div class="vv-section">
    <h2 class="vv-section-title">A simple daily ritual</h2>
    <div class="vv-ritual">
      <div class="vv-ritual-step">
        <span class="vv-ritual-num">1</span>
        <span class="vv-ritual-text"><strong>Morning:</strong> Take one serving of Inner Grow with a glass of water alongside your morning skincare or wellness routine.</span>
      </div>
      <div class="vv-ritual-step">
        <span class="vv-ritual-num">2</span>
        <span class="vv-ritual-text"><strong>Daily:</strong> Beauty from within is built through consistency. Taking Inner Grow at the same time each day helps form a lasting habit.</span>
      </div>
      <div class="vv-ritual-step">
        <span class="vv-ritual-num">3</span>
        <span class="vv-ritual-text"><strong>Pair with:</strong> Adequate hydration, a nutrient-rich diet, and daily SPF to support your skin wellness from every direction.</span>
      </div>
    </div>
  </div>

  <!-- Disclaimer -->
  <div class="vv-disclaimer">
    These statements have not been evaluated by the Food and Drug Administration.
    This product is not intended to diagnose, treat, cure, or prevent any disease.
    This page is for educational purposes only and does not constitute medical advice.
    Individual results may vary.
  </div>

  <!-- 8. FAQ -->
  <div class="vv-section">
    <h2 class="vv-section-title">Common questions</h2>
    <div class="vv-faq">
      <div class="vv-faq-item">
        <p class="vv-faq-q">How does beauty-from-within support work?</p>
        <p class="vv-faq-a">Beauty-from-within is an approach that focuses on supporting hair, skin, and nail wellness through daily nutritional supplementation. Inner Grow is designed to support your body's natural processes from within as part of a consistent daily routine.</p>
      </div>
      <div class="vv-faq-item">
        <p class="vv-faq-q">How long should I use Inner Grow?</p>
        <p class="vv-faq-a">Wellness routines for hair, skin, and nails are typically ongoing. Most people incorporate Inner Grow into their daily habits consistently over time. Individual experiences may vary.</p>
      </div>
      <div class="vv-faq-item">
        <p class="vv-faq-q">Is Inner Grow right for me?</p>
        <p class="vv-faq-a">Inner Grow is designed for adults seeking daily beauty wellness support as part of a consistent routine. If you have any health conditions or take medications, please consult your healthcare provider before starting any new supplement.</p>
      </div>
    </div>
  </div>

  <!-- 9. Final CTA -->
  <div class="vv-final-cta">
    <p>Ready to support your natural radiance from within? Inner Grow is designed for a consistent, daily beauty wellness ritual — one step at a time.</p>
    <a class="vv-cta-btn" href="/products/inner-grow-hair-skin-and-nails-support">Shop Inner Grow →</a>
  </div>

</div>
<!-- END VITAL VISION RESULT PAGE SHOPIFY CODE -->
```

---

## Implementation Notes

- Shopify page title: `Inner Grow Result`
- Shopify handle: `inner-grow-result`
- Paste entire HTML block (from `<style>` to closing comment) into the HTML editor
- No JavaScript required
- No external fonts or dependencies
- All styles scoped to `#vv-result-grow`
