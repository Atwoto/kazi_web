"use client";

import { Clock, MessageSquare, CheckCircle2, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function PMStandards() {
  const { t } = useLanguage();

  const standards = t.pmStandards.standards.map((standard, index) => {
    const icons = [Clock, MessageSquare, CheckCircle2, Shield];
    return {
      icon: icons[index],
      title: standard.title,
      description: standard.description,
    };
  });

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              {t.pmStandards.title}
            </h2>
            <p className="text-lg text-gray-500">
              {t.pmStandards.subtitle}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {standards.map((standard, index) => (
            <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
              <div className="flex items-start p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow h-full">
                <div className="bg-blue-100 p-3 rounded-xl mr-4 shrink-0">
                  <standard.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{standard.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{standard.description}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="zoom-in" delay={400}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full border border-blue-100">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span className="text-blue-900 font-semibold">{t.pmStandards.badge}</span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

