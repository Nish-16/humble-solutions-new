"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypingText } from "./UI/TypingTextDemo"; // Assuming these paths are correct
import GalaxyBackground from "./GalaxyBackground"; // Assuming these paths are correct

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Use a single useEffect for all GSAP animations
  useEffect(() => {
    
    // All GSAP/ScrollTrigger code goes inside here
    const ctx = gsap.context(() => {

      // === GSAP Text Entrance Animation ===
      gsap.timeline({
          defaults: { ease: "expo.out", duration: 1.8 },
        })
        // I added opacity: 0 to prevent a flash of content before animating
        .from(".gsap-hero-title", { y: 60, scale: 0.92, opacity: 0 })
        .from(".gsap-hero-desc", { y: 40, stagger: 0.18, opacity: 0 }, "-=1.5")
        .from(".gsap-cta", { y: 30, scale: 0.95, opacity: 0 }, "-=1.2");

      // === Scroll Out Animation (fade + slide up) ===
      // Check for contentRef, though with context it's safer
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current, // Use the main section as the trigger
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef); // Scope the context to the sectionRef

    
    // It reverts all animations and kills all ScrollTriggers created inside the context.
    return () => ctx.revert();
    
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
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
          Transforming Ideas into Intuitive Digital Experiences.
        </p>
        <p className="gsap-hero-desc text-base sm:text-xl max-w-2xl text-center mb-10 text-white/60">
          We use technology to solve real-world problems for businesses and
          people. Innovation, efficiency, and impact—delivered.
        </p>
        <a
          href="#services"
          className="gsap-cta px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-lg font-semibold shadow-lg transition-colors mt-5"
        >
          See Our Solutions
        </a>
      </div>
    </section>
  );
};

export default HeroSection;