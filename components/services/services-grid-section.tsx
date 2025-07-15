"use client";

import {
  Monitor,
  Printer,
  Scissors,
  Palette,
  Building,
  Car,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export function ServicesGridSection() {
  const { language } = useLanguage();
  // Remove the local useState

  const services = {
    ar: [
      {
        icon: Monitor,
        title: "اللوحات الإعلانية الرقمية",
        desc: "شاشات LED عالية الجودة للإعلانات التفاعلية.",
      },
      {
        icon: Printer,
        title: "الطباعة الرقمية",
        desc: "طباعة كبيرة الحجم بجودة وألوان فائقة.",
      },
      {
        icon: Scissors,
        title: "ستاند",
        desc: "قص ليزر وتفريز CNC لمختلف الخامات.",
      },
      {
        icon: Palette,
        title: "التصميم الجرافيكي",
        desc: "تصميم شعارات وهوية بصرية إبداعية.",
      },
      {
        icon: Building,
        title: "اللافتات التجارية",
        desc: "تصنيع وتركيب لافتات مقاومة للعوامل الجوية.",
      },
      {
        icon: Car,
        title: "إعلانات المركبات",
        desc: "تغليف مركبات بفينيل عالي الجودة.",
      },
    ],
    en: [
      {
        icon: Monitor,
        title: "Digital Signage",
        desc: "High-quality LED displays for interactive ads.",
      },
      {
        icon: Printer,
        title: "Digital Printing",
        desc: "Large-format printing with superb colors.",
      },
      {
        icon: Scissors,
        title: "Cutting & Routing",
        desc: "Laser cutting and CNC routing for many materials.",
      },
      {
        icon: Palette,
        title: "Graphic Design",
        desc: "Creative logo & brand-identity design.",
      },
      {
        icon: Building,
        title: "Commercial Signage",
        desc: "Weather-resistant commercial signs.",
      },
      {
        icon: Car,
        title: "Vehicle Advertising",
        desc: "Premium vinyl wraps for vehicles.",
      },
    ],
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services[language].map((s, i) => (
            <Card
              key={i}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <s.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
