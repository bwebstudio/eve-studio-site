import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Studio from "@/components/Studio";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <Hero />
      <Studio />
      <SelectedWork />
      <Services />
      <Newsletter />
      <Contact />
    </main>
  );
}
