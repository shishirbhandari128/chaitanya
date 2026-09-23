// Fills every empty <image-slot> with a demo photo via its `src` fallback.
// A user drop still overrides it (and clearing the drop reveals the demo again).
(function () {
  if (window.__chyDemoPhotos) return;
  window.__chyDemoPhotos = true;

  var PHOTOS = [
    'assets/photos/md/spa-woman-flower.jpg',
    'assets/photos/md/spa-young-woman.jpg',
    'assets/photos/md/spa-couple-facial.jpg',
    'assets/photos/md/spa-juice.jpg',
    'assets/photos/md/spa-tea-robes.jpg',
    'assets/photos/md/spa-team.jpg'
  ];
  // Logos / badges keep their own artwork — never fill them with a photo.
  var SKIP = /^(award-badge|review-award|wallet-logo-|client-logo-)/;
  var PEOPLE = /^(fb-av-|rv-|therapist-photo-|avatar-)/;
  var THERAPIST = { as: 'women/44', sg: 'women/68', rt: 'men/32', pk: 'women/21' };

  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }

  function demoFor(id) {
    if (PEOPLE.test(id)) {
      var t = id.match(/^therapist-photo-(\w+)/);
      var TH = { as: 47, sg: 45, rt: 12, pk: 32 };
      if (t && TH[t[1]]) return 'https://i.pravatar.cc/600?img=' + TH[t[1]];
      var h = hash(id);
      return 'https://i.pravatar.cc/400?img=' + (1 + (h % 70));
    }
    return PHOTOS[hash(id) % PHOTOS.length];
  }

  function fill(el) {
    if (!el || el.tagName !== 'IMAGE-SLOT' || el.hasAttribute('src')) return;
    var id = el.id || '';
    if (!id || id.indexOf('{{') !== -1 || SKIP.test(id)) return;
    el.setAttribute('src', demoFor(id));
  }

  function scan(root) {
    if (!root || !root.querySelectorAll) return;
    if (root.tagName === 'IMAGE-SLOT') fill(root);
    root.querySelectorAll('image-slot').forEach(fill);
  }

  function start() {
    scan(document.body);
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        if (m.type === 'attributes') { fill(m.target); return; }
        m.addedNodes.forEach(function (n) { if (n.nodeType === 1) scan(n); });
      });
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['id'] });
  }

  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
