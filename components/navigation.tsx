"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Facebook, Github, Linkedin, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

const socialLinks = {
  github: "https://github.com/dlwlrmwa",
  facebook: "https://www.facebook.com/elicitaffairs",
  linkedin: "https://www.instagram.com/jieuneli/",
}

const navItems = [
  { href: "/", label: "Home", anchor: "" },
  { href: "/#about", label: "About", anchor: "about" },
  { href: "/#projects", label: "Projects", anchor: "projects" },
  { href: "/#journal", label: "Journal", anchor: "journal" },
  { href: "/#certificates", label: "Certificates", anchor: "certificates" },
  { href: "/#contact", label: "Contact", anchor: "contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "journal", "certificates", "contact"]
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          return
        }
      }
      setActiveSection("")
    }

    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setActiveSection(hash)
        const element = document.getElementById(hash)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }, 100)
        }
      } else {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("hashchange", handleHashChange)
    handleScroll() // Initial check
    handleHashChange() // Initial hash check

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const handleLinkClick = (href: string, anchor?: string) => {
    setMobileMenuOpen(false)

    if (anchor && pathname === "/") {
      // Smooth scroll to section on homepage
      const element = document.getElementById(anchor)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
        // Update URL without jumping
        window.history.pushState(null, "", `/#${anchor}`)
        setActiveSection(anchor)
      }
    }
  }

  const isActive = (item: typeof navItems[0]) => {
    if (pathname !== "/") return false
    if (item.anchor === "") return activeSection === ""
    return activeSection === item.anchor
  }

  return (
    <>
      {/* Desktop Navbar - Glassmorphism */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg h-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full px-8">
          <Link
            href="/"
            onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" })
                window.history.pushState(null, "", "/")
                setActiveSection("")
              }
            }}
            className="text-2xl font-serif font-semibold text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
          >
            Eliza Marie Abing
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (item.anchor && pathname === "/") {
                      e.preventDefault()
                      handleLinkClick(item.href, item.anchor)
                    }
                  }}
                  className={cn(
                    "text-base font-medium transition-all duration-300 relative group",
                    active ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                      active ? "w-full" : "w-0"
                    )}
                  />
                </Link>
              )
            })}

            <a
              href="/eliza-abing-cv.pdf"
              download="eliza-abing-cv.pdf"
              className="ml-4 inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary/80 rounded-full hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              Download CV
            </a>

            <div className="flex items-center gap-4 ml-4">
              <Link
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <Github className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <Facebook className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <Linkedin className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Glassmorphism */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="flex items-center justify-between h-16 px-6">
          <Link
            href="/"
            onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" })
                window.history.pushState(null, "", "/")
                setActiveSection("")
              }
            }}
            className="text-xl font-serif font-semibold text-foreground hover:text-primary transition-colors"
          >
            Eliza Marie Abing
          </Link>
          <button
            className="p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="py-4 px-6 border-t border-white/20 bg-white/5 backdrop-blur-xl">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const active = isActive(item)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => handleLinkClick(item.href, item.anchor)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary py-2 px-4 rounded-lg hover:bg-white/10",
                      active ? "text-primary bg-white/10" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}

              <a
                href="/eliza-abing-cv.pdf"
                download="eliza-abing-cv.pdf"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary/80 rounded-full hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download CV
              </a>

              <div className="flex items-center justify-center gap-6 pt-4">
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="GitHub Profile"
                >
                  <Github className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                </Link>
                <Link
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Facebook Profile"
                >
                  <Facebook className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                </Link>
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
