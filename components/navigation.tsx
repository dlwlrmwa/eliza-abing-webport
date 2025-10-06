"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 h-screen w-64 z-50 bg-background/80 backdrop-blur-md border-r border-border flex-col">
        <div className="p-8">
          <Link
            href="/"
            className="text-2xl font-serif font-semibold text-foreground hover:text-primary transition-colors"
          >
            Portfolio
          </Link>
        </div>

        <div className="flex flex-col gap-2 px-8 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-base font-medium transition-colors hover:text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90",
                pathname === item.href ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-foreground hover:text-primary-foreground hover:bg-primary/90",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="p-8 border-t border-border">
          <a
            href="/eliza-abing-cv.pdf"
            download="eliza-abing-cv.pdf"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Download CV
          </a>
        </div>
      </nav>

      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          <Link
            href="/"
            className="text-xl font-serif font-semibold text-foreground hover:text-primary transition-colors"
          >
            Portfolio
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
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/eliza-abing-cv.pdf" download="eliza-abing-cv.pdf"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors mt-2"
              >
                Download CV
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
