/* =====================================================================
   LAILA'S BEAUTY SALON — main.js
   Todo el contenido editable vive en el bloque DATA de abajo.
   El texto estático en inglés vive en js/i18n.js; los datos de aquí
   llevan su propio bloque `en`.
   ===================================================================== */

/* ---------- CONFIGURACIÓN ---------- */
const WA_NUMBER = '50431979888';                 // WhatsApp de Laila, sin + ni espacios
const WA_DISPLAY = '+504 3197-9888';
const IG_URL = 'https://www.instagram.com/lailasbeautysalonhn';
const CURRENCY = 'L.';                           // lempiras
// Horario mostrado en la sección Ubicación. CONFIRMAR CON LAILA y editar aquí.
const HOURS_ES = 'Lunes a sábado · 9:00 a.m. – 6:00 p.m.';

/* ---------- DATA: SERVICIOS ----------
   price: número en lempiras, o null = "a consultar".
   mins:  duración aproximada (estimada; ajustar con Laila).
   Precios tomados de las publicaciones de @lailasbeautysalonhn
   (listas de precios de julio y agosto de 2025).
------------------------------------------ */
const SERVICES = [
  // — CABELLO —
  { id: 'corte', cat: 'cabello', price: 80, mins: 45, tag: 'Promo',
    name: 'Corte de cabello', sub: 'Corte y peinado',
    desc: 'Corte a tu medida, lavado y secado incluidos.',
    en: { tag: 'Promo', name: 'Haircut', sub: 'Cut and style', desc: 'A cut shaped to you, wash and blow-dry included.' } },

  { id: 'lavseco', cat: 'cabello', price: 180, mins: 45,
    name: 'Lavado y secado', sub: 'Cepillado profesional',
    desc: 'Lavado con masaje y secado con cepillo.',
    en: { name: 'Wash and blow-dry', sub: 'Professional brush-out', desc: 'Wash with a scalp massage and a brushed blow-dry.' } },

  { id: 'planchado', cat: 'cabello', price: 150, mins: 40,
    name: 'Planchado', sub: 'Liso al instante',
    desc: 'Plancha con protector térmico para un liso que dura.',
    en: { name: 'Flat iron', sub: 'Instant sleek', desc: 'Flat iron with heat protectant for a sleek finish that holds.' } },

  { id: 'lavplanch', cat: 'cabello', price: 300, mins: 75, tag: 'Más pedido',
    name: 'Lavado, secado y planchado', sub: 'El combo completo',
    desc: 'Lo que pide la mayoría: sale del salón lista para cualquier plan.',
    en: { tag: 'Most booked', name: 'Wash, dry and flat iron', sub: 'The full combo', desc: 'What most clients book: you walk out ready for anything.' } },

  { id: 'lavtrat', cat: 'cabello', price: 250, mins: 60,
    name: 'Lavado, secado y tratamiento', sub: 'Hidratación profunda',
    desc: 'Ampolla o mascarilla según lo que necesite tu cabello.',
    en: { name: 'Wash, dry and treatment', sub: 'Deep conditioning', desc: 'Ampoule or mask chosen for what your hair actually needs.' } },

  { id: 'keratina', cat: 'cabello', price: 1000, mins: 180, tag: 'De la casa',
    name: 'Keratina Smooth', sub: 'Alisado con keratina',
    desc: 'Frizz bajo control, brillo y manejo por semanas. Precio final según largo.',
    en: { tag: 'Signature', name: 'Keratin Smooth', sub: 'Keratin straightening', desc: 'Frizz under control, shine and manageability for weeks. Final price by length.' } },

  { id: 'alisado', cat: 'cabello', price: null, mins: 180,
    name: 'Alisado', sub: 'Liso permanente',
    desc: 'Alisado progresivo. Se cotiza según el tipo y largo del cabello.',
    en: { name: 'Straightening', sub: 'Long-lasting smooth', desc: 'Progressive straightening. Quoted by hair type and length.' } },

  { id: 'color', cat: 'cabello', price: null, mins: 120,
    name: 'Pintado y color', sub: 'Tinte, retoque, mechas',
    desc: 'Color completo, retoque de raíz o mechas. Mándanos una foto y te cotizamos.',
    en: { name: 'Color', sub: 'Tint, root touch-up, highlights', desc: 'Full color, root touch-up or highlights. Send a photo and we quote it.' } },

  { id: 'tratamiento', cat: 'cabello', price: null, mins: 60,
    name: 'Tratamientos capilares', sub: 'Botox, ampollas, reparación',
    desc: 'Para cabello reseco, poroso o maltratado por el sol y la sal.',
    en: { name: 'Hair treatments', sub: 'Botox, ampoules, repair', desc: 'For hair left dry, porous or worn out by sun and salt.' } },

  // — UÑAS —
  { id: 'acrilicas', cat: 'unas', price: 250, mins: 120, tag: 'Más pedido',
    name: 'Uñas acrílicas', sub: 'Juego completo',
    desc: 'Extensión en acrílico, largo y forma a tu gusto. Diseños se cotizan aparte.',
    en: { tag: 'Most booked', name: 'Acrylic nails', sub: 'Full set', desc: 'Acrylic extensions, your length and shape. Nail art quoted separately.' } },

  { id: 'semi', cat: 'unas', price: 150, mins: 60,
    name: 'Pintado semipermanente', sub: 'Esmaltado permanente',
    desc: 'Color que aguanta semanas sin descascararse.',
    en: { name: 'Semi-permanent polish', sub: 'Gel polish', desc: 'Color that holds for weeks without chipping.' } },

  { id: 'keratinaUna', cat: 'unas', price: null, mins: 60, tag: 'Nuevo',
    name: 'Keratina en uña natural', sub: 'Fortalece sin extensión',
    desc: 'Tratamiento de keratina sobre tu uña natural, con esmaltado permanente.',
    en: { tag: 'New', name: 'Keratin on natural nails', sub: 'Strength, no extensions', desc: 'A keratin treatment on your own nail, finished with gel polish.' } },

  { id: 'manicura', cat: 'unas', price: null, mins: 45,
    name: 'Manicura', sub: 'Limpieza y esmaltado',
    desc: 'Cutícula, forma y color. Se cotiza según lo que lleve.',
    en: { name: 'Manicure', sub: 'Tidy up and polish', desc: 'Cuticles, shape and color. Quoted by what it involves.' } },

  { id: 'pedicura', cat: 'unas', price: null, mins: 60,
    name: 'Pedicura', sub: 'Pies descansados',
    desc: 'Limpieza, exfoliación y esmaltado. Ideal después de la playa.',
    en: { name: 'Pedicure', sub: 'Feet, rescued', desc: 'Clean-up, exfoliation and polish. Perfect after the beach.' } },

  // — ROSTRO —
  { id: 'pestanas', cat: 'rostro', price: null, mins: 120,
    name: 'Pestañas pelo a pelo', sub: 'Extensiones clásicas',
    desc: 'Una extensión por pestaña natural. Mirada abierta y natural.',
    en: { name: 'Classic lash extensions', sub: 'One by one', desc: 'One extension per natural lash. Open, natural-looking eyes.' } },

  { id: 'maquillaje', cat: 'rostro', price: null, mins: 60, tag: 'Por cita',
    name: 'Maquillaje', sub: 'Social, novia, quinceañera',
    desc: 'Maquillaje profesional para tu evento. Siempre con cita previa.',
    en: { tag: 'By appointment', name: 'Makeup', sub: 'Events, brides, quinceañeras', desc: 'Professional makeup for your event. Always by appointment.' } },

  { id: 'faciales', cat: 'rostro', price: null, mins: 60,
    name: 'Faciales', sub: 'Limpieza profunda',
    desc: 'Limpieza, exfoliación y mascarilla según tu tipo de piel.',
    en: { name: 'Facials', sub: 'Deep cleanse', desc: 'Cleanse, exfoliation and a mask matched to your skin.' } },

  // — SPA —
  { id: 'masajes', cat: 'spa', price: null, mins: 60,
    name: 'Masajes', sub: 'Relajante',
    desc: 'Masaje relajante para soltar cuello y espalda.',
    en: { name: 'Massage', sub: 'Relaxing', desc: 'A relaxing massage to release neck and shoulders.' } },
];

