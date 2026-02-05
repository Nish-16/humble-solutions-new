"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Earth = dynamic(() => import("./Earth"), {
  ssr: false,
});

export default function ClientEarthRendered() {
  const [showEarth, setShowEarth] = useState(false);

  useEffect(() => {
    // Only render on large screens (Tailwind `lg` and up): laptops/desktops.
    const mq = window.matchMedia("(min-width: 1024px)");
    let timer: number | undefined;

    const update = () => {
      if (timer) window.clearTimeout(timer);

      if (mq.matches) {
        timer = window.setTimeout(() => setShowEarth(true), 1800); // delay heavy 3D load
      } else {
        setShowEarth(false);
      }
    };

    update();

    // Safari <= 13 uses addListener/removeListener
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => {
        if (timer) window.clearTimeout(timer);
        mq.removeEventListener("change", update);
      };
    }

    mq.addListener(update);
    return () => {
      if (timer) window.clearTimeout(timer);
      mq.removeListener(update);
    };
  }, []);

  if (!showEarth) return null;
  return <Earth size="h-[100vh]" />;
}
