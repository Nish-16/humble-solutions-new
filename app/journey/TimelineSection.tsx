"use client";

import React, { useRef, useEffect } from "react";
import { timelineData } from "../components/data/Timeline_data";
import { useScripts } from "./useScripts";
import TimelineItem from "./TimelineItem";

const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scriptsLoaded = useScripts([
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
  ]);

  useEffect(() => {
    if (!scriptsLoaded || !sectionRef.current) return;

    // Narrow window.gsap / window.ScrollTrigger safely from unknown to a small usable shape
    const gsapUnknown = (window as any).gsap;
    const scrollTriggerUnknown = (window as any).ScrollTrigger;

    if (!gsapUnknown || !scrollTriggerUnknown) return;

    // Define a minimal typed shape we need from GSAP to avoid using `any`.
    type GsapUtils = {
      toArray: (selector: unknown) => unknown[];
    };
    type GsapContextResult = { revert: () => void };
    type GsapShape = {
      registerPlugin: (...plugins: unknown[]) => void;
      from: (target: unknown, vars: unknown) => unknown;
      to: (target: unknown, vars: unknown) => unknown;
      set: (target: unknown, vars: unknown) => void;
      context: (fn: () => void, scope?: unknown) => GsapContextResult;
      utils: GsapUtils;
    };

    // Narrowed, typed gsap and ScrollTrigger
    const gsap = gsapUnknown as unknown as GsapShape;
    const ScrollTrigger = scrollTriggerUnknown as unknown;

    // Now we can use gsap safely
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      // If registerPlugin fails for any reason, bail out gracefully.
      return;
    }

    const pinSection = sectionRef.current;
    if (!pinSection) return;

    const progressLine = pinSection.querySelector(".timeline-line-progress");

    const ctx = gsap.context(
      () => {
        // heading animation
        gsap.from?.(".timeline-heading", {
          y: -50,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: pinSection,
            start: "top 80%",
          },
        });

        // progress line animation
        gsap.to?.(progressLine, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: pinSection,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });

        // timeline items animation
        const rawItems = gsap.utils.toArray(".timeline-item");
        (rawItems as unknown[]).forEach((r) => {
          const item = r as HTMLElement;
          const itemContent = item.querySelector(".timeline-content");
          const itemIcon = item.querySelector(".timeline-icon");
          const itemImage = item.querySelector("img");

          gsap.set?.([itemContent, itemIcon, itemImage], {
            autoAlpha: 0,
            y: 50,
            scale: 0.8,
          });

          gsap.to?.(itemContent, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });

          gsap.to?.(itemIcon, {
            scale: 1,
            autoAlpha: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });

          if (itemImage) {
            gsap.to?.(itemImage, {
              scale: 1,
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      },
      sectionRef // scoping
    );

    // cleanup: revert context (this uses the captured ctx)
    return () => {
      try {
        ctx.revert();
      } catch {
        /* ignore cleanup errors */
      }
    };
  }, [scriptsLoaded]); // sectionRef is stable & used only via captured value

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10">
        <h2 className="timeline-heading text-4xl sm:text-5xl font-bold mb-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Our Journey
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Static Background Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-gray-800 -translate-x-1/2"></div>

          {/* Progress Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 -translate-x-1/2">
            <div
              className="timeline-line-progress w-full bg-gradient-to-b from-cyan-400 to-blue-500"
              style={{ height: "0%" }}
            ></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-24">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
