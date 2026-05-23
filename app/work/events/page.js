import Navigation from "@/components/Navigation";
import WorkCategoryPage from "@/components/WorkCategoryPage";
import SiteFooter from "@/components/SiteFooter";
import { PROJECTS_BY_CATEGORY } from "@/lib/projects";

export const metadata = {
  title: "Events — EVE Studio",
  description:
    "Brand activations, launches, nightlife and cultural moments — produced and directed by Eve, a Madrid-based creative studio.",
};

export default function EventsPage() {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <WorkCategoryPage
        categoryKey="events"
        projects={PROJECTS_BY_CATEGORY.events}
      />
      <SiteFooter />
    </main>
  );
}
