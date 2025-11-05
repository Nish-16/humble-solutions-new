export const categories = [
{ key: "all", label: "All" },
{ key: "web", label: "Websites" },
{ key: "apps", label: "Apps" },
{ key: "iot", label: "IoT" },
] as const;


export type CategoryKey = typeof categories[number]["key"];


export const projects = [
{
title: "CampusNav Web Platform",
subtitle: "React • TypeScript • Tailwind",
category: "web" as CategoryKey,
image: "/images/projects/campusnav.jpg",
href: "#",
tags: ["React", "Maps", "Realtime"],
},
{
title: "PersonalFinance Mobile",
subtitle: "Expo Router • Clerk",
category: "apps" as CategoryKey,
image: "/images/projects/finance.jpg",
href: "#",
tags: ["React Native", "Auth", "Analytics"],
},
{
title: "Railway Seat Allocator",
subtitle: "ESP32 • Node • MongoDB",
category: "iot" as CategoryKey,
image: "/images/projects/railway.jpg",
href: "#",
tags: ["ESP32", "LED", "Cloud"],
},
{
title: "E‑commerce Suite",
subtitle: "Next.js • Stripe • Prisma",
category: "web" as CategoryKey,
image: "/images/projects/shop.jpg",
href: "#",
tags: ["Next.js", "Stripe", "SSR"],
},
{
title: "Smart Facility App",
subtitle: "Kotlin • Jetpack Compose",
category: "apps" as CategoryKey,
image: "/images/projects/facility.jpg",
href: "#",
tags: ["Android", "Compose", "BLE"],
},
{
title: "Industrial IoT Dashboard",
subtitle: "MQTT • TS • WebSockets",
category: "iot" as CategoryKey,
image: "/images/projects/iotdash.jpg",
href: "#",
tags: ["MQTT", "Realtime", "Charts"],
},
];