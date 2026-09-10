# Laila's Beauty Salon — sitio web

Marketing site for **Laila's Beauty Salon**, a women-only beauty salon in El Pino, Atlántida, on the CA-13 highway about 20 minutes west of La Ceiba, Honduras.

**Live site:** https://thejohncarter-ai.github.io/lailas-beauty-salon/

- Instagram: https://www.instagram.com/lailasbeautysalonhn
- WhatsApp: **+504 3197-9888**
- Plus Code: `P36V+V2W El Pino`

## What's in it

Pure static HTML / CSS / JS — no build step, no framework. Hosted on GitHub Pages.

| Path | What |
|---|---|
| `index.html` | Single page: hero, the salon, keratin before/after, interactive menu + appointment ticket, gallery, boutique, WhatsApp booking, map, Instagram, FAQ. The service menu, gallery and Instagram strip are **pre-rendered** into it. |
| `css/style.css` | Design system (ivory ground, oxblood ink, bronze; Fraunces / Instrument Sans) and all animation |
| `js/data.js` | **The single source of truth for content** — services, prices, gallery, Instagram posts, day/time chips. Loaded by the browser *and* by `tools/prerender.py`. |
| `js/main.js` | Behaviour: the WhatsApp composer, the appointment ticket, the mobile cart bar, the before/after slider, the lightbox |
| `js/i18n.js` | **English copy** for every static string, plus the ES/EN toggle runtime. Spanish is the source of truth and lives in `index.html`. |
| `tools/prerender.py` | Writes the service menu, gallery and Instagram strip into `index.html` as static markup. **Re-run after any price change.** |
| `assets/fonts/` | Fraunces + Instrument Sans, self-hosted, subsetted to Latin, 95 KB for both |
| `BRAND.md` | Brand direction: palette, type, voice, naming, logo brief, photo direction |
| `GROWTH.md` | SEO, Google Business Profile, directories, press, partnerships, 90-day plan |
| `assets/img/work/` | Photos pulled from Laila's Instagram, cropped and web-sized, each with a `-sm` thumbnail |
| `assets/logo.jpg` | The salon's Instagram logo seal (nav, hero, footer). **Needs replacing with a real vector logo — see BRAND.md §5.** |
| `assets/og.jpg` | Social share card |
| `MARKET-RESEARCH.md` | La Ceiba / Atlántida comparables and pricing recommendations |

## Branding

Everything is drawn from Laila's own logo and Instagram templates:

| Token | Hex | What it is |
|---|---|---|
| `--cal` | `#f7f1e8` | Warm ivory. The ground for ~60% of the page. |
| `--vino` | `#47191c` | **The exact background colour of Laila's logo seal**, now used as the ink. |
| `--bronce` | `#b5854e` | Replaces antique gold. Survives print and vinyl; decorative only, never body text. |
| `--concha` | `#e4c7b7` | Rose sand, for tints and bands. |
| `--tinta` | `#2e2a26` | Warm charcoal for body copy, never pure black. |

Type: **Fraunces** for display, **Instrument Sans** for everything else. No script face.

The oxblood is Laila's own colour and it has not changed. What changed is that it is now the **ink on an ivory ground** rather than the background. Dark-and-gold is the salon-template default, and more importantly it was flattening her photography, which is the thing she is actually selling. The full argument, with the colour-science and outdoor-legibility evidence, is in [BRAND.md](BRAND.md).

## How booking works

There is no booking platform. Everything goes to WhatsApp, which is how the whole La Ceiba market actually books.

1. The client taps services in the menu. The ticket shows running duration and total in lempiras.
2. She picks a day and a time window, and optionally types her name.
3. **"Enviar por WhatsApp"** opens `wa.me/50431979888` with the full message already written:

```
¡Hola Laila! 🌿
Quiero agendar una cita.

• Nombre: Ana
• Servicios:
   – Keratina Smooth — L.1,000
   – Pintado semipermanente — L.150
   – Manicura — a consultar
• Duración aprox.: 4 h 45 min
• Total aprox.: L.1,150 (+ 1 a consultar)
• Día: El fin de semana
• Hora: Por la tarde

¿Tenés cupo? ¡Gracias!
```

A live preview of that exact message sits above the button so nothing is a surprise. **The button is never disabled** — with nothing selected it opens a general message instead. The keratin section has its own pre-filled "send me a photo for a quote" message.

