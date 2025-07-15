"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PortfolioSection() {
  const [language] = useState<"ar" | "en">("ar")

  const content = {
    ar: {
      title: "معرض أعمالنا",
      subtitle: "مشاريع نفخر بإنجازها",
      viewMore: "عرض المزيد",
      categories: ["الكل", "لوحات رقمية", "طباعة", "تصميم", "لافتات"],
    },
    en: {
      title: "Our Portfolio",
      subtitle: "Projects we are proud to have accomplished",
      viewMore: "View More",
      categories: ["All", "Digital Signage", "Printing", "Design", "Signage"],
    },
  }

  const projects = [
    { id: 1, category: "digital", image: "/placeholder.svg?height=300&width=400" },
    { id: 2, category: "printing", image: "/placeholder.svg?height=300&width=400" },
    { id: 3, category: "design", image: "/placeholder.svg?height=300&width=400" },
    { id: 4, category: "signage", image: "/placeholder.svg?height=300&width=400" },
    { id: 5, category: "digital", image: "/placeholder.svg?height=300&width=400" },
    { id: 6, category: "printing", image: "/placeholder.svg?height=300&width=400" },
  ]

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content[language].subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`Project ${project.id}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button className="w-full bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                        {content[language].viewMore}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
