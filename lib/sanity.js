import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

/**
 * Sanity client for the blog.
 *
 * Only the blog reads from Sanity. Everything else on the site (case
 * studies, services, the home) stays in lib/content.js and lib/projects.js,
 * because that copy is signed off per round rather than edited day to day.
 *
 * `@sanity/client` is used directly instead of `next-sanity`: the current
 * next-sanity requires Next 16 and this app is on 14, and the only thing
 * needed here is a GROQ read. Caching is handled by the route segments
 * (`export const revalidate`) plus the on-demand webhook in
 * app/api/revalidate, so nothing is lost by leaving it out.
 *
 * The project ID and dataset are public by design: the dataset is public
 * and read-only from the web app. No token is used, and none should be
 * added here, because anything in this file ships to the browser when a
 * client component imports from it.
 */
export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ekd79qrb";
export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** Pinned so a future API change cannot alter responses without a deploy. */
const API_VERSION = "2026-01-01";

export const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: API_VERSION,
  // The CDN is the right default for published content: it is faster and
  // cheaper, and on-demand revalidation handles freshness.
  useCdn: true,
  perspective: "published",
});

const builder = createImageUrlBuilder(sanity);

/**
 * Turn a Sanity image reference into a URL.
 *
 * Returns null for a missing image so callers can fall back rather than
 * render a broken `src`. Sanity crops and converts on the fly, which is
 * what replaces the hand-run ffmpeg/webp step for blog covers.
 */
export function imageUrl(source, { width = 1400, height, quality = 80 } = {}) {
  if (!source?.asset?._ref && !source?.asset?._id) return null;
  let url = builder.image(source).width(width).quality(quality).auto("format");
  if (height) url = url.height(height).fit("crop");
  return url.url();
}
