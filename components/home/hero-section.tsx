"use client";
import Link from "next/link";
import { ArrowRight, Play, Palette } from "lucide-react";
import { Button } from "rizzui";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const { language } = useLanguage();
  // Remove the local useState
  const router = useRouter();

  const content = {
    ar: {
      title: "نصنع هوية علامتك التجارية",
      subtitle: "بإبداع وألوان تلفت الأنظار",
      description:
        "مرحبًا بكم في ألوان الشرق، حيث ندمج الإبداع والدقة لنصنع لوحات إعلانية تلفت الأنظار وتبني هوية علامتك التجارية بأحدث التقنيات والآلات المتطورة.",
      cta1: "اطلب عرض سعر",
      cta2: "شاهد أعمالنا",
      badge: "شركة رائدة في التصميم والإعلان",
    },
    en: {
      title: "Crafting Your Brand Identity",
      subtitle: "With Creativity and Eye-Catching Colors",
      description:
        "Welcome to East Colors, where creativity and precision come together to craft eye-catching signage and build your brand identity using the latest technology and advanced machinery.",
      cta1: "Get Quote",
      cta2: "View Our Work",
      badge: "Leading Design & Advertising Company",
    },
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Background Pattern (behind & click‑through) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500"></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`space-y-8 ${language === "ar" ? "text-right" : "text-left"}`}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full">
                <Palette className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  {content[language].badge}
                </span>
              </div>

              <h1 className="text-3xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-gray-800">
                  {content[language].title} {content[language].subtitle}
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                {content[language].description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="border-none bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white px-8 py-3 rounded-lg inline-flex items-center cursor-pointer"
                onClick={() => router.push("/contact")}
              >
                {content[language].cta1}
                <ArrowRight
                  className={`w-5 h-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`}
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-pink-500 px-8 py-3 bg-transparent"
                onClick={() => router.push("/portfolio")}
              >
                {content[language].cta2}
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="aspect-square bg-gradient-to-br from-pink-500 via-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center overflow-hidden">
                    <video
                      src="/brand_video.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full opacity-20 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
