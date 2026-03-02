/**
 * Creative Axe — Full Pipeline
 *
 * Usage:
 *   npx tsx src/lib/pipeline/run.ts --query "pizza restaurants" --city "Austin TX" --limit 5
 *
 * This script:
 * 1. Scrapes businesses from Google Maps
 * 2. Scores each business
 * 3. Stores in database
 * 4. Generates custom websites for top-scoring businesses
 * 5. Stores generated sites in database
 */

import { scrapeGoogleMaps } from "../scraper/google-maps";
import { scoreBusiness } from "../scorer";
import { generateSite } from "../generator/site-generator";
import { db, schema } from "../db";
import { toSlug } from "../utils";
import { eq } from "drizzle-orm";

interface PipelineOptions {
  query: string;
  city: string;
  limit?: number;
  generateTop?: number; // How many top businesses to generate sites for
  skipScrape?: boolean; // Skip scraping, use existing DB data
}

async function runPipeline(options: PipelineOptions) {
  const {
    query,
    city,
    limit = 10,
    generateTop = 5,
    skipScrape = false,
  } = options;

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  CREATIVE AXE — PIPELINE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // ── Step 1: Scrape ──────────────────────────
  let scrapedBusinesses;

  if (!skipScrape) {
    console.log(`[1/4] Scraping "${query}" in ${city} (limit: ${limit})...`);
    try {
      scrapedBusinesses = await scrapeGoogleMaps(query, city, limit);
      console.log(`  ✓ Found ${scrapedBusinesses.length} businesses\n`);
    } catch (error) {
      console.error("  ✗ Scraping failed:", error);
      return;
    }
  }

  // ── Step 2: Score & Store ───────────────────
  if (scrapedBusinesses && scrapedBusinesses.length > 0) {
    console.log("[2/4] Scoring and storing businesses...");

    for (const biz of scrapedBusinesses) {
      const { score, breakdown } = scoreBusiness(biz);
      const slug = toSlug(biz.name);

      // Check if already exists
      const existing = db
        .select()
        .from(schema.businesses)
        .where(eq(schema.businesses.slug, slug))
        .get();

      if (existing) {
        console.log(`  → ${biz.name} (slug: ${slug}) already exists, updating...`);
        db.update(schema.businesses)
          .set({
            phone: biz.phone,
            website: biz.website,
            hasWebsite: biz.hasWebsite,
            rating: biz.rating,
            reviewCount: biz.reviewCount,
            photos: biz.photos,
            reviews: biz.reviews,
            hours: biz.hours,
            description: biz.description,
            googleMapsUrl: biz.googleMapsUrl,
            placeId: biz.placeId,
            score,
            scoreBreakdown: breakdown,
            scrapedAt: new Date().toISOString(),
          })
          .where(eq(schema.businesses.slug, slug))
          .run();
      } else {
        db.insert(schema.businesses)
          .values({
            slug,
            name: biz.name,
            niche: biz.category || "generic",
            address: biz.address,
            city: biz.city,
            state: biz.state,
            zip: biz.zip,
            phone: biz.phone,
            website: biz.website,
            hasWebsite: biz.hasWebsite,
            rating: biz.rating,
            reviewCount: biz.reviewCount,
            photos: biz.photos,
            reviews: biz.reviews,
            hours: biz.hours,
            services: [],
            description: biz.description,
            googleMapsUrl: biz.googleMapsUrl,
            placeId: biz.placeId,
            score,
            scoreBreakdown: breakdown,
            source: "google_maps",
            scrapedAt: new Date().toISOString(),
          })
          .run();
      }

      const websiteStatus = biz.hasWebsite ? "Has Website" : "NO WEBSITE";
      console.log(
        `  ✓ ${biz.name} — Score: ${score} [${websiteStatus}]`
      );
    }
    console.log();
  }

  // ── Step 3: Pick top businesses ─────────────
  console.log(`[3/4] Selecting top ${generateTop} businesses for site generation...`);

  const topBusinesses = db
    .select()
    .from(schema.businesses)
    .orderBy(schema.businesses.score)
    .limit(generateTop)
    .all()
    .reverse(); // highest score first (orderBy is ASC)

  if (topBusinesses.length === 0) {
    console.log("  ✗ No businesses in database. Run scraper first.");
    return;
  }

  for (const biz of topBusinesses) {
    console.log(`  → ${biz.name} (Score: ${biz.score})`);
  }
  console.log();

  // ── Step 4: Generate custom sites ───────────
  console.log("[4/4] Generating custom websites with Claude...\n");

  for (const biz of topBusinesses) {
    // Check if site already exists
    const existingSite = db
      .select()
      .from(schema.generatedSites)
      .where(eq(schema.generatedSites.slug, biz.slug))
      .get();

    if (existingSite) {
      console.log(`  → ${biz.name}: Site already exists, skipping.`);
      continue;
    }

    console.log(`  Generating site for ${biz.name}...`);

    try {
      const site = await generateSite(
        {
          name: biz.name,
          niche: biz.niche,
          address: biz.address || "",
          city: biz.city || "",
          state: biz.state || "",
          phone: biz.phone,
          rating: biz.rating,
          reviewCount: biz.reviewCount,
          hours: (biz.hours as { day: string; time: string }[]) || [],
          photos: (biz.photos as string[]) || [],
          reviews:
            (biz.reviews as {
              author: string;
              text: string;
              rating: number;
              date: string;
            }[]) || [],
          services: (biz.services as string[]) || [],
          description: biz.description,
          logoUrl: biz.logoUrl,
          website: biz.website,
        },
        biz.slug
      );

      // Store in database
      db.insert(schema.generatedSites)
        .values({
          businessId: biz.id,
          slug: biz.slug,
          html: site.html,
          accentColor: site.accentColor,
          fontFamily: site.fontFamily,
          designStyle: site.designStyle,
          prompt: site.prompt,
          model: site.model,
          status: "draft",
        })
        .run();

      console.log(
        `  ✓ ${biz.name} — ${site.designStyle} | ${site.accentColor} | ${site.fontFamily}`
      );
    } catch (error) {
      console.error(`  ✗ Failed for ${biz.name}:`, error);
    }
  }

  // ── Summary ─────────────────────────────────
  const totalBusinesses = db
    .select()
    .from(schema.businesses)
    .all().length;
  const totalSites = db
    .select()
    .from(schema.generatedSites)
    .all().length;

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  PIPELINE COMPLETE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Businesses in DB: ${totalBusinesses}`);
  console.log(`  Sites generated:  ${totalSites}`);
  console.log(`  View sites at:    http://localhost:3000/demo/[slug]`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

// ── CLI ──────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag: string) => {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : undefined;
};

const query = getArg("--query") || "restaurants";
const city = getArg("--city") || "Austin TX";
const limit = parseInt(getArg("--limit") || "10");
const generateTop = parseInt(getArg("--generate") || "5");
const skipScrape = args.includes("--skip-scrape");

runPipeline({ query, city, limit, generateTop, skipScrape });
