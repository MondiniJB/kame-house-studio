# Kame House Estudio

Web institucional de **Kame House Estudio**, estudio de grabación, mezcla y mastering de música urbana en Chacarita, CABA. Es parte de la tesis de Diseño Gráfico (UAI, 2026) de Rocco Cámpora y Juan Bautista Mondini.

Esta es la **opción E** de los bocetos: la base de D con la estructura de C, la paleta de B y los detalles tipográficos tipo grafiti. Es un sitio estático, sin framework ni paso de build.

## Publicación y direcciones

El sitio se publica en **Vercel**. `vercel.json` activa las direcciones limpias: cada página es un archivo `.html`, pero se navega sin la extensión.

| Dirección | Archivo |
|---|---|
| `/` | `index.html` |
| `/estudio` | `estudio.html` |
| `/artistas` | `artistas.html` |
| `/reservar` | `reservar.html` (acepta `?servicio=`, `?temas=`, `?beat=`, `?aka=`, `?tema=`) |

Servicios, Sesiones y Merch no son páginas: son secciones del inicio (`/#servicios`, `/#sesiones`, `/#merch`).

## Cómo verlo en la compu

Con direcciones limpias, abrir `index.html` con doble clic no alcanza (los links no encuentran los archivos), y `python -m http.server` tampoco (no sabe que `/reservar` es `reservar.html`). Usá el servidor del repo, que resuelve las direcciones igual que Vercel y no guarda caché:

```bash
python dev-server.py
# http://localhost:4250   (otro puerto: python dev-server.py 8000)
```

Alternativas: `npx serve` o `vercel dev`. `dev-server.py` no se publica (está en `.vercelignore`, igual que `tools/` y los originales de las fotos). Muestra `404.html` en las direcciones que no existen, como Vercel.

Los CSS y JS se cargan con una versión (`?v=…`) en `index.html`: subila en cada cambio para que el navegador no use archivos viejos.

## Estructura

```
index.html            inicio
estudio.html          la casa, Mariano, la sala y el sello
artistas.html         créditos con filtros y vista previa, carrusel de vinilos
reservar.html         pedido de sesión: se envía por WhatsApp o mail
404.html              página de error para direcciones que no existen (usa rutas absolutas)
robots.txt, sitemap.xml  para buscadores
vercel.json           direcciones limpias (cleanUrls)
dev-server.py         servidor local con direcciones limpias (no se publica)
css/styles.css        tokens, secciones y componentes
js/core.js            compartido: ES/EN, scroll con Lenis, escenas de scroll, nav, menú, anclas, formularios
js/i18n.js            textos en inglés
js/data.js            temas grabados y la tarjeta de vinilo de cada uno
js/coverflow.js       carrusel coverflow invertido de los temas (scroll, arrastre, flechas, teclado)
js/home.js            lógica del inicio: artistas, coverflow, Armá tu sesión, sesiones, mux
js/portada.js         Hacé tu portada: foto, silueta, textos y descarga en JPG de 1080 × 1350
js/artistas.js        créditos: lista, filtros, vista previa y carrusel
js/reservar.js        reserva: datos que llegan del inicio, resumen en vivo, validación y envío
js/pagina.js          arranque para páginas sin lógica propia (Estudio, 404)
assets/brand/         isotipo, isologotipos, favicon, patrón de isotipos (SVG) e imagen para compartir (og.jpg)
assets/js/            Lenis 1.3.27 (scroll con inercia), copia local
assets/fonts/         Gang of Three (go3v2.woff2), tipografía base del logo
assets/media/         fotos en WebP; los JPG originales están en assets/media/originales/ (no se publican)
tools/imagenes.py     genera los WebP desde los originales (python tools/imagenes.py)
tools/og.py, og.html  generan la imagen para compartir assets/brand/og.jpg (usa Chrome)
```

Nav, menú, footer y el sprite de íconos están copiados en cada HTML: si se cambian, hay que cambiarlos en los cuatro.

## Sistema visual

- **Colores:** negro `#181818`, violeta `#73378c`, blanco, y papel `#f4f2f6` como segundo claro. Las secciones alternan negro, blanco, papel y violeta.
- **Contraste:** el violeta nunca es texto sobre negro (2,1:1). Sobre oscuro el texto es blanco; el violeta se usa en campos, bandas y botones con texto blanco. El violeta como texto solo va sobre blanco o papel (7,9:1).
- **Tipografías:** Gang of Three en títulos de sección, Archivo en UI y subtítulos, Instrument Sans en texto, Sedgwick Ave Display como firma de calle (stickers). Archivo, Instrument Sans y Sedgwick se cargan desde Google Fonts.
- **Tamaños de letra:** ocho, definidos en `css/styles.css` (`--fs-display`, `--fs-title`, `--fs-subtitle`, `--fs-card`, `--fs-lead`, `--fs-body`, `--fs-s`, `--fs-xs`). No se escriben tamaños sueltos: todo usa esas variables (la única excepción es la palabra grafiti decorativa de La casa).
- **Marca:** el logo no se deforma, recolorea ni rota. El patrón de isotipos aparece solo en la banda del footer.
- **Movimiento:** escenas ligadas al scroll solo en pantallas anchas y sin `prefers-reduced-motion`; en mobile y con movimiento reducido pasan a listas y tiras con swipe.

## Alcance y créditos del material

Es un proyecto académico de tesis, sin fines comerciales ni publicitarios.

- **Portadas y reels** (`assets/media/`): las portadas pertenecen a sus artistas y las capturas de reels provienen del Instagram del estudio (`@estudiokamehouse`) y de All Santoz. Se usan solo para ilustrar el boceto. El detalle está en `assets/media/README.md`.
- **Lenis** (`assets/js/lenis.min.js`): librería de scroll suave de Darkroom Engineering, licencia MIT. Con movimiento reducido no se activa.
- **Gang of Three** (`assets/fonts/go3v2.woff2`): tipografía de Vic Fieger (2007), base del logo según el manual de marca.
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
- el número de WhatsApp y el mail de la reserva (en `js/reservar.js`) son de ejemplo

## Bocetos anteriores

Los bocetos A, B, C y D siguen publicados como artifacts y no forman parte de este repo.
