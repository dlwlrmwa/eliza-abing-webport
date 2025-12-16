"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const projects = [
  {
    id: 1,
    title: "Amari Point of Sale & Inventory Management System",
    description:
      "A modern e-commerce solution with seamless checkout and inventory management.",
    images: [
      "/amari-pos/amari01.gif",
      "/amari-pos/amari2.png",
      "/amari-pos/amari3.png",
      "/amari-pos/amari4.png",
      "/amari-pos/amari5.png",
      "/amari-pos/amari6.png",
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
      "/minimalist-portfolio.png",
      "/minimalist-portfolio.png",
      "/minimalist-portfolio.png",
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
      "/task-management-dashboard.png",
      "/task-management-dashboard.png",
      "/task-management-dashboard.png",
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
      "/weather-app-interface.png",
      "/weather-app-interface.png",
      "/weather-app-interface.png",
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
      "/blog-platform-interface.jpg",
      "/blog-platform-interface.jpg",
      "/blog-platform-interface.jpg",
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
      "/chrome-locker.png",
      "/chrome-locker.png",
      "/chrome-locker.png",
    ],
    tags: ["React", "Extension", "Security"],
    github: "#",
    demo: "#",
  },
]

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null)

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent work and creative explorations
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="
                group bg-card rounded-2xl border border-border
                overflow-hidden hover:border-primary
                transition-all hover:shadow-lg
                cursor-pointer
              "
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Preview */}
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-contain"
                />

                {/* Overlay */}
                <div className="
                  absolute inset-0 bg-black/50
                  flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                  transition-opacity
                ">
                  <span className="text-white text-sm font-medium">
                    Click to view more
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-2">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-secondary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link href={project.github}>
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1">
                    <Link href={project.demo}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Dialog */}
      {selectedProject && (
        <ProjectGalleryDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  )
}

/* ---------------------------------- */
/* Dialog Gallery */
/* ---------------------------------- */

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
  const next = () =>
    setIndex((i) => (i + 1) % project.images.length)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="p-0 w-full max-w-[95vw] max-h-[92vh] sm:max-w-[900px] sm:max-h-[90vh]">
        <DialogHeader className="p-4">
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>

        {/* Slider */}
        <div
          className="relative aspect-video overflow-hidden"
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
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
