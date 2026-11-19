# Tareas

Lista de trabajo de la web. Se trabaja por fases: propuesta → boceto (ASCII o artifact) → aprobación → construcción.
Hecho con Astro y publicado en Vercel con direcciones limpias; local con `npm run dev` (puerto 4321).

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

### Revisión del 2026-11-12
- [x] ~~Se sacó la barra fija "Reservar sesión" del celular en todo el sitio.~~
- [x] ~~Página 404 con la marca (`404.html`), también en el servidor local.~~
- [x] ~~Imagen para compartir `assets/brand/og.jpg` (1200 × 630) y metadatos og/canonical en las cuatro páginas.~~
- [x] ~~Escala tipográfica de 8 tamaños (`--fs-*` en `styles.css`); se borró CSS que no se usaba.~~
- [x] ~~`robots.txt` y `sitemap.xml`.~~
- [x] ~~"Armá tu sesión" con los mismos controles que `/reservar` (varios servicios y cantidad de temas); sigue en la reserva con todo marcado.~~
- [x] ~~Cada reel de Sesiones lleva al Instagram del estudio.~~
- [x] ~~"Hacé tu portada": subir foto (o arrastrarla), silueta de artista grabando mientras no hay foto, y descarga en JPG de 1080 × 1350.~~
- [x] ~~Formulario: rótulos de grupo alineados (padding del legend), espacio después de cada paso, contador parejo y contacto del resumen en una línea.~~
- [x] ~~Imágenes en WebP con varios tamaños (`srcset`), precarga de la foto principal; originales en `assets/media/originales/` y script `tools/imagenes.py`.~~
- [x] ~~Gang of Three en WOFF2 y precargada; Google Fonts sin bloquear el primer pintado.~~
- [x] ~~Lighthouse en las cuatro páginas (mobile / desktop): rendimiento 96-99 / 99-100, accesibilidad, buenas prácticas y SEO 100.~~
- [x] ~~Se borró `furgoneta-neon.jpg`.~~
- [x] ~~Paso a Astro: `<head>`, nav, menú, footer y sprite se escriben una sola vez (`src/layouts`, `src/components`); versión de CSS/JS automática en cada build.~~
- [x] ~~Títulos estandarizados: un estilo por nivel (h1, h2, subtítulo, tarjeta) y sin punto final.~~
- [x] ~~Se sacó la palabra grafiti "poderes" del fondo de La casa (no quedan palabras grafiti en el sitio).~~
- [x] ~~La sección Sesiones pasa a llamarse Redes (`/#redes`).~~ (2026-11-17)
- [x] ~~Página simple para cada prenda de merch (`/merch/buzo`, `/gorra`, `/chomba`, `/lanyard`): foto, nombre, "Pedir por WhatsApp", y debajo solo "Vení a la casa" y el footer.~~ (2026-11-17)
- [x] ~~`/artistas`: el panel de cada artista muestra su foto (o un recuadro con el nombre) y debajo la lista de sus temas, en lugar del vinilo.~~ (2026-11-17)
- [x] ~~Footer: WhatsApp y mail debajo del Instagram; "Diseñado por" pasa a ser solo texto.~~ (2026-11-17)
- [x] ~~Cintas nuevas: "Kame House Estudio" (blanca) y "Grabación · Mezcla · Mastering · Producción · Lanzamientos" (negra); Chacarita solo en la historia, la dirección, el footer y los metadatos.~~ (2026-11-17)

- [x] ~~Deploy con Astro en Vercel: `/estudio`, `/artistas`, `/reservar` y `/merch/*` abren sin `.html` y una dirección inventada muestra la 404.~~ (2026-11-18)

