"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, ChevronLeft, ChevronRight, Check, AlertCircle, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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

// Constants
const ROLES = [
  "Web Developer",
  "Web Designer",
  "Graphic Designer",
  "Video Editor",
  "Photo Editor",
  "Academic Editor",
  "AI Automation Specialist",
  "Project Coordinator",
  "Other",
] as const;

const SKILL_LEVELS = ["Junior", "Mid", "Senior"] as const;

const LANGUAGES = ["English", "Spanish", "Catalan", "French", "Other"] as const;

const AVAILABILITY_TYPES = ["Part-time", "Full-time", "Project-based"] as const;

const HOURS_PER_WEEK = ["5-10", "10-20", "20-30", "30-40+"] as const;

const TURNAROUND_OPTIONS = ["24 hours", "48 hours", "72 hours", "1 week+", "Depends on scope"] as const;

const EXPERIENCE_YEARS = ["0-1", "1-2", "2-4", "4-7", "7+"] as const;

const PAYMENT_METHODS = ["M-Pesa", "PayPal", "Bizum", "Bank transfer", "Wise", "Other"] as const;

const TIMEZONES = [
  "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00",
  "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC-01:00",
  "UTC+00:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00",
  "UTC+05:30", "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00",
  "UTC+11:00", "UTC+12:00",
] as const;

// Tools by category
const TOOLS_DEV = ["React", "Next.js", "Node.js", "WordPress", "Webflow", "Shopify", "Other"];
const TOOLS_DESIGN = ["Figma", "Adobe Suite", "Canva", "Other"];
const TOOLS_EDITING = ["Premiere", "CapCut", "After Effects", "Lightroom", "Photoshop", "Other"];
const TOOLS_ACADEMIC = ["Word", "Google Docs", "Zotero/Mendeley", "Other"];
const TOOLS_AI = ["Zapier/Make", "ChatGPT prompt systems", "API integrations", "Other"];

