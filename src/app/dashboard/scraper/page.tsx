const niches = [
  "Restaurants",
  "Salons",
  "Plumbers",
  "Dentists",
  "Auto Repair",
  "Fitness",
  "Landscaping",
  "Cleaning",
];

const sources = ["Google Maps", "Yelp", "Instagram", "Facebook"];

const recentRuns = [
  { date: "Mar 2", city: "Austin", niche: "Restaurants", source: "Google Maps", found: 87, qualified: 34, status: "Complete" },
  { date: "Mar 2", city: "Miami", niche: "Salons", source: "Yelp", found: 62, qualified: 28, status: "Complete" },
  { date: "Mar 1", city: "Denver", niche: "Plumbers", source: "Google Maps", found: 45, qualified: 19, status: "Complete" },
  { date: "Mar 1", city: "Portland", niche: "Dental", source: "Instagram", found: 31, qualified: 12, status: "Complete" },
  { date: "Feb 28", city: "Chicago", niche: "Fitness", source: "Google Maps", found: 93, qualified: 41, status: "Complete" },
];

const scrapedBusinesses = [
  { name: "Joe's Pizzeria", address: "1204 S Congress Ave, Austin, TX", hasWebsite: false, score: 65 },
  { name: "Glamour Cuts", address: "782 Ocean Dr, Miami, FL", hasWebsite: false, score: 58 },
  { name: "DrainPro Plumbing", address: "340 Colfax Ave, Denver, CO", hasWebsite: false, score: 72 },
  { name: "Smile Dental Care", address: "115 NW 23rd Ave, Portland, OR", hasWebsite: true, score: 25 },
  { name: "AutoFix Garage", address: "890 W Division St, Chicago, IL", hasWebsite: false, score: 61 },
  { name: "FitZone Gym", address: "2100 N Milwaukee Ave, Chicago, IL", hasWebsite: false, score: 55 },
];

export default function ScraperPage() {
  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Scraper</h1>
        <p className="text-muted text-sm mt-1">
          Run automated business discovery
        </p>
      </div>

      {/* Controls */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-8">
        <div className="flex flex-wrap items-end gap-4">
          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted">
              City
            </label>
            <input
              type="text"
              placeholder="e.g. Austin"
              className="bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm w-44 outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Niche */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted">
              Niche
            </label>
            <select className="bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm w-44 outline-none focus:border-accent transition-colors">
              <option value="">Select niche</option>
              {niches.map((niche) => (
                <option key={niche} value={niche}>
                  {niche}
                </option>
              ))}
            </select>
          </div>

          {/* Sources */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted">
              Source
            </label>
            <div className="flex items-center gap-4">
              {sources.map((source) => (
                <label
                  key={source}
                  className="flex items-center gap-1.5 text-sm text-muted cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-accent w-3.5 h-3.5"
                  />
                  {source}
                </label>
              ))}
            </div>
          </div>

          {/* Run Button */}
          <button className="bg-accent text-background font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity ml-auto">
            Run Scraper
          </button>
        </div>
      </div>

      {/* Recent Runs */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          Recent Runs
        </h2>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Date
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  City
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Niche
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Source
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Found
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Qualified
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentRuns.map((run, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-b-0 hover:bg-card-hover transition-colors"
                >
                  <td className="px-5 py-3.5 text-muted">{run.date}</td>
                  <td className="px-5 py-3.5 font-medium">{run.city}</td>
                  <td className="px-5 py-3.5 text-muted">{run.niche}</td>
                  <td className="px-5 py-3.5 text-muted">{run.source}</td>
                  <td className="px-5 py-3.5 font-mono">{run.found}</td>
                  <td className="px-5 py-3.5 font-mono">{run.qualified}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      {run.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Latest Scraped Businesses */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          Latest Scraped Businesses
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scrapedBusinesses.map((biz) => (
            <div
              key={biz.name}
              className="bg-card border border-border rounded-xl p-5"
            >
              <p className="font-semibold">{biz.name}</p>
              <p className="text-muted text-sm mt-1">{biz.address}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  {biz.hasWebsite ? (
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
                      Has Website
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-danger/10 text-danger">
                      No Website
                    </span>
                  )}
                  <span className="text-accent-light font-mono text-sm">
                    {biz.score}
                  </span>
                </div>
                <button className="border border-accent text-accent rounded-lg px-3 py-1.5 text-xs hover:bg-accent hover:text-background transition-colors">
                  Build Site
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
