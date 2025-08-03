"use client"

import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

interface Client {
  _id: string
  name: string
  testimonial?: {
    quote?: { ar: string; en: string }
    author?: string
    position?: string
  }
}

export function ClientsTestimonialsSection() {
  const { language } = useLanguage()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  const content = {
    ar: {
      title: "ما يقوله عملاؤنا",
      subtitle: "شهادات حقيقية من عملائنا المميزين",
    },
    en: {
      title: "What Our Clients Say",
      subtitle: "Real testimonials from our valued clients",
    },
  }

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch("/api/sanity/clients")
        const data = await response.json()
        // Filter clients that have testimonials
        const clientsWithTestimonials = data.filter((client: Client) => client.testimonial?.quote?.[language])
        setClients(clientsWithTestimonials)
      } catch (error) {
        console.error("Error fetching clients:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [language])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
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

  if (clients.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content[language].subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.slice(0, 6).map((client) => (
            <Card key={client._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-pink-500 mb-4" />
                </div>

                <p className="text-gray-600 leading-relaxed mb-6" dir={language === "ar" ? "rtl" : "ltr"}>
                  "{client.testimonial?.quote?.[language]}"
                </p>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div
                  className={`${language === "ar" ? "text-right" : "text-left"}`}
                  dir={language === "ar" ? "rtl" : "ltr"}
                >
                  <h4 className="font-bold text-gray-900">{client.testimonial?.author || client.name}</h4>
                  {client.testimonial?.position && (
                    <p className="text-sm text-gray-600">{client.testimonial.position}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">{client.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
