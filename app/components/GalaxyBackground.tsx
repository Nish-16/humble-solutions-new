"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GalaxyBackground() {
  const threeRef = useRef<HTMLCanvasElement>(null);

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

    // Galaxy/starfield
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

    // Nebula effect
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
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
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
    <canvas
      ref={threeRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
