# Vital Vision Shop — Quiz Result Page: Inner Bloom

**Status:** Draft — Local Only
**Shopify page URL:** /pages/inner-bloom-result
**Product URL:** /products/advanced-probiotic-formula
**Last updated:** 2026-06-14

---

## Routing Source
Quiz answer: "Digestion and gut wellness" → this page

---

## Compliance Notes
- All copy uses soft wellness language only
- No prohibited terms present (no IBS, bloating cure, constipation, detox, cleanse)
- FDA disclaimer included
- No medical claims, disease claims, or outcome promises

---

## Shopify-Ready HTML

Paste into Shopify Admin → Online Store → Pages → New page
Title: `Inner Bloom Result`
Handle: `inner-bloom-result`
Switch editor to HTML mode, then paste the block below.

```html
<!-- Vital Vision Shop | Inner Bloom Quiz Result | /pages/inner-bloom-result -->
<!-- Local draft only. Do not publish without QA sign-off. -->

<style>
  #vv-result-bloom {
    font-family: Georgia, 'Times New Roman', serif;
    background-color: #FFF8EC;
    color: #0F3B2E;
    max-width: 680px;
    margin: 0 auto;
    padding: 0 20px 64px;
    box-sizing: border-box;
  }
  #vv-result-bloom * { box-sizing: border-box; }

  /* Hero */
  #vv-result-bloom .vv-hero {
    background: #0F3B2E;
    border-radius: 20px;
    padding: 52px 32px 44px;
    text-align: center;
    margin-bottom: 40px;
    margin-top: 32px;
  }
  #vv-result-bloom .vv-hero-badge {
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
  #vv-result-bloom .vv-hero h1 {
    font-size: clamp(26px, 5vw, 38px);
    color: #FFF8EC;
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 16px;
  }
  #vv-result-bloom .vv-hero p {
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
  #vv-result-bloom .vv-match-label {
    text-align: center;
    margin-bottom: 28px;
  }
  #vv-result-bloom .vv-match-label span {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b8a7a;
  }
  #vv-result-bloom .vv-divider {
    width: 48px;
    height: 2px;
    background: #F4C430;
    border: none;
    margin: 12px auto 0;
    border-radius: 2px;
  }

  /* Product card */
  #vv-result-bloom .vv-product-card {
    background: #FFFFFF;
    border: 2px solid #e8dfc8;
    border-radius: 20px;
    padding: 36px 28px;
    margin-bottom: 32px;
    text-align: center;
  }
  #vv-result-bloom .vv-product-icon {
    font-size: 48px;
    line-height: 1;
    margin-bottom: 16px;
    display: block;
  }
  #vv-result-bloom .vv-product-name {
    font-size: 13px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F4C430;
    margin-bottom: 8px;
  }
  #vv-result-bloom .vv-product-title {
    font-size: clamp(20px, 4vw, 26px);
    color: #0F3B2E;
    font-weight: 400;
    line-height: 1.25;
    margin: 0 0 16px;
  }
  #vv-result-bloom .vv-product-desc {
    font-size: 15px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #4a6a5a;
    line-height: 1.7;
    margin: 0 0 28px;
  }
  #vv-result-bloom .vv-cta-btn {
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
  #vv-result-bloom .vv-cta-btn:hover {
    background: #1a5c44;
  }

  /* Sections */
  #vv-result-bloom .vv-section {
    margin-bottom: 36px;
  }
  #vv-result-bloom .vv-section-title {
    font-size: clamp(18px, 3vw, 22px);
    color: #0F3B2E;
    font-weight: 400;
    margin: 0 0 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e8dfc8;
  }
  #vv-result-bloom .vv-bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  #vv-result-bloom .vv-bullets li {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 15px;
    color: #4a6a5a;
    line-height: 1.6;
    padding-left: 24px;
    position: relative;
  }
  #vv-result-bloom .vv-bullets li::before {
    content: '✦';
    color: #F4C430;
    font-size: 10px;
    position: absolute;
    left: 0;
    top: 4px;
  }

  /* Ritual */
  #vv-result-bloom .vv-ritual {
    background: #FFFFFF;
    border: 1px solid #e8dfc8;
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  #vv-result-bloom .vv-ritual-step {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  #vv-result-bloom .vv-ritual-num {
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
  #vv-result-bloom .vv-ritual-text {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    color: #4a6a5a;
    line-height: 1.6;
    padding-top: 4px;
  }

  /* FAQ */
  #vv-result-bloom .vv-faq {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 36px;
  }
  #vv-result-bloom .vv-faq-item {
    background: #FFFFFF;
    border: 1px solid #e8dfc8;
    border-radius: 12px;
    padding: 20px 24px;
  }
  #vv-result-bloom .vv-faq-q {
    font-size: 15px;
    color: #0F3B2E;
    font-weight: 400;
    margin: 0 0 8px;
  }
  #vv-result-bloom .vv-faq-a {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    color: #4a6a5a;
    line-height: 1.65;
    margin: 0;
  }

  /* Disclaimer */
  #vv-result-bloom .vv-disclaimer {
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
  #vv-result-bloom .vv-final-cta {
    text-align: center;
    padding: 40px 28px;
    background: #0F3B2E;
    border-radius: 20px;
  }
  #vv-result-bloom .vv-final-cta p {
    color: #b8d4c8;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    margin: 0 0 24px;
  }
</style>

<div id="vv-result-bloom">

  <!-- 1. Hero -->
  <div class="vv-hero">
    <span class="vv-hero-badge">Your Wellness Match</span>
    <h1>Your Inner Bloom Ritual</h1>
    <p>Inner Bloom was selected as your match for a gut-focused daily wellness ritual.</p>
  </div>

  <!-- 2. Match label -->
  <div class="vv-match-label">
    <span>Matched to your wellness goal</span>
    <hr class="vv-divider" aria-hidden="true">
  </div>

  <!-- 3. Product recommendation card -->
  <div class="vv-product-card">
    <span class="vv-product-icon" aria-hidden="true">🌼</span>
    <p class="vv-product-name">Your Match</p>
    <h2 class="vv-product-title">INNER BLOOM<br>Advanced Probiotic Formula</h2>
    <p class="vv-product-desc">
      Designed to support a comfortable, thriving gut wellness routine from within.
      Inner Bloom may help maintain a balanced gut environment as part of a consistent daily lifestyle.
    </p>
    <a class="vv-cta-btn" href="/products/advanced-probiotic-formula">Shop Inner Bloom →</a>
  </div>

  <!-- 4. Why this fits -->
  <div class="vv-section">
    <h2 class="vv-section-title">Why this fits your routine</h2>
    <ul class="vv-bullets">
      <li>Designed to support a thriving gut environment as part of a daily wellness routine.</li>
      <li>Formulated with probiotic strains thoughtfully selected to support gut wellness from within.</li>
      <li>May help maintain a comfortable daily digestive experience when used consistently over time.</li>
      <li>A simple daily addition that supports your gut as part of a broader healthy lifestyle.</li>
    </ul>
  </div>

  <!-- 5. Simple daily ritual -->
  <div class="vv-section">
    <h2 class="vv-section-title">A simple daily ritual</h2>
    <div class="vv-ritual">
      <div class="vv-ritual-step">
        <span class="vv-ritual-num">1</span>
        <span class="vv-ritual-text"><strong>Morning:</strong> Take one serving of Inner Bloom with a glass of water, ideally before or with your first meal.</span>
      </div>
      <div class="vv-ritual-step">
        <span class="vv-ritual-num">2</span>
        <span class="vv-ritual-text"><strong>Daily:</strong> Probiotic routines build their foundation through consistent, daily use — aim for the same time each day.</span>
      </div>
      <div class="vv-ritual-step">
        <span class="vv-ritual-num">3</span>
        <span class="vv-ritual-text"><strong>Pair with:</strong> A fiber-rich diet, adequate hydration, and movement to support an overall gut-friendly lifestyle.</span>
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
        <p class="vv-faq-q">What is a probiotic and how does it support gut wellness?</p>
        <p class="vv-faq-a">Probiotics are live microorganisms that, when taken as part of a daily wellness routine, may help maintain a balanced gut environment. Inner Bloom is designed to support gut wellness from within as part of a healthy lifestyle.</p>
      </div>
      <div class="vv-faq-item">
        <p class="vv-faq-q">How long until I may notice a difference?</p>
        <p class="vv-faq-a">Wellness routines are built through consistency. Many people incorporate probiotic support into their ongoing daily routine rather than expecting immediate results. Individual experiences may vary.</p>
      </div>
      <div class="vv-faq-item">
        <p class="vv-faq-q">Is Inner Bloom right for me?</p>
        <p class="vv-faq-a">Inner Bloom is designed for adults seeking daily gut wellness support as part of a balanced routine. If you have any health conditions or take medications, please consult your healthcare provider before starting any new supplement.</p>
      </div>
    </div>
  </div>

  <!-- 9. Final CTA -->
  <div class="vv-final-cta">
    <p>Ready to support your gut wellness from within? Inner Bloom is designed for a thriving, comfortable daily routine — one consistent step at a time.</p>
    <a class="vv-cta-btn" href="/products/advanced-probiotic-formula">Shop Inner Bloom →</a>
  </div>

</div>
<!-- END VITAL VISION RESULT PAGE SHOPIFY CODE -->
```

---

## Implementation Notes

- Shopify page title: `Inner Bloom Result`
- Shopify handle: `inner-bloom-result`
- Paste entire HTML block (from `<style>` to closing comment) into the HTML editor
- No JavaScript required
- No external fonts or dependencies
- All styles scoped to `#vv-result-bloom`
