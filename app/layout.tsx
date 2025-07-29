import ContactSection from "@/components/contact-section";
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
  authors: [{ name: "Shashwat Jain", url: "https://shashwatjain.me" }],
  metadataBase: new URL('https://shashwatjain.me'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Shashwat Jain | Engineer | Developer | Entrepreneur | Contributor",
    description: "Full-stack developer, AI/ML enthusiast, and entrepreneur crafting innovative solutions. From technical innovations, explore my diverse journey through technology, and community contributions.",
    url: "https://shashwatjain.me",
    locale: "en_US",
    type: "website",
    siteName: "Shashwat Jain",
    localeAlternates: ["en_US"],
    images: [
      {
        url: "https://vi47jg6nxfflyodd.public.blob.vercel-storage.com/metadata-image-Yt3IF4U09SdZ8F5Ww6z766jXRQiypE",
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
    images: ["https://vi47jg6nxfflyodd.public.blob.vercel-storage.com/metadata-image-Yt3IF4U09SdZ8F5Ww6z766jXRQiypE"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
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
        <ContactSection />


        <DockDemo />


      </body>
    </html >
  )
}

