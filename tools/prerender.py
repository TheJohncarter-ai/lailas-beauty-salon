#!/usr/bin/env python
"""Escribe los servicios, la galería y la tira de Instagram como HTML estático
dentro de index.html.

Por qué: los rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot) descargan
JavaScript pero no lo ejecutan. Si la carta de precios solo existe cuando corre
main.js, para ellos el salón no tiene precios. Esto también hace que la página
sirva de algo si el JS nunca carga.

La fuente de verdad sigue siendo js/data.js. Después de cambiar un precio:

    python tools/prerender.py

Se puede correr las veces que quieras: reemplaza lo que hay entre los
marcadores <!--PRERENDER:x--> y <!--/PRERENDER:x-->.
"""
import hashlib
import io
import json
import os
import re
import subprocess
import sys
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, 'index.html')
DATA = os.path.join(ROOT, 'js', 'data.js')
WORK = os.path.join(ROOT, 'assets', 'img', 'work')

NODE_CANDIDATES = [
    'node',
    r'C:\Program Files\nodejs\node.exe',
    '/usr/bin/node', '/usr/local/bin/node',
]
APOS = '\u2019'


def load_data():
    """Lee js/data.js con Node y devuelve los arreglos como dicts de Python."""
    script = (
        "const d=require(%s);"
        "process.stdout.write(JSON.stringify("
        "{SERVICES:d.SERVICES,GALLERY:d.GALLERY,IG_POSTS:d.IG_POSTS,CURRENCY:d.CURRENCY,"
        "WA_NUMBER:d.WA_NUMBER,WA_TEXT:d.WA_TEXT}));"
        % json.dumps(DATA.replace('\\', '/'))
    )
    last = None
    for node in NODE_CANDIDATES:
        try:
            out = subprocess.run([node, '-e', script], capture_output=True, check=True)
            return json.loads(out.stdout.decode('utf-8'))
        except Exception as e:  # noqa: BLE001 - probamos el siguiente node
            last = e
    raise SystemExit('No pude ejecutar Node para leer js/data.js: %s' % last)


def esc(t):
    return (str(t).replace('&', '&amp;').replace('<', '&lt;')
            .replace('>', '&gt;').replace('"', '&quot;'))


def money(n, cur):
    return cur + format(n, ',d')


def pic(base, alt, extra=''):
    """<picture> con WebP y JPG de respaldo, si existe el .webp."""
    img = '<img src="assets/img/work/%s.jpg" alt="%s" loading="lazy" decoding="async"%s>' % (
        esc(base), esc(alt), extra)
    if os.path.exists(os.path.join(WORK, base + '.webp')):
        return ('<picture><source srcset="assets/img/work/%s.webp" type="image/webp">%s</picture>'
                % (esc(base), img))
    return img


def services_html(services, cur):
    rows = []
    for s in services:
        if s.get('price') is None:
            price = '<div class="service__price"><small>A consultar</small></div>'
        else:
            price = '<div class="service__price">%s</div>' % money(s['price'], cur)
        tag = ('<span class="service__tag">%s</span>' % esc(s['tag'])) if s.get('tag') else ''
        rows.append(
            '<li class="service" data-id="%s" data-cat="%s" role="button" tabindex="0" aria-pressed="false">'
            '<span class="service__check" aria-hidden="true">'
            '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L19 7"/></svg></span>'
            '<div><div class="service__name">%s%s</div>'
            '<div class="service__desc">%s — %s</div></div>'
            '<div class="service__meta">%s<div class="service__time">%d min</div></div>'
            '</li>' % (esc(s['id']), esc(s['cat']), esc(s['name']), tag,
                       esc(s['sub']), esc(s['desc']), price, s['mins']))
    return rows


def gallery_html(gallery):
    return [
        '<figure class="gitem %s" data-i="%d" tabindex="0" role="button" aria-label="Ver foto: %s">'
        '%s'
        '<figcaption class="gitem__cap"><span>%s</span><span>%s</span></figcaption>'
        '</figure>' % (g['size'], i, esc(g['cap']),
                       pic(g['src'] + '-sm', '%s — en Laila%ss Beauty Salon' % (g['cap'], APOS),
                           ' draggable="false"'),
                       esc(g['cap']), esc(g['type']))
        for i, g in enumerate(gallery)
    ]


def ig_html(posts):
    return [
        '<a href="%s" target="_blank" rel="noopener" aria-label="Ver publicación en Instagram">%s</a>'
        % (esc(p['url']), pic(p['img'] + '-sm', ''))
        for p in posts
    ]


