import type { Metadata } from "next";
import ServiceHubGrid from "@/components/services/ServiceHubGrid";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSEO["/services"].title,
  description: pageSEO["/services"].description,
};

export default function ServicesPage() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gray-900">Managed Solutions</h1>
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          We handle the complexity. You get the results. Explore our end-to-end digital services.
        </p>
      </div>
      <ServiceHubGrid />
    </div>
  );
}