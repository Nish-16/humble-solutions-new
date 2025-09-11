// src/components/Timeline_data.ts

// 1. Define a TypeScript interface for a single timeline item.
// This makes your data structure explicit and reusable.
export interface TimelineItemData {
  year: string;
  title: string;
  description: string;
  icon: string;
  cardIcon: string;
  details: string;
}

// 2. Export the timeline data array with the defined type.
export const timelineData: TimelineItemData[] = [
  {
    year: "2021",
    title: "Project Inception",
    description:
      "The journey began with a single idea, laying the groundwork for what was to come.",
    icon: "💡",
    cardIcon: "📝",
    details:
      "We brainstormed, researched, and validated our concept with industry experts and potential users. Early sketches and wireframes set the vision.",
  },
  {
    year: "2022",
    title: "Development & Prototyping",
    description:
      "Heads down, we brought the concept to life, building the first functional prototype.",
    icon: "👨‍💻",
    cardIcon: "🛠️",
    details:
      "Our team worked tirelessly, iterating on design and functionality. We overcame technical challenges and built a scalable foundation.",
  },
  {
    year: "2023",
    title: "Beta Launch & Feedback",
    description:
      "We launched a closed beta, and user feedback helped us refine and improve the experience.",
    icon: "🚀",
    cardIcon: "🔍",
    details:
      "Beta users provided invaluable feedback. We added new features, improved performance, and polished the user experience.",
  },
  {
    year: "2024",
    title: "Public Release & Growth",
    description:
      "The platform saw rapid adoption and growth, validating our initial vision.",
    icon: "📈",
    cardIcon: "🌍",
    details:
      "We expanded our team, scaled our infrastructure, and formed strategic partnerships. Our user base grew globally.",
  },
  {
    year: "2025",
    title: "Future Innovations",
    description:
      "We are continuously exploring new technologies like AI to redefine industry standards.",
    icon: "🌌",
    cardIcon: "🤖",
    details:
      "We are investing in AI, automation, and new markets. Our roadmap includes exciting features and industry collaborations.",
  },
];