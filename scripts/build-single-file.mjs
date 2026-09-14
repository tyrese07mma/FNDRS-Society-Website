/**
 * Bundles the static export into ONE self-contained index.html.
 *
 *   npm run build:static && npm run build:single
 *
 * Every page, the stylesheet, the fonts and the app screenshots end up inside
 * a single file with no external references — droppable into iCloud Drive,
 * emailed, opened from disk, or deployed to a static host on its own.
 *
 * Next's own JavaScript is removed: its router fetches payloads over HTTP and
 * cannot work from a lone file. The site was built to render fully without
 * scripting, so what remains is the no-JS presentation plus a small router and
 * tab handler written here.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
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
css = css.replace(/@font-face\{[^}]*Inter(?:\s|%20)?(?:Tight\s)?Ext[^}]*\}/g, "");
css = css.replace(/@font-face\s*\{[^}]*url\(\/fonts\/[^)]*\)[^}]*\}/g, "");
css = css.replace(/,\s*"Inter Tight Ext"/g, "").replace(/,\s*"Inter Ext"/g, "");

// Point the remaining two faces at embedded bytes.
css = css.replace(/url\(\.\.\/media\/([^)]+\.woff2)\)/g, (_, name) =>
  `url(${dataUri(join("_next", "static", "media", name), "font/woff2")})`,
);

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
    const scoped = value
      .split(/\s+/)
      .map((v) => prefix + v)
      .join(" ");
    return `${attr}="${scoped}"`;
  });
  body = body.replace(/href="#(?!\/)([^"]+)"/g, `href="#${prefix}$1"`);

  // Internal navigation becomes hash routing inside this one document.
  body = body.replace(/href="(\/[^"#]*)"/g, (m, href) => {
    const known = ROUTES.some((r) => r.path === href);
    return known ? `href="#${href}"` : m;
  });

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

// ── Document ────────────────────────────────────────────────────────────────
const icon = dataUri(join("_next", "static", "media", readdirSync(join(outDir, "_next", "static", "media")).find((f) => f.endsWith(".svg"))), "image/svg+xml");

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
</head>
<body class="${bodyClass}">
${routeMarkup.join("\n")}
<script>
(function () {
  var IMAGES = ${JSON.stringify(Object.fromEntries(imageMap))};

  // Embedded screenshots, applied once at boot.
  var pending = document.querySelectorAll("img[data-src]");
  for (var i = 0; i < pending.length; i++) {
    var src = IMAGES[pending[i].getAttribute("data-src")];
    if (src) pending[i].src = src;
  }

  var routes = Array.prototype.slice.call(document.querySelectorAll(".route"));

  function show(path) {
    var match = routes.filter(function (r) { return r.dataset.route === path; })[0] || routes[0];
    routes.forEach(function (r) { r.hidden = r !== match; });
    document.title = match.dataset.title;
    window.scrollTo(0, 0);
  }

  function fromHash() {
    var hash = location.hash.slice(1);
    show(hash.indexOf("/") === 0 ? hash : "/");
  }

  window.addEventListener("hashchange", fromHash);
  fromHash();

  // In-page anchors still have to scroll rather than switch route.
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

  // The product tour is a React component in the real site. Its markup is
  // already here, so this restores just the tab switching.
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var panel = document.getElementById(tabs[0] && tabs[0].getAttribute("aria-controls"));
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

  // The waitlist has no endpoint in a single file; say so instead of failing.
  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = form.querySelector("[data-offline-note]");
      if (!note) {
        note = document.createElement("p");
        note.setAttribute("data-offline-note", "");
        note.className = "mt-4 rounded-[1.25rem] border border-gold/30 bg-gold-deep/40 p-4 text-[0.875rem] leading-relaxed text-gold-light";
        note.setAttribute("role", "status");
        form.appendChild(note);
      }
      note.textContent = "This is a standalone preview file — signups need the live site.";
    });
  });
})();
</script>
</body>
</html>
`;

import { mkdirSync } from "node:fs";
mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(target, html);

console.log(`Single file: dist/index.html  (${(statSync(target).size / 1024 / 1024).toFixed(2)} MB)`);
console.log(`${ROUTES.length} routes, ${imageMap.size} embedded screenshots, 2 embedded fonts, 0 external requests`);
