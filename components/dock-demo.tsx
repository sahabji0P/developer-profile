"use client"

import { Dock, DockIcon } from "@/components/dock"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { BookOpen, FileText, HomeIcon, Mail, Twitter } from "lucide-react"
import Link from "next/link"



const NAV_ITEMS = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/blog", icon: BookOpen, label: "Blog" },
  { href: "/resume.pdf", icon: FileText, label: "Resume", download: true },
]

const SOCIAL_ITEMS = [
  { href: "https://twitter.com/yourusername", icon: Twitter, label: "Twitter" },
  { href: "mailto:your@email.com", icon: Mail, label: "Email" },
]

export function DockDemo() {
  return (
    <Dock>
      {NAV_ITEMS.map((item) => (
        <DockIcon key={item.label} tooltip={item.label}>
          <Link
            href={item.href}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-12 w-12 rounded-full")}
            download={item.download}
          >
            <item.icon className="h-6 w-6" />
            <span className="sr-only">{item.label}</span>
          </Link>
        </DockIcon>
      ))}
      <Separator />
      {SOCIAL_ITEMS.map((item) => (
        <DockIcon key={item.label} tooltip={item.label}>
          <Link
            href={item.href}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-12 w-12 rounded-full")}
          >
            <item.icon className="h-6 w-6" />
            <span className="sr-only">{item.label}</span>
          </Link>
        </DockIcon>
      ))}
      <Separator />
      <DockIcon tooltip="Toggle theme">
        <ModeToggle />
      </DockIcon>
    </Dock>
  )
}

