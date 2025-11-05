"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import GooeyNav from "./UI/GooeyNav";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Journey", href: "/journey" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // GSAP entrance
  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { y: -40, opacity: 0 });
      gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" });
    }, navRef);
    return () => ctx.revert();
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close mobile on Esc / outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-gradient-to-r from-[#0a1a2f]/90 via-[#0a1a2f]/80 to-black/90 border-b border-blue-900/30 shadow-xl"
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" aria-label="Go to home">
          <span className="text-2xl font-bold text-blue-400 tracking-wide drop-shadow-lg">
            Humble Solutions
          </span>
        </Link>

        {/* Desktop: Gooey nav (hover) */}
        <div className="hidden md:block">
          <GooeyNav items={NAV_ITEMS} />
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul
          id="mobile-menu"
          className="md:hidden flex flex-col space-y-2 px-6 pb-4 bg-gradient-to-r from-[#0a1a2f]/90 to-[#1a2a4f]/90 backdrop-blur-lg rounded-b-xl shadow-2xl"
          role="menu"
        >
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            return (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span
                    className={[
                      "block px-3 py-2 rounded-lg text-white font-medium",
                      "hover:bg-blue-700/30 hover:text-blue-300",
                      active ? "bg-blue-700/40 text-blue-200 border border-blue-400/30 shadow-sm" : "",
                    ].join(" ")}
                  >
                    {item.label}
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