### Decisiones de diseño anotadas en Notion (revisadas en el código el 2026-11-18)
- [x] ~~Base visual de la propuesta C con la paleta de B y la tipografía grafiti de D (Gang of Three en los títulos).~~
- [x] ~~Módulo musical lateral que acompaña la navegación (el mux de faders del inicio, `src/components/Nav.astro`).~~
- [x] ~~Más protagonismo del identificador de marca en el inicio (isotipo del hero).~~
- [x] ~~Módulo "Armá tu sesión".~~
- [x] ~~Artistas: lista vertical, selección violeta, nombres grandes en Gang of Three y paso a horizontal para recorrer los temas.~~
- [x] ~~Historia del estudio (La casa en el inicio y `/estudio`).~~
- [x] ~~Servicios revisados, Sesiones (hoy Redes) y "Hacé tu portada".~~
- [x] ~~Merch con productos grandes y efecto violeta al pasar el mouse.~~
- [x] ~~Sección de despedida ("Vení a la casa") y footer revisados.~~
- [ ] "Así es una sesión": no está en el sitio. Era "Cómo trabajamos", que se sacó a propósito. Confirmar con Rocco si queda afuera o vuelve.

## Pendiente

### Entrega de Taller de Tesis (jueves 19/11/2026, 10:00; archivos listos el miércoles 18 a la noche)
Para esta entrega importan el mapa del sitio, las capturas, la versión para celular y la fundamentación. Lo que tiene que pasar el estudio puede figurar como pendiente sin frenar la entrega.
- [x] ~~Mapa del sitio completo, con la estructura y la navegación reales.~~ (2026-11-18, en `../anexo-web/`)
- [x] ~~Capturas de las secciones principales, en escritorio y en celular.~~ (2026-11-18, en `../capturas/`)
- [x] ~~Fundamentación del diseño visual, la estructura, la navegación y las decisiones de interfaz.~~ (2026-11-18, `../anexo-web/textos-pagina-web.md`)
- [x] ~~Armar el material para las páginas 47, 48 y 49 del Anexo de Taller de Tesis.~~ (2026-11-18, `../anexo-web/paginas-web-24-26.pdf`; falta que lo revisen Juan y Rocco)
- [ ] Probar la escena de artistas del inicio con el trackpad de una notebook (el paso por gesto puede sentirse a saltos).
- [ ] Revisar los textos y la traducción al inglés, mejor con alguien que hable el idioma.

### Datos que tiene que pasar el estudio (hoy son de ejemplo)
- [ ] Teléfono, WhatsApp, mail y dirección reales (en `src/components/Closer.astro`, `src/components/Footer.astro`, `src/data/merch.js`, `src/pages/reservar.astro` y `public/js/reservar.js`).
- [ ] Link de cada reel de Redes (hoy las cuatro tarjetas llevan al perfil de Instagram, no al post).
- [ ] Cómo se vende el merch: hoy cada página de merch tiene "Pedir por WhatsApp". Si hay tienda online, cambiar el botón por el link.
- [ ] Roles y años de cada artista y tema.
- [ ] Nombre y catálogo del sello (la sección El sello hoy es un párrafo).
- [ ] Condiciones del alquiler de sala.

### Material propio
Hecho el 2026-11-18:
- [x] ~~Hero del inicio: foto real de la sala del Instagram del estudio (1440 × 1440, se recorta sola en escritorio y celular).~~
- [x] ~~Servicios › Grabación: artista grabando con luz cálida (la foto que se usó en el post 4).~~
- [x] ~~Fotos de perfil en `/artistas`: los 11 (Skrillex, Feid, YSY A, Bhavi, Asan, Khea, Midel, J Rei, Neo Pistea, Taichu y Zecca).~~

Material descartado (no va en la web): posts de Instagram, la furgoneta, la camioneta, `atras`, los pósters, el cartel urbano y la foto de Firefly Upscaler.

