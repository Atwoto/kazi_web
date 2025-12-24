import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { servicesData } from "@/lib/service-data";
import { searchData } from "@/lib/search-data";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Check if API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set");
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create OpenRouter client
    const openrouter = createOpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    // 1. Prepare Service Context
    const servicesContext = servicesData
      .map(
        (s) =>
          `- ${s.name} (${s.slug}): ${s.oneLiner} | Starts at: ${s.startingPrice || "Custom"} | Turnaround: ${s.turnaround || "Flexible"} | Deliverables: ${s.deliverables.join(", ")}`
      )
      .join("\n");

    // 2. Prepare Page Context
    const pagesContext = searchData
      .filter((i) => i.type === "page")
      .map((p) => `- ${p.title}: ${p.description} (URL: ${p.url})`)
      .join("\n");

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

    const systemPrompt = `You are Kazi Agency's AI Assistant, a friendly and helpful guide for a local digital agency in Catalonia, Spain. Your goal is to answer user questions about the agency's services and encourage them to request a demo or contact the team.

Key Information about Kazi Agency:
- Identity: We are a local agency based in Catalonia, focused on helping other local businesses succeed.
- Core Services: Our main services are:
    1. Web & Booking Systems: Professional websites with automated booking capabilities.
    2. Social Media Management: Content and growth for Instagram and Google Maps.
    3. Graphic Design & Branding: Logos, menus, digital signage, etc.
    4. AI Automation: Simple chatbots and process automation for small businesses.
- Tone: Be friendly, professional, and concise. Speak in the user's language (the chat history will indicate if it's English, Spanish, or Catalan).
- Goal: Your main goal is to help users understand our services and guide them towards the /contact or /pricing pages to get a demo or a quote.

User Questions & Your Role:
- If asked about services, briefly explain the 4 core services.
- If asked about pricing, direct them to the pricing page to see the plans (€29/mo, €49/mo, €249/mo).
- If asked about who you are, introduce yourself as the AI assistant for Kazi Agency, a local agency in Catalonia.
- Do not mention "offshoring", "remote teams", or "East African talent". This is outdated information. The focus is 100% local.

Example Interaction (User asks "what do you do?"):
"¡Hola! Somos Kazi Agency, una agencia digital local en Cataluña. Ayudamos a negocios como el tuyo a conseguir más clientes y a gestionar las operaciones de forma más eficiente. Ofrecemos principalmente cuatro servicios:
1.  **Web y Sistemas de Reserva**
2.  **Gestión de Redes Sociales**
3.  **Diseño Gráfico y Branding**
4.  **Automatización con IA**
¿Te gustaría saber más sobre alguno de ellos?"
`;

    // Convert messages to proper format for OpenRouter
    // Include full conversation history with both user and assistant messages
    const formattedMessages = messages.map((msg: any) => {
      // Ensure we only send valid roles
      const role = msg.role === "assistant" ? "assistant" : "user";
      return {
        role,
        content: typeof msg.content === "string" ? msg.content : String(msg.content),
      };
    });

    const result = streamText({
      model: openrouter("qwen/qwen-2.5-72b-instruct"),
      messages: formattedMessages,
      system: systemPrompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
