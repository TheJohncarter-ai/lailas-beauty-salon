#!/usr/bin/env python
"""Escribe los servicios, la galería y la tira de Instagram como HTML estático
dentro de index.html.

Por qué: los rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot) descargan
JavaScript pero no lo ejecutan. Si la carta de precios solo existe cuando corre
main.js, para ellos el salón no tiene precios. Esto también hace que la página
sirva de algo si el JS nunca carga.

La fuente de verdad sigue siendo js/data.js. Después de cambiar un precio:

    python tools/prerender.py
"""
import io
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, 'index.html')
DATA = os.path.join(ROOT, 'js', 'data.js')

NODE_CANDIDATES = [
    'node',
    r'C:\Program Files\nodejs\node.exe',
    '/usr/bin/node', '/usr/local/bin/node',
]


def load_data():
    """Lee js/data.js con Node y devuelve los arreglos como dicts de Python."""
    script = (
        "const d=require(%s);"
        "process.stdout.write(JSON.stringify("
        "{SERVICES:d.SERVICES,GALLERY:d.GALLERY,IG_POSTS:d.IG_POSTS,CURRENCY:d.CURRENCY}));"
        % json.dumps(DATA.replace('\\', '/'))
    )
    last = None
    for node in NODE_CANDIDATES:
        try:
            out = subprocess.run([node, '-e', script], capture_output=True, check=True)
            return json.loads(out.stdout.decode('utf-8'))
        except Exception as e:      # noqa: BLE001 - probamos el siguiente node
            last = e
    raise SystemExit('No pude ejecutar Node para leer js/data.js: %s' % last)


def esc(t):
    return (str(t).replace('&', '&amp;').replace('<', '&lt;')
            .replace('>', '&gt;').replace('"', '&quot;'))


def money(n, cur):
    return cur + format(n, ',d')


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
                       esc(s['sub']), esc(s['desc']), price, s['mins'])
        )
    return '\n        '.join(rows)


def gallery_html(gallery):
    out = []
    for i, g in enumerate(gallery):
        out.append(
            '<figure class="gitem %s" data-i="%d" tabindex="0" role="button" '
            'aria-label="Ver foto: %s">'
            '<img src="assets/img/work/%s-sm.jpg" alt="%s — en Laila\u2019s Beauty Salon" '
            'loading="lazy" decoding="async" draggable="false">'
            '<figcaption class="gitem__cap"><span>%s</span><span>%s</span></figcaption>'
            '</figure>' % (g['size'], i, esc(g['cap']), esc(g['src']),
                           esc(g['cap']), esc(g['cap']), esc(g['type']))
        )
    return '\n        '.join(out)


def ig_html(posts):
    return '\n        '.join(
        '<a href="%s" target="_blank" rel="noopener" aria-label="Ver publicación en Instagram">'
        '<img src="assets/img/work/%s-sm.jpg" alt="" loading="lazy" decoding="async"></a>'
        % (esc(p['url']), esc(p['img'])) for p in posts
    )


def replace_block(html, container_id, marker, inner):
    """Reemplaza todo lo que hay dentro del contenedor, conservando el marcador."""
    open_at = html.index('id="%s"' % container_id)
    start = html.index('>', open_at) + 1
    end = html.index('</', start)
    return html[:start] + '<!--PRERENDER:%s-->\n        %s\n      ' % (marker, inner) + html[end:]


def main():
    d = load_data()
    html = io.open(INDEX, encoding='utf-8').read()
    html = replace_block(html, 'services', 'services', services_html(d['SERVICES'], d['CURRENCY']))
    html = replace_block(html, 'gallery', 'gallery', gallery_html(d['GALLERY']))
    html = replace_block(html, 'igStrip', 'ig', ig_html(d['IG_POSTS']))
    io.open(INDEX, 'w', encoding='utf-8').write(html)
    print('index.html: %d servicios, %d fotos, %d posts de Instagram'
          % (len(d['SERVICES']), len(d['GALLERY']), len(d['IG_POSTS'])))


if __name__ == '__main__':
    sys.exit(main())
