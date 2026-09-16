# FNDRS Society — Website

The official marketing site for **FNDRS Society**, the co-founder and collaborator
matching platform for founders and builders.

This repository contains the website only. It is completely separate from the
FNDRS mobile app — nothing here imports, builds or deploys app code, so the beta
app cannot be affected by changes made in this repo.

---

## Stack

| Concern    | Choice                                                       |
| ---------- | ------------------------------------------------------------ |
| Framework  | Next.js 16 (App Router, React 19, Turbopack)                 |
| Language   | TypeScript, `strict` + `noUncheckedIndexedAccess`            |
| Styling    | Tailwind CSS v4 with design tokens in `src/app/globals.css`  |
| Fonts      | Inter, Inter Tight and Geist Mono, self-hosted via `next/font/local` |
| Icons      | Hand-rolled inline SVGs (`src/components/ui/Icon.tsx`)       |
| Animation  | CSS transitions; one `IntersectionObserver` and one rAF scroll loop |

Runtime dependencies: `next`, `react`, `react-dom`. That is the whole list — no
UI kit, no animation library, no icon package, no Supabase client.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: everything has a safe default
npm run dev                  # http://localhost:3000
```

Useful scripts:

```bash
npm run build         # production build (server, with the waitlist API)
npm run start         # serve the production build
npm run build:static  # static export to out/ — see "Static deployment" below
npm run build:single  # bundle out/ into one self-contained dist/index.html
npm run typecheck     # tsc --noEmit
npm run lint          # eslint
npm run check         # typecheck + lint + build
```

## Routes

| Route              | Contents                                                              |
| ------------------ | --------------------------------------------------------------------- |
| `/`                | Hero, the gap, comparison, how it works, product preview, features, audience, early access, FAQ, closing CTA |
| `/about`           | What FNDRS is, the product principles, comparison, who it is for       |
| `/features`        | Product tour plus every surface described in detail                    |
| `/how-it-works`    | The five steps, what matching reads, product tour (`HowTo` schema)     |
| `/beta`            | Early access form, what it includes, timeline, short FAQ               |
| `/faq`             | Full FAQ (`FAQPage` schema)                                            |
| `/privacy`         | Privacy policy — **draft, needs review**                               |
| `/terms`           | Terms of service — **draft, needs review**                             |
| `/imprint`         | Imprint — **placeholders only, must be filled in**                     |
| `/api/waitlist`    | `POST` endpoint behind the early access form                           |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/icon.svg`, `/apple-icon.png` | Generated |
| `/opengraph-image`, `/twitter-image` | Social cards — the home card plus one per marketing page, from the shared template in `src/lib/og.tsx` |

## Project layout

```
src/
├─ app/                     Routes, metadata, sitemap, robots, OG image, API
├─ components/
│  ├─ analytics/            Env-driven analytics loader
│  ├─ brand/                Wordmark
│  ├─ layout/               Header (with mobile menu) and footer
│  ├─ marketing/            Page sections — Hero, ProductTour, FeatureGrid, …
│  ├─ ui/                   Primitives — Button, Card, Section, Icon, Reveal, …
│  └─ waitlist/             Early access form
├─ content/                 Copy as data: features, steps, audience, FAQ, screens
├─ fonts/                   Self-hosted woff2 + subsetted TTFs for the OG image
└─ lib/                     Site config, waitlist adapters, rate limit, helpers
public/app/                 Real screenshots from the FNDRS beta app
supabase/migrations/        SQL for the waitlist table
```

Copy lives in `src/content/*` rather than inside components, so text can be
edited without touching layout.

## Design system

Every colour is sampled from the beta app so the site and the product read as
one brand. Tokens are defined once in `src/app/globals.css`:

