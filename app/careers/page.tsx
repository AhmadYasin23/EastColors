import { Navbar } from "@/components/navbar"
import { CareersHeroSection } from "@/components/careers/careers-hero-section"
import { WhyWorkWithUsSection } from "@/components/careers/why-work-with-us-section"
import { DynamicJobListingsSection } from "@/components/careers/dynamic-job-listings-section"
import { CompanyCultureSection } from "@/components/careers/company-culture-section"
import { BenefitsSection } from "@/components/careers/benefits-section"
import { ApplicationProcessSection } from "@/components/careers/application-process-section"
import { Footer } from "@/components/footer"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <CareersHeroSection />
        {/* <WhyWorkWithUsSection /> */}
        <DynamicJobListingsSection />
        {/* <CompanyCultureSection /> */}
        {/* <BenefitsSection /> */}
        <ApplicationProcessSection />
      </main>
      <Footer />
    </div>
  )
}
