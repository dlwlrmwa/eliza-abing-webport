"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Github,
  Linkedin,
  Facebook,
  Send,
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileText,
  Clock,
  MapPin,
  ExternalLink,
  ChevronDown, // Added for the scroll indicator
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { SparkleCursor } from "@/components/sparkle-cursor"
import { SnowflakeEffect } from "@/components/snowflake-effect"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const projects = [
  {
    id: 1,
    title: "Amari Point of Sale & Inventory Management System",
    description:
      "A modern e-commerce solution with seamless checkout and inventory management.",
    images: [
      { src: "/1project/amari1.gif", description: "Main dashboard with real-time inventory overview" },
      { src: "/1project/amari2.png", description: "Point of sale interface with product selection" },
      { src: "/1project/amari3.png", description: "Inventory management and stock tracking system" },
      { src: "/1project/amari4.png", description: "Sales analytics and reporting dashboard" },
    ],
    tags: ["Next.js", "TypeScript", "Supabase"],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Cebu - Bohol Educational Tour 2025",
    description:
      "Exploring local heritage, industry practices, and natural wonders through a 4-day academic journey.",
    images: [
      { src: "/Day3/D3-mata1.jpg", description: "Exploring the historic Magellan's Cross in Cebu" },
      { src: "/gallery/4.jpg", description: "Visiting the Chocolate Hills in Bohol" },
      { src: "/gallery/12.jpg", description: "Learning about sustainable tourism practices" },
      { src: "/gallery/15.jpg", description: "Group photo at the Loboc River Cruise" },
    ],
    tags: [" 📍 Cebu", " 📍 Bohol"],
    github: "#",
    demo: "journal",
  },
  {
    id: 3,
    title: "Website Portfolio",
    description:
      "Responsive personal portfolio built from scratch with a focus on clean UI and polished UX.",
    images: [
      { src: "/my-portfolio.JPG", description: "#" },
      { src: "/my-portfolio.JPG", description: "#" },
      { src: "/my-portfolio.JPG", description: "#" },
      { src: "/my-portfolio.JPG", description: "#" },
    ],
    tags: ["Next.js", "Typescript", "Tailwind"],
    github: "#",
    demo: "https://eliza-abing-port.vercel.app/",
  },
  {
    id: 4,
    title: "QuizWiz",
    description:
      "An interactive quiz application assessment tool featuring dynamic question handling and instant feedback.",
    images: [
      { src: "/quizwiz.JPG", description: "Quiz creation interface with multiple question types" },
      { src: "/quizwiz.JPG", description: "Interactive quiz taking experience" },
      { src: "/quizwiz.JPG", description: "Real-time results and analytics dashboard" },
      { src: "/quizwiz.JPG", description: "Score tracking and performance insights" },
    ],
    tags: ["React", "API Integration", "Charts"],
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "TaskMate Task Management Dashboard",
    description:
      "A collaborative task management tool with real-time updates and team features.",
    images: [
      { src: "/taskmate.jpg", description: "Task board with drag-and-drop functionality" },
      { src: "/taskmate.jpg", description: "Team collaboration and assignment features" },
      { src: "/taskmate.jpg", description: "Project timeline and progress tracking" },
      { src: "/taskmate.jpg", description: "Notifications and activity feed" },
    ],
    tags: ["Next.js", "Supabase", "Tailwind"],
    github: "#",
    demo: "#",
  },
  {
    id: 6,
    title: "Chrome Locker",
    description:
      "A privacy-focused browser extension that allows users to password-protect tabs.",
    images: [
      { src: "/chrome-locker.png", description: "Extension popup with lock interface" },
      { src: "/chrome-locker.png", description: "Password setup and security settings" },
      { src: "/chrome-locker.png", description: "Tab protection and unlock mechanism" },
      { src: "/chrome-locker.png", description: "Privacy dashboard and activity log" },
    ],
    tags: ["HTML", "CSS", "Javascript", "JSON"],
    github: "#",
    demo: "#",
  },
]

const certificates = [
  {
    id: 1,
    title: "Certificate of Completion",
    issuer: "Learnovers",
    description:
      "My certificate of completion of the Javascript Tutorial",
    image: "/certs/javascript-cert.png",
    date: "2025-11-22",
  },
  {
    id: 2,
    title: "Information Management",
    issuer: "CODECHUM",
    description:
      "This certificate verifies my completion of the Information Management course covering data organization, systems, and security practices under the CC105 course.",
    image: "/certs/eli-CC105-certificate.png",
    date: "2025-05-19",
  },
]

