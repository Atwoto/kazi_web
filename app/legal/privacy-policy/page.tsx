"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const t = translations[language].legal.privacy;

  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-8">
          {t.title}
        </h1>
        <div className="prose lg:prose-lg mx-auto text-gray-700">
          <p>{t.intro}</p>

          <h2>{t.collect.title}</h2>
          <p>{t.collect.text}</p>
          <ul>
            {t.collect.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>{t.collect.typesTitle}</h3>
          <ul>
            {t.collect.types.map((type, index) => (
              <li key={index}>
                <strong>{type.label}</strong> {type.text}
              </li>
            ))}
          </ul>

          <h2>{t.use.title}</h2>
          <p>{t.use.text}</p>
          <ul>
            {t.use.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>{t.sharing.title}</h2>
          <p>{t.sharing.text}</p>
          <ul>
            {t.sharing.list.map((item, index) => (
              <li key={index}>
                <strong>{item.label}</strong> {item.text}
              </li>
            ))}
          </ul>

          <h2>{t.retention.title}</h2>
          <p>{t.retention.text}</p>

          <h2>{t.rights.title}</h2>
          <p>{t.rights.text}</p>
          <ul>
            {t.rights.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>{t.rights.contact}</p>

          <h2>{t.security.title}</h2>
          <p>{t.security.text}</p>

          <h2>{t.international.title}</h2>
          <p>{t.international.text}</p>

          <h2>{t.changes.title}</h2>
          <p>{t.changes.text}</p>

          <h2>{t.contact.title}</h2>
          <p>{t.contact.text}</p>
          <p>
            {t.contact.emailLabel}{" "}
            <a href="mailto:hello@kaziagency.es" className="text-primary hover:underline">
              hello@kaziagency.es
            </a>
          </p>
          <p>
            {t.contact.controller}
            <br />
            {t.contact.website}
            <br />
            Email: hello@kaziagency.es
          </p>
        </div>
      </div>
    </div>
  );
}
