import React from "react";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-16"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-900 to-neutral-800" />

      <div className="relative">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Have a project in mind?
            </h2>

            <p className="mt-2 max-w-xl text-neutral-200">
              We design and ship beautiful websites, robust apps, and reliable
              IoT systems. Tell us what you’re building.
            </p>

            {/* Contact Info */}
            <div className="mt-5 space-y-2 text-neutral-300">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                executives@humblesolutions.in
              </p>

              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +91 86859 88991
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            {/* Email Button */}
            <motion.a
              href="mailto:executives@humblesolutions.in?subject=Project%20Inquiry"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-3 font-medium text-neutral-100 shadow-sm transition"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Us
            </motion.a>

            {/* Call Button */}
            <motion.a
              href="tel:+918685988991"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-3 font-medium text-neutral-100 shadow-sm transition"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </motion.a>

          </div>
        </div>
      </div>
    </section>
  );
}
