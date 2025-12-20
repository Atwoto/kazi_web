"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, FileText, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const t = translations[language].legal.privacy;

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
          <CardContent className="p-8 md:p-12 space-y-12">
            
            {/* Information Collection */}
            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-xl text-primary shrink-0 mt-1">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="space-y-4 flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{t.collect.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{t.collect.text}</p>
                  <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                    {t.collect.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="block w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.collect.typesTitle}</h3>
                    <div className="grid gap-4">
                      {t.collect.types.map((type, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-2 text-sm">
                          <span className="font-semibold text-gray-900 min-w-[180px]">{type.label}</span>
                          <span className="text-gray-600">{type.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How We Use */}
            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-xl text-green-600 shrink-0 mt-1">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="space-y-4 flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{t.use.title}</h2>
                  <p className="text-gray-600">{t.use.text}</p>
                  <ul className="space-y-3">
                    {t.use.list.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-700">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Sharing */}
            <section className="space-y-6">
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-purple-50 rounded-xl text-purple-600 shrink-0 mt-1">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="space-y-4 flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{t.sharing.title}</h2>
                  <p className="text-gray-600">{t.sharing.text}</p>
                  <div className="space-y-4">
                    {t.sharing.list.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="font-semibold text-gray-900 mb-1">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

             {/* Security & Retention Grouped */}
             <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold text-gray-900">{t.security.title}</h2>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl">
                    {t.security.text}
                  </p>
                </section>
                
                <section className="space-y-4">
                   <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold text-gray-900">{t.retention.title}</h2>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl">
                    {t.retention.text}
                  </p>
                </section>
             </div>


            {/* Rights */}
            <section className="space-y-6 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">{t.rights.title}</h2>
              <p className="text-gray-600">{t.rights.text}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.rights.list.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white">
                     <div className="h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                     <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 italic bg-blue-50/50 p-3 rounded-lg border border-blue-100 inline-block">
                {t.rights.contact}
              </p>
            </section>

             {/* Changes & Contact */}
             <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <section className="space-y-4">
                   <h2 className="text-xl font-bold text-gray-900">{t.changes.title}</h2>
                   <p className="text-gray-600 text-sm">{t.changes.text}</p>
                </section>

                <section className="space-y-4 bg-gray-900 text-white p-6 rounded-2xl">
                   <h2 className="text-xl font-bold mb-4">{t.contact.title}</h2>
                   <p className="text-gray-300 text-sm mb-4">{t.contact.text}</p>
                   
                   <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-400 block text-xs uppercase tracking-wider mb-1">Email</span>
                         <a href="mailto:hello@kaziagency.es" className="text-white hover:text-blue-300 font-medium text-lg transition-colors">
                            hello@kaziagency.es
                         </a>
                      </p>
                      <div className="pt-4 mt-4 border-t border-gray-800">
                         <p className="text-gray-400">{t.contact.controller}</p>
                         <p className="text-gray-400">{t.contact.website}</p>
                      </div>
                   </div>
                </section>
             </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}