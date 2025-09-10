"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { ReactNode } from "react";

interface HomeScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
}

export default function HomeScrollReveal({
  children,
  className = "",
  y = 80,
  duration = 1,
  delay = 0,
  once = false,
}: HomeScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 0.5,
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
        },
      }
    );
  }, [y, duration, delay, once]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
