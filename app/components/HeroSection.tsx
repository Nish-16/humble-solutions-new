"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { TypingText } from "./UI/TypingTextDemo";

// 🔥 Heavy visual components loaded dynamically
const GalaxyBackground = dynamic(() => import("./GalaxyBackground"), {
  ssr: false,
  loading: () => null,
});

const Earth = dynamic(() => import("./Earth"), {
  ssr: false,
});

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  // ================= HERO GSAP =================
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.8 },
      });

      tl.from(".gsap-hero-title", { y: 60, scale: 0.92, opacity: 0 })
        .from(".gsap-hero-desc", { y: 40, stagger: 0.18, opacity: 0 }, "-=1.4")
        .from(".gsap-cta", { y: 30, scale: 0.95, opacity: 0 }, "-=1.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ================= LOAD LOTTIE JSON =================
  useEffect(() => {
    let mounted = true;

    fetch("/Home/smartphone.json")
      .then((res) => res.json())
      .then((data) => mounted && setAnimationData(data))
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  // 🧠 Memoize Lottie to prevent re-renders
  const lottieAnimation = useMemo(() => {
    if (!animationData) return null;

    return (
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{
          width: "100%",
          height: "100%",
          transform: "scale(1.25)",
        }}
      />
    );
  }, [animationData]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex items-center min-h-screen w-full overflow-hidden"
      >
        <GalaxyBackground />

        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 w-full flex flex-col justify-center text-center md:text-left pt-24 md:pt-0 [will-change:transform]">
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
                Boost Your Sales Exponentially With Memorable Digital
                Experiences
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
                {lottieAnimation ? (
                  lottieAnimation
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
      <div className="relative z-20">
        <ClientEarthRender />
      </div>
    </>
  );
};

export default HeroSection;

// ================= CLIENT EARTH RENDER =================
function ClientEarthRender() {
  const [showEarth, setShowEarth] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowEarth(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!showEarth) return null;
  return <Earth size="h-[100vh]" />;
}
