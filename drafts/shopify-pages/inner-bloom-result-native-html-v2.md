# Inner Bloom Result Page — Native Shopify HTML/CSS v2
# Page: Inner Bloom — Your Wellness Match
# URL handle: inner-bloom-result
# Vital Vision Shop
# Generated: 2026-05-12
# Version: v2 — lifestyle hero image, split-layout first fold
# Status: DRAFT — not published. Paste into Shopify Pages content editor only.
# Compliance: All copy validated. No prohibited medical claims.

---

## HTML/CSS — Paste Everything Below Into Shopify HTML Editor

```html
<!-- ============================================================
     VV Inner Bloom Result Page — Native HTML/CSS v2
     Vital Vision Shop | inner-bloom-result
     No JavaScript. No external dependencies.
     Hero image: approved Shopify CDN URL only.
     Draft only.
     ============================================================ -->

<style>
/* ── Scope all styles to .vv-page to avoid theme conflicts ── */
.vv-page *{box-sizing:border-box;margin:0;padding:0}
.vv-page{font-family:inherit;line-height:1.6;color:#1E3A2F}
.vv-page a{color:inherit;text-decoration:none}

/* ── Layout ── */
.vv-section{width:100%;padding:48px 20px}
.vv-inner{max-width:720px;margin:0 auto;width:100%}

/* ── Typography helpers ── */
.vv-eyebrow{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#F4C430;margin-bottom:12px}
.vv-eyebrow-dark{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#0F3B2E;margin-bottom:12px;opacity:.65}
.vv-h1{font-size:30px;font-weight:500;line-height:1.2;margin-bottom:16px;color:#FFFFFF}
.vv-h2{font-size:22px;font-weight:500;line-height:1.3;margin-bottom:8px;color:#0F3B2E}
.vv-h3{font-size:16px;font-weight:600;line-height:1.3;margin-bottom:8px;color:#0F3B2E}
.vv-subhead{font-size:16px;line-height:1.65;color:#FFF8EC;max-width:560px;margin:0 auto 28px}
.vv-body{font-size:15px;line-height:1.7;color:#5F6B63}
.vv-small{font-size:12px;line-height:1.6;color:#5F6B63}
.vv-tiny{font-size:11px;line-height:1.6;color:#5F6B63}
.vv-italic{font-style:italic}
.vv-center{text-align:center}

/* ── Buttons ── */
.vv-btn{display:block;width:100%;text-align:center;font-size:15px;font-weight:700;letter-spacing:.04em;padding:16px 28px;border-radius:4px;min-height:52px;line-height:1.25;cursor:pointer;text-decoration:none}
.vv-btn-gold{background:#F4C430;color:#0F3B2E}
.vv-btn-outline{background:transparent;color:#0F3B2E;border:2px solid #0F3B2E;font-size:14px;min-height:44px;padding:12px 24px}
.vv-btn-wrap{margin-top:24px}

/* ── Section backgrounds ── */
.vv-bg-green{background:#0F3B2E}
.vv-bg-cream{background:#FFF8EC}
.vv-bg-white{background:#FFFFFF}
.vv-bg-sage{background:#EEF4F0}
.vv-bg-trust{background:#E2EDE6}

/* ── v2 Hero — split layout: image stacks above on mobile, right on desktop ── */
.vv-hero-wrap{
  display:grid;
  grid-template-columns:1fr;
  background:#0F3B2E;
  overflow:hidden;
}
/* DOM order: image-col first → appears top on mobile */
.vv-hero-img-col{
  order:1;
  overflow:hidden;
  height:260px;
  flex-shrink:0;
}
.vv-hero-img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center;
  display:block;
}
/* Text below image on mobile */
.vv-hero-text-col{
  order:2;
  padding:40px 20px 48px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:flex-start;
}
.vv-hero-text-col .vv-h1{
  font-size:28px;
  font-weight:500;
  line-height:1.2;
  color:#FFFFFF;
  margin-bottom:12px;
}
.vv-hero-text-col .vv-subhead{
  font-size:15px;
  line-height:1.65;
  color:#FFF8EC;
  text-align:left;
  max-width:none;
  margin:0 0 24px;
}
.vv-hero-text-col .vv-btn{
  align-self:flex-start;
}
.vv-hero-disclaimer{
  margin-top:16px;
  font-size:11px;
  color:rgba(255,248,236,.55);
  line-height:1.6;
}

/* ── Profile block ── */
.vv-callout{border:1px solid #E8DDC8;border-radius:6px;padding:20px;background:#FFFFFF;margin-top:20px;box-shadow:0 2px 12px rgba(0,0,0,.05)}
.vv-callout-row{font-size:14px;color:#5F6B63;margin-bottom:6px}
.vv-callout-row:last-child{margin-bottom:0}
.vv-callout-row strong{color:#0F3B2E}

/* ── Product card ── */
.vv-product-card{border:1px solid #E8DDC8;border-radius:8px;padding:28px 24px;margin-top:24px;background:#FFFFFF;box-shadow:0 2px 16px rgba(0,0,0,.07)}
.vv-product-name{font-size:20px;font-weight:500;color:#0F3B2E;margin-bottom:12px;line-height:1.3}
.vv-product-desc{font-size:15px;color:#5F6B63;line-height:1.7;margin-bottom:4px}
.vv-product-disclaimer{margin-top:16px;font-size:11px;color:#5F6B63}
.vv-cta-stack{margin-top:24px}
.vv-cta-stack .vv-btn+.vv-btn{margin-top:12px}

/* ── Accordion (details/summary — no JS) ── */
.vv-accordion{margin-top:16px}
.vv-details{border:1px solid #E8DDC8;border-radius:6px;background:#FFFFFF;overflow:hidden;margin-bottom:10px;box-shadow:0 1px 6px rgba(0,0,0,.04)}
.vv-details summary{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;font-size:15px;font-weight:600;color:#0F3B2E;cursor:pointer;user-select:none;list-style:none}
.vv-details summary::-webkit-details-marker{display:none}
.vv-details summary::after{content:'+';font-size:22px;color:#F4C430;flex-shrink:0;margin-left:12px;line-height:1}
.vv-details[open] summary::after{content:'−'}
.vv-details-body{padding:16px 20px 20px;border-top:1px solid #E8DDC8;font-size:14px;color:#5F6B63;line-height:1.7}
.vv-compliance-tag{margin-top:20px;padding:12px 16px;border-left:3px solid #E8DDC8;background:#FFFFFF;border-radius:0 4px 4px 0;font-size:12px;color:#5F6B63;font-style:italic;line-height:1.6}

/* ── Benefit cards ── */
.vv-cards{margin-top:24px;display:grid;grid-template-columns:1fr;gap:16px}
.vv-card{border:1px solid #E8DDC8;border-radius:8px;padding:24px 20px;background:#FFFFFF;box-shadow:0 2px 12px rgba(0,0,0,.06)}
.vv-card-icon{font-size:28px;margin-bottom:12px;display:block}
.vv-card-title{font-size:15px;font-weight:600;color:#0F3B2E;margin-bottom:8px}
.vv-card-body{font-size:14px;color:#5F6B63;line-height:1.65}
.vv-fda-box{margin-top:24px;padding:16px;border:1px solid #E8DDC8;border-radius:6px;background:#FFF8EC;font-size:11px;color:#5F6B63;line-height:1.6;font-style:italic}

/* ── Routine steps ── */
.vv-steps{margin-top:24px}
.vv-step{display:flex;gap:20px;align-items:flex-start;padding-bottom:28px;margin-bottom:28px;border-bottom:1px solid #E8DDC8}
.vv-step:last-of-type{border-bottom:none;padding-bottom:0;margin-bottom:0}
.vv-step-num{font-size:44px;font-weight:300;color:#F4C430;line-height:1;min-width:50px;flex-shrink:0}
.vv-step-content{}
.vv-step-title{font-size:15px;font-weight:600;color:#0F3B2E;margin-bottom:6px}
.vv-step-body{font-size:14px;color:#5F6B63;line-height:1.65}
.vv-routine-note{margin-top:24px;font-size:12px;color:#5F6B63;font-style:italic;line-height:1.65;padding:12px 16px;border-left:3px solid #E8DDC8;background:#FFFFFF;border-radius:0 4px 4px 0}

/* ── Trust block ── */
.vv-trust-body{font-size:15px;color:#1E3A2F;line-height:1.75;margin-bottom:20px}
.vv-trust-fda{margin-top:20px;padding:16px;border:1px solid #C0D4C6;border-radius:6px;background:rgba(255,255,255,.55);font-size:12px;color:#3A5448;font-style:italic;line-height:1.7}

/* ── FAQ ── */
.vv-faq-list{margin-top:20px}

/* ── Final CTA ── */
.vv-final-cta{padding:64px 20px;text-align:center}
.vv-final-cta .vv-h2{color:#FFFFFF;margin-bottom:12px;font-size:24px}
.vv-final-cta .vv-body{color:#FFF8EC;max-width:480px;margin:0 auto 28px}
.vv-retake{display:block;margin-top:16px;font-size:13px;color:rgba(255,248,236,.7);text-decoration:underline;text-underline-offset:3px}
.vv-final-disclaimer{margin-top:20px;font-size:11px;color:rgba(255,248,236,.5)}

/* ── Divider ── */
.vv-divider{border:none;border-top:1px solid #E8DDC8;margin:0}

/* ── Desktop ── */
@media(min-width:768px){
  /* Hero: text left 55%, image right 45% */
  .vv-hero-wrap{
    grid-template-columns:55% 45%;
    min-height:520px;
  }
  .vv-hero-text-col{
    order:1;
    padding:72px 56px;
  }
  .vv-hero-text-col .vv-h1{font-size:40px}
  .vv-hero-img-col{
    order:2;
    height:auto;
  }
  .vv-hero-img{
    object-position:center right;
  }
  /* General desktop */
  .vv-section{padding:72px 40px}
  .vv-cards{grid-template-columns:repeat(3,1fr)}
  .vv-btn{display:inline-block;width:auto}
  .vv-hero-text-col .vv-btn{display:inline-block;width:auto}
  .vv-cta-stack{display:flex;gap:12px;align-items:center}
  .vv-cta-stack .vv-btn+.vv-btn{margin-top:0}
  .vv-final-cta{padding:96px 40px}
  .vv-final-cta .vv-h2{font-size:32px}
  .vv-product-card{padding:40px}
}
</style>

<div class="vv-page">

  <!-- ══════════════════════════════════════════════════════════════
       SECTION 1 — HERO (v2: split layout — image right, text left)
       Mobile: lifestyle image above, text below
       Desktop: text left 55%, image right 45%
       ══════════════════════════════════════════════════════════════ -->
  <div class="vv-hero-wrap">

    <!-- Image column — DOM first so it appears above text on mobile -->
    <div class="vv-hero-img-col">
      <img
        src="https://cdn.shopify.com/s/files/1/0686/6108/4253/files/inner-bloom-hero-wellness_jpg.jpg?v=1778624647"
        alt="Calm morning wellness routine for Inner Bloom quiz result"
        class="vv-hero-img"
        loading="eager"
        decoding="async"
      >
    </div>

    <!-- Text column — below image on mobile, left column on desktop -->
    <div class="vv-hero-text-col">
      <span class="vv-eyebrow">Your Quiz Result ✨</span>
      <h1 class="vv-h1">Your Inner Bloom Ritual ✨</h1>
      <p class="vv-subhead">A simple daily match selected for your wellness goals.</p>
      <a href="/products/advanced-probiotic-formula" class="vv-btn vv-btn-gold">Shop This Match →</a>
      <p class="vv-hero-disclaimer">Educational only. Not medical advice. Results may vary.</p>
    </div>

  </div>

  <!-- ══════════════════════════════════════════════════════════════
       SECTION 2 — PERSONALIZED RESULT BLOCK
       ══════════════════════════════════════════════════════════════ -->
  <div class="vv-section vv-bg-cream">
    <div class="vv-inner">
      <span class="vv-eyebrow-dark">Your Wellness Profile</span>
      <h2 class="vv-h2">We found your match.</h2>
      <p class="vv-body">Your quiz answers suggest your daily routine may benefit from targeted digestive wellness support. Inner Bloom is formulated to complement a mindful daily ritual — not to replace professional health guidance.</p>
      <div class="vv-callout">
        <p class="vv-callout-row"><strong>Your Wellness Goal:</strong> Gut &amp; Digestive Wellness</p>
        <p class="vv-callout-row"><strong>Your Match:</strong> Inner Bloom — Advanced Probiotic Formula</p>
        <p class="vv-callout-row"><strong>Suggested routine:</strong> Once daily, every morning</p>
      </div>
    </div>
  </div>

  <hr class="vv-divider">

  <!-- ══════════════════════════════════════════════════════════════
       SECTION 3 — PRODUCT RECOMMENDATION CARD
       ══════════════════════════════════════════════════════════════ -->
  <div class="vv-section vv-bg-white">
    <div class="vv-inner">
      <span class="vv-eyebrow-dark">Your Daily Match</span>
      <h2 class="vv-h2">Selected from your quiz answers to support your daily routine.</h2>
      <div class="vv-product-card">
        <!-- NEEDS_REAL_PRODUCT_IMAGE_URL_FOR_INNER_BLOOM -->
        <p class="vv-product-name">Inner Bloom — Advanced Probiotic Formula</p>
        <p class="vv-product-desc">Designed to support your daily gut wellness routine.</p>
        <div class="vv-cta-stack">
          <a href="/products/advanced-probiotic-formula" class="vv-btn vv-btn-gold">VIEW PRODUCT →</a>
          <a href="#why-this-match" class="vv-btn vv-btn-outline">WHY THIS MATCH?</a>
        </div>
        <p class="vv-product-disclaimer">Educational only. Not medical advice.</p>
      </div>
    </div>
  </div>

  <hr class="vv-divider">

  <!-- ══════════════════════════════════════════════════════════════
       SECTION 4 — WHY THIS MATCH
       ══════════════════════════════════════════════════════════════ -->
  <div class="vv-section vv-bg-sage" id="why-this-match">
    <div class="vv-inner">
      <span class="vv-eyebrow-dark">Your Match Explained</span>
      <h2 class="vv-h2">Why Inner Bloom?</h2>
      <p class="vv-body" style="margin-bottom:8px">Your answers suggest your body may benefit from daily digestive support. Inner Bloom is formulated with a targeted probiotic blend designed to support gut balance and overall digestive wellbeing as part of a consistent daily routine.</p>
      <p class="vv-body">Use consistently as directed and observe how it fits into your routine over time. Results may vary.</p>

      <div class="vv-accordion" style="margin-top:24px">
        <details class="vv-details">
          <summary>What's inside Inner Bloom?</summary>
          <div class="vv-details-body">Inner Bloom is formulated with a probiotic blend designed to complement healthy digestion and daily gut balance. Please refer to the product label for the full ingredient list and serving directions.</div>
        </details>
        <details class="vv-details">
          <summary>How do I use Inner Bloom?</summary>
          <div class="vv-details-body">Follow the directions on the product label. Most customers take Inner Bloom once daily with a full glass of water each morning as part of their self-care routine. Results may vary.</div>
        </details>
        <details class="vv-details">
          <summary>Who is Inner Bloom designed for?</summary>
          <div class="vv-details-body">Inner Bloom is designed for adults seeking daily digestive wellness support as part of a consistent routine. It is a dietary supplement — not a medical treatment. Consult a qualified healthcare professional before starting any new supplement, especially if you are pregnant, nursing, taking medications, or have a medical condition.</div>
        </details>
      </div>

      <div class="vv-compliance-tag">Results may vary. This is not medical advice. Consult a qualified healthcare professional before starting any new supplement.</div>
    </div>
  </div>

  <hr class="vv-divider">

  <!-- ══════════════════════════════════════════════════════════════
       SECTION 5 — 3 BENEFIT CARDS
       ══════════════════════════════════════════════════════════════ -->
  <div class="vv-section vv-bg-white">
    <div class="vv-inner">
      <span class="vv-eyebrow-dark">What Inner Bloom May Support</span>
      <h2 class="vv-h2">Designed for your daily wellness routine.</h2>
      <div class="vv-cards">

        <div class="vv-card">
          <span class="vv-card-icon">🌿</span>
          <p class="vv-card-title">May Support Daily Gut Balance</p>
          <p class="vv-card-body">Formulated with a probiotic blend designed to complement healthy digestion and daily gut balance as part of a consistent wellness routine.</p>
        </div>

        <div class="vv-card">
          <span class="vv-card-icon">🌅</span>
          <p class="vv-card-title">Designed for Your Morning Ritual</p>
          <p class="vv-card-body">One simple daily step. Most customers take Inner Bloom with a glass of water each morning as part of their self-care routine.</p>
        </div>

        <div class="vv-card">
          <span class="vv-card-icon">✦</span>
          <p class="vv-card-title">Crafted for Everyday Wellness</p>
          <p class="vv-card-body">Inner Bloom is formulated to support overall digestive wellbeing from within — no complicated regimens, just one consistent daily ritual.</p>
        </div>

      </div>
      <div class="vv-fda-box">These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</div>
    </div>
  </div>

  <hr class="vv-divider">

  <!-- ══════════════════════════════════════════════════════════════
       SECTION 6 — SIMPLE DAILY ROUTINE
       ══════════════════════════════════════════════════════════════ -->
  <div class="vv-section vv-bg-cream">
    <div class="vv-inner">
      <span class="vv-eyebrow-dark">Your Ritual</span>
      <h2 class="vv-h2">Your Simple Morning Routine</h2>
      <p class="vv-body" style="margin-bottom:4px">A consistent daily wellness practice — one step at a time.</p>

      <div class="vv-steps">

        <div class="vv-step">
          <span class="vv-step-num">01</span>
          <div class="vv-step-content">
            <p class="vv-step-title">Morning — Take Inner Bloom</p>
            <p class="vv-step-body">Take Inner Bloom with a full glass of water, ideally at the same time each day. A consistent time supports your routine.</p>
          </div>
        </div>

        <div class="vv-step">
          <span class="vv-step-num">02</span>
          <div class="vv-step-content">
            <p class="vv-step-title">Daily — Support Your Wellness</p>
            <p class="vv-step-body">Pair with a balanced diet and adequate hydration to complement your overall wellness goals each day.</p>
          </div>
        </div>

        <div class="vv-step">
          <span class="vv-step-num">03</span>
          <div class="vv-step-content">
            <p class="vv-step-title">Stay Consistent</p>
            <p class="vv-step-body">Use consistently as directed and observe how it fits into your routine over time. Results may vary.</p>
          </div>
        </div>

      </div>

      <div class="vv-routine-note">This routine is a general wellness suggestion — not a medical protocol. Always follow label directions and consult a healthcare professional if you have questions.</div>
    </div>
  </div>

  <hr class="vv-divider">

  <!-- ══════════════════════════════════════════════════════════════
       SECTION 7 — TRUST / COMPLIANCE BLOCK
       ══════════════════════════════════════════════════════════════ -->
  <div class="vv-section vv-bg-trust">
    <div class="vv-inner">
      <span class="vv-eyebrow-dark">Transparency</span>
      <h2 class="vv-h2">Our Commitment to You</h2>
      <p class="vv-trust-body">Vital Vision Shop is committed to honest, compliant wellness communication. We do not make disease claims. We do not make outcome guarantee claims. Inner Bloom is a dietary supplement — not a pharmaceutical.</p>
      <p class="vv-trust-body">Inner Bloom is formulated to support your daily self-care routine from within. Individual experiences will vary. Results may vary.</p>
      <div class="vv-trust-fda">
        <strong style="font-style:normal;color:#1E3A2F">FDA Disclaimer:</strong> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.<br><br>
        This page is for educational purposes only and does not constitute medical advice. Consult a qualified healthcare professional before starting any new supplement, especially if you are pregnant, nursing, taking medications, or have a medical condition.
      </div>
    </div>
  </div>

  <hr class="vv-divider">

  <!-- ══════════════════════════════════════════════════════════════
       SECTION 8 — FAQ
       ══════════════════════════════════════════════════════════════ -->
  <div class="vv-section vv-bg-white">
    <div class="vv-inner">
      <span class="vv-eyebrow-dark">Questions</span>
      <h2 class="vv-h2">Questions About Your Match</h2>
      <div class="vv-faq-list vv-accordion" style="margin-top:20px">

        <details class="vv-details">
          <summary>What makes Inner Bloom right for me?</summary>
          <div class="vv-details-body">Based on your quiz answers, your wellness focus is gut and digestive support. Inner Bloom is formulated with this in mind as a daily complement to a balanced diet — not a replacement for medical care. Individual results will vary.</div>
        </details>

        <details class="vv-details">
          <summary>How do I take Inner Bloom?</summary>
          <div class="vv-details-body">Follow the directions on the product label. Most customers take Inner Bloom once daily with a full glass of water as part of their morning routine. Results may vary.</div>
        </details>

        <details class="vv-details">
          <summary>How long before I notice a difference?</summary>
          <div class="vv-details-body">Individual timelines vary. Use consistently as directed and observe how it fits into your routine over time. Results may vary.</div>
        </details>

        <details class="vv-details">
          <summary>Is this page a medical recommendation?</summary>
          <div class="vv-details-body">No. This is a personalized wellness match based on your quiz answers. It is educational only and is not medical advice. Please consult a qualified healthcare professional before starting any new supplement.</div>
        </details>

        <details class="vv-details">
          <summary>What is your return policy?</summary>
          <div class="vv-details-body">Please review our return policy at <a href="/policies/refund-policy" style="color:#0F3B2E;text-decoration:underline">vitalvision.shop/policies/refund-policy</a>.</div>
        </details>

      </div>
    </div>
  </div>

  <hr class="vv-divider">

  <!-- ══════════════════════════════════════════════════════════════
       SECTION 9 — FINAL CTA
       ══════════════════════════════════════════════════════════════ -->
  <div class="vv-section vv-bg-green vv-final-cta vv-center">
    <div class="vv-inner">
      <h2 class="vv-h2">Ready to Start Your Daily Ritual?</h2>
      <p class="vv-body">Inner Bloom is waiting for you. Add it to your morning routine and commit to your wellness journey — one day at a time.</p>
      <a href="/products/advanced-probiotic-formula" class="vv-btn vv-btn-gold">Shop This Match →</a>
      <a href="/" class="vv-retake">← Retake the Quiz</a>
      <p class="vv-final-disclaimer">Results may vary. Educational only. Not medical advice.</p>
    </div>
  </div>

</div>
<!-- ============================================================
     End VV Inner Bloom Result Page
     ============================================================ -->
```

---

*Draft only. Not published. Not applied to Shopify.*
