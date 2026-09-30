/**
 * One-off migration: move the six existing notes into Sanity.
 *
 * The blog copy lived in lib/content.js, which is why the Studio opens
 * empty and the client can only create new notes. This lifts what exists
 * (title, standfirst, category, date, reading time and cover) into the
 * dataset so those notes become editable, then the site reads them from
 * Sanity like any other.
 *
 * Bodies are not created: they never existed. Each migrated note keeps
 * its standfirst and gets an empty article for the studio to write into.
 *
 * Idempotent. Documents are created with a deterministic id and
 * `createIfNotExists`, so running it twice never overwrites an edit made
 * in the Studio afterwards.
 *
 * Emits an NDJSON file for `sanity dataset import`, which runs under the
 * CLI login: no API token has to be created or pasted anywhere. Covers
 * are referenced with `_sanityAsset` so the importer uploads them, local
 * files and remote URLs alike.
 *
 *   node scripts/migrate-blog-to-sanity.mjs /tmp/mait-blog.ndjson
 *   cd ../mait-studio-cms
 *   npx sanity dataset import /tmp/mait-blog.ndjson production --missing
 *
 * `--missing` only adds documents that are not there yet, so running it
 * again never overwrites an edit made in the Studio.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = process.argv[2] || "/tmp/mait-blog.ndjson";
const ROOT = process.cwd();

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

/** "May 2026" -> 2026-05-01T00:00:00.000Z */
function toISO(label) {
  const [monthName, year] = String(label || "").trim().split(/\s+/);
  const month = MONTHS[monthName?.toLowerCase()];
  if (!month || !year) return null;
  return new Date(Date.UTC(Number(year), month - 1, 1)).toISOString();
}

/** "4 min read" -> 4 */
function toMinutes(label) {
  const match = String(label || "").match(/\d+/);
  return match ? Number(match[0]) : null;
}

/** Load content.js without Next's path aliases or JSX in the way. */
async function loadContent() {
  const source = await readFile(path.join(ROOT, "lib/content.js"), "utf8");
  const stubbed = source
    .replace(
      /^import \{ BRAND \} from "\.\/brand";$/m,
      'const BRAND = { name: "MAIT Studio", shortName: "MAIT", email: "hello@maitstudio.com", siteUrl: "https://maitstudio.com" };'
    )
    .replace(
      /^import \{ BRAND_EXPERIENCES_HREF \} from "\.\/serviceRoutes";$/m,
      'const BRAND_EXPERIENCES_HREF = "/services/brand-experiences";'
    );
  const url = "data:text/javascript;base64," + Buffer.from(stubbed).toString("base64");
  return (await import(url)).default;
}

/** Point the importer at the cover, wherever it lives. */
function coverRef(cover) {
  if (!cover) return null;
  const source = cover.startsWith("http")
    ? cover
    : "file://" + path.join(ROOT, "public", cover.replace(/^\//, ""));
  // The importer uploads this and swaps in the asset reference. It
  // deduplicates by content hash, so a re-run adds no copies.
  return { _type: "image", _sanityAsset: `image@${source}` };
}

async function main() {
  const content = await loadContent();
  const en = content.en.blog.posts;
  const es = content.es.blog.posts;

  const lines = en.map((post) => {
    const translated = es.find((p) => p.slug === post.slug);
    return JSON.stringify({
      _id: `post-${post.slug}`,
      _type: "post",
      title: { en: post.title, ...(translated && { es: translated.title }) },
      slug: { _type: "slug", current: post.slug },
      category: { en: post.category, ...(translated && { es: translated.category }) },
      excerpt: { en: post.excerpt, ...(translated && { es: translated.excerpt }) },
      cover: coverRef(post.cover),
      publishedAt: toISO(post.date),
      readingMinutes: toMinutes(post.read),
    });
  });

  await writeFile(OUT, lines.join("\n") + "\n", "utf8");

  console.log(`${lines.length} notas escritas en ${OUT}`);
  for (const post of en) {
    console.log(`  ${post.slug}  ${toISO(post.date)?.slice(0, 7)}  ${toMinutes(post.read)} min`);
  }
  // Italian is deliberately absent: the site has no Italian blog copy
  // today either, and `localize` falls back to English exactly as it
  // does now. Inventing translations here would be worse than the gap.
  console.log("\nItaliano queda sin rellenar, igual que ahora: cae a ingles.");
  console.log(`\nImportar con:\n  cd ../mait-studio-cms\n  npx sanity dataset import ${OUT} production --missing`);
}

main().catch((error) => {
  console.error("\nFallo:", error.message);
  process.exit(1);
});
