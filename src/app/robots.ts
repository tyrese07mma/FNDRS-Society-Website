import type { MetadataRoute } from "next";
import { noIndex, siteConfig } from "@/lib/site";

// Evaluated once per build so the route can also be emitted by a static export.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (noIndex) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
