"use client";

import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GalaxyBackground from "./GalaxyBackground";
import Globe from "@/public/Home/Earth.json";
import { earthBoxes } from "./data/hero_data";

gsap.registerPlugin(ScrollTrigger);

type EarthProps = {
  size?: string;
};

export default function Earth({ size = "h-[80vh]" }: EarthProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const boxesRef = useRef<HTMLDivElement[]>([]);

  const setBoxRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) boxesRef.current[idx] = el;
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const boxes = [...boxesRef.current];

    let layoutRAF = 0;
    let tl: gsap.core.Timeline | null = null;
    let globeTween: gsap.core.Tween | null = null;
    let st: ScrollTrigger | null = null;

    const build = () => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const fromVars = boxes.map((box) => {
        const b = box.getBoundingClientRect();
        return {
          x: centerX - (b.left - rect.left + b.width / 2),
          y: centerY - (b.top - rect.top + b.height / 2),
        };
      });

      tl?.kill();
      globeTween?.kill();
      st?.kill();

      gsap.set(boxes, {
        x: (i) => fromVars[i].x,
        y: (i) => fromVars[i].y,
        opacity: 0,
        scale: 0.65,
      });

      tl = gsap.timeline({ paused: true });

      tl.to(boxes, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
        stagger: { each: 0.18, from: "center" },
      });

      tl.to(
        boxes,
        {
          y: "+=6",
          duration: 1.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
          stagger: { each: 0.12, from: "center" },
        },
        ">+0.05"
      );

      globeTween = gsap.to(".earth-lottie", {
        rotation: 35,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      st = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => tl?.restart(),
        onEnterBack: () => tl?.restart(),
        onLeave: () => tl?.reverse(),
        onLeaveBack: () => tl?.reverse(),
      });
    };

    layoutRAF = requestAnimationFrame(() => {
      build();
      ScrollTrigger.refresh();
    });

    const onResize = () => {
      cancelAnimationFrame(layoutRAF);
      layoutRAF = requestAnimationFrame(build);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(layoutRAF);
      window.removeEventListener("resize", onResize);

      tl?.kill();
      globeTween?.kill();
      st?.kill();
      gsap.killTweensOf(boxes);

      ScrollTrigger.refresh();
    };
  }, []);

  /* ================= COLOR MAP ================= */

  const boxColorMap: Record<string, string> = {
    indigo: "from-indigo-500/25 to-indigo-300/5 border-indigo-400/30",
    emerald: "from-emerald-500/25 to-emerald-300/5 border-emerald-400/30",
    cyan: "from-cyan-500/25 to-cyan-300/5 border-cyan-400/30",
    violet: "from-violet-500/25 to-violet-300/5 border-violet-400/30",
  };

  const baseBoxClasses =
    "info-box absolute w-44 md:w-56 p-4 backdrop-blur-md rounded-2xl shadow-2xl text-white text-center z-20 bg-gradient-to-br";

  return (
    <section
      ref={sectionRef}
      className={`relative w-full ${size} flex flex-col items-center overflow-hidden px-6`}
    >
      <GalaxyBackground />

      {/* ================= HEADING (TOP CENTER) ================= */}
      <h2
        className="
          services-heading
          absolute
          top-8
          left-1/2
          -translate-x-1/2
          z-30
          text-center
          text-3xl
          md:text-5xl
          font-bold
          tracking-tight
          text-white
        "
      >
        Our Services
      </h2>

      {/* ================= EARTH ================= */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <Lottie
          animationData={Globe}
          loop
          autoplay
          className="earth-lottie w-[120vmin] h-[120vmin] opacity-90"
        />
      </div>

      {/* ================= BOXES ================= */}
      {earthBoxes.map((box, idx) => {
        const Icon = box.icon;

        return (
          <div
            key={box.id}
            ref={(el) => setBoxRef(el, idx)}
            className={`
              ${baseBoxClasses}
              ${box.position}
              ${boxColorMap[box.color] ?? boxColorMap.indigo}
            `}
          >
            <div className="flex items-center justify-center mb-3">
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-lg">
                <Icon className="w-6 h-6 text-[#b6e0fe]" />
              </div>
            </div>

            <h3 className="font-semibold text-lg mb-1">{box.title}</h3>
            <p className="text-sm text-gray-200">{box.description}</p>
          </div>
        );
      })}
    </section>
  );
}
