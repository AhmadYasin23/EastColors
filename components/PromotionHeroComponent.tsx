"use client";
import { Gift, Megaphone, Camera, Film } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function PromotionsHeroSection() {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "خدمات الترويج",
      subtitle: "حلول ترويجية مبتكرة لتعزيز وصول علامتك التجارية",
      highlights: [
        { icon: Gift, text: "هدايا دعائية مخصصة" },
        { icon: Megaphone, text: "حملات إعلانية فعالة" },
        { icon: Camera, text: "تصوير فوتوغرافي احترافي" },
        { icon: Film, text: "إنتاج فيديوهات ترويجية عالية الجودة" },
      ],
    },
    en: {
      title: "Promotions Services",
      subtitle: "Innovative promotional solutions to boost your brand reach",
      highlights: [
        { icon: Gift, text: "Custom promotional gifts" },
        { icon: Megaphone, text: "Effective advertising campaigns" },
        { icon: Camera, text: "Professional photography" },
        { icon: Film, text: "High-quality promotional video production" },
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
