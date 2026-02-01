"use client";

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import FooterSection from "./FooterSection";
import HumbleAdvantage from "./HumbleAdvantage";
import ContactSection from "./ContactSection";

export default function HomeWithLoader() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] to-black text-white relative z-10">
        <HeroSection />

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
