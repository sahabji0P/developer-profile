import { DockDemo } from "@/components/dock-demo"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <DockDemo />
    </div>
  )
}

