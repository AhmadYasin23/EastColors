"use client";
import Link from "next/link";
import {
  Facebook,

  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { language } = useLanguage();
  // Remove the local useState

  const content = {
    ar: {
      company: {
        name: "ألوان الشرق",
        description:
          "نحن شركة رائدة في مجال التصميم والإعلان، نقدم حلول إبداعية ومتكاملة لبناء هوية علامتك التجارية.",
      },
      links: {
        title: "روابط سريعة",
        items: [
          { href: "#home", label: "الصفحة الرئيسية" },
          { href: "#about", label: "من نحن" },
          { href: "#services", label: "خدماتنا" },
          { href: "#portfolio", label: "معرض الأعمال" },
        ],
      },
      services: {
        title: "خدماتنا",
        items: [
          "اللوحات الإعلانية الرقمية",
          "الطباعة الرقمية",
          "ستاند",
          "التصميم الجرافيكي",
        ],
      },
      contact: {
        title: "معلومات التواصل",
        items: [
          { icon: Phone, text: "\u200E+962 79 604 2603 \n \u200E+962 78 500 0923"},
          { icon: Mail, text: "info@alwanalsharq.com" },
          { icon: MapPin, text: "عمان، ماركا الشماليه خلف مخابز جواد  " },
        ],
      },
      copyright: "© 2025 ألوان الشرق. جميع الحقوق محفوظة.",
    },
    en: {
      company: {
        name: "East Colors",
        description:
          "We are a leading company in design and advertising, providing creative and comprehensive solutions to build your brand identity.",
      },
      links: {
        title: "Quick Links",
        items: [
          { href: "#home", label: "Home" },
          { href: "#about", label: "About Us" },
          { href: "#services", label: "Services" },
          { href: "#portfolio", label: "Portfolio" },
        ],
      },
      services: {
        title: "Our Services",
        items: [
          "Digital Signage",
          "Digital Printing",
          "Stands",
          "Graphic Design",
        ],
      },
      contact: {
        title: "Contact Info",
        items: [
          { icon: Phone, text: "\u200E+962 79 604 2603 \n \u200E+962 78 500 0923" },
          { icon: Mail, text: "info@alwanalsharq.com" },
          { icon: MapPin, text: "Amman- North Marka- Behind Jawad bakeries" },
        ],
      },
      copyright: "© 2025 East Colors. All rights reserved.",
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r m-2 from-pink-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <span className="text-xl font-bold">
                {content[language].company.name}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {content[language].company.description}
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 ml-4 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              {content[language].links.title}
            </h3>
            <ul className="space-y-2">
              {content[language].links.items.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              {content[language].services.title}
            </h3>
            <ul className="space-y-2">
              {content[language].services.items.map((service, index) => (
                <li key={index} className="text-gray-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              {content[language].contact.title}
            </h3>
            <div className="space-y-3">
              {content[language].contact.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3" style={{ whiteSpace: "pre-line" }}>
                  <item.icon className="w-5 h-5 ml-2 text-pink-400" />

                  <span dir="ltr" className="text-gray-400">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">{content[language].copyright}</p>
        </div>
      </div>
    </footer>
  );
}
