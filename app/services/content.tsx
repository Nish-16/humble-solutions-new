export type ServiceItem = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

// Note: React types aren't imported here because the file is used as a plain data module.
// We still keep the shape consistent with component props.

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
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2v20M2 12h20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "ai",
    title: "AI & Automation",
    desc: "Automate workflows and gain insights with modern ML solutions.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "consulting",
    title: "Consulting",
    desc: "Strategy, architecture, and go-to-market guidance for tech teams.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "ux",
    title: "Design & UX",
    desc: "Human-centered interfaces and product design that convert.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12h18M12 3v18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    desc: "Reliable infrastructure, CI/CD, and cost-optimized deployments.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 17.58A5 5 0 0018 7h-1.26A8 8 0 104 16.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "support",
    title: "Support & Maintenance",
    desc: "Ongoing support to keep your systems healthy and secure.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 1v22M1 12h22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default { hero, cta, services };
