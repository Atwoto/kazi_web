"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Upload, Check, ChevronRight, ChevronLeft } from "lucide-react";
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

const serviceTypes = [
  "Academic Support",
  "Web Design & Development",
  "Photo Editing",
  "AI Services",
] as const;

const budgetRanges = [
  "€25–€50",
  "€50–€100",
  "€100–€250",
  "€250–€600",
  "€600–€1,200",
  "Not sure",
] as const;

const priorities = [
  "Fast delivery",
  "Best quality",
  "Lowest cost",
] as const;

export default function QuoteForm({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const totalSteps = 4;

  const formSchema = z.object({
    serviceType: z.enum(serviceTypes),
    deadline: z.date({ required_error: t.forms.validation.required }),
    budgetRange: z.enum(budgetRanges),
    priority: z.enum(priorities),
    
    // Step 2: Specifics + Description
    description: z.string().min(10, { message: t.forms.validation.minLength.replace("{min}", "10") }),
    
    // Academic
    documentType: z.string().optional(),
    wordCount: z.string().optional(),
    language: z.string().optional(),
    level: z.string().optional(),
    helpType: z.string().optional(),
    referencingStyle: z.string().optional(),
    trackedChanges: z.string().optional(),
    urgency: z.string().optional(),

    // Graphic
    designType: z.string().optional(),
    deliverables: z.string().optional(),
    dimensions: z.string().optional(),
    brandAssets: z.string().optional(),
    styleDirection: z.string().optional(),
    examplesLink: z.string().optional(),
    concepts: z.string().optional(),
    revisions: z.string().optional(),
    usage: z.string().optional(),

    // Web
    projectType: z.string().optional(),
    currentWebsite: z.string().optional(),
    domainHosting: z.string().optional(),
    pagesNeeded: z.string().optional(),
    features: z.string().optional(),
    contentReadiness: z.string().optional(),
    techPreference: z.string().optional(),
    launchDate: z.date().optional(),
    maintenance: z.string().optional(),

    // Step 3: Contact & Upload
    fileUpload: z.any().optional(),
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
    shouldUnregister: false,
    mode: "onChange",
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

  async function onSubmit(values: FormData) {
    console.log("Attempting submission...", values);
    setIsLoading(true);
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          deadline: values.deadline ? values.deadline.toISOString() : null,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not ok:', response.status, errorText);
        throw new Error(`Failed to submit quote: ${response.status}`);
      }

      const result = await response.json();
      console.log("Quote submitted successfully:", result);
      setSubmittedData(values);
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  const onError = (errors: any) => {
    console.error("Form validation errors:", errors);
    const errorFields = Object.keys(errors);
    
    // Check which step the first error belongs to
    if (errorFields.some(field => ["serviceType", "deadline", "budgetRange", "priority"].includes(field))) {
      setCurrentStep(0);
      alert("Please check the 'Basics' step for errors.");
      return;
    }
    
    // Check step 1 fields (description is the main one, others depend on service type but all in step 1)
    if (errorFields.some(field => ["description", "documentType", "wordCount", "designType", "projectType"].includes(field))) {
      setCurrentStep(1);
      alert("Please check the 'Project Details' step for errors.");
      return;
    }

    // Check step 2 fields
    if (errorFields.some(field => ["name", "email", "whatsapp", "country", "timezone", "fileUpload"].includes(field))) {
      setCurrentStep(2);
      alert("Please check the 'Upload & Contact' step for errors.");
      return;
    }
    
    // Check step 3 (consent)
    if (errorFields.includes("consent")) {
      // Already on step 3 usually, but just in case
      setCurrentStep(3);
      alert("You must agree to the terms to submit.");
    }
  };

  const nextStep = async () => {
    const fields = getStepFields(currentStep);
    const isValid = await form.trigger(fields as any);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const getStepFields = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 0: return ["serviceType", "priority", "deadline", "budgetRange"];
      case 1: 
        const basic: (keyof FormData)[] = ["description"];
        const service = form.getValues("serviceType");
        if (service === "Academic Support") return [...basic, "documentType", "wordCount", "language", "level", "helpType"];
        if (service === "Graphic Design") return [...basic, "designType", "deliverables", "examplesLink"];
        if (service === "Web Design & Development") return [...basic, "projectType", "currentWebsite", "domainHosting", "pagesNeeded"];
        return basic;
      case 2: return ["name", "email", "whatsapp", "country", "timezone", "howDidYouHear"];
      default: return [];
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  if (submittedData) {
    return (
      <Card className={cn("p-8 rounded-xl shadow-lg bg-green-50 border-green-200", className)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
            {t.forms.success.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {t.forms.success.message}
          </p>
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to {submittedData.email}
          </p>
        </div>
      </Card>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">{t.forms.steps.basics}</h3>
              <p className="text-sm text-gray-500">Let&apos;s start with the basics</p>
            </div>

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.forms.labels.serviceType}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={t.forms.placeholders.select} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={t.forms.placeholders.select} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This helps us tailor the quote to your needs
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t.forms.labels.deadline}</FormLabel>
                    <Input
                      type="date"
                      className="h-12"
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.forms.labels.budget}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t.forms.placeholders.select} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="button"
              onClick={nextStep}
              disabled={!watchServiceType}
              className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700"
            >
              {t.forms.buttons.next} <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-xl text-gray-900 font-semibold">{t.forms.steps.details}</h3>
              <p className="text-sm text-gray-500">Tell us more about your project</p>
            </div>

            {watchServiceType === "Academic Support" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.forms.labels.documentType}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder={t.forms.placeholders.select} /></SelectTrigger></FormControl>
                        <SelectContent>
                          {["Essay", "Report", "Dissertation", "CV", "Cover Letter", "Presentation", "Other"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wordCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.forms.labels.wordCount}</FormLabel>
                      <FormControl><Input placeholder={t.forms.placeholders.wordCount} {...field} /></FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.forms.labels.language}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder={t.forms.placeholders.select} /></SelectTrigger></FormControl>
                          <SelectContent>
                            {["English", "Spanish", "Other"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.forms.labels.level}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder={t.forms.placeholders.select} /></SelectTrigger></FormControl>
                          <SelectContent>
                            {["High School", "Bachelor", "Master", "PhD", "Other"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="helpType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.forms.labels.helpType}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder={t.forms.placeholders.select} /></SelectTrigger></FormControl>
                        <SelectContent>
                          {["Proofreading", "Clarity", "Structure", "Referencing", "Formatting", "Tutoring"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {watchServiceType === "Graphic Design" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="designType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.forms.labels.designType}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder={t.forms.placeholders.select} /></SelectTrigger></FormControl>
                        <SelectContent>
                          {["Logo", "Social Posts", "Flyer", "Brand Kit", "Other"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliverables"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.forms.labels.deliverables}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder={t.forms.placeholders.select} /></SelectTrigger></FormControl>
                        <SelectContent>
                          {["PNG", "JPG", "SVG", "PDF", "Print-ready"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="examplesLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.forms.labels.examplesLink}</FormLabel>
                      <FormControl><Input placeholder={t.forms.placeholders.examplesLink} {...field} /></FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {watchServiceType === "Web Design & Development" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.forms.labels.projectType}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder={t.forms.placeholders.select} /></SelectTrigger></FormControl>
                        <SelectContent>
                          {["Fix", "Landing Page", "Business Website", "E-commerce"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.forms.labels.currentWebsite}</FormLabel>
                      <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="domainHosting"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.forms.labels.domainHosting}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder={t.forms.placeholders.select} /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="yes">{t.forms.options.common.yes}</SelectItem>
                            <SelectItem value="no">{t.forms.options.common.no}</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pagesNeeded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.forms.labels.pagesNeeded}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder={t.forms.placeholders.select} /></SelectTrigger></FormControl>
                          <SelectContent>
                            {["1", "3-5", "6-10", "E-commerce"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.forms.labels.description}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.forms.placeholders.description}
                      className="resize-y min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isLoading}
                className="w-1/3 h-12 rounded-full border-gray-200 disabled:opacity-50"
              >
                <ChevronLeft className="mr-2 w-4 h-4" /> {t.forms.buttons.back}
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="w-2/3 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {t.forms.buttons.next} <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">{t.forms.steps.upload}</h3>
              <p className="text-sm text-gray-500">Upload files and provide contact details</p>
            </div>

            <FormField
              control={form.control}
              name="fileUpload"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>{t.forms.labels.upload}</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      className="h-12 pt-2"
                      onChange={(event) => {
                        onChange(event.target.files && event.target.files[0]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload any relevant files (max 5MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.forms.labels.name} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t.forms.placeholders.name} {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.forms.labels.email} *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t.forms.placeholders.email} {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.forms.labels.whatsapp}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.forms.placeholders.whatsapp} {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.forms.labels.country}</FormLabel>
                    <FormControl>
                      <Input placeholder="Your country" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.forms.labels.timeZone}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.forms.placeholders.timeZone} {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="howDidYouHear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.forms.labels.howHear}</FormLabel>
                  <FormControl>
                    <Input placeholder="Google, social media, etc." {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isLoading}
                className="w-1/3 h-12 rounded-full border-gray-200 disabled:opacity-50"
              >
                <ChevronLeft className="mr-2 w-4 h-4" /> {t.forms.buttons.back}
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="w-2/3 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {t.forms.buttons.next} <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 3:
        const formValues = form.getValues();
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">{t.forms.steps.review}</h3>
              <p className="text-sm text-gray-500">Please review your details before submitting</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div>
                <span className="font-semibold">{t.forms.labels.serviceType}:</span> {formValues.serviceType}
              </div>
              <div>
                <span className="font-semibold">{t.forms.labels.priority}:</span> {formValues.priority}
              </div>
              <div>
                <span className="font-semibold">{t.forms.labels.budget}:</span> {formValues.budgetRange}
              </div>
              <div>
                <span className="font-semibold">{t.forms.labels.deadline}:</span> {formValues.deadline ? new Date(formValues.deadline).toLocaleDateString() : "Not set"}
              </div>
              <div>
                <span className="font-semibold">{t.forms.labels.name}:</span> {formValues.name}
              </div>
              <div>
                <span className="font-semibold">{t.forms.labels.email}:</span> {formValues.email}
              </div>
              <div>
                <span className="font-semibold">{t.forms.labels.description}:</span> 
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">{formValues.description}</p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className={cn(
                  "flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 shadow-sm transition-all",
                  field.value ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                )}>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className={cn(
                      "text-gray-700 font-medium",
                      !field.value && "text-red-600"
                    )}>
                      {t.forms.labels.consent} {!field.value && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <p className="text-xs text-gray-500">
                      You must agree to the terms to submit your request
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isLoading}
                className="w-1/3 h-12 rounded-full border-gray-200 disabled:opacity-50"
              >
                <ChevronLeft className="mr-2 w-4 h-4" /> {t.forms.buttons.back}
              </Button>
              <div className="w-2/3 relative">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      {t.forms.buttons.submitting}
                    </>
                  ) : (
                    <>
                      {t.forms.buttons.submit} <Check className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={cn("p-8 rounded-xl shadow-lg", className)}>
      {/* Progress Stepper */}
      <div className="mb-10 relative">
        <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-400 relative z-10">
          <span className={cn("transition-colors duration-300", currentStep >= 0 && "text-blue-600 font-bold")}>{t.forms.steps.basics}</span>
          <span className={cn("transition-colors duration-300", currentStep >= 1 && "text-blue-600 font-bold")}>{t.forms.steps.details}</span>
          <span className={cn("transition-colors duration-300", currentStep >= 2 && "text-blue-600 font-bold")}>{t.forms.steps.upload}</span>
          <span className={cn("transition-colors duration-300", currentStep >= 3 && "text-blue-600 font-bold")}>{t.forms.steps.review}</span>
        </div>

        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out absolute top-0 left-0"
            style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%`}}
          />
        </div>

        <div className="flex justify-between absolute top-[26px] w-full px-1">
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              className={cn(
                "w-3 h-3 rounded-full border-2 border-white transition-all duration-500",
                currentStep >= step ? "bg-blue-600 shadow-sm scale-110" : "bg-gray-200"
              )}
            />
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          <fieldset disabled={isLoading} className="contents group">
            {renderStep()}
          </fieldset>
        </form>
      </Form>
    </Card>
  );
}
