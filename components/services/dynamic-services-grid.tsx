"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import * as Icons from "lucide-react"

interface Service {
  _id: string
  title: { ar: string; en: string }
  slug: { current: string }
  description: { ar: string; en: string }
  icon: string
  features: { ar: string[]; en: string[] }
  image?: any
  featured: boolean
}

export function DynamicServicesGrid() {
  const { language } = useLanguage()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  const content = {
    ar: {
      cta: "اطلب الخدمة",
      learnMore: "اعرف المزيد",
    },
    en: {
      cta: "Request Service",
      learnMore: "Learn More",
    },
  }

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/sanity/services")
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="border-0 shadow-lg animate-pulse">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            // Get the icon component dynamically
            const IconComponent = (Icons as any)[service.icon] || Icons.Star

            return (
              <Card
                key={service._id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {language === "ar" ? service.title.ar : service.title.en}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    {language === "ar" ? service.description.ar : service.description.en}
                  </p>

                  {service.features && service.features[language] && (
                    <ul className="space-y-2">
                      {service.features[language].slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Link href={`/services/${service.slug.current}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        {content[language].learnMore}
                      </Button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700">
                        {content[language].cta}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
