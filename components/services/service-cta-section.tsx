"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function ServiceCtaSection() {
  const { language } = useLanguage()
  // Remove the local useState

  const content = {
    ar: {
      title: "جاهز لبدء مشروعك القادم؟",
      subtitle: "دعنا نحول أفكارك إلى واقع ملموس",
      cta: "تواصل معنا الآن",
    },
    en: {
      title: "Ready to start your next project?",
      subtitle: "Let’s turn your ideas into reality",
      cta: "Contact us now",
    },
  }

  return (
    <section className="py-20 bg-gradient-to-r from-pink-500 to-indigo-600 text-white text-center">
      <div className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">{content[language].title}</h2>
        <p className="text-xl opacity-90">{content[language].subtitle}</p>
        <Link href="/contact">
          <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
            {content[language].cta}
            <ArrowRight className={`w-6 h-6 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
          </Button>
        </Link>
      </div>
    </section>
  )
}
