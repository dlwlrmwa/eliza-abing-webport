"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Pause, Play, MapPin, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

type Slide = {
    id: number
    title: string
    description: string
    location: string
    image: string
    day: number
}

type ReflectionPage = {
    id: number
    title: string
    image: string
    pageNumber: number
}

const slides: Slide[] = [
    {
        id: 1,
        day: 1,
        title: "Grand Departure",
        description: "The beginning of our 4-day academic journey. Students gathered at the departure point excited to explore Cebu and Bohol's cultural and natural heritage.",
        location: "Cebu City",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    },
    {
        id: 2,
        day: 1,
        title: "Heritage Street Walk",
        description: "Walking through historic streets of Cebu, observing colonial architecture and learning about the region's rich Spanish-influenced history.",
        location: "Heritage District, Cebu",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop",
    },
    {
        id: 3,
        day: 1,
        title: "Local Market Experience",
        description: "Visiting a traditional public market where students experienced local culture, tried regional delicacies, and interacted with vendors.",
        location: "Carbon Market, Cebu",
        image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=800&fit=crop",
    },
    {
        id: 4,
        day: 1,
        title: "Industry Visit - Garment Factory",
        description: "Toured a major textile and garment manufacturing facility to understand local production processes and economic contributions.",
        location: "Industrial Park, Cebu",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop",
    },
    {
        id: 5,
        day: 1,
        title: "Sunset at the Harbor",
        description: "Captured the beautiful sunset at Cebu's harbor, reflecting on the day's learnings and cultural insights.",
        location: "Cebu Harbor",
        image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=800&fit=crop",
    },
    {
        id: 6,
        day: 2,
        title: "Evening Local Cuisine",
        description: "Enjoying authentic Cebuano dishes at a family-owned restaurant, sampling lechon and fresh seafood specialties.",
        location: "Cebu City",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop",
    },
    {
        id: 7,
        day: 2,
        title: "Ferry to Bohol",
        description: "Boarding the ferry from Cebu to Bohol. Scenic ocean views during the 1.5-hour boat journey.",
        location: "Cebu to Bohol Ferry",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop",
    },
    {
        id: 8,
        day: 2,
        title: "Chocolate Hills Overview",
        description: "Arriving at the iconic Chocolate Hills viewpoint. Hundreds of cone-shaped hills covered in grass create a breathtaking landscape.",
        location: "Chocolate Hills, Bohol",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop",
    },
    {
        id: 9,
        day: 2,
        title: "Man-Made Forest Trek",
        description: "Walking through the famous Man-Made Forest, planted decades ago to combat deforestation. A peaceful and educational experience.",
        location: "Man-Made Forest, Bohol",
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&h=800&fit=crop",
    },
    {
        id: 10,
        day: 2,
        title: "Tarsier Sanctuary Visit",
        description: "Visiting a conservation center to see and learn about the endangered Philippine tarsier, one of the world's smallest primates.",
        location: "Tarsier Sanctuary, Bohol",
        image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1200&h=800&fit=crop",
    },
    {
        id: 11,
        day: 3,
        title: "Community Outreach Program",
        description: "Engaging with local school children in an outreach activity, sharing knowledge and building cross-cultural friendships.",
        location: "Local School, Bohol",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=800&fit=crop",
    },
    {
        id: 12,
        day: 3,
        title: "Rice Terraces Photography",
        description: "Exploring agricultural landscapes and photographing traditional rice farming methods practiced for generations.",
        location: "Agricultural Area, Bohol",
        image: "https://images.unsplash.com/photo-1536152470836-b943b246224c?w=1200&h=800&fit=crop",
    },
    {
        id: 13,
        day: 3,
        title: "Loboc River Cruise",
        description: "A serene river cruise through mangrove forests with floating restaurants, enjoying traditional music and local entertainment.",
        location: "Loboc River, Bohol",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop",
    },
    {
        id: 14,
        day: 3,
        title: "Bamboo Crafts Workshop",
        description: "Hands-on workshop learning traditional bamboo weaving and handicraft techniques from local artisans.",
        location: "Bamboo Craft Center, Bohol",
        image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=800&fit=crop",
    },
    {
        id: 15,
        day: 3,
        title: "Beach Day - Panglao Island",
        description: "Relaxing at a pristine beach on Panglao Island. Crystal-clear waters and white sand beaches provided a perfect break.",
        location: "Panglao Island, Bohol",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop",
    },
    {
        id: 16,
        day: 4,
        title: "Snorkeling Adventure",
        description: "Exploring the vibrant coral reefs and colorful marine life. A memorable underwater educational experience.",
        location: "Coral Reef, Panglao",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop",
    },
    {
        id: 17,
        day: 4,
        title: "Local Fishermen Interview",
        description: "Meeting with local fishermen to understand their livelihood, fishing techniques, and relationship with the marine environment.",
        location: "Panglao Beach Village",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1200&h=800&fit=crop",
    },
    {
        id: 18,
        day: 4,
        title: "Traditional Weaving Demonstration",
        description: "Observing skilled weavers creating traditional textiles using ancient techniques passed down through generations.",
        location: "Weaving Workshop, Bohol",
        image: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=1200&h=800&fit=crop",
    },
    {
        id: 19,
        day: 4,
        title: "Farewell Dinner & Reflection",
        description: "Group dinner where students shared their favorite moments, learnings, and how the tour changed their perspectives.",
        location: "Local Restaurant, Bohol",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
    },
    {
        id: 20,
        day: 4,
        title: "Return Journey",
        description: "Heading back to Cebu. The tour concluded with newfound appreciation for local culture, nature, and community connections.",
        location: "Ferry Return",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop",
    },
]

