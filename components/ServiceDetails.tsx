"use client";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";
import type { PortableTextBlock } from "sanity";

export interface ServiceData {
  title: Record<"ar" | "en", string>;
  description?: Partial<Record<"ar" | "en", string>>;
  icon?: string;
  features?: Partial<Record<"ar" | "en", string[]>>;
  detailedDescription?: Partial<Record<"ar" | "en", PortableTextBlock[]>>;
  image?: string;
  gallery?: string[];
  featured?: boolean;
  order?: number;
}

export function ServiceDetails({ service }: { service: ServiceData }) {
  const { language } = useLanguage();

  const content = {
    ar: {
      backToServices: "العودة إلى الخدمات",
      keyFeatures: "المميزات الرئيسية",
      serviceDetails: "تفاصيل الخدمة",
      serviceGallery: "معرض الخدمة",
      featured: "خدمة مميزة",
      getQuote: "احصل على عرض سعر",
      contactUs: "تواصل معنا",
      callNow: "اتصل الآن",
      emailUs: "راسلنا",
      readyToStart: "هل أنت مستعد للبدء؟",
      readySubtitle: "دعنا نساعدك في تحقيق أهدافك",
      whyChooseUs: "لماذا تختارنا؟",
      whyChooseFeatures: [
        "خبرة أكثر من 15 عامًا في المجال",
        "فريق متخصص ومحترف",
        "أحدث التقنيات والمعدات",
        "جودة عالية وأسعار تنافسية",
        "خدمة عملاء متميزة",
        "ضمان على جميع الأعمال",
      ],
      processSteps: "خطوات العمل",
      steps: [
        { title: "الاستشارة", desc: "نناقش احتياجاتك ومتطلباتك" },
        { title: "التصميم", desc: "نضع التصاميم والمخططات" },
        { title: "التنفيذ", desc: "ننفذ المشروع بأعلى جودة" },
        { title: "التسليم", desc: "نسلم العمل في الموعد المحدد" },
      ],
    },
    en: {
      backToServices: "Back to Services",
      keyFeatures: "Key Features",
      serviceDetails: "Service Details",
      serviceGallery: "Service Gallery",
      featured: "Featured Service",
      getQuote: "Get Quote",
      contactUs: "Contact Us",
      callNow: "Call Now",
      emailUs: "Email Us",
      readyToStart: "Ready to Get Started?",
      readySubtitle: "Let us help you achieve your goals",
      whyChooseUs: "Why Choose Us?",
      whyChooseFeatures: [
        "Over 15 years of industry experience",
        "Specialized and professional team",
        "Latest technology and equipment",
        "High quality and competitive prices",
        "Excellent customer service",
        "Warranty on all work",
      ],
      processSteps: "Our Process",
      steps: [
        {
          title: "Consultation",
          desc: "We discuss your needs and requirements",
        },
        { title: "Design", desc: "We create designs and plans" },
        {
          title: "Implementation",
          desc: "We execute the project with highest quality",
        },
        { title: "Delivery", desc: "We deliver on time as promised" },
      ],
    },
  };

  const title = service.title[language];
  const description = service.description?.[language] ?? "";
  const features = service.features?.[language] ?? [];
  const details = service.detailedDescription?.[language] ?? [];
  const gallery = service.gallery ?? [];

  // Get the icon component dynamically
  const IconComponent = service.icon
    ? (Icons as any)[service.icon] || Icons.Star
    : Icons.Star;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/services">
            <Button
              variant="ghost"
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              {language === "ar" ? (
                <ArrowRight className="w-4 h-4 ml-2" />
              ) : (
                <ArrowLeft className="w-4 h-4 mr-2" />
              )}
              {content[language].backToServices}
            </Button>
          </Link>
        </div>

        <article className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div
            className="text-center mb-12"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {/* Icon and Badge */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center">
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              {service.featured && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2">
                  <Star className="w-4 h-4 mr-1" />
                  {content[language].featured}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>

            {description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Main Image */}
          {service.image && (
            <div className="mb-12">
              <Card className="border-0 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={title}
                    width={1200}
                    height={600}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                    priority
                  />
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Key Features */}
              {features.length > 0 && (
                <section>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2
                        className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                        dir={language === "ar" ? "rtl" : "ltr"}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        {content[language].keyFeatures}
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                            dir={language === "ar" ? "rtl" : "ltr"}
                          >
                            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Detailed Description */}
              {details.length > 0 && (
                <section>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2
                        className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                        dir={language === "ar" ? "rtl" : "ltr"}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">
                            ℹ
                          </span>
                        </div>
                        {content[language].serviceDetails}
                      </h2>
                      <div
                        className="prose prose-lg max-w-none"
                        dir={language === "ar" ? "rtl" : "ltr"}
                      >
                        <PortableText value={details} />
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Service Gallery */}
              {gallery.length > 0 && (
                <section>
                  <h2
                    className="text-2xl font-bold text-gray-900 mb-6"
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    {content[language].serviceGallery}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {gallery.map((url, idx) => (
                      <Card
                        key={idx}
                        className="border-0 shadow-lg overflow-hidden group"
                      >
                        <CardContent className="p-0">
                          <Image
                            src={url || "/placeholder.svg"}
                            alt={`${title} ${idx + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Process Steps */}
              <section>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                      {content[language].processSteps}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {content[language].steps.map((step, index) => (
                        <div key={index} className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-xl font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* CTA Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-500 to-indigo-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">
                    {content[language].readyToStart}
                  </h3>
                  <p className="mb-6 opacity-90">
                    {content[language].readySubtitle}
                  </p>
                  <div className="space-y-3">
                    {/* <Link href="/contact">
                      <Button className="w-full bg-white text-pink-600 hover:bg-gray-100 font-semibold">
                        {content[language].getQuote}
                      </Button>
                    </Link> */}
                    <div className="flex gap-2">
                      {/* <Button
                        variant="outline"
                        className="flex-1 border-white text-white hover:bg-white hover:text-pink-600 bg-transparent"
                      >
                        <Phone className="w-4 h-4 mr-2" />

                        {content[language].callNow}
                      </Button> */}
                      <Button
                        variant="outline"
                        className="flex-1 border-white text-white hover:bg-white hover:text-pink-600 bg-transparent"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        {content[language].emailUs}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3
                    className="text-xl font-bold text-gray-900 mb-6"
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    {content[language].whyChooseUs}
                  </h3>
                  <div className="space-y-4">
                    {content[language].whyChooseFeatures.map(
                      (feature, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3"
                          dir={language === "ar" ? "rtl" : "ltr"}
                        >
                          <div className="ml-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3
                    className="text-xl font-bold text-gray-900 mb-6 "
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    {content[language].contactUs}
                  </h3>
                  <div className="space-y-4">
                    <div
                      className="flex items-center space-x-3"
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {language === "ar" ? "اتصل بنا" : "Call Us"}
                        </p>
                        <p
                          dir="ltr"
                          className="mr-1 font-semibold text-gray-900"
                        >
                          +962 79 604 2603<br/> 
                          +962 78 500 0923
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center space-x-3"
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {language === "ar" ? "راسلنا" : "Email Us"}
                        </p>
                        <p className="mr-1 font-semibold text-gray-900">
                          info@alwanalsharq.com
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center space-x-3"
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {language === "ar" ? "ساعات العمل" : "Working Hours"}
                        </p>
                        <p className="mr-1 font-semibold text-gray-900">
                          {language === "ar"
                            ? "السبت - الخميس: 8ص - 6م"
                            : "Sat - Thu: 8AM - 6PM"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
