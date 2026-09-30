import projects, { PROJECT_ORDER } from "@/lib/projects";
import Navigation from "@/components/Navigation";
import CaseStudy from "@/components/CaseStudy";
import { BRAND } from "@/lib/brand";

export function generateStaticParams() {
  return PROJECT_ORDER.map((slug) => ({ slug }));
}

// Only the slugs above exist. Without this, any other slug would still
// render (as a soft "Project not found" with a 200), including the
// placeholder projects that were removed from the archive.
export const dynamicParams = false;

// Title and description come from the project's own approved copy.
// De-slugging the URL produced the wrong names ("Downhillitalia",
// "Ipa Brand Lionna") and a generic invented description; the English
// entry is the metadata source since the pages render in English until
// the visitor switches locale client-side.
export function generateMetadata({ params }) {
  const project = projects.en?.[params.slug];
  const title = project?.title ?? params.slug;
  return {
    title: `${title} · ${BRAND.name}`,
    description: project?.subtitle ?? `Case study: ${title}.`,
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
