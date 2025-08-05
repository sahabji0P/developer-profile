export interface ResearchProject {
  id: string
  title: string
  description: string
  link: string
  publicationDetails: {
    journal: string
    date: string
    doi?: string
  }
  status: string
  authors: {
    main: string[]
    coAuthors: string[]
  }
  abstract: string
  results: {
    text: string
    images?: string[]
  }
  futureWork: string
  associatedProjects?: {
    title: string
    description: string
    link: string
  }[]
}

export const researchWorkData: ResearchProject[] = [
  {
    id: "vision-transformer-deit-model",
    title: "Brain Tumor Classification Using DeiT Vision Transformer",
    description: "Accepted and Presented at IEEE 16th ICCCNT, 2025",
    link: "/deit-vision-transformer",
    publicationDetails: {
      journal: "16th ICCCNT IEEE Conference, IIT Indore",
      date: "July 2025",
      doi: "N/A"
    },
    status: "Accepted",
    authors: {
      main: ["Shashwat Jain", "Nikhil", "Rudraksh Bhardwaj"],
      coAuthors: ["Dr. Gitika Sharma", "Dr. Himanshu"]
    },
    abstract: "This research investigates the transformative impact of artificial intelligence on modern healthcare systems. We analyze the implementation of AI-driven diagnostic tools, predictive analytics, and personalized treatment recommendations across various medical specialties. Our study encompasses data from over 50 healthcare institutions worldwide, examining both the benefits and challenges of AI integration in clinical practice.",
    results: {
      text: "Our findings demonstrate a 35% improvement in diagnostic accuracy when AI tools are integrated with traditional medical practices. Patient outcomes showed significant enhancement, with reduced treatment times and improved recovery rates. The implementation of AI-powered predictive models resulted in early detection of critical conditions in 78% of cases studied.",
      images: ["/research/ai-healthcare-chart1.jpg", "/research/ai-healthcare-results.jpg", "/research/ai-healthcare-diagram.png"]
    },
    futureWork: "Future research will focus on developing more sophisticated AI models that can handle complex multi-organ diagnoses. We plan to expand our study to include rural healthcare settings and investigate the socio-economic impact of AI adoption in developing countries.",
    associatedProjects: [
      {
        title: "NeuroVision",
        description: "A vision transformer-based model for brain tumor detection and classification into multiple categories.",
        link: "https://github.com/sahabji0P/NeuroVision"
      },

    ]
  },

];

