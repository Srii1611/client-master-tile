import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mastertileinstallation.com"),
  title: {
    default: "Master Tile Installation, Inc. | Framingham, MA",
    template: "%s | Master Tile Installation, Inc.",
  },
  description:
    "Professional tile installation services in Framingham, MA. Specializing in floor, wall, and bathroom tile for residential and commercial projects.",
  keywords: [
    "tile installation",
    "tile contractor",
    "Framingham MA",
    "bathroom tile",
    "floor tile",
    "kitchen tile",
    "Massachusetts tile installer",
    "MetroWest tile contractor",
    "shower tile installation",
    "porcelain tile Framingham",
  ],
  authors: [{ name: "Master Tile Installation, Inc." }],
  creator: "Master Tile Installation, Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mastertileinstallation.com",
    siteName: "Master Tile Installation, Inc.",
    title: "Master Tile Installation, Inc. | Framingham, MA",
    description:
      "Professional tile installation services in Framingham, MA. Specializing in floor, wall, and bathroom tile for residential and commercial projects.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Master Tile Installation, Inc. — Professional Tile Contractor in Framingham, MA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Tile Installation, Inc. | Framingham, MA",
    description:
      "Professional tile installation services in Framingham, MA.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Master Tile Installation, Inc.",
  url: "https://www.mastertileinstallation.com",
  logo: "https://www.mastertileinstallation.com/images/logo.png",
  image: "https://www.mastertileinstallation.com/images/og-image.jpg",
  description:
    "Professional tile installation services in Framingham, MA. Specializing in floor, wall, and bathroom tile for residential and commercial projects.",
  telephone: "+15087407253",
  email: "martirtile@gmail.com",
  foundingDate: "2005",
  address: {
    "@type": "PostalAddress",
    streetAddress: "31 Cypress St",
    addressLocality: "Framingham",
    addressRegion: "MA",
    postalCode: "01702",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.2793,
    longitude: -71.4162,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "16:00",
    },
  ],
  areaServed: [
    "Framingham", "Natick", "Ashland", "Hopkinton", "Holliston",
    "Milford", "Southborough", "Westborough", "Marlborough",
    "Hudson", "Wayland", "Sherborn",
  ],
  sameAs: [
    "https://www.instagram.com/mastertileinstallation/",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Anthony Giammarco" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Lucas and Master Tile are the ultimate professionals. Excellent quality of work, timeliness and very fairly priced. Could not recommend enough!",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Lindsey White" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "I can't say enough about Master Tile Installation. They did an amazing job overall. So clean walking through our house, picked up after themselves, and everything looks amazing!",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Todd Miller" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Luke and his team were really great to work with. I can't say enough great things about their work. I'd use them again for sure!",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Geo meta tags for local SEO */}
        <meta name="geo.region" content="US-MA" />
        <meta name="geo.placename" content="Framingham, Massachusetts" />
        <meta name="geo.position" content="42.2793;-71.4162" />
        <meta name="ICBM" content="42.2793, -71.4162" />
      </head>
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
