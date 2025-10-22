"use client";
import React from "react";

export default function ServicesExtras() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-6">
      <div className="bg-white/3 rounded-2xl p-8 sm:p-10 backdrop-blur-sm border border-white/6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-white">How we work</h3>
            <p className="mt-4 text-white/75">
              We start with a short discovery phase to align on outcomes, then
              iterate quickly with working software. Our teams combine design,
              engineering, and product thinking so you get a pragmatic,
              production-ready result.
            </p>

            <ol className="mt-6 space-y-4 text-white/70 list-decimal list-inside">
              <li>Discovery — align goals, users, and constraints.</li>
              <li>Prototype — validate ideas with minimal risk.</li>
              <li>Build & iterate — ship features with automated testing.</li>
              <li>
                Operate — monitoring, maintenance, and ongoing improvements.
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">
              Frequently asked
            </h3>

            <div className="mt-4 space-y-4">
              <details className="bg-white/2 rounded-md p-4">
                <summary className="cursor-pointer font-medium text-white">
                  How long does a typical engagement last?
                </summary>
                <p className="mt-2 text-white/70">
                  Engagements vary — small projects can finish in weeks, while
                  strategic platform work is measured in months. We scope to
                  deliver value early.
                </p>
              </details>

              <details className="bg-white/2 rounded-md p-4">
                <summary className="cursor-pointer font-medium text-white">
                  Do you offer post-launch support?
                </summary>
                <p className="mt-2 text-white/70">
                  Yes — we provide monitoring, patching, and prioritized
                  maintenance plans so your product stays reliable.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
