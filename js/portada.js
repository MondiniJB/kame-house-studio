/* Hacé tu portada: foto propia (o la silueta), AKA, tema y color de placa; se descarga como JPG de 1080 × 1350.
   Todo pasa en el navegador: la foto no se sube a ningún lado. */
(function () {
  const { $, $$ } = KH;
  const cover = $('#mk-cover'), media = $('#mk-media'), img = $('#mk-img');
  const aka = $('#mk-aka'), tema = $('#mk-tema'), file = $('#mk-foto'), quitar = $('#mk-quitar'), dl = $('#mk-dl');
  const outAka = $('#mk-out-aka'), outTema = $('#mk-out-tema');
  if (!cover) return;

  /* Silueta de artista grabando (auriculares, micrófono con soporte): se ve hasta que se sube una foto
     y es la misma que se dibuja en la descarga. */
  const SIL = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500" aria-hidden="true">' +
    '<rect width="400" height="500" fill="#222222"/>' +
    '<path fill="#383838" d="M0 500C4 392 68 330 150 326c84-4 150 58 156 174z"/>' +
    '<circle fill="#383838" cx="150" cy="214" r="70"/>' +
    '<path d="M78 210a72 72 0 0 1 144 0" fill="none" stroke="#565656" stroke-width="12"/>' +
    '<rect fill="#565656" x="64" y="190" width="28" height="60" rx="10"/>' +
    '<rect fill="#565656" x="208" y="190" width="28" height="60" rx="10"/>' +
    '<path d="M260 214v40a24 24 0 0 0 48 0v-40M284 278v18l76 44v160" fill="none" stroke="#565656" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<rect fill="#565656" x="264" y="146" width="40" height="104" rx="20"/>' +
    '<path d="M272 172h24M272 186h24M272 200h24" stroke="#383838" stroke-width="3"/>' +
    '</svg>';
  media.insertAdjacentHTML('afterbegin', SIL);

  /* ---- Textos y placa ---- */
  const akaTxt = () => aka.value.trim() || KH.t('mk.aka', 'Tu AKA');
  const temaTxt = () => (tema.value.trim() || KH.t('mk.tema', 'Tu tema')) + ' · Kame House';
  function paint() {
    outAka.textContent = akaTxt();
    outTema.textContent = temaTxt();
    cover.classList.toggle('is-violet', $('#mk-violeta').checked);
    $('#mk-go').href = KH.bookUrl({ servicio: 'grabacion', aka: aka.value.trim(), tema: tema.value.trim() });
  }
  [aka, tema].forEach((i) => i.addEventListener('input', paint));
  $$('input[name="mk-color"]').forEach((i) => i.addEventListener('change', paint));
  document.addEventListener('kh:lang', paint);

  /* ---- Foto: botón o arrastrarla sobre la portada ---- */
  let url = null;
  function setPhoto(f) {
    if (!f || !/^image\//.test(f.type)) return;
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(f);
    img.src = url;
    img.hidden = false;
    cover.classList.add('has-photo');
    quitar.hidden = false;
    $('#mk-foto-t').textContent = KH.t('mk.cambiar', 'Cambiar foto');
  }
  function clearPhoto() {
    if (url) URL.revokeObjectURL(url);
    url = null;
    img.removeAttribute('src');
    img.hidden = true;
    cover.classList.remove('has-photo');
    quitar.hidden = true;
    file.value = '';
    $('#mk-foto-t').textContent = KH.t('mk.subir', 'Subir foto');
    file.focus();
  }
  file.addEventListener('change', () => setPhoto(file.files[0]));
  quitar.addEventListener('click', clearPhoto);
  cover.addEventListener('dragover', (e) => { e.preventDefault(); cover.classList.add('is-drop'); });
  cover.addEventListener('dragleave', () => cover.classList.remove('is-drop'));
  cover.addEventListener('drop', (e) => {
    e.preventDefault();
    cover.classList.remove('is-drop');
    setPhoto(e.dataTransfer.files[0]);
  });

  /* ---- Descarga: se redibuja la portada en un canvas con las mismas medidas que en pantalla ---- */
  const W = 1080, H = 1350;
  const loadImg = (src) => new Promise((ok, err) => { const i = new Image(); i.onload = () => ok(i); i.onerror = err; i.src = src; });
  function drawCover(ctx, im) {
    const s = Math.max(W / im.naturalWidth, H / im.naturalHeight);
    const w = im.naturalWidth * s, h = im.naturalHeight * s;
    ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
  }
  // corta el texto en líneas que entren en el ancho; si una palabra sola no entra, la parte por letras
  function wrap(ctx, text, max) {
    const lines = [];
    let line = '';
    for (const word of text.split(/\s+/)) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width <= max) { line = test; continue; }
      if (line) lines.push(line);
      line = '';
      for (const ch of word) {
        if (ctx.measureText(line + ch).width > max && line) { lines.push(line); line = ''; }
        line += ch;
      }
    }
    if (line) lines.push(line);
    return lines;
  }
  const px = (v) => parseFloat(v) || 0;

  async function download() {
    dl.disabled = true;
    try {
      const k = W / cover.clientWidth;
      const plate = $('.cover-plate', cover), sticker = $('.sticker', cover);
      const cs = { plate: getComputedStyle(plate), aka: getComputedStyle(outAka), tema: getComputedStyle(outTema), st: getComputedStyle(sticker) };
      const fAka = `400 ${px(cs.aka.fontSize) * k}px ${cs.aka.fontFamily}`;
      const fTema = `${cs.tema.fontWeight} ${px(cs.tema.fontSize) * k}px ${cs.tema.fontFamily}`;
      const fSt = `400 ${px(cs.st.fontSize) * k}px ${cs.st.fontFamily}`;
      await Promise.all([fAka, fTema, fSt].map((f) => document.fonts.load(f).catch(() => {})));

      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#222222';
      ctx.fillRect(0, 0, W, H);
      const art = cover.classList.contains('has-photo') ? img : await loadImg('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(SIL));
      drawCover(ctx, art);

      // placa
      const padT = px(cs.plate.paddingTop) * k, padB = px(cs.plate.paddingBottom) * k, padX = px(cs.plate.paddingLeft) * k;
      const gap = px(cs.plate.rowGap) * k, inner = W - padX * 2;
      ctx.font = fAka;
      const akaLines = wrap(ctx, akaTxt().toUpperCase(), inner);
      const akaLH = px(cs.aka.lineHeight) * k || px(cs.aka.fontSize) * k;
      ctx.font = fTema;
      const temaLines = wrap(ctx, temaTxt(), inner);
      const temaLH = px(cs.tema.lineHeight) * k || px(cs.tema.fontSize) * k * 1.4;
      const plateH = padT + akaLines.length * akaLH + gap + temaLines.length * temaLH + padB;
      ctx.fillStyle = cs.plate.backgroundColor;
      ctx.fillRect(0, H - plateH, W, plateH);
      ctx.textBaseline = 'middle';
      let y = H - plateH + padT;
      ctx.font = fAka;
      ctx.fillStyle = '#ffffff';
      akaLines.forEach((l) => { ctx.fillText(l, padX, y + akaLH / 2); y += akaLH; });
      y += gap;
      ctx.font = fTema;
      ctx.fillStyle = cs.tema.color;
      temaLines.forEach((l) => { ctx.fillText(l, padX, y + temaLH / 2); y += temaLH; });

      // sticker: misma caja que en pantalla, girada -4°
      const sx = sticker.offsetLeft * k, sy = sticker.offsetTop * k, sw = sticker.offsetWidth * k, sh = sticker.offsetHeight * k;
      ctx.save();
      ctx.translate(sx + sw / 2, sy + sh / 2);
      ctx.rotate((-4 * Math.PI) / 180);
      ctx.fillStyle = cs.st.backgroundColor;
      ctx.fillRect(-sw / 2, -sh / 2, sw, sh);
      ctx.font = fSt;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(sticker.textContent, 0, ((px(cs.st.paddingTop) - px(cs.st.paddingBottom)) * k) / 2);
      ctx.restore();

      const blob = await new Promise((ok) => canvas.toBlob(ok, 'image/jpeg', 0.92));
      const a = document.createElement('a');
      const slug = aka.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      a.href = URL.createObjectURL(blob);
      a.download = `portada-${slug || 'kame-house'}.jpg`;
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    } finally {
      dl.disabled = false;
    }
  }
  dl.addEventListener('click', download);

  paint();
})();
