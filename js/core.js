/* Núcleo compartido: router por hash, ES/EN, escenas de scroll,
   foco por scroll en pantallas táctiles, menú, formularios y copiar al portapapeles. */
(function () {
  const KH = (window.KH = window.KH || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  KH.$ = $;
  KH.$$ = $$;
  KH.state = { service: null, aka: '' };

  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  KH.reduced = () => reducedQuery.matches;

  /* ---------- Scroll con inercia (Lenis) ----------
     Con movimiento reducido no se crea: el scroll queda nativo. */
  KH.lenis = null;
  KH.ease = { inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), outCubic: (t) => 1 - Math.pow(1 - t, 3), outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)) };
  KH.scrollTo = (y, o = {}) => {
    y = Math.max(0, y);
    if (KH.lenis) return KH.lenis.scrollTo(y, { duration: 1.2, easing: KH.ease.outExpo, force: true, ...o });
    window.scrollTo({ top: y, behavior: o.immediate || KH.reduced() ? 'auto' : 'smooth' });
  };
  function startLenis() {
    if (KH.lenis || KH.reduced() || typeof Lenis === 'undefined') return;
    const l = (KH.lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, autoRaf: false }));
    l.on('scroll', () => runScenes());
    const loop = (t) => { if (KH.lenis === l) { l.raf(t); requestAnimationFrame(loop); } };
    requestAnimationFrame(loop);
  }
  function stopLenis() {
    if (KH.lenis) { KH.lenis.destroy(); KH.lenis = null; }
  }

  /* ---------- Router ---------- */
  const views = $$('[data-view]');
  const ROUTES = views.map((v) => v.dataset.view);

  /* Estudio, Servicios, Sesiones y Merch no son páginas: llevan a su sección de la home. */
  const ALIAS = { estudio: 'historia', servicios: 'servicios-g', sesiones: 'sesiones-home', merch: 'merchsec' };
  function goAlias(name, smooth) {
    const el = document.getElementById(ALIAS[name]);
    if (!el) return;
    const y = el.getBoundingClientRect().top + scrollY - 80;
    KH.scrollTo(y, { immediate: !smooth });
  }
  function show(route, opts = {}) {
    if (ALIAS[route]) {
      const wasHome = document.documentElement.dataset.route === 'inicio';
      show('inicio', { keepScroll: true });
      $$('[data-nav]').forEach((a) => {
        const on = a.getAttribute('href') === '#' + route;
        a.classList.toggle('is-current', on);
        if (on) a.setAttribute('aria-current', 'location'); else if (a.getAttribute('href') !== '#inicio') a.removeAttribute('aria-current');
      });
      setTimeout(() => goAlias(route, wasHome), wasHome ? 0 : 120);
      return;
    }
    if (!ROUTES.includes(route)) route = 'inicio';
    views.forEach((v) => (v.hidden = v.dataset.view !== route));
    KH.lenis && KH.lenis.resize(); // el largo de la página cambió con la vista
    document.documentElement.dataset.route = route;
    const meta = (KH.META || {})[route];
    if (meta) {
      document.title = meta.title;
      const d = $('meta[name="description"]');
      if (d) d.setAttribute('content', meta.description);
    }
    $$('[data-nav]').forEach((a) => {
      const on = a.getAttribute('href') === '#' + route;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    KH.closeMenu && KH.closeMenu();
    if (!opts.keepScroll) KH.scrollTo(0, { immediate: true });
    if (opts.focus) {
      const h1 = $(`[data-view="${route}"] h1`);
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus({ preventScroll: true });
      }
    }
    document.dispatchEvent(new CustomEvent('kh:route', { detail: route }));
    KH.refreshScenes && KH.refreshScenes();
  }
  KH.go = (route) => {
    if (location.hash === '#' + route) show(route, { focus: true });
    else location.hash = route;
  };
  window.addEventListener('hashchange', () => show(location.hash.slice(1), { focus: true }));
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    if (a.hasAttribute('data-skip')) {
      e.preventDefault();
      const h1 = $(`[data-view="${document.documentElement.dataset.route}"] h1`);
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus();
      }
      return;
    }
    const svc = a.dataset.service;
    if (svc) KH.state.service = svc;
    const route = a.getAttribute('href').slice(1);
    if (route === location.hash.slice(1)) {
      e.preventDefault();
      show(route, { focus: true });
    }
  });

  /* ---------- ES / EN ---------- */
  const originals = new Map();
  function setLang(lang) {
    const dict = (KH.I18N && KH.I18N[lang]) || {};
    document.documentElement.lang = lang === 'en' ? 'en' : 'es-AR';
    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      el.innerHTML = lang === 'en' && dict[key] != null ? dict[key] : originals.get(el);
    });
    $$('[data-i18n-ph]').forEach((el) => {
      const key = el.dataset.i18nPh;
      if (!el.dataset.phEs) el.dataset.phEs = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', lang === 'en' && dict[key] != null ? dict[key] : el.dataset.phEs);
    });
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    KH.lang = lang;
    try { localStorage.setItem('kh-lang', lang); } catch (_) {}
    document.dispatchEvent(new CustomEvent('kh:lang', { detail: lang }));
  }
  KH.t = (key, es) => (KH.lang === 'en' && KH.I18N && KH.I18N.en[key]) || es;
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lang]');
    if (b) setLang(b.dataset.lang);
  });

  /* ---------- Menú (mobile) ---------- */
  const menu = $('[data-menu]');
  const menuBtn = $('[data-menu-toggle]');
  KH.closeMenu = () => {
    if (!menu) return;
    menu.classList.remove('is-open');
    document.documentElement.classList.remove('menu-open');
    KH.lenis && KH.lenis.start();
    menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
  };
  if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      if (KH.lenis) open ? KH.lenis.stop() : KH.lenis.start();
      if (open) {
        const first = menu.querySelector('a,button');
        first && first.focus();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        KH.closeMenu();
        menuBtn.focus();
      }
    });
  }

  /* ---------- Escenas ligadas al scroll ----------
     progress = 0 cuando el tope de la escena toca el tope del viewport,
     1 cuando el final de la escena toca el final del viewport. */
  const scenes = [];
  KH.scene = (el, fn, opts = {}) => {
    if (el) scenes.push({ el, fn, opts });
  };
  let ticking = false;
  function runScenes() {
    ticking = false;
    const vh = innerHeight;
    for (const s of scenes) {
      if (s.el.offsetParent === null && !s.opts.always) continue;
      const r = s.el.getBoundingClientRect();
      let p;
      if (s.opts.mode === 'view') {
        p = (vh - r.top) / (vh + r.height);
      } else {
        const span = r.height - vh;
        p = span > 0 ? -r.top / span : r.top < 0 ? 1 : 0;
      }
      p = Math.min(1, Math.max(0, p));
      s.fn(p, r);
    }
  }
  KH.refreshScenes = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(runScenes);
    }
  };
  addEventListener('scroll', KH.refreshScenes, { passive: true });
  addEventListener('resize', KH.refreshScenes);
  reducedQuery.addEventListener('change', () => {
    document.documentElement.classList.toggle('rm', KH.reduced());
    KH.reduced() ? stopLenis() : startLenis();
    KH.refreshScenes();
  });
  document.documentElement.classList.toggle('rm', KH.reduced());
  startLenis();

  /* ---------- Foco por scroll en táctil (hover que funciona en mobile) ---------- */
  function setupFocusBand() {
    if (matchMedia('(hover: hover)').matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('in-focus', e.isIntersecting)),
      { rootMargin: '-43% 0px -43% 0px', threshold: 0 }
    );
    $$('[data-focus]').forEach((el) => io.observe(el));
  }

  /* ---------- Formularios ---------- */
  KH.fieldError = (field, msg) => {
    const wrap = field.closest('[data-field]') || field.parentElement;
    let err = wrap.querySelector('.field-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'field-error';
      err.id = (field.id || field.name || 'f' + Math.random().toString(36).slice(2)) + '-err';
      wrap.appendChild(err);
    }
    err.textContent = msg || '';
    err.hidden = !msg;
    if (msg) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', err.id);
    } else {
      field.removeAttribute('aria-invalid');
    }
    return !msg;
  };
  const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  KH.check = {
    required: (v) => (v && v.trim() ? '' : KH.t('err.required', 'Completá este campo.')),
    email: (v) =>
      !v || !v.trim()
        ? KH.t('err.required', 'Completá este campo.')
        : MAIL.test(v.trim())
        ? ''
        : KH.t('err.email', 'Revisá el mail: falta la @ o el dominio (ej. nombre@gmail.com).'),
    services: (form) =>
      $$('input[name="servicio"]:checked', form).length
        ? ''
        : KH.t('err.services', 'Elegí al menos un servicio.'),
    temas: (v) => {
      const n = Number(v);
      return Number.isInteger(n) && n >= 1 && n <= 30 ? '' : KH.t('err.temas', 'Poné una cantidad entre 1 y 30.');
    },
    date: (v) => {
      if (!v) return '';
      const d = new Date(v + 'T00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d >= today ? '' : KH.t('err.date', 'Esa fecha ya pasó. Elegí una de hoy en adelante.');
    },
  };
  KH.formData = (form) => {
    const fd = new FormData(form);
    return {
      servicios: fd.getAll('servicio'),
      temas: fd.get('temas'),
      fecha: fd.get('fecha'),
      flexible: fd.get('flexible') === 'on',
      referencias: fd.get('referencias') || '',
      presupuesto: fd.get('presupuesto'),
      monto: fd.get('monto') || '',
      aka: fd.get('aka') || '',
      mail: fd.get('mail') || '',
      whatsapp: fd.get('whatsapp') || '',
      instagram: fd.get('instagram') || '',
      mensaje: fd.get('mensaje') || '',
    };
  };
  KH.SERVICE_LABEL = {
    grabacion: 'Grabación',
    mezcla: 'Mezcla',
    mastering: 'Mastering',
    produccion: 'Producción',
    sala: 'Alquiler de sala',
  };
  KH.serviceLabel = (k) => KH.t('svc.' + k, KH.SERVICE_LABEL[k] || k);
  KH.applyPrefill = (form) => {
    if (!form) return;
    if (KH.state.service) {
      const box = form.querySelector(`input[name="servicio"][value="${KH.state.service}"]`);
      if (box) box.checked = true;
    }
    if (KH.state.temas) {
      const t = form.querySelector('[name="temas"]');
      if (t) t.value = KH.state.temas;
    }
    if (KH.state.aka) {
      const a = form.querySelector('[name="aka"]');
      if (a && !a.value) a.value = KH.state.aka;
    }
    form.dispatchEvent(new Event('input', { bubbles: true }));
  };
  KH.fmtDate = (v) => {
    if (!v) return '';
    const d = new Date(v + 'T00:00');
    return d.toLocaleDateString(KH.lang === 'en' ? 'en-GB' : 'es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  /* ---------- Copiar datos de contacto ---------- */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const text = b.dataset.copy;
    const done = () => {
      const old = b.textContent;
      b.textContent = KH.t('copied', 'Copiado');
      setTimeout(() => (b.textContent = old), 1400);
    };
    const fallback = () => {
      const target = document.getElementById(b.getAttribute('aria-controls'));
      if (target) {
        const range = document.createRange();
        range.selectNodeContents(target);
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    };
    try {
      navigator.clipboard.writeText(text).then(done, fallback);
    } catch (_) {
      fallback();
    }
  });

  /* ---------- Arranque ---------- */
  KH.boot = () => {
    let lang = 'es';
    try { lang = localStorage.getItem('kh-lang') || 'es'; } catch (_) {}
    setLang(lang);
    show(location.hash.slice(1) || 'inicio', { keepScroll: true });
    setupFocusBand();
    KH.refreshScenes();
    const y = document.getElementById('kh-year');
    if (y) y.textContent = new Date().getFullYear();
  };
})();