On phones the appointment ticket falls below all 18 services, so a **sticky bar** at the bottom of the screen carries the running total and the send button as soon as anything is selected.

To change the number, edit `WA_NUMBER` and `WA_DISPLAY` at the top of `js/data.js` (and the places it appears as text in `index.html`).

## Language (ES / EN)

**Spanish is the default, always.** English never activates on its own; a visitor has to tap EN, and that choice is remembered.

This matters more than it sounds. The site previously auto-detected `navigator.languages`, and Googlebot renders in headless Chrome reporting `en-US` while sending no `Accept-Language` header — so Google was indexing the *English* title and description for a Spanish-language salon in Honduras. The English toggle exists only for the coastal tourist traffic (Pico Bonito, Cayos Cochinos).

- Static text: every translatable element has `data-i18n="key"`. Spanish is whatever is in `index.html`; English is the matching key in `I18N_EN` in `js/i18n.js`.
- Data-driven text (services, gallery captions, marquee, day/time chips): the `en` fields in `js/data.js`.
- A short `I18N_ES` block in `js/i18n.js` holds the handful of strings JS builds at runtime so Spanish never falls back to English.

## Editing content

> After changing anything in `js/data.js`, run `python tools/prerender.py` so the static HTML matches. Otherwise search engines and AI crawlers keep seeing the old prices.

- **Services and prices:** the `SERVICES` array in `js/data.js`. Set `price: null` for anything that should read *a consultar* — the ticket and the WhatsApp message handle it automatically.
- **Photos:** drop a JPG (max 1400px) and a `-sm` version (max 700px) into `assets/img/work/`, then add an entry to `GALLERY` in `js/data.js` with a `size` of `g-w6` (wide), `g-p3` or `g-p4` (portrait).
- **Instagram strip:** the `IG_POSTS` array in `js/data.js` — each entry pairs a local thumbnail with the real post URL.
- **Hours:** `HOURS_ES` at the top of `js/data.js`, `js.hours` in `js/i18n.js`, and `OPEN_DAYS`/`OPEN_H`/`CLOSE_H` in `js/main.js` (these drive the live *abierto ahora* indicator) and `openingHoursSpecification` in the JSON-LD.
- **Address, plus code, phone:** search `index.html` for `Sutrasco`.

## ⚠️ Confirm with Laila before this goes out

These were filled in from public posts or reasonable defaults and should be checked:

1. **Opening hours.** The site says *Lunes a sábado, 9:00 a.m. – 6:00 p.m.* This was **not** published anywhere — it is a placeholder, and it now also drives the live *abierto ahora* indicator in the hero and the `openingHoursSpecification` in the schema. Getting it right matters: whether a business is open at the time of the search is a Google local-pack ranking factor.
2. **Service durations.** Every `mins` value is an industry estimate, not Laila's real timing. They drive the "duración aprox." number.
3. **Prices.** Taken from her July and August 2025 Instagram posts. `L.80` corte and `L.1,000` keratina were **promotional** prices on specific days — decide whether they are the standing price. See `MARKET-RESEARCH.md` §5.
4. **Payment methods.** The FAQ deliberately says "ask on WhatsApp" because nothing is published.
5. **Photos.** Everything here came from a public Instagram feed with 13 posts, pulled at the 1440px renditions Instagram serves on post pages. More and better photos are still the single biggest improvement available — see the phone protocol in `BRAND.md` §6.
6. **A photo of Laila.** There is no picture of her anywhere on the site. Clients book a person. This is the largest content gap and it costs one photo.
7. **The ten "a consultar" prices.** More than half the menu has no number. A *"desde"* floor on every line would pre-qualify leads and make the whole menu indexable. Laila needs to set those figures.

## What is deliberately not here

- **No invented reviews, ratings or `aggregateRating` schema.** Self-serving review markup is a Google policy violation. Reviews belong on the Google Business Profile, which does not exist yet — that is the first item in `GROWTH.md`.
- **No `FAQPage` schema.** Google stopped showing FAQ rich results in May 2026. The FAQ is written as extractable question-and-answer pairs with prices in numerals instead, which is what AI answer engines actually lift.
- **No prices Laila has not published.**

## Run locally

```bash
python -m http.server 8080
```

## Deploy

Push to `main`. GitHub Pages serves the root of the repo.
