"use client";
import { Monitor, Printer, Palette, Layout } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function ProductionHeroSection() {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "خدمات الإنتاج",
      subtitle: "حلول إنتاجية متكاملة لتلبية جميع احتياجات علامتك التجارية",
      highlights: [
        { icon: Monitor, text: "لوحات إعلانية عالية الجودة" },
        { icon: Printer, text: "طباعة رقمية كبيرة الحجم بألوان زاهية" },
        { icon: Layout, text: "ستاندات عرض مخصصة" },
        { icon: Palette, text: "تصميم هوية بصرية متكاملة" },
      ],
    },
    en: {
      title: "Production Services",
      subtitle: "Comprehensive production solutions for your brand needs",
      highlights: [
        { icon: Monitor, text: "High-quality advertising billboards" },
        { icon: Printer, text: "Large-format vibrant digital printing" },
        { icon: Layout, text: "Custom display stands" },
        { icon: Palette, text: "Complete brand identity design" },
      ],
    },
  };

  return (
    <section className="py-16 bg-gradient-to-br from-pink-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {content[language].title}
        </h1>
        <p className="text-xl mb-12 text-center opacity-90 max-w-3xl mx-auto">
          {content[language].subtitle}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content[language].highlights.map((h, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <h.icon className="w-8 h-8" />
              </div>
              <p className="text-lg">{h.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
