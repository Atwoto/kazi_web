import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServiceTiles from "@/components/home/ServiceTiles";
import HowItWorks from "@/components/home/HowItWorks";
import QualityControlSection from "@/components/home/QualityControlSection";
import SamplesPreview from "@/components/home/SamplesPreview";
import PricingTeaser from "@/components/home/PricingTeaser";
import SocialImpactSection from "@/components/home/SocialImpactSection";
import Testimonials from "@/components/home/Testimonials";
import ClientLogos from "@/components/common/ClientLogos";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSEO["/"].title,
  description: pageSEO["/"].description,
};

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Brand Logos / Trust Bar */}
      <section className="py-10 border-b border-border bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Trusted by forward-thinking companies in Europe</p>
          <ClientLogos />
        </div>
      </section>

      <ServiceTiles />
      <HowItWorks />
      <QualityControlSection />
      <SamplesPreview />
      <PricingTeaser />
      <Testimonials />
      <SocialImpactSection />
    </>
  );
}