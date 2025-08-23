"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import * as Icons from "lucide-react";

type Lang = "ar" | "en";

interface Service {
  _id: string;
  title?: { ar?: string | null; en?: string | null } | null;
  slug?: { current?: string | null } | null;
  description?: { ar?: string | null; en?: string | null } | null;
  icon?: string | null;
  features?: { ar?: string[] | null; en?: string[] | null } | null;
  image?: any;
  featured?: boolean;
  category?: string;
}

interface Props {
  category?: "production" | "promotions";
}

// ----- helpers: safe accessors -----
const getSlug = (s: Service) =>
  (typeof s?.slug === "string"
    ? s.slug
    : s?.slug?.current) ? String(s?.slug?.current).trim() : "";

const pickText = (obj: any, lang: Lang) =>
  typeof obj?.[lang] === "string"
    ? obj[lang]!
    : typeof obj?.en === "string"
    ? obj.en
    : typeof obj?.ar === "string"
    ? obj.ar
    : "";

const pickList = (obj: any, lang: Lang): string[] =>
  Array.isArray(obj?.[lang])
    ? obj[lang]
    : Array.isArray(obj?.en)
    ? obj.en
    : Array.isArray(obj?.ar)
    ? obj.ar
    : [];

export function DynamicServicesGrid({ category }: Props) {
  const { language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const content = {
    ar: { cta: "اطلب الخدمة", learnMore: "اعرف المزيد" },
    en: { cta: "Request Service", learnMore: "Learn More" },
  } as const;

  useEffect(() => {
    async function fetchServices() {
      try {
        const url = category
          ? `/api/sanity/services?category=${category}`
          : `/api/sanity/services`;

        const response = await fetch(url);
        const data = await response.json();

        // Normalize shape and drop items with no usable slug
        const normalized: Service[] = (Array.isArray(data) ? data : [])
          .map((s: any) => ({
            ...s,
            slug:
              typeof s?.slug === "string" ? { current: s.slug } : s?.slug ?? null,
          }))
          .filter((s: Service) => !!getSlug(s));

        setServices(normalized);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [category]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="border-0 shadow-lg animate-pulse">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
                  <div className="h-6 bg-gray-200 rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-4" />
                  <div className="h-10 bg-gray-200 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent =
              (Icons as any)?.[service.icon as string] || Icons.Star;
            const slug = getSlug(service);
            const title = pickText(service.title, language) || "Untitled service";
            const description = pickText(service.description, language);
            const features = pickList(service.features, language);

            return (
              <Card
                key={service._id ?? slug}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">{description}</p>

                  {features.length > 0 && (
                    <ul className="space-y-2">
                      {features.slice(0, 3).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex gap-2 pt-4">
                    {slug ? (
                      <Link
                        href={`/services/${encodeURIComponent(slug)}`}
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full bg-transparent">
                          {content[language].learnMore}
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="outline"
                        className="flex-1 w-full bg-transparent"
                        disabled
                        aria-disabled
                        title="Missing slug"
                      >
                        {content[language].learnMore}
                      </Button>
                    )}

                    <Link href="/contact" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700">
                        {content[language].cta}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
