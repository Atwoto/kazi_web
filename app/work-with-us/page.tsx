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

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  country: z.string().min(2, { message: "Country is required." }),
  city: z.string().min(2, { message: "City is required." }),
  primarySkill: z.enum(primarySkills),
  yearsOfExperience: z.enum(experienceLevels),
  toolsUsed: z.string().min(5, { message: "Please list tools you use." }),
  portfolioLinks: z.string().url({ message: "Must be a valid URL." }).optional().or(z.literal("")),
  availability: z.enum(availabilityHours),
  expectedPayRange: z.string().optional(),
  cvUpload: z.any().optional(), // Placeholder for file upload
  coverLetterUpload: z.any().optional(), // Placeholder for file upload
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy.",
  }),
});

export default function WorkWithUsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      console.log(values);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
          Work with Us
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Join our network of vetted East African talent. Fill out the form
          below to apply.
        </p>

        <Card className="p-8 rounded-xl shadow-lg bg-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <h2 className="text-2xl font-heading font-bold mb-4">
                Personal Information
              </h2>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
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
                    <FormLabel>Phone (Optional)</FormLabel>
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
                      <FormLabel>Country</FormLabel>
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
                      <FormLabel>City</FormLabel>
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
                Professional Information
              </h2>
              <FormField
                control={form.control}
                name="primarySkill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Skill</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary skill" />
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
                    <FormLabel>Years of Experience</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
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
                    <FormLabel>Tools Used</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List design software, programming languages, etc."
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
                    <FormLabel>Portfolio Links (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.behance.net/yourprofile" {...field} />
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
                    <FormLabel>Availability</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your weekly availability" />
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
                    <FormLabel>Expected Pay Range (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., €15-25/hour or €500-800/project" {...field} />
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
                Documents
              </h2>
              <FormField
                control={form.control}
                name="cvUpload"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Upload CV (PDF)</FormLabel>
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
                    <FormLabel>Upload Cover Letter (PDF, Optional)</FormLabel>
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
                        I agree to the{" "}
                        <Link href="/privacy-policy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>{" "}
                        and provide consent for my data to be processed for this application.
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
                    Submitting Application...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
