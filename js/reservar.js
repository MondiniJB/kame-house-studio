/* Reservar: un solo formulario en tres bloques, resumen que se arma en vivo y envío por WhatsApp o mail.
   No hay servidor: el pedido se abre ya escrito en WhatsApp o en el programa de mail de la persona. */
(function () {
  const { $, $$ } = KH;
  const STUDIO = { wa: '5491112345678', mail: 'EstudioKameHouse@gmail.com', tel: '+54 9 11 1234-5678' };
  const form = $('#book-form'), sum = $('#live-sum'), status = $('#send-status'), temas = $('#temas');

  /* ---- Lo que viene elegido desde el inicio: /reservar?servicio=mezcla&temas=3&beat=produccion&aka=...&tema=... ---- */
  const q = new URLSearchParams(location.search);
  const mark = (v) => { const box = form.querySelector(`input[name="servicio"][value="${v}"]`); if (box) box.checked = true; };
  if (q.get('servicio')) mark(q.get('servicio'));
  if (q.get('beat') === 'produccion') mark('produccion');
  const n = parseInt(q.get('temas'), 10);
  if (n >= 1 && n <= 30) temas.value = n;
  if (q.get('aka')) $('#aka').value = q.get('aka').slice(0, 40);
  if (q.get('tema')) $('#mensaje').value = `${KH.t('pre.tema', 'Tema')}: ${q.get('tema').slice(0, 60)}`;

  /* ---- Controles ---- */
  $$('[data-step-btn]', form).forEach((b) => b.addEventListener('click', () => {
    temas.value = Math.min(30, Math.max(1, (Number(temas.value) || 1) + Number(b.dataset.stepBtn)));
    paint();
  }));
  form.addEventListener('change', (e) => {
    if (e.target.name === 'presupuesto') $('#monto-wrap').hidden = e.target.value !== 'monto';
    if (e.target.name === 'servicio') KH.fieldError($('#f-servicios'), '');
  });

  /* ---- Datos y resumen ---- */
  function data() {
    const fd = new FormData(form);
    return {
      servicios: fd.getAll('servicio'),
      temas: fd.get('temas'),
      referencias: (fd.get('referencias') || '').trim(),
      fecha: fd.get('fecha'),
      flexible: fd.get('flexible') === 'on',
      presupuesto: fd.get('presupuesto'),
      monto: (fd.get('monto') || '').trim(),
      aka: (fd.get('aka') || '').trim(),
      whatsapp: (fd.get('whatsapp') || '').trim(),
      instagram: (fd.get('instagram') || '').trim(),
      mail: (fd.get('mail') || '').trim(),
      mensaje: (fd.get('mensaje') || '').trim(),
    };
  }
  const L = (k, es) => KH.t(k, es);
  const fechaTxt = (d) => (d.fecha ? KH.fmtDate(d.fecha) : L('sum.tbd', 'A definir')) + (d.flexible ? ` (${L('sum.flex', 'flexible')})` : '');
  const presuTxt = (d) => (d.presupuesto === 'monto' ? (d.monto ? `${L('sum.monto', 'tengo pensado')} ${d.monto}` : L('f.presu.b', 'Tengo un monto pensado')) : L('f.presu.a', 'Quiero que me coticen'));
  function rows(d) {
    return [
      [L('f.svc', 'Servicios'), d.servicios.length ? d.servicios.map(KH.serviceLabel).join(', ') : '—'],
      [L('sum.temas', 'Temas'), d.temas || '—'],
      [L('sum.fecha', 'Fecha'), fechaTxt(d)],
      [L('f.presu', 'Presupuesto'), presuTxt(d)],
      [L('sum.nombre', 'Nombre'), d.aka || '—'],
    ];
  }
  function paint() {
    sum.innerHTML = '';
    rows(data()).forEach(([k, v]) => {
      const div = document.createElement('div');
      const dt = document.createElement('dt'); dt.textContent = k;
      const dd = document.createElement('dd'); dd.textContent = v;
      div.append(dt, dd); sum.append(div);
    });
  }
  form.addEventListener('input', (e) => {
    // el error de un campo se borra apenas se corrige
    if (e.target.getAttribute('aria-invalid') === 'true') KH.fieldError(e.target, '');
    paint();
  });
  form.addEventListener('change', paint);
  document.addEventListener('kh:lang', paint);

  /* ---- Validación ---- */
  function validate() {
    const d = data();
    let ok = true;
    ok = KH.fieldError($('#f-servicios'), d.servicios.length ? '' : L('err.services', 'Elegí al menos un servicio.')) && ok;
    ok = KH.fieldError(temas, KH.check.temas(temas.value)) && ok;
    ok = KH.fieldError($('#fecha'), KH.check.date($('#fecha').value)) && ok;
    ok = KH.fieldError($('#aka'), KH.check.required(d.aka)) && ok;
    ok = KH.fieldError($('#mail'), KH.check.emailOptional(d.mail)) && ok;
    if (!ok) {
      const bad = form.querySelector('[aria-invalid="true"]');
      const el = bad.matches('fieldset') ? bad.querySelector('input') : bad;
      KH.scrollToEl(bad);
      el.focus({ preventScroll: true });
    }
    return ok;
  }

  /* ---- Mensaje ---- */
  function message(d) {
    const lines = [L('msg.hi', 'Hola, Kame House. Quiero reservar una sesión.'), ''];
    rows(d).slice(0, 4).forEach(([k, v]) => lines.push(`${k}: ${v}`));
    if (d.referencias) lines.push(`${L('f.ref', 'Referencias')}: ${d.referencias}`);
    lines.push('', `${L('sum.nombre', 'Nombre')}: ${d.aka}`);
    if (d.whatsapp) lines.push(`WhatsApp: ${d.whatsapp}`);
    if (d.instagram) lines.push(`Instagram: ${d.instagram}`);
    if (d.mail) lines.push(`${L('f.mail', 'Mail')}: ${d.mail}`);
    if (d.mensaje) lines.push('', d.mensaje);
    return lines.join('\n');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;
    const d = data();
    const text = message(d);
    const via = e.submitter && e.submitter.value === 'mail' ? 'mail' : 'wa';
    if (via === 'wa') {
      window.open(`https://wa.me/${STUDIO.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      status.textContent = L('send.ok.wa', `Listo: se abrió WhatsApp con tu pedido. Si no se abrió, escribinos al ${STUDIO.tel}.`);
    } else {
      const subject = `${L('msg.subject', 'Reserva de sesión')}: ${d.aka}`;
      location.href = `mailto:${STUDIO.mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      status.textContent = L('send.ok.mail', `Listo: se abrió tu mail con el pedido. Si no se abrió, escribinos a ${STUDIO.mail}.`);
    }
  });

  KH.boot();
  paint();
})();
