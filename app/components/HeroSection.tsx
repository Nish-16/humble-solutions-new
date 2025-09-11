"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

const HeroSection: React.FC = () => {
  const threeRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // === Three.js Galaxy Background ===
  useEffect(() => {
    if (!threeRef.current) return;

    const renderer = new THREE.WebGLRenderer({ canvas: threeRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Stars
    const starCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#b6e0fe",
      size: 0.03,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      stars.rotation.y = elapsed * 0.05;
      stars.rotation.x = elapsed * 0.02;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // === GSAP Text Animation (transform only, no opacity) ===
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.8 } });
      tl.from(".gsap-hero-title", { y: 60, scale: 0.92 })
        .from(".gsap-hero-desc", { y: 40, stagger: 0.18 }, "-=1.5")
        .from(".gsap-cta", { y: 30, scale: 0.95 }, "-=1.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden"
    >
      <canvas
        ref={threeRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        style={{ transform: "translateZ(0)" }} // GPU acceleration
      >
        <h1
          className="gsap-hero-title text-4xl sm:text-7xl md:text-8xl font-bold mb-7 drop-shadow-lg"
          style={{
            background: "linear-gradient(to right, #38bdf8, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "#38bdf8", // fallback for safety
          }}
        >
          Humble Solutions
        </h1>
        <p className="gsap-hero-desc text-lg sm:text-2xl max-w-2xl text-center mb-6 text-white/80">
          Transforming Ideas into Intuitive Digital Experiences.
        </p>
        <p className="gsap-hero-desc text-base sm:text-xl max-w-2xl text-center mb-10 text-white/60">
          We use technology to solve real-world problems for businesses and people. Innovation, efficiency, and impact—delivered.
        </p>
        <a
          href="#services"
          className="gsap-cta px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-lg font-semibold shadow-lg transition-colors mt-5"
        >
          See Our Solutions
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
