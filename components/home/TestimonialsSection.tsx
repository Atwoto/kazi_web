import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  country: string;
  image: string;
  rating: number;
  quote: string;
  projectType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Weber",
    role: "Marketing Director",
    company: "TechStart GmbH",
    country: "Germany",
    image: "/next.svg",
    rating: 5,
    quote: "Kazi exceeded our expectations. They delivered a stunning website redesign in just 10 days, and the communication throughout was exceptional. Our conversion rate increased by 40%!",
    projectType: "Web Development",
  },
  {
    id: 2,
    name: "Sophie Dubois",
    role: "Founder",
    company: "EcoFashion",
    country: "France",
    image: "/vercel.svg",
    rating: 5,
    quote: "The video editing team created amazing content for our product launch. Professional, creative, and delivered on time. We'll definitely work with Kazi again.",
    projectType: "Video Editing",
  },
  {
    id: 3,
    name: "James Patterson",
    role: "CEO",
    company: "Growth Labs",
    country: "UK",
    image: "/file.svg",
    rating: 5,
    quote: "Their academic editing service saved my dissertation. The attention to detail and quick turnaround was impressive. Highly recommend for any academic work.",
    projectType: "Academic Support",
  },
  {
    id: 4,
    name: "Lars Andersen",
    role: "Creative Director",
    company: "Nordic Agency",
    country: "Denmark",
    image: "/window.svg",
    rating: 5,
    quote: "The graphic design team understood our brand vision perfectly. They created a complete brand identity that perfectly represents our values. Outstanding work!",
    projectType: "Graphic Design",
  },
  {
    id: 5,
    name: "Elena Rossi",
    role: "Operations Manager",
    company: "MedTech Solutions",
    country: "Italy",
    image: "/globe.svg",
    rating: 5,
    quote: "The AI automation they built for our data processing has saved us 20 hours per week. Game-changer for our business efficiency.",
    projectType: "AI Services",
  },
  {
    id: 6,
    name: "David van Berg",
    role: "Product Manager",
    company: "E-commerce Plus",
    country: "Netherlands",
    image: "/next.svg",
    rating: 5,
    quote: "Photo editing quality was top-notch. Our product photos now look professional and sales have increased. Worth every euro!",
    projectType: "Photo Editing",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what European businesses say about working with Kazi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group hover:-translate-y-1"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-blue-100" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Project Type Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                    {testimonial.projectType}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      layout="fill"
                      objectFit="cover"
                      className="opacity-80"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} • {testimonial.company}
                    </p>
                    <p className="text-xs text-gray-400">{testimonial.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600 mb-2">Average Rating</div>
            <div className="flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600 mb-2">Happy Clients</div>
            <div className="text-sm text-gray-500">Across 6 European countries</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600 mb-2">Client Retention</div>
            <div className="text-sm text-gray-500">Clients come back for more</div>
          </div>
        </div>
      </div>
    </section>
  );
}
