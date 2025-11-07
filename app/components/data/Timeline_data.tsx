// src/components/Timeline_data.ts

export interface TimelineItemData {
  year: string;
  title: string;
  description: string;
  icon: string;
  cardIcon: string;
  details: string;
  image?: string; // optional image URL
}

export const timelineData: TimelineItemData[] = [
  {
    year: "2021",
    title: "Project Inception",
    description:
      "The journey began with a single idea, laying the groundwork for what was to come.",
    icon: "💡",
    cardIcon: "Idea-icon.json",     // ✅ now a Lottie file
    details:
      "We brainstormed, researched, and validated our concept...",
    image: "Idea.json",        // ✅ now a Lottie file
  },
  {
    year: "2022",
    title: "Development & Prototyping",
    description:
      "Heads down, we brought the concept to life, building the first functional prototype.",
    icon: "👨‍💻",
    cardIcon: "development-icon.json",
    details:
      "Our team worked tirelessly...",
    image: "development.json",
  },
  {
    year: "2023",
    title: "Beta Launch & Feedback",
    description:
      "We launched a closed beta...",
    icon: "🚀",
    cardIcon: "Feedback-icon.json",
    details:
      "Beta users provided invaluable feedback...",
    image: "Feedback.json",
  },
  {
    year: "2024",
    title: "Public Release & Growth",
    description:
      "The platform saw rapid adoption and growth...",
    icon: "📈",
    cardIcon: "growth-icon.json",
    details:
      "We expanded our team...",
    image: "growth.json",
  },
  {
    year: "2025",
    title: "Future Innovations",
    description:
      "We are continuously exploring new technologies...",
    icon: "🌌",
    cardIcon: "innovation-icon.json",
    details:
      "We are investing in AI, automation...",
    image: "innovation.json",
  },
];
