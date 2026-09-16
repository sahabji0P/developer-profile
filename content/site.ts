/**
 * Verbatim site content extracted from the live portfolio
 * (https://shashwatjain.tech → https://www.shashwatjain.tech/) and
 * cross-checked against repo `data/` files. Nothing here is invented.
 *
 * Money Mate's live `sourceLink` points at recycle-bin (copy-paste bug);
 * that GitHub URL is omitted rather than reused.
 */

export const SITE_URL = "https://shashwatjain.tech"

export type SocialLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  description: string
  github?: string
  live?: string
  year?: number
  featured?: boolean
  /** Path under `public/`, e.g. `/projects/MoneyMate.svg`. */
  image?: string
}

export type Experience = {
  role: string
  org: string
  start: string
  end: string
  description?: string
}

export type Education = {
  school: string
  program: string
  start: string
  end: string
}

export type Publication = {
  title: string
  venue: string
  date: string
  url?: string
}

export type Certification = {
  name: string
  year: string
  issuer?: string
}

export type Achievement = {
  title: string
  detail?: string
}

export type SiteContent = {
  name: string
  role: string
  location: string
  shortBio: string
  longBio: string
  email: string
  /** Static resume PDF served from `public/`. */
  resumeUrl: string
  socials: SocialLink[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  publication: Publication
  certifications: Certification[]
  achievements: Achievement[]
}

export const site: SiteContent = {
  name: "Shashwat Jain",
  role:
    "Full-stack developer and AI engineer. Final-year Computer Science student at Bennett University.",
  location: "India",
  shortBio:
    "I am Shashwat Jain, currently a final year Engineering student from India, with majors in Computer Science. Professionally I am a Full-Stack Developer and AI Engineer specializing in delivering scalable and robust systems. Additionally I had Presented a Research Paper on Vision Transformer based system at IEEE Conference (IIT Indore)",
  longBio:
    "I am Shashwat Jain, currently a final year Engineering student from India, with majors in Computer Science. Professionally I am a Full-Stack Developer and AI Engineer specializing in delivering scalable and robust systems. Additionally I had Presented a Research Paper on Vision Transformer based system at IEEE Conference (IIT Indore)",
  email: "shashwatjain2k3@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/sahabji0P" },
    { label: "X", href: "https://twitter.com/itsshashwatj" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/itsshashwatjain/" },
    { label: "Email", href: "mailto:shashwatjain2k3@gmail.com" },
  ],
  projects: [
    {
      title: "Money Mate",
      description:
        "Next.js PWA using Gemini 2.5 Flash API to parse receipts and split expenses among participants.",
      live: "https://matemoney.vercel.app/",
      featured: true,
      image: "/projects/moneyMateImage.png",
    },
    {
      title: "NeuroVision",
      description:
        "End-to-end full-stack application using Vision Transformer for real-time MRI tumor detection.",
      github: "https://github.com/sahabji0P/NeuroVision",
      featured: true,
      image: "/projects/NeuroVisionLogo.svg",
    },
    {
      title: "Suraksha-AI",
      description:
        "Flask-based system using YOLOv11 + CBAM for high-accuracy object detection on live video.",
      github: "https://github.com/sahabji0P/spot-ai",
      featured: true,
      image: "/projects/surakshaLogo.svg",
    },
    {
      title: "Khel Onn",
      description:
        "Java/XML Android application with Firebase for event registration, live scoring, and notifications.",
      github: "https://github.com/sahabji0P/KhelOn",
      image: "/projects/khelon.png",
    },
    {
      title: "Recycle Bin",
      description:
        "Next.js/MongoDB platform with real-time analytics and interactive dashboards for recycling commerce.",
      github: "https://github.com/sahabji0P/recycle-bin",
      image: "/projects/recyclebin.jpeg",
    },
  ],
  experience: [
    {
      role: "Full Stack Developer (Freelance Collaboration)",
      org: "Web Landers",
      start: "May 2024",
      end: "Dec 2024",
      description:
        "Developed responsive frontend pages using React.js and Next.js frameworks. Built robust backend services using Python and JavaScript technologies. Integrated MySQL and Supabase databases for scalable data management. Led a team of four developers in collaborative project delivery. Achieved 15% faster delivery than baseline schedule for all projects. Served international and local business clients with diverse needs. Maintained 95% client satisfaction rate through effective coordination. Conducted comprehensive code reviews across all development projects.",
    },
  ],
  education: [
    {
      school: "Bennett University",
      program: "B.Tech in Computer Science",
      start: "2022",
      end: "2026",
    },
    {
      school: "GD Goenka International School",
      program: "Senior Secondary",
      start: "2020",
      end: "2022",
    },
    {
      school: "Vidya Global School (IGCSE)",
      program: "High School",
      start: "2011",
      end: "2020",
    },
  ],
  publication: {
    title: "Brain Tumor Classification Using DeiT Vision Transformer",
    venue: "16th ICCCNT IEEE Conference, IIT Indore",
    date: "July 2025",
  },
  certifications: [
    {
      name: "Service Now Certified Application Developer",
      year: "2025",
      issuer: "Service Now",
    },
    {
      name: "Microsoft Azure AI Fundamentals",
      year: "2024",
      issuer: "Microsoft",
    },
    {
      name: "Malware Analysis and Introduction to Assembly Language",
      year: "2024",
      issuer: "IBM",
    },
  ],
  achievements: [
    {
      title: "Dean's List Award",
      detail: "Received Dean's List Award for scoring 9.8 SGPA in Semester 5",
    },
    {
      title: "Runner Up in Hackaccino",
      detail: "Received Runner Up in Hackaccino deploying a web application on COREO",
    },
    {
      title: "Project Showcase 2024",
      detail: "Got selected for Project Showcase 2024 among 100+ teams",
    },
  ],
}

