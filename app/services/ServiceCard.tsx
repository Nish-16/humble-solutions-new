"use client";
import React, { useEffect, useRef } from "react";

type Service = {
  id: string;
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

type Props = {
  service: Service;
  index: number;
  setRef?: (el: HTMLDivElement | null, i: number) => void;
};

export default function ServiceCard({ service, index, setRef }: Props) {
  // use an HTMLDivElement ref
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    // Start hidden via CSS classes and reveal when card enters viewport.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-6");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    // ensure initial hidden state
    el.classList.add("opacity-0", "translate-y-6");
    io.observe(el);

    return () => io.disconnect();
  }, []);

  // If the service object already contains an `icon` React node (from content), use it.
  // Fallback to a simple placeholder when not present.
  const IconNode = service.icon ?? (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2v20M2 12h20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  // Handlers update CSS custom properties on the card element to drive the lighting overlay.
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    // set light visible and stop pulse while following cursor (keeps it lively)
    el.style.setProperty("--light-opacity", "1");
    // reduce pulsing while point light is active
    el.style.setProperty("--light-pulse", "none");
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--light-opacity", "0");
    // restore pulse after mouse leaves
    el.style.setProperty("--light-pulse", "");
  };

  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${Math.round(rect.width / 2)}px`);
    el.style.setProperty("--my", `${Math.round(rect.height / 3)}px`);
    el.style.setProperty("--light-opacity", "0.95");
    // enable pulsing animation for keyboard focus
    el.style.setProperty("--light-pulse", "pulseLight 3s ease-in-out infinite");
  };

  const onBlur = (e: React.FocusEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--light-opacity", "0");
    el.style.setProperty("--light-pulse", "none");
  };

  return (
    <>
      <div
        // attach ref here and also call user-provided setRef if present
        ref={(el) => {
          cardRef.current = el;
          if (setRef) setRef((el as HTMLDivElement) || null, index);
        }}
        aria-labelledby={`${service.id}-title`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={0}
        className="relative group rgb-border bg-white/3 hover:bg-white/4 backdrop-blur-sm transition-transform transform will-change-transform hover:-translate-y-2 rounded-2xl p-6 sm:p-8 flex flex-col items-stretch gap-4 shadow-2xl border border-white/6 min-h-[220px]"
        // handlers set CSS vars at runtime; keep a small typed style object
        style={
          {
            WebkitTapHighlightColor: "transparent",
            // sensible initial CSS variables:
            // mx/my are set by pointer or focus handlers
            // --light-opacity controls overlay visibility
            // --light-pulse can be toggled to start/stop the pulse
            "--mx": "50%",
            "--my": "30%",
            "--light-opacity": "0",
            "--light-pulse": "none",
          } as React.CSSProperties
        }
      >
        {/* lighting overlay */}
        <div
          aria-hidden
          className="light-overlay pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
          style={
            {
              background:
                "radial-gradient(600px circle at var(--mx) var(--my), rgba(255,255,255,0.12), rgba(255,255,255,0.03) 30%, transparent 60%)",
              opacity: "var(--light-opacity, 0)",
              transition: "opacity 220ms ease, transform 280ms ease",
              // animation can be controlled via --light-pulse (string like 'pulseLight 3s ...')
              animation: "var(--light-pulse, none)",
              transform: "translateZ(0)",
            } as React.CSSProperties
          }
        />
        <div className="flex items-center gap-4">
          <div className="flex-none w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-cyan-600/20 to-cyan-500/10 text-cyan-300 flex items-center justify-center ring-1 ring-white/6 group-hover:scale-105 transition-transform">
            <div className="w-9 h-9 sm:w-10 sm:h-10 text-cyan-300">
              {IconNode}
            </div>
          </div>

          <div className="flex-1">
            <h3
              id={`${service.id}-title`}
              className="text-lg sm:text-xl font-semibold text-white"
            >
              {service.title}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-white/75">
              {service.desc}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-2 border-t border-white/6 flex items-center justify-between gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-black font-medium shadow-sm hover:shadow-md transition"
          >
            Learn more
          </a>

          <a
            href="#"
            aria-hidden
            className="text-white/40 hover:text-white/70 transition-opacity"
          >
            Explore →
          </a>
        </div>
      </div>

      {/* styled-jsx defines the pulse animation and hover behaviour for Next.js */}
      <style jsx>{`
        .light-overlay {
          will-change: transform, opacity;
        }

        /* subtle pulse used on hover / keyboard focus (also controllable via --light-pulse) */
        @keyframes pulseLight {
          0% {
            transform: scale(1);
            opacity: 0.95;
          }
          50% {
            transform: scale(1.06);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 0.95;
          }
        }

        /* automatic pulse on pointer hover (nice fallback) */
        .group:hover :global(.light-overlay) {
          animation: pulseLight 3s ease-in-out infinite;
        }

        /* make sure focus-visible (keyboard) also triggers hover-like appearance */
        .group:focus-within :global(.light-overlay) {
          animation: pulseLight 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
