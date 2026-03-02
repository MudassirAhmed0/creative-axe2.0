"use client";

import React, { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

function formatSlug(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const includedFeatures = [
  "Custom website",
  "Mobile responsive",
  "Contact form",
  "Google Maps integration",
  "Basic SEO setup",
  "Free hosting & SSL",
];

export default function ClaimPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const businessName = formatSlug(slug);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: businessName,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left Column */}
            <div>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                We built this for you
              </h1>
              <p className="mt-3 text-muted">
                Your new website is ready to go live. Claim it now — completely
                free.
              </p>

              {/* Mock Site Preview */}
              <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/20 via-card to-card-hover p-6">
                <div className="flex h-full flex-col gap-3">
                  {/* Wireframe header */}
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-accent/40" />
                    <div className="h-3 w-24 rounded bg-foreground/10" />
                    <div className="ml-auto flex gap-2">
                      <div className="h-3 w-10 rounded bg-foreground/10" />
                      <div className="h-3 w-10 rounded bg-foreground/10" />
                      <div className="h-3 w-10 rounded bg-foreground/10" />
                    </div>
                  </div>
                  {/* Wireframe hero */}
                  <div className="flex flex-1 flex-col items-center justify-center gap-3">
                    <div className="h-4 w-40 rounded bg-foreground/15" />
                    <div className="h-3 w-56 rounded bg-foreground/10" />
                    <div className="mt-2 h-8 w-28 rounded-lg bg-accent/30" />
                  </div>
                  {/* Wireframe cards */}
                  <div className="flex gap-3">
                    <div className="h-12 flex-1 rounded-lg bg-foreground/5" />
                    <div className="h-12 flex-1 rounded-lg bg-foreground/5" />
                    <div className="h-12 flex-1 rounded-lg bg-foreground/5" />
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  What&apos;s included
                </h3>
                <ul className="space-y-3">
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20 text-success text-xs">
                        &#10003;
                      </span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column — Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Claim Your Site
              </h2>
              <p className="mt-2 text-sm text-muted">
                Fill out the form below and we&apos;ll get you live fast.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-sm text-muted"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm text-muted"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm text-muted"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="businessName"
                    className="mb-1.5 block text-sm text-muted"
                  >
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm text-muted"
                  >
                    Message{" "}
                    <span className="text-muted/60">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-accent px-6 py-3.5 font-semibold text-background transition-opacity hover:opacity-90"
                >
                  Claim Your Site
                </button>

                <p className="text-center text-sm text-muted">
                  We&apos;ll get your site live within 24 hours. No payment
                  required.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
