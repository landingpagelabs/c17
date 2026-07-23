import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Pages are statically generated with ISR (revalidate: 60), so content is
  // already edge-cached. Skipping the API CDN just means each revalidation
  // fetches fresh data instead of a lagging per-query cache — no runtime cost,
  // and builds right after a seed no longer pick up stale documents.
  useCdn: false,
  perspective: "published",
});
