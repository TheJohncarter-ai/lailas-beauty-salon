/* =====================================================================
   LAILA'S BEAUTY SALON — main.js
   Todo lo editable vive en el bloque DATA. El inglés estático está en
   js/i18n.js; los datos de acá llevan su propio bloque `en`.
   Español de Honduras: voseo en los imperativos (agendá, vení, escribime),
   tu/tus en los posesivos. Nunca usted.
   ===================================================================== */

/* =====================================================================
   Comportamiento. No hace falta editar de aquí para abajo.
   ===================================================================== */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const I = window.LB_I18N;
const T = k => I.t(k);
const L = (o, f) => (I.lang === 'en' && o.en && o.en[f] != null) ? o.en[f] : o[f];
const money = n => CURRENCY + n.toLocaleString('es-HN');

/* ---------- nav ---------- */
(() => {
  const nav = $('#nav'), fab = $('#fab'), menu = $('#mobileMenu'), burger = $('#burger');
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', scrollY > 8);
    fab.classList.toggle('is-visible', scrollY > innerHeight * 0.5);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const links = $$('.nav__links a');
  const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if (secs.length) {
    const io = new IntersectionObserver(en => en.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => io.observe(s));
  }

  const toggle = open => {
    const isOpen = open ?? !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', isOpen);
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    menu.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('is-locked', isOpen);
  };
  burger.addEventListener('click', () => toggle());
  $$('a', menu).forEach(a => a.addEventListener('click', () => toggle(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) toggle(false); });
})();

