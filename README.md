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
| `index.html` | The home page: hero, the salon, keratin before/after, interactive menu + appointment ticket, gallery, boutique, WhatsApp booking, map, Instagram, FAQ. The service menu, gallery and Instagram strip are **pre-rendered** into it. |
| `keratina/index.html` | Service page for keratin: price, before/after, coastal aftercare, FAQ. Static, no JavaScript, Spanish only. |
| `unas/index.html` | Service page for nails: acrylics, gel polish, keratin on natural nails. Static, no JavaScript, Spanish only. |
| `css/style.css` | Design system (ivory ground, oxblood ink, bronze; Fraunces / Instrument Sans) |
| `js/data.js` | **The single source of truth for content**: services, prices, gallery, Instagram posts, day/time chips, and the WhatsApp message texts (`WA_TEXT`). Loaded by the browser *and* by the pre-render. |
| `js/main.js` | Home-page behaviour: the WhatsApp composer, the appointment ticket, the mobile cart bar, the before/after slider, the lightbox |
| `js/i18n.js` | **English copy** for every static string, plus the ES/EN toggle. Spanish is the source of truth and lives in the HTML. |
| `tools/prerender.py` | Writes the menu, gallery and Instagram strip into `index.html`, stamps a real wa.me link into every WhatsApp button on every page, and stamps a content-hash `?v=` on the CSS and scripts. **Run it after any change in `js/` or `css/`.** |
| `tools/check.py` | Verifies every page after a pre-render and writes two failure-mode test pages. |
| `assets/fonts/` | Fraunces + Instrument Sans, self-hosted, subsetted to Latin, 95 KB for both |
| `assets/img/work/` | Photos from Laila's Instagram at the 1440px renditions, cropped, in JPG and WebP, each with a `-sm` version |
| `assets/logo.jpg`, `assets/logo.webp` | The Instagram logo seal. **Needs replacing with a real vector logo — see BRAND.md §5.** |
| `assets/og.jpg` | Social share card, in the ivory palette |
| `robots.txt`, `sitemap.xml` | AI crawlers explicitly allowed; all three pages listed |
| `BRAND.md` | Brand direction: palette, type, voice, naming, logo brief, photo direction |
| `GROWTH.md` | SEO, Google Business Profile, directories, press, partnerships, 90-day plan |
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
3. **"Enviar mi cita por WhatsApp"** opens `wa.me/50431979888` with the full message already written:

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

A live preview of that exact message sits above the button. **The button is never disabled**: with nothing selected it opens a general message instead. On phones the ticket falls below all 18 services, so a **sticky bar** at the bottom of the screen carries the running total and the send button as soon as anything is selected.

The keratin section and the keratin page open a "send me a photo for a quote" message; the nails page opens a nails message.

**The WhatsApp buttons work without JavaScript.** Every one has a real wa.me link written into the HTML by the pre-render, from `WA_TEXT` in `js/data.js`. JavaScript rewrites them at load for the chosen language and the built appointment, but if a script never arrives on a bad connection, every button still opens WhatsApp with a Spanish message. Before this, they were all `href="#"` until JavaScript filled them in.

**To change the number or the messages:** edit `WA_NUMBER`, `WA_DISPLAY` and `WA_TEXT` in `js/data.js`, update the number where it appears as visible text (search the three HTML files for `3197-9888`), then run the pre-render.

## Language (ES / EN)

**Spanish is the default, always.** English never activates on its own; a visitor has to tap EN, and that choice is remembered.

This matters more than it sounds. The site previously auto-detected `navigator.languages`, and Googlebot renders in headless Chrome reporting `en-US` while sending no `Accept-Language` header — so Google was indexing the *English* title and description for a Spanish-language salon in Honduras. The English toggle exists only for the coastal tourist traffic (Pico Bonito, Cayos Cochinos).

- Static text: every translatable element has `data-i18n="key"`. Spanish is whatever is in `index.html`; English is the matching key in `I18N_EN` in `js/i18n.js`.
- Data-driven text (services, gallery captions, marquee, day/time chips): the `en` fields in `js/data.js`.
- A short `I18N_ES` block in `js/i18n.js` holds the handful of strings JS builds at runtime so Spanish never falls back to English.

## Editing content

> **After changing anything in `js/` or `css/`, run `python tools/prerender.py`, then `python tools/check.py`.** The pre-render re-stamps the content hashes on the CSS and scripts. GitHub Pages lets browsers cache every file for ten minutes; without fresh stamps, a returning visitor can run a new script against an old cached one, which is exactly what broke the booking builder once during testing.

