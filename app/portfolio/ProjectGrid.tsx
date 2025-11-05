import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories, projects } from "./data";

export default function ProjectsGrid() {
  const [filter, setFilter] = React.useState("all");
  const filtered = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold md:text-4xl">
          Selected projects
        </h2>
        <div className="flex gap-2 rounded-full border border-neutral-200 bg-white p-1">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`rounded-full px-3 py-1 text-sm transition ${
                filter === c.key
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
          >
            <div className="aspect-[16/10] w-full bg-neutral-100">
              <Image
                src={p.image}
                alt={p.title}
                width={1600}
                height={1000}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-neutral-600">{p.subtitle}</p>
            </div>
            <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
