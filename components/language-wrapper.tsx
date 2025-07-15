"use client"

import type React from "react"

import { useLanguage } from "@/contexts/language-context"
import { useEffect } from "react"

export function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()

  useEffect(() => {
    // Update document attributes when language changes
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

    // Apply font class to body
    if (language === "ar") {
      document.body.classList.add("font-tajawal")
      document.body.classList.remove("font-inter")
    } else {
      document.body.classList.add("font-inter")
      document.body.classList.remove("font-tajawal")
    }
  }, [language])

  return (
    <div className={language === "ar" ? "font-tajawal" : "font-inter"} dir={language === "ar" ? "rtl" : "ltr"}>
      {children}
    </div>
  )
}
