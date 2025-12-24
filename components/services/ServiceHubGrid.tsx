"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/lib/service-data";
import { Clock, Euro, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function ServiceHubGrid() {
  const { t } = useLanguage();

  const getServiceTitle = (slug: string) => {
    switch (slug) {
      case "video-editing": return t.footer.serviceNames.videoEditing;
      case "photo-editing": return t.footer.serviceNames.photoEditing;
      case "web-design-development": return t.footer.serviceNames.webDev;
      case "graphic-design": return t.footer.serviceNames.graphicDesign;
      case "ai-services": return t.footer.serviceNames.aiServices;
      case "academic-support": return t.footer.serviceNames.academicSupport;
      default: return "";
    }
  };

  // Map English audience strings to translation keys
  const getAudience = (audience?: string) => {
    if (!audience) return t.servicesHub.audience.businessPro;
    if (audience.includes("Startups")) return t.servicesHub.audience.startups;
    if (audience.includes("Marketing")) return t.servicesHub.audience.marketing;
    if (audience.includes("Executives")) return t.servicesHub.audience.executives;
    if (audience.includes("Agencies")) return t.servicesHub.audience.agencies;
    if (audience.includes("Enterprise")) return t.servicesHub.audience.enterprise;
    if (audience.includes("SaaS")) return t.servicesHub.audience.saas;
    if (audience.includes("Creators")) return t.servicesHub.audience.creators;
    if (audience.includes("E-commerce")) return t.servicesHub.audience.ecommerce;
    if (audience.includes("Tech")) return t.servicesHub.audience.tech;
    if (audience.includes("Students")) return t.servicesHub.audience.students;
    return audience; // Fallback
  };

  const allowedSlugs = [
    "web-design-development",
    "social-media-management",
    "graphic-design",
    "ai-services"
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData
            .filter(service => allowedSlugs.includes(service.slug))
            .map((service, index) => (
            <ScrollAnimation key={service.slug} animation="fade-up" delay={index * 100} className="h-full">
              <Card className="flex flex-col h-full border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden group">
                <CardHeader className="bg-gray-50 pb-6">
                  <div className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">
                     {getAudience(service.targetAudience)}
                  </div>
                  <CardTitle className="font-heading text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                    {getServiceTitle(service.slug) || service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pt-6">
                  <p className="text-gray-500 mb-6 leading-relaxed">
                    {service.oneLiner}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.deliverables.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start text-sm text-gray-600">
                        <span className="mr-2 text-blue-400">•</span> {item}
                      </div>
                    ))}
                    {service.deliverables.length > 3 && (
                       <div className="text-xs text-gray-400 pl-3 italic">+ {service.deliverables.length - 3} more...</div>
                    )}
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                     {service.startingPrice && (
                       <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                          <Euro className="w-4 h-4 text-green-500" />
                          <span>{t.servicesHub.labels.from} {service.startingPrice}</span>
                       </div>
                     )}
                     {service.turnaround && (
                       <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{service.turnaround}</span>
                       </div>
                     )}
                  </div>
                </CardContent>
                <CardFooter className="bg-white pt-2 pb-6">
                  <Button asChild className="w-full rounded-full group-hover:bg-blue-600 transition-colors" variant="outline">
                    <Link href={`/services/${service.slug}`}>
                      {t.servicesHub.labels.viewService} <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
