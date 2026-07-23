/**
 * Pulls the page content out of the original static index.html.
 *
 * Kept separate from seeding so the extraction can be inspected on its own:
 *   npx tsx scripts/extract.ts > content.json
 */
import { readFileSync } from "node:fs";
import * as cheerio from "cheerio";
import type { AnyNode, Element } from "domhandler";

export const SOURCE_HTML = "c:/Users/USER/Desktop/Верстка/С17/С17 v2/index.html";
export const CONGRATS_HTML = "c:/Users/USER/Desktop/Верстка/С17/С17 v2/congrats.html";

type $Node = cheerio.Cheerio<any>;

/** Collapses the source's hard-wrapped, indented text into a single line. */
const clean = (s: string | undefined): string =>
  (s || "").replace(/\s+/g, " ").trim();

/** "[ Services ]" and friends are stored verbatim, brackets included. */
const text = (el: $Node): string => clean(el.first().text());

const attr = (el: $Node, name: string): string =>
  clean(el.first().attr(name) || "");

/**
 * Local image path for an <img>, recorded on `_img` keys. seed.ts uploads these
 * from public/ and swaps them for Sanity asset references.
 */
const src = (el: $Node): string => {
  const value = attr(el, "src");
  return value ? value.replace(/^images\//, "/images/") : "";
};

/**
 * The static markup links every nav item to "#". Map the three that point at
 * home-page sections to their anchors; "/#" so they also work from subpages.
 */
const NAV_ANCHORS: Record<string, string> = {
  "how it works": "/#how-it-works",
  services: "/#services",
  reviews: "/#reviews",
};
const navHref = (label: string, fallback: string): string =>
  NAV_ANCHORS[label.toLowerCase().trim()] ?? fallback;

/**
 * Per-brand video for the footer "Case Studies" links, keyed by the label with
 * non-alphanumerics stripped. Anything unlisted falls back to the default reel.
 * Editors can still override each link's video in the Studio.
 */
const CASE_STUDY_VIDEO_DEFAULT = "https://www.youtube.com/watch?v=NJcwb0C59g8";
const CASE_STUDY_VIDEOS: Record<string, string> = {
  pronto: "https://www.youtube.com/watch?v=BYcDQqBIEu4",
  casablui: "https://www.youtube.com/watch?v=YDxh83LK6a0",
  jameo: "https://www.youtube.com/watch?v=NJcwb0C59g8",
  shipcalm: "https://www.youtube.com/watch?v=oLstnIn_U2o",
  filterking: "https://www.youtube.com/watch?v=tz86pON_XDY",
  push: "https://www.youtube.com/watch?v=oLstnIn_U2o",
};
const caseStudyVideo = (label: string): string =>
  CASE_STUDY_VIDEOS[label.toLowerCase().replace(/[^a-z0-9]/g, "")] ??
  CASE_STUDY_VIDEO_DEFAULT;

/** The design bolds inline spans via class; the CMS uses **markers** instead. */
function withBold($: cheerio.CheerioAPI, el: $Node, boldSelector: string): string {
  const node = el.first();
  if (!node.length) return "";
  const copy = $(node.clone());
  copy.find(boldSelector).each((_, b) => {
    const raw = $(b).text();
    // Whitespace can sit inside the span ("Short Video "); keep it outside the
    // markers, or the words either side would run together.
    const lead = /^\s/.test(raw) ? " " : "";
    const trail = /\s$/.test(raw) ? " " : "";
    $(b).replaceWith(`${lead}**${clean(raw)}**${trail}`);
  });
  return clean(copy.text());
}

export function extract() {
  const $ = cheerio.load(readFileSync(SOURCE_HTML, "utf8"));

  const header = {
    _id: "header",
    _type: "header",
    _img_logo: src($(".header_logo img")),
    menu: $(".header_menu-item-link")
      .map((_, el) => {
        const label = clean($(el).text());
        return {
          _type: "ctaLink",
          _key: `menu-${_}`,
          label,
          href: navHref(label, $(el).attr("href") || "#"),
        };
      })
      .get(),
    bookCall: {
      _type: "ctaLink",
      label: text($(".header_cta-calendar")),
      href: attr($(".header_cta-calendar"), "href") || "#",
    },
    cta: {
      _type: "ctaLink",
      label: text($(".header_cta p")),
      href: attr($(".header_cta"), "href") || "#",
    },
  };

  const heroCards = (selector: string, keyPrefix: string) =>
    $(selector)
      .map((i, el) => ({
        _type: "heroCard",
        _key: `${keyPrefix}-${i}`,
        label: clean($(el).find(".hero-inner_list-text p").text()),
        _img: src($(el).find(".hero-inner_list-image img")),
      }))
      .get();

  const hero = {
    _id: "hero",
    _type: "hero",
    _img_logo: src($(".hero_logo img")),
    strapline: withBold($, $(".hero_strapline p"), ".fw-600-black"),
    title: text($(".hero_title-wrap .title-h1")),
    text: text($(".hero_text-wrap .text-body-large")),
    cta: {
      _type: "ctaLink",
      label: text($(".hero .cta-main .text-label-large")),
      href: "#",
    },
    innerTitle: text($(".hero-inner_title p")),
    leftCards: heroCards(".hero-inner_list-left .hero-inner_list-item", "left"),
    centerCard: {
      label: clean($(".hero-inner_list-center .hero-inner_list-text p").text()),
      _img_image: src($(".hero-inner_list-center .hero-inner_list-image img")),
      _img_videoThumb: src($(".hero-inner_list-item-lightbox img").first()),
      videoUrl: attr($(".hero-inner_list-item-lightbox"), "data-video"),
    },
    rightCards: heroCards(".hero-inner_list-right .hero-inner_list-item", "right"),
  };

  const howItWorks = {
    _id: "howItWorks",
    _type: "howItWorks",
    strapline: text($(".how-it-works_strapline p")),
    title: text($(".how-it-works_title-wrap .title-h2")),
    steps: $(".hiw_step")
      .map((i, el) => {
        const step = $(el);
        // The note is split across two lines with <br>; keep that as a newline.
        const note = step.find(".hiw_fraction-note").html() || "";
        return {
          _type: "step",
          _key: `step-${i}`,
          day: clean(step.find(".hiw_step-day").text()),
          title: clean(step.find(".hiw_step-title").text()),
          text: clean(step.find(".hiw_step-text").text()),
          note: note
            .split(/<br\s*\/?>/i)
            .map((line) => clean(cheerio.load(line).text()))
            .filter(Boolean)
            .join("\n"),
        };
      })
      .get(),
    cta: {
      _type: "ctaLink",
      label: text($(".how-it-works .cta-main .text-label-large")),
      href: "#",
    },
    ctaSteps: $(".cta-strapline-item .text-body-small")
      .map((_, el) => clean($(el).text()))
      .get(),
  };

  const banner = {
    _id: "banner",
    _type: "banner",
    items: $(".banner_item")
      .map((i, el) => ({
        _type: "stat",
        _key: `stat-${i}`,
        value: clean($(el).find(".banner_item-title").text()),
        label: clean($(el).find(".banner_item-text").text()),
      }))
      .get(),
  };

  const services = {
    _id: "services",
    _type: "services",
    strapline: text($(".services_strapline p")),
    title: text($(".services_title-wrap .title-h2")),
    text: text($(".services_text-wrap p")),
    items: $(".services_item")
      .map((i, el) => ({
        _type: "service",
        _key: `service-${i}`,
        title: clean($(el).find(".title-h5").text()),
        text: clean($(el).find(".services_item-text-wrap p").text()),
        _img: src($(el).find(".services_image img")),
        size: $(el).hasClass("big") ? "big" : "small",
      }))
      .get(),
  };

  const compareRows = $(".compare_table-row")
    .slice(1) // first row is the header
    .map((i, el) => {
      const cols = $(el).find(".compare_table-col");
      const c17 = cols.eq(1);
      return {
        _type: "row",
        _key: `row-${i}`,
        label: clean(cols.eq(0).find("p").text()),
        c17: clean(c17.find("p").text()),
        agency: clean(cols.eq(2).find("p").text()),
        inhouse: clean(cols.eq(3).find("p").text()),
        // Two rows render the C17 cell in the larger label style.
        emphasise: c17.find("p").hasClass("text-label-medium"),
      };
    })
    .get();

  const headerRow = $(".compare_table-row").first().find(".compare_table-col");
  const compare = {
    _id: "compare",
    _type: "compare",
    strapline: text($(".compare_strapline p")),
    title: text($(".compare_title-wrap .title-h2")),
    text: text($(".compare_text-wrap p")),
    columns: {
      _img_c17Logo: src($(".compare_table-row").first().find(".compare_table-col").eq(1).find("img")),
      c17Note: clean(headerRow.eq(1).find("div").text()),
      agencyTitle: clean(headerRow.eq(2).find("p").text()),
      agencyNote: clean(headerRow.eq(2).find("div").text()),
      inhouseTitle: clean(headerRow.eq(3).find("p").text()),
      inhouseNote: clean(headerRow.eq(3).find("div").text()),
    },
    rows: compareRows,
    _img_bottomImage: src($(".compare_table-bottom-image img")),
    _img_image: src($(".compare_image img")),
    bottomText: clean($(".compare_table-bottom .text-body-regular").text()),
    cta: {
      _type: "ctaLink",
      label: text($(".compare .cta-main .text-label-large")),
      href: "#",
    },
    straplineTestimonials: [
      ".compare_strapline-center-wrap",
      ".compare_strapline-center-wrap-2",
    ].map((sel, i) => {
      const wrap = $(sel);
      return {
        _type: "testimonial",
        _key: `t-${i}`,
        quote: clean(wrap.find(".compare_strapline-text-wrap p").text()),
        _img_avatar: src(wrap.find(".compare_strapline-image img")),
        name: clean(wrap.find(".compare_strapline-info .bold").text()),
        role: clean(wrap.find(".secondary-text").text()),
      };
    }),
  };

  const carousel = {
    _id: "carousel",
    _type: "carousel",
    strapline: text($(".carousel_strapline p")),
    title: text($(".carousel_title-wrap .title-h2")),
    cards: $(".carousel_card")
      .map((i, el) => ({
        _type: "card",
        _key: `card-${i}`,
        brand: clean($(el).attr("data-brand")),
        name: clean($(el).attr("data-name")),
        _img: src($(el).find(".carousel_card-media img")),
        _img_icon: src($(".carousel_dock-item").eq(i).find("img")),
      }))
      .get(),
    activeBrand: "acquisition",
    // The URL was hard-coded in carousel.js rather than living in the markup.
    videoUrl: "https://www.youtube.com/watch?v=NJcwb0C59g8",
    modalCta: {
      _type: "ctaLink",
      label: clean($(".carousel_modal-cta span").first().text()),
      href: "#",
    },
  };

  const radioOptions = (name: string) =>
    $(`input[name="${name}"]`)
      .map((_, el) => clean($(el).closest(".quote_radio").find(".quote_radio-label").text()))
      .get();

  const quoteField = (index: number) => $(".quote_field").eq(index);
  const quote = {
    _id: "quote",
    _type: "quote",
    strapline: text($(".quote_strapline p")),
    title: text($(".quote_title-wrap .title-h2")),
    text: text($(".quote_text-wrap p")),
    meetings: {
      question: clean(quoteField(0).find(".quote_field-title").text()).replace(/^01\./, "").trim(),
      options: radioOptions("quote-meetings"),
      error: clean(quoteField(0).find(".quote_error").text()),
    },
    budget: {
      question: clean(quoteField(1).find(".quote_field-title").text()).replace(/^02\./, "").trim(),
      options: radioOptions("quote-budget"),
      error: clean(quoteField(1).find(".quote_error").text()),
    },
    clv: {
      question: clean(quoteField(2).find(".quote_field-title").text()).replace(/^03\./, "").trim(),
      min: 20000,
      max: 1000000,
      step: 1000,
      error: clean(quoteField(2).find(".quote_error").text()),
    },
    closeRate: {
      question: clean(quoteField(3).find(".quote_field-title").text()).replace(/^04\./, "").trim(),
      initial: Number($(".quote_range-input").attr("value") || 20),
    },
    contacts: {
      question: clean(quoteField(4).find(".quote_field-title").text()).replace(/^05\./, "").trim(),
      namePlaceholder: attr($(".quote_control").eq(0).find("input"), "placeholder"),
      nameError: clean($(".quote_control").eq(0).find(".quote_error").text()),
      emailPlaceholder: attr($(".quote_control").eq(1).find("input"), "placeholder"),
      emailError: clean($(".quote_control").eq(1).find(".quote_error").text()),
      urlPlaceholder: attr($(".quote_control").eq(2).find("input"), "placeholder"),
      urlError: clean($(".quote_control").eq(2).find(".quote_error").text()),
    },
    submitLabel: clean($(".quote_submit span").first().text()),
  };

  const team = {
    _id: "team",
    _type: "team",
    _img_topImage: src($(".team_image-top img")),
    _img_image: src($(".team_image img")),
    strapline: text($(".team_strapline p")),
    title: text($(".team_title-wrap .title-h2")),
    text: text($(".team_text-wrap p")),
    cta: {
      _type: "ctaLink",
      label: text($(".team .cta-main .text-label-large")),
      href: "#",
    },
  };

  const reviews = {
    _id: "reviews",
    _type: "reviews",
    strapline: text($(".reviews_strapline p")),
    title: text($(".reviews_title-wrap .title-h2")),
    items: $(".reviews_item")
      .map((i, el) => {
        const item = $(el);
        const video = item.find(".reviews_video");
        return {
          _type: "review",
          _key: `review-${i}`,
          kind: video.length ? "video" : "text",
          quote: clean(item.find(".reviews_content p").text()),
          videoUrl: video.length ? clean(video.attr("data-video")) : undefined,
          source: item.find(".reviews_head svg").length > 1 ? "verified" : "none",
          _img_avatar: src(item.find(".reviews_avatar img")),
          _img_videoThumb: video.length ? src(video.find("img").first()) : "",
          name: clean(item.find(".reviews_info-content p").eq(0).text()),
          role: clean(item.find(".reviews_info-content p").eq(1).text()),
        };
      })
      .get(),
    _img_ctaImage: src($(".reviews_cta-image img")),
    trustText: clean($(".reviews_cta .light-gray").text()),
    moreLabel: clean($(".reviews_cta-text").text()),
    lessLabel: "Show Less Reviews",
  };

  const campaign = {
    _id: "campaign",
    _type: "campaign",
    straplineItems: $(".campaign_strapline-item")
      .map((i, el) => {
        // Each item is "[", icon, label, "]" — the label is the middle <p>.
        const parts = $(el)
          .find("p")
          .map((__, p) => clean($(p).text()))
          .get()
          .filter((t) => t && t !== "[" && t !== "]");
        return {
          _type: "straplineItem",
          _key: `strapline-${i}`,
          text: parts[0] || "",
          _img_icon: src($(el).find("img")),
        };
      })
      .get()
      .filter((s) => s.text),
    title: text($(".campaign_title-wrap .title-h2")),
    text: text($(".campaign_text-wrap p")),
    questions: $('.campaign_step[if-step]')
      .filter((_, el) => /^\d+$/.test($(el).attr("if-step") || ""))
      .map((i, el) => ({
        _type: "question",
        _key: `q-${i}`,
        question: clean($(el).find(".campaign_step-title-wrap h5").text()),
        yesLabel: clean($(el).find('input[value="yes"]').closest("label").find("p").text()) || "Yes",
        noLabel: clean($(el).find('input[value="no"]').closest("label").find("p").text()) || "No",
      }))
      .get(),
    outcomeYes: {
      title: clean($('.campaign_step[if-step="Yes"] .campaign_step-finish-title h4').text()),
    },
    outcomeNo: {
      title: clean($('.campaign_step[if-step="No"] .campaign_step-finish-title-no h3').text()),
      text: clean($('.campaign_step[if-step="No"] .campaign_step-finish-text-top p').text()),
      secondaryText: clean($('.campaign_step[if-step="No"] .campaign_step-finish-text-no p').text()),
      cta: {
        _type: "ctaLink",
        label: clean($(".cta-blue p").text()),
        href: attr($(".cta-blue"), "href"),
      },
      mistakeTitle: clean($(".campaign_text-bot p").text()),
      mistakeText: clean($(".campaign_text-bot-2 p").text()),
    },
    formBottom: {
      _img_avatar: src($(".campaign_form-bottom-avatar img")),
      quote: clean($(".campaign_form-bottom-left-info p").eq(0).text()),
      name: clean($(".campaign_form-bottom-left-info p").eq(1).text()),
      note: clean($(".campaign_form-bottom-right-text p").text()),
    },
    _img_image: src($(".campaign_image img")),
  };

  const faq = {
    _id: "faq",
    _type: "faq",
    title: text($(".faq_head .title-h2")),
    items: $(".item-faq")
      .map((i, el) => ({
        _type: "item",
        _key: `faq-${i}`,
        question: clean($(el).find(".item-faq-head_title-wrap h4").text()),
        // NOTE: every answer in the source is Lorem ipsum placeholder text.
        answer: clean($(el).find(".item-faq-panel_text-wrap p").text()),
      }))
      .get(),
    _img_bottomImage: src($(".faq-bottom_img")),
  };

  const footer = {
    _id: "footer",
    _type: "footer",
    _img_logo: src($(".footer-head-left_logo-img")),
    title: withBold($, $(".footer-head-left_title-wrap .title-h5"), ".footer-head-span"),
    cta: {
      _type: "ctaLink",
      label: text($(".footer .cta-main .text-label-large")),
      href: "#",
    },
    columns: $(".footer-head-right_list")
      .map((i, el) => {
        const column = $(el);
        const isSocial = column.find(".footer_social-wrap").length > 0;
        const columnTitle = clean(column.find(".footer-head-right-list_title-wrap p").text());
        // Every case study except the "All …" overview opens a video modal.
        const isCaseStudies = /case studies/i.test(columnTitle);
        return {
          _type: "column",
          _key: `col-${i}`,
          title: columnTitle,
          isSocial,
          isLong: column.hasClass("is-long"),
          links: column
            .find("a")
            .map((j, a) => {
              const label = clean($(a).find("p").text());
              const isOverview = /^all /i.test(label);
              return {
                _type: "ctaLink",
                _key: `link-${i}-${j}`,
                label,
                href: navHref(label, $(a).attr("href") || "#"),
                ...(isCaseStudies && !isOverview
                  ? { videoUrl: caseStudyVideo(label) }
                  : {}),
                ...($(a).hasClass("no-hover") ? { noHover: true } : {}),
              };
            })
            .get(),
        };
      })
      .get(),
    askTitle: clean($(".footer-content-left_title-wrap p").text()),
    askLinks: $(".item_footer-content-left")
      .map((i, el) => ({
        _type: "askLink",
        _key: `ask-${i}`,
        href: $(el).attr("href") || "#",
      }))
      .get(),
    awards: $(".item_footer-content-right")
      .map((i, el) => ({
        _type: "award",
        _key: `award-${i}`,
        _img: src($(el).find("img")),
        href: $(el).attr("href") || "#",
      }))
      .get(),
    builtBy: {
      _img_logo: src($(".footer-bottom-left_img")),
      label: clean($(".footer-bottom-left_title-wrap p").text()),
      href: attr($(".footer-bottom-left_title-wrap"), "href"),
    },
    // The source ships a literal "[Current Year]" placeholder; make it dynamic.
    copyright: clean($(".footer-bottom_right p").text()).replace(
      "[Current Year]",
      "{year}"
    ),
  };

  return [
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
  ];
}

// Allow `npx tsx scripts/extract.ts` to dump the parsed content for review.
if (process.argv[1]?.includes("extract")) {
  console.log(JSON.stringify(extract(), null, 2));
}

/**
 * The congrats page. Its Reviews section is byte-identical to the home page's,
 * so it is not re-extracted — the page queries the same document.
 */
export function extractCongrats() {
  return extractCongratsFrom(cheerio.load(readFileSync(CONGRATS_HTML, "utf8")));
}

/** Shared by /congrats and /onboarding — same markup, different documents. */
export function extractCongratsFrom($: cheerio.CheerioAPI) {
  const heroCongrats = {
    _id: "heroCongrats",
    _type: "heroCongrats",
    bannerText: clean($(".banner-congrats_wrapper p").text()),
    strapline: text($(".hero-congrats_strapline p")),
    title: text($(".hero-congrats_title-wrap .title-h2")),
    steps: $(".hero-congrats_steps-item")
      .map((i, el) => {
        const card = $(el);
        const head = card.find(".hero-congrats_steps-head .text-label-mini-large");
        const base = {
          _type: "step",
          _key: `step-${i}`,
          num: clean(card.find(".hero-congrats_steps-item-num").text()),
          head: withBold($, head, ".purple"),
          title: clean(card.find(".hero-congrats_steps-title-wrap h5").text()),
          text: clean(card.find(".hero-congrats_steps-text-wrap p").text()),
        };

        if (card.find(".hero-congrats_steps-video").length) {
          return {
            ...base,
            kind: "video",
            _img_videoThumb: src(card.find(".hero-congrats_steps-video img").first()),
            videoUrl: attr(card.find(".hero-congrats_steps-video"), "data-video"),
          };
        }
        if (card.find(".hero-congrats_steps-text-copy").length) {
          return {
            ...base,
            kind: "copy",
            copyText: clean(card.find(".hero-congrats_steps-text-copy p").text()),
            copyButton: clean(card.find(".hero-congrats_steps-text-copy-btn p").text()),
          };
        }
        if (card.find(".hero-congrats_steps-item-list").length) {
          // The source has no per-video URL — seed a working default (the same
          // reel as step 1); editors set the real URL per video in the Studio.
          const defaultVideo = attr(
            $(".hero-congrats_steps-video"),
            "data-video"
          );
          return {
            ...base,
            kind: "videoList",
            videos: card
              .find(".hero-congrats_steps-item-video img")
              .map((i, img) => ({
                _type: "video",
                _key: `video-${i}`,
                _img_thumb: src($(img)),
                videoUrl: defaultVideo,
              }))
              .get(),
          };
        }
        return {
          ...base,
          kind: "calendar",
          _img_image: src(card.find(".hero-congrats_steps-image img")),
          actionLabel: clean(card.find(".hero-congrats_steps-action p").text()),
        };
      })
      .get(),
  };

  const results = {
    _id: "results",
    _type: "results",
    title: text($(".results_title-wrap .title-h2")),
    items: $(".results_item")
      .map((i, el) => {
        // A reversed card puts .results_image-2 first; the classes stay put.
        const reversed = $(el).children().first().hasClass("results_image-2");
        return {
          _type: "item",
          _key: `item-${i}`,
          _img_image: src($(el).find(".results_image img")),
          _img_image2: src($(el).find(".results_image-2 img")),
          reversed,
        };
      })
      .get(),
  };

  const bannerInfo = {
    _id: "bannerInfo",
    _type: "bannerInfo",
    title: clean($(".banner-info_title-wrap .title-h5").first().text()),
    subtitle: clean($(".banner-info_title-wrap-gray .title-h5").text()),
    _img_avatar: src($(".banner-info_content-avatar img")),
    name: clean($(".banner-info_content-text .text-label-large").text()),
    role: clean($(".banner-info_content-text .text-body-small").text()),
    // NOTE: placeholder copy in the source ("Trust statement lorem ipsum...").
    trustText: clean($(".banner-info_content-text-2 p").text()),
    cta: {
      _type: "ctaLink",
      label: clean($(".banner-info .cta-main .text-label-large").text()),
      href: attr($(".banner-info .cta-main"), "href") || "#",
    },
    listTitle: clean($(".banner-info_list-title p").text()),
    _imgs_logos: $(".banner-info_list-item img")
      .map((_, img) => src($(img)))
      .get(),
    _img_image: src($(".banner-info_image-big img")),
  };

  // Same shape as the home footer, fewer columns — see queries.ts.
  const home = extract();
  const footer = home.find((d) => d._id === "footer") as Record<string, unknown>;
  void footer;
  const congratsColumns = $(".footer .footer-head-right_list")
    .map((i, el) => {
      const column = $(el);
      const isSocial = column.find(".footer_social-wrap").length > 0;
      return {
        _type: "column",
        _key: `col-${i}`,
        title: clean(column.find(".footer-head-right-list_title-wrap p").text()),
        isSocial,
        isLong: column.hasClass("is-long"),
        links: column
          .find("a")
          .map((j, a) => ({
            _type: "ctaLink",
            _key: `link-${i}-${j}`,
            label: clean($(a).find("p").text()),
            href: $(a).attr("href") || "#",
            ...($(a).hasClass("no-hover") ? { noHover: true } : {}),
          }))
          .get(),
      };
    })
    .get();

  const congratsFooter = {
    ...footer,
    _id: "congratsFooter",
    columns: congratsColumns,
  };

  return [heroCongrats, results, bannerInfo, congratsFooter];
}

/* ------------------------------ Legal pages ------------------------------ */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type Block = Record<string, unknown>;

let keySeq = 0;
const nextKey = (prefix: string) => `${prefix}${(keySeq++).toString(36)}`;

/**
 * Converts one <p>/<li> into a Portable Text block, turning <span class="fw-600">
 * into a `strong` decorator and <a> into a `link` annotation.
 */
function toBlock(
  $: cheerio.CheerioAPI,
  el: Element,
  listItem: boolean
): Block | null {
  const spans: Span[] = [];
  const markDefs: Block[] = [];

  const walk = (node: AnyNode, marks: string[]) => {
    if (node.type === "text") {
      const text = (node as unknown as { data: string }).data;
      if (text) spans.push({ _type: "span", _key: nextKey("s"), text, marks: [...marks] });
      return;
    }
    if (node.type !== "tag") return;

    const tag = node as Element;
    // <br> becomes a newline: the design relies on them inside paragraphs.
    if (tag.tagName === "br") {
      spans.push({ _type: "span", _key: nextKey("s"), text: "\n", marks: [...marks] });
      return;
    }
    if (tag.tagName === "a") {
      const key = nextKey("l");
      markDefs.push({
        _type: "link",
        _key: key,
        href: $(tag).attr("href") || "#",
      });
      tag.children.forEach((c) => walk(c, [...marks, key]));
      return;
    }
    // Both read as bold, but they are different classes in the markup.
    const cls = $(tag).attr("class") || "";
    const extra = /\bterms-content_num\b/.test(cls)
      ? "num"
      : /\bfw-600\b/.test(cls)
        ? "strong"
        : null;
    tag.children.forEach((c) => walk(c, extra ? [...marks, extra] : marks));
  };

  // A whole <p class="fw-600"> is a bold paragraph: seed the mark for all text.
  const rootBold = /\bfw-600\b/.test($(el).attr("class") || "");
  el.children.forEach((c) => walk(c, rootBold ? ["strong"] : []));

  // Collapse the source's hard-wrapped whitespace, but keep the <br> newlines.
  const cleaned = spans
    .map((s) => ({ ...s, text: s.text.replace(/[^\S\n]+/g, " ") }))
    .filter((s) => s.text !== "");
  if (!cleaned.length) return null;
  cleaned[0].text = cleaned[0].text.replace(/^ /, "");
  const last = cleaned[cleaned.length - 1];
  last.text = last.text.replace(/ $/, "");
  if (!cleaned.some((s) => s.text.trim())) return null;

  return {
    _type: "block",
    _key: nextKey("b"),
    style: "normal",
    markDefs,
    children: cleaned,
    ...(listItem ? { listItem: "bullet", level: 1 } : {}),
  };
}

function extractTermsBody($: cheerio.CheerioAPI, item: Element): Block[] {
  const out: Block[] = [];

  $(item)
    .children()
    .each((_, child) => {
      const cls = $(child).attr("class") || "";
      if (cls.includes("terms-content_title-wrap")) return; // the heading

      if (child.tagName === "ul") {
        $(child)
          .children("li")
          .each((__, li) => {
            const block = toBlock($, li as Element, true);
            if (block) out.push(block);
          });
        return;
      }

      if (cls.includes("terms-content_table-wrap")) {
        const head = $(child)
          .find("thead th")
          .map((__, th) => clean($(th).text()))
          .get();
        const rows = $(child)
          .find("tbody tr")
          .map((r, tr) => ({
            _type: "row",
            _key: nextKey("r"),
            cells: $(tr)
              .find("td")
              .map((__, td) => clean($(td).text()))
              .get(),
          }))
          .get();
        out.push({ _type: "table", _key: nextKey("t"), head, rows });
        return;
      }

      if (child.tagName === "p") {
        const block = toBlock($, child, false);
        if (block) out.push(block);
      }
    });

  return out;
}

/** The legal pages' footer is byte-identical to the congrats one. */
export function extractLegalFooter() {
  const $ = cheerio.load(
    readFileSync("c:/Users/USER/Desktop/Верстка/С17/С17 v2/terms-of-service.html", "utf8")
  );
  const congrats = extractCongratsFrom($);
  const footer = congrats.find((d) => d._id === "congratsFooter");
  return [{ ...footer, _id: "legalFooter" }];
}

export function extractLegal() {
  const pages = [
    "terms-of-service",
    "private-policy",
    "master-service-terms",
    "pilot-sow-and-limited-guarantee",
    "msa",
  ];

  return pages.map((slug) => {
    const $ = cheerio.load(
      readFileSync(`c:/Users/USER/Desktop/Верстка/С17/С17 v2/${slug}.html`, "utf8")
    );

    return {
      _id: slug,
      _type: "termsPage",
      pageTitle: clean($("title").text()),
      strapline: text($(".hero-terms_strapline p")),
      title: text($(".hero-terms_title-wrap .title-h1")),
      cta: {
        _type: "ctaLink",
        label: clean($(".hero-terms .cta-main .text-label-large").text()),
        href: attr($(".hero-terms .cta-main"), "href") || "#",
      },
      items: $(".terms-content_item")
        .map((i, el) => ({
          _type: "item",
          _key: `item-${i}`,
          title: clean($(el).find(".terms-content_title-wrap").text()),
          // The heading class varies per section (label / x-large / h5).
          titleStyle:
            $(el).find(".terms-content_title-wrap").children().first().attr("class") ||
            "text-label-large",
          body: extractTermsBody($, el),
        }))
        .get(),
      signatures: $(".terms-content_sign-col")
        .map((i, el) => {
          const lines = $(el)
            .find("p")
            .map((_, p) => clean($(p).text()))
            .get();
          return {
            _type: "signCol",
            _key: `sign-${i}`,
            party: lines[0] || "",
            lines: lines.slice(1),
          };
        })
        .get(),
    };
  });
}

export function extractPreCall() {
  const $ = cheerio.load(
    readFileSync("c:/Users/USER/Desktop/Верстка/С17/С17 v2/pre-call.html", "utf8")
  );
  const field = (i: number) => $(".hero-call_field").eq(i);

  return [
    {
      _id: "preCall",
      _type: "preCall",
      bannerText: clean($(".banner-call_wrapper p").text()),
      _img_logo: src($(".header_logo.call img")),
      title: text($(".hero-call_title-wrap .title-h2")),
      dateLabel: clean(field(0).find("> p").text()),
      dateValue: clean(field(0).find(".hero-call_field-value p").text()),
      linkLabel: clean(field(1).find("> p").text()),
      // The link value is an <a> now (was a <p>); read its text and href.
      linkValue: clean(field(1).find(".hero-call_field-value a, .hero-call_field-value p").text()),
      linkHref: attr(field(1).find(".hero-call_field-value a"), "href") || "#",
      footNote: clean($(".hero-call_block-footer p").text()),
      questionTitle: text($(".question_title-wrap .title-h2")),
      questionText: text($(".question_text-wrap p")),
      _imgs_videos: $(".question .hero-congrats_steps-item-video img")
        .map((_, img) => src($(img)))
        .get(),
      _img_footerImage: src($(".footer-banner_image img")),
      footerText: clean($(".footer-banner_wrapper p").text()),
    },
  ];
}
