'use client';

import React, { useState, useEffect, useRef, memo } from "react";
import { timelineData, TimelineItemData } from "./data/Timeline_data";

// --- Custom Hook to Load External Scripts ---
const useScripts = (urls: string[]): boolean => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadScripts = async () => {
            const promises = urls.map(url => {
                return new Promise((resolve, reject) => {
                    if (document.querySelector(`script[src="${url}"]`)) return resolve(true);
                    const script = document.createElement('script');
                    script.src = url;
                    script.onload = () => resolve(true);
                    script.onerror = () => reject(new Error(`Script load error for ${url}`));
                    document.body.appendChild(script);
                });
            });
            try {
                await Promise.all(promises);
                setLoaded(true);
            } catch (error) {
                console.error("Failed to load scripts:", error);
            }
        };
        loadScripts();
    }, []);

    return loaded;
};

// --- Memoized Timeline Item Component ---
interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = memo(({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <div className="timeline-item relative pl-12 sm:pl-0 sm:mb-24 last:mb-0">
            <div className={`flex flex-col sm:flex-row ${isEven ? "" : "sm:flex-row-reverse"} items-center gap-8`}>

                {/* Image on opposite side */}
                {item.image && (
                    <div className="sm:w-1/2 flex justify-center items-center">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                )}

                {/* Spacer if no image */}
                {!item.image && <div className="sm:w-1/2"></div>}

                {/* Timeline Icon */}
                <div className="absolute left-4 sm:left-1/2 top-1 -translate-x-1/2 z-10">
                    <div className="timeline-icon w-16 h-16 rounded-full bg-gray-900 border-2 border-cyan-400 flex items-center justify-center shadow-lg">
                        <div className="text-4xl">{item.icon}</div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="timeline-content w-full sm:w-1/2 mt-16 sm:mt-0">
                    <div className="bg-gray-900/60 backdrop-blur-md p-8 rounded-xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-cyan-500/20 flex flex-col items-center">
                        <span className="text-base font-semibold text-cyan-400 tracking-wider mb-2">{item.year}</span>
                        <div className="mb-4">
                            <span className="inline-block text-6xl md:text-7xl lg:text-8xl drop-shadow-lg">{item.cardIcon}</span>
                        </div>
                        <h3 className="text-2xl font-bold mt-2 mb-3 text-white text-center">{item.title}</h3>
                        <p className="text-gray-300 text-base leading-relaxed mb-3 text-center">{item.description}</p>
                        <p className="text-gray-400 text-sm leading-relaxed text-center">{item.details}</p>
                    </div>
                </div>

            </div>
        </div>
    );
});

// --- Main Timeline Section Component ---
const TimelineSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scriptsLoaded = useScripts([
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
    ]);

    useEffect(() => {
        if (!scriptsLoaded || !sectionRef.current) return;

        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;
        if (!gsap || !ScrollTrigger) return;

        gsap.registerPlugin(ScrollTrigger);

        const pinSection = sectionRef.current;
        const progressLine = pinSection.querySelector(".timeline-line-progress");

        const ctx = gsap.context(() => {
            gsap.from(".timeline-heading", {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: pinSection,
                    start: "top 80%",
                },
            });

            gsap.to(progressLine, {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: pinSection,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                },
            });

            const timelineItems = gsap.utils.toArray(".timeline-item") as HTMLElement[];
            timelineItems.forEach((item) => {
                const itemContent = item.querySelector(".timeline-content");
                const itemIcon = item.querySelector(".timeline-icon");
                const itemImage = item.querySelector("img");

                gsap.set([itemContent, itemIcon, itemImage], { autoAlpha: 0, y: 50, scale: 0.8 });

                gsap.to(itemContent, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                });

                gsap.to(itemIcon, {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });

                if (itemImage) {
                    gsap.to(itemImage, {
                        scale: 1,
                        autoAlpha: 1,
                        y: 0,
                        duration: 1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [scriptsLoaded]);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="relative z-10">
                <h2 className="timeline-heading text-4xl sm:text-5xl font-bold mb-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    Our Journey
                </h2>

                <div className="relative max-w-6xl mx-auto">
                    {/* Static Background Line */}
                    <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-gray-800 -translate-x-1/2"></div>

                    {/* Progress Line */}
                    <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 -translate-x-1/2">
                        <div
                            className="timeline-line-progress w-full bg-gradient-to-b from-cyan-400 to-blue-500"
                            style={{ height: "0%" }}
                        ></div>
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-24">
                        {timelineData.map((item, index) => (
                            <TimelineItem key={item.title} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
