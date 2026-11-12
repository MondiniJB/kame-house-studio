# Fuentes

`go3v2.woff2`: Gang of Three, de Vic Fieger (2007). Es la tipografía base del logo (manual de marca, página 13) y en el sitio se usa en los títulos. `css/styles.css` la carga desde acá y cada página la precarga en el `<head>`; si falta, los títulos usan Archivo.

Está en WOFF2 (8 KB, contra 21 KB del TTF original). El TTF original está en la carpeta de bocetos de la tesis (`bocetos/_src/assets/`, fuera de este repo). Para regenerarla:

```bash
pip install fonttools brotli
python -c "from fontTools.ttLib import TTFont; f=TTFont('go3v2.ttf'); f.flavor='woff2'; f.save('go3v2.woff2')"
```
