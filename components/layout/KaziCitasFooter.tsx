"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function KaziCitasFooter() {
  const { t } = useLanguage();
  
  const absoluteLinks = {
    marketplace: "https://www.kazicitas.com/marketplace",
    profile: "https://www.kazicitas.com/profile",
    rewards: "https://www.kazicitas.com/profile?tab=rewards",
    business: "https://www.kazicitas.com/business",
    dashboard: "https://www.kazicitas.com/business/dashboard",
    pricing: "https://www.kazicitas.com/pricing",
    about: "https://www.kazicitas.com/about",
    blog: "https://www.kazicitas.com/blog",
    contact: "https://www.kazicitas.com/contact",
    privacy: "https://www.kazicitas.com/legal?section=privacy",
    terms: "https://www.kazicitas.com/legal?section=terms",
    cookies: "https://www.kazicitas.com/legal?section=cookies",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer className="bg-slate-950 text-white overflow-hidden border-t border-white/5">
      <div className="container max-w-7xl mx-auto px-6 py-24">
        
        {/* Top Section: Centered Branding with Logo Only */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-20 space-y-8"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/40 transition-colors"></div>
                <img 
                  src="/logo.png" 
                  alt="Kazi Citas" 
                  className="h-16 w-auto relative z-10 group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out" 
                />
              </div>
          </motion.div>
          
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed font-light">
            {t.kaziCitasFooter.description}
          </p>
          
          <div className="flex gap-6 pt-4">
              {[
                { icon: <Instagram size={20} />, href: "#" },
                { icon: <Facebook size={20} />, href: "#" },
                { icon: <Twitter size={20} />, href: "#" },
                { icon: <Linkedin size={20} />, href: "#" }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href} 
                  whileHover={{ y: -5, scale: 1.1, color: "#3b82f6" }}
                  className="p-3 bg-slate-900/50 border border-white/5 rounded-2xl text-slate-400 transition-all hover:bg-slate-900 hover:border-blue-500/30 shadow-lg"
                >
                  {social.icon}
                </motion.a>
              ))}
          </div>
        </motion.div>

        {/* Middle Section: Centered Grid with Staggered Animations */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center border-y border-white/5 py-16"
        >
          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500">{t.kaziCitasFooter.sections.services.title}</h3>
            <ul className="space-y-4">
              <li><a href={absoluteLinks.marketplace} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.services.find}</a></li>
              <li><a href={absoluteLinks.marketplace} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.services.book}</a></li>
              <li><a href={absoluteLinks.profile} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.services.bookings}</a></li>
            </ul>
          </motion.div>

          {/* Business */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500">{t.kaziCitasFooter.sections.business.title}</h3>
            <ul className="space-y-4">
              <li><a href={absoluteLinks.business} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.business.list}</a></li>
              <li><a href={absoluteLinks.dashboard} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.business.dashboard}</a></li>
              <li><a href={absoluteLinks.pricing} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.business.plans}</a></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500">{t.kaziCitasFooter.sections.company.title}</h3>
            <ul className="space-y-4">
              <li><a href={absoluteLinks.about} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.company.about}</a></li>
              <li><a href={absoluteLinks.blog} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.company.blog}</a></li>
              <li><a href={absoluteLinks.contact} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.company.help}</a></li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500">{t.kaziCitasFooter.sections.legal.title}</h3>
            <ul className="space-y-4">
              <li><a href={absoluteLinks.privacy} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.legal.privacy}</a></li>
              <li><a href={absoluteLinks.terms} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.legal.terms}</a></li>
              <li><a href={absoluteLinks.cookies} target="_blank" className="text-sm text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">{t.kaziCitasFooter.sections.legal.cookies}</a></li>
            </ul>
          </motion.div>
        </motion.div>

      </div>
    </footer>
  );
}