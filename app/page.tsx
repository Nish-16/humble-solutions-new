"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FooterSection from "./components/FooterSection";
import HumbleAdvantage from "./components/HumbleAdvantage";
import ContactSection from "./components/ContactSection";

export default function Home() {
  const pathname = usePathname();

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] to-black text-white relative z-10">
        <HeroSection key={pathname} />

        {/* 👇 ONLY PHONES */}
        <div className="block md:hidden">
          <ServicesSection />
        </div>

        <AboutSection />
        <HumbleAdvantage />
        <ContactSection />
        <TestimonialsSection />
        <FooterSection />
      </div>
    </div>
  );
}
