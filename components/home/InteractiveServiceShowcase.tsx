"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Globe, ShoppingCart, Search, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  features: string[];
  color: string;
}

const services = [
  {
    title: "Web Design",
    slug: "web-design-development",
    shortDesc: "Professional websites that convert",
    icon: "Globe",
    href: "/services/web-design-development",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    features: ["Custom UI/UX Design", "Full-Stack Development", "CMS Integration", "SEO Optimized"]
  },
  {
    title: "eCommerce",
    slug: "tiendas-online-ecommerce",
    shortDesc: "Online stores that sell 24/7",
    icon: "ShoppingCart",
    href: "/services/tiendas-online-ecommerce",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    features: ["Payment Integration", "Inventory Management", "Product Optimization", "Order Automation"]
  },
  {
    title: "SEO Local",
    slug: "seo-local-barcelona",
    shortDesc: "Rank first in your neighborhood",
    icon: "Search",
    href: "/services/seo-local-barcelona",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    features: ["Google Business", "Local Keywords", "Review Management", "Citation Building"]
  },
  {
    title: "AI Solutions",
    slug: "ai-services",
    shortDesc: "Automate and scale your business",
    icon: "Sparkles",
    href: "/services/ai-services",
    color: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-50",
    features: ["Chatbots", "Workflow Automation", "Lead Generation", "Process Optimization"]
  },
  {
    title: "Social Media",
    slug: "social-media-management",
    shortDesc: "Grow your Instagram presence",
    icon: "Zap",
    href: "/services/social-media-management",
    color: "from-rose-500 to-pink-600",
    bgLight: "bg-rose-50",
    features: ["Content Strategy", "Reels Production", "Community Management", "Analytics"]
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    shortDesc: "Brand identity & visual assets",
    icon: "Shield",
    href: "/services/graphic-design",
    color: "from-slate-500 to-slate-700",
    bgLight: "bg-slate-50",
    features: ["Logo Design", "Marketing Materials", "Social Templates", "Brand Guidelines"]
  }
];

const iconMap: Record<string, any> = {
  Globe,
  ShoppingCart,
  Search,
  Sparkles,
  Zap,
  Shield
};

export default function InteractiveServiceShowcase() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-bold tracking-wider mb-4">
            SERVICES
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Everything Your Business Needs
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From websites that convert to AI that scales — we build the digital infrastructure that grows your business.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={service.slug}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* Card */}
                <Link href={service.href}>
                  <div className={cn(
                    "relative h-full min-h-[280px] bg-white rounded-3xl p-8 border border-slate-200 overflow-hidden transition-all duration-500",
                    isHovered
                      ? "shadow-2xl shadow-blue-500/10 border-blue-200 transform -translate-y-2"
                      : "hover:shadow-xl hover:border-slate-300"
                  )}>
                    {/* Background Gradient (reveals on hover) */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-br",
                      service.color,
                      isHovered && "opacity-5"
                    )} />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icon */}
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
                        service.bgLight,
                        isHovered && "scale-110"
                      )}>
                        <Icon className={cn(
                          "w-7 h-7 transition-colors duration-300",
                          `text-${service.color.split('-')[1]}-600`
                        )} style={{
                          color: isHovered ? undefined : undefined
                        }} />
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 mb-6">{service.shortDesc}</p>

                      {/* Features (reveal on hover) */}
                      <div className={cn(
                        "space-y-3 flex-grow transition-all duration-500",
                        isHovered ? "opacity-100 translate-y-0" : "opacity-70 translate-y-2"
                      )}>
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* CTA Arrow */}
                      <div className={cn(
                        "flex items-center gap-2 mt-6 text-blue-600 font-semibold transition-all duration-300",
                        isHovered ? "translate-x-2" : ""
                      )}>
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Decorative Circle */}
                    <div className={cn(
                      "absolute -bottom-20 -right-20 w-40 h-40 rounded-full transition-transform duration-500",
                      service.bgLight,
                      isHovered && "scale-150"
                    )} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link href="/services" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold transition-colors">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
