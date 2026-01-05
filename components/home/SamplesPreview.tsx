"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function SamplesPreview() {
  const { t } = useLanguage();

  const samples = [
    {
      titleKey: "sokoBridge" as const,
      categoryKey: "webDev" as const,
      image: "/samples/web/restaurant.jpg",
      link: "https://restaurant.kaziagency.es/",
    },
    {
      titleKey: "billsSolar" as const,
      categoryKey: "webDev" as const,
      image: "/samples/web/barber.jpg",
      link: "https://barber.kaziagency.es/",
    },
    {
      titleKey: "ramonedaLogo" as const,
      categoryKey: "graphicDesign" as const,
      image: "/samples/graphic/remo-difference.jpg",
      link: "https://www.instagram.com/estanc.ramoneda/",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal direction="up">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">{t.home.samples.title}</h2>
              <p className="text-lg text-gray-500 max-w-2xl">
                {t.home.samples.subtitle}
              </p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex rounded-full transition-transform hover:scale-105">
              <Link href="/portfolio">{t.home.samples.cta}</Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {samples.map((sample, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.1}>
              <a 
                href={sample.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <Card className="border-none shadow-md group-hover:shadow-2xl transition-all duration-500 overflow-hidden h-full bg-white">
                  <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                    <Image
                      src={sample.image}
                      alt={t.home.samples.projects[sample.titleKey]}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                      <div className="bg-white/90 text-blue-600 px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        {t.portfolio?.viewSite || "View Live Site"}
                      </div>
                    </div>
                  </div>
                  <CardHeader className="bg-white">
                    <CardTitle className="font-heading text-lg font-bold group-hover:text-blue-600 transition-colors">{t.home.samples.projects[sample.titleKey]}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium uppercase tracking-wide text-xs">
                      {t.home.samples.categories[sample.categoryKey]}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.4} className="md:hidden">
          <div className="mt-8 text-center">
             <Button asChild variant="outline" className="rounded-full w-full">
              <Link href="/portfolio">{t.home.samples.cta}</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

