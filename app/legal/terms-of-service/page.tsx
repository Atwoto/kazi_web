"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function TermsOfServicePage() {
  const { language } = useLanguage();
  const t = translations[language].legal.terms;

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 text-gray-900">
          {t.title}
        </h1>
        <div className="prose lg:prose-lg mx-auto text-gray-600">
          <p>{t.intro}</p>

          <h3>{t.core.title}</h3>
          {t.core.rules.map((rule, index) => (
            <p key={index}>
              <strong>{rule.label}</strong> {rule.text}
            </p>
          ))}

          <h3>{t.delivery.title}</h3>
          <p>{t.delivery.text}</p>

          <h3>{t.payments.title}</h3>
          <p>{t.payments.text}</p>

          <h3>{t.academic.title}</h3>
          <p>
            {t.academic.text} <strong>{t.academic.strong}</strong>
          </p>
          <p>{t.academic.agreement}</p>
          <ul>
            {t.academic.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>{t.ip.title}</h3>
          <p>{t.ip.text}</p>
        </div>
      </div>
    </div>
  );
}