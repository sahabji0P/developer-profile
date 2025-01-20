import Link from "next/link"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    content:
      "Artificial Intelligence (AI) is rapidly transforming the landscape of web development. From intelligent chatbots to personalized user experiences, AI is enabling developers to create more sophisticated and user-friendly websites and applications. This article explores the current state of AI in web development and looks ahead to future trends and possibilities.\n\nOne of the most significant impacts of AI on web development is in the area of user experience (UX) design. AI-powered analytics can provide deep insights into user behavior, allowing developers to create more intuitive and personalized interfaces. Machine learning algorithms can analyze vast amounts of user data to predict preferences and tailor content accordingly.\n\nAnother area where AI is making waves is in automated coding and debugging. AI-assisted coding tools can suggest code completions, identify potential bugs, and even generate entire code snippets based on natural language descriptions. This not only speeds up the development process but also helps reduce errors and improve code quality.\n\nLooking to the future, we can expect to see even more integration of AI in web development. Natural language processing could revolutionize voice-based interactions with websites, while computer vision might enable new ways of navigating and interacting with web content.\n\nHowever, as AI becomes more prevalent in web development, it's crucial for developers to consider the ethical implications and potential biases of AI systems. Ensuring transparency, fairness, and user privacy will be key challenges as we move forward.\n\nIn conclusion, AI is set to play an increasingly important role in web development. By embracing these technologies responsibly, developers can create more intelligent, efficient, and user-friendly web experiences. The future of web development is here, and it's powered by AI.",
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
    content:
      "TypeScript has become an essential tool for many developers, offering strong typing and object-oriented programming features to JavaScript. This article delves into some advanced TypeScript techniques that can help you write more robust and maintainable code.\n\n1. Conditional Types: Conditional types allow you to create type definitions based on conditions. For example:\n\ntype IsArray<T> = T extends any[] ? true : false;\n\nThis type will be 'true' if T is an array, and 'false' otherwise.\n\n2. Mapped Types: Mapped types allow you to transform the properties of an existing type. For instance:\n\ntype Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n};\n\nThis creates a new type with all properties of T set to readonly.\n\n3. Intersection Types: Combine multiple types into one using the & operator:\n\ntype Admin = User & { privileges: string[] };\n\n4. Discriminated Unions: Use a common property to distinguish between different types in a union:\n\ntype Shape =\n  | { kind: 'circle'; radius: number }\n  | { kind: 'square'; sideLength: number };\n\n5. Utility Types: TypeScript provides several utility types like Partial<T>, Required<T>, Pick<T, K>, and Omit<T, K> that can be incredibly useful in various scenarios.\n\n6. Type Guards: Implement custom type guards to narrow down types in your code:\n\nfunction isString(value: unknown): value is string {\n  return typeof value === 'string';\n}\n\n7. Generic Constraints: Use extends keyword to constrain generic types:\n\nfunction merge<T extends object, U extends object>(obj1: T, obj2: U) {\n  return { ...obj1, ...obj2 };\n}\n\nBy mastering these advanced TypeScript features, you can write more expressive, safer, and more maintainable code. Remember, the goal is not just to satisfy the TypeScript compiler, but to create code that's easier to understand and less prone to runtime errors.",
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
    content:
      "Server-Side Rendering (SSR) has become a crucial technique in modern web development, offering improved performance, better SEO, and enhanced user experience. Next.js, a popular React framework, provides powerful SSR capabilities out of the box. This article explores how to leverage SSR in Next.js and why it's beneficial for your web applications.\n\nWhat is Server-Side Rendering?\nSSR is the process of rendering web pages on the server and sending fully rendered HTML to the client. This is in contrast to Client-Side Rendering (CSR), where the browser downloads a minimal HTML page, the JavaScript, and then renders the content.\n\nBenefits of SSR:\n1. Improved Initial Load Time: Users see content faster, as the initial HTML is already rendered.\n2. Better SEO: Search engines can easily crawl and index the content.\n3. Enhanced Performance on Low-Power Devices: Less client-side processing is required.\n4. Improved User Experience: Content is visible even if JavaScript fails to load.\n\nImplementing SSR in Next.js:\nNext.js makes SSR straightforward. By default, all pages in Next.js are pre-rendered on the server. Here's a simple example:\n\nimport { GetServerSideProps } from 'next';\n\nexport const getServerSideProps: GetServerSideProps = async (context) => {\n  const res = await fetch('https://api.example.com/data');\n  const data = await res.json();\n\n  return {\n    props: { data },\n  };\n};\n\nfunction Page({ data }) {\n  return <div>{data.title}</div>;\n}\n\nexport default Page;\n\nIn this example, getServerSideProps runs on every request, fetches data from an API, and passes it as props to the Page component.\n\nStatic Site Generation (SSG):\nNext.js also offers Static Site Generation, where pages are generated at build time. This is perfect for content that doesn't change often:\n\nexport async function getStaticProps() {\n  const res = await fetch('https://api.example.com/data');\n  const data = await res.json();\n\n  return {\n    props: { data },\n    revalidate: 60, // Optional: regenerate page every 60 seconds\n  };\n}\n\nIncremental Static Regeneration (ISR):\nISR allows you to update static content after you've built your site. It's a powerful feature that combines the benefits of static generation and server-side rendering.\n\nConclusion:\nServer-Side Rendering with Next.js offers a powerful solution for building fast, SEO-friendly, and user-friendly web applications. By understanding and utilizing SSR, SSG, and ISR, developers can create optimal experiences for their users while maintaining the benefits of a modern React application.",
    author: {
      name: "Shashwat Jain",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q8pOISYvgOsRwcyLWDort6s0gHVxTa.png",
    },
    date: "2023-06-20",
    readTime: 6,
  },
]

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find((post) => post.id === Number.parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/blog">← Back to all posts</Link>
      </Button>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center space-x-2 mb-8">
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
      <div className="prose dark:prose-invert max-w-none">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}

