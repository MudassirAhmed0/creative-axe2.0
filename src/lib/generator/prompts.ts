export interface BusinessInput {
  name: string;
  niche: string;
  address: string;
  city: string;
  state: string;
  phone: string | null;
  rating: number | null;
  reviewCount: number | null;
  hours: { day: string; time: string }[];
  photos: string[];
  reviews: { author: string; text: string; rating: number; date: string }[];
  services: string[];
  description: string | null;
  logoUrl: string | null;
  website: string | null;
}

const nicheGuidance: Record<string, string> = {
  restaurant: `This is a RESTAURANT. Key design priorities:
- Hero should feel warm and inviting — think rich food photography tones, warm lighting feel
- Feature a prominent "View Menu" or "Order Online" CTA
- Services section should feel like a menu — consider card-based layouts with categories
- Include a "Reservations" or "Order Now" button in the nav
- Use appetizing colors (warm reds, oranges, deep greens, cream/gold accents)
- Consider a parallax food image section or a full-bleed hero with overlay text
- Hours are critical — make them very visible
- If there are photos, showcase food prominently`,

  salon: `This is a SALON / BEAUTY business. Key design priorities:
- Design should feel premium, stylish, and aspirational
- Hero should be glamorous — think editorial fashion magazine layouts
- Feature a prominent "Book Appointment" CTA — this is the #1 goal
- Services section should show pricing tiers or packages if possible
- Use elegant, fashion-forward colors (rose gold, blush, deep plum, black/white contrast)
- Consider an asymmetric layout or magazine-style grid
- Gallery section for before/after or portfolio photos is essential
- Add a "Meet Our Stylists" or team section feel`,

  plumber: `This is a PLUMBER / HOME SERVICE business. Key design priorities:
- Design should feel trustworthy, professional, and urgent
- Hero should convey reliability — badges, certifications, "Licensed & Insured"
- Feature a PROMINENT "Call Now" button — make the phone number huge and clickable
- Add an "Emergency? Call 24/7" banner or section
- Services should feel organized and clear — homeowners need to find their problem fast
- Use strong, trustworthy colors (navy blue, slate, deep green, safety orange accents)
- Include trust signals: years in business, license numbers, "100% Satisfaction Guaranteed"
- Make the contact section impossible to miss`,

  dentist: `This is a DENTAL PRACTICE. Key design priorities:
- Design should feel clean, modern, calming, and professional
- Hero should be welcoming and reduce dental anxiety — warm, friendly imagery
- Feature a prominent "Book Appointment" or "Schedule a Visit" CTA
- Services section should be informative but not overwhelming
- Use calming, medical-professional colors (soft blue, teal, clean white, gentle green)
- Include trust signals: credentials, "Accepting New Patients", insurance info
- Add a "Meet the Doctor" section feel
- Patient comfort messaging is key — "Gentle Care", "Pain-Free", etc.`,

  "auto-repair": `This is an AUTO REPAIR / MECHANIC business. Key design priorities:
- Design should feel honest, competent, and no-nonsense
- Hero should convey expertise — think clean garage, professional tools
- Feature a prominent "Get a Quote" or "Schedule Service" CTA
- Add a "Check Engine Light?" or problem-diagnostic feel
- Services should be organized by vehicle system or common problems
- Use strong, industrial colors (deep red, charcoal, steel gray, yellow accents)
- Include trust signals: ASE certified, warranty info, years of experience
- Make the phone number and address very prominent`,

  fitness: `This is a FITNESS / GYM business. Key design priorities:
- Design should feel energetic, motivating, and bold
- Hero should be high-energy — dynamic angles, bold typography
- Feature a prominent "Start Free Trial" or "Join Now" CTA
- Services section should showcase class types and training options
- Use energetic colors (electric green, bold orange, deep black, vibrant red)
- Consider bold geometric shapes and strong contrast
- Include a "Class Schedule" link or section
- Transformation stories / success metrics are powerful`,

  landscaping: `This is a LANDSCAPING business. Key design priorities:
- Design should feel natural, premium, and transformative
- Hero should showcase beautiful outdoor spaces — before/after potential
- Feature a prominent "Get Free Quote" CTA
- Services section should show the range from maintenance to full design
- Use natural, earthy colors (forest green, warm brown, terracotta, sage)
- Consider organic shapes, leaf/botanical accents in the design
- Portfolio/gallery section is crucial — show completed projects
- Seasonal services should be highlighted`,

  cleaning: `This is a CLEANING SERVICE business. Key design priorities:
- Design should feel fresh, spotless, and trustworthy
- Hero should convey cleanliness and professionalism
- Feature a prominent "Get Instant Quote" or "Book Online" CTA
- Services section should clearly differentiate residential vs commercial
- Use clean, fresh colors (crisp white, sky blue, mint green, clean teal)
- Include trust signals: bonded & insured, background-checked, eco-friendly products
- Before/after imagery concept works well
- Make booking easy — checklist-style service selection feel`,
};