/**
 * Home wants a three-line bio. Split the live About sentence on sentence
 * boundaries without rewriting the wording. A missing terminal period on the
 * live sentence is restored so the last line is not dropped.
 */
export function homeBioLines(): string[] {
  const raw = site.shortBio.trim()
  const normalized = /[.!?]$/.test(raw) ? raw : `${raw}.`
  return normalized
    .split(/(?<=\.)\s+/)
    .map((line) => line.trim())
    .filter(Boolean)
}

/** About page long bio: live paragraph plus education / experience / publication. */
export function composeLongBio(): string {
  const school = site.education[0]
  const job = site.experience[0]
  const pub = site.publication
  const nb = (value: string) => value.replace(/ /g, "\u00A0")

  return [
    site.shortBio,
    `${school.program} at ${school.school}, ${nb(school.start)}–${nb(school.end)}.`,
    `${job.role} at ${job.org}, ${nb(job.start)}–${nb(job.end)}.`,
    `${pub.title}; ${pub.venue}, ${nb(pub.date)}.`,
  ].join("\n\n")
}

/**
 * “Detailed” bio — readable prose. Lists belong in Resume mode.
 */
export function composeDetailedBio(): string {
  const job = site.experience[0]
  const pub = site.publication
  const school = site.education[0]
  const nb = (value: string) => value.replace(/ /g, "\u00A0")

  return [
    site.shortBio,
    `I’m finishing ${school.program} at ${school.school} (${nb(school.start)}–${nb(school.end)}). Most recently I worked as ${job.role} at ${job.org}, shipping full-stack product work for client teams.`,
    `On the research side, I presented ${pub.title} at ${pub.venue} (${nb(pub.date)}).`,
  ].join("\n\n")
}

/**
 * Concise resume-style bullets for the home “Resume” panel.
 * Drawn only from experience, education, publication, and project titles in site.ts.
 */
export function composeResumeBullets(): string[] {
  const job = site.experience[0]
  const school = site.education[0]
  const pub = site.publication
  const projectTitles = site.projects.map((project) => project.title).join(", ")

  return [
    `${site.role}`,
    `${job.role} · ${job.org} · ${job.start}–${job.end}`,
    `${school.program} · ${school.school} · ${school.start}–${school.end}`,
    `${pub.title} · ${pub.venue} · ${pub.date}`,
    `Projects: ${projectTitles}`,
    `${site.location} · ${site.email}`,
  ]
}

/** Experience description as sentence bullets for the About list. */
export function experienceBullets(description: string): string[] {
  return description
    .split(/(?<=\.)\s+/)
    .map((line) => line.trim())
    .filter(Boolean)
}
