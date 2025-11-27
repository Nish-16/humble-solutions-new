"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import GooeyNav from "./UI/GooeyNav";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
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
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
      });
    }, navRef);
    return () => ctx.revert();
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
      ref={navRef}
      className="
        fixed top-4 mx-auto left-0 right-0
        w-[85%] md:w-[80%]
        z-50
        backdrop-blur-xl
        bg-gray-700
        border border-blue-900/30
        shadow-2xl
        rounded-3xl
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-1 flex justify-between items-center">
        <Link href="/" aria-label="Go to home">
          <img
            src="/Home/logo.png"
            alt="Humble Solutions logo"
            className="h-10 w-auto ml-5"
          />
        </Link>

        {/* Desktop: Gooey nav (hover) */}
        <div className="hidden md:block">
          <GooeyNav items={NAV_ITEMS} />
        </div>

        {/* Desktop: Get Quote button */}
        <div className="hidden md:flex items-center ml-4">
          <Link
            href="/#contact"
            aria-label="Get a quote"
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium shadow"
          >
            Get Quote
          </Link>
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
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
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
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
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
                      active
                        ? "bg-blue-700/40 text-blue-200 border border-blue-400/30 shadow-sm"
                        : "",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
          <li role="none">
            <Link
              href="/#contact"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <span className="block w-full text-center px-3 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium">
                Get Quote
              </span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
