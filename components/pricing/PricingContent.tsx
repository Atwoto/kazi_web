"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import QuoteForm from "@/components/common/QuoteForm";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function PricingContent() {
  const { t } = useLanguage();

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6 text-gray-900">
            {t.pricing.pageTitle}
          </h1>
          <p className="text-lg text-gray-500 text-center mb-16 max-w-2xl mx-auto">
            {t.pricing.pageSubtitle}
          </p>
        </ScrollAnimation>

        {/* Academic Support Pricing */}
        <div className="mb-24">
          <ScrollAnimation animation="fade-up">
            <h2 className="text-3xl font-heading font-bold text-center mb-4 text-gray-900">{t.pricing.academic.title}</h2>
            <p className="text-gray-500 text-center mb-12">{t.pricing.academic.subtitle}</p>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.pricing.academic.tiers.map((tier, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                <Card className="border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col justify-between h-full hover:-translate-y-1">
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="font-heading text-2xl font-bold text-gray-900">{tier.tier}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <div className="text-center mb-6">
                      <span className="text-gray-400 text-sm block mb-1">{t.servicesHub.labels.from}</span>
                      <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    </div>
                    <p className="text-gray-600 text-center mb-6 text-sm">{tier.desc}</p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {tier.examples.map((example, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full rounded-full bg-primary hover:bg-blue-700 transition-transform hover:scale-105">
                      <Link href="/contact">{t.pricing.academic.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          {/* Disclaimer */}
          <ScrollAnimation animation="fade-up" delay={400}>
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-100 rounded-xl text-yellow-800 text-sm italic text-center max-w-3xl mx-auto">
              {t.pricing.academic.disclaimer}
              <div className="mt-2 font-semibold not-italic text-yellow-900">
                {t.pricing.academic.disclaimerHighlight}
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* General Services Pricing */}
        <div>
          <ScrollAnimation animation="fade-up">
            <h2 className="text-3xl font-heading font-bold text-center mb-4 text-gray-900">{t.pricing.general.title}</h2>
            <p className="text-gray-500 text-center mb-12">{t.pricing.general.subtitle}</p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.pricing.general.plans.map((plan, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 200}>
                <Card className="border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl h-full hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl font-bold text-gray-900">{plan.title}</CardTitle>
                    <CardDescription className="text-xl font-semibold text-primary mt-2">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{plan.desc}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <Check className="h-5 w-5 text-green-500 mr-2" /> {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full rounded-full transition-transform hover:scale-105" variant="outline">
                      <Link href="/contact">{t.pricing.general.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* What Affects Price Section */}
        <div className="mt-24 max-w-4xl mx-auto text-center">
           <ScrollAnimation animation="fade-up">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">{t.pricing.whatAffects.title}</h2>
           </ScrollAnimation>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {t.pricing.whatAffects.factors.map((factor, index) => (
                <ScrollAnimation key={index} animation="zoom-in" delay={index * 100}>
                  <div className="bg-gray-50 p-6 rounded-xl h-full hover:shadow-md transition-shadow">
                     <h3 className="font-bold text-gray-900 mb-2">{factor.title}</h3>
                     <p className="text-sm text-gray-600">{factor.text}</p>
                  </div>
                </ScrollAnimation>
              ))}
           </div>
        </div>

        {/* Get Quote Section */}
        <ScrollAnimation animation="fade-up" delay={200}>
          <div className="mt-24">
            <div className="bg-white py-16 md:py-24">
              <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                    {t.pricing.getQuote.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {t.pricing.getQuote.subtitle}
                  </p>
                </div>
                <QuoteForm />
              </div>
            </div>
          </div>
        </ScrollAnimation>

      </div>
    </div>
  );
}


