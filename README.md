# Kame House Estudio

Web institucional de **Kame House Estudio**, estudio de grabación, mezcla y mastering de música urbana en Chacarita, CABA. Es parte de la tesis de Diseño Gráfico (UAI, 2026) de Rocco Cámpora y Juan Bautista Mondini.

Esta es la **opción E** de los bocetos: la base de D con la estructura de C, la paleta de B y los detalles tipográficos tipo grafiti. Es un sitio estático, sin framework ni paso de build.

## Cómo verlo

Abrí `index.html` en el navegador, o levantá un servidor local:

```bash
python -m http.server 8000
# http://localhost:8000
```

## Estructura

```
index.html            las tres vistas: inicio, artistas y reservar
css/styles.css        tokens, secciones y componentes
js/core.js            router por hash, ES/EN, scroll con Lenis, escenas de scroll, menú, formularios
js/main.js            lógica de la home: artistas, configurador, mux, tira de sesiones, reserva
assets/brand/         isotipo, imagotipos, favicon y patrón de isotipos (SVG)
assets/js/            Lenis 1.3.27 (scroll con inercia), copia local
assets/fonts/         Gang of Three (go3v2.ttf), tipografía base del logo
assets/media/         portadas de los temas y capturas de reels del Instagram del estudio
```

Las vistas se cambian con el hash (`#inicio`, `#artistas`, `#reservar`). `#estudio`, `#servicios`, `#sesiones` y `#merch` no son páginas: llevan a su sección dentro de la home (ver `ALIAS` en `js/core.js`).

## Sistema visual

- **Colores:** negro `#1d1d1b`, violeta `#73378c`, blanco, y papel `#f4f2f6` como segundo claro. Las secciones alternan negro, blanco, papel y violeta.
- **Contraste:** el violeta nunca es texto sobre negro (2,1:1). Sobre oscuro el texto es blanco; el violeta se usa en campos, bandas y botones con texto blanco. El violeta como texto solo va sobre blanco o papel (7,9:1).
- **Tipografías:** Gang of Three en títulos de sección, Archivo en UI y subtítulos, Instrument Sans en texto, Sedgwick Ave Display como firma de calle (stickers). Archivo, Instrument Sans y Sedgwick se cargan desde Google Fonts.
- **Marca:** el logo no se deforma, recolorea ni rota. El patrón de isotipos aparece solo en la banda del footer.
- **Movimiento:** escenas ligadas al scroll solo en pantallas anchas y sin `prefers-reduced-motion`; en mobile y con movimiento reducido pasan a listas y tiras con swipe.

## Alcance y créditos del material

Es un proyecto académico de tesis, sin fines comerciales ni publicitarios.

- **Portadas y reels** (`assets/media/`): las portadas pertenecen a sus artistas y las capturas de reels provienen del Instagram del estudio (`@estudiokamehouse`) y de All Santoz. Se usan solo para ilustrar el boceto. El detalle está en `assets/media/README.md`.
- **Lenis** (`assets/js/lenis.min.js`): librería de scroll suave de Darkroom Engineering, licencia MIT. Con movimiento reducido no se activa.
- **Gang of Three** (`assets/fonts/go3v2.ttf`): tipografía de Vic Fieger (2007), base del logo según el manual de marca.
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
- el formulario de reserva todavía no envía datos a ningún lado

## Bocetos anteriores

Los bocetos A, B, C y D siguen publicados como artifacts y no forman parte de este repo.
