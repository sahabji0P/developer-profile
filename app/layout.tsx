import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SiteShell } from "@/components/site-shell";
import { SITE_URL, site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Shashwat Jain",
    template: "%s — Shashwat Jain",
  },
  description: site.role,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Shashwat Jain",
    description: site.role,
    url: SITE_URL,
    siteName: "Shashwat Jain",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <body className={`${GeistSans.className} antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
