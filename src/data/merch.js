// Prendas de merch: las usan las tarjetas del inicio y las páginas /merch/<slug>.
// art: artículo para el mensaje de WhatsApp. i18n: clave del nombre en public/js/i18n.js (null si es igual en los dos idiomas).
// img: nombre en public/assets/media (hay versiones de 450 y 900 px). w y h: tamaño de la de 900.
export const MERCH = [
  { slug: 'buzo', art: 'el', nombre: 'Buzo', i18n: 'm.1', img: 'merch-buzo', w: 900, h: 1479 },
  { slug: 'gorra', art: 'la', nombre: 'Gorra', i18n: 'm.2', img: 'merch-gorra', w: 900, h: 1350 },
  { slug: 'chomba', art: 'la', nombre: 'Chomba', i18n: 'm.3', img: 'merch-chomba', w: 900, h: 1125 },
  { slug: 'lanyard', art: 'el', nombre: 'Lanyard', i18n: null, img: 'merch-lanyard', w: 900, h: 600 },
];

// WhatsApp del estudio (de ejemplo, ver TAREAS.md). El mismo número está en public/js/reservar.js.
export const WA = '5491112345678';
