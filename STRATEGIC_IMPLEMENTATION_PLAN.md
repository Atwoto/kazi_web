# Strategic Implementation Plan: Kazi Agency 2.0

**Objective:** Transform Kazi Agency from a standard local service provider into a "Digital Architect" partner for ambitious brands, implementing the "Complete Strategic Enhancement Plan."

**Status:** Draft / Ready for Execution

---

## Phase 1: Foundation (Positioning & Core Architecture)
**Goal:** Establish the new brand voice and set up the conversion engine.

- [ ] **Global Rebranding (Text & Copy)**
    - [ ] **Hero Section:** Update Headline to "Digital Architects for Ambitious Brands".
    - [ ] **Navigation:** Change "Get Started" to "Request Proposal" (Solicitar Propuesta).
    - [ ] **Footer:** Update value proposition and trust badges.
- [ ] **Intent-Based Conversion System**
    - [ ] **High Intent:** Create "Detailed Brief Form" (Request Quote).
    - [ ] **Medium Intent:** Implement "ROI Calculator" or "Download Guide" modal.
    - [ ] **Low Intent:** Add "Free Audit" or Newsletter capture.
- [ ] **Master Landing Page Template**
    - [ ] Build a reusable Next.js page layout that includes:
        -   Hero (H1 + Location/Benefit).
        -   The Problem (Empathy section).
        -   Our Solution (Authority section).
        -   Deliverables (Clarity list).
        -   Who It's For / Not For (Filtering).
        -   Mini Case Study.
        -   Process Timeline.
        -   Pricing/Packages.
        -   Strong Final CTA.

## Phase 2: Service & Content Expansion
**Goal:** Fill the structure with high-value, SEO-optimized content.

- [ ] **Core Service Pages Implementation**
    - [ ] *Diseño Web en Barcelona* (Web Design).
    - [ ] *Desarrollo Web para Empresas* (Corporate Dev).
    - [ ] *Tiendas Online* (eCommerce).
    - [ ] *SEO Local* (Local SEO).
    - [ ] *Mantenimiento y Optimización* (Maintenance).
    - [ ] *Consultoría Digital* (Consulting).
- [ ] **Objection Handling**
    - [ ] Create a "FAQ" section specifically designed to answer pricing and timeline objections (as per PDF).
- [ ] **Case Studies**
    - [ ] Implement a "Mini Case Study" component for landing pages.
    - [ ] Build a dedicated "Case Study" detail page template.

## Phase 3: Premium Visuals & Interactivity ("Avant-Garde")
**Goal:** Elevate the user experience to match the "Premium" price point.

- [ ] **Hero Transformations**
    - [ ] Implement Video Backgrounds (looping, subtle).
    - [ ] Add "Animated Tagline Carousel".
- [ ] **Interactive Service Showcase**
    - [ ] Build "Horizontal Scrolling" or "Hover-Reveal" grid for services.
    - [ ] Add micro-animations (tooltips, cursor effects).
- [ ] **Visual Timeline**
    - [ ] Create an interactive "Process Timeline" component (Discovery -> Design -> Dev -> Launch).

## Phase 4: Local Dominance & SEO
**Goal:** Capture high-intent local traffic.

- [ ] **Location-Based Dynamic Routing**
    - [ ] Create dynamic path: `/diseño-web-[city]` (e.g., Sant Cugat, Terrassa, Sabadell).
    - [ ] Inject dynamic "Local Trust Signals" (Map embeds, local keywords).
- [ ] **Technical SEO**
    - [ ] Implement Schema.org markup (LocalBusiness, Organization, Service).
    - [ ] Optimize Meta Titles/Descriptions for "Service + City" combinations.

## Phase 5: Monetization & Advanced Features
**Goal:** Maximize LTV and Recurring Revenue.

- [ ] **Pricing Page Overhaul**
    - [ ] Implement "Essential / Growth / Enterprise" tier cards.
    - [ ] Add "Upsell Triggers" logic (e.g., selecting a package suggests add-ons).
- [ ] **AI Features**
    - [ ] Implement Client-Facing AI Chatbot (Lead qualification).
    - [ ] Create "AI Services" specific landing page.

---

## Immediate Next Steps (Day 1)
1.  **Translations:** Update `lib/translations.ts` with new "Digital Architects" messaging.
2.  **Hero Component:** Refactor `HeroSection.tsx` to match the new visual style.
3.  **Nav Component:** Update `Navbar.tsx` with new CTAs.
