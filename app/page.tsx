"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Download,
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
  ExternalLink,
  Clock,
  MapPin,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { SparkleCursor } from "@/components/sparkle-cursor"
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
      { src: "/amari-pos/amari01.gif", description: "Main dashboard with real-time inventory overview" },
      { src: "/amari-pos/amari2.png", description: "Point of sale interface with product selection" },
      { src: "/amari-pos/amari3.png", description: "Inventory management and stock tracking system" },
      { src: "/amari-pos/amari4.png", description: "Sales analytics and reporting dashboard" },
    ],
    tags: ["Next.js", "TypeScript", "Supabase"],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "A clean, minimalist portfolio showcasing creative work with smooth animations.",
    images: [
      { src: "/minimalist-portfolio.png", description: "Homepage with hero section and featured work" },
      { src: "/minimalist-portfolio.png", description: "Project showcase with interactive galleries" },
      { src: "/minimalist-portfolio.png", description: "About section with skills and experience" },
      { src: "/minimalist-portfolio.png", description: "Contact form with modern UI design" },
    ],
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "TaskMate",
    description:
      "A collaborative task management tool with real-time updates and team features.",
    images: [
      { src: "/task-management-dashboard.png", description: "Task board with drag-and-drop functionality" },
      { src: "/task-management-dashboard.png", description: "Team collaboration and assignment features" },
      { src: "/task-management-dashboard.png", description: "Project timeline and progress tracking" },
      { src: "/task-management-dashboard.png", description: "Notifications and activity feed" },
    ],
    tags: ["Next.js", "Supabase", "Tailwind"],
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Quiz Application",
    description:
      "An interactive assessment tool featuring dynamic question handling and instant feedback.",
    images: [
      { src: "/weather-app-interface.png", description: "Quiz creation interface with multiple question types" },
      { src: "/weather-app-interface.png", description: "Interactive quiz taking experience" },
      { src: "/weather-app-interface.png", description: "Real-time results and analytics dashboard" },
      { src: "/weather-app-interface.png", description: "Score tracking and performance insights" },
    ],
    tags: ["React", "API Integration", "Charts"],
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "CheckMate",
    description:
      "Content management system with markdown support and SEO optimization.",
    images: [
      { src: "/blog-platform-interface.jpg", description: "Content editor with markdown support" },
      { src: "/blog-platform-interface.jpg", description: "SEO optimization tools and preview" },
      { src: "/blog-platform-interface.jpg", description: "Content library and organization" },
      { src: "/blog-platform-interface.jpg", description: "Publishing workflow and scheduling" },
    ],
    tags: ["Next.js", "MDX", "CMS"],
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
    tags: ["React", "Extension", "Security"],
    github: "#",
    demo: "#",
  },
]

