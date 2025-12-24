"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypingText } from "./UI/TypingTextDemo";
import GalaxyBackground from "./GalaxyBackground";
import Earth from "./Earth";
import Lottie from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  // ================= HERO GSAP =================
  useEffect(() => {
    // 1. Refresh ScrollTrigger once data loads to prevent layout shift jitter
    if (animationData) {
      ScrollTrigger.refresh();
    }

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap
        .timeline({ defaults: { ease: "expo.out", duration: 1.8 } })
        .from(".gsap-hero-title", { y: 60, scale: 0.92, opacity: 0 })
        .from(".gsap-hero-desc", { y: 40, stagger: 0.18, opacity: 0 }, "-=1.4")
        .from(".gsap-cta", { y: 30, scale: 0.95, opacity: 0 }, "-=1.2");

      // Scroll crossfade
      if (sectionRef.current && contentRef.current && nextSectionRef.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5, // 2. Changed from 1 to 0.5 for snappier, less "floaty" response
              pin: true,
              pinSpacing: false,
              // 3. Add anticipatePin to reduce flicker on fast scrolls
              anticipatePin: 1, 
            },
          })
          .to(contentRef.current, {
            opacity: 0,
            y: -150,
            scale: 0.9,
            ease: "power1.inOut",
            // 4. Force hardware acceleration
            willChange: "transform, opacity", 
          })
          .fromTo(
            nextSectionRef.current,
            // 5. REMOVED 'y: 100'. Moving the container breaks the child's (Earth)
            // getBoundingClientRect calculations. We only fade it in now.
            { opacity: 0 }, 
            { opacity: 1, ease: "power2.out" },
            "<50%"
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [animationData]); // Add animationData to dependency to refresh triggers on load

  // ================= LOAD LOTTIE =================
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/Home/smartphone.json");
        if (!res.ok) return;
        const json = await res.json();
        if (mounted) setAnimationData(json);
      } catch {}
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex items-center min-h-screen w-full overflow-hidden"
      >
        <GalaxyBackground />

        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
            <div
              ref={contentRef}
              // 6. Added will-change-transform via tailwind arbitrary property just in case
              className="md:w-1/2 w-full flex flex-col justify-center text-center md:text-left pt-24 md:pt-0 [will-change:transform]"
            >
              <TypingText
                text={["Humble Solutions"]}
                typingSpeed={80}
                pauseDuration={1500}
                showCursor
                className="gsap-hero-title text-4xl sm:text-6xl font-bold mb-4"
                cursorClassName="h-12"
                textColors={["#3b82f6", "#8b5cf6", "#06b6d4"]}
                variableSpeed={{ min: 100, max: 200 }}
              />

              <p className="gsap-hero-desc text-base sm:text-2xl max-w-2xl mb-6 text-white/80">
                Boost Your Sales Exponentially With Memorable Digital Experiences
              </p>

              <p className="gsap-hero-desc text-sm sm:text-xl max-w-2xl mb-10 text-white/60">
                Our responsive apps, websites, and user-centric UI/UX designs
                craft outstanding customer journeys that drive conversions.
              </p>

              <a
                href="#services"
                className="gsap-cta inline-block w-fit px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-base md:text-lg font-semibold shadow-lg transition-colors mx-auto md:mx-0"
              >
                See Our Solutions
              </a>
            </div>

            <div className="md:w-1/2 w-full flex justify-center">
              <div className="w-full h-[380px] md:h-[650px] lg:h-[720px] overflow-hidden">
                {animationData ? (
                  <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%", transform: "scale(1.25)" }}
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

      {/* ================= EARTH SECTION ================= */}
      {/* 7. Added z-index relative to ensure it layers correctly over fixed hero if needed */}
      <div ref={nextSectionRef} className="opacity-0 relative z-20">
        <ClientEarthRender />
      </div>
    </>
  );
};

export default HeroSection;

// ... ClientEarthRender remains the same ...
function ClientEarthRender() {
  const [showEarth, setShowEarth] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowEarth(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    mq.addListener?.(update);
    return () => {
      mq.removeEventListener?.("change", update);
      mq.removeListener?.(update);
    };
  }, []);
  return showEarth ? <Earth size="h-[100vh]" /> : null;
}