"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypingText } from "./UI/TypingTextDemo";
import GalaxyBackground from "./GalaxyBackground";
import Earth from "./Earth"; // <-- Import your Earth component
import Lottie from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null); // For Earth fade-in
  const [animationData, setAnimationData] = useState<any>(null);

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

  // Load a default Lottie JSON from `public/` (you can change this path)
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/Home/smartphone.json");
        if (!res.ok) return;
        const json = await res.json();
        if (mounted) setAnimationData(json);
      } catch (err) {
        // ignore fetch errors
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {/* === HERO SECTION === */}
      <section
        ref={sectionRef}
        className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
      >
        <GalaxyBackground />
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            {/* Left: text content */}
            <div
              ref={contentRef}
              className="md:w-1/2 w-full flex flex-col items-start md:items-start justify-center text-left"
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
              <p className="gsap-hero-desc text-lg sm:text-2xl max-w-2xl mb-6 text-white/80">
                Boost Your Sales Exponentially With Memorable Digital
                Experiences
              </p>
              <p className="gsap-hero-desc text-base sm:text-xl max-w-2xl mb-10 text-white/60">
                Our appealing and responsive mobile apps, websites, and
                user-centric/user-friendly UI/UX designs help craft the
                outstanding customer journeys that drive conversions and make
                our clients industry leaders.
              </p>
              <a
                href="#services"
                className="gsap-cta px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-lg font-semibold shadow-lg transition-colors mt-1"
              >
                See Our Solutions
              </a>
            </div>

            {/* Right: Lottie animation */}
            <div className="md:w-1/2 w-full flex items-center justify-center">
              <div className="w-full h-72 md:h-[520px]">
                {animationData ? (
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900/30 rounded-md flex items-center justify-center text-sm text-zinc-400">
                    Loading animation...
                  </div>
                )}
              </div>
            </div>
          </div>
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

  return showEarth ? <Earth size="h-[100vh]" /> : null;
}
