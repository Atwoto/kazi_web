"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/common/ScrollReveal";
import TaglineCarousel from "@/components/home/TaglineCarousel";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const CLIENT_LOGOS = [
  "/logo4.jpg",
  "/logo5.jpg",
  "/logo6.jpg"
];

export default function HeroSection() {
  const { t } = useLanguage();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]); // Parallax effect

  useEffect(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[100svh] flex items-center pt-20 pb-8 md:pt-24 md:pb-16 bg-slate-900 text-white overflow-hidden">
      {/* Video Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-slate-900 z-[1]">
            <Image
                src="/homepage.jpg"
                alt="Video Background"
                fill
                priority
                className="object-cover opacity-50"
                quality={60}
            />
        </div>
        
        {videoLoaded && (
            <video
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="absolute inset-0 w-full h-full object-cover z-[2]"
              onLoadedData={(e) => (e.currentTarget.style.opacity = "1")}
              style={{ opacity: 0, transition: "opacity 1s ease-in-out" }}
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
        )}
        
        {/* Modern Gradient Overlay for legibility */}
        <div className="absolute inset-0 bg-slate-900/40 z-[3]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-transparent to-slate-900/90 z-[3]" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col text-left space-y-6">
            <ScrollReveal direction="up" delay={0.1} duration={0.5}>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
                </span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {t.hero.badge}
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2} duration={0.6}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                {t.hero.titleLg} <br />
                <span className="block mt-2">
                    <TaglineCarousel />
                </span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.3} duration={0.6}>
              <p className="text-lg text-slate-200 max-w-lg leading-relaxed font-light drop-shadow-lg">
                {t.hero.subtitle}
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4} duration={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button asChild className="h-14 px-8 rounded-full text-base bg-blue-600 hover:bg-blue-700 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl group border-0">
                  <Link href="/pricing">
                    {t.hero.ctaPrimary}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-14 px-8 rounded-full text-base border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all group">
                  <Link href="/portfolio">
                    {t.hero.ctaSecondary}
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.5} duration={0.6}>
                <div className="flex items-center gap-4 text-sm text-slate-300 pt-4">
                    <div className="flex -space-x-3">
                        {CLIENT_LOGOS.map((src, i) => (
                            <div key={i} className="relative w-10 h-10 rounded-full border-2 border-slate-800 overflow-hidden bg-white">
                                <Image 
                                  src={src} 
                                  alt={`Trusted Client ${i + 1}`}
                                  fill
                                  sizes="40px"
                                  quality={60}
                                  className="object-cover"
                                />
                            </div>
                        ))}
                        <div className="relative w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                          +50
                        </div>
                    </div>
                    <p>Trusted by <strong className="text-white">Local Brands</strong></p>
                </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}