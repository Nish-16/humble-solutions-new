"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Services-specific background. Kept in the `services` folder so it only
// affects the Services page and can be tuned independently from the
// shared `GalaxyBackground` used elsewhere.
const ServicesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020617");
    // Camera placed slightly farther for a more subtle, distant field
    const rect = canvas.getBoundingClientRect();
    const camera = new THREE.PerspectiveCamera(
      60,
      rect.width / Math.max(1, rect.height),
      0.1,
      1000
    );
    camera.position.z = 7;

    // Two-layer particle field for a richer but subtle background
    // Layer A: tiny, dense, pixel-sized stars (screen-space size)
    const layerA = createPoints({
      count: 700,
      radiusMin: 6,
      radiusMax: 14,
      color: 0xbfe9ff,
      sizePx: 0.9,
      sizeAttenuation: false,
    });

    // Layer B: slightly larger, sparser points with slow rotation
    const layerB = createPoints({
      count: 140,
      radiusMin: 8,
      radiusMax: 20,
      color: 0x7bd6ff,
      sizePx: 1.8,
      sizeAttenuation: false,
    });

    scene.add(layerA.points, layerB.points);

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      const t = clock.getElapsedTime();
      // rotate layers at different speeds for depth
      layerA.points.rotation.y = t * 0.015;
      layerB.points.rotation.y = -t * 0.01;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handling
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(r.width));
      const h = Math.max(1, Math.floor(r.height));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      // update pixel-based sizes when DPR or size changes
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      (layerA.material as THREE.PointsMaterial).size = layerA.baseSize * dpr;
      (layerB.material as THREE.PointsMaterial).size = layerB.baseSize * dpr;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      // Dispose geometries/materials
      layerA.geometry.dispose();
      layerB.geometry.dispose();
      layerA.material.dispose();
      layerB.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

function createPoints(opts: {
  count: number;
  radiusMin: number;
  radiusMax: number;
  color: number;
  sizePx: number;
  sizeAttenuation: boolean;
}) {
  const { count, radiusMin, radiusMax, color, sizePx, sizeAttenuation } = opts;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = radiusMin + Math.random() * (radiusMax - radiusMin);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color,
    size: sizePx * Math.min(window.devicePixelRatio || 1, 2),
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation,
  });

  const points = new THREE.Points(geometry, material);

  return { points, geometry, material, baseSize: sizePx } as const;
}

export default ServicesBackground;
