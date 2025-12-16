import { notFound } from "next/navigation";
import { servicesData } from "@/lib/service-data";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

interface ServicePageProps {
  params: Promise<{
    "service-slug": string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = servicesData.find(
    (s) => s.slug === resolvedParams["service-slug"]
  );

  if (!service) {
    notFound();
  }

  return <ServicePageTemplate service={service} />;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    "service-slug": service.slug,
  }));
}
