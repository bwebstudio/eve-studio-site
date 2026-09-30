import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import BlogPost from "@/components/BlogPost";
import SiteFooter from "@/components/SiteFooter";
import content from "@/lib/content";
import { BRAND } from "@/lib/brand";
import { getPost, getPostSlugs, localize } from "@/lib/blog";

export const revalidate = 300;

// Slugs come from Sanity once posts exist there. Until they do, the notes
// still in lib/content.js are generated, so the existing URLs keep working
// through the migration and nothing 404s while the dataset fills up.
export async function generateStaticParams() {
  const fromSanity = await getPostSlugs();
  const fromContent = content.en.blog.posts.map((post) => post.slug);
  const slugs = [...new Set([...fromSanity, ...fromContent])];
  return slugs.map((slug) => ({ slug }));
}

// On, so a note published in the Studio is reachable straight away
// instead of waiting for the next deploy to add it to the static params.
// A slug that exists in neither source still 404s, see below: rendering
// an empty shell with a 200 would leave invented URLs indexable.
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const doc = await getPost(params.slug);
  const post =
    localize(doc, "en") ||
    content.en.blog.posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: `Note · ${BRAND.name}`,
      description: `From the studio. ${BRAND.name}, creative studio.`,
    };
  }
  return {
    title: `${post.title} · ${BRAND.name}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const doc = await getPost(params.slug);

  // Neither the Studio nor the copy still held in the repo knows this
  // slug, so it is not a note: answer 404 rather than a styled blank.
  const known =
    Boolean(doc) ||
    content.en.blog.posts.some((post) => post.slug === params.slug);
  if (!known) notFound();

  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <BlogPost slug={params.slug} doc={doc} />
      <SiteFooter />
    </main>
  );
}
