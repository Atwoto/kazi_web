"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function PricingTeaser() {
  const { t } = useLanguage();

  const plans = t.home.pricing_plans;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t.home.pricing.title} <span className="text-blue-600">{t.home.pricing.titleHighlight}</span>
            </h2>
            <p className="text-gray-500 text-lg">
              {t.home.pricing.subtitle}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollAnimation key={plan.name} animation="fade-up" delay={index * 100} className="h-full">
              <Card className={`relative h-full flex flex-col ${plan.highlight ? 'border-blue-500 shadow-2xl scale-105 z-10' : 'border-gray-200 shadow-sm hover:shadow-lg'} transition-all duration-300`}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                    MÁS POPULAR
                  </div>
                )}
                <CardHeader className={`text-center pt-8 ${plan.highlight ? 'bg-blue-50/50' : ''}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-end justify-center gap-1 mb-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.monthly}</span>
                    <span className="text-gray-500 mb-1">/mes</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    + {plan.setup} configuración
                  </p>
                </CardHeader>
                <CardContent className="flex-grow pt-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-full p-1 ${plan.highlight ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-8 pt-4">
                  <Button asChild className={`w-full rounded-full ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25' : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                    <Link href="/pricing">
                      Elegir Plan
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}