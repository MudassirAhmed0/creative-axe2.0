import Anthropic from "@anthropic-ai/sdk";
import { BusinessInput, buildSystemPrompt, buildUserPrompt } from "./prompts";

export type { BusinessInput } from "./prompts";

export interface GeneratedSite {
  html: string;
  accentColor: string;
  fontFamily: string;
  designStyle: string;
  prompt: string;
  model: string;
}

const MODEL = "claude-sonnet-4-6";

/**
 * Extract the accent/primary color from the generated HTML.
 * Looks for common patterns: CSS custom properties, hex colors in key positions, etc.
 */
function extractAccentColor(html: string): string {
  // Try to find a CSS custom property like --accent, --primary, --brand
  const customPropMatch = html.match(
    /--(?:accent|primary|brand|main)[-\w]*\s*:\s*(#[0-9a-fA-F]{3,8})/
  );
  if (customPropMatch) return customPropMatch[1];

  // Try to find the claim banner background color (usually the accent)
  const bannerBgMatch = html.match(
    /claim[^}]*background(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,8})/i
  );
  if (bannerBgMatch) return bannerBgMatch[1];

  // Look for the first non-white, non-black hex color used in a background
  const bgColorMatches = html.matchAll(
    /background(?:-color)?\s*:\s*(#[0-9a-fA-F]{6})/g
  );
  for (const match of bgColorMatches) {
    const color = match[1].toLowerCase();
    if (
      color !== "#ffffff" &&
      color !== "#000000" &&
      color !== "#f5f5f5" &&
      color !== "#f8f8f8" &&
      color !== "#fafafa" &&
      color !== "#f0f0f0" &&
      color !== "#eeeeee"
    ) {
      return color;
    }
  }

  return "#f97316"; // fallback
}

/**
 * Extract the primary font family from the generated HTML.
 * Looks for Google Fonts import or font-family declarations.
 */
