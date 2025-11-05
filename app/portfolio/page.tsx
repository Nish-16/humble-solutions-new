"use client";
import React from "react";
import Navbar from "./../components/Navbar";
import GalaxyBackground from "./GalaxyBackground";
import Hero from "./Hero";
import Services from "./Services";
import ProjectsGrid from "./ProjectGrid";
import StatsProcess from "./StatsProcess";
import CTA from "./CTA";
import Footer from "./../components/FooterSection";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] ">
      <GalaxyBackground />
      <Navbar />
      <Hero />
      <Services />
      <ProjectsGrid />
      <StatsProcess />
      <CTA />
      <Footer />
    </div>
  );
}
