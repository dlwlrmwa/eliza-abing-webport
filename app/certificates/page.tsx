"use client"

import { Calendar } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog"

type Certificate = {
    id: string
    title: string
    issuer: string
    date: string
    description: string
    link?: string
    image?: string
}

const certificates: Certificate[] = [
    {
        id: "1",
        title: "Certificate of Completion",
        issuer: "WATT - World of Adventures Travel and Tours",
        date: "2025-11-22",
        description:
            "My active particiation and completion of the Educational Tour in Cebu and Bohol last November 19-22, 2025.",
        image: "/certs/eli-watt-certificate.png",
    },
    {
        id: "2",
        title: "Information Management",
        issuer: "CODECHUM",
        date: "2025-05-19",
        description:
            "This certificate verifies my completion of the Information Management course covering data organization, systems, and security practices under the CC105 course.",
        image: "/certs/eli-CC105-certificate.png",
    },
]

function formatDate(dateString: string) {
    try {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    } catch (e) {
        return dateString
    }
}

export default function CertificatesPage() {
    return (
        <main className="min-h-screen pt-16">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
                        Certificates
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A visual collection of my training and verified certificates.
                    </p>
                </div>

                <div className="space-y-8">
                    {certificates.map((c) => (
                        <article
                            key={c.id}
                            className="relative group p-6 sm:p-8 bg-card rounded-2xl border border-border hover:border-primary transition-all hover:shadow-lg cursor-pointer sm:pr-28"
                        >
                            {/* Thumbnail top-right */}
                            {c.image && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <img
                                            src={c.image}
                                            alt="certificate preview"
                                            className="hidden sm:block absolute top-4 right-4 w-20 h-20 object-cover rounded-md shadow cursor-pointer opacity-90 hover:opacity-100 transition z-20"
                                            title="View photo"
                                        />
                                    </DialogTrigger>

                                    {/* Mobile: make the whole card tappable to open dialog */}
                                    <DialogTrigger asChild>
                                        <button
                                            aria-label={`View ${c.title} certificate`}
                                            className="absolute inset-0 sm:hidden bg-transparent z-10 cursor-pointer"
                                        />
                                    </DialogTrigger>

                                    {/* Desktop: make the whole card clickable on sm+ */}
                                    <DialogTrigger asChild>
                                        <button
                                            aria-label={`View ${c.title} certificate`}
                                            className="absolute inset-0 hidden sm:block bg-transparent z-10 cursor-pointer"
                                        />
                                    </DialogTrigger>
                                    <DialogContent className="p-0 w-full max-w-[95vw] max-h-[92vh] sm:max-w-[900px] sm:max-h-[90vh]">
                                        <DialogTitle className="sr-only">
                                            {c.title} — {c.issuer}
                                        </DialogTitle>
                                        <div className="flex items-center justify-center w-full h-full p-4">
                                            <img
                                                src={c.image}
                                                alt={`Full view of ${c.title}`}
                                                className="w-full h-auto max-h-[85vh] sm:max-h-[80vh] object-contain rounded-lg"
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <time dateTime={c.date}>{formatDate(c.date)}</time>
                                </div>
                                <div className="ml-0 text-sm">
                                    <span className="font-medium text-foreground">{c.issuer}</span>
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3 text-foreground group-hover:text-primary transition-colors cursor-pointer">
                                {c.title}
                            </h2>

                            <p className="text-muted-foreground leading-relaxed mb-4">{c.description}</p>

                            <span className="text-primary font-medium cursor-pointer">Click the card to view certificate</span>
                        </article>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-border mt-19">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Eliza Marie Abing. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    )
}