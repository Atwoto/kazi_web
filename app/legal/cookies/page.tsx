"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function CookiesPage() {
  const { language } = useLanguage();
  const t = translations[language].legal.cookies;

  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-8">
          {t.title}
        </h1>
        <div className="prose lg:prose-lg mx-auto text-gray-700">
          <p>{t.intro}</p>

          <h2>{t.what.title}</h2>
          <p>{t.what.text}</p>

          <h2>{t.use.title}</h2>
          <p>{t.use.text}</p>
          <ul>
            {t.use.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>{t.types.title}</h2>
          <ul>
            {t.types.list.map((item, index) => (
              <li key={index}>
                <strong>{item.label}</strong> {item.text}
              </li>
            ))}
          </ul>

          <h2>{t.thirdParty.title}</h2>
          <p>{t.thirdParty.text}</p>
          <ul>
            {t.thirdParty.list.map((item, index) => (
              <li key={index}>
                <strong>{item.label}</strong> {item.text}{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Analytics Opt-out
                </a>
              </li>
            ))}
          </ul>

          <h2>{t.choices.title}</h2>
          <p>{t.choices.text}</p>
          <ul>
            {t.choices.list.map((item, index) => (
              <li key={index}>
                <strong>{item.label}</strong> {item.text}{" "}
                {index === 1 && (
                  <a
                    href="http://www.youronlinechoices.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Your Online Choices
                  </a>
                )}
              </li>
            ))}
          </ul>

          <p>{t.choices.note}</p>

          <h2>{t.moreInfo.title}</h2>
          <p>{t.moreInfo.text}</p>
          <ul>
            <li>
              {t.moreInfo.label}{" "}
              <a
                href="https://www.allaboutcookies.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.allaboutcookies.org/
              </a>
            </li>
          </ul>

          <h2>{t.contact.title}</h2>
          <p>
            {t.contact.text}{" "}
            <a
              href="mailto:hello@kaziagency.es"
              className="text-primary hover:underline"
            >
              hello@kaziagency.es
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
