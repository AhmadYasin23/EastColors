"use client";

import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { submitContactForm } from "@/app/actions/contact";

export function ContactFormSection() {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const content = {
    ar: {
      title: "أرسل لنا رسالة",
      subtitle: "سنتواصل معك خلال 24 ساعة",
      form: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        company: "اسم الشركة",
        service: "نوع الخدمة المطلوبة",
        message: "رسالتك",
        submit: "إرسال الرسالة",
        submitting: "جاري الإرسال...",
      },
      services: ["اختر الخدمة", "للوحات الإعلانية", "طباعة", "تصميم", "لافتات", "أخرى"],
      validation: {
        nameRequired: "الاسم مطلوب",
        emailRequired: "البريد الإلكتروني مطلوب",
        messageRequired: "الرسالة مطلوبة",
      },
    },
    en: {
      title: "Send us a message",
      subtitle: "We will contact you within 24 hours",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        company: "Company Name",
        service: "Required Service Type",
        message: "Your Message",
        submit: "Send Message",
        submitting: "Sending...",
      },
      services: ["Select Service", "Ads Billboard", "Printing", "Design", "Signage", "Other"],
      validation: {
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        messageRequired: "Message is required",
      },
    },
  };

  // Auto-clear the submitResult banner after 5s
  useEffect(() => {
    if (submitResult) {
      const timer = setTimeout(() => setSubmitResult(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitResult]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSubmitResult(null);

    formData.append("language", language);

    try {
      const result = await submitContactForm(formData);
      setSubmitResult(result);

      if (result.success) {
        (document.getElementById("contact-form") as HTMLFormElement)?.reset();
      }
    } catch {
      setSubmitResult({
        success: false,
        message:
          language === "ar"
            ? "حدث خطأ غير متوقع. حاول مرة أخرى."
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white p-8 lg:p-12">
      <Card className="border-0 shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {content[language].title}
          </CardTitle>
          <p className="text-gray-600">{content[language].subtitle}</p>
        </CardHeader>
        <CardContent className="px-0">
          <form
            id="contact-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleSubmit(formData);
            }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.name} *
                </label>
                <Input
                  name="name"
                  placeholder={content[language].form.name}
                  required
                  disabled={isSubmitting}
                  onInvalid={(e) => {
                    e.currentTarget.setCustomValidity(content[language].validation.nameRequired);
                  }}
                  onInput={(e) => e.currentTarget.setCustomValidity("")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.email} *
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder={content[language].form.email}
                  required
                  disabled={isSubmitting}
                  onInvalid={(e) => {
                    e.currentTarget.setCustomValidity(content[language].validation.emailRequired);
                  }}
                  onInput={(e) => e.currentTarget.setCustomValidity("")}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.phone}
                </label>
                <Input
                  name="phone"
                  placeholder={content[language].form.phone}
                  disabled={isSubmitting}
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.company}
                </label>
                <Input
                  name="company"
                  placeholder={content[language].form.company}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content[language].form.service}
              </label>
              <select
                name="service_type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {content[language].services.map((service, idx) => (
                  <option key={idx} value={idx === 0 ? "" : service} disabled={idx === 0}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content[language].form.message} *
              </label>
              <Textarea
                name="message"
                placeholder={content[language].form.message}
                rows={5}
                required
                disabled={isSubmitting}
                onInvalid={(e) => {
                  e.currentTarget.setCustomValidity(content[language].validation.messageRequired);
                }}
                onInput={(e) => e.currentTarget.setCustomValidity("")}
              />
            </div>

            {/* Result Banner */}
            {submitResult && (
              <div
                className={`p-4 rounded-md ${
                  submitResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}
              >
                {submitResult.message}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700"
              disabled={isSubmitting}
            >
              <Send className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`} />
              {isSubmitting ? content[language].form.submitting : content[language].form.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
