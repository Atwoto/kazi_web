"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLanguage } from "@/context/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      form.reset();
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(`Error sending message: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  if (submitted) {
    return (
      <Card className={cn("p-8 border border-slate-200 bg-white", className)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
            {t.contact.form.success.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {t.contact.form.success.message}
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="mt-4"
          >
            {t.contact.form.buttons.sendAnother}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-6 lg:p-8 border border-slate-200 bg-white", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.contact.form.labels.name} *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.contact.form.placeholders.name}
                      {...field}
                      className="h-12 border-slate-300"
                    />
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
                  <FormLabel>{t.contact.form.labels.email} *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t.contact.form.placeholders.email}
                      {...field}
                      className="h-12 border-slate-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contact.form.labels.subject} *</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.contact.form.placeholders.subject}
                    {...field}
                    className="h-12 border-slate-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contact.form.labels.message} *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t.contact.form.placeholders.message}
                    className="resize-y min-h-[150px] border-slate-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                {t.contact.form.buttons.sending}
              </>
            ) : (
              <>
                {t.contact.form.buttons.send} <Send className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
