"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const GalaxyBackground = dynamic(
  () => import("../components/GalaxyBackground"),
  { ssr: false }
);

type Service = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    id: "custom",
    title: "Custom Software",
    desc: "Tailored web, mobile, and cloud solutions built to your needs.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2v20M2 12h20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "ai",
    title: "AI & Automation",
    desc: "Automate workflows and gain insights with modern ML solutions.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "consulting",
    title: "Consulting",
    desc: "Strategy, architecture, and go-to-market guidance for tech teams.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "ux",
    title: "Design & UX",
    desc: "Human-centered interfaces and product design that convert.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12h18M12 3v18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    desc: "Reliable infrastructure, CI/CD, and cost-optimized deployments.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 17.58A5 5 0 0018 7h-1.26A8 8 0 104 16.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "support",
    title: "Support & Maintenance",
    desc: "Ongoing support to keep your systems healthy and secure.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 1v22M1 12h22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: any;
    let gsap: any;
    let ScrollTrigger: any;

    if (typeof window === "undefined") return;

    (async () => {
      gsap = (await import("gsap")).default;
      try {
        // import ScrollTrigger (path works both in dev and production)
        const mod = await import("gsap/dist/ScrollTrigger");
        ScrollTrigger = mod.ScrollTrigger || (mod as any).default;
        gsap.registerPlugin(ScrollTrigger);
      } catch (e) {
        // ignore if ScrollTrigger not available
      }

      ctx = gsap.context(() => {
        if (heroRef.current) {
          gsap.from(heroRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        }

        if (cardsRef.current.length) {
          gsap.from(cardsRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: ScrollTrigger
              ? {
                  trigger: cardsRef.current[0],
                  start: "top 80%",
                }
              : undefined,
          });
        }

        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: ScrollTrigger
              ? { trigger: ctaRef.current, start: "top 90%" }
              : undefined,
          });
        }
      });
    })();

    return () => {
      if (ctx) ctx.revert();
      if (ScrollTrigger) {
        try {
          ScrollTrigger.kill();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <>
      <GalaxyBackground />
      <Navbar />

      <main className="max-w-7xl mx-auto py-20 px-6 relative z-10">
        <section ref={heroRef} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cyan-400 leading-tight">
            Modern engineering. Impactful results.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
            We build production-grade software, automate workflows, and design
            delightful products that scale. GSAP-powered animations make the
            experience feel alive — smooth, fast and intentional.
          </p>
        </section>

        <section className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-cyan-400/10 p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="group bg-gradient-to-b from-white/6 to-white/3 hover:from-white/8 hover:to-white/6 transition-transform transform will-change-transform hover:-translate-y-1 rounded-2xl p-6 flex flex-col items-start gap-4 shadow-lg border border-cyan-400/10"
                aria-labelledby={`${svc.id}-title`}
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-300 flex items-center justify-center ring-1 ring-cyan-400/10 group-hover:scale-105 transition-transform">
                  {svc.icon}
                </div>
                <div>
                  <h3
                    id={`${svc.id}-title`}
                    className="text-xl font-semibold text-white"
                  >
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-white/70">{svc.desc}</p>
                </div>
                <div className="mt-auto">
                  <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 transition">
                    Learn more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-90"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div ref={ctaRef} className="mt-10 text-center">
            <p className="text-white/80 max-w-2xl mx-auto">
              Ready to move faster? We scope, build, and ship — then stay to
              support. Let&apos;s talk about your project.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Get a quote
              </a>
              <a href="/portfolio" className="text-white/70 hover:text-white">
                See examples
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
