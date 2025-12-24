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
      "/portfolio/attendx/1.jpeg",
      "/portfolio/attendx/2.jpeg",
      "/portfolio/attendx/3.jpeg",
      "/portfolio/attendx/4.jpeg",
      "/portfolio/attendx/5.jpeg",
      "/portfolio/attendx/6.jpeg",
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
      "/portfolio/matricare/1.jpeg",
      "/portfolio/matricare/2.jpeg",
      "/portfolio/matricare/3.jpeg",
      "/portfolio/matricare/4.jpeg",
      "/portfolio/matricare/5.jpeg",
      "/portfolio/matricare/6.jpeg",
      "/portfolio/matricare/7.jpeg",
      "/portfolio/matricare/8.jpeg",
      "/portfolio/matricare/9.jpeg",
      "/portfolio/matricare/10.jpeg",
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
      "/portfolio/cylinder/1.jpeg",
      "/portfolio/cylinder/2.jpeg",
      "/portfolio/cylinder/3.jpeg",
      "/portfolio/cylinder/4.jpeg",
      "/portfolio/cylinder/5.jpeg",
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
