"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-gradient-to-r from-[#0a1a2f]/90 via-[#0a1a2f]/80 to-black/90 border-b border-blue-900/30 shadow-xl">
      <div
        ref={navRef}
        className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center"
      >
        <Link href="/">
          <span className="text-2xl font-bold text-blue-400 tracking-wide drop-shadow-lg">
            Humble Solutions
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link href="/">
              <span className="transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-300 text-white font-medium">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/services">
              <span className="transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-300 text-white font-medium">
                Services
              </span>
            </Link>
          </li>
          <li>
            <Link href="/portfolio">
              <span className="transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-300 text-white font-medium">
                Portfolio
              </span>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <span className="transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-300 text-white font-medium">
                About
              </span>
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden flex flex-col space-y-2 px-6 pb-4 animate-fade-in bg-gradient-to-r from-[#0a1a2f]/90 to-[#1a2a4f]/90 backdrop-blur-lg rounded-b-xl shadow-2xl">
          <li>
            <Link href="/" onClick={() => setOpen(false)}>
              <span className="block px-3 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-300 text-white font-medium">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={() => setOpen(false)}>
              <span className="block px-3 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-300 text-white font-medium">
                Services
              </span>
            </Link>
          </li>
          <li>
            <Link href="/portfolio" onClick={() => setOpen(false)}>
              <span className="block px-3 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-300 text-white font-medium">
                Portfolio
              </span>
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setOpen(false)}>
              <span className="block px-3 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-300 text-white font-medium">
                About
              </span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
