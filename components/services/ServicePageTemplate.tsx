"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Euro, RefreshCw, ChevronRight, FileText, X, ChevronLeft, Images, Eye } from "lucide-react";
import { Service } from "@/lib/service-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";

interface ServicePageTemplateProps {
  service: Service;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get translated service data, fallback to English/default if not found or for fields not in translation
  // We use 'as any' here because service.slug is a string, and t.services keys are specific strings.
  const translatedData = (t.services as any)[service.slug] || {};
  
  const name = translatedData.name || service.name;
  const oneLiner = translatedData.oneLiner || service.oneLiner;
  const deliverables = translatedData.deliverables || service.deliverables;
  const process = translatedData.process || service.process;
  const faqs = translatedData.faqs || service.faqs;
  // Examples are currently not in translation file, so we use the prop
  const examples = service.examples; 

  const openPreview = (item: any) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closePreview = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full mb-6">
                <span className="text-xs font-bold text-primary uppercase tracking-wide">{t.servicePage.managedService}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 leading-tight mb-6">
                {name}
              </h1>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-lg">
                {oneLiner}
              </p>
              <div className="flex gap-4">
                <Button asChild className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                  <Link href={service.ctaLink}>{t.servicePage.startProject}</Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-full px-8 py-6 text-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  <Link href="#samples">{t.servicePage.viewPortfolio}</Link>
                </Button>
              </div>
              
              {/* Trust/Guarantee Icons */}
              <div className="flex gap-6 mt-8 text-sm text-gray-500 font-medium">
                 <span className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> {t.servicePage.vettedTalent}</span>
                 <span className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> {t.servicePage.guarantee}</span>
              </div>
            </div>
            
