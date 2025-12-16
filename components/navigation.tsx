"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Facebook, Github, Linkedin, Menu, X } from "lucide-react"
import { useState } from "react"

// Define social media links once for consistency
const socialLinks = {
  github: "https://github.com/dlwlrmwa",
  facebook: "https://www.facebook.com/elicitaffairs",
  linkedin: "https://www.instagram.com/jieuneli/", // Assuming this is LinkedIn/Instagram link
}

const navItems = [
  { href: "/", label: "Home" },
  // CORRECT: Targets the section ID on the homepage
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Use state to track the active hash, defaulting to ''
  const [activeHash, setActiveHash] = useState<string>('')

  // Effect to update activeHash when the component mounts or URL changes
  // NOTE: This runs client-side and is necessary to read window.location.hash
  // The state allows the component to re-render and update the active link style.
  useState(() => {
    if (typeof window !== 'undefined') {
      const handleHashChange = () => {
        // Remove the '#' for clean comparison
        setActiveHash(window.location.hash.slice(1) || '');
      };

      handleHashChange(); // Set initial hash

      window.addEventListener('hashchange', handleHashChange);

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  });


  // This function is no longer needed, we will do the logic inline/with state.
  // const isActive = (href: string) => { ... } 

  // Function to handle mobile link click and close menu
  const handleLinkClick = (href: string) => {
    // Only close the menu if the link is a non-external, valid route
    if (href) {
      setMobileMenuOpen(false)
    }
  }


  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full px-1">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-serif font-semibold text-foreground hover:text-primary transition-colors"
          >
            Eliza Marie Abing
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-7">
            {navItems.map((item) => {

              let active = false;

              // 1. Check for the Home link (href='/')
              if (item.href === "/") {
                // Home is active ONLY if on the base path AND there is no hash (not scrolled to a section)
                active = pathname === "/" && activeHash === '';
              }
              // 2. Check for the About link (href='/#about')
              else if (item.href === "/#about") {
                // About is active ONLY if on the base path AND the hash is 'about'
                active = pathname === "/" && activeHash === 'about';
              }
              // 3. Standard check for other pages
              else {
                active = pathname === item.href;
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-medium hover:text-primary transition-colors",
                    active ? "text-primary" : "text-foreground" // Use the 'active' variable here
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* CV Button */}
            <a
              href="/eliza-abing-cv.pdf"
              download="eliza-abing-cv.pdf"
              className="ml-4 inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              Download CV
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-4 ml-4">
              <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <Github className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Profile">
                <Facebook className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <Linkedin className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          <Link
            href="/"
            className="text-xl font-serif font-semibold text-foreground hover:text-primary transition-colors"
          >
            Eliza Marie Abing
          </Link>
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="py-4 px-6 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {

                let active = false;

                // 1. Check for the Home link (href='/')
                if (item.href === "/") {
                  active = pathname === "/" && activeHash === '';
                }
                // 2. Check for the About link (href='/#about')
                else if (item.href === "/#about") {
                  active = pathname === "/" && activeHash === 'about';
                }
                // 3. Standard check for other pages
                else {
                  active = pathname === item.href;
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      active ? "text-primary" : "text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}

              {/* Mobile CV button */}
              <a
                href="/eliza-abing-cv.pdf"
                download="eliza-abing-cv.pdf"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors mt-2"
              >
                Download CV
              </a>

              {/* Mobile Social Icons - Used defined socialLinks for consistency */}
              <div className="flex items-center justify-center gap-6 pt-4">
                <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} aria-label="GitHub Profile">
                  <Github className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                </Link>
                <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} aria-label="Facebook Profile">
                  <Facebook className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                </Link>
                <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} aria-label="LinkedIn Profile">
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