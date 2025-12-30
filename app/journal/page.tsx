"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"
import { SparkleCursor } from "@/components/sparkle-cursor"
import { SnowflakeEffect } from "@/components/snowflake-effect"

const journalPosts = [
  {
    id: 1,
    title: "Cebu - Bohol Educational Tour 2025",
    excerpt:
      "Exploring local heritage, industry practices, and natural wonders: A recap of our 4-day academic journey across Cebu and Bohol.",
    date: "2025-11-19",
    endDate: "2025-11-22",
    slug: "cebu-bohol-tour",
    photos: [
      // DAY 1 - NOV 19, WED
      { id: 1, day: 1, company: "Philippine Airlines", title: "Departure from Davao", description: "8:45 a.m. - Estimated Time of Departure via Philippine Airlines.", location: "Davao Airport", image: ["/gallery/2-D1.jpg", "/gallery/1-D1.jpg", "/gallery/3-D1.jpg"] },
      { id: 2, day: 1, company: "Mactan-Cebu International Airport", title: "Arrival in Cebu", description: "9:30 a.m. - Landed and met our tour guides to start our Cebu-Bohol adventure.", location: "Cebu City", image: ["/gallery/1-D1.jpg", "/gallery/2-D1.jpg", "/gallery/3-D1.jpg"] },
      { id: 3, day: 1, company: "Lapu-Lapu Shrine", title: "Lapu-Lapu Shrine", description: "10:00 a.m. - Learned about the bravery of the Filipino hero at this historic site.", location: "Mactan, Cebu", image: ["/gallery/3-D1.jpg", "/gallery/1-D1.jpg", "/gallery/2-D1.jpg"] },
      { id: 4, day: 1, company: "Somac Korean Restaurant", title: "Lunch at SM Seaside", description: "11:00 a.m. - Eat-All-You-Can buffet at Somac Korean Restaurant.", location: "SM Seaside Cebu", image: ["/gallery/4-D1.jpg", "/gallery/5-D1.jpg", "/gallery/D3.png"] },
      { id: 5, day: 1, company: "WORLDTECH INFORMATION SOLUTIONS, INC.", title: "WorldTech Visit", description: "1:30 p.m. - Overview of IT operations and the latest technology solutions.", location: "Cebu City", image: ["/gallery/5-D1.jpg", "/gallery/D3.png", "/gallery/4-D1.jpg"] },
      { id: 6, day: 1, company: "Magellan's Cross", title: "Magellan's Cross", description: "3:30 p.m. - Fascinating visit to this symbol of faith and history.", location: "Cebu City", image: ["/gallery/1-D1.jpg", "/gallery/2-D1.jpg", "/gallery/3-D1.jpg"] },
      { id: 7, day: 1, company: "Bai Hotel", title: "Check-in at Bai Hotel", description: "6:30 p.m. - Checked in and enjoyed free time to relax.", location: "Mandaue City", image: ["/gallery/6-D1.jpg", "/gallery/1-D1.jpg", "/gallery/2-D1.jpg"] },

      // DAY 2 - NOV 20, THU
      { id: 8, day: 2, company: "RIVAN IT CEBU", title: "Rivan IT Visit", description: "9:00 a.m. - Learned about IT solutions and professional call center setups.", location: "Cebu City", image: ["/gallery/8.jpg", "/gallery/6.jpg", "/gallery/9.jpg"] },
      { id: 9, day: 2, company: "Buffet 101", title: "Lunch at Buffet 101", description: "11:30 a.m. - Recharged with international cuisine.", location: "Cebu City", image: ["/gallery/9.jpg", "/gallery/8.jpg", "/gallery/6.jpg"] },
      { id: 10, day: 2, company: "CODECHUM", title: "CodeChum Workshop", description: "2:00 p.m. - Hands-on experience at CIT-U Wildcat Labs.", location: "CIT-U Cebu", image: ["/gallery/10.jpg", "/gallery/11.jpg", "/gallery/8.jpg"] },
      { id: 11, day: 2, company: "Parian District", title: "Parian Visit", description: "4:00 p.m. - Explored historic streets and heritage houses.", location: "Cebu City", image: ["/gallery/11.jpg", "/gallery/10.jpg", "/gallery/9.jpg"] },

      // DAY 3 - NOV 21, FRI
      { id: 12, day: 3, company: "MATA TECHNOLOGIES, INC.", title: "Mata Tech Visit", description: "9:00 a.m. - Observed innovative solutions and real-world IT projects.", location: "Cebu City", image: ["/gallery/12.jpg", "/gallery/13.jpg", "/gallery/14.jpg"] },
      { id: 13, day: 3, company: "Donation Activity", title: "Community Giving", description: "1:30 p.m. - Meaningful experience giving back to the local community.", location: "Cebu City", image: ["/gallery/14.jpg", "/gallery/12.jpg", "/gallery/13.jpg"] },
      { id: 14, day: 3, company: "SuperCat Ferry", title: "Cebu to Tagbilaran", description: "2:30 p.m. - Scenic 2-hour ferry journey to Bohol.", location: "Cebu Pier", image: ["/gallery/15.jpg", "/gallery/14.jpg", "/gallery/12.jpg"] },
      { id: 15, day: 3, company: "Panglao Vista Suites", title: "Check-in in Bohol", description: "6:00 p.m. - Dinner by the poolside on Panglao Island.", location: "Panglao, Bohol", image: ["/gallery/16.jpg", "/gallery/15.jpg", "/gallery/14.jpg"] },

      // DAY 4 - NOV 22, SAT
      { id: 16, day: 4, company: "Chocolate Hills", title: "Chocolate Hills", description: "10:00 a.m. - Marveling at the unique natural formations.", location: "Carmen, Bohol", image: ["/gallery/17.jpg", "/gallery/18.jpg", "/gallery/19.jpg"] },
      { id: 17, day: 4, company: "Tarsier Sanctuary", title: "Tarsier Sanctuary", description: "11:00 a.m. - Observed adorable tarsiers in their natural habitat.", location: "Corella, Bohol", image: ["/gallery/18.jpg", "/gallery/17.jpg", "/gallery/19.jpg"] },
      { id: 18, day: 4, company: "Loboc River Cruise", title: "Loboc River Lunch", description: "12:00 p.m. - Fiesta Buffet at Floating Restaurant with Harana.", location: "Loboc, Bohol", image: ["/gallery/19.jpg", "/gallery/17.jpg", "/gallery/18.jpg"] },
      { id: 19, day: 4, company: "Sikatuna Mirror", title: "Mirror of the World", description: "2:00 p.m. - Explored reflective art and interactive displays.", location: "Sikatuna, Bohol", image: ["/gallery/20.jpg", "/gallery/17.jpg", "/gallery/18.jpg"] },
      { id: 20, day: 4, company: "Cebu Pacific Air", title: "Departure to Davao", description: "5:30 p.m. - Departure from Panglao International Airport.", location: "Panglao Airport", image: ["/gallery/21.jpg", "/gallery/17.jpg", "/gallery/18.jpg"] },
    ],
    reflectionPages: [
      { id: 1, title: "Day 1 Reflection", image: "/journal/journal1.png", pageNumber: 1 },
      { id: 2, title: "Day 2 Reflection", image: "/journal/journal1.png", pageNumber: 2 },
      { id: 3, title: "Day 3 Reflection", image: "/journal/journal1.png", pageNumber: 3 },
      { id: 4, title: "Day 4 Reflection", image: "/journal/journal1.png", pageNumber: 4 },
      { id: 5, title: "Summary of Learnings", image: "/journal/journal1.png", pageNumber: 5 },
      { id: 6, title: "Final Takeaways", image: "/journal/journal1.png", pageNumber: 6 },
    ],
  },
]

