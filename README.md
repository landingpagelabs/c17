# C17 v2 — Next.js + Sanity

The C17 landing page, migrated from the static `С17 v2/index.html` build to
Next.js with every section editable in Sanity.

## Setup

```bash
nvm use 22            # Sanity CLI requires Node >= 22.12
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<project id>
NEXT_PUBLIC_SANITY_DATASET=production
```

```bash
npm run dev           # site on /, Studio on /studio
```

## Seeding

`scripts/extract.ts` parses the original `index.html`; `scripts/seed.ts` uploads
the images it references and writes the 13 section documents.

```bash
npm run extract                    # dump parsed content as JSON, to inspect
SANITY_AUTH_TOKEN=<token> npm run seed
```

Both are re-runnable: documents use fixed ids and assets de-duplicate by hash.

## Structure

- `app/page.tsx` — fetches all sections in one query, renders them in page order
- `app/congrats/page.tsx` — the post-application page (`/congrats`)
- `app/onboarding/page.tsx` — clone of congrats with its own documents
- `app/pre-call/page.tsx` — call-reminder page with its own slim header
- `app/(legal)/[slug]/page.tsx` — the 5 legal pages, one Portable Text doc each
- `components/sections/` — one component per section
- `sanity/schemas/` — one singleton document per section
- `styles/` — the original CSS, unchanged apart from absolute font paths
- `lib/legacy/` — the original vanilla JS (GSAP, Masonry, forms), see below

## Notes

**The original JS is kept as-is.** Roughly 700 lines of imperative,
class-driven DOM code (carousel, scroll-pinned How It Works, Masonry reviews,
both forms) run from `components/ClientScripts.tsx` after mount rather than
being rewritten into React. GSAP and Masonry moved from CDN to npm; Splide was
loaded by the original but never used, so it was dropped.

**Images fall back to the static files.** `imageSrc(source, fallback)` renders
the original asset from `public/` until someone uploads a replacement in the
Studio, so sections render correctly against an empty dataset.

**Positional slots.** Hero cards (`item-1`…`item-9`), the four banner stats, the
six compare rows and the five footer "Ask about us on" icons each have per-slot
styling or icons in code, matched by array position. Adding items beyond those
counts renders them unstyled.

**Some SVGs must stay inline.** `components/sections/campaign-icons.tsx` and
`footer-icons.tsx` hold SVGs extracted verbatim from the original. They cannot
become `<img>`: `responsive.css` hides `.campaign_form-bottom svg` on mobile,
and the footer icons use `fill="currentColor"` driven by their anchor's hover
colour — neither rule reaches an `<img>`.

**Two pages, shared sections.** `/congrats` reuses the home page's Reviews
document, but has its own footer document (`congratsFooter`) because its footer
carries two link columns instead of four and a narrower container — hence
`<Footer narrow />`. The Studio groups both pages' singletons under "Home page"
and "Congrats page".

**Verifying against the original.** The render is checked by diffing every CSS
class against the source HTML: `/` shows 339 vs 339 (the only expected
difference is `decor`, 10 → 11 — see below), and `/congrats` shows 119 vs 119
with no differences. Onboarding, pre-call and all 5 legal pages also diff clean.
Re-run the diff after markup changes.

**Legal pages use Portable Text.** Their bodies are real rich text — paragraphs,
bullet lists, tables, links, bold — edited in the Studio. `TermsPage.tsx` maps
it back onto the exact original classes (`terms-content_num` label spans,
`terms-content_link` links, and per-section heading styles).

Note the diff only compares *classes*: it cannot catch a missing inline SVG that
carries no class. That gap hid the footer's social icons for a while.

## Deliberate changes from the original

Requested design fixes, not migration artefacts — don't "restore" them:

- `.campaign .padding-global.decor { width: 100% }`. `.campaign` is the only
  section with `display: flex`, so its `.padding-global` became a flex item and
  shrank to its content, pulling the `.decor` borders narrower than every other
  section.
- `.quote { padding: 0 45px }` and `decor` added to its `.padding-global`, so the
  pricing section lines up with the rest. This is the `decor` count difference.

## Known gaps from the original

These came from the source markup and are worth fixing:

- Every FAQ answer is Lorem ipsum placeholder text.
- Neither form submits anywhere — the quote form had a
  `// TODO: реальна відправка форми`, and the campaign form only switches
  screens. No endpoint exists.
- The campaign "Yes" outcome says "book your free call" but has no booking link.
- The footer copyright shipped a literal `[Current Year]` placeholder; it is now
  `{year}` in the CMS and renders the real year.
- The campaign form footer credits `“Fran D. Head of BD, FilterKing` with an
  unclosed opening quote. Seeded verbatim — fix it in the Studio.
- The congrats page ships placeholder copy: "Share Lorem Ipsum", "Trust
  statement lorem ipsum dolor sit amet" and "TRUSTED BY 200+ LOREM IPSUM".

<!-- deploy: 2026-07-23 -->
