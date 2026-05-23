import Navigation from "@/components/Navigation";
import WorkCategoryPage from "@/components/WorkCategoryPage";
import SiteFooter from "@/components/SiteFooter";
import { PROJECTS_BY_CATEGORY } from "@/lib/projects";

export const metadata = {
  title: "Photo & Video — EVE Studio",
  description:
    "Campaign suites, reels, editorial stories and brand films, produced in-house by Eve, a Madrid-based creative studio.",
};

export default function PhotoVideoPage() {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <WorkCategoryPage
        categoryKey="photo-video"
        projects={PROJECTS_BY_CATEGORY["photo-video"]}
      />
      <SiteFooter />
    </main>
  );
}
