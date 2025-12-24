"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Users, Globe, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function AboutContent() {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimation animation="fade-up">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full mb-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{t.about.hero.badge}</span>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={200}>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 leading-tight mb-6">
                {t.about.hero.title}
              </h1>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={400}>
              <p className="text-xl text-gray-500 leading-relaxed mb-8">
                {t.about.hero.subtitle}
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* The Problem vs The Solution */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollAnimation animation="fade-right">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                  {t.about.problem.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t.about.problem.text1}
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {t.about.problem.text2}
                </p>
                <div className="space-y-4">
                  {t.about.problem.checks.map((check, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-3 mt-1"><Check className="w-4 h-4 text-green-600" /></div>
                      <div>
                        <h4 className="font-bold text-gray-900">{check.title}</h4>
                        <p className="text-sm text-gray-500">{check.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            </div>
            <ScrollAnimation animation="fade-left" delay={200}>
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                 <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                 <Image
                   src="/about.jpg"
                   alt="Kazi Agency Management Team"
                   fill
                   className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                 />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Stats / Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Globe, key: "projects" },
              { icon: Clock, key: "response" },
              { icon: Shield, key: "satisfaction" },
            ].map((item, i) => (
              <ScrollAnimation key={i} animation="zoom-in" delay={i * 150}>
                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 h-full transition-transform hover:scale-105">
                  <item.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{(t.about.stats as any)[item.key]}</h3>
                  <p className="text-gray-500">{item.key.charAt(0).toUpperCase() + item.key.slice(1)}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation animation="fade-up">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">{t.about.cta.title}</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              {t.about.cta.subtitle}
            </p>
            <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 py-7 text-lg font-bold shadow-lg transition-transform hover:scale-105">
              <Link href="/pricing">{t.about.cta.button}</Link>
            </Button>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}

