import { Navbar } from "@/components/navbar"
import { DynamicServicesGrid } from "@/components/services/dynamic-services-grid"
import { ServiceProcessSection } from "@/components/services/service-process-section"
import { ServiceCtaSection } from "@/components/services/service-cta-section"
import { Footer } from "@/components/footer"
import { PromotionsHeroSection } from "@/components/PromotionHeroComponent"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <PromotionsHeroSection />
        <DynamicServicesGrid category="promotions"/>
        <ServiceProcessSection />
        <ServiceCtaSection />
      </main>
      <Footer />
    </div>
  )
}
