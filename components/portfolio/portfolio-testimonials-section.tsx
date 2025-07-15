"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function PortfolioTestimonialsSection() {
  const { language } = useLanguage()
  // Remove the local useState

  const testimonials = {
    ar: [
      {
        name: "شركة النور",
        text: "عمل احترافي ونتائج باهرة. فاقت توقعاتنا!",
      },
      {
        name: "مطاعم الذوق",
        text: "تصاميم رائعة وجودة عالية في التنفيذ.",
      },
    ],
    en: [
      {
        name: "Al Noor Co.",
        text: "Professional work and stunning results. Exceeded expectations!",
      },
      {
        name: "Fine Taste Restaurants",
        text: "Great designs and top-notch production quality.",
      },
    ],
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" dir={language === "ar" ? "rtl" : "ltr"}>
          {language === "ar" ? "آراء عملائنا" : "Client Feedback"}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials[language].map((t, i) => (
            <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-pink-500 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-4" dir={language === "ar" ? "rtl" : "ltr"}>
                  “{t.text}”
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="font-bold">{t.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
