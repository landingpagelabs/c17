/**
 * Seeds the Sanity dataset with the content extracted from the original
 * index.html, uploading each referenced image from public/ along the way.
 *
 *   npx tsx scripts/seed.ts
 *
 * Requires a write token:
 *   SANITY_AUTH_TOKEN=... (or `npx sanity login` and pass --with-user-token)
 *
 * Re-running is safe: documents are createOrReplace'd by their fixed _id, and
 * uploaded assets are de-duplicated by Sanity's content hash.
 */
import { readFileSync } from "node:fs";
import { basename } from "node:path";

import { createClient } from "@sanity/client";

import {
  extract,
  extractCongrats,
  extractLegal,
  extractLegalFooter,
  extractPreCall,
} from "./extract";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!projectId || projectId === "placeholder") {
  throw new Error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID (see .env.local) to a real project id first."
  );
}
if (!token) {
  throw new Error(
    "Set SANITY_AUTH_TOKEN to a token with write access (Manage → API → Tokens)."
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-07-15",
  useCdn: false,
});

const PUBLIC_DIR = "c:/Users/USER/Desktop/Верстка/С17/C17-cms/public";

/** Local path -> uploaded asset id, so each file is only sent once. */
const uploaded = new Map<string, string>();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Uploads are serialised with a gap and retried with backoff: sending ~68 assets
 * back to back trips Sanity's rate limit.
 */
async function uploadImage(path: string): Promise<string> {
  const cached = uploaded.get(path);
  if (cached) return cached;

  const file = readFileSync(PUBLIC_DIR + path);

  for (let attempt = 1; ; attempt++) {
    try {
      const asset = await client.assets.upload("image", file, {
        filename: basename(path),
      });
      uploaded.set(path, asset._id);
      console.log(`  [${uploaded.size}] ${path}`);
      await sleep(250);
      return asset._id;
    } catch (err) {
      const message = (err as Error).message || "";
      const code = (err as { code?: string }).code || "";
      // Retry both throttling and the dropped connections that follow it.
      const retryable =
        (err as { statusCode?: number }).statusCode === 429 ||
        /rate limit/i.test(message) ||
        ["ECONNRESET", "ETIMEDOUT", "ECONNREFUSED", "EPIPE"].includes(code) ||
        /ECONNRESET|socket hang up|network/i.test(message);
      if (!retryable || attempt >= 8) throw err;
      const wait = 2000 * attempt;
      console.log(`  ${code || "rate limit"} on ${path}, retrying in ${wait}ms`);
      await sleep(wait);
    }
  }
}

const imageRef = (assetId: string) => ({
  _type: "image",
  asset: { _type: "reference", _ref: assetId },
});

/**
 * Replaces the extractor's `_img*` markers with real Sanity image references:
 * `_img: "/x.png"` becomes `image`, and `_img_logo: "/y.png"` becomes `logo`.
 */
async function resolveImages(node: unknown): Promise<unknown> {
  if (Array.isArray(node)) {
    return Promise.all(node.map(resolveImages));
  }
  if (!node || typeof node !== "object") return node;

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    // `_imgs_x: [paths]` -> `x: [image, ...]` (a plain array of images)
    if (key.startsWith("_imgs_")) {
      if (!Array.isArray(value)) continue;
      const field = key.slice("_imgs_".length);
      const refs = [];
      for (const [i, path] of value.entries()) {
        if (typeof path !== "string" || !path) continue;
        refs.push({ ...imageRef(await uploadImage(path)), _key: `${field}-${i}` });
      }
      out[field] = refs;
      continue;
    }
    if (key === "_img" || key.startsWith("_img_")) {
      if (typeof value !== "string" || !value) continue;
      const field = key === "_img" ? "image" : key.slice("_img_".length);
      out[field] = imageRef(await uploadImage(value));
      continue;
    }
    out[key] = await resolveImages(value);
  }
  return out;
}

async function main() {
  const docs = [
    ...extract(),
    ...extractCongrats(),
    ...extractLegal(),
    ...extractLegalFooter(),
    ...extractPreCall(),
  ];
  console.log(`Seeding ${docs.length} documents into ${projectId}/${dataset}\n`);

  const resolved = (await resolveImages(docs)) as Record<string, unknown>[];

  const tx = client.transaction();
  for (const doc of resolved) {
    tx.createOrReplace(doc as never);
  }
  await tx.commit();

  console.log(`\nDone: ${resolved.length} documents, ${uploaded.size} images.`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
