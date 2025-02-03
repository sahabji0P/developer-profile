"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DockDemo } from "@/components/dock-demo"

// This would typically come from a database or API
const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    excerpt:
      "Exploring how artificial intelligence is reshaping the landscape of web development and what it means for developers.",
    author: {
      name: "Shashwat Jain",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q8pOISYvgOsRwcyLWDort6s0gHVxTa.png",
    },
    date: "2023-05-15",
    readTime: 5,
  },
  {
    id: 2,
    title: "Mastering TypeScript: Advanced Tips and Tricks",
    excerpt: "Dive deep into TypeScript's advanced features and learn how to write more robust and maintainable code.",
    author: {
      name: "Shashwat Jain",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q8pOISYvgOsRwcyLWDort6s0gHVxTa.png",
    },
    date: "2023-06-02",
    readTime: 7,
  },
  {
    id: 3,
    title: "The Power of Server-Side Rendering with Next.js",
    excerpt: "Unlock the full potential of your web applications with server-side rendering using Next.js.",
    author: {
      name: "Shashwat Jain",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q8pOISYvgOsRwcyLWDort6s0gHVxTa.png",
    },
    date: "2023-06-20",
    readTime: 6,
  },
]

export default function BlogPage() {
  const [sortBy, setSortBy] = useState<"date" | "readTime">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const sortedPosts = [...blogPosts].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return sortOrder === "asc" ? a.readTime - b.readTime : b.readTime - a.readTime
    }
  })

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Shashwat&apos;s Blog</h1>
        <div className="flex justify-end mb-4 space-x-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date" | "readTime")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="readTime">Read Time</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "asc" | "desc")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">{sortBy === "date" ? "Oldest First" : "Shortest First"}</SelectItem>
              <SelectItem value="desc">{sortBy === "date" ? "Newest First" : "Longest First"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={post.author.image} alt={post.author.name} />
                    <AvatarFallback>
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString()} · {post.readTime} min read
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <DockDemo />
    </main>
  )
}

