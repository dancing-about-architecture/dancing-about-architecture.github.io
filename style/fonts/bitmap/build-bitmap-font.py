"""Export the hand-drawn 100/150/200 strikes into bitmap-glyphs.js.

Run: fontforge -lang=py -script style/fonts/bitmap/build-bitmap-font.py
Reads bitmap-100.sfd, 150.sfd, 200.sfd (never modified) and writes
style/bitmap-glyphs.js. No font file is produced: the dropdowns render
exclusively as canvas fillRects from this data, because only pixels
painted in the page itself stay harsh black-and-white (a font file would
be smoothed by the renderer). Undrawn glyphs fall back to monospace text.

Coverage contract: every strike must draw exactly the 100 strike's
glyph set. Extras are dropped with a warning; a strike missing a glyph
aborts the build, so the canvas renderer never has holes at any scaling.
"""

import fontforge
import glob
import json
import os
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_JS = os.path.normpath(os.path.join(HERE, '..', '..', 'bitmap-glyphs.js'))

# label, source, pixel size, synthesized space advance. Space advances are
# the 100 strike's 3px scaled up, halves rounded upward (4.5 -> 5): empty
# glyphs never reach the BDF, so space/NBSP are synthesized per strike.
STRIKES = (
    ('100', 'bitmap-100.sfd', 11, 3),
    ('150', '150.sfd', 17, 5),
    ('200', '200.sfd', 22, 6),
)


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


def parse_bdf_metrics(path):
    """Return (ascent, descent) from the BDF header properties."""
    ascent = descent = None
    with open(path) as handle:
        for line in handle:
            word = line.split()
            if len(word) == 2 and word[0] == 'FONT_ASCENT':
                ascent = int(word[1])
            elif len(word) == 2 and word[0] == 'FONT_DESCENT':
                descent = int(word[1])
    if ascent is None or descent is None:
        raise SystemExit('missing FONT_ASCENT/FONT_DESCENT in %s' % (path,))
    return ascent, descent


def row_bits(value, width, digits):
    return [(value >> (digits * 4 - 1 - i)) & 1 for i in range(width)]


def spec_to_js(spec):
    digits = (spec['w'] + 7) // 8 * 2
    return {
        'dw': spec['dwidth'],
        'w': spec['w'],
        'h': spec['h'],
        'x': spec['xoff'],
        'y': spec['yoff'],
        'r': [format(value, '0%dX' % digits) for value in spec['rows']],
    }


def build_strike(label, source, size, space_advance, workdir, base_encodings):
    strikedir = os.path.join(workdir, label)
    os.mkdir(strikedir)
    font = fontforge.open(os.path.join(HERE, source))
    if font.em != 1000:
        raise SystemExit('%s: expected 1000 UPM, found %r' % (source, font.em))
    if tuple(font.bitmapSizes) != (size,):
        raise SystemExit('%s: expected one %dpx strike, found %r'
                         % (source, size, font.bitmapSizes))
    bdf_path = export_bdf(font, strikedir)
    font.close()
    specs = parse_bdf(bdf_path)
    ascent, descent = parse_bdf_metrics(bdf_path)
    if ascent + descent != size:
        raise SystemExit('%s: ascent %d + descent %d != %dpx strike'
                         % (source, ascent, descent, size))

    encodings = {spec['encoding'] for spec in specs.values()}
    if base_encodings is None:
        base_encodings = encodings
    else:
        for extra in sorted(encodings - base_encodings):
            print('warning: %s draws U+%04X, outside the 100 set; dropped'
                  % (source, extra))
        missing = sorted(base_encodings - encodings)
        if missing:
            raise SystemExit(
                '%s lacks 100-set glyphs: %s'
                % (source, ' '.join('U+%04X' % c for c in missing)))

    glyphs = {}
    for spec in specs.values():
        if spec['encoding'] not in base_encodings:
            continue
        glyphs[str(spec['encoding'])] = spec_to_js(spec)
    glyphs[str(0x20)] = {'dw': space_advance}
    glyphs[str(0xA0)] = {'dw': space_advance}
    # One extra strike pixel after every 150% glyph, including spaces.
    # Apply at export so repeated builds preserve the authored SFD metrics.
    if label == '150':
        for glyph in glyphs.values():
            glyph['dw'] += 1
    print('%s: %d glyphs, %dpx strike, ascent %d descent %d, space %dpx'
          % (source, len(glyphs), size, ascent, descent, glyphs[str(0x20)]['dw']))
    strike = {'scale': int(label), 'ascent': ascent, 'descent': descent,
              'glyphs': glyphs}
    return strike, base_encodings


def main():
    workdir = tempfile.mkdtemp(prefix='daa-strikes-')
    strikes = {}
    base_encodings = None
    for label, source, size, space_advance in STRIKES:
        strike, base_encodings = build_strike(
            label, source, size, space_advance, workdir, base_encodings)
        strikes[label] = strike
    with open(OUT_JS, 'w') as handle:
        handle.write('// Generated from bitmap-100.sfd, 150.sfd, 200.sfd'
                     ' by build-bitmap-font.py - do not edit.\n'
                     'var DAA_BITMAP_GLYPHS = %s;\n' % json.dumps(strikes))
    print('wrote %s (%d bytes)' % (OUT_JS, os.path.getsize(OUT_JS)))


if __name__ == '__main__':
    main()
