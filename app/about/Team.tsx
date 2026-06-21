"use client";

import React from "react";
import ProfileCard from "./ProfileCards";

type Member = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl?: string;
};

const TEAM: Member[] = [
  {
    id: "1",
    name: "Ansh Bajaj",
    role: "Product Manager",
    imageUrl: "/about/Ansh.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/anshbajaj2611/",
  },
  {
    id: "2",
    name: "Ishank Goyal",
    role: "Product Manager",
    imageUrl: "/about/Ishank.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/ishank-goyal-4555a7275/",
  },
  {
    id: "3",
    name: "Mohit Sachdeva",
    role: "Head Of Outreach",
    imageUrl: "/about/Mohit.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/mohit-sehdev-3bb4a3212/",
  },
  {
    id: "4",
    name: "Sharnya Goel",
    role: "Software Engineer",
    imageUrl: "/about/Sharnya.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/sharnya-goel-b96697284/",
  },
  {
    id: "5",
    name: "Shreya Baranwal",
    role: "Head Of Design",
    imageUrl: "/about/Shreya.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/shreya-baranwal-3188a427b/",
  },
  {
    id: "6",
    name: "Rishi Bhardwaj",
    role: "Software Engineer",
    imageUrl: "/about/Rishi.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/rishi-bhardwaj-30293a304/",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center">
          Meet the team
        </h2>

        <p className="mt-3 text-white/80 text-center max-w-2xl mx-auto">
          Small, focused teams that ship product-grade software and cloud
          systems.
        </p>

        {/* GRID */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((m) => (
            <div key={m.id} className="flex justify-center">
              <ProfileCard
                avatarUrl={m.imageUrl}
                name={m.name}
                role={m.role}
                linkedinUrl={m.linkedinUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
