"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, ChevronLeft, ChevronRight, X, FileText } from "lucide-react"
import { SparkleCursor } from "@/components/sparkle-cursor"
import { SnowflakeEffect } from "@/components/snowflake-effect"

// Data structure remains intact with descriptions preserved
const journalPosts = [
  {
    id: 1,
    title: "Cebu - Bohol Educational Tour 2025",
    excerpt: "Exploring local heritage, industry practices, and natural wonders: A recap of our 4-day academic journey across Cebu and Bohol.",
    date: "2025-11-19",
    endDate: "2025-11-22",
    slug: "cebu-bohol-tour",
    photos: [
      // Day 1
      { id: 1, day: 1, company: "Philippine Airlines", title: "Departure from Davao", description: "8:45 a.m. - Estimated Time of Departure via Philippine Airlines.", location: "Davao Airport", image: ["/Day1/V1-tomboy.jpg", "/Day1/D1-airport1.jpg", "/Day1/V1-departure.jpg"] },
      { id: 2, day: 1, company: "Mactan-Cebu International Airport", title: "Arrival in Cebu", description: "Landed and met our tour guides to start our Cebu-Bohol adventure.", location: "Cebu City", image: "/Day1/V2-cebu.jpg" },
      { id: 3, day: 1, company: "Lapu-Lapu Shrine", title: "Lapu-Lapu Shrine", description: "Learned about the bravery of the Filipino hero at this historic site.", location: "Mactan, Cebu", image: "/Day1/3-D1.jpg" },
      { id: 4, day: 1, company: "Somac Korean Restaurant", title: "Lunch at SM Seaside", description: "Eat-All-You-Can buffet at Somac Korean Restaurant.", location: "SM Seaside Cebu", image: "/Day1/D1-somac.jpg" },
      { id: 5, day: 1, company: "WORLDTECH INFORMATION SOLUTIONS, INC.", title: "WorldTech Visit", description: "Overview of IT operations and the latest technology solutions.", location: "Cebu City", image: "/Day1/D1-worldtech.jpg" },
      { id: 6, day: 1, company: "Bai Hotel", title: "Check-in at Bai Hotel", description: "Checked in and enjoyed free time to relax.", location: "Mandaue City", image: ["/Day1/D1-baihotel.jpg", "/Day1/D1-baihotel3.jpg", "/Day1/D1-baihotel33.jpg", "/Day1/D1-baihotel6.jpg", "/Day1/D1-baihotel4.jpg"] },

      // Day 2
      { id: 7, day: 2, company: "CODECHUM", title: "CodeChum Workshop", description: "Hands-on experience at CIT-U Wildcat Labs.", location: "CIT-U Cebu", image: "/Day2/D2-codechum.jpg" },
      { id: 8, day: 2, company: "Bai Hotel", title: "Breakfast Buffet", description: "Internatinal Breakfast Buffet at Bai Hotel", location: "Cebu City", image: ["/Day2/D2-baihotel.jpg", "/Day2/D2-baihotel2.jpg"] },
      { id: 9, day: 2, company: "RIVAN IT CEBU", title: "Rivan IT Visit", description: "Learned about IT solutions and professional call center setups.", location: "Cebu City", image: ["/Day2/D2-rivanIT2.jpg", "/Day2/D2-rivanIT.jpg", "/Day2/D2-rivanIT3.jpg"] },
      { id: 10, day: 2, company: "Buffet 101", title: "Lunch at Buffet 101", description: "Recharged with international cuisine.", location: "Cebu City", image: ["/Day2/D2-buffet1011.jpg", "/Day2/D2-buffet101.jpg"] },
      { id: 11, day: 2, company: "CODECHUM", title: "CodeChum Workshop", description: "Hands-on experience at CIT-U Wildcat Labs.", location: "CIT-U Cebu", image: ["/Day2/D2-codechum2.jpg", "/Day2/D2-codechum3.jpg", "/Day2/D2-codechum4.png", "/Day2/D2-codechum5.jpg"] },
      { id: 13, day: 2, company: "Magellan's Cross", title: "Magellan's Cross", description: "Fascinating visit to this symbol of faith and history.", location: "Cebu City", image: ["/Day1/D1-magellan.jpg", "/Day1/D1-pilgrim.jpg", "/Day1/D1-pilgrim2.jpg", "/Day1/D1-pilgrim3.jpg"] },

      // Day 3
      { id: 14, day: 3, company: "MATA TECHNOLOGIES, INC.", title: "Mata Tech Visit", description: "Observed innovative solutions and real-world IT projects.", location: "Cebu City", image: ["/Day3/D3-mata1.jpg", "/Day3/D3-mata2.jpg", "/Day3/D3-mata3.jpg", "/Day3/D3-mata4.jpg", "/Day3/D3-mata5.jpg"] },
      { id: 15, day: 3, company: "Donation Activity", title: "Community Giving", description: "Meaningful experience giving back to the local community.", location: "Cebu City", image: "/Day3/D3-mata.jpeg" },
      { id: 16, day: 3, company: "SuperCat Ferry", title: "Cebu to Tagbilaran", description: "Scenic 2-hour ferry journey to Bohol.", location: "Cebu Pier", image: ["/Day3/D3-supercat.jpg", "/Day3/D3-supercat1.jpg"] },
      { id: 17, day: 3, company: "Panglao, Bohol", title: "Check-in at Panglao Vista Suites", description: "Dinner buffet at the hotel and enjoyed free time to relax at Alona Beach.", location: "Panglao, Bohol", image: ["/Day3/D3-vista.jpg", "/Day3/D3-panglao.jpg", "/Day3/D3-panglao1.jpg", "/Day3/D3-panglao2.jpg", "/Day3/D3-panglao3.jpg", "/Day3/D3-panglao4.jpg", "/Day3/D3-panglao5.jpg", "/Day3/D3-panglao7.jpg"] },

      // Day 4
      { id: 18, day: 4, company: "Chocolate Hills", title: "Chocolate Hills", description: "Marveling at the unique natural formations.", location: "Carmen, Bohol", image: ["/Day4/D4-hills.jpg", "/Day4/D4-hills1.jpg", "/Day4/D4-hills2.jpg"] },
      { id: 19, day: 4, company: "Tarsier Sanctuary", title: "Tarsier Sanctuary", description: "Observed adorable tarsiers in their natural habitat.", location: "Corella, Bohol", image: ["/Day4/D4-tarsier.jpg", "/Day4/D4-tarsier117.jpg"] },
      { id: 20, day: 4, company: "Loboc River Cruise", title: "Loboc River Lunch", description: "Fiesta Buffet at Floating Restaurant with Harana.", location: "Loboc, Bohol", image: "/Day4/D4-loboc.jpg" },
      { id: 21, day: 4, company: "Sikatuna Mirror", title: "Mirror of the World", description: "Explored reflective art and interactive displays.", location: "Sikatuna, Bohol", image: "/Day4/D4-sikatuna.jpg" },
      { id: 22, day: 4, company: "Cebu Pacific Air", title: "Departure to Davao", description: "5:30 p.m. - Departure from Panglao International Airport.", location: "Panglao Airport", image: "/Day4/D4-departure.jpg" },
    ],
    reflectionPages: [
      { id: 1, title: "Day 1 Reflection", image: "/journal/page1.jpg", pageNumber: 1 },
      { id: 2, title: "Day 2 Reflection", image: "/journal/page2-worldtech.png", pageNumber: 2 },
      { id: 3, title: "Day 3 Reflection", image: "/journal/page3-codechum.png", pageNumber: 3 },
      { id: 4, title: "Day 4 Reflection", image: "/journal/page4-rivanIT.png", pageNumber: 4 },
      { id: 5, title: "Summary of Learnings", image: "/journal/page5-matatech.png", pageNumber: 5 },
      { id: 6, title: "Final Takeaways", image: "/journal/page6-tarsier117.png", pageNumber: 6 },
      { id: 7, title: "Impression Sheet", image: "/journal/page7-impression-sheet.png", pageNumber: 7 },
    ],
  },
]

