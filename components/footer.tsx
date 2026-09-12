import Link from "next/link";
import { site } from "@/content/site";

/**
 * Deviation from live leerob.com (measured 2026-09-12): that site has no
 * site footer. This product still needs contact links on every page.
 * No contact form.
 */
const FOOTER_LABELS = ["Email", "GitHub", "X", "LinkedIn"] as const;

export function Footer() {
  const links = FOOTER_LABELS.map((label) => {
    const found = site.socials.find((item) => item.label === label);
    if (found) {
      return found;
    }
    if (label === "Email") {
      return { label: "Email", href: `mailto:${site.email}` };
    }
    return null;
  }).filter((item): item is { label: string; href: string } => item !== null);

  return (
    <footer className="site-footer content-frame">
      <ul className="site-footer-links">
        {links.map((item) => (
          <li key={item.label}>
            {item.href.startsWith("/") ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
          </li>
        ))}
      </ul>
    </footer>
  );
}
