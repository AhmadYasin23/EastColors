"use client"

import { Users, Briefcase, Award, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function CareersHeroSection() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: "انضم إلى فريق ألوان الشرق",
      subtitle: "كن جزءًا من رحلة الإبداع والنجاح",
      description:
        "نحن نبحث عن المواهب المبدعة والمتحمسة للانضمام إلى فريقنا المتنامي. في ألوان الشرق، نؤمن بأن الموظفين هم أساس نجاحنا، ونوفر بيئة عمل محفزة تساعدك على تحقيق إمكاناتك الكاملة.",
      stats: [
        { icon: Users, number: "50+", label: "موظف متخصص" },
        { icon: Briefcase, number: "15+", label: "قسم متنوع" },
        { icon: Award, number: "95%", label: "رضا الموظفين" },
        { icon: TrendingUp, number: "25%", label: "نمو سنوي" },
      ],
    },
    en: {
      title: "Join the East Colors Team",
      subtitle: "Be part of our journey of creativity and success",
      description:
        "We are looking for creative and passionate talents to join our growing team. At East Colors, we believe that employees are the foundation of our success, and we provide a stimulating work environment that helps you reach your full potential.",
      stats: [
        { icon: Users, number: "50+", label: "Specialized Employees" },
        { icon: Briefcase, number: "15+", label: "Diverse Departments" },
        { icon: Award, number: "95%", label: "Employee Satisfaction" },
        { icon: TrendingUp, number: "25%", label: "Annual Growth" },
      ],
    },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-pink-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16" dir={language === "ar" ? "rtl" : "ltr"}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{content[language].title}</h1>
          <p className="text-xl mb-4 opacity-90">{content[language].subtitle}</p>
          <p className="text-lg opacity-80 leading-relaxed">{content[language].description}</p>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content[language].stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}
