import { Navbar } from "@/components/navbar"
import { AboutHeroSection } from "@/components/about/about-hero-section"
import { AboutStorySection } from "@/components/about/about-story-section"
import { AboutValuesSection } from "@/components/about/about-values-section"
import { AboutTeamSection } from "@/components/about/about-team-section"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <AboutHeroSection />
        <AboutStorySection />
        <AboutValuesSection />
        {/* <AboutTeamSection /> */}
      </main>
      <Footer />
    </div>
  )
}
