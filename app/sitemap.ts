import type { MetadataRoute } from "next";

import { SITE_URL } from "../lib/seo";
import { legalPages } from "../sanity/pages";

// Client-contract pages Tyce keeps out of the sitemap (congrats/pre-call are
// already excluded — they're noindexed funnel pages).
const SITEMAP_EXCLUDED = new Set(["master-service-terms", "pilot-sow-and-limited-guarantee"]);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    ...legalPages
      .filter((p) => !SITEMAP_EXCLUDED.has(p.id))
      .map((p) => ({
        url: `${SITE_URL}/${p.id}`,
        changeFrequency: "yearly" as const,
        priority: 0.2,
      })),
  ];
}
