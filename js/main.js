(function () {
  const { $, $$ } = KH;
  const root = document.documentElement;
  root.classList.add('js');

  KH.META = {
    inicio: { title: 'Kame House Estudio | Grabación, mezcla y mastering en Chacarita', description: 'Estudio de grabación, mezcla y mastering de música urbana en Chacarita, CABA. Armá tu sesión y reservá.' },
    artistas: { title: 'Quiénes pasaron | Kame House Estudio', description: 'Skrillex, Feid, YSY A, Bhavi, Khea y más artistas que grabaron en Kame House.' },
    reservar: { title: 'Reservá tu sesión | Kame House Estudio', description: 'Pedí fecha y presupuesto para grabar, mezclar o masterizar en Kame House, Chacarita.' },
  };

  KH.I18N = { en: {
    skip: 'Skip to content', menu: 'Menu',
    'nav.inicio': 'Home', 'nav.estudio': 'Studio', 'nav.artistas': 'Artists', 'nav.servicios': 'Services', 'nav.sesiones': 'Sessions', 'nav.merch': 'Merch',
    'cta.reservar': 'Book a session',
    'hero.l1': 'Power', 'hero.l2': 'up.', 'hero.sub': 'Recording, mixing and mastering studio for urban music in Chacarita, Buenos Aires. Mariano Bilinkis runs the sessions.', 'hero.ses': 'See sessions',
    'b.h': 'Build your session', 'b.svc': 'What do you need?', 'b.temas': 'How many tracks?', 'b.beat': 'And the beat?', 'b.beat.a': 'I bring my own', 'b.beat.b': 'I need production', 'b.res': 'Your session', 'b.go': 'Continue to booking',
    'art.h': 'Artists who came through', 'art.p': 'More than six years of urban music recorded in Chacarita.', 'art.all': 'See all credits',
    'temas.h': 'Tracks recorded here', 'temas.p': 'Cover art by the artists.', 'tag.rec': 'recorded here',
    'field.h': 'Activate the powers',
    'field.p1': 'Kame House has been recording urban music in Chacarita for more than six years. The name nods to Dragon Ball and the premise is to activate the powers: technical rigor in a relaxed room.',
    'field.p2': 'Mariano Bilinkis runs the sessions. He has Grammy nominations and took part in Grammy-winning projects. He works with high-fidelity analog gear and digital tools.',
    'field.p3': 'The studio also runs its own record label.',
    'chain.h': 'How a session works', 'chain.p': 'From the first take to the final file, all in the same room.',
    'ch.1': 'Recording', 'ch.2': 'Editing', 'ch.3': 'Mixing', 'ch.4': 'Mastering', 'ch.5': 'Delivery',
    'ch.1.p': 'Vocals and instruments in the room, with analog and digital gear.', 'ch.2.p': 'The best takes are picked and timing and tuning are adjusted.', 'ch.3.p': 'The tracks are balanced: level, space and the character of the song.', 'ch.4.p': 'The sound is leveled so it works on any platform.', 'ch.5.p': 'You leave with the final files, ready to release.',
    'chain.also': 'You can also book a single stage, add production or rent the room:', 'chain.only': 'Mixing or mastering only', 'chain.quote': 'Ask for a quote',
    'svc.h': 'Services', 'svc.price': 'Every project is quoted separately. Tell us what you need.', 'svc.go': 'Ask',
    'svc.grabacion': 'Recording', 'svc.mezcla': 'Mixing', 'svc.mastering': 'Mastering', 'svc.produccion': 'Production', 'svc.sala': 'Room rental', 'svc.sala.short': 'Room',
    'svc.grabacion.p': 'Vocals and instruments in the room.', 'svc.mezcla.p': 'Your tracks balanced to what the song asks for.', 'svc.mastering.p': 'The last step: the track sounds consistent on every platform.', 'svc.produccion.p': 'If you come with an idea and no beat, we build it together.', 'svc.sala.p': 'The room by the hour, for you and your crew.',
    'ses.h': 'Sessions', 'ses.p': 'Clips and reels recorded in the room. They all share one cover: black band, artist, track and session number.', 'more.ig': 'More sessions on Instagram',
    'mk.h': 'Make your cover', 'mk.note': 'Try the template the studio uses for every session. Add your AKA and your track name.', 'mk.aka': 'Your AKA', 'mk.tema': 'Your track', 'mk.color': 'Plate', 'mk.negro': 'Black', 'mk.violeta': 'Violet', 'mk.go': 'I want to record it',
    'merch.h': 'Official merch', 'merch.p': 'Hoodies, caps, polos and lanyards with the studio brand.', 'm.1': 'Hoodie', 'm.2': 'Cap', 'm.3': 'Polo',
    'closer.h': 'Come to the house.', 'closer2.h': 'Got a track to record?',
    'art.h1': 'Who came through', 'art.lead': 'Artists and producers who recorded at Kame House.', 'art.a': 'Artist', 'art.pr': 'Producer',
    'f.all': 'All', 'f.art': 'Artists', 'f.prod': 'Producers',
    'book.h1': 'Book your session', 'book.lead': 'Tell us what you want to do and we reply with a date and a quote.',
    'st.1': 'What', 'st.2': 'When', 'st.3': 'You', 'st.1.l': 'What you’re here for', 'st.2.l': 'When', 'st.3.l': 'Who you are',
    'f.svc': 'Services', 'f.temas': 'Number of tracks', 'f.ref': 'References', 'f.ref.h': 'Links to your demos or to tracks whose sound you like. Optional.', 'f.fecha': 'Preferred date', 'f.flex': 'My dates are flexible', 'f.presu': 'Budget', 'f.presu.a': 'Send me a quote', 'f.presu.b': 'I have an amount in mind', 'f.monto': 'How much do you have in mind?',
    'f.aka': 'Artist name or AKA', 'f.mail': 'Email', 'f.msg': 'Anything else you want to tell us', opt: '(optional)', 'f.prev': 'Back', 'f.next': 'Next', 'f.send': 'Send request',
    'done.p': 'Summary of your request. This version is a demo: nothing is sent to the studio yet.', 'done.again': 'Start another request',
    'direct.h': 'Write to us', copy: 'Copy', copied: 'Copied', 'map.link': 'See on the map',
    'f.contact': 'Contact', 'f.site': 'Site',
    'err.required': 'Fill in this field.', 'err.email': 'Check the email: the @ or the domain is missing (e.g. name@gmail.com).', 'err.services': 'Pick at least one service.', 'err.temas': 'Enter a number between 1 and 30.', 'err.date': 'That date has passed. Pick today or later.',
    'fl.hero': 'Home', 'fl.artistas': 'Artists', 'fl.historia': 'Story', 'fl.servicios-g': 'Services', 'fl.merchsec': 'Merch',
  } };

  /* ---- Temas grabados (lista dada por el estudio) ---- */
  const TEMAS = [
    ['TECA RMX', 'Asan', 'teca-rmx'], ['Cinema', 'Bhavi', 'cinema'], ['Debo cambiar', 'Asan x Khea', 'debo-cambiar'], ['Serotonina', 'Khea', 'serotonina'],
    ['Trapicheo "El Don"', 'Khea', 'trapicheo'], ['Pochoclos', 'Bhavi', 'pochoclos'], ['Neo', 'Neo Pistea', 'neo'],
  ];
  function temaCard(t, i) {
    const li = document.createElement('li');
    li.className = 'tema';
    const ph = document.createElement('div');
    ph.className = 'ph on-dark';
    const img = document.createElement('img');
    img.src = `assets/media/${t[2]}.jpg`; img.width = 720; img.height = 720; img.loading = i < 3 ? 'eager' : 'lazy'; img.decoding = 'async';
    img.alt = `Portada de ${t[0]}, de ${t[1]}`;
    const st = document.createElement('span'); st.className = 'sticker'; st.dataset.i18n = 'tag.rec'; st.textContent = 'grabado acá';
    ph.append(img, st);
    const h = document.createElement('h3'); h.textContent = t[0];
    const p = document.createElement('p'); p.textContent = t[1];
    li.append(ph, h, p);
    return li;
  }
  TEMAS.forEach((t, i) => { $('#temas-track').append(temaCard(t, i)); $('#temas-grid').append(temaCard(t, i)); });
  KH.I18N.en['tag.rec'] = 'recorded here';

  /* ---- Modos con movimiento / sin movimiento ---- */
  const sceneOk = () => !KH.reduced();
  const wide = matchMedia('(min-width: 961px)');
  const wide2 = matchMedia('(min-width: 1001px)');
  const art = $('#artistas'), artRoll = $('#art-roll'), artNames = $$('#art-roll li'), artWin = $('#art-window');
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
  document.addEventListener('kh:route', (e) => { if (e.detail === 'inicio') requestAnimationFrame(() => { sizeStrip(); KH.refreshScenes(); }); });

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
  // ¿el scroll en esta dirección todavía cae adentro de los escalones?
  const inSteps = (dir) => {
    if (!art.classList.contains('is-pinned')) return false;
    const f = idxNow();
    return dir > 0 ? f > -EPS && f < N - 1 - EPS : f > EPS && f < N - 1 + EPS;
  };
  // cada scroll corre un nombre desde el último destino, sin esperar a que termine el anterior
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
  // si el scroll se frena entre dos nombres (touch, barra de scroll), se acomoda al más cercano
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

  /* ---- Armá tu sesión (configurador de B) ---- */
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
  }
  $$('#seg-svc button').forEach((b) => b.addEventListener('click', () => { conf.svc = b.dataset.v; paintConf(); }));
  $$('#seg-beat button').forEach((b) => b.addEventListener('click', () => { conf.beat = b.dataset.v; paintConf(); }));
  $$('.builder .counter button').forEach((b) => b.addEventListener('click', () => { conf.temas = Math.min(30, Math.max(1, conf.temas + Number(b.dataset.d))); paintConf(); }));
  $('#b-go').addEventListener('click', () => {
    KH.state.service = conf.svc;
    KH.state.temas = conf.temas;
    KH.state.extra = conf.svc === 'grabacion' && conf.beat === 'produccion' ? 'produccion' : null;
    KH.state.note = conf.svc === 'grabacion' ? (conf.beat === 'propio' ? 'Traigo el beat.' : 'Necesito producción del beat.') : '';
  });
  document.addEventListener('kh:lang', paintConf);

  /* ---- Así es una sesión: se enciende etapa por etapa ---- */
  KH.scene(chainScene, (p) => {
    if (!chainScene.classList.contains('is-pinned')) { chainItems.forEach((li) => { li.classList.add('on'); li.querySelector('.node i').style.setProperty('--fill', 1); }); return; }
    const pos = Math.min(0.999, p / 0.85) * chainItems.length;
    chainItems.forEach((li, i) => {
      li.classList.toggle('on', pos >= i);
      li.querySelector('.node i').style.setProperty('--fill', Math.max(0, Math.min(1, pos - i - 0.15)).toFixed(3));
    });
  });

  /* ---- Tira de film ---- */
  KH.scene(sesScene, (p) => {
    if (!sesScene.classList.contains('is-pinned')) return;
    track.style.transform = `translate3d(${(-Math.max(0, track.scrollWidth - innerWidth) * p).toFixed(1)}px, 0, 0)`;
  });

  /* ---- Mux: faders que suben con cada sección ---- */
  const faders = $$('[data-fader]');
  const SECTION_LABEL = { hero: 'Inicio', artistas: 'Artistas', historia: 'Historia', 'servicios-g': 'Servicios', merchsec: 'Merch' };
  faders.forEach((f) => {
    const sec = document.getElementById(f.dataset.fader);
    KH.scene(sec, (p) => {
      f.style.setProperty('--f', p.toFixed(3));
      const r = sec.getBoundingClientRect();
      const on = r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5;
      f.classList.toggle('on', on);
      if (on && f.closest('.mux-side')) $('#mux-label').textContent = KH.t('fl.' + f.dataset.fader, SECTION_LABEL[f.dataset.fader]);
    }, { mode: 'view' });
    f.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // el router de core.js volvería a subir al tope
      const goScroll = () => {
        const y = sec.getBoundingClientRect().top + scrollY - 80;
        KH.scrollTo(y);
      };
      if (location.hash.slice(1) && location.hash.slice(1) !== 'inicio') { KH.go('inicio'); setTimeout(goScroll, 120); } else goScroll();
    });
  });

  /* ---- Entradas por sección ---- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
    $$('[data-reveal]').forEach((el) => io.observe(el));
  } else {
    $$('[data-reveal]').forEach((el) => el.classList.add('in'));
  }

  $$('[data-scroll]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.getElementById(a.dataset.scroll);
    KH.scrollTo(t.getBoundingClientRect().top + scrollY - 80);
  }));

  /* ---- Generador de portada ---- */
  const mkAka = $('#mk-aka'), mkTema = $('#mk-tema'), mkCover = $('#mk-cover');
  function paintCover() {
    $('#mk-out-aka').textContent = mkAka.value.trim() || KH.t('mk.aka', 'Tu AKA');
    $('#mk-out-tema').textContent = (mkTema.value.trim() || KH.t('mk.tema', 'Tu tema')) + ' · Kame House';
    mkCover.classList.toggle('is-violet', $('#mk-violeta').checked);
  }
  [mkAka, mkTema].forEach((i) => i.addEventListener('input', paintCover));
  $$('input[name="mk-color"]').forEach((i) => i.addEventListener('change', paintCover));
  document.addEventListener('kh:lang', paintCover);
  $('#mk-go').addEventListener('click', () => { KH.state.aka = mkAka.value.trim(); if (mkTema.value.trim()) KH.state.note = 'Tema: ' + mkTema.value.trim(); });

  /* ---- Filtro de créditos ---- */
  $$('#art-filters button').forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.f;
    $$('#art-filters button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $$('#big-list li').forEach((li) => (li.hidden = f !== 'all' && li.dataset.k !== f));
  }));

  /* ---- Reserva en tres pasos ---- */
  const form = $('#book-form'), steps = $$('.step', form), dots = $$('#steps li');
  const prev = $('#prev'), next = $('#next'), send = $('#send');
  let cur = 1;
  function goStep(n, focus = true) {
    cur = n;
    steps.forEach((s) => (s.hidden = Number(s.dataset.step) !== n));
    dots.forEach((d, i) => { d.classList.toggle('now', i + 1 === n); d.querySelector('.rombo').classList.toggle('on', i + 1 <= n); });
    prev.hidden = n === 1; next.hidden = n === 3; send.hidden = n !== 3;
    if (focus) { const f = steps[n - 1].querySelector('input, textarea'); f && f.focus({ preventScroll: true }); }
  }
  function validate(n) {
    let ok = true;
    if (n === 1) { ok = KH.fieldError($('#f-servicios'), KH.check.services(form)) && ok; ok = KH.fieldError($('#temas'), KH.check.temas($('#temas').value)) && ok; }
    if (n === 2) ok = KH.fieldError($('#fecha'), KH.check.date($('#fecha').value)) && ok;
    if (n === 3) { ok = KH.fieldError($('#aka'), KH.check.required($('#aka').value)) && ok; ok = KH.fieldError($('#mail'), KH.check.email($('#mail').value)) && ok; }
    if (!ok) { const bad = form.querySelector('[aria-invalid="true"]'); (bad.matches('fieldset') ? bad.querySelector('input') : bad).focus(); }
    return ok;
  }
  next.addEventListener('click', () => { if (validate(cur)) goStep(cur + 1); });
  prev.addEventListener('click', () => goStep(cur - 1));
  $$('[data-step-btn]', form).forEach((b) => b.addEventListener('click', () => {
    const t = $('#temas');
    t.value = Math.min(30, Math.max(1, (Number(t.value) || 1) + Number(b.dataset.stepBtn)));
  }));
  form.addEventListener('change', (e) => {
    if (e.target.name === 'presupuesto') $('#monto-wrap').hidden = e.target.value !== 'monto';
    if (e.target.name === 'servicio') KH.fieldError($('#f-servicios'), '');
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (cur < 3) { if (validate(cur)) goStep(cur + 1); return; }
    if (!validate(3)) return;
    const d = KH.formData(form);
    const rows = [
      [KH.t('f.svc', 'Servicios'), d.servicios.map(KH.serviceLabel).join(', ')],
      [KH.t('f.temas', 'Cantidad de temas'), d.temas],
      [KH.t('f.fecha', 'Fecha tentativa'), (KH.fmtDate(d.fecha) || '—') + (d.flexible ? ' (flexible)' : '')],
      [KH.t('f.presu', 'Presupuesto'), d.presupuesto === 'monto' ? d.monto || '—' : KH.t('f.presu.a', 'Quiero que me coticen')],
      [KH.t('f.mail', 'Mail'), d.mail],
    ];
    const sum = $('#done-sum');
    sum.innerHTML = '';
    rows.forEach(([k, v]) => { const div = document.createElement('div'); const dt = document.createElement('dt'); const dd = document.createElement('dd'); dt.textContent = k; dd.textContent = v; div.append(dt, dd); sum.append(div); });
    $('#done-h').textContent = (KH.lang === 'en' ? 'Request ready, ' : 'Pedido armado, ') + d.aka.trim() + '.';
    form.hidden = true; $('#steps').hidden = true; $('#done').hidden = false; $('#done').focus();
  });
  $('#again').addEventListener('click', () => {
    form.reset(); $('#monto-wrap').hidden = true; form.hidden = false; $('#steps').hidden = false; $('#done').hidden = true; goStep(1);
  });
  document.addEventListener('kh:route', (e) => {
    if (e.detail !== 'reservar') return;
    KH.applyPrefill(form);
    if (KH.state.extra) { const pr = form.querySelector('input[value="produccion"]'); if (pr) pr.checked = true; }
    if (KH.state.note && !$('#mensaje').value) $('#mensaje').value = KH.state.note;
  });

  KH.boot();
  paintConf();
  paintCover();
  goStep(1, false);
})();
