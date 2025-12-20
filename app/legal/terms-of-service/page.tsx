"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle, FileCheck, Scale, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
  const { language } = useLanguage();
  const t = translations[language].legal.terms;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
             <Link href="/" className="flex items-center gap-2 text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
              {translations[language].nav.home}
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1.5 text-sm font-medium rounded-full">
            Legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.intro}
          </p>
        </div>

        <Card className="border-none shadow-xl shadow-gray-200/50 bg-white rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-12 space-y-16">
            
            {/* 1. Core Business Rules */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg shrink-0">1</div>
                <h2 className="text-2xl font-bold text-gray-900">{t.core.title}</h2>
              </div>
              
              <div className="grid gap-4 md:grid-cols-1">
                {t.core.rules.map((rule, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                       <CheckCircle2 className="h-5 w-5 text-primary" />
                       {rule.label}
                    </h3>
                    <p className="text-gray-600 ml-7">{rule.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2 & 3 Split */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <section className="space-y-4">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg shrink-0">2</div>
                    <h3 className="text-xl font-bold text-gray-900">{t.delivery.title}</h3>
                 </div>
                 <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm h-full">
                    <p className="text-gray-600 leading-relaxed">{t.delivery.text}</p>
                 </div>
              </section>

              <section className="space-y-4">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg shrink-0">3</div>
                    <h3 className="text-xl font-bold text-gray-900">{t.payments.title}</h3>
                 </div>
                 <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm h-full">
                    <p className="text-gray-600 leading-relaxed">{t.payments.text}</p>
                 </div>
              </section>
            </div>

            {/* 4. Academic Support */}
            <section className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
               <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg shrink-0">4</div>
                <h2 className="text-2xl font-bold text-gray-900">{t.academic.title}</h2>
              </div>

              <div className="space-y-6">
                 <div className="flex gap-4 items-start">
                    <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                    <div>
                       <p className="text-gray-800 mb-2">{t.academic.text}</p>
                       <p className="font-bold text-amber-800">{t.academic.strong}</p>
                    </div>
                 </div>

                 <div className="bg-white/60 p-6 rounded-xl border border-amber-100">
                    <p className="font-semibold text-gray-900 mb-4">{t.academic.agreement}</p>
                    <ul className="space-y-3">
                      {t.academic.list.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                           <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2.5 shrink-0" />
                           {item}
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>
            </section>

            {/* 5. IP */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg shrink-0">5</div>
                <h2 className="text-2xl font-bold text-gray-900">{t.ip.title}</h2>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                 <div className="flex gap-4">
                    <Scale className="h-6 w-6 text-gray-400 shrink-0" />
                    <p className="text-gray-600">{t.ip.text}</p>
                 </div>
              </div>
            </section>

             {/* Footer Contact */}
             <div className="bg-gray-900 text-white p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-8">
                <div>
                   <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
                      <Mail className="h-5 w-5" />
                      Contact Us
                   </h2>
                   <p className="text-gray-300 text-sm max-w-md">
                      For any questions about these Terms, please contact us at{" "}
                      <a href="mailto:hello@kaziagency.es" className="text-white hover:text-blue-300 underline underline-offset-4">
                         hello@kaziagency.es
                      </a>
                   </p>
                </div>
             </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
