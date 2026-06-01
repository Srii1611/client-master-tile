"use client";

import { useState } from "react";

const services = [
  "Floor Tile Installation",
  "Bathroom & Shower Tile",
  "Kitchen Backsplash",
  "Fireplace Surround",
  "Outdoor / Patio Tile",
  "Commercial Tile",
  "Other",
];

const initialForm = {
  firstName: "",
  email: "",
  phone: "",
  serviceNeeded: "",
  projectDetails: "",
};

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbz0yQMvHH4T_tw7zEhxKUXSx8Mt2BFbs0jxn5vaQDhAbua6CeH_cXcBpGQDAXZ1Glxo/exec";

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update =
    (field: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-1">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          value={form.firstName}
          onChange={update("firstName")}
          className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Jane"
        />
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
          value={form.email}
          onChange={update("email")}
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
          value={form.phone}
          onChange={update("phone")}
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
          value={form.serviceNeeded}
          onChange={update("serviceNeeded")}
          className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
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
          value={form.projectDetails}
          onChange={update("projectDetails")}
          className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Describe your project — room size, tile style preferences, timeline, etc."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-md transition-colors text-sm"
      >
        {submitting ? "Sending…" : "Send My Request"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-700 text-center" role="status">
          Thanks! Your request has been sent — we&apos;ll be in touch within one business day.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 text-center" role="alert">
          Something went wrong. Please call us at (508) 740-7253 or email martirtile@gmail.com.
        </p>
      )}
      {status === "idle" && (
        <p className="text-xs text-stone-400 text-center">We typically respond within one business day.</p>
      )}
    </form>
  );
}
