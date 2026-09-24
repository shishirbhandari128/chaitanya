// Chaitanya — site-wide search index + matcher.
(function () {
  if (window.CHY_SEARCH) return;
  var INDEX = [
 {
  "kind": "Services",
  "title": "Signature Panchakarma Retreat",
  "sub": "Featured · 7 days · NPR 45,000",
  "href": "ServiceDetail.dc.html?id=1",
  "keys": "Featured treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Aroma Hot Stone Massage",
  "sub": "Featured · 75 min · NPR 3,800",
  "href": "ServiceDetail.dc.html?id=2",
  "keys": "Featured treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Shirodhara Therapy",
  "sub": "Featured · 60 min · NPR 4,200",
  "href": "ServiceDetail.dc.html?id=3",
  "keys": "Featured treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Deep Tissue Relaxation",
  "sub": "Featured · 60 min · NPR 3,500",
  "href": "ServiceDetail.dc.html?id=4",
  "keys": "Featured treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Herbal Body Polish",
  "sub": "Featured · 45 min · NPR 2,600",
  "href": "ServiceDetail.dc.html?id=5",
  "keys": "Featured treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "3-Day Detox Retreat",
  "sub": "Lifestyle Wellness Package · 3 days · NPR 18,500",
  "href": "ServiceDetail.dc.html?id=6",
  "keys": "Lifestyle Wellness Package treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Stress Recovery Program",
  "sub": "Lifestyle Wellness Package · 5 sessions · NPR 12,000",
  "href": "ServiceDetail.dc.html?id=7",
  "keys": "Lifestyle Wellness Package treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Couples Wellness Package",
  "sub": "Lifestyle Wellness Package · 90 min · NPR 7,600",
  "href": "ServiceDetail.dc.html?id=8",
  "keys": "Lifestyle Wellness Package treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Insomnia Care Package",
  "sub": "Lifestyle Wellness Package · 4 sessions · NPR 9,800",
  "href": "ServiceDetail.dc.html?id=9",
  "keys": "Lifestyle Wellness Package treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Abhyanga Oil Massage",
  "sub": "Relax and Revitalize · 60 min · NPR 3,200",
  "href": "ServiceDetail.dc.html?id=10",
  "keys": "Relax and Revitalize treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Swedish Relaxation Massage",
  "sub": "Relax and Revitalize · 60 min · NPR 3,000",
  "href": "ServiceDetail.dc.html?id=11",
  "keys": "Relax and Revitalize treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Aromatherapy Massage",
  "sub": "Relax and Revitalize · 75 min · NPR 3,600",
  "href": "ServiceDetail.dc.html?id=12",
  "keys": "Relax and Revitalize treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Foot Reflexology",
  "sub": "Relax and Revitalize · 45 min · NPR 2,200",
  "href": "ServiceDetail.dc.html?id=13",
  "keys": "Relax and Revitalize treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Nasya Therapy",
  "sub": "Wellness Therapies · 30 min · NPR 1,800",
  "href": "ServiceDetail.dc.html?id=14",
  "keys": "Wellness Therapies treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Herbal Steam Therapy",
  "sub": "Wellness Therapies · 30 min · NPR 1,500",
  "href": "ServiceDetail.dc.html?id=15",
  "keys": "Wellness Therapies treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Yoga & Meditation Session",
  "sub": "Wellness Therapies · 60 min · NPR 1,200",
  "href": "ServiceDetail.dc.html?id=16",
  "keys": "Wellness Therapies treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Ayurvedic Diet Consultation",
  "sub": "Wellness Therapies · 45 min · NPR 1,500",
  "href": "ServiceDetail.dc.html?id=17",
  "keys": "Wellness Therapies treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Hydrating Facial",
  "sub": "Beauty and Salon · 50 min · NPR 2,800",
  "href": "ServiceDetail.dc.html?id=18",
  "keys": "Beauty and Salon treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Anti-Acne Facial Therapy",
  "sub": "Beauty and Salon · 50 min · NPR 2,900",
  "href": "ServiceDetail.dc.html?id=19",
  "keys": "Beauty and Salon treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Beauty Threading",
  "sub": "Beauty and Salon · 15 min · NPR 250",
  "href": "ServiceDetail.dc.html?id=20",
  "keys": "Beauty and Salon treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Hair Spa Treatment",
  "sub": "Beauty and Salon · 45 min · NPR 2,200",
  "href": "ServiceDetail.dc.html?id=21",
  "keys": "Beauty and Salon treatment therapy spa"
 },
 {
  "kind": "Services",
  "title": "Classic Manicure & Pedicure",
  "sub": "Beauty and Salon · 60 min · NPR 2,000",
  "href": "ServiceDetail.dc.html?id=22",
  "keys": "Beauty and Salon treatment therapy spa"
 },
 {
  "kind": "Products",
  "title": "Beetroot Powder",
  "sub": "Superfood Powder · NPR 250.00",
  "href": "ProductDetail.dc.html?id=1",
  "keys": "Superfood Powder shop buy product"
 },
 {
  "kind": "Products",
  "title": "Flax Seed Oil",
  "sub": "Cold-Pressed Oil · NPR 250.00",
  "href": "ProductDetail.dc.html?id=2",
  "keys": "Cold-Pressed Oil shop buy product"
 },
 {
  "kind": "Products",
  "title": "Hibiscus Powder",
  "sub": "Herbal Powder · NPR 250.00",
  "href": "ProductDetail.dc.html?id=3",
  "keys": "Herbal Powder shop buy product"
 },
 {
  "kind": "Products",
  "title": "Kodali Pancake Mix",
  "sub": "Healthy Kitchen · NPR 250.00",
  "href": "ProductDetail.dc.html?id=4",
  "keys": "Healthy Kitchen shop buy product"
 },
 {
  "kind": "Products",
  "title": "Milk Thistle Powder",
  "sub": "Herbal Powder · NPR 250.00",
  "href": "ProductDetail.dc.html?id=5",
  "keys": "Herbal Powder shop buy product"
 },
 {
  "kind": "Products",
  "title": "Multani Mitti",
  "sub": "Natural Skincare · NPR 250.00",
  "href": "ProductDetail.dc.html?id=6",
  "keys": "Natural Skincare shop buy product"
 },
 {
  "kind": "Pages",
  "title": "Home",
  "sub": "Chaitanya Health & Wellness",
  "href": "index.html",
  "keys": "home landing start"
 },
 {
  "kind": "Pages",
  "title": "About Us",
  "sub": "Our story, values and team",
  "href": "AboutUs.dc.html",
  "keys": "about story team values mission"
 },
 {
  "kind": "Pages",
  "title": "All Services",
  "sub": "Browse every treatment",
  "href": "Services.dc.html",
  "keys": "services treatments massage facial"
 },
 {
  "kind": "Pages",
  "title": "All Products",
  "sub": "Natural wellness products",
  "href": "Products.dc.html",
  "keys": "products shop store"
 },
 {
  "kind": "Pages",
  "title": "Book an Appointment",
  "sub": "Choose therapist, date and time",
  "href": "Booking.dc.html",
  "keys": "book booking appointment reserve schedule"
 },
 {
  "kind": "Pages",
  "title": "Membership",
  "sub": "Plans, pricing and benefits",
  "href": "Membership.dc.html",
  "keys": "membership plans tiers pricing member"
 },
 {
  "kind": "Pages",
  "title": "Reviews",
  "sub": "What our guests say",
  "href": "Reviews.dc.html",
  "keys": "reviews testimonials feedback rating"
 },
 {
  "kind": "Pages",
  "title": "Contact Us",
  "sub": "Location, phone and hours",
  "href": "ContactUs.dc.html",
  "keys": "contact phone email address map location hours"
 },
 {
  "kind": "Pages",
  "title": "Sign In",
  "sub": "Access your account",
  "href": "SignIn.dc.html",
  "keys": "sign in login account register"
 },
 {
  "kind": "Pages",
  "title": "FAQs",
  "sub": "Frequently asked questions",
  "href": "Info.dc.html#faqs",
  "keys": "faq questions help"
 },
 {
  "kind": "Pages",
  "title": "Careers",
  "sub": "Join our team",
  "href": "Info.dc.html#careers",
  "keys": "careers jobs hiring work"
 },
 {
  "kind": "Pages",
  "title": "Terms & Privacy",
  "sub": "Policies",
  "href": "Info.dc.html#terms",
  "keys": "terms privacy policy legal"
 }
];
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]+/g, ' '); }
  INDEX.forEach(function (it) { it._t = norm(it.title); it._h = norm(it.title + ' ' + it.sub + ' ' + it.keys); });
  function search(q, limit) {
    var terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var out = [];
    INDEX.forEach(function (it) {
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        if (it._h.indexOf(t) < 0) return;
        if (it._t.indexOf(t) === 0) score += 6; else if (it._t.indexOf(' ' + t) > -1) score += 4; else if (it._t.indexOf(t) > -1) score += 2; else score += 1;
      }
      out.push({ item: it, score: score });
    });
    out.sort(function (a, b) { return b.score - a.score || a.item.title.localeCompare(b.item.title); });
    return out.slice(0, limit || 30).map(function (o) { return o.item; });
  }
  window.CHY_SEARCH = { index: INDEX, search: search, popular: ['Massage', 'Facial', 'Shirodhara', 'Detox', 'Beetroot', 'Membership'] };
})();
