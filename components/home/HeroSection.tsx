"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import ShimmerText from "@/components/common/ShimmerText";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, CheckCircle2, Briefcase } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[calc(100vh-72px)] flex items-center pt-20 pb-8 md:pt-24 md:pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/80 via-white to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-blue-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col text-left space-y-3 md:space-y-4">
            <ScrollAnimation animation="fade-up" delay={100}>
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-100 shadow-sm w-fit px-3 md:px-4 py-1 md:py-1.5 rounded-full">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs md:text-sm font-semibold text-slate-600 tracking-wide">
                  {t.hero.badge}
                </span>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-up" delay={200}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight">
                {t.hero.titleLg} <br />
                <ShimmerText>
                  {t.hero.titleSm}
                </ShimmerText>
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-up" delay={300}>
              <p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
                {t.hero.subtitle}
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Button asChild className="h-12 px-8 rounded-full text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:shadow-blue-500/40 group">
                  <Link href="/pricing">
                    {t.hero.ctaPrimary}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 px-8 rounded-full text-base border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  <Link href="/#how-it-works">{t.hero.ctaSecondary}</Link>
                </Button>
              </div>
            </ScrollAnimation>
          </div>
            
          {/* Right Column: Hero Image */}
          <ScrollAnimation animation="zoom-in" delay={500} duration={800}>
            <div className="relative group perspective-1000 cursor-pointer">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="relative h-[300px] md:h-[380px] lg:h-[450px] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/50 bg-white transform transition-all duration-700 group-hover:scale-[1.02] group-hover:rotate-1">
                <Image
                  src="/hero2.jpg"
                  alt="Kazi Agency Booking Mockup"
                  fill
                  priority={true}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Shine effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Floating Trust Badge - Top Right */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-md p-1.5 pr-3 md:p-2 md:pr-4 rounded-xl md:rounded-2xl shadow-xl border border-white/50 flex items-center gap-1.5 md:gap-2 z-20 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">
                  <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Briefcase className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs md:text-sm leading-tight">{t.hero.trustBadges.pm.title}</p>
                    <p className="text-[9px] md:text-[10px] font-semibold text-slate-500 uppercase tracking-wide mt-0.5">{t.hero.trustBadges.pm.subtitle}</p>
                  </div>
                </div>

                {/* Floating Trust Badge - Bottom Left */}
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/90 backdrop-blur-md p-1.5 pr-3 md:p-2 md:pr-4 rounded-xl md:rounded-2xl shadow-xl border border-white/50 flex items-center gap-1.5 md:gap-2 z-20 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2">
                  <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs md:text-sm leading-tight">{t.hero.trustBadges.response.title}</p>
                    <p className="text-[9px] md:text-[10px] font-semibold text-slate-500 uppercase tracking-wide mt-0.5">{t.hero.trustBadges.response.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

