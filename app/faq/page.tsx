import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is Kazi?",
    answer: "Kazi means 'work' in Swahili. Kazi connects skilled East African freelancers with clients in Europe. We focus on fast delivery, clear communication, and fair prices. We are a quality-controlled bridge, not a random marketplace.",
  },
  {
    question: "How long does it take?",
    answer: "Timelines vary by project. We provide a specific estimated turnaround time with every quote. For example, simple edits may take 24-48 hours, while web development takes 1-2 weeks.",
  },
  {
    question: "How revisions work?",
    answer: "Our quotes include a set number of revision rounds (typically 2). We define clearly what counts as a revision to ensure we hit your goals without scope creep.",
  },
  {
    question: "How payments work?",
    answer: "We use a milestone system. You pay an initial deposit to start the work, and the remaining balance is paid only when you approve the final preview. For Spain clients, we accept Bizum, bank transfer, and cards.",
  },
  {
    question: "Can I talk to the freelancer directly?",
    answer: "No, Kazi manages delivery. To ensure quality, speed, and dispute resolution, all communication goes through your dedicated Kazi project manager.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes. We offer a free refund up to 5 days after completion of service if the issue is due to a freelancer error that we cannot fix.",
  },
  {
    question: "How do you protect confidentiality?",
    answer: "Freelancers do not see your personal details beyond what is needed to do the job. All our talent signs strict NDAs to protect your intellectual property.",
  },
  {
    question: "What info do you need to start?",
    answer: "We need a clear brief: what you want, any examples of style you like, and your deadline. The more specific you are, the faster we can deliver.",
  },
  {
    question: "What happens if I disappear mid-project?",
    answer: "If you are unresponsive for a prolonged period, we will pause the project. If we cannot reach you after multiple attempts, we reserve the right to close the project and bill for work completed to date.",
  },
];

export default function FAQPage() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6 text-gray-900">
          How can we help you?
        </h1>
        <p className="text-lg text-gray-500 text-center mb-16">
          Answers about our managed services, vetting process, and payments.
        </p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border border-gray-100 rounded-xl px-6 data-[state=open]:bg-gray-50 data-[state=open]:border-blue-100 transition-colors">
              <AccordionTrigger className="font-semibold text-lg text-left py-6 hover:no-underline text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