const journalPosts = [
  {
    id: 1,
    title: "Cebu - Bohol Educational Tour 2025",
    excerpt:
      "Exploring local heritage, industry practices, and natural wonders: A recap of our 4-day academic journey across Cebu and Bohol.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    date: "2025-11-19",
    endDate: "2025-11-22",
    readTime: "5 min read",
    slug: "cebu-bohol-tour",
    photos: [
      // Day 1 - Company 1
      { id: 1, day: 1, company: "Company A", title: "Grand Departure", description: "The beginning of our 4-day academic journey. Students gathered at the departure point excited to explore Cebu and Bohol's cultural and natural heritage.", location: "Cebu City", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop" },
      { id: 2, day: 1, company: "Company A", title: "Company A - Welcome Session", description: "Introduction and welcome session at Company A. Learning about their operations and industry practices.", location: "Cebu City", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop" },
      { id: 3, day: 1, company: "Company A", title: "Company A - Facility Tour", description: "Guided tour through Company A's facilities, observing their production processes and workflow.", location: "Cebu City", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=800&fit=crop" },
      { id: 4, day: 1, company: "Company A", title: "Company A - Q&A Session", description: "Interactive Q&A session with Company A representatives, discussing industry insights and career opportunities.", location: "Cebu City", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop" },
      { id: 5, day: 1, company: "Company A", title: "Company A - Group Photo", description: "Memorable group photo with Company A team members and fellow students.", location: "Cebu City", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=800&fit=crop" },

      // Day 2 - Company 2 & 3
      { id: 6, day: 2, company: "Company B", title: "Company B - Arrival", description: "Arriving at Company B, ready to explore their innovative approaches and business model.", location: "Cebu City", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop" },
      { id: 7, day: 2, company: "Company B", title: "Company B - Presentation", description: "Attending an informative presentation about Company B's services and market position.", location: "Cebu City", image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1200&h=800&fit=crop" },
      { id: 8, day: 2, company: "Company B", title: "Company B - Workshop", description: "Participating in a hands-on workshop organized by Company B, learning practical skills.", location: "Cebu City", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop" },
      { id: 9, day: 2, company: "Company C", title: "Company C - Introduction", description: "Introduction to Company C's operations and their role in the local economy.", location: "Cebu City", image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&h=800&fit=crop" },
      { id: 10, day: 2, company: "Company C", title: "Company C - Production Line", description: "Observing Company C's production line and understanding their manufacturing processes.", location: "Cebu City", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=800&fit=crop" },
      { id: 11, day: 2, company: "Company C", title: "Company C - Team Discussion", description: "Engaging discussion with Company C's team about their challenges and innovations.", location: "Cebu City", image: "https://images.unsplash.com/photo-1536152470836-b943b246224c?w=1200&h=800&fit=crop" },

      // Day 3 - Company 4
      { id: 12, day: 3, company: "Company D", title: "Company D - Welcome", description: "Warm welcome at Company D, beginning our exploration of their business operations.", location: "Bohol", image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=800&fit=crop" },
      { id: 13, day: 3, company: "Company D", title: "Company D - Office Tour", description: "Comprehensive office tour at Company D, seeing their modern workspace and facilities.", location: "Bohol", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop" },
      { id: 14, day: 3, company: "Company D", title: "Company D - Case Study", description: "Analyzing a real-world case study presented by Company D's management team.", location: "Bohol", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1200&h=800&fit=crop" },
      { id: 15, day: 3, company: "Company D", title: "Company D - Networking", description: "Networking session with Company D professionals, building valuable connections.", location: "Bohol", image: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=1200&h=800&fit=crop" },
      { id: 16, day: 3, company: "Company D", title: "Company D - Closing Remarks", description: "Closing remarks and certificate presentation from Company D.", location: "Bohol", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop" },

      // Day 4 - Company 5
      { id: 17, day: 4, company: "Company E", title: "Company E - Arrival", description: "Final day visit to Company E, the last company on our educational tour.", location: "Bohol", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop" },
      { id: 18, day: 4, company: "Company E", title: "Company E - Overview", description: "Overview presentation of Company E's history, mission, and future goals.", location: "Bohol", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop" },
      { id: 19, day: 4, company: "Company E", title: "Company E - Interactive Session", description: "Interactive session with Company E employees, sharing experiences and insights.", location: "Bohol", image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1200&h=800&fit=crop" },
      { id: 20, day: 4, company: "Company E", title: "Company E - Demonstration", description: "Live demonstration of Company E's products and services.", location: "Bohol", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop" },
      { id: 21, day: 4, company: "Company E", title: "Company E - Feedback Session", description: "Sharing feedback and reflections on our visit to Company E.", location: "Bohol", image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&h=800&fit=crop" },
      { id: 22, day: 4, company: "Company E", title: "Farewell at Company E", description: "Bidding farewell to Company E team, concluding our company visits.", location: "Bohol", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=800&fit=crop" },

      // Additional photos
      { id: 23, day: 1, company: "Company A", title: "Heritage Street Walk", description: "Walking through historic streets of Cebu, observing colonial architecture and learning about the region's rich Spanish-influenced history.", location: "Heritage District, Cebu", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop" },
      { id: 24, day: 2, company: "Company B", title: "Chocolate Hills Overview", description: "Arriving at the iconic Chocolate Hills viewpoint. Hundreds of cone-shaped hills covered in grass create a breathtaking landscape.", location: "Chocolate Hills, Bohol", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop" },
      { id: 25, day: 3, company: "Company D", title: "Loboc River Cruise", description: "A serene river cruise through mangrove forests with floating restaurants, enjoying traditional music and local entertainment.", location: "Loboc River, Bohol", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop" },
    ],
    reflectionPages: [
      {
        id: 1,
        title: "Introduction & Departure",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=1000&fit=crop",
        pageNumber: 1,
      },
      {
        id: 2,
        title: "Cultural Immersion",
        image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&h=1000&fit=crop",
        pageNumber: 2,
      },
      {
        id: 3,
        title: "Natural Wonders",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=1000&fit=crop",
        pageNumber: 3,
      },
      {
        id: 4,
        title: "Community Engagement",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=1000&fit=crop",
        pageNumber: 4,
      },
      {
        id: 5,
        title: "Personal Growth",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=1000&fit=crop",
        pageNumber: 5,
      },
      {
        id: 6,
        title: "Conclusion & Takeaways",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=1000&fit=crop",
        pageNumber: 6,
      },
    ],
  },
]

const certificates = [
  {
    id: 1,
    title: "Certificate of Completion",
    issuer: "WATT - World of Adventures Travel and Tours",
    description:
      "My active participation and completion of the Educational Tour in Cebu and Bohol last November 19-22, 2025.",
    image: "/certs/eli-watt-certificate.png",
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

  const prev = () =>
    setIndex((i) => (i === 0 ? project.images.length - 1 : i - 1))
  const next = () => setIndex((i) => (i + 1) % project.images.length)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="p-0 w-full max-w-[95vw] max-h-[92vh] sm:max-w-[900px] sm:max-h-[90vh] bg-white/10 backdrop-blur-xl border-white/20">
        <DialogHeader className="p-4 bg-white/5 backdrop-blur-sm">
          <DialogTitle className="text-xl font-serif">{project.title}</DialogTitle>
        </DialogHeader>

        <div
          className="relative aspect-video overflow-hidden bg-black/20"
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const diff = touchStartX.current - e.changedTouches[0].clientX
            if (diff > 50) next()
            if (diff < -50) prev()
            touchStartX.current = null
          }}
        >
          <div
            className="flex h-full transition-transform duration-300"
            style={{
              width: `${project.images.length * 100}%`,
              transform: `translateX(-${index * (100 / project.images.length)}%)`,
            }}
          >
            {project.images.map((img, i) => (
              <div key={i} className="relative w-full h-full shrink-0">
                <Image
                  src={img.src}
                  alt={`${project.title} ${i + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded-full shadow-xl hover:bg-white transition-all hover:scale-110"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded-full shadow-xl hover:bg-white transition-all hover:scale-110"
          >
            <ChevronRight />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2 bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="p-4 bg-white/5 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground text-center">
            {project.images[index]?.description || ""}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [projectIndex, setProjectIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null)
  const [isVisible, setIsVisible] = useState(false)
  const carouselTouchStartX = useRef<number | null>(null)
  const [journalPhotoIndex, setJournalPhotoIndex] = useState(0)
  const [journalReflectionIndex, setJournalReflectionIndex] = useState(0)
  const journalTouchStartX = useRef<number | null>(null)
  const reflectionTouchStartX = useRef<number | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<
    (typeof journalPosts[0]["photos"][0]) | null
  >(null)
  const [isJournalAutoPlaying, setIsJournalAutoPlaying] = useState(true)

  // Auto-scroll projects
  useEffect(() => {
    const interval = setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll journal photos continuously (3D carousel)
  useEffect(() => {
    if (!isJournalAutoPlaying) return

    const journalPost = journalPosts[0]
    if (!journalPost?.photos) return

    const interval = setInterval(() => {
      setJournalPhotoIndex((prev) => (prev + 1) % journalPost.photos.length)
    }, 2000) // Change photo every 2 seconds for smoother continuous movement

    return () => clearInterval(interval)
  }, [isJournalAutoPlaying])

  // Fade in animation on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Smooth scroll behavior
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a[href^='#']")
      if (link) {
        e.preventDefault()
        const href = link.getAttribute("href")
        if (href) {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }
      }
    }

    document.addEventListener("click", handleSmoothScroll)
    return () => document.removeEventListener("click", handleSmoothScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollProject = (direction: "prev" | "next") => {
    setProjectIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? projects.length - 1 : prev - 1
      }
      return (prev + 1) % projects.length
    })
  }

  return (
    <>
      <SparkleCursor />
      <main className="min-h-screen pt-16 scroll-smooth">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-6 lg:px-8 overflow-hidden py-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`space-y-8 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight">
                  Hi, I'm{" "}
                  <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Eliza Marie Abing
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Creative professional crafting beautiful digital experiences with passion and precision.
                  Transforming ideas into reality through thoughtful design and development.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => scrollToSection("projects")}
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/50 text-white px-8 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    size="lg"
                    variant="outline"
                    className="rounded-full border-2 border-primary/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Get in Touch
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href="https://github.com/dlwlrmwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/elicitaffairs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/jieuneli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Instagram"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105">
                  <Image
                    src="/my-portrait.jpg"
                    alt="Eliza Marie Abing"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>

                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                About Me
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Passionate about creating meaningful digital experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                <h3 className="text-2xl font-serif font-semibold mb-6">Skills & Expertise</h3>
                <div className="space-y-3">
                  {[
                    "UI/UX Design",
                    "Web Development",
                    "Responsive Design",
                    "Brand Identity",
                    "Typography",
                    "Prototyping",
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

              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                <h3 className="text-2xl font-serif font-semibold mb-6">Experience</h3>
                <div className="space-y-6">
                  <div className="group">
                    <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      Senior Designer
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Company Name • 2020 - Present
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Leading design initiatives and creating user-centered solutions.
                    </p>
                  </div>
                  <div className="group">
                    <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      Creative Developer
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Agency Name • 2018 - 2020
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Developed interactive web experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Carousel Section */}
        <section
          id="projects"
          className="py-20 px-6 lg:px-8 relative overflow-hidden scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                  Featured Projects
                </h2>
                <p className="text-xl text-muted-foreground">
                  Explore my latest work and creative solutions
                </p>
              </div>
            </div>

            {/* Horizontal Scrolling Carousel */}
            <div className="relative mb-16">
              <div className="overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/20 p-4 md:p-8">
                <div
                  className="flex gap-6 transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(calc(-${projectIndex} * (100% / 3 + 1.5rem)))`,
                  }}
                  onTouchStart={(e) => (carouselTouchStartX.current = e.touches[0].clientX)}
                  onTouchEnd={(e) => {
                    if (carouselTouchStartX.current === null) return
                    const diff = carouselTouchStartX.current - e.changedTouches[0].clientX
                    if (Math.abs(diff) > 50) {
                      if (diff > 0) scrollProject("next")
                      else scrollProject("prev")
                    }
                    carouselTouchStartX.current = null
                  }}
                >
                  {projects.map((project) => (
                    <article
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group w-full md:w-[calc(33.333%-1rem)] flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 duration-500 cursor-pointer"
                    >
                      <div className="relative aspect-video overflow-hidden bg-secondary/50">
                        <Image
                          src={project.images[0].src}
                          alt={project.title}
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                            Click to view gallery
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollProject("prev")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center z-10"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => scrollProject("next")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center z-10"
                aria-label="Next project"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="flex justify-center gap-2 mt-8">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setProjectIndex(idx)}
                    className={`h-2 rounded-full transition-all ${idx === projectIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30"
                      }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        </section>

        {/* Journal Section */}
        <section
          id="journal"
          className="py-20 px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                  Latest Journal
                </h2>
                <p className="text-xl text-muted-foreground">
                  Visual stories and experiences
                </p>
              </div>
            </div>

            {journalPosts.map((post) => (
              <div key={post.id} className="space-y-12">
                {/* Journal Header */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                      <Calendar className="h-4 w-4" />
                      <time className="text-sm">
                        {post.endDate
                          ? formatDateRange(post.date, post.endDate)
                          : formatDateRange(post.date)}
                      </time>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    {post.title}
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                    {post.excerpt}
                  </p>

                  {/* Companies Visited Summary */}
                  {post.photos && (
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                      <span className="text-sm font-medium text-muted-foreground">Companies Visited:</span>
                      {Array.from(new Set(post.photos.map(p => p.company).filter(Boolean))).map((company, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3D Art Gallery Carousel */}
                {post.photos && post.photos.length > 0 && (
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl font-serif font-semibold">Photo Gallery</h4>
                      <span className="text-sm text-muted-foreground">
                        {journalPhotoIndex + 1} / {post.photos.length}
                      </span>
                    </div>

                    {/* 3D Carousel Container */}
                    <div className="relative">
                      {/* Blurred background frames effect */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-10 left-10 w-32 h-40 border-2 border-white/30 rounded rotate-12 blur-sm" />
                        <div className="absolute top-20 right-20 w-28 h-36 border-2 border-white/30 rounded -rotate-12 blur-sm" />
                        <div className="absolute bottom-20 left-20 w-36 h-44 border-2 border-white/30 rounded rotate-6 blur-sm" />
                        <div className="absolute bottom-10 right-10 w-30 h-38 border-2 border-white/30 rounded -rotate-6 blur-sm" />
                      </div>

                      {/* Carousel Viewport */}
                      <div
                        className="relative h-[500px] md:h-[600px] overflow-visible"
                        style={{
                          perspective: "1200px",
                          perspectiveOrigin: "50% 50%"
                        }}
                        onTouchStart={(e) => {
                          journalTouchStartX.current = e.touches[0].clientX
                        }}
                        onTouchEnd={(e) => {
                          if (journalTouchStartX.current === null) return
                          const diff = journalTouchStartX.current - e.changedTouches[0].clientX
                          if (Math.abs(diff) > 50) {
                            if (diff > 0) {
                              setJournalPhotoIndex((prev) => (prev + 1) % post.photos.length)
                            } else {
                              setJournalPhotoIndex((prev) => (prev === 0 ? post.photos.length - 1 : prev - 1))
                            }
                          }
                          journalTouchStartX.current = null
                        }}
                      >
                        {/* Carousel Track - Centered */}
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            left: "50%",
                            transform: `translateX(calc(-50% - ${journalPhotoIndex * 340}px))`,
                            transformStyle: "preserve-3d",
                            transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          {post.photos.map((photo, idx) => {
                            const distance = idx - journalPhotoIndex
                            const absDistance = Math.abs(distance)
                            const isActive = distance === 0
                            const isLeft = distance < 0

                            // 3D calculations for gallery effect
                            const translateX = distance * 340
                            const translateZ = isActive ? 0 : -Math.abs(distance) * 80
                            const scale = isActive ? 1 : Math.max(0.5, 1 - absDistance * 0.2)
                            const rotateY = isActive ? 0 : (isLeft ? 35 : -35) * Math.min(1, absDistance * 0.6)
                            const opacity = isActive ? 1 : Math.max(0.2, 1 - absDistance * 0.25)
                            const zIndex = post.photos.length - absDistance

                            return (
                              <div
                                key={photo.id}
                                onClick={() => {
                                  if (isActive) {
                                    setSelectedPhoto(photo)
                                  } else {
                                    setJournalPhotoIndex(idx)
                                  }
                                }}
                                className="absolute cursor-pointer transition-all duration-700 ease-out"
                                style={{
                                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
                                  opacity,
                                  zIndex,
                                  transformStyle: "preserve-3d",
                                  width: "300px",
                                  height: "420px",
                                  marginLeft: "-150px",
                                  pointerEvents: absDistance > 2 ? "none" : "auto",
                                }}
                              >
                                <div className="relative w-full h-full rounded-lg overflow-hidden bg-white/10 backdrop-blur-xl border-2 border-white/30 shadow-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-primary/30">
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={photo.image}
                                      alt={photo.title}
                                      fill
                                      className="object-cover"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                    {/* Card content overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                                        {photo.company && (
                                          <span className="px-3 py-1 bg-primary/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
                                            {photo.company}
                                          </span>
                                        )}
                                        <span className="px-3 py-1 bg-white/30 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                                          Day {photo.day}
                                        </span>
                                      </div>
                                      <h5 className="text-white font-bold text-xl mb-1 line-clamp-2 drop-shadow-lg">
                                        {photo.title}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                          onClick={() => setJournalPhotoIndex((prev) => (prev === 0 ? post.photos.length - 1 : prev - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full shadow-xl hover:bg-white transition-all hover:scale-110"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={() => setJournalPhotoIndex((prev) => (prev + 1) % post.photos.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full shadow-xl hover:bg-white transition-all hover:scale-110"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </div>

                      {/* Navigation Dots */}
                      <div className="flex justify-center gap-2 mt-8">
                        {post.photos.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setJournalPhotoIndex(idx)}
                            className={`h-2 rounded-full transition-all ${idx === journalPhotoIndex
                              ? "w-10 bg-primary"
                              : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                              }`}
                            aria-label={`Go to photo ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Photo Detail Modal */}
                {selectedPhoto && (
                  <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
                    <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden">
                      <DialogHeader className="p-6 pb-4 bg-white/5 backdrop-blur-sm border-b border-white/20">
                        <DialogTitle className="text-2xl font-serif">{selectedPhoto.title}</DialogTitle>
                      </DialogHeader>

                      <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                        {/* Image Container */}
                        <div className="relative w-full aspect-video bg-black/20">
                          <Image
                            src={selectedPhoto.image}
                            alt={selectedPhoto.title}
                            fill
                            className="object-contain"
                          />
                        </div>

                        {/* Details Section */}
                        <div className="p-6 space-y-4">
                          <div className="flex items-center gap-3 flex-wrap">
                            {selectedPhoto.company && (
                              <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                                {selectedPhoto.company}
                              </span>
                            )}
                            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                              Day {selectedPhoto.day}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span>{selectedPhoto.location}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground leading-relaxed text-base">
                            {selectedPhoto.description}
                          </p>
                        </div>
                      </div>

                      {/* Navigation in Modal */}
                      <div className="p-4 border-t border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            const currentIdx = post.photos.findIndex(p => p.id === selectedPhoto.id)
                            const prevIdx = currentIdx === 0 ? post.photos.length - 1 : currentIdx - 1
                            setSelectedPhoto(post.photos[prevIdx])
                            setJournalPhotoIndex(prevIdx)
                          }}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-all flex items-center gap-2"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </button>

                        <span className="text-sm text-muted-foreground">
                          {post.photos.findIndex(p => p.id === selectedPhoto.id) + 1} / {post.photos.length}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            const currentIdx = post.photos.findIndex(p => p.id === selectedPhoto.id)
                            const nextIdx = (currentIdx + 1) % post.photos.length
                            setSelectedPhoto(post.photos[nextIdx])
                            setJournalPhotoIndex(nextIdx)
                          }}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-all flex items-center gap-2"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Reflection Paper Carousel */}
                {post.reflectionPages && post.reflectionPages.length > 0 && (
                  <div className="space-y-6">
                    <h4 className="text-2xl font-serif font-semibold">Reflection Paper</h4>
                    <div className="relative">
                      <div className="overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/20 p-4 md:p-8">
                        <div
                          className="relative h-[500px] md:h-[700px]"
                          onTouchStart={(e) => (reflectionTouchStartX.current = e.touches[0].clientX)}
                          onTouchEnd={(e) => {
                            if (reflectionTouchStartX.current === null) return
                            const diff = reflectionTouchStartX.current - e.changedTouches[0].clientX
                            if (Math.abs(diff) > 50) {
                              if (diff > 0) {
                                setJournalReflectionIndex((prev) => (prev + 1) % post.reflectionPages.length)
                              } else {
                                setJournalReflectionIndex((prev) => (prev === 0 ? post.reflectionPages.length - 1 : prev - 1))
                              }
                            }
                            reflectionTouchStartX.current = null
                          }}
                        >
                          {post.reflectionPages.map((page, idx) => (
                            <div
                              key={page.id}
                              className={`absolute inset-0 transition-all duration-700 ${idx === journalReflectionIndex
                                ? "opacity-100 translate-x-0"
                                : idx < journalReflectionIndex
                                  ? "opacity-0 -translate-x-full"
                                  : "opacity-0 translate-x-full"
                                }`}
                            >
                              <div className="flex items-center justify-center h-full">
                                <div className="relative w-full max-w-md aspect-[3/4]">
                                  <Image
                                    src={page.image}
                                    alt={page.title}
                                    fill
                                    className="object-contain rounded-lg"
                                  />
                                  <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                                    <h5 className="text-white font-bold text-lg mb-1">{page.title}</h5>
                                    <p className="text-white/80 text-sm">Page {page.pageNumber} of {post.reflectionPages.length}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setJournalReflectionIndex((prev) => (prev === 0 ? post.reflectionPages.length - 1 : prev - 1))
                        }
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() =>
                          setJournalReflectionIndex((prev) => (prev + 1) % post.reflectionPages.length)
                        }
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center"
                        aria-label="Next page"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>

                      <div className="flex justify-center gap-2 mt-8">
                        {post.reflectionPages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setJournalReflectionIndex(idx)}
                            className={`h-2 rounded-full transition-all ${idx === journalReflectionIndex
                              ? "w-8 bg-primary"
                              : "w-2 bg-muted-foreground/30"
                              }`}
                            aria-label={`Go to page ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Photo Detail Dialog */}
            {selectedPhoto && (
              <Dialog open onOpenChange={(open) => !open && setSelectedPhoto(null)}>
                <DialogContent className="max-w-3xl w-[95vw] bg-white/10 backdrop-blur-xl border border-white/30">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-serif">
                      {selectedPhoto.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-6 mt-2">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-secondary">
                      <Image
                        src={selectedPhoto.image}
                        alt={selectedPhoto.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedPhoto.location}</span>
                        <span className="px-2 py-0.5 bg-primary/10 rounded-full text-primary">
                          Day {selectedPhoto.day}
                        </span>
                        {selectedPhoto.company && (
                          <span className="px-2 py-0.5 bg-primary/20 rounded-full text-primary font-medium">
                            {selectedPhoto.company}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedPhoto.description}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </section>

        {/* Certificates Section */}
        <section
          id="certificates"
          className="py-20 px-6 lg:px-8 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                  Certificates
                </h2>
                <p className="text-xl text-muted-foreground">
                  Professional achievements and training
                </p>
              </div>
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
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-medium rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                        <span>Click to view certificate</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </article>
                  </DialogTrigger>
                  <DialogContent
                    showCloseButton={false}
                    className="p-0 w-full max-w-[95vw] max-h-[92vh] sm:max-w-[900px] sm:max-h-[90vh] bg-transparent border-0 shadow-none"
                  >
                    <div className="flex items-center justify-center w-full h-full p-4">
                      <Image
                        src={cert.image}
                        alt={`Full view of ${cert.title}`}
                        width={800}
                        height={600}
                        className="w-full h-auto max-h-[85vh] sm:max-h-[80vh] object-contain rounded-lg"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-transparent to-primary/5 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind? Let's create something amazing together
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="rounded-xl bg-white/50 backdrop-blur-sm border-white/30 focus:border-primary transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-xl bg-white/50 backdrop-blur-sm border-white/30 focus:border-primary transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="rounded-xl min-h-[150px] bg-white/50 backdrop-blur-sm border-white/30 focus:border-primary transition-all"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105 active:scale-95"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
                  <h3 className="text-xl font-serif font-semibold mb-6">
                    Connect With Me
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:your.email@example.com"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all group"
                    >
                      <div className="p-3 bg-white/20 rounded-full group-hover:bg-primary/20 transition-all">
                        <Mail className="h-5 w-5" />
                      </div>
                      <span>your.email@example.com</span>
                    </a>
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-xl rounded-2xl border border-white/20">
                  <h3 className="text-lg font-semibold mb-3">Response Time</h3>
                  <p className="text-sm text-muted-foreground">
                    I typically respond to inquiries within 24-48 hours. Looking forward to
                    hearing from you!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 lg:px-8 border-t border-white/20 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Eliza Marie Abing. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      {/* Floating Contact Button */}
      <button
        onClick={() => scrollToSection("contact")}
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 active:scale-95 animate-bounce"
        aria-label="Scroll to contact"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Project Gallery Dialog */}
      {selectedProject && (
        <ProjectGalleryDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}
