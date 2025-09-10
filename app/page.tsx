"use client";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import GalaxyBackground from "./components/GalaxyBackground";
import gsap from "gsap";
import * as THREE from "three";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLCanvasElement>(null);

  // GSAP Animations
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

  // Three.js Galaxy Background
  useEffect(() => {
    if (!threeRef.current) return;
    const renderer = new THREE.WebGLRenderer({
      canvas: threeRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, 420);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 420,
      0.1,
      1000
    );
    camera.position.z = 6;

    // Create galaxy/starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1200;
    const positions = [];
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

    // Add a glowing nebula effect
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

    // Responsive
    const handleResize = () => {
      if (!threeRef.current) return;
      renderer.setSize(window.innerWidth, 420);
      camera.aspect = window.innerWidth / 420;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
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

  return (
    <>
  <GalaxyBackground />
  <Navbar />
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0a0a] to-[#171717] text-white relative z-10">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative flex flex-col items-center justify-center h-[420px] w-full overflow-hidden"
        >
          <canvas
            ref={threeRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h1 className="gsap-hero-title text-4xl sm:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Humble Solutions
            </h1>
            <p className="gsap-hero-desc text-lg sm:text-2xl max-w-xl text-center mb-8 text-white/80">
              We use technology to solve real-world problems for businesses and
              people. Innovation, efficiency, and impact—delivered.
            </p>
            <a
              href="#services"
              className="gsap-cta px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-lg font-semibold shadow-lg transition-colors"
            >
              See Our Solutions
            </a>
          </div>
        </section>
        {/* About Section */}
        <section
          className="gsap-section py-16 px-4 sm:px-12 max-w-4xl mx-auto text-center"
          id="about"
        >
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-cyan-400">
            About Us
          </h2>
          <p className="text-base sm:text-lg text-white/80">
            Humble Solutions is a technology-driven company passionate about
            solving complex challenges. Our team leverages the latest in AI,
            cloud, and web technologies to deliver scalable, robust, and
            user-friendly solutions.
          </p>
        </section>
        {/* Services Section */}
        <section
          className="gsap-section py-16 px-4 sm:px-12 max-w-5xl mx-auto"
          id="services"
        >
          <h2 className="text-2xl sm:text-4xl font-bold mb-8 text-cyan-400 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#171717] rounded-xl p-8 shadow-lg border border-cyan-900/30 flex flex-col items-center">
              <svg
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                className="mb-4 text-cyan-400"
              >
                <path
                  d="M12 2v20M2 12h20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Custom Software</h3>
              <p className="text-white/70">
                Tailored web, mobile, and cloud solutions to fit your business
                needs.
              </p>
            </div>
            <div className="bg-[#171717] rounded-xl p-8 shadow-lg border border-cyan-900/30 flex flex-col items-center">
              <svg
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                className="mb-4 text-cyan-400"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">AI & Automation</h3>
              <p className="text-white/70">
                Leverage AI and automation to streamline operations and boost
                productivity.
              </p>
            </div>
            <div className="bg-[#171717] rounded-xl p-8 shadow-lg border border-cyan-900/30 flex flex-col items-center">
              <svg
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                className="mb-4 text-cyan-400"
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Consulting</h3>
              <p className="text-white/70">
                Expert advice to help you navigate digital transformation and
                tech strategy.
              </p>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="py-8 text-center text-white/60 text-sm mt-auto">
          &copy; {new Date().getFullYear()} Humble Solutions. All rights
          reserved.
        </footer>
      </div>
    </>
  );
}
