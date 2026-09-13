import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EB_Garamond } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SITE_URL, site } from "@/content/site";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-garamond",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

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
      className={`${GeistSans.variable} ${GeistMono.variable} ${ebGaramond.variable}`}
      style={{ colorScheme: "light" }}
    >
      <body className="antialiased">
        <div className="site-shell">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
