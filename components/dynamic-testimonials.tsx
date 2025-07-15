"use client"

import { useEffect, useState } from "react"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

interface Testimonial {
  id: number
  client_name_ar: string
  client_name_en: string
  company_ar: string
  company_en: string
  testimonial_ar: string
  testimonial_en: string
  rating: number
}

export function DynamicTestimonials() {
  const { language } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials")
        const data = await response.json()
        setTestimonials(data)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const content = {
    ar: {
      title: "آراء عملائنا",
      subtitle: "ما يقوله عملاؤنا عن خدماتنا",
    },
    en: {
      title: "Client Testimonials",
      subtitle: "What our clients say about our services",
    },
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
            <p className="text-xl text-gray-600">{content[language].subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-lg animate-pulse">
                <CardContent className="p-8">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content[language].subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-pink-500 mb-4" />
                </div>

                <p className="text-gray-600 leading-relaxed mb-6" dir={language === "ar" ? "rtl" : "ltr"}>
                  "{language === "ar" ? testimonial.testimonial_ar : testimonial.testimonial_en}"
                </p>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div
                  className={`${language === "ar" ? "text-right" : "text-left"}`}
                  dir={language === "ar" ? "rtl" : "ltr"}
                >
                  <h4 className="font-bold text-gray-900">
                    {language === "ar" ? testimonial.client_name_ar : testimonial.client_name_en}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === "ar" ? testimonial.company_ar : testimonial.company_en}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
