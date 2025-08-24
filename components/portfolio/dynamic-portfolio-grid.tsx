"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { urlForImage } from "@/sanity/lib/image";

type Category =
  | "all"
  | "digital"
  | "printing"
  | "design"
  | "signage"
  | "vehicle";

interface Project {
  _id: string;
  title: { ar: string; en: string };
  slug: { current: string };
  description?: { ar: string; en: string };
  category: string;
  mainImage: any;
  client?: {
    name: string;
    industry: string;
  };
  completionDate?: string;
}

export function DynamicPortfolioGrid() {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState<Category>("all");

  const categories = {
    ar: [
      { key: "all", label: "الكل" },
      { key: "outdoor", label: "لافتات خارجية" },
      { key: "indoor", label: "لافتات داخلية" },
      { key: "promotional", label: "حملات ترويجية" },
      { key: "booths", label: "الستاندات والبوثات" },
      { key: "vehicle", label: "إعلانات المركبات" },
      { key: "marketing-materials", label: "تصميم وإنتاج المواد التسويقية" },
      { key: "design", label: "تصميم" },
    ],
    en: [
      { key: "all", label: "All" },
      { key: "outdoor", label: "Outdoor Signage" },
      { key: "indoor", label: "Indoor Signage" },
      { key: "promotional", label: "Promotional Campaigns" },
      { key: "booths", label: "Booths & Exhibition Stands" },
      { key: "vehicle", label: "Vehicle" },
      {
        key: "marketing-materials",
        label: "Design & Production of Marketing Materials",
      },
      { key: "design", label: "Design" },
    ],
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/sanity/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filtered = useMemo(
    () =>
      activeCat === "all"
        ? projects
        : projects.filter((p) => p.category === activeCat),
    [projects, activeCat]
  );

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="border-0 shadow-lg animate-pulse">
                <CardContent className="p-0">
                  <div className="w-full h-60 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
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
        {/* Category Filters */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-12"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {categories[language].map((c) => (
            <Button
              key={c.key}
              variant={activeCat === c.key ? "default" : "outline"}
              className="capitalize"
              onClick={() => setActiveCat(c.key as Category)}
            >
              {c.label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <Link key={project._id} href={`/portfolio/${project.slug.current}`}>
              <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={
                        urlForImage(project.mainImage)
                          ?.width(500)
                          .height(400)
                          .url() || "/placeholder.svg"
                      }
                      alt={
                        language === "ar" ? project.title.ar : project.title.en
                      }
                      width={500}
                      height={400}
                      className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-bold mb-1">
                          {language === "ar"
                            ? project.title.ar
                            : project.title.en}
                        </h3>
                        {project.client && (
                          <p className="text-sm opacity-90">
                            {project.client.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === "ar"
                ? "لا توجد مشاريع في هذه الفئة"
                : "No projects found in this category"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
