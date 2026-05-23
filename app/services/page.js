import Navigation from "@/components/Navigation";
import AllServicesPage from "@/components/AllServicesPage";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Services — EVE Studio",
  description:
    "Events, social media, photo & video. Three disciplines, one studio — Eve, a Madrid-based creative studio.",
};

export default function ServicesPage() {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <AllServicesPage />
      <SiteFooter />
    </main>
  );
}
