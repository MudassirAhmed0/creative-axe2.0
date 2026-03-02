import Link from "next/link";
import { generateBusinessData } from "@/lib/demo-data";

export default async function DemoPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const biz = generateBusinessData(subdomain);
  const accent = biz.accentColor;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f5f5f5]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --demo-accent: ${accent};
              --demo-accent-glow: ${accent}40;
            }
            .demo-accent { color: ${accent}; }
            .demo-accent-bg { background-color: ${accent}; }
            .demo-accent-border { border-color: ${accent}; }
            .demo-accent-bg-subtle { background-color: ${accent}15; }
            .demo-accent-glow { box-shadow: 0 0 40px ${accent}30; }
            .demo-btn:hover { box-shadow: 0 0 50px ${accent}40; background-color: ${accent}dd; }
          `,
        }}
      />

      {/* ━━━ CLAIM BANNER ━━━ */}
      <div className="fixed top-0 left-0 right-0 z-50 demo-accent-bg px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-medium text-white">
          <span className="hidden sm:inline">
            This is a free website preview built for{" "}
            <strong>{biz.name}</strong>
          </span>
          <span className="sm:hidden">
            Free preview for <strong>{biz.name}</strong>
          </span>
          <Link
            href={`/claim/${subdomain}`}
            className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-1 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Claim This Site
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* ━━━ NAVIGATION ━━━ */}
      <nav className="fixed top-[42px] left-0 right-0 z-40 bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm"
              style={{ backgroundColor: accent }}
            >
              {biz.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              {biz.name}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              href="#reviews"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Contact
            </a>
            <a
              href={`tel:${biz.phone.replace(/\D/g, "")}`}
              className="demo-accent-bg demo-btn text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              {biz.features[0]}
            </a>
          </div>
        </div>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-[100px]">
        {/* Background effects */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[150px] opacity-[0.07] pointer-events-none"
          style={{ backgroundColor: accent }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-3xl">
            {/* Niche badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
              style={{
                borderColor: `${accent}40`,
                backgroundColor: `${accent}10`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: accent }}
              />
              <span
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: accent }}
              >
                {biz.niche === "generic"
                  ? "Local Business"
                  : biz.niche.replace("-", " ")}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92]">
              {biz.name}
            </h1>

            <p
              className="mt-4 text-2xl sm:text-3xl font-light tracking-tight"
              style={{ color: accent }}
            >
              {biz.tagline}
            </p>

            <p className="mt-6 text-lg text-white/50 max-w-xl leading-relaxed">
              {biz.description.split(".").slice(0, 2).join(".")}.
            </p>

            {/* Info bar */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/40">
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {biz.address}, {biz.city}, {biz.state}
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {biz.phone}
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
                </svg>
                <span style={{ color: accent }}>5.0</span> (127 reviews)
              </span>
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`tel:${biz.phone.replace(/\D/g, "")}`}
                className="demo-accent-bg demo-btn demo-accent-glow inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-base transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {biz.features[0]}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] text-white font-bold px-8 py-4 rounded-xl text-base transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Get Directions
              </a>
            </div>
          </div>

          {/* Feature pills - right side on desktop */}
          <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-3">
            {biz.features.map((feature) => (
              <a
                key={feature}
                href="#services"
                className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] rounded-xl px-5 py-3 text-sm text-white/60 hover:text-white transition-all"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                {feature}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ABOUT ━━━ */}
      <section id="about" className="relative border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: accent }}
              >
                Our Story
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight leading-tight">
                About{" "}
                <span style={{ color: accent }}>{biz.name}</span>
              </h2>
              <p className="mt-6 text-white/50 leading-relaxed text-lg">
                {biz.description}
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { number: "10+", label: "Years Experience" },
                  { number: "2,400+", label: "Happy Customers" },
                  { number: "5.0", label: "Star Rating" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="text-3xl font-black"
                      style={{ color: accent }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-xs text-white/30 mt-1 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Image placeholder */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.06]">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `linear-gradient(135deg, ${accent}40, transparent, ${accent}20)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-3xl font-black text-white/80"
                    style={{ backgroundColor: `${accent}20` }}
                  >
                    {biz.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <p className="mt-4 text-sm text-white/20">
                    Business photo goes here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ SERVICES ━━━ */}
      <section
        id="services"
        className="relative border-t border-white/[0.04]"
      >
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top right, ${accent}, transparent)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-16">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: accent }}
            >
              What We Offer
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">
              Our Services
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {biz.services.map((service) => (
              <div
                key={service.name}
                className={`group relative rounded-2xl p-7 border transition-all duration-300 hover:translate-y-[-2px] ${
                  service.highlight
                    ? "demo-accent-border border-opacity-30 bg-white/[0.03]"
                    : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
                style={
                  service.highlight
                    ? {
                        borderColor: `${accent}30`,
                        boxShadow: `0 0 30px ${accent}08`,
                      }
                    : undefined
                }
              >
                {service.highlight && (
                  <span
                    className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: accent }}
                  >
                    Popular
                  </span>
                )}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${accent}15` }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ REVIEWS ━━━ */}
      <section id="reviews" className="relative border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-16">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: accent }}
            >
              Testimonials
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">
              What Our Customers Say
            </h2>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  style={{ color: accent }}
                >
                  <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
                </svg>
              ))}
              <span className="ml-3 text-sm text-white/40">
                5.0 average from 127 reviews
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {biz.reviews.map((review) => (
              <div
                key={review.name}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                      style={{ color: accent }}
                    >
                      <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: `${accent}30` }}
                    >
                      {review.name[0]}
                    </div>
                    <span className="text-sm font-semibold text-white/80">
                      {review.name}
                    </span>
                  </div>
                  <span className="text-xs text-white/20">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CONTACT ━━━ */}
      <section
        id="contact"
        className="relative border-t border-white/[0.04]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at bottom, ${accent}, transparent)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: accent }}
              >
                Get In Touch
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">
                Visit Us Today
              </h2>
              <p className="mt-4 text-white/40 text-lg">
                We&apos;d love to hear from you. Stop by, give us a call, or
                send us a message.
              </p>

              <div className="mt-10 space-y-8">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accent}15` }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      style={{ color: accent }}
                    >
                      <path
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Address</h3>
                    <p className="text-white/40 mt-1">
                      {biz.address}
                      <br />
                      {biz.city}, {biz.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accent}15` }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      style={{ color: accent }}
                    >
                      <path
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Phone</h3>
                    <a
                      href={`tel:${biz.phone.replace(/\D/g, "")}`}
                      className="text-white/40 mt-1 hover:text-white transition-colors"
                    >
                      {biz.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accent}15` }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      style={{ color: accent }}
                    >
                      <path
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Hours</h3>
                    <div className="mt-1 space-y-1">
                      {biz.hours.map((h) => (
                        <div
                          key={h.day}
                          className="flex items-center justify-between gap-8 text-sm"
                        >
                          <span className="text-white/40">{h.day}</span>
                          <span className="text-white/60 font-medium">
                            {h.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.02] min-h-[400px] flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  background: `linear-gradient(135deg, ${accent}, transparent)`,
                }}
              />
              <div className="text-center z-10">
                <svg
                  className="w-16 h-16 mx-auto text-white/10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-4 text-sm text-white/20">
                  Google Maps embed
                </p>
                <p className="text-xs text-white/10 mt-1">
                  {biz.address}, {biz.city}, {biz.state}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ BOTTOM CTA ━━━ */}
      <section className="relative border-t border-white/[0.04] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${accent}, transparent)`,
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Ready to{" "}
            <span style={{ color: accent }}>get started?</span>
          </h2>
          <p className="mt-4 text-lg text-white/40">
            Give us a call or stop by today. We&apos;re here to help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${biz.phone.replace(/\D/g, "")}`}
              className="demo-accent-bg demo-btn demo-accent-glow inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all"
            >
              Call {biz.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="border-t border-white/[0.04] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs"
              style={{ backgroundColor: accent }}
            >
              {biz.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </div>
            <span className="text-sm text-white/30">
              &copy; {new Date().getFullYear()} {biz.name}. All rights
              reserved.
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-white/15 hover:text-white/30 transition-colors"
          >
            Powered by Creative Axe
          </Link>
        </div>
      </footer>
    </div>
  );
}