// Form Schema
const formSchema = z.object({
  // Step 1: Identity and Role
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone or WhatsApp is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  role: z.string().min(1, "Please select a role"),
  skillLevel: z.string().min(1, "Please select your skill level"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  otherLanguage: z.string().optional(),

  // Step 2: Skills and Proof
  portfolioLink: z.string().url("Must be a valid URL"),
  examplesLinks: z.string().min(5, "Please provide at least one example link"),
  tools: z.array(z.string()).min(1, "Select at least one tool"),
  otherTools: z.string().optional(),
  yearsExperience: z.string().min(1, "Please select years of experience"),
  turnitinFamiliar: z.boolean().optional(),

  // Step 3: Availability and Logistics
  availabilityType: z.string().min(1, "Please select availability type"),
  hoursPerWeek: z.string().min(1, "Please select hours per week"),
  timezone: z.string().min(1, "Please select your timezone"),
  turnaround: z.string().min(1, "Please select typical turnaround"),
  turnaroundCustom: z.string().optional(),
  rateType: z.enum(["hourly", "project"]),
  rateAmount: z.string().min(1, "Please enter your rate"),
  paymentMethods: z.array(z.string()).min(1, "Select at least one payment method"),

  // Step 4: Fit Checks
  shortIntro: z.string().min(50, "Please write at least 50 characters").max(500, "Maximum 500 characters"),
  whyKazi: z.string().min(20, "Please write at least 20 characters").max(300, "Maximum 300 characters"),
  consentDeadlines: z.boolean().refine(val => val === true, "You must agree to this"),
  consentResponse: z.boolean().refine(val => val === true, "You must agree to this"),
  consentFeedback: z.boolean().refine(val => val === true, "You must agree to this"),
  consentBrand: z.boolean().refine(val => val === true, "You must agree to this"),
  consentTestTask: z.boolean().refine(val => val === true, "You must agree to this"),
  consentDataHandling: z.boolean().refine(val => val === true, "You must agree to this"),

  // Optional
  cvFile: z.any().optional(),
  profilePhoto: z.any().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),

  // Honeypot
  website: z.string().max(0, "Bot detected").optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function WorkWithUsContent() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [cvFileName, setCvFileName] = useState("");
  const [photoFileName, setPhotoFileName] = useState("");

  const STEPS = [
    { title: t.workWithUs.steps.identityRole, description: "Tell us who you are" },
    { title: t.workWithUs.steps.skillsProof, description: "Show us your work" },
    { title: t.workWithUs.steps.availability, description: "When can you work?" },
    { title: t.workWithUs.steps.reviewSubmit, description: "Final checks" },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      role: "",
      skillLevel: "",
      languages: [],
      otherLanguage: "",
      portfolioLink: "",
      examplesLinks: "",
      tools: [],
      otherTools: "",
      yearsExperience: "",
      turnitinFamiliar: false,
      availabilityType: "",
      hoursPerWeek: "",
      timezone: "",
      turnaround: "",
      turnaroundCustom: "",
      rateType: "hourly",
      rateAmount: "",
      paymentMethods: [],
      shortIntro: "",
      whyKazi: "",
      consentDeadlines: false,
      consentResponse: false,
      consentFeedback: false,
      consentBrand: false,
      consentTestTask: false,
      consentDataHandling: false,
      linkedinUrl: "",
      website: "",
    },
    mode: "onChange",
  });

  // Get relevant tools based on selected role
  const getToolsForRole = () => {
    switch (selectedRole) {
      case "Web Developer":
        return TOOLS_DEV;
      case "Web Designer":
      case "Graphic Designer":
        return [...TOOLS_DESIGN, ...TOOLS_DEV.slice(0, 3)];
      case "Video Editor":
      case "Photo Editor":
        return TOOLS_EDITING;
      case "Academic Editor":
        return TOOLS_ACADEMIC;
      case "AI Automation Specialist":
        return TOOLS_AI;
      default:
        return [...TOOLS_DEV, ...TOOLS_DESIGN, ...TOOLS_EDITING];
    }
  };

  // Validate current step fields
  const validateStep = async (step: number) => {
    let fieldsToValidate: (keyof FormData)[] = [];

    switch (step) {
      case 0:
        fieldsToValidate = ["fullName", "email", "phone", "country", "city", "role", "skillLevel", "languages"];
        break;
      case 1:
        fieldsToValidate = ["portfolioLink", "examplesLinks", "tools", "yearsExperience"];
        break;
      case 2:
        fieldsToValidate = ["availabilityType", "hoursPerWeek", "timezone", "turnaround", "rateType", "rateAmount", "paymentMethods"];
        break;
      case 3:
        fieldsToValidate = ["shortIntro", "whyKazi", "consentDeadlines", "consentResponse", "consentFeedback", "consentBrand", "consentTestTask", "consentDataHandling"];
        break;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  async function onSubmit(values: FormData) {
    // Honeypot check
    if (values.website) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Update selected role when form value changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "role") {
        setSelectedRole(value.role || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  if (submitted) {
    return (
      <div className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center min-h-[70vh]">
        <Card className="p-12 text-center max-w-lg mx-auto rounded-3xl shadow-xl bg-white border-none">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">{t.workWithUs.success.title}</h2>
          <p className="text-lg text-slate-600 mb-3">
            {t.workWithUs.success.message}
          </p>
          <p className="text-slate-500 mb-8">
            {t.workWithUs.success.followUp}
          </p>
          <Button asChild className="rounded-full px-8 py-6 bg-blue-600 hover:bg-blue-700">
            <Link href="/">{t.workWithUs.success.returnHome}</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t.workWithUs.headerTitle}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.workWithUs.headerSubtitle}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={index} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      index < currentStep
                        ? "bg-green-500 text-white"
                        : index === currentStep
                        ? "bg-blue-600 text-white ring-4 ring-blue-100"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`text-xs mt-2 text-center hidden sm:block ${index === currentStep ? "text-blue-600 font-semibold" : "text-slate-500"}`}>
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${index < currentStep ? "bg-green-500" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-slate-600 sm:hidden">{STEPS[currentStep].title}</p>
        </div>

        {/* Form Card */}
        <Card className="p-6 md:p-8 rounded-2xl shadow-lg bg-white border border-slate-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                {...form.register("website")}
              />

              {/* Step 1: Identity and Role */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6">{t.workWithUs.sections.identityRole}</h2>

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.fullName} *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.workWithUs.labels.email} *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.workWithUs.labels.phone} *</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.workWithUs.labels.country} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.workWithUs.labels.city} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.role} *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t.workWithUs.placeholders.selectRole} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ROLES.map((role) => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skillLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.skillLevel} *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t.workWithUs.placeholders.selectLevel} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SKILL_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.languages} *</FormLabel>
                        <FormDescription>{t.workWithUs.placeholders.languagesDescription}</FormDescription>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                          {LANGUAGES.map((lang) => (
                            <label
                              key={lang}
                              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                                field.value?.includes(lang)
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <Checkbox
                                checked={field.value?.includes(lang)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, lang]);
                                  } else {
                                    field.onChange(field.value?.filter((v: string) => v !== lang));
                                  }
                                }}
                              />
                              <span className="text-sm">{lang}</span>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("languages")?.includes("Other") && (
                    <FormField
                      control={form.control}
                      name="otherLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.workWithUs.labels.otherLanguage}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {/* Step 2: Skills and Proof */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6">{t.workWithUs.sections.skillsProof}</h2>

                  <FormField
                    control={form.control}
                    name="portfolioLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.portfolioLink} *</FormLabel>
                        <FormDescription>
                          {t.workWithUs.placeholders.portfolioDescription}
                        </FormDescription>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="examplesLinks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.examplesLinks} *</FormLabel>
                        <FormDescription>
                          {t.workWithUs.placeholders.examplesDescription}
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            className="resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tools"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.tools} *</FormLabel>
                        <FormDescription>{t.workWithUs.placeholders.toolsDescription}</FormDescription>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                          {getToolsForRole().map((tool) => (
                            <label
                              key={tool}
                              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                                field.value?.includes(tool)
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <Checkbox
                                checked={field.value?.includes(tool)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, tool]);
                                  } else {
                                    field.onChange(field.value?.filter((v: string) => v !== tool));
                                  }
                                }}
                              />
                              <span className="text-sm">{tool}</span>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("tools")?.includes("Other") && (
                    <FormField
                      control={form.control}
                      name="otherTools"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.workWithUs.labels.otherTools}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="yearsExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.yearsExp} *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t.workWithUs.placeholders.selectExperience} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EXPERIENCE_YEARS.map((years) => (
                              <SelectItem key={years} value={years}>{years} {t.workWithUs.years}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(selectedRole === "Academic Editor" || !selectedRole) && (
                    <FormField
                      control={form.control}
                      name="turnitinFamiliar"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              {t.workWithUs.labels.turnitinFamiliar}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {/* Step 3: Availability and Logistics */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6">{t.workWithUs.sections.availabilityLogistics}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="availabilityType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.workWithUs.labels.availabilityType} *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t.workWithUs.placeholders.selectType} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {AVAILABILITY_TYPES.map((type) => (
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
                      name="hoursPerWeek"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.workWithUs.labels.hoursPerWeek} *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t.workWithUs.placeholders.selectHours} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {HOURS_PER_WEEK.map((hours) => (
                                <SelectItem key={hours} value={hours}>{hours} {t.workWithUs.hours}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                        <FormLabel>{t.workWithUs.labels.timezone} *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t.workWithUs.placeholders.selectTimezone} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIMEZONES.map((tz) => (
                              <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="turnaround"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.turnaround} *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t.workWithUs.placeholders.selectTurnaround} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TURNAROUND_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("turnaround") === "Depends on scope" && (
                    <FormField
                      control={form.control}
                      name="turnaroundCustom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.workWithUs.labels.turnaroundCustom}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="rateType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.workWithUs.labels.ratePreference} *</FormLabel>
                          <FormControl>
                            <div className="flex gap-3">
                              <Button
                                type="button"
                                variant={field.value === "hourly" ? "default" : "outline"}
                                className="flex-1"
                                onClick={() => field.onChange("hourly")}
                              >
                                {t.workWithUs.labels.hourlyRate}
                              </Button>
                              <Button
                                type="button"
                                variant={field.value === "project" ? "default" : "outline"}
                                className="flex-1"
                                onClick={() => field.onChange("project")}
                              >
                                {t.workWithUs.labels.perProject}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rateAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {form.watch("rateType") === "hourly"
                              ? t.workWithUs.placeholders.hourlyRateDesc
                              : t.workWithUs.placeholders.projectRateDesc}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="paymentMethods"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.paymentMethods} *</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                          {PAYMENT_METHODS.map((method) => (
                            <label
                              key={method}
                              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                                field.value?.includes(method)
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <Checkbox
                                checked={field.value?.includes(method)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, method]);
                                  } else {
                                    field.onChange(field.value?.filter((v: string) => v !== method));
                                  }
                                }}
                              />
                              <span className="text-sm">{method}</span>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Review and Submit */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6">{t.workWithUs.sections.finalChecks}</h2>

                  <FormField
                    control={form.control}
                    name="shortIntro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.shortIntro} *</FormLabel>
                        <FormDescription>
                          {t.workWithUs.placeholders.introDescription}
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            className="resize-y min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <div className="text-xs text-slate-500 text-right">
                          {field.value?.length || 0}/500 {t.workWithUs.characters}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whyKazi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.workWithUs.labels.whyKazi} *</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold text-slate-900">{t.workWithUs.sections.reliabilityChecklist} *</h3>

                    <FormField
                      control={form.control}
                      name="consentDeadlines"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="font-normal text-slate-700">
                            {t.workWithUs.consents.deadlines}
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consentResponse"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="font-normal text-slate-700">
                            {t.workWithUs.consents.response}
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consentFeedback"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="font-normal text-slate-700">
                            {t.workWithUs.consents.feedback}
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consentBrand"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="font-normal text-slate-700">
                            {t.workWithUs.consents.brand}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="consentTestTask"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t.workWithUs.consents.testTask} *
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consentDataHandling"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t.workWithUs.consents.dataHandling} *
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Optional Fields */}
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-semibold text-slate-900 mb-4">{t.workWithUs.sections.optionalInfo}</h3>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cvFile"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                          <FormItem>
                            <FormLabel>{t.workWithUs.labels.cv}</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input
                                  {...fieldProps}
                                  type="file"
                                  accept=".pdf,.docx"
                                  className="hidden"
                                  id="cv-upload"
                                  onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    if (file) {
                                      if (file.size > 10 * 1024 * 1024) {
                                        alert("File size must be less than 10MB");
                                        return;
                                      }
                                      setCvFileName(file.name);
                                      onChange(file);
                                    }
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => document.getElementById("cv-upload")?.click()}
                                  className="gap-2"
                                >
                                  <Upload className="w-4 h-4" />
                                  {t.workWithUs.buttons.uploadCv}
                                </Button>
                                {cvFileName && (
                                  <span className="text-sm text-slate-600 flex items-center gap-2">
                                    {cvFileName}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setCvFileName("");
                                        onChange(undefined);
                                      }}
                                      className="text-slate-400 hover:text-red-500"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </span>
                                )}
                              </div>
                            </FormControl>
                            <FormDescription>{t.workWithUs.placeholders.cvFormat}</FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="linkedinUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.workWithUs.labels.linkedinProfile}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t.workWithUs.buttons.back}
                </Button>

                {currentStep < STEPS.length - 1 ? (
                  <Button type="button" onClick={nextStep} className="gap-2 bg-blue-600 hover:bg-blue-700">
                    {t.workWithUs.buttons.next}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t.workWithUs.buttons.submitting}
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        {t.workWithUs.buttons.submit}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
