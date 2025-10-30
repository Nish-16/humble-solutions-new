type Project = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  link?: string;
  image?: string;
  client?: string;
  year?: string;
};

const projects: Project[] = [
  {
    id: "project-1",
    title: "Business Manager",
    description:
      "A modern web platform for small businesses: dashboards, invoicing, and role-based access — built for performance.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "#",
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c",
    client: "Acme Co.",
    year: "2024",
  },
  {
    id: "project-2",
    title: "AI Automation",
    description:
      "End-to-end automation platform using machine learning to optimize repetitive workflows and reduce manual effort.",
    tags: ["Machine Learning", "APIs", "Automation"],
    link: "#",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d5e6f",
    client: "Nimbus Labs",
    year: "2025",
  },
  {
    id: "project-3",
    title: "E‑commerce Redesign",
    description:
      "Rebuilt checkout and product listing for speed and accessibility — improved conversions and Lighthouse scores.",
    tags: ["React", "Performance", "WCAG"],
    link: "#",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a8b9c",
    client: "Marketify",
    year: "2023",
  },
  {
    id: "project-4",
    title: "Mobile Companion App",
    description:
      "Cross-platform mobile companion app with offline-sync and push notifications to keep customers engaged.",
    tags: ["Flutter", "Mobile", "Sync"],
    link: "#",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0d1e2f",
    client: "PocketWorks",
    year: "2022",
  },
  {
    id: "project-5",
    title: "Analytics Dashboard",
    description:
      "Realtime analytics dashboard with custom visualizations and alerting for core business metrics.",
    tags: ["D3", "Realtime", "Node.js"],
    link: "#",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c4d5e",
    client: "DataSight",
    year: "2024",
  },
  {
    id: "project-6",
    title: "Marketing Landing",
    description:
      "High-converting marketing landing page with A/B experimentation wiring and analytics baked in.",
    tags: ["Landing", "A/B", "Conversion"],
    link: "#",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6f7g8h",
    client: "BrightWave",
    year: "2025",
  },
];

export default projects;
