import { researchWorkData } from "@/data/research-work"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface ResearchLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

// Generate metadata for each research page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const research = researchWorkData.find(item => item.id === params.id)
  
  if (!research) {
    return {
      title: 'Research Not Found',
      description: 'The requested research publication could not be found.'
    }
  }

  return {
    title: `${research.title} | Research`,
    description: research.abstract.substring(0, 160) + '...',
    openGraph: {
      title: research.title,
      description: research.abstract.substring(0, 160) + '...',
      type: 'article',
    }
  }
}

// Generate static paths for all research pages
export async function generateStaticParams() {
  return researchWorkData.map((research) => ({
    id: research.id,
  }))
}

export default function ResearchLayout({ children, params }: ResearchLayoutProps) {
  const research = researchWorkData.find(item => item.id === params.id)
  
  if (!research) {
    notFound()
  }

  return <>{children}</>
}
