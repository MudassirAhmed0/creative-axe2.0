import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Link from "next/link";

const categories = [
  "All",
  "Restaurants",
  "Salons",
  "Auto Repair",
  "Dental",
  "Fitness",
  "Plumbing",
];

const portfolioItems = [
  {
    name: "Joe's Pizzeria",
    niche: "Restaurant",
    city: "Austin",
    gradient: "from-orange-500/30 to-red-600/20",
  },
  {
    name: "Glamour Studio",
    niche: "Salon",
    city: "Miami",
    gradient: "from-pink-500/30 to-purple-600/20",
  },
  {
    name: "QuickFix Plumbing",
    niche: "Plumbing",
    city: "Denver",
    gradient: "from-blue-500/30 to-cyan-600/20",
  },
  {
    name: "Bright Smile Dental",
    niche: "Dental",
    city: "Portland",
    gradient: "from-sky-400/30 to-teal-500/20",
  },
  {
    name: "Iron Temple Gym",
    niche: "Fitness",
    city: "Chicago",
    gradient: "from-red-500/30 to-orange-600/20",
  },
  {
    name: "GreenScape Pro",
    niche: "Landscaping",
    city: "Seattle",
    gradient: "from-green-500/30 to-emerald-600/20",
  },
  {
    name: "Bella Nails",
    niche: "Salon",
    city: "Houston",
    gradient: "from-fuchsia-500/30 to-pink-600/20",
  },
  {
    name: "Speedy Auto",
    niche: "Auto Repair",
    city: "Phoenix",
    gradient: "from-amber-500/30 to-yellow-600/20",
  },
  {
    name: "Fresh & Clean Co",
    niche: "Cleaning",
    city: "Atlanta",
    gradient: "from-violet-500/30 to-indigo-600/20",
  },
];

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        {/* Hero */}
        <section className="py-16 text-center">
          <div className="mx-auto max-w-4xl px-4">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Our Work
            </h1>
            <p className="mt-4 text-lg text-muted">
              Every site here was built in under 24 hours.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  cat === "All"
                    ? "bg-accent text-background"
                    : "border border-border bg-card text-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <div
                key={item.name}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent/30"
              >
                {/* Gradient Placeholder */}
                <div
                  className={`aspect-[16/10] bg-gradient-to-br ${item.gradient}`}
                />

                {/* Card Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent-light">
                      {item.niche}
                    </span>
                    <span className="text-xs text-muted">{item.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Line */}
        <section className="py-10 text-center">
          <p className="text-xl text-foreground">
            <span className="font-bold text-accent">147+</span> Sites Built
            and Counting
          </p>
        </section>

        {/* CTA */}
        <section className="pb-16 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Want One for Your Business?
          </h2>
          <Link
            href="/claim/demo"
            className="mt-6 inline-block rounded-xl bg-accent px-10 py-4 text-lg font-bold text-background transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
