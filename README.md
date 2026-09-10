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
| `index.html` | Single page: hero, experience, interactive menu + appointment ticket, gallery, boutique, WhatsApp booking, map, Instagram, FAQ |
| `css/style.css` | Design system (oxblood + antique gold + blush, Cormorant Garamond / Sacramento / Jost) and all animation |
| `js/main.js` | **Data lives here** — services, prices, gallery, Instagram posts, day/time chips — plus the WhatsApp message composer and all interaction |
| `js/i18n.js` | **English copy** for every static string, plus the ES/EN toggle runtime. Spanish is the source of truth and lives in `index.html`. |
| `assets/img/work/` | Photos pulled from Laila's Instagram, cropped and web-sized, each with a `-sm` thumbnail |
| `assets/logo.jpg` | The salon's Instagram logo seal (used in nav, hero, preloader, footer) |
| `assets/og.jpg` | Social share card |
| `MARKET-RESEARCH.md` | La Ceiba / Atlántida comparables and pricing recommendations |

## Branding

Everything is drawn from Laila's own logo and Instagram templates:

| Token | Hex | Where it comes from |
|---|---|---|
| `--wine-600` | `#47191c` | The exact background of the logo seal |
| `--gold` / `--gold-300` | `#c6a15b` / `#e0b974` | The gold lettering and illustration in the logo |
| `--rose` | `#be6d73` | The dusty rose of their "Maquillaje por cita" post |
| `--rose-200` / `--blush` | `#eab5b7` / `#f7e2e4` | The blush pink of their "Nuestros servicios" post |

Type: **Cormorant Garamond** for headlines, **Sacramento** for the script flourishes that echo the logo's lettering, **Jost** for UI and body.

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

- **Services and prices:** the `SERVICES` array in `js/main.js`. Set `price: null` for anything that should read *a consultar* — the ticket and the WhatsApp message handle it automatically.
- **Photos:** drop a JPG (max 1400px) and a `-sm` version (max 640px) into `assets/img/work/`, then add an entry to `GALLERY` with a `size` of `g-w6` (wide), `g-p3` or `g-p4` (portrait).
- **Instagram strip:** the `IG_POSTS` array — each entry pairs a local thumbnail with the real post URL.
- **Hours:** `HOURS_ES` at the top of `js/main.js` and `js.hours` in `js/i18n.js`.
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