/* ---------- DATA: GALERÍA ----------
   size: g-w6 (ancho, 4/3) · g-p3 (retrato, 1/4 de fila) · g-p4 (retrato, 1/3)
------------------------------------- */
const GALLERY = [
  { src: 'unas-rosadas',      size: 'g-w6', cap: 'Esmaltado permanente',  type: 'Uñas',
    en: { cap: 'Gel polish', type: 'Nails' } },
  { src: 'keratina-antes',    size: 'g-p3', cap: 'Antes',                 type: 'Keratina',
    en: { cap: 'Before', type: 'Keratin' } },
  { src: 'keratina-despues',  size: 'g-p3', cap: 'Después',               type: 'Keratina',
    en: { cap: 'After', type: 'Keratin' } },
  { src: 'cambio-de-look',    size: 'g-p3', cap: 'Cambio de look',        type: 'Color',
    en: { cap: 'New look', type: 'Color' } },
  { src: 'salon-interior',    size: 'g-p3', cap: 'Dentro del salón',      type: 'Salón',
    en: { cap: 'Inside the salon', type: 'Salon' } },
  { src: 'keratina-una',      size: 'g-p3', cap: 'Keratina en uña natural', type: 'Uñas',
    en: { cap: 'Keratin on natural nails', type: 'Nails' } },
  { src: 'maquillaje',        size: 'g-p3', cap: 'Maquillaje por cita',   type: 'Rostro',
    en: { cap: 'Makeup by appointment', type: 'Face' } },
  { src: 'precios-poster',    size: 'g-p4', cap: 'Precios de locura',     type: 'Carta',
    en: { cap: 'Price list', type: 'Menu' } },
  { src: 'promo-keratina',    size: 'g-p4', cap: 'Promoción de keratina', type: 'Promo',
    en: { cap: 'Keratin promo', type: 'Promo' } },
  { src: 'llegada',           size: 'g-p4', cap: 'Llegando por la CA-13', type: 'El Pino',
    en: { cap: 'Arriving on the CA-13', type: 'El Pino' } },
];

