"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, Clock, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react"
import { SparkleCursor } from "@/components/sparkle-cursor"
import { SnowflakeEffect } from "@/components/snowflake-effect"

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
      // Day 1 - WorldTech Information Solutions
      { id: 1, day: 1, company: "WorldTech Information Solutions", title: "Grand Departure", description: "The beginning of our 4-day academic journey.", location: "Cebu City", image: "/gallery/1.jpeg" },
      { id: 2, day: 1, company: "WorldTech Information Solutions", title: "Welcome Session", description: "Introduction and welcome session at WorldTech Information Solutions.", location: "Cebu City", image: "/gallery/2.jpeg" },
      { id: 3, day: 1, company: "WorldTech Information Solutions", title: "Facility Tour", description: "Guided tour through WorldTech Information Solutions' facilities.", location: "Cebu City", image: "/gallery/3.jpg" },
      { id: 4, day: 1, company: "WorldTech Information Solutions", title: "Q&A Session", description: "Interactive Q&A session with WorldTech representatives.", location: "Cebu City", image: "/gallery/4.jpg" },
      { id: 5, day: 1, company: "WorldTech Information Solutions", title: "Group Photo", description: "Memorable group photo with WorldTech team.", location: "Cebu City", image: "/gallery/5.jpg" },
      { id: 23, day: 1, company: "WorldTech Information Solutions", title: "Heritage Street Walk", description: "Walking through historic streets of Cebu.", location: "Heritage District, Cebu", image: "/gallery/23.jpg" },
      { id: 101, day: 1, company: "WorldTech Information Solutions", title: "Team Lunch", description: "Enjoying lunch with the WorldTech team.", location: "Cebu City", image: "/gallery/7.jpg" },
      { id: 102, day: 1, company: "WorldTech Information Solutions", title: "Office Highlights", description: "WorldTech's modern office environment.", location: "Cebu City", image: "/gallery/12.jpg" },
      { id: 103, day: 1, company: "WorldTech Information Solutions", title: "Training Session", description: "Hands-on training session.", location: "Cebu City", image: "/gallery/13.jpg" },
      { id: 104, day: 1, company: "WorldTech Information Solutions", title: "Networking Event", description: "Connecting with professionals.", location: "Cebu City", image: "/gallery/14.jpg" },
      { id: 105, day: 1, company: "WorldTech Information Solutions", title: "Innovation Hub", description: "Exploring cutting-edge technology solutions.", location: "Cebu City", image: "/gallery/15.jpg" },
      { id: 106, day: 1, company: "WorldTech Information Solutions", title: "Student Testimonials", description: "Recording testimonials about the experience.", location: "Cebu City", image: "/gallery/16.jpg" },
      { id: 107, day: 1, company: "WorldTech Information Solutions", title: "Sunset Celebration", description: "Celebrating the successful first day.", location: "Cebu City", image: "/gallery/17.jpg" },
      { id: 108, day: 1, company: "WorldTech Information Solutions", title: "Evening Reflection", description: "Sharing the day's learnings.", location: "Cebu City", image: "/gallery/18.jpg" },
      { id: 109, day: 1, company: "WorldTech Information Solutions", title: "Night Market Visit", description: "Experiencing Cebu's vibrant night culture.", location: "Cebu City", image: "/gallery/19.jpg" },

      // Day 2 - RivanIT Cebu & CodeChum
      { id: 6, day: 2, company: "RivanIT Cebu", title: "RivanIT Arrival", description: "Ready to explore innovative IT approaches.", location: "Cebu City", image: "/gallery/6.jpg" },
      { id: 7, day: 2, company: "RivanIT Cebu", title: "RivanIT Presentation", description: "In-depth presentation of services.", location: "Cebu City", image: "/gallery/7.jpg" },
      { id: 8, day: 2, company: "RivanIT Cebu", title: "RivanIT Workshop", description: "Hands-on workshop learning practical skills.", location: "Cebu City", image: "/gallery/8.jpg" },
      { id: 9, day: 2, company: "CodeChum", title: "CodeChum Introduction", description: "Exploring coding education platforms.", location: "Cebu City", image: "/gallery/9.jpg" },
      { id: 10, day: 2, company: "CodeChum", title: "CodeChum Platform Demo", description: "Understanding LMS features.", location: "Cebu City", image: "/gallery/10.jpg" },
      { id: 11, day: 2, company: "CodeChum", title: "CodeChum Team Discussion", description: "Discussion on innovation in coding.", location: "Cebu City", image: "/gallery/11.jpg" },
      { id: 24, day: 2, company: "RivanIT Cebu", title: "Chocolate Hills Overview", description: "Iconic cone-shaped hills of Bohol.", location: "Chocolate Hills, Bohol", image: "/gallery/24.jpg" },
      { id: 110, day: 2, company: "CodeChum", title: "Coding Challenge", description: "Friendly competition between students.", location: "Cebu City", image: "/gallery/20.jpg" },
      { id: 111, day: 2, company: "RivanIT Cebu", title: "Technology Showcase", description: "RivanIT showcasing their latest solutions.", location: "Cebu City", image: "/gallery/21.jpg" },
      { id: 112, day: 2, company: "CodeChum", title: "Learning Resources", description: "Exploring educational materials.", location: "Cebu City", image: "/gallery/22.jpg" },
      { id: 113, day: 2, company: "RivanIT Cebu", title: "Industry Insights", description: "Professional advice for IT students.", location: "Cebu City", image: "/gallery/1.jpeg" },
      { id: 114, day: 2, company: "CodeChum", title: "Student Success Stories", description: "Career growth through CodeChum.", location: "Cebu City", image: "/gallery/2.jpeg" },
      { id: 115, day: 2, company: "RivanIT Cebu", title: "Office Tour Part 2", description: "Further exploration of facilities.", location: "Cebu City", image: "/gallery/3.jpg" },
      { id: 116, day: 2, company: "CodeChum", title: "Community Building", description: "The social side of coding.", location: "Cebu City", image: "/gallery/4.jpg" },
      { id: 117, day: 2, company: "RivanIT Cebu", title: "Day 2 Farewell", description: "Ending a productive day.", location: "Cebu City", image: "/gallery/5.jpg" },

      // Day 3 - Mata Technologies
      { id: 12, day: 3, company: "Mata Technologies", title: "Mata Welcome", description: "Warm reception in Bohol.", location: "Bohol", image: "/gallery/12.jpg" },
      { id: 13, day: 3, company: "Mata Technologies", title: "Mata Office Tour", description: "Tour of modern Bohol office space.", location: "Bohol", image: "/gallery/13.jpg" },
      { id: 14, day: 3, company: "Mata Technologies", title: "Mata Case Study", description: "Business operations analysis.", location: "Bohol", image: "/gallery/14.jpg" },
      { id: 15, day: 3, company: "Mata Technologies", title: "Mata Networking", description: "Connecting with Boholano pros.", location: "Bohol", image: "/gallery/15.jpg" },
      { id: 16, day: 3, company: "Mata Technologies", title: "Mata Closing Remarks", description: "Tour completion certificates.", location: "Bohol", image: "/gallery/16.jpg" },
      { id: 25, day: 3, company: "Mata Technologies", title: "Loboc River Cruise", description: "A serene river cruise experience.", location: "Loboc River, Bohol", image: "/gallery/25.jpg" },
      { id: 118, day: 3, company: "Mata Technologies", title: "Bohol Heritage Sites", description: "Historic landmarks exploration.", location: "Bohol", image: "/gallery/6.jpg" },
      { id: 119, day: 3, company: "Mata Technologies", title: "Beach Experience", description: "Famous Bohol white sand beaches.", location: "Bohol", image: "/gallery/7.jpg" },
      { id: 120, day: 3, company: "Mata Technologies", title: "Local Cuisine", description: "Savoring traditional flavors.", location: "Bohol", image: "/gallery/8.jpg" },
      { id: 121, day: 3, company: "Mata Technologies", title: "Nature Walk", description: "Lush tropical landscape tour.", location: "Bohol", image: "/gallery/9.jpg" },
      { id: 122, day: 3, company: "Mata Technologies", title: "Cultural Performance", description: "Traditional dance and music.", location: "Bohol", image: "/gallery/10.jpg" },
      { id: 123, day: 3, company: "Mata Technologies", title: "Sunset View", description: "Gold hour in Panglao.", location: "Bohol", image: "/gallery/11.jpg" },
      { id: 124, day: 3, company: "Mata Technologies", title: "Group Dinner", description: "Team building dinner.", location: "Bohol", image: "/gallery/20.jpg" },
      { id: 125, day: 3, company: "Mata Technologies", title: "Evening Activities", description: "Bonding after tour hours.", location: "Bohol", image: "/gallery/21.jpg" },
      { id: 126, day: 3, company: "Mata Technologies", title: "Reflection Session", description: "Sharing Day 3 insights.", location: "Bohol", image: "/gallery/22.jpg" },

      // Day 4 - T.A.R.S.I.E.R 117
      { id: 17, day: 4, company: "T.A.R.S.I.E.R 117", title: "T.A.R.S.I.E.R 117 Arrival", description: "Final company visit.", location: "Bohol", image: "/gallery/17.jpg" },
      { id: 18, day: 4, company: "T.A.R.S.I.E.R 117", title: "T.A.R.S.I.E.R 117 Overview", description: "Mission and future goals.", location: "Bohol", image: "/gallery/18.jpg" },
      { id: 19, day: 4, company: "T.A.R.S.I.E.R 117", title: "T.A.R.S.I.E.R 117 Interactive Session", description: "Sharing student experiences.", location: "Bohol", image: "/gallery/19.jpg" },
      { id: 20, day: 4, company: "T.A.R.S.I.E.R 117", title: "T.A.R.S.I.E.R 117 Demonstration", description: "Product and service demo.", location: "Bohol", image: "/gallery/20.jpg" },
      { id: 21, day: 4, company: "T.A.R.S.I.E.R 117", title: "T.A.R.S.I.E.R 117 Feedback Session", description: "Tour wrap-up and feedback.", location: "Bohol", image: "/gallery/21.jpg" },
      { id: 22, day: 4, company: "T.A.R.S.I.E.R 117", title: "Farewell at T.A.R.S.I.E.R 117", description: "Final goodbye to hosts.", location: "Bohol", image: "/gallery/22.jpg" },
      { id: 127, day: 4, company: "T.A.R.S.I.E.R 117", title: "Final Tour Highlights", description: "Looking back at the journey.", location: "Bohol", image: "/gallery/23.jpg" },
      { id: 128, day: 4, company: "T.A.R.S.I.E.R 117", title: "Team Recognition", description: "Awards for student participation.", location: "Bohol", image: "/gallery/24.jpg" },
      { id: 129, day: 4, company: "T.A.R.S.I.E.R 117", title: "Certificate Distribution", description: "Official tour completion certificates.", location: "Bohol", image: "/gallery/25.jpg" },
      { id: 130, day: 4, company: "T.A.R.S.I.E.R 117", title: "Group Photo with Team", description: "Closing group picture.", location: "Bohol", image: "/gallery/1.jpeg" },
      { id: 131, day: 4, company: "T.A.R.S.I.E.R 117", title: "Journey Reflection", description: "What we learned overall.", location: "Bohol", image: "/gallery/2.jpeg" },
      { id: 132, day: 4, company: "T.A.R.S.I.E.R 117", title: "Closing Ceremony", description: "Tour concludes officially.", location: "Bohol", image: "/gallery/3.jpg" },
      { id: 133, day: 4, company: "T.A.R.S.I.E.R 117", title: "Student Testimonials", description: "Student's final words.", location: "Bohol", image: "/gallery/4.jpg" },
      { id: 134, day: 4, company: "T.A.R.S.I.E.R 117", title: "Return Journey", description: "Heading back to Cebu.", location: "Bohol", image: "/gallery/5.jpg" },
      { id: 135, day: 4, company: "T.A.R.S.I.E.R 117", title: "Tour Complete", description: "Successfully finished!", location: "Bohol", image: "/gallery/6.jpg" },
    ],
    reflectionPages: [
      { id: 1, title: "Introduction & Departure", image: "/journal/journal1.png", pageNumber: 1 },
      { id: 2, title: "Cultural Immersion", image: "/journal/journal1.png", pageNumber: 2 },
      { id: 3, title: "Natural Wonders", image: "/journal/journal1.png", pageNumber: 3 },
      { id: 4, title: "Community Engagement", image: "/journal/journal1.png", pageNumber: 4 },
      { id: 5, title: "Personal Growth", image: "/journal/journal1.png", pageNumber: 5 },
      { id: 6, title: "Conclusion & Takeaways", image: "/journal/journal1.png", pageNumber: 6 },
    ],
  },
]

