import Navbar from "../components/Navbar";
import GalaxyBackground from "./GalaxyBackground";
import AboutSection from "./AboutSection";
import FooterSection from "../components/FooterSection";
import SmoothScroll from "../journey/SmoothScroll";
import Hero from "./Hero";
import Team from "./Team";

export default function About() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] to-black">
      <GalaxyBackground />
      <SmoothScroll>
        <Navbar />
        <main className="relative z-10 max-w-6xl mx-auto px-2 py-20">
          <Hero />
          <div className="mt-12 rounded-full">
            <AboutSection />
          </div>
          <Team />
        </main>
        <FooterSection />
      </SmoothScroll>
    </div>
  );
}
