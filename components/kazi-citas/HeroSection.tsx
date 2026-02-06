"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]); // Parallax effect

  return (
    <section ref={containerRef} className="relative w-full min-h-[100svh] flex items-center pt-20 pb-8 md:pt-24 md:pb-16 bg-slate-900 text-white overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-slate-900 z-[1]">
             {/* Fallback color if image fails to load */}
        </div>
        
        <img 
          src="/kazi_cita.jpg"
          alt="Kazi Citas Background"
          className="absolute inset-0 w-full h-full object-cover z-[2]"
        />
        
        {/* Dark Overlay for legibility - Symmetrical for centered layout */}
        <div className="absolute inset-0 bg-slate-900/50 z-[3]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/40 z-[3]" />
        <div className="absolute inset-0 bg-slate-900/20 z-[3] backdrop-blur-[2px]" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-10">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight drop-shadow-2xl">
              {t.kaziCitas.hero.title.split("").map((char: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.05, 
                    delay: i * 0.05,
                    ease: "easeIn"
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <br />
              <motion.span 
                className="text-blue-500 inline-block"
                initial={{ opacity: 0, width: 0 }}
                animate={{ 
                  opacity: 1,
                  width: "auto",
                  color: ["#3b82f6", "#60a5fa", "#3b82f6"],
                }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 0.5 },
                  width: { delay: 0.8, duration: 0.8 },
                  color: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {t.kaziCitas.hero.titleHighlight}
              </motion.span> <br />
              {t.kaziCitas.hero.titleEnd.split("").map((char: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.05, 
                    delay: 1.5 + (i * 0.05),
                    ease: "easeIn"
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
                className="inline-block w-[4px] h-[1em] bg-blue-500 ml-1 translate-y-[0.1em]"
              />
            </h1>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03,
                  delayChildren: 1.4
                }
              }
            }}
            className="text-xl md:text-2xl text-slate-200 max-w-2xl leading-relaxed font-light drop-shadow-lg"
          >
            {t.kaziCitas.hero.description.split(" ").map((word: string, i: number) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, filter: "blur(8px)", scale: 0.9, y: 5 },
                  visible: { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-block mr-1.5"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
              <Button asChild className="h-16 px-10 rounded-2xl text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group border-0">
                <Link href="https://kazi-cite.vercel.app/" target="_blank" rel="noopener noreferrer">
                  {t.kaziCitas.hero.cta}
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold"
              >
                  {t.kaziCitas.hero.note}
              </motion.span>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
