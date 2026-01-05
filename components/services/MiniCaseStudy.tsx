"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Clock } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface MiniCaseStudyProps {
  title: string;
  description: string;
  imageUrl: string;
  stats: { label: string; value: string; icon: "trend" | "users" | "clock" }[];
  quote?: string;
  link?: string;
}

export default function MiniCaseStudy({ title, description, imageUrl, stats, quote, link }: MiniCaseStudyProps) {
  const { t } = useLanguage();
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "trend": return <TrendingUp className="w-5 h-5 text-green-600" />;
      case "users": return <Users className="w-5 h-5 text-blue-600" />;
      case "clock": return <Clock className="w-5 h-5 text-orange-600" />;
      default: return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Side */}
        <div className="relative h-[300px] lg:h-auto min-h-[400px] bg-slate-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain p-4 lg:p-12 drop-shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent lg:hidden" />
          <div className="absolute bottom-6 left-6 lg:hidden text-white">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Success Story</p>
            <h3 className="text-2xl font-heading font-bold">{title}</h3>
          </div>
        </div>

        {/* Content Side */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="hidden lg:block mb-6">
            <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Case Study
            </span>
          </div>
          
          <h3 className="hidden lg:block text-3xl font-heading font-bold text-slate-900 mb-4">
            {title}
          </h3>

          <div className="text-slate-600 leading-relaxed mb-8 text-lg whitespace-pre-wrap">
            {description.split('**').map((part, i) => (
              i % 2 === 1 ? <strong key={i} className="text-slate-900">{part}</strong> : part
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center lg:text-left">
                <div className="mb-2 flex justify-center lg:justify-start">
                    <div className="bg-white p-2 rounded-full shadow-sm w-fit">
                        {getIcon(stat.icon)}
                    </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 uppercase font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {quote && (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-500 mb-8">
              &quot;{quote}&quot;
            </blockquote>
          )}

          {link && (
            <Button asChild variant="outline" className="w-fit rounded-full border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
              <Link 
                href={link} 
                target={link.startsWith('http') ? "_blank" : undefined}
                rel={link.startsWith('http') ? "noopener noreferrer" : undefined}
              >
                {t.portfolio?.readFullStory || "Read Full Story"} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}