- **Services and prices:** the `SERVICES` array in `js/data.js`. Set `price: null` for anything that should read *a consultar*. **If a keratin or nail price changes, also edit the service page** (`keratina/index.html` or `unas/index.html`): those are hand-written, and the price appears in the title, the description, the text and the schema.
- **Photos:** drop a JPG (max 1400px) and a `-sm` version (max 700px) into `assets/img/work/`, make WebP copies of both, then add an entry to `GALLERY` in `js/data.js` with a `size` of `g-w6` (wide), `g-p3` or `g-p4` (portrait).
- **Instagram strip:** the `IG_POSTS` array in `js/data.js` — each entry pairs a local thumbnail with the real post URL.
- **Hours:** `HOURS_ES` in `js/data.js`, `js.hours` in `js/i18n.js`, `OPEN_DAYS`/`OPEN_H`/`CLOSE_H` in `js/main.js` (the live *abierto ahora* indicator) and `openingHoursSpecification` in the home page's JSON-LD.
- **Address, plus code, phone:** search the three HTML files for `Sutrasco`.

## Service pages

The 2026 research ranked **dedicated service pages as the #1 local organic ranking factor**, and they give AI answer engines a specific URL to cite for a query like *"keratina El Pino"*. A one-page site gives them one generic URL for everything.

- **Built:** `keratina/` and `unas/`. Static HTML, no JavaScript, Spanish only, sharing `css/style.css`. Each carries `Service` and `BreadcrumbList` schema, a pre-filled WhatsApp link, visible FAQs written as extractable question-and-answer pairs with prices in numerals, and links back to the home page. The home page links to both from the keratin section, the menu note and the footer.
- **Deliberately not built:** a lashes-and-makeup page. There is no published price and no lash photo, and a thin page hurts rankings more than no page. Build it by copying `unas/index.html` once Laila provides prices and at least three photos.
- **Prices on these pages are written by hand.** Keep them in sync with `js/data.js`.

## ⚠️ Confirm with Laila before this goes out

These were filled in from public posts or reasonable defaults and should be checked:

1. **Opening hours.** The site says *Lunes a sábado, 9:00 a.m. – 6:00 p.m.* This was **not** published anywhere — it is a placeholder, and it now also drives the live *abierto ahora* indicator in the hero and the `openingHoursSpecification` in the schema. Getting it right matters: whether a business is open at the time of the search is a Google local-pack ranking factor.
2. **Service durations.** Every `mins` value is an industry estimate, not Laila's real timing. They drive the "duración aprox." number.
3. **Prices.** Taken from her July and August 2025 Instagram posts. `L.80` corte and `L.1,000` keratina were **promotional** prices on specific days — decide whether they are the standing price. See `MARKET-RESEARCH.md` §5.
4. **Payment methods.** The FAQ deliberately says "ask on WhatsApp" because nothing is published.
5. **Photos.** Everything here came from a public Instagram feed with 13 posts, pulled at the 1440px renditions Instagram serves on post pages. More and better photos are still the single biggest improvement available — see the phone protocol in `BRAND.md` §6.
6. **A photo of Laila.** There is no picture of her anywhere on the site. Clients book a person. This is the largest content gap and it costs one photo.
7. **The ten "a consultar" prices.** More than half the menu has no number. A *"desde"* floor on every line would pre-qualify leads and make the whole menu indexable. Laila needs to set those figures.
8. **Service-page claims.** "Dura de 3 a 4 meses", "unas 3 horas", "unas 2 horas" and "alrededor de 1 hora" are the same estimates the home page uses. The aftercare tips are general and phrased that way, but Laila should confirm they match the products she actually uses.

## What is deliberately not here

- **No invented reviews, ratings or `aggregateRating` schema.** Self-serving review markup is a Google policy violation. Reviews belong on the Google Business Profile, which does not exist yet — that is the first item in `GROWTH.md`.
- **No `FAQPage` schema.** Google stopped showing FAQ rich results in May 2026. The FAQ is written as extractable question-and-answer pairs with prices in numerals instead, which is what AI answer engines actually lift.
- **No prices Laila has not published.**

## Checking your changes

```bash
python tools/prerender.py
```

```bash
python tools/check.py
```

The checker confirms, on all three pages, that every WhatsApp button is a real wa.me link, that the CSS version stamp matches the file, and that tags are balanced. It also checks that every `data-i18n` key on the home page has an English translation and that the pre-render is idempotent. It exits with code 1 on any problem.

It also writes two git-ignored test pages to open through the local server: `_test_noi18n.html` (the home page without `i18n.js`) and `_test_nojs.html` (no JavaScript at all). Both should still show every service and photo, and every WhatsApp button should still work.

## Run locally

```bash
python -m http.server 8080
```

## Deploy

Push to `main`. GitHub Pages serves the root of the repo.
