"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingTeaser() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center md:text-left text-white relative overflow-hidden">
           {/* Decorative background */}
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none" />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
             <div>
               <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                 {t.home.pricing.title} <br/>
                 <span className="text-blue-400">{t.home.pricing.titleHighlight}</span>
               </h2>
               <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                 {t.home.pricing.subtitle}
               </p>
               <Button asChild className="bg-white text-slate-900 hover:bg-gray-100 rounded-full px-8 h-12 text-base font-bold">
                 <Link href="/pricing">{t.home.pricing.cta}</Link>
               </Button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-white/10 backdrop-blur border border-white/10 p-6 rounded-2xl">
                 <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Web Dev</p>
                 <p className="text-3xl font-bold text-white mb-1">From €1,200</p>
                 <p className="text-xs text-slate-400">Fixed project</p>
               </div>
               <div className="bg-white/10 backdrop-blur border border-white/10 p-6 rounded-2xl">
                 <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Video Editing</p>
                 <p className="text-3xl font-bold text-white mb-1">From €150</p>
                 <p className="text-xs text-slate-400">Per video</p>
               </div>
               <div className="bg-white/10 backdrop-blur border border-white/10 p-6 rounded-2xl">
                 <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Academic</p>
                 <p className="text-3xl font-bold text-white mb-1">From €40</p>
                 <p className="text-xs text-slate-400">Flat rate</p>
               </div>
               <div className="bg-blue-600 p-6 rounded-2xl flex flex-col justify-center items-center text-center cursor-pointer hover:bg-blue-500 transition-colors group">
                 <Link href="/pricing" className="flex flex-col items-center">
                    <span className="font-bold text-white mb-2">View All</span>
                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
