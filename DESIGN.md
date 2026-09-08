# Design

<!-- impeccable:design-schema 1 -->

## World

Late-night smash-burger stand hype poster — a fight-card / concert-poster energy
applied to editorial food photography, not a cartoon delivery-app listing. Near-black
charcoal ground (matches the grill at night, and matches the hero video's own
recomposited background exactly), ember and melted-cheddar light doing the work a
neon sign would do on a real feria stall. The brand's existing comic-explosion mascot
is kept as a badge/lockup (logo, favicon) but is not the page's primary visual
language — the page is built from the real photography instead.

## Palette

Color strategy: Committed dark ground, two warm accents pulled from the food itself
(melted cheddar gold, ember red-orange) rather than the flat vector colors of the
mascot logo.

- `--color-char` `#0c0a08` — page ground (identical to the hero video's
  recomposited background, so the video reads as native to the page, not a
  rectangle pasted on top)
- `--color-char-soft` `#171310` — alternating section ground
- `--color-char-line` `#2c251d` — hairline borders/dividers
- `--color-paper` `#f6efe2` — primary text (warm kraft-paper white, not pure white)
- `--color-paper-dim` `#b9ab97` — secondary text
- `--color-cheddar` `#ffab1f` / `--color-cheddar-soft` `#ffcf7a` — primary accent
- `--color-ember` `#ff5a36` / `--color-ember-soft` `#ff8a63` — secondary accent,
  carries every primary CTA

## Typography

- Display (`font-display`): Anton — uppercase-only, condensed, heavy; every
  headline and kicker-adjacent stat.
- Body/UI (`font-body`): Plus Jakarta Sans — paragraphs, nav, buttons' inner label
  where not mono.
- Kicker/label (`font-mono`): JetBrains Mono — all-caps tracked labels, CTA button
  text, nav links.

## Components & patterns

- **Ember glow** (`.ember-glow`): soft drop shadow + ring in the ember color, used
  on primary WhatsApp CTAs so they read as the hot/active element on a dark page.
- **Marquee trust bar**: looped horizontal scroll of icon + label pairs
  (`animate-marquee`, 26s linear).
- **Riseln entrance** (`.animate-riseIn`): a single subtle rise+fade on hero-level
  content; not reused as a scroll-triggered pattern site-wide, kept rare on purpose.

## Hero motion — looping burger clip, true alpha transparency

First shipped as a scroll-scrubbed pinned section (video advanced/reversed with
scroll position); the user tried it live and asked for a simpler always-on loop in
the hero instead, so `BurgerAssembly.tsx` was removed and the clip now lives
directly in `Hero.tsx` as a plain `autoPlay muted loop playsInline` video next to
the headline.

That surfaced a second problem: the recomposited clip's flat `#0c0a08` background,
while identical to the page's *flat* ground color, still showed as a visible
rectangle against the ember/cheddar radial glow blobs behind the hero content —
color-matching a background isn't the same as transparency. Fixed properly: the
same 144 flood-fill-cleaned frames were re-exported as straight (non-premultiplied)
RGBA PNGs and encoded to a real alpha-channel WebM
(`libvpx-vp9 -pix_fmt yuva420p`, 560px wide, ~2.1MB) at
`src/assets/videos/hamburguesa-armado-alpha.webm`. The `<video>` now lists that as
its first `<source type="video/webm">`, falling back to the flattened
`hamburguesa-armado.mp4` (`video/mp4`) for browsers without alpha-WebM support
(notably Safari) — degrades to the old solid-background look there rather than
breaking, but composites with true transparency everywhere else, so it "calza" into
whatever's behind it (the glow, or any future background) with no box, no border,
no crop.

`prefers-reduced-motion: reduce` still pauses the loop (the poster frame shows
instead) via a small `matchMedia`-backed hook in `Hero.tsx` — simpler than the old
pinned-section version, but the commitment stands.

## Source video defect fixed pre-import

The hero clip has been swapped once already. The first source
(`Hamburguesa-hero.mp4`, 1080×1920 portrait) had an inconsistent baked-in
background: frame 0 was solid black, but roughly 75% of the clip sat on an
AE-style transparency checkerboard flattened into the video pixels — confirmed by
raw RGB sampling, not a display artifact, and not fixable with an ordinary
chroma/color key because the checker's two gray tones collide with real highlight
colors in the food (mayo, melted-cheddar specular highlights). The user then
supplied a second, better clip (`Burger_ingredients_stacking_anim…1080p.mp4`,
1920×1080 landscape, from `C:\Users\nmart\Downloads`) with the same kind of
checkerboard defect, which got the identical treatment and replaced the first clip
entirely — same pipeline, different source file.

