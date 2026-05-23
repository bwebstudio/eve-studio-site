import Navigation from "@/components/Navigation";
import WorkCategoryPage from "@/components/WorkCategoryPage";
import SiteFooter from "@/components/SiteFooter";
import { PROJECTS_BY_CATEGORY } from "@/lib/projects";

export const metadata = {
  title: "Social Media — EVE Studio",
  description:
    "Strategy, content systems and monthly direction for brands that want presence. Eve, a Madrid-based creative studio.",
};

export default function SocialMediaPage() {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <WorkCategoryPage
        categoryKey="social-media"
        projects={PROJECTS_BY_CATEGORY["social-media"]}
      />
      <SiteFooter />
    </main>
  );
}