function formatDateRange(startDate: string, endDate?: string) {
  if (!endDate) {
    return new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  const start = new Date(startDate)
  const end = new Date(endDate)
  const startMonth = start.toLocaleDateString("en-US", { month: "long" })
  const startDay = start.getDate()
  const endMonth = end.toLocaleDateString("en-US", { month: "long" })
  const endDay = end.getDate()
  const year = end.getFullYear()

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`
  } else {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
  }
}

function ProjectGalleryDialog({
  project,
  onClose,
}: {
  project: (typeof projects)[0]
  onClose: () => void
}) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const next = () => setIndex((i) => (i + 1) % project.images.length)
  const prev = () => setIndex((i) => (i === 0 ? project.images.length - 1 : i - 1))

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="p-0 w-full max-w-[95vw] max-h-[92vh] sm:max-w-[900px] sm:max-h-[90vh] bg-transparent border-0 shadow-none flex items-center justify-center"
      >
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <div
          className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const diff = touchStartX.current - e.changedTouches[0].clientX
            if (diff > 50) next()
            if (diff < -50) prev()
            touchStartX.current = null
          }}
        >
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <Image
            src={project.images[index].src}
            alt={`${project.title}`}
            width={1200}
            height={800}
            className="w-full h-auto max-h-[92vh] sm:max-h-[90vh] object-contain"
          />

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function HomePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <SparkleCursor />
      <SnowflakeEffect />
      <main className="min-h-screen pt-16 scroll-smooth">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-6 lg:px-8 overflow-hidden py-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`space-y-8 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                  Hi, I'm{" "}
                  <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Eliza Marie Abing
                  </span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">BSIT student at Holy Cross of Davao College, dedicated to building efficient, user-centric solutions while exploring the intersection of design and technology.</p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => scrollToSection("projects")} size="lg" className="rounded-full bg-gradient-to-r from-primary to-primary/80 text-white px-8 transition-all hover:scale-105 cursor-pointer">
                    View My Work <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button onClick={() => scrollToSection("contact")} size="lg" variant="outline" className="rounded-full border-2 border-primary/30 bg-white/10 px-8 transition-all hover:scale-105 cursor-pointer">
                    Get in Touch <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* PROFESSIONAL PHOTO SECTION */}
              <div className={`relative flex justify-center items-center transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

                {/* Decorative Background Glow */}
                <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-profile-glow" />

                {/* Image Container with Floating Animation */}
                <div className="relative animate-profile-float">

                  {/* The Sparkle Frame (Matches Project Card #2) */}
                  <div className="relative p-3 bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden group">

                    {/* Inner Image Wrapper */}
                    <div className="relative aspect-[4/5] w-64 md:w-80 rounded-[2rem] overflow-hidden border border-white/10">
                      <Image
                        src="/my-portrait.jpg"
                        alt="Eliza Marie Abing"
                        fill
                        className="object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                        priority
                      />

                      {/* Subtle Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    </div>
                  </div>

                  {/* Floating Tag or Highlight */}
                  <div className="absolute -bottom-4 -left-4 bg-background/80 backdrop-blur-md border border-primary/20 px-4 py-2 rounded-2xl shadow-xl">
                    <p className="text-xs font-bold text-primary tracking-widest uppercase">Available for Work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Scroll for more Button */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <button
              onClick={() => scrollToSection("about")}
              className="group flex flex-col items-center gap-2 transition-all duration-300"
            >
              <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase group-hover:text-primary transition-colors">
                Scroll for more
              </span>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg group-hover:border-primary/50 group-hover:bg-white/20 transition-all">
                <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </div>
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto w-full"> {/* Increased max-width for 3 columns */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">About Me</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Passionate about creating meaningful digital experiences
              </p>
            </div>

            {/* Grid updated to 3 columns on large screens */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Card 1: Skills */}
              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                <h3 className="text-xl font-serif font-semibold mb-6">Skills & Expertise</h3>
                <div className="space-y-3">
                  {[
                    "Full-Stack Development",
                    "Database Management",
                    "Modern UI Systems",
                    "API & Logic",
                    "Version Control",
                    "Cloud Development",
                    "Design Implementation",
                    "UI/UX Design",
                    "Responsive Design",
                    "Prototyping"
                  ].map((skill) => (
                    <div key={skill} className="flex items-center gap-3 group">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover:w-3 group-hover:h-3 transition-all duration-300" />
                      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Experience */}
              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                <h3 className="text-xl font-serif font-semibold mb-6">Experience</h3>
                <div className="space-y-6">
                  <div className="group">
                    <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">Student Assistant</h4>
                    <p className="text-sm text-muted-foreground mb-2">Holy Cross of Davao College • 2023 - Present</p>
                    <p className="text-sm text-muted-foreground">Provides essential administrative, technical, or clerical support to a College of Engineering and Technology department while balancing academic responsibilities.</p>
                  </div>
                  <div className="group">
                    <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">Creative Developer</h4>
                    <p className="text-sm text-muted-foreground mb-2"> 2023 - Present</p>
                    <p className="text-sm text-muted-foreground">Developed interactive web experiences.</p>
                  </div>
                                    <div className="group">
                    <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">Costumer Service Representative</h4>
                    <p className="text-sm text-muted-foreground mb-2">2022 - 2023</p>
                    <p className="text-sm text-muted-foreground">Served as the primary point of contact for clients, dedicated to resolving inquiries, providing product information, and ensuring a positive overall experience with the company.</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Tech Stack Logos */}
              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                <h3 className="text-xl font-serif font-semibold mb-6">Tech Stack</h3>
                <div className="grid grid-cols-3 gap-6 items-center justify-items-center">
                  {[
                    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                    { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
                    { name: "Supabase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
                    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                    { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                    { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                    { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
                    { name: "Vercel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
                    { name: "Netlify", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
                  ].map((tech) => (
                    <div key={tech.name} className="group relative flex flex-col items-center gap-2">
                      <div className="w-12 h-12 p-2 bg-white/20 rounded-xl border border-white/30 group-hover:border-primary/50 group-hover:bg-white/30 transition-all duration-300">
                        <img
                          src={tech.src}
                          alt={tech.name}
                          className="w-full h-full object-contain filter transition-all duration-500"
                        />
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
        {/* Projects Grid Section */}
        <section id="projects" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Featured Projects</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">Explore my latest work and creative solutions</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {projects.map((project) => (
                <article
                  key={project.id}
                  onClick={() => {
                    if (project.id === 2) {
                      router.push("/journal");
                    } else {
                      setSelectedProject(project);
                    }
                  }}
                  className={`group bg-card rounded-xl border transition-all duration-500 cursor-pointer flex flex-col relative pt-1 px-1 ${project.id === 2
                    ? "sparkle-border-container border-transparent shadow-[0_0_100px_rgba(255,105,180,0.3)]"
                    : "border-border hover:border-primary"
                    }`}
                >
                  {/* Must See Badge Overlay */}
                  {project.id === 2 && (
                    <div className="absolute top-5 left-5 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-black/80 text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                      </span>
                      Must See
                    </div>
                  )}

                  {/* PHOTO SECTION */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    // Changed rounded-t to rounded-xl so the image has rounded corners all around inside the card
                    className="relative aspect-video overflow-hidden bg-secondary cursor-zoom-in rounded-xl"
                  >
                    <Image
                      src={project.images[0].src}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-serif font-semibold mb-2 text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                      {project.title}
                      {project.id === 2 && <span className="animate-pulse"></span>}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-3 py-1 bg-secondary text-secondary-foreground rounded-full font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3">
                      {project.id === 2 ? (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push("/journal");
                          }}
                          size="sm"
                          className="rounded-full flex-1 bg-primary hover:bg-primary/90 text-black/85 shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                          View My Journal
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={(e) => e.stopPropagation()}
                            size="sm" variant="outline" className="rounded-full flex-1"
                          >
                            <Github className="mr-2 h-4 w-4" />Code
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            size="sm" className="rounded-full flex-1 bg-primary hover:bg-primary/90"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" /> Demo

                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-20 px-6 lg:px-8 scroll-mt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Certificates</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional achievements and training
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {certificates.map((cert) => (
                <Dialog key={cert.id}>
                  <DialogTrigger asChild>
                    <article className="group relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-primary shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 cursor-pointer">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                              {cert.issuer}
                            </span>
                          </div>
                          <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                            {cert.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Calendar className="h-4 w-4" />
                            <time>{formatDateRange(cert.date)}</time>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                            {cert.description}
                          </p>
                        </div>
                        <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                      </div>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
                        <Image src={cert.image} alt={cert.title} fill className="object-contain" />
                      </div>
                    </article>
                  </DialogTrigger>
                  <DialogContent showCloseButton={false} className="p-0 w-full max-w-[95vw] max-h-[92vh] sm:max-w-[900px] sm:max-h-[90vh] bg-transparent border-0 shadow-none">
                    <DialogTitle className="sr-only">{cert.title}</DialogTitle>
                    <div className="flex items-center justify-center w-full h-full p-4">
                      <Image src={cert.image} alt={`Full view of ${cert.title}`} width={800} height={600} className="w-full h-auto max-h-[85vh] sm:max-h-[80vh] object-contain rounded-lg" />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-transparent to-primary/5 scroll-mt-20">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Get in Touch</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">Let's create something amazing together</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="rounded-xl bg-white/50 border-white/30 focus:border-primary" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="rounded-xl bg-white/50 border-white/30 focus:border-primary" placeholder="your.email@example.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} className="rounded-xl min-h-[150px] bg-white/50 border-white/30 focus:border-primary" placeholder="Tell me about your project..." />
                  </div>
                  <Button type="submit" size="lg" className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all hover:scale-105">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
                  <h3 className="text-xl font-serif font-semibold mb-6">Connect With Me</h3>
                  <a href="mailto:your.email@example.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all group">
                    <div className="p-3 bg-white/20 rounded-full group-hover:bg-primary/20 transition-all"><Mail className="h-5 w-5" /></div>
                    <span>your.email@example.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 lg:px-8 border-t border-white/20 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Eliza Marie Abing. All rights reserved.</p>
          </div>
        </footer>
      </main>

      {/* Floating Contact Button */}
      <button onClick={() => scrollToSection("contact")} className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 animate-bounce cursor-pointer">
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Project Gallery Dialog */}
      {selectedProject && (
        <ProjectGalleryDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  )
}