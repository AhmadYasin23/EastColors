"use client";

import { useState } from "react";
import {
  Monitor,
  Printer,
  Scissors,
  Palette,
  Building,
  Car,
  Layout,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ServicesSection() {
  const [language] = useState<"ar" | "en">("ar");

  const content = {
    ar: {
      title: "خدماتنا",
      subtitle: "حلول إعلانية شاملة لجميع احتياجاتك",
      cta: "اطلب الخدمة",
      services: [
        {
          icon: Monitor,
          title: "اللوحات الإعلانية الرقمية",
          description:
            "تصميم وتنفيذ شاشات LED عالية الجودة للإعلانات التفاعلية",
          features: [
            "شاشات LED عالية الدقة",
            "تحكم عن بُعد",
            "محتوى تفاعلي",
            "صيانة دورية",
          ],
        },
        {
          icon: Printer,
          title: "الطباعة الرقمية",
          description: "طباعة عالية الجودة على جميع أنواع المواد والخامات",
          features: [
            "طباعة كبيرة الحجم",
            "ألوان زاهية",
            "مواد متنوعة",
            "تشطيبات احترافية",
          ],
        },
        {
          icon: Layout,
          title: "ستاند",
          description: "خدمات القص الدقيق والتفريز بأحدث الآلات والتقنيات",
          features: [
            "قص ليزر دقيق",
            "تفريز CNC",
            "مواد متعددة",
            "تصاميم معقدة",
          ],
        },
        {
          icon: Palette,
          title: "التصميم الجرافيكي",
          description: "تصميم هوية بصرية متكاملة وإبداعية لعلامتك التجارية",
          features: [
            "تصميم الشعارات",
            "الهوية البصرية",
            "المطبوعات",
            "التصاميم الرقمية",
          ],
        },
        {
          icon: Building,
          title: "اللافتات التجارية",
          description:
            "تصنيع وتركيب لافتات تجارية عالية الجودة ومقاومة للعوامل الجوية",
          features: [
            "مواد عالية الجودة",
            "تركيب احترافي",
            "مقاومة للطقس",
            "ضمان طويل المدى",
          ],
        },
        {
          icon: Car,
          title: "إعلانات المركبات",
          description: "تصميم وتنفيذ إعلانات المركبات والحافلات بأحدث التقنيات",
          features: [
            "فينيل عالي الجودة",
            "تصاميم جذابة",
            "تركيب احترافي",
            "حماية من الخدوش",
          ],
        },
      ],
    },
    en: {
      title: "Our Services",
      subtitle: "Comprehensive advertising solutions for all your needs",
      cta: "Request Service",
      services: [
        {
          icon: Monitor,
          title: "Digital Signage",
          description:
            "Design and implementation of high-quality LED screens for interactive advertising",
          features: [
            "High-resolution LED displays",
            "Remote control",
            "Interactive content",
            "Regular maintenance",
          ],
        },
        {
          icon: Printer,
          title: "Digital Printing",
          description:
            "High-quality printing on all types of materials and substrates",
          features: [
            "Large format printing",
            "Vibrant colors",
            "Various materials",
            "Professional finishing",
          ],
        },
        {
          icon: Scissors,
          title: "Cutting & Routing",
          description:
            "Precision cutting and routing services with the latest machines and technologies",
          features: [
            "Precision laser cutting",
            "CNC routing",
            "Multiple materials",
            "Complex designs",
          ],
        },
        {
          icon: Palette,
          title: "Graphic Design",
          description:
            "Complete and creative visual identity design for your brand",
          features: [
            "Logo design",
            "Visual identity",
            "Print materials",
            "Digital designs",
          ],
        },
        {
          icon: Building,
          title: "Commercial Signage",
          description:
            "Manufacturing and installation of high-quality, weather-resistant commercial signs",
          features: [
            "High-quality materials",
            "Professional installation",
            "Weather resistant",
            "Long-term warranty",
          ],
        },
        {
          icon: Car,
          title: "Vehicle Advertising",
          description:
            "Design and implementation of vehicle and bus advertising with latest technologies",
          features: [
            "High-quality vinyl",
            "Attractive designs",
            "Professional installation",
            "Scratch protection",
          ],
        },
      ],
    },
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content[language].services.map((service, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700">
                  {content[language].cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
