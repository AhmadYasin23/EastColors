import { Navbar } from "@/components/navbar"
import { ClientsHeroSection } from "@/components/clients/clients-hero-section"
import { ClientsTestimonialsSection } from "@/components/clients/clients-testimonials-section"

import { Footer } from "@/components/footer"
import StatsSection from "@/components/clients/client-stats"

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <StatsSection/>
      </main>
      <Footer />
    </div>
  )
}
