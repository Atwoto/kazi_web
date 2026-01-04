"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  title?: string;
  step?: string;
  duration?: string;
  description: string;
  items?: string[];
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
  deliverablesLabel?: string;
}

export default function ProcessTimeline({ steps, deliverablesLabel = "Deliverables" }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset to first step when mouse leaves the timeline area
  useEffect(() => {
    const handleMouseLeave = () => {
      setIsHovering(false);
      setActiveStep(0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => container.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, []);

  // Calculate line segments
  const lineSegments = steps.map((_, index) => {
    if (index === steps.length - 1) return null;
    const isActive = isHovering && activeStep > index;
    const isCurrent = isHovering && activeStep === index + 1;
    return { index, isActive, isCurrent };
  }).filter(Boolean);

  return (
    <div className="w-full" ref={containerRef}>
      {/* Mobile / Tablet / Vertical View - Keep click interaction */}
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
                   <h3 className="text-lg font-bold text-slate-900 leading-tight">{step.title || step.step}</h3>
                   {activeStep !== index && step.duration && (
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{step.duration}</span>
                   )}
                </div>
              </div>
            </div>

            {activeStep === index && (
               <div className="animate-in fade-in slide-in-from-top-2 pl-14">
                 {step.duration && (
                   <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 bg-blue-100 px-2 py-0.5 rounded-full">{step.duration}</span>
                 )}
                 <p className="text-slate-600 mb-4 text-sm leading-relaxed">{step.description}</p>
                 {step.items && step.items.length > 0 && (
                   <div className="bg-white/50 rounded-xl p-4 border border-blue-100/50">
                     <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">{deliverablesLabel}</h4>
                     <ul className="space-y-2">
                       {step.items.map((item, idx) => (
                         <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                           <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                           {item}
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
               </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop / Horizontal Interactive View - Hover triggered */}
      <div
        className="hidden lg:block"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setActiveStep(0)}
      >
        {/* Timeline Container - Flexbox approach */}
        <div className="relative py-8">
          <div className="flex items-center justify-between" style={{ padding: '0 3rem' }}>
            {/* Gray background line */}
            <div className="absolute top-1/2 left-3rem right-3rem h-1 bg-slate-200 rounded-full -translate-y-1/2" />

            {steps.map((step, index) => (
              <div key={index} className="relative z-10">
                {/* Line segment to next step (except for last step) */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full overflow-hidden pointer-events-none"
                    style={{
                      left: '50%',
                      width: 'calc(100% - 4rem)',
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
                      style={{
                        width: isHovering
                          ? `${Math.max(0, Math.min(1, (activeStep - index))) * 100}%`
                          : '0%'
                      }}
                    />
                  </div>
                )}

                {/* Step circle */}
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 border-4",
                      isHovering
                        ? activeStep >= index
                          ? "bg-blue-600 border-blue-100 text-white scale-110 shadow-xl shadow-blue-500/30"
                          : "bg-white border-slate-200 text-slate-400"
                        : activeStep === 0 && index === 0
                          ? "bg-blue-600 border-blue-100 text-white scale-110 shadow-xl shadow-blue-500/30"
                          : "bg-white border-slate-200 text-slate-400"
                    )}
                  >
                    {/* Inner glow */}
                    {isHovering && activeStep >= index && (
                      <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-pulse" />
                    )}
                    {/* Pulse ring */}
                    {isHovering && activeStep >= index && (
                      <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 animate-ping" style={{ animationDuration: '2s' }} />
                    )}
                    <span className="relative z-10">{index + 1}</span>
                  </div>

                  {/* Step name tooltip */}
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                    <span className={cn(
                      "text-xs font-bold px-3 py-1.5 rounded-full shadow-lg",
                      activeStep >= index
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-white"
                    )}>
                      {step.title || step.step}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Card with Fade Transition */}
        <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-xl min-h-[320px] relative overflow-hidden mt-4">
          {/* Animated background */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br from-blue-50/50 to-slate-50/50 transition-opacity duration-500",
            isHovering ? "opacity-100" : "opacity-50"
          )} />

          {/* Content with fade transition */}
          <div className="relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "transition-all duration-500 ease-in-out",
                  activeStep === index
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-4 absolute top-0 left-0 right-0 p-12 pointer-events-none"
                )}
              >
                <div className={cn(
                  "flex gap-12 items-center",
                  step.items && step.items.length > 0 ? "justify-between" : "justify-center"
                )}>
                  <div className={cn(step.items && step.items.length > 0 ? "w-1/2" : "max-w-3xl text-center")}>
                    {step.duration && (
                      <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        {step.duration}
                      </span>
                    )}
                    <h3 className="text-4xl font-heading font-bold text-slate-900 mb-4">
                      {step.title || step.step}
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Animated progress dots */}
                    <div className="flex gap-2 mt-6 justify-center lg:justify-start">
                      {steps.map((_, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            idx === activeStep
                              ? "bg-blue-600 w-6"
                              : idx < activeStep
                                ? "bg-blue-400"
                                : "bg-slate-300"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {step.items && step.items.length > 0 && (
                    <div className="w-[45%] bg-slate-50 rounded-2xl p-8 border border-slate-100">
                       <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider flex items-center gap-2">
                         <CheckCircle2 className="w-5 h-5 text-blue-600" />
                         {deliverablesLabel}
                       </h4>
                       <ul className="space-y-3">
                         {step.items.map((item, idx) => (
                           <li
                             key={idx}
                             className="flex items-center gap-3 text-slate-700 animate-in slide-in-from-left-2"
                             style={{ animationDelay: `${idx * 100}ms` }}
                           >
                             <div className="w-6 h-6 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center shadow-sm">
                                <CheckCircle2 className="w-3 h-3 text-blue-500" />
                             </div>
                             <span className="font-medium">{item}</span>
                           </li>
                         ))}
                       </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Hover hint */}
          <div
            className={cn(
              "absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 transition-all duration-300",
              isHovering ? "opacity-0" : "opacity-100"
            )}
          >
            Hover over the numbers to explore each step
          </div>
        </div>
      </div>
    </div>
  );
}
