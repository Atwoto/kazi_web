"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function SamplesPreview() {
  const { t } = useLanguage();

  const samples = [
    {
      titleKey: "sokoBridge" as const,
      categoryKey: "webDev" as const,
      image: "/samples/web/soko.jpg",
    },
    {
      titleKey: "billsSolar" as const,
      categoryKey: "webDev" as const,
      image: "/samples/web/bill.jpg",
    },
    {
      titleKey: "whatsappBot" as const,
      categoryKey: "aiServices" as const,
      image: "/samples/AI/chat.jpg",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
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
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {samples.map((sample, index) => (
            <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
              <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
                <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                  <Image
                    src={sample.image}
                    alt={t.home.samples.projects[sample.titleKey]}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <CardHeader className="bg-white">
                  <CardTitle className="font-heading text-lg font-bold">{t.home.samples.projects[sample.titleKey]}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium uppercase tracking-wide text-xs">
                    {t.home.samples.categories[sample.categoryKey]}
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-up" delay={400} className="md:hidden">
          <div className="mt-8 text-center">
             <Button asChild variant="outline" className="rounded-full w-full">
              <Link href="/portfolio">{t.home.samples.cta}</Link>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