            {/* Hero Image / Graphic */}
            <div className="relative h-[400px] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
               <Image
                 src={service.heroImage}
                 alt={name}
                 layout="fill"
                 objectFit="cover"
                 className="opacity-80"
               />
               {/* Overlay Text/Badge Mock */}
               <div className="absolute bottom-6 left-6 text-white p-4 bg-black/50 backdrop-blur rounded-xl">
                 <p className="font-bold">Clean Code Architecture</p>
                 <p className="text-xs opacity-80">Scalable SaaS & Marketplace Dev</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Info Row */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-blue-50 p-3 rounded-full text-primary"><Clock className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">{t.servicePage.turnaround}</p>
                  <p className="font-heading font-bold text-gray-900">
                    {service.turnaround || "10-14 Days"}
                  </p>
                </div>
             </div>
             <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-blue-50 p-3 rounded-full text-primary"><Euro className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">{t.servicePage.startsFrom}</p>
                  <p className="font-heading font-bold text-gray-900">
                    {service.startingPrice || "€25"}
                  </p>
                </div>
             </div>
             <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-blue-50 p-3 rounded-full text-primary"><RefreshCw className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">{t.servicePage.revisions}</p>
                  <p className="font-heading font-bold text-gray-900">2 Rounds</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Tabs Section: Overview, Process, Samples, FAQ */}
      <section id="samples" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-gray-100 p-1 rounded-full">
                <TabsTrigger value="overview" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">{t.servicePage.tabs.overview}</TabsTrigger>
                <TabsTrigger value="process" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">{t.servicePage.tabs.process}</TabsTrigger>
                <TabsTrigger value="samples" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">{t.servicePage.tabs.samples}</TabsTrigger>
                <TabsTrigger value="faq" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">{t.servicePage.tabs.faq}</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">{t.servicePage.whatYouGet}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {deliverables.map((item: string, index: number) => (
                    <div key={index} className="flex items-start bg-gray-50 p-6 rounded-2xl hover:bg-blue-50 transition-colors duration-300">
                      <div className="bg-blue-100 text-blue-600 rounded-full p-2 mt-0.5 mr-4 shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{item}</p>
                        <p className="text-sm text-gray-500 mt-2">Professional standard delivery ensuring high quality output.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="process" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl mx-auto">
                 <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">{t.servicePage.howItWorks}</h2>
                 <div className="space-y-8 relative pl-8 border-l-2 border-gray-100 ml-4 md:ml-0">
                   {process.length > 0 ? process.map((step: any, index: number) => (
                     <div key={index} className="relative pl-8">
                       <div className="absolute -left-[41px] top-0 bg-white border-4 border-blue-50 w-10 h-10 rounded-full flex items-center justify-center font-bold text-blue-600 z-10 shadow-sm">
                         {index + 1}
                       </div>
                       <div>
                         <h3 className="font-bold text-gray-900 text-xl mb-2">{step.step}</h3>
                         <p className="text-gray-500 leading-relaxed text-lg">{step.description}</p>
                       </div>
                     </div>
                   )) : (
                     <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <p className="text-gray-500 italic">{t.servicePage.processPlaceholder}</p>
                     </div>
                   )}
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="samples" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="max-w-5xl mx-auto">
                 <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">{t.servicePage.recentWork}</h2>
                 {examples && examples.length > 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {examples.slice(0, 3).map((example, index) => (
                       service.slug === 'academic-support' ? (
                         // Document Card Design for Academic Support
                         <Card 
                           key={index} 
                           className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-none bg-gray-50 group flex flex-col h-full cursor-pointer"
                           onClick={() => openPreview(example)}
                         >
                            <div className="relative w-full h-56 bg-slate-100 overflow-hidden flex items-center justify-center p-6 group-hover:bg-blue-50 transition-colors duration-500">
                              {/* Decorative Background Elements */}
                              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                              
                              {/* Paper Simulation */}
                              <div className="relative w-3/4 h-full bg-white shadow-xl shadow-slate-200/50 rounded-t-sm border-t-4 border-blue-600 p-5 flex flex-col items-center text-center transform group-hover:-translate-y-2 transition-transform duration-300">
                                {/* Stacked Paper Effect */}
                                <div className="absolute top-2 left-1 right-1 h-full bg-white border border-gray-100 rounded-t-sm -z-10 shadow-sm transform translate-y-1 scale-[0.98]" />
                                <div className="absolute top-3 left-2 right-2 h-full bg-white border border-gray-100 rounded-t-sm -z-20 shadow-sm transform translate-y-2 scale-[0.96]" />

                                {/* Content Preview */}
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                                  <FileText className="w-4 h-4 text-blue-600" />
                                </div>

                                <h3 className="font-heading font-bold text-slate-800 text-sm leading-tight mb-1 line-clamp-3">
                                  {example.title}
                                </h3>
                                
                                <div className="w-8 h-0.5 bg-blue-200 rounded-full mb-3" />

                                {/* Abstract Text Lines */}
                                <div className="w-full space-y-1.5 opacity-30 mt-auto pb-2">
                                  <div className="w-full h-1 bg-slate-400 rounded-full" />
                                  <div className="w-5/6 h-1 bg-slate-400 rounded-full mx-auto" />
                                  <div className="w-full h-1 bg-slate-400 rounded-full" />
                                  <div className="w-4/5 h-1 bg-slate-400 rounded-full mx-auto" />
                                </div>

                                {/* Badge */}
                                <div className="absolute top-0 right-2">
                                  <div className="w-4 h-6 bg-red-500 rounded-b-sm shadow-sm" title="A+ Quality" />
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                   <span className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1.5 rounded-full shadow-sm">
                                     <Eye className="w-4 h-4" /> Preview
                                   </span>
                                </div>
                              </div>
                            </div>
                            <CardHeader>
                               <CardTitle className="font-heading text-lg font-bold">{example.title}</CardTitle>
                               <p className="text-xs text-gray-500 uppercase tracking-wider">{example.description}</p>
                            </CardHeader>
                         </Card>
                       ) : (
                         // Standard Image Card for other services
                         <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group bg-gray-50">
                           <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                             <Image
                               src={example.imageUrl}
                               alt={example.title}
                               layout="fill"
                               objectFit="cover"
                               className="group-hover:scale-110 transition-transform duration-700"
                             />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                           </div>
                           <CardHeader>
                             <CardTitle className="font-heading text-lg font-bold">{example.title}</CardTitle>
                             <p className="text-xs text-gray-500 uppercase tracking-wider">{example.description}</p>
                           </CardHeader>
                         </Card>
                       )
                     ))}
                   </div>
                   {examples.length > 3 && (
                     <div className="mt-12 text-center">
                       <Button asChild variant="outline" className="rounded-full px-8 border-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">
                         <Link href="/portfolio">View Full Portfolio <ChevronRight className="w-4 h-4 ml-2" /></Link>
                       </Button>
                     </div>
                   )}
                 ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                       <p className="text-gray-500 text-lg mb-4">{t.servicePage.portfolioPlaceholder}</p>
                       <Button variant="outline" className="rounded-full" asChild>
                         <Link href="/contact">{t.servicePage.requestSamples}</Link>
                       </Button>
                    </div>
                 )}
               </div>
            </TabsContent>

            <TabsContent value="faq" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">{t.servicePage.faq}</h2>
                {faqs && faqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq: any, index: number) => (
                      <AccordionItem value={`item-${index}`} key={index} className="border border-gray-100 rounded-xl px-6 bg-gray-50/50 data-[state=open]:bg-blue-50/50 data-[state=open]:border-blue-100 transition-colors">
                        <AccordionTrigger className="font-semibold text-lg text-left py-6 hover:no-underline text-gray-900">
                          {faq.q || faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-6 leading-relaxed text-base">
                          {faq.a || faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <p className="text-gray-500 italic mb-4">{t.servicePage.faqPlaceholder}</p>
                    <Link href="/faq" className="text-blue-600 hover:underline font-semibold flex items-center justify-center gap-2">
                      {t.servicePage.viewGeneralFaq} <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 md:py-32 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
            
            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">{t.servicePage.cta.title}</h2>
                <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
                  {t.servicePage.cta.text}
                </p>
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 py-7 text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <Link href={service.ctaLink}>{t.servicePage.cta.button}</Link>
                </Button>
                <p className="mt-6 text-sm text-blue-200 opacity-80">{t.servicePage.cta.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery/Document Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closePreview}>
          <div className="relative max-w-5xl w-full max-h-[95vh] flex flex-col h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closePreview}
              className="absolute -top-10 right-0 md:-right-8 text-white hover:text-gray-300 transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Content Container */}
            <div className="relative w-full flex-grow bg-white md:rounded-t-2xl overflow-hidden flex flex-col">
              
              {selectedItem.documentUrl ? (
                // DOCUMENT VIEWER
                <div className="w-full h-full bg-slate-100 flex flex-col">
                   <div className="bg-slate-900 text-white p-3 flex justify-between items-center shrink-0">
                      <span className="font-medium truncate">{selectedItem.title}</span>
                      <a 
                        href={selectedItem.documentUrl} 
                        download 
                        className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors"
                      >
                        Download Original
                      </a>
                   </div>
                   <div className="flex-grow w-full relative">
                      <iframe 
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(
                           typeof window !== 'undefined' ? `${window.location.origin}${selectedItem.documentUrl}` : selectedItem.documentUrl
                        )}&embedded=true`} 
                        className="w-full h-full border-none"
                        title="Document Viewer"
                      />
                   </div>
                </div>
              ) : (
                // IMAGE VIEWER
                <div className="w-full h-full bg-gray-900 relative flex items-center justify-center">
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    layout="fill"
                    objectFit="contain"
                    className="p-4"
                  />
                </div>
              )}
            </div>

            {/* Project Info Footer */}
            <div className="bg-white md:rounded-b-2xl p-6 shrink-0 max-h-[30vh] overflow-y-auto">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{selectedItem.title}</h3>
              <p className="text-gray-600 mb-4">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}