import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Users, Globe, Shield } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSEO["/about"].title,
  description: pageSEO["/about"].description,
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 leading-tight mb-6">
              The Quality of a European Agency. <br />
              <span className="text-blue-600">The Agility of a Remote Team.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-8">
              Kazi isn't a marketplace. We are a managed service provider that connects forward-thinking European companies with the top 1% of East African talent, overseen by dedicated project managers.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem vs The Solution */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                The Freelancer "Wild West" vs. The Kazi Way
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Hiring directly from marketplaces is risky. Ghosting, quality inconsistency, and communication barriers can derail your projects. 
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We solved this by adding a <strong>Management Layer</strong>. You don't manage the talent; we do. You get a single point of contact, guaranteed timelines, and European-standard quality control.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1"><Check className="w-4 h-4 text-green-600" /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Accountability</h4>
                    <p className="text-sm text-gray-500">We take responsibility for the final output. No excuses.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1"><Check className="w-4 h-4 text-green-600" /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Vetted Excellence</h4>
                    <p className="text-sm text-gray-500">We recruit, test, and manage the best talent in Kenya.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1"><Check className="w-4 h-4 text-green-600" /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Social Impact</h4>
                    <p className="text-sm text-gray-500">Creating high-value careers in East Africa.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] bg-blue-600 rounded-3xl overflow-hidden shadow-2xl">
               <Image
                 src="/file.svg" // Placeholder for a team image
                 alt="Kazi Management Team"
                 layout="fill"
                 objectFit="cover"
                 className="opacity-50"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-white font-heading font-bold text-3xl">Bridging Continents</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
              <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                <AnimatedCounter end={100} suffix="+" duration={2000} />
              </h3>
              <p className="text-gray-500">Projects Delivered</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
              <Globe className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">24h</h3>
              <p className="text-gray-500">Response Time</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
              <Shield className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-500">Satisfaction Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Ready to scale your operations?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Get the dedicated support you need without the overhead.
          </p>
          <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 py-7 text-lg font-bold shadow-lg">
            <Link href="/contact">Get a Proposal</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}