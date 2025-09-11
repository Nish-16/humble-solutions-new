'use client'; // This directive is essential for components using hooks in Next.js App Router

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Data for the services ---
const servicesData = [
    {
        title: "Custom Software",
        description: "Tailored web, mobile, and cloud solutions to fit your business needs.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-cyan-400">
                <path d="M10 20l4-16m4 4l4 4-4 4M6 8l-4 4 4 4" />
            </svg>
        ),
        gradient: "from-cyan-900/60 via-cyan-700/40 to-blue-900/30",
        border: "border-cyan-400/20",
        translation: "md:-translate-y-6 md:-translate-x-6",
    },
    {
        title: "AI & Automation",
        description: "Leverage AI to streamline operations and boost productivity.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-cyan-400">
                <path d="M12 8V4H8" />
                <rect x="4" y="12" width="8" height="8" rx="2" />
                <path d="M8 12v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2" />
                <path d="m14 10-4 4" />
                <path d="m14 14-4-4" />
            </svg>
        ),
        gradient: "from-blue-900/60 via-blue-700/40 to-cyan-900/30",
        border: "border-blue-400/20",
        translation: "md:translate-y-0 md:translate-x-0",
    },
    {
        title: "Expert Consulting",
        description: "Navigate digital transformation with expert tech strategy.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-cyan-400">
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
            </svg>
        ),
        gradient: "from-indigo-900/60 via-indigo-700/40 to-cyan-900/30",
        border: "border-indigo-400/20",
        translation: "md:translate-y-6 md:translate-x-6",
    },
];


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

            // --- INDIVIDUAL CARD ANIMATIONS ---
            const cards = gsap.utils.toArray('.service-card');
            cards.forEach((card, i) => {
                gsap.from(card as HTMLElement, {
                    opacity: 0,
                    y: 80 + i * 20,
                    x: i === 0 ? -40 : i === 2 ? 40 : 0,
                    scale: 0.95,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card as HTMLElement,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                });
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
                    {servicesData.map((service, i) => (
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
