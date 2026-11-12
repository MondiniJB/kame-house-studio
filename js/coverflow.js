/* Coverflow invertido con el destacado a la izquierda.
   El tema activo queda plano y grande a la izquierda, con su vinilo asomando a la derecha.
   Los siguientes se apilan hacia la derecha girados al revés que el coverflow clásico
   (el borde de afuera queda más cerca). Los que ya pasaron salen por la izquierda.

   KH.coverflow(root, { items, onPick }) → { set(pos), go(i), step(dir), active() }
   - set(pos): posición continua (la usa el scroll de la escena fijada).
   - go(i): anima hasta el tema i (clic, flechas, teclado, swipe).
   - isPinned(): true cuando el scroll de la escena fijada maneja la posición; entonces onPick(i)
     scrollea hasta ese tema en lugar de animar, y el arrastre queda apagado. */
(function () {
  const KH = (window.KH = window.KH || {});

  KH.coverflow = (root, opts = {}) => {
    const list = root.querySelector('.cf-track');
    const items = (opts.items || []).map((t, i) => {
      const li = KH.temaCard(t, i);
      li.classList.add('cf-item');
      const hit = document.createElement('button');
      hit.type = 'button';
      hit.className = 'cf-hit';
      hit.setAttribute('aria-label', `${t[0]}, de ${t[1]}`);
      li.querySelector('.vinyl').append(hit);
      hit.addEventListener('click', () => pick(i));
      list.append(li);
      return li;
    });
    const N = items.length;
    const pinned = () => !!(opts.isPinned && opts.isPinned());
    // el carrusel se anima solo hasta el tema; con la escena fijada, la página también scrollea hasta él
    const pick = (i) => { i = Math.max(0, Math.min(N - 1, i)); api.go(i); if (pinned() && opts.onPick) opts.onPick(i); };
    const live = root.querySelector('.cf-live');
    let pos = 0, target = 0, raf = 0, shown = -1;

    function layout() {
      const cw = items[0] ? items[0].offsetWidth : 300;
      // en pantallas angostas la pila se acerca para que se vea a la derecha del activo
      const narrow = innerWidth < 961;
      const GAP = narrow ? 1.16 : 1.62, STEP = narrow ? 0.26 : 0.44, PEEK = narrow ? 30 : 46;
      items.forEach((li, i) => {
        const d = i - pos;
        const a = Math.min(Math.abs(d), 1);
        let x, rot = 0, scale = 1, op = 1;
        if (d < 0) {
          // los que ya pasaron se van por la izquierda
          x = d * cw * 1.1;
          scale = 1 + d * 0.12;
          op = Math.max(0, 1 + d * 1.4);
        } else {
          x = d <= 1 ? d * cw * GAP : cw * GAP + (d - 1) * cw * STEP;
          rot = -40 * a;                         // invertido: el borde de afuera se acerca
          scale = 1 - 0.2 * a - 0.04 * Math.max(0, d - 1);
          op = d > 5 ? Math.max(0, 6 - d) : 1;
        }
        li.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) rotateY(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        li.style.opacity = op.toFixed(3);
        li.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
        li.style.setProperty('--peek', (4 + (1 - a) * PEEK).toFixed(1) + '%');   // el vinilo del activo sale hacia la derecha
        li.style.setProperty('--cap', Math.max(0, 1 - Math.abs(d) * 2.2).toFixed(3));
        li.classList.toggle('is-active', Math.abs(d) < 0.5);
        li.setAttribute('aria-hidden', String(Math.abs(d) > 5.5));
      });
      list.style.setProperty('--spin', ((window.scrollY + pos * 260) * 0.35).toFixed(1) + 'deg');
      const now = Math.round(pos);
      if (now !== shown && items[now]) {
        shown = now;
        if (live) live.textContent = `${opts.items[now][0]}, de ${opts.items[now][1]}`;
      }
    }

    // animación hacia el destino (clic, flechas, swipe): se acerca con una curva de salida rápida
    function tick() {
      pos += (target - pos) * (KH.reduced() ? 1 : 0.16);
      if (Math.abs(target - pos) < 0.002) pos = target;
      layout();
      raf = pos === target ? 0 : requestAnimationFrame(tick);
    }
    const api = {
      set(p) { pos = target = Math.max(0, Math.min(N - 1, p)); cancelAnimationFrame(raf); raf = 0; layout(); },
      go(i) { target = Math.max(0, Math.min(N - 1, i)); if (!raf) raf = requestAnimationFrame(tick); },
      step(dir) { api.go(Math.round(target) + dir); },
      active: () => Math.round(target),
      count: N,
      layout,
    };

    // flechas y teclado
    const prev = root.querySelector('.cf-prev'), next = root.querySelector('.cf-next');
    prev && prev.addEventListener('click', () => pick(api.active() - 1));
    next && next.addEventListener('click', () => pick(api.active() + 1));
    root.addEventListener('keydown', (e) => {
      const dir = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      pick(api.active() + dir);
    });

    // arrastre con el mouse o swipe con el dedo, en desktop y en mobile.
    // Al soltar se va al tema más cercano; con la escena fijada, además se scrollea hasta ese tema
    // para que el scroll y el carrusel queden de acuerdo.
    let sx = null, sy = 0, sp = 0, moved = false, dragging = false;
    list.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      sx = e.clientX; sy = e.clientY; sp = target; moved = false;
    });
    addEventListener('pointermove', (e) => {
      if (sx == null) return;
      const dx = e.clientX - sx;
      if (!moved) {
        if (Math.abs(e.clientY - sy) > Math.abs(dx) && Math.abs(e.clientY - sy) > 8) { sx = null; return; } // es scroll vertical, no arrastre
        if (Math.abs(dx) < 6) return;
        moved = dragging = true;
        root.classList.add('is-dragging');
      }
      const cw = items[0].offsetWidth;
      target = Math.max(-0.3, Math.min(N - 0.7, sp - dx / (cw * 0.9)));
      if (!raf) raf = requestAnimationFrame(tick);
    });
    const release = () => {
      if (sx == null) return;
      sx = null;
      if (!moved) return;
      dragging = false;
      root.classList.remove('is-dragging');
      pick(Math.round(target));
    };
    addEventListener('pointerup', release);
    addEventListener('pointercancel', release);
    list.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    list.addEventListener('dragstart', (e) => e.preventDefault());
    api.dragging = () => dragging;

    addEventListener('resize', layout);
    layout();
    return api;
  };
})();
