import { Navbar } from "@/components/navbar"
import { ServicesHeroSection } from "@/components/services/services-hero-section"
import { DynamicServicesGrid } from "@/components/services/dynamic-services-grid"
import { ServiceProcessSection } from "@/components/services/service-process-section"
import { ServiceCtaSection } from "@/components/services/service-cta-section"
import { Footer } from "@/components/footer"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <ServicesHeroSection />
        <DynamicServicesGrid />
        <ServiceProcessSection />
        <ServiceCtaSection />
      </main>
      <Footer />
    </div>
  )
}
