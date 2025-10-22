"use client";
import React from "react";

type Props = {
  title?: string;
  subtitle?: React.ReactNode;
};

const ServicesHero = React.forwardRef<HTMLElement, Props>(function ServicesHero(
  { title = "Modern engineering. Impactful results.", subtitle },
  ref
) {
  return (
    <section
      ref={ref as React.LegacyRef<HTMLElement>}
      className="text-center mb-16" // Increased bottom margin
      aria-labelledby="services-heading"
    >
      <h1
        id="services-heading"
        // IMPROVEMENT: Updated text gradient for more vibrancy
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-slate-100 to-teal-300"
      >
        {title}
      </h1>

      <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-slate-400">
        {" "}
        {/* IMPROVEMENT: Better contrast color */}
        {subtitle ?? (
          <>
            We build production-grade software, automate workflows, and design
            delightful products that scale. Subtle motion and refined layout
            make the experience feel modern and approachable.
          </>
        )}
      </p>
    </section>
  );
});

export default ServicesHero;