# Laila's Beauty Salon — brand direction

Research date: **September 2026**. Benchmarked against Iderma Spa (La Ceiba), LOTUS Salón de Belleza (Comayagua), Jayro Salón (San Pedro Sula), SaÁvi (San Pedro Sula), Gloss Beauty Salon and Fascino (both Honduras), plus the wider Latin American and global salon field.

The one-line version: **keep the oxblood, but make it the ink on an ivory ground instead of the background under fake gold.** Then delete the script font, the clipart badge and the dusty rose, and write the name the same way every time. That is most of the distance between where this brand is and where Iderma is.

---

## 1. Palette

The oxblood is exact: `#47191c` is sampled from Laila's own logo seal. Nothing about her existing colour is being thrown away. What changes is the **proportion**. Expensive brands give 60–70% of every surface to one quiet ground colour; template brands fill every millimetre.

| Role | Name | Hex | Share | Where |
|---|---|---|---|---|
| Ground | **Cal** | `#f7f1e8` | ~60% | Every background. Web, Instagram posts, the sign face, the photo wall. |
| Ink | **Vino** | `#47191c` | ~20% | All headlines, logotype, sign lettering. The logo colour, unchanged. |
| Accent | **Bronce** | `#b5854e` | ~10% | Rules, dividers, small marks. **Never body text** (~3:1 on Cal, decorative only). |
| Tint | **Concha** | `#e4c7b7` | ~8% | Colour blocks, section fills, story backgrounds. |
| Body text | **Tinta** | `#2e2a26` | ~2% | Paragraphs. Warm charcoal, never pure black. |

**Deleted permanently:** dusty rose `#be6d73`, blush pink, and every metallic gold gradient.

Three reasons the inversion matters more than it sounds:

1. **Gold-on-dark is the category default.** It is what every free salon template has shipped since about 2019, which means it differentiates nothing.
2. **It was flattening her photography.** ISO 3664 wants a viewing surround at 10–60% reflectance; the old ground was about 1.5%. Dark surrounds also make JPEG noise in shadows visible, and her source photos are phone shots. Skin, nails and hair are mid-to-light tones that read as glowing islands on near-black and as choosable colour on ivory.
3. **It fails outdoors.** A woman checking the site on the CA-13 at midday is fighting 8,000 to 30,000 lux. A light page emits near-maximum luminance across the whole screen and stays above the reflection floor. A dark page collapses into a grey mirror.

Metallic gold also cannot be reproduced cheaply. Not in flat vinyl on a roadside sign, not in one-colour print, not on a screen. Bronce can.

---

## 2. Typography

| Role | Face | Why |
|---|---|---|
| Display, logotype, headlines | **Fraunces** | Warm old-style serif with real stroke weight, so it survives 150px, vinyl cutting, and a sign read from a moving car. Its optical-size axis is built for working as both a large logotype and small text. Free under the SIL Open Font License. |
| Body, UI, prices | **Instrument Sans** | Contemporary, excellent small, quiet next to Fraunces. |
| Script | **None** | Any flourish comes from the drawn monogram, never from a font. |

**Sacramento is deleted.** A thin monoline Google script is the default in Canva salon templates and was the single loudest template signal in the old design. Cormorant Garamond is also gone: beautiful at display size, but its hairlines vanish at 150px and cannot be cut in vinyl.

Both faces are self-hosted in `assets/fonts/`, subsetted to Latin, 95 KB for the pair.

---

## 3. Voice

**Voseo for imperatives, `tu`/`tus` for possessives, never usted.**

This is a deliberate call against the encyclopaedic advice (which says Honduran advertising prefers *tú*), because the actual practice in the coastal salon market goes the other way. **Iderma Spa in La Ceiba** — the strongest brand inside Laila's own catchment — writes *"Renová tu estilo… Agendá tu cita y viví una experiencia… Reservá ahora."* **Jayro Salón** on the north coast does the same. Only LOTUS, inland in Comayagua, uses tuteo. The coast voseas.

- **Imperatives:** `Agendá. Reservá. Vení. Escribime. Contame. Elegí. Mandame.`
- **Possessives:** `tu`, `tus` — identical in both systems, so it never jars.
- **Usted:** never. It puts a counter between Laila and the client.

