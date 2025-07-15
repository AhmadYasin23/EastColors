"use client";

import { Award, Target, Users } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function AboutHeroSection() {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "من نحن",
      subtitle: "شركة رائدة في عالم التصميم والإعلان",
      description:
        "بعكس الشركات التقليدية، نحن في ألوان الشرق ندرك تمامًا متطلبات بيئة الإعلام الحديث ونتبنى أسلوب الاستهلاك الجديد. كل تصميم إعلاني وخدمة تسويقية نقدمها مصممة خصيصًا لملاءمة طبيعة عملك. نبدأ بفهم أهدافك وجدولك الزمني وميزانيتك لوضع خطة تسويقية متكاملة. نقيم جهودك التسويقية الحالية، ونحدد أفضل أساليب الترويج للوصول إلى جمهورك المستهدف، ثم نصوغ الحلول الإعلانية التي تلبي تلك الأهداف. نقوم بتصميم وطباعة ونشر جميع المواد داخليًا عبر فريق الإنتاج الخاص بنا، لضمان اتساق الهوية البصرية والسهولة والتوفير في التكلفة. تشمل خبرتنا اللوحات الخارجية واللوحات الداخلية والبنرات والأعلام واللافتات التجارية والمؤسساتية.",
      highlights: [
        {
          icon: Award,
          title: "8+ سنة خبرة",
          description: "في مجال التصميم والإعلان",
        },
        { icon: Target, title: "2000+ مشروع", description: "تم تنفيذه بنجاح" },
        { icon: Users, title: "500+ عميل", description: "راضي عن خدماتنا" },
      ],
    },
    en: {
      title: "About Us",
      subtitle: "Leading Company in Design and Advertising",
      description:
        "Unlike traditional Companies, EC understands the new media environment and embraces today’s new consumerism. Every advertising design and marketing service is custom tailored to your business. We begin with an outline of your goals, schedules and budget and provide a complete marketing plan.We evaluate your current marketing efforts, identify the promotion options that reach your target market, and determine the advertising solutions that meet your goals, and audience. We design, print, and publish all materials with our in-house production services which provide you with consistency, convenience and cost effective solutions for your marketing needs.Our expertise ranges from Outdoor Signs, Indoor Signage, banners and flags, commercial signage, corporate signage..",
      highlights: [
        {
          icon: Award,
          title: "8+ Years Experience",
          description: "In design and advertising",
        },
        {
          icon: Target,
          title: "2000+ Projects",
          description: "Successfully completed",
        },
        {
          icon: Users,
          title: "500+ Clients",
          description: "Satisfied with our services",
        },
      ],
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 ${language === "ar" ? "text-right" : "text-left"}`}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {content[language].title}
              </h1>
              <p className="text-xl text-pink-600 font-semibold">
                {content[language].subtitle}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {content[language].description}
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {content[language].highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center ml-2">
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <div className={language === "ar" ? "text-right" : "text-left"}>
                  <h3 className="text-lg font-bold text-gray-900">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
