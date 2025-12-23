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
  { id: "1", name: "Ansh Bajaj", title: "Founder & Product", handle: "ashapatel" },
  { id: "2", name: "Ishank", title: "Engineering Lead", handle: "diegoramos" },
  { id: "3", name: "Mohit", title: "Machine Learning", handle: "mayachen" },
];

export default function TeamSection() {
  return (
    <section id="team" className="mt-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center">
          Meet the team
        </h2>
        <p className="mt-3 text-white/80 text-center max-w-2xl mx-auto">
          Small, focused teams that ship product-grade software and cloud systems.
        </p>

        <div className="
          mt-8
          grid
          grid-cols-1
          place-items-center
          sm:place-items-stretch
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">
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
