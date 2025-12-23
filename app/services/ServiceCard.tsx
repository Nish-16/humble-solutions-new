"use client";
import React, { useRef } from "react";

type Service = {
  id: string;
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

type Props = {
  service: Service;
  index: number;
  setRef?: (el: HTMLDivElement | null, i: number) => void;
};

export default function ServiceCard({ service, index, setRef }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const IconNode = service.icon ?? (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2v20M2 12h20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        if (setRef) setRef(el, index);
      }}
      aria-labelledby={`${service.id}-title`}
      tabIndex={0}
      className="
        relative
        rounded-2xl
        p-6 sm:p-8
        flex flex-col gap-4
        bg-white/3
        border border-white/6
        shadow-2xl
        min-h-[220px]
      "
    >
      <div className="flex items-center gap-4">
        <div className="flex-none w-14 h-14 sm:w-16 sm:h-16 rounded-lg text-cyan-300 flex items-center justify-center">
          <div className="w-9 h-9 sm:w-18 sm:h-18">
            {IconNode}
          </div>
        </div>

        <div className="flex-1">
          <h3
            id={`${service.id}-title`}
            className="text-lg sm:text-xl font-semibold text-white"
          >
            {service.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-white/75">
            {service.desc}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-white/6 flex items-center justify-between gap-4">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-black font-medium shadow-sm"
        >
          Learn more
        </a>

        <a
          href="#"
          className="text-white/40"
          aria-hidden
        >
          Explore →
        </a>
      </div>
    </div>
  );
}
