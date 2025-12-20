"use client";

import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function QualityControlSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              {t.home.quality.title} <br />
              <span className="text-blue-600">{t.home.quality.titleHighlight}</span>
            </h2>
            <p className="text-lg text-gray-500">
              {t.home.quality.subtitle}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {t.home.quality.checks.map((check, index) => (
            <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
              <div className="flex items-start p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow h-full">
                <CheckCircle2 className="w-8 h-8 text-green-500 mr-4 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{check.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{check.description}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

