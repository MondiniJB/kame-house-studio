"""Genera las imágenes del sitio en WebP a partir de los originales.

    python tools/imagenes.py

Lee originales/*.jpg y escribe en public/assets/media/ un WebP por cada ancho
de ANCHOS (nombre-800.webp, nombre-1280.webp...). Las que se muestran a un solo tamaño
salen como nombre.webp. Nunca agranda: si el original es más chico, se omite ese ancho.
Los originales no se publican: Vercel solo sirve lo que Astro genera en dist/.
"""
import os
import sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'originales')
OUT = os.path.join(ROOT, 'public', 'assets', 'media')
CALIDAD = 86  # WebP con pérdida: a 86 no se notan diferencias con el JPG original

# anchos por imagen; None = un solo archivo al tamaño original
ANCHOS = {
    'hero-estudio': [800, 1280, 1440],
    'estudio-sala': [800, 1000],
    'cierre-estudio': [800, 1200, 1600],
    'svc-grabacion': [500, 1000], 'svc-mezcla': [500, 1000], 'svc-mastering': [500, 1000],
    'svc-produccion': [500, 1000], 'svc-sala': [500, 1000],
    'merch-chomba': [450, 900], 'merch-stickers': [450, 900], 'merch-mouse-pad': [450, 900], 'merch-cd': [450, 900],
    'merch-chomba-tecnico': [900, 1600], 'merch-cd-trasera': [685],
    'teca-rmx': [240, 360, 540, 720], 'cinema': [240, 360, 540, 720], 'debo-cambiar': [240, 360, 540, 720], 'serotonina': [240, 360, 540, 720],
    'trapicheo': [240, 360, 540, 720], 'pochoclos': [240, 360, 540, 720], 'neo': [240, 360, 540, 720],
}


def guardar(im, path):
    im.save(path, 'WEBP', quality=CALIDAD, method=6)


def main():
    total_antes = total_despues = 0
    for f in sorted(os.listdir(SRC)):
        name, ext = os.path.splitext(f)
        if ext.lower() not in ('.jpg', '.jpeg', '.png'):
            continue
        src = os.path.join(SRC, f)
        im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
        total_antes += os.path.getsize(src)
        # fotos de artistas (art-*): 360 y 720 px
        anchos = ANCHOS.get(name) or ([360, 720] if name.startswith('art-') else None)
        salidas = []
        if not anchos:
            out = os.path.join(OUT, name + '.webp')
            guardar(im, out)
            salidas.append(out)
        else:
            for w in anchos:
                if w > im.width:
                    continue
                h = round(im.height * w / im.width)
                out = os.path.join(OUT, f'{name}-{w}.webp')
                guardar(im if w == im.width else im.resize((w, h), Image.LANCZOS), out)
                salidas.append(out)
        mayor = os.path.getsize(salidas[-1])
        total_despues += mayor
        print(f'{f:24} {os.path.getsize(src) // 1024:>4} KB -> {mayor // 1024:>4} KB  ({len(salidas)} tamaños)')
    print(f'\nMismo tamaño que el original: {total_antes // 1024} KB -> {total_despues // 1024} KB')


if __name__ == '__main__':
    sys.exit(main())
