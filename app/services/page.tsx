"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ServicesHero from "./ServicesHero";
import ServicesList from "./ServicesList";
import ServicesExtras from "./ServicesExtras";
import content from "./content";
import SmoothScroll from "../journey/SmoothScroll";

// Dynamically import components that rely on browser-only APIs
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const FooterSection = dynamic(() => import("../components/FooterSection"), {
  ssr: false,
});
const ServicesBackground = dynamic(() => import("./ServicesBackground"), {
  ssr: false,
});

const { hero, services, cta } = content;

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  // The useEffect for GSAP animations remains unchanged as it is already well-implemented.
  useEffect(() => {
    let ctx: any = null;
    let gsap: any = null;
    let ScrollTrigger: any = null;
    let idleId: any = null;

    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const connection = (navigator as any).connection;
    const saveData =
      connection &&
      (connection.saveData || /2g/.test(connection.effectiveType || ""));

    if (prefersReduced || saveData) {
      return;
    }

    const rIC =
      (window as any).requestIdleCallback ||
      function (cb: any) {
        return setTimeout(cb, 300);
      };
    const cIC =
      (window as any).cancelIdleCallback ||
      function (id: any) {
        clearTimeout(id);
      };

    idleId = rIC(async () => {
      gsap = (await import("gsap")).default;
      try {
        const mod = await import("gsap/dist/ScrollTrigger");
        ScrollTrigger = mod.ScrollTrigger || (mod as any).default;
        gsap.registerPlugin(ScrollTrigger);
      } catch (e) {}

      ctx = gsap.context(() => {
        if (heroRef.current) {
          gsap.from(heroRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        }
        if (cardsRef.current.length) {
          gsap.from(cardsRef.current, {
            y: 18,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: ScrollTrigger
              ? {
                  trigger: cardsRef.current[0],
                  start: "top 80%",
                }
              : undefined,
          });
        }
        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            scale: 0.985,
            opacity: 0,
            duration: 0.6,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: ScrollTrigger
              ? { trigger: ctaRef.current, start: "top 90%" }
              : undefined,
          });
        }
      });
    });

    return () => {
      cIC(idleId);
      if (ctx) ctx.revert();
      if (ScrollTrigger) {
        try {
          ScrollTrigger.kill();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <>
    <SmoothScroll/>
      <Navbar />
      <div className="min-h-screen relative bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] to-black">
        <ServicesBackground />

        <main className="relative z-10 max-w-7xl mx-auto py-20 px-6">
          <ServicesHero
            ref={heroRef}
            title={hero.title}
            subtitle={hero.subtitle}
          />

          <ServicesList
            services={services}
            cardsRef={cardsRef}
            ctaRef={ctaRef}
            cta={cta}
          />

          <ServicesExtras />
        </main>

        <FooterSection />
      </div>
    </>
  );
}
