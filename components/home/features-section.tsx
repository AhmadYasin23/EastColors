"use client";
import Link from "next/link";
import {
  Monitor,
  Printer,
  Layout,
  Palette,
  Gift,
  Megaphone,
  Camera,
  Film,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export function FeaturesSection() {
  const { language } = useLanguage();

  // ---- Content ----
  const content = {
    ar: {
      production: {
        title: "قسم الإنتاج",
        subtitle: "خدمات الإنتاج عالية الجودة",
        viewAll: "عرض جميع خدمات الإنتاج",
        services: [
          {
            icon: Monitor,
            title: "اللوحات الإعلانية",
            description:
              "تصميم وتنفيذ لوحات إعلانية خارجية وداخلية بمقاسات متنوعة",
          },
          {
            icon: Printer,
            title: "الطباعة الرقمية",
            description:
              "طباعة عالية الجودة على جميع المواد بدقة وألوان مبهرة",
          },
          {
            icon: Layout,
            title: "ستاندات",
            description:
              "ستاندات أنيقة وجذابة للمعارض والمتاجر",
          },
          {
            icon: Palette,
            title: "التصميم الجرافيكي",
            description: "تصميم هوية بصرية متكاملة لعلامتك التجارية",
          },
        ],
      },
      promotions: {
        title: "قسم الترويج",
        subtitle: "خدمات ترويجية مبتكرة",
        viewAll: "عرض جميع خدمات الترويج",
        services: [
          {
            icon: Gift,
            title: "الهدايا الدعائية",
            description: "تصميم وتوزيع هدايا دعائية مخصصة لعلامتك التجارية",
          },
          {
            icon: Megaphone,
            title: "الحملات الإعلانية",
            description:
              "إطلاق وإدارة حملات إعلانية فعّالة عبر منصات مختلفة",
          },
          {
            icon: Camera,
            title: "التصوير الفوتوغرافي",
            description: "جلسات تصوير احترافية لمنتجاتك وفريق عملك",
          },
          {
            icon: Film,
            title: "إنتاج الفيديو",
            description:
              "إنتاج فيديوهات ترويجية عالية الجودة لزيادة الوعي بالعلامة",
          },
        ],
      },
    },
    en: {
      production: {
        title: "Production Department",
        subtitle: "High-quality production services",
        viewAll: "View All Production Services",
        services: [
          {
            icon: Monitor,
            title: "Advertising Billboards",
            description:
              "Design and installation of indoor and outdoor billboards in various sizes",
          },
          {
            icon: Printer,
            title: "Digital Printing",
            description:
              "High-quality printing on all materials with vibrant colors",
          },
          {
            icon: Layout,
            title: "Display Stands",
            description:
              "Elegant, attractive stands for exhibitions and retail stores",
          },
          {
            icon: Palette,
            title: "Graphic Design",
            description:
              "Complete visual identity design for your brand",
          },
        ],
      },
      promotions: {
        title: "Promotions Department",
        subtitle: "Creative promotional services",
        viewAll: "View All Promotional Services",
        services: [
          {
            icon: Gift,
            title: "Promotional Gifts",
            description:
              "Design and distribution of custom branded gifts",
          },
          {
            icon: Megaphone,
            title: "Advertising Campaigns",
            description:
              "Launch and manage effective ad campaigns across platforms",
          },
          {
            icon: Camera,
            title: "Photography",
            description:
              "Professional photoshoots for your products and team",
          },
          {
            icon: Film,
            title: "Video Production",
            description:
              "High-quality promotional video creation",
          },
        ],
      },
    },
  };

  const renderSection = (sectionKey: "production" | "promotions") => {
    const section = content[language][sectionKey];
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div
            className={`mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {section.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              {section.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {section.services.map((service, index) => (
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

          <div>
            <Link href={`/services/${sectionKey}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white px-8 py-3 bg-transparent"
              >
                {section.viewAll}
                <ArrowRight
                  className={`w-5 h-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`}
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      {renderSection("production")}
      {renderSection("promotions")}
    </>
  );
}
