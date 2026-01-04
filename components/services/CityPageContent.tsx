"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import { useLanguage } from "@/context/LanguageContext";

interface CityData {
  name: string;
  nameEs: string;
  region: string;
  keywords: string[];
}

interface CityPageContentProps {
  city: CityData;
}

export default function CityPageContent({ city }: CityPageContentProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with City Focus */}
      <section className="relative py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation animation="fade-up">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">{city.region}</span>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={100}>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
              {t.cityPage?.heroTitle || "Diseño Web en"} <span className="text-blue-400">{city.nameEs}</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={200}>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              {(t.cityPage?.heroSubtitle || "Tu socio digital local en {city}.").replace("{city}", city.name)}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/pricing">
                  {t.cityPage?.viewPlans || "Ver Planes y Precios"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-8 rounded-full border-white/30 text-white hover:bg-white/10">
                <Link href="/contact">
                  <Phone className="mr-2 w-4 h-4" />
                  {t.cityPage?.callUs || "Llámanos"}
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Local Trust Signals */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t.cityPage?.localTeam || "Equipo Local"}</h3>
              <p className="text-slate-600">Atendemos desde {city.name} y Barcelona</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t.cityPage?.localKnowledge || "Conocimiento Local"}</h3>
              <p className="text-slate-600">Entendemos el mercado de {city.region}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t.cityPage?.localSupport || "Soporte en tu Zona"}</h3>
              <p className="text-slate-600">Reuniones presenciales disponibles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">
              {t.cityPage?.servicesTitle || "Servicios Web en"} {city.nameEs}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {t.cityPage?.servicesSubtitle || "Todo lo que tu negocio necesita para destacar online"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Web Design */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.cityPage?.webDesign?.title || "Diseño Web Profesional"}</h3>
              <p className="text-slate-600 mb-6">{t.cityPage?.webDesign?.desc || "Websites modernos, rápidos y optimizados para conversión."}</p>
              <ul className="space-y-2 mb-6">
                {(t.cityPage?.webDesign?.features || ["Diseño responsive", "SEO incluido", "Panel de administración"]).map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/services/web-design-development" className="text-blue-600 font-semibold hover:underline">
                {t.cityPage?.webDesign?.more || "Más información"} →
              </Link>
            </div>

            {/* eCommerce */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.cityPage?.ecommerce?.title || "Tiendas Online"}</h3>
              <p className="text-slate-600 mb-6">{t.cityPage?.ecommerce?.desc || "Vende tus productos online las 24 horas del día."}</p>
              <ul className="space-y-2 mb-6">
                {(t.cityPage?.ecommerce?.features || ["Pasarelas de pago", "Gestión de inventario", "Optimización SEO"]).map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/services/tiendas-online-ecommerce" className="text-blue-600 font-semibold hover:underline">
                {t.cityPage?.ecommerce?.more || "Más información"} →
              </Link>
            </div>

            {/* SEO Local */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.cityPage?.seo?.title || "SEO Local"}</h3>
              <p className="text-slate-600 mb-6">{t.cityPage?.seo?.desc || "Aparece primero cuando tus vecinos buscan tus servicios."}</p>
              <ul className="space-y-2 mb-6">
                {(t.cityPage?.seo?.features || ["Google Business", "Keywords locales", "Reseñas y citas"]).map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/services/seo-local-barcelona" className="text-blue-600 font-semibold hover:underline">
                {t.cityPage?.seo?.more || "Más información"} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            {t.cityPage?.ctaTitle || "¿Listo para crecer en"} {city.nameEs}?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            {t.cityPage?.ctaSubtitle || "Contáctanos hoy y recibe una propuesta personalizada sin compromiso."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="h-14 px-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg">
              <Link href="/contact">
                {t.cityPage?.ctaButton || "Solicitar Propuesta"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            {t.cityPage?.ctaNote || "Respuesta en menos de 24 horas • Sin compromiso"}
          </p>
        </div>
      </section>
    </div>
  );
}