/* ---------- DATA: INSTAGRAM ---------- */
const IG_POSTS = [
  { img: 'keratina-una',       url: 'https://www.instagram.com/lailasbeautysalonhn/p/DRXWewhjpoR/' },
  { img: 'unas-rosadas',       url: 'https://www.instagram.com/lailasbeautysalonhn/p/DRFw9aajvsG/' },
  { img: 'cambio-de-look',     url: 'https://www.instagram.com/lailasbeautysalonhn/p/DQzWHrxjjt1/' },
  { img: 'agenda-abierta',     url: 'https://www.instagram.com/lailasbeautysalonhn/p/DM-wYpnOjnY/' },
  { img: 'precios-poster',     url: 'https://www.instagram.com/lailasbeautysalonhn/p/DMfomJDuv7W/' },
  { img: 'promo-keratina',     url: 'https://www.instagram.com/lailasbeautysalonhn/p/DL2s_EXuTB4/' },
];

/* ---------- DATA: MARQUEE ---------- */
const MARQUEE = {
  es: ['Keratina', 'Alisados', 'Color', 'Uñas acrílicas', 'Pestañas pelo a pelo', 'Faciales', 'Masajes', 'Maquillaje', 'Solo para mujeres'],
  en: ['Keratin', 'Straightening', 'Color', 'Acrylic nails', 'Lash extensions', 'Facials', 'Massage', 'Makeup', 'Women only'],
};

/* ---------- DATA: DÍA / HORA ---------- */
const DAYS = [
  { id: 'hoy',      es: 'Hoy',                  en: 'Today' },
  { id: 'manana',   es: 'Mañana',               en: 'Tomorrow' },
  { id: 'semana',   es: 'Esta semana',          en: 'This week' },
  { id: 'finde',    es: 'Fin de semana',        en: 'Weekend' },
  { id: 'cuando',   es: 'Cuando haya cupo',     en: 'Whenever there is room' },
];
const TIMES = [
  { id: 'am',    es: 'Por la mañana',        en: 'Morning' },
  { id: 'pm',    es: 'Por la tarde',         en: 'Afternoon' },
  { id: 'late',  es: 'Al final de la tarde', en: 'Late afternoon' },
  { id: 'any',   es: 'A cualquier hora',     en: 'Any time' },
];

