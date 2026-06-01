import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Tile Installation Photo Gallery | Framingham MA Projects",
  description:
    "Browse completed tile installation projects by Master Tile Installation, Inc. — bathrooms, kitchens, floors, and commercial spaces across Framingham and MetroWest, MA.",
  alternates: { canonical: "https://www.mastertileinstallation.com/gallery" },
  openGraph: {
    title: "Tile Installation Gallery | Master Tile Installation — Framingham MA",
    description:
      "Real completed projects — bathroom tile, kitchen backsplash, floor tile, and more across Framingham and MetroWest, MA.",
    url: "https://www.mastertileinstallation.com/gallery",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tile installation project gallery — Master Tile Installation Framingham MA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tile Installation Gallery | Framingham MA",
    description:
      "Browse completed bathroom, kitchen, and floor tile projects in Framingham and MetroWest, MA.",
    images: ["/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.mastertileinstallation.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Gallery",
      item: "https://www.mastertileinstallation.com/gallery",
    },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-white">
        <section className="bg-slate-800 text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-3">Project Gallery</h1>
            <p className="text-stone-300 text-lg">
              Real projects completed by Master Tile Installation across Framingham, MA and the MetroWest region.
            </p>
          </div>
        </section>

        <GalleryGrid />

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
    </>
  );
}
