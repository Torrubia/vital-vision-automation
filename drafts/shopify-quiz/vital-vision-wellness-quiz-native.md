# Vital Vision Shop — Native Shopify Wellness Quiz

**Status:** Draft — Local Only
**Target page:** Wellness Quiz
**Shopify URL:** /pages/wellness-quiz
**Replaces:** Visual Quiz Builder (VQB)
**Last updated:** 2026-06-13

---

## Overview

Single-question, card-based wellness quiz built with native Shopify page HTML/CSS/JS.
No external dependencies. No email capture. No API calls. No tracking.
All CSS and JS scoped to `#vv-quiz` wrapper.

---

## Routing Map

| Answer | Result Label | Redirect URL |
|---|---|---|
| Daily wellness foundation | Inner Balance | /pages/inner-balance-result |
| Calm and balance | Inner Calm | /pages/inner-calm-result |
| Digestion and gut wellness | Inner Bloom | /pages/inner-bloom-result |
| Hair, skin, and nails | Inner Grow | /pages/inner-grow-result |

---

## Compliance Notes

- All copy uses soft wellness language: "may support", "designed to support", "helps maintain", "daily wellness", "routine", "consistency", "from within"
- No prohibited terms: cure, treat, prevent, diagnose, reverse, heal, guaranteed, FDA approved, doctor recommended, anxiety, depression, disease claims, medical outcomes
- FTC/FDA safe for wellness supplement context

---

## Full Page Code

Paste into the Shopify page editor (Custom HTML section) or a new page template.

