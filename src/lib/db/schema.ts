import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const businesses = sqliteTable("businesses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  niche: text("niche").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  phone: text("phone"),
  website: text("website"),
  hasWebsite: integer("has_website", { mode: "boolean" }).default(false),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  photos: text("photos", { mode: "json" }).$type<string[]>(),
  reviews: text("reviews", { mode: "json" }).$type<
    { author: string; text: string; rating: number; date: string }[]
  >(),
  hours: text("hours", { mode: "json" }).$type<
    { day: string; time: string }[]
  >(),
  services: text("services", { mode: "json" }).$type<string[]>(),
  description: text("description"),
  logoUrl: text("logo_url"),
  instagramHandle: text("instagram_handle"),
  instagramPhotos: text("instagram_photos", { mode: "json" }).$type<string[]>(),
  yelpUrl: text("yelp_url"),
  googleMapsUrl: text("google_maps_url"),
  placeId: text("place_id"),
  rawData: text("raw_data", { mode: "json" }),
  // Scoring
  score: integer("score").default(0),
  scoreBreakdown: text("score_breakdown", { mode: "json" }).$type<
    Record<string, number>
  >(),
  // Source tracking
  source: text("source"), // "google_maps", "yelp", "instagram"
  scrapedAt: text("scraped_at"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const generatedSites = sqliteTable("generated_sites", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  businessId: integer("business_id")
    .notNull()
    .references(() => businesses.id),
  slug: text("slug").notNull().unique(),
  // The entire custom site
  html: text("html").notNull(), // Full custom HTML/CSS
  // Design metadata
  accentColor: text("accent_color"),
  fontFamily: text("font_family"),
  designStyle: text("design_style"), // "minimal", "bold", "elegant", etc.
  // Generation info
  prompt: text("prompt"), // The prompt used to generate
  model: text("model"), // Which Claude model was used
  generatedAt: text("generated_at").notNull().$defaultFn(() => new Date().toISOString()),
  // Status
  status: text("status").notNull().default("draft"), // draft, sent, viewed, claimed
  viewCount: integer("view_count").default(0),
  lastViewedAt: text("last_viewed_at"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  businessId: integer("business_id").references(() => businesses.id),
  siteId: integer("site_id").references(() => generatedSites.id),
  // Contact info (from claim form or scrape)
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  businessName: text("business_name"),
  message: text("message"),
  // Pipeline status
  status: text("status").notNull().default("new"), // new, contacted, interested, ready, closed, lost
  // Tracking
  source: text("source"), // "claim_form", "email_reply", "dm_reply"
  claimedAt: text("claimed_at"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const outreachLog = sqliteTable("outreach_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  businessId: integer("business_id")
    .notNull()
    .references(() => businesses.id),
  leadId: integer("lead_id").references(() => leads.id),
  // What was sent
  channel: text("channel").notNull(), // "email", "instagram_dm", "facebook_dm", "sms", "contact_form"
  messageType: text("message_type"), // "initial", "follow_up_1", "follow_up_2"
  message: text("message"),
  // Links included
  reportLink: text("report_link"),
  demoLink: text("demo_link"),
  // Tracking
  status: text("status").notNull().default("sent"), // sent, delivered, opened, replied
  sentAt: text("sent_at").notNull().$defaultFn(() => new Date().toISOString()),
  openedAt: text("opened_at"),
  repliedAt: text("replied_at"),
});
