import {
  LogoIcon,
  LogoIconDark,
  LogoFull,
  LogoMark,
  LogoStacked,
} from "@/components/ui/logo";

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-16">
      <h1 className="text-3xl font-bold mb-2">Creative Axe — Brand Kit</h1>
      <p className="text-muted mb-16">
        All logo variants using our orange accent (#f97316)
      </p>

      {/* Dark backgrounds */}
      <div className="space-y-16">
        {/* Variant 1: Icon on orange bg */}
        <section>
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            1. Icon Mark (Orange BG)
          </h2>
          <div className="bg-card border border-border rounded-2xl p-12 flex items-center justify-center gap-8">
            <LogoIcon size={48} />
            <LogoIcon size={64} />
            <LogoIcon size={96} />
            <LogoIcon size={128} />
          </div>
        </section>

        {/* Variant 2: Icon on dark bg */}
        <section>
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            2. Icon Mark (Dark BG)
          </h2>
          <div className="bg-card border border-border rounded-2xl p-12 flex items-center justify-center gap-8">
            <LogoIconDark size={48} />
            <LogoIconDark size={64} />
            <LogoIconDark size={96} />
            <LogoIconDark size={128} />
          </div>
        </section>

        {/* Variant 3: Full horizontal logo */}
        <section>
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            3. Full Logo (Horizontal)
          </h2>
          <div className="bg-card border border-border rounded-2xl p-12 flex flex-col items-center gap-8">
            <LogoFull height={32} variant="dark" />
            <LogoFull height={48} variant="dark" />
          </div>
          <div className="bg-white rounded-2xl p-12 flex flex-col items-center gap-8 mt-4">
            <LogoFull height={32} variant="light" />
            <LogoFull height={48} variant="light" />
          </div>
        </section>

        {/* Variant 4: Badge / Seal */}
        <section>
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            4. Badge Mark (with Axe)
          </h2>
          <div className="bg-card border border-border rounded-2xl p-12 flex items-center justify-center gap-8">
            <LogoMark size={80} />
            <LogoMark size={120} />
            <LogoMark size={160} />
          </div>
        </section>

        {/* Variant 5: Stacked */}
        <section>
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            5. Stacked Logo
          </h2>
          <div className="bg-card border border-border rounded-2xl p-12 flex items-center justify-center gap-12">
            <LogoStacked width={120} />
            <LogoStacked width={160} />
            <LogoStacked width={200} />
          </div>
        </section>

        {/* Usage examples */}
        <section>
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            6. Usage — Navbar Preview
          </h2>
          <div className="bg-background border border-border rounded-2xl overflow-hidden">
            <div className="h-16 px-6 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <LogoIcon size={32} />
                <span className="font-bold text-lg tracking-tight">
                  Creative<span className="text-accent">Axe</span>
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm text-muted">Services</span>
                <span className="text-sm text-muted">Our Work</span>
                <span className="text-sm bg-accent text-background font-semibold px-4 py-1.5 rounded-lg">
                  Get Your Free Site
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Color palette */}
        <section>
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            Color Palette
          </h2>
          <div className="flex gap-4 flex-wrap">
            {[
              { color: "#f97316", name: "Accent", label: "#f97316" },
              { color: "#fb923c", name: "Accent Light", label: "#fb923c" },
              { color: "#09090b", name: "Background", label: "#09090b" },
              { color: "#18181b", name: "Card", label: "#18181b" },
              { color: "#27272a", name: "Border", label: "#27272a" },
              { color: "#fafafa", name: "Foreground", label: "#fafafa" },
              { color: "#71717a", name: "Muted", label: "#71717a" },
            ].map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 rounded-xl border border-border"
                  style={{ backgroundColor: c.color }}
                />
                <span className="text-xs font-semibold">{c.name}</span>
                <span className="text-xs font-mono text-muted">{c.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
