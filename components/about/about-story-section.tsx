"use client"

import { useLanguage } from "@/contexts/language-context"

export function AboutStorySection() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: "قصتنا",
      text: `تأسست ألوان الشرق عام 2018 برؤية واضحة لدمج الإبداع بالتقنية.
منذ انطلاقنا، حرصنا على تقديم حلول إعلانية مبتكرة تجعل عملاءنا يتصدرون المشهد.
لقد نمونا من ورشة صغيرة إلى فريق متكامل يضم مصممين، فنيين، ومهندسي إنتاج،
معتمدين على أحدث الآلات لضمان أعلى مستويات الجودة.`,
    },
    en: {
      title: "Our Story",
      text: `East Colors was founded in 2018 with a clear vision: fuse creativity with technology.
Since day one we’ve delivered innovative advertising solutions that help our clients stand out.
We have grown from a small workshop into a fully-fledged team of designers, technicians,
and production engineers, all leveraging state-of-the-art machinery to guarantee top quality.`,
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2
          className={`text-3xl font-bold mb-6 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {content[language].title}
        </h2>
        <p
          className="text-lg leading-relaxed text-gray-700 whitespace-pre-line"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {content[language].text}
        </p>
      </div>
    </section>
  )
}
