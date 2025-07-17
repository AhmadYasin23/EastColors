"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function CompanyCultureSection() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: "ثقافة الشركة",
      subtitle: "القيم التي نؤمن بها ونعيشها يوميًا",
      values: [
        {
          title: "الإبداع والابتكار",
          description: "نشجع التفكير خارج الصندوق ونحتفي بالأفكار الجديدة",
          image: "/placeholder.svg?height=300&width=400&text=Innovation",
        },
        {
          title: "العمل الجماعي",
          description: "نؤمن بقوة الفريق ونعمل معًا لتحقيق أهدافنا المشتركة",
          image: "/placeholder.svg?height=300&width=400&text=Teamwork",
        },
        {
          title: "التطوير المستمر",
          description: "نستثمر في تطوير مهارات موظفينا ونمو الشركة",
          image: "/placeholder.svg?height=300&width=400&text=Development",
        },
        {
          title: "الجودة والتميز",
          description: "نسعى للتميز في كل ما نقوم به ونلتزم بأعلى معايير الجودة",
          image: "/placeholder.svg?height=300&width=400&text=Excellence",
        },
      ],
    },
    en: {
      title: "Company Culture",
      subtitle: "The values we believe in and live by every day",
      values: [
        {
          title: "Creativity & Innovation",
          description: "We encourage thinking outside the box and celebrate new ideas",
          image: "/placeholder.svg?height=300&width=400&text=Innovation",
        },
        {
          title: "Teamwork",
          description: "We believe in the power of teams and work together to achieve our common goals",
          image: "/placeholder.svg?height=300&width=400&text=Teamwork",
        },
        {
          title: "Continuous Development",
          description: "We invest in developing our employees' skills and company growth",
          image: "/placeholder.svg?height=300&width=400&text=Development",
        },
        {
          title: "Quality & Excellence",
          description: "We strive for excellence in everything we do and commit to the highest quality standards",
          image: "/placeholder.svg?height=300&width=400&text=Excellence",
        },
      ],
    },
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

        <div className="grid md:grid-cols-2 gap-8">
          {content[language].values.map((value, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img src={value.image || "/placeholder.svg"} alt={value.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">{value.description}</p>
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
