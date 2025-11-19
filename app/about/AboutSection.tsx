"use client";

import React from "react";
import Lottie from "lottie-react";
import About from "@/public/about/About.json";
import { motion, Variants } from "framer-motion";

export default function AboutSection() {
  // Framer Motion variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        staggerChildren: 0.15,
      },
    },
  };

  const svgVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 1, ease: "easeOut" as const },
    },
  };

  return (
    <motion.section
      id="about"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // 👈 triggers when 30% of section is visible
      className="mt-15 relative bg-black/10 rounded-3xl p-3 sm:p-12 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -inset-8 blur-3xl opacity-10 bg-gradient-to-br from-cyan-400 to-blue-500" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text content */}
        <motion.div
          variants={textVariants}
          className="order-2 lg:order-1 text-center lg:text-left"
        >
          <motion.h2
            variants={textVariants}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            Who we are
          </motion.h2>

          <motion.p
            variants={textVariants}
            className="mt-4 text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            We’re a small, passionate team of designers and engineers crafting
            products that merge creativity with performance. From digital
            experiences to cloud-scale systems — our focus is always on
            reliability, usability, and measurable impact.
          </motion.p>

          <motion.p
            variants={textVariants}
            className="mt-4 text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Whether you’re a growing startup or an established enterprise, we
            help you bring ideas to life with design clarity and robust
            engineering.
          </motion.p>

          <motion.div
            variants={textVariants}
            className="mt-6 flex justify-center lg:justify-start gap-3"
          >
            <a
              className="inline-flex items-center px-5 py-3 rounded-full bg-cyan-400 text-black font-semibold shadow hover:brightness-95 transition"
              href="/services"
            >
              See our services
            </a>
            <a
              className="inline-flex items-center px-4 py-3 rounded-full border border-white/10 text-white/90 hover:bg-white/5 transition"
              href="#team"
            >
              Meet the team
            </a>
          </motion.div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          variants={svgVariants}
          className="order-1 lg:order-2 flex items-center justify-center"
        >
          <div className="w-40 h-40 sm:w-64 sm:h-64 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/6 flex items-center justify-center">
            <Lottie
              animationData={About}
              loop
              autoplay
              className="w-30 h-30 sm:w-64 sm:h-64"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
