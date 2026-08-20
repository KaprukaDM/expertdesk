"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wallet, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { Logo } from "@/components/site/logo";
import { CtaButton } from "@/components/site/cta-button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  // Reflect the persisted sign-in cookie: signed-in visitors get a "Go to dashboard" CTA
  // (routed by role) instead of "Sign in" / "Explore services".
  const { data: session, status } = useSession();
  const authed = status === "authenticated";
  const isAdmin = session?.user?.role === "ADMIN";
  const dashboardHref = isAdmin ? "/admin" : "/dashboard";
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = authed
    ? [
        { href: "/services", label: "Services" },
        { href: dashboardHref, label: "Dashboard" },
        ...(isAdmin ? [] : [{ href: "/dashboard/wallet", label: "Buy tokens" }]),
      ]
    : [
        { href: "/services", label: "Services" },
        { href: "/login", label: "Sign in" },
        { href: "/signup", label: "Create account" },
      ];

  return (
    <motion.header
      className="relative z-50 px-4 pt-4 sm:px-6 sm:pt-6"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="border-border bg-card/90 mx-auto max-w-5xl rounded-3xl border shadow-sm backdrop-blur sm:rounded-full">
        <div className="flex items-center justify-between p-2 pl-4">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="border-border text-muted-foreground hidden border-l pl-3 text-xs sm:inline">
              Powered by{" "}
              <a href="https://www.kapruka.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground font-medium">
                Kapruka
              </a>
            </span>
          </div>

          <nav className="hidden items-center gap-6 sm:flex">
            {/* Desktop keeps the shorter nav — the wallet + primary CTA sit beside it. */}
            {(authed ? [{ href: "/services", label: "Services" }] : [
              { href: "/services", label: "Services" },
              { href: "/login", label: "Sign in" },
            ]).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {authed && !isAdmin && (
              <Link
                href="/dashboard/wallet"
                className="border-border bg-card hover:bg-muted hidden items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors sm:flex"
              >
                <Wallet className="text-primary size-4" />
                Buy tokens
              </Link>
            )}

            {/* Primary CTA — desktop only; on mobile it lives inside the menu so the bar
                stays uncramped at 390px. */}
            <span className="hidden sm:inline-flex">
              {authed ? (
                <CtaButton href={dashboardHref} variant="dark">
                  Go to dashboard
                </CtaButton>
              ) : (
                <CtaButton href="/services" variant="dark">
                  Explore services
                </CtaButton>
              )}
            </span>

            {/* Mobile menu toggle — without this, "Services" and "Sign in" are unreachable
                on a phone (the nav above is sm:flex only). */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="border-border bg-card hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors sm:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" className="border-border border-t px-4 pt-3 pb-4 sm:hidden">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="hover:bg-muted block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={authed ? dashboardHref : "/services"}
              onClick={() => setMenuOpen(false)}
              className="bg-foreground text-background mt-3 block rounded-full px-5 py-2.5 text-center text-sm font-medium transition-opacity hover:opacity-90"
            >
              {authed ? "Go to dashboard" : "Explore services"}
            </Link>
          </nav>
        )}
      </div>
    </motion.header>
  );
}
