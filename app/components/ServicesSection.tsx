'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "./data/Service_data";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // --- Heading fade-in ---
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // --- Cards fade-in on scroll ---
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 70,
          scale: 0.95,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // --- Hover scale animation ---
        const onEnter = () =>
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.2,
            ease: "power3.out",
            boxShadow: "0 12px 25px rgba(0, 0, 0, 0.15)",
          });

        const onLeave = () =>
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.inOut",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          });

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --- Cursor glow effect handlers ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--light-opacity", "1");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = e.currentTarget;
    el.style.setProperty("--light-opacity", "0");
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-900 text-white py-20 sm:py-32 overflow-hidden"
      id="services"
    >
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
              className={`service-card relative bg-gradient-to-br ${service.gradient} rounded-2xl p-8 shadow-2xl border ${service.border} flex flex-col items-center text-center backdrop-blur-lg transition-transform duration-300`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                position: "relative",
                overflow: "hidden",
                "--light-opacity": "0",
                "--mx": "50%",
                "--my": "50%",
              } as React.CSSProperties}
            >
              {/* Glow Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  pointerEvents: "none",
                  background: `radial-gradient(600px circle at var(--mx) var(--my),
                    rgba(255,255,255,0.12),
                    rgba(255,255,255,0.04) 30%,
                    transparent 60%)`,
                  opacity: "var(--light-opacity)",
                  transition: "opacity 0.25s ease",
                  mixBlendMode: "overlay",
                }}
              />

              {service.icon}
              <h3 className="text-xl font-semibold mb-3 text-white">
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
