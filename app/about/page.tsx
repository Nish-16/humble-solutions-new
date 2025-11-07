import Navbar from "../components/Navbar";
import GalaxyBackground from "./GalaxyBackground";
import AboutSection from "./AboutSection";
import FooterSection from "../components/FooterSection";
import SmoothScroll from "../journey/SmoothScroll";
import Hero from "./Hero";
import Features from "./Features";
import Team from "./Team";
import Journey from "./Journey";

export default function About() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] to-black">
      <GalaxyBackground />
      <SmoothScroll>
        <Navbar />

        <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <Hero />

          {/* Reuse AboutSection (3D canvas + blurb) */}
          <div className="mt-12 rounded-full">
            <AboutSection />
          </div>

          <Team />

          <Features />

          <Journey />
        </main>

        <FooterSection />
      </SmoothScroll>
    </div>
  );
}
