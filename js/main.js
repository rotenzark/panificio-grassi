/* Panificio Pasticceria F.lli Grassi — main.js
   PLUMBING_V 1 (canonico) + firma:
   · hero entrance (.reveal-hero, unica animazione d'opacità → flash-safe)
   · la michetta (rosetta milanese) che si disegna: strokeDashoffset (NON opacity → flash-safe) */

/* ---------- firma: hero entrance ---------- */
window.bespokeHeroEntrance = function () {
  var els = document.querySelectorAll('.reveal-hero');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof gsap !== 'undefined' && !reduced) {
    gsap.fromTo(els, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 });
  } else { els.forEach(function (el) { el.style.opacity = 1; }); }
};

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO ══════════ */
  var SITE = {
    slug: 'panificio-grassi',
    whatsapp: { number: '', message: '', ids: [] },
    hours: {
      0: [],
      1: [['06:30', '12:30']],
      2: [['06:30', '12:30']],
      3: [['06:30', '12:30']],
      4: [['06:30', '12:30']],
      5: [['06:30', '12:30']],
      6: [['07:00', '12:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 720,
    EN: {
      'skip': 'Skip to content',
      'nav.casa': 'Homemade', 'nav.cioc': 'The chocolate', 'nav.catering': 'Catering', 'nav.dove': 'Find us & hours', 'nav.cta': 'Call',
      'hero.eyebrow': 'Bakery & pastry shop · Via Oroboni 8, Affori',
      'hero.t1': 'All of it', 'hero.t2': 'made in-house',
      'hero.lead': 'The neighbourhood bakery the way it used to be: bread and michette, focaccia and pizza, cakes, panettoni and artisan chocolate. Baked fresh every morning, on Via Oroboni.',
      'hero.reviews': '118 Google reviews', 'hero.call': 'Call: 376 011 9492', 'hero.see': 'What we make',
      'gesto.eyebrow': 'The bakery of Affori',
      'gesto.t1': 'From the michetta', 'gesto.t2': 'to the chocolate',
      'gesto.lead': "A bakery from another time, with the old-style sign and the chalkboard 'today'. Here everything is made in-house: the morning bread, the focaccia, the cakes for celebrations, the great leavened bakes and — rare for a bakery — artisan chocolate. Mixed, baked and decorated right here.",
      'casa.eyebrow': 'The homemade things', 'casa.title': 'A bakery that makes (almost) everything',
      'r1.t': 'Bread & michette', 'r1.d': 'The michetta, rustic loaves, raisin bread. Baked from the morning.',
      'r2.t': 'Pastry & biscuits', 'r2.d': 'Brioche, almond pastries, decorated biscuits.',
      'r3.t': 'Cakes to order', 'r3.d': 'Birthdays and celebrations: made the way you want.',
      'r4.t': 'Artisan chocolate', 'r4.d': "Our chocolatier's creations. Made by hand.",
      'r5.t': 'Tarts & sweets', 'r5.d': 'Fruit and jam tarts, home-style sweets.',
      'r6.t': 'Great leavened bakes', 'r6.d': 'Panettoni and colombe for the holidays, slow-risen.',
      'casa.note': 'And then the focaccia and pizza by the slice, the grissini, and — some days — homemade deli food.',
      'cioc.eyebrow': 'The rare thing', 'cioc.title': 'The chocolate, made here',
      'cioc.p1': "It's not common in a neighbourhood bakery: at Grassi there is a master chocolatier who tempers, pours and decorates chocolate by hand. Chocolates, pralines, shapes and eggs — the creations change with the seasons and the holidays.",
      'cioc.p2': 'A gift to give, or to keep for yourself. Personalised on request.',
      'cioc.call': 'Ask about the chocolate',
      'cat.eyebrow': 'For celebrations', 'cat.title': 'Catering, sweet and savoury',
      'cat.p1': "Baptisms, birthdays, events: the bakery becomes catering. Sweet and savoury, first courses, vegetarian and vegan options, savoury brioche with refined fillings. 'You always make a great impression', the customers say.",
      'cat.l1': 'Sweet & savoury buffet', 'cat.l2': 'First courses and platters', 'cat.l3': 'Vegetarian and vegan options',
      'cat.call': 'Ask for a quote',
      'forno.eyebrow': 'The bakery', 'forno.title': 'Like the bakeries of old',
      'forno.p1': "The cursive sign, the vintage photos hanging in the window, the chalkboard with 'today'. The Panificio Pasticceria F.lli Grassi is a corner neighbourhood bakery in Affori, family-run, open from early morning.",
      'forno.p2': 'You come in for the bread and leave with a cake, a tray of pastries or a chocolate treat. Just like it used to be.',
      'gallery.eyebrow': 'In the window', 'gallery.title': 'A look at the counter',
      'rev.eyebrow': 'Voices of the neighbourhood', 'rev.title': '4.8 on Google, 118 reviews',
      'rev1.t': "«A classic Milanese bakery, bread of every kind, focaccia and pizza, sweets and cakes to order, and a master chocolatier with artisan creations.»", 'rev1.a': '— Fulvio M.',
      'rev2.t': "«Wonderful catering service: sweet, savoury, first courses, vegan and vegetarian. Savoury brioche with refined fillings.»", 'rev2.a': '— Margherita A.',
      'rev3.t': "«The almond pastries were incredibly soft, exceptional. The pastry chef even gave us a little something. A lovely discovery.»", 'rev3.a': '— Cris F.',
      'rev4.t': "«The place looks like the bakeries of the 1960s, the sign is classic. Very helpful and friendly.»", 'rev4.a': '— Gg M.',
      'rev.src': 'Real customer reviews on Google.',
      'dove.eyebrow': 'Find us & hours', 'dove.title': 'Via Oroboni 8, Affori',
      'day.lun': 'Monday', 'day.mar': 'Tuesday', 'day.mer': 'Wednesday', 'day.gio': 'Thursday', 'day.ven': 'Friday', 'day.sab': 'Saturday', 'day.dom': 'Sunday', 'closed': 'Closed',
      'dove.addr_l': 'Address', 'dove.tel_l': 'Phone', 'dove.serv_l': 'Service', 'dove.serv': 'Counter & takeaway', 'dove.call': 'Call the bakery',
      'faq.eyebrow': 'FAQ', 'faq.title': 'Before you drop by',
      'faq1.q': 'What do you make in-house?',
      'faq1.a': 'Almost everything: the bread and michette, the focaccia and pizza, the pastry and cakes to order, the great leavened bakes and the artisan chocolate from our chocolatier. Some days also deli dishes.',
      'faq2.q': 'Do you make cakes to order?',
      'faq2.a': 'Yes: birthday and celebration cakes, tarts and trays of pastries on request. Drop by or call 376 011 9492 to arrange it.',
      'faq3.q': 'Do you do catering too?',
      'faq3.a': 'Yes, we handle catering for parties and events: sweet and savoury, first courses, vegetarian and vegan options, savoury brioche. Call us for a quote.',
      'faq4.q': 'What are your opening hours?',
      'faq4.a': 'We are a morning bakery: Monday–Friday 6:30–12:30, Saturday 7:00–12:30. Closed on Sunday.',
      'foot.hours_l': 'Hours', 'foot.hours1': 'Mon–Fri 6:30–12:30 · Sat 7–12:30', 'foot.hours2': 'Closed Sunday',
      'foot.disclaimer': 'Demonstration website (concept) created by Bespoke Studio for presentation purposes. It is not the official website of the business. Images and reviews belong to their respective owners.',
    },
  };
  /* ═════════════════════════════════════ */

  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' + encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) { var el = document.getElementById(id); if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; } });
  }

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) { els.forEach(function (el) { ScrollTrigger.getAll().forEach(function (st) { if (st.trigger === el && !st.progress) st.kill(); }); }); }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
  } else { showAllReveals(); }

  /* intro */
  var intro = document.getElementById(SITE.introId);
  var heroEntrance = window.bespokeHeroEntrance || function () {};
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a, button'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () { opener = btn; var img = btn.querySelector('img'); openLb(btn.getAttribute('data-full'), img ? img.alt : ''); });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari Europe/Rome */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function hoursState() {
    var now = romeNow();
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) { var s = toMin(wins[i][0]), e = toMin(wins[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    var prev = (now.day + 6) % 7, pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) { var pe = toMin(pw[j][1]); if (pe > 1440 && now.mins < pe - 1440) return { open: true, day: prev, closesAt: fmt(pe) }; }
    for (var k = 0; k < wins.length; k++) { if (now.mins < toMin(wins[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DAYS_EN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DAYS_IT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* i18n */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt'], ['data-i18n-placeholder', 'placeholder'], ['data-i18n-title', 'title']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.textContent;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.textContent = val;
      });
    });
    renderHours();
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* ══════════ FIRMA: la michetta si disegna (strokeDashoffset → flash-safe) ══════════ */
  if (hasGsap && hasST && !reducedMotion) {
    var strokes = gsap.utils.toArray('.michetta .draw');
    strokes.forEach(function (p) {
      var len = p.getTotalLength ? p.getTotalLength() : 400;
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    gsap.to(strokes, {
      strokeDashoffset: 0, duration: 1.0, ease: 'power2.out', stagger: 0.1,
      scrollTrigger: { trigger: '.gesto', start: 'top 72%', once: true },
    });
  }
})();
