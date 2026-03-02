import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { AnimatedCounter } from "@/components/landing/animated-counter";

const industries = [
  {
    name: "Restaurants",
    slug: "restaurants",
    description: "Menus, online ordering, reservations — the full plate.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2l-5 5 5 5M21 15v7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Salons & Spas",
    slug: "salons",
    description: "Online booking, galleries, and instant credibility.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M6 3v18M18 3v18M6 12h12M6 7h12M6 17h12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Plumbing & HVAC",
    slug: "plumbers",
    description: "Emergency calls, service areas, trust signals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M4 22h16M4 22V8l4-4h8l4 4v14M9 22v-6h6v6M12 2v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Dental & Medical",
    slug: "dentists",
    description: "Patient forms, appointment scheduling, insurance info.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 2L8 6C6.5 7.5 6 9.5 6 11c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-.5-3.5-2-5l-4-4zM12 17v5M9 22h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Auto Repair",
    slug: "auto-repair",
    description: "Service catalogs, quotes, and location maps.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Fitness & Gyms",
    slug: "fitness",
    description: "Class schedules, membership info, transformation galleries.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M6.5 6.5L17.5 17.5M6.5 17.5L17.5 6.5M12 2v20M2 12h20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Landscaping",
    slug: "landscaping",
    description: "Project galleries, service areas, seasonal offers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 22V8M5 12l7-10 7 10M3 20h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Cleaning Services",
    slug: "cleaning",
    description: "Instant quotes, booking, before/after showcases.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 2L8 8h8l-4-6zM8 8l-4 14h16L16 8H8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const showcaseItems = [
  { name: "Joe's Pizzeria", niche: "Restaurant", gradient: "from-orange-600/20 to-red-900/20" },
  { name: "Glamour Studio", niche: "Salon", gradient: "from-pink-600/20 to-purple-900/20" },
  { name: "QuickFix Plumbing", niche: "Plumbing", gradient: "from-blue-600/20 to-cyan-900/20" },
  { name: "Bright Smile Dental", niche: "Dental", gradient: "from-emerald-600/20 to-teal-900/20" },
  { name: "Iron Temple Gym", niche: "Fitness", gradient: "from-amber-600/20 to-orange-900/20" },
  { name: "GreenScape Pro", niche: "Landscaping", gradient: "from-green-600/20 to-emerald-900/20" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-accent/8 blur-[120px] animate-pulse-glow pointer-events-none" />
          <div className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

          {/* Diagonal cut decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/[0.03] to-transparent skew-x-[-6deg] origin-top-right pointer-events-none" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 py-32">
            <div className="max-w-4xl">
              {/* Tagline */}
              <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono text-accent tracking-wider uppercase">
                  Building sites daily
                </span>
              </div>

              {/* Headline */}
              <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
                We Build
                <br />
                Websites.
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                    You Get
                  </span>
                </span>
                <br />
                Customers.
              </h1>

              {/* Subtext */}
              <p className="animate-fade-up delay-300 mt-8 text-lg sm:text-xl text-muted max-w-xl leading-relaxed">
                We find local businesses without a web presence, build them a
                stunning website, and deliver it in under 24 hours.{" "}
                <span className="text-foreground font-medium">
                  No jargon. No hassle.
                </span>
              </p>

              {/* CTAs */}
              <div className="animate-fade-up delay-500 mt-10 flex flex-wrap gap-4">
                <Link
                  href="/claim/demo"
                  className="group relative inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-background font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]"
                >
                  Get Your Free Site
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 border border-border hover:border-muted text-foreground font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-card"
                >
                  See Our Work
                </Link>
              </div>
            </div>

            {/* Floating axe slash decoration */}
            <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
              <div className="relative w-64 h-80">
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-accent/40 to-transparent transform rotate-[15deg]" />
                <div className="absolute top-4 right-8 w-0.5 h-3/4 bg-gradient-to-b from-transparent via-accent/20 to-transparent transform rotate-[15deg]" />
                <div className="absolute top-8 right-16 w-0.5 h-1/2 bg-gradient-to-b from-transparent via-accent/10 to-transparent transform rotate-[15deg]" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ STATS BAR ═══════════════════ */}
        <section className="relative border-y border-border bg-card/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: 147, suffix: "+", label: "Sites Built" },
                { value: 32, suffix: "", label: "Cities Served" },
                { value: 24, suffix: "hr", label: "Delivery Time" },
                { value: 4.9, suffix: "", label: "Client Rating", isDecimal: true },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-8 md:py-10 px-6 text-center ${
                    i < 3 ? "border-r border-border" : ""
                  } ${i < 2 ? "border-b md:border-b-0 border-border" : i === 2 ? "border-b md:border-b-0" : ""}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-accent font-mono">
                    {stat.isDecimal ? (
                      stat.value.toString()
                    ) : (
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
        <section className="py-28 md:py-36 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                The Process
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                Three steps.{" "}
                <span className="text-muted">That&apos;s it.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {[
                {
                  step: "01",
                  title: "We Find You",
                  description:
                    "We discover your business online, analyze your presence, and build you a custom website draft — completely free.",
                },
                {
                  step: "02",
                  title: "You Review It",
                  description:
                    "Check out your brand-new site. Share it with your team. No strings attached, no credit card, no commitment.",
                },
                {
                  step: "03",
                  title: "Go Live",
                  description:
                    "Love it? We launch your site in 24 hours. You start getting customers from day one.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="group relative bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-accent/40 transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center font-mono text-accent font-bold text-sm group-hover:bg-accent group-hover:text-background transition-all duration-500">
                      {item.step}
                    </div>
                    {i < 2 && (
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-border z-10">
                        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ INDUSTRIES ═══════════════════ */}
        <section className="py-28 md:py-36 relative border-t border-border">
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/[0.02] blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <span className="text-xs font-mono text-accent tracking-widest uppercase">
                  Industries
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                  Built for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                    your industry
                  </span>
                </h2>
                <p className="mt-4 text-muted max-w-lg">
                  We know your business because we&apos;ve built hundreds of
                  sites just like yours. Every template, every feature — tailored
                  to what your customers actually need.
                </p>
              </div>
              <Link
                href="/services"
                className="text-sm text-accent hover:text-accent-light transition-colors font-medium shrink-0"
              >
                View all services &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/for/${industry.slug}`}
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-accent/30 hover:bg-card-hover transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                    {industry.icon}
                  </div>
                  <h3 className="font-semibold mb-1.5">{industry.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {industry.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ SHOWCASE ═══════════════════ */}
        <section className="py-28 md:py-36 relative border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                Portfolio
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                See what we&apos;ve built
              </h2>
              <p className="mt-4 text-muted max-w-lg mx-auto">
                Real websites. Real businesses. Built in under 24 hours each.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {showcaseItems.map((item, i) => (
                <Link
                  key={i}
                  href="/work"
                  className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300"
                >
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${item.gradient} relative`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 rounded-lg border border-white/5 bg-white/[0.03] backdrop-blur-sm flex flex-col p-4 gap-2">
                        <div className="w-1/3 h-2 rounded-full bg-white/10" />
                        <div className="w-2/3 h-2 rounded-full bg-white/5" />
                        <div className="flex-1 rounded bg-white/[0.03] mt-2" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold text-white bg-accent/80 backdrop-blur px-4 py-2 rounded-lg">
                        View Site
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 text-accent">
                        {item.niche}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors font-medium"
              >
                View all projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════ FINAL CTA ═══════════════════ */}
        <section className="relative py-32 md:py-40 border-t border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.04] to-background pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/[0.06] blur-[100px] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Ready to get
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                more customers?
              </span>
            </h2>
            <p className="mt-6 text-lg text-muted max-w-lg mx-auto">
              We&apos;ll build your website for free. You only pay if you love
              it. No risk, no commitment — just results.
            </p>
            <div className="mt-10">
              <Link
                href="/claim/demo"
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent-light text-background font-bold px-10 py-5 rounded-xl text-lg transition-all duration-300 hover:shadow-[0_0_60px_rgba(249,115,22,0.3)]"
              >
                Get Your Free Site
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
