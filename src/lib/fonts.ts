import localFont from "next/font/local";

/*
 * Fonts are self-hosted so builds never depend on a font CDN and the first
 * paint never waits on a third-party request.
 *
 * Only the latin subsets are declared here, so only they are preloaded. The
 * latin-ext faces are declared in globals.css behind a `unicode-range`, which
 * means a visitor downloads those extra ~175 KB only if the page actually
 * renders a character that needs them.
 */
export const inter = localFont({
  src: [{ path: "../fonts/Inter-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["Inter Ext", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const geistMono = localFont({
  src: [{ path: "../fonts/GeistMono-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const interTight = localFont({
  src: [{ path: "../fonts/InterTight-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter-tight",
  display: "swap",
  preload: true,
  fallback: ["Inter Tight Ext", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});