const certificates = [
  { id: 1, title: "Certificate of Completion", issuer: "WATT - World of Adventures Travel and Tours", description: "My active participation and completion of the Educational Tour in Cebu and Bohol last November 19-22, 2025.", image: "/certs/eli-watt-certificate.png", date: "2025-11-22" },
  { id: 2, title: "Certificate of Appearance", issuer: "Provincial DRRM Office", description: "My Certificate of Appearance at the Provincial Disaster Risk Reduction and Management Office in Tagbilaran City, Bohol.", image: "/certs/tarsier-cert.jpg", date: "2025-11-22" }
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

  const visitedCompanies = [
    {
      id: 1,
      name: "WORLDTECH INFORMATION SOLUTIONS, INC.",
      image: "/Day1/D1-worldtech.jpg",
      description: "IT Consultancy Company and Certification Training center base in Manila, Cebu, Davao Philippines.",
    },
    {
      id: 2,
      name: "CODECHUM",
      image: "/Day2/D2-codechum.jpg",
      description: "Online learning platform that helps students and educators practice programming through interactive coding challenges and assessments.",
    },
    {
      id: 3,
      name: "RIVAN IT CEBU",
      image: "/Day2/D2-rivanIT.jpg",
      description: "IT training center in Cebu that provides practical technology and networking courses.",
    },
    {
      id: 4,
      name: "MATA TECHNOLOGIES, INC.",
      image: "/Day3/D3-mata1.jpg",
      description: "Cebu-based tech company that creates immersive 360° virtual reality maps and tours for real estate and tourism destinations in the Philippines.",
    },
    {
      id: 5,
      name: "TAGBILARAN 911",
      image: "/gallery/tagbilaran911.jpg",
      description: "The city’s emergency hotline and response system in Tagbilaran City, Bohol",
    },
  ]

  return (
    <>
      <SparkleCursor />
      <SnowflakeEffect />
      <main className="min-h-screen pt-12 scroll-smooth bg-background">
        <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto w-full">
            {journalPosts.map((post) => (
              <div key={post.id} className="space-y-9">
                {/* Header */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
                    <div className="flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-primary/20">
                      <Calendar className="h-4 w-4 text-primary" />
                      <time className="text-sm font-medium text-foreground/80">{post.endDate ? formatDateRange(post.date, post.endDate) : formatDateRange(post.date)}</time>
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{post.title}</h1>
                  <p className="text-lg text-muted-foreground max-w-1xl mx-auto leading-relaxed">{post.excerpt}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Photo Gallery Column */}
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
                            <div className="p-5 bg-white/40 text-center">
                              <h5 className="font-serif font-semibold text-lg text-foreground/90">Day {day}</h5>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Reflection Carousel */}
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
                      <button onClick={() => setJournalReflectionIndex((prev) => (prev === 0 ? post.reflectionPages.length - 1 : prev - 1))} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-xl hover:bg-primary hover:text-white transition-all"><ChevronLeft className="h-5 w-5" /></button>
                      <button onClick={() => setJournalReflectionIndex((prev) => (prev + 1) % post.reflectionPages.length)} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-xl hover:bg-primary hover:text-white transition-all"><ChevronRight className="h-5 w-5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visited Companies */}
        <section id="visited-companies" className="py-20 px-6 lg:px-8 bg-gradient-to-t from-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto w-full text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">Companies Visited</h2>

            {/* Displayed in one line on large screens (grid-cols-5) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-[1400px] mx-auto items-stretch">
              {visitedCompanies.map((c) => (
                <article
                  key={c.id}
                  className="group overflow-hidden bg-card/50 backdrop-blur-md rounded-2xl border-2 border-primary/20 hover:border-primary transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full shadow-sm"
                >
                  {/* Photo Container: Matches the Gallery Header Style */}
                  <div className="relative aspect-video w-full overflow-hidden shrink-0">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Text Content Area */}
                  <div className="p-4 flex flex-col items-center text-center flex-grow bg-white/5">
                    <h3 className="text-[15px] font-semibold text-foreground mb-2 leading-tight min-h-[32px] flex items-center justify-center">
                      {c.name}
                    </h3>

                    {/* Divider line for visual polish */}
                    <div className="w-8 h-0.5 bg-primary/30 rounded-full mb-3 group-hover:w-12 transition-all duration-500" />

                    <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-4 flex-grow">
                      {c.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section id="certificates" className="py-10 px-6 lg:px-8 mb-15 mt-20 from-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto w-full text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-13">Educational Tour Certificates</h2>
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {certificates.map((cert) => (
                <Dialog key={cert.id}>
                  <DialogTrigger asChild>
                    <article className="group relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-primary shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer">
                      <div className="flex items-start justify-between mb-6 text-left">
                        <div className="flex-1">
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">{cert.issuer}</span>
                          <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4"><Calendar className="h-4 w-4" /><time>{formatDateRange(cert.date)}</time></div>
                          <p className="text-muted-foreground line-clamp-2">{cert.description}</p>
                        </div>
                        <FileText className="h-8 w-8 text-primary shrink-0" />
                      </div>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
                        <Image src={cert.image} alt={cert.title} fill className="object-contain" />
                      </div>
                    </article>
                  </DialogTrigger>
                  <DialogContent showCloseButton={false} className="p-0 w-full max-w-[95vw] max-h-[92vh] sm:max-w-[900px] sm:max-h-[90vh] bg-transparent border-0 shadow-none">
                    <DialogTitle className="sr-only">{cert.title}</DialogTitle>
                    <Image src={cert.image} alt={cert.title} width={800} height={600} className="w-full h-auto max-h-[85vh] object-contain rounded-lg mx-auto" />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Dialog - CLEAN GRID (NO TEXT) */}
        <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
          <DialogContent className="max-w-[85vw] sm:max-w-[80vw] h-[95vh] bg-background/95 backdrop-blur-2xl border-primary/20 p-0 flex flex-col overflow-hidden">
            <DialogHeader className="p-6 shrink-0 flex flex-col items-center justify-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/10">
              <DialogTitle className="text-4xl font-serif">Day {selectedDay} Photo Collection</DialogTitle>
              <p className="text-muted-foreground text-center mt-2">Press Esc or click outside the dialog to close the gallery view. </p>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 sm:p-10 scrollbar-hide">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
                {journalPosts[0].photos.filter((p) => p.day === selectedDay).flatMap((photo) => {
                  const images = Array.isArray(photo.image) ? photo.image : [photo.image];
                  return images.map((img, idx) => (
                    <div
                      key={`${photo.id}-img-${idx}`}
                      onClick={() => setSelectedPhoto({
                        image: img,
                        title: photo.title,
                        description: photo.description,
                        location: photo.location
                      })}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-border hover:border-primary transition-all cursor-pointer shadow-md"
                    >
                      <Image src={img} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))
                })}
              </div>
              <p className="text-black/90 text-lg text-center font-serif py-1 italic">
                "Some images displayed belong to their respective owners. Credits given where available." - Eliza Gwapa, 2025
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* PHOTO PREVIEW DIALOG - RESTORED DESCRIPTION OVERLAY */}
        {selectedPhoto && (
          <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
            <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-fit max-h-fit flex items-center justify-center overflow-visible">
              <DialogTitle className="sr-only">Viewing Photo</DialogTitle>
              <div className="relative animate-in zoom-in duration-300 flex items-center justify-center">
                <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-4 p-2 bg-black/40 text-white rounded-full z-50 hover:bg-black/60 transition-colors"><X className="h-5 w-5" /></button>

                <img src={selectedPhoto.image} alt="Preview" className="w-auto max-w-[95vw] max-h-[92vh] object-contain rounded-lg shadow-2xl" />

                {/* RESTORED CAPTION OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-10 text-white pointer-events-none rounded-b-lg">
                  <h3 className="text-xl sm:text-3xl font-serif font-bold mb-1">{selectedPhoto.title}</h3>
                  <p className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-2">{selectedPhoto.location}</p>
                  <p className="text-white/80 text-xs sm:text-base italic max-w-2xl">"{selectedPhoto.description}"</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Reflection Reader */}
        {selectedReflection && (
          <Dialog open={!!selectedReflection} onOpenChange={() => setSelectedReflection(null)}>
            <DialogContent className="max-w-[95vw] sm:max-w-4xl h-[88vh] bg-transparent border-0 shadow-none flex items-center justify-center p-0">
              <DialogTitle className="sr-only">{selectedReflection.title}</DialogTitle>
              <div className="relative w-full h-full flex flex-col items-center animate-in zoom-in duration-300">
                <Image src={selectedReflection.image} alt={selectedReflection.title} fill className="object-contain" />
              </div>
            </DialogContent>
          </Dialog>
        )}

        <footer className="py-8 px-6 lg:px-8 border-t border-black/5 bg-white/5 backdrop-blur-sm text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Eliza Marie Abing. All rights reserved.</p>
        </footer>
      </main>
    </>
  )
}