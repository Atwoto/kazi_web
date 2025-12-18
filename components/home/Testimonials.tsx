"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const testimonials = [
  {
    name: "María García",
    role: "Directora de Marketing, TechFlow",
    text: "Honestly, I wasn't sure about outsourcing at first. But these guys delivered our website faster than expected and the quality was amazing. Highly recommend!",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Fundador, GreenLeaf Studio",
    text: "Best decision we made this year. The design team understood exactly what we needed without endless back-and-forth. Super professional.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "CEO, EduSmart",
    text: "Their academic editing service saved my thesis. Quick turnaround, great attention to detail, and they actually understood the subject matter.",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "CTO, FinSaaS",
    text: "Clean code, clear communication, delivered ahead of schedule. What more could you ask for? Already planning our next project with them.",
    rating: 5,
  },
  {
    name: "Elena Sánchez",
    role: "Creative Director, Studio Barcelona",
    text: "The video editors here just get it. No need to explain things twice. They took our rough footage and turned it into something beautiful.",
    rating: 5,
  },
  {
    name: "Javier López",
    role: "Operations Manager, LogiTech",
    text: "We've tried other agencies before, but the level of professionalism here is different. They treat our projects like their own.",
    rating: 5,
  },
  {
    name: "Isabella Fernández",
    role: "Marketing Lead, BrandUp",
    text: "Fast, reliable, and the results speak for themselves. Our social media content has never looked better. Thank you team!",
    rating: 5,
  },
  {
    name: "Miguel Torres",
    role: "Startup Founder",
    text: "From logo design to full website — they handled everything. Great value for money and the communication was excellent throughout.",
    rating: 5,
  },
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12 md:mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
          {t.home.testimonials.title}
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
          {t.home.testimonials.subtitle}
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* First Row - Moving Left */}
        <div className="flex mb-6 overflow-hidden">
          <div className="flex animate-scroll-left gap-6 pr-6">
            {[...testimonials, ...testimonials].map((item, i) => (
              <TestimonialCard key={`row1-${i}`} {...item} />
            ))}
          </div>
        </div>

        {/* Second Row - Moving Right (slower) */}
        <div className="flex overflow-hidden">
          <div className="flex animate-scroll-right gap-6 pr-6">
            {[...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4), ...testimonials.slice(0, 4)].map((item, i) => (
              <TestimonialCard key={`row2-${i}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, text, rating }: { name: string; role: string; text: string; rating: number }) {
  return (
    <Card className="w-[320px] md:w-[380px] flex-shrink-0 bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>

        <div className="relative mb-4">
          <Quote className="absolute -top-1 -left-1 w-6 h-6 text-blue-100" />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-4">
            {text}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
