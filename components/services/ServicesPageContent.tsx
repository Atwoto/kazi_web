"use client";

import ServiceHubGrid from "@/components/services/ServiceHubGrid";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function ServicesPageContent() {
  const { t } = useLanguage();

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <ScrollAnimation animation="fade-up">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gray-900">{t.servicesHub.title}</h1>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            {t.servicesHub.subtitle}
          </p>
        </ScrollAnimation>
      </div>
      <ServiceHubGrid />
    </div>
  );
}

