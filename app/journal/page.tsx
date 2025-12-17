import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { SparkleCursor } from "@/components/sparkle-cursor"

const posts = [
  {
    id: 1,
    title: "Cebu - Bohol Educational Tour 2025",
    excerpt: "Exploring local heritage, industry practices, and natural wonders: A recap of our 4-day academic journey across Cebu and Bohol.",
    date: "2025-11-19",
    endDate: "2025-11-22",
    readTime: "5 min read",
    slug: "cebu-bohol-tour",
  },
  {
    id: 2,
    title: "Building Accessible Interfaces",
    excerpt: "A comprehensive guide to creating inclusive digital experiences for all users.",
    date: "2024-03-10",
    readTime: "8 min read",
    slug: "accessible-interfaces",
  },
]

export default function JournalPage() {
  const formatDateRange = (startDate: string, endDate: string) => {
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

  return (
    <>
      <SparkleCursor />
      <main className="min-h-screen pt-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          {/* Header with Glassmorphism */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Journal
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Visual diaries and the stories behind the images.
            </p>
          </div>

          {/* Posts List with Glassmorphism */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 duration-300"
              >
                <Link href={`/journal/${post.slug}`}>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {post.endDate ? (
                          formatDateRange(post.date, post.endDate)
                        ) : (
                          new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        )}
                      </time>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-medium rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                    <span>Click for more</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/20 bg-white/5 backdrop-blur-sm mt-20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Eliza Marie Abing. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}