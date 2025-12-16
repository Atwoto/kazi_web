import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Globe, Award, Target, CheckCircle } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { number: "100+", label: "Projects Delivered" },
    { number: "50+", label: "Vetted Talents" },
    { number: "6", label: "Countries Served" },
    { number: "24hr", label: "Average Response Time" },
  ];

  const values = [
    {
      icon: CheckCircle,
      title: "Quality First",
      description: "We maintain strict quality standards with every project. Every deliverable goes through rigorous review before reaching you.",
    },
    {
      icon: Users,
      title: "Vetted Excellence",
      description: "Our talent pool consists of only the top 1% of professionals, carefully vetted for skill, reliability, and communication.",
    },
    {
      icon: Heart,
      title: "Social Impact",
      description: "We're committed to making a difference. Every project contributes to supporting children's homes in Kenya.",
    },
    {
      icon: Globe,
      title: "Cross-Border Trust",
      description: "We bridge the gap between European businesses and African talent, building lasting professional relationships.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former management consultant with 10+ years experience in outsourcing and talent acquisition across Africa.",
      image: "/next.svg",
    },
    {
      name: "James Mwangi",
      role: "Head of Operations",
      bio: "Ensures seamless project delivery and maintains quality standards across all our service offerings.",
      image: "/next.svg",
    },
    {
      name: "Amara Okafor",
      role: "Talent Relations Manager",
      bio: "Manages our network of vetted professionals and ensures consistent communication and support.",
      image: "/next.svg",
    },
    {
      name: "David Chen",
      role: "Client Success Lead",
      bio: "Dedicated to ensuring every client receives exceptional service and achieves their project goals.",
      image: "/next.svg",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-6 leading-tight">
              Connecting Europe to East African Excellence
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're on a mission to revolutionize how European businesses access world-class talent,
              while creating positive social impact across East Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Work With Us</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg">
                <Link href="/work-with-us">Join Our Network</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">Our Story</h2>
            </div>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-xl leading-relaxed mb-6">
                Kazi was born from a simple observation: there exists incredible talent in East Africa,
                yet many European businesses struggle to find reliable, high-quality freelance services
                without the headaches of direct hiring.
              </p>
              <p className="leading-relaxed mb-6">
                Founded in 2024, we recognized the untapped potential of connecting these two worlds.
                Our founders, with extensive experience in management consulting and African markets,
                saw an opportunity to create something meaningful – a platform that delivers exceptional
                work while making a real difference in communities.
              </p>
              <p className="leading-relaxed mb-6">
                Today, Kazi manages a network of over 50 vetted professionals across Kenya, Uganda,
                Tanzania, and Rwanda. We've delivered 100+ projects for clients in Germany, Netherlands,
                UK, France, and beyond. But we're just getting started.
              </p>
              <p className="leading-relaxed">
                Every project with Kazi doesn't just deliver results – it contributes €0.50 to our
                partnered children's homes in Kenya, creating a cycle of positive impact that extends
                far beyond business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8 md:p-12 border-0 shadow-lg rounded-2xl bg-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To connect European businesses with exceptional East African talent through a managed
                service model that guarantees quality, reliability, and positive social impact. We
                handle the complexity so you can focus on growth.
              </p>
            </Card>

            <Card className="p-8 md:p-12 border-0 shadow-lg rounded-2xl bg-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become the leading platform for cross-border creative and technical services,
                setting new standards for quality and social responsibility in the gig economy.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide every decision we make and every project we deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="p-8 border border-gray-100 hover:shadow-lg transition-shadow rounded-2xl">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4 flex-shrink-0">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The people behind Kazi, dedicated to connecting talent and creating impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative w-full h-64 bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-80"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-20 md:py-32 bg-blue-600">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-8">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Creating Lasting Impact
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              For every project you start with Kazi, €0.50 goes directly to support our partnered
              Children's Home in Kenya. Together, we're not just building businesses – we're changing lives.
            </p>
            <div className="inline-flex items-center gap-2 text-lg font-semibold bg-white/20 px-6 py-3 rounded-full">
              <span>❤️ Making a difference, one project at a time</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Ready to Work with Us?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the growing number of European businesses who trust Kazi for their creative and technical needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg">
                <Link href="/work-with-us">Join Our Talent Network</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
