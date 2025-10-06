import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with seamless checkout and inventory management.",
    image: "/modern-ecommerce-website.png",
    tags: ["Next.js", "TypeScript", "Stripe"],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A clean, minimalist portfolio showcasing creative work with smooth animations.",
    image: "/minimalist-portfolio.png",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team features.",
    image: "/task-management-dashboard.png",
    tags: ["Next.js", "Supabase", "Tailwind"],
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "Beautiful weather application with detailed forecasts and location search.",
    image: "/weather-app-interface.png",
    tags: ["React", "API Integration", "Charts"],
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "Content management system with markdown support and SEO optimization.",
    image: "/blog-platform-interface.jpg",
    tags: ["Next.js", "MDX", "CMS"],
    github: "#",
    demo: "#",
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for tracking social media metrics and engagement.",
    image: "/analytics-dashboard.png",
    tags: ["React", "D3.js", "API"],
    github: "#",
    demo: "#",
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collection of my recent work and creative explorations
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary transition-all hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button asChild size="sm" variant="outline" className="rounded-full flex-1 bg-transparent">
                    <Link href={project.github}>
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="rounded-full flex-1 bg-primary hover:bg-primary/90">
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
    </main>
  )
}
