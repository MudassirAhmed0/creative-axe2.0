import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const serviceCategories = [
  {
    label: "WEBSITE & DESIGN",
    services: [
      {
        title: "Custom Website Build",
        description:
          "A stunning, mobile-first website built specifically for your business",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Landing Pages",
        description:
          "High-converting pages for promotions, events, or seasonal offers",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Website Redesign",
        description:
          "Transform your outdated site into a modern powerhouse",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M4 4v5h5M20 20v-5h-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.49 9A9 9 0 005.64 5.64L4 4M3.51 15A9 9 0 0018.36 18.36L20 20" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Mobile Optimization",
        description:
          "Make sure every customer has a perfect experience on any device",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M7 2h10a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1zM12 18h.01" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "ONLINE PRESENCE",
    services: [
      {
        title: "Google Business Setup",
        description: "Get found on Google Maps and local search",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Yelp Optimization",
        description: "Stand out on Yelp with an optimized profile",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Directory Listings",
        description: "Get listed across 50+ online directories",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Review Management",
        description: "Build and manage your online reputation",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "BOOKING & OPERATIONS",
    services: [
      {
        title: "Online Booking",
        description: "Let customers book appointments 24/7",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M16 2v4M8 2v4M3 8h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Online Ordering",
        description: "Accept orders directly from your website",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Contact Forms",
        description: "Smart forms that capture leads automatically",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Live Chat",
        description: "Instant customer support widget on your site",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "MARKETING & GROWTH",
    services: [
      {
        title: "SEO Setup",
        description: "Rank higher in local search results",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Google Ads",
        description: "Targeted ads that bring customers to your door",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Social Media Management",
        description: "Consistent, engaging content across platforms",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Email Marketing",
        description: "Stay top of mind with automated email campaigns",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "TECHNICAL & SUPPORT",
    services: [
      {
        title: "Hosting & SSL",
        description: "Fast, secure hosting with free SSL certificate",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M2 9h20M2 15h20M4 5h16a2 2 0 012 2v3H2V7a2 2 0 012-2zM4 15h16a2 2 0 010 4H4a2 2 0 010-4z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Domain Setup",
        description: "Get the perfect domain name for your business",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Business Email",
        description: "Professional email addresses @yourbusiness.com",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M16 12a4 4 0 11-8 0 4 4 0 018 0zM16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-5.93 8.47" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: "Speed Optimization",
        description: "Lightning-fast load times that keep customers",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="relative py-28 md:py-36 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono text-accent tracking-wider uppercase">
                Our Services
              </span>
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Everything Your Business{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                Needs Online
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              From a stunning website to a full digital presence — we handle it
              all so you can focus on what you do best.
            </p>
          </div>
        </section>

        {/* ═══════════════════ SERVICE CATEGORIES ═══════════════════ */}
        {serviceCategories.map((category, catIndex) => (
          <section
            key={category.label}
            className={`py-20 md:py-28 relative ${
              catIndex % 2 === 0 ? "border-t border-border" : ""
            }`}
          >
            {catIndex % 2 === 1 && (
              <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-accent/[0.02] blur-[100px] pointer-events-none" />
            )}

            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12">
                <span className="text-xs font-mono text-accent tracking-widest">
                  {category.label}
                </span>
                <div className="mt-3 w-12 h-0.5 bg-accent/40 rounded-full" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.services.map((service) => (
                  <div
                    key={service.title}
                    className="group bg-card border border-border rounded-2xl p-6 hover:bg-card-hover hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ═══════════════════ FINAL CTA ═══════════════════ */}
        <section className="relative py-32 md:py-40 border-t border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.04] to-background pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/[0.06] blur-[100px] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Let&apos;s Build Something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                Great
              </span>
            </h2>
            <p className="mt-6 text-lg text-muted max-w-lg mx-auto">
              Tell us what your business needs and we&apos;ll put together the
              perfect package — no strings attached.
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
