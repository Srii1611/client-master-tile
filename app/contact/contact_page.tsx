import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Free Tile Installation Estimate | Framingham MA",
  description:
    "Contact Master Tile Installation, Inc. for a free estimate on your tile project in Framingham, MA. Call (508) 740-7253 or fill out our form — we respond within one business day.",
  alternates: { canonical: "https://www.mastertileinstallation.com/contact" },
  openGraph: {
    title: "Get a Free Tile Installation Estimate | Master Tile — Framingham MA",
    description:
      "Contact Master Tile Installation for a free estimate. Serving Framingham, Natick, Ashland, Hopkinton, and all MetroWest communities. Call (508) 740-7253.",
    url: "https://www.mastertileinstallation.com/contact",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Master Tile Installation — free estimates in Framingham MA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Tile Estimate | Master Tile Installation — Framingham MA",
    description:
      "Get a free tile installation estimate in Framingham, MA. Call (508) 740-7253.",
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
      name: "Contact",
      item: "https://www.mastertileinstallation.com/contact",
    },
  ],
};

const contactInfo = [
  { label: "Phone", value: "(508) 740-7253", href: "tel:+15087407253" },
  { label: "Email", value: "martirtile@gmail.com", href: "mailto:martirtile@gmail.com" },
  { label: "Address", value: "31 Cypress St, Framingham, MA 01702", href: null },
  { label: "Hours", value: "Mon–Fri 7am–6pm · Sat 8am–4pm", href: null },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-white">
        <section className="bg-slate-800 text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-3">Get in Touch</h1>
            <p className="text-stone-300 text-lg">
              We offer free, no-obligation estimates. Tell us about your project and we&apos;ll get back to you within one business day.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Request a Free Quote</h2>
              <ContactForm />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-stone-800 mb-6">Contact Information</h2>
                <ul className="space-y-4">
                  {contactInfo.map(({ label, value, href }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="text-blue-700 font-bold text-sm pt-0.5 w-16 shrink-0">{label}</span>
                      {href ? (
                        <a href={href} className="text-stone-600 hover:text-blue-700 text-sm transition-colors">
                          {value}
                        </a>
                      ) : (
                        <span className="text-stone-600 text-sm">{value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-stone-200 rounded-lg p-5">
                <h3 className="font-semibold text-stone-800 mb-3">Service Area</h3>
                <p className="text-stone-500 text-sm mb-2">
                  We proudly serve Framingham and surrounding MetroWest communities:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Framingham", "Natick", "Ashland", "Hopkinton",
                    "Holliston", "Milford", "Southborough", "Westborough",
                    "Marlborough", "Hudson", "Wayland", "Sherborn",
                  ].map((town) => (
                    <span key={town} className="bg-stone-100 text-stone-700 text-xs px-2.5 py-1 rounded">
                      {town}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-stone-200 h-52">
                <iframe
                  title="Master Tile Installation location — Framingham, MA"
                  src="https://maps.google.com/maps?q=31%20Cypress%20St%2C%20Framingham%2C%20MA%2001702&output=embed"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
