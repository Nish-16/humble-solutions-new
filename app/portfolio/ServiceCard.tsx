"use client";
import React, { useEffect, useRef } from "react";

export default function ServiceCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Fade-in on scroll
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    el.classList.add("opacity-0", "translate-y-6");

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
      { threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mouse glow interactions
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--light-opacity", "1");
    el.style.setProperty("--light-pulse", "none");
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--light-opacity", "0");
    el.style.setProperty("--light-pulse", "");
  };

  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${rect.width / 2}px`);
    el.style.setProperty("--my", `${rect.height / 3}px`);
    el.style.setProperty("--light-opacity", "0.95");
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
        ref={cardRef}
        tabIndex={0}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        className="group relative overflow-hidden rounded-2xl border border-white bg-gray-800 backdrop-blur-xl p-6 shadow-xl transition-transform duration-300 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-400/40 transform will-change-transform"
        style={
          {
            "--mx": "50%",
            "--my": "30%",
            "--light-opacity": "0",
            "--light-pulse": "none",
            WebkitTapHighlightColor: "transparent",
          } as React.CSSProperties
        }
      >
        {/* Light overlay effect */}
        <div
          aria-hidden
          className="light-overlay pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
          style={
            {
              background:
                "radial-gradient(500px circle at var(--mx) var(--my), rgba(255,255,255,0.5), rgba(255,255,255,0.05) 30%, transparent 60%)",
              opacity: "var(--light-opacity, 0)",
              transition: "opacity 250ms ease, transform 280ms ease",
              animation: "var(--light-pulse, none)",
              transform: "translateZ(0)",
            } as React.CSSProperties
          }
        />

        {/* Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-indigo-400 to-emerald-400 text-white shadow-md ring-1 ring-white/40">
            {icon}
          </div>
          <h3 className="text-base font-semibold text-neutral-50 drop-shadow-sm">
            {title}
          </h3>
        </div>

        {/* List items */}
        <ul className="mt-4 space-y-2 text-sm text-neutral-100 relative z-10">
          {items.map((it) => (
            <li key={it} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="leading-tight">{it}</span>
            </li>
          ))}
        </ul>

        {/* Decorative gradient glow */}
        <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-gradient-to-tr from-indigo-400 to-emerald-300 opacity-20 blur-md transform transition-opacity duration-300 group-hover:opacity-40" />
      </div>

      <style jsx>{`
        .light-overlay {
          will-change: transform, opacity;
        }

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

        .group:hover :global(.light-overlay),
        .group:focus-within :global(.light-overlay) {
          animation: pulseLight 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
