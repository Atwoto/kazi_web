"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Code, Edit, Sparkles, BookOpen, Globe, Video } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceTileProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}

function ServiceTile({ icon: Icon, title, description, href }: ServiceTileProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full flex flex-col p-8 rounded-2xl border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white group-hover:-translate-y-1">
        <CardHeader className="p-0 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
            <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
          </div>
          <CardTitle className="text-xl font-heading font-bold text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm leading-relaxed text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ServiceTiles() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Video,
      title: t.footer.serviceNames.videoEditing,
      description: t.nav.serviceDescriptions.videoEditing,
      href: "/services/video-editing",
    },
    {
      icon: Camera,
      title: t.footer.serviceNames.photoEditing,
      description: t.nav.serviceDescriptions.photoEditing,
      href: "/services/photo-editing",
    },
    {
      icon: Globe,
      title: t.footer.serviceNames.webDev,
      description: t.nav.serviceDescriptions.webDev,
      href: "/services/web-design-development",
    },
    {
      icon: Sparkles,
      title: t.footer.serviceNames.graphicDesign,
      description: t.nav.serviceDescriptions.graphicDesign,
      href: "/services/graphic-design",
    },
    {
      icon: Code,
      title: t.footer.serviceNames.aiServices,
      description: t.nav.serviceDescriptions.aiServices,
      href: "/services/ai-services",
    },
    {
      icon: BookOpen,
      title: t.footer.serviceNames.academicSupport,
      description: t.nav.serviceDescriptions.academicSupport,
      href: "/services/academic-support",
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">{t.home.serviceTiles.title}</h2>
          <p className="text-gray-500">{t.home.serviceTiles.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceTile key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
