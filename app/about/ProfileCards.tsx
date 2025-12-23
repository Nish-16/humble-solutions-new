"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ProfileCardProps {
  avatarUrl: string;
  name: string;
  role?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
}

export default function ProfileCard({
  avatarUrl,
  name,
  role = "Member",
  className = "",
  enableTilt = true,
  enableMobileTilt = true,
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  /* ================= STATE ================= */
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ================= MOBILE CHECK ================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ================= TILT LOGIC ================= */
  const requestRef = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const rotation = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !enableTilt) return;

    const rect = () => el.getBoundingClientRect();

    function onMove(e: PointerEvent) {
      const r = rect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      pointer.current.x = (px - 0.5) * 2;
      pointer.current.y = (py - 0.5) * 2;
      if (!requestRef.current)
        requestRef.current = requestAnimationFrame(animate);
    }

    function onLeave() {
      pointer.current.x = 0;
      pointer.current.y = 0;
      if (!requestRef.current)
        requestRef.current = requestAnimationFrame(animate);
    }

    function animate() {
      if (!el) return;
      const tx = -pointer.current.y * 10;
      const ty = pointer.current.x * 10;
      rotation.current.rx += (tx - rotation.current.rx) * 0.12;
      rotation.current.ry += (ty - rotation.current.ry) * 0.12;

      el.style.transform = `perspective(800px) rotateX(${rotation.current.rx}deg) rotateY(${rotation.current.ry}deg) scale3d(1.02,1.02,1.02)`;

      if (
        Math.abs(rotation.current.rx - tx) > 0.001 ||
        Math.abs(rotation.current.ry - ty) > 0.001
      ) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(requestRef.current!);
        requestRef.current = null;
      }
    }

    function onDevice(e: DeviceOrientationEvent) {
      if (!enableMobileTilt || !isMobile) return;
      if (e.gamma == null || e.beta == null) return;
      const gx = Math.max(-30, Math.min(30, e.gamma));
      const by = Math.max(-30, Math.min(30, e.beta - 5));
      pointer.current.x = gx / 30;
      pointer.current.y = by / 30;
      if (!requestRef.current)
        requestRef.current = requestAnimationFrame(animate);
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("deviceorientation", onDevice as EventListener);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("deviceorientation", onDevice as EventListener);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [enableTilt, enableMobileTilt, isMobile]);

  /* ================= RENDER ================= */
  return (
    <motion.div
      ref={cardRef}
      className={`relative w-64 h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-slate-900/20 border border-white/20 backdrop-blur-md ${className}`}
      onMouseEnter={() => !isMobile && setIsActive(true)}
      onMouseLeave={() => !isMobile && setIsActive(false)}
      onClick={() => isMobile && setIsActive((prev) => !prev)}
    >
      {/* Background image */}
      <img
        src={avatarUrl}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end justify-center p-5"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isActive ? 0 : 20,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-center text-white"
        >
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-300">{role}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
