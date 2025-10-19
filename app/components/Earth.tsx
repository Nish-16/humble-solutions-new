"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type EarthProps = {
  size?: string;
  textureUrl?: string;
};

export default function Earth({ size = "h-[80vh]", textureUrl }: EarthProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // === Three.js Earth + Stars ===
  useEffect(() => {
    if (!ref.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let rafId = 0;
    let geometry: THREE.SphereGeometry | null = null;
    let material: THREE.MeshStandardMaterial | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const init = () => {
      const container = ref.current!;
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);

      // Remove old canvas if exists
      const existing = container.querySelector("canvas");
      if (existing) existing.remove();

      const canvas = renderer.domElement as HTMLCanvasElement;
      canvas.className = "absolute top-0 left-0 w-full h-full";
      container.appendChild(canvas);

      // Scene
      const scene = new THREE.Scene();

      // 🌌 Starfield
      const starCount = 2000;
      const starGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const r = 20 + Math.random() * 50;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        starPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
        starPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        starPositions[i3 + 2] = r * Math.cos(phi);
      }
      starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
      const starMaterial = new THREE.PointsMaterial({
        color: "#b6e0fe",
        size: 0.09,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 3.2);

      // Lighting
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
        new THREE.TextureLoader().load(textureUrl, (tex) => {
          if (material) {
            material.map = tex;
            material.needsUpdate = true;
          }
        });
      }
      const earthMesh = new THREE.Mesh(geometry, material);
      earthMesh.rotation.x = 0.25;
      scene.add(earthMesh);

      // Animate
      const animate = () => {
        earthMesh.rotation.y += 0.005;
        stars.rotation.y += 0.0005;
        stars.rotation.x += 0.0002;
        renderer!.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      // Resize
      resizeObserver = new ResizeObserver(() => {
        const r = container.getBoundingClientRect();
        const w = Math.max(1, Math.floor(r.width));
        const h = Math.max(1, Math.floor(r.height));
        renderer!.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      resizeObserver.observe(container);

      // Cleanup
      return () => {
        cancelAnimationFrame(rafId);
        resizeObserver?.disconnect();
        if (renderer) {
          const c = renderer.domElement;
          if (c && c.parentNode) c.parentNode.removeChild(c);
          renderer.dispose();
        }
        geometry?.dispose();
        (material?.map as any)?.dispose?.();
        starGeometry.dispose();
        starMaterial.dispose();
      };
    };

    const cleanup = init();
    return () => cleanup && cleanup();
  }, [textureUrl, size]);

  // Info box classes
  const boxClasses =
    "info-box absolute w-48 h-32 md:w-64 md:h-40 p-4 bg-black/20 backdrop-blur-md border border-white/20 rounded-lg shadow-lg text-white flex flex-col justify-center items-center text-center";

  // === Animate boxes on scroll ===
  useEffect(() => {
    const boxes = document.querySelectorAll<HTMLElement>(".info-box");

    boxes.forEach((box) => {
      const rect = box.getBoundingClientRect();
      const startX = window.innerWidth / 2 - (rect.left + rect.width / 2);
      const startY = window.innerHeight / 2 - (rect.top + rect.height / 2);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          start: "top 90%", // triggers when top of box reaches 90% of viewport
          toggleActions: "play none none none",
        },
      });

      // Fly in from center
      tl.fromTo(
        box,
        { x: startX, y: startY, scale: 0.5, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
      );

      // Floating effect after entrance
      tl.to(
        box,
        { y: "+=10", repeat: -1, yoyo: true, ease: "sine.inOut", duration: 2 },
        "+=0.5"
      );
    });

    // Refresh ScrollTrigger after layout
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(".info-box");
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        ref={ref}
        className={`relative w-full ${size} flex items-center justify-center`}
      />

      {/* --- Info Boxes --- */}
      <div id="box-1" className={`${boxClasses} top-16 left-16`}>
        <h3 className="font-bold text-lg mb-1">Our Mission</h3>
        <p className="text-sm text-gray-300">
          To deliver innovative and humble solutions globally.
        </p>
      </div>
      <div id="box-2" className={`${boxClasses} top-1/2 left-16 -translate-y-1/2`}>
        <h3 className="font-bold text-lg mb-1">Our Team</h3>
        <p className="text-sm text-gray-300">
          A passionate group of developers and designers.
        </p>
      </div>
      <div id="box-3" className={`${boxClasses} bottom-16 left-16`}>
        <h3 className="font-bold text-lg mb-1">Core Services</h3>
        <p className="text-sm text-gray-300">
          Web development, UI/UX design, and cloud integration.
        </p>
      </div>
      <div id="box-4" className={`${boxClasses} top-16 right-16`}>
        <h3 className="font-bold text-lg mb-1">Our Portfolio</h3>
        <p className="text-sm text-gray-300">
          Explore our diverse range of successful projects.
        </p>
      </div>
      <div id="box-5" className={`${boxClasses} top-1/2 right-16 -translate-y-1/2`}>
        <h3 className="font-bold text-lg mb-1">Testimonials</h3>
        <p className="text-sm text-gray-300">
          What our valued clients have to say about us.
        </p>
      </div>
      <div id="box-6" className={`${boxClasses} bottom-16 right-16`}>
        <h3 className="font-bold text-lg mb-1">Contact Us</h3>
        <p className="text-sm text-gray-300">
          Let's build something amazing together.
        </p>
      </div>
    </div>
  );
}
