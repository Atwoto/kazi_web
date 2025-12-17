"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export default function SamplesPreview() {
  const { t } = useLanguage();

  const samples = [
    {
      title: "FinTech Platform",
      category: "Web Development",
      image: "/file.svg", // Placeholder
    },
    {
      title: "EcoBrand Identity",
      category: "Graphic Design",
      image: "/file.svg", // Placeholder
    },
    {
      title: "SaaS Explainer",
      category: "Video Editing",
      image: "/file.svg", // Placeholder
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">{t.home.samples.title}</h2>
            <p className="text-lg text-gray-500 max-w-2xl">
              {t.home.samples.subtitle}
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex rounded-full">
            <Link href="/portfolio">{t.home.samples.cta}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {samples.map((sample, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="relative w-full h-64 bg-gray-200">
                <Image
                  src={sample.image}
                  alt={sample.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader className="bg-white">
                <CardTitle className="font-heading text-lg font-bold">{sample.title}</CardTitle>
                <CardDescription className="text-blue-600 font-medium uppercase tracking-wide text-xs">
                  {sample.category}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
           <Button asChild variant="outline" className="rounded-full w-full">
            <Link href="/portfolio">{t.home.samples.cta}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
