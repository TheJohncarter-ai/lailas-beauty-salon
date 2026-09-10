/* =====================================================================
   LAILA'S BEAUTY SALON — data.js
   ÚNICA fuente de verdad del contenido: servicios, precios, galería,
   Instagram. Lo carga el navegador (index.html) y también Node, cuando
   se corre tools/prerender.py para escribir este mismo contenido como
   HTML estático dentro de index.html.
   Si cambiás un precio acá, volvé a correr:  python tools/prerender.py
   ===================================================================== */

/* ---------- CONFIGURACIÓN ---------- */
const WA_NUMBER = '50431979888';          // WhatsApp de Laila, sin + ni espacios
const WA_DISPLAY = '+504 3197-9888';
const IG_URL = 'https://www.instagram.com/lailasbeautysalonhn';
const CURRENCY = 'L.';
// Horario que se muestra en Ubicación. CONFIRMAR CON LAILA y editar acá.
const HOURS_ES = 'Lunes a sábado · 9:00 a.m. – 6:00 p.m.';

// Mensajes de WhatsApp. Los usa main.js y también tools/prerender.py, que
// los escribe en los href estáticos: así los botones funcionan aunque el
// JavaScript nunca cargue (conexión mala, navegador viejo, ahorro de datos).
const WA_TEXT = {
  plain:    { es: '¡Hola Laila! 🌿 Quiero preguntar por una cita.',
              en: "Hello Laila's Beauty Salon! I would like to ask about an appointment." },
  keratina: { es: '¡Hola Laila! 🌿 Quiero cotizar una keratina. Acá te mando una foto de mi cabello:',
              en: "Hello Laila's Beauty Salon! I would like a quote for a keratin treatment. Here is a photo of my hair:" },
};

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
    desc: 'Corte a tu medida, con lavado y secado incluidos.',
    en: { tag: 'Promo', name: 'Haircut', sub: 'Cut and style', desc: 'A cut shaped to you, wash and blow-dry included.' } },

  { id: 'lavseco', cat: 'cabello', price: 180, mins: 45,
    name: 'Lavado y secado', sub: 'Cepillado profesional',
    desc: 'Lavado con masaje y secado con cepillo.',
    en: { name: 'Wash and blow-dry', sub: 'Professional brush-out', desc: 'Wash with a scalp massage and a brushed blow-dry.' } },

  { id: 'planchado', cat: 'cabello', price: 150, mins: 40,
    name: 'Planchado', sub: 'Liso al instante',
    desc: 'Plancha con protector térmico para un liso que aguanta.',
    en: { name: 'Flat iron', sub: 'Instant sleek', desc: 'Flat iron with heat protectant for a finish that holds.' } },

  { id: 'lavplanch', cat: 'cabello', price: 300, mins: 75, tag: 'El más pedido',
    name: 'Lavado, secado y planchado', sub: 'El combo completo',
    desc: 'Lo que pide la mayoría: salís lista para cualquier plan.',
    en: { tag: 'Most booked', name: 'Wash, dry and flat iron', sub: 'The full combo', desc: 'What most clients book: you walk out ready for anything.' } },

  { id: 'lavtrat', cat: 'cabello', price: 250, mins: 60,
    name: 'Lavado, secado y tratamiento', sub: 'Hidratación profunda',
    desc: 'Ampolla o mascarilla según lo que necesite tu cabello.',
    en: { name: 'Wash, dry and treatment', sub: 'Deep conditioning', desc: 'Ampoule or mask chosen for what your hair actually needs.' } },

  { id: 'keratina', cat: 'cabello', price: 1000, mins: 180, tag: 'De la casa',
    name: 'Keratina Smooth', sub: 'Alisado con keratina',
    desc: 'Frizz bajo control, brillo y manejo por meses. Precio final según el largo.',
    en: { tag: 'Signature', name: 'Keratin Smooth', sub: 'Keratin straightening', desc: 'Frizz under control, shine and manageability for months. Final price by length.' } },

  { id: 'alisado', cat: 'cabello', price: null, mins: 180,
    name: 'Alisado', sub: 'Liso duradero',
    desc: 'Alisado progresivo. Se cotiza según el tipo y largo del cabello.',
    en: { name: 'Straightening', sub: 'Long-lasting smooth', desc: 'Progressive straightening. Quoted by hair type and length.' } },

  { id: 'color', cat: 'cabello', price: null, mins: 120,
    name: 'Pintado y color', sub: 'Tinte, retoque, mechas',
    desc: 'Color completo, retoque de raíz o mechas. Mandame una foto y te cotizo.',
    en: { name: 'Color', sub: 'Tint, root touch-up, highlights', desc: 'Full color, root touch-up or highlights. Send a photo and I quote it.' } },

  { id: 'tratamiento', cat: 'cabello', price: null, mins: 60,
    name: 'Tratamientos capilares', sub: 'Botox, ampollas, reparación',
    desc: 'Para cabello reseco, poroso o castigado por el sol y la sal.',
    en: { name: 'Hair treatments', sub: 'Botox, ampoules, repair', desc: 'For hair left dry, porous or worn out by sun and salt.' } },

  // — UÑAS —
  { id: 'acrilicas', cat: 'unas', price: 250, mins: 120, tag: 'El más pedido',
    name: 'Uñas acrílicas', sub: 'Juego completo',
    desc: 'Extensión en acrílico, largo y forma a tu gusto. Los diseños se cotizan aparte.',
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

  { id: 'maquillaje', cat: 'rostro', price: null, mins: 60, tag: 'Con cita',
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
   size: g-w6 (ancho 4/3) · g-p3 (retrato, 1/4 de fila) · g-p4 (retrato, 1/3)
------------------------------------- */
const GALLERY = [
  { src: 'unas-rosadas',     size: 'g-w6', cap: 'Esmaltado permanente',      type: 'Uñas',
    en: { cap: 'Gel polish', type: 'Nails' } },
  { src: 'keratina-antes',   size: 'g-p3', cap: 'Antes de la keratina',      type: 'Keratina',
    en: { cap: 'Before the keratin', type: 'Keratin' } },
  { src: 'keratina-despues', size: 'g-p3', cap: 'Después de la keratina',    type: 'Keratina',
    en: { cap: 'After the keratin', type: 'Keratin' } },
  { src: 'cambio-de-look',   size: 'g-p3', cap: 'Cambio de look',            type: 'Color',
    en: { cap: 'New look', type: 'Color' } },
  { src: 'salon-interior',   size: 'g-p3', cap: 'Dentro del salón',          type: 'El salón',
    en: { cap: 'Inside the salon', type: 'The salon' } },
  { src: 'keratina-una',     size: 'g-p3', cap: 'Keratina en uña natural',   type: 'Uñas',
    en: { cap: 'Keratin on natural nails', type: 'Nails' } },
  { src: 'maquillaje',       size: 'g-p3', cap: 'Maquillaje con cita',       type: 'Rostro',
    en: { cap: 'Makeup by appointment', type: 'Face' } },
  { src: 'precios-poster',   size: 'g-p4', cap: 'La carta de precios',       type: 'Carta',
    en: { cap: 'The price list', type: 'Menu' } },
  { src: 'promo-keratina',   size: 'g-p4', cap: 'Promoción de keratina',     type: 'Promo',
    en: { cap: 'Keratin promo', type: 'Promo' } },
  { src: 'llegada',          size: 'g-p4', cap: 'Llegando por la CA-13',     type: 'El Pino',
    en: { cap: 'Arriving on the CA-13', type: 'El Pino' } },
];

/* ---------- DATA: INSTAGRAM ---------- */
const IG_POSTS = [
  { img: 'keratina-una',   url: 'https://www.instagram.com/lailasbeautysalonhn/p/DRXWewhjpoR/' },
  { img: 'unas-rosadas',   url: 'https://www.instagram.com/lailasbeautysalonhn/p/DRFw9aajvsG/' },
  { img: 'cambio-de-look', url: 'https://www.instagram.com/lailasbeautysalonhn/p/DQzWHrxjjt1/' },
  { img: 'agenda-abierta', url: 'https://www.instagram.com/lailasbeautysalonhn/p/DM-wYpnOjnY/' },
  { img: 'precios-poster', url: 'https://www.instagram.com/lailasbeautysalonhn/p/DMfomJDuv7W/' },
  { img: 'promo-keratina', url: 'https://www.instagram.com/lailasbeautysalonhn/p/DL2s_EXuTB4/' },
];

/* ---------- DATA: MARQUEE ---------- */
const MARQUEE = {
  es: ['Keratina', 'Alisado', 'Color', 'Uñas acrílicas', 'Pestañas pelo a pelo', 'Faciales', 'Masajes', 'Maquillaje', 'Solo para mujeres'],
  en: ['Keratin', 'Straightening', 'Color', 'Acrylic nails', 'Lash extensions', 'Facials', 'Massage', 'Makeup', 'Women only'],
};

/* ---------- DATA: DÍA / HORA ---------- */
const DAYS = [
  { id: 'hoy',    es: 'Hoy',              en: 'Today' },
  { id: 'manana', es: 'Mañana',           en: 'Tomorrow' },
  { id: 'semana', es: 'Esta semana',      en: 'This week' },
  { id: 'finde',  es: 'El fin de semana', en: 'The weekend' },
  { id: 'cuando', es: 'Cuando haya cupo', en: 'Whenever there is room' },
];
const TIMES = [
  { id: 'am',   es: 'Por la mañana',        en: 'Morning' },
  { id: 'pm',   es: 'Por la tarde',         en: 'Afternoon' },
  { id: 'late', es: 'Al final de la tarde', en: 'Late afternoon' },
  { id: 'any',  es: 'A cualquier hora',     en: 'Any time' },
];

/* para Node (tools/prerender.py) */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WA_NUMBER, WA_DISPLAY, IG_URL, CURRENCY, HOURS_ES, WA_TEXT, SERVICES, GALLERY, IG_POSTS, MARQUEE, DAYS, TIMES };
}
