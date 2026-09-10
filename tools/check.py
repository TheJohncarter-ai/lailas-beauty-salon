#!/usr/bin/env python
"""Verifica el sitio. Correlo después de `python tools/prerender.py`:

    python tools/check.py

Revisa, en las tres páginas:
- que cada botón de WhatsApp tenga un enlace real de wa.me (ninguno en "#")
- que el sello de versión del CSS coincida con el hash real del archivo
- que las etiquetas estén balanceadas

Y además:
- que toda clave data-i18n del index tenga traducción al inglés
- que el pre-render sea idempotente (correrlo dos veces da lo mismo)
- escribe dos páginas de prueba, ignoradas por git, para ver los modos de
  falla con el servidor local:
    _test_noi18n.html  el index sin js/i18n.js
    _test_nojs.html    el index sin ningún JavaScript

Sale con código 1 si algo falla.
"""
import hashlib
import io
import os
import re
import shutil
import subprocess
import sys
import tempfile
from urllib.parse import unquote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
PAGES = ['index.html', 'keratina/index.html', 'unas/index.html']
TAGS = ['div', 'section', 'a', 'picture', 'ul', 'li', 'details', 'nav',
        'header', 'footer', 'main', 'article']


def rd(p):
    return io.open(p, encoding='utf-8').read()


def anchors(s):
    return re.findall(r'<a\s[^>]*>', s)


def main():
    problems = []
    css_actual = hashlib.sha1(open('css/style.css', 'rb').read()).hexdigest()[:10]

    for page in PAGES:
        s = rd(page)
        a = anchors(s)
        wa = [x for x in a if 'wa.me/' in x]
        dead = [x for x in a if 'href="#"' in x]
        css = re.search(r'css/style\.css\?v=([0-9a-f]+)', s)
        stamp = css.group(1) if css else None
        bad = [t for t in TAGS
               if len(re.findall(r'<%s[\s>]' % t, s)) != len(re.findall(r'</%s>' % t, s))]
        print('%-20s whatsapp=%-2d muertos=%d css=%s %s etiquetas=%s'
              % (page, len(wa), len(dead), stamp,
                 'OK' if stamp == css_actual else 'NO COINCIDE', 'OK' if not bad else bad))
        if dead:
            problems.append('%s tiene %d enlaces muertos' % (page, len(dead)))
        if stamp != css_actual:
            problems.append('%s: el sello del CSS no coincide (¿corriste prerender.py?)' % page)
        if bad:
            problems.append('%s: etiquetas desbalanceadas %s' % (page, bad))
        if page != 'index.html':
            for cls in ('js-wa-keratina', 'js-wa-unas'):
                hits = [x for x in wa if cls in x]
                if hits:
                    msg = unquote(re.search(r'text=([^"]+)"', hits[0]).group(1))
                    print('    %s x%d -> %s' % (cls, len(hits), msg))

    s = rd('index.html')
    i18n = rd('js/i18n.js')
    en_block = i18n[i18n.index('window.I18N_EN'):i18n.index('window.I18N_ES')]
    en_keys = set(re.findall(r"'([a-zA-Z0-9_.]+)'\s*:", en_block))
    used = set(re.findall(r'data-i18n(?:-ph|-al)?="([^"]+)"', s))
    missing = sorted(used - en_keys)
    print('claves data-i18n: %d usadas, sin inglés: %s' % (len(used), missing or 'ninguna'))
    if missing:
        problems.append('faltan traducciones: %s' % missing)

    snap = tempfile.mkdtemp()
    for p in PAGES:
        shutil.copy(p, os.path.join(snap, p.replace('/', '_')))
    subprocess.run([sys.executable, os.path.join('tools', 'prerender.py')], capture_output=True, check=True)
    same = all(open(p, 'rb').read() == open(os.path.join(snap, p.replace('/', '_')), 'rb').read()
               for p in PAGES)
    shutil.rmtree(snap, ignore_errors=True)
    print('pre-render idempotente:', 'sí' if same else 'NO')
    if not same:
        problems.append('el pre-render no es idempotente (algo cambió al correrlo otra vez)')

    s = rd('index.html')
    t1, n1 = re.subn(r'<script src="js/i18n\.js[^"]*"></script>\n?', '', s)
    io.open('_test_noi18n.html', 'w', encoding='utf-8').write(t1)
    t2, n2 = re.subn(r'<script src="js/[^"]+"></script>\n?', '', s)
    t2 = t2.replace("<script>document.documentElement.classList.add('js')</script>\n", '')
    io.open('_test_nojs.html', 'w', encoding='utf-8').write(t2)
    print('páginas de prueba: _test_noi18n.html (%d script quitado), _test_nojs.html (%d quitados)' % (n1, n2))

    print('\nRESULTADO:', 'TODO BIEN' if not problems else 'PROBLEMAS -> ' + '; '.join(problems))
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
