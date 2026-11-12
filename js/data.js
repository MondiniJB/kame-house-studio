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
  KH.temaCard = (t, i, tag = 'li') => {
    const li = document.createElement(tag);
    li.className = 'tema';
    const ph = document.createElement('div');
    ph.className = 'ph on-dark';
    const img = document.createElement('img');
    img.src = `assets/media/${t[2]}.jpg`; img.width = 720; img.height = 720; img.loading = i < 3 ? 'eager' : 'lazy'; img.decoding = 'async';
    img.alt = `Portada de ${t[0]}, de ${t[1]}`;
    ph.append(img);
    const h = document.createElement('h3'); h.textContent = t[0];
    const p = document.createElement('p'); p.textContent = t[1];
    li.append(ph, h, p);
    return li;
  };
})();
