# Manual VQB Edit Checklist — Vital Vision Shop
# Complete this checklist as you apply changes in the VQB dashboard.
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

Date of edit session: _______________
Edited by: _______________
VQB quiz edited: _______________ (organic / paid / both)

---

## Before Starting

- [ ] Ran `npm run vqb:validate-update-packet` — PASSED
- [ ] Reviewed `automations/drafts/vqb-safe-update-packet.md`
- [ ] Reviewed `config/vqb-result-copy-to-paste.md`
- [ ] VQB dashboard is open and logged in
- [ ] Confirmed which quiz is being edited (organic ID / paid ID)
- [ ] `AUTO_PUBLISH=false` confirmed in .env
- [ ] `REQUIRE_HUMAN_APPROVAL=true` confirmed in .env
- [ ] `VQB_API_MODE=read_only` confirmed in .env

---

## Step 1 — Email Capture Screen

- [ ] Headline updated: "Unlock Your Personalized Result"
- [ ] Subhead updated: "Get your wellness match + 10% off your first order."
- [ ] Email placeholder updated: "Your email address"
- [ ] CTA button updated: "Reveal My Match →"
- [ ] Micro-copy updated: "No spam. Unsubscribe anytime."
- [ ] Screen saved in VQB
- [ ] Previewed on mobile — fits in one viewport without scrolling

---

## Step 2 — Discount Code Screen

- [ ] Headline updated: "Your 10% Off Code Is Ready"
- [ ] Subhead updated: "Scroll down to see your personalized wellness match."
- [ ] Discount code confirmed: "WELCOME10"
- [ ] Instructions updated: "Applied automatically at checkout · Valid for 48 hours"
- [ ] CTA updated: "See My Product Match ↓"
- [ ] Removed product images from this screen
- [ ] Removed long marketing copy from this screen
- [ ] Removed countdown timers from this screen
- [ ] Screen saved in VQB
- [ ] Previewed on mobile — fits in one viewport without scrolling

---

## Step 3 — Inner Bloom Result Card

- [ ] Global label set: "Your Recommended Wellness Match"
- [ ] Result headline updated: "Your gut may be ready for daily support."
- [ ] Product name updated: "Inner Bloom — Advanced Probiotic Formula"
- [ ] Short description updated (compliant, no disease claims)
- [ ] Quantity label updated: "Choose Your Supply"
- [ ] Primary CTA updated: "Shop This Match"
- [ ] Secondary CTA updated: "Why This Match?"
- [ ] Disclaimer added: "This recommendation is for educational purposes only..."
- [ ] Why This Match headline: "Why Inner Bloom?"
- [ ] Why This Match body updated (compliant copy)
- [ ] Compliance tag added: "Results may vary. This is not medical advice."
- [ ] Card saved in VQB
- [ ] Previewed on mobile at 375px

---

## Step 4 — Inner Calm Result Card

- [ ] Global label set: "Your Recommended Wellness Match"
- [ ] Result headline updated: "Your evenings may deserve a calmer ritual."
- [ ] Product name updated: "Inner Calm — Magnesium Glycinate"
- [ ] Short description updated (compliant)
- [ ] Quantity label updated: "Choose Your Supply"
- [ ] Primary CTA updated: "Shop This Match"
- [ ] Secondary CTA updated: "Why This Match?"
- [ ] Disclaimer added
- [ ] Why This Match headline: "Why Inner Calm?"
- [ ] Why This Match body updated
- [ ] Compliance tag added
- [ ] Card saved in VQB
- [ ] Previewed on mobile at 375px

---

## Step 5 — Inner Grow Result Card

- [ ] Global label set: "Your Recommended Wellness Match"
- [ ] Result headline updated: "Your glow may start from within."
- [ ] Product name updated: "Inner Grow — Hair, Skin & Nails Support"
- [ ] Short description updated (compliant)
- [ ] Quantity label updated: "Choose Your Supply"
- [ ] Primary CTA updated: "Shop This Match"
- [ ] Secondary CTA updated: "Why This Match?"
- [ ] Disclaimer added
- [ ] Why This Match headline: "Why Inner Grow?"
- [ ] Why This Match body updated
- [ ] Compliance tag added
- [ ] Card saved in VQB
- [ ] Previewed on mobile at 375px

---

## Step 6 — Inner Balance Result Card

- [ ] Global label set: "Your Recommended Wellness Match"
- [ ] Result headline updated: "Your daily wellness foundation may start here."
- [ ] Product name updated: "Inner Balance — Daily Complete Multivitamin"
- [ ] Short description updated (compliant)
- [ ] Quantity label updated: "Choose Your Supply"
- [ ] Primary CTA updated: "Shop This Match"
- [ ] Secondary CTA updated: "Why This Match?"
- [ ] Disclaimer added
- [ ] Why This Match headline: "Why Inner Balance?"
- [ ] Why This Match body updated
- [ ] Compliance tag added
- [ ] Card saved in VQB
- [ ] Previewed on mobile at 375px

---

## Step 7 — Mobile Layout Verification

- [ ] Inner Bloom: image stacks above title at 375px
- [ ] Inner Calm: image stacks above title at 375px
- [ ] Inner Grow: image stacks above title at 375px
- [ ] Inner Balance: image stacks above title at 375px
- [ ] All product titles fit within 2 lines at 375px
- [ ] All primary CTAs are full-width at 375px
- [ ] All primary CTAs are at least 48px tall
- [ ] All secondary CTAs are visually subordinate to primary
- [ ] "Why This Match?" section appears below primary CTA on all cards
- [ ] Tested at 390px (iPhone 14) — layout holds

---

## Step 8 — Final QA Before Publishing

- [ ] All 4 result cards previewed end-to-end in VQB preview mode
- [ ] Completed the full quiz flow (start → email → discount → result) on mobile
- [ ] No prohibited language found on any screen
- [ ] Disclaimer present on all result cards
- [ ] "Results may vary" present on all result cards
- [ ] CTA links point to correct Shopify product pages
- [ ] Discount code "WELCOME10" is active in Shopify discounts
- [ ] Human has reviewed and approved all changes

---

## Approval Sign-Off

- [ ] Human reviewer: _______________ Date: _______________
- [ ] Approved to publish: YES / NO
- [ ] Notes: _______________________________________________________________

---

## Rollback (if needed)

1. VQB Dashboard → Result Pages → select affected page
2. Use VQB version history / undo to revert
3. If unavailable: restore copy from `config/vqb-result-copy-to-paste.md`
4. Test on mobile before re-publishing
5. Log the rollback below:

Rollback date: _______________
Reason: _______________
Reverted by: _______________

---

*No automation scripts edit VQB or Shopify.*
*All changes are made manually by a human in the VQB dashboard.*
