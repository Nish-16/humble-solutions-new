import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function StatsProcess() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            By the numbers
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            <Stat number="45+" label="Projects" />
            <Stat number="12" label="Industries" />
            <Stat number="5★" label="Avg. rating" />
            <Stat number="8+ yrs" label="Experience" />
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            How we work
          </p>
          <ul className="mt-6 space-y-4">
            {[
              "Discover: goals, stakeholders, constraints",
              "Design: UX flows, UI kit, prototypes",
              "Build: clean code, CI/CD, testing",
              "Launch & Scale: observability, iteration",
            ].map((step) => (
              <li key={step} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-neutral-900" />
                <span className="text-neutral-700">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm">
      <div className="text-2xl font-semibold tracking-tight">{number}</div>
      <div className="text-xs text-neutral-500">{label}</div>
    </div>
  );
}
