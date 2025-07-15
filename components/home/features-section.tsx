"use client";
import Link from "next/link";
import { Monitor, Printer, Layout, Palette, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export function FeaturesSection() {
  const { language } = useLanguage();
  // Remove the local useState

  const content = {
    ar: {
      title: "خدماتنا المميزة",
      subtitle: "نقدم حلول إعلانية شاملة ومتكاملة",
      viewAll: "عرض جميع الخدمات",
      services: [
        {
          icon: Monitor,
          title: "اللوحات الإعلانية",
          description:
            "نقدم تصميم وتنفيذ لوحات إعلانية خارجية وداخلية بجميع أنواعها و (بمقاسات مختلفة )",
        },
        {
          icon: Printer,
          title: "الطباعة الرقمية",
          description:
            "طباعة عالية الجودة على جميع أنواع المواد بألوان زاهية ودقة عالية",
        },
        {
          icon: Layout,
          title: "ستاندات",
          description:
            "نُقدّم مجموعة متنوعة من الستاندات المصممة بشكل أنيق وجذاب، مثالية للمعارض، المحلات التجارية",
        },
        {
          icon: Palette,
          title: "التصميم الجرافيكي",
          description: "تصميم هوية بصرية متكاملة وإبداعية لعلامتك التجارية",
        },
      ],
    },
    en: {
      title: "Our Featured Services",
      subtitle: "We provide comprehensive and integrated advertising solutions",
      viewAll: "View All Services",
      services: [
        {
          icon: Monitor,
          title: "Advertising billboards",
          description:
            "We provide the design and production of all types of indoor and outdoor advertising displays, available in various sizes.",
        },
        {
          icon: Printer,
          title: "Digital Printing",
          description:
            "High-quality printing on all materials with vibrant colors and high precision",
        },
        {
          icon: Layout,
          title: "Display Stands",
          description:
            "We offer a diverse range of stands with elegant, eye‑catching designs—perfect for exhibitions and retail stores.",
        },
        {
          icon: Palette,
          title: "Graphic Design",
          description:
            "Complete and creative visual identity design for your brand",
        },
      ],
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {content[language].subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white px-8 py-3 bg-transparent"
            >
              {content[language].viewAll}
              <ArrowRight
                className={`w-5 h-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`}
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
