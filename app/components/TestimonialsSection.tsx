// TestimonialsSection.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { testimonialsData } from "./data/clients";

// NOTE: We no longer need ScrollTrigger for horizontal pin/translate behaviour.
// If you still use ScrollTrigger elsewhere, keep registration; otherwise you can remove it.
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const hasData = testimonialsData.length > 0;

  useLayoutEffect(() => {
    if (!hasData) return;
    if (!sectionRef.current || !trackRef.current || !leftRef.current) return;

    const ctx = gsap.context(() => {
      // Heading entrance (staggered chars)
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
        }
      );

      // Cards fade/slide in (no pin / horizontal driving)
      const cards = gsap.utils.toArray(trackRef.current!.children) as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: Math.min(0.15 * i, 0.6),
            ease: "power3.out",
          }
        );
      });

      // Keep left panel stable
      gsap.set(leftRef.current, { y: 0 });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [hasData]);

  if (!hasData) return null;

  // Wheel handler: when user scrolls vertically while hovering the track,
  // convert that to horizontal scroll. This is optional but provides
  // a UX where mouse-wheel/trackpad vertical scroll will pan horizontally
  // only when cursor is over the track.
  const onTrackWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const el = trackRef.current;
    if (!el) return;

    // If user holds shift, allow native horizontal behavior; if horizontal delta already present, do nothing.
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (e.shiftKey || isHorizontalScroll) {
      return; // fall back to native handling
    }

    // Scroll horizontally by the vertical delta
    el.scrollLeft += e.deltaY;
  };

  // Keyboard support for left/right arrows when track has focus
  const onTrackKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.round(window.innerWidth * 0.4); // smaller chunk for more natural feel
    if (e.key === "ArrowRight") {
      e.preventDefault();
      el.scrollBy({ left: step, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      el.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gray-900 text-white py-26 sm:py-20 overflow-hidden"
      aria-label="Testimonials horizontal scroll with left text"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* LEFT PANEL */}
          <div ref={leftRef} className="relative md:pr-8">
            <div className="md:sticky md:top-24">
              <h2
                ref={headingRef}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                aria-label="What Our Clients Say"
              >
                {"What Our Clients Say".split("").map((char, i) => (
                  <span key={i} className="inline-block" style={{ whiteSpace: "pre" }}>
                    {char}
                  </span>
                ))}
              </h2>

              <p className="text-gray-300 mb-6 leading-relaxed">
                We partner with ambitious companies to build beautiful, dependable products.
                Here are a few words from the people we&apos;ve worked with.
              </p>

              <a
                href="#contact"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg shadow"
              >
                Work with us
              </a>
            </div>
          </div>

          {/* RIGHT TRACK */}
          <div className="w-full">
            <div
              ref={trackRef}
              className="flex gap-8 items-stretch will-change-transform overflow-x-auto touch-pan-x px-4 py-4 scrollbar-hide"
              style={{ paddingBottom: 12 /* removed scrollSnapType to disable snapping */ }}
              onWheel={onTrackWheel}
              onKeyDown={onTrackKeyDown}
              tabIndex={0} // make focusable for arrow-key support
              role="list"
              aria-label="Client testimonials carousel"
            >
              {testimonialsData.map((testimonial, idx) => (
                <article
                  role="listitem"
                  key={`${testimonial.name}-${idx}`}
                  className="min-w-[85vw] md:min-w-[420px] lg:min-w-[480px] bg-gray-800/50 rounded-2xl p-8 shadow-2xl border border-blue-500/10 flex flex-col items-center text-center"
                >
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mb-2 border-2 border-blue-400 object-cover shadow-lg"
                  />

                  <p className="text-gray-300 text-lg italic mb-6 flex-grow">
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

            {/* Optional hint for users (small, unobtrusive) */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
