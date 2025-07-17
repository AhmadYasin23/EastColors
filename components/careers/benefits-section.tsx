"use client"

import { Shield, Heart, GraduationCap, Car, Coffee, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function BenefitsSection() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: "المزايا والحوافز",
      subtitle: "نهتم بموظفينا ونوفر لهم أفضل المزايا",
      benefits: [
        {
          icon: Shield,
          title: "التأمين الصحي",
          description: "تأمين صحي شامل للموظف وعائلته",
        },
        {
          icon: GraduationCap,
          title: "التدريب والتطوير",
          description: "برامج تدريبية مستمرة ودورات تطوير مهني",
        },
        {
          icon: Calendar,
          title: "إجازات مرنة",
          description: "نظام إجازات مرن يراعي احتياجات الموظفين",
        },
        {
          icon: Car,
          title: "بدل مواصلات",
          description: "بدل مواصلات شهري أو توفير مواصلات الشركة",
        },
        {
          icon: Coffee,
          title: "بيئة عمل مريحة",
          description: "مكاتب حديثة ومريحة مع جميع وسائل الراحة",
        },
        {
          icon: Heart,
          title: "توازن الحياة",
          description: "ساعات عمل مرنة وإمكانية العمل عن بُعد",
        },
      ],
    },
    en: {
      title: "Benefits & Perks",
      subtitle: "We care about our employees and provide them with the best benefits",
      benefits: [
        {
          icon: Shield,
          title: "Health Insurance",
          description: "Comprehensive health insurance for employee and family",
        },
        {
          icon: GraduationCap,
          title: "Training & Development",
          description: "Continuous training programs and professional development courses",
        },
        {
          icon: Calendar,
          title: "Flexible Leave",
          description: "Flexible leave system that considers employees' needs",
        },
        {
          icon: Car,
          title: "Transportation Allowance",
          description: "Monthly transportation allowance or company transportation",
        },
        {
          icon: Coffee,
          title: "Comfortable Work Environment",
          description: "Modern and comfortable offices with all amenities",
        },
        {
          icon: Heart,
          title: "Work-Life Balance",
          description: "Flexible working hours and remote work options",
        },
      ],
    },
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
          {content[language].benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
