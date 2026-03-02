import Link from "next/link";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "grid" },
  { label: "Pipeline", href: "/dashboard/pipeline", icon: "funnel" },
  { label: "Scraper", href: "/dashboard/scraper", icon: "search" },
  { label: "Sites", href: "/dashboard/sites", icon: "globe" },
];

function SidebarIcon({ type }: { type: string }) {
  switch (type) {
    case "grid":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "funnel":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 4h18l-7 8v5l-4 2V12L3 4z" />
        </svg>
      );
    case "search":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      );
    case "globe":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-background text-sm">
            CA
          </div>
          <span className="font-bold text-lg tracking-tight">
            Creative<span className="text-accent">Axe</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card-hover transition-colors"
            >
              <SidebarIcon type={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
              M
            </div>
            <div>
              <p className="text-sm font-medium">Mudassir</p>
              <p className="text-xs text-muted">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
