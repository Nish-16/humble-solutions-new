import React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsProcess() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-neutral-200 bg-gray-800 p-8 shadow-sm"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            By the numbers
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <Stat number="10+" label="Projects" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              <Stat number="6" label="Industries" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              <Stat number="5★" label="Avg. rating" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              <Stat number="2+ yrs" label="Experience" />
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="rounded-2xl border border-neutral-200 bg-gray-800 p-8 shadow-sm"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            How we work
          </p>
          <ul className="mt-6 space-y-4">
            {[
              "Discover: goals, stakeholders, constraints",
              "Design: UX flows, UI kit, prototypes",
              "Build: clean code, CI/CD, testing",
              "Launch & Scale: observability, iteration",
            ].map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-neutral-100" />
                <span className="text-neutral-300">{step}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border border-neutral-700 bg-gray-900 p-4 text-center shadow-sm">
      <div className="text-2xl font-semibold tracking-tight text-neutral-100">
        {number}
      </div>
      <div className="text-xs text-neutral-400">{label}</div>
    </div>
  );
}
