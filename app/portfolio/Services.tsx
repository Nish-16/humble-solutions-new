import React from "react";
import ServiceCard from "./ServiceCard";
import { Layers, AppWindow, Cpu } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            What we do
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
            End‑to‑end product development
          </h2>
        </div>
        <a
          href="#projects"
          className="hidden rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-white/60 md:inline-flex items-center gap-2"
        >
          See work
        </a>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={<Layers className="h-5 w-5" />}
          title="Websites & Platforms"
          items={["Marketing sites", "SaaS dashboards", "E‑commerce"]}
        />
        <ServiceCard
          icon={<AppWindow className="h-5 w-5" />}
          title="Mobile Apps"
          items={["iOS & Android", "React Native", "Native Kotlin"]}
        />
        <ServiceCard
          icon={<Cpu className="h-5 w-5" />}
          title="IoT & Edge"
          items={["ESP32", "MQTT/WebSockets", "Cloud integrations"]}
        />
      </div>
    </section>
  );
}
