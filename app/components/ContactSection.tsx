"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Lottie from "lottie-react";
import contact from "@/public/Home/contact-email.json";

const ContactSection = () => {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLFormElement | null>(null);

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }
    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }
  }, []);

  const inputClass =
    "w-full max-w-full bg-transparent border border-white placeholder-white outline-none py-2 px-3 rounded";

  return (
    <section
      id="contact"
      className="py-16 md:py-20 lg:py-24 flex items-center justify-center bg-gradient-to-br from-[#2057C5] to-[#9CBDFF] text-white px-4 sm:px-6 lg:px-12 overflow-x-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div ref={leftRef} className="text-center lg:text-left">
          <h3 className="text-xl font-medium mb-2">Got a Project in Mind?</h3>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Let’s Make It Happen Together!
          </h1>
          <Lottie
            animationData={contact}
            loop={true}
            className="w-64 md:w-72 mx-auto lg:mx-0 mt-4"
          />
        </div>
        {/* Right Side (Formspree) */}
        <form
          ref={rightRef}
          action="https://formspree.io/f/mnqkgeav" // 🔹 Replace with your Formspree endpoint
          method="POST"
          onSubmit={() => setStatus("success")}
          className="space-y-6 w-full max-w-lg mx-auto bg-white/10 backdrop-blur-sm p-6 rounded-xl"
        >
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className={inputClass}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email address</label>
            <input
              type="email"
              name="email"
              className={inputClass}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className={inputClass}
              placeholder="+123456789"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Your Message:</label>
            <textarea
              name="message"
              className={`${inputClass} h-24 resize-none`}
              placeholder="Tell us about your project..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-white text-blue-600 px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition duration-300"
          >
            Submit
            <span className="text-lg">→</span>
          </button>

          {/* Success/Error Messages */}
          {status === "success" && (
            <p className="text-green-200 text-sm mt-2">
              ✅ Thank you! Your message has been sent.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-200 text-sm mt-2">
              ❌ Oops! Something went wrong. Try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
