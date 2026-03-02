import puppeteer, { Browser, Page } from "puppeteer";

export interface ScrapedBusiness {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string | null;
  website: string | null;
  hasWebsite: boolean;
  rating: number | null;
  reviewCount: number | null;
  hours: { day: string; time: string }[];
  photos: string[];
  reviews: { author: string; text: string; rating: number; date: string }[];
  category: string;
  description: string | null;
  googleMapsUrl: string;
  placeId: string | null;
}

interface ScrapeOptions {
  headless?: boolean;
  timeout?: number;
}

/**
 * Random delay between min and max milliseconds to avoid rate limiting.
 */
function randomDelay(min = 1000, max = 3000): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extract the place ID from a Google Maps URL.
 * Google Maps URLs contain place IDs in formats like:
 *   /maps/place/.../data=...!1s0x...!...
 *   or as a ChIJ... pattern in the URL
 */
function extractPlaceId(url: string): string | null {
  // Try the ChIJ format (most common place ID prefix)
  const chijMatch = url.match(/ChIJ[\w-]+/);
  if (chijMatch) return chijMatch[0];

  // Try extracting from the data parameter (0x hex format)
  const hexMatch = url.match(/0x[\da-fA-F]+:0x[\da-fA-F]+/);
  if (hexMatch) return hexMatch[0];

  return null;
}

/**
 * Parse a full address string into components.
 * Expected formats: "123 Main St, Austin, TX 78701" or similar.
 */
function parseAddress(fullAddress: string): {
  address: string;
  city: string;
  state: string;
  zip: string;
} {
  const parts = fullAddress.split(",").map((s) => s.trim());

  if (parts.length >= 3) {
    const address = parts.slice(0, -2).join(", ");
    const city = parts[parts.length - 2];
    const stateZip = parts[parts.length - 1].trim();
    const stateZipMatch = stateZip.match(/^([A-Z]{2})\s*(\d{5}(?:-\d{4})?)?$/);
    if (stateZipMatch) {
      return {
        address,
        city,
        state: stateZipMatch[1],
        zip: stateZipMatch[2] || "",
      };
    }
    return { address, city, state: stateZip, zip: "" };
  }

  if (parts.length === 2) {
    const stateZipMatch = parts[1].match(
      /^([A-Z]{2})\s*(\d{5}(?:-\d{4})?)?$/
    );
    if (stateZipMatch) {
      return {
        address: parts[0],
        city: "",
        state: stateZipMatch[1],
        zip: stateZipMatch[2] || "",
      };
    }
    return { address: parts[0], city: parts[1], state: "", zip: "" };
  }

  return { address: fullAddress, city: "", state: "", zip: "" };
}

/**
 * Wait for a selector with a custom timeout, returning null if not found.
 */
async function safeWaitForSelector(
  page: Page,
  selector: string,
  timeout = 5000
): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { timeout });
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely extract text content from a selector.
 */
async function safeTextContent(
  page: Page,
  selector: string
): Promise<string | null> {
  try {
    const el = await page.$(selector);
    if (!el) return null;
    const text = await page.evaluate((e) => e.textContent?.trim() ?? null, el);
    return text;
  } catch {
    return null;
  }
}

/**
 * Scroll the results panel to load more results.
 */
async function scrollResultsList(page: Page, times = 5): Promise<void> {
  const scrollable = await page.$('div[role="feed"]');
  if (!scrollable) return;

  for (let i = 0; i < times; i++) {
    await page.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    }, scrollable);
    await randomDelay(1500, 2500);
  }
}

/**
 * Extract business details from the detail panel that opens
 * when you click on a business in Google Maps.
 */
