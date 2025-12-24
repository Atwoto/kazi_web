"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

const serviceTypeKeys = ["web", "social", "graphic", "ai"] as const;
const priorityKeys = ["fast", "quality", "cost"] as const;
const budgetRanges = [
  "€25–€50",
  "€50–€100",
  "€100–€250",
  "€250–€600",
  "€600–€1,200",
  "No estoy seguro",
] as const;

export default function QuoteForm({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const totalSteps = 4;

  const formSchema = z.object({
    serviceType: z.enum(serviceTypeKeys),
    deadline: z.coerce.date(),
    budgetRange: z.string().optional(),
    priority: z.enum(priorityKeys),
    description: z.string().min(10, { message: "Description must be at least 10 characters" }),
    webServiceOption: z.string().optional(),
    webPricingTier: z.string().optional(),
    projectType: z.string().optional(),
    currentWebsite: z.string().optional(),
    domainHosting: z.string().optional(),
    pagesNeeded: z.string().optional(),
    designType: z.string().optional(),
    deliverables: z.string().optional(),
    examplesLink: z.string().optional(),
    name: z.string().min(2, { message: t.forms.validation.required }),
    email: z.string().email({ message: t.forms.validation.email }),
    whatsapp: z.string().optional(),
    country: z.string().optional(),
    timezone: z.string().optional(),
    howDidYouHear: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, {
      message: t.forms.validation.required,
    }),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      country: "",
      timezone: "",
      description: "",
      howDidYouHear: "",
      consent: false,
    },
  });

  const watchServiceType = form.watch("serviceType");
  const watchWebOption = form.watch("webServiceOption");

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          deadline: values.deadline ? values.deadline.toISOString() : null,
        }),
      });
      if (!response.ok) throw new Error(`Failed to submit: ${response.status}`);
      setSubmittedData(values);
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  const nextStep = async () => {
    const stepFields = getStepFields(currentStep);
    const isValid = await form.trigger(stepFields as any);
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const getStepFields = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 0: return ["serviceType", "priority", "deadline", "budgetRange"];
      case 1:
        const basic: (keyof FormData)[] = ["description"];
        if (watchServiceType === "web") return [...basic, "webServiceOption", "webPricingTier"];
        if (watchServiceType === "graphic") return [...basic, "designType", "deliverables"];
        return basic;
      case 2: return ["name", "email", "whatsapp", "country"];
      default: return [];
    }
  };

  if (submittedData) {
    return (
      <Card className={cn("p-8 text-center bg-white", className)}>
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold">{t.forms.success.title}</h3>
        <p className="text-gray-600 mt-2">{t.forms.success.message}</p>
      </Card>
    );
  }

  return (
    <Card className={cn("p-6 lg:p-8 bg-white border border-slate-200", className)}>
      <div className="mb-8">
        <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-slate-900 transition-all duration-500" style={{ width: `${(currentStep / 3) * 100}%` }} />
        </div>
        <div className="flex justify-between text-xs text-slate-400 font-medium">
          {["BASICS", "DETAILS", "CONTACT", "REVIEW"].map((label, i) => (
            <span key={label} className={cn(currentStep >= i && "text-slate-900")}>{label}</span>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.forms.labels.serviceType}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-slate-300">
                          <SelectValue placeholder={t.forms.placeholders.select} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceTypeKeys.map((key) => (
                          <SelectItem key={key} value={key}>{(t.forms.options.services as any)[key]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.forms.labels.priority}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-slate-300">
                          <SelectValue placeholder={t.forms.placeholders.select} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorityKeys.map((key) => (
                          <SelectItem key={key} value={key}>{(t.forms.options.priority as any)[key]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.forms.labels.deadline}</FormLabel>
                      <Input type="date" className="h-12" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} onChange={(e) => field.onChange(e.target.value)} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watchServiceType !== "web" && (
                  <FormField
                    control={form.control}
                    name="budgetRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.forms.labels.budget}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-slate-300">
                              <SelectValue placeholder={t.forms.placeholders.select} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {budgetRanges.map((range) => <SelectItem key={range} value={range}>{range}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <Button type="button" onClick={nextStep} disabled={!watchServiceType} className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700">
                {t.forms.buttons.next} <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              {watchServiceType === "web" && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="webServiceOption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{(t.forms.options.web as any).serviceType}</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {["initial", "maintenance"].map((opt) => (
                            <button key={opt} type="button" onClick={() => field.onChange(opt)} className={cn("p-4 rounded-xl border-2 text-left", field.value === opt ? "border-blue-600 bg-blue-50" : "border-slate-200")}>
                              <p className="font-bold text-slate-900">{(t.forms.options.web as any)[opt === "initial" ? "initialConfig" : "maintenance"]}</p>
                              <p className="text-xs text-slate-500 mt-1">{opt === "initial" ? "Desde €299 Pago Único" : "Desde €29 / mes"}</p>
                            </button>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                  {watchWebOption && (
                    <FormField
                      control={form.control}
                      name="webPricingTier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{watchWebOption === "initial" ? "Elige tu Plan de Construcción" : "Elige tu Plan de Mantenimiento"}</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 border-slate-300">
                                <SelectValue placeholder="Seleccionar plan..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {["basic", "standard", "pro"].map((tier) => (
                                <SelectItem key={tier} value={tier}>{(t.forms.options.web as any)[watchWebOption === "initial" ? "initialTiers" : "maintTiers"][tier]}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.forms.labels.description} *</FormLabel>
                    <FormControl><Textarea className="min-h-[120px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(0)} className="w-1/3 h-12 rounded-full">Back</Button>
                <Button type="button" onClick={nextStep} className="w-2/3 h-12 rounded-full bg-blue-600 text-white">Next</Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Nombre *</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="whatsapp" render={({ field }) => (
                  <FormItem><FormLabel>WhatsApp</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem><FormLabel>País</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl></FormItem>
                )} />
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="w-1/3 h-12 rounded-full">Back</Button>
                <Button type="button" onClick={nextStep} className="w-2/3 h-12 rounded-full bg-blue-600 text-white">Next</Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p><strong>{t.forms.labels.serviceType}:</strong> {(t.forms.options.services as any)[watchServiceType]}</p>
                <p><strong>{t.forms.labels.name}:</strong> {form.getValues("name")}</p>
                <p><strong>Email:</strong> {form.getValues("email")}</p>
              </div>
              <FormField control={form.control} name="consent" render={({ field }) => (
                <FormItem className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <FormLabel>{t.forms.labels.consent}</FormLabel>
                </FormItem>
              )} />
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="w-1/3 h-12 rounded-full">Back</Button>
                <Button type="submit" disabled={isLoading} className="w-2/3 h-12 rounded-full bg-slate-900 text-white">
                  {isLoading ? <Loader2 className="animate-spin" /> : t.forms.buttons.submit}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
}