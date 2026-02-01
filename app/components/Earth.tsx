"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { earthBoxes } from "./data/hero_data";

gsap.registerPlugin(ScrollTrigger);

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const GalaxyBackground = dynamic(() => import("./GalaxyBackground"), {
  ssr: false,
  loading: () => null,
});

type EarthProps = {
  size?: string;
};

export default function Earth({ size = "h-[80vh]" }: EarthProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const boxesRef = useRef<HTMLDivElement[]>([]);
  const lottieRef = useRef<any>(null);

  const [globeData, setGlobeData] = useState<object | null>(null);

  const setBoxRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) boxesRef.current[idx] = el;
  };

  // 🌍 Load Lottie only when near viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetch("/Home/Earth.json")
            .then((res) => res.json())
            .then(setGlobeData);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 🎬 Pause/play Lottie based on visibility
  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => lottieRef.current?.play(),
      onEnterBack: () => lottieRef.current?.play(),
      onLeave: () => lottieRef.current?.pause(),
      onLeaveBack: () => lottieRef.current?.pause(),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const boxes = boxesRef.current.filter(Boolean);

    let tl: gsap.core.Timeline | null = null;
    let globeTween: gsap.core.Tween | null = null;
    let st: ScrollTrigger | null = null;

    const build = () => {
      const rect = section.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const boxRects = boxes.map((box) => box.getBoundingClientRect());

      const fromVars = boxRects.map((b) => ({
        x: centerX - (b.left - rect.left + b.width / 2),
        y: centerY - (b.top - rect.top + b.height / 2),
      }));

      tl?.kill();
      globeTween?.kill();
      st?.kill();

      gsap.set(boxes, {
        x: (i) => fromVars[i].x,
        y: (i) => fromVars[i].y,
        autoAlpha: 0,
        scale: 0.75,
        force3D: true,
        willChange: "transform, opacity",
      });

      tl = gsap.timeline({ paused: true });

      tl.to(boxes, {
        x: 0,
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 1.15,
        ease: "power4.out",
        stagger: { each: 0.12, from: "center" },
        overwrite: "auto",
      });

      tl.to(
        boxes,
        {
          y: "+=8",
          duration: 0.9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
          stagger: { each: 0.08, from: "center" },
          overwrite: "auto",
        },
        ">+0.05"
      );

      globeTween = gsap.to(".earth-lottie", {
        rotation: 35,
        ease: "none",
        lazy: true,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      st = ScrollTrigger.create({
        trigger: section,
        start: "top 65%",
        onEnter: () => tl?.restart(),
        onEnterBack: () => tl?.restart(),
        onLeave: () => tl?.reverse(),
        onLeaveBack: () => tl?.reverse(),
      });
    };

    build();
    ScrollTrigger.refresh();

    // 🧠 Debounced resize
    let resizeTimeout: any;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        build();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tl?.kill();
      globeTween?.kill();
      st?.kill();
      gsap.killTweensOf(boxes);
    };
  }, []);

  const boxColorMap: Record<string, string> = {
    indigo:
      "from-indigo-500/30 to-indigo-300/10 border-indigo-400/60 shadow-indigo-500/30",
    emerald:
      "from-emerald-500/30 to-emerald-300/10 border-emerald-400/60 shadow-emerald-500/30",
    cyan: "from-cyan-500/30 to-cyan-300/10 border-cyan-400/60 shadow-cyan-500/30",
    violet:
      "from-violet-500/30 to-violet-300/10 border-violet-400/60 shadow-violet-500/30",
  };

  const baseBoxClasses =
    "info-box absolute w-44 md:w-56 p-4 backdrop-blur-md rounded-2xl text-white text-center z-20 bg-gradient-to-br border border-2 transition-transform transition-shadow duration-300 hover:scale-[1.04] hover:shadow-2xl opacity-0 will-change-transform";

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full ${size} flex flex-col items-center overflow-hidden px-6`}
    >
      <GalaxyBackground />

      <h2 className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-3xl md:text-5xl font-bold tracking-tight text-white">
        Our Services
      </h2>

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {globeData && (
          <Lottie
            lottieRef={lottieRef}
            animationData={globeData}
            loop
            autoplay
            className={`earth-lottie ${
              isMobile ? "w-[160vmin] h-[160vmin]" : "w-[120vmin] h-[120vmin]"
            } opacity-90`}
          />
        )}
      </div>

      {earthBoxes.map((box, idx) => {
        const Icon = box.icon;
        return (
          <div
            key={box.id}
            ref={(el) => setBoxRef(el, idx)}
            className={`${baseBoxClasses} ${box.position} ${
              boxColorMap[box.color] ?? boxColorMap.indigo
            }`}
          >
            <div className="flex items-center justify-center mb-3">
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-lg">
                <Icon className="w-6 h-6 text-[#b6e0fe]" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-1 cursor-default">
              {box.title}
            </h3>
            <p className="text-sm text-gray-200 cursor-default">
              {box.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
