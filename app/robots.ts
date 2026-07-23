import type { MetadataRoute } from "next";

import { SITE_LIVE, SITE_URL } from "../lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Pre-cutover (vercel.app domain): block everything.
  if (!SITE_LIVE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Funnel utility pages + the CMS — never search results.
      disallow: ["/studio", "/congrats", "/pre-call"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