function formatDateRange(startDate: string, endDate?: string) {
  if (!endDate) return new Date(startDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  const start = new Date(startDate)
  const end = new Date(endDate)
  const startMonth = start.toLocaleDateString("en-US", { month: "long" })
  const endMonth = end.toLocaleDateString("en-US", { month: "long" })
  const year = end.getFullYear()
  if (startMonth === endMonth) return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${year}`
  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${year}`
}

export default function JournalPage() {
  const [journalReflectionIndex, setJournalReflectionIndex] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedReflection, setSelectedReflection] = useState<any>(null)

  return (
    <>
      <SparkleCursor />
      <SnowflakeEffect />
      <main className="min-h-screen pt-16 scroll-smooth bg-background">
        <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="max-w-7xl mx-auto w-full">
            {journalPosts.map((post) => (
              <div key={post.id} className="space-y-20">
                {/* Header Information */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-primary/20">
                      <Calendar className="h-4 w-4 text-primary" />
                      <time className="text-sm font-medium text-foreground/80">{post.endDate ? formatDateRange(post.date, post.endDate) : formatDateRange(post.date)}</time>
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{post.title}</h1>
                  <p className="text-lg text-muted-foreground max-w-1xl mx-auto leading-relaxed">{post.excerpt}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Photo Gallery Column (Left) */}
                  <div className="space-y-8">
                    <div className="flex justify-center">
                      <h4 className="flex items-center gap-3 text-2xl font-serif font-semibold text-foreground">
                        <span className="w-1 h-8 bg-primary rounded-full" />Tour Photo Gallery
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((day) => {
                        const dayPhotos = post.photos.filter((p) => p.day === day)
                        if (dayPhotos.length === 0) return null
                        const displayImg = Array.isArray(dayPhotos[0].image) ? dayPhotos[0].image[0] : dayPhotos[0].image
                        return (
                          <div key={day} onClick={() => setSelectedDay(day)} className="group cursor-pointer bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-primary transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                            <div className="relative aspect-video overflow-hidden">
                              <Image src={displayImg} alt={`Day ${day}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>
                            <div className="p-5 bg-white/40">
                              <h5 className="font-serif font-semibold text-lg text-foreground/90 mb-3">Day {day} Exploration</h5>
                              <div className="flex flex-wrap gap-2">
                                {Array.from(new Set(dayPhotos.map(p => p.company))).slice(0, 2).map((c, i) => (
                                  <span key={i} className="text-[9px] bg-secondary text-secondary-foreground/90 px-2 py-0.5 rounded-full border border-primary/10 font-semibold uppercase">{c}</span>
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
                      <h4 className="flex items-center gap-3 text-2xl font-serif font-semibold text-foreground"><span className="w-1 h-8 bg-primary rounded-full" />Reflection Paper</h4>
                    </div>

                    <div className="relative w-full h-[500px] sm:h-[550px] flex items-center justify-center perspective">
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
                <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
                  <DialogContent className="max-w-[80vw] sm:max-w-[80vw] h-[95vh] bg-background/95 backdrop-blur-2xl border-primary/20 p-0 flex flex-col overflow-hidden text-foreground">
                    <DialogHeader className="p-6 sm:p-8 shrink-0 flex flex-col items-center justify-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/10">
                      <div className="text-center">
                        <DialogTitle className="text-4xl font-serif">
                          Day {selectedDay} Highlights
                        </DialogTitle>
                        <p className="text-black/90 text-sm font-serif font-semibold tracking-wide mt-1">
                          Academic Exploration Journey
                        </p>
                      </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-6 sm:p-10 scrollbar-hide">
                      <div className="grid grid-cols-1 gap-2 pb-10">
                        {post.photos.filter((p) => p.day === selectedDay).map((photo) => {
                          const images = Array.isArray(photo.image) ? photo.image : [photo.image];
                          return (
                            <div key={photo.id} className="space-y-2">
                              <div className="flex flex-col items-start px-2">
                                <h5 className="font-serif font-semibold text-2xl text-black/90 leading-tight">{photo.title}</h5>
                                <p className="text-sm text-muted-foreground italic mb-2">"{photo.description}"</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[0, 1, 2].map((index) => {
                                  const displayImg = images[index] || images[0];
                                  return (
                                    <div
                                      key={`${photo.id}-img-${index}`}
                                      onClick={() => setSelectedPhoto({ ...photo, image: displayImg })}
                                      className="group relative aspect-[4/3] rounded-x1 overflow-hidden border border-border hover:border-primary transition-all cursor-pointer shadow-md"
                                    >
                                      <Image src={displayImg} alt={`${photo.title} - view ${index + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    </div>
                                  );
                                })}
                              </div>
                              <hr className="border-primary/5 mt-8" />
                            </div>
                          );
                        })}
                      </div>
                      <h1 className="text-black/80 text-sm text-center font-serif font-semibold tracking-wide">"Some images displayed belong to their respective owners. Credits given where available." - Eliza Gwapa, 2025 </h1>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Single Image Full Screen Preview Dialog */}
                {selectedPhoto && (
                  <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
                    <DialogContent className="p-0 border-0 bg-transparent shadow-none outline-none max-w-fit max-h-fit flex items-center justify-center overflow-visible">
                      <DialogTitle className="sr-only">Viewing {selectedPhoto.title}</DialogTitle>

                      <div className="relative animate-in zoom-in duration-300 flex items-center justify-center group">
                        {/* The Close Button now tracks the top-right of the actual image content */}
                        <button
                          onClick={() => setSelectedPhoto(null)}
                          className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all border border-white/20 backdrop-blur-md z-50 shadow-lg"
                          title="Close"
                        >
                          <X className="h-5 w-5" />
                        </button>

                        {/* Removed 'fill' and 'aspect-video'. Using 'max-h' to ensure it fits the viewport */}
                        <img
                          src={selectedPhoto.image}
                          alt={selectedPhoto.title}
                          className="w-auto max-w-[95vw] max-h-[92vh] object-contain rounded-lg shadow-2xl"
                        />

                        {/* The Title Overlay now tracks the bottom width of the actual image */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-10 text-white pointer-events-none rounded-b-lg">
                          <h3 className="text-xl sm:text-3xl font-serif font-bold mb-1">{selectedPhoto.title}</h3>
                          <p className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm">{selectedPhoto.location}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Reflection Full-Size Page Reader Dialog */}
                {selectedReflection && (
                  <Dialog open={!!selectedReflection} onOpenChange={() => setSelectedReflection(null)}>
                    <DialogContent className="p-0 border-0 bg-transparent shadow-none outline-none max-w-fit max-h-fit flex items-center justify-center">
                      <DialogTitle className="sr-only">Page {selectedReflection.pageNumber}</DialogTitle>

                      <div className="relative animate-in zoom-in duration-300 flex items-center justify-center">
                        <button
                          onClick={() => setSelectedReflection(null)}
                          className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all border border-white/20 backdrop-blur-md z-50"
                        >
                          <X className="h-5 w-5" />
                        </button>

                        <img
                          src={selectedReflection.image}
                          alt={selectedReflection.title}
                          className="w-auto max-w-[95vw] max-h-[88vh] object-contain rounded-lg shadow-2xl"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Reflection Full-Size Page Reader Dialog */}
                {selectedReflection && (
                  <Dialog open={!!selectedReflection} onOpenChange={() => setSelectedReflection(null)}>
                    <DialogContent className="max-w-[95vw] sm:max-w-4xl h-[88vh] bg-transparent border-0 shadow-none outline-none flex items-center justify-center p-0">
                      <DialogTitle className="sr-only">Page {selectedReflection.pageNumber}: {selectedReflection.title}</DialogTitle>
                      <div className="relative w-full h-full flex flex-col items-center animate-in zoom-in duration-300">
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                          <button
                            onClick={() => setSelectedReflection(null)}
                            className="absolute top-4 right-46 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all border border-white/20 backdrop-blur-md z-50"
                          >
                            <X className="h-5 w-5" />
                          </button>
                          <Image src={selectedReflection.image} alt={selectedReflection.title} fill className="object-contain" />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

              </div>
            ))}
          </div>
        </section>

        <footer className="py-8 px-6 lg:px-8 border-t border-black/5 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Eliza Marie Abing. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  )
}