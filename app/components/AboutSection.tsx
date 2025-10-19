'use client'; // This directive is essential for components using hooks in Next.js App Router

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const threeCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current!,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            });

            // Animate card, heading, line, and text
            tl.from(cardRef.current, { opacity: 0, scale: 0.9, duration: 1, ease: "power3.out" })
              .from(titleRef.current, { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
              .from(lineRef.current, { scaleX: 0, transformOrigin: "center", duration: 0.6, ease: "power2.out" }, "-=0.6")
              .from(textRef.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
        }, sectionRef);

        return () => ctx.revert();

    }, []);

    useEffect(() => {
        if (!threeCanvasRef.current) return;

        const canvas = threeCanvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setSize(260, 260);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
        camera.position.z = 3.5;

        // Glowing sphere
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: "#38bdf8",
            emissive: "#38bdf8",
            emissiveIntensity: 0.6,
            metalness: 0.7,
            roughness: 0.25,
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x38bdf8, 1.5, 10);
        pointLight.position.set(2, 2, 4);
        scene.add(pointLight);

        let frameId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            sphere.rotation.y = elapsedTime * 0.3;
            sphere.rotation.x = elapsedTime * 0.2;
            
            const pulse = (Math.sin(elapsedTime * 2) + 1) / 2; // 0 to 1
            material.emissiveIntensity = 0.4 + pulse * 0.6;
            
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative flex flex-col items-center justify-center px-6 sm:px-12 py-20 bg-gray-900 overflow-hidden"
            id="about"
        >
             {/* Subtle glowing background accents */}
             <div className="absolute top-1/4 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
             <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>

            <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16 w-full max-w-6xl mx-auto">
                <div className="flex-shrink-0 mb-8 md:mb-0 order-first md:order-last">
                    <div className="rounded-full shadow-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/10 p-2">
                        <canvas
                            ref={threeCanvasRef}
                            style={{ width: 260, height: 260, display: "block" }}
                        />
                    </div>
                </div>
                <div
                    ref={cardRef}
                    className="relative max-w-2xl w-full text-center md:text-left bg-black/20 p-10 sm:p-12 rounded-3xl shadow-2xl border border-cyan-400/20 backdrop-blur-xl"
                >
                    <h2
                        ref={titleRef}
                        className="text-3xl sm:text-5xl font-extrabold text-cyan-400 drop-shadow-lg"
                    >
                        About Us
                    </h2>
                    <div
                        ref={lineRef}
                        className="mx-auto md:mx-0 my-6 h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    />
                    <p
                        ref={textRef}
                        className="text-lg sm:text-xl text-white/80 leading-relaxed tracking-wide"
                    >
                        Humble Solutions is a technology-driven company passionate about
                        solving complex challenges. Our team leverages the latest in AI,
                        cloud, and web technologies to deliver scalable, robust, and
                        user-friendly solutions.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

