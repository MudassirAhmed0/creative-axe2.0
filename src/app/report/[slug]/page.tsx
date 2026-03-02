import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Link from "next/link";

const reportData = {
  businessName: "Joe's Pizza",
  location: "Austin, TX",
  date: "March 2, 2026",
  overallScore: 32,
  scores: {
    website: { score: 0, label: "Website", detail: "No website found" },
    mobile: { score: 0, label: "Mobile", detail: "No mobile presence" },
    seo: { score: 15, label: "SEO", detail: "Barely visible in search" },
    speed: { score: null, label: "Speed", detail: "No website to test" },
  },
  issues: [
    {
      text: "No website",
      detail: "Customers can't find you online",
      severity: "red",
    },
    {
      text: "No online menu",
      detail: "67% of diners check menus online first",
      severity: "red",
    },
    {
      text: "No online ordering",
      detail: "You're leaving revenue on the table",
      severity: "red",
    },
    {
      text: "No booking/reservation system",
      detail: "Customers expect to book online",
      severity: "yellow",
    },
    {
      text: "Incomplete Google Business listing",
      detail: "Missing key information that drives traffic",
      severity: "yellow",
    },
    {
      text: "No customer reviews displayed on your site",
      detail: "Social proof drives 72% of purchase decisions",
      severity: "yellow",
    },
  ],
  competitors: [
    {
      feature: "Has Website",
      you: false,
      competitorA: true,
      competitorB: true,
    },
    {
      feature: "Online Ordering",
      you: false,
      competitorA: true,
      competitorB: true,
    },
    {
      feature: "Online Booking",
      you: false,
      competitorA: true,
      competitorB: false,
    },
    {
      feature: "Review Display",
      you: false,
      competitorA: true,
      competitorB: true,
    },
    {
      feature: "Mobile Friendly",
      you: false,
      competitorA: true,
      competitorB: true,
    },
  ],
};

function getScoreColor(score: number | null) {
  if (score === null) return "text-muted";
  if (score <= 30) return "text-danger";
  if (score <= 60) return "text-warning";
  return "text-success";
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="py-8 text-center">
            <p className="mb-2 text-sm tracking-widest text-muted uppercase">
              Website Audit Report
            </p>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {reportData.businessName}
            </h1>
            <p className="mt-2 text-lg text-muted">{reportData.location}</p>
            <p className="mt-1 text-sm text-muted">{reportData.date}</p>
          </section>

          {/* Overall Score */}
          <section className="py-8">
            <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-danger">
                <div className="text-center">
                  <span className="text-5xl font-bold text-danger">
                    {reportData.overallScore}
                  </span>
                  <span className="text-lg text-muted">/100</span>
                </div>
              </div>
              <p className="mt-6 text-lg font-medium text-foreground">
                Your online presence needs serious work.
              </p>
            </div>
          </section>

          {/* Score Breakdown */}
          <section className="py-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Score Breakdown
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.values(reportData.scores).map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-medium text-muted uppercase tracking-wide">
                      {item.label}
                    </h3>
                    <span
                      className={`text-2xl font-bold ${getScoreColor(item.score)}`}
                    >
                      {item.score !== null ? `${item.score}/100` : "N/A"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What You're Missing */}
          <section className="py-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              What You&apos;re Missing
            </h2>
            <div className="rounded-2xl border border-border bg-card p-6">
              <ul className="space-y-4">
                {reportData.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-full ${
                        issue.severity === "red"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {issue.text}
                      </p>
                      <p className="text-sm text-muted">{issue.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* What We Built For You */}
          <section className="py-8">
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground">
                We already built you a free website
              </h2>
              <p className="mt-2 text-muted">
                See what your business could look like online.
              </p>
              <Link
                href={`/site/${slug}`}
                className="mt-6 inline-block rounded-xl bg-accent px-8 py-3 font-semibold text-background transition-opacity hover:opacity-90"
              >
                View Your New Site &rarr;
              </Link>
            </div>
          </section>

          {/* Competitor Comparison */}
          <section className="py-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Competitor Comparison
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-sm font-medium text-muted">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-muted">
                      Your Business
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-muted">
                      Competitor A
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-muted">
                      Competitor B
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.competitors.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        i < reportData.competitors.length - 1
                          ? "border-b border-border"
                          : ""
                      }
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4">
                        {row.you ? (
                          <span className="text-success">&check;</span>
                        ) : (
                          <span className="text-danger">&cross;</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {row.competitorA ? (
                          <span className="text-success">&check;</span>
                        ) : (
                          <span className="text-danger">&cross;</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {row.competitorB ? (
                          <span className="text-success">&check;</span>
                        ) : (
                          <span className="text-danger">&cross;</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="py-8 pb-16 text-center">
            <Link
              href={`/claim/${slug}`}
              className="inline-block rounded-xl bg-accent px-10 py-4 text-lg font-bold text-background transition-opacity hover:opacity-90"
            >
              Claim Your Free Website
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
