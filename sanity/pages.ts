/**
 * Page lists shared by the routes and the Studio structure.
 *
 * Deliberately free of schema/Studio imports: routes are server components, and
 * pulling in sanity.config there drags the Studio bundle (and its `swr`
 * react-server resolution) into the RSC graph, which fails the build.
 */

/** One document per legal page; the id doubles as the URL slug. */
export const legalPages = [
  { id: "terms-of-service", title: "Terms of Service" },
  { id: "private-policy", title: "Privacy Policy" },
  { id: "master-service-terms", title: "Master Service Terms" },
  { id: "pilot-sow-and-limited-guarantee", title: "Pilot SOW & Limited Guarantee" },
  { id: "msa", title: "MSA" },
] as const;
