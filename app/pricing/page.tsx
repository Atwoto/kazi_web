import type { Metadata } from "next";
import PricingContent from "@/components/pricing/PricingContent";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSEO["/pricing"].title,
  description: pageSEO["/pricing"].description,
};

export default function PricingPage() {
  return <PricingContent />;
}