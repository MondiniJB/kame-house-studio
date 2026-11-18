// Productos de merch: los usan las tarjetas del inicio y las páginas /merch/<slug>.
// pedido: cómo se nombra en el mensaje de WhatsApp. i18n: clave del nombre en public/js/i18n.js (null si es igual en los dos idiomas).
// pos: encuadre de la foto cuando se recorta (object-position), por ejemplo '50% 0' para que no se corte arriba.
// img: nombre en public/assets/media (hay versiones de 450 y 900 px, todas de 900 × 1200).
// extra: segunda imagen opcional de la página del producto: nombre, anchos que genera tools/imagenes.py, y ancho y alto de la más grande.
export const MERCH = [
  { slug: 'chomba', pedido: 'la chomba', nombre: 'Chomba', i18n: 'm.3', img: 'merch-chomba', w: 900, h: 1200, pos: '50% 0',
    extra: { img: 'merch-chomba-tecnico', anchos: [900, 1600], w: 1600, h: 634, alt: 'Chomba de Kame House: frente, espalda y costados' } },
  { slug: 'stickers', pedido: 'los stickers', nombre: 'Stickers', i18n: null, img: 'merch-stickers', w: 900, h: 1200 },
  { slug: 'mouse-pad', pedido: 'el mouse pad', nombre: 'Mouse pad', i18n: null, img: 'merch-mouse-pad', w: 900, h: 1200 },
  { slug: 'cd', pedido: 'el CD "Archive"', nombre: 'CD "Archive"', i18n: null, img: 'merch-cd', w: 900, h: 1200,
    extra: { img: 'merch-cd-trasera', anchos: [685], w: 685, h: 730, alt: 'Contratapa del CD "Archive" con la lista de temas' } },
];

// WhatsApp del estudio (de ejemplo, ver TAREAS.md). El mismo número está en public/js/reservar.js.
export const WA = '5491112345678';
