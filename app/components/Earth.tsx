"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
// Fix: Use CDN URLs for GSAP imports
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type EarthProps = {
  size?: string; 
  textureUrl?: string;
};

export default function Earth({ size = "h-[80vh]", textureUrl }: EarthProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);

      const existing = container.querySelector("canvas");
      if (existing) existing.remove();

      const canvas = renderer.domElement as HTMLCanvasElement;
      canvas.className = "absolute top-0 left-0 w-full h-full";
      container.appendChild(canvas);
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 3.2);
      
      const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
      scene.add(hemi);
      
      geometry = new THREE.SphereGeometry(1, 64, 64);
      material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.1, roughness: 1 });
      
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

      const animate = () => {
        if (!renderer) return;
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();
      
      let rotateTween: gsap.core.Tween | null = null;
      try {
        gsap.registerPlugin(ScrollTrigger);

        rotateTween = gsap.to(earthMesh.rotation, {
          y: "+=6.28318",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // =================================================================
        // FIX: Corrected Animation Logic
        // =================================================================
        
        // Initial state: centered, scaled down, and invisible
        gsap.set(".info-box", { 
          opacity: 0, 
          scale: 0,
          xPercent: -50, // Center horizontally via transform
          yPercent: -50, // Center vertically via transform
          top: '40%',
          left: '50%',
        });
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "top 30%",
            scrub: 1.5,
          },
        });

        // Animate each box to its final position, ensuring final opacity is 1
        tl.to("#box-1", { opacity: 1, scale: 1, top: '4rem', left: '8rem', xPercent: 0, yPercent: 0 })
          .to("#box-2", { opacity: 1, scale: 1, top: '50%', left: '8rem', xPercent: 0, yPercent: -50 },)
          .to("#box-3", { opacity: 1, scale: 1, bottom: '4rem', top: 'auto', left: '8rem', xPercent: 0, yPercent: 0 })
          .to("#box-4", { opacity: 1, scale: 1, top: '4rem', right: '8rem', left: 'auto', xPercent: 0, yPercent: 0 })
          .to("#box-5", { opacity: 1, scale: 1, top: '50%', right: '8rem', left: 'auto', xPercent: 0, yPercent: -50 })
          .to("#box-6", { opacity: 1, scale: 1, bottom: '4rem', top: 'auto', right: '8rem', left: 'auto', xPercent: 0, yPercent: 0 });

      } catch (e) {
          console.error("GSAP or ScrollTrigger error:", e);
      }

      resizeObserver = new ResizeObserver(() => {
        if (!renderer) return;
        const r = container.getBoundingClientRect();
        const w = Math.max(1, Math.floor(r.width));
        const h = Math.max(1, Math.floor(r.height));
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      resizeObserver.observe(container);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        resizeObserver?.disconnect();
        if (rotateTween) rotateTween.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        if (renderer) {
          const c = renderer.domElement;
          if (c && c.parentNode) c.parentNode.removeChild(c);
          renderer.dispose();
        }
        geometry?.dispose();
        (material?.map as any)?.dispose?.();
      };
    };

    const cleanup = init();
    return () => cleanup && cleanup();
  }, [textureUrl, size]);

  const boxClasses = "info-box absolute w-48 h-32 md:w-64 md:h-40 p-4 bg-black/20 backdrop-blur-md border border-white/20 rounded-lg shadow-lg text-white flex flex-col justify-center items-center text-center transition-colors duration-300 hover:bg-black/30";

  return (
    <>
      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
        <div
          ref={ref}
          className={`relative w-full ${size} flex items-center justify-center`}
        />

        {/* --- Text Boxes with IDs --- */}
        <div id="box-1" className={boxClasses}>
          <h3 className="font-bold text-lg mb-1">Our Mission</h3>
          <p className="text-sm text-gray-300">To deliver innovative and humble solutions globally.</p>
        </div>
        <div id="box-2" className={boxClasses}>
          <h3 className="font-bold text-lg mb-1">Our Team</h3>
          <p className="text-sm text-gray-300">A passionate group of developers and designers.</p>
        </div>
        <div id="box-3" className={boxClasses}>
          <h3 className="font-bold text-lg mb-1">Core Services</h3>
          <p className="text-sm text-gray-300">Web development, UI/UX design, and cloud integration.</p>
        </div>
        <div id="box-4" className={boxClasses}>
          <h3 className="font-bold text-lg mb-1">Our Portfolio</h3>
          <p className="text-sm text-gray-300">Explore our diverse range of successful projects.</p>
        </div>
        <div id="box-5" className={boxClasses}>
          <h3 className="font-bold text-lg mb-1">Testimonials</h3>
          <p className="text-sm text-gray-300">What our valued clients have to say about us.</p>
        </div>
        <div id="box-6" className={boxClasses}>
          <h3 className="font-bold text-lg mb-1">Contact Us</h3>
          <p className="text-sm text-gray-300">Let's build something amazing together.</p>
        </div>
      </div>
    </>    
  );
}

