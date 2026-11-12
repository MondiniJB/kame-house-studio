# Tareas

Lista de trabajo de la web. Se trabaja por fases: propuesta → boceto (ASCII o artifact) → aprobación → construcción.
Publicación en Vercel con direcciones limpias; local con `python dev-server.py` (puerto 4250).

## Hecho

### Marca
- [x] ~~Reemplazar isologotipo horizontal y vertical por la versión corregida (`../marcas/*.svg`). El isotipo queda igual.~~ (2026-11-11)
- [x] ~~Cambiar el negro de marca de `#1d1d1b` a `#181818` (superficies `#222222` y `#2e2e2e`).~~ (2026-11-11)

### Estructura
- [x] ~~Pasar de una sola página con vistas por hash a páginas reales: `/`, `/estudio`, `/artistas`, `/reservar`.~~ (2026-11-12)
- [x] ~~Direcciones limpias en Vercel (`vercel.json`) y servidor local que las entiende (`dev-server.py`).~~ (2026-11-12)
- [x] ~~JS dividido: `core.js` compartido, `i18n.js`, `data.js`, `coverflow.js` y uno por página. Borrado `main.js`.~~ (2026-11-12)
- [x] ~~Versión `?v=` en CSS y JS para que el navegador no use archivos viejos.~~ (2026-11-12)

### Inicio
- [x] ~~Hero: isotipo (más chico, se ve entero), foto de fondo con capa negra, nav transparente solo en el tope.~~
- [x] ~~"Hecho en Kame House": coverflow invertido con el destacado a la izquierda; cada tema es un vinilo que sigue el scroll (con imán), se arrastra, y se maneja con flechas y teclado.~~
- [x] ~~La casa ampliada (tres párrafos con datos reales).~~
- [x] ~~Servicios: tarjetas con foto (saturación 50 % → 80 % en hover), pegadas y de anchos distintos.~~
- [x] ~~Merch: tarjetas con foto y la misma regla de saturación.~~
- [x] ~~Cierre: foto de estudio a la izquierda y contacto con íconos (el isotipo gigante se sacó).~~
- [x] ~~Footer compacto y patrón de isos más chico.~~
- [x] ~~Botones con barrido de color y presión; links con subrayado animado.~~
- [x] ~~Se sacó "Cómo trabajamos".~~
- [x] ~~Textos revisados: más formales pero con onda, sin frases hechas. ES y EN a la par.~~

### Páginas
- [x] ~~`/reservar`: tres bloques (qué, cuándo, quién), resumen en vivo, validación y envío por WhatsApp o mail con el pedido escrito. Toma lo elegido en el inicio.~~ (2026-11-12)
- [x] ~~`/estudio`: encabezado con foto, La casa, Mariano Bilinkis, La sala (galería), El sello y cierre.~~ (2026-11-12)
- [x] ~~`/artistas`: créditos con filtros, lista con vista previa del vinilo de cada artista (en mobile despliega sus portadas) y el carrusel de vinilos.~~ (2026-11-12)

### Material
- [x] ~~Fotos de stock provisorias de Pexels para hero, servicios, merch, cierre y Estudio (créditos en `assets/media/README.md`).~~

## Pendiente

### Datos que tiene que pasar el estudio (hoy son de ejemplo)
- [ ] Teléfono, WhatsApp, mail y dirección reales (en los cuatro HTML y en `js/reservar.js`).
- [ ] URL de la firma "Diseñado por Rocco Cámpora y Juan Bautista Mondini" (hoy `URL_A_DEFINIR`).
- [ ] Link de cada reel de Sesiones (hoy las tarjetas no llevan al post).
- [ ] Link de la tienda de merch (hoy las tarjetas no hacen nada).
- [ ] Roles y años de cada artista y tema; confirmar si Khea va en la lista.
- [ ] Nombre y catálogo del sello (la sección El sello hoy es un párrafo).
- [ ] Condiciones del alquiler de sala.

### Material propio
- [ ] Foto en alta de la sala o video corto en loop para el hero (las fotos propias son de ~460 px).
- [ ] Fotos para servicios, merch (buzo, gorra, chomba, lanyard) y cierre, para reemplazar las de Pexels.
- [ ] Foto de Mariano Bilinkis (hoy se usa la captura del reel "Consejo N4").

### Diseño y contenido
- [ ] Palabras grafiti: decidir si se suman (hoy solo "poderes") y cuáles.
- [ ] "Hacé tu portada": permitir subir una foto o descargar la portada como imagen.
- [ ] Escena de nombres de artistas en el inicio: probarla con el trackpad de una notebook (el paso por gesto puede sentirse a saltos).
- [ ] Revisar el inglés con alguien que lo hable.

### Técnico
- [ ] Lighthouse: performance, accesibilidad y SEO de las cuatro páginas.
- [ ] Imágenes en WebP con varios tamaños (`srcset`) y precarga de la del hero.
- [ ] Imagen para compartir en redes (`og:image`) y metadatos por página.
- [ ] Probar en Safari, Firefox y un celular real (hasta ahora, solo Chrome).
- [ ] Accesibilidad: recorrer con teclado las escenas fijadas (artistas, sesiones) y el carrusel; revisar contraste de los grises.
- [ ] Nav, menú, footer y sprite están copiados en los cuatro HTML: si se vuelven a cambiar seguido, evaluar Astro para escribirlos una sola vez.
- [ ] Confirmar en Vercel que `/estudio`, `/artistas` y `/reservar` abren sin `.html` y que `/reservar.html` redirige.
