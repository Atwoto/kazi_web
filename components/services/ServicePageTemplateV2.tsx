"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, X } from "lucide-react";
import { Service } from "@/lib/service-data";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import MiniCaseStudy from "@/components/services/MiniCaseStudy";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface ServicePageTemplateV2Props {
  service: Service;
}

export default function ServicePageTemplateV2({ service }: ServicePageTemplateV2Props) {
  const { t } = useLanguage();

  // Get translated service data, fallback to English/default if not found
  // We use 'any' casting here because the structure of translations might vary slightly per service
  const translatedService = (t.services as any)[service.slug] || {};
  
  // Consolidate data sources
  const name = translatedService.name || service.name;
  const oneLiner = translatedService.oneLiner || service.oneLiner;
  const deliverables = translatedService.deliverables || service.deliverables;
  const processSteps = translatedService.process || service.process;
  
  // Problem Section Data (Fallback to generic if specific service doesn't have it)
  const problemTitle = translatedService.problemTitle || t.servicePage?.problem?.title || "The Problem";
  const problemSubtitle = translatedService.problemSubtitle || t.servicePage?.problem?.subtitle || "Does this sound familiar?";
  const problems = translatedService.problems || [
    { title: "Low Conversion", text: "Traffic but no sales." },
    { title: "Outdated Design", text: "Doesn't match your brand quality." },
    { title: "Hard to Update", text: "Reliance on developers for small changes." }
  ];

  // Pricing Data (Mock/Generic for now, but labels translated)
  const pricingLabels = {
    essential: t.servicePage?.pricing?.essential || "Essential",
    growth: t.servicePage?.pricing?.growth || "Growth",
    custom: t.servicePage?.pricing?.custom || "Custom",
    oneTime: t.servicePage?.pricing?.oneTime || "One-time payment",
    mostPopular: t.servicePage?.pricing?.mostPopular || "Most Popular",
    start: t.servicePage?.pricing?.start || "Start",
    contact: t.servicePage?.pricing?.contact || "Contact Sales"
  };

  const caseStudyStats = [
    { label: "Increase in Traffic", value: "+150%", icon: "trend" as const },
    { label: "New Leads / Mo", value: "45+", icon: "users" as const },
    { label: "Load Time", value: "0.8s", icon: "clock" as const }
  ];

  // Map service slug to portfolio category key
  const categoryMapping: Record<string, string> = {
    "web-design-development": "webDev",
    "ai-services": "aiServices",
    "graphic-design": "graphicDesign",
    "social-media-management": "socialMediaManagement",
    "academic-support": "academicSupport",
    "video-editing": "videoEditing",
    "photo-editing": "photoEditing",
  };

  // Find the first portfolio item that matches the current service category
  const portfolioCategory = categoryMapping[service.slug];
  const portfolioItem = t.portfolio?.items?.find((item: any) => item.categoryKey === portfolioCategory);

  return (
    <div className="bg-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-900 text-white overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/video.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          {/* Modern Gradient Overlay for legibility without hiding video */}
          <div className="absolute inset-0 bg-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation animation="fade-up">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold tracking-wider mb-6 backdrop-blur-sm">
                PREMIUM {name.toUpperCase()}
              </span>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-up" delay={100}>
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight text-white drop-shadow-2xl">
                {name} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  {t.hero?.titleSm || "for Ambitious Brands"}
                </span>
              </h1>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-up" delay={200}>
              <p className="text-xl text-slate-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-medium">
                {oneLiner}
              </p>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-up" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="h-14 px-10 rounded-full text-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-2xl hover:scale-105 border-0">
                  <Link href={service.ctaLink}>
                    {t.servicePage?.cta?.button || "Request Proposal"}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-14 px-10 rounded-full text-lg border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all hover:scale-105 shadow-xl">
                  <Link href="#examples">
                    {t.servicePage?.viewPortfolio || "View Examples"}
                  </Link>
                </Button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM (Empathy) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{problemTitle}</h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">
                {problemSubtitle}
              </h3>
              <div className="space-y-6">
                {problems.map((prob: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="bg-red-50 text-red-500 p-2 rounded-full shrink-0"><X className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{prob.title}</h4>
                      <p className="text-slate-600 text-sm">{prob.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               {/* Decorative "Frustration" Image Placeholder */}
               <div className="bg-slate-200 rounded-2xl w-full h-[500px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-300/50 pattern-grid-lg opacity-20" />
                  <p className="text-slate-400 font-bold text-2xl rotate-12">"Why is this so hard?"</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION (Authority) & TIMELINE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">{t.servicePage?.howItWorks || "Our Process"}</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
              {t.servicePage?.serviceGoals || "How we solve it"}
            </h3>
            <p className="text-slate-600 text-lg">
              {t.servicePage?.professionalDelivery || "We build conversion engines using a proven architectural process."}
            </p>
          </div>

          <ProcessTimeline steps={processSteps} deliverablesLabel={t.servicePage?.deliverables} />
        </div>
      </section>

      {/* 4. DELIVERABLES (Clarity) */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
               <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white">
                 {t.servicePage?.whatYouGet || "What's included?"}
               </h3>
               <p className="text-slate-400 text-lg mb-8">
                 {t.servicePage?.professionalDelivery || "Everything you need to dominate your local market."}
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                 {deliverables.map((item: string, idx: number) => (
                   <div key={idx} className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                       <Check className="w-3.5 h-3.5 text-white" />
                     </div>
                     <span className="font-medium text-slate-200">{item}</span>
                   </div>
                 ))}
               </div>
            </div>
            <div className="relative">
              {/* Feature Highlight Card */}
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-colors duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                   <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                   </svg>
                </div>
                <h4 className="text-xl font-bold mb-2 text-white">
                  {t.servicePage?.performance?.title || "Performance Guaranteed"}
                </h4>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {t.servicePage?.performance?.text || "We build for speed. Your site will score 90+ on Google PageSpeed Insights."}
                </p>
                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-green-400 w-[95%]" />
                </div>
                <div className="flex justify-between mt-2 text-xs font-mono text-slate-500">
                  <span>{t.servicePage?.performance?.label || "Speed Score"}</span>
                  <span>98/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MINI CASE STUDY */}
      <section id="examples" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-heading font-bold text-slate-900">{t.servicePage?.recentWork || "Real Results"}</h2>
           </div>
           
           {portfolioItem ? (
             <MiniCaseStudy 
               title={portfolioItem.title}
               description={portfolioItem.description}
               imageUrl={portfolioItem.imageUrl}
               stats={caseStudyStats}
               // Use a generic quote if the item doesn't have one, or check for testimonial in item
               quote={"The results exceeded our expectations. Highly recommended."} 
               link={portfolioItem.liveUrl || (portfolioItem.isDocument ? portfolioItem.documentUrl : "/portfolio")}
             />
           ) : (
             <MiniCaseStudy 
               title="Restaurant La Mesa" 
               description="We transformed a local restaurant's outdated generic site into a high-conversion booking engine. By implementing direct reservations and a digital menu, we reduced phone admin time by 40%."
               imageUrl="/samples/web/sambright.jpg" 
               stats={caseStudyStats}
               quote="Kazi changed how we do business. The website isn't just a brochure, it's our best employee."
               link="/portfolio"
             />
           )}
        </div>
      </section>

      {/* 6. PRICING / INVESTMENT */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">{t.pricing?.pageTitle || "Transparent Investment"}</h2>
            <p className="text-slate-600">{t.pricing?.pageSubtitle || "Choose the level of architectural support you need."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {/* Essential Plan */}
             <Card className="border-slate-200 shadow-none hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    {t.servicePage?.pricingPlans?.essential?.name || "Essential"}
                  </CardTitle>
                  <p className="text-3xl font-bold mt-4">
                    {t.servicePage?.pricingPlans?.essential?.price || "€1,500"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t.servicePage?.pricingPlans?.essential?.note || "One-time payment"}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(t.servicePage?.pricingPlans?.essential?.features || ["Custom One-Pager", "Mobile Optimized", "Basic SEO Setup"]).map((feat: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-blue-500" /> {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-800">
                    {t.servicePage?.pricingPlans?.essential?.cta || "Start Essential"}
                  </Button>
                </CardFooter>
             </Card>

             {/* Growth Plan (Highlight) */}
             <Card className="border-blue-200 shadow-xl relative overflow-hidden transform md:-translate-y-4">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
                <CardHeader>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                    {t.servicePage?.pricing?.mostPopular || "Most Popular"}
                  </span>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    {t.servicePage?.pricingPlans?.growth?.name || "Growth"}
                  </CardTitle>
                  <p className="text-3xl font-bold mt-4">
                    {t.servicePage?.pricingPlans?.growth?.price || "€3,000"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t.servicePage?.pricingPlans?.growth?.note || "One-time payment"}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(t.servicePage?.pricingPlans?.growth?.features || ["Multi-Page Strategy", "CMS Integration", "Advanced SEO", "Booking/Lead System"]).map((feat: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-blue-500" /> <strong>{feat}</strong>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full bg-blue-600 text-white hover:bg-blue-700 h-12 shadow-lg shadow-blue-500/25">
                    {t.servicePage?.pricingPlans?.growth?.cta || "Start Growth"}
                  </Button>
                </CardFooter>
             </Card>

             {/* Enterprise Plan */}
             <Card className="border-slate-200 shadow-none hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    {t.servicePage?.pricingPlans?.enterprise?.name || "Custom"}
                  </CardTitle>
                  <p className="text-3xl font-bold mt-4">
                    {t.servicePage?.pricingPlans?.enterprise?.price || "Book Call"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t.servicePage?.pricingPlans?.enterprise?.note || "Tailored quote"}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(t.servicePage?.pricingPlans?.enterprise?.features || ["Complex Web Apps", "AI Integrations", "Custom APIs"]).map((feat: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-blue-500" /> {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full rounded-full border-slate-200">
                    {t.servicePage?.pricingPlans?.enterprise?.cta || "Contact Sales"}
                  </Button>
                </CardFooter>
             </Card>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="relative py-24 bg-slate-900 text-white text-center overflow-hidden">
         {/* Abstract Background for CTA */}
         <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
         </div>

         <div className="container mx-auto px-4 relative z-10">
           <ScrollAnimation animation="fade-up">
             <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 text-white leading-tight">
               {t.servicePage?.cta?.title || "Ready to Transform Your Digital Presence?"}
             </h2>
           </ScrollAnimation>
           
           <ScrollAnimation animation="fade-up" delay={100}>
             <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
               {t.servicePage?.cta?.text || "Don't let another customer slip away to a competitor. Let's build something exceptional."}
             </p>
           </ScrollAnimation>

           <ScrollAnimation animation="fade-up" delay={200}>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button asChild className="h-16 px-10 rounded-full text-xl bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-900/50 hover:scale-105 transition-all">
                 <Link href={service.ctaLink}>
                   {t.servicePage?.cta?.button || "Request Proposal Now"}
                 </Link>
               </Button>
             </div>
           </ScrollAnimation>

           <ScrollAnimation animation="fade-up" delay={300}>
             <p className="mt-8 text-sm text-slate-500 font-medium">
               {t.servicePage?.cta?.note || "Free 15-min consultation included. No obligation."}
             </p>
           </ScrollAnimation>
         </div>
      </section>

    </div>
  );
}