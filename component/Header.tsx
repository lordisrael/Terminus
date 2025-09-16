// components/Header.tsx
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-xs">
      <div className="max-w-full mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo / Title */}
        <div className="text-2xl font-bold text-[#292928]">TERMINUS</div>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex space-x-16 text-[#292928] font-medium">
          <Link href="/about">About Us</Link>
          <Link href="/services">Service</Link>
          <Link href="/approach">Our Approach</Link>
          <Link href="/technology">Technology</Link>
        </nav>

        {/* Right: Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="/contact"
            className="rounded-full bg-[#292928] text-white px-5 py-2 text-sm font-medium hover:opacity-90"
          >
            Contact Us
          </Link>
          <Link
            href="/signup"
            className="rounded-full border border-[#292928] bg-white text-[#292928] px-5 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
