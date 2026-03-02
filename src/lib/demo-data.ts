export type BusinessNiche =
  | "restaurant"
  | "salon"
  | "plumber"
  | "dentist"
  | "auto-repair"
  | "fitness"
  | "landscaping"
  | "cleaning"
  | "generic";

export interface BusinessData {
  name: string;
  niche: BusinessNiche;
  tagline: string;
  description: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  hours: { day: string; time: string }[];
  services: { name: string; description: string; highlight?: boolean }[];
  reviews: { name: string; text: string; rating: number; date: string }[];
  heroImage?: string;
  accentColor: string;
  features: string[];
}

// Niche-specific content templates
const nicheTemplates: Record<
  BusinessNiche,
  {
    taglines: string[];
    descriptions: (name: string) => string;
    services: { name: string; description: string; highlight?: boolean }[];
    features: string[];
    reviewTemplates: { name: string; text: (biz: string) => string }[];
    accentColor: string;
  }
> = {
  restaurant: {
    taglines: [
      "Where Every Meal Becomes a Memory",
      "Fresh Flavors, Warm Atmosphere",
      "Your Neighborhood's Favorite Table",
    ],
    descriptions: (name) =>
      `Welcome to ${name} — where passion for food meets warm hospitality. Every dish is crafted with fresh, locally-sourced ingredients and served with care. Whether you're joining us for a quick lunch, a family dinner, or a special celebration, we promise an experience that keeps you coming back.`,
    services: [
      {
        name: "Dine-In Experience",
        description:
          "Enjoy our full menu in a warm, inviting atmosphere. Perfect for date nights, family gatherings, or catching up with friends.",
        highlight: true,
      },
      {
        name: "Online Ordering",
        description:
          "Order your favorites for pickup or delivery. Fresh, hot, and ready when you are.",
      },
      {
        name: "Catering Services",
        description:
          "Let us bring the flavor to your next event. Custom menus for parties, corporate events, and celebrations.",
      },
      {
        name: "Private Events",
        description:
          "Book our private dining space for birthdays, anniversaries, or business dinners. Personalized menus available.",
      },
      {
        name: "Happy Hour",
        description:
          "Join us Mon-Fri, 4-6 PM for special pricing on appetizers and drinks. The best way to unwind.",
      },
      {
        name: "Weekend Brunch",
        description:
          "Saturday & Sunday, 10 AM - 2 PM. Bottomless mimosas, fresh pastries, and our signature breakfast plates.",
      },
    ],
    features: [
      "View Full Menu",
      "Order Online",
      "Make a Reservation",
      "Gift Cards",
    ],
    reviewTemplates: [
      {
        name: "Sarah M.",
        text: (biz) =>
          `${biz} has become our go-to spot. The food is consistently amazing and the staff remembers our names. Last Friday we tried the new seasonal menu and every single dish was perfect. Can't recommend this place enough.`,
      },
      {
        name: "David K.",
        text: (biz) =>
          `Best dining experience in the area, hands down. We've been coming to ${biz} for over a year now and the quality never drops. The ambiance is perfect for date night and the portions are generous.`,
      },
      {
        name: "Jennifer R.",
        text: (biz) =>
          `We hosted our daughter's birthday dinner here and ${biz} went above and beyond. The private dining area was beautifully set up, the food was incredible, and the staff made us feel so welcome. Already planning our next visit!`,
      },
      {
        name: "Michael P.",
        text: (biz) =>
          `The catering from ${biz} for our office party was phenomenal. Everyone was raving about the food. Professional, on-time delivery, and everything was still hot and fresh. Will definitely order again.`,
      },
    ],
    accentColor: "#e85d26",
  },
  salon: {
    taglines: [
      "Where Style Meets Confidence",
      "Your Best Look Starts Here",
      "Crafted Cuts, Stunning Color",
    ],
    descriptions: (name) =>
      `At ${name}, we believe everyone deserves to feel amazing. Our team of skilled stylists stays on top of the latest trends while mastering timeless techniques. From precision cuts to stunning color transformations, we create looks that turn heads and boost confidence.`,
    services: [
      {
        name: "Haircuts & Styling",
        description:
          "Precision cuts tailored to your face shape, lifestyle, and personal style. Includes consultation, shampoo, and blow-dry.",
        highlight: true,
      },
      {
        name: "Color & Highlights",
        description:
          "From subtle balayage to bold fashion colors. Our colorists use premium products for vibrant, long-lasting results.",
      },
      {
        name: "Blowouts & Updos",
        description:
          "Perfect for special occasions or just because. Get that salon-fresh look for any event.",
      },
      {
        name: "Hair Treatments",
        description:
          "Deep conditioning, keratin smoothing, and repair treatments to restore your hair's health and shine.",
      },
      {
        name: "Bridal Services",
        description:
          "Make your big day unforgettable. Trial sessions, day-of styling, and bridal party packages available.",
      },
      {
        name: "Beard & Grooming",
        description:
          "Expert beard shaping, hot towel shaves, and grooming services for the modern gentleman.",
      },
    ],
    features: [
      "Book Appointment",
      "View Gallery",
      "Gift Cards",
      "Meet Our Team",
    ],
    reviewTemplates: [
      {
        name: "Amanda L.",
        text: (biz) =>
          `I've finally found my forever salon! ${biz} completely transformed my hair. The balayage is exactly what I showed them — actually, it's even better. The attention to detail is incredible.`,
      },
      {
        name: "Rachel T.",
        text: (biz) =>
          `Been coming to ${biz} for 6 months now and I won't go anywhere else. Every stylist here is talented and actually listens to what you want. Plus the vibe is so relaxing. Love it!`,
      },
      {
        name: "Chris B.",
        text: (biz) =>
          `Best barbershop experience I've ever had. Clean fade, beard lined up perfectly. The guys at ${biz} know what they're doing. Highly recommend for any dude looking for a quality cut.`,
      },
      {
        name: "Nicole W.",
        text: (biz) =>
          `${biz} did my wedding hair and the entire bridal party's. Everyone looked absolutely stunning. They were professional, on time, and so much fun to work with. Worth every penny!`,
      },
    ],
    accentColor: "#c026d3",
  },
  plumber: {
    taglines: [
      "Fast Fixes, Lasting Solutions",
      "Your Trusted Local Plumbing Experts",
      "When You Need It Done Right",
    ],
    descriptions: (name) =>
      `${name} has been the trusted name in plumbing for the local community. From emergency repairs to full installations, our licensed and insured team handles every job with professionalism and care. We show up on time, explain the problem clearly, and get it fixed right the first time — guaranteed.`,
    services: [
      {
        name: "Emergency Plumbing",
        description:
          "Burst pipe at 2 AM? We're on it. 24/7 emergency service with fast response times when you need us most.",
        highlight: true,
      },
      {
        name: "Drain Cleaning",
        description:
          "Stubborn clogs don't stand a chance. Professional drain cleaning for kitchens, bathrooms, and main sewer lines.",
      },
      {
        name: "Water Heater Service",
        description:
          "Installation, repair, and maintenance for tank and tankless water heaters. Hot water guaranteed.",
      },
      {
        name: "Leak Detection & Repair",
        description:
          "Hidden leaks waste water and money. Our advanced detection finds the problem fast so we can fix it faster.",
      },
      {
        name: "Bathroom & Kitchen Remodeling",
        description:
          "Upgrade your fixtures, pipes, and plumbing for a beautiful, functional space. Free estimates available.",
      },
      {
        name: "Sewer Line Service",
        description:
          "Camera inspections, trenchless repair, and full sewer line replacement. Minimal disruption, maximum results.",
      },
    ],
    features: [
      "Call Now — 24/7",
      "Get Free Estimate",
      "Service Areas",
      "Financing Available",
    ],
    reviewTemplates: [
      {
        name: "Robert H.",
        text: (biz) =>
          `Our basement flooded at midnight and ${biz} was here within 45 minutes. They fixed the burst pipe, helped clean up, and even followed up the next day. This is what real service looks like.`,
      },
      {
        name: "Karen S.",
        text: (biz) =>
          `${biz} replaced our entire water heater for a fair price. The tech explained everything, cleaned up after himself, and the hot water works perfectly. No surprise charges. Finally, an honest plumber.`,
      },
      {
        name: "Tony M.",
        text: (biz) =>
          `Had a terrible clog that two other plumbers couldn't fix. Called ${biz} and they had it cleared in under an hour. Professional, reasonably priced, and they actually showed up on time. Will call them for everything now.`,
      },
      {
        name: "Lisa D.",
        text: (biz) =>
          `We used ${biz} for our kitchen remodel and they were fantastic. Everything was done on schedule, on budget, and the quality is top-notch. Already recommended them to our neighbors.`,
      },
    ],
    accentColor: "#2563eb",
  },
  dentist: {
    taglines: [
      "Healthy Smiles, Happy Patients",
      "Gentle Care, Brilliant Results",
      "Your Comfort is Our Priority",
    ],
    descriptions: (name) =>
      `At ${name}, we combine modern dental technology with a gentle, patient-first approach. Whether you need a routine cleaning, cosmetic enhancement, or restorative treatment, our experienced team ensures every visit is comfortable and stress-free. We accept most insurance plans and offer flexible payment options.`,
    services: [
      {
        name: "General Dentistry",
        description:
          "Comprehensive exams, cleanings, fillings, and preventive care to keep your smile healthy for life.",
        highlight: true,
      },
      {
        name: "Cosmetic Dentistry",
        description:
          "Teeth whitening, veneers, and smile makeovers. Get the confident, radiant smile you've always wanted.",
      },
      {
        name: "Dental Implants",
        description:
          "Permanent, natural-looking tooth replacement. Restore your smile and chewing function with state-of-the-art implants.",
      },
      {
        name: "Orthodontics",
        description:
          "Traditional braces and clear aligners for straighter teeth. Options for teens and adults.",
      },
      {
        name: "Emergency Dental Care",
        description:
          "Toothache? Broken tooth? Same-day appointments available for dental emergencies.",
      },
      {
        name: "Pediatric Dentistry",
        description:
          "A friendly, fun environment that makes dental visits enjoyable for kids. Building healthy habits early.",
      },
    ],
    features: [
      "Book Appointment",
      "Patient Forms",
      "Insurance Info",
      "Virtual Consultation",
    ],
    reviewTemplates: [
      {
        name: "Emily C.",
        text: (biz) =>
          `I used to dread going to the dentist until I found ${biz}. The entire staff is so warm and gentle. They explained every step of my treatment and I actually felt relaxed. My smile has never looked better!`,
      },
      {
        name: "Mark T.",
        text: (biz) =>
          `Got my dental implant done at ${biz} and the result is incredible — you can't even tell it's not my real tooth. Dr. and the team made the whole process painless. Truly life-changing work.`,
      },
      {
        name: "Patricia R.",
        text: (biz) =>
          `Both my kids love going to ${biz}. The pediatric team is amazing with children — makes it fun and easy. No more tears before dental visits! Best decision we made switching here.`,
      },
      {
        name: "James W.",
        text: (biz) =>
          `Emergency tooth extraction on a Saturday — ${biz} fit me in same day. Professional, quick, and practically painless. The follow-up care was excellent too. Can't thank them enough.`,
      },
    ],
    accentColor: "#0ea5e9",
  },
  "auto-repair": {
    taglines: [
      "Honest Repairs, Fair Prices",
      "Your Car in Expert Hands",
      "We Keep You Moving",
    ],
    descriptions: (name) =>
      `${name} is your one-stop shop for everything automotive. Our ASE-certified technicians use the latest diagnostic equipment to find and fix problems fast. We work on all makes and models, and we'll never upsell you on repairs you don't need. Honest work at honest prices — that's our promise.`,
    services: [
      {
        name: "Full Diagnostics",
        description:
          "Check engine light on? Our advanced diagnostic tools pinpoint the exact issue so we fix it right the first time.",
        highlight: true,
      },
      {
        name: "Oil Change & Tune-Up",
        description:
          "Keep your engine running smooth. Quick service with premium oils and filters. No appointment needed.",
      },
      {
        name: "Brake Service",
        description:
          "Pads, rotors, calipers, and brake fluid. Complete brake inspection and repair for your safety.",
      },
      {
        name: "Tire Service",
        description:
          "New tires, rotation, balancing, and alignment. We carry all major brands at competitive prices.",
      },
      {
        name: "AC & Heating",
        description:
          "Stay comfortable year-round. Full AC recharge, heater repair, and climate system diagnostics.",
      },
      {
        name: "Engine & Transmission",
        description:
          "From minor repairs to complete rebuilds. We handle the tough jobs other shops turn away.",
      },
    ],
    features: [
      "Get a Quote",
      "Schedule Service",
      "Check Specials",
      "Shuttle Service",
    ],
    reviewTemplates: [
      {
        name: "Steve R.",
        text: (biz) =>
          `Finally found an honest mechanic! ${biz} diagnosed my car issue that the dealer wanted $2,000 for and fixed it for $400. They showed me exactly what was wrong and explained every charge. No BS, just good work.`,
      },
      {
        name: "Diana M.",
        text: (biz) =>
          `I bring both our family cars to ${biz} and they always take great care of us. Fair prices, quick turnaround, and they never push unnecessary work. The shuttle service is a huge bonus too.`,
      },
      {
        name: "Carlos G.",
        text: (biz) =>
          `${biz} saved my truck. Engine was overheating and I thought it was done for. They replaced the water pump and thermostat and had me back on the road the next day. Solid work, solid people.`,
      },
      {
        name: "Wendy F.",
        text: (biz) =>
          `As a woman, I've had bad experiences at other auto shops. ${biz} treats me with respect, explains things clearly, and charges fairly. I trust them completely with my car.`,
      },
    ],
    accentColor: "#dc2626",
  },
  fitness: {
    taglines: [
      "Your Strongest Self Starts Here",
      "Train Hard, Live Better",
      "Results That Speak For Themselves",
    ],
    descriptions: (name) =>
      `${name} is more than a gym — it's a community dedicated to helping you reach your fitness goals. Whether you're a beginner or an athlete, our state-of-the-art equipment, expert trainers, and motivating group classes give you everything you need to transform your body and your life.`,
    services: [
      {
        name: "Personal Training",
        description:
          "One-on-one sessions with certified trainers who design custom programs for your specific goals and fitness level.",
        highlight: true,
      },
      {
        name: "Group Classes",
        description:
          "From HIIT to yoga, spin to boxing. High-energy classes led by passionate instructors. All levels welcome.",
      },
      {
        name: "Strength Training",
        description:
          "Free weights, machines, and functional training zones. Everything you need to build muscle and power.",
      },
      {
        name: "Cardio Zone",
        description:
          "Treadmills, bikes, ellipticals, and rowers with built-in entertainment. Burn calories your way.",
      },
      {
        name: "Nutrition Coaching",
        description:
          "Personalized meal plans and nutritional guidance to maximize your results and fuel your workouts.",
      },
      {
        name: "Recovery & Wellness",
        description:
          "Sauna, stretching area, foam rolling, and recovery sessions. Because rest is part of the process.",
      },
    ],
    features: [
      "Start Free Trial",
      "Class Schedule",
      "Membership Plans",
      "Transformation Gallery",
    ],
    reviewTemplates: [
      {
        name: "Jason K.",
        text: (biz) =>
          `Joined ${biz} 6 months ago and I've lost 35 pounds. The trainers actually care about your progress and the community here is incredible. Everyone motivates each other. Best investment I've ever made.`,
      },
      {
        name: "Samantha R.",
        text: (biz) =>
          `I was intimidated to join a gym but ${biz} made it so welcoming. The staff helped me learn every machine, the classes are fun, and I actually look forward to working out now. Never thought I'd say that!`,
      },
      {
        name: "Derek P.",
        text: (biz) =>
          `${biz} has the best equipment in the area, bar none. Clean facility, great hours, and the personal training program is legit. My strength gains have been insane since switching here.`,
      },
      {
        name: "Michelle A.",
        text: (biz) =>
          `The group classes at ${biz} are addictive! The instructors bring so much energy and the variety keeps things fresh. I've tried yoga, spin, and kickboxing — all amazing. This gym is special.`,
      },
    ],
    accentColor: "#16a34a",
  },
  landscaping: {
    taglines: [
      "Transform Your Outdoor Space",
      "Curb Appeal That Turns Heads",
      "Where Nature Meets Design",
    ],
    descriptions: (name) =>
      `${name} creates beautiful outdoor spaces that elevate your property and your lifestyle. From regular lawn maintenance to complete landscape design, our experienced team brings creativity and craftsmanship to every project. We use sustainable practices and premium materials for results that last.`,
    services: [
      {
        name: "Landscape Design",
        description:
          "Custom designs that transform your yard into an outdoor living space. 3D renderings included with every project.",
        highlight: true,
      },
      {
        name: "Lawn Maintenance",
        description:
          "Weekly mowing, edging, and cleanup. Keep your lawn looking pristine without lifting a finger.",
      },
      {
        name: "Hardscaping",
        description:
          "Patios, walkways, retaining walls, and fire pits. Durable stone and paverwork that adds value to your home.",
      },
      {
        name: "Tree & Shrub Care",
        description:
          "Planting, pruning, fertilization, and removal. Expert arborist services for healthy, beautiful trees.",
      },
      {
        name: "Irrigation Systems",
        description:
          "Smart sprinkler installation and repair. Save water and keep your landscape green with automated systems.",
      },
      {
        name: "Seasonal Cleanup",
        description:
          "Spring prep, fall leaf removal, and winter protection. Year-round care to keep your property at its best.",
      },
    ],
    features: [
      "Get Free Quote",
      "View Portfolio",
      "Seasonal Specials",
      "Service Areas",
    ],
    reviewTemplates: [
      {
        name: "Tom H.",
        text: (biz) =>
          `${biz} completely transformed our backyard. The patio design, the plantings, the lighting — everything is perfect. Our neighbors keep asking who did the work. We spend every evening out there now.`,
      },
      {
        name: "Susan B.",
        text: (biz) =>
          `We've used ${biz} for weekly lawn care for over a year. They're always on time, always thorough, and our lawn has never looked better. The fall cleanup they did was immaculate.`,
      },
      {
        name: "Greg L.",
        text: (biz) =>
          `Hired ${biz} for a retaining wall and new irrigation system. The wall is gorgeous and the sprinklers actually lowered our water bill. Professional crew, fair pricing, and they cleaned up everything.`,
      },
      {
        name: "Anna M.",
        text: (biz) =>
          `${biz} designed the most beautiful front yard landscape for us. The curb appeal went through the roof — our realtor said it probably added $15k to our home value. Incredible work.`,
      },
    ],
    accentColor: "#65a30d",
  },
  cleaning: {
    taglines: [
      "Spotless Spaces, Happy Faces",
      "Clean That You Can See and Feel",
      "Your Home, Our Pride",
    ],
    descriptions: (name) =>
      `${name} delivers meticulous cleaning services that transform your space. Our trained, bonded, and insured team uses eco-friendly products and proven techniques to deliver a spotless clean every time. We customize every cleaning plan to your needs and guarantee your satisfaction.`,
    services: [
      {
        name: "Regular Home Cleaning",
        description:
          "Weekly, bi-weekly, or monthly cleaning plans. Consistent, thorough cleaning so your home always feels fresh.",
        highlight: true,
      },
      {
        name: "Deep Cleaning",
        description:
          "Top-to-bottom intensive cleaning. We reach every corner, appliance, and surface. Perfect for move-ins or spring cleaning.",
      },
      {
        name: "Office Cleaning",
        description:
          "Professional workspace cleaning after hours. Desks, floors, kitchens, and restrooms — ready for the next workday.",
      },
      {
        name: "Move-In/Move-Out",
        description:
          "Get your deposit back or start fresh. Complete cleaning for empty or furnished spaces.",
      },
      {
        name: "Carpet & Upholstery",
        description:
          "Professional steam cleaning that removes deep stains and allergens. Extends the life of your carpets and furniture.",
      },
      {
        name: "Window Cleaning",
        description:
          "Interior and exterior window cleaning for crystal-clear views. Screens and tracks included.",
      },
    ],
    features: [
      "Get Instant Quote",
      "Book Online",
      "Gift Cards",
      "Commercial Services",
    ],
    reviewTemplates: [
      {
        name: "Laura K.",
        text: (biz) =>
          `${biz} has been cleaning our home bi-weekly for 8 months and I'm obsessed. They're thorough, consistent, and trustworthy. I actually look forward to coming home on cleaning day. Worth every penny.`,
      },
      {
        name: "Mike T.",
        text: (biz) =>
          `Used ${biz} for a deep clean before selling our house. The place looked brand new — even our realtor was shocked. They spent 6 hours and didn't miss a single detail. House sold above asking!`,
      },
      {
        name: "Sandra E.",
        text: (biz) =>
          `Our office has never been cleaner since hiring ${biz}. They work after hours, lock up, and every morning the place is spotless. Clients have actually commented on how clean our office is. Huge win.`,
      },
      {
        name: "Ryan P.",
        text: (biz) =>
          `${biz} did a move-out clean for our apartment and we got our full deposit back — first time ever. They cleaned things we didn't even know were dirty. Affordable, professional, and thorough.`,
      },
    ],
    accentColor: "#0891b2",
  },
  generic: {
    taglines: [
      "Excellence in Every Detail",
      "Your Trusted Local Partner",
      "Quality You Can Count On",
    ],
    descriptions: (name) =>
      `Welcome to ${name} — where quality service meets genuine care. We've built our reputation on doing great work and treating every customer like family. Our experienced team is dedicated to delivering results that exceed your expectations, every single time.`,
    services: [
      {
        name: "Our Signature Service",
        description:
          "Our most popular offering. Comprehensive, professional, and tailored to your specific needs.",
        highlight: true,
      },
      {
        name: "Consultation",
        description:
          "Free initial consultation to understand your needs and create a custom plan that works for you.",
      },
      {
        name: "Premium Package",
        description:
          "The full experience. Priority scheduling, extended service, and complimentary follow-ups included.",
      },
      {
        name: "Maintenance Plans",
        description:
          "Keep everything running smoothly with regular scheduled maintenance and preventive care.",
      },
      {
        name: "Emergency Service",
        description:
          "When you need us, we're there. Fast response times for urgent situations.",
      },
      {
        name: "Custom Solutions",
        description:
          "Every situation is unique. We work with you to design the perfect approach for your needs.",
      },
    ],
    features: ["Contact Us", "Our Services", "About Us", "Get a Quote"],
    reviewTemplates: [
      {
        name: "Sarah M.",
        text: (biz) =>
          `${biz} exceeded every expectation. Professional, punctual, and the quality of work was outstanding. I've already recommended them to everyone I know.`,
      },
      {
        name: "David R.",
        text: (biz) =>
          `We've tried several others in the area and nothing compares to ${biz}. The attention to detail and customer service is on another level. Five stars all the way.`,
      },
      {
        name: "Jennifer L.",
        text: (biz) =>
          `From start to finish, ${biz} was a pleasure to work with. Transparent pricing, great communication, and the results speak for themselves. Will definitely be back.`,
      },
      {
        name: "Michael K.",
        text: (biz) =>
          `${biz} turned what could have been a stressful situation into a smooth, easy process. They know their stuff and genuinely care about their customers. Rare to find that these days.`,
      },
    ],
    accentColor: "#f97316",
  },
};

