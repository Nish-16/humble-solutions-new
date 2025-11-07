"use client"; // This directive is essential for components using hooks in Next.js App Router

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the GSAP plugin. In a real Next.js app, this might be done once in a layout file.
gsap.registerPlugin(ScrollTrigger);

// --- TypeScript Interface for our data ---
interface Testimonial {
  quote: string;
  name: string;
  title: string;
  img: string;
}

// --- Data for the testimonials ---
const testimonialsData: Testimonial[] = [
  {
    quote:
      "Humble Solutions completely transformed our digital presence. Their innovative approach and deep technical expertise are second to none. We're seeing results we never thought possible.",
    name: "Sarah Lynn",
    title: "CEO of Innovate Inc.",
    img: "https://placehold.co/100x100/4299e1/FFFFFF/png?text=SL",
  },
  {
    quote:
      "Working with their team was a dream. They are incredibly responsive, bursting with creativity, and they genuinely understood our vision and needs from day one.",
    name: "Michael Chen",
    title: "Founder of Creative Co.",
    img: "https://placehold.co/100x100/38b2ac/FFFFFF/png?text=MC",
  },
  {
    quote:
      "The level of professionalism and dedication is outstanding. They delivered a robust solution on time and on budget, exceeding all our expectations.",
    name: "David Rodriguez",
    title: "CTO at TechForward",
    img: "https://placehold.co/100x100/9f7aea/FFFFFF/png?text=DR",
  },
  {
    quote:
      "Their data-driven strategies provided us with crucial insights that have directly impacted our bottom line. An invaluable partner for any growing business.",
    name: "Emily Carter",
    title: "Marketing Director, Growth Solutions",
    img: "https://placehold.co/100x100/ed8936/FFFFFF/png?text=EC",
  },
];

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // A gsap.context() lets us easily clean up our animations when the component unmounts
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Animation starts when 70% of the section is visible
          end: "bottom 40%",
          toggleActions: "play reverse play reverse", // Play on enter, reverse on exit
        },
      });

      // Animate heading characters
      const headingChars = headingRef.current
        ? headingRef.current.children
        : [];
      tl.fromTo(
        headingChars,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.8, ease: "power3.out" }
      );

      // Animate testimonial cards with a stagger effect
      const cards = gridRef.current ? gridRef.current.children : [];
      tl.fromTo(
        cards,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 1,
          ease: "expo.out",
        },
        "-=1" // Start this animation 0.5s before the previous one ends
      );
    }, sectionRef);

    // Cleanup function to revert all animations within the context
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gray-900 text-white py-20 sm:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-center"
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

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-gray-800/50 rounded-2xl p-8 shadow-2xl border border-blue-500/10 flex flex-col items-center text-center transform hover:scale-105 hover:shadow-blue-500/20 transition-all duration-300"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
