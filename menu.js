/* =====================================================================
   COCOON 2027 — menu and footer, shared by every page.

   This is the ONLY file you edit to change the menu or the footer.
     - Show a page in the menu:   change  show: false  ->  show: true
     - Hide a page from the menu: change  show: true   ->  show: false
     - Add a new page: copy _template.html, then add one line below.
   ===================================================================== */

var MENU = [
  { label: "Home", url: "index.html" },

  { label: "Authors", items: [
    { label: "Call for Papers",       url: "call-for-papers.html",  show: true  },
    { label: "Accepted Papers",       url: "accepted-papers.html",  show: false },
    { label: "Camera-Ready",          url: "camera-ready.html",     show: false },
    { label: "Awards",                url: "awards.html",           show: false }
  ]},

  { label: "Program", items: [
    { label: "Invited Speakers",      url: "invited-speakers.html", show: false },
    { label: "Conference Program",    url: "program.html",          show: false },
    { label: "Photos",                url: "photos.html",           show: false }
  ]},

  { label: "Attend", items: [
    { label: "Registration",          url: "registration.html",     show: false },
    { label: "Venue & Accommodation", url: "venue.html",            show: false },
    { label: "Travel & Visa",         url: "travel.html",           show: false }
  ]},

  { label: "Organization", items: [
    { label: "Committees",            url: "committees.html",       show: true  },
    { label: "Conference History",    url: "history.html",          show: true  }
  ]}
];

var SITE = {
  // Contact e-mail shown in the footer. Leave "" until it is decided.
  email: "cocoon2027.melbourne@gmail.com",
  // Conference start and end, in Melbourne time (+10:00), used by the countdown on the home page.
  start: "2027-07-18T09:00:00+10:00",
  end:   "2027-07-21T18:00:00+10:00"
};


/* ----- No need to edit below this line ----- */
(function () {
  var page = location.pathname.split("/").pop() || "index.html";
  var shown = [];   // visible pages, for the footer

  // ---- header ----
  var nav = "";
  MENU.forEach(function (group) {
    if (group.url) {
      shown.push(group);
      nav += '<div class="dropdown"><a class="dropbtn' + (group.url === page ? " active" : "") +
             '" href="' + group.url + '">' + group.label + "</a></div>";
      return;
    }
    var links = group.items.filter(function (item) { return item.show; });
    if (links.length === 0) return;
    var active = links.some(function (item) { return item.url === page; });
    nav += '<div class="dropdown"><button class="dropbtn' + (active ? " active" : "") + '">' +
           group.label + '<i class="arrow"></i></button><div class="dropdown-content">';
    links.forEach(function (item) {
      shown.push(item);
      nav += '<a href="' + item.url + '"' + (item.url === page ? ' class="active"' : "") + ">" +
             item.label + "</a>";
    });
    nav += "</div></div>";
  });

  var header = document.getElementById("header");
  header.innerHTML =
    '<div class="container nav-bar">' +
      '<div class="title"><a href="index.html">COCOON <span>2027</span></a></div>' +
      '<button class="menu-toggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
      '<nav class="topnav">' + nav + "</nav>" +
    "</div>";
  header.querySelector(".menu-toggle").onclick = function () { header.classList.toggle("open"); };

  // ---- footer ----
  var links = shown.map(function (item) {
    return '<li><a href="' + item.url + '">' + item.label + "</a></li>";
  }).join("");
  var contact = SITE.email
    ? '<li><a href="mailto:' + SITE.email + '">' + SITE.email + "</a></li>"
    : "<li>To be announced</li>";

  document.getElementById("footer").innerHTML =
    '<div class="container footer-grid">' +
      '<div><div class="footer-name">COCOON 2027</div>' +
        "The 33rd International Computing and Combinatorics Conference<br>" +
        "18&ndash;21 July 2027 &middot; Melbourne, Australia</div>" +
      "<div><h4>Quick Links</h4><ul>" + links + "</ul></div>" +
      "<div><h4>Contact</h4><ul>" + contact + "</ul></div>" +
    "</div>" +
    '<div class="container"><div class="footer-bottom">&copy; COCOON 2027 Organizing Committee</div></div>';

  // ---- countdown (only on pages that have <div id="countdown">) ----
  var box = document.getElementById("countdown");
  if (box) {
    var start = new Date(SITE.start), end = new Date(SITE.end);
    var unit = function (n, label) {
      return '<div class="cd-unit"><span>' + n + "</span>" + label + "</div>";
    };
    var tick = function () {
      var now = new Date(), ms = start - now;
      if (now >= end) { box.innerHTML = '<p class="cd-msg">Thank you for joining COCOON 2027!</p>'; return; }
      if (ms <= 0)    { box.innerHTML = '<p class="cd-msg">COCOON 2027 is happening now!</p>'; return; }
      box.innerHTML =
        unit(Math.floor(ms / 86400000), "Days") +
        unit(Math.floor(ms / 3600000) % 24, "Hours") +
        unit(Math.floor(ms / 60000) % 60, "Mins") +
        unit(Math.floor(ms / 1000) % 60, "Secs");
    };
    tick();
    setInterval(tick, 1000);
  }

  // ---- videos: <a class="video" data-youtube="VIDEO_ID"> plays in place when the site is online ----
  var videos = document.querySelectorAll("[data-youtube]");
  for (var i = 0; i < videos.length; i++) {
    videos[i].onclick = function (e) {
      if (location.protocol.indexOf("http") !== 0) return;   // local file: open on YouTube
      e.preventDefault();
      this.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + this.getAttribute("data-youtube") +
        '?autoplay=1" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    };
  }
})();
