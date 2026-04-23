import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse completed tile installation projects by Master Tile Installation, Inc. in Framingham, MA — bathrooms, kitchens, floors, and commercial spaces.",
  alternates: { canonical: "/gallery" },
};

const categories = ["All", "Bathroom", "Kitchen", "Floor"];

const projects = [
  { id: 1, title: "Marble Double Shower", category: "Bathroom", location: "MetroWest, MA", desc: "Dual-head walk-in shower with chevron mosaic accent strips, built-in bench, and recessed niches.", image: "/images/gallery/marble-double-shower.jpg" },
  { id: 2, title: "Luxury Marble Bathroom", category: "Bathroom", location: "MetroWest, MA", desc: "Premium marble shower with frameless glass, oval accent window, and multi-head shower system.", image: "/images/gallery/luxury-marble-shower.jpg" },
  { id: 3, title: "Blue Marble Walk-In Shower", category: "Bathroom", location: "MetroWest, MA", desc: "Floor-to-ceiling blue marble-look porcelain with built-in shelving, corner shelf, and mosaic shower floor.", image: "/images/gallery/blue-marble-shower.jpg" },
  { id: 4, title: "Industrial Glass Enclosure", category: "Bathroom", location: "MetroWest, MA", desc: "Modern bathroom with black steel-frame glass shower door, subway tile walls, and marble countertop.", image: "/images/gallery/black-frame-bathroom.jpg" },
  { id: 5, title: "Marble Shower & Vanity", category: "Bathroom", location: "MetroWest, MA", desc: "Frameless glass marble shower with mosaic floor, niche shelving, and matching marble vanity top.", image: "/images/gallery/marble-glass-shower.jpg" },
  { id: 6, title: "Calacatta Marble Flooring", category: "Floor", location: "MetroWest, MA", desc: "Elegant hexagonal Calacatta marble floor tile with black accent inlays and clawfoot tub.", image: "/images/gallery/calacatta-floor-tub.jpg" },
  { id: 7, title: "Subway Tile with Marble Band", category: "Bathroom", location: "MetroWest, MA", desc: "Clean white subway tile shower with decorative marble accent band and recessed niche.", image: "/images/gallery/subway-accent-shower.jpg" },
  { id: 8, title: "Hex Mosaic Floor Shower", category: "Bathroom", location: "MetroWest, MA", desc: "Subway tile walls with corner shelves and hexagonal mosaic floor extending from shower to bathroom.", image: "/images/gallery/subway-hex-shower.jpg" },
  { id: 9, title: "Marble Backsplash Install", category: "Kitchen", location: "MetroWest, MA", desc: "Calacatta marble backsplash with precision leveling system and dual-sink vanity with brass fixtures.", image: "/images/gallery/marble-backsplash-progress.jpg" },
  { id: 10, title: "Mosaic Shower Floor", category: "Bathroom", location: "MetroWest, MA", desc: "Travertine wall tile with multi-tone mosaic shower floor and fold-down teak bench.", image: "/images/gallery/mosaic-shower-floor.jpg" },
  { id: 11, title: "Tub Surround with Matte Black", category: "Bathroom", location: "MetroWest, MA", desc: "Large-format porcelain tub surround with matte black fixtures and corner shelf detail.", image: "/images/gallery/tub-surround-black.jpg" },
];

const categoryColors: Record<string, string> = {
  Bathroom: "bg-blue-100 text-blue-800",
  Kitchen: "bg-green-100 text-green-800",
  Floor: "bg-blue-100 text-blue-800",
};

export default function GalleryPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-800 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-3">Project Gallery</h1>
          <p className="text-stone-300 text-lg">
            Real projects completed by Master Tile Installation across Framingham, MA and the MetroWest region.
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
          {projects.map(({ id, title, category, location, desc, image }) => (
            <div key={id} className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
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
          className="inline-block bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-md transition-colors"
        >
          Start Your Project
        </Link>
      </section>
    </div>
  );
}