/* =====================================================================
   A partir de aquí: comportamiento. No hace falta editar.
   ===================================================================== */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const I = window.LB_I18N;
const T = k => I.t(k);
const L = (o, f) => (I.lang === 'en' && o.en && o.en[f] != null) ? o.en[f] : o[f];
const money = n => CURRENCY + n.toLocaleString('es-HN');

/* ---------- preloader ---------- */
(() => {
  const pre = $('#preloader');
  const done = () => { pre.classList.add('is-done'); document.body.classList.remove('is-locked'); };
  document.body.classList.add('is-locked');
  const minWait = reduceMotion ? 0 : 1300;
  const t0 = performance.now();
  addEventListener('load', () => setTimeout(done, Math.max(0, minWait - (performance.now() - t0))));
  setTimeout(done, 3400);
})();

/* ---------- cursor ---------- */
(() => {
  if (!finePointer) return;
  const cur = $('#cursor'), ring = $('.cursor__ring', cur), dot = $('.cursor__dot', cur);
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  document.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; cur.classList.remove('is-hidden'); });
  document.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
  (function loop() {
    rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
    dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => {
    const t = e.target.closest('[data-cursor], a, button, summary');
    cur.className = 'cursor';
    if (!t) return;
    const kind = t.dataset.cursor || 'link';
    cur.classList.add('is-' + kind);
    ring.dataset.label = kind === 'book' ? T('js.cursorBook') : kind === 'drag' ? T('js.cursorDrag') : '';
  });
})();

/* ---------- nav ---------- */
(() => {
  const nav = $('#nav'), fab = $('#fab'), menu = $('#mobileMenu'), burger = $('#burger');
  let last = 0;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-hidden', y > last && y > 420 && !menu.classList.contains('is-open'));
    fab.classList.toggle('is-visible', y > innerHeight * 0.65);
    last = y;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const links = $$('.nav__links a');
  const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver(en => en.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-40% 0px -55% 0px' });
  secs.forEach(s => io.observe(s));

  const toggle = open => {
    const isOpen = open ?? !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', isOpen);
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('is-locked', isOpen);
  };
  burger.addEventListener('click', () => toggle());
  $$('a', menu).forEach(a => a.addEventListener('click', () => toggle(false)));
})();

/* ---------- reveal ---------- */
(() => {
  const els = $$('.reveal');
  if (reduceMotion) { els.forEach(e => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver(en => en.forEach((e, i) => {
    if (!e.isIntersecting) return;
    e.target.style.transitionDelay = `${(i % 4) * 90}ms`;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e));
})();

/* ---------- parallax + contadores ---------- */
(() => {
  if (!reduceMotion && finePointer) {
    const layers = $$('[data-parallax]');
    addEventListener('mousemove', e => {
      const dx = e.clientX / innerWidth - .5, dy = e.clientY / innerHeight - .5;
      layers.forEach(l => { const k = parseFloat(l.dataset.parallax) * 100; l.style.transform = `translate(${dx * k}px,${dy * k}px)`; });
    }, { passive: true });
  }
  $('#svcCount').dataset.count = String(SERVICES.length);
  const run = el => {
    const target = parseFloat(el.dataset.count);
    const settle = () => { el.textContent = target.toLocaleString('es-HN'); };
    if (reduceMotion) { settle(); return; }
    const dur = 1500, t0 = performance.now();
    const step = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e).toLocaleString('es-HN');
      if (p < 1) requestAnimationFrame(step); else settle();
    };
    requestAnimationFrame(step);
    setTimeout(settle, dur + 400); // never leave a half-counted number on screen
  };
  const io = new IntersectionObserver(en => en.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }));
  $$('[data-count]').forEach(c => io.observe(c));
})();

