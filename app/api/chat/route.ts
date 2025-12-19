import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { servicesData } from "@/lib/service-data";
import { searchData } from "@/lib/search-data";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 1. Prepare Service Context
  const servicesContext = servicesData.map(s => 
    `- ${s.name} (${s.slug}): ${s.oneLiner} | Starts at: ${s.startingPrice || 'Custom'} | Turnaround: ${s.turnaround || 'Flexible'} | Deliverables: ${s.deliverables.join(', ')}`
  ).join('\n');

  // 2. Prepare Page Context
  const pagesContext = searchData.filter(i => i.type === 'page').map(p => 
    `- ${p.title}: ${p.description} (URL: ${p.url})`
  ).join('\n');

  // 3. Pricing Context
  const pricingContext = `
  ACADEMIC SUPPORT TIERS:
  - Standard (48h turnaround): €25 flat rate (up to 2000 words approx).
  - Urgent (24h turnaround): €45 flat rate.
  - Express (12h turnaround): €85 flat rate.
  *Note: We do NOT write essays from scratch (academic dishonesty). We edit, proofread, format, and coach.*

  GENERAL SERVICES:
  - Hourly Rate: €15 - €35 / hour (depending on complexity).
  - Project-based: Custom quotes based on deliverables.
  - Retainers: Available for ongoing work (approx 10-20% discount).
  `;

  const systemPrompt = `You are Kazi's dedicated AI Solution Consultant. Kazi is a premium managed service provider, NOT a freelancer marketplace. We handle digital projects (Web, Video, Design, AI, Data) end-to-end for European clients.

  === SITE CONTENT CONTEXT ===
  Use the following information to answer user questions accurately.

  [OUR SERVICES]
  ${servicesContext}

  [SITE PAGES]
  ${pagesContext}

  [PRICING STRUCTURE]
  ${pricingContext}

  === KEY BUSINESS INTELLIGENCE ===
  1. THE KAZI WAY: We provide a "Management Layer". The client talks to ONE dedicated project manager. We manage the specialists (top 1% East African talent). No ghosting, no quality issues.
  2. QUALITY: European standards, double-check reviews, and a satisfaction guarantee.
  3. LOCATION: "We are European-managed with our primary operations hub in Kenya, giving clients the best balance of cost and quality."
  4. CTA: Always encourage users to "Get a Proposal" or "Get a Quote" if they have a specific project in mind. Tell them our team reviews inquiries within 4-24 hours.

  === TONE RULES ===
  - Be professional, concise, and highly efficient.
  - Never use marketplace slang (gigs, hiring, freelancers). Use "managed delivery", "project success", and "vetted specialists".
  - If a user asks about a specific service (e.g., "Do you do video editing?"), check the [OUR SERVICES] list and provide specific details (deliverables, turnaround).
  `;

  const result = await streamText({
    model: openai("qwen/qwen3-235b-a22b-2507", {
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    }),
    messages,
    system: systemPrompt,
  });

  return result.toDataStreamResponse();
}
