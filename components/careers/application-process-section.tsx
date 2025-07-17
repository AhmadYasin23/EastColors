"use client"

import Link from "next/link"
import { FileText, Send, Phone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function ApplicationProcessSection() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: "كيفية التقديم",
      subtitle: "خطوات بسيطة للانضمام إلى فريقنا",
      cta: {
        title: "هل أنت مستعد للانضمام إلينا؟",
        subtitle: "أرسل سيرتك الذاتية اليوم وكن جزءًا من قصة نجاحنا",
        button: "أرسل سيرتك الذاتية",
        contact: "أو تواصل معنا مباشرة",
      },
      steps: [
        {
          icon: FileText,
          title: "أرسل سيرتك الذاتية",
          description: "أرسل سيرتك الذاتية ورسالة تعريفية عبر البريد الإلكتروني",
        },
        {
          icon: Send,
          title: "مراجعة الطلب",
          description: "سيقوم فريق الموارد البشرية بمراجعة طلبك خلال 3-5 أيام عمل",
        },
        {
          icon: Phone,
          title: "المقابلة الشخصية",
          description: "إذا تم قبول طلبك، سنتواصل معك لترتيب مقابلة شخصية",
        },
        {
          icon: CheckCircle,
          title: "القرار النهائي",
          description: "سنخبرك بالقرار النهائي خلال أسبوع من المقابلة",
        },
      ],
    },
    en: {
      title: "How to Apply",
      subtitle: "Simple steps to join our team",
      cta: {
        title: "Ready to Join Us?",
        subtitle: "Send your CV today and be part of our success story",
        button: "Send Your CV",
        contact: "Or contact us directly",
      },
      steps: [
        {
          icon: FileText,
          title: "Send Your CV",
          description: "Send your CV and cover letter via email",
        },
        {
          icon: Send,
          title: "Application Review",
          description: "HR team will review your application within 3-5 business days",
        },
        {
          icon: Phone,
          title: "Interview",
          description: "If your application is accepted, we'll contact you to arrange an interview",
        },
        {
          icon: CheckCircle,
          title: "Final Decision",
          description: "We'll inform you of the final decision within a week of the interview",
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

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {content[language].steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">{content[language].cta.title}</h3>
            <p className="text-xl mb-8 opacity-90">{content[language].cta.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="mailto:careers@eastcolors.sa">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 font-semibold">
                  {content[language].cta.button}
                </Button>
              </Link>

              <div className="text-center">
                <p className="text-sm opacity-80 mb-2">{content[language].cta.contact}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+966501234567" className="text-white hover:text-gray-200 font-semibold">
                    📞 +966 50 123 4567
                  </a>
                  <a href="mailto:careers@eastcolors.sa" className="text-white hover:text-gray-200 font-semibold">
                    ✉️ careers@eastcolors.sa
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
