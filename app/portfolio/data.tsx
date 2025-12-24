export const categories = [
  { key: "all", label: "All" },
  { key: "desktop", label: "Desktop" },
  { key: "apps", label: "Apps" },
  { key: "iot", label: "IoT" },
] as const;

export type CategoryKey = (typeof categories)[number]["key"];

export type Project = {
  title: string;
  subtitle: string;
  categories: CategoryKey[];
  image: string;
  images: string[];
  href: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "Aromex",
    subtitle: "Kotlin Multiplatform • Jetpack Compose",
    categories: ["desktop"],

    image: "/portfolio/aromax.jpeg",
    images: [
      "/portfolio/aromex/1.jpeg",
      "/portfolio/aromex/2.jpeg",
      "/portfolio/aromex/3.jpeg",
      "/portfolio/aromex/4.jpeg",
    ],
    href: "#",
    tags: ["Desktop App", "Inventory Management", "Analytics"],
  },
  {
    title: "Attendx",
    subtitle: "Kotlin • Firebase • Jetpack Compose",
    categories: ["apps", "iot"],

    image: "/portfolio/attendence.jpeg",
    images: [
      "/portfolio/Attendx/1.jpeg",
      "/portfolio/Attendx/2.jpeg",
      "/portfolio/Attendx/3.jpeg",
      "/portfolio/Attendx/4.jpeg",
      "/portfolio/Attendx/5.jpeg",
      "/portfolio/Attendx/6.jpeg",
    ],
    href: "#",
    tags: ["ESP32", "Auth", "Analytics"],
  },
  {
    title: "MatriCare",
    subtitle: "Kotlin • Jetpack Compose • Firebase",
    categories: ["apps"],

    image: "/portfolio/matricare.jpeg",
    images: [
      "/portfolio/Matricare/1.jpeg",
      "/portfolio/Matricare/2.jpeg",
      "/portfolio/Matricare/3.jpeg",
      "/portfolio/Matricare/4.jpeg",
      "/portfolio/Matricare/5.jpeg",
      "/portfolio/Matricare/6.jpeg",
      "/portfolio/Matricare/7.jpeg",
      "/portfolio/Matricare/8.jpeg",
      "/portfolio/Matricare/9.jpeg",
      "/portfolio/Matricare/10.jpeg",
    ],
    href: "#",
    tags: ["Mobile", "Analytics", "AI"],
  },
  {
    title: "Cylinder Management System",
    subtitle: "Kotlin • Jetpack Compose • Firebase",
    categories: ["apps"],

    image: "/portfolio/cylinder.jpeg",
    images: [
      "/portfolio/Cylinder/1.jpeg",
      "/portfolio/Cylinder/2.jpeg",
      "/portfolio/Cylinder/3.jpeg",
      "/portfolio/Cylinder/4.jpeg",
      "/portfolio/Cylinder/5.jpeg",
    ],
    href: "#",
    tags: ["Mobile", "Analytics", "Inventory Management"],
  },
  {
    title: "Plant Management System",
    subtitle: "Kotlin • Jetpack Compose • Firebase",
    categories: ["desktop"],

    image: "/portfolio/plant.jpeg",
    images: [
      "/portfolio/Plant/1.jpeg",
      "/portfolio/Plant/2.jpeg",
      "/portfolio/Plant/3.jpeg",
      "/portfolio/Plant/4.jpeg",
      "/portfolio/Plant/5.jpeg",
      "/portfolio/Plant/6.jpeg",
      "/portfolio/Plant/7.jpeg",
      "/portfolio/Plant/8.jpeg",
      "/portfolio/Plant/9.jpeg",
      "/portfolio/Plant/10.jpeg",
    ],
    href: "#",
    tags: ["Desktop", "Analytics", "Inventory Management"],
  },
];
