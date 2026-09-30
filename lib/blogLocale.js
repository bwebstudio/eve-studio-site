/**
 * Locale helpers for blog posts.
 *
 * Deliberately free of any Sanity import. Client components call
 * `localize` on every render when the visitor switches language, and
 * pulling the Sanity client in through this path would ship it to the
 * browser for no reason.
 */

/**
 * Pick one language out of a translated field.
 *
 * Falls back the same way the rest of the site does: the requested
 * language, then English, then whatever exists. A half-translated post
 * still reads, it does not render blank.
 */
function pick(field, lang) {
  if (!field) return null;
  if (typeof field === "string") return field;
  return field[lang] ?? field.en ?? Object.values(field).find(Boolean) ?? null;
}

const DATE_LOCALE = { en: "en-GB", es: "es-ES", it: "it-IT" };
const READ_LABEL = {
  en: (n) => `${n} min read`,
  es: (n) => `${n} min de lectura`,
  it: (n) => `${n} min di lettura`,
};

function formatDate(iso, lang) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const text = new Intl.DateTimeFormat(DATE_LOCALE[lang] || "en-GB", {
    month: "long",
    year: "numeric",
  }).format(d);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Flatten a Sanity post into the shape the blog components already read:
 * { slug, cover, title, excerpt, category, date, read, body }.
 *
 * Pure and dependency-free, so client components can call it per render
 * when the visitor switches language.
 */
export function localize(doc, lang = "en") {
  if (!doc) return null;
  const minutes = doc.readingMinutes;
  return {
    slug: doc.slug,
    cover: doc.coverUrl || null,
    title: pick(doc.title, lang),
    excerpt: pick(doc.excerpt, lang),
    category: pick(doc.category, lang),
    date: formatDate(doc.publishedAt, lang),
    read: minutes ? (READ_LABEL[lang] || READ_LABEL.en)(minutes) : null,
    body: pick(doc.body, lang),
  };
}
