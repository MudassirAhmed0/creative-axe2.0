const leads = [
  { business: "Joe's Pizza", niche: "Restaurant", city: "Austin", score: 92, status: "Interested", channels: ["Email", "DM"], lastContact: "2 hours ago" },
  { business: "Glamour Studio", niche: "Salon", city: "Dallas", score: 87, status: "Contacted", channels: ["Email"], lastContact: "1 day ago" },
  { business: "QuickFix Plumbing", niche: "Plumber", city: "Houston", score: 95, status: "Ready", channels: ["Email", "Form"], lastContact: "3 hours ago" },
  { business: "Sunrise Dental", niche: "Dentist", city: "San Antonio", score: 78, status: "New", channels: [], lastContact: "—" },
  { business: "FitZone Gym", niche: "Fitness", city: "Austin", score: 81, status: "Contacted", channels: ["DM"], lastContact: "2 days ago" },
  { business: "Green Thumb Landscaping", niche: "Landscaping", city: "Dallas", score: 88, status: "Closed", channels: ["Email", "DM"], lastContact: "5 days ago" },
  { business: "Sparkle Clean Co", niche: "Cleaning", city: "Houston", score: 73, status: "New", channels: [], lastContact: "—" },
  { business: "Rev Motors", niche: "Auto Repair", city: "Austin", score: 90, status: "Interested", channels: ["Email", "Form"], lastContact: "6 hours ago" },
  { business: "Bella Nails", niche: "Salon", city: "San Antonio", score: 68, status: "Contacted", channels: ["DM"], lastContact: "3 days ago" },
  { business: "Iron Forge Fitness", niche: "Fitness", city: "Dallas", score: 84, status: "Closed", channels: ["Email"], lastContact: "1 week ago" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    New: "bg-muted/20 text-muted",
    Contacted: "bg-warning/20 text-warning",
    Interested: "bg-accent/20 text-accent-light",
    Ready: "bg-success/20 text-success",
    Closed: "bg-success/10 text-success",
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-muted/20 text-muted"}`}
    >
      {status}
    </span>
  );
}

function ChannelBadge({ channel }: { channel: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded bg-card-hover text-xs text-muted">
      {channel}
    </span>
  );
}

export default function PipelinePage() {
  const total = leads.length;

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Pipeline{" "}
          <span className="text-muted text-lg font-normal">({total})</span>
        </h1>
        <p className="text-muted text-sm mt-1">
          Track leads from discovery to close
        </p>
      </div>

      {/* Pipeline Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
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
                Score
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Status
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Channels
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Last Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <tr
                key={i}
                className="border-b border-border last:border-b-0 hover:bg-card-hover transition-colors"
              >
                <td className="px-5 py-3.5 font-medium">{lead.business}</td>
                <td className="px-5 py-3.5 text-muted">{lead.niche}</td>
                <td className="px-5 py-3.5 text-muted">{lead.city}</td>
                <td className="px-5 py-3.5 font-mono">{lead.score}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1.5">
                    {lead.channels.length > 0
                      ? lead.channels.map((ch) => (
                          <ChannelBadge key={ch} channel={ch} />
                        ))
                      : <span className="text-muted text-xs">—</span>}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-muted">{lead.lastContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