function detectNiche(slug: string): BusinessNiche {
  const s = slug.toLowerCase();
  if (
    s.includes("pizza") ||
    s.includes("grill") ||
    s.includes("cafe") ||
    s.includes("bistro") ||
    s.includes("kitchen") ||
    s.includes("diner") ||
    s.includes("sushi") ||
    s.includes("taco") ||
    s.includes("burger") ||
    s.includes("bbq") ||
    s.includes("bakery") ||
    s.includes("restaurant")
  )
    return "restaurant";
  if (
    s.includes("salon") ||
    s.includes("barber") ||
    s.includes("beauty") ||
    s.includes("hair") ||
    s.includes("glamour") ||
    s.includes("cuts") ||
    s.includes("nails") ||
    s.includes("spa")
  )
    return "salon";
  if (
    s.includes("plumb") ||
    s.includes("drain") ||
    s.includes("pipe") ||
    s.includes("hvac") ||
    s.includes("heating") ||
    s.includes("cooling")
  )
    return "plumber";
  if (
    s.includes("dental") ||
    s.includes("dentist") ||
    s.includes("smile") ||
    s.includes("ortho") ||
    s.includes("tooth")
  )
    return "dentist";
  if (
    s.includes("auto") ||
    s.includes("car") ||
    s.includes("mechanic") ||
    s.includes("tire") ||
    s.includes("motor") ||
    s.includes("garage") ||
    s.includes("fix")
  )
    return "auto-repair";
  if (
    s.includes("gym") ||
    s.includes("fit") ||
    s.includes("crossfit") ||
    s.includes("yoga") ||
    s.includes("train") ||
    s.includes("temple") ||
    s.includes("iron")
  )
    return "fitness";
  if (
    s.includes("landscape") ||
    s.includes("lawn") ||
    s.includes("garden") ||
    s.includes("tree") ||
    s.includes("green") ||
    s.includes("scape")
  )
    return "landscaping";
  if (
    s.includes("clean") ||
    s.includes("maid") ||
    s.includes("sparkle") ||
    s.includes("shine") ||
    s.includes("wash") ||
    s.includes("pristine") ||
    s.includes("fresh")
  )
    return "cleaning";
  return "generic";
}

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function generateBusinessData(slug: string): BusinessData {
  const niche = detectNiche(slug);
  const template = nicheTemplates[niche];
  const name = toTitleCase(slug);

  return {
    name,
    niche,
    tagline: template.taglines[0],
    description: template.descriptions(name),
    address: "127 Commerce Street",
    city: "Austin",
    state: "TX",
    phone: "(512) 555-0147",
    hours: [
      { day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
      { day: "Saturday", time: "10:00 AM - 5:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    services: template.services,
    reviews: template.reviewTemplates.map((r) => ({
      name: r.name,
      text: r.text(name),
      rating: 5,
      date: ["2 weeks ago", "3 weeks ago", "1 month ago", "1 month ago"][
        template.reviewTemplates.indexOf(r)
      ],
    })),
    accentColor: template.accentColor,
    features: template.features,
  };
}
