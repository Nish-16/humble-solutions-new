"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// lottie-react is ~150 KB gzipped. Dynamic import moves it out of the initial bundle.
// The contact JSON is fetched at runtime so it never gets statically bundled.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  // Refs for GSAP animations
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLFormElement | null>(null);

  // Form submission state
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Lazily fetched Lottie data (not bundled at build time)
  const [contactData, setContactData] = useState<object | null>(null);
  useEffect(() => {
    fetch("/Home/contact-email.json")
      .then((r) => r.json())
      .then(setContactData)
      .catch(() => {});
  }, []);

  // Scroll-based GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
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
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side rate limiting (30s)
    const lastSubmit = localStorage.getItem("contact_last_submit");
    if (lastSubmit && Date.now() - Number(lastSubmit) < 30000) {
      alert("Please wait before submitting again.");
      return;
    }

    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot field check
    if (formData.get("company")) return;

    // Basic input validation
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    // Message length protection
    if (message.length > 1000) {
      alert("Message too long");
      setStatus("idle");
      return;
    }

    // Firestore document payload
    const data = {
      name,
      email,
      phone,
      message,
      createdAt: serverTimestamp(),
    };

    try {
      // Write contact data to Firestore
      await addDoc(collection(db, "contacts"), data);

      // Store submit time for rate limiting
      localStorage.setItem(
        "contact_last_submit",
        Date.now().toString()
      );

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Firestore error:", error);
      setStatus("error");
    }
  };

  // Shared input styles
  const inputClass =
    "w-full bg-transparent border border-white placeholder-white outline-none py-2 px-3 rounded";

  return (
    <section
      id="contact"
      className="py-20 lg:py-24 flex items-center justify-center bg-gradient-to-br from-[#2057C5] to-[#9CBDFF] text-white px-4 overflow-x-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div ref={leftRef} className="text-center lg:text-left">
          <h3 className="text-xl font-medium mb-2">
            Got a Project in Mind?
          </h3>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Let’s Make It Happen Together!
          </h1>

          {contactData && (
            <Lottie
              animationData={contactData}
              loop
              className="w-64 md:w-72 mx-auto lg:mx-0 mt-4"
            />
          )}
        </div>

        {/* Contact form */}
        <form
          suppressHydrationWarning
          ref={rightRef}
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-lg mx-auto bg-white/10 backdrop-blur-sm p-6 rounded-xl"
        >
          {/* Honeypot input */}
          <input
            type="text"
            name="company"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

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
              placeholder="+91 XXXXXXXX"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Your Message</label>
            <textarea
              name="message"
              className={`${inputClass} h-24 resize-none`}
              placeholder="Tell us about your project..."
              required
              maxLength={500}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className={`bg-white text-blue-600 px-6 py-2 rounded-full transition ${
              status === "loading"
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            {status === "loading" ? "Sending..." : "Submit"} →
          </button>

          {status === "success" && (
            <p className="text-green-200 text-sm">
              ✅ Thank you! Your message has been sent.
            </p>
          )}

          {status === "error" && (
            <p className="text-red-200 text-sm">
              ❌ Oops! Something went wrong.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
