"use client"

import { useState } from "react"
import { MapPin, Clock, DollarSign, Users, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

export function JobListingsSection() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const content = {
    ar: {
      title: "الوظائف المتاحة",
      subtitle: "انضم إلى فريقنا واصنع الفرق",
      searchPlaceholder: "ابحث عن وظيفة...",
      allDepartments: "جميع الأقسام",
      applyNow: "تقدم الآن",
      fullTime: "دوام كامل",
      partTime: "دوام جزئي",
      remote: "عن بُعد",
      onSite: "في المكتب",
      departments: {
        design: "التصميم",
        production: "الإنتاج",
        sales: "المبيعات",
        marketing: "التسويق",
        technical: "التقني",
        admin: "الإدارة",
      },
    },
    en: {
      title: "Available Positions",
      subtitle: "Join our team and make a difference",
      searchPlaceholder: "Search for a job...",
      allDepartments: "All Departments",
      applyNow: "Apply Now",
      fullTime: "Full Time",
      partTime: "Part Time",
      remote: "Remote",
      onSite: "On Site",
      departments: {
        design: "Design",
        production: "Production",
        sales: "Sales",
        marketing: "Marketing",
        technical: "Technical",
        admin: "Administration",
      },
    },
  }

  const jobs = [
    {
      id: 1,
      title: { ar: "مصمم جرافيك أول", en: "Senior Graphic Designer" },
      department: "design",
      location: { ar: "الرياض", en: "Riyadh" },
      type: { ar: "دوام كامل", en: "Full Time" },
      salary: { ar: "8,000 - 12,000 ريال", en: "8,000 - 12,000 SAR" },
      experience: { ar: "3-5 سنوات", en: "3-5 years" },
      description: {
        ar: "نبحث عن مصمم جرافيك مبدع وذو خبرة للانضمام إلى فريق التصميم لدينا",
        en: "We are looking for a creative and experienced graphic designer to join our design team",
      },
    },
    {
      id: 2,
      title: { ar: "فني طباعة رقمية", en: "Digital Printing Technician" },
      department: "production",
      location: { ar: "الرياض", en: "Riyadh" },
      type: { ar: "دوام كامل", en: "Full Time" },
      salary: { ar: "5,000 - 8,000 ريال", en: "5,000 - 8,000 SAR" },
      experience: { ar: "2-4 سنوات", en: "2-4 years" },
      description: {
        ar: "مطلوب فني طباعة رقمية متخصص في تشغيل آلات الطباعة الحديثة",
        en: "Digital printing technician specialized in operating modern printing machines",
      },
    },
    {
      id: 3,
      title: { ar: "مطور مواقع", en: "Web Developer" },
      department: "technical",
      location: { ar: "الرياض / عن بُعد", en: "Riyadh / Remote" },
      type: { ar: "دوام كامل", en: "Full Time" },
      salary: { ar: "10,000 - 15,000 ريال", en: "10,000 - 15,000 SAR" },
      experience: { ar: "2-5 سنوات", en: "2-5 years" },
      description: {
        ar: "نبحث عن مطور مواقع ماهر في React و Next.js للعمل على مشاريع متنوعة",
        en: "Looking for a skilled web developer proficient in React and Next.js for diverse projects",
      },
    },
    {
      id: 4,
      title: { ar: "مسؤول مبيعات", en: "Sales Executive" },
      department: "sales",
      location: { ar: "الرياض", en: "Riyadh" },
      type: { ar: "دوام كامل", en: "Full Time" },
      salary: { ar: "6,000 - 10,000 ريال + عمولة", en: "6,000 - 10,000 SAR + Commission" },
      experience: { ar: "1-3 سنوات", en: "1-3 years" },
      description: {
        ar: "مطلوب مسؤول مبيعات نشط وقادر على بناء علاقات قوية مع العملاء",
        en: "Active sales executive capable of building strong relationships with clients",
      },
    },
    {
      id: 5,
      title: { ar: "منسق تسويق رقمي", en: "Digital Marketing Coordinator" },
      department: "marketing",
      location: { ar: "الرياض", en: "Riyadh" },
      type: { ar: "دوام كامل", en: "Full Time" },
      salary: { ar: "7,000 - 10,000 ريال", en: "7,000 - 10,000 SAR" },
      experience: { ar: "2-4 سنوات", en: "2-4 years" },
      description: {
        ar: "منسق تسويق رقمي للعمل على حملات التسويق الإلكتروني ووسائل التواصل الاجتماعي",
        en: "Digital marketing coordinator for online marketing campaigns and social media",
      },
    },
    {
      id: 6,
      title: { ar: "محاسب", en: "Accountant" },
      department: "admin",
      location: { ar: "الرياض", en: "Riyadh" },
      type: { ar: "دوام كامل", en: "Full Time" },
      salary: { ar: "8,000 - 12,000 ريال", en: "8,000 - 12,000 SAR" },
      experience: { ar: "3-6 سنوات", en: "3-6 years" },
      description: {
        ar: "محاسب مؤهل للعمل على النظم المحاسبية والتقارير المالية",
        en: "Qualified accountant to work on accounting systems and financial reports",
      },
    },
  ]

  const departments = [
    { key: "all", label: content[language].allDepartments },
    { key: "design", label: content[language].departments.design },
    { key: "production", label: content[language].departments.production },
    { key: "sales", label: content[language].departments.sales },
    { key: "marketing", label: content[language].departments.marketing },
    { key: "technical", label: content[language].departments.technical },
    { key: "admin", label: content[language].departments.admin },
  ]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title[language].toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content[language].subtitle}</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={content[language].searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {departments.map((dept) => (
                <option key={dept.key} value={dept.key}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">{job.title[language]}</CardTitle>
                  <Badge className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white">
                    {content[language].departments[job.department as keyof typeof content.ar.departments]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{job.description[language]}</p>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                    {job.location[language]}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-pink-500" />
                    {job.type[language]}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-pink-500" />
                    {job.salary[language]}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-pink-500" />
                    {job.experience[language]}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700">
                  {content[language].applyNow}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === "ar" ? "لا توجد وظائف متاحة حاليًا" : "No jobs available at the moment"}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