/* ---------- reveal al hacer scroll ---------- */
(() => {
  const els = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver(en => en.forEach((e, i) => {
    if (!e.isIntersecting) return;
    e.target.style.transitionDelay = `${(i % 3) * 80}ms`;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  }), { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  els.forEach(e => io.observe(e));
})();

/* ---------- antes / después ----------
   Un <input type=range> transparente encima de las dos fotos: funciona con
   el dedo, con el mouse y con el teclado, y cumple WCAG 2.2 «Dragging
   Movements» porque no depende de arrastrar.
------------------------------------------ */
(() => {
  const stage = $('#baStage'); if (!stage) return;
  const range = $('#baRange'), after = $('#baAfter'), handle = $('#baHandle');
  const set = v => {
    stage.style.setProperty('--split', v + '%');
    range.setAttribute('aria-valuetext', `${v}% del después`);
  };
  range.addEventListener('input', e => set(e.target.value));
  set(range.value);
  // el primer vistazo: una barrida suave para que se entienda que se mueve
  if (!reduceMotion) {
    const io = new IntersectionObserver(en => {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      let v = 50, dir = -1, steps = 0;
      const tick = () => {
        v += dir * 2.2; steps++;
        if (v <= 26) dir = 1;
        if (steps > 34) { v = 50; set(v); range.value = 50; return; }
        set(Math.round(v)); range.value = Math.round(v);
        requestAnimationFrame(tick);
      };
      setTimeout(() => requestAnimationFrame(tick), 320);
    }, { threshold: 0.5 });
    io.observe(stage);
  }
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
  if (!picked.length) return null;

  const mins = picked.reduce((a, s) => a + s.mins, 0);
  const total = picked.reduce((a, s) => a + (s.price || 0), 0);
  const nQuote = picked.filter(s => s.price == null).length;
  const day = cita.day ? (DAYS.find(d => d.id === cita.day) || {})[es ? 'es' : 'en'] : null;
  const time = cita.time ? (TIMES.find(t => t.id === cita.time) || {})[es ? 'es' : 'en'] : null;

  const lines = [];
  lines.push(es ? '¡Hola Laila! 🌿' : "Hello Laila's Beauty Salon!");
  lines.push(es ? 'Quiero agendar una cita.' : 'I would like to book an appointment.');
  lines.push('');
  if (cita.name) lines.push(`• ${es ? 'Nombre' : 'Name'}: ${cita.name}`);
  lines.push(`• ${es ? 'Servicios' : 'Services'}:`);
  picked.forEach(s => {
    const p = s.price == null ? (es ? 'a consultar' : 'on request') : money(s.price);
    lines.push(`   – ${L(s, 'name')} — ${p}`);
  });
  lines.push(`• ${es ? 'Duración aprox.' : 'Approx. duration'}: ${fmtDuration(mins)}`);
  let totalTxt = money(total);
  if (nQuote) totalTxt += es ? ` (+ ${nQuote} a consultar)` : ` (+ ${nQuote} on request)`;
  lines.push(`• ${es ? 'Total aprox.' : 'Approx. total'}: ${totalTxt}`);
  if (day) lines.push(`• ${es ? 'Día' : 'Preferred day'}: ${day}`);
  if (time) lines.push(`• ${es ? 'Hora' : 'Preferred time'}: ${time}`);
  lines.push('');
  lines.push(es ? '¿Tenés cupo? ¡Gracias!' : 'Do you have room? Thank you!');
  return lines.join('\n');
};

const plainMessage = () => (I.lang === 'en'
  ? "Hello Laila's Beauty Salon! I would like to ask about an appointment."
  : '¡Hola Laila! 🌿 Quiero preguntar por una cita.');

const keratinaMessage = () => (I.lang === 'en'
  ? "Hello Laila's Beauty Salon! I would like a quote for a keratin treatment. Here is a photo of my hair:"
  : '¡Hola Laila! 🌿 Quiero cotizar una keratina. Acá te mando una foto de mi cabello:');

const renderServices = () => {
  const filter = $('.chip.is-active')?.dataset.filter || 'all';
  $('#services').innerHTML = SERVICES.map(s => {
    const price = s.price == null
      ? `<div class="service__price"><small>${I.lang === 'en' ? 'On request' : 'A consultar'}</small></div>`
      : `<div class="service__price">${money(s.price)}</div>`;
    const on = cita.ids.has(s.id);
    return `<li class="service${on ? ' is-selected' : ''}${filter === 'all' || s.cat === filter ? '' : ' is-hidden'}"
      data-id="${s.id}" data-cat="${s.cat}" role="button" tabindex="0" aria-pressed="${on}">
      <span class="service__check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L19 7"/></svg></span>
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
    `<button type="button" data-day="${d.id}" class="${cita.day === d.id ? 'is-on' : ''}" aria-pressed="${cita.day === d.id}">${es ? d.es : d.en}</button>`).join('');
  $('#timeChips').innerHTML = TIMES.map(t =>
    `<button type="button" data-time="${t.id}" class="${cita.time === t.id ? 'is-on' : ''}" aria-pressed="${cita.time === t.id}">${es ? t.es : t.en}</button>`).join('');
};

const renderTicket = () => {
  const es = I.lang !== 'en';
  const picked = SERVICES.filter(s => cita.ids.has(s.id));
  const lines = $('#ticketLines');

  if (!picked.length) {
    lines.innerHTML = `<p class="ticket__empty">${es ? 'Nada todavía. Tocá un servicio para empezar.' : 'Nothing yet. Tap a service to start.'}</p>`;
  } else {
    lines.innerHTML = picked.map(s => {
      const p = s.price == null
        ? `<span class="ticket__line--q">${es ? 'a consultar' : 'on request'}</span>`
        : `<span>${money(s.price)}</span>`;
      return `<div class="ticket__line"><span>${L(s, 'name')}</span><small>${s.mins}m</small>${p}</div>`;
    }).join('');
  }

  const mins = picked.reduce((a, s) => a + s.mins, 0);
  const total = picked.reduce((a, s) => a + (s.price || 0), 0);
  const nQuote = picked.filter(s => s.price == null).length;

  $('#ticketTime').textContent = fmtDuration(mins);
  $('#ticketTotal').textContent = money(total) + (nQuote ? ` +${nQuote}` : '');

  // El botón SIEMPRE funciona. Sin servicios abre un mensaje general; con
  // servicios manda la cita completa. Un botón muerto se lee como roto.
  const msg = buildMessage();
  const prev = $('#waPreview'), btn = $('#waBook'), btnTxt = $('#waBookLabel');
  if (msg) {
    prev.innerHTML = `<b>${es ? 'Esto es lo que se envía:' : 'This is what gets sent:'}</b>\n${msg.replace(/[<>]/g, '')}`;
    prev.hidden = false;
    btn.href = waLink(msg);
    btnTxt.textContent = es ? 'Enviar mi cita por WhatsApp' : 'Send my appointment';
  } else {
    prev.hidden = true;
    btn.href = waLink(plainMessage());
    btnTxt.textContent = es ? 'Escribime por WhatsApp' : 'Message me on WhatsApp';
  }

  renderCartBar(picked, mins, total, nQuote);

  try {
    localStorage.setItem('laila_cita', JSON.stringify({ ids: [...cita.ids], day: cita.day, time: cita.time, name: cita.name }));
  } catch (_) {}
};

/* ---------- barra de cita pegada abajo (solo móvil) ----------
   En móvil la boleta queda debajo de los 18 servicios, así que al tocar un
   servicio no cambiaba nada cerca del pulgar. Esta barra trae el total y el
   botón de enviar a la parte de abajo de la pantalla.
--------------------------------------------------------------- */
function renderCartBar(picked, mins, total, nQuote) {
  const bar = $('#cartbar'); if (!bar) return;
  const es = I.lang !== 'en';
  const on = picked.length > 0;
  bar.classList.toggle('is-on', on);
  document.body.classList.toggle('has-cart', on);
  if (!on) return;
  const n = picked.length;
  const word = es ? (n === 1 ? 'servicio' : 'servicios') : (n === 1 ? 'service' : 'services');
  $('#cartSum').innerHTML =
    `<b>${money(total)}${nQuote ? ` +${nQuote}` : ''}</b>` +
    `<span>${n} ${word} · ${fmtDuration(mins)}</span>`;
  $('#cartBtn').href = $('#waBook').href;
  const label = $('#cartBtn').querySelector('span');
  if (label) label.textContent = es ? 'Enviar' : 'Send';
}

(() => {
  try {
    const s = JSON.parse(localStorage.getItem('laila_cita') || 'null');
    if (s) {
      (s.ids || []).forEach(id => { if (SERVICES.some(x => x.id === id)) cita.ids.add(id); });
      cita.day = s.day || null; cita.time = s.time || null; cita.name = s.name || '';
      if (cita.name) $('#clientName').value = cita.name;
    }
  } catch (_) {}

  $('#ticketNo').textContent = String(Math.floor(1000 + Math.random() * 9000));

  const toggleService = row => {
    const id = row.dataset.id;
    cita.ids.has(id) ? cita.ids.delete(id) : cita.ids.add(id);
    row.classList.toggle('is-selected', cita.ids.has(id));
    row.setAttribute('aria-pressed', String(cita.ids.has(id)));
    renderTicket();
  };
  $('#services').addEventListener('click', e => {
    const row = e.target.closest('.service'); if (row) toggleService(row);
  });
  $('#services').addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const row = e.target.closest('.service'); if (!row) return;
    e.preventDefault(); toggleService(row);
  });

  $$('.chip').forEach(chip => chip.addEventListener('click', () => {
    $$('.chip').forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
    chip.classList.add('is-active'); chip.setAttribute('aria-pressed', 'true');
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

  const cartSum = $('#cartSum');
  if (cartSum) cartSum.addEventListener('click', () => {
    $('.ticket').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  });

  $('#ticketClear').addEventListener('click', () => {
    cita.ids.clear(); cita.day = null; cita.time = null; cita.name = '';
    $('#clientName').value = '';
    renderServices(); renderChips(); renderTicket();
  });
})();

/* ---------- enlaces sueltos de WhatsApp ---------- */
const refreshPlainLinks = () => {
  const plain = waLink(plainMessage());
  $$('.js-wa-plain').forEach(a => { a.href = plain; });
  const ker = waLink(keratinaMessage());
  $$('.js-wa-keratina').forEach(a => { a.href = ker; });
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
  let cur = 0, lastFocus = null;
  const show = i => {
    cur = (i + GALLERY.length) % GALLERY.length;
    const g = GALLERY[cur];
    img.src = `assets/img/work/${g.src}.jpg`;
    img.alt = `${L(g, 'cap')} — ${T('js.by')}`;
    cap.textContent = `${L(g, 'cap')} · ${L(g, 'type')} — ${cur + 1}/${GALLERY.length}`;
  };
  const open = i => {
    lastFocus = document.activeElement;
    show(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked'); $('#lbClose').focus();
  };
  const close = () => {
    lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus();
  };

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

/* ---------- abierto ahora / cerrado ----------
   Calculado en la hora de Honduras (UTC-6, sin horario de verano) para que
   diga lo mismo aunque la clienta tenga el teléfono en otra zona.
--------------------------------------------------- */
const OPEN_DAYS = [1, 2, 3, 4, 5, 6];   // lunes a sábado
const OPEN_H = 9, CLOSE_H = 18;
const renderOpenNow = () => {
  const el = $('#openNow'); if (!el) return;
  const es = I.lang !== 'en';
  const hn = new Date(Date.now() - 6 * 3600e3);   // UTC-6
  const day = hn.getUTCDay(), h = hn.getUTCHours();
  const open = OPEN_DAYS.includes(day) && h >= OPEN_H && h < CLOSE_H;
  el.hidden = false;
  el.innerHTML = open
    ? `<i style="background:var(--wa)"></i>${es ? 'Abierto hoy hasta las 6:00 p.m.' : 'Open today until 6:00 p.m.'}`
    : `<i></i>${es ? 'Cerrado ahora · escribime igual' : 'Closed now · message me anyway'}`;
};

/* ---------- varios ---------- */
$('#year').textContent = new Date().getFullYear();
$('#svcCount').textContent = String(SERVICES.length);

const renderAll = () => {
  renderMarquee();
  renderOpenNow();
  renderServices();
  renderChips();
  renderTicket();
  renderGallery();
  refreshPlainLinks();
  const h = $('#hoursLine');
  if (h && h.firstChild) h.firstChild.nodeValue = I.lang === 'en' ? T('js.hours') : HOURS_ES;
  if (window.__lbShow) window.__lbShow();
};

renderAll();
I.onChange(renderAll);
