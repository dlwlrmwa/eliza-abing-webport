import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

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
    <main className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Journal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Visual diaries and the stories behind the images.
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group p-8 bg-card rounded-2xl border border-border hover:border-primary transition-all hover:shadow-lg"
            >
              <Link href={`/journal/${post.slug}`}>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-1">
                  <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>

                <span className="text-primary font-medium group-hover:underline">Click for more →</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border mt-19">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Eliza Marie Abing. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}