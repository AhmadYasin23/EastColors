"use client"

import { useLanguage } from "@/contexts/language-context"
import { Camera, GalleryVerticalEnd } from "lucide-react"

export function PortfolioHeroSection() {
  const { language } = useLanguage()
  // Remove the local useState

  const content = {
    ar: {
      title: "معرض الأعمال",
      subtitle: "مشاريع نفخر بإنجازها",
      highlight1: "2000+ مشروع مكتمل",
      highlight2: "عملاء من مختلف قطاعات مختلفة",
    },
    en: {
      title: "Our Portfolio",
      subtitle: "Projects we are proud to have delivered",
      highlight1: "2000+ Projects Completed",
      highlight2: "Clients from multiple industries",
    },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 to-pink-500 text-white">
      <div className="container mx-auto px-4 text-center space-y-6">
        <Camera className="w-12 h-12 mx-auto" />
        <h1 className="text-4xl md:text-5xl font-bold">{content[language].title}</h1>
        <p className="text-xl opacity-90">{content[language].subtitle}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
          <div className="flex items-center gap-3">
            <GalleryVerticalEnd className="w-6 h-6" />
            <span className="font-semibold">{content[language].highlight1}</span>
          </div>
          <div className="flex items-center gap-3">
            <GalleryVerticalEnd className="w-6 h-6" />
            <span className="font-semibold">{content[language].highlight2}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
