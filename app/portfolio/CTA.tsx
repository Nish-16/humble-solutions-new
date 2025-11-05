import React from "react";
import { Mail, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-16"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-900 to-neutral-700" />
      <div className="relative">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-2 max-w-xl text-neutral-200">
              We design and ship beautiful websites, robust apps, and reliable
              IoT systems. Tell us what you’re building.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <a
              href="mailto:hello@yourcompany.com"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-100"
            >
              <Mail className="mr-2 h-4 w-4" /> Email us
            </a>
            <a
              href="https://cal.com/your-company/intro"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-800 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-neutral-700"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Book a call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
