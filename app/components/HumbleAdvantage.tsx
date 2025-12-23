"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverCard from "./HoverCard";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HumbleAdvantage = () => {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 🔑 GSAP CONTEXT (important for Next.js routing)
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    // 🔥 CLEANUP ON ROUTE CHANGE / UNMOUNT
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="w-full py-30 px-6 text-white bg-cover relative z-10 bg-center"
      style={{ backgroundImage: "url('/Home/humble-bg.png')" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <div ref={headingRef}>
          <h3 className="font-avenir-regular text-lg font-medium mb-5">
            Three Pillars That Propel Your Project From Vision To Victory.
          </h3>
          <h2 className="text-4xl md:text-5xl font-semibold">
            The{" "}
            <span className="font-avenir-regular text-blue-400">Humble</span>{" "}
            Advantage
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="mt-15 flex flex-wrap justify-center gap-8 mb-10"
        >
          <HoverCard
            title="Specialists in Custom Applications"
            description="Our team excels in building tailor-made applications that perfectly fit your business needs."
          />
          <HoverCard
            title="Skilled in Embedded Technology Integration"
            description="We integrate the latest embedded technologies seamlessly into your applications for maximum efficiency."
          />
          <HoverCard
            title="Full Cycle Project Support"
            description="From ideation to deployment, we provide end-to-end support for your projects."
          />
          <HoverCard
            title="Client-Centric & Transparent"
            description="We prioritize clear communication and transparency, keeping you in the loop at every stage."
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/journey"
            className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full text-white font-medium shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Explore Our Journey
            <span className="ml-3 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HumbleAdvantage;
