"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export function ContactInfoSection() {
  const { language } = useLanguage();
  // Remove the local useState

  const content = {
    ar: {
      title: "معلومات التواصل",
      info: [
        {
          icon: Phone,
          title: "اتصل بنا",
          details: ["\u200E+962 79 604 2603", "\u200E+962 78 500 0923"],
        },
        {
          icon: Mail,
          title: "راسلنا",
          details: ["info@alwanalsharq.com"],
        },
        {
          icon: MapPin,
          title: "زورنا",
          details: ["عمان, ماركا الشماليه خلف مخابز جواد"],
        },
        {
          icon: Clock,
          title: "ساعات العمل",
          details: ["السبت - الخميس: 8:00 ص - 6:00 م", "الجمعة: مغلق"],
        },
      ],
      social: "تابعنا على",
    },
    en: {
      title: "Contact Information",
      info: [
        {
          icon: Phone,
          title: "Call Us",
          details: ["\u200E+962 79 604 2603", "\u200E+962 78 500 0923"],
        },
        {
          icon: Mail,
          title: "Email Us",
          details: ["info@alwanalsharq.com", "info@alwanalsharq.com"],
        },
        {
          icon: MapPin,
          title: "Visit Us",
          details: [
            "Amman- North Marka- Behind Jawad bakeries",
            "King Fahd Road, Al Olaya District",
          ],
        },
        {
          icon: Clock,
          title: "Working Hours",
          details: ["Saturday - Thursday: 8:00 AM - 6:00 PM", "Friday: Closed"],
        },
      ],
      social: "Follow Us",
    },
  };

  return (
    <div className="bg-gray-50 p-8 lg:p-12">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {content[language].title}
        </h2>

        <div className="space-y-6">
          {content[language].info.map((item, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div
                  className="flex items-start space-x-4"
                  dir={language === "ar" ? "rtl" : "ltr"}
                >
                  <div className="ml-1 w-12 h-12 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-[px]">
                      {item.title}
                    </h3>
                    {item.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 mb-1">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {content[language].social}
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="ml-3 w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
