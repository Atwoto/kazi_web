export interface Service {
  slug: string;
  name: string;
  oneLiner: string;
  heroImage: string;
  heroVideo?: string;
  ctaLink: string;
  deliverables: string[];
  goals?: string[];
  examples: {
    title: string;
    description: string;
    imageUrl: string;
    documentUrl?: string;
    liveUrl?: string;
    gallery?: string[];
    badge?: string;
    challenge?: string;
    solution?: string;
    results?: string;
    techStack?: string[];
    testimonial?: { quote: string; author: string };
    highlights?: string[];
    isDocument?: boolean;
  }[];
  process: { 
    step: string; 
    description: string;
    duration?: string;
    items?: string[];
  }[];
  faqs: { question: string; answer: string }[];
  targetAudience?: string;
  startingPrice?: string;
  turnaround?: string;
  perfectFor?: string[];
  notFor?: string[];
}

export const servicesData: Service[] = [
  {
    slug: "diseno-web-barcelona",
    name: "Diseño Web en Barcelona",
    oneLiner: "Diseño Web Premium para Negocios Locales en Barcelona. Convierte visitantes en clientes.",
    heroImage: "/web.png",
    heroVideo: "/WEB.mp4",
    ctaLink: "/pricing",
    deliverables: [
      "Research & estrategia inicial",
      "Wireframes y arquitectura UX",
      "Diseño UI responsive (2 revisiones)",
      "Desarrollo y testing",
      "SEO on-page básico",
      "Capacitación (2 sesiones)",
      "30 días de soporte post-lanzamiento"
    ],
    examples: [],
    process: [
      { step: "Descubrimiento", description: "Analizamos tu negocio, competencia y objetivos en Barcelona." },
      { step: "Estrategia y Diseño", description: "Creamos la estructura y el diseño visual para maximizar conversiones." },
      { step: "Desarrollo", description: "Construimos tu web con las últimas tecnologías y estándares de velocidad." },
      { step: "Lanzamiento", description: "Publicamos tu web y te enseñamos a gestionarla." }
    ],
    faqs: [],
    targetAudience: "Negocios Locales",
    startingPrice: "€3,000",
    turnaround: "4-6 Semanas"
  },
  {
    slug: "desarrollo-web-empresas",
    name: "Desarrollo Web para Empresas",
    oneLiner: "Soluciones web corporativas a medida para empresas que buscan escalabilidad.",
    heroImage: "/web.png",
    ctaLink: "/pricing",
    deliverables: [
      "Arquitectura de software a medida",
      "Integraciones con CRM/ERP",
      "Panel de administración personalizado",
      "Seguridad avanzada y backups",
      "Optimización de rendimiento (Core Web Vitals)"
    ],
    examples: [],
    process: [
      { step: "Análisis Técnico", description: "Definimos la arquitectura y stack tecnológico ideal para tu empresa." },
      { step: "Desarrollo Ágil", description: "Sprints de 2 semanas con entregables funcionales y revisiones." },
      { step: "QA y Testing", description: "Pruebas exhaustivas de seguridad, carga y funcionalidad." },
      { step: "Despliegue", description: "Puesta en producción sin interrupciones y formación al equipo." }
    ],
    faqs: [],
    targetAudience: "Empresas Medianas/Grandes",
    startingPrice: "€4,000",
    turnaround: "8-12 Semanas"
  },
  {
    slug: "tiendas-online-ecommerce",
    name: "Tiendas Online (eCommerce)",
    oneLiner: "Vende más con una tienda online optimizada para la conversión.",
    heroImage: "/web.png",
    ctaLink: "/pricing",
    deliverables: [
      "Diseño enfocado en ventas (UX/UI)",
      "Configuración de pasarelas de pago",
      "Gestión de inventario y envíos",
      "Recuperación de carritos abandonados",
      "Integración con Google Shopping"
    ],
    examples: [],
    process: [
      { step: "Estrategia de Venta", description: "Definimos tu catálogo, precios y logística de envíos." },
      { step: "Montaje de Tienda", description: "Configuración de WooCommerce/Shopify y diseño de fichas de producto." },
      { step: "Configuración de Pagos", description: "Pruebas de pasarelas de pago y seguridad transaccional." },
      { step: "Optimización CRO", description: "Ajustes finales para maximizar la tasa de conversión antes del lanzamiento." }
    ],
    faqs: [],
    targetAudience: "Retail y Marcas D2C",
    startingPrice: "€5,000",
    turnaround: "6-8 Semanas"
  },
  {
    slug: "seo-local-barcelona",
    name: "SEO Local Barcelona y Vallès",
    oneLiner: "Domina las búsquedas locales y atrae clientes de tu zona.",
    heroImage: "/web.png",
    ctaLink: "/pricing",
    deliverables: [
      "Auditoría SEO completa",
      "Optimización Google Business Profile",
      "Estrategia de contenidos locales",
      "Linkbuilding local",
      "Reportes mensuales de posicionamiento"
    ],
    examples: [],
    process: [
      { step: "Auditoría", description: "Analizamos tu estado actual y oportunidades en tu zona." },
      { step: "Optimización On-Page", description: "Mejoramos tu web para keywords locales (ej. 'abogado sabadell')." },
      { step: "Google Business", description: "Optimizamos tu ficha para aparecer en Google Maps." },
      { step: "Autoridad", description: "Generamos citas y enlaces locales para subir tu reputación." }
    ],
    faqs: [],
    targetAudience: "Negocios con local físico",
    startingPrice: "€600/mes",
    turnaround: "Mensual"
  },
  {
    slug: "mantenimiento-web",
    name: "Mantenimiento y Optimización Web",
    oneLiner: "Tu web siempre segura, rápida y actualizada. Sin preocupaciones.",
    heroImage: "/web.png",
    ctaLink: "/pricing",
    deliverables: [
      "Actualizaciones de plugins y CMS",
      "Copias de seguridad diarias",
      "Monitorización de seguridad 24/7",
      "Mejoras de velocidad mensual",
      "Soporte técnico prioritario"
    ],
    examples: [],
    process: [
      { step: "Auditoría Inicial", description: "Revisamos el estado de salud de tu web." },
      { step: "Puesta a Punto", description: "Corregimos errores críticos y actualizamos todo el software." },
      { step: "Monitorización", description: "Vigilamos tu web 24/7 para prevenir caídas o ataques." },
      { step: "Informes", description: "Recibes un reporte mensual con todo lo que hemos hecho." }
    ],
    faqs: [],
    targetAudience: "Cualquier web profesional",
    startingPrice: "€200/mes",
    turnaround: "Mensual"
  },
  {
    slug: "consultoria-digital",
    name: "Consultoría Digital Estratégica",
    oneLiner: "Hoja de ruta clara para digitalizar y hacer crecer tu negocio.",
    heroImage: "/web.png",
    ctaLink: "/pricing",
    deliverables: [
      "Análisis de modelo de negocio digital",
      "Auditoría de presencia online",
      "Plan de transformación digital",
      "Selección de herramientas y tecnología",
      "Acompañamiento en la implementación"
    ],
    examples: [],
    process: [
      { step: "Diagnóstico", description: "Entendemos tus procesos actuales y puntos de dolor." },
      { step: "Estrategia", description: "Diseñamos un plan de acción priorizado por impacto." },
      { step: "Selección", description: "Te ayudamos a elegir las mejores herramientas para tu caso." },
      { step: "Seguimiento", description: "Sesiones de revisión para asegurar que el plan se cumple." }
    ],
    faqs: [],
    targetAudience: "Gerentes y Dueños",
    startingPrice: "€800",
    turnaround: "Por Sesión/Proyecto"
  },
  {
    slug: "web-design-development",
    name: "Web Design & Development",
    oneLiner: "Digital Architects for Brands Ready to Scale",
    heroImage: "/web.png",
    heroVideo: "/WEB.mp4",
    ctaLink: "/pricing",
    deliverables: [
      "Strategic UX/UI Design",
      "Full-Stack Development (Next.js, React)",
      "Conversion-Optimized Architecture",
      "CMS & E-commerce Integration",
      "Performance & Security Hardening",
    ],
    examples: [
      {
        title: "Restaurante La Mesa",
        description: "Professional website for a local restaurant with digital QR menu and reservation integration.",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
      },
      {
        title: "Barbería Estilo",
        description: "Modern booking system for a local barbershop, allowing 24/7 automated appointments.",
        imageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=1000",
      },
    ],
    process: [
      { step: "Discovery", description: "We align on your business goals and technical requirements." },
      { step: "Development", description: "Our managed team builds your solution in agile sprints." },
      { step: "Quality Assurance", description: "Rigorous testing to ensure European standards." },
      { step: "Launch & Handover", description: "Seamless deployment and full IP transfer." },
    ],
    faqs: [
      { question: "Do you provide hosting?", answer: "We can set up hosting for you on preferred providers like Vercel or AWS, but you will own the accounts." },
      { question: "Will I be able to edit the content myself?", answer: "Yes, we typically build with a CMS (like Sanity or Strapi) so you can manage text and images easily." },
      { question: "Do you offer maintenance?", answer: "We offer optional monthly maintenance packages for security updates and content changes." },
    ],
    targetAudience: "Startups & SMEs",
    startingPrice: "€25",
    turnaround: "1-3 Weeks"
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    oneLiner: "Strategic visual identity and marketing assets for your brand.",
    heroImage: "/graphics.jpg",
    heroVideo: "/GRAPHICS.mp4",
    ctaLink: "/pricing",
    deliverables: ["Brand Strategy & Identity", "Marketing Collateral", "Social Media Suites", "Presentation Design"],
    examples: [
      {
        title: "Premium Brand Identity",
        description: "Complete visual identity system including luxury logo variations and corporate stationery design in black, gold, and white.",
        imageUrl: "/samples/graphic/Variation 1 Logo.png",
        gallery: [
          "/samples/graphic/Variation 1 Logo.png",
          "/samples/graphic/Front Gold.png",
          "/samples/graphic/Back Gold Final.png",
          "/samples/graphic/Variation 2 (1).png",
          "/samples/graphic/Variation 3 (1).png",
          "/samples/graphic/Front Black (1).png",
          "/samples/graphic/Back black final.png",
          "/samples/graphic/Front White (1).png",
          "/samples/graphic/Back White final.png"
        ],
      },
    ],
    process: [
      { step: "Briefing", description: "We gather your brand assets, style preferences, and project goals." },
      { step: "Concept Design", description: "Our designers create initial concepts for your review." },
      { step: "Refinement", description: "We iterate based on your feedback to perfect the visuals." },
      { step: "Delivery", description: "Final files provided in all required formats (AI, PNG, PDF)." },
    ],
    faqs: [
       { question: "What formats will I receive?", answer: "We provide all industry-standard formats: AI, EPS, PDF, JPG, and PNG." },
       { question: "How many revisions are included?", answer: "Our standard packages include 2-3 rounds of revisions." },
    ],
    targetAudience: "Marketing Teams",
    startingPrice: "€25",
    turnaround: "1-3 Days"
  },
  {
    slug: "video-editing",
    name: "Video Production",
    oneLiner: "Post-production services for high-impact visual storytelling.",
    heroImage: "/video.jpg",
    ctaLink: "/pricing",
    deliverables: ["Corporate Explainers", "Social Media Reels", "Ads & Promos", "Full Post-Production"],
    examples: [],
    process: [
      { step: "Footage Transfer", description: "You upload your raw footage and provide a creative brief." },
      { step: "Editing & Assembly", description: "We cut, color grade, and add transitions/effects." },
      { step: "Review Round", description: "You watch the draft and request timestamped changes." },
      { step: "Final Polish", description: "We apply finishing touches and export in 4K/HD." },
    ],
    faqs: [
        { question: "What is your typical turnaround?", answer: "Simple edits are often done in 48h. Complex projects depend on scope." },
        { question: "How do I send large files?", answer: "We use Google Drive, Dropbox, or WeTransfer." },
    ],
    targetAudience: "Creators & Brands",
    startingPrice: "€25",
    turnaround: "24-72 Hours"
  },
  {
    slug: "photo-editing",
    name: "Image Retouching",
    oneLiner: "High-volume, high-quality retouching for e-commerce and media.",
    heroImage: "/photo.jpg",
    ctaLink: "/pricing",
    deliverables: ["High-End Retouching", "E-commerce Standardization", "Color Correction", "Compositing"],
    examples: [],
    process: [
      { step: "Upload", description: "Submit your images and style guidelines." },
      { step: "Retouching", description: "Our team processes the images to your specifications." },
      { step: "Quality Check", description: "Internal review to ensure consistency." },
      { step: "Delivery", description: "Download your high-res, ready-to-use images." },
    ],
    faqs: [
        { question: "Can you handle bulk orders?", answer: "Yes, our team is scalable to handle hundreds of images per day." },
    ],
    targetAudience: "E-commerce Stores",
    startingPrice: "€25",
    turnaround: "24-48 Hours"
  },
  {
    slug: "ai-services",
    name: "AI Solutions",
    oneLiner: "Implementing practical AI workflows to future-proof your business.",
    heroImage: "/AI.jpg",
    heroVideo: "/AI.mp4",
    ctaLink: "/pricing",
    deliverables: ["Workflow Automation", "Custom Chatbot Integration", "Data Analysis Models", "Process Optimization"],
    examples: [
      {
        title: "Billson Solar AI Sales Chatbot",
        description: "Intelligent AI assistant integrated into solar e-commerce platform, guiding customers through the entire buying journey.",
        imageUrl: "/samples/AI/bill.jpg",
        liveUrl: "https://billsonsolar.com/",
        gallery: ["/samples/AI/bill.jpg", "/samples/AI/bill1.jpg", "/samples/AI/bill2.jpg"],
      },
      {
        title: "WhatsApp Car Rental Automation",
        description: "Full-stack WhatsApp automation system using Evolution API and Node.js for high-volume car rental bookings.",
        imageUrl: "/samples/AI/chat.jpg",
        gallery: ["/samples/AI/chat.jpg", "/samples/AI/chat1.jpg"],
      },
      {
        title: "Personal Brand Automation Workflow",
        description: "n8n automation workflow that generates personal branding content including LinkedIn posts and AI headshots.",
        imageUrl: "/samples/AI/brand.jpg",
        gallery: ["/samples/AI/brand.jpg", "/samples/AI/brand1.jpg"],
      },
      {
        title: "Lead Gen Subscriber AI Agent",
        description: "n8n automation that captures, validates, and enriches leads for AI marketing funnels with duplicate checking.",
        imageUrl: "/samples/AI/lead.jpg",
        gallery: ["/samples/AI/lead.jpg"],
      },
    ],
    process: [
      { step: "Analysis", description: "We audit your current workflows to identify automation opportunities." },
      { step: "Implementation", description: "We build and integrate the AI agents or automations." },
      { step: "Testing", description: "Rigorous testing to ensure accuracy and reliability." },
      { step: "Handover", description: "We train your team on how to use and monitor the new system." },
    ],
    faqs: [
        { question: "Is my data secure?", answer: "Yes, we prioritize data privacy and use secure, enterprise-grade APIs." },
    ],
    targetAudience: "Tech-Forward Biz",
    startingPrice: "€25",
    turnaround: "1-2 Weeks"
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    oneLiner: "Full-service Instagram management for local businesses to increase reach, foot traffic, and sales.",
    heroImage: "/samples/social/social4.jpg",
    heroVideo: "/SOCIAL.mp4",
    ctaLink: "/pricing",
    deliverables: [
      "Custom Grid Aesthetic & Brand System",
      "Weekly Content Plan & Scheduling",
      "Daily Stories with Actionable CTAs",
      "Reels System for Maximum Reach",
      "Monthly Reporting & Strategy Optimization",
    ],
    goals: [
      "Make the page look premium and consistent so new visitors trust the business fast.",
      "Increase local discovery, reach, and profile visits.",
      "Turn attention into actions: DMs, calls, WhatsApp clicks, and in-store visits.",
      "Keep posting consistent every week, with clear promos and seasonal moments.",
      "Track performance monthly and adjust based on what performs, not vibes.",
    ],
    examples: [
      {
        title: "Estanc Ramoneda. Instagram Management",
        description: "Full Instagram rollout for a 160-year-old retail business. We transformed their digital presence into a consistent, trust-building sales tool that drives local discovery and customer action.",
        imageUrl: "/samples/graphic/Front Gold.png",
        liveUrl: "https://www.instagram.com/estanc.ramoneda/",
        gallery: [
          "/samples/graphic/Front Gold.png",
          "/samples/graphic/Back Gold Final.png",
          "/samples/graphic/Front Black (1).png",
          "/samples/graphic/Variation 1 Logo.png"
        ],
      },
    ],
    process: [
      { step: "Strategy & Setup", description: "We build a premium grid aesthetic and templates so your brand looks consistent instantly." },
      { step: "Content Creation", description: "Weekly production of posts and Reels designed for local discovery and product promos." },
      { step: "Daily Management", description: "We handle stories and engagement to turn attention into DMs, calls, and visits." },
      { step: "Analysis", description: "Monthly reporting tracking real metrics like profile visits and sales, adjusting based on data." },
    ],
    faqs: [
      { question: "Which platforms do you manage?", answer: "Our primary focus is Instagram for local reach, but we can syndicate to Facebook and LinkedIn." },
      { question: "Do you respond to comments?", answer: "Yes, we handle community management to ensure no lead is left unanswered." },
    ],
    targetAudience: "Local Retail, Hospitality & Services",
    startingPrice: "€75",
    turnaround: "Monthly Recurring"
  },
  {
    slug: "academic-support",
    name: "Academic Editing",
    oneLiner: "Professional editing and coaching for academic excellence.",
    heroImage: "/academics.jpg",
    ctaLink: "/pricing",
    deliverables: ["Dissertation Proofreading", "Style Guide Formatting", "Structure & Flow Analysis", "Citation Compliance"],
    examples: [
      {
        title: "Communication with the Elderly",
        description: "Academic report on barriers, skills & resources for effective elderly communication",
        imageUrl: "/file.svg",
        documentUrl: "/samples/academic/report.docx"
      },
      {
        title: "LSM-Trees: Write-Optimized Storage",
        description: "Technical paper on storage engines, compaction strategies & performance analysis",
        imageUrl: "/file.svg",
        documentUrl: "/samples/academic/LSM1.docx"
      },
      {
        title: "Social Media Effects on Relationships",
        description: "Research study with methodology, statistical analysis & literature review",
        imageUrl: "/file.svg",
        documentUrl: "/samples/academic/20240324 3.0.docx"
      },
      {
        title: "Food Waste Analysis at Greenleaf Grocery",
        description: "Statistical analysis with ethical recommendations using Excel & regression models",
        imageUrl: "/file.svg",
        documentUrl: "/samples/academic/Green leaf.docx"
      },
    ],
    process: [
      { step: "Draft Submission", description: "You send your current draft and the marking criteria." },
      { step: "Review & Editing", description: "We correct grammar, flow, and formatting (no ghostwriting)." },
      { step: "Feedback", description: "We provide comments on structure and clarity." },
      { step: "Final Polish", description: "Your document is returned ready for submission." },
    ],
    faqs: [
        { question: "Do you write essays from scratch?", answer: "No. We provide editing, proofreading, and coaching. We do not engage in academic dishonesty." },
        { question: "What referencing styles do you support?", answer: "We are experts in APA, Harvard, MLA, Chicago, and more." },
    ],
    targetAudience: "Students & Researchers",
    startingPrice: "€25",
    turnaround: "6-72 Hours"
  },
];