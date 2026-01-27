"use client";

import React, { useEffect, useRef } from "react";
import GalaxyBackground from "./GalaxyBackground";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "./data/Service_data";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ---------------- Heading ---------------- */
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }

      /* ---------------- Cards ---------------- */
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      cards.forEach((card) => {
        // Scroll reveal
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          }
        );

        // Hover animations (conflict-free)
        const scaleTo = gsap.quickTo(card, "scale", {
          duration: 0.25,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(card, "y", {
          duration: 0.25,
          ease: "power3.out",
        });

        const onEnter = () => {
          scaleTo(1.05);
          yTo(-10);
        };

        const onLeave = () => {
          scaleTo(1);
          yTo(0);
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        // Cleanup (VERY important in Next.js)
        return () => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---------------- Cursor Glow ---------------- */
  const rafRef = useRef<number | null>(null);
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();

      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      el.style.setProperty("--light-opacity", "1");

      rafRef.current = null;
    });
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const el = e.currentTarget;
    el.style.setProperty("--light-opacity", "0");
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-gray-900 text-white py-20 sm:py-32 overflow-hidden"
    >
      <GalaxyBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-20 text-center"
        >
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.title}
              className={`service-card relative bg-gradient-to-br ${service.gradient}
                rounded-2xl p-8 shadow-2xl border ${service.border}
                flex flex-col items-center text-center backdrop-blur-lg
                will-change-transform`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={
                {
                  "--mx": "50%",
                  "--my": "50%",
                  "--light-opacity": "0",
                } as React.CSSProperties
              }
            >
              {/* Glow Overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(
                    600px circle at var(--mx) var(--my),
                    rgba(255,255,255,0.12),
                    rgba(255,255,255,0.04) 30%,
                    transparent 60%
                  )`,
                  opacity: "var(--light-opacity)",
                  transition: "opacity 0.25s ease",
                  mixBlendMode: "overlay",
                }}
              />

              {service.icon}
              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
