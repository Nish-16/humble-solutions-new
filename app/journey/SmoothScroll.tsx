"use client";

import React, { PropsWithChildren, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * SmoothScroll wrapper using Lenis.
 * - Initializes Lenis on mount and starts the RAF loop
 * - Integrates with GSAP ScrollTrigger if available
 *
 * Notes:
 * - Install Lenis with: `npm i @studio-freight/lenis` or `yarn add @studio-freight/lenis`
 */
const SmoothScroll: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => {
    let rafId: number | null = null;
    let lenis: any = null;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        lerp: 0.08,
      });
    } catch (err) {
      // If Lenis isn't installed or fails, don't break the app
      // keep the warning so we have visibility in dev
      // eslint-disable-next-line no-console
      console.warn("Lenis init failed:", err);
      return;
    }

    const raf = (time: number) => {
      if (lenis && typeof lenis.raf === "function") lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Intercept internal anchor clicks and use Lenis for smooth scrolling
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor =
        target.closest && (target.closest('a[href^="#"]') as HTMLAnchorElement | null);
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.replace(/^#/, "");
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      try {
        const scroller = document.scrollingElement || document.documentElement;
        const current = (scroller && (scroller as Element & { scrollTop?: number }).scrollTop) || window.scrollY || 0;
        const targetY = el.getBoundingClientRect().top + current;
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(targetY);
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      } catch (_err) {
        // fallback: ignore errors during scroll-to calculation
      }
    };
    document.addEventListener("click", onClick);

    // Integrate with GSAP ScrollTrigger if available
    try {
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (ScrollTrigger && lenis) {
        const scroller = document.scrollingElement || document.documentElement;

        ScrollTrigger.scrollerProxy(scroller, {
          scrollTop(value: number) {
            if (!lenis) return 0;
            if (arguments.length) {
              lenis.scrollTo(value);
            }
            // return current position
            // prefer lenis's reported value if present
            return (lenis && (lenis.scroll || scroller.scrollTop)) || 0;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
        });

        // Update ScrollTrigger on Lenis scroll events
        lenis.on("scroll", () => {
          try {
            ScrollTrigger.update();
          } catch (_e) {
            // ignore update errors
          }
        });

        // Force a refresh so ScrollTrigger measures with the new proxy
        requestAnimationFrame(() => {
          try {
            ScrollTrigger.refresh();
          } catch (_e) {
            // ignore
          }
        });
      }
    } catch (_e) {
      // ignore integration errors
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      try {
        if (lenis && typeof lenis.destroy === "function") lenis.destroy();
      } catch (_e) {
        // ignore
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
