"use client";

import { CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  title: string;
  duration: string;
  description: string;
  items: string[];
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
  deliverablesLabel?: string;
}

export default function ProcessTimeline({ steps, deliverablesLabel = "Deliverables" }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="w-full">
      {/* Mobile / Tablet / Vertical View */}
      <div className="flex flex-col space-y-4 lg:hidden">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={cn(
              "border rounded-2xl p-6 transition-all duration-300 cursor-pointer",
              activeStep === index ? "bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-100" : "bg-white border-slate-100 hover:border-blue-200"
            )}
            onClick={() => setActiveStep(index)}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <span className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                  activeStep === index ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                )}>
                  {index + 1}
                </span>
                <div className="flex flex-col">
                   <h3 className="text-lg font-bold text-slate-900 leading-tight">{step.title}</h3>
                   {activeStep !== index && (
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{step.duration}</span>
                   )}
                </div>
              </div>
              <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", activeStep === index && "rotate-180 text-blue-600")} />
            </div>
            
            {activeStep === index && (
               <div className="animate-in fade-in slide-in-from-top-2 pl-14">
                 <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 bg-blue-100 px-2 py-0.5 rounded-full">{step.duration}</span>
                 <p className="text-slate-600 mb-4 text-sm leading-relaxed">{step.description}</p>
                 <div className="bg-white/50 rounded-xl p-4 border border-blue-100/50">
                   <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">{deliverablesLabel}</h4>
                   <ul className="space-y-2">
                     {(step.items || []).map((item, idx) => (
                       <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                         <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                         {item}
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop / Horizontal Interactive View */}
      <div className="hidden lg:block">
        {/* Progress Line */}
        <div className="relative flex justify-between items-center mb-12 px-12">
           <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-100 -z-10" />
           <div 
             className="absolute left-0 top-1/2 h-1 bg-blue-600 transition-all duration-500 -z-10" 
             style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
           />
           
           {steps.map((step, index) => (
             <button 
               key={index}
               onClick={() => setActiveStep(index)}
               className={cn(
                 "relative w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 border-4",
                 activeStep >= index 
                   ? "bg-blue-600 border-blue-100 text-white scale-110 shadow-lg" 
                   : "bg-white border-slate-200 text-slate-400 hover:border-blue-400"
               )}
             >
               {index + 1}
               <span className="absolute -bottom-8 text-xs font-bold text-slate-500 w-32 text-center">
                 {step.title}
               </span>
             </button>
           ))}
        </div>

        {/* Content Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-12 shadow-xl min-h-[300px] flex gap-12 items-center">
           <div className="w-1/2">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
                {steps[activeStep].duration}
              </span>
              <h3 className="text-4xl font-heading font-bold text-slate-900 mb-4">
                {steps[activeStep].title}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {steps[activeStep].description}
              </p>
           </div>
           <div className="w-1/2 bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">{deliverablesLabel}</h4>
              <ul className="space-y-3">
                {(steps[activeStep].items || []).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm text-blue-600">
                       <CheckCircle2 className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}