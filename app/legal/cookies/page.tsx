"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Cookie, Info, Settings, ShieldCheck, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookiesPage() {
  const { language } = useLanguage();
  const t = translations[language].legal.cookies;

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

            {/* What are cookies */}
            <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
               <div className="flex items-start gap-4">
                  <Cookie className="h-8 w-8 text-primary shrink-0" />
                  <div>
                     <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.what.title}</h2>
                     <p className="text-gray-700 leading-relaxed">{t.what.text}</p>
                  </div>
               </div>
            </section>

            {/* How we use & Types */}
            <div className="grid md:grid-cols-2 gap-8">
               <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                     <Info className="h-6 w-6 text-gray-400" />
                     {t.use.title}
                  </h2>
                  <p className="text-gray-600">{t.use.text}</p>
                  <ul className="space-y-3">
                    {t.use.list.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
               </section>

               <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                     <Settings className="h-6 w-6 text-gray-400" />
                     {t.types.title}
                  </h2>
                  <ul className="space-y-4">
                    {t.types.list.map((item, index) => (
                      <li key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <strong className="block text-gray-900 mb-1">{item.label}</strong>
                        <span className="text-sm text-gray-600">{item.text}</span>
                      </li>
                    ))}
                  </ul>
               </section>
            </div>

            <hr className="border-gray-100" />

            {/* Third Party & Choices */}
            <section className="space-y-8">
               <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">{t.thirdParty.title}</h2>
                  <p className="text-gray-600">{t.thirdParty.text}</p>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 inline-block">
                     {t.thirdParty.list.map((item, index) => (
                        <div key={index} className="text-sm">
                           <strong className="text-gray-900">{item.label}</strong> {item.text}{" "}
                           <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                              Google Analytics Opt-out
                           </a>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                     <ShieldCheck className="h-6 w-6 text-green-600" />
                     {t.choices.title}
                  </h2>
                  <p className="text-gray-600">{t.choices.text}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                     {t.choices.list.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                           <strong className="block text-gray-900 mb-2">{item.label}</strong>
                           <p className="text-sm text-gray-600 mb-2">{item.text}</p>
                           {index === 1 && (
                              <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
                                 Your Online Choices →
                              </a>
                           )}
                        </div>
                     ))}
                  </div>
                  <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100 flex items-start gap-2">
                     <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                     {t.choices.note}
                  </p>
               </div>
            </section>

             {/* Footer Contact */}
             <div className="bg-gray-900 text-white p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                   <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      {t.contact.title}
                   </h2>
                   <p className="text-gray-300 text-sm max-w-md">
                      {t.contact.text}{" "}
                      <a href="mailto:hello@kaziagency.es" className="text-white hover:text-blue-300 underline underline-offset-4">
                         hello@kaziagency.es
                      </a>
                   </p>
                </div>
                
                <div className="text-sm text-gray-400 border-l border-gray-700 pl-6">
                   <p className="font-semibold text-gray-300 mb-1">{t.moreInfo.title}</p>
                   <p className="mb-1">{t.moreInfo.text}</p>
                   <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">
                      AllAboutCookies.org
                   </a>
                </div>
             </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}