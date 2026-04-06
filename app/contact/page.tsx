"use client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Free Tile Installation Estimate",
  description:
    "Contact Master Tile Installation, Inc. in Framingham, MA for a free estimate on your tile installation project. Call, email, or fill out our form.",
  alternates: { canonical: "/contact" },
};

const contactInfo = [
  { label: "Phone", value: "(508) 555-0100", href: "tel:+15085550100" },
  { label: "Email", value: "info@mastertilemass.com", href: "mailto:info@mastertilemass.com" },
  { label: "Address", value: "Framingham, MA 01701", href: null },
  { label: "Hours", value: "Mon–Fri 7am–6pm · Sat 8am–4pm", href: null },
];

export default function ContactPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      firstName: (document.getElementById("firstName") as HTMLInputElement).value,
      lastName: (document.getElementById("lastName") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      serviceNeeded: (document.getElementById("service") as HTMLSelectElement).value,
      projectDetails: (document.getElementById("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(https://script.google.com/macros/s/AKfycbz0yQMvHH4T_tw7zEhxKUXSx8Mt2BFbs0jxn5vaQDhAbua6CeH_cXcBpGQDAXZ1Glxo/exec, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.text();
      console.log(result);
      alert("Form submitted successfully!");

      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };
  
  return (
    <div className="bg-white">
      {/* Hero */}
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
          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Request a Free Quote</h2>
            <form className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(508) 555-1234"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-stone-700 mb-1">
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Select a service…</option>
                  <option>Floor Tile Installation</option>
                  <option>Bathroom & Shower Tile</option>
                  <option>Kitchen Backsplash</option>
                  <option>Fireplace Surround</option>
                  <option>Outdoor / Patio Tile</option>
                  <option>Commercial Tile</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                  Project Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your project — room size, tile style preferences, timeline, etc."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-600 text-slate-800 font-bold py-3 rounded-md transition-colors text-sm"
              >
                Send My Request
              </button>
              <p className="text-xs text-stone-400 text-center">
                We typically respond within one business day.
              </p>
            </form>
          </div>

          {/* Contact info + map placeholder */}
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

            {/* Service area */}
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

            {/* Map placeholder */}
            <div className="bg-stone-100 rounded-lg h-52 flex items-center justify-center text-stone-400 text-sm border border-stone-200">
              [ Google Maps embed — Framingham, MA ]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
