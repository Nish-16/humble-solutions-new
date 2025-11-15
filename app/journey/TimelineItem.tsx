"use client";
import Lottie from "lottie-react";
import React, { memo, useEffect, useState } from "react";
import { TimelineItemData } from "../components/data/Timeline_data";
import Navbar from "../components/Navbar";

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
}

const TimelineItemComponent: React.FC<TimelineItemProps> = ({ item, index }) => {
  const isEven = index % 2 === 0;

  // We'll fetch the Lottie JSON from the public folder at runtime.
  // Public files are available at "/<filename>" so "/Journey/<filename>" works.
  const [sideAnimation, setSideAnimation] = useState<unknown | null>(null);
  const [cardAnimation, setCardAnimation] = useState<unknown | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!item.image) {
      setSideAnimation(null);
      return;
    }

    fetch(`/Journey/${item.image}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load animation");
        return res.json();
      })
      .then((data) => {
        if (mounted) setSideAnimation(data);
      })
      .catch(() => {
        if (mounted) setSideAnimation(null);
      });

    return () => {
      mounted = false;
    };
  }, [item.image]);

  useEffect(() => {
    let mounted = true;
    if (!item.cardIcon) {
      setCardAnimation(null);
      return;
    }

    fetch(`/Journey/${item.cardIcon}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load card animation");
        return res.json();
      })
      .then((data) => {
        if (mounted) setCardAnimation(data);
      })
      .catch(() => {
        if (mounted) setCardAnimation(null);
      });

    return () => {
      mounted = false;
    };
  }, [item.cardIcon]);

  return (
    <div className="timeline-item relative pl-12 sm:pl-0 sm:mb-24 last:mb-0">
      <Navbar />

      <div
        className={`flex flex-col sm:flex-row ${
          isEven ? "" : "sm:flex-row-reverse"
        } items-center gap-8`}
      >
        {/* Side Lottie (replaces image) */}
        {item.image ? (
          <div className="sm:w-1/2 flex justify-center items-center">
            {sideAnimation ? (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore - lottie-react accepts the JSON object; we fetched it at runtime
              <Lottie
                animationData={sideAnimation}
                loop
                autoplay
                className="w-46 h-46 sm:w-75 sm:h-75 transition-transform duration-300 hover:scale-105"
              />
            ) : (
              // fallback while loading
              <div className="w-46 h-46 sm:w-75 sm:h-75" />
            )}
          </div>
        ) : (
          <div className="sm:w-1/2"></div>
        )}

        {/* Timeline Icon */}
        <div className="absolute left-4 sm:left-1/2 top-1 -translate-x-1/2 z-10">
          <div className="timeline-icon w-16 h-16 rounded-full bg-gray-900 border-2 border-cyan-400 flex items-center justify-center shadow-lg">
            <div className="text-4xl">{item.icon}</div>
          </div>
        </div>

        {/* Content Card */}
        <div className="timeline-content w-full sm:w-1/2 sm:mt-0">
          <div className="bg-gray-900/60 backdrop-blur-md p-8 rounded-xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-cyan-500/20 flex flex-col items-center">
            <span className="text-base font-semibold text-cyan-400 tracking-wider mb-2">
              {item.year}
            </span>

            {/* Card Lottie (replaces cardIcon emoji) */}
            {item.cardIcon && (
              <div className="w-30 h-30 sm:w-40 sm:h-40">
                {cardAnimation ? (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore - lottie-react accepts the JSON object; we fetched it at runtime
                  <Lottie animationData={cardAnimation} loop autoplay />
                ) : (
                  <div className="w-30 h-30 sm:w-40 sm:h-40" />
                )}
              </div>
            )}

            <h3 className="text-2xl font-bold mt-2 mb-3 text-white text-center">
              {item.title}
            </h3>

            <p className="text-gray-300 text-base leading-relaxed mb-3 text-center">
              {item.description}
            </p>

            <p className="text-gray-400 text-sm leading-relaxed text-center">
              {item.details}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = memo(TimelineItemComponent);
TimelineItem.displayName = "TimelineItem";

export default TimelineItem;
