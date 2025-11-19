"use client";
import Lottie from "lottie-react";
import about from "@/public/about/about-1.json"; 
import React from "react";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const boxVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mt-10 relative bg-black/30 backdrop-blur-lg border border-cyan-400/8 rounded-3xl p-3 sm:p-12 shadow-2xl flex flex-col items-center justify-center min-h-[24rem] text-justify"
    >
      {/* Decorative accent */}
      <div className="pointer-events-none absolute -inset-6 rounded-3xl blur-3xl opacity-10 bg-gradient-to-br from-cyan-400 to-blue-500" />

      {/* Heading */}
      <motion.h1
        variants={textVariants}
        className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-10 "
      >
        Humble Solutions
      </motion.h1>

      {/* Content */}
      <div className="relative max-w-6xl w-full flex flex-col lg:flex-row items-center gap-10">
        
        {/* Text Section */}
        <motion.div variants={textVariants} className="flex-1 text-center lg:text-left">
          <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto lg:mx-0 ">
            We build elegant, reliable software and cloud systems that help
            teams move faster. Design-forward, pragmatic, and focused on
            measurable outcomes.
          </p>

          <p className="mt-3 text-base sm:text-lg text-white/70 max-w-3xl mx-auto lg:mx-0">
            Our mission is to craft meaningful digital experiences through
            simplicity and innovation — blending creativity, technology, and
            strategy to bring ideas to life.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            
          </div>
        </motion.div>

        {/* Preview / Lottie */}
        <motion.div variants={boxVariants} className="w-full sm:w-80 lg:w-96 mx-auto">
          <div className="rounded-2xl p-4 bg-gradient-to-br from-cyan-400/6 to-blue-500/6 border border-cyan-400/6 shadow-xl transform transition-all hover:-translate-y-1">
            <div className="p-2 bg-black/10 rounded-xl h-44 sm:h-56 flex items-center justify-center">
              <Lottie 
                animationData={about}
                loop
                autoplay
              />
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
