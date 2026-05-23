import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Services from "@/components/Services";
import SelectedWork from "@/components/SelectedWork";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <Hero />
      <Clients />
      <About />
      <Services />
      <SelectedWork />
      {/* Blog teaser — full archive lives at /blog */}
      <Blog limit={3} asSection />
      <Contact />
      <SiteFooter />
    </main>
  );
}
