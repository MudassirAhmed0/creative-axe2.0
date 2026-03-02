import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

interface NicheData {
  name: string;
  tagline: string;
  description: string;
  features: { title: string; desc: string }[];
  portfolioItems: { name: string; gradient: string }[];
}

const nicheData: Record<string, NicheData> = {
  restaurants: {
    name: "Restaurants & Cafes",
    tagline: "Fill Every Seat, Every Night",
    description:
      "67% of diners check a restaurant's website before visiting. If yours is outdated — or doesn't exist — you're losing covers to competitors down the street. We build fast, beautiful restaurant websites that showcase your menu, accept reservations, and turn hungry searchers into paying guests.",
    features: [
      {
        title: "Online Menu Display",
        desc: "A beautiful, mobile-friendly menu that's easy to update whenever your specials change. No more PDF uploads.",
      },
      {
        title: "Online Ordering",
        desc: "Let customers order directly from your site. Skip the third-party commission fees and own the relationship.",
      },
      {
        title: "Reservation System",
        desc: "Built-in table booking that syncs with your schedule. Reduce no-shows with automatic confirmation texts.",
      },
      {
        title: "Photo Gallery",
        desc: "High-impact food photography galleries that make visitors hungry and ready to visit.",
      },
      {
        title: "Customer Reviews",
        desc: "Showcase your best Google and Yelp reviews front and center to build instant trust with new visitors.",
      },
      {
        title: "Location & Hours",
        desc: "Interactive map, clear hours, and directions that make it effortless for customers to find you.",
      },
    ],
    portfolioItems: [
      { name: "Joe's Pizzeria", gradient: "from-orange-600/20 to-red-900/20" },
      { name: "Sakura Sushi", gradient: "from-rose-600/20 to-pink-900/20" },
      { name: "The Grill House", gradient: "from-amber-600/20 to-yellow-900/20" },
    ],
  },
  salons: {
    name: "Hair Salons & Barbershops",
    tagline: "Book More Chairs, Build More Loyalty",
    description:
      "82% of salon clients book their next appointment online. Without a professional website, you're relying entirely on walk-ins and word of mouth. We build salon websites that showcase your work, let clients book 24/7, and keep your chairs full.",
    features: [
      {
        title: "Online Booking",
        desc: "Clients book appointments anytime, day or night. Reduce phone calls and never miss a booking again.",
      },
      {
        title: "Service Menu & Pricing",
        desc: "Clear, organized service lists with pricing so clients know exactly what to expect before they walk in.",
      },
      {
        title: "Stylist Profiles",
        desc: "Showcase each stylist's specialties, experience, and portfolio so clients can pick their perfect match.",
      },
      {
        title: "Before & After Gallery",
        desc: "Stunning transformation photos that prove the quality of your work better than any ad ever could.",
      },
      {
        title: "Product Recommendations",
        desc: "Feature the products you sell in-store and drive extra revenue from clients who want salon results at home.",
      },
      {
        title: "Loyalty & Referrals",
        desc: "Built-in referral tracking and loyalty program features that turn happy clients into your best marketers.",
      },
    ],
    portfolioItems: [
      { name: "Blade & Fade", gradient: "from-violet-600/20 to-purple-900/20" },
      { name: "Luxe Hair Studio", gradient: "from-pink-600/20 to-rose-900/20" },
      { name: "The Grooming Co.", gradient: "from-slate-600/20 to-zinc-900/20" },
    ],
  },
  plumbers: {
    name: "Plumbers & HVAC",
    tagline: "Be the First Call, Not the Last Resort",
    description:
      "When a pipe bursts at 2 AM, homeowners grab their phone and search. If your plumbing business doesn't show up with a professional site, you're losing emergency calls to the competition. We build plumber websites that rank, convert, and keep your phone ringing.",
    features: [
      {
        title: "Emergency Contact Button",
        desc: "A click-to-call button front and center so panicked homeowners reach you in seconds, not minutes.",
      },
      {
        title: "Service Area Map",
        desc: "Show exactly which neighborhoods and zip codes you serve so you only get calls you can take.",
      },
      {
        title: "Service Catalog",
        desc: "Clearly list every service you offer — from drain cleaning to water heater installs — with transparent pricing.",
      },
      {
        title: "License & Insurance Badge",
        desc: "Display your credentials prominently to build instant trust with homeowners who've been burned before.",
      },
      {
        title: "Before & After Projects",
        desc: "Photo documentation of completed jobs that prove your craftsmanship and attention to detail.",
      },
      {
        title: "Review Highlights",
        desc: "Pull in your best 5-star reviews automatically so every visitor sees social proof immediately.",
      },
    ],
    portfolioItems: [
      { name: "DrainPro Services", gradient: "from-blue-600/20 to-cyan-900/20" },
      { name: "FlowRight Plumbing", gradient: "from-sky-600/20 to-blue-900/20" },
      { name: "PipeMaster Co.", gradient: "from-teal-600/20 to-emerald-900/20" },
    ],
  },
  dentists: {
    name: "Dentists & Dental Clinics",
    tagline: "Turn Searchers into Smiling Patients",
    description:
      "73% of patients choose a dentist based on their online presence. A clean, trustworthy website is the difference between a full schedule and empty chairs. We build dental websites that attract new patients, simplify booking, and showcase your practice.",
    features: [
      {
        title: "Patient Booking Portal",
        desc: "New and existing patients book appointments online with automatic reminders that reduce no-shows by 40%.",
      },
      {
        title: "Treatment Pages",
        desc: "Dedicated pages for each service — cleanings, implants, Invisalign — optimized to rank for local searches.",
      },
      {
        title: "Insurance & Payment Info",
        desc: "Clear insurance acceptance lists and financing options that remove the biggest barrier to booking.",
      },
      {
        title: "Team Profiles",
        desc: "Friendly, professional bios and photos that make nervous patients feel comfortable before they arrive.",
      },
      {
        title: "Patient Testimonials",
        desc: "Video and written testimonials from real patients that build trust and overcome dental anxiety.",
      },
      {
        title: "New Patient Forms",
        desc: "Downloadable or fillable intake forms so patients spend less time in the waiting room and more time in the chair.",
      },
    ],
    portfolioItems: [
      { name: "Bright Smile Dental", gradient: "from-cyan-600/20 to-sky-900/20" },
      { name: "Lakewood Family Dentistry", gradient: "from-emerald-600/20 to-teal-900/20" },
      { name: "Pearl Orthodontics", gradient: "from-indigo-600/20 to-blue-900/20" },
    ],
  },
  "auto-repair": {
    name: "Auto Repair Shops",
    tagline: "Drive More Cars Into Your Bay",
    description:
      "When the check engine light comes on, car owners search for a shop they can trust. If your auto repair business looks sketchy online — or invisible — they'll drive right past you. We build professional auto shop websites that earn trust and bring in more vehicles.",
    features: [
      {
        title: "Appointment Scheduling",
        desc: "Let customers book oil changes, inspections, and repairs online. Fill your bays without the phone tag.",
      },
      {
        title: "Service Price Estimator",
        desc: "Transparent pricing for common services that builds trust and pre-qualifies customers before they call.",
      },
      {
        title: "Certifications Display",
        desc: "Showcase your ASE certifications, dealer affiliations, and warranties to stand out from backyard mechanics.",
      },
      {
        title: "Vehicle Make Specialties",
        desc: "Highlight the brands and models you specialize in to attract owners looking for specific expertise.",
      },
      {
        title: "Customer Testimonials",
        desc: "Real reviews from real car owners who trusted you with their vehicle and would come back again.",
      },
      {
        title: "Location & Drop-off Info",
        desc: "Maps, hours, drop-off instructions, and shuttle service details so customers know exactly what to expect.",
      },
    ],
    portfolioItems: [
      { name: "QuickFix Auto", gradient: "from-red-600/20 to-orange-900/20" },
      { name: "Precision Motors", gradient: "from-zinc-600/20 to-neutral-900/20" },
      { name: "Eagle Automotive", gradient: "from-amber-600/20 to-red-900/20" },
    ],
  },
  fitness: {
    name: "Gyms & Fitness Studios",
    tagline: "Fill Every Class, Grow Every Month",
    description:
      "81% of people research a gym online before signing up. If your website doesn't match the energy of your studio, prospects will join the competitor with a slicker site. We build fitness websites that convert visitors into members and keep your community growing.",
    features: [
      {
        title: "Class Schedule",
        desc: "Live, filterable class schedules that update automatically. Members always know what's happening and when.",
      },
      {
        title: "Membership Plans",
        desc: "Clear pricing tiers with comparison tables that make it easy for prospects to pick the right plan and sign up.",
      },
      {
        title: "Trainer Profiles",
        desc: "Showcase your coaching staff with certifications, specialties, and personality so members find their fit.",
      },
      {
        title: "Free Trial Signup",
        desc: "Frictionless lead capture that turns curious visitors into trial members with a single form submission.",
      },
      {
        title: "Transformation Gallery",
        desc: "Member success stories with before-and-after photos that prove your program delivers real results.",
      },
      {
        title: "Virtual Tour",
        desc: "Photo and video walkthroughs of your facility so prospects can see the vibe before they visit.",
      },
    ],
    portfolioItems: [
      { name: "IronWorks Gym", gradient: "from-red-600/20 to-rose-900/20" },
      { name: "Flow Yoga Studio", gradient: "from-purple-600/20 to-violet-900/20" },
      { name: "Peak CrossFit", gradient: "from-orange-600/20 to-amber-900/20" },
    ],
  },
  landscaping: {
    name: "Landscaping & Lawn Care",
    tagline: "Grow Your Business as Fast as Your Lawns",
    description:
      "Homeowners spend an average of $3,400 per year on lawn and landscape services. But they only hire companies they trust — and trust starts with a professional website. We build landscaping sites that showcase your work, generate leads, and keep your crews busy.",
    features: [
      {
        title: "Project Gallery",
        desc: "Stunning before-and-after photo galleries organized by project type that sell your craftsmanship instantly.",
      },
      {
        title: "Free Quote Form",
        desc: "Lead capture forms with property details and service selection so you can quote faster and close more.",
      },
      {
        title: "Seasonal Services",
        desc: "Rotating service highlights — snow removal in winter, planting in spring — that keep your site relevant year-round.",
      },
      {
        title: "Service Area Coverage",
        desc: "Interactive map showing exactly which neighborhoods you serve with drive-time estimates for quick response.",
      },
      {
        title: "Client Testimonials",
        desc: "Reviews from homeowners and property managers that prove you show up on time and do the job right.",
      },
      {
        title: "Maintenance Plans",
        desc: "Recurring service packages displayed with clear pricing that convert one-time jobs into monthly retainers.",
      },
    ],
    portfolioItems: [
      { name: "GreenScape Pro", gradient: "from-green-600/20 to-emerald-900/20" },
      { name: "Evergreen Lawns", gradient: "from-lime-600/20 to-green-900/20" },
      { name: "Terra Design Co.", gradient: "from-emerald-600/20 to-teal-900/20" },
    ],
  },
  cleaning: {
    name: "Cleaning Services",
    tagline: "Spotless Reputation, Fully Booked Calendar",
    description:
      "The cleaning industry is worth $74 billion, but most cleaning companies look the same online — if they're online at all. A polished website sets you apart, builds trust instantly, and makes booking effortless. We build cleaning service websites that bring in recurring clients.",
    features: [
      {
        title: "Instant Quote Calculator",
        desc: "Interactive pricing tool where customers enter their home size and get an instant estimate — no phone call needed.",
      },
      {
        title: "Online Booking",
        desc: "Self-service scheduling that lets clients pick a date, time, and service type in under 60 seconds.",
      },
      {
        title: "Service Packages",
        desc: "Clearly defined tiers — standard, deep clean, move-in/out — with pricing that makes the decision easy.",
      },
      {
        title: "Trust & Safety Badges",
        desc: "Background check verification, insurance info, and satisfaction guarantees displayed prominently to build trust.",
      },
      {
        title: "Customer Reviews",
        desc: "Five-star reviews with photos of spotless homes that prove you deliver on your promises every single time.",
      },
      {
        title: "Recurring Service Plans",
        desc: "Weekly, bi-weekly, and monthly plans with discounts that lock in long-term revenue for your business.",
      },
    ],
    portfolioItems: [
      { name: "SparkleClean Co.", gradient: "from-sky-600/20 to-blue-900/20" },
      { name: "FreshStart Maids", gradient: "from-teal-600/20 to-cyan-900/20" },
      { name: "PureHome Services", gradient: "from-violet-600/20 to-indigo-900/20" },
    ],
  },
};

