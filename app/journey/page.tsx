"use client";

import React from "react";
import SmoothScroll from "./SmoothScroll";
import TimelineSection from "./TimelineSection";

// Minimal route entry — timeline implementation and internals
// have been moved to `TimelineSection`, `TimelineItem` and `useScripts`.
export default function JourneyPage() {
  return (
    <SmoothScroll>
      <TimelineSection />
    </SmoothScroll>
  );
}
