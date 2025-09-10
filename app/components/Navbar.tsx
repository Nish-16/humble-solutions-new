"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg mb-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-extrabold text-2xl tracking-tight text-cyan-400 drop-shadow-lg">
          Humble Solutions
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link href="/">
              <span className="transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 text-white font-medium">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/services">
              <span className="transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 text-white font-medium">
                Services
              </span>
            </Link>
          </li>
          <li>
            <Link href="/portfolio">
              <span className="transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 text-white font-medium">
                Portfolio
              </span>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <span className="transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 text-white font-medium">
                About
              </span>
            </Link>
          </li>
        </ul>
        {/* Hamburger Icon */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
        <ul className="md:hidden flex flex-col space-y-2 px-6 pb-4 animate-fade-in bg-white/10 backdrop-blur-lg rounded-b-xl shadow-lg">
          <li>
            <Link href="/" onClick={() => setOpen(false)}>
              <span className="block px-3 py-2 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 text-white font-medium">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={() => setOpen(false)}>
              <span className="block px-3 py-2 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 text-white font-medium">
                Services
              </span>
            </Link>
          </li>
          <li>
            <Link href="/portfolio" onClick={() => setOpen(false)}>
              <span className="block px-3 py-2 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 text-white font-medium">
                Portfolio
              </span>
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setOpen(false)}>
              <span className="block px-3 py-2 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 text-white font-medium">
                About
              </span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
