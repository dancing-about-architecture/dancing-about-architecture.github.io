"""Enlarge authored cursor PNGs with exact pixel repetition.

Run: python3 style/cursors/build-large-cursors.py
Requires Pillow. The edited 100/150/200 PNGs remain the source of truth.
"""
from pathlib import Path
from PIL import Image

HERE = Path(__file__).resolve().parent
SCALES = {300: (150, 2), 400: (200, 2), 450: (150, 3), 500: (100, 5)}


def main():
    for target, (source, multiple) in SCALES.items():
        for name in ('default', 'click', 'beam'):
            with Image.open(HERE / f'{name}-{source}.png') as image:
                image = image.convert('RGBA')
                size = tuple(value * multiple for value in image.size)
                assert max(size) <= 128, (name, target, size)
                enlarged = image.resize(size, Image.Resampling.NEAREST)
                enlarged.save(HERE / f'{name}-{target}.png')
                print(f'{name}-{target}.png: {size[0]}x{size[1]}')


if __name__ == '__main__':
    main()