### Four attributes

**Cercana** (uses your name) · **Segura** (states, does not hedge) · **Clara** (prices and times, plainly) · **Sin adulación** (no flattery, ever).

| Do | Don't |
|---|---|
| `Agendá tu cita por WhatsApp.` | `Agende su cita.` (cold) · `Agenda tu cita.` (not local) |
| `Keratina desde L.1,000. Dura hasta 4 meses.` | `Consultanos por precio 💕✨` |
| `Vení, quedate tres horas, salí con el pelo que querés.` | `¡Hola hermosa! 💅👑 ¡Sos una reina!` |
| `Solo atendemos mujeres.` (once, in the bio) | Repeating it in every caption |
| `Te espero en El Pino.` | `El mejor salón de la zona` (unprovable) |

**Banned as forms of address:** `hermosa`, `reina`, `mi amor`, `mami`. They are the local default and they are exactly what makes a salon read cheap.

**Banned words:** `empoderada`, `diosa`, `brilla`, `guerrera`, `girl boss`. **Banned visuals:** crowns, tiaras, lipstick-kiss marks, the female gender symbol.

**Emoji:** at most two per caption, at the end of a line, never inside a sentence, never in the bio's first line, never in the logo lockup.

### Lines to use

1. **Descriptor** (sign, bio line 1): `Sala de belleza · Solo para mujeres`
2. **Tagline** (hero, ads, sign): `Tu salón, aquí en El Pino.`
3. **Emotional** (occasional posts): `Salí sintiéndote vos misma.`
4. **Standing CTA** (every post): `Agendá por WhatsApp.`
5. **Competitive line** (roadside sign, boosted posts): `Sin ir hasta La Ceiba.`

Number 5 is the commercial workhorse. El Pino has about 6,300 people, so the local market alone cannot sustain the salon. The business has to pull from CA-13 traffic and from La Ceiba women who would otherwise never leave the city, and "you don't have to drive to La Ceiba" is the only thing Laila can say that nobody else can.

---

## 4. Naming — lock one form

Keep the English possessive. English in a Honduran salon name is unremarkable and mildly aspirational: SaÁvi Salon Beauty Spa & Boutique, Gloss Beauty Salon & Spa, Fascino Salon & Beauty Shop, LOTUS "Salón & Blowdry Bar" are all real Honduran businesses.

But make the **descriptor** Spanish, because it has to be parsed at speed from a car, and because *"sala de belleza"* already reads as a women's establishment in Spanish where *"estética"* is unisex. The descriptor does the women-only positioning quietly, for free.

| Context | Exact form |
|---|---|
| Full | Laila's Beauty Salon |
| Descriptor under it | Sala de belleza · Solo para mujeres |
| Conversational | Laila's |
| Social display name | `Laila's · Sala de Belleza` |
| Handle, every platform | `@lailasbeautysalonhn` |

**Never again:** `LAILAS BEAUTY SALON` · `Lailas` · `Laila's beauty Salón` · `@lailasbeautysalon` (fix that one graphic). Four spellings are currently in circulation. Fixing this is free and it is the highest-impact item on the list.

A note on search: 9 of the 16 La Ceiba salons in the directories call themselves **"Sala de Belleza"**, not "Salón". That is the local vernacular and it is what people type. The site uses both terms naturally in the copy and the schema carries both as `alternateName`.

---

## 5. The logo

The current mark is a 150×150 raster badge with four pieces of beauty clipart (lipstick, mascara, compact, brushes) in ornate script inside a dark circle. It fails on every count the category cares about: vintage crest, clipart, illegible small, and no vector.

**Do not vectorise it. Do not auto-trace the JPEG. Commission a wordmark and monogram system.**

| Variant | What | Where |
|---|---|---|
| Primary | `LAILA'S` in Fraunces 600 over `SALA DE BELLEZA` in Instrument Sans, all caps, tracked | Sign, site header, card |
| Secondary | Same, stacked and centred | Square formats, stamps |
| Submark | A drawn **L**, apostrophe as a small Bronce dot | **Instagram avatar, WhatsApp profile, favicon, watermark** |
| Favicon | 512px master of the submark, exported to 180/48/32/16 | Website |