async function extractBusinessDetails(
  page: Page,
  timeout = 30000
): Promise<Partial<ScrapedBusiness> | null> {
  const details: Partial<ScrapedBusiness> = {};

  try {
    // Wait for the detail panel to load
    const panelLoaded = await safeWaitForSelector(
      page,
      'h1, [data-attrid="title"]',
      timeout
    );
    if (!panelLoaded) return null;

    await randomDelay(1000, 2000);

    // ---- Name ----
    details.name = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      return h1?.textContent?.trim() ?? "";
    });

    // ---- Google Maps URL ----
    details.googleMapsUrl = page.url();
    details.placeId = extractPlaceId(details.googleMapsUrl);

    // ---- Rating and review count ----
    const ratingData = await page.evaluate(() => {
      // Rating is usually in a span with aria-label like "4.5 stars"
      const ratingEl = document.querySelector('div.F7nice span[aria-hidden="true"]');
      const rating = ratingEl ? parseFloat(ratingEl.textContent ?? "0") : null;

      // Review count - look for the reviews count in parentheses
      const reviewEls = document.querySelectorAll('div.F7nice span[aria-label]');
      let reviewCount: number | null = null;
      for (const el of Array.from(reviewEls)) {
        const label = el.getAttribute("aria-label") ?? "";
        const match = label.match(/([\d,]+)\s*review/i);
        if (match) {
          reviewCount = parseInt(match[1].replace(/,/g, ""), 10);
          break;
        }
      }

      return { rating, reviewCount };
    });
    details.rating = ratingData.rating;
    details.reviewCount = ratingData.reviewCount;

    // ---- Category ----
    details.category = await page.evaluate(() => {
      // Category button is usually right below the title
      const categoryButton = document.querySelector(
        'button[jsaction*="category"]'
      );
      if (categoryButton) return categoryButton.textContent?.trim() ?? "";

      // Fallback: look for the category span
      const spans = document.querySelectorAll("span.DkEaL");
      if (spans.length > 0) return spans[0].textContent?.trim() ?? "";

      return "";
    }) ?? "";

    // ---- Address ----
    const fullAddress = await page.evaluate(() => {
      // Address is usually in an aria-label containing "Address:"
      const addressButton = document.querySelector(
        'button[data-item-id="address"]'
      );
      if (addressButton) {
        const label = addressButton.getAttribute("aria-label") ?? "";
        return label.replace(/^Address:\s*/i, "").trim();
      }

      // Fallback: look for the address info item
      const addressEl = document.querySelector(
        '[data-tooltip="Copy address"] .Io6YTe, [aria-label*="Address"] .Io6YTe'
      );
      return addressEl?.textContent?.trim() ?? "";
    });

    if (fullAddress) {
      const parsed = parseAddress(fullAddress);
      details.address = parsed.address;
      details.city = parsed.city;
      details.state = parsed.state;
      details.zip = parsed.zip;
    } else {
      details.address = "";
      details.city = "";
      details.state = "";
      details.zip = "";
    }

    // ---- Phone ----
    details.phone = await page.evaluate(() => {
      const phoneButton = document.querySelector(
        'button[data-item-id^="phone:"]'
      );
      if (phoneButton) {
        const label = phoneButton.getAttribute("aria-label") ?? "";
        return label.replace(/^Phone:\s*/i, "").trim() || null;
      }

      const phoneEl = document.querySelector(
        '[data-tooltip="Copy phone number"] .Io6YTe'
      );
      return phoneEl?.textContent?.trim() ?? null;
    });

    // ---- Website ----
    details.website = await page.evaluate(() => {
      const websiteLink = document.querySelector(
        'a[data-item-id="authority"]'
      );
      if (websiteLink) {
        return websiteLink.getAttribute("href") ?? null;
      }

      const websiteButton = document.querySelector(
        'button[data-item-id="authority"]'
      );
      if (websiteButton) {
        const label = websiteButton.getAttribute("aria-label") ?? "";
        const urlMatch = label.match(/https?:\/\/[^\s]+/);
        return urlMatch ? urlMatch[0] : label.replace(/^Website:\s*/i, "").trim() || null;
      }

      return null;
    });
    details.hasWebsite = details.website !== null && details.website.length > 0;

    // ---- Hours ----
    details.hours = await page.evaluate(() => {
      const hours: { day: string; time: string }[] = [];

      // Try clicking the hours dropdown to expand it
      const hoursEl = document.querySelector(
        '[data-item-id*="oh"], [aria-label*="hours"], .OqCZI'
      );
      if (hoursEl instanceof HTMLElement) {
        hoursEl.click();
      }

      // Wait a bit then read hours from the table
      const rows = document.querySelectorAll("table.eK4R0e tr, table.WgFkxc tr");
      for (const row of Array.from(rows)) {
        const cells = row.querySelectorAll("td");
        if (cells.length >= 2) {
          hours.push({
            day: cells[0].textContent?.trim() ?? "",
            time: cells[1].textContent?.trim() ?? "",
          });
        }
      }

      // Fallback: try aria-label on the hours section
      if (hours.length === 0) {
        const hoursLabels = document.querySelectorAll(
          '[aria-label*="Monday"], [aria-label*="Tuesday"], [aria-label*="hours"]'
        );
        for (const el of Array.from(hoursLabels)) {
          const label = el.getAttribute("aria-label") ?? "";
          if (label.includes(",")) {
            const parts = label.split(",");
            for (const part of parts) {
              const dayMatch = part.match(
                /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)[,:]?\s*(.*)/i
              );
              if (dayMatch) {
                hours.push({ day: dayMatch[1], time: dayMatch[2].trim() });
              }
            }
          }
        }
      }

      return hours;
    });

    // ---- Description ----
    details.description = await page.evaluate(() => {
      // The "about" or editorial summary section
      const aboutEl = document.querySelector(
        '[class*="PYvSYb"], [class*="editorial-summary"] span, div.WeS02d div'
      );
      return aboutEl?.textContent?.trim() ?? null;
    });

    // ---- Photos ----
    details.photos = await page.evaluate(() => {
      const photoUrls: string[] = [];
      const images = document.querySelectorAll(
        'button[jsaction*="photo"] img, div.p0Jvbd img, img.p0Jvbd, div[role="img"] img, .ZKbJE img'
      );
      for (const img of Array.from(images)) {
        const src = img.getAttribute("src");
        if (
          src &&
          !src.includes("data:image") &&
          !src.includes("maps/vt") &&
          !src.includes("googleapis.com/mapfiles")
        ) {
          photoUrls.push(src);
        }
      }

      // Also grab background images from photo tiles
      const tiles = document.querySelectorAll(
        'button[jsaction*="photo"], .ZKbJE'
      );
      for (const tile of Array.from(tiles)) {
        const style = (tile as HTMLElement).style.backgroundImage;
        if (style) {
          const urlMatch = style.match(/url\(["']?(.*?)["']?\)/);
          if (urlMatch && !urlMatch[1].includes("data:image")) {
            photoUrls.push(urlMatch[1]);
          }
        }
      }

      return Array.from(new Set(photoUrls));
    });

    // ---- Reviews ----
    details.reviews = await extractReviews(page);

    return details;
  } catch (error) {
    console.error(
      `Error extracting details for ${details.name ?? "unknown"}:`,
      error
    );
    return details;
  }
}

/**
 * Extract top reviews from the business detail panel.
 * Clicks the reviews tab/section to load reviews if needed.
 */
async function extractReviews(
  page: Page,
  maxReviews = 10
): Promise<{ author: string; text: string; rating: number; date: string }[]> {
  const reviews: { author: string; text: string; rating: number; date: string }[] = [];

  try {
    // Try clicking the reviews tab to load reviews
    const reviewsTab = await page.$(
      'button[aria-label*="Reviews"], button[data-tab-index="1"]'
    );
    if (reviewsTab) {
      await reviewsTab.click();
      await randomDelay(1500, 2500);
    }

    // Wait for reviews to appear
    await safeWaitForSelector(page, '[data-review-id], .jftiEf', 5000);

    const reviewData = await page.evaluate((limit: number) => {
      const result: {
        author: string;
        text: string;
        rating: number;
        date: string;
      }[] = [];

      const reviewEls = document.querySelectorAll(
        '[data-review-id], .jftiEf'
      );

      for (const reviewEl of Array.from(reviewEls).slice(0, limit)) {
        // Author name
        const authorEl = reviewEl.querySelector(
          '.d4r55, [class*="reviewer"] a, .WNxzHc a'
        );
        const author = authorEl?.textContent?.trim() ?? "Anonymous";

        // Rating - count filled stars or read aria-label
        let rating = 0;
        const starsEl = reviewEl.querySelector(
          '[aria-label*="star"], [role="img"][aria-label]'
        );
        if (starsEl) {
          const label = starsEl.getAttribute("aria-label") ?? "";
          const ratingMatch = label.match(/(\d)/);
          if (ratingMatch) rating = parseInt(ratingMatch[1], 10);
        }

        // Review text
        const textEl = reviewEl.querySelector(
          '.wiI7pd, [class*="review-text"], .MyEned span'
        );
        const text = textEl?.textContent?.trim() ?? "";

        // Date
        const dateEl = reviewEl.querySelector(
          '.rsqaWe, [class*="review-publish-date"], .DU9Pgb'
        );
        const date = dateEl?.textContent?.trim() ?? "";

        if (author || text) {
          result.push({ author, text, rating, date });
        }
      }

      return result;
    }, maxReviews);

    reviews.push(...reviewData);

    // Navigate back to the overview tab
    const overviewTab = await page.$(
      'button[aria-label*="Overview"], button[data-tab-index="0"]'
    );
    if (overviewTab) {
      await overviewTab.click();
      await randomDelay(500, 1000);
    }
  } catch (error) {
    console.error("Error extracting reviews:", error);
  }

  return reviews;
}

/**
 * Scrape Google Maps for businesses matching the given query and city.
 *
 * @param query - Search term, e.g. "pizza restaurants"
 * @param city - City and optionally state, e.g. "Austin TX"
 * @param limit - Maximum number of results to return (default 20)
 * @param options - Additional options (headless mode, timeout)
 * @returns Array of scraped business data
 */
export async function scrapeGoogleMaps(
  query: string,
  city: string,
  limit = 20,
  options: ScrapeOptions = {}
): Promise<ScrapedBusiness[]> {
  const { headless = true, timeout = 30000 } = options;
  const businesses: ScrapedBusiness[] = [];
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--window-size=1920,1080",
      ],
      defaultViewport: { width: 1920, height: 1080 },
    });

    const page = await browser.newPage();

    // Set a realistic user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Navigate to Google Maps search
    const searchQuery = encodeURIComponent(`${query} in ${city}`);
    const url = `https://www.google.com/maps/search/${searchQuery}/`;

    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await randomDelay(2000, 3000);

    // Accept cookies/consent if prompted
    try {
      const consentButton = await page.$(
        'button[aria-label="Accept all"], form[action*="consent"] button'
      );
      if (consentButton) {
        await consentButton.click();
        await randomDelay(1000, 2000);
      }
    } catch {
      // No consent dialog, continue
    }

    // Wait for results to load
    const resultsLoaded = await safeWaitForSelector(
      page,
      'div[role="feed"], div[role="article"]',
      15000
    );

    if (!resultsLoaded) {
      console.warn(
        "Could not find results feed. The page structure may have changed."
      );
      return businesses;
    }

    // Scroll to load more results
    const scrollTimes = Math.ceil(limit / 7); // ~7 results per scroll
    console.log(`Scrolling ${scrollTimes} times to load results...`);
    await scrollResultsList(page, scrollTimes);

    // Collect all result links
    const resultLinks = await page.evaluate(() => {
      const links: string[] = [];
      const anchors = document.querySelectorAll('a[href*="/maps/place/"]');
      for (const a of Array.from(anchors)) {
        const href = a.getAttribute("href");
        if (href && !links.includes(href)) {
          links.push(href);
        }
      }
      return links;
    });

    console.log(`Found ${resultLinks.length} results, processing up to ${limit}...`);

    const linksToProcess = resultLinks.slice(0, limit);

    for (let i = 0; i < linksToProcess.length; i++) {
      const link = linksToProcess[i];
      console.log(
        `Processing ${i + 1}/${linksToProcess.length}: ${link.slice(0, 80)}...`
      );

      try {
        // Navigate to the business detail page
        await page.goto(link, { waitUntil: "networkidle2", timeout });
        await randomDelay(1500, 2500);

        const details = await extractBusinessDetails(page, timeout);

        if (details && details.name) {
          // Fill in defaults for missing fields
          const business: ScrapedBusiness = {
            name: details.name ?? "",
            address: details.address ?? "",
            city: details.city ?? "",
            state: details.state ?? "",
            zip: details.zip ?? "",
            phone: details.phone ?? null,
            website: details.website ?? null,
            hasWebsite: details.hasWebsite ?? false,
            rating: details.rating ?? null,
            reviewCount: details.reviewCount ?? null,
            hours: details.hours ?? [],
            photos: details.photos ?? [],
            reviews: details.reviews ?? [],
            category: details.category ?? "",
            description: details.description ?? null,
            googleMapsUrl: details.googleMapsUrl ?? link,
            placeId: details.placeId ?? null,
          };

          businesses.push(business);
          console.log(
            `  -> ${business.name} | ${business.rating ?? "N/A"} stars | ${business.reviewCount ?? 0} reviews | website: ${business.hasWebsite}`
          );
        }
      } catch (error) {
        console.error(`  -> Failed to process business at ${link}:`, error);
        // Continue with the next business
      }

      await randomDelay(1000, 2000);
    }

    console.log(
      `\nDone! Scraped ${businesses.length} businesses for "${query}" in ${city}.`
    );
    return businesses;
  } catch (error) {
    console.error("Scraping failed:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export default scrapeGoogleMaps;
