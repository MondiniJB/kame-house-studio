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
  // Cada tema es un vinilo: la portada es la funda y el disco (con la portada como etiqueta) asoma detrás.
  KH.temaCard = (t, i, tag = 'li') => {
    const li = document.createElement(tag);
    li.className = 'tema';
    li.dataset.focus = '';
    const src = `assets/media/${t[2]}.jpg`;
    const lazy = i < 3 ? 'eager' : 'lazy';
    li.innerHTML =
      '<div class="vinyl">' +
        '<span class="disc" aria-hidden="true"><span class="disc-spin"><span class="disc-face">' +
          `<img src="${src}" alt="" width="720" height="720" loading="${lazy}" decoding="async">` +
        '</span></span></span>' +
        `<figure class="sleeve"><img src="${src}" width="720" height="720" loading="${lazy}" decoding="async"></figure>` +
      '</div><h3></h3><p></p>';
    li.querySelector('.sleeve img').alt = `Portada de ${t[0]}, de ${t[1]}`;
    li.querySelector('h3').textContent = t[0];
    li.querySelector('p').textContent = t[1];
    return li;
  };
})();
