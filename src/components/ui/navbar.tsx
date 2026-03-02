"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-background text-sm group-hover:scale-110 transition-transform">
            CA
          </div>
          <span className="font-bold text-lg tracking-tight">
            Creative<span className="text-accent">Axe</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/services"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="/work"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Our Work
          </Link>
          <Link
            href="/for/restaurants"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Industries
          </Link>
          <Link
            href="/claim/demo"
            className="text-sm bg-accent hover:bg-accent-light text-background font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Get Your Free Site
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-muted hover:text-foreground"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col gap-1 p-4">
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
            >
              Services
            </Link>
            <Link
              href="/work"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
            >
              Our Work
            </Link>
            <Link
              href="/for/restaurants"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
            >
              Industries
            </Link>
            <Link
              href="/claim/demo"
              onClick={() => setOpen(false)}
              className="mt-2 text-center bg-accent hover:bg-accent-light text-background font-semibold px-5 py-3 rounded-lg transition-colors"
            >
              Get Your Free Site
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
