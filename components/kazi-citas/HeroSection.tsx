"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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
             {/* Fallback color/image if needed */}
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
              <source src="/kazicitasHero.mp4" type="video/mp4" />
            </video>
        )}
        
        {/* Dark Overlay for legibility - Matches s.png darkness */}
        <div className="absolute inset-0 bg-slate-900/60 z-[3]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent z-[3]" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col text-left space-y-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                {t.kaziCitas.hero.title} <br />
                <span className="text-blue-500">{t.kaziCitas.hero.titleHighlight}</span> <br />
                {t.kaziCitas.hero.titleEnd}
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl text-slate-200 max-w-lg leading-relaxed font-light drop-shadow-lg">
                {t.kaziCitas.hero.description}
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                    <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400">
                        <TrendingUp size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">{t.kaziCitas.hero.features.growth}</span>
                        <span className="text-xs text-slate-400">{t.kaziCitas.hero.features.growthDesc}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                    <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400">
                        <Zap size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">{t.kaziCitas.hero.features.simplicity}</span>
                        <span className="text-xs text-slate-400">{t.kaziCitas.hero.features.simplicityDesc}</span>
                    </div>
                </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
                <Button asChild className="w-fit h-14 px-8 rounded-xl text-base bg-blue-600 hover:bg-blue-700 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl group border-0">
                  <Link href="#">
                    {t.kaziCitas.hero.cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <span className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                    {t.kaziCitas.hero.note}
                </span>
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
