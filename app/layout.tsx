import { DockDemo } from "@/components/magicui/doc-details";
import { Inter, Kanit, Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: "400", display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Kanit({ subsets: ["latin"], weight: "400", display: "swap" })
const roboto = Roboto({ subsets: ["latin"], weight: "400", display: "swap" })

export const metadata = {
  title: "Shashwat Jain | Engineer | Developer | Entrepreneur | Contributor",
  description: "Full-stack developer and tech enthusiast. Explore my portfolio showcasing journey, read technical/non-technical journal.",
  keywords: "Shashwat Jain, developer, portfolio, blog, resume",
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
        <DockDemo />
      </body>
    </html >
  )
}

