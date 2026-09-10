# Laila's Beauty Salon — SEO, PR and the first 90 days

Research date: **September 2026**. Sources at the bottom.

---

## The one thing

**Create and verify the Google Business Profile, then ask every client for a review by WhatsApp a few hours after she leaves.**

Someone in La Ceiba typing *"sala de belleza cerca de mí"* into Google Maps right now cannot find this salon at all. That is demand that already exists and is being thrown away every single day. It costs zero lempiras and about four hours of work. Everything else in this document is worth less than that one fix.

Two numbers frame the rest. El Pino has about **6,300 people**, so the walk-in catchment is a village. And the ceiling for a La Ceiba beauty account is about **10,000 followers**, which took Iderma Spa years. So **followers are the wrong metric.** The metrics are *WhatsApp conversations started per week* and *repeat visits per client per year*.

---

## 1. What was already fixed in the code

| Fix | Why it mattered |
|---|---|
| Spanish is now the unconditional default | The language toggle auto-detected `navigator.languages`. Googlebot renders in headless Chrome, which reports `en-US`, and Google sends no `Accept-Language` header at all. So Google was indexing the **English** title, description and `<html lang>` for a Spanish-language salon in Honduras. |
| Service menu pre-rendered into the HTML | GPTBot, ClaudeBot and PerplexityBot download JavaScript and never execute it. The entire priced menu existed only after `main.js` ran, so for AI answer engines the salon had no prices. Raw HTML went from 884 to 1,875 words. |
| `geo`, `openingHoursSpecification`, `hasMap`, `@id`, full offer catalog in the schema | Coordinates decoded from the Plus Code: `15.712227, -86.907434`. |
| `robots.txt` and `sitemap.xml` | Both were 404. AI crawlers are explicitly allowed. |
| Both `sala de belleza` and `salón de belleza` in the copy and schema | See §2. |
| Fail-open rendering, self-hosted fonts, no preloader | See the design notes in the README. |

**Not added, deliberately:** `aggregateRating` and `review` markup. Self-serving review markup on your own site is a Google policy violation and risks a manual action. Reviews belong on the Google Business Profile.

**Also not added:** `FAQPage` schema. Google stopped showing FAQ rich results entirely on 7 May 2026 and removed the reporting in June. The FAQ content on the page is written as extractable question-and-answer pairs with prices in numerals, which is what AI engines actually lift.

---

## 2. Keywords

**"Sala de belleza" is the vernacular.** Of the 16 La Ceiba salons in the directories, **9 call themselves "Sala de Belleza"** and only 3 use "Salón". "Salones de Belleza" is the *category* label directories use, which is why it looks dominant. Real people type "sala".

**Winnable, near-zero competition:**
- `sala de belleza El Pino` · `salon de belleza El Pino Atlántida`
- `sala de belleza El Porvenir`
- `keratina El Pino` · `uñas acrílicas El Pino` · `pestañas pelo a pelo El Pino`
- `sala de belleza sobre la CA-13` · `salon de belleza carretera a Tela`
- `sala de belleza solo para mujeres La Ceiba` — a genuine differentiator with almost certainly zero competing optimised pages
- `keratina precio Honduras` — almost nobody publishes prices, so a page with real lempira figures can rank

**Marginal — organic yes, map pack no:** `sala de belleza La Ceiba`, `uñas acrílicas La Ceiba`. Proximity is the #2 local-pack factor and "physical address in search city" is #4. The salon is not in La Ceiba and will not win the La Ceiba map pack from El Pino.

**Hopeless, and worth saying plainly:** `salon de belleza cerca de mí` is 100% proximity-resolved, so it cannot be optimised for. `alisado permanente Honduras` has no local intent. Unqualified `keratina precio` is dominated by product retailers.

**Where the demand actually lives.** Searching `uñas acrilicas La Ceiba precio` returns **TikTok discovery pages as top Google results**. Honduran platform reach: TikTok **74.5% of adults**, Facebook 41.6%, Instagram **19.9%**. The salon is on the smallest relevant platform. A Facebook Page is not optional, and TikTok is where this category's search demand is.

---

## 3. Google Business Profile

