import { DockDemo } from "@/components/magicui/doc-details";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Kanit, Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: "400", display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Kanit({ subsets: ["latin"], weight: "400", display: "swap" })
const roboto = Roboto({ subsets: ["latin"], weight: "400", display: "swap" })

export const metadata = {
  title: "Shashwat Jain | Engineer | Developer | Entrepreneur | Contributor",
  description: "Full-stack developer, AI/ML enthusiast, and entrepreneur crafting innovative solutions. From technical innovations, explore my diverse journey through technology, and community contributions.",
  keywords: ["Shashwat Jain", "developer", "portfolio", "blog", "resume", "AI", "ML", "Entrepreneur", "Contributor", "Full-stack developer", "AI/ML enthusiast"],
  authors: [{ name: "Shashwat Jain", url: "https://shashwatjain.vercel.app" }],

  openGraph: {
    title: "Shashwat Jain | Engineer | Developer | Entrepreneur | Contributor",
    description: "Full-stack developer, AI/ML enthusiast, and entrepreneur crafting innovative solutions. From technical innovations, explore my diverse journey through technology, and community contributions.",
    url: "https://shashwatjain.vercel.app",
    locale: "en_US",
    type: "website",
    siteName: "Shashwat Jain",
    localeAlternates: ["en_US"],
    images: [
      {
        url: "https://drive.google.com/file/d/1GbHsHikZXcSJt2U2FyiBUiRd0pHJ0vI_/view?usp=sharing",
        width: 1200,
        height: 630,
        alt: "Shashwat Jain | Engineer | Developer | Entrepreneur | Contributor",

      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashwat Jain | Engineer | Developer | Entrepreneur | Contributor",
    description: "Full-stack developer, AI/ML enthusiast, and entrepreneur crafting innovative solutions. From technical innovations, explore my diverse journey through technology, and community contributions.",
    images: ["https://drive.google.com/file/d/1GbHsHikZXcSJt2U2FyiBUiRd0pHJ0vI_/view?usp=sharing"],
  },
  robots: {
    index: true,
    follow: true,
    noimageindex: true,
    noarchive: true,
    nosnippet: true,
  },
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={`${playfair.className} text-foreground`}>

        {children}
        <Analytics />
        <SpeedInsights />

        <DockDemo />

      </body>
    </html >
  )
}

