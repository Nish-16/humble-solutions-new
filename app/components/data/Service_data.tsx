import React from "react";

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  border: string;
  translation: string;
}

export const servicesData: Service[] = [
  {
    title: "Custom Software",
    description:
      "Tailored web, mobile, and cloud solutions to fit your business needs.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-4 text-cyan-400"
      >
        <path d="M10 20l4-16m4 4l4 4-4 4M6 8l-4 4 4 4" />
      </svg>
    ),
    gradient: "from-cyan-900/60 via-cyan-700/40 to-blue-900/30",
    border: "border-cyan-400/20",
    translation: "md:-translate-y-6 md:-translate-x-6",
  },
  {
    title: "AI & Automation",
    description: "Leverage AI to streamline operations and boost productivity.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-4 text-cyan-400"
      >
        <path d="M12 8V4H8" />
        <rect x="4" y="12" width="8" height="8" rx="2" />
        <path d="M8 12v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2" />
        <path d="m14 10-4 4" />
        <path d="m14 14-4-4" />
      </svg>
    ),
    gradient: "from-blue-900/60 via-blue-700/40 to-cyan-900/30",
    border: "border-blue-400/20",
    translation: "md:translate-y-0 md:translate-x-0",
  },
  {
    title: "Expert Consulting",
    description: "Navigate digital transformation with expert tech strategy.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-4 text-cyan-400"
      >
        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
      </svg>
    ),
    gradient: "from-indigo-900/60 via-indigo-700/40 to-cyan-900/30",
    border: "border-indigo-400/20",
    translation: "md:translate-y-6 md:translate-x-6",
  },
];
