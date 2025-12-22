"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function PricingTeaser() {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden relative shadow-xl shadow-blue-900/10 border border-white/5">
             
             <div className="flex flex-col lg:flex-row items-stretch">
               {/* Content Side */}
               <div className="flex-1 p-8 md:p-12 lg:p-14 flex flex-col justify-center z-10 relative">
                 <div className="max-w-xl">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white tracking-tight">
                      {t.home.pricing.title} <span className="text-blue-500">{t.home.pricing.titleHighlight}</span>
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed max-w-md">
                      {t.home.pricing.subtitle}
                    </p>
                    <Button asChild className="bg-white text-slate-900 hover:bg-blue-50 rounded-full px-8 py-6 text-base font-bold transition-all hover:scale-105 group w-fit">
                      <Link href="/pricing" className="flex items-center gap-2">
                        {t.home.pricing.cta}
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </Button>
                 </div>
               </div>

               {/* Visual Side - Shrunk Accent */}
               <div className="w-full lg:w-[40%] relative min-h-[200px] lg:min-h-full">
                 <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent z-10" />
                 <Image 
                    src="/hero-sec.jpeg" 
                    alt="Kazi Quality" 
                    fill 
                    className="object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-700"
                 />
               </div>
             </div>

          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

