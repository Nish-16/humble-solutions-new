"use client";

import React from "react";
import ProfileCard from "./ProfileCards";

type Member = {
  id: string;
  name: string;
  title: string;
  handle?: string;
};

const TEAM: Member[] = [
  {
    id: "1",
    name: "Asha Patel",
    title: "Founder & Product",
    handle: "ashapatel",
  },
  {
    id: "2",
    name: "Diego Ramos",
    title: "Engineering Lead",
    handle: "diegoramos",
  },
  { id: "3", name: "Maya Chen", title: "Machine Learning", handle: "mayachen" },
  {
    id: "4",
    name: "Liam O'Connor",
    title: "Frontend Engineer",
    handle: "liamoconnor",
  },
  {
    id: "5",
    name: "Noah Singh",
    title: "DevOps & Platform",
    handle: "noahsingh",
  },
  {
    id: "6",
    name: "Sofia Morales",
    title: "Data Engineer",
    handle: "sofiamorales",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="mt-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center">
          Meet the team
        </h2>
        <p className="mt-3 text-white/80 text-center max-w-2xl mx-auto">
          Small, focused teams that ship product-grade software and cloud
          systems.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((m) => (
            <ProfileCard
              key={m.id}
              avatarUrl={`https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(
                m.name
              )}`}
              name={m.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
