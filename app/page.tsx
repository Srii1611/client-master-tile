import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tile Contractor in Framingham MA | Expert Installation Since 2005",
  description:
    "Master Tile Installation, Inc. offers expert floor, wall, and bathroom tile installation for homes and businesses in Framingham, MA and the MetroWest area. Free estimates.",
  alternates: { canonical: "https://www.mastertileinstallation.com" },
  openGraph: {
    title: "Master Tile Installation, Inc. | Framingham, MA",
    description:
      "Expert floor, wall, and bathroom tile installation for homes and businesses in Framingham, MA. Free in-home estimates. Call (508) 740-7253.",
    url: "https://www.mastertileinstallation.com",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Master Tile Installation — Professional Tile Contractor in Framingham, MA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Tile Installation, Inc. | Framingham, MA",
    description:
      "Expert tile installation in Framingham, MA. Free estimates. Call (508) 740-7253.",
    images: ["/images/og-image.jpg"],
  },
};

const stats = [
  { value: "20+", label: "Years in Business" },
  { value: "500+", label: "Projects Completed" },
  { value: "5★", label: "Average Rating" },
  { value: "100%", label: "Licensed & Insured" },
];

const services = [
  {
    title: "Bathroom Renovations",
    desc: "Full bathroom tile renovations — floors, walls, custom showers, and wet areas.",
    image: "/images/bathroom1.jpg",
    alt: "Bathroom tile installation Framingham MA — shower and floor tile",
  },
  {
    title: "Kitchen Backsplash",
    desc: "Stylish backsplash designs in herringbone, subway, and mosaic patterns.",
    image: "/images/kitchen1.jpg",
    alt: "Kitchen backsplash tile installation Framingham MA",
  },
  {
    title: "Tile Flooring",
    desc: "Porcelain, ceramic, and natural stone floors installed with precision.",
    image: "/images/flooring1.jpg",
    alt: "Porcelain and ceramic floor tile installation MetroWest MA",
  },
  {
    title: "Outdoor & Patio",
    desc: "Slip-resistant, frost-proof tile for patios, pool decks, and walkways.",
    image: "/images/outdoor1.jpg",
    alt: "Outdoor patio tile installation Framingham MA — frost-proof slip-resistant",
  },
  {
    title: "Commercial Spaces",
    desc: "High-durability tile for offices, lobbies, restaurants, and retail spaces.",
    image: "/images/commercial1.jpg",
    alt: "Commercial tile installation Framingham MA — offices restaurants retail",
  },
];

const reviews = [
  {
    name: "Anthony Giammarco",
    text: "Lucas and Master Tile are the ultimate professionals. Excellent quality of work, timeliness and very fairly priced. Could not recommend enough!",
    stars: 5,
  },
  {
    name: "Lindsey White",
    text: "I can't say enough about Master Tile Installation. We decided at the last minute to not tile our new shower ourselves, so I called these guys up and they came out within a few days to create an estimate and asked questions that we had never thought of. They worked with us to make sure we found the exact color stone that we wanted and didn't settle and did an amazing job overall. So clean walking through our house, picked up after themselves with all the work they did, and everything looks amazing!",
    stars: 5,
  },
  {
    name: "Todd Miller",
    text: "Luke and his team were really great to work with. I can't say enough great things about their work. I'd use them again for sure!",
    stars: 5,
  },
];

const whyChoose = [
  "Licensed, bonded & fully insured",
  "Free in-home estimates",
  "Premium materials at competitive prices",
  "On-time, on-budget completion",
  "Residential & commercial expertise",
  "5-star rated on Google & Houzz",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 px-4 text-center overflow-hidden bg-slate-900">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-slate-900/65" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Framingham, MA &amp; MetroWest
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            Expert Tile Installation<br className="hidden md:block" /> You Can Trust
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Master Tile Installation, Inc. brings craftsmanship and care to every project — residential or commercial.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-md transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/gallery"
              className="border border-slate-400 hover:border-blue-400 hover:text-blue-400 text-slate-200 font-semibold px-6 py-3 rounded-md transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold">{value}</p>
              <p className="text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-2">Our Services</h2>
          <p className="text-slate-500 text-center mb-10">
            From single-room updates to full commercial installs, we do it all.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {services.map(({ title, desc, image, alt }) => (
              <div key={title} className="relative rounded-lg overflow-hidden h-72 group">
                <img
                  src={image}
                  alt={alt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/55 group-hover:bg-slate-900/70 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                  <h3 className="text-lg font-bold mb-1">{title}</h3>
                  <p className="text-slate-300 text-sm leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="text-blue-700 hover:text-blue-800 font-semibold underline underline-offset-2"
            >
              See all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose Master Tile?</h2>
          <p className="text-slate-500 mb-10">
            We&apos;re a family-owned business serving Framingham and surrounding communities with integrity and skill.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-slate-700">
            {whyChoose.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-blue-700 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/about"
              className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
          <p className="text-slate-400 text-center mb-10">Real reviews from real homeowners in the MetroWest area.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(({ name, text, stars }) => (
              <div key={name} className="border border-slate-700 rounded-lg p-6 flex flex-col gap-3 bg-slate-800">
                <div className="flex gap-0.5">
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} className="text-blue-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-grow">&ldquo;{text}&rdquo;</p>
                <p className="text-white font-semibold text-sm">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white py-14 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Your Project?</h2>
        <p className="text-blue-100 mb-6">Contact us today for a free, no-obligation estimate.</p>
        <Link
          href="/contact"
          className="bg-white hover:bg-slate-100 text-blue-700 font-bold px-8 py-3 rounded-md transition-colors"
        >
          Contact Us Now
        </Link>
      </section>
    </>
  );
}
