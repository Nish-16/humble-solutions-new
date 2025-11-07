'use client'; // This directive is essential for components using hooks in Next.js App Router
import Lottie from "lottie-react";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import team from "../../public/team.json";
import idea from "../../public/idea.json";

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
      <Lottie
            animationData={idea}
            loop={true}
            className="w-20 h-30"
            />
    ),
  },
  {
    title: "Expert Team",
    description: "Our passionate professionals are experts in AI, cloud, and web.",
    icon: (
      <Lottie
            animationData={team}
            loop={true}
            className="w-20 h-30"
            />
    ),
  },
  {
    title: "Client Focused",
    description: "We listen, adapt, and deliver solutions tailored to your needs.",
    icon: (
        <img 
      src="/Support.gif" 
      alt="Support Icon" 
      width={100} 
      height={100}
      style={{ objectFit: "contain" }}
    />
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
