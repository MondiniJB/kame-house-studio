/* Inicio: artistas, cadena de trabajo, tira de sesiones, configurador, portada y mux. */
(function () {
  const { $, $$ } = KH;
  const root = document.documentElement;

  KH.TEMAS.forEach((t, i) => $('#temas-track').append(KH.temaCard(t, i)));

  /* ---- Modos con movimiento / sin movimiento ---- */
  const sceneOk = () => !KH.reduced();
  const wide = matchMedia('(min-width: 961px)');
  const wide2 = matchMedia('(min-width: 1001px)');
  const art = $('#artistas-home'), artRoll = $('#art-roll'), artNames = $$('#art-roll li'), artWin = $('#art-window');
  const tWrap = $('#temas-wrap'), tTrack = $('#temas-track'), artSide = $('.art-side');
  const sesScene = $('.sessions-scene'), track = $('#strip-track');
  const chainScene = $('#cadena'), chainItems = $$('#chain li');

  function sizeStrip() {
    const on = sceneOk() && wide.matches;
    sesScene.classList.toggle('is-pinned', on);
    if (!on) { sesScene.style.height = ''; track.style.transform = ''; return; }
    sesScene.style.height = `calc(100svh + ${Math.max(0, track.scrollWidth - innerWidth)}px)`;
  }
  function setModes() {
    const on = sceneOk();
    root.classList.toggle('scene-ok', on);
    art.classList.toggle('is-pinned', on && wide.matches);
    chainScene.classList.toggle('is-pinned', on && wide2.matches);
    if (!art.classList.contains('is-pinned')) {
      artRoll.style.transform = ''; tWrap.style.transform = ''; tTrack.style.transform = '';
    }
    sizeStrip();
    KH.refreshScenes();
  }
  setModes();
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', setModes);
  wide.addEventListener('change', setModes);
  wide2.addEventListener('change', setModes);
  addEventListener('resize', () => { sizeStrip(); KH.refreshScenes(); });

  /* ---- Artistas: nombres en vertical, al llegar al último los temas se deslizan en horizontal ---- */
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const NAMES_END = 0.44; // hasta acá del recorrido de la escena corren los nombres
  KH.scene(art, (p) => {
    if (!art.classList.contains('is-pinned')) {
      // sin escena fijada: se marca el nombre más cercano al centro de la pantalla
      let near = null, nd = Infinity;
      artNames.forEach((n) => { const r = n.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - innerHeight * 0.5); if (d < nd) { nd = d; near = n; } });
      artNames.forEach((n) => n.classList.toggle('sel', n === near && nd < n.offsetHeight * 1.2));
      $('.sel-band').style.opacity = '';
      return;
    }
    const win = artWin.getBoundingClientRect();
    const last = artNames[artNames.length - 1];
    const first = artNames[0];
    const start = win.height / 2 - (first.offsetTop + first.offsetHeight / 2);
    const end = win.height / 2 - (last.offsetTop + last.offsetHeight / 2);
    const names = clamp01(p / NAMES_END);
    const enter = clamp01((p - 0.52) / 0.1);
    const pan = clamp01((p - 0.64) / 0.36);
    const y = start + (end - start) * names - enter * win.height * 0.6;
    artRoll.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    artRoll.style.opacity = (1 - enter).toFixed(2);
    artSide.style.opacity = (1 - enter).toFixed(2);
    $('.sel-band').style.opacity = (1 - enter).toFixed(2);
    // el nombre que cruza el centro se pone blanco sobre la banda violeta
    const mid = win.top + win.height / 2;
    let best = null, bd = Infinity;
    artNames.forEach((n) => {
      const r = n.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bd) { bd = d; best = n; }
    });
    artNames.forEach((n) => n.classList.toggle('sel', n === best && bd < best.offsetHeight * 0.55 && enter === 0));
    tWrap.style.transform = `translate3d(${((1 - enter) * innerWidth).toFixed(1)}px, 0, 0)`;
    const extra = Math.max(0, tTrack.scrollWidth - innerWidth + (parseFloat(getComputedStyle(tTrack).paddingLeft) || 0));
    tTrack.style.transform = `translate3d(${(-extra * pan).toFixed(1)}px, 0, 0)`;
  });

  /* ---- Artistas por escalones: cada gesto de rueda (o tecla) corre un nombre ---- */
  const N = artNames.length;
  const zone = () => ({ top: art.getBoundingClientRect().top + scrollY, span: (art.offsetHeight - innerHeight) * NAMES_END });
  const posOf = (k) => { const z = zone(); return z.top + z.span * (k / (N - 1)); };
  const idxNow = () => { const z = zone(); return ((scrollY - z.top) / z.span) * (N - 1); };
  const EPS = 0.02;
  const STEP_PX = 90; // lo que hay que scrollear para correr un nombre (una rueda de mouse = 100)
  let target = null, acc = 0, lastWheel = 0, lastStep = 0, snapTimer = 0;
  const inSteps = (dir) => {
    if (!art.classList.contains('is-pinned')) return false;
    const f = idxNow();
    return dir > 0 ? f > -EPS && f < N - 1 - EPS : f > EPS && f < N - 1 + EPS;
  };
  function step(dir) {
    if (target == null) { const f = idxNow(); target = dir > 0 ? Math.floor(f + EPS) : Math.ceil(f - EPS); }
    target = Math.max(0, Math.min(N - 1, target + dir));
    lastStep = performance.now();
    KH.scrollTo(posOf(target), { duration: 0.32, easing: KH.ease.outCubic });
  }
  addEventListener('wheel', (e) => {
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const dir = Math.sign(e.deltaY);
    if (!dir || !inSteps(dir)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const now = performance.now();
    if (now - lastWheel > 200 || Math.sign(acc) !== dir) acc = 0;
    lastWheel = now;
    acc += e.deltaY * (e.deltaMode === 1 ? 33 : 1);
    while (Math.abs(acc) >= STEP_PX) { acc -= dir * STEP_PX; step(dir); }
  }, { passive: false, capture: true });
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input,textarea,select,button,a,[contenteditable]')) return;
    const dir = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 }[e.key] || (e.key === ' ' ? (e.shiftKey ? -1 : 1) : 0);
    if (!dir || !inSteps(dir)) return;
    e.preventDefault();
    step(dir);
  });
  addEventListener('scroll', () => {
    clearTimeout(snapTimer);
    if (!art.classList.contains('is-pinned')) return;
    snapTimer = setTimeout(() => {
      const f = idxNow();
      if (performance.now() - lastStep < 350) return;
      target = null;
      if (f > -EPS && f < N - 1 + EPS && Math.abs(f - Math.round(f)) > EPS) KH.scrollTo(posOf(Math.round(f)), { duration: 0.3, easing: KH.ease.outCubic });
    }, 200);
  }, { passive: true });

  /* ---- Cómo trabajamos: se enciende etapa por etapa ---- */
  KH.scene(chainScene, (p) => {
    if (!chainScene.classList.contains('is-pinned')) { chainItems.forEach((li) => { li.classList.add('on'); li.querySelector('.node i').style.setProperty('--fill', 1); }); return; }
    const pos = Math.min(0.999, p / 0.85) * chainItems.length;
    chainItems.forEach((li, i) => {
      li.classList.toggle('on', pos >= i);
      li.querySelector('.node i').style.setProperty('--fill', Math.max(0, Math.min(1, pos - i - 0.15)).toFixed(3));
    });
  });

  /* ---- Armá tu sesión ---- */
  const conf = { svc: 'grabacion', temas: 3, beat: 'propio' };
  const SVC_ES = { grabacion: 'Grabación', mezcla: 'Mezcla', mastering: 'Mastering', produccion: 'Producción', sala: 'Alquiler de sala' };
  const SVC_EN = { grabacion: 'Recording', mezcla: 'Mixing', mastering: 'Mastering', produccion: 'Production', sala: 'Room rental' };
  function sentence() {
    const en = KH.lang === 'en', n = conf.temas, name = (en ? SVC_EN : SVC_ES)[conf.svc];
    if (conf.svc === 'sala') return en ? `Room rental for ${n} ${n === 1 ? 'track' : 'tracks'} with your own crew.` : `Alquiler de sala para ${n} ${n === 1 ? 'tema' : 'temas'}, con tu equipo.`;
    const base = en ? `${name} of ${n} ${n === 1 ? 'track' : 'tracks'}` : `${name} de ${n} ${n === 1 ? 'tema' : 'temas'}`;
    if (conf.svc === 'grabacion') return base + (conf.beat === 'propio' ? (en ? ', with your own beat.' : ', con beat propio.') : (en ? ', with production in the studio.' : ', con producción en el estudio.'));
    return base + '.';
  }
  function paintConf() {
    $$('#seg-svc button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === conf.svc)));
    $$('#seg-beat button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === conf.beat)));
    $('#q-beat-wrap').style.visibility = conf.svc === 'grabacion' ? '' : 'hidden';
    $('#b-temas').textContent = conf.temas;
    $('#b-result').textContent = sentence();
    $('#b-go').href = KH.bookUrl({ servicio: conf.svc, temas: conf.temas, beat: conf.svc === 'grabacion' ? conf.beat : '' });
  }
  $$('#seg-svc button').forEach((b) => b.addEventListener('click', () => { conf.svc = b.dataset.v; paintConf(); }));
  $$('#seg-beat button').forEach((b) => b.addEventListener('click', () => { conf.beat = b.dataset.v; paintConf(); }));
  $$('.builder .counter button').forEach((b) => b.addEventListener('click', () => { conf.temas = Math.min(30, Math.max(1, conf.temas + Number(b.dataset.d))); paintConf(); }));
  document.addEventListener('kh:lang', paintConf);

  /* ---- Tira de sesiones ---- */
  KH.scene(sesScene, (p) => {
    if (!sesScene.classList.contains('is-pinned')) return;
    track.style.transform = `translate3d(${(-Math.max(0, track.scrollWidth - innerWidth) * p).toFixed(1)}px, 0, 0)`;
  });

  /* ---- Mux: faders que suben con cada sección ---- */
  const SECTION_LABEL = { hero: 'Inicio', 'artistas-home': 'Artistas', historia: 'La casa', 'servicios-g': 'Servicios', merch: 'Merch' };
  $$('[data-fader]').forEach((f) => {
    const sec = document.getElementById(f.dataset.fader);
    KH.scene(sec, (p) => {
      f.style.setProperty('--f', p.toFixed(3));
      const r = sec.getBoundingClientRect();
      const on = r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5;
      f.classList.toggle('on', on);
      if (on && f.closest('.mux-side')) $('#mux-label').textContent = KH.t('fl.' + f.dataset.fader, SECTION_LABEL[f.dataset.fader]);
    }, { mode: 'view' });
  });

  /* ---- Generador de portada ---- */
  const mkAka = $('#mk-aka'), mkTema = $('#mk-tema'), mkCover = $('#mk-cover');
  function paintCover() {
    $('#mk-out-aka').textContent = mkAka.value.trim() || KH.t('mk.aka', 'Tu AKA');
    $('#mk-out-tema').textContent = (mkTema.value.trim() || KH.t('mk.tema', 'Tu tema')) + ' · Kame House';
    mkCover.classList.toggle('is-violet', $('#mk-violeta').checked);
    $('#mk-go').href = KH.bookUrl({ servicio: 'grabacion', aka: mkAka.value.trim(), tema: mkTema.value.trim() });
  }
  [mkAka, mkTema].forEach((i) => i.addEventListener('input', paintCover));
  $$('input[name="mk-color"]').forEach((i) => i.addEventListener('change', paintCover));
  document.addEventListener('kh:lang', paintCover);

  KH.boot();
  paintConf();
  paintCover();
})();
