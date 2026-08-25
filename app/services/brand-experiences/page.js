import Navigation from "@/components/Navigation";
import BrandExperiencesPage from "@/components/BrandExperiencesPage";
import SiteFooter from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";

// Pillar 02. Replaces the retired "Social Media" service; the old
// /work/social-media URL 301-redirects here (see next.config.mjs).
// Metadata follows the site pattern — English, matching the default
// locale served in the HTML.
export const metadata = {
  title: `Brand Experiences — ${BRAND.name}`,
  description:
    "Activations, launches, pop-ups and experiences designed from concept through to final production — brand experiences by MAIT Studio.",
  alternates: { canonical: "/services/brand-experiences" },
  openGraph: {
    title: `Brand Experiences — ${BRAND.name}`,
    description:
      "We create moments that make a brand felt, remembered and shared.",
    type: "website",
    url: "/services/brand-experiences",
  },
};

export default function BrandExperiencesRoute() {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <BrandExperiencesPage />
      <SiteFooter />
    </main>
  );
}
