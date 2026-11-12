# Tareas

Lista de trabajo de la web. Se trabaja por fases: propuesta → boceto ASCII → aprobación → construcción.

## Hecho

- [x] Reemplazar isologotipo horizontal y vertical por la versión corregida (`../marcas/*.svg`). El isotipo queda igual. (2026-11-11)
- [x] Cambiar el negro de marca de `#1d1d1b` a `#181818` (y sus dos superficies: `#222222`, `#2e2e2e`). (2026-11-11)

- [x] Home rehecho (2026-11-11): hero con foto y capa negra, servicios y merch con foto (saturación 50 % → 80 %), cierre con la foto de la camioneta, footer compacto, textos nuevos, Armá tu sesión después de Servicios. Esperando correcciones.
- [x] JS dividido: `core.js` (compartido, sin router), `i18n.js`, `data.js`, `home.js`. `main.js` queda hasta pasar Artistas y Reservar.
- [x] Fotos de stock CC0 (StockSnap y Rawpixel, vía Openverse) en `assets/media/` (`hero-*`, `svc-*`, `merch-*`, `estudio-*`).

- [x] Propuestas en artifact (canvas con mesas de trabajo). Aprobado y pasado al HTML (2026-11-12): botones con barrido y presión, links con subrayado animado, servicios en tarjetas pegadas de anchos distintos, cierre con el contacto en filas gigantes, temas como vinilos (scroll + hover). Se sacó "Cómo trabajamos". Hero, La casa y footer quedan como estaban.

## En propuesta (esperan aprobación del boceto ASCII)

### Estructura
- [ ] Pasar de una sola página con vistas por hash a páginas HTML reales: `index.html`, `estudio.html`, `artistas.html`, `reservar.html`.
- [ ] Rehacer Artistas y Reservar (hoy fallan: el `id="artistas"` de la home choca con la ruta `#artistas` y las escenas de scroll se miden con la vista oculta).
- [ ] Nueva página Estudio (historia, Mariano, sala y equipo, sello).

### Home
- [ ] Hero: mantener el isotipo grande, sumar imagen o video de fondo con capa negra encima.
- [ ] Servicios: imagen dentro de cada tarjeta, saturación 50 % y 80 % en hover.
- [ ] Merch: imagen dentro de cada tarjeta, misma regla de saturación.
- [ ] Cierre ("Vení a la casa"): sacar el isotipo gigante y poner una foto encuadrada a la izquierda.
- [ ] Footer: compactarlo (menos alto, menos columnas, sin banda de patrón gigante).
- [ ] Palabras tipo grafiti (Sedgwick) en pocas secciones, sin repetir.

### Textos
- [ ] Revisión general: más formales pero con onda, sin frases hechas ni tono de IA. ES y EN a la par.

## Material que falta

- [ ] Video corto en loop de la sala (para el hero) o foto en alta de la sala (las actuales son de ~460 px).
- [ ] Fotos para las tarjetas de servicios (grabación, mezcla, mastering, producción, sala).
- [ ] Fotos de los productos de merch (buzo, gorra, chomba, lanyard).
- [ ] Foto de Mariano Bilinkis.

## Datos sin confirmar

Ver la sección "Datos sin confirmar" del [README](README.md).
