// app/services/page.tsx
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

type Lang = "en" | "ar";

type ServiceDoc = {
  _id: string;
  slug: { current: string };
  title?: { ar?: string; en?: string };
  description?: { ar?: string; en?: string };
};

type QueryResult = {
  production: ServiceDoc[];
  promotions: ServiceDoc[];
};

const QUERY = groq`{
  "production": *[_type == "service" && category == "production"] | order(order asc) {
    _id,
    slug,
    title { ar, en },
    description { ar, en }
  },
  "promotions": *[_type == "service" && category == "promotions"] | order(order asc) {
    _id,
    slug,
    title { ar, en },
    description { ar, en }
  }
}`;

export default function ServicesPage() {
  const { language } = useLanguage(); // ← comes from Navbar context
  const isAr = language === "ar";

  const [data, setData] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await client.fetch<QueryResult>(QUERY);
        if (mounted) setData(res);
      } catch (e) {
        if (mounted) setErr("Failed to load services.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const t = isAr
    ? {
        dir: "rtl" as const,
        productionH: "خدمات الإنتاج",
        productionP: "حلول إنتاج عالية الجودة لعلامتك التجارية.",
        productionAll: "عرض كل خدمات الإنتاج →",
        promotionsH: "خدمات العروض الترويجية",
        promotionsP: "حلول إبداعية لتعزيز وصولك.",
        promotionsAll: "عرض كل خدمات العروض الترويجية →",
        untitled: "خدمة بدون عنوان",
      }
    : {
        dir: "ltr" as const,
        productionH: "Production Services",
        productionP: "High-quality production solutions for your brand.",
        productionAll: "View All Production Services →",
        promotionsH: "Promotions Services",
        promotionsP: "Creative promotional solutions to boost your reach.",
        promotionsAll: "View All Promotions Services →",
        untitled: "Untitled service",
      };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main dir={t.dir} className="container mx-auto px-6 py-12 space-y-16">
        {/* Loading / Error */}
        {loading && <p className="text-gray-500">Loading…</p>}
        {err && <p className="text-red-600">{err}</p>}

        {/* Only render sections when data is ready */}
        {data && (
          <>
            {/* Production */}
            <section>
              <h2 className="text-3xl font-bold mb-6">{t.productionH}</h2>
              <p className="text-gray-600 mb-6">{t.productionP}</p>

              <div className="grid md:grid-cols-3 gap-8">
                {data.production.length === 0 ? (
                  <p className="text-gray-500 opacity-80">—</p>
                ) : (
                  data.production.map((service) => {
                    const title =
                      (isAr ? service.title?.ar : service.title?.en) ||
                      t.untitled;
                    const description =
                      (isAr
                        ? service.description?.ar
                        : service.description?.en) || "";
                    return (
                      <Link
                        key={service._id}
                        href={`/services/${service.slug.current}`}
                      >
                        <div className="bg-white rounded-lg shadow hover:shadow-lg p-6 transition">
                          <h3 className="font-semibold">{title}</h3>
                          <p className="text-gray-500">{description}</p>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>

              <div className="mt-6">
                <Link
                  href="/services/production"
                  className="text-pink-600 font-medium hover:underline"
                >
                  {t.productionAll}
                </Link>
              </div>
            </section>

            {/* Promotions */}
            <section>
              <h2 className="text-3xl font-bold mb-6">{t.promotionsH}</h2>
              <p className="text-gray-600 mb-6">{t.promotionsP}</p>

              <div className="grid md:grid-cols-3 gap-8">
                {data.promotions.length === 0 ? (
                  <p className="text-gray-500 opacity-80">—</p>
                ) : (
                  data.promotions.map((service) => {
                    const title =
                      (isAr ? service.title?.ar : service.title?.en) ||
                      t.untitled;
                    const description =
                      (isAr
                        ? service.description?.ar
                        : service.description?.en) || "";
                    return (
                      <Link
                        key={service._id}
                        href={`/services/${service.slug.current}`}
                      >
                        <div className="bg-white rounded-lg shadow hover:shadow-lg p-6 transition">
                          <h3 className="font-semibold">{title}</h3>
                          <p className="text-gray-500">{description}</p>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>

              <div className="mt-6">
                <Link
                  href="/services/promotions"
                  className="text-pink-600 font-medium hover:underline"
                >
                  {t.promotionsAll}
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
