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

type MaybeDivArray = Array<HTMLDivElement | null>;

// Minimal shape for the small subset of GSAP we use
type GsapContextReturn = { revert: () => void };
type GsapShape = {
  registerPlugin?: (...plugins: unknown[]) => void;
  context: (fn: () => void, scope?: unknown) => GsapContextReturn;
  from?: (target: unknown, vars: unknown) => unknown;
};

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<MaybeDivArray>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  // The useEffect for GSAP animations remains unchanged in behavior.
  useEffect(() => {
    let ctx: GsapContextReturn | null = null;
    let gsap: GsapShape | null = null;
    let ScrollTrigger: unknown | null = null;
    let idleId: number | null = null;

    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const connection = (navigator as unknown as { connection?: unknown })
      .connection as
      | Partial<{ saveData?: boolean; effectiveType?: string }>
      | undefined;

    const saveData =
      connection &&
      (connection.saveData === true ||
        (/2g/.test((connection.effectiveType || "") as string) ?? false));

    if (prefersReduced || saveData) {
      return;
    }

    // requestIdleCallback / cancelIdleCallback fallbacks
    const rIC: (cb: () => void) => number =
      (
        window as unknown as {
          requestIdleCallback?: (cb: () => void) => number;
        }
      ).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));

    const cIC = (id?: number | null) => {
      const raw = (
        window as unknown as {
          cancelIdleCallback?: (id?: number) => void;
        }
      ).cancelIdleCallback;

      if (raw) {
        raw(id === null ? undefined : (id as number | undefined));
        return;
      }

      if (typeof id === "number") clearTimeout(id);
    };

    idleId = rIC(async () => {
      const gsapMod = await import("gsap");
      gsap = (gsapMod as unknown as { default?: unknown }).default
        ? (gsapMod as unknown as { default?: GsapShape }).default!
        : (gsapMod as unknown as unknown as GsapShape);

      try {
        const mod = await import("gsap/dist/ScrollTrigger");
        ScrollTrigger =
          (mod as unknown as { ScrollTrigger?: unknown }).ScrollTrigger ??
          (mod as unknown as { default?: unknown }).default ??
          null;

        if (gsap && ScrollTrigger) {
          try {
            gsap.registerPlugin?.(ScrollTrigger);
          } catch {
            // ignore registration errors
          }
        }
      } catch {
        // ignore load failure of ScrollTrigger
      }

      if (!gsap) return;

      ctx = gsap.context(() => {
        if (heroRef.current) {
          gsap?.from?.(heroRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        }

        if (cardsRef.current && cardsRef.current.length > 0) {
          gsap?.from?.(cardsRef.current, {
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
          gsap?.from?.(ctaRef.current, {
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
      if (ctx) {
        try {
          ctx.revert();
        } catch {
          /* ignore cleanup errors */
        }
      }

      try {
        const st: unknown = ScrollTrigger;
        if (st && typeof (st as any).kill === "function") (st as any).kill();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <>
      <SmoothScroll />
      <Navbar />
      <div className="min-h-screen relative bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] to-black">
        <ServicesBackground />

        <main className="relative z-10 max-w-7xl mx-auto py-20 px-6">
          <ServicesHero ref={heroRef} title={hero.title} subtitle={hero.subtitle} />

          <ServicesList services={services} cardsRef={cardsRef} ctaRef={ctaRef} cta={cta} />

          <ServicesExtras />
        </main>

        <FooterSection />
      </div>
    </>
  );
}
