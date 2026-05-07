// components/home/StatsClient.tsx
"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";
import { Briefcase, Clock, Users } from "lucide-react";

interface Logo {
  name: string;
  logoUrl: string;
}

export default function StatsClient({ logos }: { logos: Logo[] }) {
  if (!logos || logos.length === 0) return null;

  const { language } = useLanguage();
  const marqueeLogos = [...logos, ...logos];
  const marqueeDuration = Math.max(18, logos.length * 4);

  const content = {
    ar: {
      title: "أرقام تتحدث عن نجاحنا",
      subtitle: "عملاؤنا الذين نفخر بالعمل معهم",
      stats: [
        { icon: Briefcase, number: "2000+", label: "مشروع مكتمل" },
        { icon: Clock, number: "8+", label: "سنة خبرة" },
        { icon: Users, number: "100+", label: "عميل راضي" },
      ],
    },
    en: {
      title: "Numbers That Speak of Our Success",
      subtitle: "Clients we are proud to work with",
      stats: [
        { icon: Briefcase, number: "2000+", label: "Projects Completed" },
        { icon: Clock, number: "8+", label: "Years Experience" },
        { icon: Users, number: "500+", label: "Happy Clients" },
      ],
    },
  }[language];

  return (
    <section className="py-20 bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main Heading */}
        <div
          className={`text-center mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.title}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {content.stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Logos Carousel */}
        <div className="mt-16">
          <div
            className={`text-center mb-8 ${language === "ar" ? "text-right" : "text-left"}`}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {content.subtitle}
            </h3>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white/10 py-8 backdrop-blur-sm">
            <div
              className="stats-marquee-track"
              style={
                {
                  "--stats-marquee-duration": `${marqueeDuration}s`,
                } as React.CSSProperties
              }
            >
              {marqueeLogos.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="stats-marquee-item flex h-[120px] items-center justify-center px-6 md:h-[150px] lg:h-[180px]"
                  aria-hidden={i >= logos.length}
                >
                  <img
                    src={`${logo.logoUrl}?h=360&fit=max&auto=format`}
                    alt={logo.name}
                    className="block h-full w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
