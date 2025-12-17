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

const serviceTypes = [
  "Academic Support",
  "Graphic Design",
  "Web Design & Development",
  "Video Editing",
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

const formSchema = z.object({
  serviceType: z.enum(serviceTypes),
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  whatsapp: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  deadline: z.date({ required_error: "Deadline is required." }),
  budgetRange: z.enum(budgetRanges),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  priority: z.enum(priorities),
  fileUpload: z.any().optional(),
  howDidYouHear: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms.",
  }),

  // Academic Support
  documentType: z.string().optional(),
  wordCount: z.string().optional(),
  language: z.string().optional(),
  level: z.string().optional(),
  helpType: z.string().optional(),
  referencingStyle: z.string().optional(),
  trackedChanges: z.string().optional(),
  urgency: z.string().optional(),

  // Graphic Design
  designType: z.string().optional(),
  deliverables: z.string().optional(),
  dimensions: z.string().optional(),
  brandAssets: z.string().optional(),
  styleDirection: z.string().optional(),
  examplesLink: z.string().optional(),
  concepts: z.string().optional(),
  revisions: z.string().optional(),
  usage: z.string().optional(),

  // Web Design & Development
  projectType: z.string().optional(),
  currentWebsite: z.string().optional(),
  hasDomain: z.string().optional(),
  pagesNeeded: z.string().optional(),
  features: z.string().optional(),
  contentReadiness: z.string().optional(),
  techPreference: z.string().optional(),
  launchDate: z.date().optional(),
  maintenance: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function QuoteForm({ className }: { className?: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const totalSteps = 4;

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
  const watchUrgency = form.watch("urgency");

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    try {
      console.log("Quote form submitted:", values);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmittedData(values);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  if (submittedData) {
    return (
      <Card className={cn("p-8 rounded-xl shadow-lg bg-green-50 border-green-200", className)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
            Quote Request Submitted!
          </h3>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in Kazi. We'll review your requirements and send you a detailed quote within 24 hours.
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
              <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
              <p className="text-sm text-gray-500">Let's start with the basics</p>
            </div>

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a service" />
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
                  <FormLabel>What's your priority?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your priority" />
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

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
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
                  <FormLabel>Budget Range</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select budget range" />
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

            <Button
              type="button"
              onClick={nextStep}
              disabled={!watchServiceType}
              className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700"
            >
              Next Step <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-xl text-gray-900 font-semibold">Project Details</h3>
              <p className="text-sm text-gray-500">Tell us more about your project</p>
            </div>

            {/* Academic Support Fields */}
            {watchServiceType === "Academic Support" && (
              <>
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="essay">Essay</SelectItem>
                          <SelectItem value="report">Report</SelectItem>
                          <SelectItem value="dissertation">Dissertation</SelectItem>
                          <SelectItem value="cv">CV</SelectItem>
                          <SelectItem value="cover-letter">Cover Letter</SelectItem>
                          <SelectItem value="presentation">Presentation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wordCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Word Count or Pages</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2000 words or 8 pages" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="bachelor">Bachelor</SelectItem>
                          <SelectItem value="master">Master</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="helpType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What do you want help with?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select help type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="proofreading">Proofreading</SelectItem>
                          <SelectItem value="clarity">Clarity</SelectItem>
                          <SelectItem value="structure">Structure</SelectItem>
                          <SelectItem value="referencing">Referencing</SelectItem>
                          <SelectItem value="formatting">Formatting</SelectItem>
                          <SelectItem value="tutoring">Tutoring</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referencingStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referencing Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apa">APA</SelectItem>
                          <SelectItem value="harvard">Harvard</SelectItem>
                          <SelectItem value="mla">MLA</SelectItem>
                          <SelectItem value="chicago">Chicago</SelectItem>
                          <SelectItem value="not-sure">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trackedChanges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you want tracked changes?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="48h">48 hours</SelectItem>
                          <SelectItem value="24h">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Graphic Design Fields */}
            {watchServiceType === "Graphic Design" && (
              <>
                <FormField
                  control={form.control}
                  name="designType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Design Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select design type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="logo">Logo</SelectItem>
                          <SelectItem value="social-posts">Social Posts</SelectItem>
                          <SelectItem value="flyer">Flyer</SelectItem>
                          <SelectItem value="brand-kit">Brand Kit</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliverables"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deliverables Needed</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select deliverables" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="jpg">JPG</SelectItem>
                          <SelectItem value="svg">SVG</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="print-ready">Print-ready</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimensions</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select dimensions" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="instagram-post">Instagram Post</SelectItem>
                          <SelectItem value="story">Story</SelectItem>
                          <SelectItem value="a4">A4</SelectItem>
                          <SelectItem value="a5">A5</SelectItem>
                          <SelectItem value="banner">Banner</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brandAssets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Assets Upload</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select brand assets" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="logo">Logo</SelectItem>
                          <SelectItem value="colors">Colors</SelectItem>
                          <SelectItem value="fonts">Fonts</SelectItem>
                          <SelectItem value="photos">Photos</SelectItem>
                          <SelectItem value="none">None yet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="styleDirection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style Direction</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                          <SelectItem value="elegant">Elegant</SelectItem>
                          <SelectItem value="playful">Playful</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="examplesLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Examples Link (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Paste 1–3 URLs" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="concepts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Concepts</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="revisions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Revisions</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="usage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select usage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="print">Print</SelectItem>
                          <SelectItem value="ads">Ads</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Web Design & Development Fields */}
            {watchServiceType === "Web Design & Development" && (
              <>
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fix">Fix existing site</SelectItem>
                          <SelectItem value="landing-page">Landing page</SelectItem>
                          <SelectItem value="business-website">Business website</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Website Link (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasDomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you have a domain and hosting?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pagesNeeded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pages Needed</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select pages" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 page</SelectItem>
                          <SelectItem value="3-5">3–5 pages</SelectItem>
                          <SelectItem value="6-10">6–10 pages</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features Needed</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select features" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="contact-form">Contact form</SelectItem>
                          <SelectItem value="booking">Booking</SelectItem>
                          <SelectItem value="payments">Payments</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="multilingual">Multilingual</SelectItem>
                          <SelectItem value="auth">User authentication</SelectItem>
                          <SelectItem value="dashboard">Dashboard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contentReadiness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Readiness</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select content status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="text-ready">Text is ready</SelectItem>
                          <SelectItem value="need-copy">Need copy help</SelectItem>
                          <SelectItem value="not-ready">Not ready</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="techPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tech Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="wordpress">WordPress</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                          <SelectItem value="not-sure">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="launchDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Launch Date</FormLabel>
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
                  name="maintenance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maintenance</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select maintenance" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="one-time">One-time</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isLoading}
                className="w-1/3 h-12 rounded-full border-gray-200 disabled:opacity-50"
              >
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="w-2/3 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                Next Step <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">Upload & Contact</h3>
              <p className="text-sm text-gray-500">Upload files and provide contact details</p>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your project requirements..."
                      className="resize-y min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileUpload"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Upload Files (Optional)</FormLabel>
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
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} className="h-12" />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} className="h-12" />
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
                    <FormLabel>WhatsApp (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} className="h-12" />
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
                    <FormLabel>Country (Optional)</FormLabel>
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
              name="howDidYouHear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about us? (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Google, social media, referral, etc." {...field} className="h-12" />
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
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="w-2/3 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                Review & Submit <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 3:
        const formValues = form.getValues();
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">Review & Submit</h3>
              <p className="text-sm text-gray-500">Please review your details before submitting</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div>
                <span className="font-semibold">Service:</span> {formValues.serviceType}
              </div>
              <div>
                <span className="font-semibold">Priority:</span> {formValues.priority}
              </div>
              <div>
                <span className="font-semibold">Budget:</span> {formValues.budgetRange}
              </div>
              <div>
                <span className="font-semibold">Deadline:</span> {formValues.deadline ? new Date(formValues.deadline).toLocaleDateString() : "Not set"}
              </div>
              <div>
                <span className="font-semibold">Name:</span> {formValues.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {formValues.email}
              </div>
              {formValues.whatsapp && (
                <div>
                  <span className="font-semibold">WhatsApp:</span> {formValues.whatsapp}
                </div>
              )}
              {formValues.country && (
                <div>
                  <span className="font-semibold">Country:</span> {formValues.country}
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 shadow-sm bg-gray-50">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-gray-700">
                      I agree to the{" "}
                      <a href="/privacy-policy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="/terms-of-service" className="text-blue-600 hover:underline">
                        Terms of Service
                      </a>
                      .
                    </FormLabel>
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
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-2/3 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Quote Request <Check className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
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
          <span className={cn("transition-colors duration-300", currentStep >= 0 && "text-blue-600 font-bold")}>Basics</span>
          <span className={cn("transition-colors duration-300", currentStep >= 1 && "text-blue-600 font-bold")}>Details</span>
          <span className={cn("transition-colors duration-300", currentStep >= 2 && "text-blue-600 font-bold")}>Upload</span>
          <span className={cn("transition-colors duration-300", currentStep >= 3 && "text-blue-600 font-bold")}>Review</span>
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderStep()}
        </form>
      </Form>
    </Card>
  );
}
