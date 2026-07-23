/**
 * Canonical production origin. The site currently serves from
 * c17-cms.vercel.app; canonicals/OG URLs already point at the real domain
 * so nothing needs to change at cutover except SITE_LIVE below.
 */
export const SITE_URL = "https://c17.ai";

/**
 * Flipped 2026-07-24: c17.ai DNS is live and serving this site. Controls
 * indexability — robots.txt, sitemap exposure, and the global noindex.
 */
export const SITE_LIVE = true;

export const SITE_NAME = "C17 Lab";
export const SITE_TITLE = "C17 | AI Sales As A Service";
export const SITE_DESCRIPTION =
  "We build the outbound system, get replies from hard-to-reach buyers, book meetings with our SDRs and then install it in-house.";
