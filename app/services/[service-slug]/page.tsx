import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/service-data";
import { defaultSEO } from "@/lib/seo";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

interface ServicePageProps {
  params: Promise<{
    "service-slug": string;
  }>;
}

export async function generateMetadata({ params }: { params: { 'service-slug': string } }): Promise<Metadata> {
  const service = servicesData.find(s => s.slug === params['service-slug']);
  if (!service) {
    return {
      title: "Service Not Found | Kazi Agency",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.name} | Kazi Agency`,
    description: `Learn more about our ${service.name} services for local businesses in Catalonia.`,
    keywords: `${service.name}, local agency, Catalonia, digital services`,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
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
