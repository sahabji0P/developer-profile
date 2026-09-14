/**
 * Generate a plain professional resume PDF from content/site.ts facts only.
 * Run: node scripts/generate-resume.mjs
 */
import { createWriteStream } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import PDFDocument from "pdfkit"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const outPath = join(root, "public", "resume.pdf")

// Mirrored from content/site.ts — keep in sync when site facts change.
const site = {
  name: "Shashwat Jain",
  role:
    "Full-stack developer and AI engineer. Final-year Computer Science student at Bennett University.",
  location: "India",
  email: "shashwatjain2k3@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/sahabji0P" },
    { label: "X", href: "https://twitter.com/itsshashwatj" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/itsshashwatjain/" },
  ],
  projects: [
    {
      title: "Money Mate",
      description:
        "Next.js PWA using Gemini 2.5 Flash API to parse receipts and split expenses among participants.",
      live: "https://matemoney.vercel.app/",
    },
    {
      title: "NeuroVision",
      description:
        "End-to-end full-stack application using Vision Transformer for real-time MRI tumor detection.",
      github: "https://github.com/sahabji0P/NeuroVision",
    },
    {
      title: "Suraksha-AI",
      description:
        "Flask-based system using YOLOv11 + CBAM for high-accuracy object detection on live video.",
      github: "https://github.com/sahabji0P/spot-ai",
    },
    {
      title: "Khel Onn",
      description:
        "Java/XML Android application with Firebase for event registration, live scoring, and notifications.",
      github: "https://github.com/sahabji0P/KhelOn",
    },
    {
      title: "Recycle Bin",
      description:
        "Next.js/MongoDB platform with real-time analytics and interactive dashboards for recycling commerce.",
      github: "https://github.com/sahabji0P/recycle-bin",
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
}

function experienceBullets(description) {
  return description
    .split(/(?<=\.)\s+/)
    .map((line) => line.trim())
    .filter(Boolean)
}

const doc = new PDFDocument({
  margin: 54,
  size: "LETTER",
  info: {
    Title: `${site.name} — Resume`,
    Author: site.name,
  },
})

const stream = createWriteStream(outPath)
doc.pipe(stream)

const left = doc.page.margins.left
const width =
  doc.page.width - doc.page.margins.left - doc.page.margins.right

function heading(text) {
  doc.moveDown(0.85)
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#111111")
    .text(text.toUpperCase(), left, doc.y, { width, characterSpacing: 0.6 })
  doc
    .moveTo(left, doc.y + 2)
    .lineTo(left + width, doc.y + 2)
    .strokeColor("#bbbbbb")
    .lineWidth(0.6)
    .stroke()
  doc.moveDown(0.55)
}

function body(text, opts = {}) {
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#222222")
    .text(text, { width, ...opts })
}

function bullet(text) {
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#222222")
    .text(`•  ${text}`, { width, indent: 0 })
}

// Header
doc
  .font("Helvetica-Bold")
  .fontSize(20)
  .fillColor("#111111")
  .text(site.name, { width })
doc.moveDown(0.25)
doc
  .font("Helvetica")
  .fontSize(10.5)
  .fillColor("#333333")
  .text(site.role, { width })
doc.moveDown(0.35)
body(`${site.email}  ·  ${site.location}`)
body(site.socials.map((s) => `${s.label}: ${s.href}`).join("\n"))

heading("Experience")
for (const job of site.experience) {
  doc
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .fillColor("#111111")
    .text(job.role, { width, continued: false })
  body(`${job.org}  ·  ${job.start}–${job.end}`)
  doc.moveDown(0.2)
  for (const line of experienceBullets(job.description)) {
    bullet(line)
  }
}

heading("Education")
for (const edu of site.education) {
  doc
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .fillColor("#111111")
    .text(edu.program, { width })
  body(`${edu.school}  ·  ${edu.start}–${edu.end}`)
  doc.moveDown(0.25)
}

heading("Publication")
doc
  .font("Helvetica-Bold")
  .fontSize(10.5)
  .fillColor("#111111")
  .text(site.publication.title, { width })
body(`${site.publication.venue}  ·  ${site.publication.date}`)

heading("Projects")
for (const project of site.projects) {
  doc
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .fillColor("#111111")
    .text(project.title, { width })
  body(project.description)
  const links = [project.github, project.live].filter(Boolean).join("  ·  ")
  if (links) {
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#444444")
      .text(links, { width })
  }
  doc.moveDown(0.35)
}

doc.end()

await new Promise((resolve, reject) => {
  stream.on("finish", resolve)
  stream.on("error", reject)
})

console.log(`Wrote ${outPath}`)
