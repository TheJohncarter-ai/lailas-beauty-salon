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
| `assets/logo.jpg` | The salon's Instagram logo seal (used in nav, hero, preloader, footer) |
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
¡Hola Laila's Beauty Salon! 💕
Quiero agendar una cita.

• Nombre: Ana
• Servicios:
   – Keratina Smooth — L.1,000
   – Pintado semipermanente — L.150
   – Manicura — a consultar
• Duración aprox.: 4 h 45 min
• Total aprox.: L.1,150 (+ 1 a consultar)
• Día: Fin de semana
• Hora: Por la tarde

¿Tienen cupo? ¡Gracias! 🌸
```

A live preview of that exact message sits above the button so nothing is a surprise. The floating button, the nav button and every "Escribir" link open a plain WhatsApp message instead.

To change the number, edit `WA_NUMBER` and `WA_DISPLAY` at the top of `js/main.js` (and the two places it appears as text in `index.html`).

## Language (ES / EN)

Spanish is the default and the source of truth. English is picked automatically only when the browser's first language is English, and the visitor's choice is remembered.

- Static text: every translatable element has `data-i18n="key"`. Spanish is whatever is in `index.html`; English is the matching key in `I18N_EN` in `js/i18n.js`.
- Data-driven text (services, gallery captions, marquee, day/time chips): the `en` fields in `js/main.js`.
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

1. **Opening hours.** The site currently says *Lunes a sábado, 9:00 a.m. – 6:00 p.m.* This was **not** published anywhere — it is a placeholder. Edit `HOURS_ES` in `js/main.js`.
2. **Service durations.** Every `mins` value is an industry estimate, not Laila's real timing. They drive the "duración aprox." number.
3. **Prices.** Taken from her July and August 2025 Instagram posts. `L.80` corte and `L.1,000` keratina were **promotional** prices on specific days — decide whether they are the standing price. See `MARKET-RESEARCH.md` §5.
4. **Payment methods.** The FAQ deliberately says "ask on WhatsApp" because nothing is published.
5. **Photos.** Everything here came from a public Instagram feed with 13 posts. More and better photos are the single biggest improvement available to this site.

## Run locally

```bash
python -m http.server 8080
```

## Deploy

Push to `main`. GitHub Pages serves the root of the repo.
