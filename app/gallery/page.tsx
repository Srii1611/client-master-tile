import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse completed tile installation projects by Master Tile Installation, Inc. in Framingham, MA — bathrooms, kitchens, floors, and commercial spaces.",
  alternates: { canonical: "/gallery" },
};

const categories = ["All", "Bathroom", "Kitchen", "Floor", "Outdoor", "Commercial"];

// Placeholder project data — replace image src with real photos
const projects = [
  { id: 1, title: "Master Bathroom Remodel", category: "Bathroom", location: "Framingham, MA", desc: "Floor-to-ceiling marble-look porcelain with custom niche and linear drain." },
  { id: 2, title: "Kitchen Subway Backsplash", category: "Kitchen", location: "Natick, MA", desc: "Classic white subway tile with dark grout in a herringbone pattern." },
  { id: 3, title: "Open-Plan Living Room Floor", category: "Floor", location: "Ashland, MA", desc: "24×24 large-format porcelain tile with minimal grout lines." },
  { id: 4, title: "Pool Deck & Patio", category: "Outdoor", location: "Holliston, MA", desc: "Slip-resistant travertine-look tile around an in-ground pool." },
  { id: 5, title: "Restaurant Dining Room", category: "Commercial", location: "Framingham, MA", desc: "Geometric patterned cement-look tile for a high-traffic restaurant floor." },
  { id: 6, title: "Guest Bathroom Renovation", category: "Bathroom", location: "Southborough, MA", desc: "Hex mosaic floor with subway wall tile and custom border detail." },
  { id: 7, title: "Kitchen Island Feature", category: "Kitchen", location: "Framingham, MA", desc: "Handmade Zellige-style backsplash with antique brass accents." },
  { id: 8, title: "Mudroom Entryway", category: "Floor", location: "Hopkinton, MA", desc: "Durable slate-look porcelain with radiant heat preparation." },
  { id: 9, title: "Office Building Lobby", category: "Commercial", location: "Framingham, MA", desc: "Polished large-format tile with custom logo medallion inlay." },
];

const categoryColors: Record<string, string> = {
  Bathroom: "bg-blue-100 text-blue-800",
  Kitchen: "bg-green-100 text-green-800",
  Floor: "bg-blue-100 text-blue-800",
  Outdoor: "bg-emerald-100 text-emerald-800",
  Commercial: "bg-purple-100 text-purple-800",
};

export default function GalleryPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-800 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-3">Project Gallery</h1>
          <p className="text-stone-300 text-lg">
            A sample of our craftsmanship across Framingham, MA and the MetroWest region.
          </p>
        </div>
      </section>

      {/* Filter tabs (visual only — full filtering requires client component) */}
      <section className="border-b border-stone-200 sticky top-[73px] bg-white z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`whitespace-nowrap text-sm font-medium px-4 py-1.5 rounded-full cursor-pointer border transition-colors ${
                cat === "All"
                  ? "bg-slate-800 text-white border-stone-800"
                  : "border-stone-200 text-stone-600 hover:border-stone-400"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(({ id, title, category, location, desc }) => (
            <div key={id} className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
              {/* Placeholder image area */}
              <div className="bg-stone-100 h-52 flex items-center justify-center text-stone-400 text-sm group-hover:bg-stone-200 transition-colors">
                <span>[ Photo — {title} ]</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-stone-800 text-base leading-snug">{title}</h3>
                  <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded ${categoryColors[category]}`}>
                    {category}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mb-2">{location}</p>
                <p className="text-stone-500 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-50 py-14 px-4 text-center border-t border-stone-200">
        <h2 className="text-2xl font-bold text-stone-800 mb-3">Like what you see?</h2>
        <p className="text-stone-500 mb-6">Contact us to discuss your project and get a free estimate.</p>
        <Link
          href="/contact"
          className="inline-block bg-blue-700 hover:bg-blue-600 text-slate-800 font-bold px-8 py-3 rounded-md transition-colors"
        >
          Start Your Project
        </Link>
      </section>
    </div>
  );
}