/* ---------- magnetic + tilt ---------- */
(() => {
  if (!finePointer || reduceMotion) return;
  $$('.magnetic').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .16}px, ${(e.clientY - r.top - r.height / 2) * .26}px)`;
    });
    b.addEventListener('mouseleave', () => { b.style.transform = ''; });
  });
  $$('.tilt').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', px * 100 + '%'); c.style.setProperty('--my', py * 100 + '%');
      c.style.transition = 'transform .1s';
      c.style.transform = `perspective(900px) rotateX(${(.5 - py) * 5}deg) rotateY(${(px - .5) * 7}deg)`;
    });
    c.addEventListener('mouseleave', () => { c.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)'; c.style.transform = ''; });
  });
})();

/* ---------- marquee ---------- */
const renderMarquee = () => {
  const words = MARQUEE[I.lang] || MARQUEE.es;
  const run = words.map(w => `<span>${w}</span>`).join('');
  $('#marquee').innerHTML = run + run;
};

/* =====================================================================
   SERVICIOS + CITA + WHATSAPP
   ===================================================================== */
const cita = { ids: new Set(), day: null, time: null, name: '' };

const waLink = text => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const fmtDuration = mins => {
  if (!mins) return `0 ${T('js.min')}`;
  const h = Math.floor(mins / 60), m = mins % 60;
  if (!h) return `${m} ${T('js.min')}`;
  return `${h} ${T('js.hr')}${m ? ' ' + m + ' ' + T('js.min') : ''}`;
};

const buildMessage = () => {
  const es = I.lang !== 'en';
  const picked = SERVICES.filter(s => cita.ids.has(s.id));
  const mins = picked.reduce((a, s) => a + s.mins, 0);
  const total = picked.reduce((a, s) => a + (s.price || 0), 0);
  const nQuote = picked.filter(s => s.price == null).length;

  const day = cita.day ? (DAYS.find(d => d.id === cita.day) || {})[es ? 'es' : 'en'] : null;
  const time = cita.time ? (TIMES.find(t => t.id === cita.time) || {})[es ? 'es' : 'en'] : null;

  if (!picked.length) return null;

  const lines = [];
  lines.push(es ? '¡Hola Laila’s Beauty Salon! 💕' : T('js.waHi') + ' 💕');
  lines.push(es ? 'Quiero agendar una cita.' : T('js.waWant'));
  lines.push('');
  if (cita.name) lines.push(`• ${es ? 'Nombre' : T('js.waName')}: ${cita.name}`);
  lines.push(`• ${es ? 'Servicios' : T('js.waSvc')}:`);
  picked.forEach(s => {
    const p = s.price == null ? (es ? 'a consultar' : T('js.quote')) : money(s.price);
    lines.push(`   – ${L(s, 'name')} — ${p}`);
  });
  lines.push(`• ${es ? 'Duración aprox.' : T('js.waDur')}: ${fmtDuration(mins)}`);
  let totalTxt = money(total);
  if (nQuote) totalTxt += es ? ` (+ ${nQuote} a consultar)` : ` (+ ${nQuote} ${T('js.quote')})`;
  lines.push(`• ${es ? 'Total aprox.' : T('js.waTotal')}: ${totalTxt}`);
  if (day) lines.push(`• ${es ? 'Día' : T('js.waDay')}: ${day}`);
  if (time) lines.push(`• ${es ? 'Hora' : T('js.waTime')}: ${time}`);
  lines.push('');
  lines.push(es ? '¿Tienen cupo? ¡Gracias! 🌸' : T('js.waEnd') + ' 🌸');
  return lines.join('\n');
};

const plainMessage = () => (I.lang === 'en'
  ? T('js.waPlain')
  : '¡Hola Laila’s Beauty Salon! 💕 Quiero preguntar por una cita.');

const renderServices = () => {
  const filter = $('.chip.is-active')?.dataset.filter || 'all';
  $('#services').innerHTML = SERVICES.map(s => {
    const price = s.price == null
      ? `<div class="service__price"><small>${I.lang === 'en' ? 'On request' : 'A consultar'}</small></div>`
      : `<div class="service__price">${money(s.price)}</div>`;
    const on = cita.ids.has(s.id);
    return `<li class="service${on ? ' is-selected' : ''}${filter === 'all' || s.cat === filter ? '' : ' is-hidden'}"
      data-id="${s.id}" data-cat="${s.cat}" role="button" tabindex="0" aria-pressed="${on}">
      <span class="service__check"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L19 7"/></svg></span>
      <div>
        <div class="service__name">${L(s, 'name')}${s.tag ? `<span class="service__tag">${L(s, 'tag')}</span>` : ''}</div>
        <div class="service__desc">${L(s, 'sub')} — ${L(s, 'desc')}</div>
      </div>
      <div class="service__meta">${price}<div class="service__time">${s.mins} ${T('js.min')}</div></div>
    </li>`;
  }).join('');
};

const renderChips = () => {
  const es = I.lang !== 'en';
  $('#dayChips').innerHTML = DAYS.map(d =>
    `<button data-day="${d.id}" class="${cita.day === d.id ? 'is-on' : ''}">${es ? d.es : d.en}</button>`).join('');
  $('#timeChips').innerHTML = TIMES.map(t =>
    `<button data-time="${t.id}" class="${cita.time === t.id ? 'is-on' : ''}">${es ? t.es : t.en}</button>`).join('');
};

const renderTicket = () => {
  const es = I.lang !== 'en';
  const picked = SERVICES.filter(s => cita.ids.has(s.id));
  const lines = $('#ticketLines');

  if (!picked.length) {
    lines.innerHTML = `<p class="ticket__empty">${es ? 'Nada todavía. Toca un servicio para empezar.' : T('js.empty')}</p>`;
  } else {
    lines.innerHTML = picked.map(s => {
      const p = s.price == null
        ? `<span class="ticket__line--q">${es ? 'a consultar' : T('js.quote')}</span>`
        : `<span>${money(s.price)}</span>`;
      return `<div class="ticket__line"><span>${L(s, 'name')}</span><small>${s.mins}m</small>${p}</div>`;
    }).join('');
  }

  const mins = picked.reduce((a, s) => a + s.mins, 0);
  const total = picked.reduce((a, s) => a + (s.price || 0), 0);
  const nQuote = picked.filter(s => s.price == null).length;

  $('#ticketTime').textContent = fmtDuration(mins);
  $('#ticketTotal').innerHTML = money(total) + (nQuote
    ? `<small style="font-size:12px;color:var(--rose-200);font-family:var(--sans)"> +${nQuote}</small>` : '');

  const msg = buildMessage();
  const prev = $('#waPreview'), btn = $('#waBook');
  if (msg) {
    prev.innerHTML = `<b>${es ? 'Esto es lo que se envía:' : T('js.previewLbl')}</b>\n${msg.replace(/[<>]/g, '')}`;
    prev.style.display = '';
    btn.href = waLink(msg);
    btn.removeAttribute('disabled');
    btn.setAttribute('aria-disabled', 'false');
  } else {
    prev.style.display = 'none';
    btn.href = waLink(plainMessage());
    btn.setAttribute('disabled', '');
    btn.setAttribute('aria-disabled', 'true');
  }

  try { localStorage.setItem('laila_cita', JSON.stringify({ ids: [...cita.ids], day: cita.day, time: cita.time, name: cita.name })); } catch (_) {}
};

(() => {
  // restore
  try {
    const s = JSON.parse(localStorage.getItem('laila_cita') || 'null');
    if (s) {
      (s.ids || []).forEach(id => { if (SERVICES.some(x => x.id === id)) cita.ids.add(id); });
      cita.day = s.day || null; cita.time = s.time || null; cita.name = s.name || '';
      if (cita.name) $('#clientName').value = cita.name;
    }
  } catch (_) {}

  $('#ticketNo').textContent = String(Math.floor(1000 + Math.random() * 9000));

  $('#services').addEventListener('click', e => {
    const row = e.target.closest('.service'); if (!row) return;
    const id = row.dataset.id;
    cita.ids.has(id) ? cita.ids.delete(id) : cita.ids.add(id);
    row.classList.toggle('is-selected', cita.ids.has(id));
    row.setAttribute('aria-pressed', String(cita.ids.has(id)));
    renderTicket();
  });
  $('#services').addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const row = e.target.closest('.service'); if (!row) return;
    e.preventDefault(); row.click();
  });

  $$('.chip').forEach(chip => chip.addEventListener('click', () => {
    $$('.chip').forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
    chip.classList.add('is-active'); chip.setAttribute('aria-selected', 'true');
    const f = chip.dataset.filter;
    $$('.service').forEach(r => r.classList.toggle('is-hidden', !(f === 'all' || r.dataset.cat === f)));
  }));

  $('#dayChips').addEventListener('click', e => {
    const b = e.target.closest('[data-day]'); if (!b) return;
    cita.day = cita.day === b.dataset.day ? null : b.dataset.day;
    renderChips(); renderTicket();
  });
  $('#timeChips').addEventListener('click', e => {
    const b = e.target.closest('[data-time]'); if (!b) return;
    cita.time = cita.time === b.dataset.time ? null : b.dataset.time;
    renderChips(); renderTicket();
  });
  $('#clientName').addEventListener('input', e => { cita.name = e.target.value.trim().slice(0, 40); renderTicket(); });

  $('#ticketClear').addEventListener('click', () => {
    cita.ids.clear(); cita.day = null; cita.time = null; cita.name = '';
    $('#clientName').value = '';
    renderServices(); renderChips(); renderTicket();
  });
})();

/* ---------- enlaces de WhatsApp sueltos ---------- */
const refreshPlainLinks = () => {
  const href = waLink(plainMessage());
  $$('.js-wa-plain').forEach(a => { a.href = href; });
};

/* ---------- galería ---------- */
const renderGallery = () => {
  $('#gallery').innerHTML = GALLERY.map((g, i) => `
    <figure class="gitem ${g.size}" data-i="${i}" tabindex="0" role="button" aria-label="${T('js.openPhoto')}: ${L(g, 'cap')}">
      <img src="assets/img/work/${g.src}-sm.jpg" alt="${L(g, 'cap')} — ${T('js.by')}" loading="lazy" decoding="async" draggable="false">
      <figcaption class="gitem__cap"><span>${L(g, 'cap')}</span><span>${L(g, 'type')}</span></figcaption>
    </figure>`).join('');
};

(() => {
  const lb = $('#lightbox'), img = $('#lbImg'), cap = $('#lbCap');
  let cur = 0;
  const show = i => {
    cur = (i + GALLERY.length) % GALLERY.length;
    const g = GALLERY[cur];
    img.src = `assets/img/work/${g.src}.jpg`;
    img.alt = `${L(g, 'cap')} — ${T('js.by')}`;
    cap.textContent = `${L(g, 'cap')} · ${L(g, 'type')} — ${cur + 1}/${GALLERY.length}`;
  };
  const open = i => { show(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.classList.add('is-locked'); };
  const close = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.classList.remove('is-locked'); };

  $('#gallery').addEventListener('click', e => { const f = e.target.closest('.gitem'); if (f) open(+f.dataset.i); });
  $('#gallery').addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const f = e.target.closest('.gitem'); if (f) { e.preventDefault(); open(+f.dataset.i); }
  });
  $('#lbClose').addEventListener('click', close);
  $('#lbPrev').addEventListener('click', () => show(cur - 1));
  $('#lbNext').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
  let tx = 0;
  lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  });
  window.__lbShow = () => { if (lb.classList.contains('is-open')) show(cur); };
})();

/* ---------- instagram ---------- */
$('#igStrip').innerHTML = IG_POSTS.map(p => `
  <a href="${p.url}" target="_blank" rel="noopener" aria-label="Ver publicación en Instagram">
    <img src="assets/img/work/${p.img}-sm.jpg" alt="" loading="lazy" decoding="async">
  </a>`).join('');

/* ---------- misc ---------- */
$('#year').textContent = new Date().getFullYear();

const renderAll = () => {
  renderMarquee();
  renderServices();
  renderChips();
  renderTicket();
  renderGallery();
  refreshPlainLinks();
  const h = $('#hoursLine');
  if (h) {
    const txt = I.lang === 'en' ? T('js.hours') : HOURS_ES;
    h.childNodes[0].nodeValue = txt;
  }
  if (window.__lbShow) window.__lbShow();
};

renderAll();
I.onChange(renderAll);
