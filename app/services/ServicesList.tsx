"use client";
import React, { useRef } from "react";
import ServiceCard from "./ServiceCard";

type Service = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

type Props = {
  services: Service[];
  cardsRef?: React.MutableRefObject<Array<HTMLDivElement | null>>;
  ctaRef?: React.RefObject<HTMLDivElement | null>;
  cta?: {
    paragraph?: string;
    primaryText?: string;
    primaryHref?: string;
    secondaryText?: string;
    secondaryHref?: string;
  };
};

export default function ServicesList({
  services,
  cardsRef,
  ctaRef,
  cta,
}: Props) {
  const localRefs = cardsRef ?? useRef<Array<HTMLDivElement | null>>([]);

  const setRef = (el: HTMLDivElement | null, i: number) => {
    localRefs.current[i] = el;
  };

  return (
    // IMPROVEMENT: Removed background from the list container to let the page background show through.
    // The cards themselves will now have individual styling.
    <section>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((svc, i) => (
            <ServiceCard key={svc.id} service={svc} index={i} setRef={setRef} />
          ))}
        </div>

        <div ref={ctaRef} className="mt-16 text-center">
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            {cta?.paragraph ?? ""}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href={cta?.primaryHref ?? "/contact"}
              // IMPROVEMENT: Enhanced button styling with a subtle glow on hover
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-500/30 transition-all duration-300"
            >
              {cta?.primaryText ?? "Get a quote"}
            </a>
            <a
              href={cta?.secondaryHref ?? "/portfolio"}
              // IMPROVEMENT: Better hover state for the secondary link
              className="text-slate-400 hover:text-cyan-300 underline-offset-2 hover:underline"
            >
              {cta?.secondaryText ?? "See examples"} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}