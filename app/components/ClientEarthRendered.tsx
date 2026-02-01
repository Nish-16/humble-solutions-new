"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Earth = dynamic(() => import("./Earth"), {
  ssr: false,
});

export default function ClientEarthRendered() {
  const [showEarth, setShowEarth] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const timer = window.setTimeout(() => {
      if (mq.matches) setShowEarth(true);
    }, 1800); // delay heavy 3D load

    return () => window.clearTimeout(timer);
  }, []);

  if (!showEarth) return null;
  return <Earth size="h-[100vh]" />;
}
