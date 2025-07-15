"use client"

import { useState } from "react"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  const [language] = useState<"ar" | "en">("ar")

  const content = {
    ar: {
      title: "آراء عملائنا",
      subtitle: "ما يقوله عملاؤنا عن خدماتنا",
      testimonials: [
        {
          name: "أحمد محمد",
          company: "شركة النور التجارية",
          text: "خدمة ممتازة وجودة عالية في التنفيذ. فريق محترف ومتعاون، وأسعار مناسبة. أنصح بالتعامل معهم.",
          rating: 5,
        },
        {
          name: "فاطمة العلي",
          company: "مطاعم الذوق الرفيع",
          text: "تعاملت معهم في تصميم هوية مطاعمنا واللوحات الإعلانية. النتيجة فاقت توقعاتي بكثير.",
          rating: 5,
        },
        {
          name: "خالد السعد",
          company: "مجموعة الخليج للاستثمار",
          text: "شركة موثوقة وملتزمة بالمواعيد. جودة العمل عالية والأسعار تنافسية. تجربة ممتازة.",
          rating: 5,
        },
      ],
    },
    en: {
      title: "Client Testimonials",
      subtitle: "What our clients say about our services",
      testimonials: [
        {
          name: "Ahmed Mohammed",
          company: "Al Noor Trading Company",
          text: "Excellent service and high quality execution. Professional and cooperative team, with reasonable prices. I recommend dealing with them.",
          rating: 5,
        },
        {
          name: "Fatima Al Ali",
          company: "Fine Taste Restaurants",
          text: "I worked with them on designing our restaurant identity and signage. The result exceeded my expectations by far.",
          rating: 5,
        },
        {
          name: "Khalid Al Saad",
          company: "Gulf Investment Group",
          text: "A reliable company that is committed to deadlines. High quality work and competitive prices. Excellent experience.",
          rating: 5,
        },
      ],
    },
  }

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content[language].subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content[language].testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-pink-500 mb-4" />
                </div>

                <p className="text-gray-600 leading-relaxed mb-6" dir={language === "ar" ? "rtl" : "ltr"}>
                  "{testimonial.text}"
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
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
