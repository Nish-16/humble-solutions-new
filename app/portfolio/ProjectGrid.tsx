"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories, projects } from "./data";

export default function ProjectsGrid() {
  const [filter, setFilter] = React.useState("all");
  const filtered = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  // Mouse lighting handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--light-opacity", "1");
    el.style.setProperty("--light-pulse", "none");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--light-opacity", "0");
    el.style.setProperty("--light-pulse", "");
  };

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold md:text-4xl">
          Selected projects
        </h2>
        <div className="flex gap-2 rounded-full border border-neutral-300/40 bg-gray-800 backdrop-blur-md p-1">
          {categories.map((c) => (
            <motion.button
              key={c.key}
              onClick={() => setFilter(c.key)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-full px-3 py-1 text-sm transition ${
                filter === c.key
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-neutral-400 hover:bg-white/6 hover:text-white"
              }`}
            >
              {c.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            tabIndex={0}
            className="group relative overflow-hidden rounded-2xl border border-white/30 bg-gray-800 backdrop-blur-xl shadow-lg transition-transform duration-300 ease-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
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
            {/* Lighting overlay */}
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

            {/* Image */}
            <div className="aspect-[16/10] w-full bg-white/10 overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${encodeURIComponent(
                  p.title
                )}/1600/1000`}
                alt={`${p.title} placeholder`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-5 relative z-10">
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/30 backdrop-blur-sm px-2 py-0.5 text-xs text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {p.title}
              </h3>
              <p className="text-sm text-neutral-300">{p.subtitle}</p>
            </div>

            {/* Hover icon */}
            <div className="absolute right-3 top-3 rounded-full bg-white/70 p-2 opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4 text-neutral-900" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Pulse animation */}
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
    </section>
  );
}
