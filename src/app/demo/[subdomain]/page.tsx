import Link from "next/link";

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const mockServices = [
  {
    name: "General Consultation",
    desc: "A thorough assessment of your needs with personalized recommendations from our expert team.",
  },
  {
    name: "Premium Service",
    desc: "Our most popular offering. Comprehensive coverage with dedicated attention to every detail.",
  },
  {
    name: "Emergency Support",
    desc: "Available when you need us most. Fast response times and reliable solutions around the clock.",
  },
  {
    name: "Maintenance Plan",
    desc: "Keep everything running smoothly with our scheduled maintenance and preventive care package.",
  },
  {
    name: "Custom Solutions",
    desc: "Tailored specifically to your situation. We work with you to design the perfect approach.",
  },
  {
    name: "VIP Package",
    desc: "The complete experience. Priority scheduling, extended warranty, and complimentary follow-ups.",
  },
];

const mockReviews = [
  {
    name: "Sarah M.",
    text: "Absolutely incredible service. They went above and beyond what I expected. I've already recommended them to all my friends and family.",
    date: "2 weeks ago",
  },
  {
    name: "James T.",
    text: "Professional, punctual, and fairly priced. This is the kind of local business that deserves your support. Will definitely be coming back.",
    date: "1 month ago",
  },
  {
    name: "Maria L.",
    text: "I've tried several others in the area and nothing compares. The quality of work and customer service is unmatched. Five stars all the way.",
    date: "3 weeks ago",
  },
];

export default async function DemoPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const businessName = toTitleCase(subdomain);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Claim Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-accent px-4 py-2.5 text-center text-sm font-medium text-white">
        This is a free preview built for{" "}
        <span className="font-bold">{businessName}</span>.{" "}
        <Link
          href={`/claim/${subdomain}`}
          className="inline-flex items-center gap-1 underline underline-offset-2 font-bold hover:text-white/90"
        >
          Claim it
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-3.5 w-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>

      {/* Business Hero */}
      <section className="relative px-6 pt-20 pb-24 md:pt-28 md:pb-32 border-b border-border">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            {businessName}
          </h1>
          <p className="mt-4 text-xl text-foreground/80 md:text-2xl">
            Quality service you can trust. Proudly serving our community.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-muted">
            <span>123 Main Street, Anytown, USA</span>
            <span className="hidden sm:inline">|</span>
            <span>(555) 123-4567</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:5551234567"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              Call Now
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-base font-bold text-foreground transition hover:bg-card-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            About {businessName}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            Welcome to {businessName}. We&apos;ve been proudly serving our
            community with dedication, professionalism, and a commitment to
            excellence. Our experienced team brings years of expertise to every
            job, ensuring you receive the highest quality service every time.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Whether you&apos;re a new customer or a long-time client, we treat
            everyone like family. Our mission is simple: deliver outstanding
            results, build lasting relationships, and earn your trust one visit
            at a time.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-3 text-muted">
              Everything you need, all in one place.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockServices.map((service) => (
              <div
                key={service.name}
                className="bg-card border border-border rounded-2xl p-6 transition hover:bg-card-hover"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="px-6 py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              What Our Customers Say
            </h2>
            <div className="mt-3 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-accent"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-sm text-muted">5.0 rating</span>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockReviews.map((review) => (
              <div
                key={review.name}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-accent"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {review.name}
                  </span>
                  <span className="text-xs text-muted">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Contact Us
            </h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-light mb-2">
                  Address
                </h3>
                <p className="text-foreground/80">
                  123 Main Street
                  <br />
                  Anytown, USA 12345
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-light mb-2">
                  Phone
                </h3>
                <p className="text-foreground/80">(555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-light mb-2">
                  Hours
                </h3>
                <div className="space-y-1 text-sm text-foreground/80">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-border bg-card aspect-[4/3] lg:aspect-auto">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="mx-auto h-12 w-12 text-muted"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                  />
                </svg>
                <p className="mt-2 text-sm text-muted">Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-border">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {businessName}. All rights
            reserved.
          </p>
          <p className="text-xs text-muted">
            Powered by{" "}
            <Link
              href="/"
              className="text-accent-light hover:text-accent transition"
            >
              Creative Axe
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
