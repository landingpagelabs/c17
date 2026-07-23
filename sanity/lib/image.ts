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
