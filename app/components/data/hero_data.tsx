// src/components/data/hero_data.tsx

export interface infoBoxes {
  id: string;
  title: string;
  description: string;
  position: string;
}

export const infoBoxes: infoBoxes[] = [
  {
    id: "box-1",
    title: "Our Mission",
    description: "To deliver innovative and humble solutions globally.",
    position: "top-16 left-16",
  },
  {
    id: "box-2",
    title: "Our Team",
    description: "A passionate group of developers and designers.",
    position: "top-1/2 left-16 -translate-y-1/2",
  },
  {
    id: "box-3",
    title: "Core Services",
    description: "Web development, UI/UX design, and cloud integration.",
    position: "bottom-16 left-16",
  },
  {
    id: "box-4",
    title: "Our Portfolio",
    description: "Explore our diverse range of successful projects.",
    position: "top-16 right-16",
  },
  {
    id: "box-5",
    title: "Testimonials",
    description: "What our valued clients have to say about us.",
    position: "top-1/2 right-16 -translate-y-1/2",
  },
  {
    id: "box-6",
    title: "Contact Us",
    description: "Let's build something amazing together.",
    position: "bottom-16 right-16",
  },
];
