"use client";

import React, { useEffect, useRef } from "react";

export default function ServicesExtras() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const node = sectionRef.current;
    if (!node) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const connection = (navigator as any).connection;
    const saveData =
      connection &&
      (connection.saveData || /2g/.test(connection.effectiveType || ""));

    if (prefersReduced || saveData) return;

    const rIC =
      (window as any).requestIdleCallback ||
      function (cb: any) {
        return setTimeout(cb, 300);
      };
    const cIC =
      (window as any).cancelIdleCallback ||
      function (id: any) {
        clearTimeout(id);
      };

    let idleId: any = null;
    let io: IntersectionObserver | null = null;
    const gsapContexts: Array<{ revert: () => void }> = [];
    const detailHandlers: Array<{ el: HTMLDetailsElement; handler: EventListener }> =
      [];

    idleId = rIC(async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule;

      const els = node.querySelectorAll(".services-animate") || [];

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const ctx = gsap.context(() => {
              gsap.fromTo(
                ".services-animate.heading",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 2.0, ease: "power3.out" }
              );

              gsap.fromTo(
                ".services-animate.col-left",
                { x: -18, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 2.0,
                  stagger: 0.5,
                  ease: "power3.out",
                }
              );

              gsap.fromTo(
                ".services-animate.col-right",
                { x: 18, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 2,
                  stagger: 0.5,
                  ease: "power3.out",
                }
              );

              gsap.fromTo(
                ".services-animate.list-item",
                { y: 10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.12 }
              );
            }, node);

            if (ctx && typeof ctx.revert === "function") {
              gsapContexts.push(ctx);
            }

            if (io) {
              io.disconnect();
            }
          });
        },
        { threshold: 0.12 }
      );

      if (node && els.length) {
        io.observe(node);
      }

      const details = (node.querySelectorAll("details") || []) as NodeListOf<
        HTMLDetailsElement
      >;

      details.forEach((d) => {
        const content = d.querySelector("p") as HTMLElement | null;
        if (!content) return;
        content.style.overflow = "hidden";
        content.style.height = d.open ? "auto" : "0px";
        content.style.opacity = d.open ? "1" : "0";

        const onToggle = () => {
          const open = d.open;
          try {
            if (open) {
              gsap.fromTo(
                content,
                { height: 0, opacity: 0 },
                {
                  height: "auto",
                  opacity: 1,
                  duration: 0.36,
                  ease: "power2.out",
                }
              );
            } else {
              gsap.to(content, {
                height: 0,
                opacity: 0,
                duration: 0.28,
                ease: "power2.in",
              });
            }
          } catch {
            // guard in case GSAP unloads; ignore
          }
        };

        d.addEventListener("toggle", onToggle);
        detailHandlers.push({ el: d, handler: onToggle });
      });
    });

    return () => {
      cIC(idleId);

      detailHandlers.forEach(({ el, handler }) => {
        el.removeEventListener("toggle", handler);
      });

      try {
        if (io) io.disconnect();
      } catch {
        // ignore
      }

      gsapContexts.forEach((ctx) => {
        try {
          if (typeof ctx.revert === "function") ctx.revert();
        } catch {
          // ignore
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-extras mt-20 max-w-7xl mx-auto px-6"
    >
      {/* ... UI unchanged ... */}
      <div className="bg-white/3 rounded-2xl p-8 sm:p-10 backdrop-blur-sm border border-white/6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="services-animate col-left">
            <h3 className="services-animate heading text-2xl font-semibold text-white">
              How we work
            </h3>
            <p className="mt-4 text-white/75">
              We start with a short discovery phase to align on outcomes, then
              iterate quickly with working software. Our teams combine design,
              engineering, and product thinking so you get a pragmatic,
              production-ready result.
            </p>

            <ol className="mt-6 space-y-4 text-white/70 list-decimal list-inside">
              <li className="services-animate list-item">
                Discovery — align goals, users, and constraints.
              </li>
              <li className="services-animate list-item">
                Prototype — validate ideas with minimal risk.
              </li>
              <li className="services-animate list-item">
                Build & iterate — ship features with automated testing.
              </li>
              <li className="services-animate list-item">
                Operate — monitoring, maintenance, and ongoing improvements.
              </li>
            </ol>
          </div>

          <div className="services-animate col-right">
            <h3 className="services-animate heading text-2xl font-semibold text-white">
              Frequently asked
            </h3>

            <div className="mt-4 space-y-4">
              <details className="bg-white/2 rounded-md p-4">
                <summary className="cursor-pointer font-medium text-white">
                  How long does a typical engagement last?
                </summary>
                <p className="mt-2 text-white/70">
                  Engagements vary — small projects can finish in weeks, while
                  strategic platform work is measured in months. We scope to
                  deliver value early.
                </p>
              </details>

              <details className="bg-white/2 rounded-md p-4">
                <summary className="cursor-pointer font-medium text-white">
                  Do you offer post-launch support?
                </summary>
                <p className="mt-2 text-white/70">
                  Yes — we provide monitoring, patching, and prioritized
                  maintenance plans so your product stays reliable.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
