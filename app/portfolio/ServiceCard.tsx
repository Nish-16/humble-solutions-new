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

  // Scroll animation (reload-safe)
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    // Visible by default
    el.classList.add("translate-y-6");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("translate-y-0");
          el.classList.remove("translate-y-6");
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mouse glow interactions (unchanged)
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    el.style.setProperty("--light-opacity", "1");
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--light-opacity", "0");
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
        className="
          group relative overflow-hidden rounded-2xl
          border border-white bg-gray-800
          backdrop-blur-xl p-6 shadow-xl
          transform transition-transform duration-500 ease-out
          hover:scale-[1.03]
          focus:outline-none focus:ring-2 focus:ring-indigo-400/40
          will-change-transform
        "
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
        {/* Light overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
          style={{
            background:
              "radial-gradient(500px circle at var(--mx) var(--my), rgba(255,255,255,0.5), transparent 60%)",
            opacity: "var(--light-opacity)",
            transition: "opacity 250ms ease",
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-indigo-400 to-emerald-400 text-white shadow-md ring-1 ring-white/40">
            {icon}
          </div>
          <h3 className="text-base font-semibold text-neutral-50">
            {title}
          </h3>
        </div>

        {/* Items */}
        <ul className="relative z-10 mt-4 space-y-2 text-sm text-neutral-100">
          {items.map((it) => (
            <li key={it} className="flex gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
