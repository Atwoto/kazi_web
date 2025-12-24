"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import QuoteForm from "@/components/common/QuoteForm";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function PricingContent() {
  const { t } = useLanguage();

  const plans = t.home.pricing_plans;

  return (
    <div className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mb-6 text-gray-900">
            {t.pricing.pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 text-center mb-20 max-w-2xl mx-auto">
            {t.pricing.pageSubtitle}
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
          {plans.map((plan, index) => (
            <ScrollAnimation key={plan.name} animation="fade-up" delay={index * 100} className="h-full">
              <Card className={`relative h-full flex flex-col ${plan.highlight ? 'border-blue-500 shadow-2xl scale-105 z-10' : 'border-gray-200 shadow-sm hover:shadow-lg'} transition-all duration-300`}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                    MÁS POPULAR
                  </div>
                )}
                <CardHeader className={`text-center pt-10 pb-8 ${plan.highlight ? 'bg-blue-50/50' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-end justify-center gap-1 mb-1">
                    <span className="text-5xl font-bold text-gray-900">{plan.monthly}</span>
                    <span className="text-gray-500 mb-2 font-medium">/mes</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    + {plan.setup} configuración inicial
                  </p>
                </CardHeader>
                <CardContent className="flex-grow pt-8 px-8">
                  <ul className="space-y-5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`mt-1 rounded-full p-1 ${plan.highlight ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-gray-600 leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-10 pt-6 px-8">
                  <Button asChild className={`w-full h-14 rounded-full text-lg font-bold ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25' : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                    <Link href="/contact">
                      Comenzar Ahora
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* FAQ Teaser / Support */}
        <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 text-center max-w-5xl mx-auto">
           <ScrollAnimation animation="fade-up">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">¿Tienes dudas sobre los planes?</h2>
              <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                Nuestro equipo está aquí para ayudarte a elegir la mejor opción para tu negocio. 
                Ofrecemos demostraciones gratuitas de nuestras herramientas de reserva.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="rounded-full px-8 h-14 bg-blue-600 hover:bg-blue-700 text-lg font-bold">
                  <Link href="/contact">Hablar con un Experto</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-8 h-14 border-2 text-lg font-bold">
                  <Link href="/faq">Ver Preguntas Frecuentes</Link>
                </Button>
              </div>
           </ScrollAnimation>
        </div>

        {/* Custom Quote Section */}
        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-12">
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
  );
}