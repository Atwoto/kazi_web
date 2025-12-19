"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, CheckCircle2, Briefcase } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full pt-32 pb-24 md:pt-48 md:pb-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/80 via-white to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-blue-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col text-left space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-100 shadow-sm w-fit px-4 py-1.5 rounded-full">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold text-slate-600 tracking-wide">
                {t.hero.badge}
              </span>
            </div>
            
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight">
            
                          {t.hero.titleLg} <br />
            
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            
                            {t.hero.titleSm}
            
                          </span>
            
                        </h1>
            
                        
            
                        <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
            
                          {t.hero.subtitle}
            
                        </p>
            
                        
            
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
            
                          <Button asChild className="h-14 px-8 rounded-full text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:shadow-blue-500/40 group">
            
                            <Link href="/contact">
            
                              {t.hero.ctaPrimary}
            
                              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            
                            </Link>
            
                          </Button>
            
                          <Button asChild variant="outline" className="h-14 px-8 rounded-full text-lg border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
            
                            <Link href="/#how-it-works">{t.hero.ctaSecondary}</Link>
            
                          </Button>
            
                        </div>
            
                      </div>
            
            
            
                      {/* Right Column: Hero Image */}
            
                      <div className="relative group perspective-1000">
            
                        {/* Glow Effect */}
            
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            
                        
            
                        <div className="relative h-[450px] md:h-[550px] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/50 bg-white transform transition-transform duration-500 hover:scale-[1.01]">
            
                          <Image
            
                            src="/hero.jpg"
            
                            alt="Professional team collaboration"
            
                            fill
            
                            priority={true}
            
                            quality={90}
            
                            sizes="(max-width: 768px) 100vw, 50vw"
            
                            className="object-cover object-center"
            
                          />
            
            
            
                          {/* Floating Stats Card - Top Right */}
            
                          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 pr-6 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
            
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            
                              <Briefcase className="w-6 h-6" />
            
                            </div>
            
                            <div>
            
                              <p className="font-bold text-slate-900 text-2xl leading-none">
            
                                <AnimatedCounter end={100} suffix="+" duration={2000} />
            
                              </p>
            
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">{t.hero.stats.projects}</p>
            
                            </div>
            
                          </div>
            
            
            
                          {/* Floating Stats Card - Bottom Left */}
            
                          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 pr-6 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            
                              <CheckCircle2 className="w-6 h-6" />
            
                            </div>
            
                            <div>
            
                              <p className="font-bold text-slate-900 text-2xl leading-none">
            
                                <AnimatedCounter end={98} suffix="%" duration={2000} />
            
                              </p>
            
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">{t.hero.stats.retention}</p>
            
                            </div>
            
                          </div>
            
                        </div>
            
                      </div>
            
                    </div>
            
                  </div>
            
                </section>
            
              );
            
            }
