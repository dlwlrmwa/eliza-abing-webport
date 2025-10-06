import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

const posts = [
  {
    id: 1,
    title: "The Art of Minimalist Design",
    excerpt: "Exploring how less can be more in modern web design and why simplicity matters.",
    date: "2024-03-15",
    readTime: "5 min read",
    slug: "minimalist-design",
  },
  {
    id: 2,
    title: "Building Accessible Interfaces",
    excerpt: "A comprehensive guide to creating inclusive digital experiences for all users.",
    date: "2024-03-10",
    readTime: "8 min read",
    slug: "accessible-interfaces",
  },
  {
    id: 3,
    title: "My Design Process",
    excerpt: "A behind-the-scenes look at how I approach projects from concept to completion.",
    date: "2024-03-05",
    readTime: "6 min read",
    slug: "design-process",
  },
  {
    id: 4,
    title: "Typography in Web Design",
    excerpt: "Understanding the impact of typography choices on user experience and readability.",
    date: "2024-02-28",
    readTime: "7 min read",
    slug: "typography-web-design",
  },
  {
    id: 5,
    title: "Color Theory for Developers",
    excerpt: "Practical tips for choosing and implementing color schemes in your projects.",
    date: "2024-02-20",
    readTime: "5 min read",
    slug: "color-theory",
  },
  {
    id: 6,
    title: "Responsive Design Best Practices",
    excerpt: "Essential techniques for creating websites that work beautifully on any device.",
    date: "2024-02-15",
    readTime: "9 min read",
    slug: "responsive-design",
  },
]

export default function JournalPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Journal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Thoughts, insights, and reflections on design and development
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group p-8 bg-card rounded-2xl border border-border hover:border-primary transition-all hover:shadow-lg"
            >
              <Link href={`/journal/${post.slug}`}>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
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

                <span className="text-primary font-medium group-hover:underline">Read more →</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
