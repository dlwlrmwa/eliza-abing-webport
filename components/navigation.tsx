"use client"

import Link from "next/link"
import Image from "next/image"
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
  { href: "/#certificates", label: "Certificates", anchor: "certificates" },
  { href: "/#contact", label: "Contact", anchor: "contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  // NEW: Force scroll to top on hard refresh/initial load
  useEffect(() => {
    // This removes the hash from the URL and scrolls to the top 
    // immediately when the component mounts for the first time
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "certificates", "contact"]
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

    // Handle hash changes (only when clicking nav items, not on refresh)
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
    handleScroll() 
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const handleLinkClick = (href: string, anchor?: string) => {
    setMobileMenuOpen(false)

    // Force refresh if Home is clicked
    if (href === "/" && !anchor) {
      window.location.href = "/"
      return
    }

    if (anchor && pathname === "/") {
      const element = document.getElementById(anchor)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
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
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg h-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full px-8">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = "/" // Full Refresh
            }}
            className="flex items-center hover:opacity-80 transition-opacity duration-300 hover:scale-105 flex-shrink-0"
          >
            <Image
              src="/heart-logo.png"
              alt="Eliza Abing Logo"
              width={60}
              height={60}
              priority
              className="h-30 w-35"
            />
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (item.anchor === "") {
                      e.preventDefault()
                      window.location.href = "/" // Full Refresh
                    } else if (item.anchor && pathname === "/") {
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
          </div>

          <div className="flex items-center gap-7">
            <a
              href="/eliza-abing-cv.pdf"
              download="eliza-abing-cv.pdf"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary/80 rounded-full hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              Download CV
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="flex items-center justify-between h-16 px-6">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = "/" // Full Refresh
            }}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/heart-logo.png"
              alt="Eliza Abing Logo"
              width={36}
              height={36}
              priority
              className="h-20 w-20"
            />
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
            <div className="flex flex-col gap-4 items-center">
              {navItems.map((item) => {
                const active = isActive(item)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (item.anchor === "") {
                        e.preventDefault()
                        window.location.href = "/" // Full Refresh
                      } else {
                        handleLinkClick(item.href, item.anchor)
                      }
                    }}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary py-2 px-4 rounded-lg hover:bg-white/10 text-center",
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