def fill(html, container_id, marker, items):
    """Pone `items` dentro del contenedor, entre marcadores de apertura y cierre.

    La primera vez el contenedor puede traer solo el marcador de apertura (o
    nada). A partir de ahí siempre hay un par de marcadores, y todo lo que está
    entre ellos se reemplaza. Nunca busca el primer '</' — eso se rompía en
    cuanto el contenido tenía etiquetas adentro.
    """
    open_m, close_m = '<!--PRERENDER:%s-->' % marker, '<!--/PRERENDER:%s-->' % marker
    inner = '\n        '.join(items)
    block = '%s\n        %s\n        %s' % (open_m, inner, close_m)

    if close_m in html:                       # re-ejecución: par de marcadores
        a = html.index(open_m)
        b = html.index(close_m) + len(close_m)
        return html[:a] + block + html[b:]

    # primera vez: localizar el contenedor y su etiqueta de cierre real
    m = re.search(r'<(\w+)[^>]*\bid="%s"[^>]*>' % re.escape(container_id), html)
    if not m:
        raise SystemExit('No encontré id="%s" en index.html' % container_id)
    tag, start = m.group(1), m.end()
    depth, pos = 1, start
    tok = re.compile(r'<(/?)%s\b[^>]*>' % tag)
    while depth:
        t = tok.search(html, pos)
        if not t:
            raise SystemExit('Contenedor id="%s" sin cerrar' % container_id)
        depth += -1 if t.group(1) else 1
        pos = t.end()
    end = t.start()
    return html[:start] + block + '\n      ' + html[end:]


def stamp_wa_links(html, number, text):
    """Pone un href real de wa.me en cada botón de WhatsApp.

    main.js los reescribe al cargar (y según el idioma), pero si el JS nunca
    llega, estos href en español son lo que queda. Sin esto, un fallo de red
    dejaba los botones apuntando a "#".
    """
    kinds = [('js-wa-keratina', 'keratina'), ('js-wa-unas', 'unas'),
             ('js-wa-plain', 'plain'), ('id="waBook"', 'plain'), ('id="cartBtn"', 'plain')]

    def url(kind):
        return 'https://wa.me/%s?text=%s' % (number, quote(text[kind]['es'], safe="!'()*"))

    def fix(m):
        tag = m.group(0)
        kind = next((k for marker, k in kinds if marker in tag), None)
        if kind is None:
            return tag
        tag = re.sub(r'href="[^"]*"', 'href="%s"' % url(kind), tag, count=1)
        if 'target=' not in tag:
            tag = tag[:-1] + ' target="_blank" rel="noopener">'
        return tag

    return re.sub(r'<a\s[^>]*>', fix, html)


ASSETS = ['css/style.css', 'js/data.js', 'js/i18n.js', 'js/main.js']
SUBPAGES = ['keratina/index.html', 'unas/index.html']


def bust_cache(html, prefix='', required=ASSETS, page='index.html'):
    """Añade ?v=<hash del contenido> a cada CSS y JS.

    GitHub Pages deja los archivos 10 minutos en caché del navegador. Tras un
    despliegue, un navegador podía traer main.js nuevo con data.js viejo:
    main.js pedía WA_TEXT, el data.js viejo no lo tenía, y la carta dejaba de
    responder. Con el hash en la URL cada versión pide exactamente sus archivos.
    """
    for rel in ASSETS:
        with open(os.path.join(ROOT, *rel.split('/')), 'rb') as fh:
            h = hashlib.sha1(fh.read()).hexdigest()[:10]
        full = prefix + rel
        pat = '(href|src)="%s([?]v=[0-9a-f]*)?"' % re.escape(full)
        html, n = re.subn(pat, lambda m, h=h, full=full: '%s="%s?v=%s"' % (m.group(1), full, h), html)
        if rel in required and n != 1:
            raise SystemExit('Esperaba 1 referencia a %s en %s, encontré %d' % (rel, page, n))
    return html


def main():
    d = load_data()
    html = io.open(INDEX, encoding='utf-8').read()
    html = fill(html, 'services', 'services', services_html(d['SERVICES'], d['CURRENCY']))
    html = fill(html, 'gallery', 'gallery', gallery_html(d['GALLERY']))
    html = fill(html, 'igStrip', 'ig', ig_html(d['IG_POSTS']))
    html = stamp_wa_links(html, d['WA_NUMBER'], d['WA_TEXT'])
    html = bust_cache(html)
    io.open(INDEX, 'w', encoding='utf-8').write(html)
    print('index.html: %d servicios, %d fotos, %d posts de Instagram'
          % (len(d['SERVICES']), len(d['GALLERY']), len(d['IG_POSTS'])))

    # Páginas de servicio: estáticas y sin JS. Solo necesitan los href de
    # WhatsApp y el sello de versión del CSS.
    for sp in SUBPAGES:
        path = os.path.join(ROOT, *sp.split('/'))
        page = io.open(path, encoding='utf-8').read()
        page = stamp_wa_links(page, d['WA_NUMBER'], d['WA_TEXT'])
        page = bust_cache(page, prefix='../', required=['css/style.css'], page=sp)
        io.open(path, 'w', encoding='utf-8').write(page)
    print('subpáginas: %s' % ', '.join(SUBPAGES))


if __name__ == '__main__':
    sys.exit(main())