function getDefaultNicheGuidance(niche: string): string {
  return `This is a ${niche.toUpperCase()} business. Design it to feel premium and appropriate for this industry. Choose colors, layouts, and CTAs that would make sense for a ${niche} business. Think about what a customer of this type of business would want to see and do on the website.`;
}

function formatHours(hours: { day: string; time: string }[]): string {
  if (!hours || hours.length === 0) return "Hours not available";
  return hours.map((h) => `  ${h.day}: ${h.time}`).join("\n");
}

function formatReviews(
  reviews: { author: string; text: string; rating: number; date: string }[]
): string {
  if (!reviews || reviews.length === 0) return "No reviews available";
  return reviews
    .slice(0, 6)
    .map(
      (r, i) =>
        `  Review ${i + 1}:
    Author: ${r.author}
    Rating: ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)} (${r.rating}/5)
    Date: ${r.date}
    Text: "${r.text}"`
    )
    .join("\n\n");
}

function formatServices(services: string[]): string {
  if (!services || services.length === 0) return "No specific services listed";
  return services.map((s) => `  - ${s}`).join("\n");
}

export function buildSystemPrompt(): string {
  return `You are a world-class senior web designer and front-end developer at a premium digital agency. You have 15+ years of experience crafting award-winning websites for local businesses. Your designs have been featured in Awwwards, CSS Design Awards, and Webby Awards.

Your mission: Create a COMPLETE, UNIQUE, hand-crafted single-page website that looks like it cost $5,000+ to build. Every website you create must be genuinely different — different color schemes, different layouts, different font pairings, different hero styles, different section arrangements.

CRITICAL RULES:
1. Output ONLY the complete HTML. No explanations, no markdown code fences, no commentary. Just the raw HTML starting with <!DOCTYPE html> and ending with </html>.
2. Everything must be in a SINGLE HTML file — all CSS inline in a <style> tag, all JS inline in a <script> tag.
3. Use REAL data provided — never invent fake data or placeholder text like "Lorem ipsum".
4. Every design must be UNIQUE. Vary these across sites:
   - Color palette (primary, secondary, accent, background, text colors)
   - Google Fonts pairing (pick 2 complementary fonts — one for headings, one for body)
   - Hero section style (full-bleed image, split layout, minimal centered, diagonal clip, gradient overlay, etc.)
   - Section order and layout (don't always go hero → about → services → reviews → contact)
   - Visual elements (rounded vs sharp corners, card styles, divider styles, background patterns)
   - Navigation style (centered, left-aligned, transparent overlay, sticky colored, etc.)
   - CTA button styles (rounded pills, sharp rectangles, ghost buttons, gradient fills, etc.)
5. Make it FULLY responsive — mobile-first CSS with clean breakpoints.
6. Keep it FAST — no external frameworks (no Bootstrap, no Tailwind CDN). Only Google Fonts as an external resource.
7. Use semantic HTML5 elements (header, nav, main, section, article, footer).
8. Add smooth scroll behavior and subtle CSS transitions/animations where appropriate.
9. Include a <meta name="viewport"> tag and proper <meta charset>.
10. If photos are provided, use them via <img> tags. If no photos, create beautiful CSS gradients, patterns, or abstract shapes as visual elements.
11. All phone numbers should be clickable tel: links. All addresses should link to Google Maps.
12. Star ratings should be rendered visually (using CSS or unicode stars).
13. Keep the JavaScript minimal — smooth scrolling, maybe a mobile menu toggle, nothing more.
14. The design should feel ALIVE — use subtle hover effects, transitions, and visual depth (shadows, layering).

You are not filling in a template. You are designing a CUSTOM website from scratch every single time.`;
}

