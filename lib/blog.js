import { sanity, imageUrl } from "./sanity";

/**
 * Blog data layer.
 *
 * Posts are one document per article with the translated strings stored as
 * fields on it, rather than one document per language. That matches how the
 * site already works: a note has a single slug and the language toggle
 * swaps the words in place, so /blog/rooms-people-remember is the same URL
 * in all three locales.
 *
 * Covers are resolved to URLs here, on the server, so that the client
 * components never import the Sanity client and it stays out of the browser
 * bundle.
 *
 * Every read falls back to an empty result rather than throwing. While the
 * dataset is empty, or if Sanity is unreachable, the blog keeps rendering
 * from lib/content.js. Losing the CMS must never take the site down.
 */

const POST_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  excerpt,
  category,
  body,
  publishedAt,
  readingMinutes,
  cover
`;

async function safeFetch(query, params = {}) {
  try {
    return await sanity.fetch(query, params);
  } catch (error) {
    // A CMS outage degrades to the built-in copy; it never 500s the page.
    console.error("[blog] Sanity read failed:", error?.message || error);
    return null;
  }
}

function withCoverUrl(doc) {
  if (!doc) return doc;
  const { cover, ...rest } = doc;
  return { ...rest, coverUrl: imageUrl(cover, { width: 1400 }) };
}

/** Every published post, newest first. Empty array if there are none. */
export async function getPosts() {
  const docs = await safeFetch(
    /* groq */ `*[_type == "post" && defined(slug.current)]
      | order(publishedAt desc) { ${POST_FIELDS} }`
  );
  return Array.isArray(docs) ? docs.map(withCoverUrl) : [];
}

/** One post by slug, or null. */
export async function getPost(slug) {
  const doc = await safeFetch(
    /* groq */ `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
    { slug }
  );
  return doc ? withCoverUrl(doc) : null;
}

/** Just the slugs, for generateStaticParams. */
export async function getPostSlugs() {
  const slugs = await safeFetch(
    /* groq */ `*[_type == "post" && defined(slug.current)].slug.current`
  );
  return Array.isArray(slugs) ? slugs : [];
}

export { localize } from "./blogLocale";
