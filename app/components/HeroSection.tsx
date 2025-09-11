"use client"; // This directive is essential for components using hooks in Next.js App Router

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

const HeroSection: React.FC = () => {
  const threeRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Three.js Galaxy Background Effect
  useEffect(() => {
    if (!threeRef.current) return;

    const canvas = threeRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
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

    // Galaxy/starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
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

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: "#b6e0fe",
      size: 0.02,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Animate
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      stars.rotation.y = elapsedTime * 0.05;
      stars.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Responsive
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
    };
  }, []);

  // GSAP Text and CTA Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 2 } });
      tl.from(".gsap-hero-title", { opacity: 0, y: 60, scale: 0.92 })
        .from(".gsap-hero-desc", { opacity: 0, y: 40, stagger: 0.18 }, "-=1.5")
        .from(".gsap-cta", { opacity: 0, y: 30, scale: 0.95 }, "-=1.2");
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
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="gsap-hero-title text-4xl sm:text-7xl md:text-8xl font-bold  mb-7 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          Humble Solutions
        </h1>
        <p className="gsap-hero-desc text-lg sm:text-2xl max-w-2xl text-center mb-6 text-white/80">
          Transforming Ideas into Intuitive Digital Experiences.
        </p>
        <p className="gsap-hero-desc text-base sm:text-xl max-w-2xl text-center mb-10 text-white/60">
          We use technology to solve real-world problems for businesses and
          people. Innovation, efficiency, and impact—delivered.
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
