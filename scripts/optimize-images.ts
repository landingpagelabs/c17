/**
 * One-off image optimizer: public/images PNGs → right-sized WebP.
 *
 * - Oversized sources are resized to ~2× their rendered CSS slot (map below),
 *   everything else keeps its dimensions and just changes format.
 * - Carousel icon "SVGs" are base64 PNGs in an <image> wrapper — the raster is
 *   extracted and resized to 2× the ~54px dock slot.
 * - Favicons stay PNG (used via metadata icons + TabAttention swap).
 * - Originals are deleted by the caller after references are updated; git
 *   history keeps them.
 *
 * Run: npx tsx scripts/optimize-images.ts
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, relative } from "path";
import sharp from "sharp";

const ROOT = join(__dirname, "..", "public", "images");
const QUALITY = 78;
// WebP alpha is lossless by default and dominates the size of soft-alpha art
// (the hero vector was 591KB with lossless alpha, 44KB at alphaQuality 80).
const ALPHA_QUALITY = 80;

// rel path (or prefix ending in /) → max output width in px
const RESIZE: Record<string, number> = {
  "sections/hero/Vector.png": 2880,
  "sections/team/team.png": 2160,
  "sections/team/team-top-image.png": 2160,
  "sections/reviews/image-": 698,
  "sections/carousel/cards/": 700,
  "sections/campaign/banner-logo.png": 2048,
  "sections/campaign/Frame 2147261625.png": 2048,
  "sections/congrats/banner-images.png": 2048,
  "sections/congrats/banner-images-2.png": 2048,
  "sections/congrats/Slide 16_9 - 1.png": 1400,
  "sections/compare/Frame 2147261645.png": 2048,
  "sections/faq/faq-mobile.png": 860,
};
const SKIP = [/header\/favicon-/];
const ICON_DIR = "sections/carousel/icons";
const ICON_WIDTH = 108; // 2× the ~54px dock slot

function* walk(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

function maxWidthFor(rel: string): number | undefined {
  for (const [key, w] of Object.entries(RESIZE)) {
    if (key.endsWith("/") || key.endsWith("-") ? rel.startsWith(key) : rel === key) return w;
  }
  return undefined;
}

async function main() {
  let before = 0;
  let after = 0;
  const rows: string[] = [];

  for (const file of walk(ROOT)) {
    const rel = relative(ROOT, file);
    const isPng = file.endsWith(".png");
    const isIconSvg = rel.startsWith(ICON_DIR) && file.endsWith(".svg");
    if ((!isPng && !isIconSvg) || SKIP.some((r) => r.test(rel))) continue;

    const srcBytes = statSync(file).size;
    let input: Buffer;
    let targetWidth: number | undefined;

    if (isIconSvg) {
      // Extract the embedded base64 PNG raster.
      const svg = readFileSync(file, "utf8");
      const m = /data:image\/png;base64,([A-Za-z0-9+/=]+)/.exec(svg);
      if (!m) {
        rows.push(`SKIP (no embedded raster) ${rel}`);
        continue;
      }
      input = Buffer.from(m[1], "base64");
      targetWidth = ICON_WIDTH;
    } else {
      input = readFileSync(file);
      targetWidth = maxWidthFor(rel);
    }

    let img = sharp(input);
    const meta = await img.metadata();
    if (targetWidth && (meta.width ?? 0) > targetWidth) {
      img = img.resize({ width: targetWidth });
    }
    const out = await img.webp({ quality: QUALITY, alphaQuality: ALPHA_QUALITY }).toBuffer();
    const outPath = file.replace(/\.(png|svg)$/, ".webp");
    writeFileSync(outPath, out);
    before += srcBytes;
    after += out.length;
    rows.push(
      `${rel}  ${(srcBytes / 1024).toFixed(0)}KB → ${(out.length / 1024).toFixed(0)}KB` +
        (targetWidth && (meta.width ?? 0) > targetWidth ? `  (${meta.width}→${targetWidth}w)` : "")
    );
  }

  rows.sort();
  for (const r of rows) console.log(r);
  console.log(
    `\nTOTAL converted: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB (${rows.length} files)`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
