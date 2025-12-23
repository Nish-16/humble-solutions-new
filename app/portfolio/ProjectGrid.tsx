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
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    el.style.setProperty("--light-opacity", "1");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--light-opacity", "0");
  };

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-14">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold md:text-4xl">
          Selected projects
        </h2>

        <div className="flex gap-2 rounded-full border border-neutral-300/40 bg-gray-800 p-1 backdrop-blur-md">
          {categories.map((c) => (
            <motion.button
              key={c.key}
              onClick={() => setFilter(c.key)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-full px-3 py-1 text-sm transition ${
                filter === c.key
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {c.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href}
            // --- FIX START ---
            initial={{ y: 20, opacity: 0 }}       // Start slightly down and invisible
            whileInView={{ y: 0, opacity: 1 }}    // Animate to neutral position
            viewport={{ amount: 0.2, once: true }} // Trigger once when 20% visible
            transition={{ duration: 0.4, delay: i * 0.05 }}
            // --- FIX END ---
            
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden rounded-2xl border border-white/30 bg-gray-800 shadow-lg backdrop-blur-xl"
            style={
              {
                // Removed the conflicting 'transform' property
                "--mx": "50%",
                "--my": "30%",
                "--light-opacity": "0",
              } as React.CSSProperties
            }
          >
            {/* Lighting overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
              style={{
                background:
                  "radial-gradient(500px circle at var(--mx) var(--my), rgba(255,255,255,0.45), transparent 60%)",
                opacity: "var(--light-opacity)",
                transition: "opacity 200ms ease",
              }}
            />

            {/* Image */}
            <div className="aspect-[16/10] w-full overflow-hidden bg-white/10">
              <img
                src={`https://picsum.photos/seed/${encodeURIComponent(
                  p.title
                )}/1600/1000`}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 p-5">
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/30 px-2 py-0.5 text-xs text-white backdrop-blur-sm"
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
            <div className="absolute right-3 top-3 rounded-full bg-white/70 p-2 opacity-0 transition group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4 text-neutral-900" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}