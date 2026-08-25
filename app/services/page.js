import Navigation from "@/components/Navigation";
import AllServicesPage from "@/components/AllServicesPage";
import SiteFooter from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Services — ${BRAND.name}`,
  description: `Events, brand experiences, photo & video. Three disciplines, one studio — ${BRAND.name}.`,
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
