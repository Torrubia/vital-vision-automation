# Vital Vision Shop — Quiz Result Page: Inner Calm

**Status:** Draft — Local Only
**Shopify page URL:** /pages/inner-calm-result
**Product URL:** /products/inner-calm-magnesium-glycinate
**Last updated:** 2026-06-14

---

## Routing Source
Quiz answer: "Calm and balance" → this page

---

## Compliance Notes
- All copy uses soft wellness language only
- No prohibited terms present
- FDA disclaimer included
- No medical claims, disease claims, or outcome promises

---

## Shopify-Ready HTML

Paste into Shopify Admin → Online Store → Pages → New page
Title: `Inner Calm Result`
Handle: `inner-calm-result`
Switch editor to HTML mode, then paste the block below.

```html
<!-- Vital Vision Shop | Inner Calm Quiz Result | /pages/inner-calm-result -->
<!-- Local draft only. Do not publish without QA sign-off. -->

<style>
  #vv-result-calm {
    font-family: Georgia, 'Times New Roman', serif;
    background-color: #FFF8EC;
    color: #0F3B2E;
    max-width: 680px;
    margin: 0 auto;
    padding: 0 20px 64px;
    box-sizing: border-box;
  }
  #vv-result-calm * { box-sizing: border-box; }

  /* Hero — split layout */
  #vv-result-calm .vv-hero {
    background: #0F3B2E;
    border-radius: 20px;
    margin-bottom: 40px;
    margin-top: 32px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  #vv-result-calm .vv-hero-img-wrap {
    width: 100%;
    height: 220px;
    flex-shrink: 0;
    overflow: hidden;
  }
  #vv-result-calm .vv-hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
  #vv-result-calm .vv-hero-content {
    padding: 36px 28px 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  #vv-result-calm .vv-hero-badge {
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
    margin-bottom: 20px;
  }
  #vv-result-calm .vv-hero h1 {
    font-size: clamp(24px, 5vw, 36px);
    color: #FFF8EC;
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 14px;
  }
  #vv-result-calm .vv-hero p {
    font-size: clamp(14px, 2.5vw, 17px);
    color: #b8d4c8;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    line-height: 1.65;
    margin: 0 0 24px;
  }
  #vv-result-calm .vv-hero-cta {
    display: inline-block;
    background: #F4C430;
    color: #0F3B2E;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 100px;
  }
  @media (min-width: 600px) {
    #vv-result-calm .vv-hero {
      flex-direction: row;
      min-height: 360px;
    }
    #vv-result-calm .vv-hero-content {
      flex: 1;
      padding: 48px 36px;
      justify-content: center;
    }
    #vv-result-calm .vv-hero-img-wrap {
      width: 44%;
      height: auto;
    }
    #vv-result-calm .vv-hero-img {
      object-position: center right;
    }
  }

  /* Match label */
  #vv-result-calm .vv-match-label {
    text-align: center;
    margin-bottom: 28px;
  }
  #vv-result-calm .vv-match-label span {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b8a7a;
  }
  #vv-result-calm .vv-divider {
    width: 48px;
    height: 2px;
    background: #F4C430;
    border: none;
    margin: 12px auto 0;
    border-radius: 2px;
  }

  /* Product card */
  #vv-result-calm .vv-product-card {
    background: #FFFFFF;
    border: 2px solid #e8dfc8;
    border-radius: 20px;
    padding: 36px 28px;
    margin-bottom: 32px;
    text-align: center;
  }
  #vv-result-calm .vv-product-icon {
    font-size: 48px;
    line-height: 1;
    margin-bottom: 16px;
    display: block;
  }
  #vv-result-calm .vv-product-name {
    font-size: 13px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F4C430;
    margin-bottom: 8px;
  }
  #vv-result-calm .vv-product-title {
    font-size: clamp(20px, 4vw, 26px);
    color: #0F3B2E;
    font-weight: 400;
    line-height: 1.25;
    margin: 0 0 16px;
  }
  #vv-result-calm .vv-product-desc {
    font-size: 15px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #4a6a5a;
    line-height: 1.7;
    margin: 0 0 28px;
  }
  #vv-result-calm .vv-cta-btn {
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
  #vv-result-calm .vv-cta-btn:hover { background: #1a5c44; }

  /* Sections */
  #vv-result-calm .vv-section { margin-bottom: 36px; }
  #vv-result-calm .vv-section-title {
    font-size: clamp(18px, 3vw, 22px);
    color: #0F3B2E;
    font-weight: 400;
    margin: 0 0 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e8dfc8;
  }
  #vv-result-calm .vv-bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  #vv-result-calm .vv-bullets li {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 15px;
    color: #4a6a5a;
    line-height: 1.6;
    padding-left: 24px;
    position: relative;
  }
  #vv-result-calm .vv-bullets li::before {
    content: '✦';
    color: #F4C430;
    font-size: 10px;
    position: absolute;
    left: 0;
    top: 4px;
  }

  /* Ritual */
  #vv-result-calm .vv-ritual {
    background: #FFFFFF;
    border: 1px solid #e8dfc8;
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  #vv-result-calm .vv-ritual-step {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  #vv-result-calm .vv-ritual-num {
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
  #vv-result-calm .vv-ritual-text {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    color: #4a6a5a;
    line-height: 1.6;
    padding-top: 4px;
  }

  /* FAQ */
  #vv-result-calm .vv-faq {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 36px;
  }
  #vv-result-calm .vv-faq-item {
    background: #FFFFFF;
    border: 1px solid #e8dfc8;
    border-radius: 12px;
    padding: 20px 24px;
  }
  #vv-result-calm .vv-faq-q {
    font-size: 15px;
    color: #0F3B2E;
    font-weight: 400;
    margin: 0 0 8px;
  }
  #vv-result-calm .vv-faq-a {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    color: #4a6a5a;
    line-height: 1.65;
    margin: 0;
  }

  /* Disclaimer */
  #vv-result-calm .vv-disclaimer {
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
  #vv-result-calm .vv-final-cta {
    text-align: center;
    padding: 40px 28px;
    background: #0F3B2E;
    border-radius: 20px;
  }
  #vv-result-calm .vv-final-cta p {
    color: #b8d4c8;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    margin: 0 0 24px;
  }
</style>

<div id="vv-result-calm">

  <!-- 1. Hero — split layout with lifestyle image -->
  <div class="vv-hero">
    <div class="vv-hero-img-wrap">
      <img
        class="vv-hero-img"
        src="https://cdn.shopify.com/s/files/1/0686/6108/4253/files/Copy_of_Etsy_product_Post_1920_x_1080_px.jpg?v=1781438466"
        alt="Calm morning wellness routine with water for Vital Vision quiz result"
        loading="eager"
        decoding="async"
      >
    </div>
    <div class="vv-hero-content">
      <span class="vv-hero-badge">Your Wellness Match</span>
      <h1>Your Calm &amp; Balance Ritual</h1>
      <p>Inner Calm was selected as your match for a gentle daily routine designed to support balance and consistency.</p>
      <a class="vv-hero-cta" href="/products/inner-calm-magnesium-glycinate">Shop Inner Calm →</a>
    </div>
  </div>

  <!-- 2. Match label -->
  <div class="vv-match-label">
    <span>Matched to your wellness goal</span>
    <hr class="vv-divider" aria-hidden="true">
  </div>

  <!-- 3. Product recommendation card -->
  <div class="vv-product-card">
    <span class="vv-product-icon" aria-hidden="true">🌸</span>
    <p class="vv-product-name">Your Match</p>
    <h2 class="vv-product-title">INNER CALM<br>Magnesium Glycinate</h2>
    <p class="vv-product-desc">
      Designed to support a grounded, centered feeling as part of a consistent daily self-care routine.
      Inner Calm may help maintain a sense of balance from within — one gentle step each day.
    </p>
    <a class="vv-cta-btn" href="/products/inner-calm-magnesium-glycinate">Shop Inner Calm →</a>
  </div>

  <!-- 4. Why this fits -->
  <div class="vv-section">
    <h2 class="vv-section-title">Why this fits your routine</h2>
    <ul class="vv-bullets">
      <li>Magnesium Glycinate is a highly bioavailable form of magnesium, designed to be gentle on the stomach.</li>
      <li>Thoughtfully formulated to support a daily self-care ritual focused on balance and consistency.</li>
      <li>May help maintain a calm, grounded feeling when incorporated into a regular wellness routine.</li>
      <li>A simple addition to an evening or wind-down ritual — making consistency easy to build over time.</li>
    </ul>
  </div>

  <!-- 5. Simple daily ritual -->
  <div class="vv-section">
    <h2 class="vv-section-title">A simple daily ritual</h2>
    <div class="vv-ritual">
      <div class="vv-ritual-step">
        <span class="vv-ritual-num">1</span>
        <span class="vv-ritual-text"><strong>Evening:</strong> Take one serving of Inner Calm with a glass of water as part of your wind-down ritual.</span>
      </div>
      <div class="vv-ritual-step">
        <span class="vv-ritual-num">2</span>
        <span class="vv-ritual-text"><strong>Daily:</strong> Consistency is key. A steady routine allows your body to maintain its natural balance over time.</span>
      </div>
      <div class="vv-ritual-step">
        <span class="vv-ritual-num">3</span>
        <span class="vv-ritual-text"><strong>Pair with:</strong> Mindful breathing, a consistent bedtime, or a short journaling practice to support your overall well-being.</span>
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
        <p class="vv-faq-q">Why Magnesium Glycinate specifically?</p>
        <p class="vv-faq-a">Magnesium Glycinate is a chelated form of magnesium that is designed to be gentle and well-tolerated. It is a popular choice for those seeking magnesium as part of a daily wellness routine.</p>
      </div>
      <div class="vv-faq-item">
        <p class="vv-faq-q">When should I take Inner Calm?</p>
        <p class="vv-faq-a">Many people find that taking Inner Calm in the evening fits naturally into a wind-down routine. Taking it at a consistent time each day helps build a lasting habit.</p>
      </div>
      <div class="vv-faq-item">
        <p class="vv-faq-q">Is Inner Calm right for me?</p>
        <p class="vv-faq-a">Inner Calm is designed for adults seeking daily balance support as part of a wellness routine. If you have any health conditions or take medications, please consult your healthcare provider before starting any new supplement.</p>
      </div>
    </div>
  </div>

  <!-- 9. Final CTA -->
  <div class="vv-final-cta">
    <p>Ready to bring more consistency to your daily routine? Inner Calm is designed to support a gentle, grounded daily wellness practice — from within.</p>
    <a class="vv-cta-btn" href="/products/inner-calm-magnesium-glycinate">Shop Inner Calm →</a>
  </div>

</div>
<!-- END VITAL VISION RESULT PAGE SHOPIFY CODE -->
```

---

## Implementation Notes

- Shopify page title: `Inner Calm Result`
- Shopify handle: `inner-calm-result`
- Paste entire HTML block (from `<style>` to closing comment) into the HTML editor
- No JavaScript required
- No external fonts or dependencies
- All styles scoped to `#vv-result-calm`
- Hero image: lifestyle CDN asset, `loading="eager"`, responsive split layout
