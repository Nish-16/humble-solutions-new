"use client";

import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import FooterSection from "./FooterSection";
import HumbleAdvantage from "./HumbleAdvantage";
import ContactSection from "./ContactSection";
import LoadingScreen from "./LoadingScreen";

const HOME_LOADER_FLAG = "hs_home_loaded";
const MIN_LOADER_MS = 600;

export default function HomeWithLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader only on first visit per tab/session.
    try {
      if (sessionStorage.getItem(HOME_LOADER_FLAG) === "1") {
        setLoading(false);
        return;
      }
    } catch {
      // ignore
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = previousOverflow;
      try {
        sessionStorage.setItem(HOME_LOADER_FLAG, "1");
      } catch {
        // ignore
      }
    }, MIN_LOADER_MS);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (loading) return <LoadingScreen />;

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
