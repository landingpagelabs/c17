import type { Image } from "sanity";

export type CtaLink = {
  label?: string;
  href?: string;
  videoUrl?: string;
  noHover?: boolean;
};

export type HeroCard = { image?: Image; label?: string };

export type Header = {
  logo?: Image;
  menu?: CtaLink[];
  bookCall?: CtaLink;
  cta?: CtaLink;
};

export type Hero = {
  logo?: Image;
  strapline?: string;
  title?: string;
  text?: string;
  cta?: CtaLink;
  innerTitle?: string;
  leftCards?: HeroCard[];
  leftCardsPool?: HeroCard[];
  centerCard?: {
    image?: Image;
    label?: string;
    videoThumb?: Image;
    videoUrl?: string;
  };
  rightCards?: HeroCard[];
  rightCardsPool?: HeroCard[];
};

export type HowItWorks = {
  strapline?: string;
  title?: string;
  steps?: { day?: string; title?: string; text?: string; note?: string }[];
  cta?: CtaLink;
  ctaSteps?: string[];
};

export type Banner = { items?: { value?: string; label?: string }[] };

export type Services = {
  strapline?: string;
  title?: string;
  text?: string;
  items?: {
    title?: string;
    text?: string;
    image?: Image;
    size?: "small" | "big";
  }[];
  cta?: CtaLink;
};

export type Compare = {
  strapline?: string;
  title?: string;
  text?: string;
  columns?: {
    c17Logo?: Image;
    c17Note?: string;
    agencyTitle?: string;
    agencyNote?: string;
    inhouseTitle?: string;
    inhouseNote?: string;
  };
  rows?: {
    label?: string;
    c17?: string;
    agency?: string;
    inhouse?: string;
    emphasise?: boolean;
  }[];
  bottomImage?: Image;
  bottomText?: string;
  cta?: CtaLink;
  image?: Image;
  straplineTestimonials?: {
    quote?: string;
    avatar?: Image;
    name?: string;
    role?: string;
  }[];
};

export type Carousel = {
  strapline?: string;
  title?: string;
  cards?: { brand?: string; name?: string; image?: Image; icon?: Image }[];
  activeBrand?: string;
  videoUrl?: string;
  modalCta?: CtaLink;
};

export type Quote = {
  strapline?: string;
  title?: string;
  text?: string;
  meetings?: { question?: string; options?: string[]; error?: string };
  budget?: { question?: string; options?: string[]; error?: string };
  clv?: {
    question?: string;
    min?: number;
    max?: number;
    step?: number;
    error?: string;
  };
  closeRate?: { question?: string; initial?: number };
  contacts?: {
    question?: string;
    namePlaceholder?: string;
    nameError?: string;
    emailPlaceholder?: string;
    emailError?: string;
    urlPlaceholder?: string;
    urlError?: string;
  };
  submitLabel?: string;
};

export type Team = {
  topImage?: Image;
  strapline?: string;
  title?: string;
  text?: string;
  image?: Image;
  cta?: CtaLink;
};

export type Review = {
  kind?: "text" | "video";
  quote?: string;
  videoThumb?: Image;
  videoUrl?: string;
  source?: "verified" | "none";
  avatar?: Image;
  name?: string;
  role?: string;
};

export type Reviews = {
  strapline?: string;
  title?: string;
  items?: Review[];
  ctaImage?: Image;
  trustText?: string;
  moreLabel?: string;
  lessLabel?: string;
};

export type StraplineItem = { _key?: string; text?: string; icon?: Image };

export type Campaign = {
  straplineItems?: (StraplineItem | string)[];
  title?: string;
  text?: string;
  questions?: { question?: string; yesLabel?: string; noLabel?: string }[];
  outcomeYes?: { title?: string };
  outcomeNo?: {
    title?: string;
    text?: string;
    secondaryText?: string;
    cta?: CtaLink;
    mistakeTitle?: string;
    mistakeText?: string;
  };
  formBottom?: {
    avatar?: Image;
    quote?: string;
    name?: string;
    note?: string;
  };
  image?: Image;
};

export type Faq = {
  title?: string;
  items?: { question?: string; answer?: string }[];
  bottomImage?: Image;
};

export type Footer = {
  logo?: Image;
  title?: string;
  cta?: CtaLink;
  columns?: {
    title?: string;
    isSocial?: boolean;
    isLong?: boolean;
    links?: CtaLink[];
  }[];
  askTitle?: string;
  askLinks?: { href?: string }[];
  awards?: { image?: Image; href?: string }[];
  builtBy?: { logo?: Image; label?: string; href?: string };
  copyright?: string;
};

export type CongratsStep = {
  kind?: "video" | "calendar" | "copy" | "videoList";
  num?: string;
  head?: string;
  title?: string;
  text?: string;
  videoThumb?: Image;
  videoUrl?: string;
  image?: Image;
  actionLabel?: string;
  copyText?: string;
  copyButton?: string;
  videos?: { thumb?: Image; videoUrl?: string }[];
};

export type BannerCongrats = { text?: string };

export type HeroCongrats = {
  bannerText?: string;
  strapline?: string;
  title?: string;
  steps?: CongratsStep[];
};

export type Results = {
  title?: string;
  items?: { image?: Image; image2?: Image; reversed?: boolean }[];
};

export type BannerInfo = {
  title?: string;
  subtitle?: string;
  avatar?: Image;
  name?: string;
  role?: string;
  trustText?: string;
  cta?: CtaLink;
  listTitle?: string;
  logos?: Image[];
  image?: Image;
};

export type PortableBlock = Record<string, unknown>;

export type TermsPage = {
  pageTitle?: string;
  strapline?: string;
  title?: string;
  cta?: CtaLink;
  items?: { title?: string; titleStyle?: string; body?: PortableBlock[] }[];
  signatures?: { party?: string; lines?: string[] }[];
};

export type PreCall = {
  bannerText?: string;
  logo?: Image;
  title?: string;
  dateLabel?: string;
  dateValue?: string;
  linkLabel?: string;
  linkValue?: string;
  linkHref?: string;
  footNote?: string;
  questionTitle?: string;
  questionText?: string;
  videos?: Image[];
  footerImage?: Image;
  footerText?: string;
};

export type CongratsPage = {
  heroCongrats: HeroCongrats | null;
  results: Results | null;
  reviews: Reviews | null;
  bannerInfo: BannerInfo | null;
  footer: Footer | null;
};

export type HomePage = {
  header: Header | null;
  hero: Hero | null;
  howItWorks: HowItWorks | null;
  banner: Banner | null;
  services: Services | null;
  compare: Compare | null;
  carousel: Carousel | null;
  quote: Quote | null;
  team: Team | null;
  reviews: Reviews | null;
  campaign: Campaign | null;
  faq: Faq | null;
  footer: Footer | null;
};
