import { Navbar } from "@/components/navbar"
import { ContactHeroSection } from "@/components/contact/contact-hero-section"
import { ContactFormSection } from "@/components/contact/contact-form-section"
import { ContactInfoSection } from "@/components/contact/contact-info-section"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <ContactHeroSection />
        <div className="grid lg:grid-cols-2 gap-0">
          <ContactFormSection />
          <ContactInfoSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
