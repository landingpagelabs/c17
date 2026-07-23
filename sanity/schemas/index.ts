import type { SchemaTypeDefinition } from "sanity";

import { ctaLink } from "./objects/ctaLink";
import { heroCard } from "./objects/heroCard";
import { header } from "./documents/header";
import { hero } from "./documents/hero";
import {
  banner,
  carousel,
  compare,
  faq,
  howItWorks,
  reviews,
  services,
  team,
} from "./documents/sections";
import { campaign, footer, quote } from "./documents/forms";
import { bannerInfo, heroCongrats, results } from "./documents/congrats";
import { termsPage } from "./documents/terms";
import { preCall } from "./documents/preCall";

export { legalPages } from "../pages";

/** Home page sections — singletons, in page order. */
export const singletons = [
  { type: "header", title: "Header" },
  { type: "hero", title: "Hero" },
  { type: "howItWorks", title: "How It Works" },
  { type: "banner", title: "Banner (stats)" },
  { type: "services", title: "Services" },
  { type: "compare", title: "How We Compare" },
  { type: "carousel", title: "Video Reviews (carousel)" },
  { type: "quote", title: "Pricing (quote form)" },
  { type: "team", title: "Team" },
  { type: "reviews", title: "Reviews" },
  { type: "campaign", title: "Campaign (application form)" },
  { type: "faq", title: "FAQ" },
  { type: "footer", title: "Footer" },
] as const;

/** Congrats page sections. Reviews and the footer are shared with the home page. */
export const congratsSingletons = [
  { type: "heroCongrats", title: "Hero" },
  { type: "results", title: "Results" },
  { type: "bannerInfo", title: "Sign-off banner" },
  // Its own footer document (id congratsFooter): same shape, fewer columns.
  { type: "footer", title: "Footer", id: "congratsFooter" },
] as const;

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    ctaLink,
    heroCard,
    header,
    hero,
    howItWorks,
    banner,
    services,
    compare,
    carousel,
    quote,
    team,
    reviews,
    campaign,
    faq,
    footer,
    heroCongrats,
    results,
    bannerInfo,
    termsPage,
    preCall,
  ],
};
