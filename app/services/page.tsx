import type { Metadata } from "next";
import ServicesPageContent from "@/components/services/ServicesPageContent";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSEO["/services"].title,
  description: pageSEO["/services"].description,
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}