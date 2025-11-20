"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypingText } from "./UI/TypingTextDemo";
import GalaxyBackground from "./GalaxyBackground";
import Earth from "./Earth"; // <-- Import your Earth component

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null); // For Earth fade-in

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === HERO ENTRANCE ===
      gsap
        .timeline({ defaults: { ease: "expo.out", duration: 1.8 } })
        .from(".gsap-hero-title", { y: 60, scale: 0.92, opacity: 0 })
        .from(".gsap-hero-desc", { y: 40, stagger: 0.18, opacity: 0 }, "-=1.5")
        .from(".gsap-cta", { y: 30, scale: 0.95, opacity: 0 }, "-=1.2");

      // === OUTRO + CROSSFADE to EARTH SECTION ===
      if (sectionRef.current && contentRef.current && nextSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
            pinSpacing: false,
            // markers: true, // uncomment for debugging
          },
        });

        tl.to(contentRef.current, {
          opacity: 0,
          y: -150,
          scale: 0.9,
          ease: "power1.inOut",
        }).fromTo(
          nextSectionRef.current,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, ease: "power2.out" },
          "<50%" // starts halfway through fade-out
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* === HERO SECTION === */}
      <section
        ref={sectionRef}
        className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
      >
        <GalaxyBackground />
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        >
          <TypingText
            text={["Humble Solutions"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            className="gsap-hero-title text-6xl font-bold text-center max-w-2xl mb-3"
            cursorClassName="h-12"
            textColors={["#3b82f6", "#8b5cf6", "#06b6d4"]}
            variableSpeed={{ min: 50, max: 120 }}
          />
          <p className="gsap-hero-desc text-lg sm:text-2xl max-w-2xl text-center mb-6 text-white/80">
            Boost Your Sales Exponentially With Memorable Digital Experiences
          </p>
          <p className="gsap-hero-desc text-base sm:text-xl max-w-2xl text-center mb-10 text-white/60">
            Our appealing and responsive mobile apps, websites, and
            user-centric/user-friendly UI/UX designs help craft the outstanding
            customer journeys that drive conversions and make our clients
            industry leaders.
          </p>
          <a
            href="#services"
            className="gsap-cta px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-lg font-semibold shadow-lg transition-colors mt-1"
          >
            See Our Solutions
          </a>
        </div>
      </section>

      {/* === EARTH SECTION (CROSSFADE TARGET) === */}
      {/* Render Earth only on md+ screens to avoid mounting Three.js on small devices */}
      <div ref={nextSectionRef} className="opacity-0">
        {/** Use client-side media query so Earth (heavy Three.js) isn't mounted on mobile **/}
        {typeof window !== "undefined" && <ClientEarthRender />}
      </div>
    </>
  );
};

export default HeroSection;

function ClientEarthRender() {
  const [showEarth, setShowEarth] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowEarth(mq.matches);
    update();
    // Prefer modern API but fallback for older browsers
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return showEarth ? (
    <Earth size="h-[100vh]" />
  ) : null;
}
