"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useLanguage } from "@/contexts/language-context"

export function AboutTeamSection() {
  const { language } = useLanguage()

  const members = [
    { nameAr: "محمد القحطاني", nameEn: "Mohammed Al-Qahtani", roleAr: "المدير التنفيذي", roleEn: "CEO" },
    { nameAr: "سارة العمري", nameEn: "Sarah Al-Amri", roleAr: "مديرة الإبداع", roleEn: "Creative Director" },
    { nameAr: "علي الدوسري", nameEn: "Ali Al-Dosari", roleAr: "رئيس الإنتاج", roleEn: "Head of Production" },
    { nameAr: "ريم البشير", nameEn: "Reem Al-Bashir", roleAr: "مديرة التسويق", roleEn: "Marketing Manager" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold mb-12 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {language === "ar" ? "فريقنا" : "Our Team"}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((m, i) => (
            <Card key={i} className="border-0 shadow-lg text-center">
              <CardContent className="p-6 space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={`/placeholder.svg?height=96&width=96&query=person-${i}`} alt={m.nameEn} />
                  <AvatarFallback>{m.nameEn[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">{language === "ar" ? m.nameAr : m.nameEn}</h3>
                <p className="text-pink-600">{language === "ar" ? m.roleAr : m.roleEn}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
