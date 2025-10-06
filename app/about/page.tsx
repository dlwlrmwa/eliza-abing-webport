import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate about creating meaningful digital experiences
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
            <Image src="/professional-portrait.png" alt="Profile photo" fill className="object-cover" />
          </div>

          <div>
            <h2 className="text-3xl font-serif font-semibold mb-6 text-foreground">Hello, I'm Eliza Marie Abing</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a creative professional with a passion for crafting beautiful, functional digital experiences. With
                a background in design and development, I bring ideas to life through thoughtful execution and attention
                to detail.
              </p>
              <p>
                My approach combines aesthetic sensibility with technical expertise, ensuring that every project not
                only looks great but also performs flawlessly across all devices and platforms.
              </p>
              <p>
                When I'm not working, you can find me exploring new design trends, contributing to open-source projects,
                or enjoying a good cup of coffee while sketching new ideas.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href="/eliza-abing-cv.pdf" download="eliza-abing-cv.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>
        </div>

        {/* Skills & Highlights */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-card rounded-2xl border border-border">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-foreground">Skills & Expertise</h3>
            <div className="space-y-3">
              {[
                "UI/UX Design",
                "Web Development",
                "Responsive Design",
                "Brand Identity",
                "Typography",
                "Prototyping",
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-card rounded-2xl border border-border">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-foreground">Experience Highlights</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Senior Designer</h4>
                <p className="text-sm text-muted-foreground mb-2">Company Name • 2020 - Present</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Leading design initiatives and creating user-centered solutions for diverse clients.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Creative Developer</h4>
                <p className="text-sm text-muted-foreground mb-2">Agency Name • 2018 - 2020</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Developed interactive web experiences and collaborated with cross-functional teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
