import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mastertilemass.com"),
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
  ],
  authors: [{ name: "Master Tile Installation, Inc." }],
  creator: "Master Tile Installation, Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mastertilemass.com",
    siteName: "Master Tile Installation, Inc.",
    title: "Master Tile Installation, Inc. | Framingham, MA",
    description:
      "Professional tile installation services in Framingham, MA. Specializing in floor, wall, and bathroom tile for residential and commercial projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Tile Installation, Inc. | Framingham, MA",
    description:
      "Professional tile installation services in Framingham, MA.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
