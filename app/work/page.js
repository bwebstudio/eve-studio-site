import Navigation from "@/components/Navigation";
import WorkIndexPage from "@/components/WorkIndexPage";
import SiteFooter from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Work — ${BRAND.name}`,
  description: `Selected projects by ${BRAND.name} — events, brand experiences, photo & video.`,
  alternates: { canonical: "/work" },
};

export default function WorkRoute() {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <WorkIndexPage />
      <SiteFooter />
    </main>
  );
}