function formatDateRange(startDate: string, endDate?: string) {
  if (!endDate) {
    return new Date(startDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }
  const start = new Date(startDate)
  const end = new Date(endDate)
  const startMonth = start.toLocaleDateString("en-US", { month: "long" })
  const startDay = start.getDate()
  const endMonth = end.toLocaleDateString("en-US", { month: "long" })
  const endDay = end.getDate()
  const year = end.getFullYear()
  if (startMonth === endMonth) return `${startMonth} ${startDay} - ${endDay}, ${year}`
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
}

export default function JournalPage() {
  const [journalReflectionIndex, setJournalReflectionIndex] = useState(0)
  const reflectionTouchStartX = useRef<number | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<typeof journalPosts[0]["photos"][0] | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedReflection, setSelectedReflection] = useState<typeof journalPosts[0]["reflectionPages"][0] | null>(null)

  return (
    <>
      <SparkleCursor />
      <SnowflakeEffect />
      <main className="min-h-screen pt-16 scroll-smooth">
        <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent scroll-mt-20">
          <div className="max-w-7xl mx-auto w-full">

            {journalPosts.map((post) => (
              <div key={post.id} className="space-y-20">
                {/* Header Information */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                      <Calendar className="h-4 w-4" />
                      <time className="text-sm">{post.endDate ? formatDateRange(post.date, post.endDate) : formatDateRange(post.date)}</time>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">{post.title}</h3>
                  <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">{post.excerpt}</p>
                </div>

                {/* Main Two-Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  
                  {/* Column 1: Photo Gallery (Left) */}
                  <div className="space-y-8">
                    <h4 className="text-2xl font-serif font-semibold text-center lg:text-left">Photo Gallery</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((day) => {
                        const dayPhotos = post.photos.filter((p) => p.day === day)
                        if (dayPhotos.length === 0) return null
                        const companies = Array.from(new Set(dayPhotos.map(p => p.company).filter(Boolean)))
                        return (
                          <div key={day} onClick={() => setSelectedDay(day)} className="group cursor-pointer flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="relative aspect-video w-full overflow-hidden bg-black/20">
                              <Image src={dayPhotos[0]?.image} alt={`Day ${day}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                              <h5 className="font-semibold text-lg mb-2">Day {day}</h5>
                              <div className="flex flex-wrap gap-1">
                                {companies.map((company, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">{company}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Column 2: 3D Reflection Carousel (Right) */}
                  <div className="space-y-8 flex flex-col items-center">
                    <div className="text-center">
                        <h4 className="text-2xl font-serif font-semibold">Reflection Paper</h4>
                        <p className="text-sm text-muted-foreground mt-2">A 3D journey through growth</p>
                    </div>

                    <div className="relative w-full h-[500px] sm:h-[550px] flex items-center justify-center perspective">
                      {/* Carousel Container */}
                      <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
                        {post.reflectionPages.map((page, index) => {
                          const len = post.reflectionPages.length;
                          const offset = (index - journalReflectionIndex + len) % len;
                          const distance = offset <= len / 2 ? offset : offset - len;
                          const isActive = index === journalReflectionIndex;

                          return (
                            <div
                              key={page.id}
                              className={`absolute top-1/2 left-1/2 w-64 h-80 sm:w-72 sm:h-[400px] rounded-2xl shadow-2xl cursor-pointer transition-all duration-500 ${isActive ? "z-50" : "z-0"}`}
                              style={{
                                transform: `translateX(-50%) translateY(-50%) rotateY(${distance * 45}deg) translateZ(${250 - Math.abs(distance) * 80}px)`,
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden",
                                opacity: Math.abs(distance) > 2 ? 0 : 1,
                              }}
                              onClick={() => {
                                if (isActive) {
                                  if (window.innerWidth >= 768) setSelectedReflection(page);
                                } else {
                                  setJournalReflectionIndex(index);
                                }
                              }}
                            >
                              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl hover:shadow-primary/50 transition-all hover:border-primary group">
                                <Image src={page.image} alt={page.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                  <p className="text-sm font-semibold">{page.title}</p>
                                  <p className="text-xs text-white/70">Page {page.pageNumber}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Carousel Navigation Buttons */}
                      <button
                        onClick={() => setJournalReflectionIndex((prev) => (prev === 0 ? post.reflectionPages.length - 1 : prev - 1))}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-xl hover:bg-primary hover:text-white transition-all"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setJournalReflectionIndex((prev) => (prev + 1) % post.reflectionPages.length)}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-xl hover:bg-primary hover:text-white transition-all"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2">
                      {post.reflectionPages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setJournalReflectionIndex(idx)}
                          className={`h-1.5 rounded-full transition-all ${idx === journalReflectionIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Day Gallery Dialog */}
                {selectedDay && (
                  <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
                    <DialogContent className="w-[95vw] h-[90vh] sm:w-[96vw] sm:h-[93vh] max-w-[1600px] bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col p-0 overflow-hidden text-white">
                      <DialogHeader className="px-4 sm:px-8 py-4 sm:py-6 bg-white/5 backdrop-blur-sm border-b border-white/10 shrink-0">
                        <DialogTitle className="text-2xl sm:text-3xl font-serif">Day {selectedDay} Gallery</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                        <div className="flex flex-wrap gap-3 sm:gap-6 justify-center items-start">
                          {post.photos.filter((p) => p.day === selectedDay).map((photo) => (
                            <button key={photo.id} onClick={() => setSelectedPhoto(photo)} className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105" style={{ width: "calc(50% - 6px)", aspectRatio: "3/4", maxWidth: "250px" }}>
                              <Image src={photo.image} alt={photo.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Full-Size Photo Modal - Pink Theme */}
                {selectedPhoto && (
                  <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
                    <DialogTitle className="sr-only">{selectedPhoto.title}</DialogTitle>
                    <DialogContent 
                      showCloseButton={false} 
                      className="p-0 w-full max-w-[95vw] sm:max-w-3xl h-fit bg-transparent border-0 shadow-none outline-none overflow-visible"
                    >
                      <div className="flex flex-col items-center w-full h-full animate-in fade-in zoom-in duration-300">
                        <div className="relative w-full bg-black/40 rounded-t-2xl overflow-hidden border-x border-t border-primary/30 backdrop-blur-md">
                          <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-4 z-50 p-2 bg-primary/20 hover:bg-primary/40 text-white rounded-full transition-all border border-primary/30">
                            <X className="h-5 w-5" />
                          </button>
                          <div className="flex items-center justify-center min-h-[300px] max-h-[65vh]">
                            <Image src={selectedPhoto.image} alt={selectedPhoto.title} width={1200} height={800} className="w-full h-auto max-h-[65vh] object-contain shadow-2xl" />
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#1a0a0f] to-[#2d0a15] backdrop-blur-2xl p-5 w-full rounded-b-2xl border-x border-b border-primary/30 shadow-2xl">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-serif font-bold text-white tracking-tight leading-tight">{selectedPhoto.title}</h3>
                              <p className="text-xs font-medium text-primary uppercase tracking-widest mt-1">{selectedPhoto.company}</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-primary/70 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 w-fit">
                              <MapPin className="h-3.5 w-3.5" />
                              {selectedPhoto.location}
                            </div>
                          </div>
                          <div className="mt-4 border-t border-primary/10 pt-4">
                            <p className="text-sm text-white/80 leading-relaxed font-light">{selectedPhoto.description}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Reflection Detail Dialog (Desktop Only) */}
                {selectedReflection && (
                  <Dialog open={!!selectedReflection} onOpenChange={() => setSelectedReflection(null)}>
                    <DialogTitle className="sr-only">{selectedReflection.title}</DialogTitle>
                    <DialogContent className="p-0 max-w-4xl h-[80vh] bg-transparent border-0 shadow-none outline-none">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-primary/20">
                        <button onClick={() => setSelectedReflection(null)} className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-primary transition-colors">
                          <X className="h-6 w-6" />
                        </button>
                        <Image src={selectedReflection.image} alt={selectedReflection.title} fill className="object-contain" />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                
              </div>
            ))}
          </div>
        </section>

        <footer className="py-8 px-6 lg:px-8 border-t border-white/20 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Eliza Marie Abing. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  )
}