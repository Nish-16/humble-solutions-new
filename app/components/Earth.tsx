"use client";

import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalaxyBackground from "./GalaxyBackground";
import { infoBoxes } from "./data/hero_data";
import Globe from "@/public/Home/Earth.json";

gsap.registerPlugin(ScrollTrigger);

type EarthProps = {
  size?: string;
  lottieData: string; // <-- pass Lottie JSON here
};

export default function Earth({ size = "h-[80vh]" }: EarthProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // ✅ Info Box Animations
  useEffect(() => {
  if (!sectionRef.current) return;

  // Allow layout to finish
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const boxes = sectionRef.current!.querySelectorAll<HTMLElement>(".info-box");
      const triggers: ScrollTrigger[] = [];

      const sectionRect = sectionRef.current!.getBoundingClientRect();
      const centerX = sectionRect.width / 2;
      const centerY = sectionRect.height / 2;

      // ✅ GLOBE ROTATION SPEED UP ON SCROLL
      gsap.to(".earth-lottie", {
        rotation: 45, // degrees
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        ease: "none",
      });

      boxes.forEach((box, index) => {
        const rect = box.getBoundingClientRect();

        // ✅ Start at center → move outward
        const startX = centerX - (rect.left - sectionRect.left + rect.width / 2);
        const startY = centerY - (rect.top - sectionRect.top + rect.height / 2);

        // ✅ Orbit offset before settling
        const orbitX = (index % 2 === 0 ? 1 : -1) * 40;   // horizontal wobble
        const orbitY = index * 10;                       // slight vertical offset

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top center",
            end: "center+=100 center",
            scrub: 1,
          },
        });

        // ✅ Center → Orbit
        tl.fromTo(
          box,
          { x: startX, y: startY, scale: 0.4, opacity: 0 },
          { x: orbitX, y: orbitY, scale: 1, opacity: 1, ease: "power3.out" }
        );

        // ✅ Orbit → Final Position
        tl.to(box, {
          x: 0,
          y: 0,
          ease: "power2.out",
        });

        triggers.push(tl.scrollTrigger!);
      });

      return () => {
        triggers.forEach((st) => st.kill());
        gsap.killTweensOf(".info-box");
      };
    });
  });
}, []);


  const boxClasses =
    "info-box absolute w-48 h-32 md:w-64 md:h-40 p-4 bg-black/20 backdrop-blur-md border border-white/20 rounded-lg shadow-lg text-white flex flex-col justify-center items-center text-center z-20";

  return (
    <section
      ref={sectionRef}
      className={`relative w-full ${size} flex items-center justify-center overflow-hidden`}
    >
      {/* ⭐ Background Galaxy */}
      <GalaxyBackground />

      {/* ✅ Lottie Earth */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 pointer-events-none">
        <Lottie
          animationData={Globe}
          loop
          autoplay
          className="earth-lottie w-[150vh] h-[150vh]"
        />

      </div>

      {/* ✅ Info Boxes */}
      {infoBoxes.map((box) => (
        <div key={box.id} className={`${boxClasses} ${box.position}`}>
          <div className="w-12 h-1 bg-[#b6e0fe] rounded-full mb-3"></div>
          <h3 className="font-bold text-lg mb-1">{box.title}</h3>
          <p className="text-sm text-gray-200">{box.description}</p>
        </div>
      ))}
    </section>
  );
}
