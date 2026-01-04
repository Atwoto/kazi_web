"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import Image from "next/image";

export default function Testimonials() {
  const { t } = useLanguage();

  const images = [
    "/logo5.jpg",
    "/logo4.jpg",
    "/logo6.jpg",
    "/logo.jpg"
  ];

  const testimonials = t.home.testimonials.cases.map((caseItem, index, array) => {
    let image = images[index % images.length];
    
    // Use specific images for last and second last as requested
    if (index === array.length - 1) image = "/last.jpg";
    else if (index === array.length - 2) image = "/2nd.jpg";

    return {
      name: t.home.testimonials.caseStudy,
      role: caseItem.role,
      text: caseItem.text,
      rating: 5,
      image
    };
  });

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12 md:mb-16 text-center">
        <ScrollAnimation animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            {t.home.testimonials.title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
            {t.home.testimonials.subtitle}
          </p>
        </ScrollAnimation>
      </div>

      {/* Grid Container */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, i) => (
            <ScrollAnimation key={i} animation="fade-up" delay={i * 150} className="h-full">
              <TestimonialCard {...item} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ 
  name, 
  role, 
  text, 
  rating,
  image
}: { 
  name: string; 
  role: string; 
  text: string; 
  rating: number;
  image: string;
}) {
  return (
    <Card 
      className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl"
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>

        <div className="relative mb-6 flex-grow">
          <Quote className="absolute -top-1 -left-1 w-6 h-6 text-blue-100" />
          <p className="text-gray-600 text-sm leading-relaxed pl-8">
            {text}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
          <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-gray-100">
            <Image 
              src={image} 
              alt={name} 
              fill 
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{name}</p>
            <p className="text-xs text-gray-500 truncate">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


