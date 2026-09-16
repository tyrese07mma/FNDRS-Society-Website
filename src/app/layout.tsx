import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics/Analytics";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollFX } from "@/components/ui/ScrollFX";
import { geistMono, inter, interTight } from "@/lib/fonts";
import { noIndex, seoKeywords, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Find what’s missing`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: seoKeywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Find what’s missing`,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Find what’s missing`,
    description: siteConfig.shortDescription,
  },
  robots: noIndex
    ? { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
    : {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
      },
  category: "technology",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/apple-icon.png`,
  description: siteConfig.longDescription,
};

/*
 * Availability is PreOrder rather than InStock: the product is not released,
 * and a waitlist is exactly what PreOrder describes.
 */
const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  url: siteConfig.url,
  description: siteConfig.longDescription,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/PreOrder",
    description: "Free during the private beta",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: "en",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        {/*
          Runs before the body paints. Scroll reveals are scoped to `.js`, so
          without scripting every section renders visible instead of blank.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:border focus:border-line-strong focus:bg-surface focus:px-5 focus:py-3 focus:text-[0.9375rem] focus:text-cream"
        >
          Skip to content
        </a>

        <ScrollFX />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
