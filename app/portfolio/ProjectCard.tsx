import React from "react";

type ProjectCardProps = {
  title: string;
  description: string;
  tags?: string[];
  link?: string;
  image?: string;
  client?: string;
  year?: string;
};

export default function ProjectCard({
  title,
  description,
  tags = [],
  link = "#",
  image,
  client,
  year,
}: ProjectCardProps) {
  return (
    <article className="group bg-gradient-to-br from-white/3 to-white/2 rounded-2xl p-0 overflow-hidden shadow-lg border border-cyan-400/8">
      <a href={link} className="block p-6 hover:bg-white/3 transition-colors">
        {image ? (
          <div className="h-40 w-full rounded-lg overflow-hidden mb-4 bg-gray-800">
            <img
              src={image}
              alt={`${title} thumbnail`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
            />
          </div>
        ) : null}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">
              {title}
            </h3>
            <div className="text-sm text-white/70 mt-1 mb-3">
              {client && <span className="mr-2">{client}</span>}
              {year && <span className="text-white/50">• {year}</span>}
            </div>

            <p className="text-white/70 text-sm mb-4 line-clamp-3">
              {description}
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-white/5 text-white/80 px-2 py-1 rounded-md border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 ml-4 hidden sm:flex items-center">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              className="text-cyan-400 group-hover:scale-110 transition-transform"
              aria-hidden
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </a>
    </article>
  );
}