| Token                        | Value     | Role                                   |
| ---------------------------- | --------- | -------------------------------------- |
| `--color-ink`                | `#08080a` | Page background                        |
| `--color-band`               | `#0a0a0c` | Alternating band background            |
| `--color-surface`            | `#131317` | Cards                                  |
| `--color-elevated`           | `#1e1e24` | Icon tiles                             |
| `--color-line`               | `#23232b` | Hairlines                              |
| `--color-cream`              | `#f4f1e9` | Foreground, primary button             |
| `--color-muted`              | `#8a8a93` | Body text                              |
| `--color-faint`              | `#7f7f8a` | Small supporting text (AA on all bands)|
| `--color-gold`               | `#bb9c63` | Brand accent (the app's signature)     |
| `--color-gold-light`         | `#e4cd9b` | Accent text on dark gold               |
| `--color-olive`              | `#585945` | Secondary accent, from the app avatars |
| `--color-coral`              | `#e0705f` | Errors, mirroring the app's skip action|

Radii, easing and breakpoints are tokens too (`--radius-card`, `--ease-out-soft`,
`--ease-out-expo`).

Three type roles carry the design: **Inter Tight** for display, **Inter** for
running text, and **Geist Mono** for anything that reads as data — section
indices, labels, captions. The `.label` utility sets that last role in one place.

### Motion

Every effect is CSS; JavaScript only supplies the trigger, and all of it is
disabled under `prefers-reduced-motion`.

| Piece | Where | Cost |
| ----- | ----- | ---- |
| Scroll reveals | `Reveal` | one `IntersectionObserver` per instance, disconnected after firing |
| Hero headline | `SplitText` | none — words carry staggered CSS delays |
| Reading progress, parallax | `ScrollFX` | one passive scroll listener, one rAF tick for the page |
| Cursor-follow card highlight | `SpotlightGroup` + `.spotlight` | one `pointermove` per grid, mouse only |
| Role ticker | `Marquee` | pure CSS keyframes, pauses on hover |
| Button sheen, nav underline, row rules | `.sheen`, `.link-sweep`, utility classes | pure CSS |

Nothing is parked at `opacity: 0` waiting on script that might not run: the
hidden states live behind a `js` class that an inline script sets before the
body paints, so without JavaScript the page renders complete.

## App screenshots

`public/app/*.webp` are real captures from the beta, cleaned up (the iOS
AssistiveTouch overlay and a leftover placeholder username were removed) and
exported at 900px wide.

To swap or add one: drop the file into `public/app`, then edit
`src/content/screenshots.ts` — each entry carries the tab label, headline, body
copy and alt text. The product tour and every phone mockup read from that array,
so nothing else needs to change.

## Waitlist

`POST /api/waitlist` validates the address, applies a small per-IP rate limit,
drops honeypot submissions, then writes through whichever adapter is configured
in `src/lib/waitlist.ts`:

1. **Supabase** — set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, after
   running `supabase/migrations/0001_waitlist.sql`. It talks to PostgREST over
   `fetch`, so no client library is needed and the service key never reaches the
   browser.
2. **Webhook** — set `WAITLIST_WEBHOOK_URL` to anything that accepts a JSON POST.

With neither set, the endpoint returns `503 not_configured` and the form says
signups are not open yet. That is deliberate: it never pretends to have stored
an address it discarded.

## Static deployment

`npm run build:static` writes a plain folder of files to `out/` that any static
host will serve — Netlify drag-and-drop, S3, GitHub Pages, nginx:

```bash
npm run build:static                        # private preview, not indexable
NEXT_PUBLIC_NOINDEX=0 npm run build:static  # public deployment
```

Drag `out/` (or a zip of its contents) onto [app.netlify.com/drop](https://app.netlify.com/drop).

Three things differ from the server build, all handled by the script:

- **No `/api/waitlist`.** A static host runs no server code, and Next refuses to
  export a dynamic route handler at all, so `scripts/build-static.mjs` moves
  `src/app/api` aside for the build and restores it afterwards — including when
  the build fails or is interrupted. The form detects the missing endpoint and
  shows its "signups aren't connected yet" state rather than a generic error.
- **No `headers()`.** That config only applies to a server, so the script writes
  an equivalent Netlify `_headers` file into `out/` with the same security and
  caching rules.
- **No image optimizer.** `images.unoptimized` is set for this build. The
  screenshots are already exported at their display size, so nothing changes
  visually.

`NEXT_PUBLIC_NOINDEX` defaults to on for this script, which sets
`noindex, nofollow` and a blanket `Disallow: /` in robots.txt. Keep it on for
preview URLs so they never compete with the real domain; set it to `0` for the
production deployment. The script prints which mode it used.

To make the waitlist work on a static host, point `WAITLIST_WEBHOOK_URL` at a
form service, or run the site on a platform that supports Next.js route
handlers (Netlify's Next runtime, Vercel, a Node server).

### One-file build

```bash
npm run build:static && npm run build:single
```

Bundles the whole export into a single `dist/index.html` (~0.7 MB) with the
stylesheet, both fonts and all five screenshots embedded as data URIs — zero
external requests. Useful for sending the site to someone, opening it from a
phone's file manager, or a one-file deploy.

All nine pages live in that file as sections; a small router swaps them on
`#/about`-style hashes. Next's own JavaScript is removed, because its router
fetches payloads over HTTP and cannot work from a lone file. The site renders
fully without scripting, so what remains is the no-JS presentation plus a
router, the product-tour tabs and an offline notice on the form, all written in
`scripts/build-single-file.mjs`.

The behaviour Next's runtime provided is reimplemented in plain JS so the file
behaves like the real site rather than dropping to the no-script layout:
routing, the mobile menu, the header's scroll state, the scroll reveals and
the product-tour tabs. The reveals carry a timeout fallback, so a failure
there can never leave content invisible.

One deliberate trade-off: the Latin-Extended font faces are dropped, since a
single file has no lazy loading to save them and the copy never needs them.

## Analytics

Nothing loads until an environment variable is present, so the site ships with
zero third-party requests. Plausible, PostHog and Google Analytics are wired in
`src/components/analytics/Analytics.tsx`.

## Before going live

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain.
2. Fill in `/imprint` — every field is a placeholder today, and the details are a
   legal requirement in Germany.
3. Have `/privacy` and `/terms` reviewed by a lawyer, and complete the TODO
   blocks (controller, hosting provider, processors, supervisory authority,
   governing law).
4. Configure the waitlist (Supabase or a webhook) so the primary CTA works.
5. Add the social URLs and a contact address so the footer links appear.
6. Optionally enable analytics.

## Accessibility

Semantic landmarks and one `h1` per page, a skip link, visible focus rings,
labelled form fields with `aria-live` status, a keyboard-navigable tablist
(arrow keys, `Home`, `End`), `Escape` and focus return on the mobile menu, and
full `prefers-reduced-motion` support — with reduced motion, every reveal is
simply visible.
