"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function ObjectionFAQ() {
  const objections = [
    {
      question: "¿Por qué cuesta más que otras opciones baratas?",
      answer: "Inviertes en estrategia, no solo diseño. Nuestros clientes ven ROI en 6-12 meses porque construimos webs que convierten visitantes en clientes. Una web barata que no genera ventas es dinero perdido."
    },
    {
      question: "¿Ofrecen planes de pago?",
      answer: "Sí. Normalmente trabajamos con 50% al inicio y 50% al lanzamiento. Para proyectos de más de €3,000, podemos estructurar pagos en 3 o 4 plazos mensuales para facilitar tu flujo de caja."
    },
    {
      question: "¿Cuánto tarda realmente el proyecto?",
      answer: "Proyectos típicos toman 4-8 semanas desde el kickoff hasta el lanzamiento. Los retrasos más comunes vienen del contenido (textos/fotos), pero nosotros te ayudamos con guías y plantillas para que eso no pase."
    },
    {
      question: "¿La web será mía o de ustedes?",
      answer: "100% tuya. Una vez finalizado el pago, te transferimos la propiedad total del código, el dominio y el contenido. Sin ataduras ni letras pequeñas."
    },
    {
      question: "¿Qué pasa si necesito cambios después?",
      answer: "Ofrecemos 30 días de soporte gratuito post-lanzamiento. Después, puedes contratar uno de nuestros planes de mantenimiento (desde €49/mes) o te enseñamos a hacer cambios básicos tú mismo."
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Preguntas Frecuentes</h3>
          <p className="text-sm text-slate-500">Resolvemos tus dudas antes de empezar.</p>
        </div>
      </div>
      <div className="p-6">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {objections.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4 data-[state=open]:bg-blue-50/30 data-[state=open]:border-blue-100 transition-colors">
              <AccordionTrigger className="text-slate-900 font-semibold hover:no-underline text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}