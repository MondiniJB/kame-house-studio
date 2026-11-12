/* Artistas: lista de créditos con vista previa de sus temas, filtros y el carrusel de vinilos. */
(function () {
  const { $, $$ } = KH;
  const list = $('#credit-list'), preview = $('#credit-preview');
  const wide = matchMedia('(min-width: 961px)');
  const roleOf = (k) => (k === 'productor' ? KH.t('art.pr', 'Productor') : KH.t('art.a', 'Artista'));
  const countOf = (n) => (KH.lang === 'en' ? `${n} ${n === 1 ? 'track' : 'tracks'}` : `${n} ${n === 1 ? 'tema' : 'temas'}`);

  /* ---- Lista ---- */
  const rows = KH.ARTISTS.map(([name, kind], i) => {
    const temas = KH.temasDe(name);
    const li = document.createElement('li');
    li.dataset.k = kind;
    li.dataset.focus = '';
    const el = document.createElement(temas.length ? 'button' : 'div');
    el.className = 'credit';
    if (temas.length) {
      el.type = 'button';
      el.setAttribute('aria-expanded', 'false');
      el.setAttribute('aria-controls', `cr-${i}`);
    }
    el.innerHTML = '<span class="n"></span><span class="m"></span>';
    el.querySelector('.n').textContent = name;
    li.append(el);
    if (temas.length) {
      // en mobile, tocar el nombre despliega sus portadas
      const panel = document.createElement('div');
      panel.className = 'credit-temas';
      panel.id = `cr-${i}`;
      panel.hidden = true;
      temas.forEach(([t]) => {
        const f = document.createElement('figure');
        f.innerHTML = `<img src="${KH.cover(t[2], 360)}" alt="" width="360" height="360" loading="lazy" decoding="async"><figcaption></figcaption>`;
        f.querySelector('img').alt = `Portada de ${t[0]}, de ${t[1]}`;
        f.querySelector('figcaption').textContent = t[0];
        panel.append(f);
      });
      li.append(panel);
      el.addEventListener('click', () => {
        if (wide.matches) return select(i);
        const open = el.getAttribute('aria-expanded') !== 'true';
        el.setAttribute('aria-expanded', String(open));
        panel.hidden = !open;
      });
    }
    el.addEventListener('pointerenter', () => wide.matches && select(i));
    el.addEventListener('focus', () => wide.matches && select(i));
    list.append(li);
    return { li, el, name, kind, temas };
  });

  function paintMeta() {
    rows.forEach((r) => {
      r.el.querySelector('.m').textContent = roleOf(r.kind) + (r.temas.length ? ` · ${countOf(r.temas.length)}` : '');
    });
  }

  /* ---- Vista previa (desktop): el vinilo del primer tema y la lista de los demás ---- */
  let current = -1;
  function select(i) {
    if (i === current) return;
    current = i;
    const r = rows[i];
    rows.forEach((x, j) => x.li.classList.toggle('sel', j === i));
    preview.innerHTML = '';
    const head = document.createElement('div');
    head.className = 'pv-head';
    head.innerHTML = '<strong></strong><span></span>';
    head.querySelector('strong').textContent = r.name;
    head.querySelector('span').textContent = roleOf(r.kind);
    if (r.temas.length) {
      const card = KH.temaCard(r.temas[0][0], 0, 'div');
      card.classList.add('pv-vinyl');
      // en la vista previa el título no es un encabezado (va antes del h2 de la página)
      const h = card.querySelector('h3'), tt = document.createElement('strong');
      tt.className = 'tema-t';
      tt.textContent = h.textContent;
      h.replaceWith(tt);
      card.style.setProperty('--peek', '46%');
      preview.append(card);
      if (r.temas.length > 1) {
        const more = document.createElement('ul');
        more.className = 'pv-more';
        r.temas.slice(1).forEach(([t]) => {
          const li = document.createElement('li');
          li.innerHTML = `<img src="${KH.cover(t[2], 240)}" alt="" width="240" height="240" loading="lazy" decoding="async"><span></span>`;
          li.querySelector('span').textContent = t[0];
          more.append(li);
        });
        preview.append(more);
      }
    } else {
      preview.append(Object.assign(document.createElement('div'), { className: 'pv-empty', innerHTML: '<svg viewBox="0 0 263.96 215.49" aria-hidden="true"><use href="#kh-iso"/></svg>' }));
    }
    preview.prepend(head);
  }

  /* ---- Filtros ---- */
  $$('#cr-filters button').forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.f;
    $$('#cr-filters button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    rows.forEach((r) => (r.li.hidden = f !== 'all' && r.kind !== f));
  }));

  /* ---- Carrusel de vinilos: se arrastra, con flechas o teclado; el disco gira con el scroll ---- */
  const cf = KH.coverflow($('#temas-cf'), { items: KH.TEMAS });
  let spin = 0;
  addEventListener('scroll', () => { if (!spin) spin = requestAnimationFrame(() => { spin = 0; cf.layout(); }); }, { passive: true });

  document.addEventListener('kh:lang', () => { paintMeta(); const c = current; current = -1; select(c < 0 ? 0 : c); });

  KH.boot();
  paintMeta();
  select(Math.max(0, rows.findIndex((r) => r.temas.length)));
})();
