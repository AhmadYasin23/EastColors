"use client"

import { Users, Handshake, Award, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ClientsHeroSection() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: "عملاؤنا الذين نفخر بهم",
      subtitle: "شراكات نجاح تمتد لسنوات",
      description:
        "على مدار أكثر من 15 عامًا، تشرفنا بالعمل مع مجموعة متنوعة من العملاء المميزين من مختلف القطاعات. كل عميل يمثل قصة نجاح وشراكة استراتيجية ساهمت في نمو أعمالهم وتعزيز هويتهم البصرية.",
      stats: [
        { icon: Users, number: "200+", label: "عميل راضي" },
        { icon: Handshake, number: "15+", label: "سنة من الشراكات" },
        { icon: Award, number: "500+", label: "مشروع ناجح" },
        { icon: TrendingUp, number: "95%", label: "معدل رضا العملاء" },
      ],
    },
    en: {
      title: "Clients We're Proud to Work With",
      subtitle: "Success partnerships spanning years",
      description:
        "Over more than 15 years, we've had the honor of working with a diverse group of distinguished clients from various sectors. Each client represents a success story and strategic partnership that contributed to their business growth and brand identity enhancement.",
      stats: [
        { icon: Users, number: "200+", label: "Happy Clients" },
        { icon: Handshake, number: "15+", label: "Years of Partnerships" },
        { icon: Award, number: "500+", label: "Successful Projects" },
        { icon: TrendingUp, number: "95%", label: "Client Satisfaction Rate" },
      ],
    },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-pink-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16" dir={language === "ar" ? "rtl" : "ltr"}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{content[language].title}</h1>
          <p className="text-xl opacity-90">{content[language].subtitle}</p>
        </div>


      </div>
    </section>
  )
}
