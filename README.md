# Kame House Estudio

Web institucional de **Kame House Estudio**, estudio de grabación, mezcla y mastering de música urbana en Chacarita, CABA. Es parte de la tesis de Diseño Gráfico (UAI, 2026) de Rocco Cámpora y Juan Bautista Mondini.

Esta es la **opción E** de los bocetos: la base de D con la estructura de C, la paleta de B y los detalles tipográficos tipo grafiti. Está hecha con [Astro](https://astro.build): la nav, el menú, el footer y el `<head>` se escriben una sola vez y Astro arma un HTML estático por página. En el navegador no corre nada de Astro: el resultado es HTML, CSS y JS comunes.

## Cómo trabajar

Hace falta Node 22.23 o más nuevo.

```bash
npm install        # la primera vez
npm run dev        # http://localhost:4321, se actualiza solo al guardar
npm run build      # genera el sitio final en dist/
npm run preview    # sirve dist/ para revisarlo antes de subir
```

Las versiones de CSS y JS (`?v=…`) se generan solas en cada build: no hace falta tocarlas.

## Publicación y direcciones

El sitio se publica en **Vercel**, que corre `npm run build` en cada push y publica `dist/` (todo eso está fijado en `vercel.json`, junto con las direcciones limpias). Cada página se genera como `.html`, pero se navega sin la extensión.

| Dirección | Página |
|---|---|
| `/` | `src/pages/index.astro` |
| `/estudio` | `src/pages/estudio.astro` |
| `/artistas` | `src/pages/artistas.astro` |
| `/reservar` | `src/pages/reservar.astro` (acepta `?servicio=` una o varias veces, `?temas=`, `?aka=`, `?tema=`) |
| cualquier otra | `src/pages/404.astro` |

Servicios, Redes y Merch no son páginas: son secciones del inicio (`/#servicios`, `/#redes`, `/#merch`).

## Estructura

```
src/layouts/Base.astro       <head> (título, descripción, datos para compartir, precargas), sprite, nav, footer y scripts
src/components/Nav.astro     nav, menú del celular y mux de secciones (solo en el inicio)
src/components/Footer.astro  pie de página
src/components/Sprite.astro  isotipo, isologotipo horizontal e íconos (<use href="#id">)
src/pages/*.astro            el contenido de cada página; arriba de todo, sus datos (título, scripts, etc.)
public/                      se publica tal cual:
  css/styles.css             tokens, secciones y componentes
  js/core.js                 compartido: ES/EN, scroll con Lenis, escenas de scroll, nav, menú, anclas, formularios
  js/i18n.js                 textos en inglés
  js/data.js                 temas grabados y la tarjeta de vinilo de cada uno
  js/coverflow.js            carrusel coverflow invertido de los temas (scroll, arrastre, flechas, teclado)
  js/home.js                 inicio: artistas, coverflow, Armá tu sesión, redes, mux
  js/portada.js              Hacé tu portada: foto, silueta, textos y descarga en JPG de 1080 × 1350
  js/artistas.js             créditos: lista, filtros, vista previa y carrusel
  js/reservar.js             reserva: datos que llegan del inicio, resumen en vivo, validación y envío
  js/pagina.js               arranque para páginas sin lógica propia (Estudio, 404)
  assets/brand/              isotipo, isologotipos, favicon, patrón de isotipos (SVG) e imagen para compartir (og.jpg)
  assets/js/                 Lenis 1.3.27 (scroll con inercia), copia local
  assets/fonts/              Gang of Three (go3v2.woff2), tipografía base del logo
  assets/media/              fotos en WebP
  robots.txt, sitemap.xml    para buscadores
originales/                  JPG originales de las fotos (no se publican)
tools/imagenes.py            genera los WebP de public/assets/media desde originales/ (python tools/imagenes.py)
tools/og.py, og.html         generan la imagen para compartir (usa Chrome)
astro.config.mjs             configuración de Astro (sitio estático, un .html por página)
vercel.json                  build en Vercel y direcciones limpias
```

Para cambiar la nav, el menú o el footer se edita el componente y cambia en todas las páginas. Los textos en inglés siguen en `public/js/i18n.js`.

## Sistema visual

- **Colores:** negro `#181818`, violeta `#73378c`, blanco, y papel `#f4f2f6` como segundo claro. Las secciones alternan negro, blanco, papel y violeta.
- **Contraste:** el violeta nunca es texto sobre negro (2,1:1). Sobre oscuro el texto es blanco; el violeta se usa en campos, bandas y botones con texto blanco. El violeta como texto solo va sobre blanco o papel (7,9:1).
- **Tipografías:** Gang of Three en títulos de sección, Archivo en UI y subtítulos, Instrument Sans en texto, Sedgwick Ave Display como firma de calle (stickers). Archivo, Instrument Sans y Sedgwick se cargan desde Google Fonts.
- **Tamaños de letra:** ocho, definidos en `public/css/styles.css` (`--fs-display`, `--fs-title`, `--fs-subtitle`, `--fs-card`, `--fs-lead`, `--fs-body`, `--fs-s`, `--fs-xs`). No se escriben tamaños sueltos: todo usa esas variables.
- **Marca:** el logo no se deforma, recolorea ni rota. El patrón de isotipos aparece solo en la banda del footer.
- **Movimiento:** escenas ligadas al scroll solo en pantallas anchas y sin `prefers-reduced-motion`; en mobile y con movimiento reducido pasan a listas y tiras con swipe.

## Alcance y créditos del material

Es un proyecto académico de tesis, sin fines comerciales ni publicitarios.

- **Portadas y reels** (`public/assets/media/`): las portadas pertenecen a sus artistas y las capturas de reels provienen del Instagram del estudio (`@estudiokamehouse`) y de All Santoz. Se usan solo para ilustrar el boceto. El detalle está en `public/assets/media/README.md`.
- **Lenis** (`public/assets/js/lenis.min.js`): librería de scroll suave de Darkroom Engineering, licencia MIT. Con movimiento reducido no se activa.
- **Gang of Three** (`public/assets/fonts/go3v2.woff2`): tipografía de Vic Fieger (2007), base del logo según el manual de marca.
- **Identidad visual:** diseño de Rocco Cámpora y Juan Bautista Mondini para la tesis.

## Datos sin confirmar

El sitio ya no muestra marcas internas. Estos datos siguen sin confirmar y hay que cargarlos cuando se tengan:

- roles y años de cada artista y tema; confirmar si Khea va en la lista de artistas
- nombre y catálogo del sello discográfico
- teléfono, mail, dirección y web reales (hoy son de ejemplo)
- canal de YouTube y clips de las sesiones, link de la tienda de merch y fotos de los productos
- foto de Mariano Bilinkis
- condiciones del alquiler de sala y el flujo exacto de una sesión (hoy es genérico)
- URL de la firma "Diseñado por Rocco Cámpora y Juan Bautista Mondini" (hoy `URL_A_DEFINIR`)
- el número de WhatsApp y el mail de la reserva (en `public/js/reservar.js`) son de ejemplo

## Bocetos anteriores

Los bocetos A, B, C y D siguen publicados como artifacts y no forman parte de este repo.
