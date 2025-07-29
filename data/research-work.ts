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
    id: "ai-healthcare-impact",
    title: "The Impact of AI on Modern Healthcare",
    description: "Published in the Journal of Health Informatics, 2023",
    link: "https://example.com/healthcare-ai",
    publicationDetails: {
      journal: "Journal of Health Informatics",
      date: "March 2023",
      doi: "10.1234/jhi.2023.001"
    },
    status: "Published",
    authors: {
      main: ["Your Name", "Dr. Jane Smith"],
      coAuthors: ["Prof. John Doe", "Dr. Alice Johnson"]
    },
    abstract: "This research investigates the transformative impact of artificial intelligence on modern healthcare systems. We analyze the implementation of AI-driven diagnostic tools, predictive analytics, and personalized treatment recommendations across various medical specialties. Our study encompasses data from over 50 healthcare institutions worldwide, examining both the benefits and challenges of AI integration in clinical practice.",
    results: {
      text: "Our findings demonstrate a 35% improvement in diagnostic accuracy when AI tools are integrated with traditional medical practices. Patient outcomes showed significant enhancement, with reduced treatment times and improved recovery rates. The implementation of AI-powered predictive models resulted in early detection of critical conditions in 78% of cases studied.",
      images: ["/research/ai-healthcare-chart1.jpg", "/research/ai-healthcare-results.jpg", "/research/ai-healthcare-diagram.png"]
    },
    futureWork: "Future research will focus on developing more sophisticated AI models that can handle complex multi-organ diagnoses. We plan to expand our study to include rural healthcare settings and investigate the socio-economic impact of AI adoption in developing countries.",
    associatedProjects: [
      {
        title: "HealthAI Dashboard",
        description: "A comprehensive web application that provides real-time AI-powered health analytics for medical professionals.",
        link: "https://github.com/yourname/healthai-dashboard"
      },
      {
        title: "Medical Image Classifier",
        description: "Deep learning model for automated medical image analysis and diagnosis assistance.",
        link: "https://github.com/yourname/medical-image-classifier"
      }
    ]
  },
  {
    id: "quantum-computing-frontier",
    title: "Quantum Computing: The Next Frontier",
    description: "Featured in Tech Innovations Quarterly, 2024",
    link: "https://example.com/quantum-computing",
    publicationDetails: {
      journal: "Tech Innovations Quarterly",
      date: "January 2024",
      doi: "10.5678/tiq.2024.005"
    },
    status: "Published",
    authors: {
      main: ["Your Name"],
      coAuthors: ["Dr. Robert Chen", "Prof. Maria Garcia"]
    },
    abstract: "This paper explores the current state and future potential of quantum computing technology. We examine quantum algorithms, hardware limitations, and practical applications across various industries. Our research includes theoretical analysis and experimental validation of quantum supremacy claims in specific computational domains.",
    results: {
      text: "We successfully demonstrated quantum advantage in solving specific optimization problems, achieving computational speeds 1000x faster than classical computers. Our quantum algorithm implementations showed remarkable efficiency in cryptographic applications and molecular simulation tasks.",
      images: ["/research/quantum-comparison.jpg", "/research/quantum-circuit.jpg"]
    },
    futureWork: "Our next phase involves developing fault-tolerant quantum systems and exploring quantum machine learning applications. We aim to create practical quantum algorithms for real-world industrial problems.",
    associatedProjects: [
      {
        title: "Quantum Simulator",
        description: "A web-based quantum circuit simulator for educational and research purposes.",
        link: "https://github.com/yourname/quantum-simulator"
      }
    ]
  },
  {
    id: "iot-carbon-footprint",
    title: "Reducing Carbon Footprint via IoT",
    description: "Presented at the Green Tech Symposium, 2023",
    link: "https://example.com/iot-green-tech",
    publicationDetails: {
      journal: "Green Tech Symposium Proceedings",
      date: "September 2023",
      doi: "10.9012/gts.2023.042"
    },
    status: "In Review",
    authors: {
      main: ["Your Name", "Dr. Sarah Wilson"],
      coAuthors: ["Prof. Michael Brown", "Dr. Lisa Zhang"]
    },
    abstract: "This study presents a comprehensive IoT-based framework for monitoring and reducing carbon emissions in smart cities. We developed sensor networks and data analytics platforms to track environmental metrics in real-time, enabling automated systems to optimize energy consumption and reduce waste.",
    results: {
      text: "Our IoT implementation achieved an average 23% reduction in carbon emissions across three pilot cities. The smart monitoring system successfully identified energy waste patterns and automatically adjusted building systems to optimize efficiency. Cost savings of approximately $2.3M were realized over the 12-month study period.",
      images: ["/research/iot-network.jpg", "/research/carbon-reduction-graph.jpg"]
    },
    futureWork: "We plan to scale this solution to larger metropolitan areas and integrate machine learning models for predictive environmental management. Future work will also explore blockchain-based carbon credit systems.",
    associatedProjects: [
      {
        title: "EcoTracker IoT Platform",
        description: "A comprehensive IoT platform for environmental monitoring and carbon footprint tracking.",
        link: "https://github.com/yourname/ecotracker-iot"
      },
      {
        title: "Smart City Dashboard",
        description: "Real-time analytics dashboard for urban environmental monitoring and management.",
        link: "https://github.com/yourname/smart-city-dashboard"
      }
    ]
  }
];

