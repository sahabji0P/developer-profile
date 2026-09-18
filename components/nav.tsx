"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DesignVariantToggle } from "@/components/design-variant-toggle";

/**
 * Deviation from live leerob.com (measured 2026-09-12): that site has no
 * `<nav>` and no fixed chrome at 1440 or 390. This product still needs a
 * text nav. No hamburger / slide-out at 390px.
 *
 * ≥640px: fixed top-right vertical stack, outside the 600px column
 * (`right: var(--page-pad)`).
 * ≤639px: in normal document flow above the title (wrapping row of the
 * five words). Never `position: fixed` on small viewports — a fixed stack
 * sat inside the 340px column and clipped long titles.
 *
 * Blog + Scratchpad collapse into Journal; `/blog` and `/scratchpad`
 * routes stay live and keep Journal highlighted.
 */
const ITEMS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
] as const;

function isActive(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }
  if (href === "/journal") {
    return (
      pathname === "/journal" ||
      pathname.startsWith("/journal/") ||
      pathname === "/blog" ||
      pathname.startsWith("/blog/") ||
      pathname === "/scratchpad" ||
      pathname.startsWith("/scratchpad/")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="site-nav" aria-label="Primary">
      {ITEMS.map((item) => {
        const current = isActive(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
      <DesignVariantToggle />
    </nav>
  );
}
