"use client"

import { useState } from "react"
import { Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { submitNewsletterSubscription } from "@/app/actions/contact"

export function NewsletterSignup() {
  const { language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const content = {
    ar: {
      title: "اشترك في نشرتنا الإخبارية",
      subtitle: "احصل على آخر الأخبار والعروض الخاصة",
      placeholder: "أدخل بريدك الإلكتروني",
      submit: "اشتراك",
      submitting: "جاري الاشتراك...",
    },
    en: {
      title: "Subscribe to Our Newsletter",
      subtitle: "Get the latest news and special offers",
      placeholder: "Enter your email address",
      submit: "Subscribe",
      submitting: "Subscribing...",
    },
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setSubmitResult(null)

    // Add language to form data
    formData.append("language", language)

    try {
      const result = await submitNewsletterSubscription(formData)
      setSubmitResult(result)

      if (result.success) {
        // Reset form
        const form = document.getElementById("newsletter-form") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-500 to-indigo-600 text-white">
      <CardContent className="p-8">
        <div className="flex items-center mb-4">
          <Mail className="w-8 h-8 mr-3" />
          <div>
            <h3 className="text-xl font-bold">{content[language].title}</h3>
            <p className="text-sm opacity-90">{content[language].subtitle}</p>
          </div>
        </div>

        <form id="newsletter-form" action={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              name="email"
              placeholder={content[language].placeholder}
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
              required
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              variant="secondary"
              className="bg-white text-pink-600 hover:bg-gray-100"
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? content[language].submitting : content[language].submit}
            </Button>
          </div>

          {submitResult && (
            <div className={`text-sm p-2 rounded ${submitResult.success ? "bg-green-500/20" : "bg-red-500/20"}`}>
              {submitResult.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
