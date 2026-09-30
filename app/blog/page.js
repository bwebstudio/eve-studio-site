import Navigation from "@/components/Navigation";
import Blog from "@/components/Blog";
import SiteFooter from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";
import { getPosts } from "@/lib/blog";

export const metadata = {
  title: `Blog · ${BRAND.name}`,
  description:
    "Notes from the studio. Weekly editorial on brand, social, events and visual culture.",
};

// Posts are edited in Sanity, so the page is rebuilt on a timer as well as
// on demand. The webhook in app/api/revalidate makes a publish appear
// within seconds; this is the safety net if the webhook is ever missed.
export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <Blog posts={posts} />
      <SiteFooter />
    </main>
  );
}
