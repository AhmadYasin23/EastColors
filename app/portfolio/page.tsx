import { Navbar } from "@/components/navbar"
import { PortfolioHeroSection } from "@/components/portfolio/portfolio-hero-section"
import { DynamicPortfolioGrid } from "@/components/portfolio/dynamic-portfolio-grid"
import { PortfolioTestimonialsSection } from "@/components/portfolio/portfolio-testimonials-section"
import { Footer } from "@/components/footer"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <PortfolioHeroSection />
        <DynamicPortfolioGrid />
        {/* <PortfolioTestimonialsSection /> */}
      </main>
      <Footer />
    </div>
  )
}
