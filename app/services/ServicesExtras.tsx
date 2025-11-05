"use client";

import React, { useEffect, useRef } from "react";

export default function ServicesExtras() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const connection = (navigator as any).connection;
    const saveData =
      connection &&
      (connection.saveData || /2g/.test(connection.effectiveType || ""));

    if (prefersReduced || saveData) return; // avoid animations for reduced-motion / save-data

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

    const idleId = rIC(async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule;

      // entrance timeline when section enters viewport
      const els = sectionRef.current
        ? sectionRef.current.querySelectorAll(".services-animate")
        : [];

      // simple intersection trigger
      const io = new IntersectionObserver(
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
            }, sectionRef);

            // once animated, disconnect observer and let GSAP manage cleanup
            io.disconnect();
            // keep ctx? we don't need to revert here because this is entrance only
          });
        },
        { threshold: 0.12 }
      );

      if (sectionRef.current && els.length) {
        io.observe(sectionRef.current);
      }

      // details open/close animations
      const details = sectionRef.current
        ? sectionRef.current.querySelectorAll("details")
        : [];

      const detailToggles: Array<{ el: HTMLElement; anim?: any }> = [];

      details.forEach((d) => {
        const content = d.querySelector("p");
        if (!content) return;
        // ensure content is ready for animated height
        (content as HTMLElement).style.overflow = "hidden";
        (content as HTMLElement).style.height = (d as HTMLDetailsElement).open
          ? "auto"
          : "0px";
        (content as HTMLElement).style.opacity = (d as HTMLDetailsElement).open
          ? "1"
          : "0";

        const onToggle = () => {
          const open = (d as HTMLDetailsElement).open;
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
          } catch (e) {
            // guard in case GSAP unloads; ignore
          }
        };

        d.addEventListener("toggle", onToggle);
        detailToggles.push({ el: d as HTMLElement });
      });

      // cleanup when component unmounts
      const cleanup = () => {
        details.forEach((d) => d.removeEventListener("toggle", () => {}));
        try {
          io.disconnect();
        } catch (e) {}
      };

      // attach cleanup to window so we can call it from return below
      (sectionRef.current as any).__servicesExtrasCleanup = cleanup;
    });

    return () => {
      cIC(idleId);
      // run cleanup if set
      const c = (sectionRef.current as any)?.__servicesExtrasCleanup;
      if (typeof c === "function") c();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-extras mt-20 max-w-7xl mx-auto px-6"
    >
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
