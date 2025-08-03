export const revalidate = 60;

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import StatsSection from "@/components/home/stats-section";
import { CtaSection } from "@/components/home/cta-section";
import { DynamicTestimonials } from "@/components/dynamic-testimonials";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
          {/* <DynamicTestimonials /> */}
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
