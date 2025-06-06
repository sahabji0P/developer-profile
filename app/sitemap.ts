import { MetadataRoute } from 'next'

// This would typically come from a database or API
const blogPosts = [
    {
        id: 1,
        title: "The Future of AI in Web Development",
        date: "2023-05-15",
    },
    {
        id: 2,
        title: "Mastering TypeScript: Advanced Tips and Tricks",
        date: "2023-06-02",
    },
    {
        id: 3,
        title: "The Power of Server-Side Rendering with Next.js",
        date: "2023-06-20",
    },
]

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://shashwatjain.vercel.app'

    // Static routes
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ]

    // Dynamic blog post routes
    const blogRoutes = blogPosts.map(post => {
        return {
            url: `${baseUrl}/blog/${post.id}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }
    })

    return [...routes, ...blogRoutes]
}
