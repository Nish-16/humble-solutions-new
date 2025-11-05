import React from "react";
import { Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-16"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-900 to-neutral-800" />
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
            <motion.a
              href="mailto:hello@yourcompany.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl bg-neutral-800 px-5 py-3 font-medium text-neutral-100 shadow-sm border border-neutral-700 transition"
            >
              <Mail className="mr-2 h-4 w-4" /> Email us
            </motion.a>
            <motion.a
              href="https://cal.com/your-company/intro"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 px-5 py-3 font-medium text-white shadow-sm transition"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Book a call
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
