import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Newsreader } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { DesignVariantProvider } from "@/components/design-variant-provider";
import { SiteShell } from "@/components/site-shell";
import { SITE_URL, site } from "@/content/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="design-variant-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var v=localStorage.getItem("design-variant");if(v!=="studio"&&v!=="essay")v="studio";document.documentElement.dataset.variant=v;}catch(e){document.documentElement.dataset.variant="studio";}})();`,
          }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        <DesignVariantProvider>
          <SiteShell>{children}</SiteShell>
        </DesignVariantProvider>
      </body>
    </html>
  );
}
