"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import TaglineCarousel from "@/components/home/TaglineCarousel";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Briefcase, CheckCircle2, Play } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[calc(100vh-72px)] flex items-center pt-20 pb-8 md:pt-24 md:pb-16 bg-white overflow-hidden">
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col text-left space-y-6">
            <ScrollAnimation animation="fade-up" delay={100}>
              <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t.hero.badge}
                </span>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-up" delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight">
                {t.hero.titleLg} <br />
                <span className="block mt-2">
                    <TaglineCarousel />
                </span>
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-up" delay={300}>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-light">
                {t.hero.subtitle}
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button asChild className="h-14 px-8 rounded-full text-base bg-slate-900 hover:bg-slate-800 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl group">
                  <Link href="/pricing">
                    {t.hero.ctaPrimary}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="h-14 px-8 rounded-full text-base text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all group">
                  <Link href="/portfolio">
                    <Play className="mr-2 w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                    {t.hero.ctaSecondary}
                  </Link>
                </Button>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-up" delay={500}>
                <div className="flex items-center gap-4 text-sm text-slate-500 pt-4">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                {i === 3 ? '+' : ''}
                            </div>
                        ))}
                    </div>
                    <p>Trusted by <strong className="text-slate-900">50+ Local Brands</strong></p>
                </div>
            </ScrollAnimation>
          </div>
            
          {/* Right Column: Hero Visual (Video Background) */}
          <ScrollAnimation animation="fade-left" delay={500} duration={800}>
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border-4 border-white bg-slate-100">
               {/* Video Background */}
               <video
                 autoPlay
                 loop
                 muted
                 playsInline
                 className="absolute inset-0 w-full h-full object-cover"
               >
                 <source src="/video.mp4" type="video/mp4" />
               </video>
               
               {/* Tech Overlay Grid */}
               <div className="absolute inset-0 bg-[url('/file.svg')] opacity-5 mix-blend-overlay bg-repeat space-x-4" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />

                {/* Floating Stats Card 1 */}
                <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 animate-bounce-slow">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">98% Retention</p>
                      <p className="text-xs text-slate-500">Last 12 Months</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Card 2 */}
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 animate-bounce-slow animation-delay-1000">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">ROI Focused</p>
                      <p className="text-xs text-slate-500">Measurable Growth</p>
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