export function buildUserPrompt(business: BusinessInput, slug: string): string {
  const guidance =
    nicheGuidance[business.niche] ||
    getDefaultNicheGuidance(business.niche);

  const photoSection =
    business.photos && business.photos.length > 0
      ? `PHOTOS (use these real images):
${business.photos.map((p, i) => `  Photo ${i + 1}: ${p}`).join("\n")}

Use these photos throughout the site — in the hero, gallery sections, service cards, or background images. Make them look great with proper object-fit and aspect ratios.`
      : `NO PHOTOS AVAILABLE. Instead of placeholder images, create beautiful visual elements using:
- CSS gradients (linear, radial, conic)
- Abstract CSS shapes and patterns
- Decorative borders, overlays, and background textures
- SVG-based decorative elements inline
Make the site visually rich even without photographs.`;

  const logoSection = business.logoUrl
    ? `LOGO: ${business.logoUrl} (use this in the nav and footer)`
    : `NO LOGO. Use the business name as styled text in the nav. Make it look like a wordmark — choose a distinctive font weight/style.`;

  const ratingSection =
    business.rating !== null
      ? `RATING: ${business.rating}/5 stars (${business.reviewCount || 0} reviews on Google)
Feature this prominently — it's social proof. Show it in the hero or near the top.`
      : `No rating data available. Skip rating display.`;

  const existingWebsite = business.website
    ? `They currently have a website at ${business.website} — your design should be DRAMATICALLY better.`
    : `They currently have NO website — this will be their first real web presence.`;

  return `Design a complete, custom website for this local business:

═══════════════════════════════════════
BUSINESS INFORMATION
═══════════════════════════════════════

Business Name: ${business.name}
Business Type: ${business.niche}
Location: ${business.address}, ${business.city}, ${business.state}
Phone: ${business.phone || "Not available"}
${existingWebsite}

${ratingSection}

${logoSection}

HOURS OF OPERATION:
${formatHours(business.hours)}

DESCRIPTION:
${business.description || `${business.name} is a local ${business.niche} business serving ${business.city}, ${business.state}.`}

SERVICES / OFFERINGS:
${formatServices(business.services)}

CUSTOMER REVIEWS:
${formatReviews(business.reviews)}

${photoSection}

═══════════════════════════════════════
NICHE-SPECIFIC DESIGN GUIDANCE
═══════════════════════════════════════

${guidance}

═══════════════════════════════════════
REQUIRED ELEMENTS
═══════════════════════════════════════

1. CLAIM BANNER (very top of page, fixed/sticky):
   - Text: "This is a free preview built for ${business.name}. Claim this website →"
   - Link the "Claim this website →" part to: /claim/${slug}
   - Use an eye-catching accent color background
   - Should be attention-grabbing but not obnoxious (thin bar, ~40-50px height)
   - Include a small X button to dismiss it (JS to hide)
   - Add a subtle pulse or glow animation to the CTA link

2. NAVIGATION:
   - Business name/logo
   - Key section links (smooth scroll)
   - Primary CTA button (Call Now / Book Now / Get Quote — niche appropriate)
   - Mobile hamburger menu

3. HERO SECTION:
   - Business name prominently displayed
   - A compelling tagline (create one that fits the business)
   - Key info (rating, location snippet)
   - Primary + secondary CTA buttons
   - Make this section visually STUNNING

4. ABOUT SECTION:
   - Business description
   - Key differentiators or highlights
   - Trust signals if applicable

5. SERVICES SECTION:
   - Display ALL services/offerings provided
   - Use creative card layouts, grids, or unique arrangements
   - Highlight key/featured services

6. REVIEWS/TESTIMONIALS:
   - Show real customer reviews
   - Star ratings visualized
   - Author names and dates
   - Creative layout (cards, carousel feel, quote-style, etc.)

7. CONTACT SECTION:
   - Full address (linked to Google Maps: https://maps.google.com/?q=${encodeURIComponent(business.address + ", " + business.city + ", " + business.state)})
   - Phone number (as clickable tel: link)
   - Business hours displayed clearly
   - CTA buttons (Call, Directions, etc.)

8. FOOTER:
   - Business name and location
   - Quick links
   - "Powered by Creative Axe" (link to https://creativeaxe.co) — make it subtle, small text
   - Copyright ${new Date().getFullYear()}

═══════════════════════════════════════
DESIGN UNIQUENESS INSTRUCTIONS
═══════════════════════════════════════

Make this site GENUINELY UNIQUE. Here are specific things to vary:

- Pick a unique color palette (2-4 colors) that matches the business vibe and name
- Choose 2 Google Fonts that pair well (import via <link> tag)
- Experiment with layout: try asymmetric grids, overlapping elements, angled sections, floating cards
- Try different hero styles: full-width image bg, split 50/50, minimal centered, diagonal clip-path, gradient mesh
- Use creative section dividers: SVG waves, diagonal cuts, curved edges — not just flat separations
- Add visual personality: custom shapes, decorative borders, subtle background patterns
- Make interactive elements delightful: hover transforms, color shifts, subtle shadows

The business name "${business.name}" should inspire your design direction. Let the name, location, and niche guide your creative choices.

Remember: Output ONLY the HTML. No code fences. No explanation. Start with <!DOCTYPE html>.`;
}
