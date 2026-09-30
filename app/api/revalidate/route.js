import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * POST /api/revalidate
 *
 * Sanity calls this when a post is published, edited or deleted, so the
 * change is live in seconds instead of waiting out the 5 minute timer the
 * blog routes fall back to.
 *
 * Auth is a shared secret sent as `?secret=` or in an `x-revalidate-secret`
 * header. Without SANITY_REVALIDATE_SECRET set the route refuses every
 * request: an open revalidation endpoint is a free way for anyone to force
 * rebuilds of the site.
 *
 * Configure in Sanity under API > Webhooks:
 *   URL      https://maitstudio.com/api/revalidate?secret=<the secret>
 *   Dataset  production
 *   Trigger  Create, Update, Delete
 *   Filter   _type == "post"
 */
export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET is not set");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const provided =
    new URL(request.url).searchParams.get("secret") ||
    request.headers.get("x-revalidate-secret");

  if (provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // The body carries the changed document. It is only used to target the
  // one post; a malformed or missing body still refreshes the indexes.
  let slug = null;
  try {
    const body = await request.json();
    slug = body?.slug?.current || body?.slug || null;
  } catch {
    // No body, or not JSON. Fall through to the index-only refresh.
  }

  const paths = ["/", "/blog"];
  if (typeof slug === "string" && /^[a-z0-9-]+$/i.test(slug)) {
    paths.push(`/blog/${slug}`);
  }

  for (const path of paths) revalidatePath(path);

  return NextResponse.json({ revalidated: paths, at: Date.now() });
}
