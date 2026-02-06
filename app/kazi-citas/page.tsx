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
      <main className="flex flex-col items-center justify-between min-h-screen pt-20">
        <HeroSection />
        
        {/* Restore Coming Soon Section */}
        <section className="w-full py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 text-center max-w-2xl">
                <div className="w-16 h-1 bg-blue-600 mx-auto mb-8 rounded-full"></div>
                <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">{t.kaziCitas.comingSoon.title}</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
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