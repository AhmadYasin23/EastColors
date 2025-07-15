"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const [language] = useState<"ar" | "en">("ar");

  const content = {
    ar: {
      title: "اتصل بنا",
      subtitle: "نحن هنا لمساعدتك في تحقيق رؤيتك",
      form: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        company: "اسم الشركة",
        message: "رسالتك",
        submit: "إرسال الرسالة",
      },
      info: [
        {
          icon: Phone,
          title: "اتصل بنا",
          details: ["\u200E+962 79 604 2603", "\u200E+962 78 500 0923"],
        },
        {
          icon: Mail,
          title: "راسلنا",
          details: ["info@alwanalsharq.com", "info@alwanalsharq.com"],
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
    },
    en: {
      title: "Contact Us",
      subtitle: "We are here to help you achieve your vision",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        company: "Company Name",
        message: "Your Message",
        submit: "Send Message",
      },
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
    },
  };

  return (
    <section id="contact" className="py-20 bg-white">
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {language === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content[language].form.name}
                  </label>
                  <Input placeholder={content[language].form.name} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content[language].form.email}
                  </label>
                  <Input
                    type="email"
                    placeholder={content[language].form.email}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content[language].form.phone}
                  </label>
                  <Input placeholder={content[language].form.phone} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content[language].form.company}
                  </label>
                  <Input placeholder={content[language].form.company} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.message}
                </label>
                <Textarea
                  placeholder={content[language].form.message}
                  rows={5}
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700">
                <Send
                  className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`}
                />
                {content[language].form.submit}
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {content[language].info.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div
                    className="flex items-start space-x-4"
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
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
        </div>
      </div>
    </section>
  );
}
