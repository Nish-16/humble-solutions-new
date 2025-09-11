"use client";

import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import GalaxyBackground from "./components/GalaxyBackground";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import TimelineSection from "./components/Timeline";
import FooterSection from "./components/FooterSection";
import gsap from "gsap";
import * as THREE from "three";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLCanvasElement>(null);

  // === GSAP Animations ===
  useEffect(() => {
    gsap.from(".gsap-hero-title", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
    gsap.from(".gsap-hero-desc", {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power4.out",
    });
    gsap.from(".gsap-cta", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power4.out",
    });
    gsap.from(".gsap-section", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      delay: 1,
      ease: "power4.out",
    });
  }, []);

  // === Three.js Galaxy Background ===
  useEffect(() => {
    if (!threeRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: threeRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1200;
    const positions: number[] = [];
    for (let i = 0; i < starCount; i++) {
      const r = 8 + Math.random() * 8;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: "#b6e0fe",
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Nebula
    const nebulaGeometry = new THREE.SphereGeometry(3.5, 32, 32);
    const nebulaMaterial = new THREE.MeshBasicMaterial({
      color: "#38bdf8",
      transparent: true,
      opacity: 0.18,
    });
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    // Animate
    let frameId: number;
    const animate = () => {
      stars.rotation.y += 0.0008;
      stars.rotation.x += 0.0003;
      nebula.rotation.y += 0.0005;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler (🔥 fully responsive now)
    const handleResize = () => {
      if (!threeRef.current) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
    };
  }, []);

  // === JSX ===
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] to-black text-white relative z-10">
        <HeroSection />
        <TimelineSection />
        <AboutSection />
        <ServicesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FooterSection />
      </div>
    </div>
  );
}
