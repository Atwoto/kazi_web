"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16 text-gray-900">
          {t.home.howItWorks.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {t.home.howItWorks.steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-primary text-2xl font-bold mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                {index + 1}
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}