const allNiches = Object.keys(nicheData);

export function generateStaticParams() {
  return allNiches.map((niche) => ({ niche }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ niche: string }>;
}): Promise<Metadata> {
  const { niche } = await params;
  const data = nicheData[niche];

  if (!data) {
    return { title: "Not Found | Creative Axe" };
  }

  return {
    title: `Websites for ${data.name} | Creative Axe`,
    description: data.description,
  };
}

export default async function NichePage({
  params,
}: {
  params: Promise<{ niche: string }>;
}) {
  const { niche } = await params;
  const data = nicheData[niche];

  if (!data) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        {/* Hero */}
        <section className="relative px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-light mb-4">
              Industry Specialty
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Websites for{" "}
              <span className="text-accent">{data.name}</span>
            </h1>
            <p className="mt-4 text-xl font-medium text-foreground/90 md:text-2xl">
              {data.tagline}
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted max-w-2xl mx-auto md:text-lg">
              {data.description}
            </p>
            <div className="mt-10">
              <Link
                href="/claim/demo"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90 hover:shadow-accent/40"
              >
                Get Your Free {data.name.split(" ")[0]} Website
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-light mb-3">
                Purpose-Built Features
              </p>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Built for{" "}
                <span className="text-accent">{data.name}</span>
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="bg-card border border-border rounded-2xl p-6 transition hover:bg-card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="px-6 py-20 md:py-28 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-light mb-3">
                Our Work
              </p>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Sites We&apos;ve Built for{" "}
                <span className="text-accent">{data.name}</span>
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.portfolioItems.map((item) => (
                <div
                  key={item.name}
                  className="group bg-card border border-border rounded-2xl overflow-hidden transition hover:bg-card-hover"
                >
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}
                  >
                    {/* Wireframe placeholder shapes */}
                    <div className="absolute inset-4 flex flex-col gap-3 opacity-30">
                      <div className="h-4 w-24 rounded bg-white/40" />
                      <div className="h-3 w-36 rounded bg-white/20" />
                      <div className="mt-auto flex gap-2">
                        <div className="h-8 w-20 rounded bg-white/30" />
                        <div className="h-8 w-20 rounded bg-white/20" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm">
                        <span className="text-sm font-medium text-white/70">
                          Preview
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent-light">
                      {data.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-20 md:py-28 border-t border-border">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-6xl font-extrabold text-accent sm:text-7xl">
              50+
            </p>
            <p className="mt-3 text-xl font-medium text-foreground/80">
              {data.name} sites built
            </p>
            <p className="mt-2 text-sm text-muted">
              And counting. Every one of them converts visitors into customers.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 md:py-32 border-t border-border">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Ready to{" "}
              <span className="text-accent">Stand Out</span>?
            </h2>
            <p className="mt-4 text-lg text-muted">
              Join the {data.name.toLowerCase()} that are already winning online
              with Creative Axe.
            </p>
            <div className="mt-10">
              <Link
                href="/claim/demo"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90 hover:shadow-accent/40"
              >
                Get Your Free Site
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
