import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, DollarSign, RefreshCw, ChevronRight } from "lucide-react";
import { Service } from "@/lib/service-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServicePageTemplateProps {
  service: Service;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full mb-6">
                <span className="text-xs font-bold text-primary uppercase tracking-wide">Managed Service</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 leading-tight mb-6">
                {service.name}
              </h1>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-lg">
                {service.oneLiner}
              </p>
              <div className="flex gap-4">
                <Button asChild className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                  <Link href={service.ctaLink}>Start Your Project</Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-full px-8 py-6 text-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  <Link href="#portfolio">View Portfolio</Link>
                </Button>
              </div>
              
              {/* Trust/Guarantee Icons */}
              <div className="flex gap-6 mt-8 text-sm text-gray-500 font-medium">
                 <span className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Vetted Talent</span>
                 <span className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Money-back Guarantee</span>
              </div>
            </div>
            
            {/* Hero Image / Graphic */}
            <div className="relative h-[400px] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
               <Image
                 src={service.heroImage}
                 alt={service.name}
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
                  <p className="text-xs text-gray-400 font-bold uppercase">Typical Turnaround</p>
                  <p className="font-heading font-bold text-gray-900">10-14 Days</p>
                </div>
             </div>
             <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-blue-50 p-3 rounded-full text-primary"><DollarSign className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Starts From</p>
                  <p className="font-heading font-bold text-gray-900">$1,200</p>
                </div>
             </div>
             <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-blue-50 p-3 rounded-full text-primary"><RefreshCw className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Revisions Inc.</p>
                  <p className="font-heading font-bold text-gray-900">2 Rounds</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Tabs Section: Overview, Process, Samples, FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-gray-100 p-1 rounded-full">
                <TabsTrigger value="overview" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">Overview</TabsTrigger>
                <TabsTrigger value="process" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">Process</TabsTrigger>
                <TabsTrigger value="samples" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">Samples</TabsTrigger>
                <TabsTrigger value="faq" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">FAQ</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">What You Get</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.deliverables.map((item, index) => (
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
                 <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">How It Works</h2>
                 <div className="space-y-8 relative pl-8 border-l-2 border-gray-100 ml-4 md:ml-0">
                   {service.process.length > 0 ? service.process.map((step, index) => (
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
                        <p className="text-gray-500 italic">Detailed process steps available upon request.</p>
                     </div>
                   )}
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="samples" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="max-w-5xl mx-auto">
                 <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Recent Work</h2>
                 {service.examples && service.examples.length > 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {service.examples.map((example, index) => (
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
                     ))}
                   </div>
                 ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                       <p className="text-gray-500 text-lg mb-4">Portfolios are customized per client request to ensure relevance.</p>
                       <Button variant="outline" className="rounded-full" asChild>
                         <Link href="/contact">Request Specific Samples</Link>
                       </Button>
                    </div>
                 )}
               </div>
            </TabsContent>

            <TabsContent value="faq" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                {service.faqs && service.faqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {service.faqs.map((faq, index) => (
                      <AccordionItem value={`item-${index}`} key={index} className="border border-gray-100 rounded-xl px-6 bg-gray-50/50 data-[state=open]:bg-blue-50/50 data-[state=open]:border-blue-100 transition-colors">
                        <AccordionTrigger className="font-semibold text-lg text-left py-6 hover:no-underline text-gray-900">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-6 leading-relaxed text-base">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <p className="text-gray-500 italic mb-4">No specific FAQs for this service yet.</p>
                    <Link href="/faq" className="text-blue-600 hover:underline font-semibold flex items-center justify-center gap-2">
                      View General FAQ <ChevronRight className="w-4 h-4" />
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
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Ready to build something great?</h2>
                <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
                  Get a premium development team without the overhead. Start your project with Kazi today.
                </p>
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 py-7 text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <Link href={service.ctaLink}>Get a Quote</Link>
                </Button>
                <p className="mt-6 text-sm text-blue-200 opacity-80">No commitment required. Reply time: &lt;4 hours.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}