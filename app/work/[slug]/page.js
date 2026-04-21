import { PROJECT_ORDER } from "@/lib/projects";
import Navigation from "@/components/Navigation";
import CaseStudy from "@/components/CaseStudy";

export function generateStaticParams() {
  return PROJECT_ORDER.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const slug = params.slug;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${title} — EVE Studio`,
    description: `Case study: ${title}. Brand direction, visual content and strategic connections by EVE, a Madrid-based creative studio.`,
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
