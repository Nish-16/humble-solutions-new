"use client";
import React from "react";
import ProjectCard from "./ProjectCard";
import projects from "./projects_data";

export default function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((p) => (
        <ProjectCard
          key={p.id}
          title={p.title}
          description={p.description}
          tags={p.tags}
          link={p.link}
          image={p.image}
          client={p.client}
          year={p.year}
        />
      ))}
    </div>
  );
}
