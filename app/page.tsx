import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ServiceTiles from "@/components/home/ServiceTiles";
import HowItWorks from "@/components/home/HowItWorks";
import TrustSection from "@/components/home/TrustSection";

export default function Home() {
  return (
    <>
      {/* Hero Section - Refactored for Clean, White, Split Layout */}
      <section className="relative w-full pt-24 pb-20 md:pt-40 md:pb-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col text-left space-y-8 z-10">
              <div className="inline-flex items-center space-x-2 bg-blue-50 w-fit px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Managed Offshoring</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-900 leading-[1.1] tracking-tight">
                Work delivered, <br />
                <span className="text-gray-400">without the freelance hassle.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Kazi connects Europe to vetted East African talent. We handle the quality, payments, and delivery so you can focus on growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild className="h-12 px-8 rounded-full text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-100 transition-all hover:scale-105">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <Button asChild variant="outline" className="h-12 px-8 rounded-full text-lg border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all">
                  <Link href="/how-it-works">How it Works</Link>
                </Button>
              </div>
              
              {/* Trust Indicators (Avatars) */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                   {/* Placeholders for user avatars */}
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300" />
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400" />
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-bold text-gray-900">100+</span> projects delivered.
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="relative h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
               {/* Use a placeholder that represents the 'team' vibe from the screenshot */}
               <Image 
                 src="/next.svg" // Placeholder, user will replace with actual hero image
                 alt="Kazi Team Working"
                 layout="fill"
                 objectFit="cover"
                 className="opacity-50" // Dimmed until real image is available
               />
               <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg border border-white/50">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Project Delivered</p>
                      <p className="text-sm text-gray-500">Web Development • On Time</p>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Logos / Trust Bar */}
      <section className="py-10 border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by forward-thinking companies in Europe</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
             {/* Placeholders for logos - Darker gray for better visibility */}
             <div className="h-8 w-24 bg-gray-400 rounded" />
             <div className="h-8 w-24 bg-gray-400 rounded" />
             <div className="h-8 w-24 bg-gray-400 rounded" />
             <div className="h-8 w-24 bg-gray-400 rounded" />
          </div>
        </div>
      </section>

      {/* Service Tiles Section */}
      <ServiceTiles />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Trust Section */}
      <TrustSection />
    </>
  );
}