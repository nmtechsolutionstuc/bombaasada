# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite + Tailwind CSS, `lucide-react` for icons — matching the sibling project convention used across this workspace (see `../drifting`). Built from scratch; no prior code existed for this brand.

## Users

Hungry locals and passers-by in and around Juan Bautista Alberdi, Tucumán — the stand serves that barrio only (no delivery coverage claim beyond it). Street-food / feria crowd: value big, indulgent, shareable smash-burgers, matambre and choripán with papas, ordered via WhatsApp for pickup or found at the physical puesto. Casual, mobile-first browsing (checking hours/location/menu before heading over or messaging).

## Product Purpose

A conversion-focused landing page for the brand Bomba Asada. No on-site checkout — the funnel routes visitors to WhatsApp (`https://api.whatsapp.com/send?phone=543865643467`) to order, and to Instagram (`@bombaasada`) for the feed/reviews/DMs. Success is a visitor deciding what to order and messaging WhatsApp, or saving the location to visit the stand.

## Positioning

**Claim (assumption, labeled):** the brief left the claim field blank. The stand's own event-tent banner (photographed asset `Puesto en ultima fiesta 29 de agosto.png`) already carries the line **"the Real Grilled Boom"** — adopted here as the brand claim since it is the operator's own existing copy, not invented. Paired with a Spanish subhead describing the offer: hamburguesas smash, matambre y choripán a las brasas, todo con papas.

Differentiator vs. a generic delivery-app burger listing: this is a known, photographed, feria-tested stand with a real mascot/brand identity (comic "explosion" burger logo), not an anonymous ghost kitchen — the page should feel like the stand's own hype poster, not a template menu.

## Operating Context

Social/WhatsApp-commerce model, single neighborhood coverage (J.B. Alberdi only — no citywide delivery claim). The page is a persuasive hype/menu page, not a checkout flow.

## Capabilities and Constraints

- No checkout/cart — every CTA routes to WhatsApp (primary) or Instagram (secondary), never an invented order form.
- All imagery/video must come from the local asset library at `C:\Users\nmart\Pictures\assets-bombaasada` (logo, product photography, and 4 video clips). No stock/Unsplash/placeholder images. Assets copied into `src/assets/` under descriptive names.
- **Hero video defect fixed, not re-requested:** `Hamburguesa-hero.mp4` (the exploded/reassembling burger clip) was rendered by the client's tool with an inconsistent background — frame 0 is solid black, but roughly frames 30-143 sit on a baked-in AE-style transparency checkerboard (confirmed by raw pixel sampling, not a display artifact). Reprocessed frame-by-frame in Python (flood-fill from the border through near-neutral/checker-colored pixels only, via `scipy.ndimage.binary_propagation`, so the real food pixels — including bright cheese/mayo highlights that are colorimetrically close to the checker tone — are never touched) and recomposited onto a solid `#0c0a08` ground matching the page. Output written to `src/assets/videos/hamburguesa-armado.mp4` (760px wide, ~24fps, ~2.3MB, no audio). Do not re-flag this as a defect; the source file in Pictures is untouched, only the copy in `src/assets` was reprocessed.
- Reviews: three real Instagram comments were provided as screenshots (`Reseña1.png`–`Reseña3.png`). Per explicit user instruction, only the **comment text** is used on the page — commenter usernames/handles/avatars are not reproduced anywhere.
- Other three video clips (`Hamburguesa-video.mp4`, `Panes.mp4`, `Video-Parrilla.mp4`) are genuine handheld/phone footage with no background defect — used as-is (transcoded for web only).

## Brand Commitments

- Name: Bomba Asada. Claim: "The Real Grilled Boom" (see Positioning).
- Menu: hamburguesas (smash, multi-patty, cheddar, bacon, caramelized onion), 🥩 matambre, 🥖 choripán — todo con papas.
- Coverage: delivery within J. B. Alberdi, plus pickup at the puesto — customer's choice, confirmed on WhatsApp (no delivery claim beyond that zone).
- Contact: WhatsApp `https://api.whatsapp.com/send?phone=543865643467`, Instagram `@bombaasada`.
- Logo: cartoon winking-burger mascot with a comic-book explosion burst, `logo.png` (has its own black background baked in — treated as a lockup/badge, not silhouette-cut).
- Existing identity language (from real photos): red-and-white checkered paper trays, kraft-paper bags with the mascot stamped on, black-sesame buns, glossy dripping cheddar, string lights over a market-stall tent at night. The new design should feel like a premium editorial evolution of that real stand identity, not a disconnect from it.
- **Origin story (confirmed by user):** Bomba Asada did not start as a feria stand — it started as a home-kitchen family venture, with the families of a couple both involved. It now also runs a puesto at neighborhood ferias (the photographed tent), but the "Nosotros" copy must credit the home/family origin, not claim the feria stand was the beginning.

## Evidence on Hand

Real asset library at `C:\Users\nmart\Pictures\assets-bombaasada`:
- `logo.png` — mascot lockup.
- `Hamburguesa.png` — combo shot (burger, fries, Coca-Cola, branded kraft box) on checkered paper.
- `Hamburguesa2.png` — real Instagram post graphic ("DEFINICIÓN FIACA…") over a loaded cheese-fries shot; has baked-in marketing text/meme copy, used only as a cropped food photo, not reproduced as a live post.
- `Hamburguesa3.png` — three burgers, overhead angle, checkered paper + kraft wrap.
- `Hamburguesa4.png` — single stacked burger close-up against a kraft bag.
- `Panes.png` / `Panes.mp4` — trays of house-baked sesame buns.
- `Puesto en ultima fiesta 29 de agosto.png` — the actual stand at a night feria, string lights, sponsor decals, the "the Real Grilled Boom" banner line.
- `Hamburguesa-hero.mp4` → reprocessed as `hamburguesa-armado.mp4` — assemble/explode burger sequence, driven by scroll (see Design).
- `Hamburguesa-video.mp4`, `Video-Parrilla.mp4` — real handheld footage (burger detail, live grill).
- `Reseña1.png`–`Reseña3.png` — real Instagram review screenshots; text-only extraction:
  1. "Las mejores hamburguesas de Alberdi"
  2. "La verdad que con las hamburguesas ya estaba para sacarse el sombrero, pero con esas papas arrasaron. Un 10.000/10"
  3. "Las mejores del condado"

No prices were provided — CTAs say "Consultar por WhatsApp" rather than inventing figures.

## Product Principles

- Editorial/premium street-food, not a generic delivery-app listing: dark, high-contrast, cinematic food photography treatment; the existing comic-mascot identity is honored (used as a badge/lockup) but not the primary visual language of the whole page.
- The scroll-driven hero (burger assembling/disassembling as the user scrolls up/down) is the centerpiece motion moment — no autoplay loop, it is fully scroll-position-driven.
- Every CTA funnels to WhatsApp first, Instagram second — never a fake cart/checkout.
- Real assets only; no stock imagery, no invented prices, no fabricated reviewer identities.
- Single-neighborhood honesty: never imply delivery beyond J. B. Alberdi.

## Accessibility & Inclusion

No product-specific requirement beyond standard web accessibility: respect `prefers-reduced-motion` (the scroll-scrub hero must degrade to a static or simple-fade state, not a forced autoplay loop, when reduced motion is requested), keyboard/skip-link navigation, legible contrast on the dark ground.
