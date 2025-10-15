'use client'; // This directive is essential for components using hooks in Next.js App Router

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from './data/Service_data';

// --- Data for the services ---



const ServicesSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (!sectionRef.current) return;
            
            // --- HEADING ANIMATION ---
             if (headingRef.current) {
                gsap.from(headingRef.current, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

             // --- CARDS ANIMATION + HOVER ---
    const cards = gsap.utils.toArray<HTMLElement>('.service-card');

    cards.forEach((card) => {
      // Scroll animation
      gsap.from(card, {
        opacity: 0,
        y: 70,
        scale: 0.95,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Hover animation
      const onMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          boxShadow: "0 12px 25px rgba(0, 0, 0, 0.15)",
          duration: 0.1,
          ease: "power3.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          duration: 0.1,
          ease: "power3.inOut",
        });
      };

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);
    });
  }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-gray-900 text-white py-20 sm:py-32 overflow-hidden"
            id="services"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
                <h2 
                    ref={headingRef} 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-20 text-center"
                >
                    Our Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {servicesData.map((service) => (
                        <div
                            key={service.title}
                            className={`service-card bg-gradient-to-br ${service.gradient} rounded-2xl p-8 shadow-2xl border ${service.border} flex flex-col items-center text-center backdrop-blur-lg hover:scale-105 transition-transform duration-300 ${service.translation}`}
                        >
                            {service.icon}
                            <h3 className="text-xl font-semibold mb-3 text-white">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
