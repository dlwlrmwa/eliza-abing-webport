"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Facebook, Github, Linkedin, Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

const socialLinks = {
  github: "https://github.com/dlwlrmwa",
  facebook: "https://www.facebook.com/elicitaffairs",
  linkedin: "https://www.instagram.com/jieuneli/",
}

const navItems = [
  { href: "/", label: "Home", anchor: "" },
  { href: "/#about", label: "About", anchor: "about" },
  { href: "/#projects", label: "Projects", anchor: "projects", hasDropdown: true },
  { href: "/#certificates", label: "Certificates", anchor: "certificates" },
  { href: "/#contact", label: "Contact", anchor: "contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

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

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = (href: string, anchor?: string) => {
    // Close mobile menu first
    setMobileMenuOpen(false)

    // If it's the root link without anchor, navigate home
    if (href === "/" && !anchor) {
      window.location.href = "/"
      return
    }

    // If an anchor was provided, try to scroll when on the homepage
    // otherwise navigate to the homepage with the anchor so the browser loads and jumps there
    if (anchor) {
      if (pathname === "/") {
        const element = document.getElementById(anchor)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
          window.history.pushState(null, "", `/#${anchor}`)
          setActiveSection(anchor)
        }
      } else {
        window.location.href = `/#${anchor}`
      }
      return
    }

    // For any other internal hrefs, navigate directly
    if (href) {
      window.location.href = href
    }
  }

  const isActive = (item: typeof navItems[0]) => {
    if (pathname !== "/") return false
    if (item.anchor === "") return activeSection === ""
    return activeSection === item.anchor
  }

  return (
    <>
      {/* Desktop Navbar - Restored to your original UI */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg h-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full px-8">
          <Link href="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }} className="flex items-center hover:opacity-80 transition-all duration-300 hover:scale-105 flex-shrink-0">
            <Image src="/heart-logo.png" alt="Eliza Abing Logo" width={60} height={60} priority className="h-30 w-40" />
          </Link>
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={(e) => { if (item.anchor === "") { e.preventDefault(); window.location.href = "/"; } else if (item.anchor && pathname === "/") { e.preventDefault(); handleLinkClick(item.href, item.anchor); } }} className={cn("text-base font-medium transition-all duration-300 relative group", isActive(item) ? "text-primary" : "text-foreground hover:text-primary")}>
                {item.label}
                <span className={cn("absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full", isActive(item) ? "w-full" : "w-0")} />
              </Link>
            ))}
          </div>
          <a href="/eliza-abing-cv.pdf" download className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-black bg-primary rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">Download CV</a>
        </div>
      </nav>

      {/* Mobile Navbar - Restored to your UI with smooth expand animation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg transition-all duration-500">
        <div className="flex justify-between h-16 px-6 relative z-10 bg-transparent">
          <Link href="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }} className="flex items-center hover:opacity-80 transition-opacity">
            <Image src="/heart-logo.png" alt="Eliza Abing Logo" width={36} height={36} priority className="h-25 w-25" />
          </Link>
          <button className="p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Smooth Expandable Menu Container */}
        <div className={cn(
          "grid transition-all duration-500 ease-in-out bg-transparent backdrop-blur-2xl",
          mobileMenuOpen ? "grid-rows-[1fr] opacity-100 border-t border-white/20" : "grid-rows-[0fr] opacity-0 border-t-0 pointer-events-none"
        )}>
          <div className="overflow-hidden">
            <div className="flex flex-col items-stretch px-4 py-4">
              {navItems.map((item) => (
                <div key={item.href} className="w-full">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.hasDropdown) {
                        setMobileDropdownOpen(!mobileDropdownOpen);
                      } else {
                        handleLinkClick(item.href, item.anchor);
                      }
                    }}
                    className={cn(
                      "w-full text-left py-4 px-4 flex items-center justify-between transition-colors",
                      isActive(item) ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                  >
                    <span className="text-base font-medium">{item.label}</span>
                    {item.hasDropdown ? (
                      <ChevronDown size={18} className={cn("transition-transform duration-300", mobileDropdownOpen && "rotate-180")} />
                    ) : null}
                  </button>

                  {/* Divider */}
                  <div className="border-t border-primary/15" />

                  {/* Nested Dropdown for Projects */}
                  {item.hasDropdown && mobileDropdownOpen && (
                    <div className="pl-6 pr-4 py-2">
                      <Link href="/journal" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm text-muted-foreground">Cebu-Bohol Educational Tour 2025</Link>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-6 flex justify-center w-full">
                <a href="/eliza-abing-cv.pdf" download className="w-full max-w-[280px] inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary/80 rounded-full hover:shadow-lg transition-all duration-100">Download CV</a>
              </div>

              <div className="flex items-center justify-center gap-6 pt-6 mt-4">
                <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer"><Github className="h-5 w-5 text-foreground hover:text-primary transition-colors" /></Link>
                <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5 text-foreground hover:text-primary transition-colors" /></Link>
                <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-5 w-5 text-foreground hover:text-primary transition-colors" /></Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}