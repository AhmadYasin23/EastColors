"use client"

import { Lightbulb, Users, Trophy, Rocket, Heart, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function WhyWorkWithUsSection() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: "لماذا تعمل معنا؟",
      subtitle: "اكتشف ما يجعل ألوان الشرق مكان عمل مميز",
      reasons: [
        {
          icon: Lightbulb,
          title: "بيئة إبداعية",
          description: "نشجع الأفكار الجديدة والحلول المبتكرة في جميع مشاريعنا",
        },
        {
          icon: Users,
          title: "فريق متعاون",
          description: "نعمل كفريق واحد متماسك يدعم بعضه البعض لتحقيق النجاح",
        },
        {
          icon: Trophy,
          title: "فرص التطوير",
          description: "نوفر برامج تدريبية وفرص تطوير مهني مستمرة لموظفينا",
        },
        {
          icon: Rocket,
          title: "نمو مهني سريع",
          description: "مسارات وظيفية واضحة وفرص ترقية سريعة للمتميزين",
        },
        {
          icon: Heart,
          title: "توازن الحياة",
          description: "نؤمن بأهمية التوازن بين العمل والحياة الشخصية",
        },
        {
          icon: Globe,
          title: "مشاريع متنوعة",
          description: "فرصة للعمل على مشاريع متنوعة مع عملاء من مختلف القطاعات",
        },
      ],
    },
    en: {
      title: "Why Work With Us?",
      subtitle: "Discover what makes East Colors a special place to work",
      reasons: [
        {
          icon: Lightbulb,
          title: "Creative Environment",
          description: "We encourage new ideas and innovative solutions in all our projects",
        },
        {
          icon: Users,
          title: "Collaborative Team",
          description: "We work as one cohesive team that supports each other to achieve success",
        },
        {
          icon: Trophy,
          title: "Development Opportunities",
          description: "We provide training programs and continuous professional development opportunities",
        },
        {
          icon: Rocket,
          title: "Fast Career Growth",
          description: "Clear career paths and rapid promotion opportunities for high performers",
        },
        {
          icon: Heart,
          title: "Work-Life Balance",
          description: "We believe in the importance of balancing work and personal life",
        },
        {
          icon: Globe,
          title: "Diverse Projects",
          description: "Opportunity to work on diverse projects with clients from various sectors",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content[language].reasons.map((reason, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
