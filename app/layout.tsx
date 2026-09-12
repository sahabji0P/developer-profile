import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_URL, site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shashwat Jain",
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div className="site-shell">
            <Nav />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
