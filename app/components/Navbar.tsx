"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Animate on mount or pathname change (client only)
  const animateNavbar = () => {
    if (typeof window !== "undefined" && navRef.current) {
      gsap.set(navRef.current, { y: -40, opacity: 0 });
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
      });
    }
  };

  // Use useEffect to trigger animation

  useEffect(() => {
    animateNavbar();
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-gradient-to-r from-[#0a1a2f]/90 via-[#0a1a2f]/80 to-black/90 border-b border-blue-900/30 shadow-xl"
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-blue-400 tracking-wide drop-shadow-lg">
            Humble Solutions
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {["/", "/services", "/portfolio", "/about"].map((path, i) => {
            const name =
              path === "/"
                ? "Home"
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <li key={i}>
                <Link href={path}>
                  <span className="transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-300 text-white font-medium">
                    {name}
                  </span>
                </Link>
              </li>
            );
          })}
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
          {["/", "/services", "/portfolio", "/about"].map((path, i) => {
            const name =
              path === "/"
                ? "Home"
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <li key={i}>
                <Link href={path} onClick={() => setOpen(false)}>
                  <span className="block px-3 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-300 text-white font-medium">
                    {name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
