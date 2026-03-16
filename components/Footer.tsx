import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-blue-400 font-bold text-lg mb-2">
            Master Tile Installation, Inc.
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Quality tile installation you can count on. Serving Framingham, MA and the MetroWest area since 2005.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a
              href="https://www.instagram.com/mastertileinstallation/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/gallery", label: "Gallery" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-slate-300 hover:text-blue-400 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contact Us</h4>
          <address className="not-italic text-sm space-y-1 text-slate-400">
            <p>31 Cypress St, Framingham, MA 01702</p>
            <p>
              Phone:{" "}
              <a href="tel:+15087407253" className="hover:text-blue-400 transition-colors">
                (508) 740-7253
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:info@mastertilemainst.com" className="hover:text-blue-400 transition-colors">
                info@mastertilemainst.com
              </a>
            </p>
            <p className="pt-1">Mon–Fri: 7am – 6pm</p>
            <p>Sat: 8am – 4pm</p>
          </address>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 text-center text-xs text-slate-400 py-4 px-4">
        © {new Date().getFullYear()} Master Tile Installation, Inc. All rights reserved.
      </div>
    </footer>
  );
}
