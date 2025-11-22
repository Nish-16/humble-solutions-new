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
import SmoothScroll from "../journey/SmoothScroll";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#020617] ">
      <GalaxyBackground />
      <SmoothScroll />
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
