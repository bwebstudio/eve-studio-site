import Navigation from "@/components/Navigation";
import BlogPost from "@/components/BlogPost";
import SiteFooter from "@/components/SiteFooter";
import content from "@/lib/content";
import { BRAND } from "@/lib/brand";

// MAIT publishes weekly — we statically generate every post slug that
// exists in the EN content map at build time so each note can be
// crawled and linked individually. ES translations share the same
// slug, so generating from EN covers both locales.
export function generateStaticParams() {
  return content.en.blog.posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = content.en.blog.posts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: `Note — ${BRAND.name}`,
      description: `From the studio. ${BRAND.name}, creative studio.`,
    };
  }
  return {
    title: `${post.title} — ${BRAND.name}`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <BlogPost slug={params.slug} />
      <SiteFooter />
    </main>
  );
}
