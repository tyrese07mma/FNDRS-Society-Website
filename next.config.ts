import type { NextConfig } from "next";

/*
 * `npm run build:static` sets this to produce a plain folder of HTML that any
 * static host (Netlify drop, S3, a USB stick) can serve. The default build is
 * unaffected and keeps the server-rendered API route.
 */
const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    // No image optimizer exists on a static host, so the files are served as
    // authored. They are already exported at their display size.
    unoptimized: isStaticExport,
  },
  // The OpenGraph image reads its subsetted fonts from disk at render time.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/fonts/og/**"],
    "/twitter-image": ["./src/fonts/og/**"],
    "/about/opengraph-image": ["./src/fonts/og/**"],
    "/about/twitter-image": ["./src/fonts/og/**"],
    "/features/opengraph-image": ["./src/fonts/og/**"],
    "/features/twitter-image": ["./src/fonts/og/**"],
    "/how-it-works/opengraph-image": ["./src/fonts/og/**"],
    "/how-it-works/twitter-image": ["./src/fonts/og/**"],
    "/beta/opengraph-image": ["./src/fonts/og/**"],
    "/beta/twitter-image": ["./src/fonts/og/**"],
    "/faq/opengraph-image": ["./src/fonts/og/**"],
    "/faq/twitter-image": ["./src/fonts/og/**"],
  },
  /*
   * Only applies to the server build — a static export has no server to send
   * them. scripts/build-static.mjs writes an equivalent Netlify `_headers`
   * file into the exported folder instead.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        // Content-hashed bundles get this automatically; the fonts and
        // screenshots in /public do not, and they never change in place.
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/app/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
