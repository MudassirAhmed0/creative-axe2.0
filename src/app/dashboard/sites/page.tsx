const filters = ["All", "Draft", "Sent", "Viewed", "Claimed"];

const sites = [
  { business: "Joe's Pizzeria", niche: "Restaurant", city: "Austin", status: "Claimed", created: "Mar 2" },
  { business: "Glamour Studio", niche: "Salon", city: "Miami", status: "Viewed", created: "Mar 2" },
  { business: "QuickFix Plumbing", niche: "Plumbing", city: "Denver", status: "Sent", created: "Mar 1" },
  { business: "Bright Smile Dental", niche: "Dental", city: "Portland", status: "Sent", created: "Mar 1" },
  { business: "Iron Temple Gym", niche: "Fitness", city: "Chicago", status: "Draft", created: "Mar 1" },
  { business: "GreenScape Pro", niche: "Landscaping", city: "Seattle", status: "Viewed", created: "Feb 28" },
  { business: "Bella Nails", niche: "Salon", city: "Houston", status: "Claimed", created: "Feb 28" },
  { business: "Speedy Auto", niche: "Auto Repair", city: "Phoenix", status: "Draft", created: "Feb 27" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Draft: "bg-muted/20 text-muted",
    Sent: "bg-warning/10 text-warning",
    Viewed: "bg-accent/10 text-accent-light",
    Claimed: "bg-success/10 text-success",
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-muted/20 text-muted"}`}
    >
      {status}
    </span>
  );
}

export default function SitesPage() {
  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Generated Sites{" "}
          <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full font-mono align-middle">
            214 sites
          </span>
        </h1>
      </div>

      {/* Controls Row */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search businesses..."
          className="bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm w-72 outline-none focus:border-accent transition-colors"
        />
        <div className="flex items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                filter === "All"
                  ? "bg-accent text-background"
                  : "bg-card border border-border text-muted hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Sites Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Business
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Niche
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                City
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Status
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Created
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, i) => (
              <tr
                key={i}
                className="border-b border-border last:border-b-0 hover:bg-card-hover transition-colors"
              >
                <td className="px-5 py-3.5 font-medium">{site.business}</td>
                <td className="px-5 py-3.5 text-muted">{site.niche}</td>
                <td className="px-5 py-3.5 text-muted">{site.city}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={site.status} />
                </td>
                <td className="px-5 py-3.5 text-muted">{site.created}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <button className="text-accent text-xs hover:underline">
                      Preview
                    </button>
                    <button className="text-accent text-xs hover:underline">
                      Send
                    </button>
                    <button className="text-danger text-xs hover:underline">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