Fix, applied to both: a connectivity-aware approach instead of a blanket color key.
For each of the 144 frames, flood-fill background pixels starting only from the
frame border through near-neutral/checker-colored pixels
(`scipy.ndimage.binary_propagation`), so a "hole" of similar color deep inside the
food (a highlight on cheese) is never reached unless it connects all the way to the
border without crossing a saturated food pixel. Edges eroded 2px and feathered back
in over ~3.5px to remove the anti-aliased checker/food boundary halo.

For the current (second) clip specifically: computed the exact alpha-content
bounding box across all 144 frames first (`x: 313–1608`, `y: 0–1079` of the
1920×1080 source) to find a crop that has zero risk of clipping real content —
landed on a centered `1400×1080` crop (`ffmpeg crop=1400:1080:260:0`), which is
also what fixed the "cortado por los costados" complaint on the *first* clip (that
one was forced into a 9:16 box via `object-cover`, cropping hard; this one's
container aspect was changed to match the crop instead, `aspect-[35/27]`, so
nothing is ever cut). Sped up ~1.67× by declaring a 40fps input rate over the same
144 frames instead of dropping/duplicating any (`144 ÷ 40fps = 3.6s`, down from the
source's native 6s) — a frame-accurate speed change, not a lossy re-time.

The cleaned masks were exported twice: flattened onto solid `#0c0a08` as the MP4
fallback (`hamburguesa-armado.mp4`, 700×540, ~1.0MB), and kept as straight RGBA and
encoded to a real alpha-channel WebM (`hamburguesa-armado-alpha.webm`, VP9
`yuva420p`, 700×540, ~1.3MB) — see Hero motion above for why both exist. The three
other client video clips (buns, grill, burger close-up) were genuine handheld
footage with no such defect and were used as-is (only transcoded/resized for web).

## Content rules honored

- No fabricated prices — every product CTA reads "Consultar por WhatsApp".
- Reviews are real Instagram comments; per explicit instruction, only the quote
  text is used — no usernames, handles, or avatars anywhere on the page.
- Delivery is within J. B. Alberdi only, pickup also offered — the order-flow steps
  and FAQ both say "se envía o se retira" (user's own words for the real flow), not
  a bare pickup-only claim.
- No payment-method logos invented — footer/FAQ point to WhatsApp instead of
  listing unconfirmed payment providers.
- Claim "The Real Grilled Boom" is the operator's own existing line, read off their
  event-tent banner photo (`puesto-feria-nocturna.webp`), not invented copy — the
  same banner photo appears in the "Nosotros" section so the claim is visibly
  sourced from the brand's own signage.
- "Nosotros" credits the real origin: a home-kitchen family venture between the
  families of a couple, corrected after an initial draft wrongly said it started as
  a feria stand — the feria puesto is the current/expanded chapter, not the origin.
- The "Matambre & Choripán" menu banner does not claim its video shows those dishes
  — the only grill footage on hand (`parrilla-viva.mp4`) shows burger patties, so
  the copy ties the visual to the cooking method ("El mismo fuego") instead of
  implying it's a literal product shot of matambre or choripán. Also rebuilt as a
  split card (video in its own aspect-correct panel) instead of a full-bleed banner,
  since forcing a near-square clip into a wide short strip via `object-cover` is
  what produced the original "cortado" look the user flagged.

## Provenance

All raster assets are the user-provided photography from
`C:\Users\nmart\Pictures\assets-bombaasada`, converted to WebP (quality 88) and
copied into `src/assets/images/`. The four client video clips are in
`src/assets/videos/` as web-optimized H.264 MP4, plus the hero clip's extra
alpha-WebM export (see Hero motion). No stock or generated imagery anywhere on the
page. Icon set is `lucide-react`; note its current version ships no
trademarked/brand glyphs (no `Instagram` export) — Instagram references use the
generic `AtSign` icon instead.

## Verification performed

`tsc -b` and `oxlint` both pass clean; `vite build` succeeds after every round of
changes in this session. Confirmed via live DOM inspection in the running dev
server: computed styles resolve every custom color token correctly, videos reach
`readyState 4` with correct dimensions/duration, images 200 OK. The hero's alpha
WebM was confirmed rendering with genuine transparency (no background rectangle
against the ember/cheddar glow) via screenshot on a mobile viewport (375×812).
Background-tab video/rAF throttling in this tool session (not a code issue —
confirmed by manually calling `.play()`, which works instantly) means autoplay
video should get one more glance in a normal foregrounded browser tab, and the
alpha-WebM path specifically should get one real check in Safari (falls back to
the solid-background MP4 there by design, but worth confirming that fallback looks
acceptable) before handing off to the client.
