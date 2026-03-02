const todayStats = [
  { label: "Scraped", value: "400" },
  { label: "Built", value: "30" },
  { label: "Sent", value: "78" },
  { label: "Opened", value: "18" },
];

const weekStats = [
  { label: "Scraped", value: "2,800" },
  { label: "Built", value: "210" },
  { label: "Sent", value: "546" },
  { label: "Replied", value: "42" },
];

const pipelineStages = [
  { label: "New Leads", count: 148, color: "bg-danger", icon: "dot" },
  { label: "Contacted", count: 312, color: "bg-warning", icon: "dot" },
  { label: "Interested", count: 23, color: "bg-success", icon: "dot" },
  { label: "Ready to Close", count: 8, color: "bg-accent", icon: "dot" },
  { label: "Closed", count: 34, color: "bg-success", icon: "check" },
];

const queue = [
  "Build 30 sites",
  "Send 78 outreach messages",
  "Follow up 12 warm leads",
  "Close 3 hot leads",
];

const recentActivity = [
  { action: "Built site for Joe's Pizza", time: "2 min ago" },
  { action: "Sent outreach to Glamour Studio", time: "8 min ago" },
  { action: "Lead replied: QuickFix Plumbing", time: "14 min ago" },
  { action: "Built site for Sunrise Dental", time: "22 min ago" },
  { action: "Sent outreach to FitZone Gym", time: "31 min ago" },
];

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted text-sm mt-1">{today}</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          Today
        </h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {todayStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-5"
            >
              <p className="font-mono text-2xl font-bold">{stat.value}</p>
              <p className="text-muted text-xs uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          This Week
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {weekStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-5"
            >
              <p className="font-mono text-2xl font-bold">{stat.value}</p>
              <p className="text-muted text-xs uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Summary */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          Pipeline Summary
        </h2>
        <div className="grid grid-cols-5 gap-3">
          {pipelineStages.map((stage) => (
            <div
              key={stage.label}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
            >
              {stage.icon === "check" ? (
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  className="text-success shrink-0"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <span
                  className={`w-2.5 h-2.5 rounded-full ${stage.color} shrink-0`}
                />
              )}
              <div>
                <p className="font-mono text-lg font-bold leading-tight">
                  {stage.count}
                </p>
                <p className="text-muted text-xs leading-tight">
                  {stage.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Today's Queue */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
            Today&apos;s Queue
          </h2>
          <ul className="space-y-3">
            {queue.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded border border-border flex items-center justify-center shrink-0">
                  {/* empty checkbox */}
                </span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3">
            {recentActivity.map((entry, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span>{entry.action}</span>
                <span className="text-muted text-xs whitespace-nowrap">
                  {entry.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
