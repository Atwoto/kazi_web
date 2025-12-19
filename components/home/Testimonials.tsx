"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const testimonials = [
  {
    name: "Client Case Study",
    role: "E-commerce Website",
    text: "Delivered a fully functional e-commerce platform in 3 weeks with custom payment integration and inventory management system.",
    rating: 5,
  },
  {
    name: "Client Case Study",
    role: "Academic Paper",
    text: "Edited and reviewed a 10,000-word research paper on environmental science, achieving publication-ready quality within 5 days.",
    rating: 5,
  },
  {
    name: "Client Case Study",
    role: "Brand Identity",
    text: "Created a complete brand identity package including logo, color palette, and style guide for a growing tech startup.",
    rating: 5,
  },
  {
    name: "Client Case Study",
    role: "Video Production",
    text: "Produced a 2-minute promotional video with motion graphics and professional voiceover for product launch campaign.",
    rating: 5,
  },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="container mx-auto px-4 mb-12 md:mb-16 text-center">
        <h2 className={`text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {t.home.testimonials.title}
        </h2>
        <p className={`text-gray-500 max-w-2xl mx-auto text-base md:text-lg transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {t.home.testimonials.subtitle}
        </p>
      </div>

      {/* Grid Container */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, i) => (
            <TestimonialCard 
              key={i} 
              {...item} 
              index={i} 
              show={isVisible}
            />
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
  index, 
  show 
}: { 
  name: string; 
  role: string; 
  text: string; 
  rating: number; 
  index: number;
  show: boolean;
}) {
  return (
    <Card 
      className={`h-full bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-1000 rounded-2xl ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>

        <div className="relative mb-6 flex-grow">
          <Quote className="absolute -top-1 -left-1 w-6 h-6 text-blue-100" />
          <p className="text-gray-600 text-sm leading-relaxed pl-4">
            {text}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {name.split(' ').map(n => n[0]).join('')}
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

