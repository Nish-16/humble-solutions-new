// TestimonialsSection.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonialsData } from "./data/clients";

// Register the ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Early exit if no data is present
  if (testimonialsData.length === 0) {
    return null;
  }

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current || !leftRef.current) {
      return;
    }

    // We'll create a spacer element that we can remove on cleanup
    let spacerEl: HTMLDivElement | null = null;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
          const sectionEl = sectionRef.current!;
          const trackEl = trackRef.current!;
          const leftEl = leftRef.current!;

          gsap.set(trackEl, { display: "flex" });

          // RESPONSIVE extra space: relative to viewport but with a sensible minimum
          const extraSpace = Math.max(400, Math.round(window.innerWidth * 0.1)); // px
          // create spacer so scrollWidth increases consistently
          spacerEl = document.createElement("div");
          spacerEl.style.width = `${extraSpace}px`;
          spacerEl.style.flex = "0 0 auto";
          // optional: give it an aria-hidden so screen readers ignore it
          spacerEl.setAttribute("aria-hidden", "true");
          trackEl.appendChild(spacerEl);

          // Calculate Dimensions
          const sectionWidth = sectionEl.offsetWidth;
          const leftWidth = leftEl.getBoundingClientRect().width;
          const visibleWidth = Math.max(0, sectionWidth - leftWidth);

          // The distance the track needs to translate (include spacer area)
          const distance = Math.max(0, trackEl.scrollWidth - visibleWidth);

          // If content is smaller than the visible area, skip horizontal scroll
          if (distance <= 0) {
            // Heading animation only
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

          // Main timeline — pin and horizontal translate for the computed distance
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionEl,
              start: "top top",
              end: () => `+=${distance}`,
              scrub: 0.8,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            },
          });

          // Heading animation (run immediately on mount so it's not tied to scrub)
          const headingChars = headingRef.current
            ? gsap.utils.toArray(headingRef.current.children)
            : [];
          gsap.fromTo(
            headingChars,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.02, duration: 0.6, ease: "power3.out" }
          );

          // Track translation animation across the full distance (includes spacer)
          tl.to(trackEl, { x: -distance, duration: 1, ease: "none" }, 0.1);

          // Individual card scale animation while scrolling
          const cards = gsap.utils.toArray(trackEl.children) as HTMLElement[];

          cards.forEach((card) => {
            ScrollTrigger.create({
              trigger: card,
              start: "left center",
              end: "right center",
              containerAnimation: tl,
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                let scaleFactor = 1;
                if (progress > 0.1 && progress < 0.9) {
                  const normalizedProgress = (progress - 0.1) / 0.8;
                  scaleFactor = 1 + 0.03 * Math.sin(normalizedProgress * Math.PI);
                }
                gsap.to(card, { scale: scaleFactor, duration: 0.15 });
              },
            });
          });

          gsap.set(leftEl, { y: 0 });
        },

        // Mobile / small screens keep the existing heading animation (no horizontal pin)
        "all": function () {
          const headingChars = headingRef.current
            ? gsap.utils.toArray(headingRef.current.children)
            : [];
          gsap.fromTo(
            headingChars,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.02, duration: 0.6, ease: "power3.out" }
          );
        },
      });
    }, sectionRef);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      // remove spacer if it exists
      if (spacerEl && spacerEl.parentNode) {
        spacerEl.parentNode.removeChild(spacerEl);
        spacerEl = null;
      }
      ctx.revert();
    };
  }, []); // run once on mount

  return (
    <section
      ref={sectionRef}
      className="bg-gray-900 text-white py-26 sm:py-32 overflow-hidden"
      aria-label="Testimonials horizontal scroll with left text"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Sticky Content */}
          <div ref={leftRef} className="relative md:pr-8">
            <div className="md:sticky md:top-24">
              <h2
                ref={headingRef}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                aria-label="What Our Clients Say"
              >
                {"What Our Clients Say".split("").map((char, index) => (
                  <span
                    key={index}
                    className="inline-block"
                    style={{ whiteSpace: "pre" }}
                  >
                    {char}
                  </span>
                ))}
              </h2>

              <p className="text-gray-300 mb-6 leading-relaxed">
                We partner with ambitious companies to build beautiful,
                dependable products. Here are a few words from the people we
                &apos;ve worked with.
              </p>

              <a
                href="#contact"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg shadow"
              >
                Work with us
              </a>
            </div>
          </div>

          {/* Right Scrollable Content */}
          <div className="w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-8 items-stretch will-change-transform"
              style={{ paddingBottom: 12 }}
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
                    <span className="block text-blue-400 font-bold text-xl">
                      {testimonial.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {testimonial.title}
                    </span>
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
