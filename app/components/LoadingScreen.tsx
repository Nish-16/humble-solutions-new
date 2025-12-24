"use client";

import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-[#0a1a2f] via-[#0a1a2f] to-black text-white">
      <div className="flex flex-col items-center gap-5">
        <img
          src="/Home/logo.png"
          alt="Humble Solutions"
          className="h-10 w-auto"
        />

        <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-cyan-400 animate-spin" />

        <p className="text-sm text-white/70">Loading…</p>
      </div>
    </div>
  );
}