Each in full colour, all-Vino, all-Cal, and all-black, transparent background. Deliverables must include editable `.AI`/`.SVG` source.

**Two hard tests:** render the submark at 150×150 in a circle — if you cannot tell it is an L, reject it. Print the primary at sign size and look from 15 metres — on the CA-13 the cap height needs to be at least 25 cm.

**Budget:** the published Honduran designer rate card lists a company logo at about USD 50. **Budget USD 120–200 instead.** The $50 tier buys a template, which is exactly how the current badge happened.

**Free stopgap today:** set `LAILA'S / SALA DE BELLEZA` in Fraunces and Instrument Sans, Vino on Cal, and use it as the avatar. It beats the current badge immediately.

---

## 6. Photography — phone only, zero budget

The whole discipline is one sentence: **consistency beats quality.** Same wall, same light, same crop, every time.

**Set up once, then never change it.**

1. Pick the one wall that gets *indirect* daylight, 1.5–2 m from a window or the open door.
2. **Paint it Cal `#f7f1e8`.** One gallon of warm off-white is the highest-return brand purchase available. Keep it empty: no shelves, no cables, no mirror.
3. Mark the floor with two strips of tape, one where the client stands and one where Laila stands. This is what makes before and after photos match.
4. Client faces the window, photographer's back to the window. Never shoot with the window behind the client.

**Light.** 8–10 a.m. or 3–5 p.m. Avoid 11–2. **Turn the fluorescent tubes off** before shooting; they throw a green cast on skin that no filter fixes.

**Phone.** Rear camera, **1× lens only** (the ultra-wide distorts faces), **portrait mode off** for before and afters because it smears hair edges, HDR on, flash never.

**Before/after protocol.** Three angles in the same order, every client: front, 45° right, back of head. Shoulders square, chin level, hair brought forward to show length. The *before* is shot on the same tape marks, in the same light, before washing.

**Shoot more of:** Laila's hands working in a client's hair (the most under-shot and most persuasive image in the category), the product bottle in frame for keratinas, nails on a plain towel from directly overhead.

**Never:** flash · shooting into the mirror · ultra-wide on a face · smoothing filters · anything that shifts skin tone · collage apps with white borders · a before/after where the lighting obviously differs, which reads as a lie · **any other client visible in the background**, which in a women-only salon is a privacy breach.

**Cadence.** There are 13 posts today. Get to 40 before optimising anything else. Three a week: one before/after, one price or service card in brand type, one hands-at-work or salon detail.

---

## 7. "Solo para mujeres"

**State it once, structurally, then never mention it again.** It is a service fact, not a personality.

It appears in exactly four places: under the logo on the sign, Instagram bio line 1, the WhatsApp Business "about", and one sentence on the website.

Phrase it as a benefit, never as an ideology:

> **Solo atendemos mujeres. Podés venir con tu hija, quedarte en bata, y no cruzarte con nadie más.**

Concrete, warm, and it names the actual reason women choose a women-only salon: comfort and privacy. Never frame it against men. Never make it a hashtag campaign. Never put violence statistics in marketing material.

The visual expression of women-only is the palette itself. Cal-dominant, uncluttered and calm reads as private and unhurried. Pink is the lazy version and it reads juvenile.

---

## Sources

Iderma Spa La Ceiba · LOTUS Salón de Belleza Comayagua · Jayro Salón · SaÁvi Salon Beauty Spa & Boutique · Gloss Beauty Salon & Spa Honduras · Fascino Salon & Beauty Shop · Pantone Colour of the Year 2026 (Cloud Dancer) · ISO 3664:2009 viewing conditions · Bartleson–Breneman surround effect · Piepenbrock et al. 2013, *Ergonomics*, on display polarity · Español hondureño and the El Heraldo voseo piece · EspacioHonduras designer price guide · DataReportal Digital 2026 Honduras · Goldie, Boulevard and Pure Spa Direct on salon before/after photography.
