import { defineQuery } from "next-sanity";

/**
 * One round-trip for the whole page: each section is a singleton whose _id
 * matches its type name.
 */
export const homePageQuery = defineQuery(`{
  "header": *[_id == "header"][0],
  "hero": *[_id == "hero"][0],
  "howItWorks": *[_id == "howItWorks"][0],
  "banner": *[_id == "banner"][0],
  "services": *[_id == "services"][0],
  "compare": *[_id == "compare"][0],
  "carousel": *[_id == "carousel"][0],
  "quote": *[_id == "quote"][0],
  "team": *[_id == "team"][0],
  "reviews": *[_id == "reviews"][0],
  "campaign": *[_id == "campaign"][0],
  "faq": *[_id == "faq"][0],
  "footer": *[_id == "footer"][0]
}`);

/**
 * The congrats page reuses the home page's Reviews, but has its own footer
 * document (fewer columns) so the two pages can be edited independently.
 */
export const congratsPageQuery = defineQuery(`{
  "heroCongrats": *[_id == "heroCongrats"][0],
  "results": *[_id == "results"][0],
  "reviews": *[_id == "reviews"][0],
  "bannerInfo": *[_id == "bannerInfo"][0],
  "footer": *[_id == "congratsFooter"][0]
}`);

/** Legal pages are keyed by slug; the document id is the slug. */
export const termsPageQuery = defineQuery(`{
  "page": *[_type == "termsPage" && _id == $slug][0],
  "header": *[_id == "header"][0],
  "footer": *[_id == "legalFooter"][0]
}`);

export const preCallQuery = defineQuery(`*[_id == "preCall"][0]`);
