"use client"

import { Brain, PencilRuler, Hammer, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ServiceProcessSection() {
  const { language } = useLanguage()
  // Remove the local useState

  const steps = {
    ar: [
      { icon: Brain, title: "الاستشارة", desc: "نفهم رؤيتك وأهداف مشروعك." },
      { icon: PencilRuler, title: "التصميم", desc: "نحوّل الأفكار إلى تصاميم إبداعية." },
      { icon: Hammer, title: "الإنتاج", desc: "ننفذ العمل بأحدث المعدات لضمان الجودة." },
      { icon: CheckCircle, title: "التركيب والتسليم", desc: "نركِّب المنتج ونتأكد من رضاك التام." },
    ],
    en: [
      { icon: Brain, title: "Consultation", desc: "We learn your vision and project goals." },
      { icon: PencilRuler, title: "Design", desc: "Transform ideas into creative designs." },
      { icon: Hammer, title: "Production", desc: "Execute with state-of-the-art equipment." },
      { icon: CheckCircle, title: "Install & Deliver", desc: "On-site installation and satisfaction check." },
    ],
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps[language].map((st, i) => (
            <div key={i} className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 flex items-center justify-center">
                <st.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{st.title}</h3>
              <p className="text-gray-600">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
