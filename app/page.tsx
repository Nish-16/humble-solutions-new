"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import TimelineSection from "./components/Timeline";
import FooterSection from "./components/FooterSection";

export default function Home() {
  const pathname = usePathname();

  return (
    <div>
      <Navbar />

      {/* Use key={pathname} to force HeroSection to remount on navigation */}
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] to-black text-white relative z-10">
        <HeroSection key={pathname} />
        <TimelineSection />
        <AboutSection />
        <ServicesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FooterSection />
      </div>
    </div>
  );
}
