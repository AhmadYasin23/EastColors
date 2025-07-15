"use client"

import { Award, Target, Users, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function AboutValuesSection() {
  const { language } = useLanguage()
  // Remove the local useState

  const values = {
    ar: [
      { icon: Award, title: "الجودة", text: "نلتزم بأعلى معايير الجودة في كل عمل." },
      { icon: Target, title: "الدقة", text: "نركز على التفاصيل ونحترم المواعيد." },
      { icon: Users, title: "العملاء أولاً", text: "نضع احتياجات عملائنا في المقدمة دائماً." },
      { icon: Zap, title: "الابتكار", text: "نبحث باستمرار عن أفكار وحلول إبداعية." },
    ],
    en: [
      { icon: Award, title: "Quality", text: "We adhere to the highest quality standards." },
      { icon: Target, title: "Precision", text: "Detail-oriented with on-time delivery." },
      { icon: Users, title: "Client-Centric", text: "Our clients’ needs always come first." },
      { icon: Zap, title: "Innovation", text: "Constantly seeking creative solutions." },
    ],
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values[language].map((v, i) => (
            <Card key={i} className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 flex items-center justify-center">
                  <v.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
