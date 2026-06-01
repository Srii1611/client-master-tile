"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="Master Tile Installation, Inc."
            className="h-16 w-auto brightness-0 invert"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors text-white hover:text-blue-400 ${
                pathname === href ? "border-b-2 border-blue-400 pb-0.5" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 bg-navy hover:bg-navy-dark text-white font-semibold px-5 py-2 rounded-md transition-colors"
          >
            Get a Free Quote
          </Link>
        </nav>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-slate-800 px-4 pb-4 flex flex-col gap-3">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-1 transition-colors text-white hover:text-blue-400 ${
                pathname === href ? "text-blue-400" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-1 bg-navy hover:bg-navy-dark text-white font-semibold px-5 py-2 rounded-md text-center transition-colors"
          >
            Get a Free Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
