"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

type Category = "all" | "digital" | "printing" | "design" | "signage"

const sampleProjects = [
  { id: 1, cat: "digital" as Category },
  { id: 2, cat: "printing" as Category },
  { id: 3, cat: "design" as Category },
  { id: 4, cat: "signage" as Category },
  { id: 5, cat: "digital" as Category },
  { id: 6, cat: "printing" as Category },
]

export function PortfolioGridSection() {
  const { language } = useLanguage()
  // Remove the local useState
  const [activeCat, setActiveCat] = useState<Category>("all")

  const categories = {
    ar: [
      { key: "all", label: "الكل" },
      { key: "digital", label: "لوحات رقمية" },
      { key: "printing", label: "طباعة" },
      { key: "design", label: "تصميم" },
      { key: "signage", label: "لافتات" },
    ],
    en: [
      { key: "all", label: "All" },
      { key: "digital", label: "Digital" },
      { key: "printing", label: "Printing" },
      { key: "design", label: "Design" },
      { key: "signage", label: "Signage" },
    ],
  }

  const filtered = useMemo(
    () => (activeCat === "all" ? sampleProjects : sampleProjects.filter((p) => p.cat === activeCat)),
    [activeCat],
  )

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" dir={language === "ar" ? "rtl" : "ltr"}>
          {categories[language].map((c) => (
            <Button
              key={c.key}
              variant={activeCat === c.key ? "default" : "outline"}
              className="capitalize"
              onClick={() => setActiveCat(c.key as Category)}
            >
              {c.label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <Card
              key={project.id}
              className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <CardContent className="p-0">
                <img
                  src={`/placeholder.svg?height=400&width=500&query=${project.cat}-${project.id}`}
                  alt={`Project #${project.id}`}
                  className="w-full h-60 object-cover group-hover:scale-110 transition-transform"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
