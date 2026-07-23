/**
 * One-off: sync the hero "Past Clients & Results" chips from the Figma board
 * (5274:44872 in C17-V2) into Sanity.
 *
 * - Downloads all 39 chip logos via the Figma images API (2x PNG)
 * - Normalizes each: trim transparent border -> height 68px (the convention
 *   the original assets used), preserving aspect
 * - Uploads to Sanity, then rewrites hero.leftCards / hero.rightCards as
 *   leader+pool layers: index i (0-3) is the visible slot, i+4, i+8, ... are
 *   the rotation pool the glitch wave cycles through.
 *
 * Run: npx tsx --env-file=.env.local scripts/update-result-chips.ts
 */
import { createClient } from "@sanity/client";
import sharp from "sharp";

const FIGMA_FILE = "u8ZixXZdqCidXt8U9wkOjV";
const FIGMA_TOKEN = process.env.FIGMA_TOKEN!;

// Board order (row-major). Two WIP duplicate tiles at the tail were excluded.
const CHIPS: { logo: string; label: string; slug: string }[] = [
  { logo: "5274:44927", label: "$4M Cash Collected • 10 Months", slug: "vantafive" },
  { logo: "5274:44967", label: "87 Meetings • 90 Days", slug: "tldv" },
  { logo: "5274:44937", label: "$1M+ ARR • 6 Months", slug: "sohva" },
  { logo: "5274:44945", label: "150 Demos • 30 Days", slug: "chip-04" },
  { logo: "5274:44951", label: "218 Leads • 60 Days", slug: "shipcalm" },
  { logo: "5274:44995", label: "2,125 Leads • 12 Months", slug: "transworld" },
  { logo: "5274:45037", label: "102 Meetings • Monthly", slug: "balance" },
  { logo: "5274:54934", label: "$1.5M Deal • 90 Days", slug: "chip-08" },
  { logo: "5279:61331", label: "457 Meetings • 180 Days", slug: "baton-market" },
  { logo: "5279:61353", label: "Complete TAM Mapped • 30 Days", slug: "castle-hr" },
  { logo: "5279:61386", label: "152 Meetings • 6 Months", slug: "clinic-assist" },
  { logo: "5279:61460", label: "56 Meetings • 60 Days", slug: "inside-real-estate" },
  { logo: "5279:61500", label: "$500k Pipeline • Quarterly", slug: "kayapush" },
  { logo: "5279:61526", label: "25 Meetings • 90 Days", slug: "lookmedia" },
  { logo: "5279:61556", label: "81 Meetings • 90 Days", slug: "monks" },
  { logo: "5279:61575", label: "186 Leads • 60 Days", slug: "persuasion-experience" },
  { logo: "5279:61614", label: "98 Meetings Booked", slug: "promissory" },
  { logo: "5279:61645", label: "35 Meetings • 60 Days", slug: "stuf" },
  { logo: "5279:61667", label: "322 Leads • 90 Days", slug: "tapcheck" },
  { logo: "5279:61687", label: "Complete TAM Mapped • 30 Days", slug: "with-coverage" },
  { logo: "5279:61706", label: "43 Meetings • 30 Days", slug: "collection-ai" },
  { logo: "5279:61723", label: "206 Meetings • 4 Months", slug: "cuppa-ai" },
  { logo: "5279:61740", label: "Results Under NDA", slug: "dure-investment" },
  { logo: "5279:61757", label: "186 Meetings • 30 Days", slug: "enopoly" },
  { logo: "5279:61774", label: "320 Meetings • 8 Months", slug: "exit-factor" },
  { logo: "5279:62102", label: "101 Meetings • 90 Days", slug: "free2grow" },
  { logo: "5279:61808", label: "215 Meetings • 6 Months", slug: "leap-academy" },
  { logo: "5279:62110", label: "60 Meetings • 45 Days", slug: "prodator" },
  { logo: "5279:61842", label: "450 Leads • 6 Months", slug: "quinn" },
  { logo: "5279:61859", label: "$2M+ ARR • 10 Months", slug: "recho" },
  { logo: "5279:61876", label: "168 Demos • 90 Days", slug: "ripcord" },
  { logo: "5279:62104", label: "3,543 Leads • 6 Months", slug: "sig-partners" },
  { logo: "5279:61910", label: "120 Meetings • 4 Months", slug: "storyleads" },
  { logo: "5279:61927", label: "288 Meetings • 8 Months", slug: "swayyem" },
  { logo: "5279:61944", label: "111 Leads • 30 Days", slug: "taco" },
  { logo: "5279:61961", label: "356 Demos • 60 Days", slug: "thanks-io" },
  { logo: "5279:61978", label: "142 Meetings • 30 Days", slug: "voyage-financial" },
  { logo: "5279:61995", label: "35 Meetings • 30 Days", slug: "wing" },
  { logo: "5279:62118", label: "362 Leads • Inc. Nautica & NBA", slug: "nautica-nba" },
];

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-07-15",
  token: process.env.SANITY_AUTH_TOKEN!,
  useCdn: false,
});

async function main() {
  // 1. One images-API call for every logo node.
  const ids = CHIPS.map((c) => c.logo).join(",");
  const res = await fetch(
    `https://api.figma.com/v1/images/${FIGMA_FILE}?ids=${encodeURIComponent(ids)}&format=png&scale=2`,
    { headers: { "X-Figma-Token": FIGMA_TOKEN } }
  );
  const { images, err } = (await res.json()) as { images: Record<string, string>; err: unknown };
  if (err) throw new Error(String(err));

  // 2-3. Download, normalize, upload.
  const assets: { slug: string; label: string; assetId: string }[] = [];
  for (const chip of CHIPS) {
    const url = images[chip.logo];
    if (!url) {
      console.log(`SKIP ${chip.slug}: no render URL`);
      continue;
    }
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    const norm = await sharp(buf)
      .trim()
      .resize({ height: 68, withoutEnlargement: false })
      .png()
      .toBuffer();
    const asset = await client.assets.upload("image", norm, {
      filename: `chip-${chip.slug}.png`,
    });
    assets.push({ slug: chip.slug, label: chip.label, assetId: asset._id });
    console.log(`uploaded ${chip.slug} (${(norm.length / 1024).toFixed(0)}KB) -> ${asset._id}`);
  }

  // 4. Build leader+pool layers. Slots 0-3 left, 4-7 right; layer j of slot i
  //    lives at flat index j*4+i in its side's array.
  const leaders = assets.slice(0, 8);
  const pool = assets.slice(8);
  const layers: (typeof assets)[] = [leaders];
  for (let i = 0; i < pool.length; i += 8) layers.push(pool.slice(i, i + 8));

  const toCard = (a: { label: string; assetId: string }, key: string) => ({
    _type: "heroCard",
    _key: key,
    label: a.label,
    image: { _type: "image", asset: { _type: "reference", _ref: a.assetId } },
  });

  const left: ReturnType<typeof toCard>[] = [];
  const right: ReturnType<typeof toCard>[] = [];
  layers.forEach((layer, j) => {
    for (let i = 0; i < 8; i++) {
      const a = layer[i];
      if (!a) continue;
      (i < 4 ? left : right).push(toCard(a, `chip-${j}-${i}`));
    }
  });

  await client.patch("hero").set({ leftCards: left, rightCards: right }).commit();
  console.log(`\nhero patched: leftCards ${left.length}, rightCards ${right.length} (leaders + pool layers)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