const reflectionPages: ReflectionPage[] = [
    {
        id: 1,
        title: "Introduction & Departure",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=1000&fit=crop",
        pageNumber: 1,
    },
    {
        id: 2,
        title: "Cultural Immersion",
        image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&h=1000&fit=crop",
        pageNumber: 2,
    },
    {
        id: 3,
        title: "Natural Wonders",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=1000&fit=crop",
        pageNumber: 3,
    },
    {
        id: 4,
        title: "Community Engagement",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=1000&fit=crop",
        pageNumber: 4,
    },
    {
        id: 5,
        title: "Personal Growth",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=1000&fit=crop",
        pageNumber: 5,
    },
    {
        id: 6,
        title: "Conclusion & Takeaways",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=1000&fit=crop",
        pageNumber: 6,
    },
]

const createCollages = () => {
    const collages = []
    for (let i = 0; i < slides.length; i += 5) {
        collages.push(slides.slice(i, i + 5))
    }
    return collages
}

export default function CebuBoholTour() {
    const [currentCollage, setCurrentCollage] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    const collages = createCollages()

    useEffect(() => {
        if (!isPlaying) return

        const interval = setInterval(() => {
            setCurrentCollage((prev) => (prev === collages.length - 1 ? 0 : prev + 1))
        }, 6000)

        return () => clearInterval(interval)
    }, [isPlaying, collages.length])

    const goToPrevious = () => {
        setIsPlaying(false)
        setCurrentCollage((prev) => (prev === 0 ? collages.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setIsPlaying(false)
        setCurrentCollage((prev) => (prev === collages.length - 1 ? 0 : prev + 1))
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Header */}
            <div className="relative pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 rounded-full">
                        <span className="text-primary font-medium text-xs md:text-sm">November 19-22, 2025</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-foreground mb-4 md:mb-6 leading-tight px-4">
                        Cebu & Bohol
                        <span className="block text-primary">Educational Tour 2025</span>
                    </h1>
                    <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                        A memorable journey organized by WATT - World of Adventures Travel and Tours
                    </p>
                </div>
            </div>

            {/* Photo Collage Carousel */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-3">
                        Journey Highlights
                    </h2>
                    <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                        Explore memorable moments from our four-day educational adventure
                    </p>
                </div>

                <div className="relative">
                    {/* Collage Container */}
                    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-card border border-border p-3 md:p-4 lg:p-8">
                        <div className="relative h-[400px] md:h-[600px] lg:h-[700px]">
                            {collages.map((collage, collageIdx) => (
                                <div
                                    key={collageIdx}
                                    className={`absolute inset-0 transition-all duration-700 ${collageIdx === currentCollage
                                        ? "opacity-100 translate-x-0"
                                        : collageIdx < currentCollage
                                            ? "opacity-0 -translate-x-full"
                                            : "opacity-0 translate-x-full"
                                        }`}
                                >
                                    {/* Mobile Layout - Stack vertically */}
                                    <div className="md:hidden flex flex-col gap-2 h-full">
                                        {collage.slice(0, 3).map((photo) => (
                                            <Dialog key={photo.id}>
                                                <DialogTrigger asChild>
                                                    <button className="flex-1 rounded-xl overflow-hidden group relative focus:outline-none focus:ring-2 focus:ring-primary">
                                                        <img
                                                            src={photo.image}
                                                            alt={photo.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                                        <div className="absolute bottom-2 left-2 right-2">
                                                            <span className="inline-block mb-1 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                                                                Day {photo.day}
                                                            </span>
                                                            <h3 className="text-white font-bold text-xs drop-shadow-lg line-clamp-1">
                                                                {photo.title}
                                                            </h3>
                                                        </div>
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="w-[95vw] max-w-3xl h-[85vh] p-4">
                                                    <DialogTitle className="text-xl font-serif font-bold mb-2">
                                                        {photo.title}
                                                    </DialogTitle>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                                        <MapPin className="h-3 w-3" />
                                                        <span>{photo.location}</span>
                                                        <span className="ml-1 px-2 py-0.5 bg-primary/10 rounded-full text-primary">
                                                            Day {photo.day}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-center mb-3 max-h-[55vh]">
                                                        <img
                                                            src={photo.image}
                                                            alt={photo.title}
                                                            className="max-w-full max-h-full object-contain rounded-lg"
                                                        />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground leading-relaxed overflow-y-auto max-h-[15vh]">
                                                        {photo.description}
                                                    </p>
                                                </DialogContent>
                                            </Dialog>
                                        ))}
                                    </div>

                                    {/* Desktop Layout - Grid collage */}
                                    <div className="hidden md:grid grid-cols-12 grid-rows-12 gap-3 h-full">
                                        {/* Large main image */}
                                        {collage[0] && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="col-span-7 row-span-7 rounded-2xl overflow-hidden group relative focus:outline-none focus:ring-4 focus:ring-primary">
                                                        <img
                                                            src={collage[0].image}
                                                            alt={collage[0].title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                                        <div className="absolute bottom-4 left-4 right-4">
                                                            <span className="inline-block mb-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                                                                Day {collage[0].day}
                                                            </span>
                                                            <h3 className="text-white font-bold text-lg drop-shadow-lg">
                                                                {collage[0].title}
                                                            </h3>
                                                        </div>
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] p-6 overflow-y-auto">
                                                    <DialogTitle className="text-2xl md:text-3xl font-serif font-bold mb-3">
                                                        {collage[0].title}
                                                    </DialogTitle>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{collage[0].location}</span>
                                                        <span className="ml-2 px-2 py-0.5 bg-primary/10 rounded-full text-primary">
                                                            Day {collage[0].day}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-center mb-4 max-h-[50vh]">
                                                        <img
                                                            src={collage[0].image}
                                                            alt={collage[0].title}
                                                            className="max-w-full max-h-full object-contain rounded-lg"
                                                        />
                                                    </div>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {collage[0].description}
                                                    </p>
                                                </DialogContent>
                                            </Dialog>
                                        )}

                                        {/* Tall right image */}
                                        {collage[1] && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="col-span-5 row-span-7 rounded-2xl overflow-hidden group relative focus:outline-none focus:ring-4 focus:ring-primary">
                                                        <img
                                                            src={collage[1].image}
                                                            alt={collage[1].title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                                        <div className="absolute bottom-4 left-4 right-4">
                                                            <span className="inline-block mb-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                                                                Day {collage[1].day}
                                                            </span>
                                                            <h3 className="text-white font-bold text-sm drop-shadow-lg">
                                                                {collage[1].title}
                                                            </h3>
                                                        </div>
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] p-6 overflow-y-auto">
                                                    <DialogTitle className="text-2xl md:text-3xl font-serif font-bold mb-3">
                                                        {collage[1].title}
                                                    </DialogTitle>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{collage[1].location}</span>
                                                        <span className="ml-2 px-2 py-0.5 bg-primary/10 rounded-full text-primary">
                                                            Day {collage[1].day}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-center mb-4 max-h-[50vh]">
                                                        <img
                                                            src={collage[1].image}
                                                            alt={collage[1].title}
                                                            className="max-w-full max-h-full object-contain rounded-lg"
                                                        />
                                                    </div>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {collage[1].description}
                                                    </p>
                                                </DialogContent>
                                            </Dialog>
                                        )}

                                        {/* Bottom row images */}
                                        {[2, 3, 4].map((idx) => collage[idx] && (
                                            <Dialog key={collage[idx].id}>
                                                <DialogTrigger asChild>
                                                    <button className="col-span-4 row-span-5 rounded-2xl overflow-hidden group relative focus:outline-none focus:ring-4 focus:ring-primary">
                                                        <img
                                                            src={collage[idx].image}
                                                            alt={collage[idx].title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                                        <div className="absolute bottom-3 left-3 right-3">
                                                            <span className="inline-block mb-1 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                                                                Day {collage[idx].day}
                                                            </span>
                                                            <h3 className="text-white font-bold text-xs drop-shadow-lg line-clamp-1">
                                                                {collage[idx].title}
                                                            </h3>
                                                        </div>
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] p-6 overflow-y-auto">
                                                    <DialogTitle className="text-2xl md:text-3xl font-serif font-bold mb-3">
                                                        {collage[idx].title}
                                                    </DialogTitle>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{collage[idx].location}</span>
                                                        <span className="ml-2 px-2 py-0.5 bg-primary/10 rounded-full text-primary">
                                                            Day {collage[idx].day}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-center mb-4 max-h-[50vh]">
                                                        <img
                                                            src={collage[idx].image}
                                                            alt={collage[idx].title}
                                                            className="max-w-full max-h-full object-contain rounded-lg"
                                                        />
                                                    </div>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {collage[idx].description}
                                                    </p>
                                                </DialogContent>
                                            </Dialog>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-4 rounded-full shadow-xl transition-all hover:scale-110 backdrop-blur-sm z-20"
                            aria-label="Previous collage"
                        >
                            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-gray-900" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-4 rounded-full shadow-xl transition-all hover:scale-110 backdrop-blur-sm z-20"
                            aria-label="Next collage"
                        >
                            <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-900" />
                        </button>

                        {/* Controls */}
                        <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6 flex items-center justify-between z-20">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="bg-white/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg">
                                    <span className="text-gray-900 text-xs md:text-sm font-medium">
                                        {currentCollage + 1} / {collages.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 mt-6 md:mt-8">
                        {collages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setIsPlaying(false)
                                    setCurrentCollage(idx)
                                }}
                                className={`h-1.5 md:h-2 rounded-full transition-all ${idx === currentCollage
                                    ? "w-6 md:w-8 bg-primary"
                                    : "w-1.5 md:w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                                aria-label={`Go to collage ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Reflection Paper Section */}
            <div className="bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-pink-50/50 dark:from-gray-900/50 dark:via-purple-900/10 dark:to-blue-900/10 py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-8 md:mb-12">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-primary font-medium text-sm">Academic Documentation</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
                            Reflection Paper
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                            Personal insights and learnings from the educational journey
                        </p>
                    </div>

                    {/* Reflection Pages Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {reflectionPages.map((page) => (
                            <Dialog key={page.id}>
                                <DialogTrigger asChild>
                                    <button className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary transition-all shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary">
                                        <div className="aspect-[3/4] relative">
                                            <img
                                                src={page.image}
                                                alt={page.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            {/* Page Number Badge */}
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg">
                                                <span className="text-sm md:text-base font-bold text-primary">{page.pageNumber}</span>
                                            </div>

                                            {/* Title Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                                                <h3 className="text-white font-bold text-base md:text-lg mb-1 drop-shadow-lg">
                                                    {page.title}
                                                </h3>
                                                <p className="text-white/80 text-xs md:text-sm">Page {page.pageNumber} of {reflectionPages.length}</p>
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium bg-black/50 px-4 py-2 rounded-lg text-sm">
                                                    Click to read
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-4 md:p-6 overflow-y-auto">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-primary/10 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                            <span className="text-base md:text-lg font-bold text-primary">{page.pageNumber}</span>
                                        </div>
                                        <div>
                                            <DialogTitle className="text-xl md:text-2xl font-serif font-bold">
                                                {page.title}
                                            </DialogTitle>
                                            <p className="text-xs md:text-sm text-muted-foreground">
                                                Page {page.pageNumber} of {reflectionPages.length}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center max-h-[70vh]">
                                        <img
                                            src={page.image}
                                            alt={page.title}
                                            className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 md:py-12 px-4 md:px-6 border-t border-border">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-xs md:text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Eliza Marie Abing. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    )
}