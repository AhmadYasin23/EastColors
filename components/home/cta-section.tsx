"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { NewsletterSignup } from "@/components/newsletter-signup";

export function CtaSection() {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "هل أنت مستعد لبناء هوية علامتك التجارية؟",
      subtitle: "دعنا نساعدك في تحويل رؤيتك إلى واقع ملموس",
      description:
        "احصل على استشارة مجانية واكتشف كيف يمكننا مساعدتك في إنشاء حلول إعلانية مبتكرة ومؤثرة",
      cta1: "احجز استشارة مجانية",
      cta2: "اتصل بنا الآن",
      phone: "\u200E+962 79 604 2603",
      phone2: "\u200E+962 78 500 0923",
    },
    en: {
      title: "Ready to Build Your Brand Identity?",
      subtitle: "Let us help you turn your vision into tangible reality",
      description:
        "Get a free consultation and discover how we can help you create innovative and impactful advertising solutions",
      cta1: "Book Free Consultation",
      cta2: "Call Us Now",
      phone: "\u200E+962 79 604 2603",
      phone2: "\u200E+962 78 500 0923",
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 space-y-12">
        {/* Main CTA */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white overflow-hidden">
          <CardContent className="p-12 md:p-16 text-center relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
            </div>

            <div
              className="relative z-10 max-w-4xl mx-auto"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {content[language].title}
              </h2>
              <p className="text-xl md:text-2xl mb-4 opacity-90">
                {content[language].subtitle}
              </p>
              <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
                {content[language].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  >
                    {content[language].cta1}
                    <ArrowRight
                      className={`w-6 h-6 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`}
                    />
                  </Button>
                </Link>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ml-2">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div
                    className={language === "ar" ? "text-right" : "text-left"}
                  >
                    <div className="text-sm opacity-80">
                      {content[language].cta2}
                    </div>
                    <div dir="ltr" className="text-lg font-bold">
                      {content[language].phone}
                    </div>
                    <div dir="ltr" className="text-lg font-bold">
                      {content[language].phone2}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Newsletter Signup */}
        {/* <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div> */}
      </div>
    </section>
  );
}
