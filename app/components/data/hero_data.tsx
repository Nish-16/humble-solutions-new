import { Globe, Smartphone, Palette, Cpu } from "lucide-react";

export type EarthBox = {
  id: number;
  title: string;
  description: string;
  position: string;
  icon: any;
};

export const earthBoxes: EarthBox[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "High-performance websites, dashboards, landing pages, and custom platforms built with modern frameworks.",
    position: "left-[6%] top-[14%]",
    icon: Globe,
  },
  {
    id: 2,
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps with great UI, fast performance, and smooth user experiences.",
    position: "left-[6%] bottom-[14%]",
    icon: Smartphone,
  },
  {
    id: 3,
    title: "UI/UX Design",
    description:
      "Human-centered design, wireframing, prototyping, and complete product design systems.",
    position: "right-[6%] top-[14%]",
    icon: Palette,
  },
  {
    id: 4,
    title: "Software & Hardware Solutions",
    description:
      "Integrated digital + physical solutions including IoT systems, embedded hardware, and custom software.",
    position: "right-[6%] bottom-[14%]",
    icon: Cpu,
  },
];
