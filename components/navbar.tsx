"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import ECLogo from "./EC_Logo_3.png";

export function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();

  const navItems = {
    ar: [
      { href: "/", label: "الصفحة الرئيسية" },
      { href: "/about", label: "من نحن" },
      {
        href: "/services",
        label: "خدماتنا",
        children: [
          { href: "/services/production", label: "الإنتاج" },
          { href: "/services/promotions", label: "الترويج" },
        ],
      },
      { href: "/portfolio", label: "معرض الأعمال" },
      { href: "/clients", label: "عملاؤنا" },
      { href: "/careers", label: "الوظائف" },
      { href: "/contact", label: "اتصل بنا" },
    ],
    en: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      {
        href: "/services",
        label: "Services",
        children: [
          { href: "/services/production", label: "Production" },
          { href: "/services/promotions", label: "Promotions" },
        ],
      },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/clients", label: "Our Clients" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact Us" },
    ],
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-13">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="w-25 h-25 flex items-center justify-center mr-4">
              <Image
                src={ECLogo}
                alt="EC Logo"
                width={176}
                height={176}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden lg:flex items-center space-x-8"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {navItems[language].map((item) =>
              item.children ? (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`transition-colors font-medium mx-3 ${
                      isActive(item.href)
                        ? "text-pink-600 border-b-2 border-pink-600 pb-1"
                        : "text-gray-700 hover:text-pink-600"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {/* Submenu */}
                  <div
                    className="absolute left-0 top-full mt-0 hidden group-hover:block bg-white border shadow-md"
                    onMouseEnter={(e) => e.currentTarget.classList.add("block")}
                    onMouseLeave={(e) =>
                      e.currentTarget.classList.remove("block")
                    }
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors font-medium mx-3 ${
                    isActive(item.href)
                      ? "text-pink-600 border-b-2 border-pink-600 pb-1"
                      : "text-gray-700 hover:text-pink-600"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Language Toggle & CTA */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span className="text-md">
                {language === "ar" ? "EN" : "عربي"}
              </span>
            </Button>

            <Link href="/contact">
              <Button className="hidden md:flex bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700">
                {language === "ar" ? "طلب عرض سعر" : "Get Quote"}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={language === "ar" ? "right" : "left"}
                className="w-80"
              >
                <div
                  className="flex flex-col space-y-4 mt-8"
                  dir={language === "ar" ? "rtl" : "ltr"}
                >
                  {navItems[language].map((item) =>
                    item.children ? (
                      <div key={item.href}>
                        <Link
                          href={item.href}
                          className={`transition-colors font-medium py-2 ${
                            isActive(item.href)
                              ? "text-pink-600"
                              : "text-gray-700 hover:text-pink-600"
                          }`}
                        >
                          {item.label}
                        </Link>
                        <div className="ml-4 flex flex-col space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="text-gray-500 hover:text-pink-600"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`transition-colors font-medium py-2 ${
                          isActive(item.href)
                            ? "text-pink-600"
                            : "text-gray-700 hover:text-pink-600"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
