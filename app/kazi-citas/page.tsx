"use client";

import HeroSection from "@/components/kazi-citas/HeroSection";
import Navbar from "@/components/layout/Navbar";
import KaziCitasFooter from "@/components/layout/KaziCitasFooter";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { useLanguage } from "@/context/LanguageContext";

export default function KaziCitasPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between min-h-screen pt-16 md:pt-20">
        <HeroSection />
        
        {/* Restore Coming Soon Section */}
        <section className="w-full py-16 md:py-24 bg-white dark:bg-slate-950 px-4">
            <div className="container mx-auto text-center max-w-2xl">
                <div className="w-12 md:w-16 h-1 bg-blue-600 mx-auto mb-6 md:mb-8 rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">{t.kaziCitas.comingSoon.title}</h2>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  {t.kaziCitas.comingSoon.description}
                </p>
            </div>
        </section>
      </main>
      <KaziCitasFooter />
      <WhatsAppButton />
    </>
  );
}