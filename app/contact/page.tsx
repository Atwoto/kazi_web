"use client";

import Link from "next/link";
import { CheckIcon, ShieldCheck, Clock, CreditCard } from "lucide-react";
import QuoteForm from "@/components/common/QuoteForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-[72px] lg:pt-24">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]">
        
        {/* Left Side: Value Props (Fixed Sidebar on Desktop) */}
        <div className="lg:w-5/12 bg-slate-900 text-white p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden order-first">
           {/* Background Decoration */}
           <div className="absolute top-0 left-0 w-full h-full bg-[url('/logo2.jpg')] opacity-5 bg-center bg-no-repeat bg-contain mix-blend-overlay" />
           
           <div className="relative z-10 pt-24 lg:pt-0">
             <Link href="/" className="inline-block mb-12">
               <span className="text-3xl font-heading font-bold tracking-tight">Kazi</span>
             </Link>
             
             <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-8 leading-tight">
               Let's build something <span className="text-blue-400">great</span> together.
             </h1>
             
             <div className="space-y-8 mt-12">
               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                   <CheckIcon className="w-6 h-6 text-green-400" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">Top 1% Vetted Talent</h3>
                   <p className="text-slate-200 leading-relaxed">Access highly skilled East African professionals without the vetting headache.</p>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                   <ShieldCheck className="w-6 h-6 text-blue-400" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">100% Secure Payment</h3>
                   <p className="text-slate-200 leading-relaxed">Your funds are protected. We only release payments upon your approval.</p>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                   <Clock className="w-6 h-6 text-yellow-400" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">European Management</h3>
                   <p className="text-slate-200 leading-relaxed">Your project is overseen by experienced managers ensuring European quality standards.</p>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                   <CreditCard className="w-6 h-6 text-purple-400" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">Transparent Pricing</h3>
                   <p className="text-slate-200 leading-relaxed">No hidden fees. You get exactly what you pay for with clear quotes.</p>
                 </div>
               </div>
             </div>
             
             <p className="mt-16 text-sm text-slate-300 italic border-t border-slate-800 pt-6">
               "To protect quality and support, please keep all communication inside Kazi."
             </p>
           </div>
        </div>

        {/* Right Side: Multi-step Form */}
        <div className="lg:w-7/12 p-6 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-2xl mx-auto w-full">
            <h2 className="text-3xl font-heading font-bold mb-2 text-gray-900">Request a Quote</h2>
            <p className="text-gray-500 mb-8">Tell us about your needs and we'll get back to you within 24 hours.</p>

            {/* Reusable Quote Form */}
            <QuoteForm className="border-gray-100 shadow-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
