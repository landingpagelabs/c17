import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: Image) => builder.image(source);

/**
 * Sections keep their original static assets as a fallback, so a section
 * renders correctly before anyone has uploaded an image in the Studio.
 */
export function imageSrc(
  source: Image | undefined | null,
  fallback: string
): string {
  if (!source || !(source as { asset?: unknown }).asset) return fallback;
  return urlFor(source).auto("format").fit("max").url();
}

export type ImgAttrs = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

const LADDER = [320, 480, 640, 768, 960, 1280, 1600, 2048];

/**
 * Spread-ready <img> attributes for a Sanity image: right-sized src, a srcSet
 * ladder capped at 2x the rendered slot (never upscaled past the original),
 * and intrinsic width/height for CLS-free lazy loading.
 *
 * Intrinsic dimensions are parsed from the asset ref
 * (image-<id>-<W>x<H>-<fmt>), so no extra GROQ fields are needed. The Sanity
 * CDN keeps serving AVIF/WebP via auto=format; the width param is what was
 * missing (full-res was shipped regardless of slot).
 *
 * `width` = the slot's rendered CSS width. Without a Sanity asset the local
 * fallback is returned untouched, exactly like imageSrc().
 */
export function imageProps(
  source: Image | undefined | null,
  fallback: string,
  opts: { width: number; sizes?: string }
): ImgAttrs {
  const ref = (source as { asset?: { _ref?: string } } | null | undefined)
    ?.asset?._ref;
  if (!ref) return { src: fallback };

  const m = /-(\d+)x(\d+)-/.exec(ref);
  const iw = m ? Number(m[1]) : undefined;
  const ih = m ? Number(m[2]) : undefined;

  const cap = Math.min(opts.width * 2, iw ?? opts.width * 2);
  const widths = [...LADDER.filter((w) => w < cap), cap];
  const u = (w: number) =>
    urlFor(source as Image).width(w).auto("format").fit("max").url();

  return {
    src: u(cap),
    srcSet: widths.map((w) => `${u(w)} ${w}w`).join(", "),
    sizes: opts.sizes ?? `(max-width: ${opts.width}px) 100vw, ${opts.width}px`,
    // The ORIGINAL asset dims, not the fetch cap: where CSS doesn't constrain
    // an img, the width attribute controls rendered size — original dims
    // reproduce the pre-srcSet layout exactly (and still reserve the right
    // aspect ratio for CLS everywhere else).
    width: iw,
    height: ih,
  };
}
