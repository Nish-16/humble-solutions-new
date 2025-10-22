"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalaxyBackground from "./GalaxyBackground";

gsap.registerPlugin(ScrollTrigger);

type EarthProps = {
  size?: string;
  textureUrl?: string;
};

type InfoBoxData = {
  id: string;
  title: string;
  description: string;
  position: string; // Tailwind position classes
};

const infoBoxes: InfoBoxData[] = [
  {
    id: "box-1",
    title: "Our Mission",
    description: "To deliver innovative and humble solutions globally.",
    position: "top-16 left-16",
  },
  {
    id: "box-2",
    title: "Our Team",
    description: "A passionate group of developers and designers.",
    position: "top-1/2 left-16 -translate-y-1/2",
  },
  {
    id: "box-3",
    title: "Core Services",
    description: "Web development, UI/UX design, and cloud integration.",
    position: "bottom-16 left-16",
  },
  {
    id: "box-4",
    title: "Our Portfolio",
    description: "Explore our diverse range of successful projects.",
    position: "top-16 right-16",
  },
  {
    id: "box-5",
    title: "Testimonials",
    description: "What our valued clients have to say about us.",
    position: "top-1/2 right-16 -translate-y-1/2",
  },
  {
    id: "box-6",
    title: "Contact Us",
    description: "Let's build something amazing together.",
    position: "bottom-16 right-16",
  },
];

export default function Earth({ size = "h-[80vh]", textureUrl }: EarthProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // === Three.js Setup ===
  useEffect(() => {
    if (!canvasRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let rafId = 0;
    let geometry: THREE.SphereGeometry | null = null;
    let material: THREE.MeshStandardMaterial | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const initThree = () => {
      const container = canvasRef.current!;
      const { width, height } = container.getBoundingClientRect();

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);

      const existingCanvas = container.querySelector("canvas");
      if (existingCanvas) existingCanvas.remove();

      const canvas = renderer.domElement as HTMLCanvasElement;
      canvas.className = "absolute top-0 left-0 w-full h-full z-10";
      container.appendChild(canvas);

      // Scene
      const scene = new THREE.Scene();

      // Note: GalaxyBackground component renders a full-screen starfield behind this canvas.
      // Keep Earth scene focused on the Earth mesh and lights.

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 3.2);

      // Lights
      const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
      scene.add(hemi);

      // Earth
      geometry = new THREE.SphereGeometry(1, 64, 64);
      material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 1,
      });

      if (textureUrl) {
        new THREE.TextureLoader().load(
          textureUrl,
          (tex) => {
            if (material) {
              material.map = tex;
              material.needsUpdate = true;
            }
          },
          undefined,
          () => {
            console.warn("Failed to load Earth texture:", textureUrl);
          }
        );
      }

      const earthMesh = new THREE.Mesh(geometry, material);
      earthMesh.rotation.x = 0.25;
      scene.add(earthMesh);

      // Animation loop
      const animate = () => {
        earthMesh.rotation.y += 0.005;
        renderer!.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      // Resize handling
      resizeObserver = new ResizeObserver(() => {
        const { width: w, height: h } = container.getBoundingClientRect();
        renderer!.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(rafId);
        resizeObserver?.disconnect();
        if (renderer) {
          renderer.domElement.remove();
          renderer.dispose();
        }
        geometry?.dispose();
        material?.map?.dispose();
      };
    };

    const cleanup = initThree();
    return () => cleanup && cleanup();
  }, [textureUrl, size]);

  // === Info Box Animations ===
  useEffect(() => {
    if (!sectionRef.current) return;

    const boxes = sectionRef.current.querySelectorAll<HTMLElement>(".info-box");
    const triggers: ScrollTrigger[] = [];

    boxes.forEach((box, index) => {
      const rect = box.getBoundingClientRect();
      const sectionRect = sectionRef.current!.getBoundingClientRect();

      // Compute position relative to section center
      const startX =
        sectionRect.width / 2 - (rect.left - sectionRect.left + rect.width / 2);
      const startY =
        sectionRect.height / 2 - (rect.top - sectionRect.top + rect.height / 2);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top center",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        box,
        { x: startX, y: startY, scale: 0.5, opacity: 0 },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: index * 0.1,
        }
      );

      // subtle floating effect
      tl.to(
        box,
        { y: "+=10", repeat: -1, yoyo: true, ease: "sine.inOut", duration: 1 },
        "+=0.5"
      );

      triggers.push(tl.scrollTrigger!);
    });

    return () => {
      triggers.forEach((st) => st.kill());
      gsap.killTweensOf(".info-box");
    };
  }, []);

  const boxClasses =
    "info-box absolute w-48 h-32 md:w-64 md:h-40 p-4 bg-black/20 backdrop-blur-md border border-white/20 rounded-lg shadow-lg text-white flex flex-col justify-center items-center text-center z-20";

  return (
    <section
      ref={sectionRef}
      className={`relative w-full ${size} flex items-center justify-center overflow-hidden`}
    >
      {/* Galaxy background sits behind everything */}
      <GalaxyBackground />

      {/* Three.js Canvas */}
      <div
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-10"
      />

      {/* Info Boxes */}
      {infoBoxes.map((box) => (
        <div key={box.id} className={`${boxClasses} ${box.position}`}>
          <div className="w-12 h-1 bg-[#b6e0fe] rounded-full mb-3"></div>
          <h3 className="font-bold text-lg mb-1">{box.title}</h3>
          <p className="text-sm text-gray-200">{box.description}</p>
        </div>
      ))}
    </section>
  );
}
