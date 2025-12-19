"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";
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

const primarySkills = [
  "Video Editing",
  "Photo Editing",
  "Web Design & Development",
  "Graphic Design",
  "AI Services",
  "Academic Support",
] as const;

const experienceLevels = [
  "Entry-level (0-2 years)",
  "Intermediate (2-5 years)",
  "Experienced (5-10 years)",
  "Senior (10+ years)",
] as const;

const availabilityHours = [
  "Less than 10 hours/week",
  "10-20 hours/week",
  "20-30 hours/week",
  "30-40 hours/week",
  "Full-time (40+ hours/week)",
] as const;

export default function WorkWithUsContent() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formSchema = z.object({
    fullName: z.string().min(2, { message: t.forms.validation.required }),
    email: z.string().email({ message: t.forms.validation.email }),
    phone: z.string().optional(),
    country: z.string().min(2, { message: t.forms.validation.required }),
    city: z.string().min(2, { message: t.forms.validation.required }),
    primarySkill: z.enum(primarySkills),
    yearsOfExperience: z.enum(experienceLevels),
    toolsUsed: z.string().min(5, { message: t.forms.validation.required }),
    portfolioLinks: z.string().url({ message: "Must be a valid URL." }).optional().or(z.literal("")),
    availability: z.enum(availabilityHours),
    expectedPayRange: z.string().optional(),
    cvUpload: z.any().optional(),
    coverLetterUpload: z.any().optional(),
    consent: z.boolean().refine((val) => val === true, {
      message: t.forms.validation.required,
    }),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      toolsUsed: "",
      portfolioLinks: "",
      expectedPayRange: "",
      consent: false,
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          yearsExp: values.yearsOfExperience, // Map to API field name
          portfolioUrl: values.portfolioLinks, // Map to API field name
        }),
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

  if (submitted) {
    return (
      <div className="py-16 md:py-24 bg-gray-50 flex items-center justify-center min-h-[60vh]">
        <Card className="p-12 text-center max-w-lg mx-auto rounded-3xl shadow-xl bg-white border-none">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Application Sent!</h2>
          <p className="text-lg text-slate-600 mb-8">
            Thank you for applying. Our team will review your portfolio and get back to you if there&apos;s a fit for our current projects.
          </p>
          <Button asChild className="rounded-full px-8 py-6 bg-slate-900 hover:bg-slate-800">
            <Link href="/">Return Home</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
          {t.workWithUs.pageTitle}
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          {t.workWithUs.pageSubtitle}
        </p>

        <Card className="p-8 rounded-xl shadow-lg bg-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <fieldset disabled={isLoading} className="contents">
              {/* Personal Information */}
              <h2 className="text-2xl font-heading font-bold mb-4">
                {t.workWithUs.sections.personal}
              </h2>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.workWithUs.labels.fullName}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.workWithUs.placeholders.johnDoe} {...field} />
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
                    <FormLabel>{t.forms.labels.email}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t.forms.placeholders.email} {...field} />
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
                    <FormLabel>{t.workWithUs.labels.phone}</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.forms.labels.country}</FormLabel>
                      <FormControl>
                        <Input placeholder="Kenya" {...field} />
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
                      <FormLabel>{t.workWithUs.labels.city}</FormLabel>
                      <FormControl>
                        <Input placeholder="Nairobi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Professional Information */}
              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">
                {t.workWithUs.sections.professional}
              </h2>
              <FormField
                control={form.control}
                name="primarySkill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.workWithUs.labels.primarySkill}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.forms.placeholders.select} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {primarySkills.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.workWithUs.labels.yearsExp}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.forms.placeholders.select} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="toolsUsed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.workWithUs.labels.tools}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t.workWithUs.placeholders.toolsList}
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of tools relevant to your skill.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portfolioLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.workWithUs.labels.portfolio}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.workWithUs.placeholders.portfolioUrl} {...field} />
                    </FormControl>
                    <FormDescription>
                      Links to your online portfolio or work samples.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.workWithUs.labels.availability}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.forms.placeholders.select} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availabilityHours.map((hours) => (
                          <SelectItem key={hours} value={hours}>
                            {hours}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedPayRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.workWithUs.labels.payRange}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.workWithUs.placeholders.payRange} {...field} />
                    </FormControl>
                    <FormDescription>
                      Your desired compensation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Documents */}
              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">
                {t.workWithUs.sections.documents}
              </h2>
              <FormField
                control={form.control}
                name="cvUpload"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>{t.workWithUs.labels.cv}</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        accept=".pdf"
                        onChange={(event) => {
                          onChange(event.target.files && event.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum file size: 5MB.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coverLetterUpload"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>{t.workWithUs.labels.coverLetter}</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        accept=".pdf"
                        onChange={(event) => {
                          onChange(event.target.files && event.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum file size: 5MB.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Consent */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {t.workWithUs.consent}
                      </FormLabel>
                      <FormDescription>
                        You must agree to proceed with your application.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    {t.workWithUs.submitting}
                  </>
                ) : (
                  t.workWithUs.submit
                )}
              </Button>
              </fieldset>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
