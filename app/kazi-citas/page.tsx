"use client";

import HeroSection from "@/components/kazi-citas/HeroSection";
import PublicLayout from "@/components/layout/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function KaziCitasPage() {
  const { t } = useLanguage();
  
  return (
    <PublicLayout>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <HeroSection />
        
        {/* Placeholder for future sections */}
        <section className="w-full py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">{t.kaziCitas.comingSoon.title}</h2>
                <p className="text-slate-600 dark:text-slate-400">{t.kaziCitas.comingSoon.description}</p>
            </div>
        </section>
      </main>
    </PublicLayout>
  );
}