import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tile Installation Services",
  description:
    "Explore the full range of tile installation services offered by Master Tile Installation, Inc. — floors, bathrooms, kitchens, outdoor, and commercial projects in Framingham, MA.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    category: "Residential",
    items: [
      {
        title: "Floor Tile Installation",
        desc: "We install porcelain, ceramic, natural stone, and mosaic tile on any residential floor. Precise leveling, proper substrate prep, and clean grout lines every time.",
        tags: ["Porcelain", "Ceramic", "Natural Stone", "Mosaic"],
      },
      {
        title: "Bathroom & Shower Tile",
        desc: "Complete bathroom tile renovations including shower surrounds, tub decks, niche shelves, floors, and accent walls. Waterproofing is always included.",
        tags: ["Shower Walls", "Tub Surround", "Wet Areas", "Waterproofing"],
      },
      {
        title: "Kitchen Backsplash",
        desc: "Transform your kitchen with a custom backsplash. Subway tile, herringbone patterns, mosaic sheets, and more — all carefully cut and installed.",
        tags: ["Subway Tile", "Herringbone", "Mosaic", "Glass Tile"],
      },
      {
        title: "Fireplace Surrounds",
        desc: "Create a stunning focal point with a tiled fireplace surround, hearth, or accent wall using natural stone or large-format porcelain slabs.",
        tags: ["Natural Stone", "Large Format", "Hearth", "Accent Wall"],
      },
    ],
  },
  {
    category: "Outdoor",
    items: [
      {
        title: "Patio & Pool Deck Tile",
        desc: "Slip-resistant, frost-proof tile for patios, pool decks, and outdoor living areas. We use materials rated for outdoor Massachusetts winters.",
        tags: ["Frost-Proof", "Slip-Resistant", "Pool Deck", "Patio"],
      },
      {
        title: "Entryways & Steps",
        desc: "Durable tile for exterior steps, entryways, and walkways that hold up to heavy foot traffic and harsh New England weather.",
        tags: ["Exterior Steps", "Walkways", "High-Traffic"],
      },
    ],
  },
  {
    category: "Commercial",
    items: [
      {
        title: "Commercial Floor Tile",
        desc: "High-durability tile installations for offices, restaurants, retail spaces, and healthcare facilities. We work around your schedule to minimize downtime.",
        tags: ["Offices", "Restaurants", "Retail", "Healthcare"],
      },
      {
        title: "Commercial Restrooms",
        desc: "Code-compliant, ADA-accessible tile restroom installations for commercial properties. Full waterproofing and grouting to commercial standards.",
        tags: ["ADA Compliant", "Waterproofing", "Commercial Grade"],
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Page hero */}
      <section className="bg-slate-800 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-3">Our Services</h1>
          <p className="text-stone-300 text-lg">
            Expert tile installation for residential, outdoor, and commercial projects across Framingham, MA.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-14">
          {services.map(({ category, items }) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-stone-800 mb-6 pb-2 border-b border-stone-200">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map(({ title, desc, tags }) => (
                  <div key={title} className="border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-stone-800 mb-2">{title}</h3>
                    <p className="text-stone-500 text-sm mb-4">{desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-50 py-14 px-4 text-center border-t border-stone-200">
        <h2 className="text-2xl font-bold text-stone-800 mb-3">Not sure what you need?</h2>
        <p className="text-stone-500 mb-6 max-w-xl mx-auto">
          We&apos;ll visit your home or business for a free consultation and provide a detailed, no-obligation quote.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-blue-700 hover:bg-blue-600 text-slate-800 font-bold px-8 py-3 rounded-md transition-colors"
        >
          Request a Free Quote
        </Link>
      </section>
    </div>
  );
}
