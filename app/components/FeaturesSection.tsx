'use client'; // This directive is essential for components using hooks in Next.js App Router

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- TypeScript Interface for our data ---
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data for the features ---
const featuresData: Feature[] = [
  {
    title: "Innovative Solutions",
    description: "We leverage the latest tech to deliver creative, effective results.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-blue-400">
        <path d="M7 12.5l3 3 7-7" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0 0 12 22z" />
      </svg>
    ),
  },
  {
    title: "Expert Team",
    description: "Our passionate professionals are experts in AI, cloud, and web.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-blue-400">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
  },
  {
    title: "Client Focused",
    description: "We listen, adapt, and deliver solutions tailored to your needs.",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-blue-400">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    ),
  },
];

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!headingRef.current || !gridRef.current) return;

      // --- HEADING ANIMATION ---
      const headingChars = Array.from(headingRef.current.children);
      gsap.fromTo(
        headingChars,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // --- INDIVIDUAL CARD ANIMATIONS ---
      const cards = gsap.utils.toArray(gridRef.current.children);
      cards.forEach((card) => {
        gsap.fromTo(
          card as HTMLElement,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-900 text-white py-20 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-center"
          aria-label="Why Choose Us?"
        >
          {'Why Choose Us?'.split('').map((char, index) => (
            <span key={index} className="inline-block" style={{ whiteSpace: 'pre' }}>
              {char}
            </span>
          ))}
        </h2>
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {featuresData.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-800/50 rounded-2xl p-8 shadow-2xl border border-blue-500/10 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/20"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
