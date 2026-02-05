"use client";

import React from "react";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link"; // ⭐ Must import Link for internal navigation
import Lottie from "lottie-react";
import footer from "@/public/photos/footer.json"
const FooterSection = () => {

  return (
    <footer className="relative z-40 bg-[#0B0F19] text-white px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start justify-items-center md:justify-items-start">
        
        {/* 1. Logo + Social Icons */}
        <div className="flex flex-col gap-10 justify-center items-center md:items-start md:justify-start w-full">
          <div className="space-y-2 w-full flex flex-col items-center md:items-start">
            <img
              src="/Home/logo.png"
              alt="Humble Solutions"
              className="w-50 mx-auto md:mx-0"
            />
          </div>

          <div className="flex gap-4 mt-2 justify-center md:justify-start mr-0 md:mr-10 w-full">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* 2. Contact Info */}
        <div className="flex flex-col text-sm leading-6 space-y-7 items-center md:items-start text-center md:text-left w-full">
          <div>
            <strong className="block text-white text-lg">Email</strong>
            <span className="text-gray-300 text-xs">executives@humblesolutions.in</span>
          </div>

          <div>
            <strong className="block text-white text-lg">Phone</strong>
            <span className="text-gray-300 text-xs">+91 81949 63318</span>
          </div>

          <div>
            <strong className="block text-white text-lg">Address</strong>
            <span className="text-gray-300 text-xs">Punjab, India</span>
          </div>
        </div>

        {/* 3. Company Links */}
        <div className="flex flex-col gap-2 text-sm space-y-3 items-center md:items-start text-center md:text-left w-full">
          <h4 className="text-white font-semibold mb-2 text-xl">Company</h4>

          <Link href="/" className="text-gray-300 hover:text-blue-400">
            Home
          </Link>

          <Link href="/services" className="text-gray-300 hover:text-blue-400">
            Services
          </Link>

          <Link href="/portfolio" className="text-gray-300 hover:text-blue-400">
            Portfolio
          </Link>

          <Link href="/about" className="text-gray-300 hover:text-blue-400">
            About Us
          </Link>
        </div>

        {/* 5. Right-side Illustration */}
        <div className="flex justify-center md:justify-end items-start w-full">
          <Lottie
            animationData={footer}
            loop
            className="w-40 h-40 md:w-60 md:h-60"
          />
        </div>

      </div>

      {/* Bottom Border */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-sm text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Humble Solutions. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
