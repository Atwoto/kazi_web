"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon, ChevronRight, ChevronLeft, ShieldCheck, Clock, CreditCard, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import ExitIntentPopup from "@/components/common/ExitIntentPopup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const serviceTypes = [
  "Video Editing",
  "Photo Editing",
  "Web Design & Development",
  "Graphic Design",
  "AI Services",
  "Academic Support",
] as const;

const budgetRanges = [
  "Less than €500",
  "€500 - €1,000",
  "€1,000 - €2,000",
  "€2,000 - €5,000",
  "More than €5,000",
] as const;

const contactMethods = ["Email", "WhatsApp"] as const;

const formSchema = z.object({
  serviceType: z.enum(serviceTypes),
  projectTitle: z
    .string()
    .min(5, { message: "Project title must be at least 5 characters." }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters." }),
  styleLinks: z.string().optional(),
  deadline: z.date(),
  budgetRange: z.enum(budgetRanges),
  fileUpload: z.any().optional(), // Placeholder for file upload
  preferredContact: z.enum(contactMethods),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to the privacy policy.",
  }),
});

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 4;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      description: "",
      styleLinks: "",
      consent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      console.log(values);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Request submitted successfully! Check your email for confirmation.");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">Project Basics</h3>
                <p className="text-sm text-gray-500">Let's start with the high-level details.</p>
            </div>
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select a service type" />
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
              name="projectTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New website for my business" {...field} className="h-12 bg-gray-50 border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={nextStep}
              disabled={isLoading}
              className="w-full h-12 rounded-full text-lg mt-4 bg-primary hover:bg-blue-700 disabled:opacity-50"
            >
              Next Step <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">Project Details</h3>
                <p className="text-sm text-gray-500">The more detail, the better the quote.</p>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your project goals, deliverables, and specific requirements..."
                      className="resize-y min-h-[150px] bg-gray-50 border-gray-200 p-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="styleLinks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Style Links (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., behance.net/example" {...field} className="h-12 bg-gray-50 border-gray-200" />
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
                Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="w-2/3 h-12 rounded-full bg-primary hover:bg-blue-700 disabled:opacity-50"
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
                <h3 className="text-xl font-semibold text-gray-900">Timeline & Budget</h3>
                <p className="text-sm text-gray-500">Help us understand your constraints.</p>
            </div>
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal h-12 bg-gray-50 border-gray-200 rounded-md",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-xs">
                    We offer a 10% discount if we miss an agreed deadline.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Budget</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select a budget range" />
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
                      className="h-12 pt-2 bg-gray-50 border-gray-200"
                      onChange={(event) => {
                        onChange(event.target.files && event.target.files[0]);
                      }}
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
                Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="w-2/3 h-12 rounded-full bg-primary hover:bg-blue-700 disabled:opacity-50"
              >
                Next Step <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">Contact & Submit</h3>
                <p className="text-sm text-gray-500">Almost done! How should we reach you?</p>
            </div>
            <FormField
              control={form.control}
              name="preferredContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Contact Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contactMethods.map((method) => (
                        <SelectItem key={method} value={method}>{method}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-gray-200 p-4 shadow-sm bg-gray-50">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-gray-700">
                      I agree to the{" "}
                      <Link href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms-of-service" className="text-primary hover:underline">
                        Terms of Service
                      </Link>
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
                Back
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
                    Submit Request <CheckIcon className="ml-2 w-4 h-4" />
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
    <div className="min-h-screen bg-white pt-[72px] lg:pt-24">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]">
        
        {/* Left Side: Value Props (Fixed Sidebar on Desktop) */}
        <div className="lg:w-5/12 bg-slate-900 text-white p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden order-first">
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/30 to-transparent" />

           <div className="relative z-10 pt-24 lg:pt-0">
             <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-8 leading-tight text-white">
               Let's build something <span className="text-blue-400">great</span> together.
             </h1>

             <div className="space-y-8 mt-12">
               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                   <CheckIcon className="w-6 h-6 text-green-400" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">Top 1% Vetted Talent</h3>
                   <p className="text-slate-200 leading-relaxed">Access highly skilled East African professionals without the vetting headache.</p>
                 </div>
               </div>

               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                   <ShieldCheck className="w-6 h-6 text-blue-400" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">100% Secure Payment</h3>
                   <p className="text-slate-200 leading-relaxed">Your funds are protected. We only release payments upon your approval.</p>
                 </div>
               </div>

               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                   <Clock className="w-6 h-6 text-yellow-400" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">European Management</h3>
                   <p className="text-slate-200 leading-relaxed">Your project is overseen by experienced managers ensuring European quality standards.</p>
                 </div>
               </div>

               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                   <CreditCard className="w-6 h-6 text-purple-400" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg text-white">Transparent Pricing</h3>
                   <p className="text-slate-200 leading-relaxed">No hidden fees. You get exactly what you pay for with clear quotes.</p>
                 </div>
               </div>
             </div>

             <p className="mt-16 text-sm text-slate-300 italic border-t border-slate-800 pt-6">
               "To protect quality and support, please keep all communication inside Kazi."
             </p>
           </div>
        </div>

        {/* Right Side: Multi-step Form */}
        <div className="lg:w-7/12 p-6 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-xl mx-auto w-full">
            
            {/* Progress Stepper */}
            <div className="mb-10 relative">
              <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-400 relative z-10">
                <span className={cn("transition-colors duration-300", currentStep >= 0 && "text-blue-600 font-bold")}>Basics</span>
                <span className={cn("transition-colors duration-300", currentStep >= 1 && "text-blue-600 font-bold")}>Details</span>
                <span className={cn("transition-colors duration-300", currentStep >= 2 && "text-blue-600 font-bold")}>Timeline</span>
                <span className={cn("transition-colors duration-300", currentStep >= 3 && "text-blue-600 font-bold")}>Submit</span>
              </div>
              
              {/* Progress Track */}
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden relative">
                {/* Active Progress Fill */}
                <div 
                  className="h-full bg-blue-600 transition-all duration-500 ease-out absolute top-0 left-0" 
                  style={{ width: `${((currentStep) / (totalSteps - 1)) * 100}%` }} 
                />
              </div>
              
              {/* Step Indicators (Dots) */}
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

            <h2 className="text-3xl font-heading font-bold mb-2 text-gray-900">Request a Quote</h2>
            <p className="text-gray-500 mb-8">Tell us about your needs and we'll get back to you within 24 hours.</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {renderStep()}
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Exit Intent Popup */}
      <ExitIntentPopup
        onEmailSubmit={(email) => {
          console.log("Exit intent email:", email);
        }}
      />
    </div>
  );
}
