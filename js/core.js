/* Núcleo compartido por todas las páginas: scroll con Lenis, ES/EN, menú, escenas de scroll,
   foco por scroll en pantallas táctiles, anclas internas, entradas por sección, formularios y copiar. */
(function () {
  const KH = (window.KH = window.KH || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  KH.$ = $;
  KH.$$ = $$;
  const root = document.documentElement;
  root.classList.add('js');
  KH.page = root.dataset.page || 'inicio';

  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  KH.reduced = () => reducedQuery.matches;

  /* ---------- Scroll con inercia (Lenis) ----------
     Con movimiento reducido no se crea: el scroll queda nativo. */
  KH.lenis = null;
  KH.ease = { outCubic: (t) => 1 - Math.pow(1 - t, 3), outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)) };
  KH.scrollTo = (y, o = {}) => {
    y = Math.max(0, y);
    if (KH.lenis) return KH.lenis.scrollTo(y, { duration: 1.2, easing: KH.ease.outExpo, force: true, ...o });
    window.scrollTo({ top: y, behavior: o.immediate || KH.reduced() ? 'auto' : 'smooth' });
  };
  const navH = () => ($('.nav') ? $('.nav').offsetHeight : 0);
  KH.scrollToEl = (el, o) => el && KH.scrollTo(el.getBoundingClientRect().top + scrollY - navH() - 8, o);
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

  /* ---------- Navegación ----------
     Cada página es un HTML propio, servido con direcciones limpias (vercel.json: /estudio sirve estudio.html).
     Servicios, Sesiones y Merch son secciones del inicio (/#servicios, /#sesiones, /#merch). */
  // "/", "/index.html", "/estudio" y "/estudio.html" se comparan como la misma página
  const samePage = (path) => path.replace(/(index)?\.html$/, '').replace(/\/$/, '') || '/';
  $$('[data-nav]').forEach((a) => {
    if (a.dataset.nav === KH.page) { a.classList.add('is-current'); a.setAttribute('aria-current', 'page'); }
  });
  // anclas dentro de la misma página: scroll suave que respeta la altura de la nav
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href*="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(a.href, location.href);
    if (samePage(url.pathname) !== samePage(location.pathname) || !url.hash) return;
    const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    KH.closeMenu();
    history.replaceState(null, '', url.hash);
    KH.scrollToEl(el);
  });
  // nav del inicio: transparente sobre el hero, con fondo apenas se scrollea
  const nav = $('.nav');
  if (nav && KH.page === 'inicio') {
    // transparente solo en el tope: un marcador de 12px arriba de todo dice si se está ahí,
    // sin depender de los eventos de scroll (con Lenis o sin él). El scroll lo refuerza.
    KH.paintNav = () => root.classList.toggle('at-top', scrollY <= 8);
    const sentinel = document.createElement('div');
    sentinel.className = 'top-sentinel';
    sentinel.setAttribute('aria-hidden', 'true');
    document.body.prepend(sentinel);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => root.classList.toggle('at-top', e.isIntersecting)).observe(sentinel);
    }
    addEventListener('scroll', KH.paintNav, { passive: true });
    KH.paintNav();
  }
  // saltar al contenido: foco en el h1 de la página
  const skip = $('[data-skip]');
  if (skip) skip.addEventListener('click', (e) => {
    e.preventDefault();
    const h1 = $('main h1');
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus(); }
  });

  /* ---------- ES / EN ---------- */
  const originals = new Map();
  function setLang(lang) {
    const dict = (KH.I18N && KH.I18N[lang]) || {};
    root.lang = lang === 'en' ? 'en' : 'es-AR';
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
  KH.lang = 'es';
  KH.t = (key, es) => (KH.lang === 'en' && KH.I18N && KH.I18N.en[key]) || es;
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lang]');
    if (b) setLang(b.dataset.lang);
  });

  /* ---------- Menú (mobile) ---------- */
  const menu = $('[data-menu]');
  const menuBtn = $('[data-menu-toggle]');
  KH.closeMenu = () => {
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    root.classList.remove('menu-open');
    KH.lenis && KH.lenis.start();
    menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
  };
  if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      root.classList.toggle('menu-open', open);
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
    KH.paintNav && KH.paintNav();
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
    root.classList.toggle('rm', KH.reduced());
    KH.reduced() ? stopLenis() : startLenis();
    $$('video[autoplay]').forEach((v) => (KH.reduced() ? v.pause() : v.play().catch(() => {})));
    KH.refreshScenes();
  });
  root.classList.toggle('rm', KH.reduced());
  startLenis();
  if (KH.reduced()) $$('video[autoplay]').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); });

  /* ---------- Foco por scroll en táctil (hover que funciona en mobile) ---------- */
  function setupFocusBand() {
    if (matchMedia('(hover: hover)').matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('in-focus', e.isIntersecting)),
      { rootMargin: '-43% 0px -43% 0px', threshold: 0 }
    );
    $$('[data-focus]').forEach((el) => io.observe(el));
  }

  /* ---------- Entradas por sección ---------- */
  function setupReveal() {
    const els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) return els.forEach((el) => el.classList.add('in'));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -12% 0px' });
    els.forEach((el) => io.observe(el));
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
    emailOptional: (v) =>
      !v || !v.trim() || MAIL.test(v.trim()) ? '' : KH.t('err.email', 'Revisá el mail: falta la @ o el dominio (ej. nombre@gmail.com).'),
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
  KH.SERVICE_LABEL = { grabacion: 'Grabación', mezcla: 'Mezcla', mastering: 'Mastering', produccion: 'Producción', sala: 'Alquiler de sala' };
  KH.serviceLabel = (k) => KH.t('svc.' + k, KH.SERVICE_LABEL[k] || k);
  KH.fmtDate = (v) => {
    if (!v) return '';
    const d = new Date(v + 'T00:00');
    return d.toLocaleDateString(KH.lang === 'en' ? 'en-GB' : 'es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  // link a /reservar con lo que la persona ya eligió en otra sección
  KH.bookUrl = (params) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v != null && v !== '') q.set(k, v); });
    const s = q.toString();
    return '/reservar' + (s ? '?' + s : '');
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

  /* ---------- Arranque: cada página lo llama al final de su script ---------- */
  KH.boot = () => {
    let lang = 'es';
    try { lang = localStorage.getItem('kh-lang') || 'es'; } catch (_) {}
    setLang(lang);
    setupFocusBand();
    setupReveal();
    KH.refreshScenes();
    const y = document.getElementById('kh-year');
    if (y) y.textContent = new Date().getFullYear();
    // si se llegó con un ancla (/#servicios), se va a la sección una vez armado el layout
    if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) requestAnimationFrame(() => KH.scrollToEl(el, { immediate: true }));
    }
  };
})();
