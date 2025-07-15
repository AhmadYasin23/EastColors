"use client";

import { useState } from "react";
import { Award, Target, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  const [language] = useState<"ar" | "en">("ar");

  const content = {
    ar: {
      title: "من نحن",
      subtitle: "شركة رائدة في عالم التصميم والإعلان",
      description:
        "بعكس الشركات التقليدية، نحن في ألوان الشرق ندرك تمامًا متطلبات بيئة الإعلام الحديث ونتبنى أسلوب الاستهلاك الجديد. كل تصميم إعلاني وخدمة تسويقية نقدمها مصممة خصيصًا لملاءمة طبيعة عملك. نبدأ بفهم أهدافك وجدولك الزمني وميزانيتك لوضع خطة تسويقية متكاملة. نقيم جهودك التسويقية الحالية، ونحدد أفضل أساليب الترويج للوصول إلى جمهورك المستهدف، ثم نصوغ الحلول الإعلانية التي تلبي تلك الأهداف. نقوم بتصميم وطباعة ونشر جميع المواد داخليًا عبر فريق الإنتاج الخاص بنا، لضمان اتساق الهوية البصرية والسهولة والتوفير في التكلفة. تشمل خبرتنا اللوحات الخارجية واللوحات الداخلية والبنرات والأعلام واللافتات التجارية والمؤسساتية.",
      values: [
        {
          icon: Award,
          title: "الجودة والإتقان",
          description: "نلتزم بأعلى معايير الجودة في كل مشروع نقوم به",
        },
        {
          icon: Target,
          title: "الدقة في التنفيذ",
          description: "نحرص على تنفيذ المشاريع بدقة متناهية وفي الوقت المحدد",
        },
        {
          icon: Users,
          title: "خدمة العملاء",
          description: "نضع رضا عملائنا في المقدمة ونقدم دعمًا مستمرًا",
        },
        {
          icon: Zap,
          title: "الابتكار والإبداع",
          description: "نستخدم أحدث التقنيات والأفكار الإبداعية",
        },
      ],
    },
    en: {
      title: "About Us",
      subtitle: "Leading Company in Design and Advertising",
      description:
        "At East Colors, we combine extensive experience with modern technology to provide comprehensive advertising solutions. For over 15 years, we have been helping companies build their visual identity and make a strong impression in the market.",
      values: [
        {
          icon: Award,
          title: "Quality & Excellence",
          description:
            "We commit to the highest quality standards in every project we undertake",
        },
        {
          icon: Target,
          title: "Precision in Execution",
          description:
            "We ensure projects are executed with utmost precision and on time",
        },
        {
          icon: Users,
          title: "Customer Service",
          description:
            "We prioritize customer satisfaction and provide continuous support",
        },
        {
          icon: Zap,
          title: "Innovation & Creativity",
          description: "We use the latest technologies and creative ideas",
        },
      ],
    },
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            {content[language].subtitle}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content[language].description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content[language].values.map((value, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