```html
<!-- Vital Vision Shop — Wellness Quiz | Native Shopify | /pages/wellness-quiz -->
<!-- Local draft only. Do not publish without QA sign-off. -->

<style>
  /* ── Scoped to #vv-quiz only ── */
  #vv-quiz {
    font-family: Georgia, 'Times New Roman', serif;
    background-color: #FFF8EC;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 20px;
    box-sizing: border-box;
  }

  #vv-quiz * {
    box-sizing: border-box;
  }

  #vv-quiz .vv-badge {
    display: inline-block;
    background-color: #0F3B2E;
    color: #F4C430;
    font-size: 11px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 28px;
  }

  #vv-quiz .vv-headline {
    font-size: clamp(26px, 5vw, 40px);
    color: #0F3B2E;
    text-align: center;
    font-weight: 400;
    line-height: 1.25;
    margin: 0 0 16px;
    max-width: 560px;
  }

  #vv-quiz .vv-subheadline {
    font-size: clamp(15px, 2.5vw, 18px);
    color: #3d5a4e;
    text-align: center;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    line-height: 1.6;
    margin: 0 0 40px;
    max-width: 480px;
  }

  #vv-quiz .vv-question {
    font-size: clamp(17px, 3vw, 22px);
    color: #0F3B2E;
    text-align: center;
    font-weight: 400;
    margin: 0 0 32px;
    max-width: 520px;
  }

  #vv-quiz .vv-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;
    max-width: 480px;
  }

  @media (min-width: 520px) {
    #vv-quiz .vv-cards {
      grid-template-columns: 1fr 1fr;
    }
  }

  #vv-quiz .vv-card {
    background: #FFFFFF;
    border: 2px solid #e8dfc8;
    border-radius: 16px;
    padding: 24px 20px;
    cursor: pointer;
    text-align: left;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
    overflow: hidden;
  }

  #vv-quiz .vv-card:hover,
  #vv-quiz .vv-card:focus-visible {
    border-color: #F4C430;
    box-shadow: 0 4px 20px rgba(15, 59, 46, 0.12);
    transform: translateY(-2px);
    outline: none;
  }

  #vv-quiz .vv-card:active {
    transform: translateY(0);
  }

  #vv-quiz .vv-card-icon {
    font-size: 28px;
    line-height: 1;
    margin-bottom: 4px;
  }

  #vv-quiz .vv-card-label {
    font-size: 15px;
    color: #0F3B2E;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 600;
    line-height: 1.3;
  }

  #vv-quiz .vv-card-sub {
    font-size: 13px;
    color: #6b8a7a;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    line-height: 1.4;
  }

  /* Loading state */
  #vv-quiz .vv-loading {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
  }

  #vv-quiz .vv-loading.is-active {
    display: flex;
  }

  #vv-quiz .vv-loading-text {
    font-size: 16px;
    color: #0F3B2E;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    letter-spacing: 0.04em;
  }

  #vv-quiz .vv-spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #e8dfc8;
    border-top-color: #F4C430;
    border-radius: 50%;
    animation: vv-spin 0.8s linear infinite;
  }

  @keyframes vv-spin {
    to { transform: rotate(360deg); }
  }

  #vv-quiz .vv-cards.is-hidden {
    visibility: hidden;
    pointer-events: none;
  }

  #vv-quiz .vv-question.is-hidden {
    visibility: hidden;
  }

  #vv-quiz .vv-divider {
    width: 48px;
    height: 2px;
    background: #F4C430;
    border: none;
    margin: 0 auto 36px;
    border-radius: 2px;
  }

  #vv-quiz .vv-footer-note {
    margin-top: 44px;
    font-size: 12px;
    color: #9aaa9f;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    text-align: center;
    max-width: 400px;
    line-height: 1.6;
  }
</style>

<div id="vv-quiz" role="main">

  <span class="vv-badge">Wellness Match</span>

  <h1 class="vv-headline">Discover Your Personalized Wellness Ritual</h1>

  <hr class="vv-divider" aria-hidden="true">

  <p class="vv-subheadline">
    Answer one quick question to discover which daily wellness support
    may fit your routine best.
  </p>

  <p class="vv-question" id="vv-question-text">
    What would you like support with most right now?
  </p>

  <div class="vv-cards" role="list" aria-labelledby="vv-question-text">

    <button
      class="vv-card"
      role="listitem"
      tabindex="0"
      aria-label="Daily wellness foundation"
      data-result="Inner Balance"
      data-url="/pages/inner-balance-result"
    >
      <span class="vv-card-icon" aria-hidden="true">🌿</span>
      <span class="vv-card-label">Daily wellness foundation</span>
      <span class="vv-card-sub">A consistent ritual designed to support your overall sense of balance from within.</span>
    </button>

    <button
      class="vv-card"
      role="listitem"
      tabindex="0"
      aria-label="Calm and balance"
      data-result="Inner Calm"
      data-url="/pages/inner-calm-result"
    >
      <span class="vv-card-icon" aria-hidden="true">🌸</span>
      <span class="vv-card-label">Calm and balance</span>
      <span class="vv-card-sub">Thoughtfully formulated to help maintain a grounded, centered feeling day to day.</span>
    </button>

    <button
      class="vv-card"
      role="listitem"
      tabindex="0"
      aria-label="Digestion and gut wellness"
      data-result="Inner Bloom"
      data-url="/pages/inner-bloom-result"
    >
      <span class="vv-card-icon" aria-hidden="true">🌼</span>
      <span class="vv-card-label">Digestion and gut wellness</span>
      <span class="vv-card-sub">Designed to support a comfortable, thriving digestive routine from the inside out.</span>
    </button>

    <button
      class="vv-card"
      role="listitem"
      tabindex="0"
      aria-label="Hair, skin, and nails"
      data-result="Inner Grow"
      data-url="/pages/inner-grow-result"
    >
      <span class="vv-card-icon" aria-hidden="true">✨</span>
      <span class="vv-card-label">Hair, skin, and nails</span>
      <span class="vv-card-sub">A beauty-from-within approach designed to support your natural radiance over time.</span>
    </button>

  </div>

  <div class="vv-loading" id="vv-loading" aria-live="polite" aria-label="Loading your match">
    <div class="vv-spinner" aria-hidden="true"></div>
    <span class="vv-loading-text">Preparing your match&hellip;</span>
  </div>

  <p class="vv-footer-note">
    These statements have not been evaluated by the Food and Drug Administration.
    These products are not intended to diagnose, treat, cure, or prevent any disease.
  </p>

</div>

<script>
  (function () {
    'use strict';

    var cards = document.querySelectorAll('#vv-quiz .vv-card');
    var cardGrid = document.querySelector('#vv-quiz .vv-cards');
    var questionText = document.querySelector('#vv-quiz .vv-question');
    var loading = document.getElementById('vv-loading');

    function handleSelect(card) {
      var url = card.getAttribute('data-url');
      if (!url) return;

      // Disable all cards
      cards.forEach(function (c) {
        c.disabled = true;
        c.setAttribute('aria-disabled', 'true');
      });

      // Show loading state
      cardGrid.classList.add('is-hidden');
      questionText.classList.add('is-hidden');
      loading.classList.add('is-active');

      // Redirect after brief loading delay
      setTimeout(function () {
        window.location.href = url;
      }, 900);
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        handleSelect(card);
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect(card);
        }
      });
    });
  })();
</script>
<!-- End Vital Vision Wellness Quiz -->
```

---

## Implementation Notes

### Paste target
Shopify Admin > Online Store > Pages > New page
Title: `Wellness Quiz`
Handle: `wellness-quiz`
Content: paste the HTML block above (switch editor to HTML mode)

### Theme compatibility
- Works with any Dawn-based or sectioned theme.
- The `#vv-quiz` wrapper is self-contained and will not conflict with existing theme styles.
- No Liquid variables required.

### Mobile behavior
- Single-column card layout on screens under 520px.
- Two-column grid at 520px and above.
- Touch tap triggers the same `click` handler.

### Accessibility
- Cards are `<button>` elements — keyboard navigable and screen-reader announced.
- `aria-live="polite"` on the loading state announces "Preparing your match..." to assistive tech.
- `role="list"` / `role="listitem"` on card grid for semantic structure.

### Loading state
- 900ms delay before redirect — intentional, gives user visual feedback without feeling slow.

---

## Safe Next Steps (in order)

1. **QA review** — run `/vv-qa-guard` on this file before touching live store.
2. **Create result pages** — draft the four result page PDPs (Inner Balance, Inner Calm, Inner Bloom, Inner Grow) at their respective handles.
3. **Staging test** — paste into a draft Shopify page, test all four routing paths manually on mobile and desktop before publishing.
4. **Email capture phase** — add Klaviyo form only after result pages are live and routing is confirmed.
5. **Tracking** — add Meta Pixel `Lead` event and GA4 event only after QA sign-off.