GBP signals carry roughly **32%** of local ranking weight and review signals another **20%**. The top factors are primary category (#1), proximity (#2), keywords in the business title (#3), and **whether the business is open at the time of the search** (#5) — accurate hours are a ranking factor, not just courtesy.

**Setup.** `business.google.com/add`. El Pino has no street numbering, so Google will fail to geocode: choose **"Ajustar"** and drop the pin manually using Plus Code `P36V+V2W El Pino`. Do not hide the address; a storefront that hides it loses factor #7.

**Verification will almost certainly be video, not postcard.** Requirements, because failure is common:
- One continuous unedited recording, live, minimum 30 seconds, from a mobile device.
- Must show three things: **signage with the business name on a permanent fixture**, the location matching the pin (pan to the CA-13 and Clínica La Esperanza across the road), and that you manage it (the till, the keratin station, the nail desk).
- Must not show bank details, tax IDs, or other people's faces.
- Review takes up to 5 business days.

**This means the exterior sign has to exist before you film.** It is the cheapest, highest-return physical purchase on this whole list, and it settles the "Sala vs Salón" naming question at the same time.

**Categories.** Primary: `Salón de belleza`. Additional: `Peluquería`, `Manicura y pedicura`, `Centro de estética`, `Esteticista`, `Masajista`, `Centro de depilación`. There is no clean category for lash extensions or makeup, so cover those in the **Services** field, which jumped to factor #22 in 2026.

**Add the WhatsApp click-to-chat link** under chat settings if it is available for Honduras; the whole booking funnel runs through it.

**Skip Google Posts.** Quantity of posts scored 43 for Maps impact. Near-worthless for ranking.

### ⚠️ Google changed the review rules in 2026

The prohibited-content policy was revised in February 2026 and enforcement tightened through April. Merchants must not *"require or pressure users to leave ratings or write reviews **while on the premises**, nor request that **specific content** be included."* Incentives of any kind are prohibited.

**That kills:** the front-desk tablet, the "scan this QR before you go" card, the mirror QR code, "please mention Laila by name", and any discount-for-review offer. Review gating remains prohibited.

**What still works, and fits the existing workflow perfectly:** send the review link by WhatsApp **a few hours after she has left**.

```
¡Gracias por venir hoy! Si te gustó cómo te quedó, me ayudaría
muchísimo que dejaras tu opinión en Google: [enlace]
```

No mention of what to write, no incentive, off-premises. Expect 10–20% conversion. **Target 30 reviews at 4.3★+.** That number is not arbitrary — see §6.

---

## 4. Directories

| Directory | Free? | Verdict |
|---|---|---|
| **Fresha** | Yes (commission on new-client bookings only) | **Highest-value item here.** Fresha's Honduras pages list only 19 salons nationally and **La Ceiba and all of Atlántida are absent.** First mover in the entire department, and Fresha's city pages rank well. |
| **eldirectorio.co (HN)** | Genuinely free | Best free Honduran citation. `hn.eldirectorio.co/empresa/agregar` |
| **Cybo** | Free | `cybo.com/add-business`. Global, indexed, and Bing-friendly. |
| **Facebook Page** | Free | Top-three priority. 4.6M Honduran reach, and public Pages are indexed by Google. |
| **TripAdvisor** | Free | Worth it for a non-obvious reason: **The Lodge & Spa at Pico Bonito is in El Pino** — a MICHELIN-Guide eco-lodge at ~$216/night. There is real international footfall in this village. |
| **OpenStreetMap** | Free | 15 minutes, permanent, feeds a long tail of apps and AI geodata. Tag `shop=beauty`. |
| **Apple Business** | Free | Honduras has full feature access. Low traffic, but a free authoritative citation that AI engines read. |
| GuiaLocal HN, Honduguia, Infobel | Free | Bulk batch in one sitting. Value is NAP consistency, not referrals. |
| **yelu.hn** | **PAID — $20+** | **Skip.** Commonly recommended, not actually free, no consumer traffic. |
| **Booksy** | — | **Not available in Honduras.** Searching for it returns *Club de Golf La Ceiba* in **Mexico City**. Easy trap. |
| **Bing Places** | — | **Not available in Honduras**, which is frustrating because Bing holds **12.45%** of Honduran search. Mitigation: submit the sitemap to Bing Webmaster Tools; Bing indexes the site normally and leans on Cybo-style directories where Places is absent. |

**The rule that matters more than the list is NAP consistency.** Three of the top five AI-search visibility factors are citation factors. Pick one exact string and never deviate:

```
Nombre:    Laila's Beauty Salon
Dirección: Col. Sutrasco, frente a Clínica La Esperanza, Carretera CA-13,
           El Pino, El Porvenir, Atlántida, Honduras
Teléfono:  +504 3197-9888
```

---

## 5. The calendar that drives demand

| Date | Event | Promote from | The offer |
|---|---|---|---|
| **Mon 25 Jan** | **Día de la Mujer Hondureña** | 10 Jan | The best owned holiday this salon will ever have. A women-only salon on Honduran Women's Day writes itself, and it is the #1 media pitch date. |
| Sun 14 Feb | Día del Amor y la Amistad | 30 Jan | Push perfume and gift bundles. The only male-customer revenue, and it needs no chair time. |
| **21–28 Mar 2027** | Semana Santa (earliest in years) | 8 Mar | *"Lista para la playa"* — pedicure, semipermanente, depilación, booked before 20 Mar. Sell the Mon–Wed rush. |
| **Sun 9 May 2027** | **Día de la Madre** | 19 Apr (3 weeks) | Biggest single-day beauty spend in Honduras. **Sell gift certificates to sons and husbands by WhatsApp** — they are the buyer, not the mother. |
| ~10–14 May | Carnavalitos (barrio level) | 26 Apr | Hair-up, makeup, braids. Cheap, fast, high volume. Extend hours. |
| **~Sat 15 May 2027** | **Gran Carnaval de La Ceiba** | 1 Apr (6 weeks) | *Date provisional.* The rule is the third Saturday of May, but 2026 slipped to the fourth. **Confirm with the Municipalidad in Feb–Mar 2027.** Offer a pre-dawn slot (5–7 a.m.) on carnaval Saturday: city salons are full and turning people away, and your 20-minute distance becomes an advantage. |
| Wed 15 Sep | Independencia — palillonas and school bands | 15 Aug | Systematically underrated. Band girls need hair and makeup at dawn for weeks of rehearsals. Approach band directors in August with a per-band rate. |
| Early Oct | Semana Morazánica | 3 weeks out | La Ceiba hotel occupancy hits ~80% and domestic tourists drive past the door on the CA-13. Walk-in mani/pedi special, highway signage. |
| **Last week of Nov** | **Graduaciones** (one national week) | 20 Oct (5–6 weeks) | Densest week of the year. Hundreds of girls, all five days, all wanting peinado + maquillaje + uñas. **Take 50% deposits or you will lose the money to no-shows.** |
| Nov–Dec | Quinceañeras | Sep | Sell the paid *prueba* 3–4 weeks ahead. It is a second paid appointment and it locks the booking. |
| Dec | Christmas, posadas, NYE | 15 Nov | Highest-margin month. Keratina and colour before family photos. Deposits for 22–24 and 30–31 Dec. |

---

## 6. Being found by ChatGPT, Perplexity and AI Overviews

**Reviews are a hard gate, not a soft signal.** Unlike Google Maps, where a low rating merely ranks you lower, AI engines filter on rating thresholds:

| Engine | Minimum rating to be recommended |
|---|---|
| ChatGPT | 4.30★ |
| Perplexity | 4.10★ |
| Gemini | 3.90★ |

Perplexity uses reviews in **100%** of responses; ChatGPT in 58%. **With zero reviews the salon is invisible to every AI engine, permanently, regardless of how good the website is.** No amount of schema fixes this. That is the strongest possible argument for putting the GBP and reviews ahead of everything technical.

**Where these engines get their answers:** ChatGPT Search cites the business's own site 48.8% of the time and directories 44.7%. Gemini cites the own site **80.7%**. Perplexity **72.3%**. So the site matters enormously — but it has to state specific, extractable facts. `¿Cuánto cuesta una keratina en El Pino? Desde L.1,000, y dura de 3 a 4 meses.` can be lifted whole. A paragraph that buries the number cannot.

---

## 7. Press and partnerships

**Realistically reachable local media.** These run three hours of morning magazine a day and are permanently hungry for segments.

- **Ceibavisión Canal 36** — *Buenos Días La Ceiba*, Mon–Sat 6–9 a.m. WhatsApp **+504 9639-7880**, `mercadeo36@ceibavision.com`
- **45TV** — *Diario de la Mañana* with **Audelia Rodríguez**. A woman-hosted morning show is the single best fit for a women-only salon.
- **Teleceiba Canal 7** — call-in format with studio guests, the lowest barrier of the three.
- **Radio El Patio 91.5 FM** — +504 2443-0413. Ask about *canje* (barter).

**How to pitch:** WhatsApp, not email. Lead with a segment idea, never a request. *"Les propongo un segmento de 5 minutos: cómo cuidar el cabello con la humedad de la costa. Llevo modelo y hago la demostración en vivo, sin costo para ustedes."* Tie it to the calendar above; they say yes to Día de la Madre, not to "we exist."

**Facebook community pages, zero cost, highest return:** El Pino City, El Porvenir Atlántida, Clasificados Ceibeños, Clasificados Ceiba. Post weekly, not once.

**National press:** mostly unrealistic, with one real door. `laprensa.hn/emprendedores` runs a standing entrepreneurship section that has published women-entrepreneur stories. It takes a *person* story, not a salon story.

**Partnerships, in order of value:**

1. **Photographers.** The best category on this list. They are booked 3–6 months out, they meet every bride and quinceañera in the city, and they cost nothing. **IGotay Fotografía** (10K followers, La Ceiba) is where to start, then Legacy Studio and Sie7e. The deal: free hair and makeup for their assistant plus 15% of what the group spends, in exchange for cross-tagging.
2. **The Lodge & Spa at Pico Bonito** — a 22-room MICHELIN-listed eco-lodge **in El Pino** that markets destination weddings. It has its own spa, so do not pitch competing services. Pitch staff rates, bridal-party overflow when a party exceeds their chairs, and morning-of prep. `reservation@picobonito.com`, +504 2440-0388.
3. **Hotel El Pino** (3173-4911) and **Corinto Pearl**, both on the doorstep. Leave 50 cards. **Pay the front-desk staff, not the hotel** — they are the referral engine.
4. **Schools in El Pino and El Porvenir** — band and graduation packages. Talk to the *directora* and the *madres de familia* committee.

**On the women-only angle and the press:** frame it as comfort and confianza, never as safety. A national outlet will not run "salon is safe from femicide," and inserting the business into that coverage would read as opportunistic and damage it locally. Local TV will happily run *"mujer emprendedora abre salón exclusivo para mujeres en El Pino"* as a morning segment. **Never quote violence statistics in marketing, and never post a promo near local crime news.** In a village of 6,300 that mistake is permanent.

**Influencers:** the named Honduran beauty creators are all in Tegucigalpa, San Pedro Sula or the US diaspora, and the two biggest own competing beauty businesses. Ignore the national rankings. Target **nano-influencers with 1,000–8,000 followers physically in La Ceiba or El Porvenir**, found by searching TikTok location tags and by looking at who comments on `@iderma_spa` and `@unaspao1`. Barter only, never cash, and put the deliverables in writing before the appointment.

---

## 8. WhatsApp Business

**Use from day one, free:** the business profile (fill every field), the **catálogo** (up to 500 items — this is the price list, the perfume shop and the portfolio in one), **etiquetas** as a CRM (`Cliente nueva`, `Keratina — repetir 3 meses`, `Uñas — cada 3 semanas`, `Novia 2027`, `Debe seña` — max 8), **respuestas rápidas** for the messages retyped daily, and **away/welcome messages**.

**Month 2:** **listas de difusión** — but note the rule everyone gets wrong: **the recipient must have your number saved or she receives nothing.** So make every new client save "Laila's Beauty Salon" before she leaves. Broadcast lists also do not work on WhatsApp Web. Max 2–3 broadcasts a month. A **Canal de WhatsApp** fixes the saved-number limitation: unlimited followers, no requirement to save anything. Run both. And **Estados** is the most underused free tool — one or two results a day, seen by every saved contact.

**Later, costs money:** click-to-WhatsApp ads, but only once the GBP, catalog and 15+ reviews exist. Otherwise you are paying to send strangers to an empty shopfront.

**Skip entirely:** the WhatsApp Business API and any chatbot platform. Wrong scale by two orders of magnitude.

---

## 9. The 90-day plan

**Days 1–14 — foundation. Do nothing else until this is done.**
1. Put up the exterior sign, then create and video-verify the Google Business Profile.
2. Switch to WhatsApp Business. Build the catalog with every service and price, 8 labels, 6 quick replies, away and welcome messages.
3. **Photograph 20 real results** using the protocol in `BRAND.md` §6. This is the highest-leverage two hours in the plan; everything downstream needs images.
4. Create the WhatsApp Channel and a Facebook Page.
5. Back-fill Instagram to 20 posts.
6. Print 300 cards and one weatherproof highway sign.

**Days 15–30 — neighbourhood and reviews.**
7. Start the post-visit WhatsApp review ask with every client.
8. Post to El Pino City and El Porvenir Atlántida, then weekly.
9. Walk into Hotel El Pino and Corinto Pearl with 50 cards each.
10. Launch the referral offer verbally: *"Traé una amiga nueva y las dos reciben 20%."*
11. List on Fresha, eldirectorio.co and Cybo.

**Days 31–60 — partnerships and first press.**
12. Close two photographers. Approach Pico Bonito.
13. Pitch Ceibavisión and 45TV a graduation-hair demo segment for late November.
14. Recruit three local nano-influencers for keratina barter.
15. Approach two colegios with a graduation package. Deposits required.

**Days 61–90 — convert the peak.**
16. Graduaciones campaign from 20 Oct. Over-prepare capacity for that one week.
17. Quinceañera *pruebas* in parallel.
18. Christmas gift bundles from 15 Nov.
19. Draft the 25 January Día de la Mujer Hondureña campaign.

### Honest 90-day targets

| Metric | From | To |
|---|---|---|
| Google Business Profile | none | verified, complete, **15+ reviews at 4.5★** |
| Instagram | 21 | 300–600 |
| Facebook Page | none | 300+ followers, 3 posts a week |
| WhatsApp Channel | none | 150+ followers |
| Saved, labelled client contacts | ~0 | 120+ |
| Partnerships | 0 | 2 photographers, 2 hotels, 1 colegio |
| Local media appearances | 0 | 1 |

---

## 10. What not to do

- Don't buy followers. It destroys ad targeting later.
- Don't pay influencers cash. USD 50–500 a post is not these economics.
- Don't run ads before the GBP, catalog, photos and reviews exist.
- Don't offer discounts for reviews, or ask for them on the premises. Both now breach Google policy.
- Don't use femicide statistics in any customer-facing material.
- Don't chase tourists as a pillar. A nice add-on, a terrible foundation.
- Don't start a blog. For a town of 6,300 it will be abandoned by month two.
- Don't chase La Ceiba map-pack rankings. Not winnable from El Pino.
- Don't build a chatbot or buy the WhatsApp API.
- Don't pay for yelu.hn, and don't look for Booksy or Bing Places in Honduras.

---

## Sources

Whitespark 2026 Local Search Ranking Factors · Google docs on locale-adaptive pages, localized versions, LocalBusiness structured data, video verification, business categories, and the prohibited-content policy · Search Engine Journal on FAQ rich results ending May 2026 · web.dev Core Web Vitals · DataReportal Digital 2026 Honduras · Statcounter Honduras search share · Apple Business feature availability · SOCi and Cheers on AI answer-engine ranking and citation sources · Vercel/MERJ and SearchOptimo on AI crawlers not executing JavaScript · Yelu and Cybo La Ceiba listings · Fresha Honduras · Ceibavisión, 45TV, Teleceiba, Radio El Patio · Wikipedia and honduras.com on the Gran Carnaval de la Amistad · La Prensa and El Heraldo on Día de la Madre and Día de la Mujer Hondureña · HRN on the national graduation week · The Lodge & Spa at Pico Bonito · IGotay Fotografía · Favikon Honduras beauty influencer ranking · Cliengo and Tiendanube on WhatsApp Business features.
