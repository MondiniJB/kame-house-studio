/* Datos compartidos: temas grabados en el estudio (lista dada por el estudio). */
(function () {
  const KH = (window.KH = window.KH || {});
  // [título, artista tal como figura, archivo de portada, artistas que participan]
  KH.TEMAS = [
    ['TECA RMX', 'Asan', 'teca-rmx', ['Asan']],
    ['Cinema', 'Bhavi', 'cinema', ['Bhavi']],
    ['Debo cambiar', 'Asan x Khea', 'debo-cambiar', ['Asan', 'Khea']],
    ['Serotonina', 'Khea', 'serotonina', ['Khea']],
    ['Trapicheo "El Don"', 'Khea', 'trapicheo', ['Khea']],
    ['Pochoclos', 'Bhavi', 'pochoclos', ['Bhavi']],
    ['Neo', 'Neo Pistea', 'neo', ['Neo Pistea']],
  ];
  // Créditos: [nombre, tipo]. Los temas de cada uno salen de KH.TEMAS (cuarto campo).
  KH.ARTISTS = [
    ['Skrillex', 'artista'], ['Feid', 'artista'], ['YSY A', 'artista'], ['Bhavi', 'artista'], ['Asan', 'artista'],
    ['Khea', 'artista'], ['Midel', 'artista'], ['J Rei', 'artista'], ['Neo Pistea', 'artista'], ['Taichu', 'artista'],
    ['Zecca', 'productor'],
  ];
  // portada en WebP (tools/imagenes.py genera 240, 360, 540 y 720 px): chicas para miniaturas y la etiqueta del disco
  KH.cover = (file, w = 720) => `assets/media/${file}-${w}.webp`;
  KH.temasDe = (name) => KH.TEMAS.map((t, i) => [t, i]).filter(([t]) => t[3].includes(name));

  // Cada tema es un vinilo: la portada es la funda y el disco (con la portada como etiqueta) asoma detrás.
  KH.temaCard = (t, i, tag = 'li') => {
    const li = document.createElement(tag);
    li.className = 'tema';
    li.dataset.focus = '';
    const src = KH.cover(t[2]);
    const lazy = i < 3 ? 'eager' : 'lazy';
    li.innerHTML =
      '<div class="vinyl">' +
        '<span class="disc" aria-hidden="true"><span class="disc-spin"><span class="disc-face">' +
          `<img src="${KH.cover(t[2], 240)}" srcset="${KH.cover(t[2], 240)} 240w, ${KH.cover(t[2], 360)} 360w" sizes="(max-width: 960px) 21vw, 124px" alt="" width="240" height="240" loading="${lazy}" decoding="async">` +
        '</span></span></span>' +
        `<figure class="sleeve"><img src="${src}" srcset="${KH.cover(t[2], 360)} 360w, ${KH.cover(t[2], 540)} 540w, ${KH.cover(t[2], 720)} 720w" sizes="(max-width: 960px) 58vw, 340px" width="720" height="720" loading="${lazy}" decoding="async"></figure>` +
      '</div><h3></h3><p></p>';
    li.querySelector('.sleeve img').alt = `Portada de ${t[0]}, de ${t[1]}`;
    li.querySelector('h3').textContent = t[0];
    li.querySelector('p').textContent = t[1];
    return li;
  };
})();
