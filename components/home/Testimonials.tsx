import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Marketing Director, TechFlow",
    text: "Kazi completely changed how we handle our content. The quality is exceptional, and having a manager to talk to makes it feel like an in-house team.",
    image: "", // Placeholder
  },
  {
    name: "David Ross",
    role: "Founder, GreenLeaf",
    text: "We were chasing freelancers, now we just deploy work. The design team they assigned to us is top notch.",
    image: "",
  },
  {
    name: "Elena Rodriguez",
    role: "Operations Lead, EduSmart",
    text: "Academic support services are precise and timely. It's rare to find this level of professionalism in the gig economy.",
    image: "",
  },
  {
    name: "Mark T.",
    role: "CTO, FinSaaS",
    text: "The web development sprint was executed perfectly. Clean code, great communication, and delivered early.",
    image: "",
  },
  {
    name: "Jessica Wu",
    role: "Creative Lead, Studio 4",
    text: "I was skeptical about offshoring, but Kazi's vetting is real. The video editors just 'get it' immediately.",
    image: "",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Trusted by Global Teams
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See why companies across Europe are switching to managed talent.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee hover:pause gap-8">
          {/* First Set */}
          {testimonials.map((item, i) => (
            <Card key={`1-${i}`} className="w-[350px] md:w-[450px] bg-card border-border flex-shrink-0">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-primary text-xl">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground uppercase">{item.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">"{item.text}"</p>
              </CardContent>
            </Card>
          ))}
          
          {/* Duplicate Set for Seamless Loop */}
          {testimonials.map((item, i) => (
            <Card key={`2-${i}`} className="w-[350px] md:w-[450px] bg-card border-border flex-shrink-0">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-primary text-xl">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground uppercase">{item.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">"{item.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
