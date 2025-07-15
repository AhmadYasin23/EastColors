"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function ContactHeroSection() {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "اتصل بنا",
      subtitle: "نحن هنا لمساعدتك في تحقيق رؤيتك",
      description: "تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك القادم",
      quickContact: [
        {
          icon: Phone,
          label: "اتصل بنا",
          value: "\u200E+962 79 604 2603 \n \u200E+962 78 500 0923",
        },
        { icon: Mail, label: "راسلنا", value: "info@alwanalsharq.com" },
        { icon: MapPin, label: "زورنا", value: "الأردن, عمان" },
      ],
    },
    en: {
      title: "Contact Us",
      subtitle: "We are here to help you achieve your vision",
      description:
        "Contact us today and get a free consultation for your next project",
      quickContact: [
        { icon: Phone, label: "Call Us", value: "\u200E+962 79 604 2603 \n \u200E+962 78 500 0923"},
        { icon: Mail, label: "Email Us", value: "info@alwanalsharq.com" },
        {
          icon: MapPin,
          label: "Visit Us",
          value: "Amman- North Marka- Behind Jawad bakeries",
        },
      ],
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-pink-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-4xl mx-auto ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {content[language].title}
          </h1>
          <p className="text-xl mb-4 opacity-90">
            {content[language].subtitle}
          </p>
          <p className="text-lg mb-12 opacity-80">
            {content[language].description}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {content[language].quickContact.map((contact, index) => (
              <div key={index} className="text-center" style={{ whiteSpace: "pre-line" }}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">{contact.label}</h3>

                <p className="opacity-90">{contact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
