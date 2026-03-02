import type { ScrapedBusiness } from "@/lib/scraper/google-maps";

export interface ScoreResult {
  score: number;
  breakdown: Record<string, number>;
}

/**
 * Score a scraped business based on how good a lead they are
 * for Creative Axe's services. Higher score = better lead.
 *
 * Scoring criteria:
 *   - No website at all:       +50 points (highest priority lead)
 *   - Has website, no HTTPS:   +35 points (needs a modern site)
 *   - Rating >= 4.0:           +10 points (good business worth helping)
 *   - Has phone number:         +5 points (contactable)
 *   - Has photos:               +5 points (active on Google Maps)
 *   - Review count > 10:        +5 points (established business)
 *   - Has hours listed:         +5 points (active listing)
 *   - Has description:          +5 points (cares about online presence)
 */
export function scoreBusiness(business: ScrapedBusiness): ScoreResult {
  const breakdown: Record<string, number> = {};
  let score = 0;

  // No website — strongest signal they need our service
  if (!business.hasWebsite || !business.website) {
    breakdown["no_website"] = 50;
    score += 50;
  } else if (
    business.website &&
    !business.website.startsWith("https://")
  ) {
    // Has a website but it's not HTTPS — still a strong lead
    breakdown["no_https"] = 35;
    score += 35;
  }

  // Good rating — worth reaching out to a quality business
  if (business.rating !== null && business.rating >= 4.0) {
    breakdown["high_rating"] = 10;
    score += 10;
  }

  // Has phone number — we can actually contact them
  if (business.phone) {
    breakdown["has_phone"] = 5;
    score += 5;
  }

  // Has photos — they care about their presence somewhat
  if (business.photos.length > 0) {
    breakdown["has_photos"] = 5;
    score += 5;
  }

  // Established with reviews — not a ghost listing
  if (business.reviewCount !== null && business.reviewCount > 10) {
    breakdown["review_count"] = 5;
    score += 5;
  }

  // Has hours listed — active business
  if (business.hours.length > 0) {
    breakdown["has_hours"] = 5;
    score += 5;
  }

  // Has description — engaged with their listing
  if (business.description) {
    breakdown["has_description"] = 5;
    score += 5;
  }

  return { score, breakdown };
}

export default scoreBusiness;
