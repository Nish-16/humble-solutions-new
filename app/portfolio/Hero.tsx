import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const onContactClick = () => {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative isolate">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left=1/2 top-[-10%] h-64 w-[60rem] -translate-x-1/2 rounded-full  blur-3xl" />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-10 pt-20 text-center md:pb-20 md:pt-28 ">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl "
        >
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-slate-100 to-teal-300">We craft clean, modern digital products</p>
        </motion.h1>
        <p className="mt-5 max-w-2xl text-pretty text-neutral-600 md:text-lg">
          Websites, mobile apps, and IoT systems built with attention to detail
          and a focus on real business outcomes.
        </p>
      </div>
    </section>
  );
}
