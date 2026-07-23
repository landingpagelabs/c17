import type { MetadataRoute } from "next";

import { SITE_URL } from "../lib/seo";
import { legalPages } from "../sanity/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    ...legalPages.map((p) => ({
      url: `${SITE_URL}/${p.id}`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