function extractFontFamily(html: string): string {
  // Try to find Google Fonts import
  const googleFontMatch = html.match(
    /fonts\.googleapis\.com\/css2?\?family=([^&"'\s]+)/
  );
  if (googleFontMatch) {
    const fontName = decodeURIComponent(googleFontMatch[1])
      .replace(/\+/g, " ")
      .split(":")[0];
    return fontName;
  }

  // Try to find font-family on body or heading
  const fontFamilyMatch = html.match(
    /(?:body|h1|\.heading|header)\s*\{[^}]*font-family\s*:\s*['"]?([^'",;]+)/i
  );
  if (fontFamilyMatch) return fontFamilyMatch[1].trim();

  return "Inter";
}

/**
 * Infer a design style label from the HTML content.
 */
function inferDesignStyle(html: string): string {
  const lower = html.toLowerCase();

  const signals = {
    minimal: 0,
    bold: 0,
    elegant: 0,
    warm: 0,
    modern: 0,
    rustic: 0,
    playful: 0,
    corporate: 0,
  };

  // Check for minimal signals
  if (lower.includes("max-width: 800px") || lower.includes("max-width: 900px"))
    signals.minimal++;
  if ((lower.match(/#fff/g) || []).length > 5) signals.minimal++;
  if (lower.includes("letter-spacing")) signals.minimal++;

  // Check for bold signals
  if (lower.includes("text-transform: uppercase")) signals.bold++;
  if (lower.includes("font-weight: 900") || lower.includes("font-weight: 800"))
    signals.bold++;
  if (lower.includes("clip-path")) signals.bold++;
  if (lower.includes("gradient")) signals.bold++;

  // Check for elegant signals
  if (lower.includes("serif") && !lower.includes("sans-serif"))
    signals.elegant++;
  if (lower.includes("italic")) signals.elegant++;
  if (
    lower.includes("gold") ||
    lower.includes("#d4af37") ||
    lower.includes("#c9a96e")
  )
    signals.elegant++;
  if (lower.includes("letter-spacing: 0.") || lower.includes("letter-spacing: 2"))
    signals.elegant++;

  // Check for warm signals
  if (
    lower.includes("#f97316") ||
    lower.includes("#ea580c") ||
    lower.includes("#dc2626") ||
    lower.includes("warm")
  )
    signals.warm++;
  if (lower.includes("border-radius: 1") || lower.includes("border-radius: 2"))
    signals.warm++;
  if (lower.includes("rounded")) signals.warm++;

  // Check for modern signals
  if (lower.includes("grid")) signals.modern++;
  if (lower.includes("backdrop-filter") || lower.includes("blur"))
    signals.modern++;
  if (lower.includes("rgba") || lower.includes("hsla")) signals.modern++;
  if (lower.includes("transform")) signals.modern++;

  // Check for rustic signals
  if (
    lower.includes("brown") ||
    lower.includes("#8b4513") ||
    lower.includes("slab")
  )
    signals.rustic++;
  if (lower.includes("texture") || lower.includes("wood")) signals.rustic++;

  // Check for playful signals
  if (lower.includes("rotate") || lower.includes("skew")) signals.playful++;
  if (lower.includes("bounce") || lower.includes("wiggle")) signals.playful++;
  if (lower.includes("emoji") || lower.includes("fun")) signals.playful++;

  // Find top 2 signals
  const sorted = Object.entries(signals).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0];
  const secondary = sorted[1];

  if (primary[1] === 0) return "custom-crafted";
  if (secondary[1] > 0 && secondary[1] >= primary[1] - 1) {
    return `${primary[0]}-${secondary[0]}`;
  }
  return primary[0];
}

/**
 * Clean Claude's response to extract just the HTML.
 * Handles cases where Claude might wrap in code fences or add commentary.
 */
function extractHtml(response: string): string {
  let html = response.trim();

  // Remove markdown code fences if present
  if (html.startsWith("```html")) {
    html = html.slice(7);
  } else if (html.startsWith("```")) {
    html = html.slice(3);
  }
  if (html.endsWith("```")) {
    html = html.slice(0, -3);
  }

  html = html.trim();

  // If there's text before <!DOCTYPE, strip it
  const doctypeIndex = html.indexOf("<!DOCTYPE");
  if (doctypeIndex === -1) {
    // Try lowercase
    const doctypeLower = html.indexOf("<!doctype");
    if (doctypeLower > 0) {
      html = html.slice(doctypeLower);
    }
  } else if (doctypeIndex > 0) {
    html = html.slice(doctypeIndex);
  }

  // If there's text after </html>, strip it
  const htmlEndIndex = html.lastIndexOf("</html>");
  if (htmlEndIndex !== -1) {
    html = html.slice(0, htmlEndIndex + 7);
  }

  return html.trim();
}

/**
 * Generate a complete, unique, custom website for a business using Claude.
 *
 * @param business - The business data scraped from Google Maps
 * @param slug - URL-safe slug for the business (used in claim links)
 * @returns A GeneratedSite with the full HTML and design metadata
 */
export async function generateSite(
  business: BusinessInput,
  slug: string
): Promise<GeneratedSite> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY environment variable is required. Set it in your .env.local file."
    );
  }

  const client = new Anthropic({ apiKey });

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(business, slug);
  const fullPrompt = userPrompt; // for storing in the result

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  // Extract text content from the response
  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude returned no text content in the response.");
  }

  const rawResponse = textBlock.text;
  const html = extractHtml(rawResponse);

  if (!html.includes("<!DOCTYPE") && !html.includes("<!doctype")) {
    throw new Error(
      "Generated content does not appear to be valid HTML. Response may have been truncated or malformed."
    );
  }

  const accentColor = extractAccentColor(html);
  const fontFamily = extractFontFamily(html);
  const designStyle = inferDesignStyle(html);

  return {
    html,
    accentColor,
    fontFamily,
    designStyle,
    prompt: fullPrompt,
    model: MODEL,
  };
}
