/* Artistas: archivo de artistas con el perfil de cada uno (foto y temas), filtros y el carrusel de vinilos. */
(function () {
  const { $, $$ } = KH;
  const list = $('#credit-list'), preview = $('#credit-preview');
  const wide = matchMedia('(min-width: 961px)');
  const roleOf = (k) => (k === 'productor' ? KH.t('art.pr', 'Productor') : KH.t('art.a', 'Artista'));

  /* ---- Perfil: foto del artista (o recuadro con su nombre) y debajo la lista de sus temas ---- */
  function perfil(r) {
    const frag = document.createDocumentFragment();
    const fig = document.createElement('figure');
    fig.className = 'pv-photo';
    const foto = KH.FOTOS[r.name];
    if (foto) {
      fig.innerHTML = `<img src="/assets/media/${foto}-720.webp" srcset="/assets/media/${foto}-360.webp 360w, /assets/media/${foto}-720.webp 720w" sizes="(max-width: 960px) 100vw, 30vw" alt="" width="720" height="900" loading="lazy" decoding="async">`;
      fig.querySelector('img').alt = r.name;
    } else {
      fig.classList.add('is-empty');
      fig.setAttribute('aria-hidden', 'true');
      fig.textContent = r.name;
    }
    frag.append(fig);
    if (r.temas.length) {
      const ul = document.createElement('ul');
      ul.className = 'pv-temas';
      r.temas.forEach(([t]) => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${KH.cover(t[2], 240)}" alt="" width="240" height="240" loading="lazy" decoding="async"><span><b></b><small></small></span>`;
        li.querySelector('b').textContent = t[0];
        li.querySelector('small').textContent = t[1];
        ul.append(li);
      });
      frag.append(ul);
    }
    return frag;
  }

  /* ---- Lista: en desktop, pasar por un nombre muestra su perfil al costado; en mobile, tocarlo lo despliega debajo ---- */
  const rows = KH.ARTISTS.map(([name, kind], i) => {
    const temas = KH.temasDe(name);
    const li = document.createElement('li');
    li.dataset.k = kind;
    li.dataset.focus = '';
    const el = document.createElement('button');
    el.className = 'credit';
    el.type = 'button';
    el.setAttribute('aria-expanded', 'false');
    el.setAttribute('aria-controls', `cr-${i}`);
    el.innerHTML = '<span class="n"></span><span class="m"></span>';
    el.querySelector('.n').textContent = name;
    const panel = document.createElement('div');
    panel.className = 'credit-temas';
    panel.id = `cr-${i}`;
    panel.hidden = true;
    li.append(el, panel);
    const r = { li, el, panel, name, kind, temas };
    el.addEventListener('click', () => {
      if (wide.matches) return select(i);
      const open = el.getAttribute('aria-expanded') !== 'true';
      el.setAttribute('aria-expanded', String(open));
      if (open && !panel.firstChild) panel.append(perfil(r));
      panel.hidden = !open;
    });
    el.addEventListener('pointerenter', () => wide.matches && select(i));
    el.addEventListener('focus', () => wide.matches && select(i));
    list.append(li);
    return r;
  });

  function paintMeta() {
    rows.forEach((r) => {
      r.el.querySelector('.m').textContent = roleOf(r.kind);
    });
  }

  /* ---- Vista previa (desktop) ---- */
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
    preview.append(head, perfil(r));
  }

  /* ---- Filtros ---- */
  $$('#cr-filters button').forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.f;
    $$('#cr-filters button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    rows.forEach((r) => (r.li.hidden = f !== 'all' && r.kind !== f));
    // si el elegido quedó oculto, el panel pasa al primero visible
    if (current < 0 || rows[current].li.hidden) {
      const first = rows.findIndex((r) => !r.li.hidden);
      if (first >= 0) select(first);
    }
  }));

  /* ---- Carrusel de vinilos: se arrastra, con flechas o teclado; el disco gira con el scroll ---- */
  const cf = KH.coverflow($('#temas-cf'), { items: KH.TEMAS });
  let spin = 0;
  addEventListener('scroll', () => { if (!spin) spin = requestAnimationFrame(() => { spin = 0; cf.layout(); }); }, { passive: true });

  document.addEventListener('kh:lang', () => { paintMeta(); const c = current; current = -1; select(c < 0 ? 0 : c); });

  KH.boot();
  paintMeta();
  select(0);
})();
