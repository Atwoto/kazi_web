"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQContent() {
  const { t } = useLanguage();

  const faqGroups = [
    {
      category: t.faq.categories.general,
      items: t.faq.questions.general
    },
    {
      category: t.faq.categories.payments,
      items: t.faq.questions.payments
    },
    {
      category: t.faq.categories.privacy,
      items: t.faq.questions.privacy
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6 text-gray-900">
          {t.faq.pageTitle}
        </h1>
        <p className="text-lg text-gray-500 text-center mb-16">
          {t.faq.pageSubtitle}
        </p>

        <div className="space-y-16">
          {faqGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                {group.category}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {group.items.map((faq, index) => (
                  <AccordionItem value={`item-${groupIndex}-${index}`} key={index} className="border border-gray-100 rounded-xl px-6 data-[state=open]:bg-gray-50 data-[state=open]:border-blue-100 transition-colors">
                    <AccordionTrigger className="font-semibold text-lg text-left py-6 hover:no-underline text-gray-900">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
