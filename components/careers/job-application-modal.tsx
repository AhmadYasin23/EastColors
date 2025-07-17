"use client";

import { useState } from "react";
import { X, Upload, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { submitJobApplication } from "@/app/actions/jobs";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    _id: string;
    title: { ar: string; en: string };
    department: string;
  };
}

export function JobApplicationModal({
  isOpen,
  onClose,
  job,
}: JobApplicationModalProps) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<
    { success: boolean; message: string } | null
  >(null);

  // NEW: track selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const content = {
    ar: {
      title: "تقدم للوظيفة",
      subtitle: "املأ النموذج أدناه للتقدم لهذه الوظيفة",
      form: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        experience: "سنوات الخبرة",
        currentPosition: "المنصب الحالي",
        cvFile: "رفع السيرة الذاتية",
        coverLetter: "رسالة تعريفية (اختياري)",
        submit: "إرسال الطلب",
        submitting: "جاري الإرسال...",
        cancel: "إلغاء",
      },
      placeholders: {
        name: "أدخل اسمك الكامل",
        email: "example@email.com",
        phone: "+962 50 123 4567",
        experience: "3",
        currentPosition: "مصمم جرافيك",
        coverLetter: "اكتب رسالة تعريفية موجزة...",
      },
      validation: {
        nameRequired: "الاسم مطلوب",
        emailRequired: "البريد الإلكتروني مطلوب",
        emailInvalid: "البريد الإلكتروني غير صحيح",
      },
    },
    en: {
      title: "Apply for Position",
      subtitle: "Fill out the form below to apply for this position",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        experience: "Years of Experience",
        currentPosition: "Current Position",
        cvFile: "Upload CV/Resume",
        coverLetter: "Cover Letter (Optional)",
        submit: "Submit Application",
        submitting: "Submitting...",
        cancel: "Cancel",
      },
      placeholders: {
        name: "Enter your full name",
        email: "example@email.com",
        phone: "+962 50 123 4567",
        experience: "3",
        currentPosition: "Graphic Designer",
        coverLetter: "Write a brief cover letter...",
      },
      validation: {
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        emailInvalid: "Invalid email address",
      },
    },
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSubmitResult(null);

    // Add job and language info
    formData.append("job_id", job._id);
    formData.append("job_title", job.title[language]);
    formData.append("language", language);

    try {
      const result = await submitJobApplication(formData);
      setSubmitResult(result);

      if (result.success) {
        setTimeout(() => {
          onClose();
          setSubmitResult(null);
          setSelectedFile(null); // clear file state
        }, 2000);
      }
    } catch {
      setSubmitResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="m-2">
          <Button variant="ghost" size="sm" onClick={onClose} >
            <X className="w-4 h-4" />
          </Button>
          </div>
        <CardHeader className="flex justify-between pb-4">
          <div>
            <CardTitle className="text-xl font-bold">
              {content[language].title}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {job.title[language]}
            </p>
            <p className="text-xs text-gray-500">
              {content[language].subtitle}
            </p>
          </div>

        </CardHeader>

        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleSubmit(formData);
            }}
            className="space-y-4"
          >
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {content[language].form.name} *
                </label>
                <Input
                  name="applicant_name"
                  placeholder={content[language].placeholders.name}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {content[language].form.email} *
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder={content[language].placeholders.email}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Phone & Experience */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {content[language].form.phone}
                </label>
                <Input
                  name="phone"
                  placeholder={content[language].placeholders.phone}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {content[language].form.experience}
                </label>
                <Input
                  type="number"
                  name="experience_years"
                  placeholder={content[language].placeholders.experience}
                  min={0}
                  max={50}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Current Position */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {content[language].form.currentPosition}
              </label>
              <Input
                name="current_position"
                placeholder={content[language].placeholders.currentPosition}
                disabled={isSubmitting}
              />
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {content[language].form.cvFile}
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-pink-400 transition-colors">
                {!selectedFile ? (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      {language === "ar"
                        ? "اسحب وأفلت ملف السيرة الذاتية أو"
                        : "Drag and drop your CV or"}
                    </p>
                    <Input
                      type="file"
                      name="cv_file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="cv-upload"
                      disabled={isSubmitting}
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setSelectedFile(file);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("cv-upload")?.click()
                      }
                      disabled={isSubmitting}
                    >
                      {language === "ar" ? "اختر ملف" : "Choose File"}
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm text-gray-700">
                      {selectedFile.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(null);
                        const input = document.getElementById(
                          "cv-upload"
                        ) as HTMLInputElement | null;
                        if (input) input.value = "";
                      }}
                      disabled={isSubmitting}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {content[language].form.coverLetter}
              </label>
              <Textarea
                name="cover_letter"
                placeholder={content[language].placeholders.coverLetter}
                rows={4}
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Result */}
            {submitResult && (
              <div
                className={`p-3 rounded-md text-sm ${
                  submitResult.success
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {submitResult.message}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                {content[language].form.cancel}
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700"
                disabled={isSubmitting}
              >
                <Send
                  className={`w-4 h-4 ${
                    language === "ar" ? "ml-2" : "mr-2"
                  }`}
                />
                {isSubmitting
                  ? content[language].form.submitting
                  : content[language].form.submit}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
