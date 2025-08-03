"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Calendar, Briefcase, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";
import { urlForImage } from "@/sanity/lib/image";

interface Client {
  _id: string;
  name: string;
  slug?: { current: string };
  logo: any;
  description?: { ar: string; en: string };
  industry?: string;
  website?: string;
  projectsCount?: number;
  startDate?: string;
  featured: boolean;
  testimonial?: {
    quote?: { ar: string; en: string };
    author?: string;
    position?: string;
  };
}
interface Logo {
  name: string;
  logoUrl: string;
}

export default function ClientsGridSection({ logos }: { logos: Logo[] }) {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "شركاؤنا في النجاح",
      subtitle: "عملاء من مختلف القطاعات يثقون بخدماتنا",
      allIndustries: "جميع القطاعات",
      visitWebsite: "زيارة الموقع",
      projectsCompleted: "مشروع مكتمل",
      partnershipSince: "شراكة منذ",
      industries: {
        technology: "التكنولوجيا",
        healthcare: "الرعاية الصحية",
        finance: "المالية",
        retail: "التجارة",
        education: "التعليم",
        government: "الحكومة",
        "real-estate": "العقارات",
        "food-beverage": "الأغذية والمشروبات",
        automotive: "السيارات",
        energy: "الطاقة",
        other: "أخرى",
      },
    },
    en: {
      title: "Our Success Partners",
      subtitle: "Clients from various sectors trust our services",
      allIndustries: "All Industries",
      visitWebsite: "Visit Website",
      projectsCompleted: "Projects Completed",
      partnershipSince: "Partnership Since",
      industries: {
        technology: "Technology",
        healthcare: "Healthcare",
        finance: "Finance",
        retail: "Retail",
        education: "Education",
        government: "Government",
        "real-estate": "Real Estate",
        "food-beverage": "Food & Beverage",
        automotive: "Automotive",
        energy: "Energy",
        other: "Other",
      },
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === "ar"
      ? date.toLocaleDateString("ar-SA", { year: "numeric" })
      : date.toLocaleDateString("en-US", { year: "numeric" });
  };

  return (
    <section className="py-20 bg-gray-100">
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

        {/* All Clients Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {logos.map((logo, i) => (
            <Card
              key={i}
              className="bg-transparent border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <CardContent className="p-4">
                {/* 3:1 container for 564×184 logos */}
                <div
                  className="
                  relative
                  w-full
                  aspect-[3/1]       /* 3 : 1 ratio */
                  flex items-center justify-center
                           /* you can switch to gray-50 if you like */
                  rounded-lg
                  mb-4
                "
                >
                  <img
                    src={logo.logoUrl}
                    alt={logo.name}
                    className="
                    w-full h-full
                    object-contain
                    filter
                    drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]
                    drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]
                  "
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
