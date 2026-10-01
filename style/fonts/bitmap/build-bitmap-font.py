"""Trace bitmap-100.sfd's 11px strike into web assets.

Run: fontforge -lang=py -script style/fonts/bitmap/build-bitmap-font.py
Reads style/fonts/bitmap/bitmap-100.sfd (never modified) and writes
style/fonts/daa-bitmap.woff plus style/bitmap-glyphs.js, both from the
same BDF parse so the canvas bitmaps and the fallback webfont always agree.

Webfonts cannot promise hard pixels: page CSS cannot force bilevel
rendering (smoothing lives in fontconfig on Linux) and fractional
baselines from flex centering fringe every outline. So the dropdowns'
primary renderer is canvas fillRects from bitmap-glyphs.js (provably hard
black-and-white), and the WOFF only sets labels containing glyphs the
bitmap does not draw. Screen readers read the real DOM text either way.
"""

import fontforge
import glob
import json
import os
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
SRC_SFD = os.path.join(HERE, 'bitmap-100.sfd')
OUT_WOFF = os.path.join(HERE, '..', 'daa-bitmap.woff')
OUT_JS = os.path.join(HERE, '..', '..', 'bitmap-glyphs.js')

UNITS_PER_PIXEL = 80  # 12.5px * 80 / 1000 UPM = exactly 1 CSS px
SPACE_PIXELS = 3  # matches W95FA's space-to-letter ratio, keeps line lengths
FAMILY = 'DAABitmap'
PS_NAME = 'DAABitmap-Regular'


def export_bdf(font, workdir):
    base = os.path.join(workdir, 'bitmap')
    font.generate(base + '.bdf')
    # FontForge inserts the pixel size before the suffix: bitmap-11.bdf.
    paths = glob.glob(base + '-*.bdf')
    if len(paths) != 1:
        raise SystemExit('expected one BDF strike, found: %r' % (paths,))
    return paths[0]


def parse_bdf(path):
    """Return {glyphname: dict(dwidth, w, h, xoff, yoff, rows)}.

    rows are top-to-bottom lists of ints, MSB = leftmost pixel.
    """
    glyphs = {}
    current = None
    in_bitmap = False
    with open(path) as handle:
        for line in handle:
            word = line.split()
            if not word:
                continue
            if word[0] == 'STARTCHAR':
                current = {'name': word[1], 'rows': []}
                in_bitmap = False
            elif word[0] == 'ENCODING':
                current['encoding'] = int(word[1])
            elif word[0] == 'DWIDTH':
                current['dwidth'] = int(word[1])
            elif word[0] == 'BBX':
                current['w'], current['h'], current['xoff'], current['yoff'] = (
                    int(word[1]), int(word[2]), int(word[3]), int(word[4]))
            elif word[0] == 'BITMAP':
                in_bitmap = True
            elif word[0] == 'ENDCHAR':
                glyphs[current['name']] = current
                current = None
            elif in_bitmap and current is not None:
                current['rows'].append(int(line.strip(), 16))
    return glyphs


def runs(bits):
    """Yield (start, end) runs of set bits from a left-to-right bit list."""
    start = None
    for i, bit in enumerate(bits + [0]):
        if bit and start is None:
            start = i
        elif not bit and start is not None:
            yield start, i
            start = None


def row_bits(value, width, digits):
    return [(value >> (digits * 4 - 1 - i)) & 1 for i in range(width)]


def draw_runs(glyph, runs_px):
    pen = glyph.glyphPen()
    units = UNITS_PER_PIXEL
    for x0, x1, y in runs_px:
        pen.moveTo((x0 * units, y * units))
        pen.lineTo((x1 * units, y * units))
        pen.lineTo((x1 * units, (y + 1) * units))
        pen.lineTo((x0 * units, (y + 1) * units))
        pen.closePath()
    pen = None


def trace_glyph(font, spec):
    glyph = font[spec['name']]
    glyph.clear()
    digits = (spec['w'] + 7) // 8 * 2
    rects = []
    for i, value in enumerate(spec['rows']):
        y = spec['yoff'] + spec['h'] - 1 - i
        bits = row_bits(value, spec['w'], digits)
        for x0, x1 in runs(bits):
            rects.append((spec['xoff'] + x0, spec['xoff'] + x1, y))
    draw_runs(glyph, rects)
    glyph.correctDirection()
    # Width last: glyphPen() implicitly clears the glyph, resetting width.
    glyph.width = spec['dwidth'] * UNITS_PER_PIXEL


