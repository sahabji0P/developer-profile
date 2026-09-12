"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Deviation from live leerob.com (measured 2026-09-12): that site has no
 * `<nav>` and no fixed chrome at 1440 or 390. This product still needs a
 * top-right vertical text nav. No hamburger / slide-out at 390px.
 */
const ITEMS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/scratchpad", label: "Scratchpad" },
] as const;

function isActive(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
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
    </nav>
  );
}
