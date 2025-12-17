"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full pt-24 pb-20 md:pt-40 md:pb-32 bg-background overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col text-left space-y-8 z-10">
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 w-fit px-3 py-1 rounded-full">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                {t.hero.badge}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.1] tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="h-12 px-8 rounded-full text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-105">
                <Link href="/contact">{t.hero.ctaPrimary}</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-8 rounded-full text-lg border-input text-foreground hover:bg-accent hover:text-accent-foreground transition-all">
                <Link href="/how-it-works">{t.hero.ctaSecondary}</Link>
              </Button>
            </div>
            
            {/* Trust Indicators (Avatars) */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                 <div className="w-10 h-10 rounded-full border-2 border-background bg-gray-200 dark:bg-gray-700" />
                 <div className="w-10 h-10 rounded-full border-2 border-background bg-gray-300 dark:bg-gray-600" />
                 <div className="w-10 h-10 rounded-full border-2 border-background bg-gray-400 dark:bg-gray-500" />
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{t.hero.trust}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl bg-muted/20 dark:bg-slate-800/50 border border-border">
             <Image 
               src="/next.svg" 
               alt="Kazi Team Working"
               layout="fill"
               objectFit="cover"
               className="opacity-50 dark:opacity-30 dark:invert" 
             />
             <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-6 rounded-2xl shadow-lg border border-white/50 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-2xl">
                      <AnimatedCounter end={100} suffix="+" duration={2500} />
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.about.stats.projects}</p>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
