"use client"

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
      { src: "/amari-pos/amari1.gif", description: "Main dashboard with real-time inventory overview" },
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
      // Day 1 - WorldTech Information Solutions (15 images)
      { id: 1, day: 1, company: "WorldTech Information Solutions", title: "Grand Departure", description: "The beginning of our 4-day academic journey. Students gathered at the departure point excited to explore Cebu and Bohol's cultural and natural heritage.", location: "Cebu City", image: "/gallery/1.jpeg" },
      { id: 2, day: 1, company: "WorldTech Information Solutions", title: "Welcome Session", description: "Introduction and welcome session at WorldTech Information Solutions. Learning about their IT solutions and industry practices.", location: "Cebu City", image: "/gallery/2.jpeg" },
      { id: 3, day: 1, company: "WorldTech Information Solutions", title: "Facility Tour", description: "Guided tour through WorldTech Information Solutions' facilities, observing their development and operations.", location: "Cebu City", image: "/gallery/3.jpg" },
      { id: 4, day: 1, company: "WorldTech Information Solutions", title: "Q&A Session", description: "Interactive Q&A session with WorldTech Information Solutions representatives, discussing industry insights and career opportunities.", location: "Cebu City", image: "/gallery/4.jpg" },
      { id: 5, day: 1, company: "WorldTech Information Solutions", title: "Group Photo", description: "Memorable group photo with WorldTech Information Solutions team members and fellow students.", location: "Cebu City", image: "/gallery/5.jpg" },
      { id: 23, day: 1, company: "WorldTech Information Solutions", title: "Heritage Street Walk", description: "Walking through historic streets of Cebu, observing colonial architecture and learning about the region's rich Spanish-influenced history.", location: "Heritage District, Cebu", image: "/gallery/23.jpg" },
      { id: 101, day: 1, company: "WorldTech Information Solutions", title: "Team Lunch", description: "Enjoying lunch with the WorldTech team and fellow students, sharing experiences and building connections.", location: "Cebu City", image: "/gallery/7.jpg" },
      { id: 102, day: 1, company: "WorldTech Information Solutions", title: "Office Highlights", description: "Capturing the essence of WorldTech's modern office environment and collaborative workspace.", location: "Cebu City", image: "/gallery/12.jpg" },
      { id: 103, day: 1, company: "WorldTech Information Solutions", title: "Training Session", description: "Hands-on training session provided by WorldTech Information Solutions experts.", location: "Cebu City", image: "/gallery/13.jpg" },
      { id: 104, day: 1, company: "WorldTech Information Solutions", title: "Networking Event", description: "Networking event where students connected with professionals and industry leaders.", location: "Cebu City", image: "/gallery/14.jpg" },
      { id: 105, day: 1, company: "WorldTech Information Solutions", title: "Innovation Hub", description: "Exploring WorldTech's innovation hub and cutting-edge technology solutions.", location: "Cebu City", image: "/gallery/15.jpg" },
      { id: 106, day: 1, company: "WorldTech Information Solutions", title: "Student Testimonials", description: "Recording testimonials from students about their experience at WorldTech.", location: "Cebu City", image: "/gallery/16.jpg" },
      { id: 107, day: 1, company: "WorldTech Information Solutions", title: "Sunset Celebration", description: "Celebrating the successful first day with a sunset view over Cebu City.", location: "Cebu City", image: "/gallery/17.jpg" },
      { id: 108, day: 1, company: "WorldTech Information Solutions", title: "Evening Reflection", description: "Evening reflection and group discussion about the day's learnings.", location: "Cebu City", image: "/gallery/18.jpg" },
      { id: 109, day: 1, company: "WorldTech Information Solutions", title: "Night Market Visit", description: "Visiting local night markets and experiencing Cebu's vibrant culture.", location: "Cebu City", image: "/gallery/19.jpg" },

      // Day 2 - RivatIT Cebu & CodeChum (15 images)
      { id: 6, day: 2, company: "RivatIT Cebu", title: "RivatIT Arrival", description: "Arriving at RivatIT Cebu, ready to explore their innovative approaches and business model.", location: "Cebu City", image: "/gallery/6.jpg" },
      { id: 7, day: 2, company: "RivatIT Cebu", title: "RivatIT Presentation", description: "Attending an informative presentation about RivatIT Cebu's services and market position.", location: "Cebu City", image: "/gallery/7.jpg" },
      { id: 8, day: 2, company: "RivatIT Cebu", title: "RivatIT Workshop", description: "Participating in a hands-on workshop organized by RivatIT Cebu, learning practical skills.", location: "Cebu City", image: "/gallery/8.jpg" },
      { id: 9, day: 2, company: "CodeChum", title: "CodeChum Introduction", description: "Introduction to CodeChum's operations and their role in coding education and development.", location: "Cebu City", image: "/gallery/9.jpg" },
      { id: 10, day: 2, company: "CodeChum", title: "CodeChum Platform Demo", description: "Observing CodeChum's platform and understanding their learning management systems and features.", location: "Cebu City", image: "/gallery/10.jpg" },
      { id: 11, day: 2, company: "CodeChum", title: "CodeChum Team Discussion", description: "Engaging discussion with CodeChum's team about their challenges and innovations in coding education.", location: "Cebu City", image: "/gallery/11.jpg" },
      { id: 24, day: 2, company: "RivatIT Cebu", title: "Chocolate Hills Overview", description: "Arriving at the iconic Chocolate Hills viewpoint. Hundreds of cone-shaped hills covered in grass create a breathtaking landscape.", location: "Chocolate Hills, Bohol", image: "/gallery/24.jpg" },
      { id: 110, day: 2, company: "CodeChum", title: "Coding Challenge", description: "Participating in a coding challenge organized by CodeChum with fellow students.", location: "Cebu City", image: "/gallery/20.jpg" },
      { id: 111, day: 2, company: "RivatIT Cebu", title: "Technology Showcase", description: "RivatIT showcasing their latest technology solutions and innovations.", location: "Cebu City", image: "/gallery/21.jpg" },
      { id: 112, day: 2, company: "CodeChum", title: "Learning Resources", description: "Exploring CodeChum's comprehensive learning resources and educational materials.", location: "Cebu City", image: "/gallery/22.jpg" },
      { id: 113, day: 2, company: "RivatIT Cebu", title: "Industry Insights", description: "Gaining valuable insights into the IT industry from RivatIT professionals.", location: "Cebu City", image: "/gallery/1.jpeg" },
      { id: 114, day: 2, company: "CodeChum", title: "Student Success Stories", description: "Learning about success stories of CodeChum students in their careers.", location: "Cebu City", image: "/gallery/2.jpeg" },
      { id: 115, day: 2, company: "RivatIT Cebu", title: "Office Tour Part 2", description: "Continuing the office tour of RivatIT Cebu's facilities.", location: "Cebu City", image: "/gallery/3.jpg" },
      { id: 116, day: 2, company: "CodeChum", title: "Community Building", description: "Experiencing the strong community building initiatives at CodeChum.", location: "Cebu City", image: "/gallery/4.jpg" },
      { id: 117, day: 2, company: "RivatIT Cebu", title: "Day 2 Farewell", description: "Saying goodbye to RivatIT Cebu and CodeChum teams after an enlightening day.", location: "Cebu City", image: "/gallery/5.jpg" },

      // Day 3 - Mata Technologies (15 images)
      { id: 12, day: 3, company: "Mata Technologies", title: "Mata Welcome", description: "Warm welcome at Mata Technologies, beginning our exploration of their business operations.", location: "Bohol", image: "/gallery/12.jpg" },
      { id: 13, day: 3, company: "Mata Technologies", title: "Mata Office Tour", description: "Comprehensive office tour at Mata Technologies, seeing their modern workspace and facilities.", location: "Bohol", image: "/gallery/13.jpg" },
      { id: 14, day: 3, company: "Mata Technologies", title: "Mata Case Study", description: "Analyzing a real-world case study presented by Mata Technologies' management team.", location: "Bohol", image: "/gallery/14.jpg" },
      { id: 15, day: 3, company: "Mata Technologies", title: "Mata Networking", description: "Networking session with Mata Technologies professionals, building valuable connections.", location: "Bohol", image: "/gallery/15.jpg" },
      { id: 16, day: 3, company: "Mata Technologies", title: "Mata Closing Remarks", description: "Closing remarks and certificate presentation from Mata Technologies.", location: "Bohol", image: "/gallery/16.jpg" },
      { id: 25, day: 3, company: "Mata Technologies", title: "Loboc River Cruise", description: "A serene river cruise through mangrove forests with floating restaurants, enjoying traditional music and local entertainment.", location: "Loboc River, Bohol", image: "/gallery/25.jpg" },
      { id: 118, day: 3, company: "Mata Technologies", title: "Bohol Heritage Sites", description: "Visiting historic heritage sites in Bohol and learning about local history.", location: "Bohol", image: "/gallery/6.jpg" },
      { id: 119, day: 3, company: "Mata Technologies", title: "Beach Experience", description: "Enjoying beautiful beaches and local attractions in Bohol with the team.", location: "Bohol", image: "/gallery/7.jpg" },
      { id: 120, day: 3, company: "Mata Technologies", title: "Local Cuisine", description: "Savoring traditional Boholano cuisine and local specialties.", location: "Bohol", image: "/gallery/8.jpg" },
      { id: 121, day: 3, company: "Mata Technologies", title: "Nature Walk", description: "Taking a nature walk through Bohol's lush landscapes and attractions.", location: "Bohol", image: "/gallery/9.jpg" },
      { id: 122, day: 3, company: "Mata Technologies", title: "Cultural Performance", description: "Enjoying traditional cultural performances and entertainment.", location: "Bohol", image: "/gallery/10.jpg" },
      { id: 123, day: 3, company: "Mata Technologies", title: "Sunset View", description: "Capturing a beautiful sunset view from Bohol with colleagues.", location: "Bohol", image: "/gallery/11.jpg" },
      { id: 124, day: 3, company: "Mata Technologies", title: "Group Dinner", description: "Enjoying a group dinner with Mata Technologies team members.", location: "Bohol", image: "/gallery/20.jpg" },
      { id: 125, day: 3, company: "Mata Technologies", title: "Evening Activities", description: "Engaging in evening bonding activities with the team.", location: "Bohol", image: "/gallery/21.jpg" },
      { id: 126, day: 3, company: "Mata Technologies", title: "Reflection Session", description: "Day 3 reflection session sharing insights and experiences.", location: "Bohol", image: "/gallery/22.jpg" },

      // Day 4 - T.A.R.S.I.E.R 117 (15 images)
      { id: 17, day: 4, company: "T.A.R.S.I.E.R 117", title: "T.A.R.S.I.E.R 117 Arrival", description: "Final day visit to T.A.R.S.I.E.R 117, the last company on our educational tour.", location: "Bohol", image: "/gallery/17.jpg" },
      { id: 18, day: 4, company: "T.A.R.S.I.E.R 117", title: "T.A.R.S.I.E.R 117 Overview", description: "Overview presentation of T.A.R.S.I.E.R 117's history, mission, and future goals.", location: "Bohol", image: "/gallery/18.jpg" },
      { id: 19, day: 4, company: "T.A.R.S.I.E.R 117", title: "T.A.R.S.I.E.R 117 Interactive Session", description: "Interactive session with T.A.R.S.I.E.R 117 employees, sharing experiences and insights.", location: "Bohol", image: "/gallery/19.jpg" },
      { id: 20, day: 4, company: "T.A.R.S.I.E.R 117", title: "T.A.R.S.I.E.R 117 Demonstration", description: "Live demonstration of T.A.R.S.I.E.R 117's products and services.", location: "Bohol", image: "/gallery/20.jpg" },
      { id: 21, day: 4, company: "T.A.R.S.I.E.R 117", title: "T.A.R.S.I.E.R 117 Feedback Session", description: "Sharing feedback and reflections on our visit to T.A.R.S.I.E.R 117.", location: "Bohol", image: "/gallery/21.jpg" },
      { id: 22, day: 4, company: "T.A.R.S.I.E.R 117", title: "Farewell at T.A.R.S.I.E.R 117", description: "Bidding farewell to T.A.R.S.I.E.R 117 team, concluding our company visits.", location: "Bohol", image: "/gallery/22.jpg" },
      { id: 127, day: 4, company: "T.A.R.S.I.E.R 117", title: "Final Tour Highlights", description: "Highlighting the most memorable moments of our final company visit.", location: "Bohol", image: "/gallery/23.jpg" },
      { id: 128, day: 4, company: "T.A.R.S.I.E.R 117", title: "Team Recognition", description: "Recognition ceremony for student participation and engagement throughout the tour.", location: "Bohol", image: "/gallery/24.jpg" },
      { id: 129, day: 4, company: "T.A.R.S.I.E.R 117", title: "Certificate Distribution", description: "Receiving certificates of completion from T.A.R.S.I.E.R 117.", location: "Bohol", image: "/gallery/25.jpg" },
      { id: 130, day: 4, company: "T.A.R.S.I.E.R 117", title: "Group Photo with Team", description: "Final group photo with T.A.R.S.I.E.R 117 team members and students.", location: "Bohol", image: "/gallery/1.jpeg" },
      { id: 131, day: 4, company: "T.A.R.S.I.E.R 117", title: "Journey Reflection", description: "Reflecting on the entire 4-day educational journey and its impact.", location: "Bohol", image: "/gallery/2.jpeg" },
      { id: 132, day: 4, company: "T.A.R.S.I.E.R 117", title: "Closing Ceremony", description: "Official closing ceremony of the educational tour.", location: "Bohol", image: "/gallery/3.jpg" },
      { id: 133, day: 4, company: "T.A.R.S.I.E.R 117", title: "Student Testimonials", description: "Students sharing their most valuable takeaways from the tour.", location: "Bohol", image: "/gallery/4.jpg" },
      { id: 134, day: 4, company: "T.A.R.S.I.E.R 117", title: "Return Journey", description: "Beginning the journey back to Cebu, carrying memories and new knowledge.", location: "Bohol", image: "/gallery/5.jpg" },
      { id: 135, day: 4, company: "T.A.R.S.I.E.R 117", title: "Tour Complete", description: "Successfully completing our 4-day educational tour across Cebu and Bohol.", location: "Bohol", image: "/gallery/6.jpg" },
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
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              width: `${project.images.length * 100}%`,
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {project.images.map((img, i) => (
              <div key={i} className="relative w-full h-full shrink-0 bg-black/30 flex items-center justify-center">
                <Image
                  src={img.src}
                  alt={`${project.title} ${i + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 95vw, 900px"
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
  const [journalReflectionIndex, setJournalReflectionIndex] = useState(0)
  const reflectionTouchStartX = useRef<number | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<
    (typeof journalPosts[0]["photos"][0]) | null
  >(null)
  const [selectedReflection, setSelectedReflection] = useState<
    (typeof journalPosts[0]["reflectionPages"][0]) | null
  >(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  // Auto-scroll projects
  useEffect(() => {
    const interval = setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
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
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all duration-100 hover:scale-110 active:scale-95"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/elicitaffairs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all duration-100 hover:scale-110 active:scale-95"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/jieuneli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all duration-100 hover:scale-110 active:scale-95"
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
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                About Me
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Passionate about creating meaningful digital experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                <h3 className="text-xl font-serif font-semibold mb-6">Skills & Expertise</h3>
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
                <h3 className="text-xl font-serif font-semibold mb-6">Experience</h3>
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

        {/* Projects Grid Section */}
        <section
          id="projects"
          className="py-20 px-6 lg:px-8 relative overflow-hidden scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Featured Projects
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore my latest work and creative solutions
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 duration-500 cursor-pointer flex flex-col h-full"
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
                        View more of this project
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-serif font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 flex-1 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium"
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

          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        </section>

        {/* Journal Section */}
        <section
          id="journal"
          className="py-20 px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Latest Journal
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Visual stories and experiences
              </p>
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
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                    {post.title}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
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

                 {(post.photos && post.photos.length > 0) || (post.reflectionPages && post.reflectionPages.length > 0) ? (
                   <div className="grid lg:grid-cols-2 gap-8">
                     {/* Photo Gallery - Left */}
                     {post.photos && post.photos.length > 0 && (
                       <div className="space-y-8">
                         <h4 className="text-2xl font-serif font-semibold text-center">Photo Gallery</h4>
                         
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {[1, 2, 3, 4].map((day) => {
                             const dayPhotos = post.photos.filter((p) => p.day === day)
                             if (dayPhotos.length === 0) return null
                             
                             const companies = Array.from(new Set(dayPhotos.map(p => p.company).filter(Boolean)))
                             const coverImage = dayPhotos[0]?.image
         
                             return (
                               <div
                                 key={day}
                                 onClick={() => setSelectedDay(day)}
                                 className="group cursor-pointer flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
                               >
                                 <div className="relative aspect-video w-full overflow-hidden bg-black/20">
                                   {coverImage && (
                                     <Image
                                       src={coverImage}
                                       alt={`Day ${day}`}
                                       fill
                                       className="object-cover transition-transform duration-500 group-hover:scale-110"
                                     />
                                   )}
                                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                   <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-xs font-medium text-white">
                                     {dayPhotos.length} Photos
                                   </div>
                                 </div>
         
                                 <div className="p-4 flex-1 flex flex-col">
                                   <h5 className="text-lg font-bold font-serif mb-2 group-hover:text-primary transition-colors text-center">Day {day}</h5>
                                   <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1 text-center">
                                     {companies.length > 0 
                                       ? `Visited ${companies.join(", ")}.`
                                       : "Explored the city and captured memorable moments."}
                                   </p>
                                   <div className="flex justify-center items-center text-xs text-primary font-medium">
                                     <span>View Gallery</span>
                                     <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                   </div>
                                 </div>
                               </div>
                             )
                           })}
                         </div>
                       </div>
                     )}

                     {/* Reflection Paper - Right */}
                     {post.reflectionPages && post.reflectionPages.length > 0 && (
                       <div className="space-y-8 flex flex-col items-center">
                         <h4 className="text-2xl font-serif font-semibold text-center">Reflection Paper</h4>
                         <div className="relative w-full max-w-xl mx-auto">
                           <div className="overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/20 p-4 md:p-6 mx-auto">
                             <div
                               className="relative h-[400px] md:h-[450px]"
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
                             <div
                               className="absolute inset-0 flex items-center justify-center"
                               style={{
                                 left: "50%",
                                 transform: "translateX(-50%)",
                                 transformStyle: "preserve-3d",
                                 transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                               }}
                             >
                               {post.reflectionPages.map((page, idx) => {
                                 const len = post.reflectionPages.length
                                 let distance = idx - journalReflectionIndex

                                 // Circular logic
                                 if (distance > len / 2) distance -= len
                                 if (distance < -len / 2) distance += len

                                 const absDistance = Math.abs(distance)
                                 const isActive = distance === 0
                                 const isLeft = distance < 0

                                 // 3D calculations
                                 const translateX = distance * 80
                                 const translateZ = isActive ? 0 : -Math.abs(distance) * 60
                                 const scale = isActive ? 1 : Math.max(0.6, 1 - absDistance * 0.2)
                                 const rotateY = isActive ? 0 : (isLeft ? 30 : -30) * Math.min(1, absDistance * 0.6)
                                 const opacity = isActive ? 1 : Math.max(0.3, 1 - absDistance * 0.25)
                                 const zIndex = len - absDistance

                                 return (
                                   <div
                                     key={page.id}
                                     onClick={() => {
                                       if (isActive) {
                                         setSelectedReflection(page)
                                       } else {
                                         setJournalReflectionIndex(idx)
                                       }
                                     }}
                                     className="absolute cursor-pointer transition-all duration-900 ease-out"
                                     style={{
                                       transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
                                       opacity,
                                       zIndex,
                                       transformStyle: "preserve-3d",
                                       width: "3w00px",
                                       height: "450px",
                                       marginLeft: "70px",
                                       pointerEvents: absDistance > 2 ? "none" : "auto",
                                     }}
                                   >
                                     <div className="relative w-full h-full rounded-lg overflow-hidden bg-white/10 backdrop-blur-xl border-2 border-white/30 shadow-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-primary/30 group">
                                       <Image
                                         src={page.image}
                                         alt={page.title}
                                         fill
                                         className="object-cover"
                                       />
                                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                       <div className="absolute bottom-0 left-0 right-0 p-4">
                                         <h5 className="text-white font-bold text-base mb-1 drop-shadow-lg line-clamp-2">{page.title}</h5>
                                         <p className="text-white/80 text-xs mb-2">Page {page.pageNumber}</p>
                                         <p className="text-primary text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">Click to expand</p>
                                       </div>
                                     </div>
                                   </div>
                                 )
                               })}
                             </div>
                             </div>
                           </div>

                           <button
                             onClick={() =>
                               setJournalReflectionIndex((prev) => (prev === 0 ? post.reflectionPages.length - 1 : prev - 1))
                             }
                             className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2 rounded-full shadow-xl hover:bg-white/90 opacity-60 hover:opacity-100 transition-opacity duration-200 hidden md:flex items-center justify-center"
                             aria-label="Previous page"
                           >
                             <ChevronLeft className="h-5 w-5" />
                           </button>
                           <button
                             onClick={() =>
                               setJournalReflectionIndex((prev) => (prev + 1) % post.reflectionPages.length)
                             }
                             className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2 rounded-full shadow-xl hover:bg-white/90 opacity-60 hover:opacity-100 transition-opacity duration-200 hidden md:flex items-center justify-center"
                             aria-label="Next page"
                           >
                             <ChevronRight className="h-5 w-5" />
                           </button>

                           <div className="flex justify-center gap-2 mt-6">
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
                 ) : null}

              {/* Day Gallery Dialog */}
                {selectedDay && (
                  <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
                    <DialogContent className="w-[95vw] h-[90vh] sm:w-[96vw] sm:h-[93vh] max-w-[1600px] bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col p-0 overflow-hidden">
                      <DialogHeader className="px-4 sm:px-8 py-4 sm:py-6 bg-white/5 backdrop-blur-sm border-b border-white/10 shrink-0">
                        <DialogTitle className="text-2xl sm:text-3xl font-serif">Day {selectedDay} Gallery</DialogTitle>
                      </DialogHeader>
                      
                      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                        <div className="flex flex-wrap gap-3 sm:gap-6 justify-center items-start">
                          {post.photos
                            .filter((p) => p.day === selectedDay)
                            .map((photo) => (
                              <button
                                key={photo.id}
                                onClick={() => setSelectedPhoto(photo)}
                                className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-105 flex-shrink-0"
                                style={{ width: "calc(50% - 6px)", aspectRatio: "3/4" }}
                              >
                                <Image
                                  src={photo.image}
                                  alt={photo.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-125"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />
                                <div className="absolute inset-0 flex items-end justify-start p-2 sm:p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                  <div className="bg-gradient-to-t from-black/95 via-black/50 to-transparent absolute inset-0" />
                                  <div className="relative z-10 w-full px-1">
                                    <p className="text-white text-[10px] sm:text-xs font-medium line-clamp-2">{photo.title}</p>
                                    <p className="text-white/70 text-[8px] sm:text-[10px] mt-0.5 line-clamp-1">{photo.company}</p>
                                  </div>
                                </div>
                              </button>
                            ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Full-Size Photo Modal */}
                {selectedPhoto && (
                  <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
                    <DialogTitle className="sr-only">{selectedPhoto.title}</DialogTitle>
                    <DialogContent
                      showCloseButton={false}
                      className="p-0 w-full max-w-[95vw] max-h-[92vh] sm:max-w-[900px] sm:max-h-[90vh] bg-transparent border-0 shadow-none"
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4">
                        <div className="relative w-full max-w-4xl max-h-[80vh] bg-black/30 rounded-lg overflow-hidden backdrop-blur-sm">
                          <Image
                            src={selectedPhoto.image}
                            alt={selectedPhoto.title}
                            width={1200}
                            height={800}
                            className="w-full h-auto max-h-[75vh] object-contain"
                          />
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl rounded-lg p-4 w-full max-w-4xl border border-white/20">
                          <h3 className="text-xl font-serif font-bold mb-2">{selectedPhoto.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{selectedPhoto.company}</p>
                          <p className="text-sm text-foreground">{selectedPhoto.description}</p>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {selectedPhoto.location}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
            
                {/* Reflection Paper Carousel */}
              </div>
            ))}


          </div>
        </section>

        {/* Certificates Section */}
        <section
          id="certificates"
          className="py-20 px-6 lg:px-8 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Certificates
              </h2>
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
                    <DialogTitle className="sr-only">
                      {cert.title}
                    </DialogTitle>
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
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Get in Touch
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
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
