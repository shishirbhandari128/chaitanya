// Chaitanya — shared motion layer. Loaded once per page from <helmet>.
// Uses only transform-family props (translate/scale/rotate), opacity, filter and clip-path,
// so it never fights the inline `transform` styles already on elements.
(function () {
  if (window.__chyMotion) return;
  window.__chyMotion = true;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(0.22,1,0.36,1)';
  var TEAL = 'rgb(0, 125, 103)';

  var css = `
  html{scroll-behavior:smooth}
  image-slot::part(frame){background:linear-gradient(100deg,#eceee9 30%,#f6f7f4 50%,#eceee9 70%);background-size:220% 100%;animation:chySkel 1.3s linear infinite}
  image-slot[data-chy-loaded]::part(frame){animation:none;background:none}
  @keyframes chySkel{from{background-position:120% 0}to{background-position:-120% 0}}
  image-slot::part(image){animation:chyImgIn .5s ease both;image-rendering:high-quality;-webkit-backface-visibility:hidden;backface-visibility:hidden;filter:contrast(1.03) saturate(1.05)}
  img{image-rendering:high-quality}
  button,.btn,[data-chy-btn],input[type=submit],input[type=button]{font-family:var(--font-body,'Lato'),'Lato',system-ui,sans-serif !important}
  button *,.btn *,[data-chy-btn] *{font-family:inherit !important}
  body{animation:chyPageIn .6s ${EASE} both}
  body.chy-leaving{opacity:0;transition:opacity .28s ease}
  @keyframes chyImgIn{from{opacity:0}to{opacity:1}}
  @keyframes chyPageIn{from{opacity:0}to{opacity:1}}
  [data-chy="hide"]{opacity:0}
  [data-chy="hide"][data-chy-v="up"]{translate:0 28px}
  [data-chy="hide"][data-chy-v="left"]{translate:-40px 0}
  [data-chy="hide"][data-chy-v="right"]{translate:40px 0}
  [data-chy="hide"][data-chy-v="scale"]{scale:.94}
  [data-chy="hide"][data-chy-v="blur"]{filter:blur(10px);scale:1.03}
  [data-chy="hide"][data-chy-v="line"]{translate:0 22px}
  [data-chy="in"][data-chy-v="line"]{animation:chyLineWipe .9s ${EASE} both;animation-delay:var(--chy-d,0ms)}
  @keyframes chyLineWipe{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
  [data-chy="in"]{opacity:1;translate:0 0;scale:1;filter:none;
    transition:opacity .7s ${EASE},translate .8s ${EASE},scale .8s ${EASE},filter .8s ${EASE};transition-delay:var(--chy-d,0ms)}
  [data-chy-btn]{transition:translate .3s ${EASE},scale .3s ${EASE},box-shadow .3s ${EASE},background-color .3s ease,filter .3s ease !important}
  [data-chy-btn]:hover{translate:0 -4px;scale:1.03;box-shadow:0 14px 28px -12px rgba(7,46,52,.45)}
  [data-chy-btn]:active{translate:0 -1px;scale:.98;transition-duration:.12s !important}
  [data-chy-shine]{position:relative;overflow:hidden;isolation:isolate}
  [data-chy-shine]::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;
    background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.38) 50%,transparent 70%);translate:-120% 0}
  [data-chy-shine]:hover::after{translate:120% 0;transition:translate .8s ${EASE}}
  [data-chy-card]{transition:translate .45s ${EASE},box-shadow .45s ${EASE},outline-color .45s ease}
  [data-chy-card]:hover{translate:0 -6px;box-shadow:0 22px 44px -20px rgba(7,46,52,.35)}
  [data-chy-still],[data-chy-still]:hover{translate:none!important;box-shadow:none!important}
  [data-chy-card]:hover svg{animation:chyWiggle .6s ${EASE}}
  @keyframes chyWiggle{0%,100%{rotate:0deg}35%{rotate:-8deg}70%{rotate:6deg}}
  [data-chy-zoom] image-slot,[data-chy-zoom] img,[data-chy-zoom] video{transition:scale 1.1s ${EASE}}
  [data-chy-zoom]:hover image-slot,[data-chy-zoom]:hover img,[data-chy-zoom]:hover video{scale:1.07}
  [data-chy-link]{background-image:linear-gradient(currentColor,currentColor);background-size:0% 1px;background-repeat:no-repeat;
    background-position:0 100%;transition:background-size .35s ${EASE},color .25s ease,opacity .25s ease;text-decoration:none !important}
  [data-chy-link]:hover{background-size:100% 1px}
  [data-chy-social]{transition:translate .3s ${EASE}}
  [data-chy-social]:hover{translate:0 -3px;animation:chyBounce .6s ${EASE}}
  @keyframes chyBounce{0%,100%{translate:0 -3px}40%{translate:0 -7px}70%{translate:0 -2px}}
  input:focus,select:focus,textarea:focus{outline:none;border-color:#007D67 !important;box-shadow:0 0 0 4px rgba(0,125,103,.14) !important;transition:box-shadow .25s ease,border-color .25s ease}
  input,select,textarea{transition:box-shadow .25s ease,border-color .25s ease}
  [data-chy-navrow]::-webkit-scrollbar{display:none}
  @media (max-width:560px){[data-chy-navrow]{order:3;flex:1 1 100% !important;justify-content:flex-start !important;margin:0 -4px}}
  [data-chy-navlink]{position:relative;gap:0;transition:background-color .3s ${EASE},color .25s ease,padding .35s ${EASE} !important}
  [data-chy-navlink] .chy-arr{display:inline-flex;width:0;opacity:0;overflow:hidden;translate:-4px 4px;transition:width .35s ${EASE},opacity .25s ease,translate .35s ${EASE},margin .35s ${EASE}}
  [data-chy-navlink]:hover .chy-arr,[data-chy-navlink]:focus-visible .chy-arr{width:12px;opacity:1;translate:0 0;margin-left:6px}
  [data-chy-navlink] .chy-dot{display:inline-block;width:0;height:6px;border-radius:50%;background:currentColor;opacity:0;transition:width .3s ${EASE},opacity .3s ease,margin .3s ${EASE}}
  [data-chy-navlink][aria-current="page"] .chy-dot{width:6px;opacity:1;margin-right:8px}
  [data-chy-navlink="solid"]:hover{background-color:#f0f4f2;color:#007D67 !important}
  [data-chy-navlink="solid"][aria-current="page"]{background-color:#E3F5F0;color:#007D67 !important}
  [data-chy-navlink="overlay"]:hover{background-color:rgba(255,255,255,.14)}
  [data-chy-navlink="overlay"][aria-current="page"]{background-color:rgba(255,255,255,.18);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
  [data-chy-docked="1"] [data-chy-navlink]:hover{background-color:#f0f4f2 !important;color:#007D67 !important}
  [data-chy-docked="1"] [data-chy-navlink][aria-current="page"]{background-color:#E3F5F0 !important;color:#007D67 !important;-webkit-backdrop-filter:none;backdrop-filter:none}
  [data-chy-navlink]:active{scale:.97}
  [data-chy-nav]{transition:translate .45s ${EASE},background-color .3s ease,backdrop-filter .3s ease,box-shadow .3s ease}
  [data-chy-nav="hidden"]{translate:0 -110%}
  [data-chy-scrolled="1"]{background:#fff !important;box-shadow:0 6px 24px -10px rgba(7,46,52,.18),0 1px 0 rgba(7,46,52,.06) !important}
  [data-chy-docked="1"]{background:#fff !important;color:#201e1d !important;box-shadow:0 6px 24px -10px rgba(7,46,52,.18),0 1px 0 rgba(7,46,52,.06) !important}
  [data-chy-docked="1"] a{color:#201e1d !important;opacity:1 !important;text-shadow:none !important}
  [data-chy-docked="1"] *{text-shadow:none !important}
  [data-chy-docked="1"] a[aria-current="page"]{color:#007D67 !important;border-bottom-color:#007D67 !important}
  [data-chy-docked="1"] a:hover{border-bottom-color:#007D67 !important;color:#007D67 !important;opacity:1 !important}
  [data-chy-docked="1"] img{filter:none !important}
  [data-chy-docked="1"] [data-chy-search]{background:#f0f1ee !important;color:#201e1d !important}
  [data-chy-docked="1"] a[href^="SignIn.dc.html"]{background-color:#007D67 !important;color:#fff !important}
  [data-chy-nav-blur="1"]{backdrop-filter:blur(14px) saturate(160%);-webkit-backdrop-filter:blur(14px) saturate(160%)}
  #chy-top{position:fixed;right:24px;bottom:24px;z-index:60;width:48px;height:48px;border-radius:50%;border:none;cursor:pointer;
    background:#007D67;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 26px -10px rgba(0,125,103,.7);
    opacity:0;translate:0 20px;scale:.8;pointer-events:none;transition:opacity .4s ${EASE},translate .4s ${EASE},scale .4s ${EASE}}
  #chy-top.on{opacity:1;translate:0 0;scale:1;pointer-events:auto}
  #chy-top:hover{translate:0 -4px;scale:1.06}
  #chy-top svg{transition:translate .3s ${EASE}}
  #chy-top:hover svg{translate:0 -2px}
  @media (hover:none){[data-chy-card]:hover,[data-chy-btn]:hover{translate:0 0;scale:1}}
  @media (prefers-reduced-motion:reduce){
    *,*::before,*::after{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important;scroll-behavior:auto !important}
    [data-chy="hide"]{opacity:1;translate:none;scale:none;filter:none}
  }`;
  var st = document.createElement('style');
  st.id = 'chy-motion';
  st.textContent = css;
  document.head.appendChild(st);

  function inline(el) { return (el.getAttribute('style') || '').replace(/\s+/g, ''); }
  function skipAnim(el) {
    var s = inline(el);
    return /opacity:|animation:|position:absolute|position:fixed|transform:translate/.test(s);
  }

  // ---------- scroll reveals ----------
  function show(el) { if (el.getAttribute('data-chy') === 'hide') el.setAttribute('data-chy', 'in'); }
  var io = reduce ? null : new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var list = e.target.__chyTargets || [e.target];
      list.forEach(show);
      io.unobserve(e.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  // Safety net: nothing may stay hidden once it is on or near screen.
  function sweep() {
    var vh = window.innerHeight;
    document.querySelectorAll('[data-chy="hide"]').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 1.1 && r.bottom > -vh * 0.1) {
        if (!el.__chyNear) { el.__chyNear = Date.now(); }
        else if (Date.now() - el.__chyNear > 900) show(el);
      }
    });
  }
  if (!reduce) { setInterval(sweep, 600); window.addEventListener('load', function () { setTimeout(function () { document.querySelectorAll('[data-chy="hide"]').forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < window.innerHeight) show(el); }); }, 2500); }); }

  function contentKids(sec) {
    var node = sec, depth = 0;
    while (depth < 3) {
      var kids = Array.prototype.filter.call(node.children, function (c) {
        return !/^(STYLE|SCRIPT|TEMPLATE)$/.test(c.tagName) && !/position:absolute|position:fixed/.test(inline(c));
      });
      if (kids.length !== 1) return kids;
      node = kids[0]; depth++;
    }
    return Array.prototype.slice.call(node.children);
  }

  function variantFor(el, i, siblings, parent) {
    if (/^H[12]$/.test(el.tagName)) return 'line';
    if (el.tagName === 'FIGURE' || el.tagName === 'IMAGE-SLOT' || (el.querySelector && el.children.length === 1 && el.querySelector(':scope > image-slot'))) return 'blur';
    var cs = parent ? getComputedStyle(parent) : null;
    var row = cs && ((cs.display.indexOf('grid') > -1 && siblings.length === 2) || (cs.display.indexOf('flex') > -1 && cs.flexDirection.indexOf('row') === 0 && siblings.length === 2));
    if (row) return i === 0 ? 'left' : 'right';
    if (siblings.length >= 3 && cs && cs.display.indexOf('grid') > -1) return 'scale';
    return 'up';
  }

  function inClippedTrack(el) {
    for (var p = el.parentElement, i = 0; p && i < 6 && p.tagName !== 'SECTION'; p = p.parentElement, i++) {
      var cs = getComputedStyle(p);
      if (/nowrap|max-content/.test(inline(p)) || cs.flexWrap === 'nowrap' && cs.display.indexOf('flex') > -1 && p.scrollWidth > p.clientWidth + 8) return true;
      if ((cs.overflowX === 'hidden' || cs.overflowX === 'auto' || cs.overflowX === 'scroll') && p.scrollWidth > p.clientWidth + 8) return true;
    }
    return false;
  }
  function prep(el, v, delay) {
    if (el.hasAttribute('data-chy') || skipAnim(el) || inClippedTrack(el)) return;
    var r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4 || !(el.textContent || '').trim() && !el.querySelector('image-slot,img,video,svg,input,button,a')) return;
    el.setAttribute('data-chy-v', v);
    el.style.setProperty('--chy-d', delay + 'ms');
    el.setAttribute('data-chy', 'hide');
    // Observe an unclipped reference (the parent) so transforms/clips on el never zero its visible area.
    var ref = (v === 'line' || v === 'blur') ? (el.parentElement || el) : el;
    (ref.__chyTargets = ref.__chyTargets || []).push(el);
    io.observe(ref);
  }

  function revealSection(sec) {
    if (sec.__chyDone) return;
    sec.__chyDone = true;
    var kids = contentKids(sec);
    var parent = kids[0] && kids[0].parentElement;
    var d = 0;
    kids.forEach(function (k, i) {
      var cs = getComputedStyle(k);
      // A grid/flex row of many items (cards) — stagger its children instead of the row.
      var inner = Array.prototype.filter.call(k.children, function (c) { return !/position:absolute/.test(inline(c)); });
      if ((cs.display.indexOf('grid') > -1 || cs.display.indexOf('flex') > -1) && inner.length >= 3 && inner.length <= 16 && !/nowrap|max-content/.test(inline(k))) {
        inner.forEach(function (c, j) { prep(c, variantFor(c, j, inner, k), d + j * 100); });
        d += 100;
      } else {
        prep(k, variantFor(k, i, kids, parent), d);
        d += 100;
      }
    });
  }

  // ---------- interactive marks ----------
  function isFilled(el) {
    var bg = getComputedStyle(el).backgroundColor;
    return bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)';
  }
  function markInteractive(root) {
    root.querySelectorAll('a[href], button').forEach(function (el) {
      if (el.__chyI) return; el.__chyI = true;
      if (el.closest('nav') && !isFilled(el)) return;
      var r = el.getBoundingClientRect();
      var hasText = (el.textContent || '').trim().length > 0;
      if (isFilled(el) && r.height >= 32 && r.height <= 64) {
        el.setAttribute('data-chy-btn', '');
        if (getComputedStyle(el).backgroundColor === TEAL && hasText && r.width > 80) el.setAttribute('data-chy-shine', '');
      } else if (el.querySelector('image-slot, img') && r.width > 160) {
        el.setAttribute('data-chy-card', ''); el.setAttribute('data-chy-zoom', '');
      } else if (el.tagName === 'A' && hasText && !el.querySelector('svg, img, image-slot') && r.height < 40) {
        el.setAttribute('data-chy-link', '');
      } else if (el.tagName === 'A' && !hasText && el.querySelector('svg') && r.width <= 48) {
        el.setAttribute('data-chy-social', '');
      }
    });
    // Content cards: bordered/filled boxes in a grid of 3+ that aren't links themselves.
    root.querySelectorAll('section div').forEach(function (el) {
      if (el.__chyC) return; el.__chyC = true;
      var p = el.parentElement; if (!p) return;
      var pcs = getComputedStyle(p);
      var layout = pcs.display.indexOf('grid') > -1 || (pcs.display.indexOf('flex') > -1 && pcs.flexDirection.indexOf('row') === 0);
      if (!layout || p.children.length < 2) return;
      var s = inline(el);
      if (/position:absolute|position:fixed/.test(s)) return;
      var cs = getComputedStyle(el);
      var surfaced = isFilled(el) || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderRadius) > 0 || el.querySelector(':scope > image-slot, :scope > figure, :scope > div > image-slot');
      if (!surfaced) return;
      var r = el.getBoundingClientRect();
      if (r.width < 160 || r.height < 120 || r.width > window.innerWidth * 0.7) return;
      if (el.querySelector('[data-chy-card]') || el.closest('[data-chy-card]')) return;
      el.setAttribute('data-chy-card', '');
      if (el.querySelector('image-slot, img')) el.setAttribute('data-chy-zoom', '');
    });
    // Framed images outside cards: figures / overflow-hidden wrappers that aren't full-bleed backgrounds.
    root.querySelectorAll('image-slot').forEach(function (slot) {
      var w = slot.parentElement;
      if (!w || w.__chyZ || /position:absolute/.test(inline(slot))) return;
      w.__chyZ = true;
      if (getComputedStyle(w).overflow === 'hidden' || w.tagName === 'FIGURE') {
        w.style.overflow = 'hidden';
        w.setAttribute('data-chy-zoom', '');
      }
    });
  }

  // ---------- nav hide/show + blur ----------
  var navReady = false;
  function setupNav() {
    if (navReady) return;
    if (!document.querySelector('nav')) return;
    navReady = true;
    var navs = Array.prototype.filter.call(document.querySelectorAll('nav'), function (n) {
      var p = getComputedStyle(n).position; return p === 'sticky' || p === 'fixed';
    });
    if (!navs.length) {
      // Homepage: nav sits inside the hero. Promote it to a fixed bar once the hero scrolls away.
      var hn = document.querySelector('nav');
      if (!hn) return;
      var hero = hn.closest('section') || hn.parentElement;
      var ph = document.createElement('div'); ph.style.cssText = 'height:0';
      hn.parentNode.insertBefore(ph, hn);
      hn.setAttribute('data-chy-nav', 'shown');
      var docked = false, last0 = window.scrollY, saved = null;
      var KEYS = ['position','top','left','right','zIndex','background','marginTop','paddingTop','paddingBottom'];
      window.addEventListener('scroll', function () {
        var y = window.scrollY, limit = (hero ? hero.offsetHeight : 600) * 0.6;
        if (y > limit && !docked) {
          docked = true; ph.style.height = (hn.offsetHeight + (parseFloat(getComputedStyle(hn).marginTop) || 0)) + 'px';
          saved = {}; KEYS.forEach(function (k) { saved[k] = hn.style[k]; });
          hn.style.position = 'fixed'; hn.style.top = '0'; hn.style.left = '0'; hn.style.right = '0'; hn.style.zIndex = '50';
          hn.setAttribute('data-chy-docked', '1'); hn.style.marginTop = '0'; hn.style.paddingTop = '14px'; hn.style.paddingBottom = '14px'; hn.setAttribute('data-chy-nav', 'hidden');
          requestAnimationFrame(function () { requestAnimationFrame(function () { hn.setAttribute('data-chy-nav', 'shown'); }); });
        } else if (y <= limit && docked) {
          docked = false; ph.style.height = '0';
          if (saved) KEYS.forEach(function (k) { hn.style[k] = saved[k]; });
          hn.removeAttribute('data-chy-docked'); hn.setAttribute('data-chy-nav', 'shown');
        }
        last0 = y;
      }, { passive: true });
      return;
    }
    if (!navs.length) return;
    navs.forEach(function (n) { if (!n.hasAttribute('data-chy-nav')) n.setAttribute('data-chy-nav', 'shown'); });
    // Sticky only works inside a tall parent — if the nav is wrapped in a mount of its own height, pin the mount.
    navs.forEach(function (n) {
      var p = n.parentElement;
      if (p && p !== document.body && Math.abs(p.offsetHeight - n.offsetHeight) < 4 && getComputedStyle(p).position !== 'sticky') {
        p.style.position = 'sticky'; p.style.top = '0'; p.style.zIndex = '40';
      }
    });
    var last = window.scrollY, ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY, down = y > last + 4, up = y < last - 4;
        navs.forEach(function (n) {
          n.setAttribute('data-chy-nav', 'shown');
          n.setAttribute('data-chy-scrolled', y > 8 ? '1' : '0');
        });
        last = y; ticking = false;
      });
    }, { passive: true });
  }

  // ---------- back to top ----------
  function setupTop() {
    if (document.getElementById('chy-top')) return;
    var b = document.createElement('button');
    b.id = 'chy-top'; b.type = 'button'; b.setAttribute('aria-label', 'Back to top');
    b.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
    document.body.appendChild(b);
    window.addEventListener('scroll', function () { b.classList.toggle('on', window.scrollY > 700); }, { passive: true });
  }

  // ---------- page transitions ----------
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var href = a.getAttribute('href') || '';
    if (!/\.dc\.html(\?|#|$)/.test(href) || reduce) return;
    e.preventDefault();
    document.body.classList.add('chy-leaving');
    setTimeout(function () { window.location.href = a.href; }, 280);
  }, true);
  window.addEventListener('pageshow', function () { document.body && document.body.classList.remove('chy-leaving'); });

  // ---------- photo loading priority ----------
  function tunePhotos() {
    var vh = window.innerHeight;
    document.querySelectorAll('image-slot').forEach(function (s) {
      if (s.__chyP || !s.shadowRoot) return;
      var im = s.shadowRoot.querySelector('img[part="image"]'); if (!im) return;
      s.__chyP = true;
      var mark = function () {
        if (im.complete && im.naturalWidth) s.setAttribute('data-chy-loaded', '');
        else s.removeAttribute('data-chy-loaded');
      };
      mark();
      im.addEventListener('load', mark);
      im.addEventListener('error', function () { s.setAttribute('data-chy-loaded', ''); });
      // src changes (user drop / reframe) re-arm the shimmer until the new image lands
      new MutationObserver(function () { if (!(im.complete && im.naturalWidth)) s.removeAttribute('data-chy-loaded'); else mark(); })
        .observe(im, { attributes: true, attributeFilter: ['src'] });
      var r = s.getBoundingClientRect(), near = r.top < vh * 1.5;
      im.decoding = 'async';
      try { im.fetchPriority = near ? 'high' : 'low'; } catch (e) {}
      if (!near && !im.complete) im.loading = 'lazy';
    });
  }
  // warm the browser cache for photos just below the fold while idle
  function prefetchSoon() {
    var seen = {};
    document.querySelectorAll('image-slot[src]').forEach(function (s) {
      var u = s.getAttribute('src'); if (!u || seen[u] || /^data:/.test(u)) return; seen[u] = 1;
      var l = document.createElement('link'); l.rel = 'prefetch'; l.as = 'image'; l.href = u; document.head.appendChild(l);
    });
  }

  // ---------- boot ----------
  function scan() {
    if (!document.body) return;
    setupNav();
    tunePhotos();
    if (!reduce) document.querySelectorAll('section').forEach(function (s) {
      if (s.closest('nav')) return;
      if (s.getBoundingClientRect().height < 40) return;
      revealSection(s);
    });
    markInteractive(document.body);
  }
  var t;
  function schedule() { clearTimeout(t); t = setTimeout(scan, 250); }
  function boot() {
    tunePhotos();
    setTimeout(function () { scan(); setupNav(); setupTop(); }, 500);
    (window.requestIdleCallback || function (f) { setTimeout(f, 1200); })(prefetchSoon);
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

// ---------- responsive layer: collapses fixed multi-column grids / tames fixed sizes on small screens ----------
(function () {
  if (window.__chyResp) return; window.__chyResp = true;
  var css = `
  html,body{max-width:100%;overflow-x:clip}
  img,video,svg,image-slot,iframe{max-width:100%}
  input,select,textarea,button{max-width:100%}
  input,select,textarea{font-size:max(16px,1em)}
  @media (max-width:1100px){
    [data-chy-cols="4"]{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  }
  @media (max-width:960px){
    [data-chy-cols="3"],[data-chy-cols="4"]{grid-template-columns:repeat(2,minmax(0,1fr))!important}
    [data-chy-cols="2a"]{grid-template-columns:minmax(0,1fr)!important}
    [data-chy-row]{flex-wrap:wrap!important}
    [data-chy-row]>*{flex:1 1 100%!important;max-width:100%!important;width:100%!important}
    [data-chy-tall]{min-height:clamp(260px,62vw,440px)!important}
  }
  @media (max-width:760px){
    [data-chy-mstack]{height:auto!important}
    [data-chy-mstack]>div{position:relative!important;height:auto!important;flex-direction:column!important;overflow:visible!important}
    [data-chy-mstack]>div>div{flex:none!important;width:100%!important;opacity:1!important;box-sizing:border-box}
    [data-chy-mstack]>div>div:first-child{padding:56px clamp(20px,6vw,40px)!important}
    [data-chy-mstack]>div>div:last-child{min-height:72vh}
    [data-chy-rrow]{flex-direction:column!important;align-items:stretch!important;gap:20px!important;padding:28px 0!important}
    [data-chy-rrow]>div{flex:none!important;width:100%!important}
    [data-chy-rimg]{height:clamp(240px,70vw,420px)!important}
  }
  @media (max-width:900px){
    [data-pd-gallery]{position:relative!important;top:auto!important;height:auto!important;min-height:0!important;max-height:none!important}
    [data-pd-stage]{flex:none!important;aspect-ratio:4/5;max-height:72vh}
    [data-pd-square]{aspect-ratio:1/1}
    [data-pd-main]{gap:28px!important}
  }
  @media (max-width:640px){
    [data-pd-stage]:not([data-pd-square]){aspect-ratio:1/1;max-height:none;margin:0 -20px;width:calc(100% + 40px)!important}
    [data-pd-stage]:not([data-pd-square]) button{width:36px!important;height:36px!important}
    [data-pd-thumbs]{height:60px!important;gap:8px!important}
    [data-pd-mhead]{display:block!important}
    [data-pd-dhead]{display:none!important}
    [data-pd-gallery][class~="pd-sticky"]{margin:0 -20px;gap:10px!important}
    [data-pd-square]{display:none!important}
    [data-pd-mcarousel]{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}
    [data-pd-mcarousel]::-webkit-scrollbar{display:none}
    [data-pd-mbadge],[data-pd-mcount]{display:block!important}
    .pd-sticky [data-pd-thumbs]{padding:0 20px;overflow-x:auto;scrollbar-width:none;height:64px!important}
    .pd-sticky [data-pd-thumb]{flex:0 0 64px!important;border-radius:8px}
    [data-pd-main]{gap:20px!important}
    [data-pd-info]{display:flex;flex-direction:column}
    [data-pd-opts]{order:1;border-top:none!important;padding-top:4px!important}
    [data-pd-cta]{order:2;grid-template-columns:1fr!important;gap:10px!important}
    [data-pd-cta] [data-pd-buy]{order:-1}
    [data-pd-cta] button{height:56px!important;font-size:16px!important}
    [data-pd-desc]{order:3;font-size:15px!important;margin:4px 0 20px!important}
    [data-pd-perks]{order:4}
    [data-pd-acc]{order:5;border-top:1px solid #eceae0}
    [data-pd-sizes]{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px!important}
    [data-pd-sizes] button{border-radius:8px!important;height:52px!important;padding:0 8px!important}
    [data-sd-cta]{position:sticky;bottom:12px;z-index:6;filter:drop-shadow(0 10px 18px rgba(7,46,52,0.22))}
    [data-sd-cta]>button:first-child{flex:1 1 auto}
    [data-pd-cta] button{height:50px!important;font-size:14px!important;padding:0 10px!important}
    [data-pd-perks]{grid-template-columns:1fr!important;gap:0!important;border-top:1px solid #eceae0}
    [data-pd-perks]>div{flex-direction:row!important;align-items:center!important;gap:14px!important;padding:14px 0!important;background:transparent!important;border-bottom:1px solid #eceae0}
    [data-pd-perks] span{font-size:14px!important}
    [data-pd-perks] br{display:none}
    [data-pd-perks] strong{margin-right:6px}
    [data-pd-related]{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:14px!important}
    [data-pd-toast]{bottom:16px!important;font-size:13.5px!important;padding:12px 16px!important}
    [data-sd-paths]{gap:10px!important}
    [data-sd-paths]>a{padding:14px 12px!important}
  }
  @media (max-width:760px){
    [data-chy-tabs]{display:none!important}
    [data-chy-tabselect]{display:block!important}
    [data-chy-tabrow]{flex-wrap:nowrap!important;gap:8px!important}
    [data-chy-tabctrl]{gap:6px!important;margin-left:0!important}
    [data-chy-tabctrl]>a{padding:0 14px!important;height:40px!important;font-size:13px!important}
    [data-chy-tabctrl]>button{width:40px!important;height:40px!important;flex:none}
  }
  @media (max-width:960px){
    [data-chy-hscroll]{grid-auto-columns:calc((100% - 16px)/2.15)!important}
  }
  @media (max-width:640px){
    [data-chy-hscroll]{grid-auto-columns:86%!important;scroll-snap-type:x mandatory;scroll-padding-left:0;min-height:460px;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}
    [data-chy-hscroll]>*{scroll-snap-align:start}
    [data-chy-fbwrap]{overflow-x:auto!important;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}
    [data-chy-fbwrap]::-webkit-scrollbar{display:none}
    [data-chy-fbtrack]{animation:none!important;transform:none!important;gap:12px!important;padding:0 20px!important}
    [data-chy-fbcard]{flex:0 0 calc(100vw - 40px)!important;scroll-snap-align:center}
    [data-chy-fbcard]:nth-child(n+7){display:none!important}
    [data-chy-cols="3"],[data-chy-cols="2"]{grid-template-columns:minmax(0,1fr)!important}
    [data-chy-filterbar]{gap:8px!important;flex-wrap:wrap!important;padding:12px 0!important}
    [data-chy-filterbar] select{flex:0 1 auto!important;width:auto!important;min-width:0!important;max-width:calc(50% - 30px)!important;field-sizing:content;margin:0!important;padding:0 30px 0 14px!important;height:42px!important;font-size:14px!important;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}
    [data-chy-filterbar] [data-chy-count],[data-chy-filterbar] [data-chy-spacer]{display:none!important}
    [data-chy-searchpill]{height:42px!important;margin-left:auto!important}
    [data-chy-searchpill][data-open="0"]{width:42px!important}
    [data-chy-searchpill][data-open="0"] button{width:42px!important;height:42px!important}
    [data-chy-searchpill][data-open="1"]{flex:1 1 100%!important;width:100%!important;order:5}
    [data-bk-stepper]{padding:14px 16px 16px!important}
    [data-bk-main]{padding:22px 16px 0!important}
    [data-bk-main] h2{margin-bottom:4px!important;line-height:1.25}
    [data-bk-main] h2+p{margin-bottom:18px!important;font-size:14px!important;line-height:1.5}
    [data-bk-head]{margin:0 0 18px!important;gap:12px!important}
    [data-bk-head] p{margin:0!important;font-size:14px!important;line-height:1.5}
    [data-bk-main] [data-chy-cols="2a"]{gap:16px!important}
    [data-bk-calhead]{margin-bottom:14px!important;gap:10px!important}
    [data-bk-calhead] h3{font-size:15px!important}
    [data-bk-wd]{margin-bottom:6px!important}
    [data-bk-panel] h3+p{margin-bottom:12px!important}
    [data-bk-nav]{margin-top:20px!important}
    [data-bk-success]{margin-top:-22px!important}
    [data-bk-main] form{gap:14px!important}
    [data-bk-main] .field label{margin-bottom:6px}
    [data-bk-chip]{width:100%;justify-content:space-between!important;gap:10px!important}
    [data-bk-chip]>span{padding:6px 12px 6px 6px!important}
    [data-bk-chip]>span>span:first-child{width:28px!important;height:28px!important;flex:none}
    [data-bk-chip] button{font-size:13px!important}
    [data-bk-step]{gap:6px!important}
    [data-bk-step]>span:first-child{width:28px!important;height:28px!important;font-size:12px!important}
    [data-bk-step]:not([aria-current]) [data-bk-steplabel]{display:none}
    [data-bk-step] [data-bk-steplabel]{font-size:13px!important}
    [data-bk-stepper] ol{justify-content:flex-start}
    [data-bk-step]{flex:none!important}
    [data-bk-line]{flex:0 0 18px!important;min-width:18px!important;margin:0 2px!important}
    [data-bk-step][aria-current] [data-bk-line]{margin-left:4px!important}
    [data-bk-shell]{padding:0!important;gap:12px!important;background:transparent!important}
    [data-bk-panel]{padding:16px!important;border:1px solid #eceae4}
    [data-bk-panel] select{padding:0 28px 0 12px!important;font-size:15px!important}
    [data-bk-wd]>*{padding:0!important;text-align:center;font-size:12px!important}
    .chy-day{height:46px!important;padding:4px!important;align-items:center!important;justify-content:center!important}
    .chy-day>span{justify-content:center!important;min-width:30px!important;height:30px!important}
    [data-bk-times]{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important}
    [data-bk-times]>*{height:46px!important;font-size:14px!important}
    [data-bk-thera]{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
    [data-bk-wallets]{grid-template-columns:repeat(2,minmax(0,1fr))!important}
    [data-bk-nav]{padding:12px 16px calc(12px + env(safe-area-inset-bottom))!important;gap:10px!important;flex-wrap:nowrap!important}
    [data-bk-actions]{flex:1 1 auto;flex-wrap:wrap!important;gap:8px!important;justify-content:flex-end!important}
    [data-bk-actions] [role=alert]{flex:1 1 100%;order:-1;font-size:13px!important;padding:8px 12px!important}
    [data-bk-reset]{padding:12px 14px!important;font-size:0!important;gap:0!important}
    [data-bk-reset] svg{width:17px;height:17px}
    [data-bk-next]{flex:1 1 auto;padding:13px 16px!important;min-height:48px}
    [data-bk-tkt]{padding-left:20px!important;padding-right:20px!important}
    [data-bk-done]{flex-direction:column;align-items:stretch;width:100%;max-width:420px}
    [data-bk-done]>*{justify-content:center}
    [data-chy-fixw]{width:auto!important;max-width:100%!important;height:auto!important}
    [data-chy-h]{height:auto!important;min-height:clamp(240px,70vw,420px)!important}
    table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}
    .chy-top-btn,[data-chy-top]{right:14px!important;bottom:14px!important}
  }
  @media (max-width:480px){
    [data-chy-cols="4"]{grid-template-columns:minmax(0,1fr)!important}
  }
  `;
  var st = document.createElement('style'); st.id = 'chy-responsive'; st.textContent = css;
  var fsCss = '@media (max-width:640px){';
  for (var px = 12; px <= 60; px++) fsCss += '[data-chy-fs="' + px + '"]{font-size:' + px + 'px!important}';
  fsCss += 'h1,h2,h3,h4,p{overflow-wrap:break-word;hyphens:manual}}';
  var st2 = document.createElement('style'); st2.id = 'chy-responsive-type'; st2.textContent = fsCss;
  (document.head || document.documentElement).appendChild(st2);
  window.__chyW = function () { return window.__chySimW || window.innerWidth; };
  window.__chySim = function (w) {
    window.__chySimW = w;
    st.textContent = css.replace(/@media \(max-width:(\d+)px\)\{([\s\S]*?)\n  \}/g, function (_, bp, body) { return w <= +bp ? body : ''; });
    var r = document.documentElement.style; r.width = w + 'px'; r.margin = '0'; r.overflowX = 'hidden'; document.body.style.width = w + 'px';
    window.dispatchEvent(new Event('resize')); setTimeout(tag, 60);
  };
  (document.head || document.documentElement).appendChild(st);

  function tag() {
    var els = document.querySelectorAll('[style]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i], s = el.style;
      if (el.closest('svg')) continue;
      var g = s.gridTemplateColumns;
      if (g && !/auto-fit|auto-fill/.test(g) && !/repeat\(\s*7/.test(g) && !el.hasAttribute('data-chy-nocollapse')) {
        var rep = g.match(/repeat\(\s*(\d+)/), n = rep ? +rep[1] : g.trim().split(/\s+(?![^(]*\))/).length;
        var tok = g.trim().split(/\s+(?![^(]*\))/);
        var equal = rep || tok.every(function (t) { return t === tok[0]; });
        var v = n >= 4 ? '4' : n === 3 ? '3' : n === 2 ? (equal ? '2' : '2a') : '';
        if (v && el.getAttribute('data-chy-cols') !== v) el.setAttribute('data-chy-cols', v);
      }
      if (s.display === 'flex' && s.flexWrap === 'nowrap' && s.flexDirection !== 'column' && !el.hasAttribute('data-chy-navrow') && !el.closest('nav') && !el.closest('[data-chy-mstack]')) {
        var kids = el.children, wide = 0;
        for (var k = 0; k < kids.length; k++) if (kids[k].getBoundingClientRect().width > 260) wide++;
        if (wide >= 2 && !el.hasAttribute('data-chy-row')) el.setAttribute('data-chy-row', '');
      }
      var fs = s.fontSize;
      if (fs && !el.hasAttribute('data-chy-fs') && !/^(INPUT|SELECT|TEXTAREA|OPTION)$/.test(el.tagName)) {
        var mt = fs.match(/(\d+(?:\.\d+)?)px/), b = mt ? +mt[1] : 0, isClamp = /clamp|min\(|max\(/.test(fs), tgt = 0;
        if (b) {
          if (isClamp) { if (b > 22) tgt = Math.max(22, Math.round(b * 0.85)); }
          else if (b >= 15 && b <= 16) tgt = 15;
          else if (b > 16 && b <= 20) tgt = Math.round(b * 0.9);
          else if (b > 20 && b <= 28) tgt = Math.round(b * 0.82);
          else if (b > 28) tgt = Math.max(24, Math.round(b * 0.72));
        }
        el.setAttribute('data-chy-fs', tgt && tgt < b ? String(tgt) : '');
      }
      var w = parseFloat(s.width);
      if (/px$/.test(s.width) && w >= 300 && !el.hasAttribute('data-chy-fixw')) el.setAttribute('data-chy-fixw', '');
      var h = parseFloat(s.height), mh = parseFloat(s.minHeight);
      if (/px$/.test(s.height) && h >= 400 && el.tagName !== 'IFRAME' && !el.hasAttribute('data-chy-h')) el.setAttribute('data-chy-h', '');
      if (/px$/.test(s.minHeight) && mh >= 480 && !el.hasAttribute('data-chy-tall')) el.setAttribute('data-chy-tall', '');
    }
  }
  var q = 0;
  function sched() { clearTimeout(q); q = setTimeout(tag, 300); }
  function go() { tag(); new MutationObserver(sched).observe(document.body, { childList: true, subtree: true }); window.addEventListener('resize', sched); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