def add_blank(font, codepoint, name):
    glyph = font.createChar(codepoint, name)
    glyph.clear()
    glyph.width = SPACE_PIXELS * UNITS_PER_PIXEL
    return glyph


def add_notdef(font):
    glyph = font.createChar(-1, '.notdef')
    glyph.clear()
    # Hollow 5x9 box; only reachable if unicode-range ever drifts from cmap.
    draw_runs(glyph, [(0, 5, 0), (0, 5, 8)] +
               [(0, 1, y) for y in range(1, 8)] +
               [(4, 5, y) for y in range(1, 8)])
    glyph.correctDirection()
    glyph.width = 6 * UNITS_PER_PIXEL


def write_glyphs_js(specs):
    """Emit the canvas data file: {codepoint: {dw, w, h, x, y, r}}.

    r holds top-to-bottom hex row strings, MSB = leftmost pixel, exactly
    as parsed from the BDF. Blanks (space, NBSP) carry only an advance.
    """
    glyphs = {}
    for spec in specs.values():
        digits = (spec['w'] + 7) // 8 * 2
        glyphs[str(spec['encoding'])] = {
            'dw': spec['dwidth'],
            'w': spec['w'],
            'h': spec['h'],
            'x': spec['xoff'],
            'y': spec['yoff'],
            'r': [format(value, '0%dX' % digits) for value in spec['rows']],
        }
    glyphs[str(0x20)] = {'dw': SPACE_PIXELS}
    glyphs[str(0xA0)] = {'dw': SPACE_PIXELS}
    payload = {'ascent': 9, 'descent': 2, 'glyphs': glyphs}
    with open(OUT_JS, 'w') as handle:
        handle.write('// Generated from bitmap-100.sfd by build-bitmap-font.py'
                     ' - do not edit.\n'
                     'var DAA_BITMAP_GLYPHS = %s;\n' % json.dumps(payload))
    print('wrote %s (%d bytes)' % (OUT_JS, os.path.getsize(OUT_JS)))


def main():
    font = fontforge.open(SRC_SFD)
    if font.em != 1000:
        raise SystemExit('expected 1000 UPM, found %r' % (font.em,))
    if tuple(font.bitmapSizes) != (11,):
        raise SystemExit('expected one 11px strike, found %r' % (font.bitmapSizes,))

    workdir = tempfile.mkdtemp(prefix='daa-bitmap-')
    specs = parse_bdf(export_bdf(font, workdir))
    print('traced %d bitmap glyphs from %s' % (len(specs), SRC_SFD))
    write_glyphs_js(specs)

    for spec in specs.values():
        trace_glyph(font, spec)
    add_blank(font, 0x20, 'space')
    add_blank(font, 0xA0, 'nbspace')
    add_notdef(font)

    font.fontname = PS_NAME
    font.familyname = FAMILY
    font.fullname = FAMILY + ' Regular'
    font.weight = 'Regular'
    font.version = '1.000'
    font.onlybitmaps = False

    ttf_path = os.path.join(workdir, 'daa-bitmap.ttf')
    font.generate(ttf_path)
    print('wrote %s' % (ttf_path,))

    # WOFF packing needs zlib, not FontForge: delegate to fontTools so this
    # script also works where FontForge lacks its own WOFF writer. gasp 0
    # (neither gridfit nor smoothing, at every size) keeps hinter-equipped
    # renderers from nudging contours: the outlines are already on exact
    # pixel boundaries, so any gridfitting only displaces ink. Browsers
    # follow CSS font-smoothing; gasp covers other tools that honor it.
    convert = os.path.join(workdir, 'to_woff.py')
    with open(convert, 'w') as handle:
        handle.write(
            'from fontTools.ttLib import TTFont\n'
            'font = TTFont(%r)\n'
            'if "gasp" in font:\n'
            '    font["gasp"].gaspRange = {65535: 0}\n'
            'font.flavor = "woff"\n'
            'font.save(%r)\n' % (ttf_path, OUT_WOFF))
    if os.system('python3 %s' % (convert,)):
        raise SystemExit('WOFF conversion failed')
    print('wrote %s (%d bytes)' % (OUT_WOFF, os.path.getsize(OUT_WOFF)))


if __name__ == '__main__':
    main()
