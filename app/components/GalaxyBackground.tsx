"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    });
    // Cap DPR at 1.5 on mobile (saves 44% GPU fill-rate vs. native 3×).
    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020617");
    const rect = canvas.getBoundingClientRect();
    const camera = new THREE.PerspectiveCamera(
      75,
      rect.width / Math.max(1, rect.height),
      0.1,
      1000
    );
    camera.position.z = 5;

    // Fewer stars on mobile: 400 vs 1000 reduces vertex processing by 60%.
    const starCount = isMobile ? 400 : 1000;
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
    let running = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!running) return;
      const elapsed = clock.getElapsedTime();
      stars.rotation.y = elapsed * 0.05;
      stars.rotation.x = elapsed * 0.02;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running) return;
      running = true;
      animate();
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    // Pause rAF when browser tab is hidden — saves CPU on background tabs
    const onVisibilityChange = () => {
      document.hidden ? stop() : start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Pause rAF when canvas is scrolled out of viewport
    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? start() : stop(); },
      { rootMargin: "50px" }
    );
    io.observe(canvas);

    animate();

    // Resize renderer to the actual canvas layout size to avoid oversized drawing buffer
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(r.width));
      const h = Math.max(1, Math.floor(r.height));
      // setSize with updateStyle=false so we don't overwrite CSS sizing (we keep w-full/h-full)
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    // Observe size changes of the canvas (or its container)
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // initial resize
    resize();

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      io.disconnect();
      ro.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default GalaxyBackground;