Por página y sección:
- [x] ~~La casa (inicio y `/estudio`): foto real de la sala con luz azul y el Grammy en la consola.~~ (2026-11-18)
- [ ] Inicio › Servicios: Mezcla, Mastering, Producción y Sala siguen con fotos de Pexels.
- [ ] Inicio › Redes: sumar las miniaturas de reels nuevas (hoy hay cinco; el quinto, "Entra YSY A", se sumó el 2026-11-18). Los posts de Instagram no van.
- [x] ~~Vení a la casa: recorte de la foto real de la sala (micrófono, monitor y consola).~~ (2026-11-18)
- [x] ~~Merch: chomba (mockup con dibujo técnico en su página), stickers, mouse pad y CD "Archive" (con la contratapa en su página). Se sacaron buzo, gorra y lanyard (`/merch/buzo`, `/gorra` y `/lanyard` ya no existen). Las fotos de merch van con su color real (sin el 50 % → 80 % de saturación, que queda solo en Servicios).~~ (2026-11-18)
- [x] ~~Estudio › Encabezado y hero del inicio: foto real de la sala ampliada (`sala-frente`), en Estudio encuadrada entre la tele y la consola. Sin el desenfoque fijo y con la capa negra más liviana.~~ (2026-11-18)
- [ ] Estudio › Mariano Bilinkis: hoy es un recorte del reel "Consejo N4" sin el título ni las vistas (388 × 485 px, se ve algo blando). Falta un retrato real. El tríptico tiene una foto suya: pedirle a Rocco el archivo original.
- [x] ~~Estudio › La sala: la foto repetida (`historia-sala`, igual a `reel-sala`) se cambió por un recorte de la foto de la sala del hero.~~ (2026-11-18)
- [ ] Artistas › Créditos: si se suma un artista, la foto va como JPG vertical 4:5 de 720 px de ancho o más en `originales/art-<nombre>.jpg`; correr `python tools/imagenes.py` y anotarla en `KH.FOTOS` (`public/js/data.js`).
- [x] ~~Reservar › Encabezado: onda de sonido de fondo (la del tríptico), a su tamaño real y repetida en espejo, teñida de violeta con el centro blanco y apoyada abajo para no pisar el título.~~ (2026-11-18)
- [x] ~~Archivo (`/artistas`): la misma onda de sonido que Reservar en la portada.~~ (2026-11-18)
- [x] ~~Portadas de Estudio, Archivo y Reservar con el mismo alto (el de Reservar: 351 px en escritorio, 350 en celular). En Archivo, en pantallas anchas, los filtros van a la derecha de la bajada.~~ (2026-11-18)
- [x] ~~Estudio › Mariano Bilinkis: recorte del reel sin el título "Consejo N4" ni las vistas.~~ (2026-11-18)
- [x] ~~Estudio › Encabezado: la foto de Sala de Servicios.~~ (2026-11-18)
- [x] ~~`/estudio` más corta: menos aire entre secciones y la foto de Mariano en 4:5 (de 4661 a 4104 px en escritorio).~~ (2026-11-18)
- [x] ~~Redes: las tarjetas de reels usan la proporción nativa de las capturas (456 × 724) en lugar de 9:16; mismo alto, un poco más anchas.~~ (2026-11-18)
- [x] ~~Merch: la chomba se encuadra desde arriba (no se corta la cabeza); el mouse pad y el CD se ven enteros, con margen.~~ (2026-11-18)
- [x] ~~Artistas: el título "Créditos" pasa a ser "Archivo" (EN: Archive); el link del inicio dice "Ver el archivo completo".~~ (2026-11-18)
- [ ] Estudio › El sello: decidir si muestra el CD "Archive" con un botón a `/merch/cd`.
- [ ] Imagen para compartir (`og.jpg`): rehacerla con la foto real de la sala.
- [ ] Video corto en loop para el hero (opcional).
- [ ] Revisar todas las fotos del sitio y cambiar las que no convenzan (a elección de Bauti y Rocco).

### Opcional
- [ ] Vinilos de "Hecho en Kame House": link para escuchar cada tema (Spotify o YouTube).

### Técnico
- [ ] Si el sitio pasa a otro dominio, cambiar `https://kame-house-studio.vercel.app` en los `<head>`, `robots.txt` y `sitemap.xml`.
- [ ] Probar en Safari, Firefox y un celular real (hasta ahora, solo Chrome).
- [ ] Accesibilidad: recorrer con teclado las escenas fijadas (artistas, redes) y el carrusel; revisar contraste de los grises.
