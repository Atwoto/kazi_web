import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, DollarSign, RefreshCw } from "lucide-react";
import { Service } from "@/lib/service-data";

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

      {/* Details Grid: What You Get vs How It Works */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: What You Get */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">What You Get</h2>
              <div className="space-y-6">
                {service.deliverables.map((item, index) => (
                  <div key={index} className="flex items-start bg-gray-50 p-5 rounded-xl">
                    <div className="bg-blue-500 rounded-full p-1 mt-1 mr-4 shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item}</p>
                      <p className="text-sm text-gray-500 mt-1">Professional standard delivery ensuring high quality.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: How It Works */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">How It Works</h2>
              <div className="space-y-8 relative pl-4">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200" />
                
                {service.process.length > 0 ? service.process.map((step, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="bg-white border-4 border-blue-50 w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary z-10 shrink-0">
                      {index + 1}
                    </div>
                    <div className="ml-6 pt-1">
                      <h3 className="font-bold text-gray-900 text-lg">{step.step}</h3>
                      <p className="text-gray-500 mt-2 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 italic">Process details available upon request.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Portfolio/Examples Section */}
      {service.examples && service.examples.length > 0 && (
        <section id="portfolio" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-end mb-12">
               <div>
                 <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Recent Work</h2>
                 <p className="text-gray-500">See what our developers have built recently.</p>
               </div>
               <Link href="/portfolio" className="text-primary font-bold hover:underline hidden md:block">View All Projects →</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.examples.map((example, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <div className="relative w-full h-56 bg-gray-200">
                    <Image
                      src={example.imageUrl}
                      alt={example.title}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-heading text-lg font-bold">{example.title}</CardTitle>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{example.description}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl shadow-blue-200">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Ready to build something great?</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Get a premium development team without the overhead. Start your project with Kazi today.
            </p>
            <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 py-7 text-lg font-bold shadow-lg">
              <Link href={service.ctaLink}>Get a Free Quote</Link>
            </Button>
            <p className="mt-6 text-sm text-blue-200 opacity-80">No commitment required. Reply time: &lt;4 hours.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
