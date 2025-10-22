"use client";
import React from "react";

type Service = {
  id: string;
  title: string;
  desc: string;
};

type Props = {
  service: Service;
  index: number;
  setRef?: (el: HTMLDivElement | null, i: number) => void;
};

export default function ServiceCard({ service, index, setRef }: Props) {
  // If the service object already contains an `icon` React node (from content), use it.
  // Fallback to a simple placeholder when not present.
  const IconNode = (service as any).icon ?? (
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
    el.style.setProperty("--light-opacity", "1");
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--light-opacity", "0");
  };

  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${Math.round(rect.width / 2)}px`);
    el.style.setProperty("--my", `${Math.round(rect.height / 3)}px`);
    el.style.setProperty("--light-opacity", "0.95");
  };

  const onBlur = (e: React.FocusEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--light-opacity", "0");
  };

  return (
    <article
      ref={(el) => setRef && setRef((el as HTMLDivElement) || null, index)}
      aria-labelledby={`${service.id}-title`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      className="relative group rgb-border bg-white/3 hover:bg-white/4 backdrop-blur-sm transition-transform transform will-change-transform hover:-translate-y-2 rounded-2xl p-6 sm:p-8 flex flex-col items-stretch gap-4 shadow-2xl border border-white/6 min-h-[220px]"
      // handlers set CSS vars at runtime; keep a small typed style object
      style={{ WebkitTapHighlightColor: "transparent" } as React.CSSProperties}
    >
      {/* lighting overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(255,255,255,0.08), rgba(255,255,255,0.02) 30%, transparent 60%)",
          opacity: "var(--light-opacity, 0)",
          transition: "opacity 280ms ease, transform 280ms ease",
        }}
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
    </article>
  );
}
