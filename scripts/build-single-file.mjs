/**
 * Bundles the static export into ONE self-contained index.html.
 *
 *   npm run build:static && npm run build:single
 *
 * Every page, the stylesheet, the fonts and the app screenshots end up inside
 * a single file with no external references — droppable into a phone's file
 * manager, emailed, opened from disk, or deployed on its own.
 *
 * Next's own JavaScript is removed: its router fetches payloads over HTTP and
 * cannot work from a lone file. The behaviour it provided is reimplemented
 * here in plain JS — routing, the mobile menu, the header's scroll state, the
 * scroll reveals and the product-tour tabs — so the file behaves like the real
 * site rather than falling back to the no-script layout.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "out");
const target = join(root, "dist", "index.html");

if (!existsSync(outDir)) {
  console.error("No out/ folder. Run `npm run build:static` first.");
  process.exit(1);
}

const ROUTES = [
  { path: "/", file: "index.html" },
  { path: "/about", file: "about.html" },
  { path: "/features", file: "features.html" },
  { path: "/how-it-works", file: "how-it-works.html" },
  { path: "/beta", file: "beta.html" },
  { path: "/faq", file: "faq.html" },
  { path: "/privacy", file: "privacy.html" },
  { path: "/terms", file: "terms.html" },
  { path: "/imprint", file: "imprint.html" },
];

const dataUri = (file, type) =>
  `data:${type};base64,${readFileSync(join(outDir, file)).toString("base64")}`;

const between = (html, open, close) => {
  const a = html.indexOf(open);
  if (a < 0) return "";
  const start = html.indexOf(">", a) + 1;
  const b = html.lastIndexOf(close);
  return html.slice(start, b);
};

// ── Stylesheet ──────────────────────────────────────────────────────────────
const cssFile = readdirSync(join(outDir, "_next", "static", "chunks")).find((f) => f.endsWith(".css"));
let css = readFileSync(join(outDir, "_next", "static", "chunks", cssFile), "utf8");

// The Latin-Extended faces exist for characters this site never renders. In a
// single file there is no lazy loading to save them, so they are dropped along
// with their now-dangling family names in the font stacks.
css = css.replace(/@font-face\s*\{[^}]*url\(\/fonts\/[^)]*\)[^}]*\}/g, "");
css = css.replace(/,\s*"Inter Tight Ext"/g, "").replace(/,\s*"Inter Ext"/g, "");

// Point the remaining two faces at embedded bytes.
let embeddedFonts = 0;
css = css.replace(/url\(\.\.\/media\/([^)]+\.woff2)\)/g, (_, name) => {
  embeddedFonts += 1;
  return `url(${dataUri(join("_next", "static", "media", name), "font/woff2")})`;
});

// ── Page bodies ─────────────────────────────────────────────────────────────
const first = readFileSync(join(outDir, ROUTES[0].file), "utf8");
const htmlClass = (first.match(/<html[^>]*class="([^"]*)"/) || [, ""])[1];
const bodyClass = (first.match(/<body[^>]*class="([^"]*)"/) || [, ""])[1];

const imageMap = new Map();
const routeMarkup = [];

ROUTES.forEach((route, index) => {
  const raw = readFileSync(join(outDir, route.file), "utf8");
  const title = (raw.match(/<title>([^<]*)<\/title>/) || [, "FNDRS Society"])[1];

  let body = between(raw, "<body", "</body>");
  body = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  body = body.replace(/<template\b[^>]*>[\s\S]*?<\/template>/g, "");
  body = body.replace(/<next-route-announcer\b[\s\S]*?<\/next-route-announcer>/g, "");

  // Every page carries its own header and form, so ids repeat across routes.
  // Namespacing them keeps the combined document valid and keeps each label
  // pointing at the field beside it rather than one on another page.
  const prefix = `r${index}-`;
  body = body.replace(/\b(id|for|aria-controls|aria-labelledby|aria-describedby)="([^"]+)"/g, (m, attr, value) => {
    const scoped = value.split(/\s+/).map((v) => prefix + v).join(" ");
    return `${attr}="${scoped}"`;
  });
  body = body.replace(/href="#(?!\/)([^"]+)"/g, `href="#${prefix}$1"`);

  // Internal navigation becomes hash routing inside this one document.
  body = body.replace(/href="(\/[^"#]*)"/g, (m, href) =>
    ROUTES.some((r) => r.path === href) ? `href="#${href}"` : m,
  );

  // Screenshots are referenced up to eight times per page and repeat across
  // pages. Each one is embedded once and applied by the boot script.
  body = body.replace(/src="(\/app\/[^"]+)"/g, (m, src) => {
    if (!imageMap.has(src)) imageMap.set(src, dataUri(src.replace(/^\//, ""), "image/webp"));
    return `data-src="${src}"`;
  });

  routeMarkup.push(
    `<div class="route" data-route="${route.path}" data-title="${title.replace(/"/g, "&quot;")}"${
      index === 0 ? "" : " hidden"
    }>${body}</div>`,
  );
});

const iconFile = readdirSync(join(outDir, "_next", "static", "media")).find((f) => f.endsWith(".svg"));
const icon = dataUri(join("_next", "static", "media", iconFile), "image/svg+xml");

const boot = `
(function () {
  var IMAGES = ${JSON.stringify(Object.fromEntries(imageMap))};

  var ICON_MENU =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3.5 7h17"></path><path d="M3.5 12h17"></path><path d="M3.5 17h17"></path></svg>';
  var ICON_CLOSE =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';

  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  // ── Embedded screenshots ──────────────────────────────────────────────────
  each(document.querySelectorAll("img[data-src]"), function (img) {
    var src = IMAGES[img.getAttribute("data-src")];
    if (src) img.src = src;
  });

  // ── Hero headline ─────────────────────────────────────────────────────────
  // The words are hidden until an ancestor carries \`split-ready\`, which React
  // normally adds. Next frame, so the transition has a start value.
  requestAnimationFrame(function () {
    document.body.classList.add("split-ready");
  });

  // ── Reading progress and parallax ─────────────────────────────────────────
  (function () {
    var root = document.documentElement;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var layers = reduced ? [] : Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    var frame = 0;

    function update() {
      frame = 0;
      var max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", max > 8 ? String(Math.min(1, window.scrollY / max)) : "0");

      var viewport = window.innerHeight;
      for (var i = 0; i < layers.length; i++) {
        var rect = layers[i].getBoundingClientRect();
        if (rect.bottom < -viewport || rect.top > viewport * 2) continue;
        var strength = Number(layers[i].dataset.parallax) || 0;
        var offset = (viewport / 2 - (rect.top + rect.height / 2)) / viewport;
        layers[i].style.setProperty("--parallax-y", (offset * strength).toFixed(2) + "px");
      }
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  })();

  // ── Scroll reveals ────────────────────────────────────────────────────────
  // The stylesheet hides these while the \`js\` class is present, so if anything
  // here fails the content must still end up visible.
  function revealAll() {
    each(document.querySelectorAll("[data-reveal]"), function (el) { el.dataset.reveal = "shown"; });
  }

  try {
    if (typeof IntersectionObserver === "undefined") {
      revealAll();
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          each(entries, function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.dataset.reveal = "shown";
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
      each(document.querySelectorAll("[data-reveal]"), function (el) { observer.observe(el); });
      // A hidden route's elements never intersect, so they wait here until the
      // router shows them — but nothing may stay invisible indefinitely.
      setTimeout(function () {
        each(document.querySelectorAll(".route:not([hidden]) [data-reveal]"), function (el) {
          if (el.dataset.reveal !== "shown") el.dataset.reveal = "shown";
        });
      }, 2500);
    }
  } catch (e) {
    revealAll();
  }

  // ── Header: scroll state and mobile menu ──────────────────────────────────
  var closers = [];

  each(document.querySelectorAll(".route"), function (route) {
    var shell = route.querySelector("[data-site-header]");
    if (!shell) return;
    var toggle = route.querySelector("[data-menu-toggle]");
    var panel = toggle ? document.getElementById(toggle.getAttribute("aria-controls")) : null;

    function paint() {
      var solid = window.scrollY > 12 || (panel && !panel.hidden);
      shell.classList.toggle("border-transparent", !solid);
      shell.classList.toggle("bg-transparent", !solid);
      shell.classList.toggle("border-line", !!solid);
      shell.classList.toggle("bg-ink/88", !!solid);
      shell.classList.toggle("backdrop-blur-xl", !!solid);
    }

    window.addEventListener("scroll", paint, { passive: true });
    paint();

    if (!toggle || !panel) return;

    function setOpen(open) {
      panel.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
      toggle.innerHTML = open ? ICON_CLOSE : ICON_MENU;
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.setAttribute("aria-expanded", String(open));
      paint();
    }

    toggle.addEventListener("click", function () { setOpen(panel.hidden); });
    panel.addEventListener("click", function (event) {
      if (event.target.closest && event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.hidden) { setOpen(false); toggle.focus(); }
    });

    closers.push(function () { setOpen(false); });
  });

  // ── Routing ───────────────────────────────────────────────────────────────
  var routes = Array.prototype.slice.call(document.querySelectorAll(".route"));

  function show(path) {
    var match = routes.filter(function (r) { return r.dataset.route === path; })[0] || routes[0];
    routes.forEach(function (r) { r.hidden = r !== match; });
    document.title = match.dataset.title;
    closers.forEach(function (close) { close(); });
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    document.documentElement.style.setProperty("--scroll-progress", "0");
  }

  function fromHash() {
    var hash = location.hash.slice(1);
    show(hash.indexOf("/") === 0 ? hash : "/");
  }

  window.addEventListener("hashchange", fromHash);
  fromHash();

  // In-page anchors scroll rather than switch route.
  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href").slice(1);
    if (id.indexOf("/") === 0) return;
    var el = document.getElementById(id);
    if (el) {
      event.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // ── Product tour tabs ─────────────────────────────────────────────────────
  each(document.querySelectorAll('[role="tablist"]'), function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;
    var panel = document.getElementById(tabs[0].getAttribute("aria-controls"));
    if (!panel) return;
    var frames = Array.prototype.slice.call(panel.querySelectorAll(".absolute.inset-0"));

    function select(index) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        tab.classList.toggle("bg-cream", on);
        tab.classList.toggle("text-ink", on);
        tab.classList.toggle("text-muted", !on);
      });
      frames.forEach(function (frame, i) {
        frame.classList.toggle("opacity-100", i === index);
        frame.classList.toggle("opacity-0", i !== index);
        frame.classList.toggle("pointer-events-none", i !== index);
        frame.setAttribute("aria-hidden", String(i !== index));
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(i); });
      tab.addEventListener("keydown", function (event) {
        var last = tabs.length - 1;
        var next = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = i === last ? 0 : i + 1;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = i === 0 ? last : i - 1;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = last;
        if (next !== null) { event.preventDefault(); select(next); tabs[next].focus(); }
      });
    });
  });

  // ── Waitlist ──────────────────────────────────────────────────────────────
  each(document.querySelectorAll("form"), function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = form.querySelector("[data-offline-note]");
      if (!note) {
        note = document.createElement("p");
        note.setAttribute("data-offline-note", "");
        note.setAttribute("role", "status");
        note.className =
          "mt-4 rounded-[1.25rem] border border-gold/30 bg-gold-deep/40 p-4 text-[0.875rem] leading-relaxed text-gold-light";
        form.appendChild(note);
      }
      note.textContent = "This is a standalone preview file \\u2014 signups need the live site.";
    });
  });
})();
`;

const html = `<!doctype html>
<html lang="en" class="${htmlClass}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>FNDRS Society — Find what's missing</title>
<meta name="description" content="A matching platform for founders and builders. Find a co-founder, the skill your team is missing, or a project worth joining." />
<meta name="robots" content="noindex, nofollow" />
<meta name="theme-color" content="#08080a" />
<meta name="color-scheme" content="dark" />
<link rel="icon" href="${icon}" />
<style>${css}</style>
<style>
  /* Only the active route is in flow; the rest stay parsed but out of the way. */
  .route[hidden] { display: none !important; }
</style>
<script>
  /* Runs before the body paints, so the site takes its scripted layout —
     mobile menu and scroll reveals — instead of the no-script fallback. */
  document.documentElement.className += " js";
</script>
</head>
<body class="${bodyClass}">
${routeMarkup.join("\n")}
<script>${boot}</script>
</body>
</html>
`;

mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(target, html);

console.log(`Single file: dist/index.html  (${(statSync(target).size / 1024 / 1024).toFixed(2)} MB)`);
console.log(
  `${ROUTES.length} routes, ${imageMap.size} embedded screenshots, ${embeddedFonts} embedded fonts, 0 external requests`,
);
