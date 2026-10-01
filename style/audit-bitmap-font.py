#!/usr/bin/env python3
"""Audit the dropdown bitmap-font stack (needs fonttools).

Run: python3 style/audit-bitmap-font.py
Exit status is 1 when a dropdown character would tofu or fall past W95FA
to a generic font, otherwise 0. Characters served by the W95FA fallback are
reported too, so undrawn glyphs stay visible during future edits.
"""
import glob
import html
import re
import sys
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
except ImportError:
    sys.exit('audit-bitmap-font.py needs fonttools: pip install fonttools')

STYLE = Path(__file__).resolve().parent
FONTS_CSS = STYLE / 'fonts' / 'fonts.css'
MVS = STYLE / 'fonts' / 'bitmap' / 'minimum viable character set.txt'


def font_face_block(css, family):
    blocks = re.findall(r'@font-face\s*{([^}]*)}', css, re.S)
    for block in blocks:
        if re.search(r'font-family:\s*"%s"' % re.escape(family), block):
            return block
    raise SystemExit('no @font-face for "%s" in %s' % (family, FONTS_CSS))


def face_src(block, family):
    match = re.search(r'src:\s*url\("([^"]+)"\)', block)
    if not match:
        raise SystemExit('no src url for "%s" in %s' % (family, FONTS_CSS))
    path = FONTS_CSS.parent / match.group(1)
    if not path.exists():
        raise SystemExit('missing %s for "%s"' % (path, family))
    return path


def parse_unicode_range(block, family):
    match = re.search(r'unicode-range:\s*([^;]+);', block, re.S)
    if not match:
        return None
    covered = set()
    for token in re.findall(r'[Uu]\+([0-9A-Fa-f?]+)(?:-([0-9A-Fa-f]+))?',
                            match.group(1)):
        start, end = token
        if '?' in start:
            raise SystemExit('unsupported wildcard in "%s" unicode-range' % family)
        if not end:
            end = start
        covered.update(range(int(start, 16), int(end, 16) + 1))
    return covered


def main():
    css = FONTS_CSS.read_text()
    failures = 0

    bitmap_block = font_face_block(css, 'DAABitmap')
    w95_block = font_face_block(css, 'W95FA')
    bitmap_cmap = set(TTFont(face_src(bitmap_block, 'DAABitmap')).getBestCmap())
    w95_cmap = set(TTFont(face_src(w95_block, 'W95FA')).getBestCmap())

    wanted = {ord(c) for c in MVS.read_text(encoding='utf-8').strip('\n')}
    missing = sorted(wanted - bitmap_cmap)
    if missing:
        failures += 1
        print('FAIL DAABitmap lacks MVS chars: %s'
              % ''.join(chr(c) for c in missing))

    glyphs_js = STYLE / 'bitmap-glyphs.js'
    if not glyphs_js.exists():
        failures += 1
        print('FAIL %s missing; rebuild via build-bitmap-font.py' % glyphs_js)
    else:
        drawn = {int(code) for code in
                 re.findall(r'"(\d+)":\s*\{', glyphs_js.read_text())}
        missing_drawn = sorted(wanted - drawn)
        if missing_drawn:
            failures += 1
            print('FAIL bitmap-glyphs.js lacks MVS chars: %s'
                  % ''.join(chr(c) for c in missing_drawn))

    loader = STYLE.parent / 'GeneratedItems' / 'CSScriptLib.js'
    if 'bitmap-glyphs.js' not in loader.read_text(errors='replace'):
        failures += 1
        print('FAIL CSScriptLib.js does not load bitmap-glyphs.js')

    covered = parse_unicode_range(bitmap_block, 'DAABitmap')
    if covered is None:
        failures += 1
        print('FAIL DAABitmap has no unicode-range; undrawn chars would tofu')
    else:
        if covered - bitmap_cmap:
            failures += 1
            print('FAIL unicode-range reaches past the font: %s'
                  % sorted('U+%04X' % c for c in covered - bitmap_cmap))
        if bitmap_cmap - covered:
            failures += 1
            print('FAIL font has glyphs outside unicode-range: %s'
                  % sorted('U+%04X' % c for c in bitmap_cmap - covered))

    labels = set()
    for page in glob.glob(str(STYLE.parent / 'pages' / '*.html')):
        text = open(page, encoding='utf-8', errors='replace').read()
        for option in re.finditer(r'<option[^>]*>(.*?)</option>', text, re.S | re.I):
            labels.update(html.unescape(re.sub(r'<[^>]+', '', option.group(1))).strip())
    uncovered = sorted(set(map(ord, labels)) - bitmap_cmap - w95_cmap)
    if uncovered:
        failures += 1
        print('FAIL %d option chars fall past W95FA: %s'
              % (len(uncovered), ''.join(chr(c) for c in uncovered)))

    fallback = sorted(set(map(ord, labels)) - bitmap_cmap)
    if fallback:
        print('INFO %d option chars served by W95FA fallback: %s'
              % (len(fallback), ''.join(chr(c) for c in fallback)))
    else:
        print('INFO every option char is drawn in DAABitmap.')
    print('%d option chars checked; %d failures.' % (len(labels), failures))
    return bool(failures)


if __name__ == '__main__':
    raise SystemExit(main())
