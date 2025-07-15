"use client"
import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { Calendar, ExternalLink, User, Building, ArrowLeft, ArrowRight, Tag } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { PortableTextBlock } from "sanity"


export interface ProjectData {
  title: Record<"ar" | "en", string>
  description?: Partial<Record<"ar" | "en", string>>
  category?: string
  mainImage?: string
  gallery?: string[]
  client?: { name?: string; industry?: string; website?: string }
  completionDate?: string
  featured?: boolean
  technologies?: string[]
  challenges?: Partial<Record<"ar" | "en", PortableTextBlock[]>>
  solution?: Partial<Record<"ar" | "en", PortableTextBlock[]>>
  results?: Partial<Record<"ar" | "en", PortableTextBlock[]>>
  publishedAt?: string
}

export function ProjectDetails({ project }: { project: ProjectData }) {
  const { language } = useLanguage()

  const content = {
    ar: {
      backToPortfolio: "العودة إلى المعرض",
      client: "العميل",
      industry: "القطاع",
      website: "الموقع الإلكتروني",
      completedOn: "تم الإنجاز في",
      technologiesUsed: "التقنيات المستخدمة",
      challenges: "التحديات",
      solution: "حلولنا",
      results: "النتائج",
      publishedOn: "نُشِر في",
      featured: "مشروع مميز",
      projectGallery: "معرض المشروع",
      categories: {
        digital: "لوحات رقمية",
        printing: "طباعة",
        design: "تصميم",
        signage: "لافتات",
        vehicle: "إعلانات المركبات",
      },
    },
    en: {
      backToPortfolio: "Back to Portfolio",
      client: "Client",
      industry: "Industry",
      website: "Website",
      completedOn: "Completed on",
      technologiesUsed: "Technologies Used",
      challenges: "Challenges",
      solution: "Our Solution",
      results: "Results",
      publishedOn: "Published on",
      featured: "Featured Project",
      projectGallery: "Project Gallery",
      categories: {
        digital: "Digital Signage",
        printing: "Printing",
        design: "Design",
        signage: "Signage",
        vehicle: "Vehicle Advertising",
      },
    },
  }

  const title = project.title[language]
  const description = project.description?.[language] ?? ""
  const gallery = project.gallery ?? []
  const challenges = project.challenges?.[language] ?? []
  const solution = project.solution?.[language] ?? []
  const results = project.results?.[language] ?? []

  const getCategoryLabel = (category: string) => {
    return content[language].categories[category as keyof typeof content.ar.categories] || category
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return language === "ar"
      ? date.toLocaleDateString("ar-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/portfolio">
            <Button
              variant="ghost"
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              {language === "ar" ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
              {content[language].backToPortfolio}
            </Button>
          </Link>
        </div>

        <article className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12" dir={language === "ar" ? "rtl" : "ltr"}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {project.category && (
                <Badge className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-4 py-2">
                  <Tag className="w-4 h-4 mr-2 ml-2" />
                  {getCategoryLabel(project.category)}
                </Badge>
              )}
              {project.featured && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2">
                  {content[language].featured}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">{title}</h1>

            {description && <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{description}</p>}
          </div>

          {/* Main Image */}
          {project.mainImage && (
            <div className="mb-12">
              <Card className="border-0 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={project.mainImage || "/placeholder.svg"}
                    alt={title}
                    width={1200}
                    height={800}
                    className="w-full h-[400px] md:h-[600px] object-cover"
                    priority
                  />
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Gallery */}
              {gallery.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" dir={language === "ar" ? "rtl" : "ltr"}>
                    {content[language].projectGallery}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {gallery.map((url, idx) => (
                      <Card key={idx} className="border-0 shadow-lg overflow-hidden group">
                        <CardContent className="p-0">
                          <Image
                            src={url || "/placeholder.svg"}
                            alt={`${title} ${idx + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Challenges */}
              {/* {challenges.length > 0 && (
                <section>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2
                        className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                        dir={language === "ar" ? "rtl" : "ltr"}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">!</span>
                        </div>
                        {content[language].challenges}
                      </h2>
                      <div className="prose prose-lg max-w-none" dir={language === "ar" ? "rtl" : "ltr"}>
                        <PortableText value={challenges} />
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )} */}

              {/* Solution */}
              {/* {solution.length > 0 && (
                <section>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2
                        className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                        dir={language === "ar" ? "rtl" : "ltr"}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">💡</span>
                        </div>
                        {content[language].solution}
                      </h2>
                      <div className="prose prose-lg max-w-none" dir={language === "ar" ? "rtl" : "ltr"}>
                        <PortableText value={solution} />
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )} */}

              {/* Results */}
              {/* {results.length > 0 && (
                <section>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h2
                        className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                        dir={language === "ar" ? "rtl" : "ltr"}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        {content[language].results}
                      </h2>
                      <div className="prose prose-lg max-w-none" dir={language === "ar" ? "rtl" : "ltr"}>
                        <PortableText value={results} />
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )} */}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Info */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6" dir={language === "ar" ? "rtl" : "ltr"}>
                    {language === "ar" ? "معلومات المشروع" : "Project Info"}
                  </h3>

                  <div className="space-y-6">
                    {/* Client Info */}
                    {project.client && (
                      <div className="space-y-4">
                        {project.client.name && (
                          <div className="flex items-center space-x-3" dir={language === "ar" ? "rtl" : "ltr"}>
                            <div className="ml-1 w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">{content[language].client}</dt>
                              <dd className="text-lg font-semibold text-gray-900">{project.client.name}</dd>
                            </div>
                          </div>
                        )}

                        {project.client.industry && (
                          <div className="flex items-center space-x-3" dir={language === "ar" ? "rtl" : "ltr"}>
                            <div className="ml-1 w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center">
                              <Building className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">{content[language].industry}</dt>
                              <dd className="text-lg font-semibold text-gray-900">{project.client.industry}</dd>
                            </div>
                          </div>
                        )}

                        {project.client.website && (
                          <div className="flex items-center space-x-3" dir={language === "ar" ? "rtl" : "ltr"}>
                            <div className="ml-1 w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center">
                              <ExternalLink className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">{content[language].website}</dt>
                              <dd>
                                <a
                                  href={project.client.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-pink-600 hover:text-pink-700 font-semibold"
                                >
                                  {project.client.website.replace(/^https?:\/\//, "")}
                                </a>
                              </dd>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Completion Date */}
                    {project.completionDate && (
                      <div className="flex items-center space-x-3" dir={language === "ar" ? "rtl" : "ltr"}>
                        <div className="ml-1 w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">{content[language].completedOn}</dt>
                          <dd className="text-lg font-semibold text-gray-900">{formatDate(project.completionDate)}</dd>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              {project.technologies?.length && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6" dir={language === "ar" ? "rtl" : "ltr"}>
                      {content[language].technologiesUsed}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="px-3 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-500 to-indigo-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">
                    {language === "ar" ? "هل لديك مشروع مشابه؟" : "Have a Similar Project?"}
                  </h3>
                  <p className="mb-6 opacity-90">
                    {language === "ar" ? "دعنا نساعدك في تحقيق رؤيتك" : "Let us help you bring your vision to life"}
                  </p>
                  <Link href="/contact">
                    <Button className="bg-white text-pink-600 hover:bg-gray-100 font-semibold">
                      {language === "ar" ? "تواصل معنا" : "Contact Us"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          {project.publishedAt && (
            <div className="mt-16 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                {content[language].publishedOn} {formatDate(project.publishedAt)}
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
