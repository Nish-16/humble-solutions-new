import React from "react";

export default function Features() {
  return (
    <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-full">
      <div className="p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-lg">
        <h4 className="text-cyan-300 font-semibold mb-2">Product Design</h4>
        <p className="text-white/80">
          UX-led design, prototyping, and research.
        </p>
      </div>
      <div className="p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-lg">
        <h4 className="text-cyan-300 font-semibold mb-2">Cloud & Platform</h4>
        <p className="text-white/80">
          Secure, cost-efficient cloud systems that scale.
        </p>
      </div>
      <div className="p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-lg">
        <h4 className="text-cyan-300 font-semibold mb-2">AI & Data</h4>
        <p className="text-white/80">
          Practical ML and data pipelines to unlock insights.
        </p>
      </div>
    </section>
  );
}
