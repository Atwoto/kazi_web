import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServiceTiles from "@/components/home/ServiceTiles";
import HowItWorks from "@/components/home/HowItWorks";
import QualityControlSection from "@/components/home/QualityControlSection";
import PMStandards from "@/components/home/PMStandards";
import SamplesPreview from "@/components/home/SamplesPreview";
import PricingTeaser from "@/components/home/PricingTeaser";
import SocialImpactSection from "@/components/home/SocialImpactSection";
import Testimonials from "@/components/home/Testimonials";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSEO["/"].title,
  description: pageSEO["/"].description,
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceTiles />
      <HowItWorks />
      <QualityControlSection />
      <PMStandards />
      <SamplesPreview />
      <PricingTeaser />
      <Testimonials />
      <SocialImpactSection />
    </>
  );
}