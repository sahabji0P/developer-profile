import { DockDemo } from "@/components/magicui/doc-details";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-lol text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <DockDemo />
        </ThemeProvider>
      </body>
    </html>
  )
}

