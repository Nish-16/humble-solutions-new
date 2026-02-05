"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import FooterSection from "./FooterSection";
import HumbleAdvantage from "./HumbleAdvantage";
import ContactSection from "./ContactSection";

// 🌍 Only Earth is lazy-loaded
const ClientEarthRendered = dynamic(() => import("./ClientEarthRendered"), {
  ssr: false,
});

// 👇 Lazy wrapper JUST for Earth
function LazyEarth() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { rootMargin: "300px" }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return <div ref={ref}>{show && <ClientEarthRendered />}</div>;
}

export default function HomeWithLoader() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ticker for smoother performance
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] to-black text-white relative z-10">
        <HeroSection />

        {/* 🌍 Lazy-loaded Earth section */}
        <LazyEarth />

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
