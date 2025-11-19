import React from "react";

export type ServiceItem = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

export const hero = {
  title: "Modern engineering. Impactful results.",
  subtitle:
    "We build production-grade software, automate workflows, and design delightful products that scale. Subtle motion and refined layout make the experience feel modern and approachable.",
};

export const cta = {
  paragraph:
    "Ready to move faster? We scope, build, and ship — then stay to support. We partner closely during launch and beyond to make sure you hit your goals. Let's talk about your project.",
  primaryText: "Get a quote",
  primaryHref: "/contact",
  secondaryText: "See examples",
  secondaryHref: "/portfolio",
};

export const services = [
  {
    id: "custom",
    title: "Custom Software",
    desc: "Tailored web, mobile, and cloud solutions built to your needs.",
    icon: (
      <img
        src="/Web.gif"
        alt="AI Icon"
        width={150}
        height={50}
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    id: "ai",
    title: "AI & Automation",
    desc: "Automate workflows and gain insights with modern ML solutions.",
    icon: (
      <img
        src="/AI.gif"
        alt="AI Icon"
        width={150}
        height={50}
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    id: "consulting",
    title: "Consulting",
    desc: "Strategy, architecture, and go-to-market guidance for tech teams.",
    icon: (
      <img
        src="/Consulting.gif"
        alt="Consulting Icon"
        width={150}
        height={50}
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    id: "ux",
    title: "Design & UX",
    desc: "Human-centered interfaces and product design that convert.",
    icon: (
      <img
        src="/design.gif"
        alt="Design Icon"
        width={150}
        height={50}
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    desc: "Reliable infrastructure, CI/CD, and cost-optimized deployments.",
    icon: (
      <img
        src="/Cloud.gif"
        alt="Cloud Icon"
        width={150}
        height={50}
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    id: "support",
    title: "Support & Maintenance",
    desc: "Ongoing support to keep your systems healthy and secure.",
    icon: (
      <img
        src="/Support.gif"
        alt="Support Icon"
        width={150}
        height={50}
        style={{ objectFit: "contain" }}
      />
    ),
  },
];

const content = { hero, cta, services };

export default content;
