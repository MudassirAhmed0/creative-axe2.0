import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Define your main domain(s)
  const mainDomains = [
    "creative-axe.com",
    "www.creative-axe.com",
    "localhost:3000",
    "localhost:3001",
  ];

  // Check if this is a subdomain request
  const isMainDomain = mainDomains.some(
    (domain) => hostname === domain || hostname.endsWith("." + domain)
  );

  // Extract subdomain
  let subdomain: string | null = null;

  // For production: something.creative-axe.com
  if (hostname.endsWith(".creative-axe.com")) {
    subdomain = hostname.replace(".creative-axe.com", "");
  }

  // For local dev: something.localhost:3000
  if (hostname.match(/^(.+)\.localhost/)) {
    const match = hostname.match(/^(.+)\.localhost/);
    if (match) subdomain = match[1];
  }

  // Ignore www
  if (subdomain === "www") subdomain = null;

  // If subdomain exists, rewrite to demo page
  if (subdomain) {
    const url = request.nextUrl.clone();
    url.pathname = `/demo/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
