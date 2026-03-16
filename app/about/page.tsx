import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Master Tile Installation, Inc. — a family-owned tile contractor based in Framingham, MA with over 18 years of experience serving MetroWest homeowners and businesses.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Craftsmanship",
    desc: "Every tile is set with precision. We don't cut corners — from substrate prep to final grout sealing.",
  },
  {
    title: "Transparency",
    desc: "Honest pricing, detailed written estimates, and no surprise charges. You always know what you're paying for.",
  },
  {
    title: "Reliability",
    desc: "We show up when we say we will and finish when we promise. Your time is as valuable as ours.",
  },
  {
    title: "Community",
    desc: "We're proud members of the Framingham community, supporting local suppliers and hiring locally.",
  },
];

const team = [
  {
    name: "Marco Silva",
    role: "Owner & Lead Installer",
    bio: "With 20+ years in the trade, Marco founded Master Tile in 2005 after working for regional contractors in the Boston area. He personally oversees every project.",
  },
  {
    name: "Ana Silva",
    role: "Operations & Client Relations",
    bio: "Ana manages scheduling, client communication, and the day-to-day operations that keep projects running smoothly.",
  },
  {
    name: "Luis Pereira",
    role: "Senior Tile Installer",
    bio: "Luis specializes in large-format tile and intricate mosaic work, bringing 12 years of installation expertise to the team.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-800 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-3">About Master Tile</h1>
          <p className="text-stone-300 text-lg">
            Family-owned, locally operated, and committed to quality since 2005.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-stone-100 rounded-lg h-72 flex items-center justify-center text-stone-400 text-sm">
            [ Company photo ]
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Our Story</h2>
            <p className="text-stone-500 leading-relaxed mb-4">
              Master Tile Installation, Inc. was founded in 2005 by Marco Silva after years of working alongside
              experienced tile setters throughout the Boston metro area. What started as a one-man operation has
              grown into a trusted team of skilled installers serving Framingham and the wider MetroWest community.
            </p>
            <p className="text-stone-500 leading-relaxed">
              We work directly with homeowners, interior designers, general contractors, and property managers.
              Whether it&apos;s a single bathroom refresh or a full commercial buildout, we bring the same level
              of care and expertise to every job.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 text-center mb-10">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ title, desc }) => (
              <div key={title} className="bg-white border border-stone-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-700 text-lg mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 text-center mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map(({ name, role, bio }) => (
              <div key={name} className="border border-stone-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-stone-200 rounded-full mx-auto mb-4 flex items-center justify-center text-stone-400 text-xs">
                  Photo
                </div>
                <h3 className="font-bold text-stone-800 text-lg">{name}</h3>
                <p className="text-blue-700 text-sm font-medium mb-3">{role}</p>
                <p className="text-stone-500 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 px-4 bg-blue-50 border-t border-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold text-stone-800 mb-6">Credentials &amp; Affiliations</h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-600">
            {[
              "Massachusetts Home Improvement Contractor License",
              "Fully Bonded & Insured",
              "NTCA Member (National Tile Contractors Association)",
              "BBB Accredited Business",
              "5-Star Rated on Google",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="text-blue-700 font-bold">✓</span> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-800 text-white py-14 px-4 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to work with us?</h2>
        <p className="text-stone-400 mb-6">Get in touch for a free consultation and estimate.</p>
        <Link
          href="/contact"
          className="inline-block bg-blue-700 hover:bg-blue-600 text-slate-800 font-bold px-8 py-3 rounded-md transition-colors"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
