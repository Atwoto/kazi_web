"use client";

import Link from "next/link";
import { CheckIcon, ShieldCheck, Clock, CreditCard, ArrowRight } from "lucide-react";
import ContactForm from "@/components/common/ContactForm";
import ExitIntentPopup from "@/components/common/ExitIntentPopup";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px] lg:pt-24">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]">
        
        {/* Left Side: Value Props (Fixed Sidebar on Desktop) */}
        <div className="lg:w-5/12 bg-gradient-to-br from-slate-900 via-blue-800 to-slate-900 text-white p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden order-first">

           {/* Abstract Glow Effects - Dimmed */}
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[100px] pointer-events-none" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-slate-700/30 rounded-full blur-[100px] pointer-events-none" />

           {/* Subtle Phone Screen Overlay Effect */}
           <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[550px] border-[12px] border-white/50 rounded-[3rem] bg-white/10" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[480px] border-4 border-white/30 rounded-[2.5rem] bg-black/20" />
             <div className="absolute top-[27%] left-1/2 -translate-x-1/2 w-[80px] h-[25px] bg-white/30 rounded-full" />
           </div>
           
           <div className="relative z-10 pt-24 lg:pt-0">
             <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
               <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                 K
               </div>
               <span className="text-2xl font-heading font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">{t.contact.sidebar.logoText}</span>
             </Link>
             
             <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight text-white drop-shadow-sm">
               {t.contact.sidebarTitle}
             </h1>
             <p className="text-lg text-blue-100 mb-12 max-w-md">
               {t.contact.sidebar.subtitle}
             </p>
             
             <div className="space-y-8">
              {(t.contact.sidebar.valueProps || []).map((prop, index) => {
                const Icon = [CheckIcon, ShieldCheck, Clock][index];
                const iconColor = ["text-green-400 group-hover:text-green-300", "text-blue-400 group-hover:text-blue-300", "text-yellow-400 group-hover:text-yellow-300"][index];
                return (
                  <div key={index} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all duration-300 shadow-sm">
                      <Icon className={`w-6 h-6 ${iconColor} transition-colors`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-blue-100 transition-colors">{prop.title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed mt-1">{prop.description}</p>
                    </div>
                  </div>
                );
              })}
             </div>

             <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs text-blue-200 uppercase tracking-wider font-bold mb-1 block">{t.contact.emailLabel}</span>
                    <a href={`mailto:${t.contact.emailAddress}`} className="text-white hover:text-blue-300 text-lg font-semibold transition-colors flex items-center gap-2 group">
                      {t.contact.emailAddress}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-blue-200 uppercase tracking-wider font-bold mb-1 block">{t.contact.phoneLabel}</span>
                    <a href={`https://wa.me/${t.contact.phoneNumber.replace(/\s/g, '')}`} className="text-white hover:text-blue-300 text-lg font-semibold transition-colors">
                      {t.contact.phoneNumber}
                    </a>
                  </div>
                </div>
             </div>
           </div>
        </div>

        {/* Right Side: Multi-step Form */}
        <div className="lg:w-7/12 p-6 lg:p-16 flex flex-col justify-center bg-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             {/* Subtle pattern for right side */}
             <div className="w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="max-w-2xl mx-auto w-full relative z-10">
            <h2 className="text-3xl font-heading font-bold mb-3 text-gray-900">{t.contact.form.title}</h2>
            <p className="text-gray-500 mb-8 text-lg">{t.contact.form.subtitle}</p>

            {/* Simple Contact Form */}
            <ContactForm className="border border-gray-100 shadow-xl rounded-2xl bg-white" />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                {t.contact.form.quoteLink}{" "}
                <Link href="/pricing" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                  {t.contact.form.getQuote}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ExitIntentPopup />
    </div>
  );
}
