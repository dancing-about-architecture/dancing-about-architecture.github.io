#!/usr/bin/env bash
# Render cursor SVGs to pure black-and-white PNGs at 100%, 150%, 200%.
# Output: <name>-<scale>.png (e.g. click-100.png), containing only
# opaque black, opaque white, and transparent pixels (no gray antialiasing).
set -euo pipefail

cd "$(dirname "$0")"

CURSORS=(beam click default)
SCALES=(100 150 200)

command -v rsvg-convert >/dev/null || { echo "error: rsvg-convert not found" >&2; exit 1; }
if command -v magick >/dev/null; then
  MAGICK=magick
elif command -v convert >/dev/null; then
  MAGICK=convert
else
  echo "error: ImageMagick (magick/convert) not found" >&2; exit 1
fi

TMPD=$(mktemp -d)
trap 'rm -rf "$TMPD"' EXIT

for base in "${CURSORS[@]}"; do
  svg="$base.svg"
  [[ -f "$svg" ]] || { echo "error: missing $svg" >&2; exit 1; }
  w=$(grep -o 'width="[0-9]*"' "$svg" | head -1 | grep -o '[0-9]*')
  h=$(grep -o 'height="[0-9]*"' "$svg" | head -1 | grep -o '[0-9]*')
  for scale in "${SCALES[@]}"; do
    W=$(( (w * scale + 50) / 100 ))
    H=$(( (h * scale + 50) / 100 ))
    out="$base-$scale.png"
    rsvg-convert -w "$W" -h "$H" "$svg" -o "$TMPD/in.png"
    # Threshold RGB to pure black/white and alpha to opaque/transparent.
    # Force transparent pixels to black RGB so output has exactly 3 colors.
    "$MAGICK" "$TMPD/in.png" -colorspace Gray -threshold 50% -alpha off "$TMPD/bw.png"
    "$MAGICK" "$TMPD/in.png" -alpha extract -threshold 50% "$TMPD/mask.png"
    "$MAGICK" "$TMPD/bw.png" "$TMPD/mask.png" -compose Multiply -composite "$TMPD/rgb.png"
    "$MAGICK" "$TMPD/rgb.png" "$TMPD/mask.png" -alpha off -compose CopyOpacity -composite "$out"
    echo "$out: ${W}x${H}"
  done
done
