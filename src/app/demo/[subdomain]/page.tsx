import Link from "next/link";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { generateBusinessData } from "@/lib/demo-data";

export default async function DemoPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;

  // Check if we have a custom-generated site in the database
  const customSite = db
    .select()
    .from(schema.generatedSites)
    .where(eq(schema.generatedSites.slug, subdomain))
    .get();

  // If we have a custom site, serve it directly
  if (customSite) {
    // Track the view
    db.update(schema.generatedSites)
      .set({
        viewCount: (customSite.viewCount || 0) + 1,
        lastViewedAt: new Date().toISOString(),
      })
      .where(eq(schema.generatedSites.id, customSite.id))
      .run();

    // Serve the custom HTML directly
    return (
      <iframe
        srcDoc={customSite.html}
        className="w-full h-screen border-0"
        title={`${subdomain} website preview`}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    );
  }

  // Fallback: Use template-based preview for businesses not yet generated
  return <FallbackSite subdomain={subdomain} />;
}

function FallbackSite({ subdomain }: { subdomain: string }) {
  const biz = generateBusinessData(subdomain);
  const accent = biz.accentColor;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f5f5f5]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root { --demo-accent: ${accent}; }
            .demo-accent { color: ${accent}; }
            .demo-accent-bg { background-color: ${accent}; }
            .demo-btn:hover { box-shadow: 0 0 50px ${accent}40; }
          `,
        }}
      />

      {/* Claim Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 demo-accent-bg px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-medium text-white">
          <span>
            Free website preview for <strong>{biz.name}</strong>
          </span>
          <Link
            href={`/claim/${subdomain}`}
            className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Claim This Site →
          </Link>
        </div>
      </div>

      {/* Nav */}
      <nav className="fixed top-[42px] left-0 right-0 z-40 bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm"
              style={{ backgroundColor: accent }}
            >
              {biz.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
            <span className="font-bold text-lg">{biz.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm text-white/40 hover:text-white transition-colors">Services</a>
            <a href="#reviews" className="text-sm text-white/40 hover:text-white transition-colors">Reviews</a>
            <a href="#contact" className="text-sm text-white/40 hover:text-white transition-colors">Contact</a>
            <a
              href={`tel:${biz.phone.replace(/\D/g, "")}`}
              className="demo-accent-bg text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all demo-btn"
            >
              {biz.features[0]}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-[80vh] flex items-center pt-[100px]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.92]">
              {biz.name}
            </h1>
            <p className="mt-4 text-2xl font-light" style={{ color: accent }}>
              {biz.tagline}
            </p>
            <p className="mt-6 text-lg text-white/40 max-w-xl leading-relaxed">
              {biz.description.split(".").slice(0, 2).join(".")}.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${biz.phone.replace(/\D/g, "")}`}
                className="demo-accent-bg demo-btn text-white font-bold px-8 py-4 rounded-xl transition-all"
              >
                {biz.features[0]}
              </a>
              <a
                href="#contact"
                className="border border-white/10 hover:bg-white/5 text-white font-bold px-8 py-4 rounded-xl transition-all"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/[0.04] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-12">Our Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {biz.services.map((s) => (
              <div key={s.name} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <h3 className="font-bold text-white mb-2">{s.name}</h3>
                <p className="text-sm text-white/40">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="border-t border-white/[0.04] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-12">Customer Reviews</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {biz.reviews.map((r) => (
              <div key={r.name} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" style={{ color: accent }}>
                      <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-white/50">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-3 text-sm font-semibold text-white/70">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/[0.04] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-12">Contact</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Address</h3>
                <p className="text-white/50">{biz.address}<br />{biz.city}, {biz.state}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Phone</h3>
                <p className="text-white/50">{biz.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Hours</h3>
                {biz.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm text-white/40">
                    <span>{h.day}</span><span>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl min-h-[300px] flex items-center justify-center">
              <p className="text-white/15 text-sm">Google Maps embed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-sm text-white/20">&copy; {new Date().getFullYear()} {biz.name}</span>
          <Link href="/" className="text-xs text-white/10 hover:text-white/20 transition-colors">
            Powered by Creative Axe
          </Link>
        </div>
      </footer>
    </div>
  );
}
