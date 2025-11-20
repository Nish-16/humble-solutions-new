// TestimonialsSection.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonialsData } from "./data/clients";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !leftRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Desktop & tablet behavior: two-column layout with pinned horizontal scroll
        "(min-width: 768px)": function () {
          const sectionEl = sectionRef.current!;
          const trackEl = trackRef.current!;
          const leftEl = leftRef.current!;

          // compute visible width available to the horizontal track:
          // total section width minus left column width (sticky content)
          const sectionWidth = sectionEl.offsetWidth;
          const leftWidth = leftEl.getBoundingClientRect().width;
          const visibleWidth = Math.max(0, sectionWidth - leftWidth);

          // compute how much we need to move the track so all cards become visible
          const distance = Math.max(0, trackEl.scrollWidth - visibleWidth);

          // If there's nothing to scroll, don't pin/animate (avoids weird pin behavior)
          if (distance <= 0) {
            // still run heading reveal
            const headingChars = headingRef.current
              ? gsap.utils.toArray(headingRef.current.children)
              : [];
            gsap.fromTo(
              headingChars,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.02, duration: 0.6, ease: "power3.out" }
            );
            return;
          }

          // create the main timeline (we'll pass this timeline into containerAnimation for card triggers)
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionEl,
              start: "top top",
              // pin for exactly the amount needed to move the track by `distance`
              end: () => `+=${distance}`,
              scrub: 0.8,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            },
          });

          // Reveal heading characters (runs at start)
          const headingChars = headingRef.current
            ? gsap.utils.toArray(headingRef.current.children)
            : [];
          tl.fromTo(
            headingChars,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.02, duration: 0.6, ease: "power3.out" },
            0
          );

          // Move the track left by `distance`
          tl.to(trackEl, { x: -distance, duration: 1, ease: "none" }, 0.1);

          // Per-card subtle scale effect using ScrollTrigger bound to the container animation (tl).
          const cards = gsap.utils.toArray(trackEl.children) as HTMLElement[];

          cards.forEach((card) => {
            ScrollTrigger.create({
              trigger: card,
              start: "left center",
              end: "right center",
              containerAnimation: tl,
              scrub: true,
              onEnter: () => gsap.to(card, { scale: 1.03, duration: 0.3 }),
              onLeaveBack: () => gsap.to(card, { scale: 1, duration: 0.3 }),
            });
          });

          // Optional: keep left column sticky while pinned (we can animate it slightly if we want)
          gsap.set(leftEl, { y: 0 });
        },

        // Mobile & small screens: stacked layout, simple heading reveal
        "all": function () {
          const headingChars = headingRef.current
            ? gsap.utils.toArray(headingRef.current.children)
            : [];

          gsap.fromTo(
            headingChars,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.02,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        },
      });
    }, sectionRef);

    // refresh ScrollTrigger on resize so `end()` recomputes accurately
    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      // revert context and kill any ScrollTriggers created
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gray-900 text-white py-24 sm:py-32 overflow-hidden"
      aria-label="Testimonials horizontal scroll with left text"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Layout: two columns on md+, stacked on small screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* LEFT: Sticky text block */}
          <div
            ref={leftRef}
            className="relative md:pr-8"
            // make content stick within the pinned section on desktop
          >
            <div className="md:sticky md:top-24">
              <h2
                ref={headingRef}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                aria-label="What Our Clients Say"
              >
                {"What Our Clients Say".split("").map((char, index) => (
                  <span key={index} className="inline-block" style={{ whiteSpace: "pre" }}>
                    {char}
                  </span>
                ))}
              </h2>

              <p className="text-gray-300 mb-6 leading-relaxed">
                We partner with ambitious companies to build beautiful, dependable products.
                Here are a few words from the people we've worked with.
              </p>

              <a
                href="#contact"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg shadow"
              >
                Work with us
              </a>
            </div>
          </div>

          {/* RIGHT: Horizontal track */}
          <div className="w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-8 items-stretch will-change-transform"
              style={{ paddingBottom: 12 }} // small space for shadow
            >
              {testimonialsData.map((testimonial, idx) => (
                <article
                  key={`${testimonial.name}-${idx}`}
                  className="min-w-[85vw] md:min-w-[420px] lg:min-w-[480px] bg-gray-800/50 rounded-2xl p-8 shadow-2xl border border-blue-500/10 flex flex-col items-center text-center transform transition-all duration-300"
                >
                  <img
                    src={testimonial.img}
                    alt={`Avatar for ${testimonial.name}`}
                    className="w-24 h-24 rounded-full mb-6 border-4 border-blue-400 object-cover shadow-lg"
                  />
                  <p className="text-gray-300 text-lg italic mb-6 leading-relaxed flex-grow">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-auto">
                    <span className="block text-blue-400 font-bold text-xl">{testimonial.name}</span>
                    <span className="text-gray-500 text-sm">{testimonial.title}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
