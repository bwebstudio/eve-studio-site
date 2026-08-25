import { PROJECT_ORDER } from "@/lib/projects";
import Navigation from "@/components/Navigation";
import CaseStudy from "@/components/CaseStudy";
import { BRAND } from "@/lib/brand";

export function generateStaticParams() {
  return PROJECT_ORDER.map((slug) => ({ slug }));
}

// Only the slugs above exist. Without this, any other slug would still
// render (as a soft "Project not found" with a 200) — including the
// placeholder projects that were removed from the archive.
export const dynamicParams = false;

export function generateMetadata({ params }) {
  const slug = params.slug;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${title} — ${BRAND.name}`,
    description: `Case study: ${title}. Brand direction, brand experiences and visual content by ${BRAND.name}.`,
  };
}

export default function WorkPage({ params }) {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <CaseStudy slug={params.slug} />
    </main>
  );
}
