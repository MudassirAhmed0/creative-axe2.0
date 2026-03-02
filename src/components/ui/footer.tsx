import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-background text-sm">
                CA
              </div>
              <span className="font-bold text-lg tracking-tight">
                Creative<span className="text-accent">Axe</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              We build websites for local businesses in 24 hours. No jargon, no
              hassle — just results.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Custom Websites",
                "Online Booking",
                "SEO Setup",
                "Google Ads",
                "Social Media",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">
              Industries
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Restaurants", slug: "restaurants" },
                { label: "Salons", slug: "salons" },
                { label: "Plumbers", slug: "plumbers" },
                { label: "Dentists", slug: "dentists" },
                { label: "Fitness", slug: "fitness" },
              ].map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/for/${item.slug}`}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Our Work", href: "/work" },
                { label: "Get Your Free Site", href: "/claim/demo" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Creative Axe. All rights
            reserved.
          </p>
          <p className="text-xs text-muted">
            Built with precision. Delivered with speed.
          </p>
        </div>
      </div>
    </footer>
  );
}
