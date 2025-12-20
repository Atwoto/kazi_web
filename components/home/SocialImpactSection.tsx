"use client";

import { Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function SocialImpactSection() {
  const { t } = useLanguage();

  return (
    <section className="pt-16 pb-24 bg-blue-50 border-t border-blue-100">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <ScrollAnimation animation="zoom-in">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
            <Heart className="w-6 h-6 text-red-500 fill-current animate-pulse" />
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fade-up" delay={200}>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            {t.home.impact.title}
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={400}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {t.home.impact.text}
          </p>
        </ScrollAnimation>

        {t.home.impact.badge && (
          <ScrollAnimation animation="fade-up" delay={600}>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
              <span>{t.home.impact.badge}</span>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  );
}

