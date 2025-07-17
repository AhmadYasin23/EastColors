"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, DollarSign, Users, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { JobApplicationModal } from "./job-application-modal"

interface Job {
  _id: string
  title: { ar: string; en: string }
  slug: { current: string }
  department: string
  location: { ar: string; en: string }
  type: { ar: string; en: string }
  salary?: { ar: string; en: string }
  experience?: { ar: string; en: string }
  description: { ar: string; en: string }
  requirements?: { ar: string[]; en: string[] }
  responsibilities?: { ar: string[]; en: string[] }
  featured: boolean
  applicationDeadline?: string
  publishedAt: string
}

export function DynamicJobListingsSection() {
  const { language } = useLanguage()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const content = {
    ar: {
      title: "الوظائف المتاحة",
      subtitle: "انضم إلى فريقنا واصنع الفرق",
      searchPlaceholder: "ابحث عن وظيفة...",
      allDepartments: "جميع الأقسام",
      applyNow: "تقدم الآن",
      featured: "مميزة",
      noJobs: "لا توجد وظائف متاحة حاليًا",
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
      featured: "Featured",
      noJobs: "No jobs available at the moment",
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

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/sanity/jobs")
        const data = await response.json()
        setJobs(data)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

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

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
            <p className="text-xl text-gray-600">{content[language].subtitle}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-0 shadow-lg animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
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
              <Card key={job._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">{job.title[language]}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white">
                          {content[language].departments[job.department as keyof typeof content.ar.departments]}
                        </Badge>
                        {job.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            {content[language].featured}
                          </Badge>
                        )}
                      </div>
                    </div>
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
                        {/* {job.salary && (
                        <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-pink-500" />
                            {job.salary[language]}
                        </div>
                        )} */}
                    {job.experience && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-pink-500" />
                        {job.experience[language]}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => handleApplyClick(job)}
                    className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700"
                  >
                    {content[language].applyNow}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{content[language].noJobs}</p>
            </div>
          )}
        </div>
      </section>

      {/* Job Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedJob(null)
          }}
          job={selectedJob}
        />
      )}
    </>
  )
}
