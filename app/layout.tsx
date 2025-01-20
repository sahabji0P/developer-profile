import { DockDemo } from "@/components/magicui/doc-details"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <DockDemo />
      </body>
    </html>
  )
}

